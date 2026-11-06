// The privacy page's facts (engine privacy-model.js): who is responsible, what each form sends and to whom, the checkout's providers, the measuring, the third parties' frames and the host, read from the settings and the pages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { privacyModel, pageFacts, endpointHost, paymentProviders, footerForm, retentionOf, orderKeepChoices, RETENTION_KINDS, cloudflareBeacon } = await engineImport('privacy-model.js');

const site = {
  site: { title: 'Kakeklubben', contact: { country: 'NO', legalName: 'Kakeklubben Trondheim', ids: { org: '974760673' }, address: { street: 'Gata 1', postalCode: '7034', city: 'Trondheim' }, email: 'post@kake.no', phone: '+47 400 00 000' } },
  analytics: { token: 'abc' },
};
const page = (blocks) => ({ meta: { title: 'Kontakt' }, sections: [{ blocks }] });

test('endpointHost: the host of a web address, nothing for anything else', () => {
  assert.equal(endpointHost('https://hooks.example.org/forms/1?x=1'), 'hooks.example.org');
  assert.equal(endpointHost('mailto:post@kake.no'), '');
  assert.equal(endpointHost('javascript:alert(1)'), '');
  assert.equal(endpointHost(''), '');
});

test('paymentProviders: Vipps also through the card button, Stripe, PayPal and the manual ways', () => {
  assert.deepEqual(paymentProviders({ vipps: true, card: 'none', paypal: false, manual: [] }), ['vipps']);
  assert.deepEqual(paymentProviders({ vipps: false, card: 'vipps' }), ['vipps']);
  assert.deepEqual(paymentProviders({ card: 'stripe', paypal: true, manual: [{ id: 'invoice' }] }), ['stripe', 'paypal', 'manual']);
  assert.deepEqual(paymentProviders(undefined), []);
});

test('pageFacts: a form by email or to a service, the checkout, and the frames of YouTube, Vimeo and OpenStreetMap', () => {
  const facts = pageFacts({ id: 'kontakt', title: 'Kontakt', path: '/kontakt' }, page([
    { type: 'form', props: { mode: 'mailto', recipient: 'post@kake.no', fields: [{ label: 'Navn' }, { label: 'E-post' }, { label: '' }] } },
    { type: 'form', props: { mode: 'endpoint', endpoint: 'https://hooks.example.org/f', recipient: 'ignored@kake.no', fields: [] } },
    { type: 'checkout', props: { recipient: 'ordre@kake.no', endpoint: 'https://orders.example.org/in', payments: { vipps: true, card: 'stripe' } } },
    { type: 'video', props: { url: 'https://youtu.be/dQw4w9WgXcQ' } },
    { type: 'video', props: { url: 'https://vimeo.com/123456' } },
    { type: 'video', props: { source: 'file', url: 'https://youtu.be/x' } },
    { type: 'map', props: { lat: 63.4, lon: 10.4, askFirst: false } },
    { type: 'map', props: { location: 'nowhere in particular' } },
    { type: 'contact', props: { design: 'map' } },
    { type: 'text', props: {} },
  ]), { siteGeo: true });
  assert.deepEqual(facts.forms, [
    { page: 'Kontakt', path: '/kontakt', fields: ['Navn', 'E-post'], mode: 'mailto', recipient: 'post@kake.no', host: '' },
    { page: 'Kontakt', path: '/kontakt', fields: [], mode: 'endpoint', recipient: '', host: 'hooks.example.org' },
  ]);
  assert.deepEqual(facts.checkout, { page: 'Kontakt', path: '/kontakt', providers: ['vipps', 'stripe'], recipient: 'ordre@kake.no', host: 'orders.example.org' });
  assert.deepEqual(facts.embeds, ['youtube', 'vimeo', 'openstreetmap']);
  // A map with no point draws no frame, and the contact block's map needs the site's point.
  assert.deepEqual(pageFacts({ id: 'm' }, page([{ type: 'map', props: { location: 'nowhere' } }, { type: 'contact', props: { design: 'map' } }])).embeds, []);
  assert.deepEqual(pageFacts({ id: 'm' }, page([{ type: 'map', props: { location: 'https://www.openstreetmap.org/#map=15/63.43/10.39' } }])).embeds, ['openstreetmap']);
  assert.deepEqual(facts.atOnce, ['openstreetmap'], 'a map set to load with the page');
  assert.equal(facts.shop, true);
  assert.deepEqual(pageFacts({ id: 'x' }, { sections: [] }), { forms: [], checkout: null, shop: false, calendar: false, embeds: [], atOnce: [] });
});

test('privacyModel: the controller from the contact details, the pages gathered, analytics by its token, the host', () => {
  const model = privacyModel(site, [
    { entry: { id: 'kontakt', title: 'Kontakt', path: '/kontakt' }, page: page([{ type: 'form', props: { recipient: 'a@kake.no', fields: [{ label: 'Navn' }] } }, { type: 'map', props: { lat: 63.4, lon: 10.4 } }]) },
    { entry: { id: 'shop', title: 'Shop', path: '/shop' }, page: { meta: { title: 'Butikk' }, sections: [{ blocks: [{ type: 'checkout', props: { payments: { paypal: true } } }, { type: 'map', props: {} }] }] } },
  ]);
  assert.deepEqual(model.controller, { name: 'Kakeklubben Trondheim', org: '974760673', address: 'Gata 1, 7034 Trondheim', email: 'post@kake.no', phone: '+47 400 00 000', representative: '', country: 'NO' });
  assert.equal(model.forms.length, 1);
  assert.equal(model.forms[0].page, 'Kontakt');
  assert.deepEqual(model.checkout.providers, ['paypal']);
  assert.equal(model.checkout.page, 'Butikk');
  assert.equal(model.analytics, true);
  assert.deepEqual(model.embeds, ['openstreetmap']);
  assert.deepEqual(model.atOnce, []);
  assert.equal(model.host, 'cloudflare');
  assert.deepEqual(model.browser, { theme: false, shop: true, calendar: false, announcement: false });
  // The footer's newsletter sign-up is a form on every page, and the announcement strip's closing is kept.
  const withFooter = privacyModel({ ...site, footer: { cta: { kind: 'newsletter', endpoint: 'https://news.example.org/subscribe' } }, nav: { announcement: { show: true, text: 'Hei' } } }, []);
  assert.deepEqual(withFooter.forms, [{ page: '', path: '', footer: true, fields: [], mode: 'endpoint', recipient: '', host: 'news.example.org' }]);
  assert.equal(withFooter.browser.announcement, true);
  assert.deepEqual(footerForm({ footer: { cta: { kind: 'newsletter', recipient: 'post@kake.no' } } }), { page: '', path: '', footer: true, fields: [], mode: 'mailto', recipient: 'post@kake.no', host: '' });
  assert.equal(footerForm({ footer: { cta: { kind: 'button' } } }), null);
  assert.equal(privacyModel({ site: {}, theme: { alt: { tokens: {} } } }, [{ entry: { id: 'p' }, page: { sections: [{ blocks: [{ type: 'product', props: {} }] }] } }]).browser.theme, true);
  // A site with no contact details is named by its title, measures nobody and holds nothing.
  const bare = privacyModel({ site: { title: 'Urd' } }, []);
  assert.deepEqual([bare.controller.name, bare.controller.org, bare.analytics, bare.forms, bare.checkout, bare.embeds], ['Urd', '', false, [], null, []]);
});

test('retentionOf: a set period of 1 to 99 months or years, the closing of the matter for forms, the unsubscribing for the newsletter; anything else is not decided', () => {
  const of = (retention, kind) => retentionOf({ site: { retention } }, kind);
  assert.deepEqual(of({ forms: { until: 'period', count: 12, unit: 'months' } }, 'forms'), { until: 'period', count: 12, unit: 'months' });
  assert.deepEqual(of({ forms: { until: 'closed' } }, 'forms'), { until: 'closed' });
  assert.deepEqual(of({ newsletter: { until: 'unsubscribe' } }, 'newsletter'), { until: 'unsubscribe' });
  assert.deepEqual(of({ newsletter: { until: 'period', count: 2, unit: 'years' } }, 'newsletter'), { until: 'period', count: 2, unit: 'years' });
  assert.equal(of({ forms: { until: 'unsubscribe' } }, 'forms'), null, 'a choice of the other kind');
  assert.equal(of({ newsletter: { until: 'closed' } }, 'newsletter'), null);
  assert.equal(of({ forms: { until: 'period', count: 0, unit: 'months' } }, 'forms'), null);
  assert.equal(of({ forms: { until: 'period', count: 100, unit: 'months' } }, 'forms'), null);
  assert.equal(of({ forms: { until: 'period', count: 1.5, unit: 'months' } }, 'forms'), null);
  assert.equal(of({ forms: { until: 'period', count: 3, unit: 'weeks' } }, 'forms'), null);
  assert.equal(of(undefined, 'forms'), null, 'a site without the field reads as not decided');
  assert.deepEqual(privacyModel({ site: { retention: { forms: { until: 'closed' } } } }, []).retention, { forms: { until: 'closed' }, newsletter: null, orders: null });
});

test('retentionOf for orders: the bookkeeping duty, a sports club under NIF or a set period; orderKeepChoices offers the duties in Norway alone', () => {
  const of = (retention) => retentionOf({ site: { retention } }, 'orders');
  assert.deepEqual(of({ orders: { until: 'bookkeeping' } }), { until: 'bookkeeping' });
  assert.deepEqual(of({ orders: { until: 'nif' } }), { until: 'nif' });
  assert.deepEqual(of({ orders: { until: 'period', count: 3, unit: 'years' } }), { until: 'period', count: 3, unit: 'years' });
  assert.equal(of({ orders: { until: 'closed' } }), null, 'a choice of another kind');
  assert.equal(of({ orders: { until: 'unknown' } }), null, 'not decided is the kind left out, never a value');
  assert.deepEqual(orderKeepChoices('NO'), RETENTION_KINDS.orders);
  assert.deepEqual(orderKeepChoices('SE'), ['period']);
  assert.deepEqual(orderKeepChoices(undefined), ['period']);
});

test('cloudflareBeacon: Cloudflare Web Analytics\' script found by its parsed address, never by a substring', () => {
  assert.equal(cloudflareBeacon(['/assets/engine/boot.js', 'https://static.cloudflareinsights.com/beacon.min.js']), true, 'the beacon Cloudflare or Urd adds');
  assert.equal(cloudflareBeacon(['https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015']), true, 'the versioned address Cloudflare injects');
  assert.equal(cloudflareBeacon(['https://evil.example/static.cloudflareinsights.com/beacon.min.js']), false, 'the host is compared, not the text');
  assert.equal(cloudflareBeacon(['https://static.cloudflareinsights.com.evil.example/beacon.min.js']), false);
  assert.equal(cloudflareBeacon(['http://static.cloudflareinsights.com/beacon.min.js']), false, 'https only');
  assert.equal(cloudflareBeacon(['', 'not a url', null]), false);
  assert.equal(cloudflareBeacon(undefined), false);
});
