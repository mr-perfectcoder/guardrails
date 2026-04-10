# 🛡️ guardrails

**Security rules, architectural patterns, and AI-agent constraints for modern web applications.**  
*Last Updated: 2026-04-11*


<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## 👋 About Guardrails

**Guardrails** is a collection of drop-in security rules and architectural standards designed to fix the "Security Gap" in AI coding agents. 

While tools like Cursor, Windsurf, and Claude can write code at light speed, they often skip critical production constraints like input validation, rate limiting, and secure environment handling. Guardrails forces these agents to move from "vibe-coding" to "engineering" by enforcing a strict, framework-agnostic security layer on every file they touch.

---

## 🏗️ Available Patterns

This repository containing production-ready implementations and rule-sets for different stacks:

### 1. [React + Vite (Industrial-Grade)](./react-vite)
A high-performance architecture optimized for large-scale enterprise applications.
- **Goal:** Maintain code quality and testability at scale.
- **Key Features:**
    - **Strict TDD:** Mandated Vitest suite for every component.
    - **Modular Structure:** 500-line soft limits and 700-line hard limits for components.
    - **Asset Indexing:** Centralized named-export pattern for images and icons.
    - **Zero-PII Storage:** Secure React Context patterns to keep user data out of `localStorage`.
- → **[View React-Vite Pattern →](./react-vite/.agent/Overview.md)**

### 2. [Next.js Secure API Pattern](./nextjs-secure-api-pattern)
A server-first security model for Next.js App Router applications.
- **Goal:** Close the 5 common security gaps in AI-generated Server Actions.
- **Key Features:**
    - **Secure Axios Instance:** Token injection on the server side (never client-sourced).
    - **Action Guards:** Every Server Action requires `requireAuth()` and `requireRateLimit()`.
    - **Schema Enforcement:** Shared Yup/Zod validation between forms and backend.
- → **[View Next.js Implementation →](./nextjs-secure-api-pattern)**

### 3. [Code Review System](./code-review)
A scoring-based review system for Antigravity, Cursor, and Claude Code.
- → **[View Review Guides →](./code-review)**

---

## 🤖 How to Use with AI Agents

Activating Guardrails is as simple as pointing your agent to the project Overview.

1. **Create an agent file** in your project root based on your tool:
   - **Cursor:** `.cursor.md`
   - **Claude Code:** `claude.md`
   - **Antigravity:** `GEMINI.md`
2. **Add this single line** to the file:
   ```markdown
   @[.agent/Overview.md]
   ```
3. **That's it!** Your agent will automatically index the entire documentation suite and follow all established security and architectural rules.


---

## ✅ Framework Support & Roadmap
- [x] **Next.js App Router** (Secure Server-side patterns)
- [x] **React + Vite** (High-Performance TDD Architecture)
- [ ] Prisma + DB layer patterns
- [ ] tRPC / GraphQL variants
- [ ] Remix & SvelteKit variants
- [ ] GitHub Action for automated security linting

---

## 📝 License
MIT — Build fast, ship secure.
