import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url)); const dbPath=process.env.SQLITE_PATH||join(root,'data','mikrotik-ai.sqlite'); mkdirSync(dirname(dbPath),{recursive:true}); const db=new Database(dbPath); db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,username TEXT UNIQUE NOT NULL,name TEXT NOT NULL,role TEXT NOT NULL,password_hash TEXT NOT NULL);CREATE TABLE IF NOT EXISTS devices(id TEXT PRIMARY KEY,name TEXT NOT NULL,ip TEXT NOT NULL,type TEXT NOT NULL,status TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP);CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id TEXT,action TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP);`);
db.prepare('INSERT OR IGNORE INTO users VALUES (?,?,?,?,?)').run('admin','admin','مدير النظام','admin',process.env.ADMIN_PASSWORD||'admin123');
const findStmt=db.prepare('SELECT id,username,name,role,password_hash AS passwordHash FROM users WHERE username=?'); const listStmt=db.prepare('SELECT id,name,ip,type,status,created_at AS createdAt FROM devices ORDER BY created_at DESC'); const addStmt=db.prepare('INSERT INTO devices(id,name,ip,type,status) VALUES(?,?,?,?,?)'); const logStmt=db.prepare('INSERT INTO audit_logs(user_id,action) VALUES(?,?)');
const findUser=(username)=>findStmt.get(username); const listDevices=()=>listStmt.all(); const addDevice=(d)=>{addStmt.run(d.id,d.name,d.ip,d.type,d.status);return d;}; const logAction=(u,a)=>logStmt.run(u||null,a); export {findUser,listDevices,addDevice,logAction,db};
