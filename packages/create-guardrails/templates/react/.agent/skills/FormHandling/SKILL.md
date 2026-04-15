---
name: formhandling
description: Guidelines and best practices for Form Handling & Validation in react.
---

# Form Handling & Validation

This project uses **Formik** for managing form state and **Yup** for schema-based validation.

## 📝 Best Practices

1. **Custom Form Hooks:** Complex forms should have their logic extracted into a custom hook in `src/hooks/form/` (e.g., `useAuthForm.ts`).
2. **Schema Definition:** All validation schemas must be defined in `src/validation/` to keep components clean.
3. **Reusable Components:** Use common UI components like `src/components/common/Input.tsx` that integrate with Formik's `useField` for consistency.

## 🛠️ Implementation Example

### 1. Define the Schema
```typescript
// src/validation/auth.schema.ts
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
});
```

### 2. Create the Custom Hook
```typescript
// src/hooks/form/useLoginForm.ts
import { useFormik } from 'formik';
import { loginSchema } from '@/validation/auth.schema';

export const useLoginForm = (onSubmit: (values: any) => void) => {
  return useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit,
  });
};
```

### 3. Usage in Component
```tsx
const LoginForm = () => {
  const mutation = useLoginMutation();
  const formik = useLoginForm((values) => mutation.mutate(values));

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input 
        name="email" 
        label="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      {/* ... */}
      <Button type="submit" loading={mutation.isLoading}>Login</Button>
    </form>
  );
};
```

## ⚛️ React 19 Forms
When using native React 19 features (like `useActionState`), we transition away from Formik for simpler forms, leveraging the native `form` actions while still using **Yup** or **Zod** for server/client validation within those actions.
