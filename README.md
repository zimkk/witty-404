<div align="center">

# 💥 witty-404

**Witty, embeddable 404 error scenes & API that your users will actually enjoy hitting.**

[![Witty 404 Card](https://witty-404.zimkk.workers.dev/svg?theme=dark)](https://witty-404.zimkk.workers.dev/docs)

<p align="center">
  <a href="https://witty-404.zimkk.workers.dev/docs"><strong>📖 Interactive API Documentation ↗</strong></a> •
  <a href="https://witty-404.zimkk.workers.dev/demo"><strong>🎮 Interactive Sandbox ↗</strong></a> •
  <a href="https://witty-404.zimkk.workers.dev/html"><strong>🎭 Live Random /html ↗</strong></a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Workers](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Favicon](https://img.shields.io/badge/Favicon-SVG%20404-EF4444.svg)](https://witty-404.zimkk.workers.dev/favicon.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## ⚡ Why witty-404?

Most 404 pages are depressing, sterile corporate apologies. **witty-404** is the emergency API you call when everything has gone horribly wrong. It transforms dead links, DNS anomalies, and Friday merge regressions into genuine developer comic relief.

- 🏛️ **Full-Page Theatrical Stage**: The monumental `404` numerals act as a physical set piece where planes crash, directories crumble, laptops sit abandoned, and SLA lights ignite in flames 🔥.
- 🚀 **Zero Runtime Dependencies**: Ultra-fast pure TypeScript string templates running on Cloudflare Workers edge nodes (<10ms latency).
- 🕹️ **Live & Interactive**: 3D pointer parallax, continuous idle physics (billowing smoke, infinite typing indicators, status pulses), and click-to-escalate shockwaves.
- 🌙 **5 Built-in Themes**: `system` (auto), `dark`, `light`, `matrix`, `glitch`.
- 🖼️ **Dynamic SVG Cards & Favicon**: Embed `/svg` into Discord/Twitter cards, and serve `/favicon.svg` directly to your tabs.
- 🛡️ **Built-in Sanitization**: Untrusted paths on `/roast` are HTML-entity escaped and capped to eliminate XSS risks.

---

## 🚀 60-Second Integration Recipes

`witty-404` was built specifically to be dropped into any tech stack in under 60 seconds with zero configuration.

---

### 1. Next.js 14+ (App Router & Pages Router)

#### App Router (`app/not-found.tsx`):
```tsx
export default function NotFound() {
  return (
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src="https://witty-404.zimkk.workers.dev/html?theme=dark"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="404 Not Found"
      />
    </main>
  );
}
```

#### Pages Router (`pages/404.tsx`):
```tsx
export default function Custom404() {
  return (
    <iframe
      src="https://witty-404.zimkk.workers.dev/html?theme=system"
      style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
      title="404 - Page Not Found"
    />
  );
}
```

---

### 2. Vercel Hosting (`vercel.json`)

Proxy all unhandled routes directly to witty-404's roast engine with the missing URL path automatically injected:

```json
{
  "routes": [
    { "handle": "filesystem" },
    {
      "src": "/(.*)",
      "dest": "https://witty-404.zimkk.workers.dev/roast?path=/$1&format=html",
      "status": 404
    }
  ]
}
```

---

### 3. Netlify & Cloudflare Pages (`public/_redirects`)

Add this single line to your `public/_redirects` file:

```
/*  https://witty-404.zimkk.workers.dev/html  404!
```

---

### 4. Express / Node.js Backend

Catch all unhandled routes and redirect or proxy to witty-404:

```js
// Place after all valid app routes
app.use(async (req, res) => {
  const roastUrl = `https://witty-404.zimkk.workers.dev/roast?path=${encodeURIComponent(req.originalUrl)}&format=html`;
  const response = await fetch(roastUrl);
  const html = await response.text();
  res.status(404).set('Content-Type', 'text/html').send(html);
});
```

---

### 5. Plain HTML / Static Website (`404.html`)

Create a `404.html` file in your website's root:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Not Found</title>
  <link rel="icon" type="image/svg+xml" href="https://witty-404.zimkk.workers.dev/favicon.svg" />
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #07090E; }
    iframe { width: 100%; height: 100%; border: 0; display: block; }
  </style>
</head>
<body>
  <iframe src="https://witty-404.zimkk.workers.dev/html?theme=dark" title="404 Page"></iframe>
</body>
</html>
```

---

## 💻 Terminal CLI

Fetch and enjoy jokes directly from your command line:

```bash
# Random joke with colors & debug trace
npx witty-404

# Filter by tags
npx witty-404 --tag=deploy
npx witty-404 --tag=git

# Output raw JSON or terminal logs only
npx witty-404 --json
npx witty-404 --terminal
```

---

## 📡 Complete API Reference

**Base Endpoint**: `https://witty-404.zimkk.workers.dev` • **[Interactive Docs ↗](https://witty-404.zimkk.workers.dev/docs)**

| Endpoint | Returns | Description & Parameters |
| :--- | :--- | :--- |
| `GET /` or `GET /json` | JSON | Random structured joke. Supports `?seed=`, `?id=`, `?tag=` |
| `GET /html` | HTML | Full-page 3D parallax scene. Supports `?theme=system\|dark\|light\|matrix\|glitch` |
| `GET /roast?path=/foo` | JSON / HTML | Path-aware roast generator. Pass `&format=html` for styled scene |
| `GET /svg` | SVG | 1200x630 dynamic OpenGraph share card image |
| `GET /favicon.svg` | SVG | Official 404 vector favicon for browser tabs |
| `GET /terminal` | JSON Array | Raw array of terminal logs to blame the intern |
| `GET /text` | Plain Text | Plain text title + subtitle + footnote |
| `GET /all` | JSON Array | Complete library of all 25 jokes |
| `GET /count` | JSON | Total joke count `{ "count": 25 }` |
| `GET /stats` | JSON | KV-backed global disaster leaderboard |
| `GET /docs` | HTML | Interactive documentation and live endpoint tester |
| `GET /demo` | HTML | Interactive developer sandbox & joke gallery |

### Query Parameters

- **`theme`**: `system` (default), `dark`, `light`, `matrix`, `glitch`
- **`id`**: Request a specific joke (e.g. `?id=plane-crash`, `?id=daves-laptop`, `?id=node-modules`, `?id=perfect-uptime`, `?id=friday-deploy`).
- **`tag`**: Filter pool by category (`deploy`, `refactor`, `blame`, `legacy`, `meetings`, `database`, `frontend`, `backend`, `security`, `ai`, `git`, `devops`, `infra`, `dns`, `cache`).
- **`seed`**: Base-36 string or integer for reproducible picks across renders.

---

## 🛠️ Self-Hosting on Cloudflare Workers

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zimkk/witty-404.git
   cd witty-404
   npm install
   ```

2. **Create the KV Namespace**:
   ```bash
   npx wrangler kv:namespace create WITTY_404_STATS
   ```
   *Paste the resulting ID into `wrangler.toml`.*

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## 🤝 Contributing Jokes

We love community submissions!
1. Add your joke JSON in `jokes/<kebab-case-id>.json`.
2. Follow the guidelines in [`jokes/_schema.md`](jokes/_schema.md).
3. Validate locally:
   ```bash
   npm run validate-jokes
   npm test
   ```
4. Open a PR! See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 📄 License

MIT © [Hassan Nazir](https://hassannazir.dev)
