/**
 * Contract test for the section presets: every create() gives a well-formed section, and every item() places new elements without overlapping existing blocks.
 * Schema validation of the same happens in editor/scripts/validate.mjs (ajv lives there); this test covers the structure and the placement geometry.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { registerSectionPresets, termsHtml } = await engineImport('sections/presets.js');

const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });

const overlaps = (a, b) => {
  const eps = 0.01;
  return a.x < b.x + b.w - eps && b.x < a.x + a.w - eps
    && a.y < b.y + b.h - eps && b.y < a.y + a.h - eps;
};

const assertBlock = (block, presetId) => {
  assert.ok(block.id, `${presetId}: block missing id`);
  assert.ok(block.type, `${presetId}: block missing type`);
  assert.ok(Number.isInteger(block.version) && block.version >= 1, `${presetId}: block missing version`);
  assert.ok(block.props, `${presetId}: block missing props`);
  const d = block.frames?.desktop;
  assert.ok(d, `${presetId}: block missing desktop frame`);
  for (const key of ['x', 'y', 'w', 'h', 'z']) {
    assert.equal(typeof d[key], 'number', `${presetId}: frame.${key} is not a number`);
  }
  // With bound content width (ADR-0018) the percentages are of the content band, not the window, so a block outside 0-100 lands in the gutter where there is no room at all.
  // The height must be positive for the same reason: a frame with h <= 0 is invisible, not just small.
  assert.ok(d.x >= 0, `${presetId}: block starts outside the content band (x=${d.x})`);
  assert.ok(d.x + d.w <= 100.01, `${presetId}: block sticks out of the section (${d.x + d.w}%)`);
  assert.ok(d.w > 0, `${presetId}: block without width (w=${d.w})`);
  assert.ok(d.h > 0, `${presetId}: block without height (h=${d.h})`);
};

test('presets: create() gives well-formed sections', () => {
  assert.ok(defs.size >= 18, `expected at least 18 presets, got ${defs.size}`);
  for (const [id, def] of defs) {
    const section = def.create();
    assert.ok(section.id && section.preset === id, `${id}: section missing id/preset`);
    assert.ok(section.background?.layers?.length, `${id}: section missing background`);
    // The privacy page and the terms of sale have no height of their own: their length is their text's (sections/presets.js).
    if (id !== 'privacy' && id !== 'terms') assert.ok(section.size?.minHeight, `${id}: section missing min height`);
    else assert.equal(section.size.minHeight, undefined, `${id}: the section takes its blocks' height`);
    for (const block of section.blocks) assertBlock(block, id);
    const ids = section.blocks.map((b) => b.id);
    assert.equal(new Set(ids).size, ids.length, `${id}: duplicate block ids`);
  }
});

test('presets: create() gives fresh objects every time', () => {
  for (const [id, def] of defs) {
    const a = def.create();
    const b = def.create();
    assert.notEqual(a.id, b.id, `${id}: two calls share a section id`);
    if (a.blocks.length) {
      assert.notEqual(a.blocks[0], b.blocks[0], `${id}: two calls share block objects`);
    }
  }
});

/** Mirrors the editor's insertBlocks: moves are applied first, then the blocks are added. */
const applyItem = (section, next) => {
  for (const move of next.moves ?? []) {
    const block = section.blocks.find((b) => b.id === move.blockId);
    if (block) block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
  }
  section.blocks.push(...next.blocks);
};

const assertNoOverlap = (section, next, id, hint) => {
  const moved = new Set((next.moves ?? []).map((m) => m.blockId));
  for (const block of next.blocks) {
    assertBlock(block, id);
    for (const existing of section.blocks) {
      if (moved.has(existing.id) || next.blocks.includes(existing)) continue;
      assert.ok(!overlaps(block.frames.desktop, existing.frames.desktop),
        `${id}${hint}: new element (${block.type} @ ${block.frames.desktop.x},${block.frames.desktop.y}) overlaps ${existing.type} @ ${existing.frames.desktop.x},${existing.frames.desktop.y}`);
    }
    assert.ok(next.bottom >= block.frames.desktop.y + block.frames.desktop.h,
      `${id}${hint}: bottom (${next.bottom}) does not cover the new element`);
  }
};

test('presets: item() places new elements without overlap, two rounds', () => {
  for (const [id, def] of defs) {
    if (!def.item) continue;
    assert.ok(def.itemLabel, `${id}: item without itemLabel`);
    const section = def.create();
    for (let round = 0; round < 2; round++) {
      const next = def.item(section);
      assert.ok(Number.isFinite(next.bottom), `${id}: item() missing bottom`);
      assert.ok(next.blocks.length, `${id}: item() gave no blocks`);
      assertNoOverlap(section, next, id, '');
      applyItem(section, next);
      // After applying, nothing in the section may overlap (catches moves that move too little).
      for (let i = 0; i < section.blocks.length; i++) {
        for (let j = i + 1; j < section.blocks.length; j++) {
          assert.ok(!overlaps(section.blocks[i].frames.desktop, section.blocks[j].frames.desktop),
            `${id}: overlap after applying item (${section.blocks[i].type} and ${section.blocks[j].type})`);
        }
      }
    }
  }
});

test('presets: item() fills the gap when a middle element is deleted', () => {
  for (const [id, def] of defs) {
    if (!def.item) continue;
    const section = def.create();
    const first = def.item(section);
    applyItem(section, first);
    // Delete the FIRST added element (mid-layout for the grid presets) and ask for a new one.
    const removed = new Set(first.blocks.map((b) => b.id));
    section.blocks = section.blocks.filter((b) => !removed.has(b.id));
    const second = def.item(section);
    assertNoOverlap(section, second, id, ' (after deletion)');
  }
});

test('termsHtml: the site\'s facts and the form\'s words set in as text, the form only where its words are given', () => {
  const text = (key, vars = {}) => `<p>${key}${Object.entries(vars).map(([k, v]) => ` ${k}=${v}`).join('')}</p>`;
  const formText = (key) => `${key} & <i>`;
  const facts = { seller: 'Lag & Co <b>', details: 'Gate 1', privacy: { href: '/personvern', page: 'personvern', title: 'Personvern' } };
  const html = termsHtml({ text, formText, facts });
  assert.ok(html.includes('seller=Lag &amp; Co &lt;b&gt;'), 'the seller is text, never markup');
  assert.ok(!html.includes('<b>'));
  assert.ok(html.includes('href=/personvern') && html.includes('page=personvern') && html.includes('title=Personvern'), 'the privacy page is linked by its id, so the link follows its address');
  assert.ok(html.includes('<blockquote data-urd-form><h3>shop.wfTitle &amp; &lt;i&gt;</h3>'), 'the withdrawal form in the visitor texts, set apart as a form');
  assert.match(html, /<blockquote data-urd-form>[^]*shop\.wfDelete[^]*<\/blockquote>/, 'the whole form inside it');
  assert.ok(html.indexOf('seed.terms.glance') < html.indexOf('seed.terms.agreement'), 'the main points before the first part');
  assert.ok(html.includes('shop.wfTo &amp; &lt;i&gt; Lag &amp; Co &lt;b&gt;, Gate 1'), 'the form is addressed to the seller');
  const bare = termsHtml({ text });
  assert.ok(!bare.includes('shop.wf'), 'no form without its words');
  assert.ok(bare.includes('seed.terms.sellerPlaceholder') && bare.includes('seed.terms.details'), 'the seller\'s place is marked to fill in');
  assert.ok(bare.includes('privacyLink=</p>'), 'no privacy link without a privacy page');
});

test('presets: the terms of sale are a page of their own, never in the section lists', () => {
  assert.equal(defs.get('terms').pageOnly, true);
  assert.equal(defs.get('terms').create().blocks[0].props.design, 'long', 'the terms are a document in the long read');
});

test('termsHtml: the template\'s [bracketed] words are marked to fill in, the seller\'s missing details as contact parts, the site\'s own words never', () => {
  const text = (key, vars = {}) => ({
    'seed.terms.prices': '<p>Prices. [Write what shipping costs.]</p>',
    'seed.terms.parties': `<p>The seller is ${vars.seller}, ${vars.details}.</p>`,
    'seed.terms.sellerPlaceholder': '[the seller\'s name]',
    'seed.terms.details': '[organisation number, address]',
  })[key] ?? '';
  const html = termsHtml({ text, facts: { seller: 'Lag [Oslo]' } });
  assert.ok(html.includes('<span data-urd-fill>[Write what shipping costs.]</span>'), 'the template\'s own part');
  assert.ok(html.includes('The seller is Lag [Oslo], <span data-urd-fill="contact">[organisation number, address]</span>'), 'a bracket in the seller\'s name is the site\'s, the missing details a contact part');
  const bare = termsHtml({ text });
  assert.ok(bare.includes('<span data-urd-fill="contact">[the seller&#39;s name]</span>') || bare.includes('<span data-urd-fill="contact">[the seller\'s name]</span>'));
});
