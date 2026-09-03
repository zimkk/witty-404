import { Joke } from './jokes';
import { escapeHtml } from './template';
import { RenderOptions } from './templates/types';
import { getJokeFormatConfig } from './templates/registry';
import { getSceneNumeralsHtml } from './scene/numerals';
import { getSceneDebrisHtml, SceneContext } from './scene/debris';
import { getFullPageSceneStyles } from './scene/styles';
import { getFullPageSceneScripts } from './scene/scripts';

export { RenderOptions } from './templates/types';

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
<html lang="en" data-theme="${escapeHtml(selectedTheme)}" data-archetype="${escapeHtml(cfg.archetype)}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 — ${escapeHtml(joke.title.split('\n')[0])}</title>
  <meta name="description" content="${escapeHtml(joke.subtitle.replace(/[*\`_]/g, ''))}" />
  <meta property="og:title" content="404 — ${escapeHtml(joke.title.replace(/\n/g, ' '))}" />
  <meta property="og:description" content="${escapeHtml(joke.subtitle.replace(/[*\`_]/g, ''))}" />
  <meta property="og:image" content="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="404 — ${escapeHtml(joke.title.replace(/\n/g, ' '))}" />
  <meta name="twitter:image" content="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    ${styles}
  </style>
</head>
<body>

  <main class="main-wrapper">
    <div class="top-hud">
      <div class="hud-badge">
        <span class="dot"></span>
        <span>HTTP 404 NOT FOUND</span>
      </div>
      <div class="hud-badge">
        <span>THEME: ${escapeHtml(selectedTheme.toUpperCase())}</span>
      </div>
    </div>

    ${numeralsHtml}

    ${debrisHtml}

    <div class="joke-footnote-text">
      ${context.formattedFootnote}
    </div>

    <footer class="action-toolbar">
      <button type="button" class="btn-action" id="btn-copy-logs" onclick="copyLogs()">
        📋 Copy Logs
      </button>
      <button type="button" class="btn-action btn-action-primary" onclick="loadAnotherJoke()">
        🎲 Another Joke
      </button>
      <a href="/svg?id=${encodeURIComponent(joke.id)}&theme=${encodeURIComponent(selectedTheme)}" target="_blank" class="btn-action" title="Open Share Card SVG">
        🖼️ Share Card
      </a>
      <a href="/docs" target="_blank" class="btn-action" title="Open API Docs">
        ⚡ API Docs
      </a>
    </footer>
  </main>

  <script>
    ${scripts}
  </script>
</body>
</html>`;
}
