<div align="center">

# 🛡️ guardrails

**Security rules and patterns for Next.js App Router.**  
**Drop-in for Cursor, Windsurf, Claude, Copilot, and every major AI coding agent.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## 🤔 The Problem

AI coding agents write fast, working code. They don't write **secure** code by default.

Ask Cursor, Copilot, Windsurf, or Claude to "add an API call" and it will probably:

- Store your backend URL in `NEXT_PUBLIC_API_URL` — visible to anyone in the browser
- Skip auth checks on Server Actions — anyone can POST to them directly
- Forward `payload: unknown` to your database — zero validation
- Hardcode or client-source tokens — credentials in plain sight
- Skip rate limiting — even read endpoints can be hammered

These aren't bugs in the agents. **Agents just don't have your security constraints.**

**Guardrails gives them those constraints.** One `AGENT_RULES.md` file that enforces a production-safe architecture on every file your agent touches — automatically.

---

## 🚨 The Five Gaps This Covers

| # | Gap | Risk | Fix |
|---|-----|------|-----|
| 1 | Exposed backend URL | `NEXT_PUBLIC_API_URL` leaks to the browser | Server-only env var + Axios proxy |
| 2 | Client-sourced token | Token travels client → Server Action → backend | `getServerSession()` in Axios interceptor only |
| 3 | No per-action auth | Server Actions are open POST endpoints | `requireAuth()` as first line of every action |
| 4 | No input validation | `payload: unknown` reaches your database | Yup validates + `stripUnknown: true` |
| 5 | No rate limiting | Any endpoint can be flooded — GET too | Upstash sliding window per user / IP |

---

## 📐 The Architecture

Every backend call is forced through this exact sequence — no layer can be skipped:

```
Client Component
    ↓  useFormik + React Query (useMutation / useQuery)
    ↓  Next.js Server Action ["use server"]
    ↓    → requireAuth()       — throws 401 if no valid session
    ↓    → requireRateLimit()  — throws 429 if quota exceeded
    ↓    → schema.validate()   — Yup validates + strips unknown fields
    ↓  Axios (server-only)     — token from next-auth, never from client
    ↓  Your Backend / Database
```

---

## 📦 What's in This Repo

### [`AGENT_RULES.md`](./AGENT_RULES.md)
The single rules file for all agents. One file, drop it in your project, your agent enforces the rules on every file it generates. Works with Cursor, Windsurf, Claude Code, GitHub Copilot, Cline, Aider, Antigravity, and more.

---

### [`nextjs-secure-api-pattern/`](./nextjs-secure-api-pattern)
A complete, production-ready Next.js App Router implementation of the secure pattern — every file ready to copy into your project.

Includes:
- `lib/axiosInstanceServer.ts` — server-only Axios instance with token interceptor
- `lib/authOptions.ts` — next-auth config with JWT + session callbacks
- `lib/rateLimiter.ts` — Upstash sliding window rate limiter
- `lib/schemas.ts` — Yup schemas shared by `useFormik` and Server Actions
- `types/api.ts` — `ApiResponse<T>` shared return type
- `app/actions.ts` — Server Actions with all 5 gaps fixed
- `hooks/query-hooks/` — React Query hooks per feature
- `components/MyForm.tsx` — `useFormik` + `useMutation` client component

→ **[View full implementation →](./nextjs-secure-api-pattern)**

---

## 🤖 Adding Rules to Your Agent

One file — `AGENT_RULES.md` — works with every agent below.

| Agent | File | Location |
|-------|------|----------|
| **Cursor** | `.cursorrules` | Project root |
| **Windsurf** | `.windsurfrules` | Project root |
| **Claude Code** | `CLAUDE.md` | Project root (auto-detected) |
| **Claude.ai** | — | Projects → Project Instructions |
| **GitHub Copilot** | `copilot-instructions.md` | `.github/copilot-instructions.md` |
| **Cline / Roo Code** | — | Extension Settings → Custom Instructions |
| **Continue** | — | Config → `systemMessage` field |
| **Aider** | `CONVENTIONS.md` | Project root or `--read` flag |
| **Antigravity** | — | Agent Settings → System Prompt |
| **Any other agent** | — | Paste as system prompt |

```bash
# Quick copy commands
cp AGENT_RULES.md .cursorrules          # Cursor
cp AGENT_RULES.md .windsurfrules        # Windsurf
cp AGENT_RULES.md CLAUDE.md             # Claude Code
cp AGENT_RULES.md CONVENTIONS.md        # Aider
mkdir -p .github && cp AGENT_RULES.md .github/copilot-instructions.md  # Copilot
```

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/mr-perfectcoder/guardrails
cd guardrails/nextjs-secure-api-pattern

# 2. Install
npm install

# 3. Set up env vars
cp .env.example .env.local

# 4. Add rules to your agent (see table above)
```

---

## 🔒 Environment Variables

```env
# NEVER prefix with NEXT_PUBLIC_
BACKEND_API_URL=https://your-backend.com
NEXTAUTH_SECRET=your-secret        # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
UPSTASH_REDIS_REST_URL=https://your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

---

## ✅ Pre-Ship Checklist

- [ ] No `NEXT_PUBLIC_` on any backend URL, token, or secret
- [ ] Every Server Action starts with `await requireAuth()`
- [ ] Every Server Action calls `await requireRateLimit()` before backend
- [ ] Every input validated with `{ abortEarly: false, stripUnknown: true }`
- [ ] Token from `getServerSession()` only — never from client
- [ ] `import "server-only"` in `axiosInstanceServer.ts`
- [ ] `ApiResponse<T>` return type on every Server Action
- [ ] All client calls through React Query hooks
- [ ] `useFormik` used — not `<Formik>` wrapper
- [ ] Tests for `401`, `429`, and `400` paths

---

## 🗺️ Roadmap

- [ ] Prisma + database layer patterns
- [ ] tRPC variant
- [ ] GitHub Action to lint for auto-reject patterns on every PR
- [ ] Remix, SvelteKit, Nuxt variants

---

## 🤝 Contributing

PRs welcome — especially for new agent support, additional security patterns, and framework variants.  
Please open an issue first for large changes.

---

## 📝 License

MIT — use it, fork it, drop it in your `.cursorrules` and ship secure code.
