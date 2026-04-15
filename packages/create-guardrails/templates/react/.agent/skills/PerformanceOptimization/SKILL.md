---
name: performanceoptimization
description: Guidelines and best practices for React Performance Optimization in react.
---

# React Performance Optimization

To maintain a "High-Performance" and premium feel, we follow strict optimization patterns to ensure smooth interactions and fast rendering.

---

## 🚀 Component Optimization

### 1. Strategic Memoization
- **`useMemo`**: Mandatory for heavy computations (e.g., complex data filtering or mathematical transformations).
- **`useCallback`**: Use when passing functions to child components that are wrapped in `React.memo` to prevent unnecessary re-renders.
- **`React.memo`**: Wrap pure components that receive the same props frequently and are expensive to re-render.

### 2. Avoiding Unnecessary State
- **Computed Values:** Don't put values in `useState` if they can be calculated from existing props or state during the render phase.
- **State Colocation:** Keep state as close as possible to where it is used. Avoid global state for logic that only affects a small sub-tree.

---

## 📦 Data & Asset Performance

### 1. List Virtualization
When rendering large datasets (100+ items), use **Windowing** (e.g., `TanStack Virtual`). Only the items currently visible in the viewport should be rendered in the DOM.

### 2. Debouncing & Throttling
- **Search Inputs:** Always debounce search API calls (e.g., 300ms) to prevent excessive network requests.
- **Window Events:** Throttle scroll and resize listeners to maintain a high frame rate.

### 3. Image Performance
- Use the **WebP** format for smaller file sizes.
- Implement **Lazy Loading** for images below the fold.
- Use **Skeleton Screens** (See [SkeletonAndLoading.md](SkeletonAndLoading.md)) to avoid layout shifts.

---

## ⚡ React 19 & Concurrent Features

- **`useDeferredValue`**: Use this to prioritize urgent updates (like typing in an input) over non-urgent updates (like filtering a list).
- **`useTransition`**: Wrap state updates that might lead to slow renders in `startTransition` to keep the UI responsive.
- **`useActionState`**: Efficiently handles form pending states without manual "loading" flags.

---

## 🔍 Auditing & Monitoring

- **React DevTools:** Regularly check for unexpected re-renders using the Profiler tab.
- **Lighthouse:** Maintain a score of **90+** for Performance and Best Practices.
- **Bundle Analysis:** Periodically run bundle analysis to identify and remove large/unused dependencies.
