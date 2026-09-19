const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const installButton = document.getElementById('installBtn');
const promptInput = document.getElementById('promptInput');
const sendPrompt = document.getElementById('sendPrompt');
const messagesEl = document.getElementById('messages');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((btn) => btn.classList.remove('active'));
    item.classList.add('active');

    const target = item.dataset.target;
    views.forEach((view) => {
      view.classList.toggle('active', view.id === target);
    });
  });
});

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'inline-flex';
});

installButton?.addEventListener('click', async () => {
  if (!deferredPrompt) {
    installButton.textContent = 'التطبيق مثبت بالفعل';
    return;
  }

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installButton.style.display = 'none';
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}

const appendMessage = (text, from = 'ai') => {
  const entry = document.createElement('div');
  entry.className = `message ${from === 'user' ? 'user-msg' : 'ai-msg'}`;

  if (from === 'ai') {
    const icon = document.createElement('span');
    icon.className = 'avatar tiny';
    icon.textContent = 'AI';
    entry.appendChild(icon);
  }

  const textNode = document.createElement('p');
  textNode.textContent = text;
  entry.appendChild(textNode);
  messagesEl.appendChild(entry);
  messagesEl.scrollTop = messagesEl.scrollHeight;
};

sendPrompt?.addEventListener('click', () => {
  const value = promptInput.value.trim();
  if (!value) return;

  appendMessage(value, 'user');
  promptInput.value = '';

  const response = generateAIResponse(value);
  setTimeout(() => appendMessage(response, 'ai'), 300);
});

promptInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendPrompt.click();
  }
});

function generateAIResponse(input) {
  const text = input.toLowerCase();

  if (text.includes('حمل') || text.includes('تحميل') || text.includes('حركة')) {
    return 'لا توجد مؤشرات على حمل غير طبيعي حاليًا، لكن استخدام VLAN-Office في المدى التالي قد يرتفع بنسبة 15% خلال الساعات الثلاث القادمة.';
  }

  if (text.includes('أمان') || text.includes('firewall') || text.includes('حظر')) {
    return 'قاعدة FireWall الحالية في وضع آمن، و3 عناوين تم حظرها تلقائيًا خلال آخر 24 ساعة. يوصى بمراجعة القاعدة 304 وتحديث قائمة الحظر.';
  }

  if (text.includes('qos') || text.includes('جودة') || text.includes('السرعة')) {
    return 'يُوصى بفرض QoS على قاعدة VoIP وStreaming، مع تخصيص 35% من النطاق لطبقة الاتصال الصوتية و25% للاتصالات الداخلية.';
  }

  if (text.includes('vpn') || text.includes('الفرع')) {
    return 'إشارة VPN إلى فرع الشمال مستقرة، مع زمن تأخير 18ms ومتوسط فقد إشارة 0.4% فقط.';
  }

  return 'تمت مراجعة البنية الحالية. الشبكة مستقرة، والأولوية التالية هي تحسين QoS وتحديث قاعدة الحظر لمنع محاولات الوصول غير المصرح.';
}

const now = new Date();
const monthName = now.toLocaleDateString('ar-SA', { month: 'long' });
document.title = `MikroTik AI Manager | ${monthName} ${now.getFullYear()}`;
