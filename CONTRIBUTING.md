# Contributing to witty-404 🚀

We love contributions! Adding a joke to `witty-404` takes less than 3 minutes.

---

## How to Add a Joke

1. **Fork the repo** and clone it locally.
2. **Create a new branch**: `git checkout -b joke/your-joke-id`
3. **Add your joke JSON** in `jokes/<your-joke-id>.json`.

### Example `jokes/my-joke.json`:
```json
{
  "id": "my-joke",
  "title": "Your request took off,\nfound nothing,\nand did not survive re-entry.",
  "subtitle": "The page was either **never written**, **renamed by committee**, or **deleted during cleanup**.",
  "logs": [
    "> checking if page exists...",
    "> it does not.",
    "> checking if it ever existed...",
    "> also no.",
    "> blaming the intern...",
    "> intern quit in 2023.",
    "> shipping anyway. 🚀"
  ],
  "footnote": "Error code: `PEBKAC-404` · Confidence level: 100%",
  "emoji": "✈️💥",
  "tags": ["deploy", "refactor"],
  "pathTemplate": "We looked for `{path}` everywhere. It is not here."
}
```

4. **Validate your joke**:
   ```bash
   npm run validate-jokes
   ```
5. **Run the test suite**:
   ```bash
   npm test
   ```
6. **Open a Pull Request**!

---

## Guidelines for Jokes

- **Make it genuinely funny**: Focus on authentic developer pain points (broken CI, Monday morning standups, stale documentation, caching issues, unmaintained dependencies).
- **Keep it friendly**: No real names, no punching down, no malicious content.
- **Terminal logs**: 6 to 12 lines, each line starting with `> `.
- **Valid JSON**: Ensure JSON formatting is strictly valid without trailing commas.

---

## Local Development

```bash
# Install dependencies
npm install

# Run local Cloudflare Worker dev server
npm run dev

# Run Vitest test suite
npm test
```
