# Agent rules pack — full codebase review

Use these files to configure **Cursor**, **Antigravity** (or similar IDE agents), and **generic** chat agents.

| File | Use when |
|------|-----------|
| [PORTABLE-MASTER-PROMPT.md](./PORTABLE-MASTER-PROMPT.md) | Paste into any agent chat as the system or first message. |
| **[`../GEMINI.md`](../GEMINI.md)** | **Antigravity (primary):** full rules at repo root; Antigravity reads this when present. |
| [ANTIGRAVITY-INSTRUCTIONS.md](./ANTIGRAVITY-INSTRUCTIONS.md) | How to wire Antigravity + fallback copy-paste. |
| [`../AGENTS.md`](../AGENTS.md) | Cross-tool pointer (Cursor, Claude Code, others). |
| `../.cursor/rules/*.mdc` | Cursor loads these automatically (see each file’s `alwaysApply` / `globs`). |

**Suggested flow:** Start a review session → agent loads the workflow rule (or pastes the portable prompt) → agent **asks you which topics to score** → agent runs static (+ optional browser) checks → outputs the table + detailed breakdown.

### Where each variant lives

| Agent / tool | What to use |
|--------------|-------------|
| **Cursor** | `.cursor/rules/code-review-workflow.mdc` (invoke via @ rules or open a code file matching `engineering-quality-bar` globs). Set `alwaysApply: true` on any `.mdc` if you want it on every chat in that project. |
| **Antigravity** | Keep **`GEMINI.md`** in the **project root** (included in this repo). If the IDE ignores files, paste `GEMINI.md` into project instructions. See `ANTIGRAVITY-INSTRUCTIONS.md`. |
| **ChatGPT / Copilot / “here”** | Paste `PORTABLE-MASTER-PROMPT.md` as the first message; paste the URL on a new line if you want Phase B. |
