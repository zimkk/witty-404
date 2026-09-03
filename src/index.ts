import { Joke, jokes } from './jokes';
import { renderHtmlPage } from './render';
import { renderSvgCard } from './svg';
import { roastJoke } from './template';
import { recordJokeImpression, getLeaderboard } from './stats';
import { demoHtml } from './demoHtml';

export interface Env {
  WITTY_404_STATS?: KVNamespace;
}

/**
 * Robust joke picker supporting seed (base-36), id lookup with random fallback,
 * and tag filtering without dead-ending.
 */
export function pickJoke(poolOfJokes: Joke[], seed?: string | null, id?: string | null, tag?: string | null): Joke {
  let pool = poolOfJokes;
  if (tag) {
    const filtered = poolOfJokes.filter(j => j.tags.includes(tag));
    if (filtered.length > 0) {
      pool = filtered;
    }
  }

  if (id) {
    const found = pool.find(j => j.id === id);
    if (found) return found;
    // If not found in filtered pool, check global pool before falling back to random
    const globalFound = poolOfJokes.find(j => j.id === id);
    if (globalFound) return globalFound;
    // Fall through to random rather than silently jokes[0]
  }

  if (seed) {
    const parsed = parseInt(seed, 36);
    if (!Number.isNaN(parsed)) {
      return pool[Math.abs(parsed) % pool.length];
    }
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, User-Agent',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

function textResponse(text: string, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(text, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

function htmlResponse(html: string, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

function svgResponse(svg: string, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(svg, {
    status,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // 1. CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '') || '/';
    const params = url.searchParams;

    const seed = params.get('seed');
    const id = params.get('id');
    const tag = params.get('tag');
    const theme = params.get('theme') || 'system';

    // Route: GET /demo or GET /demo.html (Marketing Front Door)
    if (pathname === '/demo' || pathname === '/demo.html') {
      return htmlResponse(demoHtml);
    }

    // Route: GET /count
    if (pathname === '/count') {
      return jsonResponse({ count: jokes.length });
    }

    // Route: GET /all
    if (pathname === '/all') {
      return jsonResponse(jokes);
    }

    // Route: GET /stats
    if (pathname === '/stats') {
      const stats = await getLeaderboard(jokes, env);
      return jsonResponse(stats);
    }

    // Route: GET /robots.txt
    if (pathname === '/robots.txt') {
      return textResponse('User-agent: *\nDisallow: /roast\nAllow: /\nAllow: /html\nAllow: /demo.html\n');
    }

    // Pick joke for response
    let joke = pickJoke(jokes, seed, id, tag);

    // Asynchronously record sampled impression in KV
    recordJokeImpression(joke.id, env, ctx);

    // Route: GET /roast?path=...
    if (pathname === '/roast') {
      const targetPath = params.get('path');
      const format = params.get('format');
      const roasted = roastJoke(joke, targetPath);

      if (format === 'html' || request.headers.get('Accept')?.includes('text/html')) {
        return htmlResponse(renderHtmlPage(roasted, { theme, isRoasted: true }));
      }
      return jsonResponse(roasted);
    }

    // Route: GET /html
    if (pathname === '/html') {
      const html = renderHtmlPage(joke, { theme });
      return htmlResponse(html);
    }

    // Route: GET /text
    if (pathname === '/text') {
      const text = `${joke.title}\n\n${joke.subtitle}\n\n${joke.footnote}\n`;
      return textResponse(text);
    }

    // Route: GET /terminal
    if (pathname === '/terminal') {
      return jsonResponse(joke.logs);
    }

    // Route: GET /svg
    if (pathname === '/svg') {
      const svg = renderSvgCard(joke, { theme });
      return svgResponse(svg);
    }

    // Route: GET / or GET /json (default)
    if (pathname === '/' || pathname === '/json') {
      return jsonResponse(joke);
    }

    // Unknown endpoint -> Return a witty 404 response
    const notFoundJoke = roastJoke(joke, pathname);
    if (request.headers.get('Accept')?.includes('text/html')) {
      return htmlResponse(renderHtmlPage(notFoundJoke, { theme }), 404);
    }
    return jsonResponse({
      error: 'Not Found',
      message: 'This endpoint does not exist, but here is a joke for your trouble.',
      joke: notFoundJoke,
    }, 404);
  },
};
