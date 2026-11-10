/**
 * The bar where every group is a tool (bar-tools.js): every group it names is a fold its block's family draws (editor/src/menu/families/*.svelte), with the same title, and every group a section's bar names is one of the section's menu; a group drawn in some states only is a tool in those states only; each tool's name is in the three core dictionaries and its drawing in the engine's set; and the editor opens exactly the groups the bar asks for (lib/only-group.js).
 * The bar's choices the engine reads (BAR_CHOICES) are the keys and options the editor writes as parts of the admin designs, and urd.js draws the bars anew on each of them.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { register } from 'node:module';
import { engineImport } from './_engine.mjs';
register('./_svelte-loader.mjs', import.meta.url);

const { BAR_GROUPS, SECTION_TOOLS, BAR_CHOICES, TOOL_FORMS, AREA_LOOKS, BAR_ICONS, barTools, isBarOnly } = await engineImport('bar-tools.js');
const { onlyOf } = await import('../editor/src/lib/only-group.js');
const { capability } = await import('../editor/src/menu/capabilities.js');
const ENGINE = JSON.parse(readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8')).engine;
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const family = (type) => read(`../editor/src/menu/families/${type === 'map' ? 'Fields' : type[0].toUpperCase() + type.slice(1)}.svelte`);
/** The folds a source draws, by id, with their title keys. */
const foldsIn = (source) => new Map([...source.matchAll(/<Fold id="([^"]+)"[^>]*?title=\{ta\('([^']+)'\)/gs)].map((m) => [m[1], m[2]]));

/** What stands first in a source after a marker: the rest of the source from there, past white space, comments and `{@const}` tags, read with plain string steps. */
function firstAfter(source, marker) {
  const at = source.indexOf(marker);
  if (at < 0) return '';
  let rest = source.slice(at + marker.length);
  for (;;) {
    rest = rest.trimStart();
    const end = rest.startsWith('<!--') ? rest.indexOf('-->') + 3 : rest.startsWith('{@const ') ? rest.indexOf('}') + 1 : 0;
    if (end <= 0) return rest;
    rest = rest.slice(end);
  }
}

/** The folds a source draws under a condition other than the menu's area, by id, with that condition; a fold drawn for each item of a list counts as drawn under one. */
function conditionalFolds(source) {
  const found = new Map();
  const blocks = [];
  const isArea = (cond) => /^area\s*===\s*'[a-z]+'$/.test(cond);
  for (const m of source.matchAll(/\{#if\s+([^}]*)\}|\{:else if\s+([^}]*)\}|\{:else\}|\{\/if\}|\{#each\b[^}]*\}|\{\/each\}|<Fold id="([^"]+)"/g)) {
    const token = m[0];
    if (token.startsWith('{#if')) blocks.push({ conds: [m[1].trim()], otherwise: false });
    else if (token.startsWith('{:else if')) blocks.at(-1).conds.push(m[2].trim());
    else if (token === '{:else}') blocks.at(-1).otherwise = true;
    else if (token === '{/if}' || token === '{/each}') blocks.pop();
    else if (token.startsWith('{#each')) blocks.push({ each: true });
    else {
      const under = blocks.find((b) => b.each || (b.otherwise ? b.conds.some((c) => !isArea(c)) : !isArea(b.conds.at(-1))));
      if (under) found.set(m[3], under.each ? 'each' : under.conds.join(' / '));
    }
  }
  return found;
}

test('every group on a block\'s bar is a fold its family draws, under the same title, or a capability\'s card it draws', () => {
  for (const [type, tools] of Object.entries(BAR_GROUPS)) {
    const source = family(type);
    const folds = foldsIn(source);
    // A capability's card carries its id as a fold does, and its title is the capability's own (menu/capabilities.js, ADR-0031).
    const cards = new Set([...source.matchAll(/<Capability id="([^"]+)"/g)].map((m) => m[1]));
    for (const tool of tools.filter((t) => t.only.startsWith('fold:'))) {
      const id = tool.only.slice(5);
      if (cards.has(id)) {
        assert.ok(capability(id), `${type}: the card «${id}» is no capability in the catalogue`);
        continue;
      }
      assert.ok(folds.has(id), `${type}: no fold «${id}» in its family`);
      assert.equal(folds.get(id), tool.labelKey, `${type}: «${id}» is titled ${folds.get(id)}`);
    }
    // Every fold the family draws is a tool, so no group is left off the bar; a group drawn in some states only carries its condition.
    const listed = new Set(tools.map((t) => t.only.slice(5)));
    for (const id of folds.keys()) assert.ok(listed.has(id), `${type}: the fold «${id}» has no tool`);
  }
});

test('a group the menu draws in some states only is a tool in those states only', () => {
  for (const [type, tools] of Object.entries(BAR_GROUPS)) {
    for (const [id, cond] of conditionalFolds(family(type))) {
      // A family shared by several types draws a type's own groups for that type alone, which its bar already is.
      if (cond === `selectedBlock.type === '${type}'`) continue;
      assert.ok(tools.find((t) => t.only === `fold:${id}`)?.when, `${type}: «${id}» is drawn only when ${cond}, but its tool stands always`);
    }
  }
  // A section's tools carry no condition, so its menu draws each of its groups always.
  assert.deepEqual([...conditionalFolds(read('../editor/src/section/SectionMenu.svelte')).keys()], []);
  const ids = (type, props) => barTools(type, { block: { props } }).map((t) => t.only);
  assert.ok(!ids('faq', { variant: 'list' }).includes('fold:faq-card') && ids('faq', { variant: 'cards' }).includes('fold:faq-card'));
});

test('the engine reads the bar\'s choices under the keys and with the options the editor writes', async () => {
  const { PARTS } = await import('../editor/src/lib/admin-designs.js');
  const forms = await import('../editor/src/menu/forms.js');
  const partOf = { form: 'toolbar', look: 'toolbarLook', gear: 'toolbarGear', phone: 'toolbarPhone', size: 'toolbarSize', design: 'toolbarDesign' };
  for (const [choice, { key, options }] of Object.entries(BAR_CHOICES)) {
    const part = PARTS.find((p) => p.id === partOf[choice]);
    assert.equal(part?.key, key, choice);
    assert.deepEqual(part.options, options, choice);
  }
  assert.deepEqual(TOOL_FORMS, forms.TOOL_FORMS);
  assert.deepEqual(Object.keys(AREA_LOOKS), forms.AREA_LOOKS);
  for (const plain of Object.values(AREA_LOOKS)) assert.ok(BAR_CHOICES.look.options.includes(plain) && !AREA_LOOKS[plain], plain);
  // urd.js draws the bars anew when any of them changes in the editor, which shares the storage.
  const urd = read(`../template/assets/engine/${ENGINE}/urd.js`);
  const watched = urd.match(/if \(\[([^\]]*)\]\.includes\(event\.key\)/)?.[1].match(/'[^']+'/g)?.map((s) => s.slice(1, -1)) ?? [];
  assert.deepEqual(watched.sort(), Object.values(BAR_CHOICES).map((c) => c.key).sort());
});

test('the design button opens the small window or the picker as «Design button on the bar» asks, and the small window finds the design row where it stands', () => {
  const edit = read(`../template/assets/engine/${ENGINE}/preview-edit.js`);
  const start = edit.indexOf('function openBlockDesign(');
  const open = edit.slice(start, edit.indexOf('\n}\n', start));
  assert.match(open, /!phone && barChoice\(BAR_CHOICES\.design\) === 'small'/);
  assert.match(open, /openBlockTool\(el, section, block, 'look:design'/);
  assert.match(open, /type: 'urd-block-design'/);
  // lib/only-group.js keeps `look:design` among the Style area's own children: the design row stands first in the area, in no group.
  const menuStyle = firstAfter(read('../editor/src/menu/ElementMenu.svelte'), '{#snippet menuStyle()}');
  assert.ok(menuStyle.startsWith('{#if designs}'), 'the Style area opens on the block\'s designs');
  assert.match(firstAfter(menuStyle, '{#if designs}'), /^<Setting pin="design"[\s>]/, 'the design row stands first in the Style area');
  assert.match(firstAfter(read('../editor/src/menu/families/Calendar.svelte'), "{:else if area === 'style'}"), /^<Setting pin="design"[\s>]/, 'the calendar\'s design row stands first in its Style area');
});

test('every group on a section\'s bar is a fold of the section\'s menu, and every fold is a tool', () => {
  const folds = foldsIn(read('../editor/src/section/SectionMenu.svelte'));
  for (const tool of SECTION_TOOLS) assert.equal(folds.get(tool.only.slice(5)), tool.labelKey, tool.only);
  assert.deepEqual([...folds.keys()].sort(), SECTION_TOOLS.map((t) => t.only.slice(5)).sort());
});

test('a block\'s bar ends in its motion and its placement, with its design first in Style where it has designs', async () => {
  const tools = barTools('image', { designs: true });
  assert.deepEqual(tools.slice(-2).map((t) => t.only), ['fold:motion', 'area:placement']);
  const design = tools.findIndex((t) => t.design);
  assert.ok(design > tools.findIndex((t) => t.area === 'content' && !t.design) && tools[design + 1].area === 'style');
  assert.deepEqual(barTools('a-plugin-block').map((t) => t.only), ['area:content', 'area:style', 'fold:motion', 'area:placement'], 'a block type not listed has its areas');
  assert.ok(!barTools('text').some((t) => t.design));
  // A group drawn in some states only is a tool in those states alone.
  const ids = (type, props) => barTools(type, { block: { props } }).map((t) => t.only);
  assert.ok(ids('shape', { kind: 'line' }).includes('loose:content') && !ids('shape', { kind: 'circle' }).includes('loose:content'));
  const { CAL_DESIGNS } = await engineImport('calendar-designs.js');
  const withNotice = CAL_DESIGNS.find((d) => d.notice);
  const without = CAL_DESIGNS.find((d) => !d.notice);
  assert.ok(withNotice && without, 'the designs hold both kinds');
  assert.ok(ids('calendar', { design: withNotice.id }).includes('fold:cal-notice'));
  assert.ok(!ids('calendar', { design: without.id }).includes('fold:cal-notice'));
});

test('every tool\'s name is in the core dictionaries, and its drawing in the engine\'s set', async () => {
  const tools = [...Object.keys(BAR_GROUPS).flatMap((type) => barTools(type, { designs: true })), ...SECTION_TOOLS];
  for (const lang of ['en-GB', 'nb', 'tr']) {
    const dict = (await engineImport(`locales/admin/${lang}.js`)).default.strings;
    for (const tool of tools) assert.ok(dict[tool.labelKey], `${lang} lacks ${tool.labelKey}`);
  }
  for (const tool of tools) assert.match(BAR_ICONS[tool.icon] ?? '', /^<svg [^>]*aria-hidden="true">/, `no drawing «${tool.icon}»`);
});

test('no bar draws two of its tools alike, the shared design, motion and placement tools included, and no two drawings are the same', () => {
  const twice = (icons) => icons.filter((icon, i) => icons.indexOf(icon) !== i);
  for (const [type, groups] of Object.entries(BAR_GROUPS)) {
    assert.deepEqual(twice([...groups.map((g) => g.icon), 'design', 'motion', 'arrange']), [], `${type}'s bar`);
  }
  assert.deepEqual(twice(SECTION_TOOLS.map((g) => g.icon)), [], 'the section\'s bar');
  assert.deepEqual(twice(Object.values(BAR_ICONS)), [], 'each name its own drawing');
});

test('the small window a tool opens names it with the tool\'s own drawing, sent by name and drawn from the same set', () => {
  const edit = read(`../template/assets/engine/${ENGINE}/preview-edit.js`);
  assert.ok(!/const BAR_ICONS = \{/.test(edit), 'the bar draws from the set in bar-tools.js');
  for (const fn of ['openBlockTool', 'openSectionTool']) {
    const start = edit.indexOf(`function ${fn}(`);
    assert.match(edit.slice(start, edit.indexOf('\n}\n', start)), /only, title, icon, rect/, `${fn} sends the drawing's name`);
  }
  const page = read('../editor/src/state/page.svelte.js');
  assert.match(page, /Object\.hasOwn\(BAR_ICONS, msg\.icon\)/, 'the editor takes only a name from the set');
  assert.match(read('../editor/src/menu/FloatingMenu.svelte'), /BAR_ICONS\[pos\.icon\]/);
});

test('a press on a bar button that opens the menu leaves the menu standing to the message after it', () => {
  const edit = read(`../template/assets/engine/${ENGINE}/preview-edit.js`);
  // The gear, the design button and the section's gear are marked.
  for (const fn of ['menuButton', 'designButton']) {
    const start = edit.indexOf(`function ${fn}(`);
    assert.match(edit.slice(start, edit.indexOf('\n}\n', start)), /return opensMenu\(btn\);/, fn);
  }
  assert.match(edit, /opensMenu\(gear\);/, 'the section\'s gear');
  // Every tool that opens a small window is marked.
  const tools = [...edit.matchAll(/barButton\([^\n]*open(?:Block|Section)Tool\(/g)];
  assert.ok(tools.length >= 5, 'the block\'s and the section\'s tools are found');
  for (const m of tools) assert.equal(edit.slice(m.index - 10, m.index), 'opensMenu(', edit.slice(m.index, m.index + 80));
  // The editor's listener on the preview closes the menu at any other press only.
  assert.match(read('../editor/src/state/preview.svelte.js'), /if \(pageState\.blockMenu && !event\.target\?\.closest\?\.\('\[data-opens-menu\]'\)\) pageState\.blockMenu = null;/);
});

test('the editor opens exactly what the bar asks for', () => {
  for (const tool of [...Object.keys(BAR_GROUPS).flatMap((type) => barTools(type)), ...SECTION_TOOLS].filter((t) => t.only)) {
    assert.ok(isBarOnly(tool.only), tool.only);
    assert.equal(onlyOf(tool.only), tool.only);
  }
  // The design button opens the block's design alone where «Designs» puts the pictures in place.
  assert.ok(isBarOnly('look:design'));
  assert.equal(onlyOf('look:design'), 'look:design');
  assert.equal(onlyOf('look:other'), null);
  assert.equal(onlyOf('motion'), 'fold:motion');
  assert.equal(onlyOf('placement'), 'area:placement');
  for (const bad of ['fold:', 'area:nowhere', 'loose:placement', 'fold:a b', '<x>', null]) {
    assert.equal(onlyOf(bad), null, String(bad));
    assert.ok(!isBarOnly(bad), String(bad));
  }
});

test('a block\'s help chip is its bar\'s last tool, so a bar wider than its block never stands over it', () => {
  const hint = read(`../template/assets/engine/${ENGINE}/hint.js`);
  assert.match(hint, /const bar = host\.querySelector\(':scope > \.urd-edit-toolbar > \.urd-bar-body'\);\s*\(bar \?\? host\)\.appendChild\(chip\);/, 'a chip drawn after the bar goes into it');
  const edit = read(`../template/assets/engine/${ENGINE}/preview-edit.js`);
  assert.match(edit, /const hintChip = el\.querySelector\(':scope > \.urd-hint-chip'\);\s*if \(hintChip\) barBody\.appendChild\(hintChip\);\s*el\.appendChild\(toolbar\);/, 'a chip drawn before the bar is taken in, after the bar\'s last tool');
  assert.match(hint, /\.urd-edit-toolbar \.urd-bar-body > \.urd-hint-chip \{\s*position: static; transform: none; width: auto;\s*opacity: 1; pointer-events: auto;/, 'standing in the bar\'s row, at the bar\'s size');
});
