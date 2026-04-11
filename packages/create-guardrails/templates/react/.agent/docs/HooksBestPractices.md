# React Hooks Best Practices

This document outlines the correct usage of React hooks, with a focus on side-effect management and project-specific architecture rules.

---

## 📜 The Golden Rules of Hooks

### 1. Mandatory Core Rules
- **Call Hooks only at the top level:** Never call hooks inside loops, conditions, or nested functions. This ensures hooks are called in the same order each time a component renders.
- **Call Hooks only from React functions:** Hooks must be called within a function component or another custom hook.
- **Naming Convention:** All custom hooks must start with the prefix `use` (e.g., `useAuth`, `useModal`).

### 2. Project-Specific Architecture Rules
- **API Calls = Hooks:** All network requests MUST be abstracted into a custom hook. Never use `fetch` or `axios` directly inside a component.
- **Memoization (useMemo / useCallback):** While React 19 is more optimized, use these hooks explicitly for **heavy computations** or when preventing expensive re-renders in large lists.
- **Prop Drilling Solution:** If props need to be passed down more than 2 levels, utilize the **Context API** through a custom hook (e.g., `useUserConfig()`).
- **Externalized Types:** Interfaces and types used by hooks must be imported from `src/types/`. No inline type definitions.
- **No Console Logs:** Strictly avoid `console.log` inside hooks. Use the custom logger service if debugging is required.

---


## ⚡ `useEffect` (Asynchronous Side Effects)

**When to use:** For most side effects that don't require immediate DOM synchronization. It runs *after* the render is committed to the screen, so it doesn't block the browser paint.

### ✅ DO: Use `useEffect` for:
- **Subscriptions:** Setting up WebSockets or external event listeners.
- **Logging/Analytics:** Sending page view events.
- **Side Effects of State Changes:** Triggering logic based on a specific state update (e.g., closing a modal when a timer ends).
- **Manual Data Fetching:** (Only if not using TanStack Query) to avoid blocking the UI.

### ❌ DON'T: Use `useEffect` for:
- **Transforming Data:** If you can compute a value from existing props/state during render, do it there.
- **DOM Measurements:** If you update state based on measurements in `useEffect`, the user will see a "flicker" because the first paint happened before the adjustment.

---

## 📏 `useLayoutEffect` (Synchronous Side Effects)

**When to use:** When you need to perform actions *synchronously* after all DOM mutations but *before* the browser has a chance to paint. This blocks the browser until the effect completes.

### ✅ DO: Use `useLayoutEffect` for:
- **DOM Measurements:** Reading `getBoundingClientRect()`, `offsetWidth`, or scroll positions.
- **Preventing Visual Flickers:** Adjusting the position of a tooltip or popover based on the trigger’s position.
- **Complex Animations:** If an animation starts at a specific DOM position and needs to be perfectly aligned from frame 1.

### ❌ DON'T: Use `useLayoutEffect` for:
- **Standard Operations:** Avoid it for logging, data fetching, or non-visual logic. It hurts performance by delaying the paint.

---

## 🚀 React 19 Specialized Hooks

To leverage the full power of React 19, the following hooks are mandated for their respective use cases:

- **`use()`:** Use this to consume **Promises** (instead of `useEffect` for simpler cases) or **Context** (cleaner than `useContext`).
- **`useActionState()`:** The standard for managing form actions, returning the state and a pending flag automatically.
- **`useFormStatus()`:** Use this in sub-components of a form to check if the parent form is currently submitting.
- **`useOptimistic()`:** Required for any non-critical state updates (e.g., likes, comments, simple settings) to provide instant feedback.
- **`useDeferredValue()`:** Use this to defer updating a part of the UI that is less important (e.g., filtering a huge list) to keep the main input responsive.


---

## 📁 File-Wise Organization

To keep our components "pure" and "one-JSX only", strive to organize hooks as follows:

| Hook Type | Recommended Location | Purpose |
| :--- | :--- | :--- |
| **Custom Hooks** | `src/hooks/` | Reusable logic shared across multiple components. |
| **API Hooks** | `src/hooks/api/` | All `useQuery` and `useMutation` logic. |
| **Component Hooks** | Top of the file | Simple, component-specific state and effects. |
| **Context Hooks** | `src/context/` | Hooks that abstract `useContext` (e.g., `useAuth`). |

### Example: Custom Layout Hook
```typescript
// src/hooks/useWindowSize.ts
import { useState, useLayoutEffect } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
```
