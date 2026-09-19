import crypto from 'node:crypto';
const SECRET = process.env.JWT_SECRET || 'change-me-in-production';
function createToken(payload) { const header=Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url'); const body=Buffer.from(JSON.stringify({...payload,exp:Date.now()+86400000})).toString('base64url'); const sig=crypto.createHmac('sha256',SECRET).update(`${header}.${body}`).digest('base64url'); return `${header}.${body}.${sig}`; }
function verifyToken(token) { try { const [h,b,s]=String(token).split('.'); if(!h||!b||!s) return null; const expected=crypto.createHmac('sha256',SECRET).update(`${h}.${b}`).digest('base64url'); if(s.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected))) return null; const data=JSON.parse(Buffer.from(b,'base64url')); return data.exp>Date.now()?data:null; } catch { return null; } }
export {createToken,verifyToken};
