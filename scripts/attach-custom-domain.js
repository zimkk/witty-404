const fs = require('fs');
const path = require('path');
const https = require('https');

const tomlPath = path.join(process.env.APPDATA || '', 'xdg.config', '.wrangler', 'config', 'default.toml');
if (!fs.existsSync(tomlPath)) {
  console.error('Wrangler config not found at:', tomlPath);
  process.exit(1);
}

const tomlContent = fs.readFileSync(tomlPath, 'utf8');
const tokenMatch = tomlContent.match(/oauth_token\s*=\s*["']([^"']+)["']/);
if (!tokenMatch) {
  console.error('oauth_token not found in default.toml');
  process.exit(1);
}

const token = tokenMatch[1];
const accountId = '7a8724c37b02173a8b56bf6064e8b49b';
const hostname = process.argv[2] || 'witty-404.hassannazir.dev';

console.log(`Attaching custom domain "${hostname}" to service "witty-404"...`);

const payload = JSON.stringify({
  hostname,
  service: 'witty-404',
  environment: 'production'
});

const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: `/client/v4/accounts/${accountId}/workers/domains`,
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'User-Agent': 'wrangler-custom-domain-setup/1.0',
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      if (json.success) {
        console.log(`✅ Success! Custom domain "${hostname}" is now attached to witty-404!`);
      } else {
        console.log('Response:', JSON.stringify(json.errors || json.messages || json, null, 2));
      }
    } catch {
      console.log('Response:', body);
    }
  });
});

req.on('error', (err) => {
  console.error('Request failed:', err.message);
});

req.write(payload);
req.end();
