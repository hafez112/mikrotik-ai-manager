:root {
  --bg: #07111d;
  --panel: rgba(13, 22, 35, 0.9);
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

button {
  font: inherit;
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
  cursor: pointer;
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
.stat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
  padding: 8px 10px;
}

.topbar h2 {
  margin: 6px 0 0;
  font-size: clamp(1.5rem, 2vw, 2.3rem);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.secondary-btn,
.ghost-btn {
  border: 1px solid rgba(124, 167, 255, 0.25);
  background: rgba(124, 167, 255, 0.08);
  color: var(--text);
  border-radius: 12px;
  padding: 11px 16px;
  cursor: pointer;
}

.ghost-btn {
  background: transparent;
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

.user-pill strong,
.user-pill small {
  display: block;
}

.user-pill small {
  color: var(--muted);
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

.panel-head h3 {
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
.event-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.device-row,
.event-list li {
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
.event-list strong {
  display: block;
}

.device-info small,
.event-list small {
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

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(190px, 1fr));
  }

  .content-grid {
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

  .topbar {
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
}
