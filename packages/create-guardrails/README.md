# 🛡️ create-guardrails

> **Core Principle**: You are the Architect, the AI is the Builder. Guardrails is the Building Code.


**Stop "Vibe Coding" and start engineering. Drop-in security rules, architectural standards, and AI-agent constraints for Next.js and React + Vite projects.**

[![NPM Version](https://img.shields.io/npm/v/create-guardrails?color=blue)](https://www.npmjs.com/package/create-guardrails)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)

---

## 🏗️ Converting "Vibe Coding" into Engineering

AI agents (Cursor, Claude, Gemini) are incredible at "Vibe Coding" — generating functional code at lightning speed. However, they naturally drift toward technical debt and inconsistent patterns if left unsupervised.

**Guardrails** ensures that the AI doesn't cut corners on the foundation. It provides a hard-coded set of architectural and security constraints that keep the AI aligned with your engineering vision, converting it from a fast-but-loose coder into a disciplined builder.

---

## 🚀 Quick Start

Run this in any project root — no installation needed:

```bash
npm create guardrails
```

Or go straight to your framework:

```bash
npm create guardrails nextjs    # Next.js 15 & 16 (App Router)
npm create guardrails react     # React 19 + Vite (SPA)
```

With your AI agent pre-selected:

```bash
npm create guardrails nextjs --gemini
npm create guardrails nextjs --cursor
npm create guardrails nextjs --claude

npm create guardrails react --gemini
npm create guardrails react --cursor
npm create guardrails react --claude
```

---

## 📦 What Gets Installed

Running the command injects a `.agent/` folder into your project root containing **production-grade documentation** that your AI agent reads and enforces on every file it touches.

```text
your-project/
├── .agent/
│   ├── Overview.md         ← Tech stack, core principles, agent protocol
│   └── docs/
│       ├── SecurityAndAPI.md
│       ├── TestingStrategy.md
│       ├── ProjectStructure.md
│       ├── DosAndDonts.md
│       └── ... (20+ more docs)
└── GEMINI.md (or .cursor.md / claude.md)  ← Agent activation file
```

---

## 🟦 Next.js App Router Suite

For teams using **Next.js 15 or 16** with the App Router, Server Actions, and React Server Components.

**Enforces:**
- ✅ Server Actions with `requireAuth()` → `requireRateLimit()` → `schema.validate()` guards
- ✅ RSC-first pages — `"use client"` isolated to `components/` only
- ✅ Metadata & SEO — `metadata` export required on every `page.tsx`
- ✅ Data Access Layer — `lib/dal.ts` with `verifySession()` + `React.cache()`
- ✅ `next/image` + `next/font` mandatory, no raw `<img>` or CDN font links
- ✅ Caching strategy — `use cache` directive, `revalidateTag`, v15 breaking change documented
- ✅ Middleware (v15) / Proxy (v16) gateway
- ✅ TDD: Jest + SWC + Playwright

---

## ⚡ React + Vite Suite

For teams building a **React 19 SPA** with Vite and a separate backend API.

**Enforces:**
- ✅ Secure Axios instance with request interceptors
- ✅ TanStack Query for all server state (`useQuery` / `useMutation`)
- ✅ Protected Route pattern — `<PrivateRoute>` with React Router `<Outlet>`
- ✅ `HttpOnly` cookie sessions — `localStorage` flagged as XSS-vulnerable
- ✅ Accessibility (a11y) — WCAG 2.1 AA: semantic HTML, ARIA, keyboard navigation
- ✅ Asset indexing — all images through `src/assets/` for Vite cache-busting
- ✅ TDD: Vitest + React Testing Library + Playwright

---

## 🤖 Activating Your AI Agent

Once `.agent/` is in your project, point your agent at it:

**Gemini / Antigravity:**
```
Read @.agent/Overview.md before starting any task.
```

**Cursor (`.cursorrules`):**
```
@.agent/Overview.md
```

**Claude (`claude.md`):**
```
@.agent/Overview.md
```

The agent discovers all security rules, architectural patterns, and enforcement protocol automatically.

---

## 🔗 Links

- [GitHub Repository](https://github.com/mr-perfectcoder/guardrails)
- [NPM Package](https://www.npmjs.com/package/create-guardrails)
- [Browse Next.js Docs](https://github.com/mr-perfectcoder/guardrails/tree/main/packages/create-guardrails/templates/nextjs/.agent/docs)
- [Browse React Docs](https://github.com/mr-perfectcoder/guardrails/tree/main/packages/create-guardrails/templates/react/.agent/docs)

---

## 📝 License

MIT — Build fast. Ship secure.
