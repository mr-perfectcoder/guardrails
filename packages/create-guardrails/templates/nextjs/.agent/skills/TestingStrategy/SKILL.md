---
name: testingstrategy
description: Guidelines and best practices for Testing Strategy & TDD (Next.js 15 & 16) in nextjs.
---

# Testing Strategy & TDD (Next.js 15 & 16)

This project mandates a strict **Test-Driven Development (TDD)** approach following the officially recommended Next.js testing stack.

## 🏢 Official Next.js Testing Stack

Next.js officially recommends four tools. This project uses the following:

| Layer | Tool | Purpose |
|---|---|---|
| Unit & Integration | **Jest** + **React Testing Library** | Components, hooks, utilities |
| E2E | **Playwright** | Full user-journey simulation |
| Optional E2E | **Cypress** | Component + E2E alternative |

> **Why Jest over Vitest?** Vitest is the standard for Vite-based projects. Next.js uses a custom Webpack/Turbopack compiler that requires **Jest** (with SWC transform via `@swc/jest`) for correct module resolution and Server Action/RSC compatibility.

---

## 🏗️ Unit & Integration Testing (Jest)

### Setup
```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @swc/jest @swc/core
```

### Config (`jest.config.ts`)
```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
```

### `jest.setup.ts`
```typescript
import '@testing-library/jest-dom';
```

### Location Rules
- Every component MUST have a `__tests__/[ComponentName].test.tsx` file alongside it.
- Every Server Action MUST have a `__tests__/[action-name].actions.test.ts` test file.

---

## 🧱 Testing Async Server Components

> **Next.js Docs Note**: Full async RSC unit testing is not yet fully supported by Jest. Use **E2E tests (Playwright)** as the primary coverage mechanism for RSC output.

### Recommended approach for RSCs:
- Test the **data-fetching functions** (in `lib/`) separately as pure async functions.
- Test the **rendered output** of RSCs via Playwright E2E tests.
- Test **Client Components** they pass data into using Jest + RTL.

---

## 🚀 E2E Testing (Playwright)

### Setup
```bash
npm install -D @playwright/test
npx playwright install
```

### Scope
- **Critical journeys**: Login, Signup, Dashboard load, Form submission.
- **Auth flows**: Test redirect on unauthenticated access to protected routes.
- **Server Action results**: Simulate full form submissions and assert on server-returned UI.

### File Location
```text
tests/
└── e2e/
    ├── auth.spec.ts
    └── dashboard.spec.ts
```

---

## 📏 TDD Rules
1.  **Red–Green–Refactor**: Write a failing test first (Red), implement logic (Green), then clean up (Refactor).
2.  **No Code Without Coverage**: Server Actions, Auth guards, and Validation schemas MUST have test coverage before merging.
3.  **Async RSC Coverage**: RSC data functions (in `lib/`) must be unit-tested. The full RSC render must be E2E-tested.
4.  **No Mock Swallowing**: All side effects and error states must be covered in tests.

## 🤖 Interaction Protocol
AI agents MUST use **Jest** (not Vitest) for all unit tests in Next.js projects. If an agent adds a Server Action or component without a `__tests__/` file, it is a TDD violation. Any request to "skip tests for now" requires explicit user confirmation.
