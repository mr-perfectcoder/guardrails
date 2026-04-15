---
name: development
description: Guidelines and best practices for Development Workflow (Next.js 15 & 16) in nextjs.
---

# Development Workflow (Next.js 15 & 16)

This project emphasizes a rapid, server-first development cycle using Next.js 15 & 16 features.

## 🏢 Local Setup
1.  **Node.js**: Ensure you are using the LTS version (or as defined in `.nvmrc`).
2.  **Environment**: Copy `.env.example` to `.env` and configure your API keys.
3.  **Dependencies**: Run `npm install` to install all necessary packages.
4.  **Database Hooks (If Applicable)**: Ensure local database/Redis instances are running (e.g., Docker Compose).

## 🧱 Development Commands
- `npm run dev`: Starts the Next.js development server with Turbopack (if enabled).
- `npm run build`: Performs a production build of the application.
- `npm run start`: Starts the production build.
- `npm run test`: Executes the Vitest suite in watch mode.
- `npm run lint`: Performs ESLint and Prettier checks.

## 🚀 Feature Workflow
1.  **Branching**: Create a new feature branch (e.g., `feature/user-dashboard`).
2.  **TDD**: Write failing tests for the new feature's component or Server Action.
3.  **Implement**: Build the feature, starting with RSCs and Server Actions, then moving to Client Components.
4.  **Refactor**: Clean up the code to match the 500/700 line limits and Project Structure.
5.  **Pr-Readiness**: Ensure all tests and linting pass before opening a Pull Request.

## 🤖 Interaction Protocol
AI agents MUST assist by generating properly documented feature branches and corresponding test suites. If an agent builds in `main` or skips the build step for verification, it is a non-standard practice.
