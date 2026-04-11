# Error Handling & Next.js 15+

This project utilizes Next.js native error boundaries and standardized ApiResponse<T> to manage application failures gracefully.

## 🏢 Route-Level Errors (`error.tsx`)
- **Isolation**: Each feature route should have an `error.tsx` file (Client Component) to intercept and display runtime errors for that specific route and its children.
- **Rules**:
  - Use `reset()` from Next.js properties to retry the failed action or data fetch.
  - Log errors to a server-side monitoring service (like Sentry or an internal logger).
  - Show a user-friendly error message that matches the project's premium design aesthetics.

## 🧱 Global Application Error (`global-error.tsx`)
- **Usage**: Define a `global-error.tsx` at the root of the `app/` directory (inside `src/app/` if using `src`) to catch errors that occur outside the layout (like in the root layout components).
- **Branding**: This file MUST match the core brand's styling and provide a "Home Navigation" button.

## 🧱 Not Found (`not-found.tsx`)
- **usage**: Customize the native `not-found.tsx` to handle 404 errors for any missing route. Use it programmatically with `notFound()` in Server Components or Actions.

## 🚀 Server Action Error Strategy
- **ApiResponse<T>**: Every Server Action returns a consistent `ApiResponse<T>` with `status`, `data`, and optional `error` or `errors` fields.
- **Fail-fast Validation**: Catch Yup validation errors and return `status: 400` with descriptive error messages for the client.
- **Auth & Rate Limit Errors**: Return `status: 401` and `status: 429` as standardized, catchable errors.

## 🤖 Interaction Protocol
Agents MUST propose an `error.tsx` for every new route group. If an agent adds a Server Action, it must have a `try/catch` block that returns a properly typed `ApiResponse<T>`. Swallowing errors with empty catch blocks is a critical security and engineering failure.
