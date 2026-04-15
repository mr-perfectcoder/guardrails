# 🏗️ Architecture Guide

> How Guardrails is structured and why — for contributors and curious developers.

---

## 🎯 The Core Concept: The `.agent/` Folder

Guardrails works by injecting a **`.agent/` folder** into a user's project root. This folder contains structured Markdown documentation that AI coding agents (Gemini, Cursor, Claude, etc.) read at the start of every session.

The agent reads the docs → understands the rules → enforces them on every file it writes.

```
your-project/
├── .agent/
│   ├── Overview.md        ← First file the agent reads. Links to all skills.
│   └── skills/
│       ├── SecurityAndAPI/
│       │   └── SKILL.md
│       ├── TestingStrategy/
│       │   └── SKILL.md
│       └── ... (20+ skill-specific folders)
└── GEMINI.md              ← Tells the agent to read @.agent/Overview.md
```

---

## 📁 Mono-repo Structure

```text
guardrails/
├── packages/
│   └── create-guardrails/          ← The NPM package (SINGLE SOURCE OF TRUTH)
│       ├── bin/cli.js              ← The unified CLI
│       ├── README.md               ← NPM package README
│       ├── package.json
│       └── templates/
│           ├── nextjs/.agent/      ← Next.js App Router docs (canonical)
│           └── react/.agent/       ← React + Vite docs (canonical)
│
├── nextjs-app-router/
│   └── templates/
│       └── .agent → (symlink)      ← Points to packages/create-guardrails/templates/nextjs/.agent
│
├── README.md                       ← Repo root README (public GitHub landing page)
├── CONTRIBUTING.md                 ← How to contribute
├── ARCHITECTURE.md                 ← This file
└── LICENSE
```

### ⚠️ The Golden Rule: Single Source of Truth

**All edits to documentation MUST be made in:**
```
packages/create-guardrails/templates/[nextjs|react]/.agent/skills/
```

The top-level `nextjs-app-router/templates/.agent/` folder is a **symlink** — not a real directory. Editing through it works, but contributors should always be aware they are editing the canonical source.

---

## 📄 Document Structure

Every `.agent/` folder has an identical structure:

### `Overview.md` — The Entry Point
- Tech stack definition
- Core principles (numbered, enforced)
- Links to all skills in `skills/`
- **Optional Modules** table (disabled-by-default docs)
- **Agent Behavioral Protocol** (the consent-first, no-override rules)

### `skills/[Topic]/SKILL.md` — Rule Documents

Every skill follows a **Standard Folder Structure**. While `SKILL.md` is the only required file, you can include additional resources to help the agent:

```text
.agent/skills/my-skill/
├── SKILL.md       # Main instructions (required)
├── scripts/       # Helper scripts (optional)
├── examples/      # Reference implementations (optional)
└── resources/     # Templates and other assets (optional)
```

The agent can read these files when following your skill's instructions.

#### How the Agent Uses Skills
Skills follow a **Progressive Disclosure** pattern to keep the context window clean:

1.  **Discovery:** When a conversation starts, the agent sees a list of available skills with their names and descriptions (extracted from the YAML).
2.  **Activation:** If a skill looks relevant to the current task, the agent reads the full `SKILL.md` content.
3.  **Execution:** The agent follows the skill's specific instructions, examples, and scripts while working.

### Optional Modules
These are listed in the `Overview.md` Optional Modules table with a clear warning.

---

## 🔧 The CLI (`bin/cli.js`)

The CLI does exactly four things:
1. **Asks** which framework (nextjs / react) — or reads from CLI args
2. **Asks** which AI agent (Gemini / Cursor / Claude / Other) — or reads from CLI args
3. **Copies** the `.agent/` template into the user's project root
4. **Creates** the agent activation file (e.g., `GEMINI.md`) with `@[.agent/Overview.md]`

It supports both interactive and silent modes:
```bash
npm create guardrails                  # interactive
npm create guardrails nextjs --gemini  # fully silent
```

---

## 🛡️ The Agent Behavioral Protocol

Every `Overview.md` ends with a **7-rule Agent Behavioral Protocol**. This is the most important part of Guardrails. It instructs the AI agent:

1. **No Override Without Consent** — never change a rule without asking
2. **Rule Boundaries** — stop and ask if a request violates a rule
3. **Read-Only by Default** — docs are immutable unless user says otherwise
4. **User Confirmation** — requires explicit acknowledgement for non-standard patterns
5. **Optional Modules** — never auto-apply disabled modules
6. **Evolution** — ask before codifying a new pattern into docs
7. **Transparency** — always ask when uncertain, never silently proceed

This protocol is **identical across both suites** and must remain so.

---

## ➕ Adding a New Suite (e.g., SvelteKit)

1. Copy an existing template folder:
   ```bash
   cp -r packages/create-guardrails/templates/react packages/create-guardrails/templates/svelte
   ```
2. Update all docs inside `templates/svelte/.agent/` to be SvelteKit-specific.
3. Add the new framework choice to `bin/cli.js`:
   ```javascript
   { name: '🔥  SvelteKit (Svelte 5)', value: 'svelte' }
   ```
4. Add a changeset, open a PR.
