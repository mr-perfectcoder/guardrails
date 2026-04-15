---
name: componentbestpractices
description: Guidelines and best practices for Component Best Practices in react.
---

# Component Best Practices

This document outlines the strict rules for creating and maintaining React components in this project.

---

## 🏛️ The Single Responsibility Rule

### One JSX Block Per File
Each component file must contain only **one primary JSX block**. If a component requires multiple distinct sections of UI logic, it must be broken down into smaller, reusable child components.
- **Why?** Improves testability, readability, and reusability.
- **Line Limits:** 
    - **Soft Limit:** Components should not exceed **500 lines**. If a file grows beyond this, proactive refactoring is required.
    - **Hard Limit:** In extreme "worst-case" scenarios, a component may reach **700 lines**, but this requires immediate architectural review and justification.
- **Action:** If you find yourself nesting multiple large `<div>` structures or exceeding line limits, extract logic into hooks or sub-components.


---

## 🏷️ Typing & Interfaces

### Zero Inline Definitions
All types, interfaces, and prop definitions must reside in the centralized `src/types/` directory.
- **Strict Rule:** Even if a type is used by only a single component, it must be declared in the types folder.
- **Consistency:** Use PascalCase for type names (e.g., `ButtonProps`).

---

## 🧪 Testing & TDD

### Tested Until It Fails
This project follows strict TDD principles. Every component must have a corresponding test file in an adjacent `__tests__` folder.
- **Coverage:** Components must be tested for:
    - Initial render state.
    - User interactions (clicks, input changes).
    - Error and loading states.
    - Prop updates.
- **Location:** `src/components/common/Button.tsx` -> `src/components/common/__tests__/Button.test.tsx`.

---

## 🏗️ Organization & Naming
- **Hierarchy:** `src/components/common/` for primitives, `src/components/[feature]/` for specific UI.
- **Naming:** PascalCase for files/folders. Use named exports only.
- **Testing:** Every component requires a matching `__tests__/[Name].test.tsx`.

---

## 🚀 Performance & Memory
- **Memoization:** Use `useMemo` for heavy calculations and `useCallback` when passing functions to memoized child components.
- **Prop Drilling:** Do not drill props more than 2 levels. Use **React Context** (e.g., `UserContext`) for deep data sharing.

---


## 🚫 Restricted Patterns

- **No `console.log`**: Use the project's internal logger.
- **No Inline Styles**: Use Tailwind CSS (See [Tailwind Style Guide](TailwindStyleGuide.md)).
- **Named Exports Only:** Never use `export default`.

    - `export const MyComponent = ...` instead of `export default MyComponent`.

---

## ♿ Accessibility (A11y) & ARIA

To ensure a premium and inclusive experience, every component must be accessible.

### Mandatory ARIA Tags
- **Interactive Elements:** Buttons, inputs, and toggles must have clear `aria-label` or `aria-labelledby` attributes if their purpose isn't clear from the text alone.
- **Dynamic Content:** Use `aria-live` for content that updates dynamically (e.g., status messages, notifications).
- **Relationships:** Use `aria-expanded`, `aria-controls`, and `aria-haspopup` for dropdowns, accordions, and modals.
- **Descriptions:** Use `aria-describedby` for inputs that have associated helper text or error messages.

### Semantic HTML
- Prioritize semantic elements (`<button>`, `<nav>`, `<aside>`, `<main>`) over generic `<div>` wrappers.
- **Images:** All `<img>` tags must have an `alt` attribute. Use `alt=""` for decorative images.

### Focus Management
- Ensure all interactive components have a visible focus state.
- For modals and overlays, implement **focus trapping** to keep the user within the component until it’s closed.

