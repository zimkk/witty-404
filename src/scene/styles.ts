export function getFullPageSceneStyles(): string {
  return `
    /* ==========================================================================
       CLEAN, MODERN, DEVELOPER-CENTRIC DESIGN SYSTEM
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #07090E;
      --card-bg: #0E121B;
      --card-border: #1E2638;
      --card-border-hover: #2F3B54;
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      --accent: #3B82F6;
      --accent-glow: rgba(59, 130, 246, 0.2);
      --danger: #EF4444;
      --danger-glow: rgba(239, 68, 68, 0.2);
      --warning: #F59E0B;
      --success: #10B981;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    [data-theme="light"] {
      --bg: #F8FAFC;
      --card-bg: #FFFFFF;
      --card-border: #E2E8F0;
      --card-border-hover: #CBD5E1;
      --text-main: #0F172A;
      --text-muted: #475569;
      --text-dim: #94A3B8;
      --accent: #2563EB;
      --accent-glow: rgba(37, 99, 235, 0.15);
    }

    [data-theme="matrix"] {
      --bg: #020B04;
      --card-bg: #051408;
      --card-border: #0F3816;
      --card-border-hover: #22C55E;
      --text-main: #4ADE80;
      --text-muted: #22C55E;
      --text-dim: #15803D;
      --accent: #10B981;
      --accent-glow: rgba(34, 197, 94, 0.3);
    }

    [data-theme="glitch"] {
      --bg: #090014;
      --card-bg: #130424;
      --card-border: #4C1D95;
      --card-border-hover: #F43F5E;
      --text-main: #F43F5E;
      --text-muted: #E0E7FF;
      --text-dim: #818CF8;
      --accent: #06B6D4;
      --accent-glow: rgba(244, 63, 94, 0.35);
    }

    html, body {
      min-height: 100vh;
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
    }

    body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 1.5rem;
      background-image: 
        radial-gradient(circle at 50% 15%, var(--accent-glow) 0%, transparent 55%),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 36px 36px, 36px 36px;
    }

    .main-wrapper {
      width: 100%;
      max-width: 780px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin: auto 0;
    }

    /* Top HUD / Brand */
    .top-hud {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .hud-badge {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 700;
    }

    .hud-badge .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--danger);
      box-shadow: 0 0 8px var(--danger);
    }

    /* Big Bold 404 Header */
    .hero-404-container {
      margin-bottom: 0.75rem;
      position: relative;
    }

    .big-404-title {
      font-size: clamp(6.5rem, 18vw, 11rem);
      font-weight: 900;
      line-height: 0.85;
      letter-spacing: -0.06em;
      background: linear-gradient(180deg, #FFFFFF 20%, #64748B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
    }

    [data-theme="matrix"] .big-404-title {
      background: linear-gradient(180deg, #86EFAC 20%, #15803D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    [data-theme="glitch"] .big-404-title {
      background: linear-gradient(180deg, #FDA4AF 20%, #9F1239 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    [data-theme="light"] .big-404-title {
      background: linear-gradient(180deg, #0F172A 20%, #94A3B8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Joke Headline & Subtitle */
    .joke-headline-block {
      margin-bottom: 1.75rem;
    }

    .joke-title {
      font-size: clamp(1.4rem, 3.5vw, 2.1rem);
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }

    [data-theme="light"] .joke-title {
      color: #0F172A;
    }

    .joke-subtitle {
      font-size: clamp(0.95rem, 2vw, 1.1rem);
      color: var(--text-muted);
      max-width: 640px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* ==========================================================================
       CORE MEME SET PIECES (CLEAN & SCREENSHOT-WORTHY)
       ========================================================================== */
    .meme-card {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
      margin-bottom: 1.5rem;
      text-align: left;
    }

    /* Format: Terminal / Flight Recorder */
    .terminal-card {
      font-family: var(--font-mono);
    }

    .terminal-header {
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid var(--card-border);
      padding: 0.65rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      color: var(--text-dim);
    }

    .mac-dots {
      display: flex;
      gap: 6px;
    }
    .mac-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot-r { background: #EF4444; }
    .dot-y { background: #F59E0B; }
    .dot-g { background: #10B981; }

    .terminal-body {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      font-size: 0.85rem;
    }

    .term-line {
      color: #94A3B8;
      line-height: 1.5;
    }

    .term-line-punch {
      color: #38BDF8;
      font-weight: 700;
    }

    /* Format: Fake iMessage Thread */
    .imessage-card {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .imessage-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 0.6rem;
    }

    .chat-bubble-stack {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .bubble {
      padding: 0.55rem 0.95rem;
      border-radius: 18px;
      font-size: 0.875rem;
      max-width: 80%;
      font-family: var(--font-mono);
    }

    .bubble-them {
      align-self: flex-start;
      background: #1E293B;
      color: #F8FAFC;
      border-bottom-left-radius: 4px;
    }

    .bubble-me {
      align-self: flex-end;
      background: #2563EB;
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
    }

    .typing-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      align-self: flex-start;
      margin-top: 0.25rem;
    }

    .typing-box {
      background: #1E293B;
      padding: 0.45rem 0.75rem;
      border-radius: 16px;
      display: flex;
      gap: 4px;
      border-bottom-left-radius: 4px;
    }

    .typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #94A3B8;
      animation: jumpDot 1.2s infinite ease-in-out;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    .typing-text {
      font-size: 0.75rem;
      color: var(--text-dim);
      font-style: italic;
    }

    /* Format: Fake Tweet */
    .tweet-card {
      padding: 1.5rem;
    }

    .tweet-author-header {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.75rem;
    }

    .tweet-av {
      font-size: 1.75rem;
    }

    .tweet-names {
      display: flex;
      flex-direction: column;
    }

    .tweet-name-line {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-weight: 700;
      color: #FFF;
      font-size: 0.95rem;
    }

    .tweet-verified {
      background: #1D9BF0;
      color: #FFF;
      font-size: 0.65rem;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .tweet-handle {
      font-size: 0.8rem;
      color: var(--text-dim);
    }

    .tweet-quote-box {
      background: #05070B;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 0.85rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #38BDF8;
      margin: 0.75rem 0;
    }

    .tweet-stats-line {
      display: flex;
      gap: 1.25rem;
      font-size: 0.8rem;
      color: var(--text-dim);
      border-top: 1px solid var(--card-border);
      padding-top: 0.75rem;
    }

    .tweet-stats-line strong {
      color: var(--text-main);
    }

    /* Format: Status Page */
    .status-card {
      padding: 1.5rem;
    }

    .status-header-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 0.75rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .status-banner {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34D399;
      padding: 0.65rem 1rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .status-grid {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      font-size: 0.85rem;
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0.6rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 6px;
    }

    .status-row.failing {
      background: rgba(239, 68, 68, 0.1);
      color: #F87171;
      font-weight: 700;
    }

    /* Format: Receipt / Stamp */
    .receipt-card {
      padding: 1.5rem;
      font-family: var(--font-mono);
      position: relative;
    }

    .receipt-stamp-overlay {
      position: absolute;
      top: 35%;
      right: 1.5rem;
      border: 3px solid #EF4444;
      color: #EF4444;
      font-size: 1.25rem;
      font-weight: 900;
      padding: 0.35rem 0.85rem;
      border-radius: 6px;
      transform: rotate(-10deg);
      background: rgba(239, 68, 68, 0.12);
      letter-spacing: 0.05em;
    }

    /* Footnote */
    .joke-footnote-text {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      margin-bottom: 1.5rem;
    }

    /* Bottom Action Toolbar */
    .action-toolbar {
      display: flex;
      gap: 0.65rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-action {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-action:hover {
      border-color: var(--accent);
      color: var(--text-main);
      box-shadow: 0 0 12px var(--accent-glow);
    }

    .btn-action-primary {
      background: var(--accent);
      color: #FFFFFF;
      border-color: var(--accent);
    }

    .btn-action-primary:hover {
      filter: brightness(1.15);
      color: #FFFFFF;
    }

    @keyframes jumpDot {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }

    @media (max-width: 600px) {
      body { padding: 1.5rem 1rem; }
      .receipt-stamp-overlay { position: static; transform: none; margin-top: 1rem; text-align: center; }
    }
  `;
}
