import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizePath, roastJoke } from '../src/template';
import { Joke } from '../src/jokes';

const sampleJoke: Joke = {
  id: 'test-joke',
  title: 'Test Title',
  subtitle: 'Original Subtitle',
  logs: ['> 1', '> 2', '> 3', '> 4', '> 5', '> 6'],
  footnote: 'Footnote',
  emoji: '🧪',
  tags: ['test'],
  pathTemplate: 'Looking for `{path}` but it disappeared.',
};

describe('template & security escaping', () => {
  it('escapes HTML special characters correctly to prevent XSS', () => {
    const malicious = '<script>alert("pwned")</script> & \'hello\'';
    const escaped = escapeHtml(malicious);
    expect(escaped).toBe('&lt;script&gt;alert(&quot;pwned&quot;)&lt;/script&gt; &amp; &#039;hello&#039;');
    expect(escaped).not.toContain('<script>');
  });

  it('caps excessively long paths at 200 characters', () => {
    const hugePath = '/' + 'a'.repeat(300);
    const sanitized = sanitizePath(hugePath);
    expect(sanitized.length).toBeLessThanOrEqual(204); // 200 + '...'
    expect(sanitized.endsWith('...')).toBe(true);
  });

  it('substitutes {path} in pathTemplate with escaped input', () => {
    const roasted = roastJoke(sampleJoke, '<img src=x onerror=alert(1)>');
    expect(roasted.subtitle).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(roasted.subtitle).not.toContain('<img');
  });

  it('provides a safe fallback roast when pathTemplate is omitted', () => {
    const jokeWithoutTemplate: Joke = {
      ...sampleJoke,
      pathTemplate: undefined,
    };
    const roasted = roastJoke(jokeWithoutTemplate, '/api/v1/secret');
    expect(roasted.subtitle).toContain('/api/v1/secret');
    expect(roasted.subtitle).toContain('We searched everywhere for');
  });
});
