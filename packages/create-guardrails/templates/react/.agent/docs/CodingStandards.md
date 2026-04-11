# Coding Standards & Guidelines

To maintain a premium codebase, all contributors must adhere to the following standards.

## 📝 General Rules

1. **Zero Console Logs:** Never use `console.log`. Use a proper logging service if necessary. Husky prevents logs from being committed.
2. **No Hardcoded Strings:** Use `src/constants/` for all UI strings and configuration values.
3. **One JSX Block:** Each component file should contain only one primary JSX block. If a component grows too complex, extract sub-components.
4. **Naming:** Use PascalCase for components and camelCase for hooks and utilities.
5. **Commenting Strategy:** 
    - **Self-Documenting Code:** Prioritize writing clean, descriptive code where the variables and function names explain the intent.
    - **Complex Logic Only:** Comments should only be used to explain **why** something complex or non-obvious is happening (e.g., a specific regex, a complex math calculation, or a workaround for a library bug).
    - **Avoid Redundancy:** Do not add comments for obvious code (e.g., `// state for user` or `// increment count`).


## 🔁 DRY (Don't Repeat Yourself) Principles

To ensure maintainability and reduce technical debt, we strictly follow the DRY principle:
- **Logic Abstraction:** If a piece of logic (calculation, validation, API mapping) is used in two or more places, extract it into a **Utility function** (`src/utils/`) or a **Custom Hook** (`src/hooks/`).
- **UI Consistency:** Common patterns (Buttons, Modals, Inputs) must use the **Shared Components** in `src/components/common/`.
- **Value Centralization:** Never hardcode URLs, IDs, or Labels multiple times.

---

## 🏗️ Technical Integrity

- **Zero Hardcoding:** All strings and config must be in `src/constants/` or `src/config/`.
- **Zero Console Logs:** Never use `console.log` in production-ready code.
- **TDD Requirement:** All features must be developed following the [Testing Strategy](TestingStrategy.md).
- **Naming:** PascalCase for Components, camelCase for Hooks/Utils, and UPPER_SNAKE_CASE for Constants.
- **Accessibility (a11y):** All components must meet WCAG 2.1 AA. See [AccessibilityGuide.md](AccessibilityGuide.md) for mandatory rules.

