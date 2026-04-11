# 🗄️ Caching Strategy (Next.js 15 & 16)

> ⚠️ **BREAKING CHANGE in Next.js 15**: `fetch()` requests are **NOT cached by default**. This is a critical difference from Next.js 14. Every cached fetch must be explicitly opted in.

---

## 🆕 New Model: `use cache` Directive (Next.js 15+)

The preferred modern approach is the `use cache` directive, applied at the function or component level.

```typescript
// lib/data.ts
'use cache'; // Caches this entire module's exports

export async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}
```

Or at the component level for granular control:
```tsx
// components/modules/ProductList.tsx
async function ProductList() {
  'use cache';
  const products = await getProducts();
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

---

## 🔄 Legacy Model: `fetch()` Cache Options
For compatibility or when not using `use cache`, pass explicit caching options to `fetch`.

```typescript
// Cache with time-based revalidation (every 1 hour)
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
});

// No cache (always fetch fresh)
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});
```

---

## 🏷️ On-Demand Revalidation
Invalidate a cache on a specific event (e.g., after a form submission or webhook) using tags.

```typescript
// 1. Tag the fetch
const res = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});

// 2. Revalidate on demand (in a Server Action or Route Handler)
import { revalidateTag } from 'next/cache';
export async function createPost(data) {
  await db.insert(data);
  revalidateTag('posts'); // Invalidates all fetch() calls tagged 'posts'
}
```

Or by path:
```typescript
import { revalidatePath } from 'next/cache';
revalidatePath('/blog'); // Revalidates the /blog page
```

---

## 📦 `unstable_cache` (for non-fetch functions)
For caching ORM queries, database calls, or complex computations that don't use `fetch`.

```typescript
import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';

export const getCachedUser = unstable_cache(
  async (id: string) => db.query.users.findFirst({ where: eq(users.id, id) }),
  ['user'],
  { revalidate: 3600, tags: ['user'] }
);
```

---

## 📏 Caching Rules
1.  **Default = No Cache in v15**: Never assume `fetch()` is cached. Always be explicit.
2.  **`use cache` preferred**: Use the directive over `fetch` options for cleaner code.
3.  **Tag everything**: Any cached data that can be mutated MUST have a tag for on-demand revalidation.
4.  **No stale auth data**: Auth-related data MUST use `cache: 'no-store'` to prevent session bleed.

## 🤖 Interaction Protocol
Agents MUST warn when writing a `fetch()` call without explicit cache options. If a mutation Server Action is written, it MUST call `revalidateTag()` or `revalidatePath()` to clear any related stale cache.
