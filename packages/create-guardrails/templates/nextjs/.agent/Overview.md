# Project Overview: Next.js Industrial Architecture (App Router)
*Last Updated: 2026-04-11*

This project is a high-performance, server-first application built with **Next.js 15** and the **App Router**. It prioritizes extreme security, type safety, and a clear separation between Client-Side UI and Server-Side Logic.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 & 16](https://nextjs.org/) (utilizing App Router, Server Actions, and React Server Components)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest) (for state synchronization with Server Actions)
- **Form Handling:** [useActionState](https://react.dev/reference/react/useActionState) & [Formik](https://formik.org/)
- **Validation:** [Yup](https://github.com/jquense/yup) (Shared schema between client and server)
- **API Strategy:** [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) (No direct client-to-backend calls)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Security:** CSRF protection, HttpOnly cookies, and strict Server Action "Entry Guards."

## 🎯 Core Principles

1.  **Server Actions-First:** All data mutations and private data fetching MUST go through Server Actions. Bypassing the action layer to call an external API directly from the browser is strictly forbidden.
2.  **Strict Layering:** Every action must pass through the **Action Guard** (Authentication → Rate Limiting → Validation) before executing business logic.
3.  **Type Safety:** Centralized types in `types/`. Automatic inference from Yup schemas with `InferType`.
4.  **Security Gap Mitigation:** All environment variables for the backend are kept server-side (no `NEXT_PUBLIC_` for secret keys).
5.  **Test-Driven Development (TDD):** Component unit tests and Action logic tests (using **Jest + SWC**) are required.

## 📚 Documentation Reference

- **Architecture & Folders**: [docs/ProjectStructure.md](docs/ProjectStructure.md)
- **Security & API Rules**: [docs/SecurityAndAPI.md](docs/SecurityAndAPI.md)
- **Middleware & Proxy**: [docs/MiddlewareAndProxy.md](docs/MiddlewareAndProxy.md)
- **Coding Standards**: [docs/CodingStandards.md](docs/CodingStandards.md)
- **Metadata & SEO**: [docs/MetadataAndSEO.md](docs/MetadataAndSEO.md)
- **Caching Strategy**: [docs/CachingStrategy.md](docs/CachingStrategy.md)
- **Testing Strategy**: [docs/TestingStrategy.md](docs/TestingStrategy.md) (Jest + Playwright — no Vitest)
- **Setup Checklist**: [docs/ProjectChecklist.md](docs/ProjectChecklist.md)

---

## 🔧 Optional Modules (Disabled by Default)

These documents exist but are **NOT activated unless the USER explicitly requests them**. Agents MUST NOT apply these patterns autonomously.

| Module | Document | Activate When |
|---|---|---|
| OG Image Generation | [docs/OGImageGeneration.md](docs/OGImageGeneration.md) | User asks for social sharing / OG images |
| Prisma DB Patterns | [docs/PrismaPatterns.md](docs/PrismaPatterns.md) | User asks for database / ORM integration |
| Turbopack Config | [docs/TurbopackConfig.md](docs/TurbopackConfig.md) | User asks to optimize dev server or build tooling |

---

## 🤖 Agent Behavioral Protocol

> **Core Principle: The USER is always in control. The Agent is an assistant, not a decision maker.**

1.  **No Override Without Consent:** The Agent MUST NEVER override, bypass, or modify any established rule, pattern, or architectural decision without **explicit confirmation and consent from the USER**. This applies even if the Agent believes it would be an improvement.

2.  **Rule Boundaries:** If a request falls outside the established rules in these documents, the Agent MUST:
    - Stop and clearly inform the USER that the request conflicts with a Guardrail rule.
    - State *which rule* would be violated and *why*.
    - Ask for explicit permission before proceeding.

3.  **Read-Only by Default:** Treat all rules in these docs as **immutable** unless the USER explicitly says *"update the rule"* or *"override this."*

4.  **User Confirmation:** No non-standard pattern, workaround, or experimental approach may be applied without the USER typing explicit acknowledgement (e.g., *"Yes, proceed"* or *"Override approved"*).

5.  **Optional Modules:** NEVER apply an optional module (OG images, Prisma, Turbopack) unless the USER explicitly requests it by name.

6.  **Evolution:** If the USER confirms a new pattern should become a standard, the Agent MUST ask: *"Should I codify this into the project docs?"* before updating any document.

7.  **Transparency:** If the Agent is unsure whether an action violates a rule, it MUST ask the USER for clarification **before** taking any action — never silently guess or proceed.
