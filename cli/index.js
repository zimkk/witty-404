#!/usr/bin/env node

const https = require('https');

const args = process.argv.slice(2);
const isJson = args.includes('--json');
const isTerminalOnly = args.includes('--terminal');
const tagArg = args.find(a => a.startsWith('--tag='));
const tag = tagArg ? tagArg.split('=')[1] : null;
const idArg = args.find(a => a.startsWith('--id='));
const id = idArg ? idArg.split('=')[1] : null;

const queryParams = new URLSearchParams();
if (tag) queryParams.set('tag', tag);
if (id) queryParams.set('id', id);

const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
const endpoint = isTerminalOnly ? `/terminal${queryString}` : `/${queryString}`;
const baseUrl = process.env.WITTY_404_URL || 'https://witty-404.zimkk.workers.dev';
const url = `${baseUrl}${endpoint}`;

// Terminal ANSI colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgDark: '\x1b[40m',
};

https.get(url, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(rawData);

      if (isJson) {
        console.log(JSON.stringify(parsed, null, 2));
        return;
      }

      if (isTerminalOnly && Array.isArray(parsed)) {
        parsed.forEach(line => console.log(`${colors.cyan}${line}${colors.reset}`));
        return;
      }

      // Pretty terminal output
      console.log(`\n${colors.bold}${colors.red}╔═══════════════════════════════════════════════════════════════╗${colors.reset}`);
      console.log(`${colors.bold}${colors.red}║  💥 404 NOT FOUND  ·  ${colors.white}${parsed.emoji || '💀'}  ·  #${(parsed.tags && parsed.tags[0]) || 'dev'}${colors.red}                     ║${colors.reset}`);
      console.log(`${colors.bold}${colors.red}╚═══════════════════════════════════════════════════════════════╝${colors.reset}\n`);

      console.log(`${colors.bold}${colors.white}${parsed.title}${colors.reset}\n`);
      console.log(`${colors.dim}${parsed.subtitle}${colors.reset}\n`);

      console.log(`${colors.yellow}--- [ Debug Logs ] ---${colors.reset}`);
      if (Array.isArray(parsed.logs)) {
        parsed.logs.forEach((log, idx) => {
          const isLast = idx === parsed.logs.length - 1;
          const color = isLast ? colors.bold + colors.magenta : colors.cyan;
          console.log(`  ${color}${log}${colors.reset}`);
        });
      }

      console.log(`\n${colors.dim}${parsed.footnote}${colors.reset}\n`);
      console.log(`${colors.blue}👉 Embed this 404: https://witty-404.zimkk.workers.dev/html${colors.reset}\n`);
    } catch (err) {
      console.error('Failed to parse response:', err.message);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Request failed:', err.message);
  process.exit(1);
});
