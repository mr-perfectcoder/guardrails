# Tailwind CSS Style Guide

This project utilizes Tailwind CSS for all styling. To ensure consistency and a premium design feel, we follow official standards and industry best practices.

---

## 🎨 Design System & Tokens

### 1. No Magic Values
Avoid using "magic" arbitrary values in your classes whenever possible.
- **❌ DON'T:** `className="bg-[#3b82f6] p-[17px]"`
- **✅ DO:** Define colors and spacing in `tailwind.config.js` and use class tokens.
- **✅ DO:** `className="bg-primary p-4"`

### 2. Configuration (`tailwind.config.js`)
All primary colors, semantic colors (success, error, warning), and custom spacing must be defined in the config file. This ensures that a single change in the config updates the entire application's aesthetic.

---

## 🛠️ Implementation Standards

### 1. Automatic Class Sorting
We use the [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) to automatically sort classes. This ensures that classes like `flex`, `p-4`, and `bg-white` always appear in the same order across the codebase, improving scannability.

### 2. Dynamic Classes (`clsx` & `tailwind-merge`)
For components with conditional styles, use the `cn` utility (a combination of `clsx` and `tailwind-merge`) to handle class merging without conflicts.

```typescript
// src/utils/helpers.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage in component:
<div className={cn('base-style', isActive && 'active-style', className)} />
```

### 3. Mobile-First Responsive Design
Always start with the mobile style and use breakpoints (`sm:`, `md:`, `lg:`, `xl:`) to add complexity for larger screens.

---

## 🚫 Restricted Patterns

### 1. Limited use of `@apply`
Avoid using `@apply` in CSS files for standard component styling. It bypasses the benefits of Tailwind's utility-first approach and makes debugging harder.
- **Exception:** Use it for global resets or styling third-party library components (e.g., date pickers) that don't support passing classes.

### 2. No Inline Styles
Never use the `style={{ ... }}` prop for CSS that can be handled by Tailwind. Use arbitrary values `-[...]` only if the value is truly dynamic (e.g., a background image URL from an API).

---

## 🌘 Dark Mode & Accessibility

### Dark Mode
We use the `class` strategy for dark mode. Prefix classes with `dark:` to define how elements should look in dark themes.
- **Example:** `className="bg-white text-black dark:bg-slate-900 dark:text-white"`

### Accessibility (A11y)
- **Focus States:** Every interactive element must have a visible focus ring.
- **Contrast:** Ensure text colors meet WCAG contrast ratios against their backgrounds.
- **SR-Only:** Use the `sr-only` class to provide text that is only visible to screen readers.
