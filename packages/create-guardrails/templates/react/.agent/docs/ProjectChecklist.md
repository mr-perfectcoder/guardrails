# Project Setup & Developer Checklist

Welcome to the project! Follow this checklist to set up your environment and start contributing.

---

## 🛠️ Environment Setup

1.  **Node.js**: Ensure you are using the LTS version (or as defined in `.nvmrc`).
2.  **Package Manager**: Use `npm`. Run `npm install` to install dependencies.
3.  **Extensions (VS Code Recommended):**
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - Vitest
    - PostCSS Language Support

---

## 🚀 Getting Started

1.  **Configure Env:** Copy `.env.example` to `.env` and fill in the required API keys.
2.  **Verify Setup:**
    - `npm run dev` (Ensure the dashboard loads).
    - `npm run test` (Ensure initial tests pass).
3.  **Review Docs:** Read the following in order:
    - [Overview.md](Overview.md)
    - [ProjectStructure.md](ProjectStructure.md)
    - [CodingStandards.md](CodingStandards.md)
    - [DosAndDonts.md](DosAndDonts.md)

---

## ✅ Feature Development Checklist

Before submitting a Pull Request, ensure you have ticked all these boxes:

- [ ] **Tests Written:** Corresponding `__tests__/` file created and passed.
- [ ] **Coverage:** Unit tests cover success, error, and edge cases.
- [ ] **No Hardcoding:** All strings and config in `constants/` or `config/`.
- [ ] **Types in `types/`**: No inline interfaces or types.
- [ ] **Component Rules:** Follows "One JSX" rule and is under line limits.
- [ ] **Accessibility:** ARIA tags added and keyboard navigation works.
- [ ] **Lint & Prettier:** `npm run lint` passes without errors.
- [ ] **Commit Message:** Follows Conventional Commits format.
- [ ] **No Console Logs:** All debugging logs removed.
