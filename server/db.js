import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { basename, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

import { initStore, readStore, saveStore } from './db.js';
import { createToken, verifyToken } from './auth.js';
import { getRouterStatus, getSystemResource, buildNetworkSummary, buildSecuritySummary } from './routeros.js';
import { analyzeQuestion } from './ai.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT || 3000);
const PUBLIC = join(root, 'public');
await initStore();

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return { raw }; }
}

async function authCheck(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;
  return verifyToken(token);
}

async function api(req, res, pathname) {
  if (pathname === '/api/health') {
    const resource = await getSystemResource();
    return sendJson(res, 200, {
      ok: true,
      mode: process.env.MIKROTIK_URL ? 'routeros' : 'demo',
      uptime: resource.uptime || 'demo',
      cpuLoad: resource['cpu-load'] || 28,
      version: resource.version || 'RouterOS Demo',
      time: new Date().toISOString()
    });
  }

  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const { username, password } = await readBody(req);
    const state = await readStore();
    const user = state.users.find((entry) => entry.username === username);
    if (!user || !verifyTokenPassword(user.passwordHash, password)) {
      return sendJson(res, 401, { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
    return sendJson(res, 200, {
      token: createToken({ userId: user.id, username: user.username, role: user.role }),
      user: { id: user.id, username: user.username, name: user.name, role: user.role }
    });
  }

  if (pathname === '/api/auth/me') {
    const userInfo = await authCheck(req);
    if (!userInfo) return sendJson(res, 401, { error: 'غير مصرح' });
    const state = await readStore();
    const user = state.users.find((entry) => entry.id === userInfo.userId);
    if (!user) return sendJson(res, 404, { error: 'المستخدم غير موجود' });
    return sendJson(res, 200, { user: { id: user.id, username: user.username, name: user.name, role: user.role } });
  }

  if (pathname === '/api/devices') {
    const routerStatus = await getRouterStatus();
    return sendJson(res, 200, { data: routerStatus.devices, source: routerStatus.source });
  }

  if (pathname === '/api/network') {
    const summary = await buildNetworkSummary();
    return sendJson(res, 200, { data: summary });
  }

  if (pathname === '/api/security') {
    const summary = await buildSecuritySummary();
    return sendJson(res, 200, { data: summary });
  }

  if (pathname === '/api/reports') {
    const health = await getSystemResource();
    return sendJson(res, 200, {
      data: {
        uptime: health.uptime || '99.94%',
        visits: '2.4M',
        revenue: '$18.8K',
        alerts: 7,
        cpuLoad: health['cpu-load'] || 28
      }
    });
  }

  if (pathname === '/api/ai/analyze' && req.method === 'POST') {
    const { question = '' } = await readBody(req);
    const userInfo = await authCheck(req);
    if (!userInfo) return sendJson(res, 401, { error: 'يجب تسجيل الدخول أولاً' });
    const answer = await analyzeQuestion(question);
    return sendJson(res, 200, {
      answer,
      confidence: 0.91,
      generatedAt: new Date().toISOString(),
      user: userInfo.username
    });
  }

  return sendJson(res, 404, { error: 'API route not found' });
}

function verifyTokenPassword(storedPassword, password) {
  if (!storedPassword) return false;
  if (storedPassword === password) return true;
  const hash = crypto.createHash('sha256').update(String(password)).digest('hex');
  return storedPassword === hash;
}

async function serveFile(req, res, pathname) {
  const siteFile = pathname === '/' ? '/index.html' : pathname;
  const normalized = normalize(join(root, siteFile));
  if (!normalized.startsWith(root)) return sendJson(res, 403, { error: 'Forbidden' });

  const filePath = join(root, siteFile);
  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'content-type': mime[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    sendJson(res, 404, { error: 'Not found' });
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith('/api/')) {
      await api(req, res, url.pathname);
      return;
    }
    await serveFile(req, res, url.pathname);
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Internal server error' });
  }
});

server.listen(port, () => {
  console.log(`MikroTik AI Manager listening on http://localhost:${port}`);
});

export { server };
