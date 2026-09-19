import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const storeDir = join(root, 'data');
const storeFile = join(storeDir, 'store.json');

const defaultState = {
  users: [
    {
      id: 'admin',
      username: 'admin',
      name: 'مدير النظام',
      role: 'admin',
      passwordHash: 'admin123'
    }
  ],
  settings: {
    routerUrl: process.env.MIKROTIK_URL || '',
    routerUser: process.env.MIKROTIK_USER || '',
    routerPassword: process.env.MIKROTIK_PASSWORD || ''
  }
};

async function initStore() {
  await mkdir(storeDir, { recursive: true });
  try {
    await readFile(storeFile, 'utf8');
  } catch {
    await writeFile(storeFile, JSON.stringify(defaultState, null, 2), 'utf8');
  }
}

async function readStore() {
  const raw = await readFile(storeFile, 'utf8');
  return JSON.parse(raw || '{}');
}

async function saveStore(state) {
  await writeFile(storeFile, JSON.stringify(state, null, 2), 'utf8');
}

export { initStore, readStore, saveStore, defaultState };
