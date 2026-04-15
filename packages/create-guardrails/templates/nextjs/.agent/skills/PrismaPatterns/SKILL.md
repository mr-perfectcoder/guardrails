---
name: prismapatterns
description: Guidelines and best practices for 🗃️ Prisma Data Patterns (Next.js + App Router) in nextjs.
---

# 🗃️ Prisma Data Patterns (Next.js + App Router)

> ⚠️ **OPTIONAL MODULE**: This document is NOT activated by default. Only apply these patterns when the USER explicitly requests Prisma/database integration.

---

## Overview

Prisma is the recommended ORM for type-safe database access in Next.js App Router applications. All Prisma interactions MUST occur on the server (Server Components, Server Actions, or Route Handlers) — never in Client Components.

---

## 📦 Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

Place the schema at `prisma/schema.prisma`.

---

## 🏗️ Singleton Client Pattern

Never instantiate `PrismaClient` directly in each module. In development, HMR can create multiple instances and exhaust DB connections. Use a singleton.

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
```

Import as: `import { db } from '@/lib/db'`

---

## 🔐 Usage with DAL

All DB queries MUST go through the Data Access Layer (`lib/dal.ts`) to ensure auth checks run before any data is returned.

```typescript
// lib/dal.ts
import 'server-only';
import { cache } from 'react';
import { db } from '@/lib/db';
import { verifySession } from './auth';

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  return db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true }, // Explicit column selection only
  });
});
```

---

## 📐 Prisma Rules (When Activated)
1.  **Singleton only**: Always use `lib/db.ts`. Never `new PrismaClient()` inline.
2.  **Select explicitly**: Always use `select: {}` to return only the fields needed. Never return full objects to avoid leaking sensitive data.
3.  **Server-only**: `lib/db.ts` MUST have `import 'server-only'` at the top.
4.  **DAL pattern**: All queries go through `lib/dal.ts` after `verifySession()` — never in a component file directly.
5.  **Migrations**: Run `npx prisma migrate dev` locally, `npx prisma migrate deploy` in CI/CD. Never skip migrations.
6.  **DTO Pattern**: Use `select` or a mapping function to create Data Transfer Objects — never expose the raw Prisma model.

## 🤖 Interaction Protocol
This module is **DISABLED by default**. Agents MUST NOT generate Prisma schemas or `db.*` queries unless the USER explicitly requests database integration. When activated, all queries must go through the DAL pattern.
