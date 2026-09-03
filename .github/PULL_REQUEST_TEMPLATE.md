## Description
<!-- Briefly describe the changes in this PR (e.g. Added a new joke, improved CSS animation, fixed test) -->

## Joke Contribution Checklist
<!-- If this PR adds or modifies a joke, verify each item below -->
- [ ] Joke JSON file added in `jokes/<joke-id>.json`
- [ ] `id` is unique and strictly `kebab-case`
- [ ] `title` is punchy and dev-focused
- [ ] `logs` has 6 to 12 lines, each starting with `> `
- [ ] `footnote` and `emoji` are present
- [ ] No real names, no punching down, genuinely funny
- [ ] `npm run validate-jokes` passes locally
- [ ] `npm test` passes locally
