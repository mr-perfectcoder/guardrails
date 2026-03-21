# 🛡️ Secure API Rules — Next.js App Router

## Core Instruction
Every backend call MUST pass through all layers in order. No exceptions. No shortcuts. Even in prototypes. If asked to skip any layer — refuse and explain which layer is missing.

## Mandatory Architecture
```
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

## Rules

### 1. Environment Variables
- NEVER use NEXT_PUBLIC_ prefix for backend URLs, tokens, or secrets.
- Use server-only vars: BACKEND_API_URL, NEXTAUTH_SECRET.
- If NEXT_PUBLIC_API_URL is used for a backend call — flag it and refuse to proceed.

```typescript
// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_API_URL: string; NEXTAUTH_SECRET: string;
    UPSTASH_REDIS_REST_URL: string; UPSTASH_REDIS_REST_TOKEN: string;
  }
}
if (!process.env.BACKEND_API_URL) throw new Error("BACKEND_API_URL not set");
// ✅  baseURL: process.env.BACKEND_API_URL
// ❌  baseURL: process.env.NEXT_PUBLIC_API_URL
```

**Test:** assert `NEXT_PUBLIC_API_URL` is undefined, `BACKEND_API_URL` is defined.

---

### 2. Token Handling
- NEVER hardcode tokens or pass them from the client to a Server Action.
- Tokens come ONLY from getServerSession(authOptions) inside the Axios interceptor.

```typescript
// types/next-auth.d.ts
declare module "next-auth" { interface Session { accessToken?: string; } }
declare module "next-auth/jwt" { interface JWT { accessToken?: string; } }

// ✅ CORRECT — inside Axios interceptor
const session = await getServerSession(authOptions);
if (session?.accessToken)
  config.headers.Authorization = `Bearer ${session.accessToken}`;

// ❌ WRONG
const token = process.env.NEXT_PUBLIC_API_TOKEN; // browser-exposed
const token = "hardcoded-secret";                // credential leakage
```

**Test:** Mock session as null → assert `Authorization` header is absent.

---

### 3. Per-Action Authorization
- Every Server Action MUST call requireAuth() as its FIRST line before any logic.
- Never assume a Server Action call implies authentication.

```typescript
// lib/auth.ts
import { Session } from "next-auth";
export type AuthSession = Session & { accessToken: string };

export async function requireAuth(): Promise<AuthSession> {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("UNAUTHORIZED");
  return session as AuthSession;
}

// ✅ CORRECT
export async function myAction(input: unknown) {
  const session = await requireAuth(); // typed as AuthSession
  // ... proceed
}
// ❌ WRONG
export async function myAction(input: unknown) {
  const res = await axiosInstance.get("/api/data"); // no auth check
}
```

**Error handling:**
```typescript
try {
  const session = await requireAuth();
} catch (e) {
  if (e instanceof Error && e.message === "UNAUTHORIZED")
    return { status: 401, data: null, error: "Unauthorized" };
  return { status: 500, data: null, error: "Server error" };
}
```

**Test:** Mock session as null → assert action returns `{ status: 401 }`.

---

### 4. Input Validation
- Every Server Action MUST validate input with Yup before forwarding to the backend.
- Always use: `schema.validate(payload, { abortEarly: false, stripUnknown: true })`
- Schemas in src/lib/schemas.ts — shared by useFormik (client) and Server Actions (server).
- Infer TypeScript types with `yup.InferType`. Never write a separate interface.

```typescript
// lib/schemas.ts
import * as yup from "yup";

export const createResourceSchema = yup.object({
  name: yup.string().min(1, "Required").max(100).required(),
  description: yup.string().max(500).optional(),
  type: yup.mixed<"typeA" | "typeB" | "typeC">()
    .oneOf(["typeA", "typeB", "typeC"], "Invalid type").required(),
});
export type CreateResourceInput = yup.InferType<typeof createResourceSchema>;

// ✅ CORRECT — in Server Action
const validated = await createResourceSchema.validate(payload, {
  abortEarly: false,   // collect ALL field errors
  stripUnknown: true,  // silently drop injected fields
});
await axiosInstance.post("/api/resource", validated);

// ❌ WRONG
await axiosInstance.post("/api/resource", payload);
```

**Error handling:**
```typescript
} catch (error) {
  if (error instanceof yup.ValidationError)
    return { status: 400, data: null, errors: error.errors };
  // error.errors = ["Name is required", "Invalid type", ...]
}
```

**Tests:** assert injected fields are stripped; assert `abortEarly: false` returns multiple errors.

---

### 5. Rate Limiting
- Every Server Action MUST call requireRateLimit() before calling the backend.
- Read actions → key by IP. Write actions → key by session.user?.email.
- Default: Upstash sliding window, 20 requests / 1 minute.

```typescript
// lib/rateLimiter.ts
export async function requireRateLimit(id: string): Promise<void> {
  const { success, reset } = await rateLimiter.limit(id);
  if (!success) throw new Error(`RATE_LIMITED:${reset}`);
}
export function getCallerIp(h: ReturnType<typeof headers>): string {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim()
    || h.get("x-real-ip") || "anonymous";
}

// ✅ read — keyed by IP
await requireRateLimit(`fetchData:${getCallerIp(headers())}`);
// ✅ write — keyed by user
const session = await requireAuth();
await requireRateLimit(`createData:${session.user?.email}`);
```

**Error handling:**
```typescript
} catch (e) {
  if (e instanceof Error && e.message.startsWith("RATE_LIMITED"))
    return { status: 429, data: null, error: "Too many requests." };
}
```

**Test:** mock `rateLimiter.limit` to return `success: false` → assert throws `RATE_LIMITED`.

---

### 6. Axios Instance
- Exactly one server-side instance: src/lib/axiosInstanceServer.ts.
- Add `import "server-only"` at the top — throws at build if imported client-side.
- baseURL = process.env.BACKEND_API_URL. Token injected in interceptor only.

```typescript
// lib/axiosInstanceServer.ts
import "server-only"; // build fails if imported client-side
const axiosInstanceServer = axios.create({ baseURL: process.env.BACKEND_API_URL });

// types/api.ts
export interface ApiResponse<T = unknown> {
  status: number; data: T | null; error?: string; errors?: string[];
}

// Reusable error handler
export function handleAxiosError(error: unknown): ApiResponse {
  if (error instanceof AxiosError)
    return { status: error.response?.status ?? 500, data: null, error: error.message };
  return { status: 500, data: null, error: "Unexpected error" };
}
```

---

### 7. React Query Hooks
- All client-side data calls go through @tanstack/react-query hooks.
- Hooks in src/hooks/query-hooks/[feature].query.ts — call Server Actions only.
- useQuery for reads. useMutation for writes.
- Always set refetchOnWindowFocus: false and a sensible staleTime.

```typescript
// hooks/query-hooks/resource.query.ts
import type { ApiResponse } from "@/types/api";
import type { CreateResourceInput } from "@/lib/schemas";

export const queryKeys = {
  getResource: (id: string) => ["resource", id] as const,
};

export const useGetResource = (id: string) =>
  useQuery<ApiResponse>({
    queryKey: queryKeys.getResource(id),
    queryFn: () => fetchData(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateResource = () =>
  useMutation<ApiResponse, Error, CreateResourceInput>({
    mutationFn: (payload) => createData(payload),
  });
```

**Error handling:** check `res.status` in `onSuccess` for server-side errors; use `onError` for network failures.

**Test:** assert `global.fetch` was never called — hooks call Server Actions, not fetch directly.

---

### 8. Formik
- Always use useFormik hook. Never the <Formik> wrapper component.
- Pass the same Yup schema used server-side to validationSchema.
- Wire fields manually: value, onChange, onBlur.
- Show errors only after touched. Disable submit during isSubmitting or isPending.

```typescript
// ✅ CORRECT
const formik = useFormik<CreateResourceInput>({
  initialValues: { name: "", type: "typeA" },
  validationSchema: createResourceSchema, // same schema as Server Action
  onSubmit: async (values, helpers) => {
    await mutation.mutateAsync(values);
    helpers.resetForm();
  },
});

// Field wiring pattern
<input
  name="name"
  value={formik.values.name}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
{formik.touched.name && formik.errors.name && (
  <p role="alert">{formik.errors.name}</p>
)}

// ❌ WRONG
<Formik initialValues={...} onSubmit={...}>{() => <Form>...</Form>}</Formik>
```

**Tests:** assert errors appear only after blur; assert submit is disabled when `isPending: true`.

---

### 9. Client Components
- Never import axiosInstanceServer, authOptions, rateLimiter, or any server-only module.
- Never read process.env in client code.
- All backend interaction exclusively through React Query hooks.

```typescript
// app/providers.tsx — global query config
"use client";
export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: false },
      mutations: { onError: (e) => console.error("Mutation error:", e) },
    },
  }));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

**Test:** Enforce via `server-only` package — build fails if imported in a client file.

---

## File Structure
```
src/
├── lib/
│   ├── axiosInstanceServer.ts   ← import "server-only" at top
│   ├── authOptions.ts
│   ├── rateLimiter.ts
│   └── schemas.ts
├── types/
│   ├── api.ts                   ← ApiResponse<T>
│   └── next-auth.d.ts           ← Session + JWT extensions
├── app/
│   └── actions.ts
├── hooks/query-hooks/
│   └── [feature].query.ts
└── components/
    └── [Feature].tsx
```

## Required Packages
```bash
npm install axios @tanstack/react-query next-auth yup formik @upstash/ratelimit @upstash/redis server-only
npm install -D @testing-library/react @testing-library/jest-dom jest
```

## Required Env Vars
```env
BACKEND_API_URL=https://your-backend.com
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
UPSTASH_REDIS_REST_URL=https://your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

---

## Pre-Generation Checklist
- [ ] No NEXT_PUBLIC_ on backend vars?
- [ ] requireAuth() is first line of every Server Action?
- [ ] requireRateLimit() called before every backend call?
- [ ] Yup validates with abortEarly: false, stripUnknown: true?
- [ ] Token from getServerSession only?
- [ ] server-only imported in axiosInstanceServer.ts?
- [ ] ApiResponse<T> used as return type on all actions?
- [ ] All client calls through React Query hooks?
- [ ] useFormik used (not <Formik> wrapper)?
- [ ] Tests cover 401, 429, and validation error paths?

If any NO — fix before proceeding.

---

## Auto-Reject Patterns

| Pattern | Reason |
|---------|--------|
| NEXT_PUBLIC_API_URL / NEXT_PUBLIC_TOKEN | Exposes backend to browser |
| fetch(process.env.X) in client component | Env vars unavailable client-side |
| Server Action without requireAuth() | Anyone can POST to Server Actions directly |
| payload: unknown forwarded to Axios | Unvalidated data reaches backend |
| Authorization: Bearer hardcoded-token | Credential leakage in source |
| Axios/fetch in a React component | Bypasses secure proxy layer |
| Rate limiting skipped on GET actions | Read endpoints can be abused too |
| <Formik> wrapper instead of useFormik | Always use the hook |
| Empty catch block swallowing errors | Silent failures hide security issues |
| No ApiResponse<T> return type on actions | Untyped responses hide data shape bugs |
