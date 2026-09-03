export function getFullPageSceneStyles(): string {
  return `
    /* ==========================================================================
       1. FULL-PAGE SCENE DESIGN SYSTEM & RESET
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --scene-bg: #07090E;
      --num-color: rgba(255, 255, 255, 0.045);
      --num-stroke: rgba(255, 255, 255, 0.09);
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      --accent: #3B82F6;
      --accent-glow: rgba(59, 130, 246, 0.35);
      --danger: #EF4444;
      --danger-glow: rgba(239, 68, 68, 0.4);
      --warning: #F59E0B;
      --success: #10B981;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    [data-theme="light"] {
      --scene-bg: #F1F5F9;
      --num-color: rgba(0, 0, 0, 0.04);
      --num-stroke: rgba(0, 0, 0, 0.08);
      --text-main: #0F172A;
      --text-muted: #475569;
      --text-dim: #94A3B8;
      --accent: #2563EB;
      --accent-glow: rgba(37, 99, 235, 0.2);
    }

    [data-theme="matrix"] {
      --scene-bg: #020A04;
      --num-color: rgba(34, 197, 94, 0.06);
      --num-stroke: rgba(34, 197, 94, 0.18);
      --text-main: #4ADE80;
      --text-muted: #22C55E;
      --text-dim: #15803D;
      --accent: #10B981;
      --accent-glow: rgba(34, 197, 94, 0.4);
    }

    [data-theme="glitch"] {
      --scene-bg: #090014;
      --num-color: rgba(244, 63, 94, 0.07);
      --num-stroke: rgba(244, 63, 94, 0.22);
      --text-main: #F43F5E;
      --text-muted: #E0E7FF;
      --text-dim: #818CF8;
      --accent: #06B6D4;
      --accent-glow: rgba(244, 63, 94, 0.45);
    }

    html, body {
      width: 100%;
      height: 100%;
      min-height: 100vh;
      overflow-x: hidden;
      background-color: var(--scene-bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }

    body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background-image: 
        radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 65%),
        linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 100% 100%, 48px 48px, 48px 48px;
    }

    /* Ambient CRT Scanline Overlay */
    .scene-scanlines {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(rgba(10, 10, 15, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
      background-size: 100% 4px;
      opacity: 0.12;
      z-index: 100;
    }

    /* ==========================================================================
       2. MONUMENTAL 404 SCULPTURAL STAGE (THE PHYSICAL ANCHOR)
       ========================================================================== */
    .scene-viewport-root {
      position: relative;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      perspective: 1200px;
    }

    .monumental-404-stage {
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 1300px;
      height: 60vh;
      pointer-events: none;
      z-index: 1;
      font-family: var(--font-sans);
      font-weight: 900;
      font-size: clamp(12rem, 30vw, 34rem);
      line-height: 0.8;
      letter-spacing: -0.06em;
      color: var(--num-color);
      -webkit-text-stroke: 2px var(--num-stroke);
      text-shadow: 0 20px 80px rgba(0, 0, 0, 0.7);
      transition: transform 0.1s ease-out;
    }

    .num-digit {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .num-zero {
      margin: 0 0.5rem;
    }

    /* Plane Crash Set Piece Attached to 0 */
    .crashed-plane-wreckage {
      position: absolute;
      top: 25%;
      left: 45%;
      transform: translate(-50%, -50%) rotate(38deg);
      pointer-events: auto;
      cursor: grab;
      z-index: 10;
    }

    .plane-fuselage {
      font-size: clamp(3rem, 7vw, 7rem);
      animation: shudderDisaster 2.5s infinite ease-in-out;
    }

    .impact-fire {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: clamp(2.5rem, 5vw, 5rem);
      animation: flickerFire 0.8s infinite alternate;
    }

    .billowing-smoke {
      position: absolute;
      font-size: clamp(2rem, 4vw, 4rem);
      opacity: 0.7;
      animation: driftSmoke 3s infinite linear;
    }
    .s1 { top: -40px; left: 10px; animation-delay: 0s; }
    .s2 { top: -70px; left: 30px; animation-delay: 1s; }
    .s3 { top: -100px; left: 60px; animation-delay: 2s; }

    .debris-scrap {
      position: absolute;
      font-size: 1.75rem;
    }
    .d1 { bottom: -20px; left: -30px; }
    .d2 { top: 40px; right: -40px; }

    /* Perched Laptop on 0 */
    .perched-laptop-prop {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-6deg);
      background: #18181B;
      border: 2px solid #3F3F46;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      pointer-events: auto;
      cursor: grab;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
      z-index: 10;
      width: clamp(200px, 25vw, 320px);
    }

    .prop-screen-text {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #38BDF8;
    }

    .prop-cursor {
      animation: blinkCursor 1s infinite;
      color: #FFF;
    }

    .prop-tape-label {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      background: #FBBF24;
      color: #000;
      padding: 0.15rem 0.4rem;
      margin-top: 0.5rem;
      font-weight: 800;
      display: inline-block;
      border-radius: 2px;
    }

    /* Uptime Lamp on 0 */
    .uptime-lamp-fixture {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
      z-index: 10;
    }

    .lamp-core {
      width: clamp(40px, 8vw, 80px);
      height: clamp(40px, 8vw, 80px);
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 40px #10B981, inset 0 0 20px #FFF;
      animation: pulseLamp 2s infinite ease-in-out;
    }

    .lamp-fire-overlay {
      position: absolute;
      font-size: 3.5rem;
      top: -10px;
      display: none;
      animation: flickerFire 0.4s infinite alternate;
    }

    .lamp-caption {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #34D399;
      font-weight: 800;
      background: rgba(0, 0, 0, 0.7);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    /* Stage Massive Stamp */
    .stage-massive-stamp {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-12deg);
      border: 4px solid #EF4444;
      color: #EF4444;
      font-family: var(--font-mono);
      font-size: clamp(1.5rem, 4vw, 3.5rem);
      font-weight: 900;
      padding: 0.5rem 1.5rem;
      border-radius: 8px;
      background: rgba(239, 68, 68, 0.12);
      backdrop-filter: blur(4px);
      letter-spacing: 0.1em;
      pointer-events: auto;
      cursor: pointer;
    }

    /* ==========================================================================
       3. SCATTERED DEBRIS & COMPOSITION LAYER (Z-INDEX: 20)
       ========================================================================== */
    .scattered-scene-viewport {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 85vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 20;
    }

    /* Top HUD Strip */
    .scene-top-hud {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .victim-counter-pill {
      background: rgba(17, 20, 30, 0.85);
      border: 1px solid var(--card-border, #232A3B);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      color: #F87171;
      backdrop-filter: blur(8px);
    }

    .victim-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #EF4444;
      box-shadow: 0 0 8px #EF4444;
      animation: pulseDot 1s infinite;
    }

    .scene-location-tag {
      color: var(--text-dim);
      background: rgba(17, 20, 30, 0.6);
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Pinned Sticky Note Top-Left */
    .pinned-sticky-note {
      position: absolute;
      top: 4.5rem;
      left: 0;
      background: #1C2333;
      border: 1px solid #334155;
      padding: 1rem 1.25rem;
      border-radius: 8px;
      max-width: 320px;
      transform: rotate(-3deg);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
      cursor: grab;
      backdrop-filter: blur(8px);
      transition: transform 0.15s ease;
    }

    .pinned-sticky-note:hover {
      transform: rotate(0deg) scale(1.02);
      border-color: #60A5FA;
    }

    .sticky-pin {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.2rem;
    }

    .sticky-header {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: #64748B;
      margin-bottom: 0.4rem;
      font-weight: 700;
    }

    .sticky-log-line {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #38BDF8;
      line-height: 1.5;
    }

    .sticky-tag {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #F87171;
      font-weight: 800;
      margin-top: 0.5rem;
      text-transform: uppercase;
    }

    /* In-Scene Native Meme Widgets (Top-Right) */
    .inscene-chat-widget,
    .inscene-panic-stack,
    .inscene-tweet-card,
    .inscene-status-strip,
    .inscene-so-box,
    .inscene-stamp-card {
      position: absolute;
      top: 4.5rem;
      right: 0;
      background: #111522;
      border: 1px solid #27334D;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      max-width: 300px;
      transform: rotate(2.5deg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      cursor: grab;
      backdrop-filter: blur(8px);
      transition: transform 0.15s ease;
    }

    .inscene-chat-widget:hover,
    .inscene-panic-stack:hover,
    .inscene-tweet-card:hover {
      transform: rotate(0deg) scale(1.02);
    }

    .chat-widget-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: 0.35rem;
    }

    .chat-widget-bubble {
      background: #1E293B;
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      font-size: 0.75rem;
      color: #E2E8F0;
      font-family: var(--font-mono);
      margin-bottom: 0.4rem;
    }

    .chat-widget-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.7rem;
      color: #64748B;
      font-style: italic;
    }

    .typing-dot-jump {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #38BDF8;
      animation: typingJump 1.2s infinite ease-in-out;
    }
    .typing-dot-jump:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot-jump:nth-child(3) { animation-delay: 0.4s; }

    /* Foreground Graffiti Punchline Block (Center Stage Offset) */
    .scene-graffiti-block {
      max-width: 760px;
      margin: 14vh auto 2rem;
      text-align: center;
      cursor: grab;
      position: relative;
      z-index: 30;
      background: rgba(11, 14, 22, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 2rem 2.5rem;
      backdrop-filter: blur(12px);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
      transform: rotate(-0.5deg);
      transition: transform 0.15s ease, border-color 0.2s ease;
    }

    .scene-graffiti-block:hover {
      border-color: var(--accent);
      transform: rotate(0deg) scale(1.01);
    }

    .graffiti-eyebrow {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .eyebrow-tag {
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.35);
      color: #60A5FA;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-weight: 700;
    }

    .graffiti-stamp {
      border: 1px solid #EF4444;
      color: #EF4444;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-weight: 800;
      font-size: 0.7rem;
      transform: rotate(2deg);
    }

    .graffiti-title {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.18;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
    }

    .graffiti-subtitle {
      font-size: clamp(0.95rem, 1.8vw, 1.15rem);
      color: #CBD5E1;
      line-height: 1.6;
      max-width: 640px;
      margin: 0 auto 1.25rem;
    }

    .graffiti-punchline-highlight {
      display: inline-block;
      background: #090C14;
      border: 1px solid #232B3E;
      border-radius: 8px;
      padding: 0.65rem 1.25rem;
      font-family: var(--font-mono);
      font-size: clamp(0.8rem, 1.5vw, 0.95rem);
      color: #FCD34D;
      font-weight: 700;
    }

    .punch-arrow {
      color: #EF4444;
      font-weight: 900;
    }

    /* Floating Stickers */
    .floating-sticker {
      position: absolute;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
      cursor: grab;
      z-index: 25;
    }

    .sticker-a {
      bottom: 6rem;
      left: 2rem;
      transform: rotate(-10deg);
      background: #F87171;
      color: #FFF;
    }

    .sticker-b {
      bottom: 7rem;
      right: 3rem;
      transform: rotate(8deg);
      background: #34D399;
      color: #000;
    }

    /* Fine Print Footnote */
    .scene-fineprint-footer {
      text-align: center;
      margin-bottom: 1rem;
      z-index: 20;
    }

    .fineprint-content {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* Full-Bleed Breaking Ticker */
    .scene-bottom-ticker-bar {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #111;
      border-top: 2px solid #EF4444;
      color: #FCD34D;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 0.35rem 0;
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: -1.5rem;
    }

    .ticker-live-badge {
      background: #EF4444;
      color: #FFF;
      font-weight: 900;
      padding: 0.2rem 0.65rem;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      z-index: 5;
    }

    .ticker-marquee-track {
      display: inline-block;
      animation: tickerRoll 22s linear infinite;
    }

    .ticker-text-item {
      padding-right: 3rem;
    }

    /* ==========================================================================
       4. STICKY ACTION TOOLBAR
       ========================================================================== */
    .scene-action-toolbar {
      width: 100%;
      max-width: 860px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      z-index: 40;
    }

    .toolbar-grp {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .scene-btn {
      background: rgba(17, 20, 30, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 0.825rem;
      padding: 0.45rem 0.95rem;
      border-radius: 8px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      cursor: pointer;
      backdrop-filter: blur(10px);
      transition: all 0.15s ease;
    }

    .scene-btn:hover {
      border-color: var(--accent);
      color: var(--text-main);
      box-shadow: 0 0 14px var(--accent-glow);
    }

    .scene-btn-primary {
      background: var(--accent);
      color: #FFF;
      border-color: var(--accent);
    }

    .scene-btn-primary:hover {
      filter: brightness(1.15);
      color: #FFF;
    }

    /* ==========================================================================
       5. CONTINUOUS IDLE & ESCALATION KEYFRAMES
       ========================================================================== */
    @keyframes shudderDisaster {
      0%, 100% { transform: rotate(0deg); }
      20% { transform: rotate(-3deg); }
      40% { transform: rotate(3deg); }
      60% { transform: rotate(-1deg); }
      80% { transform: rotate(2deg); }
    }

    @keyframes flickerFire {
      0% { opacity: 0.8; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1.1); }
    }

    @keyframes driftSmoke {
      0% { transform: translate(0, 0) scale(0.8); opacity: 0.7; }
      50% { opacity: 0.4; }
      100% { transform: translate(60px, -60px) scale(1.6); opacity: 0; }
    }

    @keyframes pulseLamp {
      0%, 100% { box-shadow: 0 0 40px #10B981, inset 0 0 20px #FFF; }
      50% { box-shadow: 0 0 15px #10B981, inset 0 0 5px #FFF; }
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @keyframes blinkCursor {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    @keyframes typingJump {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }

    @keyframes tickerRoll {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    @keyframes stampSlam {
      0% { transform: rotate(-25deg) scale(2.5); opacity: 0; }
      70% { transform: rotate(-12deg) scale(0.95); opacity: 1; }
      100% { transform: rotate(-12deg) scale(1); opacity: 1; }
    }

    /* Screen shake on escalation */
    .scene-escalating {
      animation: sceneShake 0.45s ease-in-out;
    }

    @keyframes sceneShake {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      20% { transform: translate(-10px, 6px) rotate(-1deg); }
      40% { transform: translate(10px, -6px) rotate(1deg); }
      60% { transform: translate(-6px, 3px) rotate(-0.5deg); }
      80% { transform: translate(6px, -3px) rotate(0.5deg); }
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Responsive Mobile & Iframe Breakdown */
    @media (max-width: 768px) {
      .scene-viewport-root {
        padding: 1rem;
      }
      .pinned-sticky-note,
      .inscene-chat-widget,
      .inscene-panic-stack,
      .inscene-tweet-card,
      .inscene-status-strip,
      .inscene-so-box,
      .inscene-stamp-card {
        position: static;
        max-width: 100%;
        margin: 0.5rem auto;
        transform: none;
      }
      .scene-graffiti-block {
        margin: 1rem auto;
        padding: 1.25rem 1rem;
      }
      .floating-sticker {
        display: none;
      }
    }
  `;
}
