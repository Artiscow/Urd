/**
 * Core block: privacy (0.7.24.2). The site's privacy page, written from the
 * site's settings and its pages (privacy-model.js) each time it is drawn, so
 * it follows what the owner switches on: who is responsible, what each form
 * sends and to whom, the shop and its payment providers, the measuring, the
 * videos and maps from other companies, the host, the visitor's rights, and
 * the visitor's own choices on this site (the providers they have let load
 * at once, each taken back with one press). The block has no settings: the
 * owner changes the page by changing the site.
 * The page files are read over the network as published; in the editor's
 * preview the other pages' drafts are not seen until they are published.
 */
import { t, ta, adminLocaleReady } from '../i18n.js';
import { privacyModel } from '../privacy-model.js';
import { allowedProviders, setProviderAllowed, providerName, providerPrivacyUrl } from '../embed-cover.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent !== undefined) node.textContent = textContent;
  return node;
};

/** How long a page file read for the page is kept, so the editor's many redraws do not read every page again each time. */
const PAGE_CACHE_MS = 60_000;
const pageCache = new Map();

/** A page file, read once a minute at most; null for one that cannot be read. */
function readPage(file, fetchFn) {
  const kept = pageCache.get(file);
  if (kept && Date.now() - kept.at < PAGE_CACHE_MS) return kept.page;
  const page = fetchFn(`/${file}`).then((res) => (res.ok ? res.json() : null)).catch(() => null);
  pageCache.set(file, { at: Date.now(), page });
  return page;
}

/** The pages' files; one that cannot be read is left out, so the page says what it can. */
async function loadPages(site, fetchFn = fetch) {
  const entries = (Array.isArray(site?.pages) ? site.pages : []).filter((entry) => entry?.file);
  const pages = await Promise.all(entries.map((entry) => readPage(entry.file, fetchFn)));
  return entries.map((entry, i) => ({ entry, page: pages[i] })).filter(({ page }) => page);
}

/* The third parties beside the frames' providers (which embed-cover.js names, with their privacy terms): the payment providers and the host, each with its name and its own privacy terms. */
const OTHER_PARTIES = {
  cloudflare: ['Cloudflare', 'https://www.cloudflare.com/privacypolicy/'],
  vipps: ['Vipps MobilePay', 'https://vippsmobilepay.com/privacy'],
  stripe: ['Stripe', 'https://stripe.com/privacy'],
  paypal: ['PayPal', 'https://www.paypal.com/legalhub/privacy-full'],
};

/** A name as a link to that company's own privacy terms, so the visitor reads them there: a frame's provider by the covers' list, the others by their own. */
function nameLink(id, name) {
  const url = providerPrivacyUrl(id) || OTHER_PARTIES[id]?.[1] || '';
  if (!url) return el2('span', null, name);
  const a = el2('a', null, name);
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  return a;
}

/** A paragraph from a text with «{names}» in it, the names set in as links, the text around them as it is. */
function paragraphWith(text, names) {
  const p = el2('p');
  const parts = text.split('{names}');
  parts.forEach((part, i) => {
    if (part) p.append(part);
    if (i < parts.length - 1) names.forEach((node, k) => {
      if (k) p.append(k === names.length - 1 ? ` ${t('privacy.and')} ` : ', ');
      p.append(node);
    });
  });
  return p;
}

const joinNames = (names) => (names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} ${t('privacy.and')} ${names.at(-1)}`);

/** The page's parts, drawn from the facts. */
function draw(host, model) {
  host.replaceChildren();
  const c = model.controller;
  host.append(el2('p', 'urd-privacy-intro', t('privacy.intro')));

  // Who is responsible.
  host.append(el2('h2', null, t('privacy.controller.heading')));
  host.append(el2('p', null, t('privacy.controller.line', { name: c.name || t('privacy.controller.owner') })));
  const lines = [];
  if (c.org) lines.push(t('privacy.controller.org', { org: c.org }));
  if (c.representative) lines.push(t('privacy.controller.representative', { name: c.representative }));
  if (c.address) lines.push(c.address);
  if (c.email) lines.push(c.email);
  if (c.phone) lines.push(c.phone);
  if (lines.length) {
    const p = el2('p');
    lines.forEach((line, i) => { if (i) p.append(el2('br')); p.append(line); });
    host.append(p);
  }

  // What the site collects, and why.
  host.append(el2('h2', null, t('privacy.what.heading')));
  const nothing = !model.forms.length && !model.checkout && !model.analytics && !model.embeds.length;
  if (nothing) host.append(el2('p', null, t('privacy.nothing')));
  if (model.forms.length) {
    host.append(el2('h3', null, t('privacy.forms.heading')));
    const list = el2('ul');
    for (const form of model.forms) {
      const fields = form.fields.length ? t('privacy.forms.fields', { fields: form.fields.join(', ') }) : t('privacy.forms.whatYouFill');
      const to = form.mode === 'endpoint' ? t('privacy.forms.toService', { host: form.host }) : form.recipient ? t('privacy.forms.byEmail', { email: form.recipient }) : t('privacy.forms.toOwner');
      list.append(el2('li', null, form.footer ? t('privacy.forms.footer', { to }) : t('privacy.forms.line', { page: form.page, what: fields, to })));
    }
    host.append(list, el2('p', null, t('privacy.forms.basis')));
  }
  if (model.checkout) {
    const s = model.checkout;
    host.append(el2('h3', null, t('privacy.shop.heading')));
    const to = s.host ? t('privacy.forms.toService', { host: s.host }) : s.recipient ? t('privacy.forms.byEmail', { email: s.recipient }) : t('privacy.forms.toOwner');
    host.append(el2('p', null, t('privacy.shop.sends', { page: s.page, to })));
    const providers = s.providers.filter((id) => id !== 'manual');
    if (providers.length) host.append(paragraphWith(t('privacy.shop.payment'), providers.map((id) => nameLink(id, OTHER_PARTIES[id]?.[0] ?? id))));
    if (s.providers.includes('manual')) host.append(el2('p', null, t('privacy.shop.manual')));
    host.append(el2('p', null, t('privacy.shop.basis')));
  }
  if (model.analytics) {
    host.append(el2('h3', null, t('privacy.analytics.heading')));
    host.append(paragraphWith(t('privacy.analytics.text'), [nameLink('cloudflare', 'Cloudflare Web Analytics')]));
  }
  if (model.embeds.length) {
    host.append(el2('h3', null, t('privacy.embeds.heading')));
    const asking = model.embeds.filter((id) => !model.atOnce.includes(id));
    const links = model.embeds.map((id) => nameLink(id, providerName(id)));
    if (asking.length) {
      host.append(paragraphWith(t('privacy.embeds.text'), links));
      if (model.atOnce.length) host.append(el2('p', null, t('privacy.embeds.atOnce', { names: joinNames(model.atOnce.map(providerName)) })));
      host.append(el2('p', null, t('privacy.embeds.choice')));
    } else {
      // Every frame loads with its page: no cover, no choice to keep.
      host.append(paragraphWith(t('privacy.embeds.allAtOnce'), links));
    }
  }

  // What the site keeps in the visitor's own browser.
  host.append(el2('h2', null, t('privacy.browser.heading')));
  const kept = [t('privacy.browser.pages')];
  if (model.browser.theme) kept.push(t('privacy.browser.theme'));
  if (model.browser.announcement) kept.push(t('privacy.browser.announcement'));
  if (model.browser.shop) kept.push(t('privacy.browser.cart'));
  if (model.embeds.some((id) => !model.atOnce.includes(id))) kept.push(t('privacy.browser.embeds'));
  host.append(el2('p', null, t('privacy.browser.text')));
  const list = el2('ul');
  for (const line of kept) list.append(el2('li', null, line));
  host.append(list);

  // The host.
  host.append(el2('h2', null, t('privacy.host.heading')));
  host.append(paragraphWith(t('privacy.host.text'), [nameLink('cloudflare', 'Cloudflare Pages')]));

  // The visitor's rights.
  host.append(el2('h2', null, t('privacy.rights.heading')));
  host.append(el2('p', null, t('privacy.rights.text', { name: c.name || t('privacy.controller.owner'), email: c.email || t('privacy.rights.theSite') })));
  const authority = el2('p');
  if (c.country === 'NO') {
    const a = el2('a', null, 'Datatilsynet');
    a.href = 'https://www.datatilsynet.no/';
    a.target = '_blank';
    a.rel = 'noopener';
    const parts = t('privacy.rights.authority', { authority: '{authority}' }).split('{authority}');
    authority.append(parts[0], a, parts[1] ?? '');
  } else {
    authority.textContent = t('privacy.rights.authority', { authority: t('privacy.rights.authorityOther') });
  }
  host.append(authority);

  // The visitor's own choices on this site.
  host.append(el2('h2', null, t('privacy.choices.heading')));
  const choices = el2('div', 'urd-privacy-choices');
  host.append(choices);
  drawChoices(choices);
}

/** The providers this browser lets load at once, each with the press that takes the choice back. */
function drawChoices(box) {
  box.replaceChildren();
  const allowed = allowedProviders();
  if (!allowed.length) {
    box.append(el2('p', null, t('privacy.choices.none')));
    return;
  }
  box.append(el2('p', null, t('privacy.choices.intro')));
  const list = el2('ul', 'urd-privacy-list');
  for (const id of allowed) {
    const row = el2('li');
    row.append(el2('span', null, t('privacy.choices.row', { name: providerName(id) })));
    const btn = el2('button', 'urd-privacy-takeback', t('privacy.choices.takeBack'));
    btn.type = 'button';
    btn.addEventListener('click', () => {
      setProviderAllowed(id, false);
      drawChoices(box);
      const said = el2('p', 'urd-privacy-said', t('privacy.choices.taken', { name: providerName(id) }));
      said.setAttribute('role', 'status');
      box.append(said);
    });
    row.append(btn);
    list.append(row);
  }
  box.append(list);
}

export const privacyBlock = {
  version: 1,
  label: 'Privacy',
  labelKey: 'blocks.privacy',
  defaults: () => ({}),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {object} props No settings: the page is the site's
   * @param {object} ctx Render context
   */
  render(el, props, ctx) {
    const host = el2('div', 'urd-privacy');
    host.append(el2('p', 'urd-privacy-intro', t('privacy.intro')));
    el.appendChild(host);
    // The facts need the pages: drawn once they are read, and with the site alone where none can be.
    loadPages(ctx.site).then((pages) => {
      if (!host.isConnected) return;
      draw(host, privacyModel(ctx.site, pages));
    });
    if (Boolean(ctx.preview) && ctx.viewport !== 'mobile') {
      // The help chip (ADR-0008): where the page's facts come from, and when another page's change shows.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintPrivacy.title'),
          lines: [ta('hintPrivacy.l1'), ta('hintPrivacy.l2'), ta('hintPrivacy.l3')],
        });
      });
    }
  },
  autoGrow: true,
};
