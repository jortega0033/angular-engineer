# Modern Angular reference

Apply only if the repo's Angular version supports it and the codebase already moves that way. Verify anything marked "check" against the installed version and angular.dev.

## Components and state
- Standalone components/directives/pipes. No new NgModules in a standalone codebase.
- `input()`, `input.required()`, `output()`, `model()`; `viewChild()`/`contentChild()` signal queries.
- `signal()`, `computed()`, `linkedSignal()` for state. `effect()` is for side effects (logging, DOM, storage), never to derive state or write signals in loops.
- `ChangeDetectionStrategy.OnPush`. Check whether the app is zoneless (`provideZonelessChangeDetection()`) before relying on `NgZone` or zone-patched behavior.
- `inject()` for DI; `providedIn: 'root'` for app-wide services. Keep components thin; data access lives in services.
- Built-in control flow: `@if`, `@for (x of xs; track x.id)` (stable unique id, not the index for mutable lists), `@switch`, `@defer` for non-critical UI.
- Lazy routes via `loadComponent`/`loadChildren`; functional guards/resolvers; `withComponentInputBinding()` for route params as inputs.

## Async data
- `HttpClient` with `provideHttpClient(withInterceptors([...]))`. Type responses; map API DTOs to domain types at the edge.
- `resource()`/`httpResource()` and signal forms: check stability in the repo's version; say so if experimental.
- Bridge: `toSignal()`, `toObservable()`. Cleanup: `takeUntilDestroyed()` / `DestroyRef`. Prefer `async` pipe or `toSignal` over manual `subscribe`; never nest subscribes.
- Model request state explicitly: `idle | loading | success(data) | empty | error(message)`.

## RxJS flattening
`switchMap` latest wins (search, route-param load). `exhaustMap` ignore while busy (submit/save). `concatMap` ordered queue. `mergeMap` parallel, unordered. Handle errors inside the inner stream (`catchError` on the inner observable) so the outer stream survives. `debounceTime` + `distinctUntilChanged` for typeahead.

## Forms
Typed reactive forms (`NonNullableFormBuilder`), validators (sync + async with debounce), show errors after touched/submitted, link errors with `aria-describedby`, set `aria-invalid`, disable submit while pending, surface server-side validation errors on the right fields.

## Testing
- Match the repo's runner (Jasmine/Karma, Jest, Vitest) and helpers.
- `TestBed.configureTestingModule({ imports: [Cmp], providers: [provideHttpClient(), provideHttpClientTesting()] })`; `fixture.componentRef.setInput('name', v)`; `HttpTestingController` (`expectOne`, `flush`, error flush, `verify()`); `await fixture.whenStable()`; `fixture.detectChanges()`.
- Query by role/text, not CSS classes. Use component harnesses (Angular Material/CDK) when the repo does.
- Test behavior and states: happy path, error path, empty/edge. A test that still passes if the feature is deleted is worthless.
- E2E (Playwright/Cypress): few, critical user journeys; stable selectors (roles, test ids); no sleeps.

## Accessibility baseline
Semantic elements (`button`, `a`, `label`), keyboard operability and visible focus, errors tied to inputs, live regions for async status, `alt` text, no color-only meaning, focus management after dialogs and route changes.

## Security baseline
Angular sanitizes by default: never `bypassSecurityTrust*` or `[innerHTML]` with untrusted input; do not build URLs/HTML from user input; keep tokens out of `localStorage` where HttpOnly cookies are feasible (+ XSRF config); never commit secrets or put them in the bundle (anything shipped to the browser is public).
