import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dataDir = join(root, 'data');
const dbPath = process.env.SQLITE_PATH || join(dataDir, 'mikrotik-ai.sqlite');

mkdirSync(dirname(dbPath), { recursive: true });
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'operator',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    ip TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'RouterOS',
    status TEXT NOT NULL DEFAULT 'offline',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    action TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  );
`);

const seedUser = db.prepare(`INSERT OR IGNORE INTO users (id, username, name, role, password_hash) VALUES (?, ?, ?, ?, ?)`);
seedUser.run('admin', 'admin', 'مدير النظام', 'admin', process.env.ADMIN_PASSWORD || 'admin123');

const queries = {
  users: db.prepare('SELECT id, username, name, role, password_hash AS passwordHash FROM users WHERE username = ?'),
  devices: db.prepare('SELECT id, name, ip, type, status, created_at AS createdAt FROM devices ORDER BY created_at DESC'),
  addDevice: db.prepare('INSERT INTO devices (id, name, ip, type, status) VALUES (?, ?, ?, ?, ?)'),
  audit: db.prepare('INSERT INTO audit_logs (user_id, action) VALUES (?, ?)')
};

export function findUser(username) { return queries.users.get(username); }
export function listDevices() { return queries.devices.all(); }
export function addDevice(device) {
  queries.addDevice.run(device.id, device.name, device.ip, device.type || 'RouterOS', device.status || 'offline');
  return device;
}
export function logAction(userId, action) { queries.audit.run(userId || null, action); }
export function databaseHealth() { return { engine: 'sqlite', path: dbPath, journalMode: 'WAL' }; }
export { db };
