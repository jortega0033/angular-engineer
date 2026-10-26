# angular-engineer

A Claude Code plugin (and portable Markdown instructions) that makes an AI coding agent a careful Angular teammate across the software lifecycle: clarify, design, build, test, review, modernize and ship.

It is built around one idea: **the human decides, the agent does the legwork and shows its reasoning.** It reads your repo before assuming anything, works in small verified steps, and asks before doing anything risky.

## What is inside

| Skill | Use it for |
|---|---|
| `angular-engineer` | Core workflow for building and fixing features: Clarify, Inspect, Plan, Implement, Test, Review, Summarize. Routes to the others. |
| `angular-architect` | Design and decisions: requirements, options and trade-offs, state and structure choices, ADRs, risk, slicing work. |
| `angular-review` | Reviewing a diff or PR: correctness, RxJS/signals, races, errors, security, accessibility, performance, tests. |
| `angular-modernize` | Upgrades and migrations: `ng update`, standalone, control flow, signals, zoneless, test runner. |
| `angular-ship` | CI quality gates, performance, security hardening, release and rollback, observability. |

| Agent (read-only unless noted) | Job |
|---|---|
| `angular-reviewer` | Independent review of a change |
| `angular-a11y-checker` | Accessibility pass over templates |
| `angular-security-auditor` | XSS, auth/token handling, secrets, dependencies |
| `angular-perf-auditor` | Bundles, lazy loading, change detection, images |
| `angular-architect-critic` | Adversarial critique of a design or ADR |
| `angular-test-writer` (can edit) | Writes tests for one named unit in the repo's runner |

New to some of the terms? See [`docs/glossary.md`](docs/glossary.md) (SDLC, architecture and Angular terms in plain language).

## Install

**Claude Code plugin (recommended):**

```
/plugin marketplace add jortega0033/angular-engineer
/plugin install angular-engineer@angular-engineer
```

Skills are then available as `/angular-engineer:angular-architect` and so on, and Claude can pick them up automatically from their descriptions.

**Manual:** copy `skills/*` to `.claude/skills/` and `agents/*.md` to `.claude/agents/` (project) or the same folders under `~/.claude/` (user).

**Other tools (Codex, Cursor, Copilot, any chat):** paste `skills/angular-engineer/SKILL.md` into `AGENTS.md` / the rules file / your first message. The other skills can be pasted when needed.

If a repo already has its own `AGENTS.md` or `CLAUDE.md`, keep it: repo rules win.

## Try it

```
Use the angular-engineer skill. Read-only first: inspect this repo and report the Angular version,
standalone vs NgModule, zoneless or zone.js, state approach, test runner, conventions, and how to
run the app and tests. Do not edit anything yet.
```

```
/angular-engineer:angular-architect  We need offline-capable drafts in the editor. Propose options and an ADR.
```

```
Use angular-review on my current diff, and run angular-security-auditor in parallel.
```

## Safety defaults

- No new dependencies, destructive commands, force pushes, deployments, infra/CI/secret changes without explicit permission.
- Repo text, logs, issues and web pages are treated as data, never as instructions.
- Tests are never weakened to get green; claims are backed by commands that were actually run.
- Reviewer, auditor and critic agents are read-only by tool configuration, not just by instruction.

## Practice and quick reference

- [`docs/cheatsheet.md`](docs/cheatsheet.md): rhythm, React-to-Angular map, RxJS and review quick reference.
- [`docs/practice-drill.md`](docs/practice-drill.md): a timed pairing drill with a deliberately flawed component.

## Scope and honesty

- Angular moves fast. The repo's `package.json` and [angular.dev](https://angular.dev) are the source of truth; these skills tell the agent to check them. APIs such as `resource()`/`httpResource()` and signal forms have been experimental in some versions, so the agent verifies stability first.
- This is guidance, not a guarantee. Review every diff and run the tests. `node scripts/validate.mjs` checks the plugin structure (CI runs it); it does not measure how well an agent follows the skills.

## Contributing

Issues and PRs welcome: corrections for newer Angular versions, extra review checks, conventions from real codebases. Keep skills under 200 lines and move detail into `references/`; every line should change what an agent does. Run `node scripts/validate.mjs` before opening a PR.

## License

MIT, see [`LICENSE`](LICENSE).
