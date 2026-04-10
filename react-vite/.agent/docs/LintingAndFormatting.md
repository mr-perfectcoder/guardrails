# Linting & Formatting Standards

To maintain a consistent codebase across different developers, we enforce strict linting and formatting rules via ESLint and Prettier.

---

## 🛠️ Tooling Suite

1.  **ESLint:** Used for catching code quality issues and enforcing React 19 rules.
2.  **Prettier:** Used for uniform code formatting.
3.  **Husky:** Prevents unformatted or "dirty" code from being committed.

---

## 📋 Mandatory Linting Rules

### 1. General Quality
- **no-console:** Strictly forbidden (except in a dedicated `src/lib/logger.ts`).
- **no-unused-vars:** Must be set to `error`. Every variable declared must be consumed.
- **react-hooks/rules-of-hooks:** Strictly enforced (Hooks only at the top level).

### 2. Import Sorting
We use `eslint-plugin-import` or a dedicated Prettier plugin to group and sort imports:
1.  React and official libraries.
2.  Third-party libraries (e.g., TanStack, Formik).
3.  Internal components/hooks (using `@/` alias).
4.  Styles and Assets.

### 3. Tailwind Class Sorting
Class names MUST be sorted according to the official Tailwind sorting order (handled by `prettier-plugin-tailwindcss`).

---

## 🧹 Automated Formatting

### Prettier Configuration
- **Semi:** `true`
- **SingleQuote:** `true`
- **TabWidth:** 2
- **TrailingComma:** `all`
- **PrintWidth:** 80 (Keep lines short for readability).

### Workspace Integration
Developers are encouraged to use **"Format on Save"** in VS Code to ensure compliance before even running the Husky hooks.
