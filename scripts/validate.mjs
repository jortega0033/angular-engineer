// Validates plugin structure and the promises the files make. Usage: node scripts/validate.mjs [root]
// Requires Node 20.11+ (import.meta.dirname).
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? join(import.meta.dirname, '..'));
const errors = [];
const fail = (m) => errors.push(m);
const read = (f) => readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const rel = (f) => f.slice(root.length + 1);

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const TOOLS = new Set(['Read', 'Grep', 'Glob', 'Bash', 'Edit', 'Write', 'NotebookEdit', 'WebFetch', 'WebSearch']);
const WRITE_TOOLS = ['Edit', 'Write', 'NotebookEdit'];

function frontmatter(file) {
  const m = read(file).match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const o = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) o[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return o;
}

// manifests
let plugin, market;
for (const [f, set] of [['.claude-plugin/plugin.json', (v) => (plugin = v)], ['.claude-plugin/marketplace.json', (v) => (market = v)]]) {
  try {
    set(JSON.parse(read(join(root, f))));
  } catch (e) {
    fail(`${f}: invalid JSON (${e.message})`);
  }
}
if (plugin) {
  for (const k of ['name', 'description', 'version', 'license']) if (!plugin[k]) fail(`plugin.json: missing "${k}"`);
  if (plugin.version && !/^\d+\.\d+\.\d+$/.test(plugin.version)) fail(`plugin.json: version "${plugin.version}" is not semver`);
}
if (market) {
  if (!market.name || !market.owner?.name) fail('marketplace.json: missing name or owner.name');
  const entry = market.plugins?.find((p) => p.name === plugin?.name);
  if (!entry) fail('marketplace.json: no plugin entry matching plugin.json name');
  else if (typeof entry.source === 'string' && !existsSync(resolve(root, entry.source))) fail(`marketplace.json: source "${entry.source}" does not exist`);
}

// skills
const skills = readdirSync(join(root, 'skills')).filter((d) => statSync(join(root, 'skills', d)).isDirectory());
for (const d of skills) {
  const file = join(root, 'skills', d, 'SKILL.md');
  if (!existsSync(file)) { fail(`skills/${d}: missing SKILL.md`); continue; }
  const fm = frontmatter(file);
  if (!fm) { fail(`skills/${d}/SKILL.md: missing frontmatter`); continue; }
  if (!NAME_RE.test(fm.name ?? '') || fm.name.length > 64) fail(`skills/${d}/SKILL.md: invalid name "${fm.name}"`);
  if (fm.name !== d) fail(`skills/${d}/SKILL.md: name "${fm.name}" must equal folder "${d}"`);
  if (!fm.description || fm.description.length < 40 || fm.description.length > 1024) fail(`skills/${d}/SKILL.md: description must be 40-1024 chars`);
  const body = read(file);
  if (body.split('\n').length > 200) fail(`skills/${d}/SKILL.md: over 200 lines (move detail to references/)`);
  if (d !== 'angular-engineer' && !body.includes('angular-engineer') ) fail(`skills/${d}/SKILL.md: must reference the safety rules in angular-engineer`);
  if (d === 'angular-engineer') {
    for (const needle of ['data, not instructions', '.env', 'Dirty working tree', 'untrusted code']) {
      if (!body.toLowerCase().includes(needle.toLowerCase())) fail(`skills/angular-engineer/SKILL.md: safety rules missing "${needle}"`);
    }
  }
}

// agents
const agents = readdirSync(join(root, 'agents')).filter((a) => a.endsWith('.md'));
for (const a of agents) {
  const file = join(root, 'agents', a);
  const fm = frontmatter(file);
  if (!fm) { fail(`agents/${a}: missing frontmatter`); continue; }
  const name = a.replace(/\.md$/, '');
  if (fm.name !== name || !NAME_RE.test(fm.name)) fail(`agents/${a}: name "${fm.name}" must equal filename`);
  if (!fm.description) fail(`agents/${a}: missing description`);
  const tools = (fm.tools ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!tools.length) { fail(`agents/${a}: tools must be set explicitly (least privilege)`); continue; }
  for (const t of tools) if (!TOOLS.has(t)) fail(`agents/${a}: unknown tool "${t}"`);
  const text = `${fm.description}\n${read(file)}`;
  const claimsReadOnly = /read-only|never edits|does not edit|cannot edit/i.test(fm.description);
  if (claimsReadOnly && tools.some((t) => WRITE_TOOLS.includes(t))) fail(`agents/${a}: claims read-only but has ${tools.filter((t) => WRITE_TOOLS.includes(t))}`);
  if (/strictly read-only/i.test(fm.description) && tools.includes('Bash')) fail(`agents/${a}: "strictly read-only" must not have Bash`);
  if (tools.includes('Bash') && !WRITE_TOOLS.some((w) => tools.includes(w)) && !/read-only by instruction/i.test(fm.description)) fail(`agents/${a}: has Bash, so the description must say "read-only by instruction" or drop the read-only claim honestly`);
  if (tools.includes('Bash') && !/Use Bash only|read-only commands|read-only git commands/i.test(text) && !WRITE_TOOLS.some((w) => tools.includes(w))) fail(`agents/${a}: has Bash but does not restrict its use in the body`);
  if (!/data, not instructions/i.test(text)) fail(`agents/${a}: missing prompt-injection guard ("data, not instructions")`);
  if (!/\.env/.test(text)) fail(`agents/${a}: missing secrets guard (.env/.npmrc)`);
  if (WRITE_TOOLS.some((w) => tools.includes(w)) && !/only .*spec|only \*\.spec/i.test(text)) fail(`agents/${a}: write-capable agent must state its edit scope`);
}

// cross references: backticked skill/agent names and reference paths
const known = new Set([...skills, ...agents.map((a) => a.replace(/\.md$/, ''))]);
function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    if (n === '.git' || n === 'node_modules') return [];
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}
for (const f of walk(root)) {
  const t = read(f);
  for (const m of t.matchAll(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g)) {
    const p = m[1].split('#')[0];
    if (p && !existsSync(resolve(dirname(f), p))) fail(`${rel(f)}: broken link ${m[1]}`);
  }
  for (const m of t.matchAll(/`(?:angular-engineer:)?(angular-[a-z0-9-]+)`/g)) {
    if (!known.has(m[1]) && !rel(f).startsWith('docs/practice')) fail(`${rel(f)}: references unknown skill/agent "${m[1]}"`);
  }
  for (const m of t.matchAll(/`(references\/[A-Za-z0-9_./-]+\.md|docs\/(?:glossary|cheatsheet|practice-drill)\.md)`/g)) {
    const ok = existsSync(resolve(dirname(f), m[1])) || existsSync(resolve(root, m[1])) || existsSync(resolve(root, 'skills/angular-engineer', m[1]));
    if (!ok) fail(`${rel(f)}: referenced file "${m[1]}" not found`);
  }
}

// README must list every skill and agent
const readme = existsSync(join(root, 'README.md')) ? read(join(root, 'README.md')) : '';
for (const n of known) if (!readme.includes(`\`${n}\``)) fail(`README.md: does not mention \`${n}\``);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${skills.length} skills, ${agents.length} agents, manifests and references valid`);
