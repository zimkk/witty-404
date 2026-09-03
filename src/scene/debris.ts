import { Joke } from '../jokes';
import { escapeHtml } from '../template';
import { getJokeFormatConfig } from '../templates/registry';

export interface SceneContext {
  joke: Joke;
  formattedTitle: string;
  formattedSubtitle: string;
  formattedFootnote: string;
  sanitizedLogs: string[];
}

export function getSceneDebrisHtml(ctx: SceneContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const sampleLog = ctx.sanitizedLogs[0] || '> checking if route exists...';
  const lastPunchline = ctx.sanitizedLogs[ctx.sanitizedLogs.length - 1] || '> 404 NOT FOUND';

  // Format log lines for the pinned sticky note or telemetry card
  const pinnedLogsList = ctx.sanitizedLogs
    .slice(0, 4)
    .map((l) => `<div class="sticky-log-line">${escapeHtml(l)}</div>`)
    .join('');

  return `
    <div class="scattered-scene-viewport">

      <!-- 1. Top Perimeter: Status & Live Victim Readout -->
      <div class="scene-top-hud">
        <div class="victim-counter-pill" title="Live incident tracking">
          <span class="victim-pulse-dot"></span>
          <span class="victim-text">INCIDENT VICTIM #4,213 TODAY</span>
        </div>
        <div class="scene-location-tag">
          <span class="hud-region">IAD1-EDGE</span> • <span class="hud-route">404 VAPORIZED</span>
        </div>
      </div>

      <!-- 2. Pinned Sticky Note / Terminal Log Scrap (Top-Left) -->
      <div class="pinned-sticky-note" data-drag-sticker="true" title="Drag this note">
        <div class="sticky-pin">📌</div>
        <div class="sticky-header">// LOG TELEMETRY</div>
        <div class="sticky-content">
          ${pinnedLogsList}
        </div>
        <div class="sticky-tag">${escapeHtml(cfg.badge || 'ERROR DUMP')}</div>
      </div>

      <!-- 3. In-Scene Native Meme Fragment (Top-Right / Asymmetric) -->
      ${getInSceneMemeSnippet(ctx, cfg)}

      <!-- 4. Foreground Graffiti Punchline & Title (Compositionally Offset) -->
      <div class="scene-graffiti-block" data-draggable="true">
        <div class="graffiti-eyebrow">
          <span class="eyebrow-tag">${ctx.joke.emoji} #${ctx.joke.tags[0] || 'incident'}</span>
          <span class="graffiti-stamp">${escapeHtml(cfg.stampText || 'CERTIFIED SKILL ISSUE')}</span>
        </div>
        <h1 class="graffiti-title">${ctx.formattedTitle}</h1>
        <p class="graffiti-subtitle">${ctx.formattedSubtitle}</p>
        <div class="graffiti-punchline-highlight">
          <span class="punch-arrow">↳</span> ${escapeHtml(lastPunchline)}
        </div>
      </div>

      <!-- 5. Floating Stickers / Debris Badges -->
      <div class="floating-sticker sticker-a" data-drag-sticker="true">🔥 IT WORKED ON LOCALHOST</div>
      <div class="floating-sticker sticker-b" data-drag-sticker="true">💀 LGTM SHIP IT</div>

      <!-- 6. Bottom Fine Print Footnote -->
      <div class="scene-fineprint-footer">
        <div class="fineprint-content">
          ${ctx.formattedFootnote}
        </div>
      </div>

      <!-- 7. Full-Bleed Breaking News Ticker (for news-archetype jokes) -->
      ${
        cfg.archetype === 'news_chyron'
          ? `
        <div class="scene-bottom-ticker-bar">
          <div class="ticker-live-badge"><span class="ticker-dot"></span> BREAKING</div>
          <div class="ticker-marquee-track">
            <span class="ticker-text-item">${escapeHtml(cfg.tickerText || 'LIVE: HTTP 404 CRASH SITE CONFIRMED • ON-CALL SEEN PACKING BAGS')}</span>
            <span class="ticker-text-item">${escapeHtml(cfg.tickerText || 'LIVE: HTTP 404 CRASH SITE CONFIRMED • ON-CALL SEEN PACKING BAGS')}</span>
          </div>
        </div>
      `
          : ''
      }

    </div>
  `;
}

function getInSceneMemeSnippet(ctx: SceneContext, cfg: any): string {
  switch (cfg.archetype) {
    case 'imessage':
      return `
        <div class="inscene-chat-widget" data-drag-sticker="true">
          <div class="chat-widget-header">
            <span class="chat-av">${cfg.avatarEmoji || '💻'}</span>
            <span class="chat-name">${escapeHtml(cfg.authorName || 'Dave')}</span>
          </div>
          <div class="chat-widget-bubble">
            "It was working before I closed my laptop."
          </div>
          <div class="chat-widget-typing">
            <div class="typing-dot-jump"></div>
            <div class="typing-dot-jump"></div>
            <div class="typing-dot-jump"></div>
            <span class="typing-who">typing forever...</span>
          </div>
        </div>
      `;

    case 'storage_panic':
      return `
        <div class="inscene-panic-stack" data-drag-sticker="true" onclick="escalatePanic(this)">
          <div class="panic-alert-box">
            <div class="panic-icon">⚠️</div>
            <div class="panic-text">
              <strong>Disk Warning</strong><br/>
              4.8 GB node_modules detected
            </div>
          </div>
        </div>
      `;

    case 'tweet':
      return `
        <div class="inscene-tweet-card" data-drag-sticker="true">
          <div class="tweet-top-mini">
            <span class="t-av">${cfg.avatarEmoji || '🧑‍💻'}</span>
            <span class="t-name">${escapeHtml(cfg.authorName || 'DevOps')}</span>
            <span class="t-badge">✓</span>
          </div>
          <div class="tweet-body-mini">
            "Just pushed directly to main. Hope nothing breaks!"
          </div>
          <div class="tweet-stat-mini">
            404 Reposts • 0 Passing Tests
          </div>
        </div>
      `;

    case 'status_page':
      return `
        <div class="inscene-status-strip" data-drag-sticker="true" onclick="triggerStatusGlitch()">
          <span class="status-pulse-green"></span>
          <span>Status: 100% Operational</span>
          <span class="status-fire-tag">🔥 (UNTRUE)</span>
        </div>
      `;

    case 'stackoverflow':
      return `
        <div class="inscene-so-box" data-drag-sticker="true">
          <div class="so-mini-badge">[CLOSED - DUPLICATE]</div>
          <div class="so-mini-ans">
            <em>"Never mind, solved it."</em>
            <div class="so-mini-foot">(Last seen 8 years ago)</div>
          </div>
        </div>
      `;

    default:
      return `
        <div class="inscene-stamp-card" data-drag-sticker="true" onclick="slamStamp(this)">
          <div class="stamp-border">${escapeHtml(cfg.stampText || 'CERTIFIED BRUH MOMENT')}</div>
        </div>
      `;
  }
}
