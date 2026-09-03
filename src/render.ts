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

export function renderHtmlPage(joke: Joke, options: RenderOptions = {}): string {
  const selectedTheme = options.theme || 'system';
  const formattedTitle = formatMarkdown(joke.title);
  const formattedSubtitle = formatMarkdown(joke.subtitle);
  const formattedFootnote = formatMarkdown(joke.footnote);

  const logLinesHtml = joke.logs
    .map((line, idx) => {
      const isStatusLine = line.includes('status:') || line.includes('GREEN') || line.includes('PASS') || line.includes('RESOLVED');
      const isLast = idx === joke.logs.length - 1;
      const highlightClass = isStatusLine ? ' status-green' : isLast ? ' punch-line' : '';
      return `<div class="log-line${highlightClass}">${escapeHtml(line)}</div>`;
    })
    .join('');

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
      padding: 4rem 1.5rem 3rem;
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
      margin-bottom: 2rem;
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
    }

    /* Main Headline & Subtitle */
    h1.hero-title {
      font-size: clamp(2.2rem, 5.5vw, 3.6rem);
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.12;
      letter-spacing: -0.035em;
      margin-bottom: 1.25rem;
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
    }

    .log-line.status-green {
      color: var(--success);
      font-weight: 700;
    }

    .log-line.punch-line {
      color: #38BDF8;
    }

    /* Action Buttons Row */
    .buttons-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
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
    }

    .fine-print code {
      font-family: var(--font-mono);
      background: rgba(255, 255, 255, 0.06);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: var(--text-muted);
    }

    @media (max-width: 600px) {
      body { padding: 2.5rem 1rem 2rem; }
      .buttons-row { width: 100%; flex-direction: column; align-items: stretch; }
      .btn-abort, .btn-primary-read { justify-content: center; width: 100%; }
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
