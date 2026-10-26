# Templates, routing and rendering

Version-gated: verify in the repo's Angular version. The official `angular-developer` skill wins on API details.

**Templates**
- Built-in control flow `@if`, `@for (x of xs; track x.id)`, `@switch`, `@empty` blocks. `track` needs a stable unique id; avoid the index on reorderable lists. If the repo still uses `*ngIf/*ngFor`, follow it and propose a migration separately (`angular-modernize`).
- `@defer` for non-critical or below-the-fold UI, with an explicit placeholder/loading/error state; check trigger options in the version.
- `@let` for template-local values where available; check the version.
- Prefer pipes for formatting in templates; avoid calling heavy functions in templates (use `computed()`).
- Host bindings: `host: { ... }` metadata in the component is the modern style; follow the repo if it uses `@HostBinding`/`@HostListener`.
- `NgOptimizedImage` for images (set width/height or `fill`, mark the LCP image `priority`).

**Routing**
- Lazy routes: `loadComponent` / `loadChildren`. Functional guards (`CanActivate`, `CanMatch`) and resolvers (`ResolveFn`); guards are UX, the server enforces authorization.
- `withComponentInputBinding()` lets route params arrive as inputs; `withViewTransitions()` for route animations (check the version).
- Keep route config declarative and near its feature; avoid cross-feature imports.

**Rendering strategy**
- CSR by default. SSR/prerender with hydration only for SEO, first-paint or social-preview needs (see `references/ssr-security-a11y.md`). Weigh operational cost.

**Naming and layout**
- Follow the repo's existing file naming and selector prefix. Newer official guidance moves toward intent-based names; do not rename existing files for style (`angular-small-pr`). Scaffold with the Angular CLI (`ng generate ...`) when the repo uses it so structure stays consistent.
