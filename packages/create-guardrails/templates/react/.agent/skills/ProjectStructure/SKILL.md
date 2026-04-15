---
name: projectstructure
description: Guidelines and best practices for Project Structure & Architecture in react.
---

# Project Structure & Architecture

This document provides a detailed breakdown of the directory structure and the responsibilities of each module.

## 📂 Directory Tree

```text
my-app/
├── .husky/              # Git hooks (pre-commit, commit-msg)
├── public/              # Static assets (favicons, robots.txt)
├── src/
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── router/          # Routing logic and configuration
│   │   ├── index.tsx
│   │   └── __tests__/
│   ├── routes/          # TanStack Router file-based routes (optional)
│   │   ├── __root.tsx
│   │   ├── home.tsx
│   │   ├── auth/
│   │   └── dashboard/
│   ├── pages/           # Smart components (full views)
│   │   ├── home.tsx
│   │   ├── auth/
│   │   └── dashboard/
│   ├── components/      # UI Components (Common, Feature-specific)
│   │   ├── home/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── common/
│   ├── context/         # Global state providers
│   │   ├── auth/
│   │   ├── theme/
│   │   └── index.ts
│   ├── constants/       # Enums and constant strings
│   ├── validation/      # Yup/Zod schemas
│   ├── hooks/           # Custom React hooks
│   │   ├── api/
│   │   ├── form/
│   │   └── useDebounce.ts
│   ├── services/        # API service layer
│   │   ├── api.ts
│   ├── lib/             # Third-party library initializations
│   │   ├── axios.ts
│   │   └── logger.ts
│   ├── config/          # App configuration
│   │   ├── env.ts
│   │   └── queryClient.ts
│   ├── providers/       # Combined context providers
│   │   ├── QueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── layouts/         # Page layout templates
│   ├── enums/           # TypeScript Enums
│   ├── mocks/           # Mock data and MSW handlers
│   ├── utils/           # Pure helper functions
│   ├── types/           # Centralized TypeScript definitions
│   ├── styles/          # Global and Tailwind styles
│   ├── App.tsx          # Main application entry component
│   └── main.tsx         # Root mounting point
├── .eslintrc.cjs        # Linting rules
├── .prettierrc          # Formatting rules
├── tailwind.config.js   # Style configuration
├── postcss.config.js    # CSS processing
├── vite.config.ts       # Build configuration
└── package.json         # Project manifests
```

---

## 🔍 Detailed Folder Descriptions

### `.husky/`
Used for Git Hooks. Specifically, we use `pre-commit` to run linting and unit tests before every commit, ensuring no broken code reaches the repository.

### `src/components/`
Modular UI elements.
- `common/`: Highly reusable components like `Button`, `Input`, `Loader`.
- `[feature]/`: Components specific to a feature (e.g., `dashboard/StatsCard.tsx`).
- **Rule:** Every component must have a corresponding `__tests__/[Name].test.tsx` file.

### `src/pages/`
Components that represent a route. They orchestrate layouts and feature components. Pages usually handle the "intelligence" of the view, such as fetching data via hooks.

### `src/hooks/`
Contains all business logic and stateful logic.
- `api/`: Custom hooks for TanStack Query (e.g., `useUserQuery.ts`).
- `form/`: Logic for handling complex forms (e.g., `useAuthForm.ts`).
- `useDebounce.ts`: Generic utility hooks.

### `src/context/`
For state that needs to be accessed globally (e.g., `AuthContext`, `ThemeContext`). We use the Provider pattern to wrap the app or specific branches.

### `src/services/`
The API interaction layer. This folder contains functions that perform the actual network requests. It stays clean of UI logic and focuses on data retrieval.

### `src/types/`
**Critical:** No types or interfaces should be defined inside component files. ALL definitions go here to promote reusability and prevent circular dependencies.

### `src/validation/`
Centralized schemas for form validation (Yup) or data validation (Zod). This ensures consistency between client-side and server-side data expectations.

### `src/layouts/`
Wrapper components that define the structure of a page (e.g., `MainLayout` with Header/Footer, `SidebarLayout`).

### `src/constants/`
Home for all non-changing values. This includes error messages, API paths, and configuration limits. **Hardcoding strings in components is strictly forbidden.**

### `src/utils/`
Pure, side-effect-free helper functions (e.g., date formatting, currency conversion, string manipulation).

### `src/config/`
Initializes environment variables through a validation function to ensure all required keys are present at startup. Also hosts the `QueryClient` configuration.
### `src/router/`
Contains the main router configuration (e.g., `index.tsx`). This is where you define the mapping between paths and page components. All route-related tests should also reside here.

### `src/routes/`
If using TanStack Router, this folder utilizes file-based routing. Files like `__root.tsx` define the global layout, while files like `home.tsx` or `auth/login.tsx` automatically generate routes based on the file-system hierarchy.

### `src/lib/`
Initialization of third-party libraries. For example, `axios.ts` for configuring the Axios instance with interceptors, or `logger.ts` for a custom logging service.

### `src/mocks/`
Data used for development and testing. This includes mock JSON objects and potentially MSW (Mock Service Worker) handlers to simulate a backend during local development or unit tests.

### `src/providers/`
Component wrappers that bundle multiple Context Providers together. This keeps `App.tsx` clean by providing a single `QueryProvider` or `CombinedProvider`.

### `src/styles/`
Contains global CSS files, Tailwind directives, and font imports. Typically includes a `global.css` and a `tailwind.css` entry point.

### `src/enums/`
Strict TypeScript enums to avoid "magic numbers" or "magic strings" in the logic (e.g., `UserRole.ADMIN`, `Status.ACTIVE`).
