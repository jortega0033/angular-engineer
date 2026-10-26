# Signals, state and change detection

Version-gated: verify in the repo's Angular version. The official `angular-developer` skill wins on API details.

- **Component API:** `input()`, `input.required()`, `output()`, `model()` for two-way binding; signal queries `viewChild()`/`contentChild()`. Use decorators if the repo does; do not mix styles within one component.
- **Standalone** is the default in recent versions; do not add `standalone: true` noise or new NgModules in a standalone codebase. Check the version before assuming.
- **State primitives:** `signal()` for state, `computed()` for derived values (pure, no side effects), `linkedSignal()` for writable state that resets from a source. Keep state minimal and derive the rest.
- **`effect()`** is for side effects (logging, storage, third-party DOM). Never derive state in an effect; avoid writing signals inside effects. Use `untracked()` to read without subscribing. For DOM work after render use `afterNextRender`/`afterRenderEffect`; check availability in the version.
- **RxJS bridge:** `toSignal(obs$, { initialValue })` or `requireSync` for synchronous sources; `toObservable()`; `takeUntilDestroyed()` must run in an injection context or be passed a `DestroyRef`.
- **DI:** `inject()` in field initializers/constructors; `providedIn: 'root'` for app-wide services; keep components thin and data access in services.
- **Change detection:** `ChangeDetectionStrategy.OnPush` is the recommended default for new components (from v22 it is already the default). Check whether the app is zoneless (`provideZonelessChangeDetection()`; stability depends on version) before relying on `NgZone` or zone-patched behavior. Mutating objects in place breaks OnPush: replace instead.
- **Async state:** model it explicitly: `idle | loading | success(data) | empty | error(message)`. `resource()`/`httpResource()` may be experimental in the repo's version: check, and say so if you use them.
- **Where state lives:** local UI state in the component; shared feature state in a service holding signals; reach for NgRx (Store/SignalStore) only with a concrete need (see `angular-architect`).
