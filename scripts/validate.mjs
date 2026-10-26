// Validates plugin structure: frontmatter, name/dir match, local links, JSON manifests.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const errors = [];
const fail = (m) => errors.push(m);

function frontmatter(file) {
  const t = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = t.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const o = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) o[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return o;
}

for (const f of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  try {
    JSON.parse(readFileSync(join(root, f), 'utf8'));
  } catch (e) {
    fail(`${f}: invalid JSON (${e.message})`);
  }
}

for (const d of readdirSync(join(root, 'skills'))) {
  const file = join(root, 'skills', d, 'SKILL.md');
  if (!existsSync(file)) {
    fail(`skills/${d}: missing SKILL.md`);
    continue;
  }
  const fm = frontmatter(file);
  if (!fm) {
    fail(`skills/${d}/SKILL.md: missing frontmatter`);
    continue;
  }
  if (fm.name !== d) fail(`skills/${d}/SKILL.md: name "${fm.name}" must equal folder "${d}"`);
  if (!fm.description || fm.description.length < 40) fail(`skills/${d}/SKILL.md: description missing or too short`);
  const lines = readFileSync(file, 'utf8').split('\n').length;
  if (lines > 200) fail(`skills/${d}/SKILL.md: ${lines} lines (keep skills under 200; move detail to references/)`);
}

for (const a of readdirSync(join(root, 'agents'))) {
  if (!a.endsWith('.md')) continue;
  const fm = frontmatter(join(root, 'agents', a));
  if (!fm) {
    fail(`agents/${a}: missing frontmatter`);
    continue;
  }
  if (fm.name !== a.replace(/\.md$/, '')) fail(`agents/${a}: name "${fm.name}" must equal filename`);
  if (!fm.description) fail(`agents/${a}: missing description`);
  if (!fm.tools) fail(`agents/${a}: missing tools (set least privilege explicitly)`);
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    if (n === '.git' || n === 'node_modules') return [];
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}
for (const f of walk(root)) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g)) {
    const rel = m[1].split('#')[0];
    if (rel && !existsSync(resolve(dirname(f), rel))) fail(`${f.slice(root.length + 1)}: broken link ${m[1]}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('OK: plugin structure valid');
