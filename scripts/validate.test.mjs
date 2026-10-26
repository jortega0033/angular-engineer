// Negative tests: the validator must fail on deliberately broken copies of the plugin.
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const validator = join(root, 'scripts', 'validate.mjs');

function run(dir) {
  return spawnSync(process.execPath, [validator, dir], { encoding: 'utf8' });
}

function broken(label, mutate, expect) {
  const dir = mkdtempSync(join(tmpdir(), 'ae-validate-'));
  try {
    cpSync(root, dir, { recursive: true, filter: (s) => !s.includes('.git') });
    mutate(dir);
    const r = run(dir);
    if (r.status === 0) throw new Error(`${label}: validator passed but should have failed`);
    if (!r.stderr.includes(expect)) throw new Error(`${label}: expected "${expect}" in output, got:\n${r.stderr}`);
    console.log(`ok - ${label}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const edit = (dir, f, fn) => writeFileSync(join(dir, f), fn(readFileSync(join(dir, f), 'utf8')));

const base = run(root);
if (base.status !== 0) throw new Error(`baseline must pass:\n${base.stderr}`);
console.log('ok - baseline passes');

broken('read-only agent with Edit tool', (d) => edit(d, 'agents/angular-a11y-checker.md', (t) => t.replace('tools: Read, Grep, Glob', 'tools: Read, Grep, Glob, Edit')), 'claims read-only but has');
broken('strictly read-only agent with Bash', (d) => edit(d, 'agents/angular-security-auditor.md', (t) => t.replace('tools: Read, Grep, Glob', 'tools: Read, Grep, Glob, Bash')), 'must not have Bash');
broken('agent missing injection guard', (d) => edit(d, 'agents/angular-reviewer.md', (t) => t.replaceAll('data, not instructions', 'just text')), 'prompt-injection guard');
broken('skill name mismatch', (d) => edit(d, 'skills/angular-review/SKILL.md', (t) => t.replace('name: angular-review', 'name: angular-reviews')), 'must equal folder');
broken('unknown agent reference', (d) => edit(d, 'skills/angular-engineer/SKILL.md', (t) => t + '\nUse `angular-ghost-agent`.\n'), 'unknown skill/agent');
broken('bad manifest json', (d) => writeFileSync(join(d, '.claude-plugin/plugin.json'), '{ nope'), 'invalid JSON');
console.log('all negative tests passed');
