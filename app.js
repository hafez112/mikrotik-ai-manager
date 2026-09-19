const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const apiStatus = document.querySelector('#apiStatus');
const prompt = document.querySelector('#prompt');
const send = document.querySelector('#send');
const messages = document.querySelector('#messages');

navItems.forEach((item) => item.addEventListener('click', () => {
  navItems.forEach((button) => button.classList.remove('active'));
  item.classList.add('active');
  views.forEach((view) => view.classList.toggle('active', view.id === item.dataset.target));
}));

async function loadHealth() {
  try {
    const response = await fetch('/api/health');
    const health = await response.json();
    apiStatus.textContent = health.mode === 'routeros' ? 'RouterOS متصل' : 'الوضع التجريبي';
    apiStatus.className = `chip ${health.mode === 'routeros' ? 'success' : 'warning'}`;
  } catch { apiStatus.textContent = 'الخادم غير متصل'; }
}

async function askAI() {
  const question = prompt.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  prompt.value = '';
  const response = await fetch('/api/ai/analyze', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question }) });
  const data = await response.json();
  addMessage(data.answer || data.error, 'ai');
}

function addMessage(text, type) {
  const item = document.createElement('div');
  item.className = `message ${type}`;
  item.textContent = text;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

send?.addEventListener('click', askAI);
prompt?.addEventListener('keydown', (event) => event.key === 'Enter' && askAI());
loadHealth();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(console.error);
