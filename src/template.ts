import { Joke } from './jokes';

/**
 * Safely escapes HTML special characters to prevent XSS.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitizes and caps untrusted path parameter.
 */
export function sanitizePath(rawPath?: string | null): string {
  if (!rawPath) return '/404';
  const trimmed = rawPath.trim();
  const capped = trimmed.length > 200 ? trimmed.slice(0, 200) + '...' : trimmed;
  return capped.startsWith('/') ? capped : '/' + capped;
}

/**
 * Applies path roast substitution into a Joke's template or subtitle.
 */
export function roastJoke(joke: Joke, rawPath?: string | null): Joke {
  const safePath = sanitizePath(rawPath);
  const escapedPath = escapeHtml(safePath);

  let roastedSubtitle: string;
  if (joke.pathTemplate) {
    roastedSubtitle = joke.pathTemplate.replace(/\{path\}/g, escapedPath);
  } else {
    roastedSubtitle = `We searched everywhere for \`${escapedPath}\`, but found only broken dreams and unmerged branches. ` + joke.subtitle;
  }

  return {
    ...joke,
    subtitle: roastedSubtitle,
  };
}
