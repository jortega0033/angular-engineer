---
name: angular-modernize
description: Plan and execute safe Angular upgrades and modernization - ng update across major versions, NgModules to standalone, structural directives to built-in control flow, decorators to signal inputs/outputs/queries, constructor DI to inject(), zone.js to zoneless, test runner migration, and tech-debt paydown. Use when a codebase is behind or mixes old and new patterns.
---

# Angular modernize

Migrations are risky mainly because they are large. Make them **small, mechanical, reversible and verified**. Never mix a migration with feature work.

## Rules
- Start from a clean git state on a dedicated branch. One migration per commit/PR so each can be reverted alone.
- Establish a baseline first: install, build, lint, run tests, note pre-existing failures. Do not start if you cannot get a baseline.
- Prefer the official automated schematics over hand edits; review the diff they produce.
- Upgrade **one major version at a time** (`ng update` does not support skipping majors reliably). Read the official update guide at angular.dev/update-guide for the exact from/to versions, plus Node, TypeScript and RxJS requirements.
- Verify after each step: build, tests, lint, a manual smoke test of critical flows. Report evidence.
- Ask before: changing the test runner, bumping major third-party libraries, changing build tooling, or touching CI.

## Process
1. **Assess:** Angular, Node, TypeScript, RxJS and key library versions; NgModule vs standalone; zone.js; test runner; deprecated API usage; third-party libraries with peer-dependency limits; size of the surface (count of modules, components using old patterns). Present a short plan with order, risk and effort.
2. **Upgrade versions:** `ng update @angular/core@<next> @angular/cli@<next>` (then Material/CDK and other libs as needed). Resolve peer-dependency conflicts deliberately; do not use `--force`/`--legacy-peer-deps` as a first resort and never silently.
3. **Modernize patterns** (only those supported by the target version; list available schematics with `ng generate @angular/core: --help`, or confirm names on angular.dev):
   - NgModules -> standalone (core standalone migration, run in its documented stages).
   - `*ngIf/*ngFor/*ngSwitch` -> `@if/@for/@switch` (control-flow migration; review `track` expressions it adds).
   - `@Input()/@Output()/@ViewChild` -> `input()/output()/viewChild()` (signal migrations).
   - Constructor injection -> `inject()` where the repo wants it.
   - Add `OnPush`; adopt signals incrementally at leaf components first.
   - zone.js -> zoneless only after auditing code relying on zone-patched behavior and testing thoroughly.
   - Test runner migration (e.g. Karma -> Jest/Vitest/Web Test Runner): do it in its own PR, keep test names, compare counts before and after.
4. **Clean up:** remove dead code and unused dependencies you introduced the need to remove; update lint rules, docs and the ADR log.
5. **Verify and summarize:** what changed, what was automated vs manual, evidence (build/test output), residual risks, rollback instructions.

## Pitfalls
- Skipping major versions; mass-editing by hand what a schematic does; mixing formatting changes with migrations (hides real diffs).
- Treating green tests as proof when coverage is thin - add characterization tests around critical flows before a risky migration.
- Upgrading Node/TypeScript independently of the Angular compatibility matrix.
- Third-party libraries lagging a major version; check their support before starting.
