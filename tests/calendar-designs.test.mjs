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
  CAL_SWITCH_VIEWS, calSwitcher, calFolds, calProgramHref, CAL_OPTIONS, calOptionDefs, calOptionShown, calOptions, calDesignGroups, calDesign, calView, calColorCss, calSlotVars, calStripe, calFieldCss, calHasTextOverrides,
  CAL_PLURAL_TEXTS, CAL_CONTENT_TEXTS, CAL_HINT_TEXTS, CAL_TEXT_PARAMS, calTextSlot, calBlankHtml, calTextValue, calSplitTokens, calResetTexts,
  CAL_SETS, CAL_SWITCH_WEEKS, CAL_SWITCH_MONTHS, calSwitcherViews, calDescription, calHasExcerpt, CAL_PHONE_MODES, calPhoneDesign, CAL_FAMILIES, calDesignFamilies,
  CAL_SHARED_OPTIONS, calThemeKey, calThemeTexts, calRewrites, CAL_PHONE_DESIGNS, calPhoneDesignDef, calPhoneFamilies, calPhoneView, calPhoneCandidates, CAL_CARD_DESIGNS, calCardDesignDef, calCardFamilies, calCardDesign, calCardCandidates, calCardDress,
} = await engineImport('calendar-designs.js');
import { readFileSync, existsSync, statSync } from 'node:fs';

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
    assert.ok(CAL_PHONE_MODES.includes(design.phone), `${design.id}: phone ${design.phone}`);
    assert.ok(CAL_FAMILIES.includes(design.family), `${design.id}: family ${design.family}`);
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
  const files = ['blocks/calendar.js', ...CAL_MODULES.map((module) => `blocks/calendar-${module}.js`), 'calendar-format.js'];
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
  for (const name of files.slice(1, -1)) {
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
  assert.deepEqual(calOptions({ design: 'band' }), { reach: 'content', roll: true, pause: 'button' });
  assert.deepEqual(calOptions({ design: 'band', options: { pause: 'touch' } }), { reach: 'content', roll: true, pause: 'touch' });
  assert.deepEqual(calOptions({ design: 'band', options: { pause: 'hover' } }), { reach: 'content', roll: true, pause: 'button' });
  // The band's reach takes the ribbon block's three widths, and nothing else.
  assert.deepEqual(calOptions({ design: 'band', options: { reach: 'page' } }).reach, 'page');
  assert.deepEqual(calOptions({ design: 'band', options: { reach: 'canvas' } }).reach, 'canvas');
  assert.deepEqual(calOptions({ design: 'band', options: { reach: 'window' } }).reach, 'content');
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

test('the option labels are in the three core admin dictionaries, the shared options\' «?» texts too', async () => {
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const { strings } = (await engineImport(`locales/admin/${lang}.js`)).default;
    assert.ok('calendar.section.options' in strings, lang);
    for (const defs of [...Object.values(CAL_OPTIONS), Object.values(CAL_SHARED_OPTIONS)]) {
      for (const def of defs) {
        assert.ok(def.labelKey in strings, `${lang}: ${def.labelKey}`);
        if (def.kind === 'choice' && def.key !== 'firstMonth') for (const v of def.values) assert.ok(`${def.labelKey}.${v}` in strings, `${lang}: ${def.labelKey}.${v}`);
        if (def.tipKey) assert.ok(def.tipKey in strings, `${lang}: ${def.tipKey}`);
      }
    }
  }
});

test('the shared options follow the design\'s traits: the word choice with theme words, the rewriting switch with rewriting', () => {
  assert.deepEqual(calOptionDefs('plain'), []);
  assert.deepEqual(calOptionDefs('pad').map((def) => def.key), ['wordChoice']);
  assert.deepEqual(calOptions({ design: 'pad' }), { wordChoice: 'theme' });
  assert.deepEqual(calOptions({ design: 'pad', options: { wordChoice: 'neutral', rewrite: false } }), { wordChoice: 'neutral' }, 'a design that never rewrites has no rewriting switch');
  assert.deepEqual(calOptions({ design: 'pad', options: { wordChoice: 'loud' } }), { wordChoice: 'theme' });
  assert.equal(CAL_SHARED_OPTIONS.rewrites.kind, 'switch');
  assert.equal(CAL_SHARED_OPTIONS.rewrites.def, true);
  assert.equal(CAL_SHARED_OPTIONS.theme.def, 'theme');
  // The shared options come after the design's own, and never twice.
  for (const design of CAL_DESIGNS) {
    const keys = calOptionDefs(design.id).map((def) => def.key);
    assert.equal(new Set(keys).size, keys.length, design.id);
    const own = (CAL_OPTIONS[design.id] ?? []).map((def) => def.key);
    assert.deepEqual(keys.slice(0, own.length), own, design.id);
    assert.equal(keys.includes('wordChoice'), Boolean(design.theme?.length), design.id);
    assert.equal(keys.includes('rewrite'), design.rewrites === true, design.id);
  }
});

test('calThemeTexts and calRewrites: the design\'s own words until the owner picks the neutral ones; rewriting on until switched off', () => {
  assert.deepEqual(calThemeTexts({ design: 'pad' }), ['inDays']);
  assert.deepEqual(calThemeTexts({ design: 'pad', options: { wordChoice: 'neutral' } }), []);
  assert.deepEqual(calThemeTexts({ design: 'plain' }), []);
  assert.deepEqual(calThemeTexts(undefined), []);
  assert.equal(calThemeKey('pad', 'inDays'), 'calendar.theme.pad.inDays');
  assert.equal(calRewrites({ design: 'pad' }), true);
  assert.equal(calRewrites({ design: 'pad', options: { rewrite: false } }), true, 'the switch counts only on a design that rewrites');
  assert.equal(calRewrites(undefined), true);
});

test('every theme word names a text the design draws, and the three core site dictionaries hold it with the common text\'s placeholders', async () => {
  const themed = CAL_DESIGNS.filter((design) => design.theme?.length);
  assert.ok(themed.length >= 1);
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const site = (await engineImport(`locales/site/${lang}.js`)).default.strings;
    for (const design of themed) {
      for (const key of design.theme) {
        assert.ok(design.texts.includes(key), `${design.id} draws ${key}`);
        const base = CAL_TEXTS[key];
        const theme = calThemeKey(design.id, key);
        const forms = CAL_PLURAL_TEXTS.includes(key) ? Object.keys(site).filter((k) => k.startsWith(`${theme}.`)) : [theme];
        assert.ok(forms.length && forms.every((k) => k in site), `${lang}: ${theme}`);
        if (CAL_PLURAL_TEXTS.includes(key)) assert.ok(`${theme}.other` in site, `${lang}: ${theme}.other`);
        for (const form of forms) {
          const tokens = [...site[form].matchAll(/\{([a-z]+)\}/gi)].map((m) => m[1]).sort();
          assert.deepEqual(tokens, [...(CAL_TEXT_PARAMS[key] ?? [])].sort(), `${lang} ${form}: placeholders`);
        }
        assert.ok(base, `${key} has common words`);
      }
    }
  }
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

test('calPhoneView and calPhoneDesign: the design itself on a phone when it reads there, its own default else, and any candidate the owner picks', () => {
  assert.equal(calPhoneView({ design: 'table' }), 'agenda');
  assert.equal(calPhoneView({ design: 'heatmap' }), 'agenda');
  assert.equal(calPhoneView({ design: 'plain' }), 'plain', 'a design that reads on a phone is its own phone design, under its own name');
  assert.equal(calPhoneView({ design: 'posters' }), 'posters');
  assert.equal(calPhoneView(undefined), 'plain');
  assert.equal(calPhoneView({ design: 'departures' }), 'depStrip', 'a design with a phone design of its own defaults to it');
  assert.equal(calPhoneView({ design: 'plain', phoneView: 'depRows' }), 'depRows', 'any calendar can take any phone design');
  assert.equal(calPhoneView({ design: 'plain', phoneView: 'pad' }), 'pad');
  assert.equal(calPhoneView({ design: 'departures', phoneView: 'pad' }), 'pad');
  assert.equal(calPhoneView({ design: 'plain', view: 'list', phoneView: 'sidepanel' }), 'plain', 'a design of a span view joins only a block of that view');
  assert.equal(calPhoneView({ design: 'plain', view: 'month', phoneView: 'sidepanel' }), 'sidepanel');
  assert.equal(calPhoneView({ design: 'plain', phoneView: 'table' }), 'plain', 'a design that cannot be read on a phone is never a phone design');
  assert.equal(calPhoneView({ design: 'departures', phoneView: 'departures' }), 'depStrip', 'not even for itself');
  // The legacy values read as the design itself, which a design that cannot be read on a phone never is.
  assert.equal(calPhoneView({ design: 'pad', phoneView: 'self' }), 'pad');
  assert.equal(calPhoneView({ design: 'pad', phoneDesign: false }), 'pad');
  assert.equal(calPhoneView({ design: 'table', phoneView: 'self' }), 'agenda');
  assert.equal(calPhoneView({ design: 'table', phoneDesign: false }), 'agenda');
  assert.equal(calPhoneView({ design: 'departures', phoneView: 'depScroll' }), 'depStrip', 'a retired phone design falls back to the default');
  assert.equal(calPhoneDesign({ design: 'table' }), true);
  assert.equal(calPhoneDesign({ design: 'plain' }), false);
  assert.equal(calPhoneDesign({ design: 'plain', phoneView: 'agenda' }), true);
  assert.equal(calPhoneDesign({ design: 'pad', phoneView: 'pad' }), false);
});

test('the phone designs: the neutral list first, every design that reads on a phone, the lent ones last; ids, labels, descriptions and families in the dictionaries', async () => {
  const ids = CAL_PHONE_DESIGNS.map((d) => d.id);
  assert.equal(ids[0], 'agenda');
  for (const id of ['depRows', 'depStrip', 'marqueeRows']) assert.ok(ids.includes(id), id);
  assert.ok(!ids.includes('self') && !ids.includes('depScroll'), 'neither «the design as it is» nor a phone design that scrolls sideways');
  for (const id of ids) assert.ok(!CAL_DESIGNS.some((d) => d.id === id), `${id} is no design's id`);
  for (const design of CAL_DESIGNS) if (design.phoneDefault) assert.ok(ids.includes(design.phoneDefault), `${design.id}: phoneDefault ${design.phoneDefault}`);
  for (const d of CAL_PHONE_DESIGNS) {
    assert.equal(d.labelKey, `calendar.phone.${d.id}`);
    assert.ok(d.family === 'neutral' || CAL_FAMILIES.includes(d.family), `${d.id}: family ${d.family}`);
    if (d.home) assert.equal(calDesign(d.home).id, d.home, `${d.id}: home ${d.home}`);
    if (d.module) {
      assert.ok(CAL_MODULES.includes(d.module), `${d.id}: module ${d.module}`);
      const mod = await engineImport(`blocks/calendar-${d.module}.js`);
      assert.equal(typeof mod[d.id], 'function', `${d.id} in calendar-${d.module}.js`);
    }
  }
  const candidates = calPhoneCandidates({ design: 'departures' });
  const candIds = candidates.map((d) => d.id);
  assert.equal(candIds[0], 'agenda');
  assert.ok(candIds.includes('pad') && candIds.includes('index') && candIds.includes('posters') && candIds.includes('plain') && candIds.includes('carousel'));
  assert.ok(!candIds.includes('table') && !candIds.includes('heatmap') && !candIds.includes('departures') && !candIds.includes('sidepanel'));
  assert.deepEqual(candIds.slice(-(ids.length - 1)), ids.slice(1), 'the lent phone designs come last');
  assert.equal(new Set(candIds).size, candIds.length);
  assert.ok(calPhoneCandidates({ design: 'pad' }).some((d) => d.id === 'pad'), 'the calendar\'s own design stands in its list');
  assert.ok(calPhoneCandidates({ design: 'plain', view: 'month' }).some((d) => d.id === 'sidepanel'), 'a month block can take a month design on a phone');
  const pad = candidates.find((d) => d.id === 'pad');
  assert.ok(pad.desktop && pad.set === 'pad' && pad.module === 'retro' && pad.view === 'next' && pad.look === 'pad');
  assert.equal(candidates.find((d) => d.id === 'depStrip').look, 'departures');
  assert.equal(calPhoneDesignDef('pad', { design: 'departures' }).id, 'pad');
  assert.equal(calPhoneDesignDef('nonsense', { design: 'departures' }).id, 'depStrip', 'an unknown id is the one the block draws');
  const families = calPhoneFamilies({ design: 'departures' });
  assert.equal(families[0].family, 'neutral');
  assert.deepEqual(families.flatMap((f) => f.designs.map((d) => d.id)).sort(), [...candIds].sort());
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const { strings } = (await engineImport(`locales/admin/${lang}.js`)).default;
    for (const d of CAL_PHONE_DESIGNS) {
      assert.ok(d.labelKey in strings, `${lang}: ${d.labelKey}`);
      assert.ok(`${d.labelKey}.about` in strings, `${lang}: ${d.labelKey}.about`);
    }
    for (const f of families) assert.ok(f.labelKey in strings, `${lang}: ${f.labelKey}`);
    for (const key of ['calendar.phoneView', 'tip.calendar.phoneView', 'calendar.picker.phoneTitle', 'calendar.card', 'tip.calendar.card']) assert.ok(key in strings, `${lang}: ${key}`);
    for (const key of ['calendar.phoneDesign', 'calendar.phone.self', 'calendar.family.shared', 'calendar.cardDesign.plain']) assert.ok(!(key in strings), `${lang}: the retired key ${key} is gone`);
  }
});

test('every design has a description and a sentence for what its colours paint, every design setting a phrase, and the picker\'s sentences are in the three core admin dictionaries', async () => {
  const keys = ['calendar.picker.aboutHead', 'calendar.picker.yoursHead', 'calendar.picker.cardOf', 'calendar.picker.h.colours', 'calendar.picker.h.text', 'calendar.picker.h.options', 'calendar.picker.c.settings', 'calendar.picker.c.words', 'calendar.picker.c.theme', 'calendar.picker.c.rewrite', 'calendar.picker.c.phoneNeutral', 'calendar.picker.c.other', 'calendar.picker.c.phoneWords', 'calendar.picker.c.phoneOptions', 'calendar.picker.c.cardNeutral', 'calendar.picker.c.cardOwn', 'calendar.picker.c.cardText', 'calendar.picker.c.cardOptions'];
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const { strings } = (await engineImport(`locales/admin/${lang}.js`)).default;
    for (const design of CAL_DESIGNS) {
      assert.ok(`${design.labelKey}.about` in strings, `${lang}: ${design.labelKey}.about`);
      assert.ok(`${design.labelKey}.colors` in strings, `${lang}: ${design.labelKey}.colors`);
    }
    for (const defs of Object.values(CAL_OPTIONS)) for (const def of defs) assert.ok(`${def.labelKey}.phrase` in strings, `${lang}: ${def.labelKey}.phrase`);
    for (const key of keys) assert.ok(key in strings, `${lang}: ${key}`);
    for (const key of ['calendar.picker.colorsOf', 'calendar.picker.alsoAll', 'calendar.picker.c.all', 'calendar.picker.c.colours']) assert.ok(!(key in strings), `${lang}: the retired key ${key} is gone`);
    // What a design's colours paint stands as a sentence of its own after the heading.
    for (const design of CAL_DESIGNS) assert.match(strings[`${design.labelKey}.colors`], /^\p{Lu}.*\.$/u, `${lang}: ${design.labelKey}.colors is a sentence`);
  }
});

test('every phone design has a picture for the picker, the designs that read on a phone included', () => {
  const ids = [...CAL_PHONE_DESIGNS.map((d) => d.id), ...CAL_DESIGNS.filter((d) => d.phone !== 'switch').map((d) => d.id)];
  for (const id of ids) {
    const file = new URL(`../template/admin/designs/phone-${id}.webp`, import.meta.url);
    assert.ok(existsSync(file), `phone-${id}: ${file.pathname}`);
    assert.ok(statSync(file).size > 1000 && statSync(file).size < 200000, `phone-${id}: picture size`);
  }
});

test('the card designs: the neutral card first, one card per colour set its designs share, every design\'s own card, the lent ones last; a decorator per lent one, labels and descriptions in the dictionaries', async () => {
  const ids = CAL_CARD_DESIGNS.map((d) => d.id);
  assert.deepEqual(ids, ['neutral', 'depHead', 'depTitle', 'depScreen']);
  for (const id of ids) assert.ok(!CAL_DESIGNS.some((d) => d.id === id), `${id} is no design's id`);
  for (const design of CAL_DESIGNS) if (design.cardDefault) assert.ok(ids.includes(design.cardDefault), `${design.id}: cardDefault ${design.cardDefault}`);
  const candidates = calCardCandidates();
  const candIds = candidates.map((d) => d.id);
  assert.equal(candIds[0], 'neutral');
  assert.equal(new Set(candIds).size, candIds.length);
  assert.deepEqual(candIds.slice(-3), ['depHead', 'depTitle', 'depScreen']);
  // Every design has its card in the list once: its own, or the card of the set it shares with others.
  const shared = candidates.filter((d) => d.setCard);
  assert.ok(shared.length >= 1);
  for (const design of CAL_DESIGNS) {
    const own = candIds.includes(design.id);
    const inSet = shared.filter((card) => card.designs.includes(design.id));
    assert.equal(Number(own) + inSet.length, 1, `${design.id}: in the list once`);
    if (design.ownCard) assert.ok(own, `${design.id} has its own card`);
  }
  for (const card of shared) {
    assert.ok(card.designs.length > 1, `${card.id} is shared`);
    assert.equal(card.id, `set-${card.set}`);
    assert.equal(card.family, 'sets');
    for (const id of card.designs) assert.equal(calDesign(id).set, card.set);
  }
  for (const d of candidates.slice(-3)) {
    assert.equal(d.look, 'departures');
    assert.equal(d.set, 'departures');
    const mod = await engineImport(`blocks/calendar-${d.module}.js`);
    assert.equal(typeof mod.cards?.[d.id], 'function', `${d.id}: a decorator in calendar-${d.module}.js`);
  }
  assert.equal(calCardDesignDef('nonsense').id, 'neutral');
  const families = calCardFamilies();
  assert.deepEqual(families.slice(0, 2).map((f) => f.family), ['neutral', 'sets']);
  assert.deepEqual(families.flatMap((f) => f.designs.map((d) => d.id)).sort(), [...candIds].sort());
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const { strings } = (await engineImport(`locales/admin/${lang}.js`)).default;
    for (const d of CAL_CARD_DESIGNS) {
      assert.ok(d.labelKey in strings, `${lang}: ${d.labelKey}`);
      assert.ok(`${d.labelKey}.about` in strings, `${lang}: ${d.labelKey}.about`);
    }
    for (const set of CAL_SETS) assert.ok(`calendar.cardSet.${set}` in strings, `${lang}: calendar.cardSet.${set}`);
    for (const f of families) assert.ok(f.labelKey in strings, `${lang}: ${f.labelKey}`);
    for (const key of ['calendar.picker.cardTitle', 'calendar.picker.setName', 'calendar.picker.setNameMore', 'calendar.picker.setAbout', 'calendar.picker.c.setOther']) assert.ok(key in strings, `${lang}: ${key}`);
  }
});

test('every design with a card of its own has the card\'s rules in base.css, and its module\'s decorator where it has one', async () => {
  const css = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  const own = CAL_DESIGNS.filter((d) => d.ownCard);
  assert.ok(own.length >= 10);
  for (const design of own) assert.ok(css.includes(`.urd-cal-dlg-${design.id}`), `${design.id}: .urd-cal-dlg-${design.id} in base.css`);
  for (const design of own) {
    const mod = await engineImport(`blocks/calendar-${design.module}.js`);
    if (mod.cards?.[design.id]) assert.equal(typeof mod.cards[design.id], 'function');
  }
  for (const id of ['tickets', 'posters', 'booklet', 'billboard', 'noticeboard']) {
    const design = calDesign(id);
    const mod = await engineImport(`blocks/calendar-${design.module}.js`);
    assert.equal(typeof mod.cards?.[id], 'function', `${id}: the part its card adds`);
  }
});

test('every card design has a picture for the picker', () => {
  for (const d of calCardCandidates()) {
    const file = new URL(`../template/admin/designs/card-${d.id}.webp`, import.meta.url);
    assert.ok(existsSync(file), `card-${d.id}: ${file.pathname}`);
    assert.ok(statSync(file).size > 1000 && statSync(file).size < 200000, `card-${d.id}: picture size`);
  }
});

test('calCardDesign and calCardDress: the design\'s own card, or its set\'s while it has none, until the owner picks another; the set and dress of the design it belongs to; the owner\'s colours only on the calendar\'s own', () => {
  assert.equal(calCardDesign({ design: 'plain' }), 'set-theme');
  assert.equal(calCardDesign({ design: 'pad' }), 'pad');
  assert.equal(calCardDesign({ design: 'tickets' }), 'tickets');
  assert.equal(calCardDesign({ design: 'numbered' }), 'numbered', 'a design alone in its set without a card of its own');
  assert.equal(calCardDesign({ design: 'departures' }), 'depHead');
  assert.equal(calCardDesign({ design: 'plain', card: 'depHead' }), 'depHead', 'any calendar takes any card design');
  assert.equal(calCardDesign({ design: 'plain', card: 'pad' }), 'pad');
  assert.equal(calCardDesign({ design: 'pad', card: 'plain' }), 'set-theme', 'a stored design id that shares its set\'s card reads as that card');
  assert.equal(calCardDesign({ design: 'departures', card: 'neutral' }), 'neutral');
  assert.equal(calCardDesign({ design: 'departures', card: 'nonsense' }), 'depHead');
  assert.equal(calCardDesign(undefined), 'set-theme');
  assert.deepEqual(calCardDress({ design: 'pad' }), { set: 'pad', classes: ['urd-cal-dlg-pad'], ownColours: true });
  assert.deepEqual(calCardDress({ design: 'pad', card: 'neutral' }), { set: 'pad', classes: [], ownColours: true });
  assert.deepEqual(calCardDress({ design: 'plain' }), { set: 'theme', classes: [], ownColours: true });
  assert.deepEqual(calCardDress({ design: 'pad', card: 'set-theme' }), { set: 'theme', classes: [], ownColours: false });
  assert.deepEqual(calCardDress({ design: 'plain', card: 'index' }), { set: 'index', classes: ['urd-cal-dlg-index'], ownColours: false });
  assert.deepEqual(calCardDress({ design: 'plain', card: 'depScreen' }), { set: 'departures', classes: ['urd-cal-dlg-departures', 'urd-cal-dlg-depScreen'], ownColours: false });
  assert.deepEqual(calCardDress({ design: 'departures' }), { set: 'departures', classes: ['urd-cal-dlg-departures', 'urd-cal-dlg-depHead'], ownColours: true });
});

test('calDesignFamilies: every design once, in the families\' order, the plain design first', () => {
  const families = calDesignFamilies();
  assert.deepEqual(families.map((f) => f.family), CAL_FAMILIES);
  const ids = families.flatMap((f) => f.designs.map((d) => d.id));
  assert.equal(ids.length, CAL_DESIGNS.length);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids[0], 'plain');
  for (const f of families) assert.equal(f.labelKey, `calendar.family.${f.family}`);
});

test('every design has a picture for the design picker', () => {
  for (const design of CAL_DESIGNS) {
    const file = new URL(`../template/admin/designs/${design.id}.webp`, import.meta.url);
    assert.ok(existsSync(file), `${design.id}: ${file.pathname}`);
    assert.ok(statSync(file).size > 1000 && statSync(file).size < 120000, `${design.id}: picture size`);
  }
});

test('calOptionShown: an option with a `when` shows only while the design\'s other options match it (the band\'s pause while it rolls)', () => {
  const [, roll, pause] = calOptionDefs('band');
  assert.equal(calOptionShown(roll, calOptions({ design: 'band' })), true);
  assert.equal(calOptionShown(pause, calOptions({ design: 'band' })), true);
  assert.equal(calOptionShown(pause, calOptions({ design: 'band', options: { roll: false } })), false);
  assert.equal(calOptionShown({ key: 'x' }, {}), true);
});
