# Agent rules (cross-tool)

This project uses tool-specific entry points:

- **Google Antigravity:** read **`GEMINI.md`** in this folder first (Antigravity-specific; overrides this file where both apply).
- **Cursor:** `.cursor/rules/*.mdc` in this repo.
- **Any chat agent:** paste `Agent-Rules/PORTABLE-MASTER-PROMPT.md` as the first message.

Shared intent: **topic-first codebase reviews**, **TDD and clean layering**, **no hardcoded user-facing strings in core logic**, **scaling and tech-debt visibility**, and **Jira/git/PR hygiene** when applicable. Full checklist and scoring table live in `GEMINI.md` and `Agent-Rules/PORTABLE-MASTER-PROMPT.md`.
