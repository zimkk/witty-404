<div align="center">

# 💥 witty-404

**The open-source, edge-hosted 404 error engine that turns routing disasters into developer comic relief.**

[![Witty 404 Card](https://witty-404.zimkk.workers.dev/svg?theme=dark)](https://witty-404.zimkk.workers.dev/docs)

<p align="center">
  <a href="https://witty-404.zimkk.workers.dev/demo"><strong>🎮 Interactive Demo ↗</strong></a> •
  <a href="https://witty-404.zimkk.workers.dev/docs"><strong>📖 Full API Documentation ↗</strong></a> •
  <a href="https://witty-404.zimkk.workers.dev/html"><strong>🎭 Live Error Scene ↗</strong></a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Workers](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Favicon](https://img.shields.io/badge/Favicon-SVG%20404-EF4444.svg)](https://witty-404.zimkk.workers.dev/favicon.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## ⚡ What is witty-404?

Most 404 pages are sterile corporate apologies. **witty-404** is an emergency microservice for teams that break production with confidence. It serves full standalone error pages, structured JSON payloads, ASCII terminal logs, and dynamic social cards with **zero dependencies** and **sub-5ms edge latency**.

- ✈️ **Theatrical Flight Trajectory Crash**: Synchronized CSS animations where an airplane crosses the screen and crashes into the terminal the exact split-second the witty punchline appears.
- 🚀 **Zero Runtime Dependencies**: Ultra-fast pure TypeScript string templates running on Cloudflare Workers edge nodes.
- 🕹️ **Interactive Sandbox & Playground**: Real-time iframe playground with scenario selector and theme switcher.
- 🌙 **4 Built-in Themes**: `dark`, `light`, `matrix`, `glitch`.
- 🛡️ **Built-in Sanitization**: Untrusted client routes on `/roast` are HTML-entity escaped to eliminate XSS risks.

---

## 🚀 30-Second Integration Recipes

### 1. Next.js 14+ (App Router `app/not-found.tsx`)
```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <iframe
      src="https://witty-404.zimkk.workers.dev/html?theme=dark"
      style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
      title="404 Error Page"
    />
  );
}
```

### 2. Express.js / Fastify Middleware
```javascript
// Express catch-all 404 route
app.use((req, res) => {
  fetch('https://witty-404.zimkk.workers.dev/html')
    .then(r => r.text())
    .then(html => res.status(404).type('html').send(html));
});
```

### 3. Vercel Proxy (`vercel.json`)
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "https://witty-404.zimkk.workers.dev/roast?path=/$1&format=html", "status": 404 }
  ]
}
```

### 4. Raw HTML Embed
```html
<iframe
  src="https://witty-404.zimkk.workers.dev/html?theme=dark"
  style="width: 100vw; height: 100vh; border: none; display: block;"
  title="404 Error Page"
></iframe>
```

---

## 📡 Complete Endpoint Matrix

| Method & Path | Return Type | Description & Query Options |
| :--- | :--- | :--- |
| `GET /html` | `text/html` | Standalone full-bleed 404 page. Options: `?id=`, `?theme=dark\|light\|matrix\|glitch`, `?tag=` |
| `GET /json` (or `GET /`) | `application/json` | Structured JSON joke payload with title, logs, footnote, and metadata tags. |
| `GET /roast` | `application/json` / `text/html` | Path-aware error engine. Options: `?path=/missing/route`, `&format=html` |
| `GET /terminal` | `application/json` | Returns array of diagnostic log strings for CLI output. |
| `GET /text` | `text/plain` | Plaintext disaster joke formatted for terminal / CI output. |
| `GET /svg` | `image/svg+xml` | Crisp 1200x630 vector social card for OpenGraph / Discord embeds. |
| `GET /all` | `application/json` | Returns the entire catalog of all 25+ disaster scenarios. |
| `GET /stats` | `application/json` | Global impression leaderboard tracking disaster hits. |
| `GET /favicon.svg` | `image/svg+xml` | Vector 404 SVG icon for browser tabs. |

---

## 💻 CLI Quickstart

Fetch jokes directly inside your terminal or CI/CD pipelines:

```bash
# 1. Fetch formatted JSON payload
curl -s https://witty-404.zimkk.workers.dev/json | jq

# 2. Fetch raw ASCII terminal logs
curl -s https://witty-404.zimkk.workers.dev/text

# 3. Dynamic path roasting
curl -s "https://witty-404.zimkk.workers.dev/roast?path=/api/v2/payment/checkout"
```

---

## 👨‍💻 Incident Commander

Crafted with humor by **Hassan Nazir ([@zimkk](https://github.com/zimkk))**.

- 🐙 **GitHub**: [@zimkk](https://github.com/zimkk)
- 📦 **Repository**: [zimkk/witty-404](https://github.com/zimkk/witty-404)
- 🤝 **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
