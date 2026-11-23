/**
 * Visitor speed (0.7.37.3.2): the pictures below the first screen wait for their section, the first screen's are fetched first, the push pass reads and writes in phases, and the calendar asks for its feed with its modules and stands in its own design while it waits.
 * The background layers' wait runs on stand-ins for the DOM and the observer; the rest is held to the source.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR, engineClosure } from './_engine.mjs';

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
  assert.match(calendar, /if \(!inAlready && host\.hasAttribute\('aria-busy'\) && !ctx\.measure\) \{\s+import\('\.\.\/ics\.js'\)\.then\(\(ics\) => \{\s+if \(!host\.isConnected\) return;/, 'a calendar whose code is not in asks with its modules, and a copy drawn to be measured asks for nothing');
  assert.match(calendar, /early\.set\(url, asked\);/);
  assert.match(calendar, /const readied = takeReadied\(url\);\s+const asked = early\?\.get\(url\) \?\? readied;\s+early\?\.delete\(url\);\s+const feed = ics\.parseIcs\(await \(asked \?\? fetchSource\(url\)\)\);/, 'the drawing takes the early or the readied request, once, a failed one too');
  assert.match(calendar, /loadOccurrences\(ics, cf, sources, [^\n]*, to, early\)/);
  // A calendar whose code is all in draws as the page's drawing ends, in its task, so it stands with the page from its first frame; otherwise its renderers come in one wave after its parts.
  assert.match(calendar, /const ready = partsIn \? designModules\(partsIn\[1\], props\) : null;\s*const inAlready = Boolean\(ready\?\.every\(\(name\) => !name \|\| designsIn\.has\(name\)\)\);/);
  assert.match(calendar, /if \(inAlready\) \{\s*queueMicrotask\(\(\) => \{\s*try \{\s*draw\(partsIn, ready\.map/);
  assert.match(calendar, /const modules = await Promise\.all\(designModules\(parts\[1\], props\)\.map\(\(name\) => \(name \? loadDesign\(name\) \?\? null : null\)\)\);\s*draw\(parts, modules\);/);
  assert.match(source('blocks/calendar-load.js'), /\.then\(\(parts\) => \(partsIn = parts\)\);/, 'the parts are kept once they are in');
  // Readied before the page is drawn: its parts, the renderers its settings draw with, and its feeds asked for, never waited for; one request per feed, shared with the drawing.
  const load = source('blocks/calendar-load.js');
  assert.match(load, /export async function prepareCalendar\(props, ctx\) \{\s*const \[ics, cd\] = await Promise\.all\(\[import\('\.\.\/ics\.js'\), import\('\.\.\/calendar-designs\.js'\)\]\);[\s\S]*?if \(!url \|\| READIED\.has\(url\)\) continue;\s*const asked = fetchSource\(url\);\s*asked\.catch\(\(\) => \{\}\);\s*READIED\.set\(url, asked\);\s*\}[\s\S]*?await Promise\.all\(\[calendarParts\(\), \.\.\.designModules\(cd, props\)\.map\(\(name\) => \(name \? loadDesign\(name\) : null\)\)\]\);/, 'the rules and the renderers in one wave');
  assert.match(load, /export function takeReadied\(url\) \{\s*const asked = READIED\.get\(url\);\s*READIED\.delete\(url\);\s*return asked;/, 'the readied request is taken once');
  assert.match(load, /if \(!ASKING\.has\(url\)\) \{\s*const asking = askSource\(url, key\);\s*ASKING\.set\(url, asking\);\s*asking\.then\(\(\) => ASKING\.delete\(url\), \(\) => ASKING\.delete\(url\)\);\s*\}\s*return ASKING\.get\(url\);/);
  // The module that readies a calendar imports only what the boot has preloaded, so it runs as soon as it and the parts asked for beside it are in.
  const preloaded = readFileSync(new URL('../template/index.html', import.meta.url), 'utf8');
  for (const [, spec] of load.matchAll(/^import [^;]+ from '\.\.\/([^']+)';$/gm)) assert.ok(preloaded.includes(`/${spec}"`), `${spec} is preloaded`);
  assert.doesNotMatch(load, /^import [^;]+ from '\.\/[^']+';$/m);
  // The parts the core types' readying asks for beside the module are the scripts the calendar draws with.
  const { CORE_BLOCK_READY } = await engineImport('core-types.js');
  const loaderParts = String(CORE_BLOCK_READY.calendar).match(/import\('\.\/([^']+)'\)/g).map((m) => m.slice(10, -2));
  const parts = load.match(/const calendarParts = \(\) => Promise\.all\(\[([^\n]*)\]\)/)[1].match(/import\('\.\.\/([^']+)'\)/g).map((m) => m.slice(11, -2));
  assert.deepEqual(loaderParts, [...parts, 'blocks/calendar-load.js']);
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

test('a calendar stands in its own design while its feeds are on the way, a feed at hand skipping it, a calendar drawn again shows its last drawing until its own is in, and the grey bars wait half a second', () => {
  const calendar = source('blocks/calendar.js');
  const wait = calendar.indexOf('if (settled || !sheetIn || !host.isConnected) return;');
  assert.ok(wait > 0 && wait < calendar.indexOf('loadOccurrences(ics, cf, sources, Math.max'), 'asked for before the feeds are read');
  assert.match(calendar, /if \(!ctx\.measure && !\('calCopy' in host\.dataset\)\) \{\s+requestAnimationFrame\(\(\) => \{\s+if \(settled \|\| !sheetIn \|\| !host\.isConnected\) return;/, 'a frame later, so a feed already in is drawn without it, and never without the rules that hide the words');
  assert.match(calendar, /const held = host\.offsetHeight;\s+waiting = true;\s+host\.classList\.add\('urd-cal-wait'\);\s+if \(held\) \{\s+host\.style\.height = `\$\{held\}px`;\s+host\.style\.overflow = 'hidden';\s+\}\s+draw\(demoOccurrences\(\)\);\s+rememberDrawing\(key, host, props, true\);/, 'at the height the loading state kept, so nothing around it moves');
  assert.match(calendar, /const draw = \(\[ics, cd, cf, maps, links, sheet\], \[mod, weekMod, phoneMod, cardMod, plainMod\]\) => \{\s+sheetIn = sheet;/);
  assert.match(source('render.js'), /link\.addEventListener\('load', \(\) => resolve\(true\), \{ once: true \}\);\s+link\.addEventListener\('error', \(\) => resolve\(false\), \{ once: true \}\);/);
  assert.match(calendar, /if \(!measure\) LAST_DRAWN\.set\(id, \{ \.\.\.last, host \}\);\s+return true;/, 'a copy is remembered in its turn, so another calendar settling first never drops it, and a copy drawn only to be measured never takes its place');
  assert.match(calendar, /if \(!copyLastDrawing\(host, el, props, ctx\.measure\) && host\.hasAttribute\('aria-busy'\)\) host\.appendChild\(loadingNode\(el, ctx\)\);/, 'a calendar drawn again starts from its last drawing, never blank');
  assert.match(calendar, /if \(!last \|\| last\.props !== JSON\.stringify\(props\)\) return false;/, 'only with the settings it was drawn with');
  assert.match(calendar, /const copy = child\.cloneNode\(true\);\s+copy\.inert = true;/);
  assert.match(calendar, /if \(host\.dataset\.calCopy === 'wait'\) host\.classList\.add\('urd-cal-wait'\);/, 'a copy of the waiting drawing keeps the sample words hidden');
  assert.match(calendar, /if \(!ctx\.measure\) rememberDrawing\(key, host, props, false\);/);
  assert.match(calendar, /settled = true;\s+waiting = false;\s+host\.classList\.remove\('urd-cal-wait'\);\s+delete host\.dataset\.calCopy;\s+host\.style\.removeProperty\('height'\);\s+host\.style\.removeProperty\('overflow'\);/);
  assert.match(calendar, /host\.removeAttribute\('aria-busy'\);\s+host\.classList\.remove\('urd-cal-wait'\);\s+delete host\.dataset\.calCopy;\s+host\.style\.removeProperty\('height'\);\s+host\.style\.removeProperty\('overflow'\);\s+host\.replaceChildren\(emptyNode\(props\)\);/, 'a calendar that fails shows its empty state with its words');
  assert.match(calendar, /const settle = \(occurrences, reason = null, sample = !sources\.length\) => \{\s+settled = true;\s+waiting = false;\s+host\.classList\.remove\('urd-cal-wait'\);/);
  assert.match(calendar, /if \(!waiting\) host\.removeAttribute\('aria-busy'\);/, 'the footer still waits for the events');
  assert.match(calendar, /sources\.length && !waiting\) writeEventData\(/, 'the sample events never reach the structured data');
  assert.match(calendar, /if \(waiting\) \{\s+for \(const child of host\.children\) child\.inert = true;\s+const note = el2\('p', 'urd-cal-wait-note', t\('calendar\.loadingEvents'\)\);\s+note\.setAttribute\('role', 'status'\);/, 'out of reach behind the note a screen reader hears');
  const css = source('blocks/calendar.css');
  assert.match(css, /\.urd-cal-wait > :not\(\.urd-cal-wait-note\) \{\s+-webkit-text-fill-color: transparent;\s+isolation: isolate;\s+\}/);
  assert.match(css, /@supports not \(-webkit-text-fill-color: transparent\) \{\s+\.urd-cal-wait > :not\(\.urd-cal-wait-note\) \{\s+visibility: hidden;/, 'without it the drawing is hidden, never the sample words shown');
  assert.match(css, /\.urd-cal-wait img \{\s+visibility: hidden;/);
  assert.match(css, /\.urd-block > \.urd-cal\.urd-cal-wait,\s+\.urd-block > \.urd-cal\[data-cal-copy\] \{\s+height: auto;/, 'both at their own height, not stretched to the frame');
  const base = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf8');
  assert.match(base, /\.urd-cal-loading i \{[^}]*animation: urd-cal-appear 0\.2s 0\.5s backwards;/);
  assert.match(base, /animation: urd-cal-appear 0\.2s 0\.5s backwards, urd-cal-loading /, 'the pulse keeps the wait');
});

test('each core type\'s loader asks for every module its own module imports that the boot does not load, in the same wave as its own', async () => {
  const closureOf = engineClosure;
  const boot = closureOf('boot.js');
  const { CORE_BLOCKS, CORE_BACKGROUNDS } = await engineImport('core-types.js');
  let waiting = 0;
  for (const table of [CORE_BLOCKS, CORE_BACKGROUNDS]) {
    for (const [type, loader] of Object.entries(table)) {
      const named = [...String(loader).matchAll(/import\('\.\/([^']+)'\)/g)].map((m) => m[1]);
      const [main] = named;
      const needed = [...closureOf(main)].filter((name) => name !== main && !boot.has(name));
      for (const name of needed) assert.ok(named.includes(name), `${type}: ${name} is asked for beside ${main}`);
      for (const name of named.slice(1)) assert.ok(needed.includes(name), `${type}: ${name} is not imported by ${main} beyond the boot, so it is not asked for`);
      assert.equal(named.length, new Set(named).size, `${type}: each module named once`);
      waiting += needed.length;
    }
  }
  assert.ok(waiting > 10, 'the types with modules of their own are found');
  // A page drawing pictures alone loads no gallery code for them.
  assert.ok(!closureOf('blocks/image.js').has('gallery-layout.js'));
  assert.ok(!closureOf('backgrounds/image.js').has('gallery-layout.js'));
});
