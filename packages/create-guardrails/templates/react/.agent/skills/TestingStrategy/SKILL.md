---
name: testingstrategy
description: Guidelines and best practices for Testing Strategy & TDD Workflow in react.
---

# Testing Strategy & TDD Workflow

This project is built on **Test-Driven Development (TDD)**. We prioritize stability and reliability through a comprehensive testing suite.

---

## 🧪 Core Testing Principles

1.  **Red-Green-Refactor:** Write the failing test first, make it pass with minimal code, then refactor.
2.  **Tested Until Failure:** Every component and utility must be tested for edge cases, error states, and success paths.
3.  **No Implementation Leaks:** Tests should focus on behavior (what the user sees/does) rather than internal implementation details.

---

## 🛠️ Tools & Libraries

- **Test Runner:** [Vitest](https://vitest.dev/) (Speed & Vite compatibility).
- **DOM Testing:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (User-centric testing).
- **API Mocking:** [Mock Service Worker (MSW)](https://mswjs.io/) (Intercepting network requests at the browser/node level).

---

## 📂 File Organization

Tests must live in a `__tests__` folder adjacent to the target file.
- `src/components/common/Button.tsx` -> `src/components/common/__tests__/Button.test.tsx`
- `src/utils/helpers.ts` -> `src/utils/__tests__/helpers.test.ts`

---

## 🔄 Mocking Strategy

### 1. API Mocking with MSW
Do not use `vi.mock` for API services. Instead, use MSW handlers to simulate the backend.
- **Location:** handlers reside in `src/mocks/handlers.ts`.
- **Benefit:** Tests stay clean, and you test the actual service layer integration.

### 2. Mocking Hooks
Use `renderHook` from React Testing Library for testing custom hooks in `src/hooks/`.

---

## 🚦 Coverage Requirements

- **Logical Coverage:** 100% for all helper functions and hooks logic.
- **UI Coverage:** 100% for interaction paths (clicks, inputs) and state transitions (loading -> success -> error).
- **CI/CD Enforcement:** Husky prevents commits if the test suite fails.
