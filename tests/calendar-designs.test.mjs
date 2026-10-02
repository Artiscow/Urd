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
  CAL_DESIGNS, CAL_VIEWS, CAL_FIELDS, CAL_TEXTS, CAL_SIZE,
  calDesign, calView, calColorCss, calSlotVars, calStripe, calFieldCss, calTextHtml, calHasTextOverrides,
} = await engineImport('calendar-designs.js');

const plain = CAL_DESIGNS[0];

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
    for (const slot of design.slots) assert.ok(slot.labelKey in admin, `admin key ${slot.labelKey}`);
  }
  for (const field of CAL_FIELDS) assert.ok(`calendar.field.${field}` in admin, `admin key calendar.field.${field}`);
});
