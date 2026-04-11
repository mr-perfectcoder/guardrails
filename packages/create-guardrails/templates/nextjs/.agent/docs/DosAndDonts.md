# Best Practices: Dos and Don'ts

This guide provides concrete examples of the coding standards expected in this project. Following these ensures a premium, maintainable codebase.

---

## 🏗️ Next.js Pages & RSC

### ✅ DO: Use Server-Side Pages
All `page.tsx` files MUST be React Server Components (RSC).
```tsx
// Good: Server Component Page
export default async function DashboardPage() {
  const data = await fetchData(); // Direct server-side fetch
  return <DashboardLayout data={data} />;
}
```

### ✅ DO: Abstract Interactivity
If a component needs `"use client"`, put it in the `components/` folder and import it into the page.
```tsx
// Good: page.tsx (Server)
import MyClientComponent from "@/components/MyClientComponent";

export default function Page() {
  return <MyClientComponent />; // Interactivity isolated
}
```

### ✅ DO: Use next/image
Always use the `next/image` component for all static and external images.
```tsx
// Good: Optimized and fast
import Image from 'next/image';
<Image src={ASSETS.LOGO} alt="Project Logo" width={100} height={100} />
```

### ❌ DON'T: Use <img>
Avoid the native `<img>` tag. It slows down the initial load by skipping WebP conversion and lazy-loading.
```tsx
// Bad: native img
<img src="/logo.png" alt="Logo" />
```

### ❌ DON'T: use "use client" on page.tsx
Avoid turning a whole page into a Client Component. It bloats the bundle and slows down initial rendering.

---

## 🔗 Navigation & Routing

### ✅ DO: Use the `<Link>` Component
Always use `next/link` for internal navigation to enable client-side transitions and prefetching.
```tsx
import Link from 'next/link';
<Link href="/dashboard">Go to Dashboard</Link>
```

### ❌ DON'T: Use native `<a>` for internal links
Native anchors cause a full-page reload, losing React state and ignoring the Next.js router.
```tsx
// Bad: Full page reload
<a href="/dashboard">Go to Dashboard</a>
```

---

## 🗄️ Caching (v15+ Breaking Change)

### ✅ DO: Be explicit about fetch caching
In Next.js 15+, `fetch()` is **not cached by default**. Always opt-in explicitly.
```typescript
const res = await fetch('/api/data', { next: { revalidate: 3600 } });
```

### ❌ DON'T: Assume fetch is cached
```typescript
// Bad: silently uncached in v15+, fetches fresh on every request
const res = await fetch('/api/data');
```

---

## 🏗️ Architecture & Component Design

### ✅ DO: Break down components
Keep components focused. Extract sub-components if the JSX exceeds 50-100 lines.
```tsx
// Good: Modular and clean
const UserProfile = () => (
  <Layout>
    <UserHeader />
    <UserDetails />
    <UserActions />
  </Layout>
);
```

### ❌ DON'T: Create "Mega-Components"
Avoid putting everything in one file with multiple nested JSX blocks.
```tsx
// Bad: Hard to test and maintain
const UserProfile = () => {
  return (
    <div>
       <header>...</header>
       <section>...</section>
       <footer>...</footer>
    </div>
  );
};
```

---

## 🏷️ Typing & Interfaces

### ✅ DO: Centralize Types
Put all interfaces and types in the `src/types/` folder.
```typescript
// Good: src/types/user.ts
export interface User { id: string; name: string; }
```

### ❌ DON'T: Define Types Inline
Even if it's only for one component, do not define it in the component file.
```tsx
// Bad: Hard to reuse or find
interface LocalProps { id: string }
export const MyComponent = (props: LocalProps) => { ... }
```

---

## 🔗 Data Fetching

### ✅ DO: Use Custom Hooks
Wrap every API call in a TanStack Query hook located in `src/hooks/api/`.
```tsx
// Good
const { data, isLoading } = useUserQuery();
```

### ❌ DON'T: Call Services Directly
Never call Axios or a service function inside a `useEffect` or component body.
```tsx
// Bad: Bypasses caching and synchronization
useEffect(() => {
  userService.fetch().then(setData);
}, []);
```

---

## 💬 Strings & Constants

### ✅ DO: Use the Constants Folder
Abstract all labels, error messages, and API paths.
```tsx
// Good: src/constants/auth.ts
export const AUTH_MESSAGES = { LOGIN_ERROR: "Invalid credentials" };

// In component:
<span>{AUTH_MESSAGES.LOGIN_ERROR}</span>
```

### ❌ DON'T: Hardcode Strings
Never put raw strings in your JSX.
```tsx
// Bad: Hard to localize or change
<span>Invalid credentials</span>
```

---

## 🧪 Testing

### ✅ DO: TDD (Test-Driven Development)
Write your `__tests__/[name].test.tsx` file *before* or alongside your implementation.
```text
// Step 1: Create test with failing assertion
// Step 2: Implement logic
// Step 3: Run test to confirm it's green
```

### ❌ DON'T: Skip Tests for "Simple" Logic
Every utility and component requires coverage. High coverage is non-negotiable.

---

## 🛠️ General Hygiene

### ✅ DO: Use Functional Envs
Export environment variables through a function that validates them.
```typescript
// Good: src/config/env.ts
export const getEnv = () => ({ api: import.meta.env.VITE_API });
```

### ❌ DON'T: Use `console.log`
Use the custom logger or debugger. Logs must not reach production.

### ❌ DON'T: Use Inline Styles
Use **Tailwind CSS** classes. If complex CSS is needed, use `src/styles/global.css`.
