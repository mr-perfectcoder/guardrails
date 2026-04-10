# API & Data Management Strategy

This project uses a layered approach to handle data fetching, mutations, and synchronization.

## 🏗️ The Three Pillars

### 1. The Service Layer (`src/services/`)
This is the lowest level of data interaction. Functions here are responsible for the raw network requests.
- **Responsibility:** Define endpoints, handle Axios requests, and return clean data.
- **Example:**
```typescript
// src/services/user.service.ts
import api from '@/lib/axios';
import { User } from '@/types/user.type';

export const fetchUserProfile = async (): Promise<User> => {
  const { data } = await api.get('/user/profile');
  return data;
};
```

### 2. The Hook Layer (`src/hooks/api/`)
We wrap all service calls in custom TanStack Query hooks.
- **Responsibility:** Manage caching, loading states, error handling, and re-fetching logic.
- **Rule:** Never call a service function directly from a component; always use a hook.
- **Example:**
```typescript
// src/hooks/api/user.query.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@/services/user.service';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### 3. The Query Client Configuration (`src/config/queryClient.ts`)
Global settings for TanStack Query.
- **Auto Re-fetches:** Configured to re-fetch on window focus or network reconnect for critical data.
- **Error Handling:** Centralized error logging and global retry policies.

---

## 🔄 Mutations & Actions

For data modifications (POST, PUT, DELETE), we use `useMutation`.

- **Success Callbacks:** Use `onSuccess` to invalidate relevant queries and trigger UI notifications.
- **Optimistic Updates:** For a premium user experience, implement optimistic updates using `onMutate` when appropriate (e.g., toggling a checkbox, updating a profile name).

## 🛡️ Validation & Types

Every API response should ideally be validated using **Yup** or **Zod** in the `src/validation/` folder to ensure the frontend doesn't crash on unexpected backend changes. Types for these responses must be defined in `src/types/`.
