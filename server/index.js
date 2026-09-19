import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { findUser, listDevices, addDevice, logAction } from './sqlite.js';
import { createToken, verifyToken } from './auth.js';
import { getSystemResource, getRouterStatus, buildNetworkSummary, buildSecuritySummary } from './routeros.js';
import { analyzeQuestion } from './ai.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT || 3000);
const defaultDevices = [{ id:'core', name:'Core Router 01', ip:'192.168.88.1', type:'RouterOS', status:'online', cpu:28 }];
const send = (res, status, data) => { res.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'*'}); res.end(JSON.stringify(data)); };
async function body(req) { let raw=''; for await (const chunk of req) raw += chunk; try { return raw ? JSON.parse(raw) : {}; } catch { return {}; } }
function userFrom(req) { const value = req.headers.authorization || ''; return value.startsWith('Bearer ') ? verifyToken(value.slice(7)) : null; }
function passwordMatches(stored, value) { return stored === value || stored === crypto.createHash('sha256').update(String(value)).digest('hex'); }
async function api(req, res, path) {
  if (path === '/api/health') { const resource = await getSystemResource(); return send(res,200,{ok:true,mode:process.env.MIKROTIK_URL?'routeros':'demo',cpuLoad:resource['cpu-load'] ?? 0,version:resource.version ?? 'demo',time:new Date().toISOString()}); }
  if (path === '/api/auth/login' && req.method === 'POST') { const {username,password}=await body(req); const user=findUser(username); if(!user || !passwordMatches(user.passwordHash,password)) return send(res,401,{error:'بيانات الدخول غير صحيحة'}); return send(res,200,{token:createToken({userId:user.id,username:user.username,role:user.role}),user:{id:user.id,username:user.username,name:user.name,role:user.role}}); }
  if (path === '/api/auth/me') { const session=userFrom(req); return session ? send(res,200,{user:session}) : send(res,401,{error:'غير مصرح'}); }
  if (path === '/api/devices' && req.method === 'GET') { const saved=listDevices(); const router=await getRouterStatus(); return send(res,200,{data:saved.length?saved:[...defaultDevices,...router.devices],source:router.source}); }
  if (path === '/api/devices' && req.method === 'POST') { const session=userFrom(req); if(!session) return send(res,401,{error:'تسجيل الدخول مطلوب'}); const input=await body(req); if(!input.name||!input.ip) return send(res,400,{error:'name و ip مطلوبان'}); const device={id:crypto.randomUUID(),name:String(input.name),ip:String(input.ip),type:String(input.type||'RouterOS'),status:'offline'}; addDevice(device); logAction(session.userId,'device.create'); return send(res,201,{data:device}); }
  if (path === '/api/network') return send(res,200,{data:await buildNetworkSummary()});
  if (path === '/api/security') return send(res,200,{data:await buildSecuritySummary()});
  if (path === '/api/routeros/system/resource') return send(res,200,{data:await getSystemResource()});
  if (path === '/api/ai/analyze' && req.method === 'POST') { if(!userFrom(req)) return send(res,401,{error:'تسجيل الدخول مطلوب'}); const {question=''}=await body(req); return send(res,200,{answer:await analyzeQuestion(question),confidence:.91}); }
  return send(res,404,{error:'API route not found'});
}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8'};
async function handler(req,res){ const url=new URL(req.url,`http://${req.headers.host}`); if(url.pathname.startsWith('/api/')) return api(req,res,url.pathname); try { const requested=url.pathname==='/'?'/index.html':url.pathname; const file=normalize(join(root,requested)); if(!file.startsWith(root)) return send(res,403,{error:'Forbidden'}); const data=await readFile(file); res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream'}); res.end(data); } catch { send(res,404,{error:'Not found'}); } }
http.createServer(handler).listen(port,'0.0.0.0',()=>console.log(`Listening on ${port}`));
