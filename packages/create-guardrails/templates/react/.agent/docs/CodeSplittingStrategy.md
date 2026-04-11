# Code Splitting & Performance Strategy

To ensure a "Visual Excellence" experience with near-instant page loads, we utilize advanced code-splitting techniques.

---

## ⚡ Level 1: Page-Based Splitting

Every major route in the application must be lazily loaded.
- **Why?** It prevents the main bundle from becoming bloated and ensures users only download code for the page they are currently visiting.
- **Pattern:**
```tsx
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
```

---

## 🏗️ Level 2: Component-Based Splitting

Heavy UI components that aren't immediately visible (e.g., Modals, Charts, complex Editors) should be split.
- **Strategy:** Use dynamic `import()` within the component file or wrap the component in a dedicated `lazy()` wrapper.
- **Example:** A heavy "Analytics Chart" should only load when the user scrolls to it or clicks a "View Metrics" button.

---

## 🎬 Level 3: Smooth Transitions (`Suspense`)

Never show a blank screen during code splitting. Always wrap lazy-loaded components in a `<Suspense>` boundary with a high-fidelity **Skeleton fallback**.

```tsx
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

---

## 🔍 Vite Configuration

As per the project draft, we enable `autoCodeSplitting` in `vite.config.ts`. Additionally:

- **Manual Chunks:** For very large libraries (e.g., `lodash`, `chart.js`), we define manual chunks to ensure they are cached independently across builds.
- **Preload Directives:** Use `<link rel="preload">` for critical fonts and assets to ensure they are ready before the CSS/JS is parsed.
