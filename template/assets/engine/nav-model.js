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
  const variant = site.nav.variant;
  if (variant === 'floating') {
    classes += ' urd-nav-var-floating';
    // Glød er et tilvalg for pillen (av som standard, eiers valg 22. juli 2026).
    if (site.nav.style?.glow) classes += ' urd-nav-glow';
    // Luft over pillen er standard; topGap: false legger den helt i toppen.
    if (site.nav.style?.topGap === false) classes += ' urd-nav-flush';
  }
  const hover = site.nav.style?.hover;
  if (hover && hover !== 'standard') classes += ` urd-nav-hover-${hover}`;
  return classes;
}

/**
 * Klasser for VERTEN (header-elementet) og body, avledet av varianten:
 * flytende tar verten ut av flyten; sidestilt gjør den til fast kolonne
 * og gir body innholds-padding på samme side.
 * @param {{nav: {variant?: string}}} site
 * @returns {{host: string[], body: string[]}}
 */
export function hostClasses(site) {
  const v = site.nav.variant;
  if (v === 'floating') return { host: ['urd-nav-float'], body: [] };
  if (v === 'side-left') return { host: ['urd-nav-side-host', 'urd-nav-side-host-left'], body: ['urd-side-left'] };
  if (v === 'side-right') return { host: ['urd-nav-side-host', 'urd-nav-side-host-right'], body: ['urd-side-right'] };
  return { host: [], body: [] };
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
    const layers = [`linear-gradient(${veil}, ${veil})`];
    // Bildestyrke (0..1, standard 1): svakere bilde tones mot bakgrunns-
    // fargen med et eget lag under sløret - CSS kan ikke sette opacity på
    // ett enkelt bakgrunnslag.
    const strength = style.imageOpacity ?? 1;
    if (strength < 1) {
      const fade = `color-mix(in srgb, ${color} ${Math.round((1 - strength) * 100)}%, transparent)`;
      layers.push(`linear-gradient(${fade}, ${fade})`);
    }
    // Posisjon i høyden (0..100, standard 50): hvilken del av bildet som
    // vises i den smale menystripen.
    const y = Math.min(100, Math.max(0, style.imageY ?? 50));
    layers.push(`url("${style.image}") 50% ${y}% / cover`);
    out.bg = layers.join(', ');
  } else if (hasVeil) {
    const color = resolveColor(style.bg ?? 'surface');
    const pct = Math.round((style.bgOpacity ?? 0.85) * 100);
    out.bg = `color-mix(in srgb, ${color} ${pct}%, transparent)`;
  }
  if (style.blur === false) out.blur = false;
  if (style.textColor) out.color = resolveColor(style.textColor);
  return out;
}
