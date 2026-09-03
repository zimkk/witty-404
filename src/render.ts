import { Joke } from './jokes';
import { escapeHtml } from './template';

export interface RenderOptions {
  theme?: string;
  isRoasted?: boolean;
}

/**
 * Converts simple markdown formatting (**bold**, *italic*, `code`) into safe HTML.
 */
function formatMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}

/**
 * Generates bespoke visual hero set pieces for key jokes.
 */
function getHeroVisualHtml(joke: Joke): string {
  switch (joke.id) {
    case 'plane-crash':
      return `
        <div class="hero-anim anim-plane-crash" aria-label="Plane crash flight animation">
          <div class="flight-trajectory">
            <div class="plane-flight-body">✈️</div>
            <div class="smoke-puff-trail s1">💨</div>
            <div class="smoke-puff-trail s2">💨</div>
            <div class="crash-explosion">💥</div>
            <div class="debris-particle dp1">⚙️</div>
            <div class="debris-particle dp2">📦</div>
            <div class="crash-404-stamp">404 CRASH</div>
          </div>
          <div class="impact-skid-line"></div>
        </div>
      `;

    case 'daves-laptop':
      return `
        <div class="hero-anim anim-daves-laptop" aria-label="Dave's abandoned laptop">
          <div class="laptop-shell">
            <div class="laptop-screen">
              <span class="prompt">dave@mbp:~$</span> <span class="cmd">npm run prod</span>
              <span class="cursor-blink">_</span>
            </div>
            <div class="dave-tag">Owner: Dave (left 6 mos ago)</div>
          </div>
        </div>
      `;

    case 'folder-structure':
      return `
        <div class="hero-anim anim-folder-structure" aria-label="Collapsing directory structure">
          <div class="folder-demolition">
            <div class="folder-block fb-1">📁 /src</div>
            <div class="folder-block fb-2">📁 /infrastructure/v2</div>
            <div class="folder-block fb-3">📁 /adapters/old</div>
            <div class="eta-tag">🏷️ Clean Architecture</div>
          </div>
        </div>
      `;

    case 'node-modules':
      return `
        <div class="hero-anim anim-node-modules" aria-label="Node modules disk overflow">
          <div class="progress-box">
            <div class="progress-label">
              <span>Resolving transitive dependencies...</span>
              <span class="pct-readout">99%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill"></div>
            </div>
            <div class="overflow-badge">⚠️ 4.8 GB (Disk Full)</div>
          </div>
        </div>
      `;

    case 'perfect-uptime':
      return `
        <div class="hero-anim anim-perfect-uptime" aria-label="Status page illusion">
          <div class="status-row">
            <div class="status-node node-ok"><span class="badge">🟢</span> API</div>
            <div class="status-node node-ok"><span class="badge">🟢</span> Auth</div>
            <div class="status-node node-failing"><span class="badge ok-icon">🟢</span><span class="badge fire-icon">🔥</span> Router</div>
            <div class="status-node node-ok"><span class="badge">🟢</span> CDN</div>
          </div>
          <div class="status-banner">99.999% UPTIME CLAIMED</div>
        </div>
      `;

    default:
      return '';
  }
}

export function renderHtmlPage(joke: Joke, options: RenderOptions = {}): string {
  const selectedTheme = options.theme || 'system';
  const formattedTitle = formatMarkdown(joke.title);
  const formattedSubtitle = formatMarkdown(joke.subtitle);
  const formattedFootnote = formatMarkdown(joke.footnote);
  const heroVisual = getHeroVisualHtml(joke);

  const logLinesHtml = joke.logs
    .map((line, idx) => {
      const isStatusLine = line.includes('status:') || line.includes('GREEN') || line.includes('PASS') || line.includes('RESOLVED');
      const isLast = idx === joke.logs.length - 1;
      const highlightClass = isStatusLine ? ' status-green' : isLast ? ' punch-line' : '';
      const delay = (0.15 + idx * 0.1).toFixed(2);
      return `<div class="log-line${highlightClass}" style="--line-delay: ${delay}s">${escapeHtml(line)}</div>`;
    })
    .join('');

  const cursorDelay = (0.15 + joke.logs.length * 0.1).toFixed(2);

  return `<!DOCTYPE html>
<html lang="en" data-theme="${escapeHtml(selectedTheme)}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 — ${escapeHtml(joke.title.split('\n')[0])}</title>
  <meta name="description" content="${escapeHtml(joke.subtitle.replace(/[*`_]/g, ''))}" />
  <meta property="og:title" content="404 — ${escapeHtml(joke.title.replace(/\n/g, ' '))}" />
  <meta property="og:description" content="${escapeHtml(joke.subtitle.replace(/[*`_]/g, ''))}" />
  <meta property="og:image" content="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="404 — ${escapeHtml(joke.title.replace(/\n/g, ' '))}" />
  <meta name="twitter:image" content="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #07090E;
      --card-bg: #0B0E14;
      --card-border: #1E2538;
      --text-main: #FFFFFF;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      --accent: #3B82F6;
      --danger: #EF4444;
      --success: #22C55E;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    [data-theme="light"] {
      --bg: #F8FAFC;
      --card-bg: #FFFFFF;
      --card-border: #E2E8F0;
      --text-main: #0F172A;
      --text-muted: #475569;
      --text-dim: #94A3B8;
      --accent: #2563EB;
    }

    [data-theme="matrix"] {
      --bg: #020B04;
      --card-bg: #051408;
      --card-border: #0F3816;
      --text-main: #4ADE80;
      --text-muted: #22C55E;
      --text-dim: #15803D;
      --accent: #10B981;
    }

    [data-theme="glitch"] {
      --bg: #090014;
      --card-bg: #130424;
      --card-border: #4C1D95;
      --text-main: #F43F5E;
      --text-muted: #E0E7FF;
      --text-dim: #818CF8;
      --accent: #06B6D4;
    }

    body {
      min-height: 100vh;
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
      display: flex;
      justify-content: center;
      padding: 3.5rem 1.5rem 3rem;
    }

    .container {
      width: 100%;
      max-width: 760px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    /* Top Badge */
    .badge-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 1.5rem;
      animation: fadeIn 0.3s ease forwards;
    }

    .http-404-badge {
      border: 1px solid var(--danger);
      color: var(--danger);
      font-family: var(--font-mono);
      font-size: 0.725rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-block;
    }

    .sparkle-icon {
      font-size: 1.25rem;
      opacity: 0.8;
      animation: sparkleFloat 2.5s infinite ease-in-out;
    }

    /* ==========================================================================
       HERO VISUAL SET PIECES (AIRPLANE CRASH & FRIENDS)
       ========================================================================== */
    .hero-container {
      width: 100%;
      margin-bottom: 1rem;
    }

    /* 1. Airplane Crash Flight Animation */
    .anim-plane-crash {
      width: 100%;
      height: 75px;
      position: relative;
      overflow: visible;
    }

    .flight-trajectory {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .plane-flight-body {
      position: absolute;
      font-size: 2.2rem;
      left: 0;
      top: 0;
      animation: planeFlightAndNosedive 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }

    @keyframes planeFlightAndNosedive {
      0% {
        transform: translate(0px, 0px) rotate(0deg);
        opacity: 0;
      }
      15% {
        opacity: 1;
        transform: translate(60px, -8px) rotate(-10deg);
      }
      50% {
        transform: translate(220px, 0px) rotate(5deg);
      }
      75% {
        transform: translate(320px, 20px) rotate(35deg);
      }
      100% {
        transform: translate(360px, 35px) rotate(65deg) scale(0.9);
        opacity: 0.9;
      }
    }

    .crash-explosion {
      position: absolute;
      font-size: 2.4rem;
      left: 360px;
      top: 25px;
      opacity: 0;
      animation: explosionBoom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.2s forwards;
    }

    @keyframes explosionBoom {
      0% { transform: scale(0.2); opacity: 0; }
      60% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    .smoke-puff-trail {
      position: absolute;
      font-size: 1.4rem;
      opacity: 0;
    }
    .smoke-puff-trail.s1 {
      left: 200px;
      top: 5px;
      animation: smokeFade 1s ease 0.8s forwards;
    }
    .smoke-puff-trail.s2 {
      left: 280px;
      top: 18px;
      animation: smokeFade 1s ease 1.0s forwards;
    }

    @keyframes smokeFade {
      0% { opacity: 0; transform: scale(0.5); }
      50% { opacity: 0.7; transform: scale(1.1) translateY(-5px); }
      100% { opacity: 0; transform: scale(1.5) translateY(-12px); }
    }

    .debris-particle {
      position: absolute;
      font-size: 1.1rem;
      opacity: 0;
    }
    .debris-particle.dp1 {
      left: 350px;
      top: 20px;
      animation: debrisFly1 0.6s ease-out 1.25s forwards;
    }
    .debris-particle.dp2 {
      left: 375px;
      top: 30px;
      animation: debrisFly2 0.6s ease-out 1.25s forwards;
    }

    @keyframes debrisFly1 {
      0% { opacity: 0; transform: translate(0, 0) rotate(0deg); }
      100% { opacity: 1; transform: translate(-30px, -20px) rotate(-90deg); }
    }
    @keyframes debrisFly2 {
      0% { opacity: 0; transform: translate(0, 0) rotate(0deg); }
      100% { opacity: 1; transform: translate(35px, -15px) rotate(120deg); }
    }

    .crash-404-stamp {
      position: absolute;
      left: 410px;
      top: 20px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid #EF4444;
      color: #EF4444;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 900;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      letter-spacing: 0.08em;
      opacity: 0;
      animation: stampBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.35s forwards;
    }

    @keyframes stampBounce {
      0% { opacity: 0; transform: scale(2) rotate(-15deg); }
      100% { opacity: 1; transform: scale(1) rotate(-6deg); }
    }

    .impact-skid-line {
      position: absolute;
      bottom: 0;
      left: 80px;
      width: 300px;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.4), transparent);
      opacity: 0;
      animation: fadeIn 0.4s ease 1.2s forwards;
    }

    /* 2. Dave's Laptop */
    .anim-daves-laptop {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-family: var(--font-mono);
      display: inline-flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .laptop-screen {
      font-size: 0.8rem;
      color: #38BDF8;
    }
    .dave-tag {
      font-size: 0.7rem;
      color: var(--text-dim);
    }

    /* 3. Folder Demolition */
    .anim-folder-structure {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #FCD34D;
    }
    .folder-block {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--card-border);
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
    }
    .eta-tag {
      color: #34D399;
      margin-left: auto;
    }

    /* 4. Node Modules Overflow */
    .anim-node-modules {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
    }
    .progress-box {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }
    .progress-track {
      height: 8px;
      background: #1E2538;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #F59E0B, #EF4444);
      width: 99%;
      animation: expandFill 1.2s ease-out;
    }
    @keyframes expandFill {
      0% { width: 0%; }
      100% { width: 99%; }
    }
    .overflow-badge {
      color: #EF4444;
      font-weight: 700;
      text-align: right;
    }

    /* 5. Perfect Uptime */
    .anim-perfect-uptime {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 0.6rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }
    .status-row {
      display: flex;
      gap: 1rem;
    }
    .node-failing {
      color: #EF4444;
      font-weight: 700;
    }
    .status-banner {
      color: #34D399;
      font-weight: 700;
    }

    /* Main Headline & Subtitle */
    h1.hero-title {
      font-size: clamp(2.2rem, 5.5vw, 3.6rem);
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.12;
      letter-spacing: -0.035em;
      margin-bottom: 1.25rem;
      animation: fadeIn 0.4s ease 0.05s both;
    }

    h1.hero-title code {
      font-family: var(--font-mono);
      font-size: 0.9em;
      font-weight: 700;
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.08);
      padding: 0.1em 0.35em;
      border-radius: 6px;
    }

    p.hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.15rem);
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 2rem;
      max-width: 680px;
      animation: fadeIn 0.4s ease 0.1s both;
    }

    /* Diagnostic Terminal Card */
    .diagnostic-terminal {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 2rem;
      box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5);
      animation: terminalPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
    }

    .terminal-bar {
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--card-border);
      padding: 0.65rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.85rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
    }

    .mac-dots {
      display: flex;
      gap: 6px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot.red { background: #EF4444; }
    .dot.yellow { background: #F59E0B; }
    .dot.green { background: #10B981; }

    .terminal-body {
      padding: 1.25rem 1.5rem;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      overflow-x: auto;
    }

    .log-line {
      color: var(--text-muted);
      line-height: 1.55;
      white-space: pre-wrap;
      opacity: 0;
      transform: translateY(3px);
      animation: logLineIn 0.35s ease forwards;
      animation-delay: var(--line-delay, 0s);
    }

    .log-line.status-green {
      color: var(--success);
      font-weight: 700;
    }

    .log-line.punch-line {
      color: #38BDF8;
      font-weight: 600;
    }

    .cursor-line {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--text-dim);
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }

    .cursor-prompt {
      color: #38BDF8;
      animation: blinkCursor 1s infinite;
      font-size: 0.8em;
    }

    /* Action Buttons Row */
    .buttons-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
      animation: fadeIn 0.4s ease 0.3s both;
    }

    .btn-abort {
      background: transparent;
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.7rem 1.25rem;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      text-decoration: none;
      transition: all 0.15s;
    }

    .btn-abort:hover {
      border-color: #3B82F6;
      color: var(--text-main);
    }

    .btn-primary-read {
      background: #FFFFFF;
      color: #000000;
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.7rem 1.4rem;
      border-radius: 6px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      border: none;
      transition: filter 0.15s;
    }

    .btn-primary-read:hover {
      filter: brightness(0.9);
      color: #000000;
      text-decoration: none;
    }

    /* Fine Print Footnote */
    .fine-print {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      line-height: 1.6;
      margin-top: 1rem;
      animation: fadeIn 0.4s ease 0.4s both;
    }

    .fine-print code {
      font-family: var(--font-mono);
      background: rgba(255, 255, 255, 0.06);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: var(--text-muted);
    }

    /* Keyframe Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes terminalPop {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes logLineIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes blinkCursor {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    @keyframes sparkleFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-3px) rotate(8deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }

    @media (max-width: 600px) {
      body { padding: 2.5rem 1rem 2rem; }
      .buttons-row { width: 100%; flex-direction: column; align-items: stretch; }
      .btn-abort, .btn-primary-read { justify-content: center; width: 100%; }
      .flight-trajectory { transform: scale(0.75); transform-origin: left top; }
    }
  </style>
</head>
<body>

  <main class="container">
    <!-- Top Header -->
    <div class="badge-row">
      <span class="http-404-badge">HTTP 404</span>
      <span class="sparkle-icon">💥</span>
    </div>

    <!-- Hero Visual Set Piece (Airplane Crash, etc.) -->
    ${heroVisual ? `<div class="hero-container">${heroVisual}</div>` : ''}

    <!-- Main Title -->
    <h1 class="hero-title">${formattedTitle}</h1>

    <!-- Dev Subtitle -->
    <p class="hero-subtitle">${formattedSubtitle}</p>

    <!-- Diagnostic Terminal Box -->
    <div class="diagnostic-terminal">
      <div class="terminal-bar">
        <div class="mac-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <span>diagnostic.sh — not-found-investigation</span>
      </div>
      <div class="terminal-body">
        ${logLinesHtml}
        <div class="log-line cursor-line" style="--line-delay: ${cursorDelay}s">
          <span>&gt; </span><span class="cursor-prompt">█</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="buttons-row">
      <button type="button" class="btn-abort" onclick="loadAnotherJoke()">
        ← Abort mission
      </button>
      <a href="/demo" class="btn-primary-read">
        Read things that exist ↗
      </a>
      <button type="button" class="btn-abort" onclick="copyLogs()" id="btn-copy">
        📋 Copy logs
      </button>
    </div>

    <!-- Footnote Fine Print -->
    <footer class="fine-print">
      ${formattedFootnote} • joke: <code>${escapeHtml(joke.id)}</code>
    </footer>
  </main>

  <script>
    const logs = ${JSON.stringify(joke.logs)};

    function copyLogs() {
      navigator.clipboard.writeText(logs.join('\\n')).then(() => {
        const btn = document.getElementById('btn-copy');
        if (btn) {
          const original = btn.innerText;
          btn.innerText = '✅ Copied!';
          setTimeout(() => { btn.innerText = original; }, 2000);
        }
      });
    }

    function loadAnotherJoke() {
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      url.searchParams.set('_r', Math.random().toString(36).substring(2, 8));
      window.location.href = url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '');
    }
  </script>
</body>
</html>`;
}
