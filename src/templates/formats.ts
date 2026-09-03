import { escapeHtml } from '../template';
import { FormatContext } from './types';
import { getJokeFormatConfig } from './registry';

/**
 * Format 1: Breaking News Broadcast & Scrolling Ticker Chyron
 */
export function renderNewsChyron(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const ticker = cfg.tickerText || 'BREAKING: HTTP 404 CRASH SITE CONFIRMED • NO SURVIVORS FOUND IN RE-ENTRY • ON-CALL ENGINEER SEEN PACKING BAGS';
  const logsHtml = ctx.sanitizedLogs
    .map((l, i) => `<div class="news-tele-line" style="--d: ${0.2 + i * 0.1}s">${escapeHtml(l)}</div>`)
    .join('');

  return `
    <div class="format-container format-news-chyron" data-draggable="true">
      <div class="news-topbar">
        <div class="news-live-badge"><span class="pulse-dot"></span> LIVE</div>
        <div class="news-station-tag">CHANNEL 404 BREAKING DESK</div>
        <div class="news-timestamp">14:04:00 UTC</div>
      </div>

      <div class="news-hero-stage">
        <div class="news-video-frame">
          <div class="news-camera-hud">
            <span class="rec-indicator">● REC [PROD-EAST-1]</span>
            <span class="hud-target">[ 🎯 TARGET: ${escapeHtml(ctx.joke.id)} ]</span>
          </div>

          <div class="news-visual-content">
            <div class="news-emoji-disaster">${ctx.joke.emoji}</div>
            <div class="news-title-heavy">${ctx.formattedTitle}</div>
            <div class="news-subtitle-lead">${ctx.formattedSubtitle}</div>
          </div>

          <div class="news-teleprompter">
            <div class="tele-title">TRANSCRIPT FROM CRASH RECORDER:</div>
            <div class="tele-scroll">${logsHtml}</div>
          </div>
        </div>
      </div>

      <div class="news-lower-third">
        <div class="breaking-banner">
          <span class="breaking-label">${escapeHtml(cfg.badge || 'BREAKING NEWS')}</span>
          <span class="breaking-headline">${escapeHtml(cfg.statusHeadline || ctx.joke.title.split('\n')[0])}</span>
        </div>
        <div class="news-ticker-strip">
          <div class="ticker-content">${escapeHtml(ticker)} &nbsp; • &nbsp; ${escapeHtml(ticker)}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format 2: Fake iMessage / Chat Group Thread
 */
export function renderIMessage(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const author = cfg.authorName || 'Dave (Former Senior Staff Dev)';
  const handle = cfg.handle || '+1 (555) 404-DAVE';

  const bubblesHtml = ctx.sanitizedLogs
    .map((l, i) => {
      const isMe = i % 2 === 1;
      const bubbleClass = isMe ? 'bubble-me' : 'bubble-them';
      const delay = (0.25 + i * 0.15).toFixed(2);
      return `<div class="chat-bubble ${bubbleClass}" style="--d: ${delay}s">${escapeHtml(l)}</div>`;
    })
    .join('');

  return `
    <div class="format-container format-imessage" data-draggable="true">
      <div class="imessage-header">
        <div class="imessage-back-btn">‹ Messages</div>
        <div class="imessage-contact">
          <div class="contact-avatar">${cfg.avatarEmoji || '💻'}</div>
          <div class="contact-name">${escapeHtml(author)}</div>
          <div class="contact-handle">${escapeHtml(handle)}</div>
        </div>
        <div class="imessage-call-btn">Details</div>
      </div>

      <div class="imessage-thread">
        <div class="thread-timestamp">Today 4:04 PM • Incident Thread</div>
        
        <div class="imessage-hero-card">
          <div class="hero-emoji-large">${ctx.joke.emoji}</div>
          <div class="imessage-hero-title">${ctx.formattedTitle}</div>
          <div class="imessage-hero-subtitle">${ctx.formattedSubtitle}</div>
        </div>

        <div class="bubbles-stack">
          ${bubblesHtml}
        </div>

        <!-- Eternal Dave is typing indicator -->
        <div class="typing-bubble-container" title="Typing... (Will never resolve)">
          <div class="typing-bubble">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
          <span class="typing-label">${escapeHtml(author.split(' ')[0])} is typing...</span>
        </div>

        <div class="read-receipt">${escapeHtml(cfg.stampText || 'Read 6 months ago')}</div>
      </div>
    </div>
  `;
}

/**
 * Format 3: Corporate Restructuring Memo / JIRA Card
 */
export function renderCorporateMemo(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const logsHtml = ctx.sanitizedLogs
    .map((l) => `<li class="memo-audit-line"><code>${escapeHtml(l)}</code></li>`)
    .join('');

  return `
    <div class="format-container format-corporate-memo" data-draggable="true">
      <div class="memo-paper">
        <div class="memo-confidential-stamp">${escapeHtml(cfg.stampText || 'CONFIDENTIAL / Q4 REORG')}</div>
        
        <div class="memo-header">
          <div class="memo-field"><span class="lbl">TO:</span> All Engineering Personnel, Stakeholders &amp; Interns</div>
          <div class="memo-field"><span class="lbl">FROM:</span> ${escapeHtml(cfg.authorName || 'VP of Synergistic Refactoring')}</div>
          <div class="memo-field"><span class="lbl">DATE:</span> ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          <div class="memo-field"><span class="lbl">RE:</span> <span class="memo-subj">${escapeHtml(cfg.badge || 'Architecture Optimization Notice')}</span></div>
        </div>

        <div class="memo-separator"></div>

        <div class="memo-body">
          <div class="memo-hero-statement">
            <div class="memo-emoji">${ctx.joke.emoji}</div>
            <h2 class="memo-title">${ctx.formattedTitle}</h2>
          </div>
          <p class="memo-desc">${ctx.formattedSubtitle}</p>

          <div class="memo-action-items">
            <div class="action-items-title">📌 Root Cause &amp; Telemetry Action Items:</div>
            <ul class="memo-list">
              ${logsHtml}
            </ul>
          </div>

          <div class="memo-signature">
            <div class="sig-line"><em>"We are confident this refactor will unlock 10x developer velocity once finished."</em></div>
            <div class="sig-author">— Management (Currently on vacation)</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format 4: Storage Full Panic / OS Alert Dialogs
 */
export function renderStoragePanic(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const logsHtml = ctx.sanitizedLogs
    .map((l, i) => `<div class="panic-log-entry" style="--d: ${0.2 + i * 0.1}s">${escapeHtml(l)}</div>`)
    .join('');

  return `
    <div class="format-container format-storage-panic" data-draggable="true">
      <div class="panic-window-stack">
        
        <!-- Primary Modal Alert -->
        <div class="os-alert-modal">
          <div class="alert-icon-wrap">
            <div class="panic-pulse-ring"></div>
            <div class="alert-emoji">${ctx.joke.emoji}</div>
          </div>

          <div class="alert-content">
            <div class="alert-badge-top">${escapeHtml(cfg.badge || 'CRITICAL SYSTEM ALERT')}</div>
            <h2 class="alert-heading">${ctx.formattedTitle}</h2>
            <p class="alert-message">${ctx.formattedSubtitle}</p>

            <div class="storage-gauge">
              <div class="gauge-bar"><div class="gauge-fill fill-overflow"></div></div>
              <div class="gauge-labels">
                <span>Disk Allocation: 99.98%</span>
                <span class="danger-text">${escapeHtml(cfg.stampText || 'CAPACITY EXCEEDED')}</span>
              </div>
            </div>

            <div class="panic-logs-box">
              <div class="panic-logs-title">SYSTEM RECOVERY LOG:</div>
              <div class="panic-logs-scroll">${logsHtml}</div>
            </div>

            <div class="alert-actions">
              <button type="button" class="os-btn os-btn-secondary" onclick="escalatePanic(this)">Ignore Warning</button>
              <button type="button" class="os-btn os-btn-primary" onclick="escalatePanic(this)">Allocate More GB</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Format 5: SaaS Status Page Facade ("All Systems Operational 🟢")
 */
export function renderStatusPage(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const logsHtml = ctx.sanitizedLogs
    .map((l) => `<div class="status-timeline-entry"><span class="time">14:04 UTC</span> <span class="msg">${escapeHtml(l)}</span></div>`)
    .join('');

  return `
    <div class="format-container format-status-page" data-draggable="true">
      <div class="statuspage-card">
        <div class="status-masthead">
          <div class="status-brand">
            <span class="status-logo">⚡</span>
            <span class="status-company">Global Cloud Infrastructure</span>
          </div>
          <div class="uptime-badge">99.999% SLA</div>
        </div>

        <div class="status-banner-clean status-banner-glitch" onclick="triggerStatusGlitch()">
          <span class="status-dot-pulse"></span>
          <span class="banner-text">All Systems Operational</span>
          <span class="banner-fire-overlay">🔥 EVERYTHING IS ON FIRE 🔥</span>
        </div>

        <div class="status-hero-incident">
          <div class="incident-emoji">${ctx.joke.emoji}</div>
          <h2 class="incident-title">${ctx.formattedTitle}</h2>
          <p class="incident-summary">${ctx.formattedSubtitle}</p>
        </div>

        <div class="services-status-grid">
          <div class="service-item"><span class="dot-green">🟢</span> Edge CDN <span class="op">Operational</span></div>
          <div class="service-item"><span class="dot-green">🟢</span> User Authentication <span class="op">Operational</span></div>
          <div class="service-item service-failing"><span class="dot-failing">🔥</span> Your Requested Route <span class="down">404 VAPORIZED</span></div>
          <div class="service-item"><span class="dot-green">🟢</span> Billing System <span class="op">Operational (100%)</span></div>
        </div>

        <div class="incident-timeline">
          <div class="timeline-heading">INCIDENT TELEMETRY &amp; RESOLUTION:</div>
          <div class="timeline-body">${logsHtml}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format 6: Viral Tweet / Quote-Dunk Post
 */
export function renderTweet(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const author = cfg.authorName || 'Friday Deployer ✈️';
  const handle = cfg.handle || '@merged_at_458pm';

  const logsHtml = ctx.sanitizedLogs
    .map((l) => `<div class="tweet-log-snippet">${escapeHtml(l)}</div>`)
    .join('');

  return `
    <div class="format-container format-tweet" data-draggable="true">
      <div class="tweet-card">
        <div class="tweet-author-row">
          <div class="tweet-avatar">${cfg.avatarEmoji || '🧑‍💻'}</div>
          <div class="tweet-author-meta">
            <div class="author-name-line">
              <span class="author-name">${escapeHtml(author)}</span>
              <span class="fake-verified-badge" title="Certified on-call survivor">✓</span>
              <span class="author-handle">${escapeHtml(handle)}</span>
            </div>
            <div class="tweet-date">5:58 PM · Just now</div>
          </div>
          <div class="tweet-more">•••</div>
        </div>

        <div class="tweet-main-body">
          <div class="tweet-text">${ctx.formattedTitle}</div>
          <div class="tweet-subtitle">${ctx.formattedSubtitle}</div>
        </div>

        <!-- Quote Tweet Dunk -->
        <div class="quote-tweet-box">
          <div class="quote-author-row">
            <span class="quote-avatar">${ctx.joke.emoji}</span>
            <span class="quote-name">Production Server</span>
            <span class="quote-handle">@prod_east_1</span>
          </div>
          <div class="quote-content">
            ${logsHtml}
          </div>
        </div>

        <div class="tweet-metrics">
          <div class="metric-item"><strong>404</strong> Reposts</div>
          <div class="metric-item"><strong>1.2M</strong> Views</div>
          <div class="metric-item"><strong>0</strong> Passing Tests</div>
        </div>

        <div class="tweet-actions-bar">
          <button type="button" class="tweet-btn">💬 404</button>
          <button type="button" class="tweet-btn">🔁 404</button>
          <button type="button" class="tweet-btn tweet-like-btn" onclick="likeTweet(this)">❤️ 0</button>
          <button type="button" class="tweet-btn">📤</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format 7: Abandoned StackOverflow Thread
 */
export function renderStackOverflow(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const author = cfg.authorName || 'hackerman_2016';
  const logsHtml = ctx.sanitizedLogs.map((l) => escapeHtml(l)).join('\n');

  return `
    <div class="format-container format-stackoverflow" data-draggable="true">
      <div class="so-post-container">
        <div class="so-header">
          <div class="so-badge-status">${escapeHtml(cfg.badge || '[CLOSED - DUPLICATE]')}</div>
          <h2 class="so-question-title">${ctx.formattedTitle}</h2>
          <div class="so-meta-strip">
            <span>Asked <strong>8 years, 4 months ago</strong></span>
            <span>Modified <strong>today</strong></span>
            <span>Viewed <strong>404k times</strong></span>
          </div>
        </div>

        <div class="so-vote-layout">
          <div class="so-vote-col">
            <button type="button" class="so-vote-btn">▲</button>
            <span class="so-vote-count">404</span>
            <button type="button" class="so-vote-btn">▼</button>
            <span class="so-star">★</span>
          </div>

          <div class="so-content-col">
            <p class="so-desc">${ctx.formattedSubtitle}</p>
            <pre class="so-code-snippet"><code>${logsHtml}</code></pre>
            
            <div class="so-author-signature">
              <div class="so-sig-card">
                <span class="sig-time">asked Nov 14, 2016 at 03:42</span>
                <span class="sig-user">👤 ${escapeHtml(author)} (14.2k)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Accepted Answer -->
        <div class="so-accepted-answer">
          <div class="so-accepted-badge">✓ ACCEPTED ANSWER</div>
          <p class="so-answer-text">
            <em>"Never mind guys, I figured out what was wrong and fixed it in production."</em>
          </p>
          <div class="so-answer-footnote">
            *(No code or explanation was provided. Last seen: 8 years ago)*
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format 8: GitHub PR Review Rubber-Stamp
 */
export function renderPrReview(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const author = cfg.authorName || 'reviewer_bot';
  const logsHtml = ctx.sanitizedLogs
    .map((l) => `<div class="pr-diff-line">${escapeHtml(l)}</div>`)
    .join('');

  return `
    <div class="format-container format-pr-review" data-draggable="true">
      <div class="pr-card">
        <div class="pr-header">
          <div class="pr-status-pill pr-status-open">● Open</div>
          <h2 class="pr-title">${ctx.formattedTitle} <span class="pr-number">#404</span></h2>
        </div>

        <div class="pr-meta-row">
          <span>${escapeHtml(author)} wants to merge into <code>main</code> from <code>feature/hope-this-works</code></span>
        </div>

        <div class="pr-body-card">
          <div class="pr-emoji-mast">${ctx.joke.emoji}</div>
          <div class="pr-description">${ctx.formattedSubtitle}</div>
          
          <div class="pr-diff-viewer">
            <div class="diff-header">Unified Diff (404 additions, 0 deletions)</div>
            <div class="diff-content">${logsHtml}</div>
          </div>
        </div>

        <!-- Reviewer Verdict -->
        <div class="pr-review-verdict">
          <div class="reviewer-avatar">🤖</div>
          <div class="verdict-content">
            <div class="verdict-heading">
              <strong>Senior Staff Reviewer</strong> approved these changes
              <span class="lgtm-stamp">${escapeHtml(cfg.stampText || 'LGTM SHIP IT 🚀')}</span>
            </div>
            <p class="verdict-comment">
              <em>"Didn't pull locally or run tests, but looks pretty clean to me. Merging!"</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format 9: Receipt / "Certified Bruh Moment" Stamp
 */
export function renderReceiptStamp(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const logsHtml = ctx.sanitizedLogs
    .map((l, i) => `<div class="receipt-item"><span class="r-idx">#${i + 1}</span> <span class="r-txt">${escapeHtml(l)}</span></div>`)
    .join('');

  return `
    <div class="format-container format-receipt-stamp" data-draggable="true">
      <div class="receipt-slip">
        <div class="receipt-zigzag-top"></div>
        
        <div class="receipt-header">
          <div class="receipt-store">💥 WITTY INCIDENT AUDIT 💥</div>
          <div class="receipt-badge">${escapeHtml(cfg.badge || 'TRANSACTION FAILED: 404')}</div>
          <div class="receipt-meta">DATE: ${new Date().toISOString()} • TERM: IAD1</div>
        </div>

        <div class="receipt-divider">================================</div>

        <div class="receipt-hero">
          <div class="r-emoji">${ctx.joke.emoji}</div>
          <div class="r-title">${ctx.formattedTitle}</div>
          <div class="r-subtitle">${ctx.formattedSubtitle}</div>
        </div>

        <div class="receipt-divider">--------------------------------</div>

        <div class="receipt-items-list">
          ${logsHtml}
        </div>

        <div class="receipt-divider">================================</div>

        <div class="receipt-total-row">
          <span>TOTAL DAMAGE:</span>
          <span>$0.00 (PRICELESS)</span>
        </div>

        <!-- Diagonal Stamp Overlay -->
        <div class="diagonal-bruh-stamp" onclick="slamStamp(this)">
          ${escapeHtml(cfg.stampText || 'CERTIFIED BRUH MOMENT')}
        </div>

        <div class="receipt-zigzag-bottom"></div>
      </div>
    </div>
  `;
}

/**
 * Format 10: Glitchcore Maximalist Terminal
 */
export function renderGlitchTerminal(ctx: FormatContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const logsHtml = ctx.sanitizedLogs
    .map((l, i) => `<div class="term-line" style="--d: ${0.2 + i * 0.1}s">${escapeHtml(l)}</div>`)
    .join('');

  return `
    <div class="format-container format-glitch-terminal" data-draggable="true">
      <!-- Floating stickers around terminal -->
      <div class="sticker sticker-1" data-drag-sticker="true">🏷️ ${escapeHtml(cfg.badge || 'ERROR 404')}</div>
      <div class="sticker sticker-2" data-drag-sticker="true">🔥 STAGING IS PROD</div>
      <div class="sticker sticker-3" data-drag-sticker="true">💀 SKILL ISSUE</div>

      <div class="glitch-term-window">
        <div class="glitch-term-bar">
          <div class="term-dots">
            <span class="d-red"></span>
            <span class="d-yellow"></span>
            <span class="d-green"></span>
          </div>
          <div class="term-title">panic_handler.sh (PID 404)</div>
          <div class="term-status">${escapeHtml(cfg.stampText || 'CORE DUMP')}</div>
        </div>

        <div class="glitch-term-body">
          <div class="term-hero-ascii">
            <div class="ascii-emoji">${ctx.joke.emoji}</div>
            <h2 class="ascii-title">${ctx.formattedTitle}</h2>
          </div>

          <p class="ascii-desc">${ctx.formattedSubtitle}</p>

          <div class="term-logs-stream">
            ${logsHtml}
          </div>

          <div class="term-prompt-line">
            <span class="p-user">root@edge-worker:</span><span class="p-path">~#</span>
            <span class="p-cmd">exit 404</span>
            <span class="p-cursor">█</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
