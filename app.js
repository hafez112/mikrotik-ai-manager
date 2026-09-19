:root {
  --bg: #07111d;
  --panel: rgba(13, 22, 35, 0.8);
  --panel-soft: rgba(18, 28, 44, 0.9);
  --panel-alt: rgba(23, 34, 54, 0.8);
  --line: rgba(147, 178, 214, 0.18);
  --text: #ebf4ff;
  --muted: #8ea9c8;
  --primary: #2ce6c1;
  --primary-strong: #16c9a6;
  --accent: #7ca7ff;
  --warning: #ffbf69;
  --danger: #ff6b7a;
  --success: #66e6a6;
  --shadow: 0 18px 42px rgba(8, 13, 24, 0.45);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top right, rgba(44, 230, 193, 0.14), transparent 32%),
    linear-gradient(160deg, #081320 0%, #0a1426 55%, #101c2d 100%);
  color: var(--text);
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  max-width: 1500px;
  margin: 0 auto;
  padding: 18px;
  gap: 18px;
}

.sidebar,
.panel,
.stat-card,
.sidebar-card {
  background: rgba(12, 20, 31, 0.75);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  border-radius: 22px;
  backdrop-filter: blur(10px);
}

.sidebar {
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(44, 230, 193, 0.22), rgba(124, 167, 255, 0.2));
  border: 1px solid rgba(44, 230, 193, 0.45);
  color: var(--primary);
  font-weight: 800;
  font-size: 1.2rem;
}

.eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.muted {
  color: var(--muted);
}

.brand h1 {
  margin: 6px 0 0;
  font-size: 1.35rem;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px;
  border-radius: 14px;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  background: linear-gradient(90deg, rgba(44, 230, 193, 0.12), rgba(124, 167, 255, 0.08));
  border-color: rgba(44, 230, 193, 0.2);
}

.nav-item i {
  color: var(--primary);
  opacity: 0.9;
}

.sidebar-card {
  margin-top: auto;
  padding: 18px 16px;
}

.card-head,
.panel-head,
.stat-head,
.page-header,
.topbar,
.table-toolbar,
.chat-header,
.composer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pill,
.chip,
.status-badge,
.pill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
}

.pill {
  padding: 6px 10px;
}

.pill.online {
  background: rgba(102, 230, 166, 0.12);
  color: var(--success);
}

.metric-block {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-block strong {
  font-size: 2rem;
}

.metric-block small {
  color: var(--muted);
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 64px;
  margin-top: 16px;
}

.bars span {
  flex: 1;
  height: var(--h);
  min-height: 15%;
  background: linear-gradient(180deg, rgba(44, 230, 193, 0.9), rgba(124, 167, 255, 0.4));
  border-radius: 999px 999px 0 0;
  opacity: 0.85;
}

.main-panel {
  padding: 6px 6px 18px;
}

.topbar {
  margin-bottom: 22px;
  padding: 8px 10px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 14px;
  color: var(--muted);
}

.search-box input {
  background: transparent;
  border: none;
  width: 100%;
  color: var(--text);
  outline: none;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.secondary-btn,
.ghost-btn,
.quick-btn,
.mini-actions button,
.pill-btn {
  border: 1px solid rgba(124, 167, 255, 0.25);
  background: rgba(124, 167, 255, 0.08);
  color: var(--text);
  border-radius: 12px;
  padding: 11px 16px;
}

.ghost-btn {
  background: transparent;
}

.small {
  padding: 8px 12px;
  font-size: 0.8rem;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid var(--line);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #06131d;
}

.avatar.tiny {
  width: 26px;
  height: 26px;
  font-size: 0.62rem;
}

.user-pill strong,
.user-pill small {
  display: block;
}

.user-pill small {
  color: var(--muted);
}

.view {
  display: none;
}

.view.active {
  display: block;
}

.page-header {
  margin: 8px 0 18px;
}

.page-header h2 {
  margin: 8px 0 0;
  font-size: clamp(1.6rem, 2vw, 2.3rem);
}

.chip-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 12px;
}

.chip.success {
  background: rgba(102, 230, 166, 0.1);
  color: var(--success);
}

.chip.warning {
  background: rgba(255, 191, 105, 0.1);
  color: var(--warning);
}

.chip.neutral {
  background: rgba(124, 167, 255, 0.1);
  color: var(--accent);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 18px;
}

.stat-card {
  padding: 18px 18px 16px;
}

.stat-card.accent { border-color: rgba(44, 230, 193, 0.24); }
.stat-card.success { border-color: rgba(102, 230, 166, 0.24); }
.stat-card.warning { border-color: rgba(255, 191, 105, 0.24); }
.stat-card.info { border-color: rgba(124, 167, 255, 0.24); }

.stat-card strong {
  display: block;
  font-size: clamp(1.7rem, 2vw, 2.2rem);
  margin: 18px 0 6px;
}

.stat-card small {
  color: var(--muted);
}

.stat-head i {
  color: var(--primary);
  font-style: normal;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.panel {
  padding: 18px 18px 16px;
}

.panel-head {
  margin-bottom: 16px;
}

.panel-head h3,
.panel h3 {
  margin: 6px 0 0;
  font-size: 1.15rem;
}

.compact {
  margin-bottom: 12px;
}

.span-2 {
  grid-column: span 2;
}

.chart-wrap {
  position: relative;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(16, 24, 36, 0.8), rgba(11, 17, 29, 0.8));
  border: 1px solid rgba(147, 178, 214, 0.12);
}

.chart-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 36px 36px;
}

.chart-wrap svg {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  color: var(--muted);
  font-size: 0.76rem;
}

.insight-box {
  display: grid;
  gap: 12px;
}

.bubble {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
}

.bubble span {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-weight: 700;
}

.bubble strong,
.bubble small {
  display: block;
}

.bubble small {
  margin-top: 5px;
  color: var(--muted);
}

.bubble.green span {
  background: rgba(102, 230, 166, 0.12);
  color: var(--success);
}

.bubble.blue span {
  background: rgba(124, 167, 255, 0.12);
  color: var(--accent);
}

.device-list,
.event-list,
.net-list,
.policy-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.device-row,
.event-list li,
.net-list li,
.policy-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 10px;
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(147, 178, 214, 0.08);
}

.device-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.device-info strong,
.event-list strong,
.net-list strong,
.policy-list strong {
  display: block;
}

.device-info small,
.event-list small,
.net-list span,
.policy-list span {
  color: var(--muted);
}

.dot {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 12px rgba(102, 230, 166, 0.8);
}

.dot.warning { background: var(--warning); box-shadow: 0 0 12px rgba(255, 191, 105, 0.8); }
.dot.offline { background: var(--danger); box-shadow: 0 0 12px rgba(255, 107, 122, 0.8); }

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
}

.tag.healthy {
  background: rgba(102, 230, 166, 0.12);
  color: var(--success);
}

.tag.warn {
  background: rgba(255, 191, 105, 0.12);
  color: var(--warning);
}

.tag.off {
  background: rgba(255, 107, 122, 0.12);
  color: var(--danger);
}

.event-list li {
  justify-content: flex-start;
  align-items: flex-start;
}

.event-time {
  min-width: 48px;
  color: var(--muted);
  font-size: 0.75rem;
  padding-top: 3px;
}

.table-panel {
  overflow: hidden;
}

.table-toolbar {
  margin-bottom: 14px;
}

.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill-btn {
  background: rgba(255, 255, 255, 0.02);
  padding: 8px 14px;
}

.pill-btn.active {
  background: rgba(44, 230, 193, 0.12);
  color: var(--primary);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
}

th,
td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(147, 178, 214, 0.08);
}

thead th {
  color: var(--muted);
  font-weight: 600;
  font-size: 0.8rem;
}

tbody td {
  color: var(--text);
}

.network-grid,
.security-grid,
.report-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-panel {
  grid-column: span 1;
}

.mini-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.mini-actions button,
.quick-btn {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--line);
  width: 100%;
  padding: 12px 10px;
}

.danger-list strong {
  color: #ffd1d8;
}

.report-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stat-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mini-label {
  color: var(--muted);
  font-size: 0.8rem;
}

.stat-panel strong {
  font-size: 2rem;
}

.stat-panel small {
  color: var(--muted);
}

.assistant-layout {
  display: grid;
  grid-template-columns: 2.1fr 0.9fr;
  gap: 18px;
}

.chat-panel {
  padding-bottom: 12px;
}

.chat-header {
  margin-bottom: 18px;
}

.status-badge {
  background: rgba(102, 230, 166, 0.12);
  color: var(--success);
  padding: 7px 10px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 260px;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 82%;
}

.message p {
  margin: 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(147, 178, 214, 0.1);
  padding: 12px 14px;
  border-radius: 14px;
  line-height: 1.6;
}

.message.user-msg {
  align-self: flex-end;
}

.message.user-msg p {
  background: rgba(44, 230, 193, 0.08);
  border-color: rgba(44, 230, 193, 0.2);
}

.composer {
  margin-top: 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 10px 12px;
}

.composer input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  outline: none;
  padding: 10px 2px;
}

.composer button {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #04151d;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 700;
}

.quick-actions {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(190px, 1fr));
  }

  .content-grid,
  .network-grid,
  .security-grid,
  .report-grid,
  .assistant-layout {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: auto;
  }
}

@media (max-width: 760px) {
  .app-shell {
    grid-template-columns: 1fr;
    padding: 14px;
  }

  .sidebar {
    padding: 18px 14px;
  }

  .main-panel {
    padding: 0;
  }

  .topbar,
  .page-header,
  .topbar-actions,
  .table-toolbar,
  .chat-header,
  .composer {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .search-box {
    width: 100%;
    min-width: auto;
  }

  .mini-actions {
    grid-template-columns: 1fr;
  }
}
