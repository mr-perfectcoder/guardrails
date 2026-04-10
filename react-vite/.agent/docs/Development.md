# Development Guide & Scripts

This document outlines the workflow and scripts available for developing the project.

## 🛠️ Scripts

These scripts are defined in `package.json` (to be implemented):

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles the project into the `dist/` folder.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code style issues.
- `npm run test`: Executes unit tests using Vitest.
- `npm run test:coverage`: Runs tests and generates a coverage report.

## 🔄 Workflow

### 1. Feature Development
Start by creating the test file for the feature you are about to implement. Follow the TDD cycle:
1. **Red:** Write a failing test.
2. **Green:** Write the minimum code to make the test pass.
3. **Refactor:** Clean up the code while ensuring tests remain green.

### 2. Committing Changes
When you commit, Husky will automatically:
- Run `lint-staged` to format and lint your code.
- Run `npm run test` to ensure no regressions.
- Run `npm run build` to verify the project still compiles.

### 3. Environment Variables
All variables from `.env` must be exported through `src/config/env.ts`. This file should perform a runtime check:
```typescript
export const getEnv = () => {
  const env = import.meta.env;
  if (!env.VITE_API_URL) throw new Error("VITE_API_URL is missing");
  return {
    apiUrl: env.VITE_API_URL,
    // ...
  };
};
```

## 💅 Styling
We use **Tailwind CSS**. Avoid writing custom CSS in `.css` files unless absolutely necessary for complex animations or third-party overrides. Use the design system tokens defined in `tailwind.config.js`.
