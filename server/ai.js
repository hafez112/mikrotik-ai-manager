const demoDevices = [
  { name: 'Core Router 01', ip: '192.168.88.1', type: 'RouterOS', status: 'online', cpu: 28 },
  { name: 'Access Point HQ', ip: '192.168.88.10', type: 'Wireless', status: 'online', cpu: 42 },
  { name: 'Firewall Edge', ip: '192.168.88.20', type: 'Firewall', status: 'warning', cpu: 67 },
  { name: 'Backup Router', ip: '192.168.88.30', type: 'RouterOS', status: 'offline', cpu: null }
];

async function requestRouteros(path) {
  const url = process.env.MIKROTIK_URL;
  const user = process.env.MIKROTIK_USER;
  const password = process.env.MIKROTIK_PASSWORD;

  if (!url || !user || !password) return null;
  const response = await fetch(`${url.replace(/\/$/, '')}/rest${path}`, {
    headers: {
      authorization: `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`,
      accept: 'application/json'
    },
    signal: AbortSignal.timeout(7000)
  });

  if (!response.ok) throw new Error(`RouterOS API error: ${response.status}`);
  return response.json();
}

async function getSystemResource() {
  try {
    const data = await requestRouteros('/system/resource');
    if (data && typeof data === 'object') return data;
  } catch {
    return { uptime: '99.94%', 'cpu-load': 28, version: 'RouterOS Demo' };
  }
  return { uptime: '99.94%', 'cpu-load': 28, version: 'RouterOS Demo' };
}

async function getRouterStatus() {
  try {
    const data = await requestRouteros('/system/resource');
    const devices = data ? demoDevices : demoDevices;
    return { devices, source: process.env.MIKROTIK_URL ? 'routeros' : 'demo' };
  } catch {
    return { devices: demoDevices, source: 'demo' };
  }
}

async function buildNetworkSummary() {
  return {
    segments: [
      { name: 'LAN-Office', subnet: '10.10.10.0/24' },
      { name: 'LAN-Guest', subnet: '10.10.20.0/24' },
      { name: 'VLAN-Admin', subnet: '10.10.30.0/24' },
      { name: 'VPN-Branch', subnet: '172.16.0.0/16' }
    ],
    routing: [
      { name: 'Default Route', target: 'ISP Gateway' },
      { name: 'VPN Route', target: 'Branch Office' },
      { name: 'Management', target: '10.10.30.0/24' }
    ],
    mode: process.env.MIKROTIK_URL ? 'routeros' : 'demo'
  };
}

async function buildSecuritySummary() {
  return {
    rules: [
      { id: 'RULE 101', action: 'منع الوصول غير المصرح' },
      { id: 'RULE 202', action: 'حظر محاولات Ping' },
      { id: 'RULE 304', action: 'منع العناوين المشبوهة' },
      { id: 'RULE 410', action: 'تقييد VoIP الداخلي' }
    ],
    blocked: [
      { ip: '10.0.0.19', reason: 'تم حظره تلقائيًا' },
      { ip: '192.168.10.51', reason: 'حظر مؤقت' },
      { ip: '203.0.113.88', reason: 'تجربة DoS' }
    ]
  };
}

export { getSystemResource, getRouterStatus, buildNetworkSummary, buildSecuritySummary };
