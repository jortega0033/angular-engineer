# SDLC and architecture glossary (plain language)

Software Development Life Cycle (SDLC) = the stages work goes through from idea to running software and back again.

## The stages
| Stage | What happens | Skill here |
|---|---|---|
| Discovery / requirements | Understand the user problem and constraints; decide what is in scope | `angular-engineer` (Clarify), `angular-architect` |
| Design / architecture | Decide structure, data flow, state, integrations, risks | `angular-architect` |
| Implementation | Write the code in small, reviewable slices | `angular-engineer` |
| Testing | Prove it works: unit, component, integration, end-to-end | `angular-engineer` reference, `angular-test-writer` |
| Code review | Another person (or agent) checks the change before merge | `angular-review` |
| Build and CI | Automated checks on every change (lint, test, build) | `angular-ship` |
| Release and deploy | Get the build to users safely, with a way back | `angular-ship` |
| Operate and monitor | Watch errors, performance, usage; respond to incidents | `angular-ship` |
| Maintain / modernize | Upgrade, pay down debt, retire old patterns | `angular-modernize` |

## Terms
- **Requirement:** something the system must do (functional) or how well it must do it (non-functional / quality attribute: performance, security, accessibility, availability).
- **Acceptance criteria:** concrete checks that say a feature is done.
- **Definition of Done (DoD):** the team's checklist every change must satisfy (tests pass, reviewed, accessible, documented).
- **Vertical slice:** a thin end-to-end piece of a feature (UI to data) that works on its own, instead of building layer by layer.
- **ADR (Architecture Decision Record):** a short document recording a significant decision, why, and the alternatives.
- **Technical design / RFC:** a written proposal reviewed before building something large.
- **Trade-off:** choosing one benefit at the cost of another; architecture is mostly trade-offs.
- **YAGNI:** "You Aren't Gonna Need It": do not build for hypothetical futures.
- **Tech debt:** shortcuts or outdated patterns that make future changes slower; sometimes a deliberate trade, but it needs a plan.
- **Smart vs presentational components:** smart ones fetch/own state; presentational ones only take inputs and emit outputs.
- **Unit / component / integration / E2E tests:** from smallest isolated piece up to the full user journey in a real browser. Aim for many small, few large.
- **CI (Continuous Integration):** automatically build and test every change. **CD:** automatically (or one-click) deliver passing builds.
- **Feature flag:** a switch to enable a feature for some or no users without redeploying.
- **Canary / staged rollout:** release to a small share of users first.
- **Rollback:** returning quickly to the previous good version.
- **Semantic versioning (semver):** MAJOR.MINOR.PATCH; major = breaking changes.
- **Observability:** being able to understand what the system is doing from logs, metrics and traces.
- **SLO / SLI:** a target (e.g. 99.5% of page loads under 2.5s) and the metric measuring it.
- **Incident / postmortem:** a production problem and the blameless write-up of what happened and what changes.
- **Core Web Vitals:** Google's user-experience metrics: LCP (loading), INP (responsiveness), CLS (layout stability).
- **XSS:** attackers get their script to run in your page; Angular sanitizes by default, so avoid bypassing it.
- **Technical spike:** a short, time-boxed investigation to reduce uncertainty.

## Angular terms
- **Standalone component:** a component that declares its own imports, no NgModule needed.
- **Signal:** a reactive value; `computed` derives from signals; `effect` runs side effects.
- **Zone.js / zoneless:** the older mechanism that triggers change detection automatically vs the newer signal-driven approach without it.
- **OnPush:** change detection that only re-checks when inputs/signals change.
- **DI (dependency injection):** Angular supplies services; use `inject()`.
- **Interceptor:** code that sees every HTTP request/response (auth headers, errors).
- **Guard / resolver:** route-level checks and data preloading.
- **`@defer`:** lazy-load part of a template.
- **SSR / hydration:** render on the server, then attach interactivity in the browser.
- **Schematic / `ng update`:** automated code transformations Angular ships for upgrades.
