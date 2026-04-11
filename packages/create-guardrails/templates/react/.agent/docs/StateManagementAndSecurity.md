# State Management & Security

This document outlines the strategy for managing application state and ensuring data security in the browser.

---

## 🔐 Data Storage & PII Security

To protect user privacy and comply with security best practices, we enforce strict rules on where data is stored.

### 1. Browser Storage (LocalStorage / SessionStorage / Cookies)
- **⚠️ DO NOT store tokens in `localStorage`**: `localStorage` is accessible by any JavaScript running on the page, making it vulnerable to XSS attacks. A compromised third-party script can steal any token stored there.
- **Recommended**: Store session tokens in **`HttpOnly` cookies** set by the server/backend. `HttpOnly` cookies are completely inaccessible to JavaScript.
- **If `localStorage` is unavoidable** (e.g., no BFF/backend control), document it as a known security trade-off and ensure robust CSP headers are configured.
- **Cookie Security (when using cookies):** Use these mandatory flags:
    - `HttpOnly`: Prevents client-side scripts from accessing the cookie.
    - `Secure`: Only sent over HTTPS.
    - `SameSite=Strict` or `Lax`: Prevents CSRF attacks.
- **No PII:** **Personally Identifiable Information (PII)** such as names, emails, phone numbers, or addresses must **NEVER** be stored in `localStorage`, `sessionStorage`, or `cookies`.

### 2. In-Memory State (React Context)
- **User Information:** All non-sensitive user profile data should be stored in a React Context (e.g., `AuthContext`).
- **Access:** Components should access user info via a custom hook like `useAuth()`.
- **Lifecycle:** This data persists only for the duration of the browser session (until the page is refreshed or closed), ensuring a higher level of security for user data.

---

## 🔐 Protected Route Pattern

All authenticated routes MUST use a `<PrivateRoute>` wrapper component. Never rely on Component-level auth checks alone.

```tsx
// src/components/common/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageSkeleton />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

```tsx
// src/App.tsx — Usage
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route element={<PrivateRoute />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Route>
</Routes>
```

> **Agent Rule**: Every protected page MUST be wrapped inside a `<PrivateRoute>`. Never add auth guards directly to page components.


---

## 🛡️ General Security Best Practices

### 1. XSS (Cross-Site Scripting) Prevention
- **Purity:** React automatically escapes values to prevent XSS. However, never use `dangerouslySetInnerHTML` unless the content is sanitized using a library like `DOMPurify`.
- **Validation:** Always validate and sanitize user-generated content before rendering or sending it to the API.

### 2. CSRF (Cross-Site Request Forgery) Protection
- **SameSite Cookies:** As documented in the [Cookie Security](#1-browser-storage) section, always use `SameSite=Strict` or `Lax`.
- **Custom Headers:** Our Axios instance should include a custom header (e.g., `X-Requested-With`) which many backends use as an additional CSRF check.

### 3. Dependency Security
- **Audits:** Run `npm audit` regularly to identify and fix vulnerabilities in third-party packages.
- **Minimalism:** Avoid adding large, unvetted libraries for simple tasks. Prefer native browser APIs or trusted, widely-used packages.

### 4. Environment Security
- **Client-Side Exposure:** Never store secrets (like private API keys) in `.env` files that will be bundled with the frontend. Only store public configuration (e.g., `API_BASE_URL`).
- **Verification:** Use the startup validation function to ensure environmental integrity.

### 5. Secure HTTP Headers
While primarily managed by the server/CDN, ensure the application is compatible with:
- **CSP (Content Security Policy):** To restrict which resources (scripts, images) can be loaded.
- **HSTS:** To enforce HTTPS-only connections.
- **X-Frame-Options:** To prevent Clickjacking attacks by forbidding the app from being embedded in an iframe.

---

## 🔄 Application State Strategy

We use a hybrid approach to state management:

| State Type | Technology | Folder |
| :--- | :--- | :--- |
| **Server State** | TanStack Query | `src/hooks/api/` |
| **Global UI State** | React Context | `src/context/` |
| **Local Logic State**| `useState` / `useReducer` | Component-level |
| **Form State** | Formik / Actions | Component-level |

### Example: Secure User Access
```typescript
// src/context/auth/AuthContext.tsx
// User data is kept in memory here, NOT in localStorage.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Only the token is synced to localStorage on login
  const login = (token: string, userData: User) => {
    localStorage.setItem('auth_token', token); 
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
```


