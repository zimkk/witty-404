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
 * Generates custom hero visual set pieces based on joke id.
 */
function getHeroVisualHtml(joke: Joke): string {
  switch (joke.id) {
    case 'plane-crash':
      return `
        <div class="hero-anim anim-plane-crash" aria-label="Plane crash animation">
          <div class="plane-flight-path">
            <div class="plane-body">✈️</div>
            <div class="smoke-trail"></div>
            <div class="explosion-puff">💥</div>
            <div class="debris debris-1">⚙️</div>
            <div class="debris debris-2">🔩</div>
            <div class="debris debris-3">📦</div>
            <div class="dust-cloud">💨</div>
          </div>
          <div class="impact-ground"></div>
        </div>
      `;

    case 'daves-laptop':
      return `
        <div class="hero-anim anim-daves-laptop" aria-label="Dave's abandoned laptop">
          <div class="laptop-shell">
            <div class="laptop-screen">
              <div class="laptop-cli">
                <span class="prompt">dave@mbp:~$</span> <span class="cmd">npm run prod</span>
                <span class="cursor-blink">_</span>
              </div>
              <div class="dave-tag">Owner: Dave <span class="dave-subtext">(left the company 6 mos ago)</span></div>
              <div class="static-noise"></div>
            </div>
            <div class="laptop-base"></div>
          </div>
        </div>
      `;

    case 'folder-structure':
      return `
        <div class="hero-anim anim-folder-structure" aria-label="Collapsing directory structure">
          <div class="folder-demolition">
            <div class="folder-block fb-1">📁 /src</div>
            <div class="folder-block fb-2">📁 /infrastructure</div>
            <div class="folder-block fb-3">📁 /adapters</div>
            <div class="folder-block fb-4">📁 /v1/impl/</div>
            <div class="dust-particle dp-1">▫️</div>
            <div class="dust-particle dp-2">▫️</div>
            <div class="dust-particle dp-3">▫️</div>
            <div class="eta-tag">🏷️ ETA: Next Quarter</div>
          </div>
        </div>
      `;

    case 'node-modules':
      return `
        <div class="hero-anim anim-node-modules" aria-label="Node modules disk overflow">
          <div class="progress-box">
            <div class="progress-label">
              <span>Resolving transitive dependencies...</span>
              <span class="pct-readout">97%</span>
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
      return `
        <div class="hero-anim anim-generic" aria-label="404 Icon">
          <div class="generic-emoji">${joke.emoji}</div>
          <div class="comic-boom">404</div>
        </div>
      `;
  }
}

export function renderHtmlPage(joke: Joke, options: RenderOptions = {}): string {
  const selectedTheme = options.theme || 'system';
  const heroVisual = getHeroVisualHtml(joke);
  const formattedTitle = formatMarkdown(joke.title);
  const formattedSubtitle = formatMarkdown(joke.subtitle);
  const formattedFootnote = formatMarkdown(joke.footnote);

  const logLinesHtml = joke.logs
    .map((line, idx) => {
      const isPunchline = idx === joke.logs.length - 1;
      const delay = (0.3 + idx * 0.15).toFixed(2);
      const punchClass = isPunchline ? ' log-punchline' : '';
      return `<div class="terminal-line${punchClass}" style="--line-delay: ${delay}s">${escapeHtml(line)}</div>`;
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
  
  <style>
    /* ==========================================================================
       CSS RESET & TOKENS
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #0A0A0F;
      --card-bg: #12121A;
      --card-border: #242436;
      --text-main: #F3F4F6;
      --text-muted: #9CA3AF;
      --text-dim: #6B7280;
      --accent: #5B7FFF;
      --accent-glow: rgba(91, 127, 255, 0.25);
      --term-bg: #0B0B12;
      --term-border: #1E1E2E;
      --term-text: #93C5FD;
      --term-header: #191928;
      --scanline-opacity: 0.08;
      --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
      --ease-comic: cubic-bezier(0.36, 1.6, 0.6, 1);
    }

    /* Light Theme */
    [data-theme="light"] {
      --bg: #F8FAFC;
      --card-bg: #FFFFFF;
      --card-border: #E2E8F0;
      --text-main: #0F172A;
      --text-muted: #475569;
      --text-dim: #94A3B8;
      --accent: #2563EB;
      --accent-glow: rgba(37, 99, 235, 0.15);
      --term-bg: #F1F5F9;
      --term-border: #CBD5E1;
      --term-text: #1E40AF;
      --term-header: #E2E8F0;
      --scanline-opacity: 0.02;
    }

    /* Matrix Theme */
    [data-theme="matrix"] {
      --bg: #020B04;
      --card-bg: #051408;
      --card-border: #0F3816;
      --text-main: #4ADE80;
      --text-muted: #22C55E;
      --text-dim: #15803D;
      --accent: #10B981;
      --accent-glow: rgba(16, 185, 129, 0.35);
      --term-bg: #031005;
      --term-border: #0B290F;
      --term-text: #86EFAC;
      --term-header: #08230C;
      --scanline-opacity: 0.15;
    }

    /* Glitch Theme */
    [data-theme="glitch"] {
      --bg: #090014;
      --card-bg: #140424;
      --card-border: #4C1D95;
      --text-main: #F43F5E;
      --text-muted: #E0E7FF;
      --text-dim: #818CF8;
      --accent: #06B6D4;
      --accent-glow: rgba(244, 63, 94, 0.35);
      --term-bg: #0E021B;
      --term-border: #3B0764;
      --term-text: #22D3EE;
      --term-header: #2E0854;
      --scanline-opacity: 0.18;
    }

    /* System Theme fallback to OS preference */
    @media (prefers-color-scheme: light) {
      [data-theme="system"] {
        --bg: #F8FAFC;
        --card-bg: #FFFFFF;
        --card-border: #E2E8F0;
        --text-main: #0F172A;
        --text-muted: #475569;
        --text-dim: #94A3B8;
        --accent: #2563EB;
        --accent-glow: rgba(37, 99, 235, 0.15);
        --term-bg: #F1F5F9;
        --term-border: #CBD5E1;
        --term-text: #1E40AF;
        --term-header: #E2E8F0;
        --scanline-opacity: 0.02;
      }
    }

    /* ==========================================================================
       PAGE & CONTAINER LAYOUT (100% full-bleed / iframe friendly)
       ========================================================================== */
    html, body {
      width: 100%;
      min-height: 100vh;
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.5;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    /* CRT Scanline Overlay */
    .crt-overlay {
      pointer-events: none;
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      );
      background-size: 100% 4px;
      z-index: 999;
      opacity: var(--scanline-opacity);
    }

    /* Background Ambient Glow */
    .ambient-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
    }

    /* Main Container */
    .witty-wrapper {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 780px;
      padding: 1.5rem 1rem;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    /* Card Container */
    .witty-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 2rem;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--card-border);
      position: relative;
      overflow: hidden;
      animation: cardShake 0.6s var(--ease-comic) 0.6s;
    }

    /* Header / Meta bar */
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .badge-group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .status-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      background: var(--accent-glow);
      color: var(--accent);
      border: 1px solid var(--accent);
      letter-spacing: 0.05em;
    }

    .tag-pill {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-dim);
      border: 1px solid var(--card-border);
    }

    .brand-link {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.2s;
    }
    .brand-link:hover {
      color: var(--accent);
    }

    /* Hero Set Piece Container */
    .hero-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 110px;
      margin-bottom: 1rem;
    }

    /* Title & Subtitle */
    .joke-title {
      font-size: 1.85rem;
      font-weight: 800;
      line-height: 1.25;
      letter-spacing: -0.025em;
      color: var(--text-main);
      margin-bottom: 0.85rem;
    }

    .joke-subtitle {
      font-size: 1rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .joke-subtitle strong {
      color: var(--text-main);
    }
    .joke-subtitle code {
      font-family: var(--font-mono);
      font-size: 0.875em;
      padding: 0.15em 0.4em;
      background: var(--term-bg);
      border: 1px solid var(--term-border);
      border-radius: 4px;
      color: var(--accent);
    }

    /* ==========================================================================
       TERMINAL LOG WINDOW
       ========================================================================== */
    .terminal-box {
      background: var(--term-bg);
      border: 1px solid var(--term-border);
      border-radius: 12px;
      overflow: hidden;
      font-family: var(--font-mono);
      font-size: 0.825rem;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
      margin-bottom: 1.25rem;
    }

    .terminal-titlebar {
      background: var(--term-header);
      padding: 0.5rem 0.85rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--term-border);
    }

    .terminal-dots {
      display: flex;
      gap: 6px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot-red { background: #EF4444; }
    .dot-yellow { background: #F59E0B; }
    .dot-green { background: #10B981; }

    .terminal-title {
      font-size: 0.7rem;
      color: var(--text-dim);
      letter-spacing: 0.05em;
    }

    .terminal-body {
      padding: 1rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      max-height: 240px;
      overflow-y: auto;
    }

    .terminal-line {
      color: var(--term-text);
      opacity: 0;
      transform: translateY(4px);
      animation: lineTypeIn 0.25s ease-out forwards;
      animation-delay: var(--line-delay, 0.2s);
      word-break: break-word;
    }

    .terminal-line.log-punchline {
      color: var(--text-main);
      font-weight: 700;
      animation: lineTypeIn 0.25s ease-out forwards, flinchLog 0.35s var(--ease-comic) forwards;
      animation-delay: var(--line-delay, 0.2s), calc(var(--line-delay, 0.2s) + 0.1s);
    }

    /* Diagnostics Footnote */
    .joke-footnote {
      font-family: var(--font-mono);
      font-size: 0.775rem;
      color: var(--text-dim);
      padding-top: 0.75rem;
      border-top: 1px dashed var(--card-border);
    }
    .joke-footnote code {
      color: var(--text-muted);
    }

    /* Interactive Toolbar */
    .action-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding: 0 0.5rem;
    }

    .btn-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn {
      font-family: var(--font-sans);
      font-size: 0.825rem;
      font-weight: 600;
      padding: 0.45rem 0.85rem;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn:hover {
      background: var(--card-border);
      color: var(--text-main);
      border-color: var(--text-dim);
      transform: translateY(-1px);
    }
    .btn-primary {
      background: var(--accent);
      color: #FFFFFF;
      border-color: var(--accent);
    }
    .btn-primary:hover {
      filter: brightness(1.15);
      color: #FFFFFF;
    }

    /* ==========================================================================
       HERO SET PIECE ANIMATIONS (Pass 2 Polish)
       ========================================================================== */

    /* 1. Plane Crash */
    .anim-plane-crash {
      width: 100%;
      height: 100px;
      position: relative;
      overflow: hidden;
    }
    .plane-flight-path {
      position: absolute;
      top: 10px;
      left: 10%;
      font-size: 2.25rem;
      animation: planeCruise 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
    }
    .explosion-puff {
      position: absolute;
      right: -25px;
      top: -10px;
      font-size: 2rem;
      opacity: 0;
      transform: scale(0.2);
      animation: puffBoom 0.4s var(--ease-comic) 1.5s forwards;
    }
    .debris {
      position: absolute;
      font-size: 1.1rem;
      opacity: 0;
    }
    .debris-1 { animation: debrisFly1 0.7s var(--ease-comic) 1.6s forwards; }
    .debris-2 { animation: debrisFly2 0.8s var(--ease-comic) 1.65s forwards; }
    .debris-3 { animation: debrisFly3 0.9s var(--ease-comic) 1.7s forwards; }
    .dust-cloud {
      position: absolute;
      right: -10px;
      bottom: -5px;
      font-size: 1.4rem;
      opacity: 0;
      animation: dustPuff 0.6s ease-out 1.7s forwards;
    }

    @keyframes planeCruise {
      0% { transform: translate(-40px, -10px) rotate(-5deg); }
      40% { transform: translate(140px, 5px) rotate(5deg); }
      60% { transform: translate(240px, 35px) rotate(25deg); }
      75% { transform: translate(320px, 45px) rotate(45deg); }
      85% { transform: translate(350px, 40px) rotate(55deg); }
      100% { transform: translate(370px, 45px) rotate(60deg); }
    }
    @keyframes puffBoom {
      0% { opacity: 0; transform: scale(0.2); }
      50% { opacity: 1; transform: scale(1.6) rotate(15deg); }
      100% { opacity: 1; transform: scale(1.1) rotate(0deg); }
    }
    @keyframes debrisFly1 {
      0% { opacity: 1; transform: translate(0, 0); }
      100% { opacity: 1; transform: translate(-40px, -45px) rotate(-140deg); }
    }
    @keyframes debrisFly2 {
      0% { opacity: 1; transform: translate(0, 0); }
      100% { opacity: 1; transform: translate(45px, -35px) rotate(120deg); }
    }
    @keyframes debrisFly3 {
      0% { opacity: 1; transform: translate(0, 0); }
      100% { opacity: 1; transform: translate(15px, -60px) rotate(220deg); }
    }
    @keyframes dustPuff {
      0% { opacity: 0; transform: scale(0.5); }
      50% { opacity: 0.8; transform: scale(1.4); }
      100% { opacity: 0; transform: scale(1.8); }
    }

    /* 2. Dave's Laptop */
    .anim-daves-laptop {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 240px;
    }
    .laptop-shell {
      width: 200px;
      background: #1F2937;
      border: 2px solid #374151;
      border-radius: 8px 8px 0 0;
      padding: 8px;
      position: relative;
    }
    .laptop-screen {
      background: #000000;
      height: 70px;
      border-radius: 4px;
      padding: 6px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      position: relative;
      overflow: hidden;
    }
    .prompt { color: #10B981; }
    .cmd { color: #F3F4F6; }
    .cursor-blink {
      animation: blink 0.8s infinite;
      color: #10B981;
    }
    .dave-tag {
      margin-top: 10px;
      font-size: 0.6rem;
      color: #9CA3AF;
    }
    .dave-subtext {
      color: #EF4444;
      opacity: 0;
      animation: fadeIn 0.8s ease-in 1.4s forwards;
    }
    .laptop-base {
      width: 230px;
      height: 8px;
      background: #4B5563;
      border-radius: 0 0 6px 6px;
      margin-top: 2px;
    }

    /* 3. Folder Structure Demolition */
    .anim-folder-structure {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90px;
    }
    .folder-demolition {
      position: relative;
      width: 280px;
      height: 80px;
    }
    .folder-block {
      position: absolute;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 3px 8px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 4px;
      color: var(--accent);
    }
    .fb-1 { top: 0; left: 10px; }
    .fb-2 { top: 22px; left: 35px; animation: collapseCorner 1.2s var(--ease-comic) 0.6s forwards; }
    .fb-3 { top: 44px; left: 60px; animation: collapseFull 1.4s var(--ease-comic) 0.8s forwards; }
    .fb-4 { top: 44px; left: 150px; animation: collapseFull 1.5s var(--ease-comic) 1.0s forwards; }
    .eta-tag {
      position: absolute;
      top: -10px;
      right: 10px;
      background: #F59E0B;
      color: #000;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      opacity: 0;
      animation: flutterDown 0.8s var(--ease-comic) 1.6s forwards;
    }
    @keyframes collapseCorner {
      0% { transform: rotate(0deg); }
      100% { transform: translate(15px, 25px) rotate(22deg); }
    }
    @keyframes collapseFull {
      0% { transform: rotate(0deg); }
      100% { transform: translate(20px, 35px) rotate(45deg); opacity: 0.6; }
    }
    @keyframes flutterDown {
      0% { opacity: 0; transform: translateY(-30px) rotate(-15deg); }
      100% { opacity: 1; transform: translateY(40px) rotate(8deg); }
    }

    /* 4. Node Modules Overflow */
    .anim-node-modules {
      width: 280px;
      margin: auto;
    }
    .progress-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.725rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
    }
    .pct-readout {
      color: #EF4444;
      font-weight: 700;
      animation: countOvershoot 1.6s ease-in forwards;
    }
    .progress-track {
      width: 100%;
      height: 14px;
      background: #1F2937;
      border-radius: 7px;
      overflow: hidden;
      border: 1px solid var(--card-border);
      position: relative;
    }
    .progress-fill {
      height: 100%;
      width: 0%;
      background: #10B981;
      border-radius: 7px;
      animation: barStallAndBlow 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .overflow-badge {
      font-size: 0.65rem;
      font-family: var(--font-mono);
      color: #EF4444;
      font-weight: 700;
      opacity: 0;
      animation: fadeIn 0.4s ease 1.8s forwards;
      text-align: right;
    }

    @keyframes barStallAndBlow {
      0% { width: 0%; background: #10B981; }
      40% { width: 96%; background: #10B981; }
      65% { width: 97%; background: #F59E0B; }
      85% { width: 100%; background: #EF4444; }
      100% { width: 100%; background: #EF4444; box-shadow: 0 0 12px #EF4444; }
    }

    /* 5. Perfect Uptime (Status Page) */
    .anim-perfect-uptime {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .status-row {
      display: flex;
      gap: 12px;
      background: var(--term-bg);
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
    }
    .status-node {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--text-muted);
    }
    .status-node.node-failing {
      position: relative;
    }
    .fire-icon {
      position: absolute;
      left: 0;
      opacity: 0;
      animation: firePop 0.5s var(--ease-comic) 1.4s forwards, fireShake 0.2s infinite 1.8s;
    }
    .ok-icon {
      animation: fadeOut 0.2s ease 1.4s forwards;
    }
    .status-banner {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      color: #10B981;
      font-weight: 700;
    }
    @keyframes firePop {
      0% { opacity: 0; transform: scale(0.2); }
      100% { opacity: 1; transform: scale(1.2); }
    }
    @keyframes fireShake {
      0%, 100% { transform: translate(0, 0) scale(1.2); }
      25% { transform: translate(-2px, 1px) scale(1.2); }
      75% { transform: translate(2px, -1px) scale(1.2); }
    }

    /* Generic Fallback Animation */
    .anim-generic {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .generic-emoji {
      font-size: 3rem;
      animation: emojiPop 0.8s var(--ease-comic) forwards;
    }
    .comic-boom {
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 2.2rem;
      color: var(--accent);
      text-shadow: 2px 2px 0px var(--card-border);
    }
    @keyframes emojiPop {
      0% { transform: scale(0.2) rotate(-15deg); opacity: 0; }
      70% { transform: scale(1.2) rotate(10deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }

    /* Global Shared Animations */
    @keyframes lineTypeIn {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes flinchLog {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-4px); }
      40% { transform: translateX(4px); }
      60% { transform: translateX(-2px); }
      80% { transform: translateX(2px); }
    }
    @keyframes cardShake {
      0%, 100% { transform: translateX(0); }
      15% { transform: translateX(-6px) rotate(-0.5deg); }
      30% { transform: translateX(5px) rotate(0.5deg); }
      45% { transform: translateX(-4px); }
      60% { transform: translateX(3px); }
      75% { transform: translateX(-1px); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    @keyframes fadeOut {
      to { opacity: 0; }
    }

    /* ==========================================================================
       ACCESSIBILITY & REDUCED MOTION
       ========================================================================== */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      .witty-card {
        animation: none !important;
      }
      .terminal-line {
        opacity: 1 !important;
        transform: none !important;
      }
      .plane-flight-path {
        transform: translate(280px, 35px) rotate(45deg) !important;
      }
      .explosion-puff, .debris, .dave-subtext, .eta-tag, .overflow-badge, .fire-icon {
        opacity: 1 !important;
      }
    }

    /* ==========================================================================
       RESPONSIVENESS (Down to 320px iframe compatibility)
       ========================================================================== */
    @media (max-width: 640px) {
      .witty-card {
        padding: 1.25rem;
      }
      .joke-title {
        font-size: 1.45rem;
      }
      .joke-subtitle {
        font-size: 0.9rem;
      }
      .action-toolbar {
        flex-direction: column;
        align-items: stretch;
      }
      .btn-group {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <!-- CRT Scanline Effect Overlay -->
  <div class="crt-overlay" aria-hidden="true"></div>

  <!-- Ambient Backdrop Glow -->
  <div class="ambient-glow" aria-hidden="true"></div>

  <main class="witty-wrapper">
    <article class="witty-card" id="witty-404-card">
      <!-- Top Meta / Tag Bar -->
      <header class="card-header">
        <div class="badge-group">
          <span class="status-pill">404 NOT FOUND</span>
          <span class="tag-pill">#${escapeHtml(joke.tags[0] || 'dev')}</span>
        </div>
        <a href="https://github.com/zimkk/witty-404" target="_blank" rel="noopener noreferrer" class="brand-link" title="View open-source repo">
          witty-404 ↗
        </a>
      </header>

      <!-- Hero Visual Set Piece -->
      <div class="hero-container">
        ${heroVisual}
      </div>

      <!-- Joke Headline -->
      <h1 class="joke-title">${formattedTitle}</h1>

      <!-- Dev-Relatable Subtitle -->
      <div class="joke-subtitle">${formattedSubtitle}</div>

      <!-- Terminal Diagnostics Box -->
      <section class="terminal-box" aria-label="Terminal Error Logs">
        <div class="terminal-titlebar">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="terminal-title">debug-trace — ${escapeHtml(joke.id)}.sh</span>
        </div>
        <div class="terminal-body" id="terminal-logs">
          ${logLinesHtml}
        </div>
      </section>

      <!-- Footnote / Root Cause -->
      <footer class="joke-footnote">
        ${formattedFootnote}
      </footer>
    </article>

    <!-- Interactive Embed Toolbar -->
    <nav class="action-toolbar" aria-label="Quick Actions">
      <div class="btn-group">
        <button type="button" class="btn" id="btn-copy-logs" onclick="copyLogs()">
          📋 Copy Logs
        </button>
        <a href="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" target="_blank" class="btn" title="Open Share Card SVG">
          🖼️ Share Card
        </a>
        <a href="https://witty-404.hassannazir.dev" target="_blank" class="btn" title="Marketing & Docs">
          ⚡ API Docs
        </a>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-primary" onclick="window.location.reload()">
          🎲 Another Joke
        </button>
      </div>
    </nav>
  </main>

  <script>
    function copyLogs() {
      const logs = ${JSON.stringify(joke.logs)}.join('\\n');
      navigator.clipboard.writeText(logs).then(() => {
        const btn = document.getElementById('btn-copy-logs');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '✅ Copied!';
          setTimeout(() => { btn.innerHTML = orig; }, 2000);
        }
      }).catch(() => {});
    }
  </script>
</body>
</html>`;
}
