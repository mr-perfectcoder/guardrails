---
name: formhandling
description: Guidelines and best practices for Form Handling & Modern React Actions (Next.js 15 & 16) in nextjs.
---

# Form Handling & Modern React Actions (Next.js 15 & 16)

This project utilizes the robust `useFormik` hook combined with native React Server Actions for form submissions.

## 📝 Formik (Client-side)
- **Standard**: Always use `useFormik` for client-side validation and state management.
- **Validation**: Use shared Yup schemas from `lib/schemas/`.
- **Wiring**: Wire form inputs manually with `value`, `onBlur`, and `onChange`.
- **Error UI**: Only show errors on `touched` fields.

## 🚀 Server Action Integration
- **Direct Submission**: Call Server Actions within the `onSubmit` handler of `useFormik`.
- **Response Handling**: Map the `ApiResponse<T>` from the action to Formik's state or a global toast.
- **Loading State**: Use the `isSubmitting` flag from Formik or React's native `useFormStatus` to disable the submit button and show a loader.

## 🔄 React 16 + Form Actions
- **useActionState**: For direct, non-Formik implementations, use `useActionState` to track the result and pendency of a Server Action.
- **useOptimistic**: Implement optimistic updates for critical user actions (like liking a post or adding a comment) to provide "Instant UI" responses.
- **progressive enhancement**: Ensure crucial forms (like Login) use native `<form action={...}>` to work even if JavaScript fails to load.

## 🧩 Shared Schemas
```typescript
// lib/schemas/user.schema.ts
import * as yup from "yup";
export const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

// useFormik(client side)
const formik = useFormik({
  validationSchema: userSchema,
  onSubmit: (values) => submitAction(values),
});

// Server Action (server side)
const validated = await userSchema.validate(payload);
```

## 🤖 Interaction Protocol
Agents MUST ensure that the same Yup schema is used both on the client and server. If an agent writes a form without a schema, it must be flagged as a validation audit failure.
