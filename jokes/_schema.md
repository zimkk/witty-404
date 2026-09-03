# Joke Schema Definition & Contribution Rules

Every joke in witty-404 is stored as an individual JSON file inside the `jokes/` directory (e.g. `jokes/plane-crash.json`).

## Schema Example

```json
{
  "id": "plane-crash",
  "title": "Your request took off,\nfound nothing,\nand did not survive re-entry.",
  "subtitle": "The page was either **never written**, **renamed by committee**, or **deleted during a refactor that was \"just cleanup\"**. The PR description said *\"minor housekeeping\"*. It was not minor. It was not housekeeping.",
  "logs": [
    "> checking if page exists...",
    "> it does not.",
    "> checking if it ever existed...",
    "> also no.",
    "> blaming the intern...",
    "> intern quit in 2023.",
    "> blaming the senior dev...",
    "> senior dev is \"in a meeting\".",
    "> reverting to last known good state...",
    "> last known good state: 404.",
    "> shipping anyway. 🚀"
  ],
  "footnote": "Error code: `PEBKAC-404` · Confidence level: extremely high · Root cause: *vibes*",
  "emoji": "✈️💥",
  "tags": ["deploy", "refactor", "blame"],
  "pathTemplate": "We looked for `{path}` everywhere. It is not here. It was never here. Stop asking."
}
```

## Contributor Rules

1. **`id`**: Must be unique, lowercase, and strictly `kebab-case` (e.g. `daves-laptop`, `node-modules`).
2. **`title`**: 1 to 3 punchy lines. Line breaks (`\n`) are encouraged for comedic cadence.
3. **`subtitle`**: Dev-relatable explanation of what went wrong. Markdown bold (`**`) and italics (`*`) supported.
4. **`logs`**: An array of 6 to 12 terminal-style lines. Every line MUST begin with `> ` and maintain a rhythmic comedic progression.
5. **`footnote`**: A witty single line with mock error codes, metadata, or diagnostic conclusions.
6. **`emoji`**: 1-2 expressive emoji matching the narrative.
7. **`tags`**: 2 to 4 tags from the suggested list:
   - `deploy`, `refactor`, `blame`, `legacy`, `meetings`, `database`, `frontend`, `backend`, `security`, `ai`, `git`, `devops`, `infra`, `dns`, `cache`
8. **`pathTemplate`** *(optional but encouraged)*: A string incorporating `{path}` to roast the specific missing URL.
9. **Humor Standard**:
   - Keep it genuinely funny to developers.
   - Zero real names, zero punching down, zero bigotry or cruelty. Dev pain points only (CI failures, DNS, Jira tickets, YAML indentations, flaky tests, merge conflicts).
