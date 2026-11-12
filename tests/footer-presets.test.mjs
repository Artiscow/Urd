/**
 * The footer's presets (footer-presets.js): a preset sets the footer's look and the parts it shows, keeps the owner's content in each part it shows, fills a part from its sample only where the footer has none, and takes away the parts it does not show.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { FOOTER_PRESETS, presetSample, applyPreset } = await engineImport('footer-presets.js');

const ta = (key) => `[${key}]`;
const pages = [{ id: 'hjem', title: 'Hjem' }, { id: 'om', title: 'Om oss' }, { id: 'personvern', title: 'Personvern' }];
const sample = (id) => presetSample(id, { ta, pages, privacyPage: 'personvern' });

test('every preset has a sample with the parts it shows, its words through the dictionary', () => {
  assert.equal(FOOTER_PRESETS.length, 10);
  for (const id of FOOTER_PRESETS) {
    const s = sample(id);
    assert.ok(s.align, `${id} sets an alignment`);
    assert.ok(s.copyright?.includes('[seed.orgName]'), `${id} names no one but the neutral name`);
  }
  assert.equal(sample('chapters').design, 'chapters');
  assert.equal(sample('mega').background.layers.length, 2);
  assert.deepEqual(sample('minimal').baseline, [], 'a site with a privacy page leaves the placeholder out of the bottom row');
});

test('on an empty footer a preset is its own sample, turned on', () => {
  const out = applyPreset({ version: 1 }, sample('newsletter'));
  assert.equal(out.show, true);
  assert.equal(out.cta.kind, 'newsletter');
  assert.equal(out.columns.length, 2);
  assert.equal(out.brand.title, '[seed.orgName]');
});

test('a preset keeps the owner\'s content in each part it shows, and sets the look whole', () => {
  const own = { version: 1, show: true, design: 'split', brand: { title: 'Kakeklubben' }, columns: [{ title: 'Sider', links: [{ label: 'Hjem', page: 'hjem' }] }], copyright: '© Kakeklubben', hideOn: ['om'] };
  const out = applyPreset(own, sample('chapters'));
  assert.equal(out.design, 'chapters');
  assert.equal(out.brand.title, 'Kakeklubben');
  assert.deepEqual(out.columns, own.columns);
  assert.equal(out.copyright, '© Kakeklubben');
  assert.deepEqual(out.hideOn, ['om'], 'what the preset does not arrange stays');
  assert.equal(own.design, 'split', 'the footer given is left as it is');
});

test('a preset takes away the parts it does not show, and the look it does not set', () => {
  const own = { version: 1, brand: { title: 'Klubben' }, cta: { kind: 'button', heading: 'Bli med', label: 'Meld deg inn', href: '/inn' }, background: { version: 1, layers: [] }, design: 'chapters', text: 'gammel' };
  const out = applyPreset(own, sample('minimal'));
  assert.equal(out.cta, undefined);
  assert.equal(out.background, undefined);
  assert.equal(out.design, undefined);
  assert.equal(out.text, undefined, 'the old plain text gives way');
  assert.equal(out.brand.title, 'Klubben');
});

test('the owner\'s links move between link columns and a link row', () => {
  const columns = [{ title: 'A', links: [{ label: 'En', page: 'hjem' }] }, { title: 'B', links: [{ label: 'To', href: '#' }] }];
  const toRow = applyPreset({ version: 1, columns }, sample('bigcta'));
  assert.deepEqual(toRow.linkRow.map((l) => l.label), ['En', 'To']);
  assert.equal(toRow.columns, undefined);
  const toColumns = applyPreset({ version: 1, linkRow: [{ label: 'En', page: 'hjem' }] }, sample('columns'));
  assert.equal(toColumns.columns.length, 1);
  assert.deepEqual(toColumns.columns[0].links.map((l) => l.label), ['En']);
});

test('a call to action keeps the owner\'s words where it is of the preset\'s kind, and the preset says whether it is big', () => {
  const own = { kind: 'button', heading: 'Bli med', label: 'Meld deg inn', href: '/inn' };
  const big = applyPreset({ version: 1, cta: own }, sample('bigcta'));
  assert.deepEqual([big.cta.label, big.cta.href, big.cta.big], ['Meld deg inn', '/inn', true]);
  const small = applyPreset({ version: 1, cta: { ...own, big: true } }, sample('split'));
  assert.equal(small.cta.big, undefined);
  const other = applyPreset({ version: 1, cta: own }, sample('newsletter'));
  assert.equal(other.cta.kind, 'newsletter');
  assert.equal(other.cta.heading, 'Bli med', 'another kind takes the owner\'s heading');
});

test('the Contact preset shows the site\'s contact details, also where the footer had them off', () => {
  assert.equal(applyPreset({ version: 1, contact: false }, sample('contact')).contact, undefined);
  assert.equal(applyPreset({ version: 1, contact: false }, sample('minimal')).contact, false, 'another preset leaves the switch as it is');
});
