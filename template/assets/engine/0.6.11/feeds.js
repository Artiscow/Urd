/**
 * Publiserings-genererte synlighetsfiler (SEO-pakken): sitemap.xml,
 * robots.txt og RSS-feeder for daterte samlinger. Rene strengbyggere uten
 * DOM eller nettverk (node-testet); editoren kaller dem ved publisering og
 * committer resultatet som innholdsfiler, samme mønster som theme.css.
 * Absolutte adresser bygges fra opprinnelsen editoren kjører på (admin bor
 * på den deployerte siden).
 */

/** XML-entiteter i tekstinnhold og attributter. */
export function escapeXml(text) {
  return String(text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/**
 * sitemap.xml for sideregisteret. Skjulte sider (noindex) utelates.
 * @param {{path: string, noindex?: boolean}[]} pages Sideregisteret (site.pages)
 * @param {string} origin F.eks. https://ekspempel.no (uten skråstrek)
 * @returns {string}
 */
export function buildSitemapXml(pages, origin) {
  const base = String(origin ?? '').replace(/\/+$/, '');
  const urls = (pages ?? [])
    .filter((p) => !p.noindex)
    .map((p) => `  <url><loc>${escapeXml(base + (p.path === '/' ? '/' : p.path))}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n`
    + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * robots.txt: alt åpent unntatt admin, med peker til sitemapen.
 * @param {string} origin
 * @returns {string}
 */
export function buildRobotsTxt(origin) {
  const base = String(origin ?? '').replace(/\/+$/, '');
  return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${base}/sitemap.xml\n`;
}

/** Samlingstyper som får RSS-feed: datert innhold med abonnementsverdi. */
export const FEED_KINDS = ['news', 'notices', 'publications'];

/**
 * RSS 2.0-feed for en samling. Innslagene leveres FERDIG som ren tekst
 * (rik tekst strippes av kalleren, som har DOM); datoer må være parsbare.
 * @param {{title: string, description?: string, origin: string, path: string,
 *   items: {title: string, text?: string, date?: string, href?: string}[]}} feed
 * @returns {string}
 */
export function buildRssXml(feed) {
  const base = String(feed.origin ?? '').replace(/\/+$/, '');
  const items = (feed.items ?? []).map((item) => {
    const link = item.href ? new URL(item.href, base + '/').href : base + '/';
    const date = item.date ? new Date(item.date) : null;
    const pubDate = date && !Number.isNaN(date.getTime())
      ? `\n      <pubDate>${date.toUTCString()}</pubDate>` : '';
    const description = item.text ? `\n      <description>${escapeXml(item.text)}</description>` : '';
    return `    <item>\n      <title>${escapeXml(item.title)}</title>\n`
      + `      <link>${escapeXml(link)}</link>\n`
      + `      <guid isPermaLink="false">${escapeXml(`${feed.path}#${item.id ?? item.title}`)}</guid>`
      + `${description}${pubDate}\n    </item>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n`
    + `<rss version="2.0">\n  <channel>\n`
    + `    <title>${escapeXml(feed.title)}</title>\n`
    + `    <link>${escapeXml(base + '/')}</link>\n`
    + `    <description>${escapeXml(feed.description ?? feed.title)}</description>\n`
    + `${items}${items ? '\n' : ''}  </channel>\n</rss>\n`;
}
