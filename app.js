const $ = (selector) => document.querySelector(selector);
const navItems = document.querySelectorAll('[data-target]');
const views = document.querySelectorAll('.view');
const configuredApi = document.querySelector('meta[name="api-base-url"]')?.content || '';
const apiBase = () => (localStorage.getItem('apiBaseUrl') || configuredApi || '').replace(/\/$/, '');
const getToken = () => localStorage.getItem('token') || '';

function vibrate() { window.Capacitor?.Plugins?.Haptics?.impact({ style: 'LIGHT' }).catch?.(() => {}); }
function setView(id) { navItems.forEach((item) => item.classList.toggle('active', item.dataset.target === id)); views.forEach((view) => view.classList.toggle('active', view.id === id)); vibrate(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
navItems.forEach((item) => item.addEventListener('click', () => setView(item.dataset.target)));

async function api(path, options = {}) {
  const headers = { ...(options.body ? { 'content-type': 'application/json' } : {}), ...(getToken() ? { authorization: `Bearer ${getToken()}` } : {}), ...(options.headers || {}) };
  const response = await fetch(`${apiBase()}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}
async function login() { if (getToken()) return; const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username: 'admin', password: 'admin123' }) }); if (data.token) localStorage.setItem('token', data.token); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }
async function loadData() { try { const health = await api('/api/health'); $('#apiStatus').textContent = health.mode === 'routeros' ? 'RouterOS' : 'تجريبي'; $('#apiStatus').className = `chip ${health.mode === 'routeros' ? 'success' : 'warning'}`; $('#cpuValue').textContent = `${health.cpuLoad ?? '—'}%`; const result = await api('/api/devices'); const devices = result.data || []; $('#deviceSource').textContent = result.source || 'demo'; $('#deviceCount').textContent = devices.length; $('#deviceList').innerHTML = devices.map((d) => `<li><b class="dot ${d.status}"></b>${escapeHtml(d.name)}<span>${escapeHtml(d.ip)}</span></li>`).join(''); $('#devicesTable').innerHTML = devices.map((d) => `<tr><td>${escapeHtml(d.name)}</td><td>${escapeHtml(d.type)}</td><td dir="ltr">${escapeHtml(d.ip)}</td><td>${escapeHtml(d.status)}</td><td>${d.cpu ?? '—'}%</td></tr>`).join(''); const network = (await api('/api/network')).data; $('#networkCards').innerHTML = network.segments.map((n) => `<article><small>${escapeHtml(n.name)}</small><strong dir="ltr">${escapeHtml(n.subnet)}</strong></article>`).join(''); } catch (error) { $('#apiStatus').textContent = 'غير متصل'; $('#apiStatus').className = 'chip warning'; console.error(error); } }
function addMessage(text, type) { const node = document.createElement('div'); node.className = `message ${type}`; node.textContent = text; $('#messages').appendChild(node); node.scrollIntoView({ behavior: 'smooth' }); }
async function askAI() { const input = $('#prompt'); const question = input.value.trim(); if (!question) return; addMessage(question, 'user'); input.value = ''; try { const data = await api('/api/ai/analyze', { method: 'POST', body: JSON.stringify({ question }) }); addMessage(data.answer, 'ai'); } catch (error) { addMessage(error.message, 'ai'); } }
$('#send')?.addEventListener('click', askAI); $('#prompt')?.addEventListener('keydown', (e) => e.key === 'Enter' && askAI()); $('#refreshBtn')?.addEventListener('click', loadData); $('#loadDevicesBtn')?.addEventListener('click', loadData); $('#addDeviceBtn')?.addEventListener('click', () => { setView('devices'); vibrate(); }); $('.text-btn')?.addEventListener('click', () => setView('devices')); $('#saveApi')?.addEventListener('click', async () => { const value = $('#apiUrl').value.trim().replace(/\/$/, ''); localStorage.setItem('apiBaseUrl', value); try { await api('/api/health'); $('#settingsMessage').textContent = 'تم الحفظ والاتصال بالخادم بنجاح.'; loadData(); } catch { $('#settingsMessage').textContent = 'تم الحفظ، لكن تعذر الوصول إلى الخادم.'; } }); $('#apiUrl').value = apiBase();
window.Capacitor?.Plugins?.StatusBar?.setBackgroundColor?.({ color: '#07111d' });
login().then(loadData).catch(loadData);
