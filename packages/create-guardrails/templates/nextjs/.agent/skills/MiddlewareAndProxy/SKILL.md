---
name: middlewareandproxy
description: Guidelines and best practices for 🏢 Middleware & Secure Proxy Rules (Next.js 15 & 16) in nextjs.
---

# 🏢 Middleware & Secure Proxy Rules (Next.js 15 & 16)

Next.js Middleware (v15) or Proxy (v16) is the first line of defense for edge-side processing, routing, and proxy logic. It MUST be used for global security enforcement and request rewriting.

### 🔄 Version Note (IMPORTANT)
- **Next.js 15**: Use `middleware.ts` and export the `middleware` function.
- **Next.js 16+**: Use `proxy.ts` and export the `proxy` function.
- **Functionality**: Both satisfy the same architectural role: the global request gateway.

## 🛡️ Global Security Guard
The `middleware.ts` file must enforce global authentication and CSRF headers before a request reaches the App Router.

- **Private Routes**: Use a `matcher` to target `/dashboard/:path*`, `/api/:path*`, etc.
- **Session Check**: Verify the presence of a session cookie (e.g., `next-auth.session-token`) at the Edge.
- **Redirects**: Unauthenticated users should be redirected to `/auth/login` before Server Components even begin to render.

## 🔗 Secure Proxy (Next.js 15 & 16)
To keep backend infrastructure hidden, all requests to external services must be proxied through the server layer.

1.  **Server Actions (Primary)**: Any interaction originating from the UI should be proxied via a **Server Action** (see [SecurityAndAPI.md](SecurityAndAPI.md)).
2.  **API Proxy Routes**: If a client-side library **requires** a REST endpoint, use a Next.js **Route Handler** as a proxy:
    - **Hide Tokens**: The proxy route injects the `BACKEND_API_URL` and `Authorization` bearer token on the server.
    - **Header Scrubbing**: Remove sensitive client headers before forwarding to the backend.
    - **Rate Limiting**: Enforce per-IP rate limiting *within the proxy route* to prevent direct backend abuse.

## 🔒 Security Requirements
- **No Client Secrets**: NEVER include an API key in a Client Component or request it from the browser.
- **Strict CORS**: Define a strict CORS policy for the proxy routes to allow only the application's own origin.
- **X-Forwarded Headers**: Ensure that when the proxy forwards a request, it correctly appends the original client's IP to `XFF` for the backend's logging and rate-limiting.

## 🤖 Interaction Protocol
AI agents MUST refuse to write any client-side code that contacts a backend WITHOUT going through a Server Action or a controlled Proxy. If a developer asks to call an external API directly from the client, the agent MUST suggest creating a Server Action or Middleware/Proxy Rewrite instead.

