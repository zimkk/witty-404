export const docsHtml: string = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Documentation — witty-404</title>
  <meta name="description" content="Complete API reference, integration recipes, and endpoint tester for witty-404." />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <style>
    /* ==========================================================================
       INTENSE PITCH-BLACK DEVELOPER DOCUMENTATION DESIGN SYSTEM
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #000000;
      --sidebar-bg: #04060A;
      --card-bg: #07090E;
      --card-elevated: #0E121A;
      --border: #181C26;
      --border-hover: #262D3D;
      --text-white: #FFFFFF;
      --text-muted: #8B949E;
      --text-dim: #545D68;
      --accent: #38BDF8;
      --accent-dim: rgba(56, 189, 248, 0.08);
      --success: #10B981;
      --danger: #EF4444;
      --warning: #F59E0B;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace;
    }

    html {
      background-color: var(--bg);
      color: var(--text-white);
      font-family: var(--font-sans);
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.6;
      background: #000000;
    }

    /* Top Navigation */
    header.docs-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }

    .nav-container {
      max-width: 1360px;
      margin: 0 auto;
      padding: 0.85rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      text-decoration: none;
      color: var(--text-white);
      font-weight: 800;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
    }

    .nav-logo-svg {
      width: 24px;
      height: 24px;
      display: block;
    }

    .nav-brand-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--accent);
      background: var(--accent-dim);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-weight: 700;
    }

    .nav-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: color 0.15s;
    }
    .nav-link:hover { color: var(--text-white); }

    .nav-btn {
      background: var(--card-elevated);
      color: var(--text-white);
      border: 1px solid var(--border);
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-size: 0.825rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s;
    }
    .nav-btn:hover { border-color: var(--accent); }

    /* Docs Main Layout: Sidebar + Content */
    .docs-layout {
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
      display: grid;
      grid-template-columns: 260px 1fr;
      flex: 1;
      border-bottom: 1px solid var(--border);
    }

    /* Sidebar */
    aside.docs-sidebar {
      background: var(--sidebar-bg);
      border-right: 1px solid var(--border);
      padding: 2rem 1.25rem 4rem;
      position: sticky;
      top: 55px;
      height: calc(100vh - 55px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .sidebar-section-title {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--text-dim);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .sidebar-nav-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .sidebar-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.85rem;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.15s;
    }

    .sidebar-link:hover, .sidebar-link.active {
      color: var(--text-white);
      background: var(--card-elevated);
    }

    .sidebar-badge {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      padding: 0.1rem 0.35rem;
      border-radius: 3px;
    }
    .badge-get { background: rgba(16, 185, 129, 0.15); color: #10B981; }

    /* Content Area */
    main.docs-content {
      padding: 2.5rem 3rem 6rem;
      max-width: 960px;
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .doc-section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      scroll-margin-top: 80px;
    }

    .doc-heading {
      font-size: 1.85rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: var(--text-white);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .doc-subheading {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-white);
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-top: 0.5rem;
    }

    .doc-lead {
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.65;
    }

    /* Tables */
    .docs-table-container {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow-x: auto;
    }

    table.docs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      text-align: left;
    }

    table.docs-table th {
      background: var(--card-elevated);
      padding: 0.65rem 1rem;
      border-bottom: 1px solid var(--border);
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    table.docs-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
      color: var(--text-muted);
    }
    table.docs-table tr:last-child td { border-bottom: none; }

    .param-name {
      font-family: var(--font-mono);
      color: #38BDF8;
      font-weight: 700;
    }

    .param-type {
      font-family: var(--font-mono);
      color: var(--text-dim);
      font-size: 0.75rem;
    }

    /* Code Blocks */
    .code-block-container {
      background: #000000;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1rem;
      position: relative;
      overflow-x: auto;
    }

    .code-block {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #93C5FD;
      white-space: pre;
      line-height: 1.5;
    }

    .btn-copy-code {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--card-elevated);
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-size: 0.7rem;
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-copy-code:hover {
      border-color: var(--accent);
      color: var(--text-white);
    }

    /* Callout Note */
    .callout-note {
      background: rgba(56, 189, 248, 0.04);
      border-left: 3px solid var(--accent);
      border-radius: 0 4px 4px 0;
      padding: 0.85rem 1.15rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .callout-note strong { color: var(--text-white); }

    /* Interactive API Tester Console */
    .tester-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .tester-form-row {
      display: grid;
      grid-template-columns: 140px 1fr 100px;
      gap: 0.75rem;
    }

    .tester-select, .tester-input {
      background: var(--card-elevated);
      border: 1px solid var(--border);
      color: var(--text-white);
      padding: 0.5rem 0.85rem;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }
    .tester-select:focus, .tester-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .btn-tester-send {
      background: #FFFFFF;
      color: #000000;
      font-weight: 700;
      font-size: 0.85rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: filter 0.15s;
    }
    .btn-tester-send:hover { filter: brightness(0.9); }

    .tester-response-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
    }

    .status-badge-ok {
      background: rgba(16, 185, 129, 0.15);
      color: #10B981;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      font-weight: 700;
    }

    .tester-response-viewer {
      background: #000000;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1rem;
      max-height: 340px;
      overflow: auto;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #A7F3D0;
      white-space: pre-wrap;
    }

    /* Footer */
    footer.docs-footer {
      border-top: 1px solid var(--border);
      background: #000000;
      padding: 2.5rem 1.5rem;
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .footer-inner {
      max-width: 1360px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .footer-links {
      display: flex;
      gap: 1.25rem;
    }
    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
    }
    .footer-links a:hover { color: var(--text-white); }

    @media (max-width: 860px) {
      .docs-layout { grid-template-columns: 1fr; }
      aside.docs-sidebar { display: none; }
      main.docs-content { padding: 2rem 1.25rem 4rem; }
      .tester-form-row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- Top Navigation -->
  <header class="docs-nav">
    <div class="nav-container">
      <a href="/demo" class="nav-brand" title="witty-404 Demo">
        <svg class="nav-logo-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="7" fill="#05070B"/>
          <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="#1E2538"/>
          <text x="16" y="21" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'SF Mono', ui-monospace, monospace" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="-0.5">404</text>
          <circle cx="26" cy="7" r="2.5" fill="#EF4444"/>
        </svg>
        <span>witty-404</span>
        <span class="nav-brand-badge">DOCS</span>
      </a>
      <div class="nav-actions">
        <a href="/demo" class="nav-link">Interactive Demo</a>
        <a href="/html" target="_blank" class="nav-link">Live Scene ↗</a>
        <a href="https://github.com/zimkk/witty-404" target="_blank" rel="noopener noreferrer" class="nav-btn">
          ⭐ Star on GitHub
        </a>
      </div>
    </div>
  </header>

  <div class="docs-layout">
    <!-- Sidebar -->
    <aside class="docs-sidebar">
      <div>
        <div class="sidebar-section-title">Overview</div>
        <ul class="sidebar-nav-list">
          <li><a href="#quickstart" class="sidebar-link active">60-Second Quickstart</a></li>
          <li><a href="#tester" class="sidebar-link">Live API Tester</a></li>
        </ul>
      </div>

      <div>
        <div class="sidebar-section-title">Core Endpoints</div>
        <ul class="sidebar-nav-list">
          <li>
            <a href="#endpoint-html" class="sidebar-link">
              <span>/html</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
          <li>
            <a href="#endpoint-json" class="sidebar-link">
              <span>/json</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
          <li>
            <a href="#endpoint-roast" class="sidebar-link">
              <span>/roast</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
          <li>
            <a href="#endpoint-terminal" class="sidebar-link">
              <span>/terminal</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
          <li>
            <a href="#endpoint-svg" class="sidebar-link">
              <span>/svg</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
          <li>
            <a href="#endpoint-text" class="sidebar-link">
              <span>/text</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
          <li>
            <a href="#endpoint-meta" class="sidebar-link">
              <span>/all · /stats · /count</span> <span class="sidebar-badge badge-get">GET</span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <div class="sidebar-section-title">Framework Recipes</div>
        <ul class="sidebar-nav-list">
          <li><a href="#recipe-nextjs" class="sidebar-link">Next.js 14+ (App Router)</a></li>
          <li><a href="#recipe-express" class="sidebar-link">Express & Fastify</a></li>
          <li><a href="#recipe-vercel" class="sidebar-link">Vercel Proxy</a></li>
          <li><a href="#recipe-netlify" class="sidebar-link">Netlify Redirects</a></li>
        </ul>
      </div>
    </aside>

    <!-- Content Area -->
    <main class="docs-content">
      <!-- Intro / Quickstart -->
      <section id="quickstart" class="doc-section">
        <h1 class="doc-heading">API Documentation — witty-404</h1>
        <p class="doc-lead">
          <strong>witty-404</strong> is an open-source, zero-dependency HTTP error engine hosted globally on Cloudflare Workers edge nodes. It delivers standalone error pages with pure CSS animated diagnostics, formatted JSON payloads, ASCII terminal logs, and dynamic social cards in sub-5ms latency.
        </p>

        <div class="callout-note">
          <strong>Zero API Keys Required:</strong> All endpoints are public, unauthenticated, and return <code>Access-Control-Allow-Origin: *</code>. Dynamic responses include strict anti-caching headers (<code>Cache-Control: no-store</code>) so every request delivers fresh comedic relief.
        </div>

        <h2 class="doc-subheading">60-Second Terminal Quickstart</h2>
        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, 'curl -s https://witty-404.zimkk.workers.dev/json | jq')">Copy</button>
          <div class="code-block"># 1. Fetch a random JSON joke payload
curl -s https://witty-404.zimkk.workers.dev/json | jq

# 2. Fetch raw ASCII terminal diagnostics
curl -s https://witty-404.zimkk.workers.dev/text

# 3. Roast a broken path
curl -s "https://witty-404.zimkk.workers.dev/roast?path=/api/v1/auth/token"</div>
        </div>
      </section>

      <!-- Live Interactive API Tester -->
      <section id="tester" class="doc-section">
        <h2 class="doc-heading">Live API Tester Console</h2>
        <p class="doc-lead">Test any witty-404 endpoint directly in your browser without leaving the documentation.</p>

        <div class="tester-card">
          <div class="tester-form-row">
            <select id="tester-method" class="tester-select">
              <option value="/json">GET /json</option>
              <option value="/text">GET /text</option>
              <option value="/terminal">GET /terminal</option>
              <option value="/roast?path=/dashboard/settings">GET /roast</option>
              <option value="/stats">GET /stats</option>
              <option value="/count">GET /count</option>
            </select>
            <input type="text" id="tester-params" class="tester-input" placeholder="Query params (e.g. ?id=plane-crash&theme=dark)" />
            <button class="btn-tester-send" onclick="runApiTest()">Send ⚡</button>
          </div>

          <div class="tester-response-header">
            <span>RESPONSE OUTPUT:</span>
            <span id="tester-status" class="status-badge-ok">READY</span>
          </div>

          <pre id="tester-output" class="tester-response-viewer">// Click "Send ⚡" to inspect live response</pre>
        </div>
      </section>

      <!-- Endpoint: GET /html -->
      <section id="endpoint-html" class="doc-section">
        <h2 class="doc-heading"><code>GET /html</code> — Standalone Error Scene</h2>
        <p class="doc-lead">
          Renders a complete, full-bleed standalone HTML 404 page featuring the diagnostic terminal, animated streaming logs, synchronized airplane flight crash sequence, and action buttons.
        </p>

        <h3 class="doc-subheading">Query Parameters</h3>
        <div class="docs-table-container">
          <table class="docs-table">
            <thead>
              <tr><th>PARAM</th><th>TYPE</th><th>DEFAULT</th><th>DESCRIPTION</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="param-name">id</span></td>
                <td><span class="param-type">string</span></td>
                <td>random</td>
                <td>Specific joke ID (e.g. <code>plane-crash</code>, <code>daves-laptop</code>, <code>friday-deploy</code>).</td>
              </tr>
              <tr>
                <td><span class="param-name">theme</span></td>
                <td><span class="param-type">string</span></td>
                <td><code>dark</code></td>
                <td>Color theme: <code>dark</code>, <code>light</code>, <code>matrix</code>, <code>glitch</code>, or <code>system</code>.</td>
              </tr>
              <tr>
                <td><span class="param-name">tag</span></td>
                <td><span class="param-type">string</span></td>
                <td>all</td>
                <td>Filter random selection by topic: <code>deploy</code>, <code>infra</code>, <code>legacy</code>, <code>frontend</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, '<iframe src=\"https://witty-404.zimkk.workers.dev/html?theme=dark\" style=\"width:100vw;height:100vh;border:none;display:block;\" title=\"404\"></iframe>')">Copy</button>
          <div class="code-block">&lt;!-- Embed as full-page 404 handler in any web app --&gt;
&lt;iframe
  src="https://witty-404.zimkk.workers.dev/html?theme=dark"
  style="width: 100vw; height: 100vh; border: none; display: block;"
  title="404 Error Page"
&gt;&lt;/iframe&gt;</div>
        </div>
      </section>

      <!-- Endpoint: GET /json -->
      <section id="endpoint-json" class="doc-section">
        <h2 class="doc-heading"><code>GET /json</code> (or <code>GET /</code>) — Random Joke Payload</h2>
        <p class="doc-lead">
          Returns the complete structured JSON payload for a disaster joke, including title, subtitle, diagnostic logs array, footnote, and metadata tags.
        </p>

        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, 'curl -s https://witty-404.zimkk.workers.dev/json?id=plane-crash')">Copy</button>
          <div class="code-block">{
  "id": "plane-crash",
  "emoji": "✈️💥",
  "title": "Your request took off, found nothing, and did not survive re-entry.",
  "subtitle": "The page was deleted during a refactor that was 'just cleanup'.",
  "logs": [
    "> verifying route exists in routing table...",
    "> route deleted in commit: 3f8a91c ('minor cleanup')",
    "> PR description: 'cleaned up some unused files'",
    "> files deleted: 412",
    "> blaming the intern...",
    "> intern quit in 2023.",
    "> shipping anyway 🚀"
  ],
  "footnote": "HTTP 404 • Flight Recorder Recovered",
  "tags": ["deploy", "refactor", "blame"]
}</div>
        </div>
      </section>

      <!-- Endpoint: GET /roast -->
      <section id="endpoint-roast" class="doc-section">
        <h2 class="doc-heading"><code>GET /roast</code> — Dynamic Broken Path Roaster</h2>
        <p class="doc-lead">
          Substitutes the client's requested URL path into the joke's headline with strict XSS sanitization.
        </p>

        <div class="docs-table-container">
          <table class="docs-table">
            <thead>
              <tr><th>PARAM</th><th>TYPE</th><th>REQUIRED</th><th>DESCRIPTION</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="param-name">path</span></td>
                <td><span class="param-type">string</span></td>
                <td>Yes</td>
                <td>The missing URL path (e.g. <code>/api/v2/user/delete</code>).</td>
              </tr>
              <tr>
                <td><span class="param-name">format</span></td>
                <td><span class="param-type">string</span></td>
                <td>No</td>
                <td>Set to <code>html</code> to receive a standalone rendered page, or omit for JSON.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Endpoint: GET /terminal -->
      <section id="endpoint-terminal" class="doc-section">
        <h2 class="doc-heading"><code>GET /terminal</code> — Diagnostic Log Array</h2>
        <p class="doc-lead">
          Returns an array of strings representing terminal diagnostic steps for direct insertion into custom CLI scripts, CI runners, or custom terminals.
        </p>

        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, 'curl -s https://witty-404.zimkk.workers.dev/terminal?id=daves-laptop')">Copy</button>
          <div class="code-block">[
  "> checking local git log...",
  "> last modified: 6 months ago by dave@acme.corp",
  "> pinging Dave on Slack...",
  "> Dave's status: 'hiking in Patagonia until 2027'",
  "> searching internal wiki...",
  "> wiki page last updated by Dave: 'TODO: document this'",
  "> closing ticket as WONTFIX"
]</div>
        </div>
      </section>

      <!-- Endpoint: GET /svg -->
      <section id="endpoint-svg" class="doc-section">
        <h2 class="doc-heading"><code>GET /svg</code> — Dynamic 1200x630 Social Card</h2>
        <p class="doc-lead">
          Generates a crisp 1200x630 vector SVG image with syntax highlights for use in OpenGraph previews, Discord cards, and GitHub README embeds.
        </p>

        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, '[![404](https://witty-404.zimkk.workers.dev/svg?theme=dark)](https://witty-404.zimkk.workers.dev)')">Copy</button>
          <div class="code-block">&lt;!-- GitHub Markdown Embed --&gt;
[![404](https://witty-404.zimkk.workers.dev/svg?theme=dark)](https://witty-404.zimkk.workers.dev)</div>
        </div>
      </section>

      <!-- Endpoint: GET /text -->
      <section id="endpoint-text" class="doc-section">
        <h2 class="doc-heading"><code>GET /text</code> — Plaintext Terminal Banner</h2>
        <p class="doc-lead">
          Returns a formatted plain text block ready to pipe into terminal scripts, webhooks, or serverless logs without JSON parsing.
        </p>

        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, 'curl -s https://witty-404.zimkk.workers.dev/text')">Copy</button>
          <div class="code-block">=== HTTP 404: Your request took off, found nothing, and did not survive re-entry. ===
The page was deleted during a refactor that was 'just cleanup'.

> verifying route exists in routing table...
> route deleted in commit: 3f8a91c ('minor cleanup')
> PR description: 'cleaned up some unused files'
> files deleted: 412
> blaming the intern...
> intern quit in 2023.
> shipping anyway 🚀

--- HTTP 404 • Flight Recorder Recovered ---</div>
        </div>
      </section>

      <!-- Endpoint: GET /all, /stats, /count -->
      <section id="endpoint-meta" class="doc-section">
        <h2 class="doc-heading">Metadata & Utilities: <code>/all</code>, <code>/stats</code>, <code>/count</code></h2>
        <p class="doc-lead">
          Explore the disaster catalog, inspect global hit analytics, and query current database metrics.
        </p>

        <div class="docs-table-container">
          <table class="docs-table">
            <thead>
              <tr><th>ENDPOINT</th><th>RESPONSE</th><th>DESCRIPTION</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>GET /all</code></td>
                <td>JSON Array</td>
                <td>Returns all 25+ disaster joke objects.</td>
              </tr>
              <tr>
                <td><code>GET /stats</code></td>
                <td>JSON</td>
                <td>Returns the global joke impression leaderboard.</td>
              </tr>
              <tr>
                <td><code>GET /count</code></td>
                <td>JSON</td>
                <td>Returns total active disaster scenarios count.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Framework Recipes -->
      <section id="recipe-nextjs" class="doc-section">
        <h2 class="doc-heading">Framework Integration Recipes</h2>

        <h3 class="doc-subheading">Next.js 14+ (App Router not-found.tsx)</h3>
        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, 'export default function NotFound() {\n  return (\n    <iframe\n      src=\"https://witty-404.zimkk.workers.dev/html?theme=dark\"\n      style={{ width: \"100vw\", height: \"100vh\", border: \"none\", display: \"block\" }}\n      title=\"404 Page\"\n    />\n  );\n}')">Copy</button>
          <div class="code-block">// app/not-found.tsx
export default function NotFound() {
  return (
    &lt;iframe
      src="https://witty-404.zimkk.workers.dev/html?theme=dark"
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
      title="404 Page"
    /&gt;
  );
}</div>
        </div>

        <h3 class="doc-subheading" id="recipe-express">Express.js / Fastify Middleware</h3>
        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, 'app.use((req, res) => {\n  fetch(\"https://witty-404.zimkk.workers.dev/html\")\n    .then(r => r.text())\n    .then(html => res.status(404).type(\"html\").send(html));\n});')">Copy</button>
          <div class="code-block">// Catch-all 404 handler
app.use((req, res) => {
  fetch("https://witty-404.zimkk.workers.dev/html")
    .then(r => r.text())
    .then(html => res.status(404).type("html").send(html));
});</div>
        </div>

        <h3 class="doc-subheading" id="recipe-vercel">Vercel Proxy (vercel.json)</h3>
        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, '{\n  \"routes\": [\n    { \"handle\": \"filesystem\" },\n    { \"src\": \"/(.*)\", \"dest\": \"https://witty-404.zimkk.workers.dev/roast?path=/$1&format=html\", \"status\": 404 }\n  ]\n}')">Copy</button>
          <div class="code-block">{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "https://witty-404.zimkk.workers.dev/roast?path=/$1&format=html", "status": 404 }
  ]
}</div>
        </div>

        <h3 class="doc-subheading" id="recipe-netlify">Netlify (_redirects)</h3>
        <div class="code-block-container">
          <button class="btn-copy-code" onclick="copyCode(this, '/*  https://witty-404.zimkk.workers.dev/html?theme=dark  404')">Copy</button>
          <div class="code-block"># _redirects
/*  https://witty-404.zimkk.workers.dev/html?theme=dark  404</div>
        </div>
      </section>
    </main>
  </div>

  <!-- Site Footer -->
  <footer class="docs-footer">
    <div class="footer-inner">
      <div>
        <a href="/demo" style="color: var(--text-white); text-decoration: none; font-weight: 800;">witty-404</a> · MIT Licensed · Created by <a href="https://github.com/zimkk" target="_blank" style="color: var(--accent); text-decoration: none;">Hassan Nazir</a>
      </div>
      <div class="footer-links">
        <a href="/demo">Interactive Demo</a>
        <a href="/html" target="_blank">Live Scene</a>
        <a href="https://github.com/zimkk/witty-404" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="/stats">Leaderboard</a>
      </div>
    </div>
  </footer>

  <script>
    async function runApiTest() {
      const methodSelect = document.getElementById('tester-method');
      const paramsInput = document.getElementById('tester-params');
      const output = document.getElementById('tester-output');
      const status = document.getElementById('tester-status');

      const path = methodSelect.value;
      const extra = paramsInput.value.trim();
      const delimiter = path.includes('?') ? (extra.startsWith('?') ? '&' + extra.slice(1) : '&' + extra) : extra;
      const targetUrl = path + (extra ? delimiter : '');

      status.innerText = 'FETCHING...';
      status.style.color = '#F59E0B';

      try {
        const start = performance.now();
        const res = await fetch(targetUrl);
        const duration = Math.round(performance.now() - start);

        status.innerText = \`\${res.status} OK (\${duration}ms)\`;
        status.style.color = '#10B981';

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await res.json();
          output.innerText = JSON.stringify(json, null, 2);
        } else {
          const text = await res.text();
          output.innerText = text;
        }
      } catch (err) {
        status.innerText = 'ERROR';
        status.style.color = '#EF4444';
        output.innerText = String(err);
      }
    }

    function copyCode(btn, text) {
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => { btn.innerText = orig; }, 2000);
      }).catch(() => {});
    }
  </script>
</body>
</html>`;

export function getDocsHtml(): string {
  return docsHtml;
}
