/**
 * The blocks' designs (engine/block-designs.js) against what they stand for: the ids each block draws, the stored values they read, the dictionary keys their labels and descriptions use, the pictures the design picker shows, and the menu row every block with designs opens the picker from.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const { BLOCK_DESIGNS, DESIGN_BLOCK_TYPES, blockDesignOf, designLabelKey, designAboutKey, designPicture, blockDesignFamilies, blockDesignSample, blockDesignEmpty, designPreviewFrame } = await engineImport('block-designs.js');
const { CONTACT_DESIGNS } = await engineImport('contact-model.js');
const { GALLERY_VIEWS } = await engineImport('gallery-model.js');

const dict = async (lang) => (await engineImport(`locales/admin/${lang}.js`)).default.strings;
const DICTS = { nb: await dict('nb'), 'en-GB': await dict('en-GB'), tr: await dict('tr') };
const PICTURES = new URL('../template/admin/designs/', import.meta.url);
const FAMILIES = new URL('../editor/src/menu/families/', import.meta.url);

test('every block\'s designs are unique, and a stored value reads as one of them', () => {
  assert.deepEqual(DESIGN_BLOCK_TYPES, ['contact', 'gallery', 'stats', 'collection', 'countdown', 'ribbon', 'faq', 'timeline', 'quote', 'share', 'cart', 'button', 'shape']);
  for (const type of DESIGN_BLOCK_TYPES) {
    const { prop, ids } = BLOCK_DESIGNS[type];
    assert.ok(ids.length >= 2 && new Set(ids).size === ids.length, type);
    for (const id of ids) assert.equal(blockDesignOf(type, { [prop]: id }), id, `${type} ${id}`);
    assert.ok(ids.includes(blockDesignOf(type, {})), `${type}: a missing value is a design`);
    assert.ok(ids.includes(blockDesignOf(type, { [prop]: 'nope' })), `${type}: an unknown value is a design`);
  }
  assert.deepEqual(BLOCK_DESIGNS.contact.ids, CONTACT_DESIGNS.map((d) => d.id));
  assert.deepEqual(BLOCK_DESIGNS.gallery.ids, GALLERY_VIEWS);
  assert.equal(blockDesignOf('text', {}), null, 'a block without designs');
});

test('the families hold every design once', () => {
  for (const type of DESIGN_BLOCK_TYPES) {
    const ids = blockDesignFamilies(type).flatMap((f) => f.ids);
    assert.deepEqual([...ids].sort(), [...BLOCK_DESIGNS[type].ids].sort(), type);
  }
});

test('every design has its label, its description and its family\'s name in nb, en-GB and tr', () => {
  for (const [lang, strings] of Object.entries(DICTS)) {
    for (const type of DESIGN_BLOCK_TYPES) {
      for (const f of blockDesignFamilies(type)) assert.ok(strings[f.labelKey], `${lang} ${f.labelKey}`);
      for (const id of BLOCK_DESIGNS[type].ids) {
        assert.ok(strings[designLabelKey(type, id)], `${lang} ${designLabelKey(type, id)}`);
        assert.ok(strings[designAboutKey(type, id)], `${lang} ${designAboutKey(type, id)}`);
      }
    }
    for (const key of ['picker.title', 'picker.search', 'picker.count', 'picker.none', 'picker.current', 'picker.aboutHead', 'picker.use', 'picker.preview', 'tip.picker.design']) assert.ok(strings[key], `${lang} ${key}`);
  }
});

test('every design has its picture', () => {
  for (const type of DESIGN_BLOCK_TYPES) {
    for (const id of BLOCK_DESIGNS[type].ids) assert.ok(existsSync(new URL(designPicture(type, id), PICTURES)), designPicture(type, id));
  }
});

test('every block with designs opens the picker from the design row in its menu', () => {
  for (const type of DESIGN_BLOCK_TYPES) {
    const file = new URL(`${type[0].toUpperCase()}${type.slice(1)}.svelte`, FAMILIES);
    assert.match(readFileSync(file, 'utf8'), /<DesignRow pin="[A-Za-z]+" \/>/, type);
  }
});

test('the samples: the contact designs draw a sample association, and a block with content of its own is drawn with it', () => {
  const sample = blockDesignSample('contact', (key) => `«${key}»`);
  assert.equal(sample.contact.legalName, 'Apeiron Linjeforening');
  assert.deepEqual(sample.contact.points.map((p) => p.role), ['«seed.design.board»', '«seed.design.treasurer»', '«seed.design.press»']);
  for (const strings of Object.values(DICTS)) for (const key of ['seed.design.board', 'seed.design.treasurer', 'seed.design.press', 'seed.design.invoices']) assert.ok(strings[key], key);
  assert.equal(blockDesignSample('gallery', String).props.images.length, 6);
  assert.match(blockDesignSample('gallery', String).props.images[0].src, /^data:image\/svg\+xml,/);
  assert.deepEqual(blockDesignSample('stats', String), { props: {} });
  assert.equal(blockDesignEmpty('contact', {}, { site: {} }), true);
  assert.equal(blockDesignEmpty('contact', {}, { site: { contact: { phone: '+47 1' } } }), false);
  assert.equal(blockDesignEmpty('gallery', { images: [] }), true);
  assert.equal(blockDesignEmpty('gallery', { images: [{ src: '/media/a.webp' }] }), false);
  assert.equal(blockDesignEmpty('collection', { collection: 'nyheter' }), false);
  assert.equal(blockDesignEmpty('stats', {}), false);
});

test('the catalogue stays outside the visitor closure', () => {
  const shell = readFileSync(new URL('../template/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(shell, /block-designs\.js/);
  assert.ok(existsSync(new URL('block-designs.js', ENGINE_DIR)));
});

test('the preview page keeps a block at its real width and fills the pane with it', () => {
  // A 30 % block on a 1440 px design: the canvas there is 1440 less two 6 vw gutters, so the block is 380 px; the page is the narrowest one.
  const narrow = designPreviewFrame({ layout: { contentWidth: 1440, gutter: 6 } }, 30);
  assert.equal(narrow.width, 640);
  assert.ok(Math.abs((narrow.w / 100) * 640 * 0.88 - 0.3 * 1440 * 0.88) < 1, 'the block keeps its pixels');
  assert.ok(Math.abs(narrow.x + narrow.w / 2 - 50) < 1e-9, 'centred');
  // A wide block gets a page as wide as it needs, with the gutters around it.
  const wide = designPreviewFrame({ layout: { contentWidth: 1100, gutter: 6 } }, 90);
  assert.equal(wide.width, Math.ceil(990 / 0.88));
  assert.ok(wide.w > 99.9 && wide.w <= 100);
  // A full-width site and a site without a layout count as 1440 px.
  assert.equal(designPreviewFrame({ layout: { contentWidth: 'full', gutter: 6 } }, 100).width, 1440);
  assert.equal(designPreviewFrame(null, 100).width, 1440);
});
