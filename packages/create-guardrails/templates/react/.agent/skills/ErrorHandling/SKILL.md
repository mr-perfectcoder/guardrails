---
name: errorhandling
description: Guidelines and best practices for Error Handling & Resilience in react.
---

# Error Handling & Resilience

We utilize a multi-layered error handling strategy to ensure the application remains stable and the user is always informed.

---

## 🏗️ Layered Error Handling

### 1. Global Error Boundaries
Wrap main sections of the application (e.g., specific routes or features) in **React Error Boundaries**.
- **Location:** `src/providers/ErrorBoundary.tsx`.
- **Action:** If a component crashes during render, the boundary displays a "Fallback UI" (e.g., "Something went wrong") instead of a white screen.

### 2. API Error Mapping
Handle network and server errors centrally within the service layer and custom hooks.
- **Retry Logic:** TanStack Query handles automatic retries for failed requests by default.
- **Global Triage:** Use an Axios interceptor in `src/lib/axios.ts` to catch common status codes (401, 403, 500) and redirect users or trigger logouts.

### 3. User Notifications (Toasts)
For non-breaking errors (e.g., incorrect form submission), use a standardized Toast notification service.

### 4. Custom Error Pages
The project must include premium, branded error pages to handle major route or server failures.
- **404 (Not Found):** Displayed when a user navigates to a non-existent route.
- **500 / 503 (Server Error):** Displayed when the API is down or the application crashes beyond recovery.
- **Location:** These components should reside in `src/pages/error/` (e.g., `NotFoundPage.tsx`, `ServerErrorPage.tsx`).
- **Design:** Error pages must include a clear "Return Home" action and maintain the application's overall "Visual Excellence" (e.g., custom illustrations or helpful troubleshooting tips).


---

## 🛠️ Implementation Examples

### API Hook Error Handling
```typescript
// src/hooks/api/useLogin.ts
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginService,
    onError: (error: any) => {
      // 1. Log to internal service
      // 2. Show user-friendly toast
      toast.error(error.message || AUTH_ERRORS.DEFAULT);
    },
  });
};
```

---

## 🚫 Preventative Measures

- **Type Safety:** Use TypeScript to catch potential "undefined" errors at compile time.
- **Env Validation:** Use the startup validation check (in `src/config/env.ts`) to prevent the app from running if critical configuration is missing.
- **Null Checks:** Always use optional chaining (`?.`) and nullish coalescing (`??`) when dealing with API data or potentially missing props.
