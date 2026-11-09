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

Handle errors inside the inner stream (`catchError` on the inner observable) so the outer stream survives. `debounceTime` + `distinctUntilChanged` for typeahead, but send an explicit retry through its own trigger, because `distinctUntilChanged` drops a repeat of the same query. Debounce reduces requests; it does not stop an older response arriving late.

Keep request state tied to the current request. `switchMap` unsubscribes the previous inner stream, which runs its `finalize`: a `finalize(() => loading = false)` there clears the newer request's loading flag while it is still pending. Set loading, results and error from the latest request's own events (for example map each inner stream to a state object) and clear the old error when a new request starts.

**Writes and conflicts:** latest-wins cancellation is for reads. Unsubscribing aborts the client request but does not undo a write the server already applied. On a conflict response (for example 409 because another action won), show the server's actual state, refresh it, and do not claim success or blindly retry the write.

**Subscriptions**
- Prefer the `async` pipe or `toSignal()`. For manual `subscribe`, use `takeUntilDestroyed()` (in an injection context, or pass a `DestroyRef`). Never nest subscribes.
- Subjects: expose observables, not the subject; complete what you create.
