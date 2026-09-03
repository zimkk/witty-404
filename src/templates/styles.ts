export function getTemplateStyles(): string {
  return `
    /* ==========================================================================
       1. CSS RESET & DESIGN TOKENS
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #090B10;
      --card-bg: #11141E;
      --card-border: #202738;
      --card-border-hover: #374151;
      --text-main: #F3F4F6;
      --text-muted: #9CA3AF;
      --text-dim: #64748B;
      --accent: #3B82F6;
      --accent-glow: rgba(59, 130, 246, 0.25);
      --danger: #EF4444;
      --warning: #F59E0B;
      --success: #10B981;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
    }

    /* Light Theme */
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

    /* Matrix Theme */
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

    /* Glitch Theme */
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

    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1rem;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      user-select: none;
      background-image: 
        radial-gradient(at 0% 0%, var(--accent-glow) 0px, transparent 50%),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }

    /* Top Stage Bar */
    .viewport-topbar {
      width: 100%;
      max-width: 820px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-dim);
    }

    .brand-pill {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-main);
      font-weight: 700;
    }

    .brand-pill .spark {
      color: var(--accent);
    }

    .theme-indicator {
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Main Stage */
    main.stage-canvas {
      width: 100%;
      max-width: 820px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      position: relative;
    }

    /* Format Base Container */
    .format-container {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
      overflow: hidden;
      position: relative;
      cursor: grab;
      transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      touch-action: none;
    }

    .format-container:active {
      cursor: grabbing;
    }

    .format-container:hover {
      border-color: var(--card-border-hover);
    }

    /* ==========================================================================
       FORMAT 1: BREAKING NEWS CHYRON
       ========================================================================== */
    .format-news-chyron {
      background: #0B0E14;
      border: 2px solid #EF4444;
    }

    .news-topbar {
      background: #111520;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #232A3B;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .news-live-badge {
      background: #EF4444;
      color: #FFF;
      font-weight: 800;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      letter-spacing: 0.05em;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #FFF;
      border-radius: 50%;
      animation: pulseAlert 1.2s infinite ease-in-out;
    }

    .news-hero-stage {
      padding: 2rem 1.5rem;
      background: linear-gradient(180deg, #0B0E14 0%, #141926 100%);
    }

    .news-camera-hud {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #EF4444;
      margin-bottom: 1.25rem;
      opacity: 0.85;
    }

    .news-visual-content {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .news-emoji-disaster {
      font-size: 3.5rem;
      margin-bottom: 0.75rem;
      animation: shakeSlight 3s infinite ease-in-out;
    }

    .news-title-heavy {
      font-size: 1.75rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .news-subtitle-lead {
      font-size: 1rem;
      color: #94A3B8;
      max-width: 600px;
      margin: 0 auto;
    }

    .news-teleprompter {
      background: #080A0F;
      border: 1px solid #1E2536;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .tele-title {
      color: #64748B;
      font-size: 0.7rem;
      margin-bottom: 0.35rem;
    }

    .news-tele-line {
      color: #38BDF8;
      line-height: 1.5;
    }

    .news-lower-third {
      background: #DC2626;
      color: #FFFFFF;
    }

    .breaking-banner {
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 800;
      font-size: 0.95rem;
    }

    .breaking-label {
      background: #000;
      color: #FFF;
      padding: 0.2rem 0.6rem;
      font-size: 0.8rem;
      letter-spacing: 0.05em;
    }

    .news-ticker-strip {
      background: #111;
      color: #FCD34D;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 0.35rem 0;
      overflow: hidden;
      white-space: nowrap;
    }

    .ticker-content {
      display: inline-block;
      animation: tickerRoll 20s linear infinite;
    }

    /* ==========================================================================
       FORMAT 2: FAKE iMESSAGE THREAD
       ========================================================================== */
    .format-imessage {
      background: #000000;
      border: 1px solid #27272A;
      max-width: 580px;
      margin: 0 auto;
    }

    .imessage-header {
      background: rgba(24, 24, 27, 0.9);
      backdrop-filter: blur(10px);
      padding: 0.75rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #27272A;
    }

    .imessage-back-btn, .imessage-call-btn {
      color: #3B82F6;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
    }

    .imessage-contact {
      text-align: center;
    }

    .contact-avatar {
      font-size: 1.5rem;
      line-height: 1;
    }

    .contact-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: #FFF;
    }

    .contact-handle {
      font-size: 0.7rem;
      color: #71717A;
      font-family: var(--font-mono);
    }

    .imessage-thread {
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .thread-timestamp {
      text-align: center;
      font-size: 0.7rem;
      color: #71717A;
      font-weight: 500;
    }

    .imessage-hero-card {
      background: #18181B;
      border: 1px solid #27272A;
      border-radius: 14px;
      padding: 1.25rem;
      text-align: center;
    }

    .hero-emoji-large {
      font-size: 2.75rem;
      margin-bottom: 0.5rem;
    }

    .imessage-hero-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #FFF;
      margin-bottom: 0.35rem;
    }

    .imessage-hero-subtitle {
      font-size: 0.875rem;
      color: #A1A1AA;
    }

    .bubbles-stack {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .chat-bubble {
      max-width: 80%;
      padding: 0.6rem 0.9rem;
      border-radius: 18px;
      font-size: 0.875rem;
      line-height: 1.4;
      font-family: var(--font-mono);
    }

    .bubble-them {
      align-self: flex-start;
      background: #27272A;
      color: #F4F4F5;
      border-bottom-left-radius: 4px;
    }

    .bubble-me {
      align-self: flex-end;
      background: #2563EB;
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
    }

    .typing-bubble-container {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .typing-bubble {
      background: #27272A;
      padding: 0.5rem 0.75rem;
      border-radius: 18px;
      display: flex;
      gap: 4px;
      border-bottom-left-radius: 4px;
    }

    .typing-dot {
      width: 6px;
      height: 6px;
      background: #A1A1AA;
      border-radius: 50%;
      animation: typingJump 1.4s infinite ease-in-out;
    }

    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    .typing-label {
      font-size: 0.75rem;
      color: #71717A;
      font-style: italic;
    }

    .read-receipt {
      align-self: flex-end;
      font-size: 0.7rem;
      color: #71717A;
      margin-top: -0.25rem;
    }

    /* ==========================================================================
       FORMAT 3: CORPORATE MEMO
       ========================================================================== */
    .format-corporate-memo {
      background: #1C1F2B;
      border: 1px solid #32394E;
    }

    .memo-paper {
      padding: 2.25rem 2rem;
      position: relative;
    }

    .memo-confidential-stamp {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      border: 2px solid #EF4444;
      color: #EF4444;
      padding: 0.25rem 0.6rem;
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 0.75rem;
      transform: rotate(8deg);
      border-radius: 4px;
      letter-spacing: 0.05em;
    }

    .memo-header {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      color: #94A3B8;
    }

    .memo-header .lbl {
      color: #64748B;
      font-weight: 700;
      display: inline-block;
      width: 60px;
    }

    .memo-header .memo-subj {
      color: #F8FAFC;
      font-weight: 700;
    }

    .memo-separator {
      height: 2px;
      background: #32394E;
      margin: 1.25rem 0;
    }

    .memo-hero-statement {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .memo-emoji {
      font-size: 2.25rem;
    }

    .memo-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.3;
    }

    .memo-desc {
      color: #94A3B8;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .memo-action-items {
      background: #131722;
      border: 1px solid #252D3F;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.25rem;
    }

    .action-items-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #CBD5E1;
      margin-bottom: 0.5rem;
      font-family: var(--font-mono);
    }

    .memo-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .memo-audit-line code {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #60A5FA;
    }

    .memo-signature {
      font-size: 0.85rem;
      color: #64748B;
      border-top: 1px dashed #32394E;
      padding-top: 0.75rem;
    }

    /* ==========================================================================
       FORMAT 4: STORAGE PANIC DIALOG
       ========================================================================== */
    .format-storage-panic {
      background: #11141E;
      border: 1px solid #293249;
    }

    .os-alert-modal {
      padding: 2.25rem 2rem;
      text-align: center;
      position: relative;
    }

    .alert-icon-wrap {
      width: 72px;
      height: 72px;
      margin: 0 auto 1.25rem;
      background: rgba(239, 68, 68, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .alert-emoji {
      font-size: 2.5rem;
    }

    .panic-pulse-ring {
      position: absolute;
      inset: -6px;
      border: 2px solid #EF4444;
      border-radius: 50%;
      animation: pulseRing 1.5s infinite;
    }

    .alert-badge-top {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #EF4444;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 0.35rem;
    }

    .alert-heading {
      font-size: 1.5rem;
      font-weight: 800;
      color: #FFF;
      line-height: 1.25;
      margin-bottom: 0.5rem;
    }

    .alert-message {
      font-size: 0.95rem;
      color: #94A3B8;
      max-width: 520px;
      margin: 0 auto 1.25rem;
    }

    .storage-gauge {
      background: #090B10;
      border: 1px solid #202738;
      border-radius: 8px;
      padding: 0.85rem;
      margin-bottom: 1.25rem;
    }

    .gauge-bar {
      height: 10px;
      background: #1F2937;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .gauge-fill {
      height: 100%;
      background: linear-gradient(90deg, #F59E0B, #EF4444);
      width: 98%;
      animation: expandGauge 1.5s ease-out;
    }

    .gauge-labels {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #64748B;
    }

    .danger-text {
      color: #EF4444;
      font-weight: 700;
    }

    .panic-logs-box {
      background: #090B10;
      border: 1px solid #1A202E;
      border-radius: 8px;
      padding: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-align: left;
      margin-bottom: 1.5rem;
    }

    .panic-logs-title {
      color: #64748B;
      font-size: 0.65rem;
      margin-bottom: 0.35rem;
    }

    .panic-log-entry {
      color: #F87171;
      line-height: 1.5;
    }

    .alert-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }

    .os-btn {
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 0.85rem;
      padding: 0.6rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      transition: all 0.15s;
    }

    .os-btn-secondary {
      background: #1F2937;
      color: #E5E7EB;
    }

    .os-btn-secondary:hover {
      background: #374151;
    }

    .os-btn-primary {
      background: #EF4444;
      color: #FFF;
    }

    .os-btn-primary:hover {
      background: #DC2626;
    }

    /* ==========================================================================
       FORMAT 5: STATUS PAGE
       ========================================================================== */
    .format-status-page {
      background: #0E121B;
      border: 1px solid #20283A;
    }

    .statuspage-card {
      padding: 2rem;
    }

    .status-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #1E2536;
      padding-bottom: 1rem;
    }

    .status-brand {
      font-weight: 700;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .uptime-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34D399;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .status-banner-clean {
      background: #064E3B;
      border: 1px solid #059669;
      color: #A7F3D0;
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .status-dot-pulse {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 10px #34D399;
    }

    .banner-fire-overlay {
      display: none;
      position: absolute;
      inset: 0;
      background: #DC2626;
      color: #FFF;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 1.1rem;
      animation: flashFire 0.4s infinite;
    }

    .status-hero-incident {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .incident-emoji {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .incident-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: #FFF;
      margin-bottom: 0.35rem;
    }

    .incident-summary {
      font-size: 0.95rem;
      color: #94A3B8;
    }

    .services-status-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .service-item {
      background: #141926;
      border: 1px solid #232C42;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }

    .service-item .op {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #34D399;
    }

    .service-item .down {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #F87171;
      font-weight: 700;
    }

    .service-failing {
      border-color: #EF4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .incident-timeline {
      background: #090B10;
      border: 1px solid #1A202E;
      border-radius: 8px;
      padding: 0.85rem;
    }

    .timeline-heading {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: #64748B;
      margin-bottom: 0.5rem;
    }

    .status-timeline-entry {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #94A3B8;
      line-height: 1.6;
    }

    .status-timeline-entry .time {
      color: #3B82F6;
      font-weight: 600;
    }

    /* ==========================================================================
       FORMAT 6: VIRAL TWEET
       ========================================================================== */
    .format-tweet {
      background: #000000;
      border: 1px solid #27272A;
      max-width: 620px;
      margin: 0 auto;
    }

    .tweet-card {
      padding: 1.75rem 1.5rem;
    }

    .tweet-author-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .tweet-avatar {
      font-size: 2.25rem;
      line-height: 1;
    }

    .tweet-author-meta {
      flex-grow: 1;
    }

    .author-name-line {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      flex-wrap: wrap;
    }

    .author-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #F4F4F5;
    }

    .fake-verified-badge {
      background: #1D9BF0;
      color: #FFF;
      font-size: 0.65rem;
      font-weight: 900;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .author-handle {
      font-size: 0.85rem;
      color: #71717A;
    }

    .tweet-date {
      font-size: 0.75rem;
      color: #71717A;
    }

    .tweet-more {
      color: #71717A;
      font-weight: 700;
    }

    .tweet-main-body {
      margin-bottom: 1.25rem;
    }

    .tweet-text {
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 1.35;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }

    .tweet-subtitle {
      font-size: 1rem;
      color: #D4D4D8;
      line-height: 1.5;
    }

    .quote-tweet-box {
      border: 1px solid #27272A;
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.25rem;
      background: #09090B;
    }

    .quote-author-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }

    .quote-name {
      font-weight: 700;
      color: #E4E4E7;
    }

    .quote-handle {
      color: #71717A;
      font-family: var(--font-mono);
    }

    .quote-content {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #38BDF8;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .tweet-metrics {
      display: flex;
      gap: 1.5rem;
      border-top: 1px solid #27272A;
      border-bottom: 1px solid #27272A;
      padding: 0.75rem 0;
      font-size: 0.85rem;
      color: #71717A;
      margin-bottom: 0.75rem;
    }

    .tweet-metrics strong {
      color: #F4F4F5;
    }

    .tweet-actions-bar {
      display: flex;
      justify-content: space-between;
      color: #71717A;
    }

    .tweet-btn {
      background: none;
      border: none;
      color: #71717A;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: color 0.15s;
    }

    .tweet-btn:hover {
      color: #1D9BF0;
    }

    .tweet-like-btn:hover {
      color: #F43F5E;
    }

    /* ==========================================================================
       FORMAT 7: STACK OVERFLOW
       ========================================================================== */
    .format-stackoverflow {
      background: #18191B;
      border: 1px solid #2D3035;
    }

    .so-post-container {
      padding: 2rem;
    }

    .so-header {
      border-bottom: 1px solid #2D3035;
      padding-bottom: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .so-badge-status {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #F87171;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .so-question-title {
      font-size: 1.45rem;
      font-weight: 700;
      color: #F8FAFC;
      line-height: 1.3;
      margin-bottom: 0.75rem;
    }

    .so-meta-strip {
      display: flex;
      gap: 1.25rem;
      font-size: 0.75rem;
      color: #94A3B8;
    }

    .so-vote-layout {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .so-vote-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
      color: #94A3B8;
    }

    .so-vote-btn {
      background: none;
      border: 1px solid #374151;
      color: #94A3B8;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .so-vote-count {
      font-size: 1.25rem;
      font-weight: 700;
      color: #F3F4F6;
    }

    .so-content-col {
      flex-grow: 1;
    }

    .so-desc {
      font-size: 0.95rem;
      color: #CBD5E1;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .so-code-snippet {
      background: #0E1015;
      border: 1px solid #232733;
      border-radius: 8px;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #93C5FD;
      white-space: pre-wrap;
      margin-bottom: 1.25rem;
    }

    .so-author-signature {
      display: flex;
      justify-content: flex-end;
    }

    .so-sig-card {
      background: #232733;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      color: #94A3B8;
    }

    .so-accepted-answer {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
    }

    .so-accepted-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #34D399;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .so-answer-text {
      font-size: 1rem;
      color: #E2E8F0;
      margin-bottom: 0.5rem;
    }

    .so-answer-footnote {
      font-size: 0.75rem;
      color: #94A3B8;
      font-style: italic;
    }

    /* ==========================================================================
       FORMAT 8: GITHUB PR REVIEW
       ========================================================================== */
    .format-pr-review {
      background: #0D1117;
      border: 1px solid #30363D;
    }

    .pr-card {
      padding: 2rem;
    }

    .pr-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .pr-status-pill {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      background: #238636;
      color: #FFF;
    }

    .pr-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #E6EDF3;
    }

    .pr-number {
      color: #7D8590;
      font-weight: 400;
    }

    .pr-meta-row {
      font-size: 0.85rem;
      color: #7D8590;
      border-bottom: 1px solid #30363D;
      padding-bottom: 1.25rem;
      margin-bottom: 1.25rem;
    }

    .pr-meta-row code {
      background: #161B22;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-family: var(--font-mono);
      color: #58A6FF;
    }

    .pr-body-card {
      background: #161B22;
      border: 1px solid #30363D;
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.25rem;
    }

    .pr-emoji-mast {
      font-size: 2.25rem;
      margin-bottom: 0.5rem;
    }

    .pr-description {
      font-size: 0.95rem;
      color: #C9D1D9;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .pr-diff-viewer {
      background: #0D1117;
      border: 1px solid #30363D;
      border-radius: 6px;
      overflow: hidden;
    }

    .diff-header {
      background: #161B22;
      padding: 0.4rem 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #7D8590;
      border-bottom: 1px solid #30363D;
    }

    .diff-content {
      padding: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .pr-diff-line {
      color: #7EE787;
    }

    .pr-review-verdict {
      background: rgba(35, 134, 54, 0.1);
      border: 1px solid rgba(35, 134, 54, 0.4);
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      gap: 0.75rem;
    }

    .reviewer-avatar {
      font-size: 1.5rem;
    }

    .verdict-heading {
      font-size: 0.85rem;
      color: #E6EDF3;
      margin-bottom: 0.35rem;
    }

    .lgtm-stamp {
      background: #238636;
      color: #FFF;
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 0.7rem;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      margin-left: 0.5rem;
    }

    .verdict-comment {
      font-size: 0.85rem;
      color: #8B949E;
    }

    /* ==========================================================================
       FORMAT 9: RECEIPT / BRUH MOMENT STAMP
       ========================================================================== */
    .format-receipt-stamp {
      background: #141722;
      border: 1px solid #2B334B;
      max-width: 540px;
      margin: 0 auto;
    }

    .receipt-slip {
      padding: 2.25rem 2rem;
      position: relative;
      font-family: var(--font-mono);
    }

    .receipt-header {
      text-align: center;
      margin-bottom: 1rem;
    }

    .receipt-store {
      font-size: 1.1rem;
      font-weight: 800;
      color: #FFF;
    }

    .receipt-badge {
      font-size: 0.8rem;
      color: #EF4444;
      font-weight: 700;
    }

    .receipt-meta {
      font-size: 0.65rem;
      color: #64748B;
    }

    .receipt-divider {
      color: #334155;
      text-align: center;
      font-size: 0.75rem;
      margin: 0.75rem 0;
      overflow: hidden;
    }

    .receipt-hero {
      text-align: center;
    }

    .r-emoji {
      font-size: 2.75rem;
      margin-bottom: 0.35rem;
    }

    .r-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #F8FAFC;
      margin-bottom: 0.35rem;
    }

    .r-subtitle {
      font-size: 0.85rem;
      color: #94A3B8;
    }

    .receipt-items-list {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.75rem;
    }

    .receipt-item {
      display: flex;
      gap: 0.5rem;
      color: #38BDF8;
    }

    .receipt-total-row {
      display: flex;
      justify-content: space-between;
      font-weight: 800;
      font-size: 0.9rem;
      color: #FFF;
    }

    .diagonal-bruh-stamp {
      position: absolute;
      top: 45%;
      left: 10%;
      right: 10%;
      border: 3px solid #EF4444;
      color: #EF4444;
      font-weight: 900;
      font-size: 1.5rem;
      text-align: center;
      padding: 0.5rem 1rem;
      transform: rotate(-14deg);
      border-radius: 6px;
      letter-spacing: 0.1em;
      cursor: pointer;
      background: rgba(239, 68, 68, 0.15);
      backdrop-filter: blur(2px);
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
      animation: stampSlam 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* ==========================================================================
       FORMAT 10: GLITCH TERMINAL & STICKER COLLAGE
       ========================================================================== */
    .format-glitch-terminal {
      background: transparent;
      border: none;
      box-shadow: none;
      position: relative;
    }

    .sticker {
      position: absolute;
      background: #FBBF24;
      color: #000;
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
      z-index: 10;
      cursor: grab;
    }

    .sticker-1 { top: -12px; left: 15px; transform: rotate(-8deg); background: #F87171; color: #FFF; }
    .sticker-2 { top: -10px; right: 20px; transform: rotate(12deg); background: #34D399; color: #000; }
    .sticker-3 { bottom: 10px; right: -8px; transform: rotate(-6deg); background: #60A5FA; color: #000; }

    .glitch-term-window {
      background: #090B10;
      border: 1px solid #202738;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
    }

    .glitch-term-bar {
      background: #141A26;
      padding: 0.6rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #202738;
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .term-dots {
      display: flex;
      gap: 6px;
    }

    .term-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .d-red { background: #EF4444; }
    .d-yellow { background: #F59E0B; }
    .d-green { background: #10B981; }

    .term-title {
      color: #64748B;
    }

    .term-status {
      color: #EF4444;
      font-weight: 700;
    }

    .glitch-term-body {
      padding: 1.75rem;
      font-family: var(--font-mono);
    }

    .term-hero-ascii {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .ascii-emoji {
      font-size: 2.25rem;
    }

    .ascii-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #F8FAFC;
    }

    .ascii-desc {
      font-size: 0.9rem;
      color: #94A3B8;
      margin-bottom: 1.25rem;
    }

    .term-logs-stream {
      background: #05060A;
      border: 1px solid #161B26;
      border-radius: 6px;
      padding: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.8rem;
      color: #38BDF8;
      margin-bottom: 1rem;
    }

    .term-prompt-line {
      font-size: 0.85rem;
      color: #CBD5E1;
    }

    .p-user { color: #34D399; }
    .p-path { color: #60A5FA; }
    .p-cmd { color: #F8FAFC; margin-left: 0.35rem; }
    .p-cursor { animation: blinkCursor 1s infinite; color: #38BDF8; }

    /* ==========================================================================
       BOTTOM EMBED TOOLBAR & ACTIONS
       ========================================================================== */
    .viewport-bottom-bar {
      width: 100%;
      max-width: 820px;
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .toolbar-left, .toolbar-right {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .tool-btn {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 0.8rem;
      padding: 0.45rem 0.85rem;
      border-radius: 8px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      cursor: pointer;
      transition: all 0.15s;
    }

    .tool-btn:hover {
      border-color: var(--accent);
      color: var(--text-main);
      box-shadow: 0 0 10px var(--accent-glow);
    }

    .tool-btn-primary {
      background: var(--accent);
      color: #FFF;
      border-color: var(--accent);
    }

    .tool-btn-primary:hover {
      filter: brightness(1.15);
      color: #FFF;
    }

    /* ==========================================================================
       KEYFRAME ANIMATIONS & GLITCH EFFECTS
       ========================================================================== */
    @keyframes pulseAlert {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    @keyframes pulseRing {
      0% { transform: scale(0.95); opacity: 0.8; }
      100% { transform: scale(1.35); opacity: 0; }
    }

    @keyframes expandGauge {
      0% { width: 0%; }
      100% { width: 98%; }
    }

    @keyframes tickerRoll {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    @keyframes typingJump {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }

    @keyframes blinkCursor {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    @keyframes stampSlam {
      0% { transform: rotate(-25deg) scale(2.5); opacity: 0; }
      70% { transform: rotate(-14deg) scale(0.95); opacity: 1; }
      100% { transform: rotate(-14deg) scale(1); opacity: 1; }
    }

    @keyframes shakeSlight {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-2deg); }
      75% { transform: rotate(2deg); }
    }

    @keyframes flashFire {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.85; }
    }

    /* Screen shake on escalation */
    .escalating {
      animation: screenShake 0.4s ease-in-out;
    }

    @keyframes screenShake {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      20% { transform: translate(-8px, 4px) rotate(-1deg); }
      40% { transform: translate(8px, -4px) rotate(1deg); }
      60% { transform: translate(-4px, 2px) rotate(-0.5deg); }
      80% { transform: translate(4px, -2px) rotate(0.5deg); }
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Mobile Responsive */
    @media (max-width: 640px) {
      body {
        padding: 1rem 0.5rem;
      }
      .services-status-grid {
        grid-template-columns: 1fr;
      }
      .diagonal-bruh-stamp {
        font-size: 1.1rem;
      }
      .news-title-heavy, .alert-heading {
        font-size: 1.25rem;
      }
    }
  `;
}
