# Angular pairing cheat sheet

Phone-readable. Nothing here is to memorize; it is to glance at when you blank.

## The rhythm (say this out loud at the start)

> "I'll clarify the request, trace the existing code, share a small plan, build the smallest working slice, test it, and then we can review it together."

**Clarify -> Inspect -> Plan -> Implement -> Test -> Self-review -> Summarize**

## First 10 minutes in an unfamiliar repo

1. `package.json`: Angular version, test runner, RxJS, state lib, UI lib, scripts.
2. `app.config.ts` / `main.ts`: standalone? zoneless? interceptors? router?
3. Run the app and the tests (own or trusted repos only; read forks statically). Note what already fails.
4. Click through one user flow and trace it: route -> component -> service -> HTTP -> template.
5. Say the conventions out loud: "They use X for state, Y for tests, Z folder layout."

## Clarifying questions (pick 3-4, do not interrogate)

- Who is the user and what are they trying to do?
- Example of expected input -> output?
- What should happen while loading, when empty, and on error?
- Smallest useful version? What can wait?
- How will we know it works?
- Any API contract, design system, accessibility or browser constraints?

## Build order

Typed model -> service -> component state -> template -> test -> then loading/empty/error -> styling last.
Finish the happy path before polishing.

## React/Next -> Angular map (for developers coming from React)

| React | Angular equivalent |
|---|---|
| Component + props | Component + `input()` / `input.required()` |
| Callback prop / event | `output()` |
| Two-way binding with value+onChange | `model()` / `[(x)]` |
| `useState` | `signal()` |
| `useMemo` / derived value | `computed()` |
| `useEffect` | `effect()` (side effects only, rarely) |
| Custom hook | Service with `inject()` |
| Context | Service `providedIn: 'root'` / DI providers |
| `{cond && <X/>}` | `@if (cond) { <x/> }` |
| `.map` with `key` | `@for (x of xs; track x.id) { ... }` |
| `useRef` | `viewChild()` / `ElementRef` |
| React Query / SWR | `HttpClient` + RxJS, or `resource()`/`httpResource()` (check stability) |
| React Hook Form | Typed Reactive Forms |
| React Router | `provideRouter`, `loadComponent`, functional guards |
| Jest + RTL | TestBed + `HttpTestingController` (runner varies: Jasmine/Jest/Vitest) |
| `useEffect` cleanup | `takeUntilDestroyed()` / `DestroyRef` |

## RxJS in one glance

| Operator | Use when | Example |
|---|---|---|
| `switchMap` | only the latest matters | search box, route param load |
| `exhaustMap` | ignore new while busy | Save / Submit button |
| `concatMap` | keep order, queue | sequential writes |
| `mergeMap` | parallel, order irrelevant | independent fetches |
| `debounceTime` + `distinctUntilChanged` | typing input | typeahead |
| `catchError` (inside inner stream) | keep outer stream alive | per-request error |
| `takeUntilDestroyed()` | manual subscribe cleanup | any `subscribe` in a component |
| `toSignal()` | read an Observable in a template/computed | `data = toSignal(data$)` |

Rule of thumb: no nested `subscribe`. Prefer `async` pipe or `toSignal`.

## Forms checklist

Typed controls (`NonNullableFormBuilder`) -> validators -> label per input -> errors after touched/submit ->
`aria-describedby` on error text -> disable submit while pending -> handle server error.

## HTTP state checklist

`loading` / `data` / `empty` / `error` as separate states -> user-visible error message -> retry -> no stuck spinner -> cancel stale requests.

## Review in passes 0-4 (rank by impact)

0. **Security and data loss first:** XSS sinks, secrets, auth, anything that destroys data.
1. **Correctness:** does it do what the request says? edge cases?
2. **Data and races:** subscriptions, flattening operator, double submit, stale responses.
3. **Errors and a11y:** error/empty states; keyboard, labels, focus, live regions.
4. **Tests:** does a test fail if the feature breaks?

Say: **"Here X can happen, which causes Y for the user. I'd suggest Z."** Smallest fix first. Mention what is good.

## Using the AI well

- Give a bounded task: files in scope + done-criteria.
- Read the diff. Question it. Run tests.
- Explain every kept line in your own words.
- Say out loud when you reject or change its output.
- You steer; it types.

Kickoff prompt to the AI:
> "Read-only first. Inspect this repo and report the Angular version, state approach, test runner, conventions, and how to run the app and tests. Do not edit anything yet."

## When you blank

- "Let me trace the existing flow first so I stay consistent with this codebase."
- "I don't remember the exact API, so I'll check it. The behavior I want is ..."
- "Can I think out loud for a second?"
- "Two options: A simple, B flexible. I'd pick A because ... thoughts?"

## End of session (product conversation)

- **Why it helps the user:** ...
- **What I deferred and why:** ...
- **How we'd know it works:** metric / error rate / manual check.
- **Risks / next steps:** ...

## Hygiene

- Do not paste secrets or personal data into prompts or files.
- On a shared machine, use revocable tokens and log out of AI tools when done.
