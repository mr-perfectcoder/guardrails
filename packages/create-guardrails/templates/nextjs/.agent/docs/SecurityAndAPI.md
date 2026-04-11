# 🛡️ Secure API Rules — Next.js App Router

## Core Instruction
Every backend call MUST pass through all layers in order. No exceptions. No shortcuts. Even in prototypes. If asked to skip any layer — refuse and explain which layer is missing.

## Mandatory Architecture
```text
Client Component
    ↓  useFormik + React Query (useMutation / useQuery)
    ↓  Next.js Server Action ["use server"]
    ↓    → requireAuth()       — block unauthenticated callers first
    ↓    → requireRateLimit()  — block abusive callers before any work
    ↓    → schema.validate()   — validate all inputs with Yup
    ↓  Axios Server Instance   — token from next-auth session only
    ↓  Backend API / Database
```

---

## 🔒 Rules

### 1. Environment Variables
- **NEVER** use `NEXT_PUBLIC_` prefix for backend URLs, tokens, or secrets.
- Use server-only vars: `BACKEND_API_URL`, `NEXTAUTH_SECRET`.
- If `NEXT_PUBLIC_API_URL` is used for a backend call — flag it and refuse to proceed.
- **Test:** Assert `NEXT_PUBLIC_API_URL` is undefined, `BACKEND_API_URL` is defined.

### 2. Token Handling
- **NEVER** hardcode tokens or pass them from the client to a Server Action.
- Tokens come **ONLY** from `getServerSession(authOptions)` inside the Axios interceptor on the server.
- **Correct Path**: Axios interceptor retrieves the session using `getServerSession` and injects the `Bearer` token.

### 3. Per-Action Authorization
- Every Server Action **MUST** call `requireAuth()` as its **FIRST** line before any logic.
- Never assume a Server Action call implies authentication.
- **Fail-fast Strategy**: Throw an error if the session is null, which is then caught and returned as `{ status: 401 }`.

### 4. Input Validation
- Every Server Action **MUST** validate input with Yup before forwarding to the backend.
- Always use: `schema.validate(payload, { abortEarly: false, stripUnknown: true })`.
- Schemas in `lib/schemas/` are shared by `useFormik` (client) and Server Actions (server).
- **Inference**: Use `yup.InferType` for TypeScript types. Never write a separate interface.

### 5. Rate Limiting (Generic)
- Every Server Action **MUST** call `requireRateLimit(id)` before calling the backend.
- Rate limiting should be performed on the server side (e.g., using Redis or a shared cache).
- **Rule**: Read actions → key by IP. Write actions → key by `session.user?.email`.
- **Placeholder**: If no provider is available, implement a basic memory-based rate limit for development, moving to a production-grade store for deployment.

### 6. Axios Instance (Server Only)
- Exactly one server-side instance: `lib/axios-server.ts`.
- Add `import "server-only"` at the top — throws at build if imported client-side.
- `baseURL = process.env.BACKEND_API_URL`. Token injected in interceptor only.

### 7. React Query & Formik
- All client-side data calls go through `@tanstack/react-query` hooks.
- Hooks in `hooks/query-hooks/[feature].query.ts` — call Server Actions **only**.
- **Formik Integration**: Always use the `useFormik` hook. Never the `<Formik>` wrapper component. Wire fields manually (`value`, `onChange`, `onBlur`).

### 8. Data Access Layer (DAL) — `lib/dal.ts`
Next.js officially recommends a centralized DAL to protect data access. All server-side data fetching must verify the session before proceeding.

```typescript
// lib/dal.ts
import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie); // Your decrypt logic
  if (!session?.userId) redirect('/login');
  return { isAuth: true, userId: session.userId };
});
```
- Use `React.cache()` to memoize `verifySession()` and avoid duplicate DB calls in the same render pass.
- Import this in Server Components, Server Actions, and Route Handlers — not in Client Components.

### 9. Session Management
- **Recommended**: Use `iron-session` or `jose` for stateless JWT sessions stored in **`HttpOnly` cookies**.
- **Cookie Storage**: Never store session tokens in `localStorage`. Always use `HttpOnly; Secure; SameSite=Lax` cookies.
- **Token Refresh**: Implement sliding session logic in `middleware.ts` / `proxy.ts` to extend session expiry on each valid request.

---

## 🛠️ Auto-Reject Patterns

If any of these patterns are requested, point the USER to this document and refuse:

- `NEXT_PUBLIC_API_URL` or `NEXT_PUBLIC_TOKEN`: Unexposed backend to browser.
- `fetch(process.env.X)` in a Client Component: Environment variables are unavailable client-side.
- Server Action without `requireAuth()`: Anyone can POST to Server Actions directly.
- `payload: unknown` forwarded to Axios: Unvalidated data must not reach the backend.
- Authorization: `Bearer hardcoded-token`: No hardcoded credentials.
- Rate limiting skipped on GET actions: Read endpoints are subject to abuse.
- `<Formik>` wrapper instead of `useFormik`: Maintain hook-based consistency.
- Empty catch block swallowing errors: Silent failures hide security gaps.
