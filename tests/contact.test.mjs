/**
 * The association's legal and contact details (engine/contact-model.js on the country profiles of engine/contact-profiles.js): the normalising, the check outcome, the display, the VAT number, the legal line and the Organization JSON-LD.
 * The footer is rendered with a minimal document stub, to show the details in every footer build, an empty field leaving no trace and the two switches.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const CONTACT_MODEL = await engineImport('contact-model.js');
const { normaliseId, validateId, formatId, siteContact, vatNumber, legalParts, telHref, contactParts, organizationContact } = CONTACT_MODEL;
const { PROFILES, GENERIC, COUNTRY_CODES, profileOf, countryForLanguage } = await engineImport('contact-profiles.js');
const { CHECKS } = await engineImport('contact-checks.js');
const { footerContact, footerLegal } = await engineImport('footer-model.js');
const { siteJsonLd } = await engineImport('seo.js');
const { renderFooter } = await engineImport('footer.js');

const NO = {
  country: 'NO', legalName: 'Apeiron Linjeforening', ids: { org: '974760673' }, registers: { org: 'Foretaksregisteret' }, vat: { registered: true },
  address: { street: 'Høgskoleringen 5', postalCode: '7034', city: 'Trondheim' }, phone: '+47 73 59 00 00', email: 'post@apeiron.no',
};

const siteWith = (contact, footer = {}, lang = 'nb') => ({ site: { title: 'Apeiron', lang, contact }, pages: [], footer: { version: 1, show: true, ...footer } });

test('the profiles: 57 countries, every id with a key, a label and a form, every check known, every VAT kind valid', () => {
  assert.equal(COUNTRY_CODES.length, 57);
  const ids = (p) => p.ids;
  for (const [code, p] of Object.entries(PROFILES)) {
    const keys = new Set();
    for (const def of ids(p)) {
      assert.ok(def.key && !keys.has(def.key), `${code} ${def.key}`);
      keys.add(def.key);
      assert.ok(def.status || def.regex instanceof RegExp, `${code} ${def.key} has a form`);
      assert.ok(def.status || def.ownLabel || def.label, `${code} ${def.key} has a label`);
      if (def.check) assert.ok(CHECKS[def.check], `${code} ${def.key} check ${def.check}`);
    }
    const { vat } = p;
    assert.ok(['none', 'same', 'mark', 'wrap', 'separate', 'status'].includes(vat.kind), `${code} vat kind`);
    if (vat.of) assert.ok(keys.has(vat.of), `${code} vat.of ${vat.of}`);
    const choices = ids(p).filter((d) => d.choice).map((d) => d.choice);
    for (const choice of new Set(choices)) assert.ok(choices.filter((c) => c === choice).length > 1, `${code} choice ${choice} has alternatives`);
    if (vat.kind === 'separate') assert.ok(vat.regex instanceof RegExp && (vat.label || vat.raw), `${code} separate vat`);
    if (vat.check) assert.ok(CHECKS[vat.check], `${code} vat check`);
  }
  assert.equal(profileOf('ZZ'), GENERIC);
  assert.equal(profileOf('VA'), GENERIC);
});

test('countryForLanguage: the site language suggests a country', () => {
  assert.equal(countryForLanguage('nb'), 'NO');
  assert.equal(countryForLanguage('se'), 'NO');
  assert.equal(countryForLanguage('en-GB'), 'GB');
  assert.equal(countryForLanguage('tr'), 'TR');
  assert.equal(countryForLanguage('sv-SE'), 'SE');
  assert.equal(countryForLanguage('eo'), null);
});

test('normaliseId, validateId and formatId: separators stripped, the prefix added, a refusing or a warning check, the display grouping', () => {
  const org = PROFILES.NO.ids[0];
  assert.equal(normaliseId(org, ' 974 760-673 '), '974760673');
  assert.equal(validateId(org, '974760673'), 'ok');
  assert.equal(validateId(org, '974760674'), 'bad', 'a verified check refuses');
  assert.equal(validateId(org, '12345'), 'form', 'the form, told apart from a failed check');
  assert.equal(validateId(org, ''), 'ok', 'nothing typed');
  assert.equal(formatId(org, '974760673'), '974 760 673');
  const kt = PROFILES.IS.ids[0];
  assert.equal(validateId(kt, '5402696039'), 'warn', 'a check the registry no longer keeps warns');
  assert.equal(formatId(kt, '5402696029'), '540269-6029');
  const uid = PROFILES.CH.ids[0];
  assert.equal(normaliseId(uid, 'che-135.626.465'), 'CHE135626465');
  assert.equal(validateId(uid, 'CHE135626465'), 'ok');
  assert.equal(formatId(uid, 'CHE135626465'), 'CHE-135.626.465');
  const vr = PROFILES.DE.ids[0];
  assert.equal(normaliseId(vr, '  VR   12345  B '), 'VR 12345 B', 'free text keeps its spaces');
  assert.equal(normaliseId(vr, '12345 B'), 'VR 12345 B', 'the register letters added to a bare number');
  assert.equal(normaliseId(vr, 'vr12345'), 'VR 12345');
  assert.equal(normaliseId(vr, '12345 b'), 'VR 12345 B');
  assert.equal(normaliseId(PROFILES.DE.ids[2], 'gnr 12'), 'GnR 12', 'a mixed-case prefix keeps its case');
  assert.equal(validateId(vr, 'VR 12345 B'), 'ok');
  assert.equal(normaliseId(PROFILES.DE.ids[1], 'hrb12345'), 'HRB 12345');
  const fn = PROFILES.AT.ids[0];
  assert.equal(normaliseId(fn, 'FN 191155 K'.replace(/^FN ?/, '')), '191155k');
  assert.equal(validateId(fn, '191155k'), 'ok');
  assert.equal(validateId(fn, '191155a'), 'warn');
  const sv = PROFILES.SE.ids[0];
  assert.equal(formatId(sv, '2021005489'), '202100-5489');
});

test('siteContact: the country from the data or the language, every number normalised, the wrong type empty', () => {
  const c = siteContact(siteWith(NO));
  assert.equal(c.country, 'NO');
  assert.equal(c.profile, PROFILES.NO);
  assert.deepEqual(c.ids, { org: '974760673' });
  assert.deepEqual(c.registers, { org: 'Foretaksregisteret' });
  assert.equal(c.vat.registered, true);
  assert.equal(siteContact(siteWith(undefined, {}, 'tr')).country, 'TR', 'the language suggests');
  assert.equal(siteContact(siteWith(undefined, {}, 'eo')).country, 'XX', 'or the generic profile');
  const odd = siteContact(siteWith({ country: 'no', legalName: 4, ids: 'x', registers: { org: 'Elsewhere' }, vat: 'yes' }));
  assert.equal(odd.country, 'NO', 'a lower-case code is not a code; the language decides');
  assert.equal(odd.legalName, '');
  assert.deepEqual(odd.ids, {});
  assert.deepEqual(odd.registers, {});
  assert.equal(odd.vat.registered, false);
});

test('vatNumber: the five ways a country writes it', () => {
  assert.equal(vatNumber(siteContact(siteWith(NO))), '974760673MVA', 'a mark after the number');
  assert.equal(vatNumber(siteContact(siteWith({ ...NO, vat: {} }))), null, 'not registered');
  assert.equal(vatNumber(siteContact(siteWith({ country: 'SE', ids: { org: '2021005489' }, vat: { registered: true } }))), 'SE202100548901', 'wrapped');
  assert.equal(vatNumber(siteContact(siteWith({ country: 'HU', ids: { adoszam: '15847397241' }, vat: { registered: true } }))), 'HU15847397', 'the first digits wrapped');
  assert.equal(vatNumber(siteContact(siteWith({ country: 'DE', vat: { registered: true, number: 'de 259 582 878' } }))), 'DE259582878', 'a separate number, normalised');
  assert.equal(vatNumber(siteContact(siteWith({ country: 'TR', ids: { vkn: '4610051366' }, vat: { registered: true } }))), '4610051366', 'the same number');
  assert.equal(vatNumber(siteContact(siteWith({ country: 'US', vat: { registered: true } }))), null, 'no VAT');
  assert.equal(vatNumber(siteContact(siteWith({ country: 'AU', ids: { abn: '51824753556' }, vat: { registered: true } }))), null, 'a status only');
});

test('legalParts: the name, each number as the country writes it, the VAT number or status, the representative', () => {
  const texts = (contact) => legalParts(siteContact(siteWith(contact))).map((p) => p.text);
  assert.deepEqual(texts(NO), ['Apeiron Linjeforening', 'Org.nr. 974 760 673 MVA · Foretaksregisteret']);
  assert.deepEqual(texts({ ...NO, registers: {}, vat: {} }), ['Apeiron Linjeforening', 'Org.nr. 974 760 673']);
  assert.deepEqual(texts({ country: 'DE', ids: { vr: 'VR 12345 B' }, extras: { vr: 'Amtsgericht Berlin-Charlottenburg' }, vat: { registered: true, number: 'DE259582878' }, representative: 'Erika Mustermann' }),
    ['Vereinsregister: Amtsgericht Berlin-Charlottenburg, VR 12345 B', 'USt-IdNr. DE259582878', 'Erika Mustermann']);
  assert.deepEqual(texts({ country: 'GB', ids: { crn: '07510759', charityEw: '1234567' }, registers: { crn: 'England and Wales' }, vat: { registered: true, number: 'GB220430231' } }),
    ['Registered in England and Wales, Company No. 07510759', 'Registered charity number 1234567', 'VAT Reg No. GB220430231']);
  assert.deepEqual(texts({ country: 'FR', ids: { rcs: '356000000', rup: true }, extras: { rcs: 'Paris' } }), ['RCS Paris 356 000 000', 'Reconnue d\'utilité publique']);
  assert.deepEqual(texts({ country: 'TR', ids: { vkn: '4610051366' }, extras: { vkn: 'Beşiktaş' }, vat: { registered: true } }), ['Vergi Dairesi: Beşiktaş, Vergi No: 4610051366']);
  assert.deepEqual(texts({ country: 'IT', ids: { piva: '06363391001' }, vat: { registered: true } }), ['P.IVA 06363391001'], 'a VAT number already shown as a number is not repeated');
  assert.deepEqual(texts({ country: 'AU', ids: { abn: '51824753556', acnc: true }, vat: { registered: true } }), ['ABN 51 824 753 556', 'Registered charity', 'GST registered']);
  assert.deepEqual(texts({ country: 'XX', label: 'Reg. no.', ids: { number: 'A-1' } }), ['Reg. no. A-1'], 'a country outside the list');
  assert.deepEqual(legalParts(siteContact(siteWith({ country: 'DE', representative: 'Erika Mustermann' }))), [{ kind: 'representative', text: 'Erika Mustermann' }]);
  assert.deepEqual(texts({ phone: '123' }), []);
  // A court, register or tax office not yet typed leaves the bare line, never a dangling separator.
  assert.deepEqual(texts({ country: 'GB', ids: { crn: '07510759' } }), ['Company No. 07510759']);
  assert.deepEqual(texts({ country: 'DE', ids: { vr: 'VR 1' } }), ['Vereinsregister: VR 1']);
  assert.deepEqual(texts({ country: 'TR', ids: { vkn: '4610051366' } }), ['Vergi No: 4610051366']);
  assert.deepEqual(texts({ country: 'BE', ids: { kbo: '0314595348' } }), ['Ondernemingsnummer 0314.595.348']);
  assert.deepEqual(texts({ country: 'GR', ids: { afm: '997073525' } }), ['ΑΦΜ 997073525']);
  assert.deepEqual(texts({ country: 'NO', ids: { org: '974760673' } }), ['Org.nr. 974 760 673']);
  // Switzerland joins the register's and the VAT suffix.
  assert.deepEqual(texts({ country: 'CH', ids: { uid: 'CHE135626465' }, registers: { uid: 'HR' }, vat: { registered: true } }), ['UID CHE-135.626.465 HR/MWST']);
  assert.deepEqual(texts({ country: 'CH', ids: { uid: 'CHE135626465' }, vat: { registered: true } }), ['UID CHE-135.626.465 MWST']);
  // Without a label of the country's own, the VAT number is named in the visitor's language.
  assert.deepEqual(legalParts(siteContact(siteWith({ country: 'XX', vat: { registered: true, number: 'X123' } }))), [{ kind: 'vat', text: 'X123', labelKey: 'contact.vat' }]);
});

test('telHref and contactParts: the address lines, and links only where they are usable', () => {
  assert.equal(telHref('+47 73 59 00 00'), 'tel:+4773590000');
  assert.equal(telHref('ring oss'), null);
  assert.deepEqual(contactParts(siteContact(siteWith(NO))), {
    address: ['Høgskoleringen 5', '7034 Trondheim'],
    phone: { label: '+47 73 59 00 00', href: 'tel:+4773590000' },
    email: { label: 'post@apeiron.no', href: 'mailto:post@apeiron.no' },
  });
  assert.deepEqual(contactParts(siteContact(siteWith({ address: { city: 'Trondheim' }, email: 'post' }))), { address: ['Trondheim'], phone: null, email: { label: 'post', href: null } });
  assert.equal(contactParts(siteContact(siteWith({ legalName: 'X' }))), null);
});

test('organizationContact and siteJsonLd: the ISO 6523 code, the other numbers, the VAT number, the status and the address; a refused number left out', () => {
  assert.deepEqual(organizationContact(siteContact(siteWith(NO))), {
    legalName: 'Apeiron Linjeforening',
    iso6523Code: '0192:974760673',
    vatID: '974760673MVA',
    address: { '@type': 'PostalAddress', streetAddress: 'Høgskoleringen 5', postalCode: '7034', addressLocality: 'Trondheim', addressCountry: 'NO' },
    telephone: '+47 73 59 00 00',
    email: 'post@apeiron.no',
  });
  const gb = organizationContact(siteContact(siteWith({ country: 'GB', ids: { crn: '07510759', charityEw: '1234567' }, vat: { registered: true, number: 'GB220430231' } })));
  assert.equal(gb.iso6523Code, undefined, 'no ISO 6523 code in the UK');
  assert.deepEqual(gb.identifier, [{ '@type': 'PropertyValue', propertyID: 'Company No.', value: '07510759' }, { '@type': 'PropertyValue', propertyID: 'Registered charity number', value: '1234567' }]);
  assert.equal(gb.vatID, 'GB220430231');
  const us = organizationContact(siteContact(siteWith({ country: 'US', ids: { ein: '123456789', c3: true } })));
  assert.equal(us.nonprofitStatus, 'Nonprofit501c3');
  assert.deepEqual(us.identifier, { '@type': 'PropertyValue', propertyID: 'EIN', value: '12-3456789' });
  assert.equal(us.vatID, undefined);
  assert.equal(organizationContact(siteContact(siteWith({ country: 'CH', ids: { uid: 'CHE135626465' } }))).iso6523Code, '0183:CHE135626465', 'the Swiss scheme keeps CHE');
  assert.equal(organizationContact(siteContact(siteWith({ country: 'IT', ids: { piva: '06363391001' } }))).iso6523Code, '0211:IT06363391001', 'the Italian VAT scheme adds IT');
  assert.equal(organizationContact(siteContact(siteWith({ country: 'MC', ids: { rci: '16 S 06897' } }))).iso6523Code, '0206:16S06897', 'no spaces in the code');
  assert.equal(organizationContact(siteContact(siteWith({ country: 'NO', ids: { org: '12345' } }))).iso6523Code, undefined, 'a number in the wrong form');
  const bad = organizationContact(siteContact(siteWith({ country: 'NO', ids: { org: '974760674' }, vat: { registered: true } })));
  assert.deepEqual(bad, {}, 'a number failing its check, and the VAT number derived from it');
  const ld = siteJsonLd(siteWith(NO), 'https://apeiron.no');
  assert.equal(ld['@type'], 'Organization');
  assert.equal(ld.legalName, 'Apeiron Linjeforening');
  assert.deepEqual(Object.keys(siteJsonLd(siteWith(undefined), 'https://apeiron.no')).sort(), ['@context', '@type', 'name', 'url']);
});

test('sellerParts: the name, the numbers and the address on one line, without the representative', () => {
  const { sellerParts } = CONTACT_MODEL;
  assert.deepEqual(sellerParts(siteWith({ ...NO, representative: 'Kari Nordmann' })), {
    name: 'Apeiron Linjeforening',
    legal: [{ kind: 'id', text: 'Org.nr. 974 760 673 MVA · Foretaksregisteret' }],
    address: 'Høgskoleringen 5, 7034 Trondheim',
    phone: { label: '+47 73 59 00 00', href: 'tel:+4773590000' },
    email: { label: 'post@apeiron.no', href: 'mailto:post@apeiron.no' },
  });
  assert.equal(sellerParts(siteWith({ email: 'post@apeiron.no' })).name, 'Apeiron', 'the site title stands in for a missing legal name');
  assert.equal(sellerParts(siteWith(undefined)), null);
  assert.equal(sellerParts(undefined), null);
});

test('Norway names Frivillighetsregisteret beside the number', () => {
  assert.deepEqual(PROFILES.NO.ids[0].registers, ['Enhetsregisteret', 'Foretaksregisteret', 'Frivillighetsregisteret']);
  assert.deepEqual(legalParts(siteContact(siteWith({ country: 'NO', ids: { org: '974760673' }, registers: { org: 'Frivillighetsregisteret' } }))).map((p) => p.text), ['Org.nr. 974 760 673 · Frivillighetsregisteret']);
});

test('footerContact and footerLegal: the two switches, each hiding its own part', () => {
  assert.equal(footerContact(siteWith(NO, { contact: false })), null);
  assert.equal(footerLegal(siteWith(NO, { contact: false })).length, 2);
  assert.equal(footerLegal(siteWith(NO, { legal: false })), null);
  assert.equal(footerContact(siteWith(NO, { legal: false })).address[0], 'Høgskoleringen 5');
  assert.equal(footerLegal(siteWith({ phone: '1' })), null, 'nothing to show');
});

/** The smallest element stub the footer render needs. */
class StubElement {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.className = '';
    this.ownText = '';
    this.attributes = {};
    const classes = () => this.className.split(' ').filter(Boolean);
    this.classList = {
      add: (...names) => { this.className = [...new Set([...classes(), ...names])].join(' '); },
      contains: (name) => classes().includes(name),
      remove: (name) => { this.className = classes().filter((c) => c !== name).join(' '); },
    };
    this.style = { setProperty() {}, removeProperty() {} };
  }

  get textContent() { return this.ownText + this.children.map((c) => c.textContent).join(' '); }

  set textContent(value) {
    this.children = [];
    this.ownText = value == null ? '' : String(value);
  }

  set innerHTML(value) { this.ownText = ''; this.children = []; }

  appendChild(child) { this.children.push(child); return child; }

  append(...children) { for (const child of children) this.appendChild(child); }

  prepend(child) { this.children.unshift(child); }

  replaceChildren() { this.children = []; }

  setAttribute(name, value) { this.attributes[name] = String(value); }

  addEventListener() {}

  all() { return this.children.flatMap((c) => [c, ...c.all()]); }
}

function renderWith(site) {
  Object.defineProperty(globalThis, 'document', { value: { createElement: (tag) => new StubElement(tag) }, configurable: true, writable: true });
  try {
    const host = new StubElement('footer');
    renderFooter(site, host, 'hjem');
    return host;
  } finally {
    delete globalThis.document;
  }
}

const LEGAL_TEXT = 'Apeiron Linjeforening · Org.nr. 974 760 673 MVA · Foretaksregisteret';

test('every footer build shows the contact details and the legal line', () => {
  const builds = {
    plain: {},
    text: { text: 'Velkommen' },
    columns: { columns: [{ title: 'Sider', links: [{ label: 'Hjem', href: '/' }] }], copyright: '© Apeiron' },
    chapters: { design: 'chapters', columns: [{ title: 'Sider', links: [{ label: 'Hjem', href: '/' }] }] },
    split: { design: 'split', brand: { title: 'Apeiron' } },
    bigcta: { cta: { kind: 'button', big: true, heading: 'Bli med', label: 'Meld deg inn', href: '/' } },
  };
  for (const [name, footer] of Object.entries(builds)) {
    const nodes = renderWith(siteWith(NO, footer)).all();
    const address = nodes.find((n) => n.tagName === 'ADDRESS');
    assert.ok(address, `${name}: an <address>`);
    assert.match(address.textContent, /Høgskoleringen 5/, name);
    assert.deepEqual(address.all().filter((n) => n.tagName === 'A').map((a) => a.href), ['tel:+4773590000', 'mailto:post@apeiron.no'], name);
    assert.equal(nodes.find((n) => n.className === 'urd-footer-legal')?.textContent, LEGAL_TEXT, name);
  }
});

test('the representative gets the visitor language\'s title in the footer', () => {
  const nodes = renderWith(siteWith({ ...NO, representative: 'Kari Nordmann' })).all();
  assert.equal(nodes.find((n) => n.className === 'urd-footer-legal').textContent, `${LEGAL_TEXT} · Ansvarlig: Kari Nordmann`);
});

test('an empty field leaves no trace, and each switch leaves the other part', () => {
  const empty = renderWith(siteWith(undefined, { text: 'Velkommen' })).all();
  assert.ok(!empty.some((n) => n.tagName === 'ADDRESS' || n.className === 'urd-footer-legal'));
  const nameOnly = renderWith(siteWith({ legalName: 'Apeiron Linjeforening' })).all();
  assert.equal(nameOnly.find((n) => n.className === 'urd-footer-legal').textContent, 'Apeiron Linjeforening');
  assert.ok(!nameOnly.some((n) => n.tagName === 'ADDRESS'));
  const noContact = renderWith(siteWith(NO, { contact: false, copyright: '© Apeiron' })).all();
  assert.ok(!noContact.some((n) => n.tagName === 'ADDRESS'));
  assert.equal(noContact.find((n) => n.className === 'urd-footer-legal').textContent, LEGAL_TEXT);
  const noLegal = renderWith(siteWith(NO, { legal: false, copyright: '© Apeiron' })).all();
  assert.ok(noLegal.some((n) => n.tagName === 'ADDRESS'));
  assert.ok(!noLegal.some((n) => n.className === 'urd-footer-legal'));
  const off = renderWith(siteWith(NO, { legal: false, contact: false })).all();
  assert.ok(!off.some((n) => n.tagName === 'ADDRESS' || n.className === 'urd-footer-legal'), 'both off: nothing of it in the footer');
});

const { contactBlock, contactBlockModel } = await engineImport('blocks/contact.js');
const { CONTACT_PARTS, CONTACT_DESIGNS, contactDesign, pointParts } = await engineImport('contact-model.js');

test('contactBlockModel: the chosen parts, the name once, nothing when the site has nothing', () => {
  assert.deepEqual(CONTACT_PARTS, ['name', 'address', 'phone', 'email', 'legal']);
  const all = contactBlockModel(siteWith(NO), { parts: CONTACT_PARTS });
  assert.equal(all.name, 'Apeiron Linjeforening');
  assert.deepEqual(all.address, ['Høgskoleringen 5', '7034 Trondheim']);
  assert.equal(all.phone.href, 'tel:+4773590000');
  assert.deepEqual(all.legal.map((p) => p.text), ['Org.nr. 974 760 673 MVA · Foretaksregisteret'], 'the legal name stands once, as the name');
  const legalOnly = contactBlockModel(siteWith(NO), { parts: ['legal'] });
  assert.equal(legalOnly.legal[0].text, 'Apeiron Linjeforening', 'without the name part the legal line starts from the name');
  const defaults = contactBlockModel(siteWith(NO), contactBlock.defaults());
  assert.deepEqual(defaults.legal, [], 'the legal line is off by default');
  assert.equal(contactBlockModel(siteWith({ phone: '+47 1' }), contactBlock.defaults()).name, 'Apeiron', 'the site title stands in for a missing legal name');
  assert.equal(contactBlockModel(siteWith({ phone: '+47 1' }), { parts: ['address'] }), null, 'nothing the block shows is filled');
  assert.equal(contactBlockModel(siteWith(undefined), { parts: ['phone', 'email'] }), null);
});

/** Draws the contact block with the stub; `rest` gets the elements the block puts beside its <address> (the phone bar). */
function drawBlock(contact, props, { preview = false, viewport = 'mobile' } = {}) {
  Object.defineProperty(globalThis, 'document', { value: { createElement: (tag) => new StubElement(tag) }, configurable: true, writable: true });
  const frame = globalThis.requestAnimationFrame;
  globalThis.requestAnimationFrame = () => 0;
  try {
    const el = new StubElement('div');
    contactBlock.render(el, { ...contactBlock.defaults(), ...props }, { site: siteWith(contact), preview, viewport });
    return { host: el.children[0], rest: el.children.slice(1) };
  } finally {
    delete globalThis.document;
    globalThis.requestAnimationFrame = frame;
  }
}

const hrefs = (root) => root.all().filter((n) => n.tagName === 'A' && n.href).map((a) => a.href);

test('the contact block draws an <address> with links, and nothing on a published page without details', () => {
  const { host } = drawBlock(NO, {});
  assert.equal(host.tagName, 'ADDRESS');
  assert.ok(host.className.includes('urd-contact-lines'));
  assert.deepEqual(hrefs(host), ['tel:+4773590000', 'mailto:post@apeiron.no']);
  assert.equal(host.children[0].children[0].textContent, 'Apeiron Linjeforening');
  assert.equal(drawBlock(undefined, {}).host.children.length, 0, 'a published page shows nothing');
  assert.equal(drawBlock(undefined, {}, { preview: true }).host.children[0].className, 'urd-contact-empty', 'the editor says where to type them');
});

test('every design draws the details with their links, and an unknown design draws the lines', () => {
  assert.deepEqual(CONTACT_DESIGNS.map((d) => d.id), ['lines', 'icons', 'card', 'tiles', 'facts', 'buttons', 'map', 'strip', 'poster', 'roles', 'qr']);
  for (const { id } of CONTACT_DESIGNS) {
    const { host } = drawBlock(NO, { design: id, parts: CONTACT_PARTS });
    assert.ok(host.className.split(' ').includes(`urd-contact-${id}`), id);
    assert.match(host.textContent, /Høgskoleringen 5/, id);
    assert.match(host.textContent, /Org\.nr\. 974 760 673 MVA/, `${id}: the legal line`);
    const links = hrefs(host);
    assert.ok(links.includes('tel:+4773590000') && links.includes('mailto:post@apeiron.no'), `${id}: ${links}`);
  }
  assert.ok(drawBlock(NO, { design: 'nope' }).host.className.includes('urd-contact-lines'));
  assert.equal(contactDesign('nope').id, 'lines');
});

test('the strip lies on a band unless switched off, and the save button stands in every design but the strip', () => {
  assert.ok(drawBlock(NO, { design: 'strip' }).host.classList.contains('urd-contact-band'));
  assert.ok(!drawBlock(NO, { design: 'strip', band: false }).host.classList.contains('urd-contact-band'));
  const saves = (props) => drawBlock(NO, props).host.all().filter((n) => n.className === 'urd-contact-save').length;
  assert.equal(saves({}), 0, 'off by default');
  for (const { id } of CONTACT_DESIGNS) assert.equal(saves({ design: id, vcard: true }), id === 'strip' ? 0 : 1, id);
});

test('the phone bar stands beside the <address> on a phone only, with the actions the site has', () => {
  assert.equal(drawBlock(NO, { dock: true }, { viewport: 'desktop' }).rest.length, 0);
  const [bar] = drawBlock(NO, { dock: true }).rest;
  assert.equal(bar.tagName, 'NAV');
  assert.equal(bar.attributes.popover, 'manual');
  assert.equal(bar.children.length, 3, 'call, email and map');
  assert.deepEqual(drawBlock({ phone: '+47 400 00 000' }, { dock: true }).rest[0].children.map((a) => a.href), ['tel:+4740000000']);
  assert.equal(drawBlock({ legalName: 'Apeiron' }, { dock: true, parts: ['name'] }).rest.length, 0, 'nothing to act on, no bar');
});

test('the roles design lists the contact points and the site\'s own phone and email as the general one', () => {
  const points = [{ role: 'Styret', email: 'styret@apeiron.no', phone: '+47 400 00 001' }, { role: 'Presse', email: 'presse@apeiron.no', note: 'Svar innen to virkedager' }];
  const { host } = drawBlock({ ...NO, points }, { design: 'roles' });
  const roles = host.all().filter((n) => n.tagName === 'DT').map((n) => n.textContent);
  assert.deepEqual(roles, ['Styret', 'Presse', 'Generelt']);
  assert.match(host.textContent, /Svar innen to virkedager/);
  assert.ok(hrefs(host).includes('mailto:presse@apeiron.no'));
  assert.deepEqual(contactBlockModel(siteWith({ points }), { design: 'roles' }).points.map((p) => p.role), ['Styret', 'Presse'], 'points alone are enough to draw');
  assert.equal(contactBlockModel(siteWith({ points }), { design: 'lines' }), null, 'only the roles design reads them');
});

test('the map design shows the cover only with a point, and says where to find one in the editor', () => {
  const box = (contact, preview) => drawBlock(contact, { design: 'map' }, { preview }).host.all().filter((n) => n.className === 'urd-contact-mapbox');
  assert.equal(box(NO, false).length, 0, 'no point: the details alone');
  assert.equal(box(NO, true).length, 1, 'the editor shows where the point is missing');
  const withPoint = box({ ...NO, geo: { lat: 63.4155, lon: 10.4042 } }, false);
  assert.equal(withPoint.length, 1);
  assert.ok(withPoint[0].all().some((n) => n.className === 'urd-contact-mapbtn'), 'the map loads on a tap');
  assert.ok(!withPoint[0].all().some((n) => n.tagName === 'IFRAME'), 'no frame before the tap');
});

test('siteContact keeps a valid point and the contact points with a role and something beside it', () => {
  const contact = siteContact(siteWith({ geo: { lat: 63.4, lon: 10.4 }, points: [{ role: ' Styret ', email: 'styret@apeiron.no' }, { role: 'Tom' }, { email: 'x@y.no' }, null, 'x'] }));
  assert.deepEqual(contact.geo, { lat: 63.4, lon: 10.4 });
  assert.deepEqual(contact.points, [{ role: 'Styret', email: 'styret@apeiron.no', phone: '', note: '' }]);
  assert.equal(siteContact(siteWith({ geo: { lat: 95, lon: 10 } })).geo, null);
  assert.equal(siteContact(siteWith({ geo: { lat: '63', lon: 10 } })).geo, null);
  assert.deepEqual(pointParts(siteContact(siteWith({ points: [{ role: 'Kasserer', phone: '+47 400 00 002', email: 'not an email' }] }))), [
    { role: 'Kasserer', phone: { label: '+47 400 00 002', href: 'tel:+4740000002' }, email: { label: 'not an email', href: null }, note: '' },
  ]);
});

test('the JSON-LD writes each contact point with a way to reach it as a ContactPoint', () => {
  const ld = organizationContact(siteContact(siteWith({ points: [{ role: 'Styret', email: 'styret@apeiron.no' }, { role: 'Presse', phone: '+47 400 00 001' }, { role: 'Kasserer', note: 'Faktura' }, { role: 'Feil', email: 'nope' }] })));
  assert.deepEqual(ld.contactPoint, [
    { '@type': 'ContactPoint', contactType: 'Styret', email: 'styret@apeiron.no' },
    { '@type': 'ContactPoint', contactType: 'Presse', telephone: '+47 400 00 001' },
  ]);
  assert.equal(organizationContact(siteContact(siteWith(NO))).contactPoint, undefined);
});
