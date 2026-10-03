/**
 * Contract tests for the calendar block's design model (calendar-designs.js):
 * the design look-up, the colour slots, the edge stripe, the field styles and
 * the static texts, plus the dictionary keys every design points at. DOM
 * rendering is tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  CAL_DESIGNS, CAL_VIEWS, CAL_FIELDS, CAL_TEXTS, CAL_SIZE, CAL_MODULES,
  CAL_SWITCH_VIEWS, calSwitcher, calFolds, calProgramHref, CAL_OPTIONS, calOptionDefs, calOptions, calDesignGroups, calDesign, calView, calColorCss, calSlotVars, calStripe, calFieldCss, calTextHtml, calHasTextOverrides,
} = await engineImport('calendar-designs.js');

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

test('calTextHtml and calHasTextOverrides: blank or missing text means the default words', () => {
  assert.equal(calTextHtml(undefined, 'next'), null);
  assert.equal(calTextHtml({ next: '   ' }, 'next'), null);
  assert.equal(calTextHtml({ next: '<b>Neste</b>' }, 'next'), '<b>Neste</b>');
  assert.equal(calHasTextOverrides(plain, undefined), false);
  assert.equal(calHasTextOverrides(plain, { next: '' }), false);
  assert.equal(calHasTextOverrides(plain, { later: 'Siden' }), true);
});

test('the dictionaries hold every key the designs point at', async () => {
  const site = (await engineImport('locales/site/nb.js')).default.strings;
  const admin = (await engineImport('locales/admin/nb.js')).default.strings;
  for (const key of Object.values(CAL_TEXTS)) assert.ok(key in site, `site key ${key}`);
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
