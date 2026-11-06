/**
 * The Legal panel's state (editor/src/lib/legal-model.js): what each group lacks, the state on each fold's heading, and the three cases the tab's amber dot stands for.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LEGAL_GROUPS, whoMissing, shownPage, legalState, groupChip } from '../editor/src/lib/legal-model.js';

const FULL = { legalName: 'Urd musikklag', email: 'post@urd.no', address: { street: 'Kongens gate 1', city: 'Trondheim' } };
const PAGES = [{ id: 'personvern' }, { id: 'vilkar' }, { id: 'skjult', hidden: true }];
const site = (over = {}) => ({ site: { contact: FULL, ...(over.site ?? {}) }, footer: over.footer ?? {}, pages: over.pages ?? PAGES });
const FORM = { forms: [{ page: 'Kontakt' }], checkout: null, browser: { shop: false } };
const SHOP = { forms: [], checkout: { page: 'Kasse' }, browser: { shop: true } };
const NONE = { forms: [], checkout: null, browser: { shop: false } };

test('the groups stand in the panel\'s order', () => {
  assert.deepEqual(LEGAL_GROUPS, ['who', 'privacy', 'terms']);
});

test('whoMissing: the legal name, the email, the street address and its town, one per field, blanks counted as empty', () => {
  assert.deepEqual(whoMissing(FULL), []);
  assert.deepEqual(whoMissing(undefined), ['legalName', 'email', 'street', 'city']);
  assert.deepEqual(whoMissing({ ...FULL, email: '  ' }), ['email']);
  assert.deepEqual(whoMissing({ ...FULL, address: { street: 'Kongens gate 1' } }), ['city']);
});

test('shownPage: a hidden or deleted page is no page', () => {
  assert.equal(shownPage(PAGES, 'personvern')?.id, 'personvern');
  assert.equal(shownPage(PAGES, 'skjult'), null);
  assert.equal(shownPage(PAGES, 'borte'), null);
  assert.equal(shownPage(PAGES, undefined), null);
});

test('the dot: no legal name or email while the site has a form or sells', () => {
  const noName = site({ site: { contact: { email: 'post@urd.no' } }, footer: { privacyPage: 'personvern' } });
  assert.deepEqual(legalState({ site: noName, facts: FORM }).reasons, ['who']);
  assert.deepEqual(legalState({ site: noName, facts: SHOP }).reasons, ['who']);
  assert.equal(legalState({ site: noName, facts: NONE }).dot, false, 'without a form or a shop the details are not asked for');
  const noAddress = site({ site: { contact: { legalName: 'Urd', email: 'post@urd.no' } }, footer: { privacyPage: 'personvern' } });
  assert.equal(legalState({ site: noAddress, facts: FORM }).dot, false, 'the address alone makes no dot');
});

test('the dot: no privacy page while the site has a form, a hidden page counting as none', () => {
  assert.deepEqual(legalState({ site: site(), facts: FORM }).reasons, ['privacy']);
  assert.deepEqual(legalState({ site: site({ footer: { privacyPage: 'skjult' } }), facts: FORM }).reasons, ['privacy']);
  assert.equal(legalState({ site: site({ footer: { privacyPage: 'personvern' } }), facts: FORM }).dot, false);
  assert.equal(legalState({ site: site(), facts: NONE }).dot, false);
});

test('the dot: parts of the terms page to fill while the site sells', () => {
  const withTerms = site({ site: { commerce: { termsPage: 'vilkar' } } });
  assert.deepEqual(legalState({ site: withTerms, facts: SHOP, termsOpen: 3 }).reasons, ['terms']);
  assert.equal(legalState({ site: withTerms, facts: SHOP, termsOpen: 0 }).dot, false);
  assert.equal(legalState({ site: withTerms, facts: NONE, termsOpen: 3 }).dot, false, 'a site that does not sell gets no dot for its terms');
});

test('the Terms of sale group shows while the site sells, the shop is on or a terms page is set', () => {
  assert.equal(legalState({ site: site(), facts: NONE }).terms.shown, false);
  assert.equal(legalState({ site: site(), facts: SHOP }).terms.shown, true);
  assert.equal(legalState({ site: site(), facts: NONE, shopOn: true }).terms.shown, true);
  assert.equal(legalState({ site: site({ site: { commerce: { termsPage: 'vilkar' } } }), facts: NONE }).terms.shown, true);
});

test('groupChip: each heading\'s state, with one and many counted apart', () => {
  const state = legalState({ site: site({ site: { contact: { legalName: 'Urd' }, commerce: { termsPage: 'vilkar' } } }), facts: SHOP, termsOpen: 1 });
  assert.deepEqual(groupChip('who', state), { key: 'legal.chip.toFill', tone: 'warn', n: 3 });
  assert.deepEqual(groupChip('privacy', state), { key: 'legal.chip.noPage', tone: 'warn' });
  assert.deepEqual(groupChip('terms', state), { key: 'legal.chip.partsToFill.one', tone: 'warn', n: 1 });
  const done = legalState({ site: site({ footer: { privacyPage: 'personvern' }, site: { commerce: { termsPage: 'vilkar' } } }), facts: SHOP, termsOpen: 0 });
  assert.deepEqual(groupChip('who', done), { key: 'legal.chip.filledIn', tone: 'ok' });
  assert.deepEqual(groupChip('privacy', done), { key: 'legal.chip.pageChosen', tone: 'ok' });
  assert.deepEqual(groupChip('terms', done), { key: 'legal.chip.pageChosen', tone: 'ok' });
});
