---
name: projectstructure
description: Guidelines and best practices for Project Structure & Architecture (Next.js) in nextjs.
---

# Project Structure & Architecture (Next.js)

This document provides a detailed breakdown of the directory structure and the responsibilities of each module for the Next.js App Router application.

## 📂 Directory Tree

```text
my-app/
├── app/                     # Next.js App Router (Routing & Server Actions)
├── middleware.ts            # 🏢 Global Middleware (Next.js 15)
├── proxy.ts                 # 🏢 Global Gateway (Next.js 16+)
│   ├── (auth)/              # Route Grouping: Authentication pages
│   ├── (dashboard)/         # Route Grouping: Dashboard (protected)
│   │   ├── layout.tsx       # Shared dashboard layout
│   │   └── page.tsx         # Dashboard home
│   ├── [slug]/              # 🔁 Dynamic route segment
│   │   ├── page.tsx         # Dynamic page (uses generateStaticParams)
│   │   └── loading.tsx      # Skeleton for this route
│   ├── actions/             # 🛡️ THE SECURITY LAYER (Server Actions only)
│   │   ├── auth.actions.ts
│   │   └── user.actions.ts
│   ├── api/                 # Standard Route Handlers (Webhooks, etc.)
│   ├── error.tsx            # Route-level error boundary
│   ├── global-error.tsx     # App-wide error boundary
│   ├── not-found.tsx        # 404 page
│   ├── loading.tsx          # Global loading skeleton
│   ├── layout.tsx           # Global Layout & Providers (with metadata)
│   └── page.tsx             # Entry Point (must export metadata)
├── components/              # UI Components (Atomic/Modular)
│   ├── common/              # Base UI (Button, Input, Modal)
│   ├── modules/             # Feature-wrapped components (ProfileCard, Chart)
│   └── layouts/             # Structural components (Nav, Sidebar)
├── hooks/                   # Client-side Logic (UI State & React Query)
│   ├── query-hooks/         # TanStack Query (calling Server Actions)
│   └── ui-hooks/            # Pure UI lifecycle hooks
├── lib/                     # Core Business & Infrastructure
│   ├── dal.ts               # 🔐 Data Access Layer (verifySession, React.cache)
│   ├── axios-server.ts      # 🔒 Server-only Axios instance
│   ├── auth-guards.ts       # requireAuth() & session logic
│   ├── session.ts           # iron-session / jose session encrypt/decrypt
│   ├── rate-limiter.ts      # Generic Rate limiting implementation
│   └── schemas/             # Shared Yup/Zod definitions
├── constants/               # Config, Enums, and Hardcoded Strings
├── types/                   # Centralized TS definitions (No inline types)
├── utils/                   # Pure helper functions
├── public/                  # Static assets
└── ... (next.config.ts, jest.config.ts, .env.local)
```

---

## 🔍 Detailed Folder Descriptions

### `middleware.ts` / `proxy.ts`
The global request gateway. In Next.js 15, this is named `middleware.ts`. In Next.js 16+, it is renamed to `proxy.ts`. Both serve the same purpose: intercepting incoming requests for Edge-side logic like authentication checks, rewrites, and secure header injection.

### `app/actions/`
Contains the Next.js **Server Actions**. This is where you perform all data fetching, mutations, and authentication checks. Every Server Action must be treated as a public entry point and pass through the standardized guard layer.

### `app/api/`
Used strictly for **Route Handlers** (formerly API routes) that require specialized interaction (e.g., Stripe webhooks, external webhooks, or serving file streams). Do not use this for internal frontend-to-backend communication.

### `app/(route-groups)`
Use parentheses to organize routes by feature or layout without affecting the URL structure. This allows for clear separation of concerns (e.g., `(auth)`, `(dashboard)`).

### `components/modules/`
Advanced components that are specific to a feature or view. For example, a `UserList` module that uses hooks to fetch its own data.

### `lib/axios-server.ts`
The server-side API instance. It **MUST** include `import "server-only"` at the top to prevent it from ever being bundled with client code. This intherstance injects secure tokens into headers automatically.

### `lib/schemas/`
Yup or Zod schemas shared between the client (Formik) and server (Server Action validation). This ensures data integrity across the wire.

### `hooks/query-hooks/`
React Query hooks that use `mutationFn` or `queryFn` to invoke **Server Actions**. This allows for optimistic updates, caching, and state synchronization without exposing backend endpoints to the browser's Network tab.

### `types/`
Final destination for all TypeScript interfaces and types. Components should import from here to avoid circular dependencies.

---

## 🤖 Interaction Protocol
AI agents MUST follow these file boundaries.
- **NEVER** import `lib/axios-server.ts` into a file with `"use client"`.
- **NEVER** expose backend environment variables with `NEXT_PUBLIC_`.
- **NEVER** call an external API from a Client Component (always go through a Server Action).
