# Best Practices: Dos and Don'ts

This guide provides concrete examples of the coding standards expected in this project. Following these ensures a premium, maintainable codebase.

---

## 🔗 Navigation & Routing

### ✅ DO: Use `<Link>` from React Router for internal navigation
Native `<a>` tags cause a full page reload in a SPA, destroying all React state.
```tsx
// Good: SPA navigation — no full reload
import { Link } from 'react-router-dom';
<Link to="/dashboard">Go to Dashboard</Link>
```

### ❌ DON'T: Use native `<a>` for internal links
```tsx
// Bad: Full page reload — React state is lost
<a href="/dashboard">Go to Dashboard</a>
```

---

## 🖼️ Image Rules

### ✅ DO: Always import images through `src/assets/`
Vite processes and fingerprints imported assets. Always import via the centralized `assets/index.ts`.
```tsx
import { ASSETS } from '@/assets';
<img src={ASSETS.HERO_IMAGE} alt="Hero banner" />
```

### ❌ DON'T: Reference images via raw `/public/` paths
Images in `/public/` are never cache-busted, leading to stale assets in production.
```tsx
// Bad: No cache-busting, won't update on deploy
<img src="/hero.png" alt="Hero" />
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
