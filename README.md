# 🛡️ Guardrails

**Drop-in security rules, architectural standards, and AI-agent constraints for modern web applications.**  
*Last Updated: 2026-04-11*

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## 👋 What is Guardrails?

**Guardrails** is a collection of drop-in security rules and architectural standards designed to fix the **"Security Gap"** in AI coding agents.

Tools like Cursor, Windsurf, Copilot, and Gemini can write code at light speed — but they often skip critical production constraints like input validation, rate limiting, auth guards, and secure environment handling.

Guardrails forces these agents to move from **"vibe-coding" to "engineering"** by injecting a strict, framework-specific security and architecture layer into your project that the AI agent reads and enforces on every file it touches.

---

## 📦 Available Suites

Guardrails provides two production-ready suites. **Pick the one that matches your stack.**

---

### 🟦 `nextjs-app-router` — Next.js 15 & 16 (App Router)

> **Best for:** Teams building with Next.js using the App Router, Server Actions, and React Server Components.

This is a **server-first** architecture. Pages are React Server Components by default. Interactivity is isolated to Client Components in a `components/` folder. Data mutations flow through a secure Server Action guard layer — never directly from the browser to the backend.

**Key Features:**
- ✅ **Server Actions with Guard Layer** — `requireAuth()` → `requireRateLimit()` → `schema.validate()` on every action
- ✅ **RSC-First Pages** — All `page.tsx` files are Server Components. `"use client"` is isolated to `components/`
- ✅ **Metadata & SEO** — Every page exports `metadata` or `generateMetadata()`. No raw `<head>` tags
- ✅ **Data Access Layer (DAL)** — Centralized `lib/dal.ts` with `verifySession()` + `React.cache()`
- ✅ **`next/image` + `next/font`** — Mandatory. No raw `<img>` or Google Fonts CDN links
- ✅ **Caching Strategy** — `use cache` directive, `revalidateTag`, v15 `fetch()` breaking change documented
- ✅ **Middleware (v15) / Proxy (v16)** — Edge-side auth and header injection
- ✅ **Spec-Driven Development** — Track implementation vs. FRS/SRS via `spec/`
- ✅ **TDD: Jest + SWC + Playwright** — Official Next.js testing stack (not Vitest)

```bash
npm create guardrails nextjs
```

→ **[Browse Next.js Docs →](./packages/create-guardrails/templates/nextjs/.agent/skills/)**

---

### ⚡ `react-vite` — React 19 + Vite (SPA)

> **Best for:** Teams building a pure client-side Single Page Application with React and Vite.

This is a **client-first** architecture. There is no server rendering. All data fetching is done through TanStack Query hooks calling a separate backend API via a secure Axios instance. State is managed with React Context and React Query — no Redux.

**Key Features:**
- ✅ **Secure Axios Layer** — One centralized instance with interceptors. Never `fetch()` inline
- ✅ **TanStack Query** — All server state via `useQuery` / `useMutation` hooks in `hooks/api/`
- ✅ **Protected Route Pattern** — `<PrivateRoute>` wrapper using React Router `<Outlet>`
- ✅ **No `localStorage` for tokens** — Recommends `HttpOnly` cookies via backend. Flags `localStorage` as XSS-vulnerable
- ✅ **Accessibility (a11y)** — WCAG 2.1 AA enforced: semantic HTML, ARIA, keyboard navigation
- ✅ **Asset Indexing** — All images imported through `src/assets/index.ts` for Vite cache-busting
- ✅ **TDD: Vitest + RTL + Playwright** — Full test coverage enforced per component
- ✅ **Spec-Driven Development** — Track implementation vs. FRS/SRS via `spec/`
- ✅ **`<Link>` over `<a>`** — React Router navigation enforced. No full-page reloads in SPA

```bash
npm create guardrails react
```

→ **[Browse React-Vite Docs →](./packages/create-guardrails/templates/react/.agent/skills/)**

---

## 🆚 Which Suite Should I Use?

| | `nextjs-app-router` | `react-vite` |
|---|---|---|
| **Rendering** | Server-first (RSC + SSR) | Client-first (SPA) |
| **Routing** | Next.js App Router (file-based) | React Router / TanStack Router |
| **Data fetching** | Server Actions + DAL | TanStack Query → Backend API |
| **Auth pattern** | Server-side `verifySession()` + DAL | Client-side `useAuth()` + `<PrivateRoute>` |
| **API calls** | Server Actions (no direct client→API) | Axios instance from browser |
| **Image handling** | `next/image` | `src/assets/` import pattern |
| **Testing** | Jest + SWC + Playwright | Vitest + RTL + Playwright |
| **Best for** | Content-heavy apps, SEO-critical, dashboards | SPAs, portals, internal tools |

> **Not sure?** If you're using `next dev` → pick `nextjs-app-router`. If you're using `vite` → pick `react-vite`.

---

## 🤖 How to Activate with an AI Agent

Once you run the CLI and the `.agent/` folder is in your project root, point your AI agent at it:

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

The agent will discover all rules, security constraints, and architectural patterns automatically.

### 🛠️ Extending Guardrails (Custom Skills)
You can easily add your own project-specific rules while maintaining the Guardrails standard. Use the built-in skill generator:

```bash
npx create-guardrails --add-skill MyProjectRule
```
This automatically creates a directory at `.agent/skills/MyProjectRule/SKILL.md` with the required YAML frontmatter.

---

## 🗺️ Roadmap

- [x] **Next.js App Router** suite (v15 & v16)
- [x] **React + Vite** suite (React 19)
- [x] Unified `npm create guardrails` CLI — **live on NPM**
- [ ] Public GitHub launch + `CONTRIBUTING.md`
- [ ] CI/CD: Auto-publish to NPM on merge
- [ ] Remix suite
- [ ] SvelteKit suite

---

## 🤝 Contributing

We welcome contributions from the community. Adding a new security rule, fixing a doc, or proposing an entirely new framework suite are all valid contributions.

➡️ **See [`CONTRIBUTING.md`](CONTRIBUTING.md)** *(coming soon)*

---

## 📝 License

MIT — Build fast. Ship secure.
