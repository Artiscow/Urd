/**
 * The editor's raw markup ({@html} in editor/src): Svelte writes such markup into the admin unescaped, so a value the owner or a feed wrote there would run as markup.
 * Every {@html} draws a constant (a name of CONSTANTS such as ICONS.x, a lookup in one, a choice between them or a fallback to one), or stands in the list below with what it draws.
 * A new {@html} of anything else fails here until it has been checked and listed.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../editor/src/', import.meta.url));

/** The raw markup that is no constant, by file and expression, each with what it draws. */
const DRAWN = [
  ['lib/CanvasBar.svelte', 'tool.html', 'the drawing of a tool on the canvas bar, the canvas button\'s own markup sent by the canvas (toolOf in preview-edit.js)'],
  ['lib/CanvasBar.svelte', 'step.icon', 'an ICONS drawing chosen for a size step'],
  ['lib/DesignPicker.svelte', 'source.thumb(d.id)', 'a design\'s picture, drawn by its design source (design-sources.js)'],
  ['lib/GlyphPicker.svelte', 'iconSvg(icon)', 'an icon of the engine\'s set by its id (icons.js), null for any other id'],
  ['lib/GlyphPicker.svelte', 'iconSvg(id)', 'an icon of the engine\'s set by its id'],
  ['lib/GlyphPicker.svelte', 'blank', 'a drawing handed in by the picker\'s caller'],
  ['lib/MarkPicker.svelte', 'iconSvg(icon)', 'an icon of the engine\'s set by its id'],
  ['lib/MarkPicker.svelte', 'iconSvg(id)', 'an icon of the engine\'s set by its id'],
  ['lib/SavedRows.svelte', "doc ? pageThumb(doc, { w: 34, h: 42, max: 4 }) : (PART_KINDS[row.kind]?.icon ?? '')", 'a page\'s schematic picture, its colours checked (preset-thumb.js safeColor), or a kind\'s ICONS drawing'],
  ['lib/TextToolbar.svelte', 'icon', 'an ICONS drawing of the text bar\'s own tools'],
  ['lib/rows/CardList.svelte', 'c.icon', 'a drawing handed in by the list\'s caller'],
  ['lib/rows/IconButton.svelte', 'icon', 'a drawing handed in by the button\'s caller'],
  ['menu/FloatingMenu.svelte', 'onlyIcon', 'the drawing of the group the menu shows alone, from the engine\'s bar tools (BAR_ICONS in bar-tools.js)'],
  ['menu/families/Calendar.svelte', "iconSvg(selectedBlock.props.emptyIcon ?? 'calendar') || iconSvg('calendar')", 'an icon of the engine\'s set by the id the calendar keeps'],
  ['menu/families/Share.svelte', "iconSvg(link.icon) || ''", 'an icon of the engine\'s set by the id the link keeps'],
  ['panels/BlocksPanel.svelte', 'def.picture', 'a block\'s drawing from the block palette (PALETTE_KINDS in block-palette.js)'],
  ['panels/PagesPanel.svelte', 'pageThumb({ sections: [] })', 'the empty page\'s schematic picture'],
  ['panels/PagesPanel.svelte', 'builtinPageThumbs[p.id]', 'the schematic pictures of Urd\'s own page templates'],
  ['panels/PagesPanel.svelte', 'pageThumb(templateStores[id].data.page)', 'a saved page template\'s schematic picture, its colours checked'],
  ['panels/nav/NavLauncher.svelte', "iconSvg(siteDraft.nav.launcher.icon) || ''", 'an icon of the engine\'s set by the id the menu keeps'],
  ['panels/nav/NavLauncher.svelte', "iconSvg(link.icon) || ''", 'an icon of the engine\'s set by the id the link keeps'],
  ['panels/nav/NavScroll.svelte', "iconSvg(siteDraft.nav.tab.icon) || ''", 'an icon of the engine\'s set by the id the menu keeps'],
  ['panels/phone/PhoneOrder.svelte', 'icon', 'an ICONS drawing chosen for a row'],
  ['section/PhoneSectionRows.svelte', 'rowPicture(shape)', 'a phone layout\'s picture from the constant shapes (ROW_PICTURES)'],
  ['settings/SettingControl.svelte', 'settingPicture(setting.look, id)', 'a setting\'s picture from the editor\'s own drawings'],
  ['shell/DraftsWindow.svelte', "doc ? pageThumb(doc, { w: 34, h: 42, max: 4 }) : (PART_KINDS[part.kind]?.icon ?? '')", 'a page\'s schematic picture, its colours checked, or a kind\'s ICONS drawing'],
  ['shell/UndoButtons.svelte', 'l.icon', 'the ICONS drawing of a step\'s kind'],
];

/** The upper-case names {@html} draws, each a constant of the editor's drawings or icon tables; a name added here is a drawing checked to hold no value. */
const CONSTANTS = new Set([
  'BACK', 'BURGER_TILE_ICONS', 'CAP_ICONS', 'CARET', 'CHECK', 'CHEV', 'CHEV_ICON', 'CLEAR', 'DESC_ICON', 'GLOBE', 'GLYPH', 'GRIP', 'GRIP_ICON', 'GROUP_ICONS',
  'HL_A', 'ICONS', 'INDENT', 'KINDS', 'LAUNCHER_DOTS', 'LAUNCHER_VIEW_ICONS', 'LINK', 'LOCK', 'MINUS', 'NAV_BORDER_ICONS', 'NAV_VARIANT_ICONS', 'NEXT',
  'NEXT_ICON', 'OL', 'OUTDENT', 'PALETTE', 'PART_KINDS', 'PILL_ICON', 'PLUS', 'QUOTE', 'RIBBON_SEP_ICONS', 'SPACING', 'SUB', 'SUB_ICON', 'SUB_STYLE_ICONS',
  'SUP', 'UL', 'UNLOCK', 'WAY_ICONS',
]);

/** Whether a file binds a name to a value of its run (a $state, a $derived, a prop, or an {@const}), which a name of CONSTANTS must never be there. */
const boundAtRuntime = (text, name) => new RegExp(`\\b${name}\\s*=\\s*\\$(state|derived|props)\\b|\\{@const\\s+${name}\\b|let\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*=\\s*\\$props`).test(text);

/** An expression split at its first top-level `op`, outside brackets, parentheses and strings. */
function splitTop(expr, op) {
  let depth = 0;
  let quote = null;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (depth === 0 && expr.startsWith(op, i) && !(op === '?' && (expr[i + 1] === '?' || expr[i + 1] === '.' || expr[i - 1] === '?'))) return [expr.slice(0, i), expr.slice(i + op.length)];
  }
  return null;
}

/**
 * Whether markup is a constant: a name `known` takes with lookups only, a choice between constants, or a constant falling back to another or to nothing.
 * @param {string} expr
 * @param {(name: string) => boolean} known
 */
function isConstant(expr, known) {
  const e = expr.trim();
  if (e === "''" || e === '""') return true;
  const fallback = splitTop(e, '??');
  if (fallback) return isConstant(fallback[0], known) && isConstant(fallback[1], known);
  const choice = splitTop(e, '?');
  if (choice) {
    const sides = splitTop(choice[1], ':');
    return Boolean(sides) && isConstant(sides[0], known) && isConstant(sides[1], known);
  }
  const head = e.match(/^[A-Z][A-Z0-9_]*(?![\w$])/);
  if (!head || !known(head[0])) return false;
  let rest = e.slice(head[0].length);
  while (rest.length) {
    const prop = rest.match(/^\??\.[A-Za-z_$][\w$]*/);
    if (prop) {
      rest = rest.slice(prop[0].length);
      continue;
    }
    const open = rest.match(/^(\?\.)?\[/);
    if (!open) return false;
    let depth = 0;
    let i = open[0].length - 1;
    for (; i < rest.length; i++) {
      if (rest[i] === '[') depth++;
      else if (rest[i] === ']' && --depth === 0) break;
    }
    if (i >= rest.length) return false;
    rest = rest.slice(i + 1);
  }
  return true;
}

/** Every {@html} in the editor's components, by file and expression, with the file's text; the tag may have room after its brace (`{ @html x }`). */
function rawMarkup() {
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, e.name);
      if (e.isDirectory()) walk(path);
      else if (path.endsWith('.svelte')) files.push(path);
    }
  };
  walk(SRC);
  const uses = [];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const tag of text.matchAll(/\{\s*@html\b/g)) {
      let depth = 0;
      let j = tag.index;
      for (; j < text.length; j++) {
        if (text[j] === '{') depth++;
        else if (text[j] === '}' && --depth === 0) break;
      }
      uses.push([relative(SRC, file), text.slice(tag.index + tag[0].length, j).trim().replace(/\s+/g, ' '), text]);
    }
  }
  return uses;
}

test('the rule tells a constant from a value', () => {
  const known = (name) => CONSTANTS.has(name);
  for (const e of ['ICONS.bin', 'ICONS[name]', 'ICONS[GROUP_ICONS[group.id]] ?? \'\'', 'KINDS[part.kind].icon', 'PART_KINDS[row.kind]?.icon ?? \'\'', 'open ? ICONS.up : ICONS.down', 'ICONS[step.icon] ?? ICONS.pencil']) assert.ok(isConstant(e, known), e);
  for (const e of ['icon', 'def.picture', 'iconSvg(id)', 'text', 'ICONS.bin + label', 'open ? ICONS.up : label', 'ICONS[a] ?? name', 'Icons.bin', 'BLOCK_LABELS[type]', 'ICONSX', 'ICON']) assert.ok(!isConstant(e, known), e);
  assert.ok(boundAtRuntime('const KINDS = $derived([1]);', 'KINDS'));
  assert.ok(boundAtRuntime('{@const ICON = block.props.svg}', 'ICON'));
  assert.ok(boundAtRuntime('let { GRIP, other } = $props();', 'GRIP'));
  assert.ok(!boundAtRuntime('const KINDS = PART_KINDS;', 'KINDS'));
});

test('every {@html} in the editor draws a constant or what its listing names, and the listing holds nothing that has gone', () => {
  const uses = rawMarkup();
  assert.ok(uses.length > 200, 'the raw markup is found');
  const listed = new Set(DRAWN.map(([file, expr]) => `${file} :: ${expr}`));
  const values = uses.filter(([, expr, text]) => !isConstant(expr, (name) => CONSTANTS.has(name) && !boundAtRuntime(text, name))).map(([file, expr]) => `${file} :: ${expr}`);
  const drawnNames = new Set(uses.flatMap(([, expr]) => [...expr.matchAll(/(?<![\w$.])[A-Z][A-Z0-9_]*(?![\w$])/g)].map((m) => m[0])));
  assert.deepEqual([...CONSTANTS].filter((name) => !drawnNames.has(name)), [], 'a constant no {@html} draws any longer');
  assert.deepEqual(values.filter((use) => !listed.has(use)), [], 'raw markup of a value not checked and listed');
  assert.deepEqual([...listed].filter((use) => !values.includes(use)), [], 'listed, but no longer in the code');
  for (const [, , what] of DRAWN) assert.ok(what.length > 10, 'each listing says what it draws');
});
