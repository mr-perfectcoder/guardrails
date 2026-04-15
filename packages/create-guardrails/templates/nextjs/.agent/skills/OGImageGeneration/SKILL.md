---
name: ogimagegeneration
description: Guidelines and best practices for 🖼️ OG Image Generation (Next.js 15 & 16) in nextjs.
---

# 🖼️ OG Image Generation (Next.js 15 & 16)

> ⚠️ **OPTIONAL MODULE**: This document is NOT activated by default. Only apply these patterns when the USER explicitly requests Open Graph image generation.

---

## Overview

Next.js provides a built-in `opengraph-image.tsx` file convention to generate dynamic OG images (used for social link previews on Twitter/X, LinkedIn, Slack, etc.) using the **Edge runtime** and the `ImageResponse` API.

---

## 📂 File Convention

Place an `opengraph-image.tsx` file inside any route segment to generate an OG image for that route.

```text
app/
├── opengraph-image.tsx           # Root OG image (site-wide default)
└── blog/
    └── [slug]/
        └── opengraph-image.tsx  # Dynamic OG image per post
```

---

## 🖼️ Static OG Image

For a fixed, site-wide OG image, place a static file (`opengraph-image.png`) inside `app/`. Next.js will automatically serve it.

```text
app/
└── opengraph-image.png  # Static file — auto-detected, no code needed
```

---

## 🔄 Dynamic OG Image

For dynamically generated images (e.g., per blog post title), use `ImageResponse` from `next/og`.

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // Required: runs on the Edge

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug); // Server-side data fetch

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 48,
          fontWeight: 'bold',
        }}
      >
        {post.title}
      </div>
    ),
    { ...size }
  );
}
```

---

## 📐 Rules (When Activated)
1.  **Dimensions**: Always export `size = { width: 1200, height: 630 }` — this is the standard OG image dimension.
2.  **Edge Runtime**: OG image files MUST use `export const runtime = 'edge'`.
3.  **Font Loading**: Use `fetch()` to load custom fonts inside the `Image` function (Edge runtime does not support `next/font`).
4.  **No heavy dependencies**: The Edge runtime has a strict 4MB limit. Never import large client-side libraries.

## 🤖 Interaction Protocol
This module is **DISABLED by default**. Agents MUST NOT add `opengraph-image.tsx` files unless the USER explicitly requests OG image generation. When activated, every dynamic route should have a matching `opengraph-image.tsx`.
