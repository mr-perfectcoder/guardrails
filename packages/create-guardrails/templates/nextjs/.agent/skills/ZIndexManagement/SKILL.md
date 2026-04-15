---
name: zindexmanagement
description: Guidelines and best practices for Z-Index Management Strategy in nextjs.
---

# Z-Index Management Strategy

To avoid "Z-Index Wars" where components compete for visibility, we use a centralized, predictable layering system.

---

## 🏛️ The Z-Index Scale

Never use arbitrary numbers like `z-[999]` or `z-[2000]`. All layers must be defined in `tailwind.config.js`.

### Standard Layers:
- `z-hide`: `-1` (Behind the content)
- `z-base`: `0` (Default layer)
- `z-docked`: `10` (Stickied elements within a container)
- `z-dropdown`: `100` (Dropdown menus, tooltips)
- `z-sticky`: `200` (Main Header, Sidebar)
- `z-overlay`: `300` (Dark backdrops for modals)
- `z-modal`: `400` (Modals and Dialog boxes)
- `z-popover`: `500` (App-level notifications and critical tooltips)
- `z-toast`: `600` (Global Toast notifications)

---

## 🛠️ Usage Rules

1.  **Strict Adherence:** Only use the predefined Tailwind classes above.
2.  **Context Creation:** Use `relative`, `absolute`, or `fixed` correctly to create a new stacking context only when necessary.
3.  **Isolation:** When building complex UI components (like a custom carousel), try to isolate their z-index logic within the component container using `isolate` (Tailwind class) to prevent them from interfering with other page elements.
