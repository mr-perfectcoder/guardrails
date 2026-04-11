# Skeleton & Loading UI (Next.js 15 & 16)

This project prioritizes "Instant Feedback" by using Next.js native `loading.tsx` and custom React `Suspense` skeletons.

## 🏢 Global Skeletons (`loading.tsx`)
- **Usage**: Each route group or main feature folder should specify a `loading.tsx` file to provide a consistent "Page Transition" look and feel.
- **Visual Style**: Skeletons must use a grey `animate-pulse` or premium animated shimmer (from `TailwindStyleGuide.md`).

## 🧱 Granular Skeletons (`Suspense`)
- **Isolation**: Wrap individual data-heavy components in `<Suspense fallback={<MySkeleton />}>`.
- **UI Interaction**: This allows the static shell of the page to hydrate while each component loads its data independently.
- **Transitions**: Use `useTransition` for state mutations to keep the current UI active and interactive during the update.

## 📏 Skeleton Rules
1.  **Dimensions**: Skeletons must closely match the layout of the final loaded state (to prevent cumulative layout shifts).
2.  **Naming**: Filename must be `[Name]Skeleton.tsx` for component-level skeletons.
3.  **No Spinner Overkill**: Prefer grey boxes/shimmer blocks over generic spinning loaders for internal content. Spinners should be reserved for global, app-wide full-page initial load.

## 🤖 Interaction Protocol
AI agents MUST propose a skeleton or a `loading.tsx` whenever adding a new data-fetching route or component. If a component is "heavy," it must be wrapped in `Suspense`. If an agent suggests a blank page during load, it is a UX audit failure.
