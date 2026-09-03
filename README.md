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

## 🚀 How to Embed witty-404 in Your App

`witty-404` was built specifically to be dropped into any tech stack in under 60 seconds with zero configuration.

---

### 1. Next.js (App Router & Pages Router)

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

If your project is deployed on Vercel, you can rewrite unhandled routes directly to witty-404's roast engine with the missing URL path automatically passed in:

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

### 4. React / Vite SPA (React Router)

Add a catch-all route at the bottom of your router:

```tsx
import { Routes, Route } from 'react-router-dom';

function Witty404Page() {
  return (
    <iframe
      src="https://witty-404.zimkk.workers.dev/html?theme=dark"
      style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
      title="404 Not Found"
    />
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* Catch-all 404 handler */}
      <Route path="*" element={<Witty404Page />} />
    </Routes>
  );
}
```

---

### 5. SvelteKit (`src/routes/+error.svelte`)

```svelte
<script>
  import { page } from '$app/stores';
</script>

<iframe
  src="https://witty-404.zimkk.workers.dev/roast?path={$page.url.pathname}&format=html"
  style="width: 100vw; height: 100vh; border: none; display: block;"
  title="404 Page"
></iframe>
```

---

### 6. Express / Node.js Backend

Catch all unhandled routes and redirect or proxy to witty-404:

```js
// Place after all valid app routes
app.use((req, res) => {
  res.status(404).redirect(`https://witty-404.zimkk.workers.dev/roast?path=${encodeURIComponent(req.originalUrl)}&format=html`);
});
```

---

### 7. Plain HTML / Static Website (`404.html`)

Create a `404.html` file in your website's root:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Not Found</title>
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #0A0A0F; }
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

Fetch and enjoy jokes directly from your terminal:

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

**Base Endpoint**: `https://witty-404.zimkk.workers.dev`

| Endpoint | Returns | Description & Query Parameters |
| :--- | :--- | :--- |
| `GET /` or `GET /json` | JSON | Random joke. Supports `?seed=`, `?id=`, `?tag=` |
| `GET /html` | HTML | Embeddable 404 page. Supports `?theme=system\|dark\|light\|matrix\|glitch` |
| `GET /roast?path=/foo/bar` | JSON / HTML | Substitutes `{path}` in joke with XSS escaping. Use `&format=html` for page render |
| `GET /svg` | SVG | 1200x630 dynamic OpenGraph share card image |
| `GET /terminal` | JSON Array | Raw array of terminal debug logs |
| `GET /text` | Plain Text | Plain text title + subtitle + footnote |
| `GET /all` | JSON Array | Array of all 25 jokes |
| `GET /count` | JSON | Total joke count `{ "count": 25 }` |
| `GET /stats` | JSON | Sampled leaderboard of most displayed jokes |
| `GET /demo` | HTML | Interactive marketing demo & joke gallery |

### Query Parameters

- **`theme`**: `system` (default), `dark`, `light`, `matrix`, `glitch`
- **`id`**: Request a specific joke (e.g. `?id=plane-crash`, `?id=daves-laptop`, `?id=node-modules`, `?id=perfect-uptime`).
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
