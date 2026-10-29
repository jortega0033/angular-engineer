# Modern Angular reference (index and fallback)

This is a **fallback and index**, not the authority on Angular APIs. Precedence when guidance conflicts:

1. **The repo's own conventions and Angular version** (what the code and `package.json` actually use).
2. **The official `angular-developer` skill** from the Angular team, if installed (look for `.claude/skills/angular-developer/`, `.agents/skills/angular-developer/` or the same under `~/.claude/skills/`). It is maintained by the Angular team and has deep per-topic references; defer to it for API details.
3. **angular.dev** documentation.
4. These files, which are short, version-gated reminders written from general knowledge and not verified against every Angular release.

If the official skill is not installed, you may suggest the human install it (`npx skills add angular/skills`); do not run installs yourself. If it is installed, suggest `npx skills check` occasionally, since stale skills push agents back to outdated patterns.

Load only the file you need:

| Topic | File | Load when |
|---|---|---|
| Signals, state, change detection | `references/state-and-signals.md` | Writing component state, inputs/outputs, derived values |
| Templates, routing, rendering | `references/templates-and-routing.md` | Control flow, `@defer`, routes, guards, lazy loading, images |
| HTTP and RxJS | `references/http-and-rxjs.md` | Data fetching, interceptors, operators, cancellation, error handling |
| Forms | `references/forms.md` | Any form, validation, error display |
| Testing | `references/testing.md` | Writing or fixing tests, choosing a runner pattern |
| SSR, security, accessibility | `references/ssr-security-a11y.md` | SSR/hydration, HTML rendering, auth tokens, a11y baseline |
| UI consistency | `references/ui-consistency.md` | Any new screen, component or styling; avoiding generic AI-looking UI |

Rule for all of them: apply a modern API only if the repo's version supports it **and** the codebase already moves that way; otherwise match the existing style and mention the modern option as a follow-up.
