---
name: angular-ship
description: Build, quality gates, CI/CD, performance, security hardening, release and observability for Angular applications. Use when setting up or fixing CI, shrinking bundles, improving Core Web Vitals, auditing security, planning a release or rollback, or adding error monitoring. Reviews and proposes; never deploys or changes infrastructure without explicit permission.
---

# Angular ship

Covers "from merged code to healthy production". **Never deploy, publish, change cloud/infra, rotate secrets, or edit pipelines/production config without explicit permission in the current conversation.** Propose, show the diff, wait.

## Quality gates (what CI should enforce)
1. Install reproducibly: `npm ci` (or the repo's lockfile equivalent).
2. Lint and format check; type-check (strict TypeScript).
3. Unit/component tests (headless), with coverage reported (use as a signal, not a goal).
4. Production build (`ng build`) with budgets enforced in `angular.json`.
5. E2E for the few critical user journeys (Playwright/Cypress), run against a built app.
6. Dependency and secret scanning (`npm audit` triaged, not blindly "fixed"; a secrets scanner).
7. Accessibility checks (axe in tests or CI) as a baseline, not a replacement for manual checks.
Make gates fast (cache `node_modules`/build cache, parallelize), deterministic (no sleeps, no network to real services) and required for merge.

## Performance
- Measure first: Lighthouse/WebPageTest, Core Web Vitals (LCP, INP, CLS), `ng build --stats-json` + a bundle analyzer, Chrome DevTools Performance and Angular DevTools profiler.
- Cheap wins in order: lazy routes; `@defer` for below-the-fold/non-critical UI; `NgOptimizedImage` and correct image sizes/formats; OnPush/signals to cut change detection; remove unused dependencies and heavy locale/icon imports; virtual scroll or pagination for long lists; cache HTTP where safe; compress and cache static assets (CDN, hashed filenames).
- SSR/prerender + hydration for first-paint/SEO needs, weighed against operational cost.
- Set budgets so regressions fail CI. Report before/after numbers, not impressions.

## Security
- Dependencies: audit, pin via lockfile, review new packages (maintainers, size, install scripts), keep Angular within supported versions.
- XSS: no `bypassSecurityTrust*`/`[innerHTML]` on untrusted data; Content Security Policy and other headers set at the host/CDN (CSP without `unsafe-inline` where feasible, nonce support for Angular styles/scripts).
- Auth: tokens via interceptors; prefer HttpOnly secure cookies + XSRF protection (`withXsrfConfiguration`); authorization enforced by the server; logout clears state.
- Secrets: nothing secret in the client bundle or `environment` files; use server-side proxies for third-party keys.
- Privacy: no PII in logs, analytics or error reports; respect consent requirements.

## Release and rollout
- Semantic versioning and a changelog; tag releases; reproducible build artifacts.
- Progressive delivery: feature flags, canary or staged rollout, ability to roll back quickly (previous artifact still deployable; backwards-compatible API/data changes first).
- Pre-release checklist: gates green, migrations/config ready, monitoring and alerts in place, rollback steps written and tested, stakeholders informed, post-release smoke test.
- Cache busting and service-worker/PWA update behavior understood before shipping.

## Observability and operations
- Global `ErrorHandler` + HTTP interceptor sending errors to a monitoring tool (with release/version tags and source maps uploaded privately).
- Track the few metrics that matter: error rate, Core Web Vitals, key funnel conversions, API latency/failure rate; define alert thresholds and an owner.
- Incident basics: detect, mitigate (roll back or flag off first), communicate, then root-cause; write a blameless postmortem with follow-ups.

## Output
When asked to assess a project, return: current state (facts from files, with paths), gaps ranked by risk, a prioritized plan with effort, and what you could not verify. Make changes only for what was asked, in small reviewable commits.
