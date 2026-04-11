# Performance & Optimization (Next.js 15 & 16)

This project prioritizes blazing-fast initial load times and smooth page transitions using Next.js core optimizations.

## 🏢 Server-First Loading (RSC)
- **RSC vs Client Components**: Maximize Server Component use to keep the initial client-side JavaScript bundle as small as possible.
- **Async Data Fetching**: Fetch data in parallel using `Promise.all` in Server Actions or RSCs where appropriate.

## 🖼️ Mandatory Image Optimization (`next/image`)
- **Required**: ALL images MUST use the `next/image` component. Direct use of the native `<img>` tag is strictly forbidden as it bypasses critical lazy-loading and format optimizations.
- **Priority**: Set `priority={true}` only for above-the-fold images (e.g., Hero images) to eliminate LCP (Largest Contentful Paint) delays.
- **Remote images**: All remote domain images MUST be specified in `next.config.ts` to allow automatic optimization.

## 🔄 Caching (See [CachingStrategy.md](CachingStrategy.md))
- **v15+ Breaking Change**: `fetch()` is **NOT cached by default**. Always use `use cache` directive or explicit `next: { revalidate }`.
- **`use cache`**: Preferred new model. Apply at function or component scope.
- **`revalidateTag` / `revalidatePath`**: Use after mutations to clear stale cache.

## 🅰️ Font Optimization (`next/font`)
- **Required**: NEVER use a Google Fonts `<link>` CDN tag. Use `next/font/google` to self-host fonts with zero layout shift and zero network request to Google.
- **Zero FOUT**: `next/font` prevents Flash Of Unstyled Text by preloading fonts.
- **Tailwind Integration**: Pipe the font into Tailwind via a CSS variable.

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

```js
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
    },
  },
}
```

## ⚡ Partial Prerendering (PPR)
- **Concept**: Next.js 15 & 16 support rendering static page shells within the same page that has dynamic content.
- **Suspense**: Wrap dynamic components in `<Suspense>` to allow the static shell to render instantly while data loads.

## 📦 Dynamic Imports
- **usage**: Use `dynamic()` for heavy client components (like charts, editors) that are not needed in the initial viewport.
- **ssr: false**: Disable SSR if the component requires browser-specific APIs (window, document) to avoid hydration errors.

## 🤖 Interaction Protocol
Agents MUST flag any bare `<img>` tags, Google Fonts CDN links, or uncached `fetch()` calls. If a mutation action is written, it MUST call `revalidateTag()` or `revalidatePath()`. If a heavy client component is added, it MUST be dynamically imported.
