import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT || 3000);
const router = {
  url: process.env.MIKROTIK_URL?.replace(/\/$/, ''),
  user: process.env.MIKROTIK_USER,
  password: process.env.MIKROTIK_PASSWORD
};

const demoDevices = [
  { name: 'Core Router 01', ip: '192.168.88.1', type: 'RouterOS', status: 'online', cpu: 28 },
  { name: 'Access Point HQ', ip: '192.168.88.10', type: 'Wireless', status: 'online', cpu: 42 },
  { name: 'Firewall Edge', ip: '192.168.88.20', type: 'Firewall', status: 'warning', cpu: 67 },
  { name: 'Backup Router', ip: '192.168.88.30', type: 'RouterOS', status: 'offline', cpu: null }
];

async function routerOsGet(path) {
  if (!router.url || !router.user || !router.password) return null;
  const response = await fetch(`${router.url}/rest${path}`, {
    headers: { authorization: `Basic ${Buffer.from(`${router.user}:${router.password}`).toString('base64')}` },
    signal: AbortSignal.timeout(7000)
  });
  if (!response.ok) throw new Error(`RouterOS returned ${response.status}`);
  return response.json();
}

function json(res, status, payload) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(payload));
}

async function body(req) {
  let data = '';
  for await (const chunk of req) data += chunk;
  return data ? JSON.parse(data) : {};
}

async function api(req, res, pathname) {
  if (pathname === '/api/health') return json(res, 200, { ok: true, mode: router.url ? 'routeros' : 'demo', time: new Date().toISOString() });
  if (pathname === '/api/devices') return json(res, 200, { data: demoDevices, source: router.url ? 'routeros-ready' : 'demo' });
  if (pathname === '/api/routeros/system/resource') {
    try {
      const data = await routerOsGet('/system/resource');
      return json(res, 200, { data: data || { uptime: 'demo', 'cpu-load': '28', version: 'RouterOS 7' }, demo: !data });
    } catch (error) { return json(res, 502, { error: error.message }); }
  }
  if (pathname === '/api/ai/analyze' && req.method === 'POST') {
    const { question = '' } = await body(req);
    const answer = question.includes('أمان') || question.toLowerCase().includes('firewall')
      ? 'ينصح بمراجعة قواعد Firewall وقائمة العناوين المحظورة قبل تطبيق أي تغيير.'
      : 'الشبكة مستقرة مبدئيًا. راقب CPU وحركة VLAN خلال الساعات القادمة، ولا تطبق تغييرات تلقائية قبل مراجعتها.';
    return json(res, 200, { answer, confidence: 0.91, generatedAt: new Date().toISOString() });
  }
  return json(res, 404, { error: 'API route not found' });
}

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json' };
async function server(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url.pathname);
    const requested = url.pathname === '/' ? '/index.html' : url.pathname;
    const file = normalize(join(root, requested));
    if (!file.startsWith(root)) return json(res, 403, { error: 'Forbidden' });
    const content = await readFile(file);
    res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
    res.end(content);
  } catch { json(res, 404, { error: 'Not found' }); }
}

http.createServer(server).listen(port, () => console.log(`MikroTik AI Manager listening on http://localhost:${port}`));
