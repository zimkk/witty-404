import { Joke } from './jokes';
import { escapeHtml } from './template';
import { RenderOptions } from './templates/types';
import { getSceneNumeralsHtml } from './scene/numerals';
import { getSceneDebrisHtml, SceneContext } from './scene/debris';
import { getFullPageSceneStyles } from './scene/styles';
import { getFullPageSceneScripts } from './scene/scripts';

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

  const context: SceneContext = {
    joke,
    formattedTitle: formatMarkdown(joke.title),
    formattedSubtitle: formatMarkdown(joke.subtitle),
    formattedFootnote: formatMarkdown(joke.footnote),
    sanitizedLogs: joke.logs,
  };

  const numeralsHtml = getSceneNumeralsHtml(joke);
  const debrisHtml = getSceneDebrisHtml(context);
  const styles = getFullPageSceneStyles();
  const scripts = getFullPageSceneScripts(joke.logs);

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
  <!-- Ambient CRT scanline overlay -->
  <div class="scene-scanlines" aria-hidden="true"></div>

  <!-- Full-Page Scene Root Container -->
  <div class="scene-viewport-root">

    <!-- 1. Monumental 404 Numeral Stage (Z-Index: 1) -->
    ${numeralsHtml}

    <!-- 2. Scattered Debris, Pinned Logs & Graffiti Title (Z-Index: 20) -->
    ${debrisHtml}

    <!-- 3. Sticky Bottom Action Toolbar (Z-Index: 40) -->
    <footer class="scene-action-toolbar">
      <div class="toolbar-grp">
        <button type="button" class="scene-btn" id="btn-copy-logs" onclick="copyLogs()">
          📋 Copy Logs
        </button>
        <a href="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" target="_blank" class="scene-btn" title="Open Share Card SVG">
          🖼️ Share Card
        </a>
        <a href="/demo" target="_blank" class="scene-btn" title="Open Demo & Docs">
          ⚡ API Docs
        </a>
      </div>

      <div class="toolbar-grp">
        <button type="button" class="scene-btn scene-btn-primary" onclick="window.location.reload()">
          🎲 Another Joke
        </button>
      </div>
    </footer>

  </div>

  <script>
    ${scripts}
  </script>
</body>
</html>`;
}
