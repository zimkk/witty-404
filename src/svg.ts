import { Joke } from './jokes';
import { escapeHtml } from './template';

export interface SvgOptions {
  theme?: string;
}

export function renderSvgCard(joke: Joke, options: SvgOptions = {}): string {
  // SVG defaults to dark theme for reliable display on Twitter / Discord / GitHub READMEs
  let theme = options.theme || 'dark';
  if (theme === 'system') theme = 'dark';

  // Theme palettes
  let bg = '#0A0A0F';
  let cardBg = '#13131A';
  let cardBorder = '#232332';
  let titleColor = '#F3F4F6';
  let subtitleColor = '#9CA3AF';
  let accentColor = '#5B7FFF';
  let logBg = '#0E0E14';
  let logText = '#60A5FA';
  let footnoteColor = '#6B7280';
  let glowColor = 'rgba(91, 127, 255, 0.15)';

  if (theme === 'light') {
    bg = '#F8FAFC';
    cardBg = '#FFFFFF';
    cardBorder = '#E2E8F0';
    titleColor = '#0F172A';
    subtitleColor = '#475569';
    accentColor = '#2563EB';
    logBg = '#F1F5F9';
    logText = '#1D4ED8';
    footnoteColor = '#94A3B8';
    glowColor = 'rgba(37, 99, 235, 0.08)';
  } else if (theme === 'matrix') {
    bg = '#020B04';
    cardBg = '#051408';
    cardBorder = '#0F3816';
    titleColor = '#4ADE80';
    subtitleColor = '#22C55E';
    accentColor = '#10B981';
    logBg = '#031005';
    logText = '#86EFAC';
    footnoteColor = '#15803D';
    glowColor = 'rgba(34, 197, 94, 0.15)';
  } else if (theme === 'glitch') {
    bg = '#090014';
    cardBg = '#120422';
    cardBorder = '#4C1D95';
    titleColor = '#F43F5E';
    subtitleColor = '#E0E7FF';
    accentColor = '#06B6D4';
    logBg = '#0D0218';
    logText = '#22D3EE';
    footnoteColor = '#818CF8';
    glowColor = 'rgba(244, 63, 94, 0.2)';
  }

  // Format title lines
  const titleLines = joke.title.split('\n');
  const renderedTitleTspans = titleLines
    .map((line, idx) => {
      const dy = idx === 0 ? '0' : '1.25em';
      return `<tspan x="90" dy="${dy}">${escapeHtml(line)}</tspan>`;
    })
    .join('');

  // Get sample terminal logs (up to 3 punchy lines)
  const previewLogs = joke.logs.slice(0, 3);
  const renderedLogs = previewLogs
    .map((log, idx) => {
      const y = 390 + idx * 30;
      return `<text x="120" y="${y}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="16" fill="${logText}">${escapeHtml(log)}</text>`;
    })
    .join('\n        ');

  // Strip simple markdown for SVG rendering
  const cleanSubtitle = escapeHtml(joke.subtitle.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`(.*?)`/g, '$1'));
  const cleanFootnote = escapeHtml(joke.footnote.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`(.*?)`/g, '$1'));

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${cardBg}"/>
      <stop offset="100%" stop-color="${bg}"/>
    </linearGradient>
    <filter id="cardGlow" x="30" y="30" width="1140" height="570" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="12"/>
      <feGaussianBlur stdDeviation="24"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${bg}"/>

  <!-- Subtle grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${cardBorder}" stroke-width="0.75" opacity="0.3"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Glow Backdrop -->
  <rect x="50" y="50" width="1100" height="530" rx="24" fill="${glowColor}" filter="blur(20px)" />

  <!-- Main Card Container -->
  <rect x="50" y="50" width="1100" height="530" rx="20" fill="url(#cardGrad)" stroke="${cardBorder}" stroke-width="2"/>

  <!-- Top Badges / Tag & Emoji -->
  <rect x="90" y="85" width="100" height="34" rx="17" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-opacity="0.4"/>
  <text x="140" y="107" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${accentColor}" text-anchor="middle" letter-spacing="1">404 ERROR</text>

  <rect x="200" y="85" width="120" height="34" rx="17" fill="${cardBorder}" fill-opacity="0.5"/>
  <text x="260" y="107" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${subtitleColor}" text-anchor="middle">#${joke.tags[0] || 'dev'}</text>

  <!-- Watermark / URL badge -->
  <text x="1060" y="107" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" font-weight="600" fill="${accentColor}" text-anchor="end">witty-404.zimkk.workers.dev</text>

  <!-- Large Emoji -->
  <text x="1030" y="210" font-size="72" text-anchor="end">${joke.emoji}</text>

  <!-- Joke Title -->
  <text x="90" y="170" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="${titleColor}" letter-spacing="-0.5">
    ${renderedTitleTspans}
  </text>

  <!-- Subtitle snippet -->
  <text x="90" y="325" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" fill="${subtitleColor}" opacity="0.9">
    ${cleanSubtitle.length > 105 ? cleanSubtitle.slice(0, 102) + '...' : cleanSubtitle}
  </text>

  <!-- Terminal Preview Box -->
  <rect x="90" y="355" width="1020" height="120" rx="12" fill="${logBg}" stroke="${cardBorder}" stroke-width="1.5"/>
  <!-- Terminal window dots -->
  <circle cx="115" cy="372" r="4" fill="#EF4444" opacity="0.8"/>
  <circle cx="127" cy="372" r="4" fill="#F59E0B" opacity="0.8"/>
  <circle cx="139" cy="372" r="4" fill="#10B981" opacity="0.8"/>
  <text x="1080" y="375" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" fill="${footnoteColor}" text-anchor="end">bash - 404</text>
  ${renderedLogs}

  <!-- Footnote / Diagnostics -->
  <text x="90" y="525" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" fill="${footnoteColor}">
    ${cleanFootnote}
  </text>

  <!-- GitHub Repo credit bottom right -->
  <text x="1110" y="525" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${subtitleColor}" text-anchor="end">
    ⭐ github.com/zimkk/witty-404
  </text>
</svg>`;
}
