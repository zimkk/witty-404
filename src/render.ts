import { Joke } from './jokes';
import { escapeHtml } from './template';
import { FormatContext, RenderOptions } from './templates/types';
import { getJokeFormatConfig } from './templates/registry';
import {
  renderNewsChyron,
  renderIMessage,
  renderCorporateMemo,
  renderStoragePanic,
  renderStatusPage,
  renderTweet,
  renderStackOverflow,
  renderPrReview,
  renderReceiptStamp,
  renderGlitchTerminal,
} from './templates/formats';
import { getTemplateStyles } from './templates/styles';
import { getTemplateScripts } from './templates/scripts';

export { RenderOptions } from './templates/types';

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
  const cfg = getJokeFormatConfig(joke.id);

  const context: FormatContext = {
    joke,
    options,
    formattedTitle: formatMarkdown(joke.title),
    formattedSubtitle: formatMarkdown(joke.subtitle),
    formattedFootnote: formatMarkdown(joke.footnote),
    sanitizedLogs: joke.logs,
  };

  let formatHtml = '';
  switch (cfg.archetype) {
    case 'news_chyron':
      formatHtml = renderNewsChyron(context);
      break;
    case 'imessage':
      formatHtml = renderIMessage(context);
      break;
    case 'corporate_memo':
      formatHtml = renderCorporateMemo(context);
      break;
    case 'storage_panic':
      formatHtml = renderStoragePanic(context);
      break;
    case 'status_page':
      formatHtml = renderStatusPage(context);
      break;
    case 'tweet':
      formatHtml = renderTweet(context);
      break;
    case 'stackoverflow':
      formatHtml = renderStackOverflow(context);
      break;
    case 'pr_review':
      formatHtml = renderPrReview(context);
      break;
    case 'receipt_stamp':
      formatHtml = renderReceiptStamp(context);
      break;
    case 'glitch_terminal':
      formatHtml = renderGlitchTerminal(context);
      break;
    default:
      formatHtml = renderTweet(context);
      break;
  }

  const styles = getTemplateStyles();
  const scripts = getTemplateScripts(joke.logs);

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
    ${styles}
  </style>
</head>
<body>

  <!-- Top Viewport Bar -->
  <header class="viewport-topbar">
    <div class="brand-pill">
      <span class="spark">💥</span>
      <span>witty-404</span>
    </div>
    <div class="theme-indicator">
      Theme: <strong>${escapeHtml(selectedTheme)}</strong>
    </div>
  </header>

  <!-- Main Format Stage -->
  <main class="stage-canvas">
    ${formatHtml}
  </main>

  <!-- Bottom Embed & Action Toolbar -->
  <footer class="viewport-bottom-bar">
    <div class="toolbar-left">
      <button type="button" class="tool-btn" id="btn-copy-logs" onclick="copyLogs()">
        📋 Copy Logs
      </button>
      <a href="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" target="_blank" class="tool-btn" title="Open Share Card SVG">
        🖼️ Share Card
      </a>
      <a href="/demo" target="_blank" class="tool-btn" title="Open Demo & Docs">
        ⚡ API Docs
      </a>
    </div>

    <div class="toolbar-right">
      <button type="button" class="tool-btn tool-btn-primary" onclick="window.location.reload()">
        🎲 Another Joke
      </button>
    </div>
  </footer>

  <script>
    ${scripts}
  </script>
</body>
</html>`;
}
