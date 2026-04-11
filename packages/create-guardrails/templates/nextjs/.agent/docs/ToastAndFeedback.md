# Toast & Feedback Strategy

User feedback must be immediate, non-intrusive, and visually consistent with the project's premium aesthetic.

---

## 🍞 Toast Notifications

We use a unified Toast service (e.g., **Sonner** or **React-Hot-Toast**) for all global feedback.

### ✅ DO: Use Toasts for:
- **API Success:** "Profile updated successfully."
- **API Errors:** "Network failed. Retrying..."
- **Validation Blocks:** "Please fill in all required fields."
- **Background Tasks:** "Exporting report... check your notifications."

### 🎨 Visual Standards
- **Position:** Bottom-right or Top-center (Consistent across the whole site).
- **Icons:** Use semantic icons (Success, Error, Warning, Info).
- **Duration:** 3-5 seconds for success, 5-8 seconds for errors (or manual close).

---

## ⚡ Action Feedback (Micro-Interactions)

Beyond Toasts, use in-component feedback to confirm actions:
- **Button Loading States:** Use the `useFormStatus()` or `pending` flags to disable buttons and show a loading indicator.
- **Success Checkmarks:** For small updates (e.g., changing a single field), show a brief checkmark animation next to the field.
- **Haptic-style Feedback:** Use subtle micro-animations (e.g., a slight bounce on click) to confirm interaction.

---

## 📁 Implementation
The Toast Provider must be placed in the root `src/providers/` folder to ensure it is available across all routes.
