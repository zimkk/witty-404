export const docsHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Docs — witty-404 | The API for Broken Things</title>
  <meta name="description" content="Complete API documentation and integration guide for witty-404. Embed witty error pages and JSON responses in under 60 seconds." />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #07090E;
      --sidebar-bg: #0B0E17;
      --card-bg: #111522;
      --card-border: #1E2638;
      --accent: #3B82F6;
      --accent-glow: rgba(59, 130, 246, 0.25);
      --danger: #EF4444;
      --success: #10B981;
      --warning: #F59E0B;
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    body {
      background: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.6;
      display: flex;
      min-height: 100vh;
    }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    code {
      font-family: var(--font-mono);
      background: rgba(255, 255, 255, 0.06);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      color: #93C5FD;
      font-size: 0.85em;
    }
    pre {
      background: #05070B;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: #E2E8F0;
      margin: 0.75rem 0 1.25rem;
    }
    
    /* Layout */
    .sidebar {
      width: 280px;
      background: var(--sidebar-bg);
      border-right: 1px solid var(--card-border);
      padding: 2rem 1.5rem;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 900;
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: #FFF;
    }
    .brand-spark { color: var(--danger); font-size: 1.4rem; }
    .nav-section { margin-bottom: 1.5rem; }
    .nav-title {
      font-size: 0.7rem;
      font-weight: 800;
      color: var(--text-dim);
      letter-spacing: 0.08em;
      margin-bottom: 0.5rem;
      font-family: var(--font-mono);
    }
    .nav-list { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
    .nav-link {
      color: var(--text-muted);
      font-size: 0.85rem;
      padding: 0.35rem 0.6rem;
      border-radius: 6px;
      display: block;
      transition: all 0.15s;
    }
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-main);
      text-decoration: none;
    }
    .nav-link.active {
      background: rgba(59, 130, 246, 0.12);
      color: #60A5FA;
      font-weight: 600;
    }

    .main-content {
      flex-grow: 1;
      padding: 3rem 4rem;
      max-width: 1000px;
    }
    .hero-banner {
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 2.5rem;
      margin-bottom: 3rem;
    }
    .hero-tag {
      display: inline-block;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #F87171;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      margin-bottom: 0.75rem;
    }
    .hero-title {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      line-height: 1.15;
    }
    .hero-desc {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 720px;
    }

    .doc-section {
      margin-bottom: 3.5rem;
    }
    .section-title {
      font-size: 1.6rem;
      font-weight: 800;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 0.5rem;
    }
    .endpoint-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.75rem;
      margin-bottom: 2rem;
    }
    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }
    .method-get {
      background: #059669;
      color: #FFF;
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
    }
    .endpoint-path {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      color: #FFF;
    }
    .endpoint-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    .table-params {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      font-size: 0.85rem;
    }
    .table-params th, .table-params td {
      border: 1px solid var(--card-border);
      padding: 0.6rem 0.85rem;
      text-align: left;
    }
    .table-params th {
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-weight: 700;
    }

    /* Live Tester Box */
    .tester-box {
      background: #090B10;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.25rem;
      margin-top: 1.25rem;
    }
    .tester-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
      font-weight: 700;
      margin-bottom: 0.75rem;
    }
    .tester-inputs {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }
    .tester-input {
      background: #111522;
      border: 1px solid var(--card-border);
      color: #FFF;
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }
    .tester-btn {
      background: var(--accent);
      color: #FFF;
      border: none;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .tester-btn:hover { filter: brightness(1.15); }
    .tester-output {
      background: #030407;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      padding: 0.75rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #38BDF8;
      max-height: 180px;
      overflow-y: auto;
      white-space: pre-wrap;
    }

    @media (max-width: 860px) {
      body { flex-direction: column; }
      .sidebar { width: 100%; height: auto; position: static; border-right: none; border-bottom: 1px solid var(--card-border); }
      .main-content { padding: 2rem 1rem; }
    }
  </style>
</head>
<body>

  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-spark">💥</span>
      <span>witty-404 docs</span>
    </div>

    <div class="nav-section">
      <div class="nav-title">GETTING STARTED</div>
      <ul class="nav-list">
        <li><a href="#overview" class="nav-link active">Overview</a></li>
        <li><a href="#quickstart" class="nav-link">60-Second Quickstart</a></li>
        <li><a href="#frameworks" class="nav-link">Framework Recipes</a></li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-title">CORE ENDPOINTS</div>
      <ul class="nav-list">
        <li><a href="#get-html" class="nav-link">GET /html (Full Scene)</a></li>
        <li><a href="#get-json" class="nav-link">GET /json (Structured)</a></li>
        <li><a href="#get-text" class="nav-link">GET /text (CLI/Plaintext)</a></li>
        <li><a href="#get-terminal" class="nav-link">GET /terminal (Stack Traces)</a></li>
        <li><a href="#get-svg" class="nav-link">GET /svg (OpenGraph Card)</a></li>
        <li><a href="#get-roast" class="nav-link">GET /roast (Path-Aware)</a></li>
      </ul>
    </div>

    <div class="nav-section">
      <div class="nav-title">UTILITY &amp; DATA</div>
      <ul class="nav-list">
        <li><a href="#get-stats" class="nav-link">GET /stats (Leaderboard)</a></li>
        <li><a href="#get-count" class="nav-link">GET /count &amp; /all</a></li>
        <li><a href="#get-favicon" class="nav-link">GET /favicon.svg</a></li>
        <li><a href="/demo" target="_blank" class="nav-link">Interactive Sandbox ↗</a></li>
      </ul>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    
    <!-- Hero Banner -->
    <header class="hero-banner" id="overview">
      <div class="hero-tag">HTTP 404 RESCUE SYSTEM</div>
      <h1 class="hero-title">The API You Call When Everything Has Gone Horribly Wrong.</h1>
      <p class="hero-desc">
        Most 404 pages are depressing. <code>witty-404</code> turns missing routes, broken endpoints, and bad deploys into genuine developer comic relief across Cloudflare edge nodes with zero runtime dependencies.
      </p>
    </header>

    <!-- Quickstart -->
    <section class="doc-section" id="quickstart">
      <h2 class="section-title">⚡ 60-Second Quickstart</h2>
      <p style="color: var(--text-muted); margin-bottom: 1rem;">
        Need a quick emergency fallback right now? Drop this into your terminal:
      </p>
      <pre><code># Test random joke in CLI
curl -s https://witty-404.zimkk.workers.dev/text

# Test path-aware roast
curl -s "https://witty-404.zimkk.workers.dev/roast?path=/admin/super-secret-dashboard"</code></pre>
    </section>

    <!-- Framework Recipes -->
    <section class="doc-section" id="frameworks">
      <h2 class="section-title">🛠️ Framework Integration Recipes</h2>

      <div class="endpoint-card">
        <h3 style="color: #FFF; margin-bottom: 0.5rem;">Next.js 14+ (App Router)</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.75rem;">Place in <code>app/not-found.tsx</code>:</p>
        <pre><code>export default function NotFound() {
  return (
    &lt;main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}&gt;
      &lt;iframe
        src="https://witty-404.zimkk.workers.dev/html?theme=dark"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="404 Not Found"
      /&gt;
    &lt;/main&gt;
  );
}</code></pre>
      </div>

      <div class="endpoint-card">
        <h3 style="color: #FFF; margin-bottom: 0.5rem;">Express.js / Node.js Middleware</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.75rem;">Add as the final middleware in your Express app:</p>
        <pre><code>app.use(async (req, res) => {
  const roastUrl = \`https://witty-404.zimkk.workers.dev/roast?path=\${encodeURIComponent(req.originalUrl)}&format=html\`;
  const response = await fetch(roastUrl);
  const html = await response.text();
  res.status(404).set('Content-Type', 'text/html').send(html);
});</code></pre>
      </div>
    </section>

    <!-- Endpoint: GET /html -->
    <section class="doc-section" id="get-html">
      <h2 class="section-title">🎭 GET /html — Full-Page Scene</h2>
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-get">GET</span>
          <span class="endpoint-path">/html</span>
        </div>
        <p class="endpoint-desc">
          Renders the monumental full-viewport "You Died" scene with 3D parallax, physical 404 numerals, scattered sticky notes, and continuous idle physics.
        </p>

        <table class="table-params">
          <thead>
            <tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>id</code></td><td>string</td><td><em>random</em></td><td>Specific joke ID (e.g. <code>plane-crash</code>, <code>daves-laptop</code>, <code>perfect-uptime</code>).</td></tr>
            <tr><td><code>theme</code></td><td>string</td><td><code>system</code></td><td>Color theme: <code>system</code>, <code>dark</code>, <code>light</code>, <code>matrix</code>, <code>glitch</code>.</td></tr>
            <tr><td><code>tag</code></td><td>string</td><td><em>none</em></td><td>Filter by category: <code>deploy</code>, <code>git</code>, <code>frontend</code>, <code>backend</code>, <code>infra</code>.</td></tr>
          </tbody>
        </table>

        <!-- Live Tester -->
        <div class="tester-box">
          <div class="tester-title">LIVE API TESTER</div>
          <div class="tester-inputs">
            <input type="text" id="test-html-id" class="tester-input" placeholder="id (optional, e.g. plane-crash)" />
            <select id="test-html-theme" class="tester-input">
              <option value="dark">dark</option>
              <option value="light">light</option>
              <option value="matrix">matrix</option>
              <option value="glitch">glitch</option>
            </select>
            <button type="button" class="tester-btn" onclick="testHtmlEndpoint()">Open Live Scene ↗</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Endpoint: GET /json -->
    <section class="doc-section" id="get-json">
      <h2 class="section-title">📦 GET /json (or GET /) — Structured Panic</h2>
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-get">GET</span>
          <span class="endpoint-path">/json</span>
        </div>
        <p class="endpoint-desc">
          Returns structured joke metadata, punchlines, terminal logs, and tags for headless apps and mobile clients.
        </p>
        <pre><code>{
  "id": "plane-crash",
  "emoji": "✈️💥",
  "title": "Your request took off, found nothing, and did not survive re-entry.",
  "subtitle": "The page was deleted during a refactor that was 'just cleanup'.",
  "logs": [
    "> checking if page exists...",
    "> it does not.",
    "> blaming the intern...",
    "> shipping anyway. 🚀"
  ],
  "tags": ["deploy", "devops", "cloud"],
  "footnote": "HTTP 404 • Flight Recorder Recovered"
}</code></pre>
      </div>
    </section>

    <!-- Endpoint: GET /roast -->
    <section class="doc-section" id="get-roast">
      <h2 class="section-title">🔥 GET /roast — Dynamic Path-Aware Roast</h2>
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-get">GET</span>
          <span class="endpoint-path">/roast?path=...</span>
        </div>
        <p class="endpoint-desc">
          Takes the visitor's requested path and dynamically weaves it into the joke punchline and terminal stack traces with full HTML sanitization.
        </p>

        <table class="table-params">
          <thead>
            <tr><th>Param</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>path</code></td><td>string</td><td>Yes</td><td>The unhandled URL (e.g. <code>/admin/dashboard</code> or <code>/api/v1/magic</code>).</td></tr>
            <tr><td><code>format</code></td><td>string</td><td>No</td><td>Pass <code>html</code> to receive a styled full-page scene, or omit for JSON.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Endpoint: GET /svg -->
    <section class="doc-section" id="get-svg">
      <h2 class="section-title">🖼️ GET /svg — Vector OpenGraph &amp; README Card</h2>
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-get">GET</span>
          <span class="endpoint-path">/svg</span>
        </div>
        <p class="endpoint-desc">
          Generates a crisp 1200x630 SVG disaster card suitable for Discord unfurls, Twitter cards, or GitHub README status badges.
        </p>
      </div>
    </section>

    <!-- Endpoint: GET /stats -->
    <section class="doc-section" id="get-stats">
      <h2 class="section-title">📊 GET /stats — Live KV Disaster Leaderboard</h2>
      <div class="endpoint-card">
        <div class="endpoint-header">
          <span class="method-get">GET</span>
          <span class="endpoint-path">/stats</span>
        </div>
        <p class="endpoint-desc">
          Returns global impression analytics stored in Cloudflare KV: total 404s served, the most triggered disaster joke, and the full leaderboard.
        </p>
      </div>
    </section>

  </main>

  <script>
    function testHtmlEndpoint() {
      const id = document.getElementById('test-html-id').value.trim();
      const theme = document.getElementById('test-html-theme').value;
      let url = '/html?theme=' + encodeURIComponent(theme);
      if (id) url += '&id=' + encodeURIComponent(id);
      window.open(url, '_blank');
    }
  </script>
</body>
</html>`;
