import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const mockCtx = {
  waitUntil: () => {},
  passThroughOnException: () => {},
} as unknown as ExecutionContext;

const mockEnv = {};

describe('Worker Routes Smoke Tests', () => {
  it('GET / returns 200 JSON with joke object', async () => {
    const req = new Request('https://witty-404.dev/');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    const body = (await res.json()) as Record<string, unknown>;
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('logs');
  });

  it('GET /json returns 200 JSON', async () => {
    const req = new Request('https://witty-404.dev/json');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
  });

  it('GET /demo returns 200 HTML marketing page', async () => {
    const req = new Request('https://witty-404.dev/demo');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('witty-404');
    expect(html).toContain('The Open-Source 404 API for Developers');
  });

  it('GET /docs returns 200 HTML documentation page', async () => {
    const req = new Request('https://witty-404.dev/docs');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('API Docs — witty-404');
    expect(html).toContain('The API You Call When Everything Has Gone Horribly Wrong');
  });

  it('GET /favicon.svg returns 200 SVG favicon', async () => {
    const req = new Request('https://witty-404.dev/favicon.svg');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('image/svg+xml');
    const svg = await res.text();
    expect(svg).toContain('<svg');
    expect(svg).toContain('404');
  });

  it('GET /html returns 200 HTML with standalone page', async () => {
    const req = new Request('https://witty-404.dev/html?id=plane-crash&theme=dark');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('HTTP 404');
    expect(html).toContain('diagnostic-terminal');
    expect(html).toContain('diagnostic.sh — not-found-investigation');
    expect(html).toContain('data-theme="dark"');
  });

  it('GET /html renders clean developer terminal and action buttons', async () => {
    const reqDave = new Request('https://witty-404.dev/html?id=daves-laptop');
    const resDave = await worker.fetch(reqDave, mockEnv, mockCtx);
    const htmlDave = await resDave.text();
    expect(htmlDave).toContain('diagnostic-terminal');
    expect(htmlDave).toContain('Read things that exist ↗');
    expect(htmlDave).toContain('Abort mission');
  });

  it('GET /text returns 200 plain text', async () => {
    const req = new Request('https://witty-404.dev/text');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/plain');
    const text = await res.text();
    expect(text.length).toBeGreaterThan(10);
  });

  it('GET /terminal returns 200 array of logs', async () => {
    const req = new Request('https://witty-404.dev/terminal');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    const logs = (await res.json()) as string[];
    expect(Array.isArray(logs)).toBe(true);
    expect(logs.length).toBeGreaterThanOrEqual(6);
  });

  it('GET /svg returns 200 SVG image', async () => {
    const req = new Request('https://witty-404.dev/svg?theme=matrix');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('image/svg+xml');
    const svg = await res.text();
    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 1200 630"');
  });

  it('GET /roast returns 200 JSON with injected safe path', async () => {
    const req = new Request('https://witty-404.dev/roast?path=/admin/secret-passwords');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body.subtitle as string).toContain('/admin/secret-passwords');
  });

  it('GET /all returns 200 array containing all jokes', async () => {
    const req = new Request('https://witty-404.dev/all');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    const jokes = (await res.json()) as unknown[];
    expect(Array.isArray(jokes)).toBe(true);
    expect(jokes.length).toBeGreaterThanOrEqual(20);
  });

  it('GET /count returns 200 count object', async () => {
    const req = new Request('https://witty-404.dev/count');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    const data = (await res.json()) as { count: number };
    expect(data.count).toBeGreaterThanOrEqual(20);
  });

  it('GET /stats returns 200 leaderboard stats', async () => {
    const req = new Request('https://witty-404.dev/stats');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    const data = (await res.json()) as { leaderboard: unknown[] };
    expect(data).toHaveProperty('leaderboard');
    expect(Array.isArray(data.leaderboard)).toBe(true);
  });

  it('GET /robots.txt returns 200 disallowing /roast', async () => {
    const req = new Request('https://witty-404.dev/robots.txt');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Disallow: /roast');
  });

  it('OPTIONS request returns 204 with CORS preflight headers', async () => {
    const req = new Request('https://witty-404.dev/html', { method: 'OPTIONS' });
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('GET');
  });

  it('Unknown path returns 404 with joke response', async () => {
    const req = new Request('https://witty-404.dev/this-does-not-exist');
    const res = await worker.fetch(req, mockEnv, mockCtx);

    expect(res.status).toBe(404);
    const data = (await res.json()) as { error: string; joke: unknown };
    expect(data.error).toBe('Not Found');
    expect(data.joke).toBeDefined();
  });
});
