# Forms

Version-gated: verify in the repo's Angular version. The official `angular-developer` skill wins on API details.

- **Match the repo's form strategy.** Do not mix reactive, template-driven and signal forms in one feature without a reason.
- **Reactive forms:** typed (`NonNullableFormBuilder`), validators (sync and debounced async), `updateOn` where it helps. Best for complex or dynamic forms.
- **Template-driven:** fine for tiny forms.
- **Signal forms:** newer API; recent official guidance prefers it for new forms in the newest versions, but its stability depends on the Angular version. Check the repo's version and the official skill/angular.dev before using it, and say if it is experimental. Do not migrate existing forms unprompted.
- **UX and accessibility:** a visible `<label>` per control; show errors after touched or submit; link error text with `aria-describedby`; set `aria-invalid`; move focus to the first invalid control on failed submit; disable submit (or guard with `exhaustMap`) while pending; surface server-side validation errors on the right fields; announce async status with a live region.
- **Tests:** assert visible behavior (error shown after blur/submit, submit disabled while pending, server error mapped to a field).
