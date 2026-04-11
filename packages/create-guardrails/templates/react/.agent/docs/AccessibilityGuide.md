# ♿ Accessibility Guide (a11y)

Accessible UIs are not optional. Every component in this project must meet **WCAG 2.1 Level AA** standards. Accessibility failures are treated as bugs, not enhancements.

---

## 🏗️ Semantic HTML First

### ✅ DO: Use semantic elements
Prefer native HTML elements that carry implicit ARIA roles over `<div>` soup.

```tsx
// Good: Screen readers understand the structure
<header>...</header>
<nav>...</nav>
<main>
  <section aria-labelledby="section-title">
    <h2 id="section-title">Dashboard</h2>
  </section>
</main>
<footer>...</footer>
```

### ❌ DON'T: Use divs for everything
```tsx
// Bad: Zero semantic meaning for assistive technology
<div class="header">
  <div class="nav">
    <div class="main">...</div>
  </div>
</div>
```

---

## 🎹 Keyboard Navigation

- **Focus Order**: All interactive elements must be reachable via `Tab` in a logical order.
- **No Mouse-Only Events**: Never bind critical actions to `onMouseOver` or `onHover`. Always provide a keyboard equivalent.
- **Escape Key**: Modals, drawers, and dropdowns MUST close on `Escape`.
- **Focus Trap**: Focus must be trapped inside open modals/dialogs. Use `focus-trap-react` or a Radix UI primitive.

```tsx
// Good: Both mouse and keyboard handled
<button
  onClick={handleDelete}
  onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
>
  Delete
</button>
```

---

## 🏷️ ARIA Attributes

| Scenario | ARIA Attribute | Example |
|---|---|---|
| Icon-only button | `aria-label` | `<button aria-label="Close modal">✕</button>` |
| Dynamic content update | `aria-live` | `<div aria-live="polite">{statusMessage}</div>` |
| Loading state | `aria-busy` | `<div aria-busy={isLoading}>...</div>` |
| Expanded/collapsed | `aria-expanded` | `<button aria-expanded={isOpen}>Menu</button>` |
| Required form field | `aria-required` | `<input aria-required="true" />` |
| Error message | `aria-describedby` | `<input aria-describedby="email-error" />` |

---

## 🖼️ Image Accessibility

- ALL `<img>` tags MUST have an `alt` attribute.
- Descriptive `alt` for meaningful images: `alt="User profile photo of John Doe"`.
- Empty `alt=""` for purely decorative images (screen reader skips them).

---

## 🌈 Colour & Contrast

- **Minimum contrast ratio**: 4.5:1 for normal text, 3:1 for large text (WCAG AA).
- Never use colour as the **only** means of conveying information (e.g., a red border alone to show an error — also add an error message).
- Test with a contrast checker (e.g., [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).

---

## 🤖 Interaction Protocol
AI agents MUST:
- Add `aria-label` to all icon-only buttons.
- Add `alt` text to all images.
- Use semantic HTML instead of `<div>`/`<span>` where a native element exists.
- Never add a `click` event to a non-interactive element (`<div>`, `<span>`) — use `<button>` or `<a>` instead.

Any component failing these rules during code generation is an **a11y audit failure**.
