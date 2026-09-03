import { getTemplateStyles } from '../templates/styles';

export function getFullPageSceneStyles(): string {
  return getTemplateStyles() + `

    /* =====================================================================
       SCENE WRAPPER — layout used by render.ts
       ===================================================================== */
    .main-wrapper {
      width: 100%;
      max-width: 780px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin: auto;
      gap: 1.25rem;
    }

    .top-hud {
      display: flex;
      align-items: center;
      gap: 0.75rem;
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
      animation: pulseAlert 1.2s infinite ease-in-out;
    }

    /* =====================================================================
       404 HERO NUMBER
       ===================================================================== */
    .hero-404-container {
      position: relative;
      line-height: 1;
    }

    .big-404-title {
      font-size: clamp(7rem, 22vw, 14rem);
      font-weight: 900;
      line-height: 0.8;
      letter-spacing: -0.06em;
      background: linear-gradient(180deg, #FFFFFF 10%, #3F4860 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      user-select: none;
    }

    /* Per-archetype 404 gradient — changes with the joke's visual world */
    [data-archetype="news_chyron"] .big-404-title {
      background: linear-gradient(180deg, #FFFFFF 0%, #EF4444 55%, #7F1D1D 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="tweet"] .big-404-title {
      background: linear-gradient(180deg, #FFFFFF 0%, #1D9BF0 55%, #0C4A6E 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="stackoverflow"] .big-404-title {
      background: linear-gradient(180deg, #FFFFFF 0%, #F48024 55%, #7C2D12 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="pr_review"] .big-404-title {
      background: linear-gradient(180deg, #FFFFFF 0%, #3FB950 55%, #14532D 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="storage_panic"] .big-404-title {
      background: linear-gradient(180deg, #FFFFFF 0%, #FF9500 55%, #7C2D12 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="glitch_terminal"] .big-404-title {
      background: linear-gradient(180deg, #39FF14 0%, #00FFFF 50%, #FF00FF 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: glitch404 4s infinite;
    }
    [data-archetype="receipt_stamp"] .big-404-title {
      background: linear-gradient(180deg, #FBBF24 0%, #D97706 55%, #92400E 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="imessage"] .big-404-title {
      background: linear-gradient(180deg, #FFFFFF 0%, #0A84FF 55%, #0369A1 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="status_page"] .big-404-title {
      background: linear-gradient(180deg, #34D399 0%, #059669 55%, #064E3B 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [data-archetype="corporate_memo"] .big-404-title {
      background: linear-gradient(180deg, #E2E8F0 0%, #64748B 55%, #1E293B 100%);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* =====================================================================
       PER-ARCHETYPE BODY BACKGROUND — the whole page reflects the joke world
       ===================================================================== */
    [data-archetype="news_chyron"] body {
      background-color: #07080C;
      background-image:
        radial-gradient(at 50% 0%, rgba(239,68,68,0.28) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="tweet"] body {
      background-color: #000000;
      background-image:
        radial-gradient(at 50% 0%, rgba(29,155,240,0.2) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="stackoverflow"] body {
      background-color: #0D0E10;
      background-image:
        radial-gradient(at 50% 0%, rgba(244,128,36,0.22) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="pr_review"] body {
      background-color: #010409;
      background-image:
        radial-gradient(at 50% 0%, rgba(63,185,80,0.2) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="glitch_terminal"] body {
      background-color: #040308;
      background-image:
        radial-gradient(at 25% 0%, rgba(57,255,20,0.18) 0%, transparent 45%),
        radial-gradient(at 75% 0%, rgba(255,0,255,0.18) 0%, transparent 45%);
    }
    [data-archetype="storage_panic"] body {
      background-color: #08080B;
      background-image:
        radial-gradient(at 50% 0%, rgba(255,149,0,0.22) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="status_page"] body {
      background-color: #060C0A;
      background-image:
        radial-gradient(at 50% 0%, rgba(16,185,129,0.2) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="receipt_stamp"] body {
      background-color: #09080A;
      background-image:
        radial-gradient(at 50% 0%, rgba(251,191,36,0.2) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }
    [data-archetype="imessage"] body {
      background-color: #000000;
      background-image:
        radial-gradient(at 50% 0%, rgba(10,132,255,0.15) 0%, transparent 55%);
    }
    [data-archetype="corporate_memo"] body {
      background-color: #090B11;
      background-image:
        radial-gradient(at 50% 0%, rgba(100,116,139,0.18) 0%, transparent 55%),
        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }

    /* =====================================================================
       MISSING ANIMATION TRIGGERS from formats.ts inline --d vars
       ===================================================================== */
    .news-tele-line {
      animation: fadeSlideIn 0.4s var(--d, 0s) both;
    }
    .chat-bubble {
      animation: bubbleIn 0.35s var(--d, 0s) both;
    }
    .panic-log-entry {
      animation: fadeSlideIn 0.3s var(--d, 0s) both;
    }
    .term-line {
      animation: fadeSlideIn 0.3s var(--d, 0s) both;
    }

    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: none; }
    }

    @keyframes bubbleIn {
      from { opacity: 0; transform: scale(0.85) translateY(6px); }
      to   { opacity: 1; transform: none; }
    }

    /* Receipt tear edges */
    .receipt-zigzag-top {
      height: 0;
      border-top: 2px dashed rgba(255,255,255,0.08);
      margin-bottom: 1.25rem;
    }
    .receipt-zigzag-bottom {
      height: 0;
      border-bottom: 2px dashed rgba(255,255,255,0.08);
      margin-top: 1.25rem;
    }

    /* panic-window-stack container */
    .panic-window-stack {
      position: relative;
    }

    /* =====================================================================
       FOOTNOTE & TOOLBAR
       ===================================================================== */
    .joke-footnote-text {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      max-width: 640px;
    }

    .action-toolbar {
      display: flex;
      gap: 0.65rem;
      flex-wrap: wrap;
      justify-content: center;
      padding-bottom: 1.5rem;
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

    /* =====================================================================
       GLITCH 404 ANIMATION
       ===================================================================== */
    @keyframes glitch404 {
      0%, 82%, 100% { filter: none; transform: none; }
      83%  { filter: hue-rotate(90deg); transform: skewX(-4deg) translateX(3px); }
      84%  { filter: hue-rotate(270deg); transform: skewX(3deg) translateX(-3px); }
      85%  { filter: none; transform: none; }
      92%  { filter: hue-rotate(180deg) saturate(2); transform: skewX(2deg); }
      93%  { filter: none; transform: none; }
    }

    @media (max-width: 640px) {
      body { padding: 1rem 0.75rem; }
      .action-toolbar { gap: 0.45rem; }
      .btn-action { font-size: 0.78rem; padding: 0.45rem 0.75rem; }
    }
  `;
}
