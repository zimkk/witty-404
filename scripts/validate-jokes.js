const fs = require('fs');
const path = require('path');

const jokesDir = path.join(__dirname, '..', 'jokes');
const files = fs.readdirSync(jokesDir).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.error('❌ Error: No joke JSON files found in jokes/ directory.');
  process.exit(1);
}

const seenIds = new Set();
let hasErrors = false;

const KEBAB_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

for (const file of files) {
  const filePath = path.join(jokesDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const joke = JSON.parse(content);

    const prefix = `[${file}]`;

    // Check id
    if (!joke.id || typeof joke.id !== 'string') {
      console.error(`❌ ${prefix} Missing or invalid 'id'.`);
      hasErrors = true;
    } else if (!KEBAB_REGEX.test(joke.id)) {
      console.error(`❌ ${prefix} 'id' ("${joke.id}") must be kebab-case (lowercase letters, numbers, hyphens).`);
      hasErrors = true;
    } else if (seenIds.has(joke.id)) {
      console.error(`❌ ${prefix} Duplicate 'id' "${joke.id}" already defined.`);
      hasErrors = true;
    } else {
      seenIds.add(joke.id);
      const expectedFileName = `${joke.id}.json`;
      if (file !== expectedFileName) {
        console.error(`❌ ${prefix} Filename must match joke id (${expectedFileName}).`);
        hasErrors = true;
      }
    }

    // Check title
    if (!joke.title || typeof joke.title !== 'string' || joke.title.trim().length === 0) {
      console.error(`❌ ${prefix} Missing or empty 'title'.`);
      hasErrors = true;
    }

    // Check subtitle
    if (!joke.subtitle || typeof joke.subtitle !== 'string' || joke.subtitle.trim().length === 0) {
      console.error(`❌ ${prefix} Missing or empty 'subtitle'.`);
      hasErrors = true;
    }

    // Check logs
    if (!Array.isArray(joke.logs) || joke.logs.length < 6 || joke.logs.length > 15) {
      console.error(`❌ ${prefix} 'logs' must be an array of 6 to 15 lines (got ${joke.logs ? joke.logs.length : 'non-array'}).`);
      hasErrors = true;
    } else {
      joke.logs.forEach((log, i) => {
        if (typeof log !== 'string' || !log.startsWith('> ')) {
          console.error(`❌ ${prefix} Log line ${i + 1} must start with '> ' (got: "${log}")`);
          hasErrors = true;
        }
      });
    }

    // Check footnote
    if (!joke.footnote || typeof joke.footnote !== 'string') {
      console.error(`❌ ${prefix} Missing or invalid 'footnote'.`);
      hasErrors = true;
    }

    // Check emoji
    if (!joke.emoji || typeof joke.emoji !== 'string') {
      console.error(`❌ ${prefix} Missing or invalid 'emoji'.`);
      hasErrors = true;
    }

    // Check tags
    if (!Array.isArray(joke.tags) || joke.tags.length === 0) {
      console.error(`❌ ${prefix} 'tags' must be a non-empty array of strings.`);
      hasErrors = true;
    }

    // Check optional pathTemplate
    if (joke.pathTemplate && typeof joke.pathTemplate !== 'string') {
      console.error(`❌ ${prefix} 'pathTemplate' must be a string if provided.`);
      hasErrors = true;
    }

  } catch (err) {
    console.error(`❌ [${file}] Failed to parse JSON: ${err.message}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\n💥 Validation failed. Please fix the joke schema errors listed above.');
  process.exit(1);
} else {
  console.log(`✅ All ${files.length} joke JSON files passed schema validation perfectly!`);
}
