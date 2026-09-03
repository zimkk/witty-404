import { Joke } from '../jokes';
import { escapeHtml } from '../template';

export function getSceneNumeralsHtml(joke: Joke): string {
  switch (joke.id) {
    case 'plane-crash':
      return `
        <div class="monumental-404-stage set-plane-crash" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="crashed-plane-wreckage" data-drag-wreckage="true" title="Drag the wreckage">
              <div class="plane-fuselage">✈️</div>
              <div class="impact-fire">💥</div>
              <div class="billowing-smoke s1">💨</div>
              <div class="billowing-smoke s2">💨</div>
              <div class="billowing-smoke s3">💨</div>
              <div class="debris-scrap d1">⚙️</div>
              <div class="debris-scrap d2">🔩</div>
            </div>
          </div>
          <div class="num-digit num-last">4</div>
          <div class="ground-scorch-mark"></div>
        </div>
      `;

    case 'daves-laptop':
      return `
        <div class="monumental-404-stage set-daves-laptop" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="perched-laptop-prop" data-drag-wreckage="true" title="Dave's abandoned laptop">
              <div class="prop-screen">
                <div class="prop-screen-text">dave@mbp:~$ npm run prod<span class="prop-cursor">_</span></div>
              </div>
              <div class="prop-keyboard"></div>
              <div class="prop-tape-label">PROPERTY OF DAVE (DO NOT TOUCH)</div>
            </div>
          </div>
          <div class="num-digit num-last">4</div>
        </div>
      `;

    case 'folder-structure':
      return `
        <div class="monumental-404-stage set-folder-structure" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="avalanche-folders">
              <div class="folder-pile f1">📁 /src</div>
              <div class="folder-pile f2">📁 /infrastructure/v2</div>
              <div class="folder-pile f3">📁 /adapters/deprecated</div>
              <div class="folder-pile f4">📁 /utils/helpers/final</div>
              <div class="dust-puff dp1">▫️</div>
              <div class="dust-puff dp2">▫️</div>
            </div>
          </div>
          <div class="num-digit num-last">4</div>
        </div>
      `;

    case 'node-modules':
      return `
        <div class="monumental-404-stage set-node-modules" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="bursting-progress-prop">
              <div class="burst-bar">
                <div class="burst-fill"></div>
              </div>
              <div class="burst-badge">⚠️ 4.8 GB (DISK CRITICAL)</div>
            </div>
          </div>
          <div class="num-digit num-last">4</div>
        </div>
      `;

    case 'perfect-uptime':
      return `
        <div class="monumental-404-stage set-perfect-uptime" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="uptime-lamp-fixture" onclick="triggerStatusGlitch()" title="Click to inspect status lamp">
              <div class="lamp-core lamp-green"></div>
              <div class="lamp-fire-overlay">🔥</div>
              <div class="lamp-smoke-puff">💨</div>
              <div class="lamp-caption">99.999% SLA</div>
            </div>
          </div>
          <div class="num-digit num-last">4</div>
        </div>
      `;

    case 'friday-deploy':
      return `
        <div class="monumental-404-stage set-friday-deploy" aria-hidden="true">
          <div class="num-digit num-first scorched-digit">
            <span class="digit-glyph">4</span>
            <div class="rocket-blast-trail">🚀💨🔥</div>
          </div>
          <div class="num-digit num-zero">0</div>
          <div class="num-digit num-last">4</div>
        </div>
      `;

    case 'staging-is-prod':
      return `
        <div class="monumental-404-stage set-staging-prod" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">0</div>
          <div class="num-digit num-last">4</div>
          <div class="stage-massive-stamp">PROD == STAGING</div>
        </div>
      `;

    case 'ancient-todo':
      return `
        <div class="monumental-404-stage set-ancient-todo" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero cobwebbed-digit">
            <div class="digit-glyph">0</div>
            <div class="cobweb-layer">🕸️</div>
            <div class="vintage-year-tag">CIRCA 2016</div>
          </div>
          <div class="num-digit num-last">4</div>
        </div>
      `;

    case 'pr-meeting':
      return `
        <div class="monumental-404-stage set-pr-meeting" aria-hidden="true">
          <div class="num-digit num-first diff-red-digit">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="diff-bar-overlay">
              <span class="d-add">+4,892</span>
              <span class="d-del">-2</span>
            </div>
          </div>
          <div class="num-digit num-last diff-green-digit">4</div>
        </div>
      `;

    default:
      return `
        <div class="monumental-404-stage set-default" aria-hidden="true">
          <div class="num-digit num-first">4</div>
          <div class="num-digit num-zero">
            <div class="digit-glyph">0</div>
            <div class="center-stage-emoji">${joke.emoji}</div>
          </div>
          <div class="num-digit num-last">4</div>
        </div>
      `;
  }
}
