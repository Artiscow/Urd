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
import { engineImport } from './_engine.mjs';

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

/** Words that name a removal on a button that removes nothing itself: the fold foot's chip that opens the list of added settings, the hint a greyed submenu row gives, «Discard drafts», which goes back to the published version, and the text bar's «Remove highlighting», a mark taken off the words as bold is. */
const NOT_A_DELETION = new Set(['menu.removeSetting', 'tip.collections.deleteSelectedNone', 'tip.discard', 'tt.hlNone']);
/** The admin's English words, so a button is read by what it says, a text that begins with Remove or Delete, as well as by its key's name. */
const EN_WORDS = (await engineImport('locales/admin/en-GB.js')).default.strings;

test('every deletion draws a bin on the dark red, in the admin and on the canvas, never the cross that closes things', () => {
  // In the admin: every button whose words name a removal or a deletion, an icon alone, words with it or a menu's row, draws ICONS.bin and is marked as a deletion (`danger`, or a class that names it); the action rows' deletions alike.
  const wrong = [];
  const keysIn = (text) => [...text.matchAll(/ta\('([\w.-]+)'/g)].map((m) => m[1]);
  const names = (key) => !NOT_A_DELETION.has(key) && (/delete|remove/i.test(key) || /^(remove|delete)\b/i.test(EN_WORDS[key] ?? ''));
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
        const whole = source.slice(node.start, node.end);
        if (keysIn(whole).some(names)) {
          const drawn = [...whole.matchAll(/\{@html ([^}]+)\}/g)].map((m) => m[1].trim());
          const cls = node.attributes.find((a) => a.name === 'class');
          const marked = /danger/.test(cls ? source.slice(cls.start, cls.end) : '');
          if (!drawn.includes('ICONS.bin') || !marked) wrong.push(`${where}: a deletion drawn as ${drawn.join(', ') || 'words alone'}${marked ? '' : ', not marked as a deletion'}`);
        }
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
  assert.match(edit, /if \(opts\.danger\) b\.insertAdjacentHTML\('beforeend', BIN_SVG\);/, 'the right-click menu\'s deletions');
  assert.match(readFileSync(new URL(`../template/assets/engine/${ENGINE}/color-picker.js`, import.meta.url), 'utf8'), /del\.innerHTML = BIN_SVG;/, 'a saved colour on the canvas');
  const base = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(base, /\.urd-preview \.urd-ctx-danger \{\s*color: #ffd4d4;\s*background: #5e1c22;/);
  assert.match(base, /\.urd-cp-del \{[^}]*background: #5e1c22;/);
});

test('a menu\'s rows answer the pointer at once, a submenu\'s row included, and a picture\'s thumbnail stands as tall as its picker', () => {
  const css = readFileSync(new URL('../editor/src/app.css', import.meta.url), 'utf8');
  assert.match(css, /:root :is\(\.tool-pop, \.tab-menu-list, \.cm-card, \.cm-sub, \.cap-pop\) :is\(button, a\):not\(:disabled\) \{\s*transition: none;/, 'no fade on a menu\'s rows');
  // The row whose submenu still stands goes dark as soon as the pointer is on another row of its list.
  assert.match(css, /\.tab-menu \.tab-menu-list:has\(button:hover\) button\.sub-open:not\(:hover\)[^{]*\{ background: transparent; \}/);
  const menu = readFileSync(new URL('../editor/src/panels/collections/CollectionMenu.svelte', import.meta.url), 'utf8');
  assert.match(menu, /\.cm-card:has\(> button:hover:not\(:disabled\)\) > \.cm-sub-on:not\(:hover\),\s*\.cm-sub:has\(> button:hover:not\(:disabled\)\) > \.cm-sub-on:not\(:hover\) \{\s*background: transparent;/);
  // The menu's logo and the footer's brand: the thumbnail square at its column's height.
  for (const file of ['panels/nav/NavLogo.svelte', 'panels/FooterPanel.svelte']) {
    assert.match(readFileSync(join(ROOT, file), 'utf8'), /<span class="logo-thumb" \{@attach squareBeside\}>/, file);
  }
  const square = readFileSync(join(ROOT, 'lib/square-beside.js'), 'utf8');
  assert.match(square, /const column = node\.nextElementSibling;/);
  assert.match(square, /new ResizeObserver\(fit\);\s*watch\.observe\(column\);/);
});

test('a colour is taken away by the bin on its swatch\'s corner, never by a reset beside it', () => {
  const setting = readFileSync(join(ROOT, 'lib/rows/Setting.svelte'), 'utf8');
  assert.match(setting, /coloured: \(\) => \{ row\.colour = true; \},/);
  assert.match(setting, /\{#if own && !row\.switch && !row\.colour && !inHead\}/, 'no reset beside a colour');
  const row = readFileSync(join(ROOT, 'lib/rows/ColourRow.svelte'), 'utf8');
  assert.match(row, /const row = ownsRow \? getContext\('setting-row'\) : null;\s*row\?\.coloured\(\);/, 'a colour that is its row\'s only control');
  // The box's border row holds the border's kind, colour and thickness: its colour leaves the row the reset for the whole border.
  assert.match(readFileSync(join(ROOT, 'menu/BoxStyle.svelte'), 'utf8'), /<ColourRow label=\{ta\('lbl\.borderColor'\)\}[^\n]*ownsRow=\{false\}/);
  assert.match(row, /onremove=\{row\?\.own\(\) \? row\.back : undefined\}/, 'a colour of the block\'s own goes back to the standard by its bin');
  const picker = readFileSync(join(ROOT, 'lib/ColorPicker.svelte'), 'utf8');
  assert.match(picker, /const remove = \$derived\(onremove \?\? \(allowClear && value \? \(\) => onchange\?\.\(''\) : null\)\);/, 'or empties a colour that may be empty');
  assert.match(picker, /\.cp-remove \{\s*position: absolute;\s*top: -6px;\s*right: -6px;/, 'on the swatch\'s top right corner');
});

test('a fold the owner opens, a «+ Add a setting» list and a card just added are followed into view as they open', () => {
  const follow = readFileSync(join(ROOT, 'lib/follow-open.js'), 'utf8');
  assert.match(follow, /const by = Math\.min\(box\.bottom - \(view\.bottom - EDGE\), box\.top - \(view\.top \+ top\)\);/, 'as far as its foot needs, no further than its top allows');
  assert.match(follow, /const OWNER = \['wheel', 'touchstart', 'pointerdown', 'keydown'\];/, 'the owner\'s own scroll or press stops it');
  const fold = readFileSync(join(ROOT, 'lib/rows/Fold.svelte'), 'utf8');
  assert.match(fold, /<summary title=\{tip\} onclick=\{\(e\) => \{ const fold = e\.currentTarget\.parentElement; if \(!fold\.open && !fold\.closest\('\.emenu-search'\)\) followOpen\(fold\); \}\}>/, 'a fold opened by its heading, not by a choice or a tool');
  assert.equal((fold.match(/followOpen\(extraPop\?\.closest\('\.menu-group-foot'\)\)/g) ?? []).length, 2, 'the list opened by a press and by a resting mouse');
  const card = readFileSync(join(ROOT, 'lib/rows/Capability.svelte'), 'utf8');
  assert.match(card, /followOpen\(cardEl\);/, 'a card just added');
});
