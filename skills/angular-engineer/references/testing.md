# Testing

Version-gated: verify in the repo's Angular version. The official `angular-developer` skill wins on API details.

- **Match the repo's runner and helpers** (Jasmine/Karma, Jest, Vitest, Playwright/Cypress). Recent official guidance uses Vitest for unit tests, but never switch runners unprompted; that is its own PR (`angular-modernize`).
- **Run once, non-interactively:** use the repo's script in run-once mode (no watch, headless browser). Running tests executes repo code; follow the untrusted-code rule in `angular-engineer`.
- **Component tests:** `TestBed.configureTestingModule({ imports: [Cmp], providers: [...] })`; `fixture.componentRef.setInput('name', v)`; `await fixture.whenStable()`; query by role/text, not CSS classes. Use component harnesses (Angular Material/CDK) when the repo does.
- **HTTP:** `provideHttpClient()` + `provideHttpClientTesting()`; `HttpTestingController` (`expectOne`, `flush`, error flush, `verify()`).
- **Router:** `RouterTestingHarness` for navigation, guards and resolvers.
- **Coverage of behavior:** happy path, one error path, one empty/edge case. A test that still passes if the feature is deleted is worthless. Coverage numbers are a signal, not a target.
- **E2E:** few critical journeys; stable selectors (roles, test ids); no sleeps; run against a built app.
- **Never** weaken, skip or delete existing tests to get green.
