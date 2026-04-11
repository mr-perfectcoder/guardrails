# Project Setup & Developer Checklist (Next.js 15 & 16)

Welcome to the Next.js App Router project! Follow this checklist to set up your environment and start contributing.

---

## 🛠️ Environment Setup

1.  **Node.js**: Ensure you are using the LTS version (or as defined in `.nvmrc`).
2.  **Package Manager**: Use `npm`. Run `npm install` to install dependencies.
3.  **Extensions (VS Code Recommended):**
    - Next.js snippets
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - Vitest
    - PostCSS Language Support

---

## 🚀 Getting Started

1.  **Configure Env:** Copy `.env.example` to `.env` and fill in the required API keys (especially `BACKEND_API_URL`, `NEXTAUTH_SECRET`).
2.  **Verify Setup:**
    - `npm run dev` (Ensure the application loads on `localhost:3000`).
    - `npm run test` (Ensure initial tests pass).
3.  **Review Docs:** Read the following in order:
    - [Overview.md](../Overview.md)
    - [ProjectStructure.md](ProjectStructure.md)
    - [SecurityAndAPI.md](SecurityAndAPI.md)
    - [MiddlewareAndProxy.md](MiddlewareAndProxy.md)
    - [CodingStandards.md](CodingStandards.md)

---

## ✅ Feature Development Checklist

Before submitting a Pull Request, ensure you have ticked all these boxes:

- [ ] **Tests Written:** Corresponding `__tests__/` file created and passed for the component or Server Action.
- [ ] **RSC Choice**: Is this a Server Component if it doesn't need interactivity?
- [ ] **Action Guards**: `requireAuth()` and `requireRateLimit()` are called first in the Server Action.
- [ ] **Shared Schemas**: Yup schema is used both for Formik (client) and the Server Action (server).
- [ ] **No NEXT_PUBLIC_**: Sensitive backend vars are NOT prefixed with `NEXT_PUBLIC_`.
- [ ] **Component Rules**: Follows "One JSX" rule and is under 500/700 line limits.
- [ ] **Accessibility**: ARIA tags added and keyboard navigation works.
- [ ] **Lint & Prettier**: `npm run lint` passes without errors.
- [ ] **Commit Message**: Follows Conventional Commits format.
- [ ] **No Console Logs**: All debugging logs removed.
- [ ] **Metadata/SEO**: Proper title and meta tags added to the `page.tsx` or layout.
