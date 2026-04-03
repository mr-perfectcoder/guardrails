# Antigravity setup

## Recommended (project root)

Antigravity picks up project rules from the repo root:

| File | Purpose |
|------|--------|
| **[`../GEMINI.md`](../GEMINI.md)** | **Primary.** Full instructions: topic-first reviews, Phases A/B/C, scoring table, engineering bar, git/Jira. |
| [`AGENTS.md`](../AGENTS.md) | Short pointer for Cursor / Claude Code / other tools; Antigravity should prefer `GEMINI.md` when present. |

Open this **Planning** folder (or copy `GEMINI.md` into your app repo’s root) so Antigravity loads the rules automatically.

## Optional: UI-only instructions

If your Antigravity build only has a free-text “project instructions” field and does not read `GEMINI.md`, paste the **entire contents** of `../GEMINI.md` there.

## One-off reviews in any chat

Use [PORTABLE-MASTER-PROMPT.md](./PORTABLE-MASTER-PROMPT.md) as the first message.
