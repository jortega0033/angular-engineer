# HTTP and RxJS

Version-gated: verify in the repo's Angular version. The official `angular-developer` skill wins on API details.

**HTTP**
- `provideHttpClient(withInterceptors([...]))`; functional interceptors for auth headers, error mapping, retries. Add `withFetch()` where the repo or SSR setup uses it; check the version.
- Type responses; map API DTOs to domain types at the edge, not in templates.
- Model request state explicitly (`idle | loading | success | empty | error`); show errors to the user; leave state consistent on failure; offer retry where it matters.
- Cancel stale work: `switchMap` for "latest wins"; never fire-and-forget in constructors without a cancellation and error path.

**Operators (flattening)**
| Operator | Use when |
|---|---|
| `switchMap` | only the latest matters: search, route-param loads |
| `exhaustMap` | ignore new while busy: submit/save |
| `concatMap` | keep order: queued writes |
| `mergeMap` | parallel, order irrelevant: independent fetches |

Handle errors inside the inner stream (`catchError` on the inner observable) so the outer stream survives. `debounceTime` + `distinctUntilChanged` for typeahead.

**Subscriptions**
- Prefer the `async` pipe or `toSignal()`. For manual `subscribe`, use `takeUntilDestroyed()` (in an injection context, or pass a `DestroyRef`). Never nest subscribes.
- Subjects: expose observables, not the subject; complete what you create.
