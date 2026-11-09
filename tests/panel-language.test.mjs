/**
 * The row language (ADR-0016, the row kit of 0.7.30.2): every row in the admin comes from the shared parts in
 * editor/src/lib/rows/, so the same kind of setting looks and behaves the same in every panel.
 * Outside the kit this test finds the hand-made rows the kit replaces: a raw segment (`.seg`, where lib/Choice.svelte
 * is the kit's), a plain fold (`<details class="group">`, where lib/rows/Fold.svelte is), a raw slider, a checkbox in
 * a label (on and off, which lib/rows/SwitchRow.svelte draws), prose in a panel (`.panel-hint`, where the empty state
 * and the error line stand), the old sub-heading classes (`.group-sub`, `.panel-strong`), a square icon button
 * drawn by hand (`.row-tool`, `.coll-btn`, a setting's reset or pin, where lib/rows/IconButton.svelte gives every one the same sizes),
 * and a row drag built by hand (`draggable` or a dragstart handler, where lib/rows/row-drag.svelte.js gives every list the same drag).
 * The files not yet moved stand on RATCHET with what each still holds. The list only shrinks: a file that no longer
 * holds a pattern fails the test until the pattern leaves its entry, and a new file is built from the kit.
 * The files are read through Svelte's own parser, so the markup is walked as a tree, never scanned as text.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../editor/src/', import.meta.url).pathname;
const { parse } = await import(new URL('../editor/node_modules/svelte/src/compiler/index.js', import.meta.url).href);

function svelteFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...svelteFiles(p));
    else if (name.endsWith('.svelte')) out.push(p);
  }
  return out;
}

/** The static words of an element's class attribute, and the names of its class: directives. */
function classesOf(node) {
  const words = new Set();
  for (const a of node.attributes) {
    if (a.type === 'ClassDirective') words.add(a.name);
    if (a.type !== 'Attribute' || a.name !== 'class' || !Array.isArray(a.value)) continue;
    for (const part of a.value) if (part.type === 'Text') for (const w of part.data.split(/\s+/)) if (w) words.add(w);
  }
  return words;
}

/** An attribute's static value, or null when it has none or is an expression. */
function attr(node, name) {
  const a = node.attributes.find((x) => x.type === 'Attribute' && x.name === name);
  if (!a || !Array.isArray(a.value) || a.value.some((p) => p.type !== 'Text')) return null;
  return a.value.map((p) => p.data).join('');
}

/** The hand-made rows in `source`, as the sorted names of the patterns it holds. */
function patternsIn(source) {
  const found = new Set();
  const root = parse(source, { modern: true });
  const visit = (node, parent) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { for (const n of node) visit(n, parent); return; }
    let next = parent;
    if (node.type === 'RegularElement') {
      const cls = classesOf(node);
      if (cls.has('seg')) found.add('segment');
      if (node.name === 'details' && cls.has('group')) found.add('fold');
      if (node.name === 'input' && attr(node, 'type') === 'range') found.add('slider');
      if (node.name === 'input' && attr(node, 'type') === 'checkbox' && parent?.name === 'label') found.add('switch');
      if (cls.has('panel-hint')) found.add('hint');
      if (cls.has('group-sub') || cls.has('panel-strong')) found.add('subheading');
      if (node.name === 'button' && (cls.has('row-tool') || cls.has('coll-btn') || cls.has('setting-reset') || cls.has('menu-pin'))) found.add('iconbutton');
      // A picture kept from being dragged (draggable="false") is no drag of its own
      if (node.attributes.some((a) => a.type === 'Attribute' && a.name === 'ondragstart') || (node.attributes.some((a) => a.name === 'draggable') && attr(node, 'draggable') !== 'false')) found.add('drag');
      next = node;
    } else if (node.type === 'Component' || node.type === 'SvelteElement') {
      next = node;
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'metadata' || key === 'loc' || key === 'attributes') continue;
      if (value && typeof value === 'object') visit(value, next);
    }
  };
  visit(root.fragment, null);
  return [...found].sort();
}

/** Widgets whose own inner controls are not rows: the colour picker's hue and alpha sliders, and the image editor's tool rows, each a slider beside its number. */
const ALLOWED = {
  'lib/ColorPicker.svelte': ['slider'],
  'lib/PictureEditor.svelte': ['slider'],
};

/** Every file outside the kit with the patterns it holds. */
function findings() {
  const out = {};
  for (const file of svelteFiles(ROOT)) {
    const rel = file.slice(ROOT.length);
    if (rel.startsWith('lib/rows/')) continue;
    const allowed = new Set(ALLOWED[rel] ?? []);
    const held = patternsIn(readFileSync(file, 'utf8')).filter((p) => !allowed.has(p));
    if (held.length) out[rel] = held;
  }
  return out;
}

/** The files not yet moved to the row kit, with the patterns each still holds: none since 0.7.33.5, so only a new file holding one can fail the test. */
const RATCHET = {};

test('patternsIn: each hand-made row is found, and the kit and its look-alikes are not', () => {
  const held = patternsIn([
    '<span class="seg"><button class:on={a}>A</button></span>',
    '<details class="group"><summary>S</summary></details>',
    '<input type="range" min="0" max="9" />',
    '<label class="gridmenu-snap">{#if a}<input type="checkbox" />{/if} On</label>',
    '<p class="panel-hint">Text</p>',
    '<span class="mini-label group-sub">Part</span>',
    '<div draggable={on ? "true" : undefined} ondragstart={f}>Row</div>',
  ].join('\n'));
  assert.deepEqual(held, ['drag', 'fold', 'hint', 'segment', 'slider', 'subheading', 'switch']);
  const clean = patternsIn([
    '<Fold id="a" title="A" value="B">x</Fold>',
    '<SwitchRow label="On" checked={true} onchange={f} />',
    '<input type="checkbox" class="tick-box" aria-label="Pick" />',
    '<td><input type="checkbox" aria-label="Shown" /></td>',
    '<details class="frame-group"><summary>S</summary></details>',
    '<div class="choice-seg"></div>',
    '<img src="a.png" alt="" draggable="false" />',
    '<span class="row-list-grip" {@attach drag.handle(i)}></span>',
  ].join('\n'));
  assert.deepEqual(clean, []);
});

test('every file outside the row kit holds only what its entry on the list names, and a moved file has left the list', () => {
  const found = findings();
  const drift = Object.entries(found)
    .filter(([file, held]) => JSON.stringify(held) !== JSON.stringify(RATCHET[file] ?? []))
    .map(([file, held]) => `${file} holds ${held.join(', ')}; the list names ${(RATCHET[file] ?? []).join(', ') || 'nothing'}: build it from the kit (editor/src/lib/rows/), or bring its entry to what it still holds`);
  const moved = Object.keys(RATCHET).filter((file) => !found[file]).map((file) => `${file} holds none of ${RATCHET[file].join(', ')}; take it off the list`);
  assert.deepEqual([...drift, ...moved], []);
});

test('each widget allowed its own inner controls still has them', () => {
  for (const [file, patterns] of Object.entries(ALLOWED)) {
    const held = patternsIn(readFileSync(join(ROOT, file), 'utf8'));
    for (const p of patterns) assert.ok(held.includes(p), `${file} no longer holds ${p}; take it off ALLOWED`);
  }
});

/** The removals that clear a field or take a chip away, which stay a cross: a deletion is anything else whose words name a deletion or a removal. */
const CLEARS = new Set(['tip.footer.removeLogo', 'tip.site.removeIcon', 'tip.seo.removeOgImage', 'ui.ownIconRemove', 'tip.clearGeo', 'tip.entry.removeSize', 'cp.removeSaved', 'cap.remove']);

test('every deletion draws a bin on the dark red, in the admin and on the canvas, never the cross that closes things', () => {
  // In the admin: a button whose words name a deletion draws ICONS.bin, and an icon button is marked as a deletion (`danger`) too; a button marked so draws the bin; the action rows' deletions alike.
  const wrong = [];
  const keysIn = (text) => [...text.matchAll(/ta\('([\w.-]+)'/g)].map((m) => m[1]);
  const names = (key) => /delete|remove/i.test(key) && !CLEARS.has(key);
  for (const file of svelteFiles(ROOT)) {
    const source = readFileSync(file, 'utf8');
    const where = file.slice(ROOT.length);
    if (where.endsWith('ActionRow.svelte')) continue;
    const textOf = (a) => (a?.value?.expression ? source.slice(a.value.expression.start, a.value.expression.end) : '');
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) return node.forEach(walk);
      if (node.type === 'Component' && node.name === 'IconButton') {
        const icon = textOf(node.attributes.find((a) => a.name === 'icon'));
        const danger = node.attributes.some((a) => a.name === 'danger');
        const deletes = keysIn(textOf(node.attributes.find((a) => a.name === 'label'))).some(names);
        if ((danger || deletes) && !(icon === 'ICONS.bin' && danger)) wrong.push(`${where}: ${icon || 'no icon'}${danger ? '' : ', not marked as a deletion'}`);
      }
      if (node.type === 'RegularElement' && node.name === 'button') {
        const words = keysIn(source.slice(node.start, node.fragment?.nodes?.[0]?.start ?? node.end));
        const drawn = (node.fragment?.nodes ?? []).filter((n) => n.type === 'HtmlTag').map((n) => source.slice(n.expression.start, n.expression.end));
        if (words.some(names) && drawn.length && !drawn.includes('ICONS.bin')) wrong.push(`${where}: a deletion drawn as ${drawn.join(', ')}`);
      }
      for (const key of Object.keys(node)) if (key !== 'parent' && node[key] && typeof node[key] === 'object') walk(node[key]);
    };
    walk(parse(source, { modern: true }).fragment);
    for (const m of source.matchAll(/\{ id: 'delete', icon: (ICONS\.\w+)(, danger: true)?/g)) if (m[1] !== 'ICONS.bin' || !m[2]) wrong.push(`${where}: an action row's delete draws ${m[1]}${m[2] ? '' : ', not marked as a deletion'}`);
  }
  assert.deepEqual(wrong, []);
  // A deletion stands on the dark red, under the pointer as well, above the buttons' own hover.
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8');
  assert.match(css, /\.icon-btn\.danger:not\([^{]*\{\s*color: #ffd4d4;\s*background: #5e1c22;/);
  assert.match(css, /\.icon-btn\.danger:is\(:hover, :focus-visible\)[^{]*\{\s*background: #7a222a;\s*border-color: #9a3a42;/);
  // On the canvas: the block's, the section's, the selection's and a template's deletions draw the same bin.
  const ENGINE = JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8')).engine;
  const edit = readFileSync(new URL(`../template/assets/engine/${ENGINE}/preview-edit.js`, import.meta.url), 'utf8');
  assert.match(edit, /deleteBtn\.innerHTML = BIN_SVG;/, 'the block\'s bar');
  assert.match(edit, /armedButton\(BIN_SVG, ta\('canvas\.deleteSection'\)/, 'the section\'s bar');
  assert.match(edit, /btn\(svg\(BIN_PATHS\), ta\('canvas\.deleteSelected'\)/, 'the selection\'s bar');
  assert.match(edit, /del\.className = 'urd-template-delete';\s*del\.innerHTML = BIN_SVG;/, 'a section template');
});
