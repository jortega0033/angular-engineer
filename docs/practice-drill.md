# Practice drill: timed Angular pairing session (about 2.5 hours)

Use a small Angular starter (`ng new` or a public sample). Ideally a friend plays the second engineer and gives a vague request. Use whatever AI agent you normally use, with `SKILL.md` loaded.

| Time | Block | Practise |
|---|---|---|
| 0:00-0:15 | Understand | Run the app and tests, trace one interaction aloud, state the repo's conventions. |
| 0:15-0:30 | Clarify | Take a vague request ("add a searchable list of X"). Ask 3-4 questions. Restate scope, deferred items and acceptance check. |
| 0:30-1:30 | Build | Small slice: typed model, service with `HttpClient`, component with signals, loading/empty/error states, one test. Use the AI for boilerplate; read every diff. |
| 1:30-2:15 | Review | Review a deliberately flawed component: nested subscribes, `mergeMap` on a search box, no error state, a clickable `div`, no `track`, an unawaited test. Rank findings and propose small fixes. |
| 2:15-2:30 | Product talk | Two minutes: why it helps the user, what you deferred, how you would know it works. |

Afterwards, note the weakest area (Angular recall, communication, or handling the AI) and practise that.

## Flawed component to review

Write your own, or ask an AI to generate one with these planted issues:

1. Search input fires `mergeMap` per keystroke (race, stale results).
2. `subscribe` inside `subscribe`, never unsubscribed.
3. No loading, empty or error state.
4. `<div (click)>` instead of `<button>`; input without a label.
5. `@for` with `track $index` on a reorderable list.
6. A test that only asserts the component is created.
