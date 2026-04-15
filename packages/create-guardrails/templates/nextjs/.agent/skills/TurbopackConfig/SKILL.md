---
name: turbopackconfig
description: Guidelines and best practices for ⚡ Turbopack Configuration (Next.js 16) in nextjs.
---

# ⚡ Turbopack Configuration (Next.js 16)

> ⚠️ **OPTIONAL MODULE**: This document is NOT activated by default. Only apply these patterns when the USER explicitly requests Turbopack optimization or is using Next.js 16+.

---

## Overview

Turbopack is Next.js's Rust-based bundler, providing significantly faster local development refresh speeds (replacing Webpack). In Next.js 16, Turbopack is the default for `next dev`. It is **not** used for production builds (which still use Webpack/SWC).

---

## 🚀 Enabling Turbopack

In Next.js 15, opt-in manually:
```bash
next dev --turbopack
```

In Next.js 16, Turbopack is enabled by default for `next dev`.

---

## ⚙️ Configuration (`next.config.ts`)

Turbopack config is placed under the `turbopack` key in `next.config.ts`.

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Custom module resolution aliases
    resolveAlias: {
      '@/components': './src/components',
    },
    // Custom file extension resolution order
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    // Specify loaders for non-standard file types
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
```

---

## 🔄 Turbopack vs Webpack Key Differences

| Feature | Webpack | Turbopack |
|---|---|---|
| Used in `next dev` | v15 default | v16 default |
| Used in `next build` | ✅ Always | ❌ Not used |
| Config file | `webpack` key | `turbopack` key |
| Speed | Standard | Up to 10x faster HMR |
| Plugin ecosystem | Full | Limited (growing) |

---

## 📐 Turbopack Rules (When Activated)
1.  **Dev only**: Turbopack only affects `next dev`. Production builds always use the standard bundler.
2.  **Webpack compat**: If a webpack plugin has no Turbopack equivalent, document the limitation and use `next dev` (without `--turbopack`) as a fallback.
3.  **SVG loaders**: Configure `@svgr/webpack` in the `turbopack.rules` section to allow SVG imports as React components.
4.  **No custom config mixing**: Do not mix `turbopack` and `webpack` config keys for the same setting.

## 🤖 Interaction Protocol
This module is **DISABLED by default**. Agents MUST NOT modify Turbopack configuration unless the USER explicitly asks to optimize the dev server or configure build tooling. When activated, always verify the target Next.js version supports it.
