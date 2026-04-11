# Hooks & Modern React 19 (Next.js 15 & 16)

This project utilizes modern React 19 and Next.js 15 & 16 hooks for high-performance UI and state synchronization.

## 🏢 React 19 Native Hooks
- **use()**: For consuming asynchronous resources (like promises or contexts) directly within Server components or Client Components.
- **useActionState**: For managing form status and Server Action transitions in Client Components.
- **useFormStatus**: For accessing the current form's submission state from a child component.
- **useOptimistic**: Implement optimistic updates (e.g., likes, comments, deletion) to provide an "Instant UI" for mutations.

## 🧱 Custom Query Hooks (TanStack Query)
- **Standard**: All client-side state synchronization with the backend goes through custom React Query hooks.
- **Location**: `hooks/query-hooks/[feature].query.ts`.
- **Functionality**: These hooks MUST call **Server Actions** using `mutationFn` or `queryFn`.
- **Config**: Set `refetchOnWindowFocus: false` and a sensible `staleTime` (e.g., 5 minutes) to avoid redundant backend traffic.

## 🧱 Pure UI Hooks
- **Location**: `hooks/ui-hooks/`.
- **Purpose**: Stateless or local-only UI logic (e.g., `useDebounce`, `useLocalStorage`, `useClickOutside`).
- **Purity**: UI hooks must be side-effect-free or provide a clear cleanup function in `useEffect`.

## 🤖 Interaction Protocol
AI agents MUST prefer React 19 native hooks over third-party alternatives where possible. If an agent adds an `axios` or `fetch` call inside `useEffect`, it must be flagged as an architectural violation. Refer to [SecurityAndAPI.md](SecurityAndAPI.md) for the correct data flow.
