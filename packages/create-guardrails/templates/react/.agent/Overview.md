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
- **Accessibility (a11y)**: [docs/AccessibilityGuide.md](docs/AccessibilityGuide.md)

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

5.  **Optional Patterns:** NEVER apply an undocumented or experimental approach unless the USER explicitly requests it by name.

6.  **Evolution:** If the USER confirms a new pattern should become a standard, the Agent MUST ask: *"Should I codify this into the project docs?"* before updating any document.

7.  **Transparency:** If the Agent is unsure whether an action violates a rule, it MUST ask the USER for clarification **before** taking any action — never silently guess or proceed.

