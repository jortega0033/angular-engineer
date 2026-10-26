# SSR, security and accessibility baseline

Version-gated: verify in the repo's Angular version. The official `angular-developer` skill wins on API details.

**SSR and hydration (only if the app uses `@angular/ssr`)**
- Server-run code must not touch `window`, `document` or `localStorage` directly; use `afterNextRender`/`afterEveryRender`, `isPlatformBrowser`, or injected abstractions.
- Avoid non-deterministic rendering (random ids, `Date.now()`) that causes hydration mismatches.
- Never share per-request state in module-level singletons; validate the host header; never build server-side requests from raw user input (SSRF).

**Security**
- Angular sanitizes by default: never `bypassSecurityTrust*` or `[innerHTML]` with untrusted input; do not build URLs or HTML from user input.
- Prefer HttpOnly secure cookies over tokens in `localStorage` where feasible (+ XSRF config); authorization is enforced by the server, guards are UX.
- Nothing secret in the client bundle or `environment` files; anything shipped to the browser is public. Never read or print secret files.

**Accessibility**
- Semantic elements (`button`, `a`, `label`); keyboard operability and visible focus; errors tied to inputs; live regions for async status; `alt` text; no color-only meaning; focus management after dialogs and route changes.
- For custom widgets (tabs, menus, listboxes, comboboxes) prefer accessible primitives (Angular CDK or Angular Aria where the version provides them) over hand-rolled ARIA.
