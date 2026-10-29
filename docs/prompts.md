# Ready-to-paste prompts

The skills carry the workflow; these prompts only start them reliably and give them context. Replace the `<...>` parts. Skills may not be picked automatically from a plain request, so naming the skill is the safest way to start. The safety rules in `angular-engineer` still apply: nothing is committed, pushed, tagged, merged or posted unless you ask in plain words.

## Orient yourself
```
Use angular-onboard, read-only. In at most 40 lines: Angular version and style, how to run and test, folder map, and one user flow traced route -> component -> service -> HTTP -> template. Mark each claim Verified or Inferred.
```
To also set up project context (CLAUDE.md), add: `Then set up CLAUDE.md. Show me the diff first if one already exists.`

## Turn a vague ticket into a plan
```
Use angular-refine on this request: <paste it>. Do not write code. Check whether the repo already does part of it. Give me the goal in one sentence, the questions that would change the design (each with a proposed default), acceptance criteria in Given/When/Then, and the thinnest first slice.
```

## Size a change before coding
```
Use angular-small-pr. Estimate lines and files for <the change> and tell me whether it is one PR or a stack. If it is too big, propose slices.
```

## Build a small slice
```
Implement only <slice> with angular-engineer. Follow the repo's existing patterns for state, forms, naming and styling. Plan first in at most 6 lines with the files you will touch and wait for my OK. Then implement, add a test that fails without the change, run it, and summarize in 3 lines: what changed, why, how to check.
```

## Match the existing UI
```
Use angular-engineer. Match the existing screens: reuse the repo's components, spacing and color tokens, and tell me which ones you reused. Avoid generic AI-looking UI unless the repo already uses it.
```

## Fix a failing test or bug
```
Use angular-engineer. This fails: <paste the output>. Find the root cause before proposing a fix and show the evidence. Then give the smallest fix. Keep the test; do not weaken it.
```

## Review my own diff before I merge
```
Use angular-review on my current diff. Do not edit anything. Rank findings by impact (security and data loss first), each with file:line, what can go wrong for the user and the smallest fix. End with a suggested verdict and the first thing to do.
```

## Review a colleague's pull request
```
Use angular-review on this PR: <PR url>. Read it read-only with gh (no checkout, no comments). Start with the intent: say in one sentence what the PR is for; if you cannot, ask me. Triage files into core, plumbing and noise and review only the core. Label findings blocker, should fix or nit, and describe the effect on the user. Suggest a verdict; I decide whether to approve.
```

## Respond to review comments on my PR
```
Use angular-review. I am the author of the PR and these are the review comments on it: <paste them>. Group them, verify each claim before changing anything, draft replies for me, and do not post, push or commit.
```

## Upgrade Angular or migrate patterns
```
Use angular-modernize to plan the upgrade from <current version> to <target version>. Plan only: ordered hops, commands, what could break, rollback. Do not change dependencies until I approve the plan.
```

## Set up CI or harden security
```
Use angular-ship to review our CI, build budgets and security setup. Read package.json, angular.json and the existing workflows first, name only commands that exist, and propose changes as a diff. Do not deploy, tag or edit pipelines.
```

## Decide between options (design question)
```
Use angular-architect: <the question>. Keep it proportionate to the decision. Give two or three options with trade-offs, a recommendation, and what would change your mind.
```

## When the AI goes off track
```
Stop. Do not change anything else. List what you changed and why in a short table, then propose the minimal path back.
```
Or:
```
You are over-building. Remove everything the request did not ask for and show me the diff.
```
