---
name: componentbestpractices
description: Guidelines and best practices for Component Best Practices (Next.js 15 & 16) in nextjs.
---

# Component Best Practices (Next.js 15 & 16)

This project follows a "Server-First" component architecture. Prioritize React Server Components (RSC) for data fetching and use Client Components only when necessary for interactivity.

## 🏢 Server Components (RSC)
- **Mandatory for Pages**: ALL page files (`page.tsx`) MUST be Server Components. Interactivity must be abstracted into separate Client Components.
- **Data Fetching**: Fetch data directly in the RSC using `await` and async components.
- **Security**: Never pass sensitive backend data (like API keys) to Client Components.
- **Interactivity**: Cannot use hooks like `useState`, `useEffect`, or `useFormik`.

## 🖱️ Client Components
- **Usage**: Use only for event listeners, state, or browser APIs.
- **Directive**: Must have `"use client"` at the top of the file.
- **Isolation**: Keep Client Components leaf-level to maximize the RSC payload.
- **Optimization**: Do not fetch data from a Client Component directly; pass data as props from an RSC or use a React Query hook calling a Server Action.

## 📐 General rules for both
1.  **Line Limits**: Soft limit of 500 lines, hard limit of 700 lines. Refuse to write "God Components."
2.  **Naming**: Use PascalCase for all component filenames (e.g., `UserCard.tsx`).
2.  **Strict Page Decoupling**: Pages MUST NOT contain interactivity logic. If a feature requires state or effects, create a Client Component in `components/` with the `"use client"` directive, then import it into the `page.tsx` (RSC).
3.  **One JSX Block**: Aim for a single main JSX return...
4.  **TDD**: Every component must have a corresponding `__tests__/` file. If a component is difficult to test, it probably has too much coupled logic.
5.  **Clean Props**: Destructure props in the function signature for clarity and better TypeScript inference.

## 🤖 Interaction Protocol
Agents must always check if the current file has `"use client"`. If an agent adds a hook to an RSC, it MUST either:
- Convert the file to `"use client"`.
- Move the stateful logic to a separate Client Component.
- Propose an RSC-native approach (e.g., passing data as props).
