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
  const logLines = ctx.sanitizedLogs;

  switch (cfg.archetype) {
    case 'imessage':
      return `
        <div class="meme-card imessage-card">
          <div class="imessage-top">
            <span>${cfg.avatarEmoji || '💻'}</span>
            <span>${escapeHtml(cfg.authorName || 'Dave')}</span>
            <span style="color: var(--text-dim); font-size: 0.75rem; margin-left: auto;">${escapeHtml(cfg.handle || 'iMessage')}</span>
          </div>

          <div class="chat-bubble-stack">
            ${logLines.map((l, i) => {
              const isMe = i % 2 === 1;
              return `<div class="bubble ${isMe ? 'bubble-me' : 'bubble-them'}">${escapeHtml(l)}</div>`;
            }).join('')}
          </div>

          <div class="typing-row">
            <div class="typing-box">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <span class="typing-text">${escapeHtml((cfg.authorName || 'Dave').split(' ')[0])} is typing...</span>
          </div>
        </div>
      `;

    case 'tweet':
      return `
        <div class="meme-card tweet-card">
          <div class="tweet-author-header">
            <span class="tweet-av">${cfg.avatarEmoji || '🧑‍💻'}</span>
            <div class="tweet-names">
              <div class="tweet-name-line">
                <span>${escapeHtml(cfg.authorName || 'DevOps Lead')}</span>
                <span class="tweet-verified">✓</span>
              </div>
              <span class="tweet-handle">${escapeHtml(cfg.handle || '@on_call_survivor')}</span>
            </div>
          </div>

          <div style="font-size: 1.05rem; font-weight: 600; color: #FFF; margin-bottom: 0.5rem;">
            ${ctx.formattedTitle}
          </div>

          <div class="tweet-quote-box">
            <div style="font-size: 0.75rem; color: #64748B; margin-bottom: 0.35rem;">REPLYING TO @production_server:</div>
            ${logLines.slice(0, 3).map(l => `<div>${escapeHtml(l)}</div>`).join('')}
          </div>

          <div class="tweet-stats-line">
            <span><strong>404</strong> Reposts</span>
            <span><strong>1.2M</strong> Views</span>
            <span><strong>0</strong> Passing Tests</span>
          </div>
        </div>
      `;

    case 'status_page':
      return `
        <div class="meme-card status-card">
          <div class="status-header-line">
            <span>⚡ Global Cloud Status</span>
            <span style="color: #34D399; font-family: var(--font-mono); font-size: 0.75rem;">99.999% SLA</span>
          </div>

          <div class="status-banner">
            <span style="color: #10B981;">🟢</span> All Systems Operational
          </div>

          <div class="status-grid">
            <div class="status-row"><span>Authentication Gateway</span> <span style="color: #34D399;">Operational</span></div>
            <div class="status-row"><span>Billing Pipeline</span> <span style="color: #34D399;">Operational</span></div>
            <div class="status-row failing"><span>Your Requested URL</span> <span>🔥 404 VAPORIZED</span></div>
          </div>
        </div>
      `;

    case 'receipt_stamp':
      return `
        <div class="meme-card receipt-card">
          <div style="text-align: center; margin-bottom: 0.75rem; font-weight: 800;">
            💥 INCIDENT REPORT AUDIT 💥
          </div>
          <div style="border-top: 1px dashed var(--card-border); padding-top: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8rem; color: #38BDF8;">
            ${logLines.map((l, i) => `<div>#${i + 1} ${escapeHtml(l)}</div>`).join('')}
          </div>
          <div class="receipt-stamp-overlay">
            ${escapeHtml(cfg.stampText || 'CERTIFIED BRUH MOMENT')}
          </div>
        </div>
      `;

    case 'stackoverflow':
      return `
        <div class="meme-card" style="padding: 1.5rem;">
          <div style="display: inline-block; background: rgba(239, 68, 68, 0.15); color: #F87171; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; margin-bottom: 0.75rem;">
            [CLOSED - DUPLICATE]
          </div>
          <div style="font-size: 1.1rem; font-weight: 700; color: #FFF; margin-bottom: 0.75rem;">
            ${ctx.formattedTitle}
          </div>
          <div style="background: #05070B; border: 1px solid var(--card-border); border-radius: 6px; padding: 0.85rem; font-family: var(--font-mono); font-size: 0.8rem; color: #93C5FD; margin-bottom: 1rem;">
            ${logLines.slice(0, 3).map(l => `<div>${escapeHtml(l)}</div>`).join('')}
          </div>
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 0.75rem 1rem; font-size: 0.85rem; color: #E2E8F0;">
            <strong style="color: #34D399;">✓ Accepted Answer:</strong> <em>"Never mind guys, I figured out the fix."</em> <span style="color: #64748B; font-size: 0.75rem;">(No solution attached • 8 yrs ago)</span>
          </div>
        </div>
      `;

    default:
      // Standard Terminal Flight Recorder
      return `
        <div class="meme-card terminal-card">
          <div class="terminal-header">
            <div class="mac-dots">
              <span class="dot-r"></span>
              <span class="dot-y"></span>
              <span class="dot-g"></span>
            </div>
            <span>flight_recorder_${escapeHtml(ctx.joke.id)}.log</span>
            <span style="color: #EF4444; font-weight: 700;">ERR_404</span>
          </div>
          <div class="terminal-body">
            ${logLines.map((l, i) => {
              const isLast = i === logLines.length - 1;
              return `<div class="term-line ${isLast ? 'term-line-punch' : ''}">${escapeHtml(l)}</div>`;
            }).join('')}
          </div>
        </div>
      `;
  }
}
