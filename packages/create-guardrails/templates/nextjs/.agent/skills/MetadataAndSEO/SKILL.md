---
name: metadataandseo
description: Guidelines and best practices for 📡 Metadata & SEO (Next.js 15 & 16) in nextjs.
---

# 📡 Metadata & SEO (Next.js 15 & 16)

Next.js provides a first-class **Metadata API** that is the primary and mandatory SEO mechanism for App Router applications. Raw `<head>` tags or third-party SEO libraries are forbidden.

---

## 🛡️ Static Metadata
For pages with a known title and description at build time, export a `metadata` constant.

```tsx
// app/(dashboard)/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | MyApp',
  description: 'Manage your account, analytics, and settings.',
};

export default function DashboardPage() { ... }
```

---

## 🔄 Dynamic Metadata (`generateMetadata`)
For pages where the title or description depends on data (e.g., a product page), use `generateMetadata`. This function runs on the server; it is secure and does not expose data to the client.

```tsx
// app/(marketplace)/products/[slug]/page.tsx
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  return {
    title: `${product.name} | MyApp`,
    description: product.description,
    openGraph: {
      images: [product.imageUrl],
    },
  };
}
```

---

## 📐 Required Metadata Fields
Every `page.tsx` MUST include the following:

| Field | Required | Description |
|---|---|---|
| `title` | ✅ Yes | Human-readable page title |
| `description` | ✅ Yes | Concise 1-2 sentence description |
| `openGraph.title` | 🟡 Recommended | For social sharing |
| `openGraph.description` | 🟡 Recommended | Social sharing description |
| `openGraph.images` | 🟡 Recommended | OG image (1200x630px) |

---

## 📂 Root Layout Metadata (Global Defaults)
Set global defaults in the root `app/layout.tsx` using the `metadataBase` and `template` fields.

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://myapp.com'),
  title: {
    default: 'MyApp',
    template: '%s | MyApp', // Individual pages supply the prefix
  },
  description: 'The best platform for your needs.',
};
```

---

## 🤖 Interaction Protocol
AI agents MUST add a `metadata` export to EVERY `page.tsx` they create, even if it is a stub. A page without `metadata` is a SEO audit failure. If the data is dynamic, `generateMetadata()` is mandatory.
