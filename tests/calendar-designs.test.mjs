/**
 * Contract tests for the calendar block's design model (calendar-designs.js):
 * the design look-up, the colour slots, the edge stripe, the field styles and
 * the static texts, plus the dictionary keys every design points at. DOM
 * rendering is tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const {
  CAL_DESIGNS, CAL_VIEWS, CAL_FIELDS, CAL_TEXTS, CAL_SIZE, CAL_MODULES,
  CAL_SWITCH_VIEWS, calSwitcher, calFolds, calProgramHref, CAL_OPTIONS, calOptionDefs, calOptions, CAL_SCALE, calScale, calDesignGroups, calDesign, calView, calColorCss, calSlotVars, calStripe, calFieldCss, calHasTextOverrides,
  CAL_PLURAL_TEXTS, CAL_CONTENT_TEXTS, CAL_HINT_TEXTS, CAL_TEXT_PARAMS, calTextSlot, calBlankHtml, calTextValue, calSplitTokens, calResetTexts,
  CAL_SETS, CAL_SWITCH_WEEKS, CAL_SWITCH_MONTHS, calSwitcherViews, calDescription, calHasExcerpt,
} = await engineImport('calendar-designs.js');
import { readFileSync } from 'node:fs';

const plain = CAL_DESIGNS[0];
const { calendarThumb, CAL_THUMB_IDS } = await engineImport('calendar-thumb.js');

test('calDesign: the plain design first, and for an unknown or missing id', () => {
  assert.equal(plain.id, 'plain');
  assert.equal(calDesign(undefined), plain);
  assert.equal(calDesign('no-such-design'), plain);
  for (const design of CAL_DESIGNS) assert.equal(calDesign(design.id), design);
});

test('every design has a label key, slots with label keys, known texts and a view in the list or none', () => {
  for (const design of CAL_DESIGNS) {
    assert.match(design.labelKey, /^calendar\.design\./);
    assert.ok(design.view === null || CAL_VIEWS.includes(design.view), `${design.id}: view ${design.view}`);
    assert.equal(typeof design.stripe, 'boolean');
    for (const slot of design.slots) assert.equal(slot.labelKey, `calendar.slot.${slot.key}`);
    for (const key of design.texts) assert.ok(key in CAL_TEXTS, `${design.id}: text ${key}`);
    if (design.module) assert.ok(CAL_MODULES.includes(design.module), `${design.id}: module ${design.module}`);
    // A design with a renderer module fixes its view; the plain one, drawn by the block, follows the block's view.
    assert.equal(Boolean(design.module), design.view !== null, `${design.id}: module and view go together`);
  }
  assert.ok(CAL_DESIGNS.length > 1);
});

test('every renderer module exports a function per design that names it', async () => {
  for (const module of CAL_MODULES) {
    const mod = await engineImport(`blocks/calendar-${module}.js`);
    for (const design of CAL_DESIGNS.filter((d) => d.module === module)) {
      assert.equal(typeof mod[design.id], 'function', `${design.id} in calendar-${module}.js`);
    }
  }
});

test('calView: the plain design follows the block view, with the list for anything unknown', () => {
  assert.equal(calView({ view: 'month' }), 'month');
  assert.equal(calView({ view: 'next' }), 'next');
  assert.equal(calView({ view: 'posters' }), 'list');
  assert.equal(calView({}), 'list');
  assert.equal(calView({ design: 'no-such-design', view: 'cards' }), 'cards');
});

test('calColorCss: hex as it is, a theme token as its variable, anything else null', () => {
  assert.equal(calColorCss('#abc'), '#abc');
  assert.equal(calColorCss('#A1B2C3'), '#A1B2C3');
  assert.equal(calColorCss('#a1b2c3d4'), '#a1b2c3d4');
  assert.equal(calColorCss('accent'), 'var(--urd-color-accent)');
  assert.equal(calColorCss('accent-text'), 'var(--urd-color-accent-text)');
  assert.equal(calColorCss('red; background: url(x)'), null);
  assert.equal(calColorCss('url(x)'), null);
  assert.equal(calColorCss(''), null);
  assert.equal(calColorCss(12), null);
});

test('calSlotVars: one variable per set and valid slot of the design, nothing for the rest', () => {
  assert.deepEqual(calSlotVars(plain, undefined), {});
  assert.deepEqual(calSlotVars(plain, { accent: '#ff6b4a', surface: 'bg', chip: 'nope;', unknown: '#000' }), {
    '--urd-cal-s-accent': '#ff6b4a',
    '--urd-cal-s-surface': 'var(--urd-color-bg)',
  });
});

test('calStripe: the design decides until the owner does, and the colour counts only when the stripe is on', () => {
  assert.deepEqual(calStripe(plain, undefined), { show: plain.stripe, color: null });
  assert.deepEqual(calStripe(plain, { show: true }), { show: true, color: null });
  assert.deepEqual(calStripe(plain, { show: true, color: 'accent' }), { show: true, color: 'var(--urd-color-accent)' });
  assert.deepEqual(calStripe(plain, { show: false, color: '#123456' }), { show: false, color: null });
  assert.deepEqual(calStripe({ ...plain, stripe: true }, { color: 'bad value' }), { show: true, color: null });
});

test('calFieldCss: only the set and valid parts are written', () => {
  assert.deepEqual(calFieldCss(undefined), {});
  assert.deepEqual(calFieldCss({ font: "Georgia, 'Times New Roman', serif", size: 18, bold: true, italic: true, underline: true, color: 'accent' }), {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: '18px',
    fontWeight: '700',
    fontStyle: 'italic',
    textDecoration: 'underline',
    color: 'var(--urd-color-accent)',
  });
  assert.deepEqual(calFieldCss({ bold: false }), { fontWeight: '400' });
  assert.deepEqual(calFieldCss({ size: CAL_SIZE.max + 1 }), {});
  assert.deepEqual(calFieldCss({ size: CAL_SIZE.min - 1 }), {});
  assert.deepEqual(calFieldCss({ size: '20' }), { fontSize: '20px' });
  assert.deepEqual(calFieldCss({ font: 'x; background: url(y)' }), {});
  assert.deepEqual(calFieldCss({ italic: 'yes', underline: 0, color: 'url(x)' }), {});
});

test('calBlankHtml: what an emptied editable text leaves holds no words', () => {
  for (const blank of [undefined, null, false, '', '   ', '&nbsp;', '&#160;', '<br>', '<div><br></div>', '<b></b> ']) assert.equal(calBlankHtml(blank), true, String(blank));
  for (const words of ['<b>Neste</b>', 'x', '{n}']) assert.equal(calBlankHtml(words), false, words);
  // Linear on markup that never closes.
  assert.equal(calBlankHtml('<'.repeat(20000)), false);
});

test('calTextValue: the owner\'s words, a removed content line, or the default', () => {
  assert.equal(calTextValue(undefined, 'next'), null);
  assert.equal(calTextValue({ next: '   ' }, 'next'), null);
  assert.equal(calTextValue({ next: '<br>' }, 'next'), null, 'an emptied word is the default again');
  assert.equal(calTextValue({ next: '<b>Neste</b>' }, 'next'), '<b>Neste</b>');
  assert.equal(calTextValue({ series: false }, 'series'), false, 'a content line the owner removed');
  assert.equal(calTextValue({ next: false }, 'next'), null, 'false means nothing on a word that is not content');
  assert.equal(calTextValue({ 'inDays.other': 'Om {n} netter' }, 'inDays', 'other'), 'Om {n} netter');
  assert.equal(calTextValue({ 'inDays.other': 'Om {n} netter' }, 'inDays', 'one'), null, 'each plural form has its own words');
  assert.equal(calTextValue({ unitDays: 'døgn' }, 'unitDays', 'one'), 'døgn', 'words written before the text had forms count for every form');
  assert.equal(calTextValue({ unitDays: 'døgn', 'unitDays.one': 'døgnet' }, 'unitDays', 'one'), 'døgnet');
});

test('calTextSlot and calSplitTokens: the slot a text is stored under, and its placeholders', () => {
  assert.equal(calTextSlot('count', 'other'), 'count.other');
  assert.equal(calTextSlot('next', 'other'), 'next');
  assert.equal(calTextSlot('count'), 'count');
  assert.deepEqual(calSplitTokens('Om {n} dager', ['n']), ['Om ', { name: 'n' }, ' dager']);
  assert.deepEqual(calSplitTokens('Vis alle {n} ({m} til)', ['n', 'm']), ['Vis alle ', { name: 'n' }, ' (', { name: 'm' }, ' til)']);
  assert.deepEqual(calSplitTokens('{d}d {h}t', ['d', 'h', 'm']), [{ name: 'd' }, 'd ', { name: 'h' }, 't']);
  assert.deepEqual(calSplitTokens('Om {x} dager', ['n']), ['Om {x} dager'], 'a placeholder the text does not have stays words');
  assert.deepEqual(calSplitTokens('', ['n']), []);
});

test('calHasTextOverrides and calResetTexts: rewrites and removed lines count, the announcement\'s own words are kept', () => {
  const apSeries = calDesign('apSeries');
  assert.equal(calHasTextOverrides(plain, undefined), false);
  assert.equal(calHasTextOverrides(plain, { next: '' }), false);
  assert.equal(calHasTextOverrides(plain, { later: 'Siden' }), true);
  assert.equal(calHasTextOverrides(plain, { 'inDays.other': 'Om {n} netter' }), true, 'a plural form counts');
  assert.equal(calHasTextOverrides(apSeries, { series: false }), true, 'a removed line counts');
  assert.equal(calHasTextOverrides(apSeries, { noticeTitle: 'Stengt i høstferien' }), false, 'the announcement is the owner\'s own text, not a rewrite');
  assert.equal(calResetTexts({ later: 'Siden', series: false }), undefined);
  assert.deepEqual(calResetTexts({ later: 'Siden', noticeTitle: 'Stengt', noticeText: '<br>' }), { noticeTitle: 'Stengt' });
});

test('every design with an announcement lists its words, «Read it all» on a cut text included', () => {
  const noticed = CAL_DESIGNS.filter((design) => design.notice);
  assert.ok(noticed.length >= 3);
  for (const design of noticed) {
    for (const key of ['noticeLabel', 'noticeTitle', 'noticeText', 'readWhole', 'moreInfo']) assert.ok(design.texts.includes(key), `${design.id} lists ${key}`);
  }
  assert.equal(calHasTextOverrides(calDesign('noticeboard'), { readWhole: 'Hele teksten' }), true);
});

test('the text classes name texts there are, and every placeholder is the dictionary\'s', async () => {
  for (const key of [...CAL_PLURAL_TEXTS, ...CAL_CONTENT_TEXTS, ...Object.keys(CAL_HINT_TEXTS), ...Object.keys(CAL_TEXT_PARAMS)]) assert.ok(key in CAL_TEXTS, key);
  for (const key of Object.keys(CAL_HINT_TEXTS)) assert.equal(CAL_TEXTS[key], null, `${key} has no words of its own`);
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const site = (await engineImport(`locales/site/${lang}.js`)).default.strings;
    const admin = (await engineImport(`locales/admin/${lang}.js`)).default.strings;
    for (const hint of Object.values(CAL_HINT_TEXTS)) assert.ok(hint in admin, `${lang} admin key ${hint}`);
    for (const [key, base] of Object.entries(CAL_TEXTS)) {
      if (!base) continue;
      const forms = CAL_PLURAL_TEXTS.includes(key) ? Object.keys(site).filter((k) => k.startsWith(`${base}.`)) : [base];
      assert.ok(forms.length && forms.every((k) => k in site), `${lang} site key ${base}`);
      for (const form of forms) {
        const tokens = [...site[form].matchAll(/\{([a-z]+)\}/gi)].map((m) => m[1]).sort();
        assert.deepEqual(tokens, [...(CAL_TEXT_PARAMS[key] ?? [])].sort(), `${lang} ${form}: placeholders`);
      }
    }
  }
});

test('the renderers write no words, no clock halves and no capitals of their own', () => {
  const dir = new URL('../template/assets/engine/', import.meta.url);
  const engine = readFileSync(new URL('../template/urd.json', import.meta.url), 'utf8');
  const version = JSON.parse(engine).engine;
  const read = (name) => readFileSync(new URL(`${version}/${name}`, dir), 'utf8');
  const files = ['blocks/calendar.js', 'blocks/calendar-list.js', 'blocks/calendar-cards.js', 'blocks/calendar-next.js', 'blocks/calendar-time.js', 'blocks/calendar-more.js', 'calendar-format.js'];
  for (const name of files) {
    const src = read(name);
    assert.doesNotMatch(src, /['"`](?:am|pm)['"`]/, `${name}: a clock half written in the code`);
    assert.doesNotMatch(src, /\.to(?:Locale)?UpperCase\(/, `${name}: capitals made in the code (the style sheet follows the language)`);
    // A percentage for a reader is written by the language («45 %», «%45»); a CSS width (`${n}%`) is no text.
    assert.doesNotMatch(src, /\}\s+%`/, `${name}: a percentage written in the code`);
  }
  // A design's words are drawn through ui.tx, so the owner can rewrite them; the dictionary is read directly only for a screen reader's label.
  const allowed = new Set(['calendar.moreInfo', 'calendar.count', 'calendar.unnamed']);
  const wordKeys = new Set(Object.values(CAL_TEXTS).filter(Boolean));
  for (const name of files.slice(1, 6)) {
    for (const m of read(name).matchAll(/\bt[p]?\('(calendar\.[A-Za-z]+)'/g)) {
      assert.ok(!wordKeys.has(m[1]) || allowed.has(m[1]), `${name}: ${m[1]} drawn without ui.tx`);
    }
    // Content a design ships with goes through ui.line, so the owner can remove it.
    for (const key of CAL_CONTENT_TEXTS) assert.doesNotMatch(read(name), new RegExp(`ui\\.tx\\('${key}'`), `${name}: ${key} drawn as a word, not as a line`);
  }
});

test('the dictionaries hold every key the designs point at', async () => {
  const site = (await engineImport('locales/site/nb.js')).default.strings;
  const admin = (await engineImport('locales/admin/nb.js')).default.strings;
  for (const [key, base] of Object.entries(CAL_TEXTS)) {
    if (!base) continue;
    assert.ok(CAL_PLURAL_TEXTS.includes(key) ? `${base}.other` in site : base in site, `site key ${base}`);
  }
  for (const design of CAL_DESIGNS) {
    assert.ok(design.labelKey in admin, `admin key ${design.labelKey}`);
    for (const slot of design.slots) {
      assert.ok(slot.labelKey in admin, `admin key ${slot.labelKey}`);
      // The first section is the plain «Colours» list; every other section is headed by its own key.
      if (slot.section !== design.slots[0].section) assert.ok(`calendar.section.${slot.section}` in admin, `admin key calendar.section.${slot.section}`);
    }
  }
  for (const field of CAL_FIELDS) assert.ok(`calendar.field.${field}` in admin, `admin key calendar.field.${field}`);
});

test('calSwitcher: on only when switched on and the view lists what is coming', () => {
  assert.equal(calSwitcher({ view: 'list' }), false);
  assert.equal(calSwitcher({ view: 'list', switcher: true }), true);
  assert.equal(calSwitcher({ view: 'next', switcher: true }), true);
  assert.equal(calSwitcher({ view: 'month', switcher: true }), false);
  assert.equal(calSwitcher({ design: 'weekStrip', view: 'week', switcher: true }), false);
  assert.equal(calSwitcher({ design: 'glass', view: 'list', switcher: 'yes' }), false);
  for (const view of CAL_SWITCH_VIEWS) assert.ok(CAL_VIEWS.includes(view));
});

test('calDesignGroups: the plain design alone first, then every other design once under its view', () => {
  const groups = calDesignGroups();
  assert.equal(groups[0].view, null);
  assert.deepEqual(groups[0].designs.map((d) => d.id), ['plain']);
  const ids = groups.flatMap((g) => g.designs.map((d) => d.id));
  assert.deepEqual([...ids].sort(), CAL_DESIGNS.map((d) => d.id).sort());
  for (const group of groups.slice(1)) for (const design of group.designs) assert.equal(design.view, group.view);
});

test('every design has a thumbnail of its own, and an unknown id takes the plain one', () => {
  assert.deepEqual([...CAL_THUMB_IDS].sort(), CAL_DESIGNS.map((d) => d.id).sort());
  for (const design of CAL_DESIGNS) {
    const svg = calendarThumb(design.id);
    assert.match(svg, /^<svg viewBox="0 0 160 80"/);
    assert.ok(svg.endsWith('</svg>'));
    assert.ok(!/NaN|undefined/.test(svg), `${design.id}: a broken number in the drawing`);
  }
  assert.equal(calendarThumb('no-such-design'), calendarThumb('plain'));
});

test('calFolds: a list view folds the rest unless switched off, the regular-event design never', () => {
  assert.equal(calFolds({ view: 'list' }), true);
  assert.equal(calFolds({}), true);
  assert.equal(calFolds({ design: 'glass', view: 'list' }), true);
  assert.equal(calFolds({ design: 'glass', view: 'list', showMore: false }), false);
  assert.equal(calFolds({ view: 'cards' }), false);
  assert.equal(calFolds({ design: 'tickets', view: 'cards' }), false);
  assert.equal(calFolds({ design: 'apSeries', view: 'list' }), false);
});

test('calProgramHref: an address only on a design that links to the programme, and only a safe one', () => {
  assert.equal(calProgramHref({ design: 'tickets', programHref: ' /program ' }), '/program');
  assert.equal(calProgramHref({ design: 'posters', programHref: 'https://example.org/p' }), 'https://example.org/p');
  assert.equal(calProgramHref({ design: 'billboard', programHref: '#program' }), '#program');
  assert.equal(calProgramHref({ design: 'tickets' }), null);
  assert.equal(calProgramHref({ design: 'tickets', programHref: 'javascript:alert(1)' }), null);
  assert.equal(calProgramHref({ design: 'tickets', programHref: '//evil.example' }), null);
  assert.equal(calProgramHref({ design: 'glass', programHref: '/program' }), null);
  for (const design of CAL_DESIGNS.filter((d) => d.program)) assert.ok(design.texts.includes('wholeProgram'), design.id);
  for (const design of CAL_DESIGNS.filter((d) => d.open)) assert.ok(design.texts.includes('openToAll'), design.id);
});

test('calOptions: every option of the design with its default, the valid stored value over it', () => {
  assert.deepEqual(calOptions({ design: 'glass' }), {});
  assert.deepEqual(calOptions({ design: 'sidepanel' }), { panelSide: 'right' });
  assert.deepEqual(calOptions({ design: 'sidepanel', options: { panelSide: 'under', zebra: false } }), { panelSide: 'under' });
  assert.deepEqual(calOptions({ design: 'sidepanel', options: { panelSide: 'top' } }), { panelSide: 'right' });
  assert.deepEqual(calOptions({ design: 'weekPlan', options: { hourFrom: 6, hourTo: 30, weekend: true } }), { hourFrom: 6, hourTo: null, weekend: true });
  assert.deepEqual(calOptions({ design: 'table', options: { zebra: 'no', colPlace: false } }), { colTime: true, colPlace: false, zebra: true });
  assert.deepEqual(calOptions({ design: 'yearWheel', options: { firstMonth: '8' } }), { firstMonth: '8' });
  assert.deepEqual(calOptionDefs('no-such-design'), []);
});

test('CAL_OPTIONS: every key names a design, and every default is a value the option can hold', () => {
  const ids = CAL_DESIGNS.map((d) => d.id);
  for (const [id, defs] of Object.entries(CAL_OPTIONS)) {
    assert.ok(ids.includes(id), id);
    for (const def of defs) {
      assert.equal(def.labelKey, `calendar.opt.${def.key}`);
      if (def.kind === 'choice') assert.ok(def.values.includes(def.def), `${id}.${def.key}`);
      else if (def.kind === 'switch') assert.equal(typeof def.def, 'boolean');
      else assert.equal(def.def, null);
    }
  }
});

test('the option labels are in the three core admin dictionaries', async () => {
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const { strings } = (await engineImport(`locales/admin/${lang}.js`)).default;
    assert.ok('calendar.section.options' in strings, lang);
    for (const defs of Object.values(CAL_OPTIONS)) {
      for (const def of defs) {
        assert.ok(def.labelKey in strings, `${lang}: ${def.labelKey}`);
        if (def.kind === 'choice' && def.key !== 'firstMonth') for (const v of def.values) assert.ok(`${def.labelKey}.${v}` in strings, `${lang}: ${def.labelKey}.${v}`);
      }
    }
  }
});

test('calScale: the stored size inside its bounds, 1 for anything else', () => {
  assert.equal(calScale({}), 1);
  assert.equal(calScale({ scale: 0.75 }), 0.75);
  assert.equal(calScale({ scale: 0.1 }), CAL_SCALE.min);
  assert.equal(calScale({ scale: 9 }), CAL_SCALE.max);
  assert.equal(calScale({ scale: 'big' }), 1);
  assert.equal(calScale({ scale: -1 }), 1);
});

test('every design belongs to a colour set, and base.css defines every set', () => {
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  for (const design of CAL_DESIGNS) assert.ok(CAL_SETS.includes(design.set), `${design.id} has a set`);
  for (const set of CAL_SETS) assert.ok(set === 'theme' || css.includes(`.urd-cal-set-${set} {`), `base.css defines the set ${set}`);
  // The card is drawn from the set variables alone: nothing measured at run time reaches it.
  assert.ok(!css.includes('--urd-cal-dlg-'), 'the card reads no measured variable');
  const block = readFileSync(new URL('blocks/calendar.js', ENGINE_DIR), 'utf8');
  const dress = block.slice(block.indexOf('function dressDialog('), block.indexOf('function closeButton('));
  assert.ok(!dress.includes('getComputedStyle'), 'dressDialog measures nothing');
});

test('calSwitcherViews: the matching designs by default, the owner\'s choice when it is one a button can hold', () => {
  assert.deepEqual(calSwitcherViews({ design: 'timeline' }), { week: 'weekStrip', month: 'month' });
  assert.deepEqual(calSwitcherViews({ design: 'apNow' }), { week: 'weekStrip', month: 'apMonth' });
  assert.deepEqual(calSwitcherViews({ design: 'apNavy', switcherViews: { week: 'layers', month: 'sidepanel' } }), { week: 'layers', month: 'sidepanel' });
  assert.deepEqual(calSwitcherViews({ design: 'glass', switcherViews: { week: 'table', month: 'nonsense' } }), { week: 'weekStrip', month: 'month' });
  for (const id of [...CAL_SWITCH_WEEKS, ...CAL_SWITCH_MONTHS.filter((m) => m !== 'month')]) assert.equal(calDesign(id).id, id, `${id} is a design`);
});

test('calDescription and calHasExcerpt: the rows or the card, only where the rows have room', () => {
  assert.equal(calDescription({}), 'rows');
  assert.equal(calDescription({ description: 'card' }), 'card');
  assert.equal(calDescription({ options: { description: false } }), 'card', 'the legacy per-design option reads as the card');
  assert.equal(calDescription({ description: 'rows', options: { description: false } }), 'rows');
  for (const id of ['booklet', 'split', 'apSeries']) assert.ok(calHasExcerpt({ design: id }), `${id} has room`);
  assert.ok(calHasExcerpt({ design: 'plain', view: 'cards' }));
  assert.ok(!calHasExcerpt({ design: 'plain', view: 'list' }));
  assert.ok(!calHasExcerpt({ design: 'timeline' }));
  assert.ok(!Object.keys(CAL_OPTIONS).some((id) => CAL_OPTIONS[id].some((def) => def.key === 'description')), 'the description is a block setting, not a design option');
});
