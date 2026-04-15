---
name: codingstandards
description: Guidelines and best practices for Coding Standards & Next.js 15 in nextjs.
---

# Coding Standards & Next.js 15

This project follows a strict TDD approach and prioritizes modularity, type safety, and premium UX for the modern React Server Component architecture.

## 🛠️ Key Standards

1.  **Component Lines Limits**: Soft limit of 500 lines, hard limit of 700 lines. Break down complex modules.
2.  **No Direct Browser Fetching**: All mutations and complex data fetching MUST go through Server Actions (guarded by auth and rate limits).
3.  **Strict Typing**: All TypeScript interfaces must be placed in `types/`. No inline definitions allowed.
4.  **Zero Hardcoding**: Use `constants/` for all strings and configuration values.
5.  **Clean JSX**: One JSX block per component. Refactor children into sub-components for improved readability.
6.  **Formik & useActionState**: Use `useFormik` for client-side validation and `useActionState` for managing Server Action transitions.
7.  **Z-Index Layering**: Use centralized z-index constants to avoid "layer sprawl."
8.  **Modern React Hooks**: Prefer standard hooks (`use()`, `useOptimistic()`, `useTransition()`) over non-standard state management.

## 🤖 Interaction Protocol
AI agents MUST refuse to write any component over the hard limit and point it out in their response. Hardcoding logic or bypassing Server Actions is a security violation.
