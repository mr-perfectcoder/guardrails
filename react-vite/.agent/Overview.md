# Project Overview: React-Vite Modern Architecture
*Last Updated: 2026-04-11*


This project is a high-performance, scalable web application built with **React 19** and **Vite**. It follows a strict **Test-Driven Development (TDD)** approach and prioritizes modularity, type safety, and premium user experience.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) (utilizing `use()`, `useActionState()`, etc.)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest) (for server state) & [React Context](https://react.dev/learn/passing-data-deeply-with-context) (for global client state)
- **Form Handling:** [Formik](https://formik.org/) with [Yup](https://github.com/jquense/yup) validation
- **Routing:** [React Router](https://reactrouter.com/) or [TanStack Router](https://tanstack.com/router/latest)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Testing:** Vitest / React Testing Library (Strict TDD)
- **Quality Assurance:** Husky (pre-commit hooks), ESLint, Prettier

## 🎯 Core Principles

1. **Test-Driven Development (TDD):** Every component and utility must have a corresponding test file. No code should be merged without passing tests.
2. **Zero Hardcoding:** All strings, API endpoints, and configuration values must be abstracted into `constants/` or `config/`.
3. **Type Safety:** Centralized type definitions in the `types/` folder. No inline interfaces or types within components.
4. **Component Purity:** Each component should ideally contain only one JSX block. Complex components must be broken down into smaller, reusable pieces.
5. **Modern React Patterns:** Full utilization of React 19 features, including the `use()` hook for resources and improved Form actions.
6. **No Console Logs:** Strict linting to prevent console logs from reaching production. Use custom logger service if needed.

## 🛠️ Performance & Optimization

- **Auto Code Splitting:** Enabled via Vite and TanStack Router to ensure minimal initial bundle size.
- **Selective Memoization:** Use `useMemo` and `useCallback` strategically for heavy computations, while trusting React 19's compiler for standard optimizations.
- **Efficient API Calls:** All data fetching is abstracted into custom hooks using TanStack Query for caching and synchronization.

---

## 📚 Documentation Reference

- **Architecture & folders**: [docs/ProjectStructure.md](docs/ProjectStructure.md)
- **Component Rules**: [docs/ComponentBestPractices.md](docs/ComponentBestPractices.md)
- **Standards & React 19**: [docs/CodingStandards.md](docs/CodingStandards.md)

- **Data & API Layer**: [docs/APIAndData.md](docs/APIAndData.md)
- **Security & State**: [docs/StateManagementAndSecurity.md](docs/StateManagementAndSecurity.md)
- **Tailwind Style Guide**: [docs/TailwindStyleGuide.md](docs/TailwindStyleGuide.md)
- **Asset Management**: [docs/AssetManagement.md](docs/AssetManagement.md)
- **Z-Index Layering**: [docs/ZIndexManagement.md](docs/ZIndexManagement.md)
- **Form Management**: [docs/FormHandling.md](docs/FormHandling.md)

- **Performance & Code Splitting**: [docs/CodeSplittingStrategy.md](docs/CodeSplittingStrategy.md)
- **React Optimization**: [docs/PerformanceOptimization.md](docs/PerformanceOptimization.md)
- **Skeleton & Loading UI**: [docs/SkeletonAndLoading.md](docs/SkeletonAndLoading.md)

- **Testing & TDD**: [docs/TestingStrategy.md](docs/TestingStrategy.md)
- **Error Handling**: [docs/ErrorHandling.md](docs/ErrorHandling.md)
- **Toast & Feedback**: [docs/ToastAndFeedback.md](docs/ToastAndFeedback.md)

- **Git & Workflow**: [docs/GitAndWorkflow.md](docs/GitAndWorkflow.md)
- **Linting & Formatting**: [docs/LintingAndFormatting.md](docs/LintingAndFormatting.md)
- **Maintenance & Audit**: [docs/MaintenanceAndAudit.md](docs/MaintenanceAndAudit.md)
- **Setup Checklist**: [docs/ProjectChecklist.md](docs/ProjectChecklist.md)

- **Development Workflow**: [docs/Development.md](docs/Development.md)
- **Hooks & Side Effects**: [docs/HooksBestPractices.md](docs/HooksBestPractices.md)
- **Best Practices**: [docs/DosAndDonts.md](docs/DosAndDonts.md) (**Recommended Reading**)

---

## 🤖 Agent Behavioral Protocol

To ensure strict adherence to the project's architectural integrity, the AI Agent follows these interaction rules:

1. **Rule Boundaries:** If a request is made that falls outside the established rules or skills defined in this documentation, the Agent MUST:
    - Inform the USER that the request is not covered by the existing project standards.
    - Ask for explicit instructions on how to proceed.
2. **User Confirmation:** No non-standard patterns or "experimental" fixes should be applied without explicit confirmation from the USER.
3. **Evolution:** If a new pattern is confirmed by the USER, it should be codified into these documents to maintain the project's source of truth.

