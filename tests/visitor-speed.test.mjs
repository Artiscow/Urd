/**
 * Visitor speed (0.7.37.3.2): the pictures below the first screen wait for their section, the first screen's are fetched first, the push pass reads and writes in phases, and the calendar asks for its feed with its modules.
 * The background layers' wait runs on stand-ins for the DOM and the observer; the rest is held to the source.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const source = (file) => readFileSync(new URL(file, ENGINE_DIR), 'utf8');

test('a picture layer in a section below the first is drawn as its section comes near, every other layer at once, and the first section\'s layers are told they are first', async () => {
  const { renderBackgroundLayers } = await engineImport('render.js');
  const drawn = [];
  const def = (name, pictures) => ({ version: 1, defaults: () => ({}), ...(pictures ? { pictures: true } : {}), render: (el, props, options) => drawn.push({ name, first: options?.first ?? false }) });
  const defs = { image: def('image', true), color: def('color', false) };
  const realUrd = globalThis.window;
  const realDocument = globalThis.document;
  const realObserver = globalThis.IntersectionObserver;
  const observers = [];
  const printing = [];
  globalThis.window = { Urd: { backgrounds: { get: (type) => defs[type] } }, addEventListener: (type, fn) => { if (type === 'beforeprint') printing.push(fn); } };
  globalThis.document = { createElement: () => ({ className: '', isConnected: true }) };
  globalThis.IntersectionObserver = class { constructor(cb, options) { this.cb = cb; this.options = options; observers.push(this); } observe(el) { this.el = el; } disconnect() { this.off = true; } };
  const host = { children: [], appendChild(el) { this.children.push(el); } };
  try {
    const background = { layers: [{ type: 'color', version: 1, props: {} }, { type: 'image', version: 1, props: {} }] };
    renderBackgroundLayers(host, background, { later: true });
    assert.deepEqual(drawn.map((d) => d.name), ['color'], 'the picture waits');
    assert.equal(host.children.length, 2, 'both layers stand in the section, in their order');
    assert.equal(observers[0].options.rootMargin, '100% 0px', 'a screen ahead');
    observers[0].cb([{ isIntersecting: false }]);
    assert.equal(drawn.length, 1);
    observers[0].cb([{ isIntersecting: true }]);
    assert.deepEqual(drawn.map((d) => d.name), ['color', 'image'], 'drawn as its section comes near');
    assert.equal(observers[0].off, true);
    drawn.length = 0;
    renderBackgroundLayers(host, background, { later: true });
    assert.equal(drawn.length, 1, 'the colour at once, the picture waiting');
    const { renderBackgroundLayers: again } = await import(new URL(`render.js?print=${Date.now()}`, ENGINE_DIR).href);
    assert.equal(printing.length, 1, 'the module listens for a print');
    drawn.length = 0;
    again(host, background, { later: true });
    printing[0]();
    assert.deepEqual(drawn.map((d) => d.name), ['color', 'image'], 'a print draws the pictures still waiting');
    drawn.length = 0;
    renderBackgroundLayers(host, background, { first: true });
    assert.deepEqual(drawn, [{ name: 'color', first: true }, { name: 'image', first: true }], 'the first section draws at once, and says so');
    drawn.length = 0;
    globalThis.IntersectionObserver = undefined;
    renderBackgroundLayers(host, background, { later: true });
    assert.equal(drawn.length, 2, 'without an observer every layer is drawn at once');
  } finally {
    globalThis.window = realUrd;
    globalThis.document = realDocument;
    globalThis.IntersectionObserver = realObserver;
  }
});

test('the first image block of the first section is fetched at once and first, every other image lazily; the hero\'s background picture is asked for first; pictures wait only as the page arrives', () => {
  const image = source('blocks/image.js');
  assert.match(image, /if \(ctx\?\.first && !ctx\.preview && !ctx\.firstPictureTaken\) \{\s+ctx\.firstPictureTaken = true;\s+img\.loading = 'eager';\s+img\.setAttribute\('fetchpriority', 'high'\);\s+\} else \{\s+img\.loading = 'lazy';/, 'one picture alone takes the high priority');
  assert.ok(image.indexOf("img.loading = 'eager'") < image.indexOf('img.src = props.src'), 'set before the source');
  assert.match(source('backgrounds/image.js'), /if \(options\?\.first\) probe\.setAttribute\('fetchpriority', 'high'\);\s+probe\.src = src;/);
  assert.match(source('backgrounds/slideshow.js'), /if \(options\?\.first\) probe\.setAttribute\('fetchpriority', 'high'\);\s+probe\.src = demo/);
  for (const file of ['backgrounds/image.js', 'backgrounds/slideshow.js']) assert.match(source(file), /pictures: true,/, file);
  const render = source('render.js');
  assert.match(render, /renderSection\(section, site, host, \{ \.\.\.opts, first: i === 0, gutter, side \}\);/);
  assert.match(render, /renderBackgroundLayers\(host, section\.background, \{ later: Boolean\(opts\.arriving\) && !opts\.first && !ctx\.preview, first: Boolean\(opts\.first\) && !ctx\.preview \}\);/);
  assert.match(source('urd.js'), /renderPage\(state\.page, state\.site, opts\.root, \{ preview, viewport: state\.viewport, arriving: true \}\);/, 'only the page\'s arrival lets pictures wait');
  assert.match(render, /gutter: undefined, side: undefined, arriving: false \}\);/, 'a section redrawn at its handoff draws its pictures at once');
});

test('the push pass reads the canvas once, writes every box, reads every block, then writes: one layout for the reads', () => {
  const render = source('render.js');
  const pass = render.slice(render.indexOf('function applyPush(host)'), render.indexOf('function writePush('));
  const across = pass.indexOf('const across = canvas.clientWidth;');
  const writes = pass.indexOf('fitContent(el, frame.h, block, ratio);');
  const reads = pass.indexOf('it.needed = measure();');
  const back = pass.indexOf('if (needed !== frame.h) el.style.height = `${needed}px`;');
  assert.ok(across > 0 && across < writes && writes < reads && reads < back, 'read, write, read, write');
  assert.match(pass, /it\.w = drawnWidth\(el, canvas, frame, across\);/);
  assert.match(render, /const gutter = window\.innerWidth - document\.documentElement\.clientWidth;\s+const side = sideColumn\(\);\s+page\.sections\.forEach/, 'the scrollbar is read once per page drawing');
  assert.doesNotMatch(source('blocks/text.js'), /requestAnimationFrame\(\(\) => \{\s+if \(!el\.isConnected \|\| ctx\.viewport === 'mobile'/, 'a text leaves its measure to the pass');
});

test('reads that force a layout are left out where nothing needs them', () => {
  assert.match(source('urd.js'), /const jump = \(\) => \{\s+\/\/[^\n]*\n\s+if \(!location\.hash\) return;/);
  const totop = source('totop.js');
  assert.match(totop, /if \(set\.after === 'always'\) \{\s+button\?\.classList\.add\('visible'\);\s+return;\s+\}/);
  assert.match(totop, /requestAnimationFrame\(shown\);/);
});

test('the calendar asks for its feed with its modules, loads its design modules in one wave, and reads the week start only where a week is drawn', async () => {
  const calendar = source('blocks/calendar.js');
  assert.match(calendar, /if \(host\.hasAttribute\('aria-busy'\) && !ctx\.measure\) \{\s+import\('\.\.\/ics\.js'\)\.then\(\(ics\) => \{\s+if \(!host\.isConnected\) return;/, 'a copy drawn to be measured asks for nothing');
  assert.match(calendar, /early\.set\(url, asked\);/);
  assert.match(calendar, /const asked = early\?\.get\(url\);\s+early\?\.delete\(url\);\s+const feed = ics\.parseIcs\(await \(asked \?\? fetchSource\(url\)\)\);/, 'the drawing takes the early request, once, a failed one too');
  assert.match(calendar, /loadOccurrences\(ics, cf, sources, [^\n]*, to, early\)/);
  assert.match(calendar, /const \[mod, weekMod, phoneMod, cardMod\] = await Promise\.all\(wanted\.map/);
  assert.match(calendar, /const weekStart = \(\) => \(weekStartDay \?\?= cf\.calWeekStart\(props, lang\)\);/);
  assert.match(calendar, /const weekFrom = switcher \|\| view === 'week' \?/);
  const { calWeekStart } = await engineImport('calendar-format.js');
  const RealLocale = Intl.Locale;
  let asked = 0;
  Intl.Locale = class extends RealLocale { constructor(...args) { super(...args); asked += 1; } };
  try {
    const first = calWeekStart({}, 'en-GB');
    calWeekStart({}, 'en-GB');
    calWeekStart({ calendar: 'other' }, 'en-GB');
    assert.equal(asked, 1, 'the locale data is asked once per language');
    assert.equal(calWeekStart({}, 'en-GB'), first);
  } finally {
    Intl.Locale = RealLocale;
  }
  assert.equal(calWeekStart({ weekStart: 'sun' }, 'nb'), 0);
});
