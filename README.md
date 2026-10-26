# angular-engineer

A lightweight, tool-agnostic instruction file that helps an AI coding agent work **with** you on Angular code: clarify the request, read the repo before assuming anything, make small changes, run the checks, review honestly, and explain what it did.

It is one Markdown file. No framework lock-in, no orchestration, no dependencies.

## What it does

- **Rhythm:** Clarify, Inspect, Plan, Implement, Test, Review, Summarize.
- **Collaborative by default:** the human drives; the agent narrates, keeps diffs small, and explains back.
- **Version-aware:** detects the Angular version, standalone vs NgModule, zoneless or zone.js, state approach and test runner first, then matches the repo's conventions.
- **Modern Angular guidance:** signals, `input()`/`output()`/`model()`, built-in control flow, `inject()`, RxJS operator choice, typed forms, HTTP state, testing with TestBed.
- **Angular review checklist:** subscription leaks, race conditions, error and empty states, accessibility, weak tests.

## Files

| File | Purpose |
|---|---|
| [`SKILL.md`](SKILL.md) | The agent instructions. |
| [`docs/cheatsheet.md`](docs/cheatsheet.md) | Human-facing quick reference, including a React-to-Angular map. |
| [`docs/practice-drill.md`](docs/practice-drill.md) | A timed pairing drill for practising the workflow. |

## Install

| Tool | How |
|---|---|
| Claude Code | Copy `SKILL.md` to `.claude/skills/angular-engineer/SKILL.md` (project) or `~/.claude/skills/angular-engineer/SKILL.md` (user). |
| Codex and other agents that read `AGENTS.md` | Copy to `AGENTS.md`, or to the tool's skills folder. |
| Cursor, Copilot, others | Paste into the tool's rules or custom-instructions file. |
| Any chat | Paste the file as your first message. |

If a repo already has its own `AGENTS.md` or `CLAUDE.md`, keep it and put this beside it or in your user-level config. Repo rules win.

Suggested first prompt:

> Use the angular-engineer skill. Read-only first: inspect this repo and report the Angular version, standalone vs NgModule, zoneless or zone.js, state approach, test runner, conventions, and how to run the app and tests. Do not edit anything yet.

## Scope and honesty

- Angular changes quickly. The repo's `package.json` and [angular.dev](https://angular.dev) are the source of truth; this file tells the agent to check them rather than trust it.
- Some APIs (for example `resource()`/`httpResource()` and signal forms) have been experimental in some versions. The skill tells the agent to verify stability before using them.
- This is guidance, not a guarantee. Review every diff and run the tests.

## Contributing

Issues and pull requests are welcome, especially corrections for newer Angular versions, extra review checks, and conventions from real codebases. Keep `SKILL.md` short: every line should change what an agent does.

## License

MIT, see [`LICENSE`](LICENSE).
