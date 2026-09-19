const $ = (selector) => document.querySelector(selector);
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const storedApi = localStorage.getItem('apiBaseUrl') || document.querySelector('meta[name="api-base-url"]')?.content || '';
const apiBase = () => (localStorage.getItem('apiBaseUrl') || storedApi).replace(/\/$/, '');
const token = () => localStorage.getItem('token') || '';

function setView(id) { navItems.forEach((b) => b.classList.toggle('active', b.dataset.target === id)); views.forEach((v) => v.classList.toggle('active', v.id === id)); }
navItems.forEach((button) => button.addEventListener('click', () => setView(button.dataset.target)));

async function api(path, options = {}) {
  const headers = { ...(options.body ? { 'content-type': 'application/json' } : {}), ...(token() ? { authorization: `Bearer ${token()}` } : {}), ...(options.headers || {}) };
  const response = await fetch(`${apiBase()}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

async function login() {
  if (token()) return;
  const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username: 'admin', password: 'admin123' }) });
  if (data.token) localStorage.setItem('token', data.token);
}

async function loadData() {
  try {
    const health = await api('/api/health');
    $('#apiStatus').textContent = health.mode === 'routeros' ? 'RouterOS' : 'تجريبي';
    $('#apiStatus').className = `chip ${health.mode === 'routeros' ? 'success' : 'warning'}`;
    $('#cpuValue').textContent = `${health.cpuLoad ?? '—'}%`;
    const devices = (await api('/api/devices')).data || [];
    $('#deviceCount').textContent = devices.length;
    $('#deviceList').innerHTML = devices.map((d) => `<li>🟢 ${escapeHtml(d.name)} <span>${escapeHtml(d.ip)}</span></li>`).join('');
    $('#devicesTable').innerHTML = devices.map((d) => `<tr><td>${escapeHtml(d.name)}</td><td>${escapeHtml(d.type)}</td><td>${escapeHtml(d.ip)}</td><td>${escapeHtml(d.status)}</td><td>${d.cpu ?? '—'}%</td></tr>`).join('');
    const network = (await api('/api/network')).data;
    $('#networkCards').innerHTML = network.segments.map((n) => `<article><small>${escapeHtml(n.name)}</small><strong>${escapeHtml(n.subnet)}</strong></article>`).join('');
  } catch (error) { $('#apiStatus').textContent = 'غير متصل'; $('#apiStatus').className = 'chip warning'; console.error(error); }
}
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }
function addMessage(text, type) { const node = document.createElement('div'); node.className = `message ${type}`; node.textContent = text; $('#messages').appendChild(node); node.scrollIntoView({ behavior: 'smooth' }); }
async function askAI() { const input = $('#prompt'); const question = input.value.trim(); if (!question) return; addMessage(question, 'user'); input.value = ''; try { const data = await api('/api/ai/analyze', { method: 'POST', body: JSON.stringify({ question }) }); addMessage(data.answer, 'ai'); } catch (e) { addMessage(e.message, 'ai'); } }
$('#send')?.addEventListener('click', askAI); $('#prompt')?.addEventListener('keydown', (e) => e.key === 'Enter' && askAI()); $('#refreshBtn')?.addEventListener('click', loadData); $('#loadDevicesBtn')?.addEventListener('click', loadData); $('#addDeviceBtn')?.addEventListener('click', () => alert('أضف الجهاز عبر API: POST /api/devices'));
$('#saveApi')?.addEventListener('click', () => { const value = $('#apiUrl').value.trim().replace(/\/$/, ''); localStorage.setItem('apiBaseUrl', value); $('#settingsMessage').textContent = 'تم الحفظ. أعد تحميل التطبيق لاختبار الاتصال.'; });
$('#apiUrl').value = apiBase();
login().then(loadData).catch(loadData);
