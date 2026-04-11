# Skeleton Screens & Loading Strategy

To achieve "Premium Aesthetics" and "Visual Excellence," we prioritize smooth transitions over abrupt loading states.

---

## 💀 Skeleton Screens (Preferred)

Rather than using generic spinners, we utilize **Skeleton Screens** that mirror the structure of the content being loaded. This minimizes **Cumulative Layout Shift (CLS)** and makes the application feel faster.

### ✅ DO: Implement Skeletons for:
- Dashboard cards and statistics.
- Table rows and list items.
- Profile headers and text blocks.
- **Rule:** The skeleton must match the height and width of the final rendered component exactly.

### ✅ DO: Use `Suspense`
Leverage React 19’s `Suspense` boundaries to wrap components that are fetching data or being lazy-loaded.
```tsx
<Suspense fallback={<StatsCardSkeleton />}>
  <StatsCard />
</Suspense>
```

---

## 🌀 Generic Loaders (Worst Case)

Generic spinners or progress bars should only be used when:
1.  The content structure is unpredictable (e.g., a dynamic file upload list).
2.  Action-based waiting (e.g., a "Processing" state on a button).

### Rules for generic loaders:
- **Center Alignment:** Always center the loader within its container.
- **Micro-Animations:** Use smooth, high-quality SVG animations for the loader.

---

## 🏗️ Folder Location

- **Skeleton Components:** Store adjacent to the real component or in `src/components/common/skeletons/`.
- **Example:** `src/components/dashboard/StatsCard.tsx` and `src/components/dashboard/StatsCardSkeleton.tsx`.
