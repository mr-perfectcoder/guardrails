# 🤝 Contributing to Guardrails

First off — thank you! Guardrails is community-powered. Every improved rule, fixed doc, or new framework suite makes AI coding agents better for everyone.

---

## 🗺️ Ways to Contribute

| Type | Effort | Description |
|---|---|---|
| **📝 Editor** | Low | Fix a typo, improve a code example, clarify a rule |
| **🔒 Security** | Medium | Add a missing security rule or close a documented gap |
| **🏗️ Architect** | High | Add an entirely new framework suite (e.g., SvelteKit, Remix) |

---

## ✏️ Editor Path — Fixing or Improving Docs

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/guardrails.git
cd guardrails
```

### 2. Find the Right File
All docs live in **one place** — the single source of truth:
```
packages/create-guardrails/templates/
├── nextjs/.agent/docs/    ← Next.js App Router docs
└── react/.agent/docs/     ← React + Vite docs
```

> ⚠️ **Important**: `nextjs-app-router/templates/.agent/` is a symlink. You can edit through it, but the canonical path is always `packages/create-guardrails/templates/nextjs/.agent/`.

### 3. Edit the Markdown File
Each doc follows this structure:
- `✅ DO` with code example
- `❌ DON'T` with code example
- `🤖 Interaction Protocol` — explicit AI agent instructions

### 4. Test Locally
Verify the CLI still works:
```bash
cd packages/create-guardrails
node bin/cli.js nextjs --gemini   # test Next.js injection
node bin/cli.js react --cursor    # test React injection
```

Check that your edited doc appears in the injected `.agent/` folder.

### 5. Open a PR
```bash
git add .
git commit -m "docs(nextjs): add revalidatePath rule to CachingStrategy"
git push origin your-branch
```

Open a Pull Request with:
- What rule you added/changed and **why**
- Which gap in the existing docs this closes

---

## 🏗️ Architect Path — Adding a New Suite

To add a **new framework** (e.g., SvelteKit, Astro, Remix):

### 1. Copy an existing template
```bash
cp -r packages/create-guardrails/templates/react packages/create-guardrails/templates/svelte
```

### 2. Rewrite the docs
Go through every `.md` file in `templates/svelte/.agent/docs/` and adapt it to the new framework. At minimum, update:
- `Overview.md` — Tech stack, core principles
- `ProjectStructure.md` — Folder layout for the new framework
- `SecurityAndAPI.md` — Framework-specific security model
- `TestingStrategy.md` — Correct testing tools for that framework
- `DosAndDonts.md` — Framework-specific do/don't examples

### 3. Add the framework choice to the CLI
In `packages/create-guardrails/bin/cli.js`, add to the `TEMPLATES` object:
```javascript
svelte: {
  label: 'SvelteKit (Svelte 5)',
  key: 'svelte',
  features: [ '...', '...' ],
},
```
And add to the `inquirer` choices list.

### 4. Open a PR
Large additions like new suites will be reviewed carefully against the existing quality bar.

---

## 📏 PR Checklist

Before submitting, verify:

- [ ] Docs edited in `packages/create-guardrails/templates/` (not symlink path)
- [ ] CLI tested locally with `node bin/cli.js [framework]`
- [ ] Each new rule has a `✅ DO`, `❌ DON'T`, and `🤖 Interaction Protocol` section
- [ ] The **Agent Behavioral Protocol** in `Overview.md` is unchanged (requires maintainer approval to modify)
- [ ] No secrets, tokens, or personal data in any committed file

---

## 🚫 What NOT to Contribute

- **Weakening security rules** — e.g., removing `requireAuth()` guards or allowing `localStorage` tokens
- **Overriding the Agent Behavioral Protocol** without maintainer approval
- **Adding `node_modules/`** or build artifacts to commits
- **Editing symlinked paths directly** in a way that replaces the symlink with a real directory

---

## 💬 Questions?

Open a [GitHub Issue](https://github.com/mr-perfectcoder/guardrails/issues) using the appropriate template.
