/**
 * The association's legal and contact details (engine/contact-model.js on the country profiles of engine/contact-profiles.js): the normalising, the check outcome, the display, the VAT number, the legal line and the Organization JSON-LD.
 * The footer is rendered with a minimal document stub, to show the details in every footer build, an empty field leaving no trace and the two switches.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { normaliseId, validateId, formatId, siteContact, vatNumber, legalParts, telHref, contactParts, organizationContact } = await engineImport('contact-model.js');
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
