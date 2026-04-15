---
name: assetmanagement
description: Guidelines and best practices for Asset Management Guide (Next.js 15 & 16) in nextjs.
---

# Asset Management Guide (Next.js 15 & 16)

This document outlines the standard for managing static assets (images, icons, vectors) within the Next.js project.

---

## 📂 Directory Structure

All static assets should be stored in the `public/` directory (for static URLs) or `src/assets/` (for modular imports).

```text
public/
├── images/          # Compressed static images
├── icons/           # Global SVG icons
src/
└── assets/          # Processed images and complex vectors
    ├── index.ts     # Centralized export file
    └── auth/        # Feature-specific assets
```

---

## 🏗️ The Next.js Image Pattern

To ensure high performance (LCP/FID), **ALL images MUST use the `next/image` component**.

### ✅ DO: Static Imports for Layout Stability
Importing an image directly allows Next.js to determine `width` and `height` automatically, preventing layout shifts.

```typescript
// src/assets/index.ts
import HeroPromo from './home/hero-promo.webp';

export const ASSETS = {
  HERO_PROMO: HeroPromo,
};
```

### Usage in Components:
```tsx
import Image from 'next/image';
import { ASSETS } from '@/assets';

const Hero = () => {
  return (
    <Image 
      src={ASSETS.HERO_PROMO} 
      alt="Promotional Hero Banner"
      priority={true} // Set for above-the-fold content
      placeholder="blur" // Premium shimmer effect
    />
  );
};
```

### ❌ DON'T: Native `<img>` tags
Never use the native `<img>` tag in any component. It bypasses the Next.js optimization pipeline (WebP conversion, lazy-loading, resizing).

---

## 🖼️ Image Optimization Guidelines

1.  **Mandatory Format:** Prefer **WebP** or **AVIF** for photographic content and **SVG** for graphics/icons.
2.  **Sizing:** Ensure images are compressed before committed. Use `next/image` with `width` and `height` (or `fill`) to manage responsiveness.
3.  **Priority Images:** Only the main hero image or above-the-fold content should have the `priority` prop to avoid LCP penalties.
4.  **Alt Text:** All images MUST have descriptive `alt` text. Use a blank string `alt=""` only for purely decorative elements to satisfy a11y requirements.

## 🤖 Interaction Protocol
Agents MUST refuse to write an `<img>` tag and MUST convert any provided `<img>` to a `<Image>` component from `next/image`. If a new asset is added, it must be added to the `src/assets/index.ts` file.
