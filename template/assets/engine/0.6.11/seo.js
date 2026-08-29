/**
 * SEO-metadata i dokumenthodet (SEO-pakken): beskrivelse, canonical,
 * og-felter (Open Graph) og JSON-LD for nettstedet. Motoren setter taggene
 * ved rendering hos besøkende (index-skallet er Urd-eid og statisk, så
 * per-side metadata må legges på klientsiden frem til v0.8-bakingen).
 * Taggene bygges rene (node-testet); kun applyHeadMeta rører DOM.
 */

/** Absolutt adresse fra en side-relativ sti (media-bilder, sider). */
function absolute(origin, path) {
  try {
    return new URL(path, origin.replace(/\/+$/, '') + '/').href;
  } catch {
    return null;
  }
}

/**
 * Metataggene for en side: [{tag, attrs}] i innsettingsrekkefølge.
 * og-feltene faller tilbake trinnvis: og.title -> sidetittel, og.description
 * -> sidebeskrivelse -> nettstedsbeskrivelse, og.image -> nettstedsikonet.
 * X/Twitter-kortet trenger kun card-taggen (resten leses fra og-feltene).
 * Skjult side (noindex i sideregisteret) får robots-noindex og ingen
 * canonical, men beholder delingsfeltene (deling er et aktivt valg).
 * @param {object} site site.json-innholdet (løftet)
 * @param {{meta?: {title?: string, description?: string, og?: {title?: string, description?: string, image?: string}}}} page
 * @param {string} origin Sidens opprinnelse (https://...)
 * @param {string} path Sidens sti (/, /om-oss)
 * @param {{noindex?: boolean}} [entry] Sidens innslag i sideregisteret
 * @returns {{tag: string, attrs: Record<string, string>}[]}
 */
export function pageMetaTags(site, page, origin, path, entry = {}) {
  const meta = page?.meta ?? {};
  const og = meta.og ?? {};
  const siteTitle = site?.site?.title ?? '';
  const pageTitle = meta.title ?? '';
  const description = meta.description;
  const ogDescription = og.description ?? description ?? site?.site?.description ?? '';
  const image = og.image ?? site?.site?.icon ?? null;
  const canonical = absolute(origin, path === '/' ? '/' : path);

  const tags = [];
  if (entry?.noindex) tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } });
  if (description) tags.push({ tag: 'meta', attrs: { name: 'description', content: description } });
  if (canonical && !entry?.noindex) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } });
  tags.push({ tag: 'meta', attrs: { property: 'og:type', content: 'website' } });
  tags.push({ tag: 'meta', attrs: { property: 'og:site_name', content: siteTitle } });
  tags.push({ tag: 'meta', attrs: { property: 'og:title', content: og.title || pageTitle || siteTitle } });
  if (ogDescription) tags.push({ tag: 'meta', attrs: { property: 'og:description', content: ogDescription } });
  if (canonical) tags.push({ tag: 'meta', attrs: { property: 'og:url', content: canonical } });
  const imageUrl = image ? absolute(origin, image) : null;
  if (imageUrl) tags.push({ tag: 'meta', attrs: { property: 'og:image', content: imageUrl } });
  tags.push({ tag: 'meta', attrs: { name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' } });
  return tags;
}

/**
 * JSON-LD for nettstedet: Organization med navn, adresse, beskrivelse og
 * logo (feltene fra Nettsted-panelet). Rike søketreff for målgruppen
 * (forening, småbedrift) uten noen avhengighet.
 * @param {object} site site.json-innholdet (løftet)
 * @param {string} origin
 * @returns {object}
 */
export function siteJsonLd(site, origin) {
  const base = String(origin ?? '').replace(/\/+$/, '');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site?.site?.title ?? '',
    url: base + '/',
  };
  if (site?.site?.description) data.description = site.site.description;
  const logo = site?.site?.icon ? absolute(base, site.site.icon) : null;
  if (logo) data.logo = logo;
  return data;
}

/**
 * Skriver metataggene og JSON-LD-en inn i <head>. Kalles per siderendering
 * hos besøkende; egne tidligere tagger byttes ut (klientside-navigasjon
 * senere skal kunne kalle igjen), merket med data-urd-seo.
 */
export function applyHeadMeta(site, page, origin, path, entry) {
  for (const el of document.head.querySelectorAll('[data-urd-seo]')) el.remove();
  for (const { tag, attrs } of pageMetaTags(site, page, origin, path, entry)) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
    el.setAttribute('data-urd-seo', '1');
    document.head.appendChild(el);
  }
  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.setAttribute('data-urd-seo', '1');
  jsonLd.textContent = JSON.stringify(siteJsonLd(site, origin));
  document.head.appendChild(jsonLd);
}
