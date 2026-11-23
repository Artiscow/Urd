/**
 * The engine's notes (scripts/engine-notes.mjs): a module a visitor's page loads keeps each comment to LIMIT characters of prose, its JSDoc tag lines apart, and the full text of a longer one stands in docs/engine-notes/<module>.md under the name it explains.
 * The modules stand here one by one, so a change to any of them runs this test.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { ENGINE_DIR, engineClosure } from './_engine.mjs';
import { LIMIT, NOTES_DIR, notesOf, notesPath, notesSections, proseLength, visitorModules } from '../scripts/engine-notes.mjs';

/** The modules a visitor's page loads to draw: the boot's closure, the types' modules and the calendar's renderers. */
const VISITOR_MODULES = [
  'animations/core.js', 'backgrounds/color.js', 'backgrounds/glow.js', 'backgrounds/gradient.js',
  'backgrounds/grain.js', 'backgrounds/image.js', 'backgrounds/pattern.js', 'backgrounds/slideshow.js',
  'backgrounds/video.js', 'blocks/audio.js', 'blocks/button.js', 'blocks/calendar-cards.js',
  'blocks/calendar-list.js', 'blocks/calendar-load.js', 'blocks/calendar-more.js', 'blocks/calendar-next.js',
  'blocks/calendar-retro.js', 'blocks/calendar-time.js', 'blocks/calendar.js', 'blocks/cart.js', 'blocks/checkout.js',
  'blocks/collection.js', 'blocks/contact.js', 'blocks/countdown.js', 'blocks/faq.js', 'blocks/form.js',
  'blocks/gallery.js', 'blocks/icon.js', 'blocks/image.js', 'blocks/map.js', 'blocks/privacy.js', 'blocks/product.js',
  'blocks/quote.js', 'blocks/ribbon.js', 'blocks/shape.js', 'blocks/share.js', 'blocks/spacer.js', 'blocks/stats.js',
  'blocks/table.js', 'blocks/text.js', 'blocks/timeline.js', 'blocks/video.js', 'boot.js', 'box-style.js',
  'calendar-designs.js', 'calendar-format.js', 'collections.js', 'contact-checks.js', 'contact-model.js',
  'contact-profiles.js', 'core-types.js', 'divider-model.js', 'doc-look.js', 'embed-cover.js', 'footer-cta.js',
  'footer-model.js', 'footer.js', 'form-model.js', 'gallery-layout.js', 'gallery-model.js', 'i18n.js', 'icons.js',
  'ics.js', 'keep-minutes.js', 'links-model.js', 'locales/site/nb.js', 'map-links.js', 'meeting-links.js',
  'migrate.js', 'nav-model.js', 'nav.js', 'osm.js', 'phone-order.js', 'photo-source.js', 'picture.js', 'plugins.js',
  'prefetch.js', 'privacy-model.js', 'push-model.js', 'registry.js', 'render.js', 'ribbon-model.js', 'sanitize.js',
  'seo.js', 'shape-model.js', 'shop.js', 'sticky-model.js', 'sticky.js', 'theme.js', 'totop.js', 'urd.js',
];

/** The modules whose longer comments are still to get their short versions, each with one left at least; the list shrinks as they do. */
const PENDING = new Set([
  'animations/core.js', 'backgrounds/glow.js', 'backgrounds/gradient.js', 'backgrounds/image.js',
  'backgrounds/pattern.js', 'backgrounds/slideshow.js', 'backgrounds/video.js', 'blocks/audio.js', 'blocks/button.js',
  'blocks/calendar-cards.js', 'blocks/calendar-list.js', 'blocks/calendar-load.js', 'blocks/calendar-more.js',
  'blocks/calendar-next.js', 'blocks/calendar-retro.js', 'blocks/calendar-time.js', 'blocks/calendar.js',
  'blocks/cart.js', 'blocks/checkout.js', 'blocks/collection.js', 'blocks/contact.js', 'blocks/countdown.js',
  'blocks/faq.js', 'blocks/form.js', 'blocks/gallery.js', 'blocks/icon.js', 'blocks/image.js', 'blocks/map.js',
  'blocks/privacy.js', 'blocks/product.js', 'blocks/quote.js', 'blocks/ribbon.js', 'blocks/shape.js',
  'blocks/share.js', 'blocks/spacer.js', 'blocks/stats.js', 'blocks/table.js', 'blocks/text.js', 'blocks/timeline.js',
  'blocks/video.js', 'box-style.js', 'calendar-designs.js', 'calendar-format.js', 'collections.js',
  'contact-checks.js', 'contact-model.js', 'contact-profiles.js', 'divider-model.js', 'doc-look.js',
  'embed-cover.js', 'footer-cta.js', 'footer-model.js', 'footer.js', 'form-model.js', 'gallery-layout.js',
  'gallery-model.js', 'icons.js', 'ics.js', 'links-model.js',
  'map-links.js', 'meeting-links.js', 'migrate.js', 'osm.js', 'phone-order.js',
  'photo-source.js', 'picture.js', 'privacy-model.js', 'push-model.js',
  'ribbon-model.js', 'sanitize.js', 'seo.js', 'shape-model.js', 'shop.js', 'sticky-model.js', 'sticky.js', 'theme.js',
  'totop.js',
]);

const source = (module) => readFileSync(new URL(module, ENGINE_DIR), 'utf8');
const lineOf = (src, at) => src.slice(0, at).split('\n').length;

test('the list names every module a visitor\'s page loads to draw', () => {
  assert.deepEqual(VISITOR_MODULES, visitorModules(), 'a module a page comes to load joins the list here, and PENDING until its comments are short');
  for (const module of PENDING) assert.ok(VISITOR_MODULES.includes(module), `${module} is pending but no page loads it`);
});

test('a module a visitor\'s page loads keeps each comment short, its longer text in its notes', () => {
  for (const module of VISITOR_MODULES) {
    const src = source(module);
    const notes = notesOf(src);
    const mark = `Notes: ${notesPath(module)} (Urd repository).`;
    if (PENDING.has(module)) {
      assert.ok(notes.some((n) => n.long), `${module} has no long comment left, so it leaves PENDING`);
      continue;
    }
    for (const note of notes) {
      const prose = note.header ? note.prose.replace(mark, '') : note.prose;
      assert.ok(proseLength(prose) <= LIMIT, `${module}:${lineOf(src, note.start)} holds ${proseLength(prose)} characters of prose; its full text goes in ${notesPath(module)} (scripts/engine-notes.mjs)`);
    }
  }
});

test('each notes file belongs to a module, names what stands in it, and is named by its module, which has it', () => {
  for (const module of VISITOR_MODULES) {
    if (source(module).includes(`Notes: ${notesPath(module)} (Urd repository).`)) assert.ok(existsSync(new URL(module.replace(/\.js$/, '.md'), NOTES_DIR)), `${module} names ${notesPath(module)}, which is missing`);
  }
  const files = [];
  const walk = (dir, prefix) => {
    for (const name of readdirSync(dir)) {
      if (statSync(new URL(name, dir)).isDirectory()) walk(new URL(`${name}/`, dir), `${prefix}${name}/`);
      else if (name.endsWith('.md') && !(prefix === '' && name === 'README.md')) files.push(`${prefix}${name}`);
    }
  };
  walk(NOTES_DIR, '');
  assert.ok(files.length >= 1, 'the notes files are found');
  for (const file of files) {
    const module = file.replace(/\.md$/, '.js');
    assert.ok(VISITOR_MODULES.includes(module), `${file} belongs to no module a page loads`);
    const md = readFileSync(new URL(file, NOTES_DIR), 'utf8');
    assert.ok(md.startsWith(`# ${module}\n`), `${file} is headed by its module's name`);
    assert.doesNotMatch(md, /\u2014/, `${file} holds an em dash`);
    const src = source(module);
    assert.ok(src.includes(`Notes: ${notesPath(module)} (Urd repository).`), `${module}'s header names ${notesPath(module)}`);
    // The names a heading carries are found in the code alone, so a short comment that names one cannot stand in for it.
    let bare = '';
    let prev = 0;
    for (const note of notesOf(src)) { bare += `${src.slice(prev, note.start)} `; prev = note.end; }
    const code = `${bare}${src.slice(prev)}`.replace(/\s+/g, ' ').replaceAll('`', "'");
    for (const heading of notesSections(md).keys()) {
      if (heading === 'The module') continue;
      for (const part of heading.replace(/ \(\d+\)$/, '').split(' › ')) {
        const name = part.endsWith("')") ? part.slice(0, -1) : part;
        assert.ok(name === '(end)' || code.includes(name), `${file}: «${part}» no longer stands in ${module}, so its note follows the code`);
      }
    }
  }
});

test('every dynamic import in the modules the editor bundles that is not a plain relative path carries @vite-ignore', () => {
  const editor = new URL('../editor/src/', import.meta.url);
  const sources = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const url = new URL(name, dir);
      if (statSync(url).isDirectory()) walk(new URL(`${name}/`, dir));
      else if (/\.(js|svelte)$/.test(name)) sources.push(readFileSync(url, 'utf8'));
    }
  };
  walk(editor);
  const bundled = new Set();
  for (const src of sources) for (const m of src.matchAll(/\$engine\/([\w./-]+\.js)/g)) for (const name of engineClosure(m[1])) bundled.add(name);
  assert.ok(bundled.has('i18n.js') && bundled.has('plugins.js'), 'the modules the editor bundles are found');
  let directives = 0;
  for (const module of bundled) {
    const src = source(module);
    for (const m of src.matchAll(/\bimport\(\s*(?!['"]\.{1,2}\/[^'"\n]*['"]\s*\))/g)) {
      assert.ok(src.startsWith('/* @vite-ignore */', m.index + m[0].length), `${module}:${lineOf(src, m.index)}: a dynamic import of a path the bundler cannot follow carries /* @vite-ignore */`);
      directives++;
    }
  }
  assert.ok(directives >= 6, 'the directives are found');
});
