/**
 * Ren nav-logikk: klassifisering av menypunkter, oppslag i sideregisteret
 * og utseende-beregning. Ingen DOM - modulen er node-importerbar og dekkes
 * av tests/nav.test.mjs; DOM-byggingen bor i nav.js.
 */

import { resolveColor } from './theme.js';

// Samme vern som favicon-flyten i urd.js (SAFE_ICON_RE): kun kjente
// bildeformer (base64-data-URL eller site-relativ sti) slippes inn i
// CSS-url(); alt annet (eksterne verter, tegn som knekker url("…"))
// ignoreres. Ankret regex med vilje - CodeQL gjenkjenner det som barriere.
const SAFE_IMAGE_RE = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;

/**
 * Løser et menypunkt mot sideregisteret: `page` slås opp til path,
 * `href` er ekstern lenke. Ukjent side gir '#' med missing-flagg
 * (nav.js logger advarselen - denne modulen har ingen sideeffekter).
 * @param {{label: string, page?: string, href?: string}} item
 * @param {Array<{id: string, path: string}>} pages Sideregisteret (site.pages)
 * @returns {{label: string, href: string, external: boolean, missing: boolean}}
 */
export function resolveItem(item, pages) {
  if (item.page) {
    const target = pages.find((p) => p.id === item.page);
    return { label: item.label, href: target ? target.path : '#', external: false, missing: !target };
  }
  return { label: item.label, href: item.href ?? '#', external: !!item.href, missing: !item.href };
}

/**
 * Bygger den flate menymodellen nav.js rendrer fra. Hvert punkt får `kind`:
 * 'link' (vanlig lenke), 'split' (eget mål + undermeny: lenke pluss pilknapp)
 * eller 'toggle' (kun undermeny: hele punktet er åpneren). Undermenyen er
 * ett nivå - eventuelle barnebarn ignoreres defensivt.
 * @param {{nav: {items?: Array<object>}, pages?: Array<object>}} site
 * @returns {Array<{label: string, href: string, external: boolean, missing: boolean, kind: string, children: Array<object>}>}
 */
export function navItems(site) {
  const pages = site.pages ?? [];
  return (site.nav.items ?? []).map((item) => {
    const children = Array.isArray(item.children)
      ? item.children.map((child) => resolveItem(child, pages))
      : [];
    const hasTarget = !!(item.page || item.href);
    const kind = children.length === 0 ? 'link' : hasTarget ? 'split' : 'toggle';
    // Et toggle-punkt har ingen egen lenke - resolveItem ville flagget det
    // som missing, så åpnere modelleres uten href.
    const own = kind === 'toggle'
      ? { label: item.label, href: '', external: false, missing: false }
      : resolveItem(item, pages);
    return { ...own, kind, children };
  });
}

/**
 * CSS-klassene på nav-elementet. Variant (flytende pille) og hover-stil
 * (additive fra v0.6) gir egne klasser kun når de avviker fra standarden,
 * så eksisterende sider rendres uendret.
 * @param {{nav: {layout?: string, variant?: string, style?: {hover?: string}}}} site
 * @returns {string}
 */
export function navClasses(site) {
  let classes = `urd-nav urd-nav-${site.nav.layout ?? 'right'}`;
  if (site.nav.variant === 'floating') classes += ' urd-nav-var-floating';
  const hover = site.nav.style?.hover;
  if (hover && hover !== 'standard') classes += ` urd-nav-hover-${hover}`;
  return classes;
}

/**
 * Beregner utseende-overstyringene fra nav.style: `bg` er ferdig
 * bakgrunnsverdi for --urd-nav-bg (undermenyer og mobilpanelet
 * gjenbruker varen), `blur: false` skrur av uskarpheten, `color`
 * er tekstfargen. Med `image` (additivt fra v0.6) blir bakgrunnen
 * bildet med fargen/dekkevnen som slør over. Tomt objekt = CSS-
 * standardene gjelder.
 * @param {{bg?: string, bgOpacity?: number, blur?: boolean, textColor?: string, image?: string}} [style]
 * @returns {{bg?: string, blur?: boolean, color?: string}}
 */
export function navSurface(style = {}) {
  const out = {};
  const hasVeil = style.bg || style.bgOpacity != null;
  if (style.image && SAFE_IMAGE_RE.test(style.image)) {
    // Sløret gjentas som gradient-lag over bildet; uten egne valg brukes
    // standardflaten (surface 85 %), så teksten alltid har bakgrunn å stå på.
    const color = resolveColor(style.bg ?? 'surface');
    const pct = Math.round((style.bgOpacity ?? 0.85) * 100);
    const veil = `color-mix(in srgb, ${color} ${pct}%, transparent)`;
    out.bg = `linear-gradient(${veil}, ${veil}), url("${style.image}") center / cover`;
  } else if (hasVeil) {
    const color = resolveColor(style.bg ?? 'surface');
    const pct = Math.round((style.bgOpacity ?? 0.85) * 100);
    out.bg = `color-mix(in srgb, ${color} ${pct}%, transparent)`;
  }
  if (style.blur === false) out.blur = false;
  if (style.textColor) out.color = resolveColor(style.textColor);
  return out;
}
