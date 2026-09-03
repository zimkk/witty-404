<div align="center">

# 💥 witty-404

**Witty, embeddable 404 error pages and API that your users will actually enjoy hitting.**

[![Witty 404 Card](https://witty-404.zimkk.workers.dev/svg?theme=dark)](https://witty-404.zimkk.workers.dev/demo)

<p align="center">
  <a href="https://witty-404.zimkk.workers.dev/demo"><strong>Explore Live Demo & Sandbox ↗</strong></a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Workers](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## ⚡ Why witty-404?

Most 404 pages are either blank, corporate, or boring. **witty-404** turns missing pages, broken links, and edge routing failures into genuine developer comic relief.

- 🚀 **Zero runtime dependencies**: Pure TypeScript string templates running on Cloudflare Workers edge nodes.
- 🎨 **Standalone & Embeddable**: Drop `/html` directly into any iframe, Netlify redirect, or Vercel rewrite with zero CSS leakage.
- 🎭 **Comic Set Pieces**: Handcrafted CSS animations (`plane-crash`, `daves-laptop`, `folder-structure`, `node-modules`, `perfect-uptime`).
- 🌙 **5 Built-in Themes**: `system` (auto), `dark`, `light`, `matrix`, `glitch`.
- 🖼️ **Dynamic SVG Cards**: Embed `/svg` directly into Discord, Twitter cards, or GitHub READMEs.
- 🛡️ **Built-in Sanitization**: Untrusted paths on `/roast` are HTML-entity escaped and capped to eliminate XSS risks.

---

## 🚀 Quickstart: Use as your site's 404 page

### 1. Direct Embed (HTML / iframe)
```html
<iframe
  src="https://witty-404.zimkk.workers.dev/html?theme=dark"
  style="width: 100vw; height: 100vh; border: none; display: block;"
  title="404 Page"
></iframe>
```

### 2. Vercel (`vercel.json`)
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

### 3. Netlify (`public/_redirects`)
```
/*  https://witty-404.zimkk.workers.dev/html  404!
```

---

## 💻 CLI

You can fetch a joke directly in your terminal:

```bash
npx witty-404
```

Or filter by specific tags or output formats:
```bash
npx witty-404 --tag=deploy
npx witty-404 --json
npx witty-404 --terminal
```

---

## 📡 API Reference

Base URLs:
- Production Edge: `https://witty-404.zimkk.workers.dev`
- Custom Domain: `https://witty-404.hassannazir.dev`

| Endpoint | Returns | Description & Parameters |
| :--- | :--- | :--- |
| `GET /` or `GET /json` | JSON | Random joke. Supports `?seed=`, `?id=`, `?tag=` |
| `GET /html` | HTML | Embeddable 404 page. Supports `?theme=system\|dark\|light\|matrix\|glitch` |
| `GET /roast?path=/foo/bar` | JSON / HTML | Substitutes `{path}` in joke. Add `&format=html` for page render |
| `GET /svg` | SVG | 1200x630 OpenGraph share card image |
| `GET /terminal` | JSON | Just the terminal logs array |
| `GET /text` | Plain Text | Formatted plain text title + subtitle + footnote |
| `GET /all` | JSON Array | List of all available jokes |
| `GET /count` | JSON | Total joke count `{ "count": 25 }` |
| `GET /stats` | JSON | Sampled leaderboard of most displayed jokes |
| `GET /demo` | HTML | Marketing front door & live interactive sandbox |

### Example cURL Requests

```bash
# Get a random joke JSON
curl https://witty-404.zimkk.workers.dev/json

# Get terminal logs for a deploy joke
curl https://witty-404.zimkk.workers.dev/terminal?tag=deploy

# Get a roasted joke with custom path
curl "https://witty-404.zimkk.workers.dev/roast?path=/api/v1/auth"
```

---

## 🛠️ Self-Hosting on Cloudflare Workers

1. **Clone the repo**:
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

4. **Deploy to Cloudflare**:
   ```bash
   npm run deploy
   ```

---

## 🤝 Contributing Jokes

We welcome new jokes! To add one:
1. Create `jokes/<kebab-case-id>.json`.
2. Follow the schema in [`jokes/_schema.md`](jokes/_schema.md).
3. Validate locally with `npm run validate-jokes` and `npm test`.
4. Open a PR! See [`CONTRIBUTING.md`](CONTRIBUTING.md) for full details.

---

## 📄 License

MIT © [Hassan Nazir](https://hassannazir.dev)
