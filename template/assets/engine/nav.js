/**
 * Bygger navigasjonen fra site.json - sideregisteret (site.pages) og
 * nav-dataene (site.nav). Ingenting hardkodes: nav-elementer med `page`
 * slår opp path i sideregisteret; elementer med `href` er eksterne lenker.
 */

import { resolveColor } from './theme.js';

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Element navigasjonen bygges inn i
 */
export function renderNav(site, host) {
  host.replaceChildren();
  const nav = document.createElement('nav');
  // layout (additivt fra v0.5): hvor menypunktene står; logoen er alltid
  // først og fungerer som «Hjem»-knapp.
  nav.className = `urd-nav urd-nav-${site.nav.layout ?? 'right'}`;
  // Klistret meny (standard): sticky må ligge på VERTEN (header-elementet),
  // ikke på nav-en - et sticky-element kan aldri forlate forelderen sin,
  // og forelderen her er nøyaktig like høy som nav-en.
  host.classList.toggle('urd-nav-sticky', site.nav.sticky !== false);

  // Utseende (nav.style, additivt fra v0.5): bakgrunnsfarge med dekkevne,
  // uskarphet bak, og egen tekstfarge. Uten style gjelder CSS-standarden.
  const style = site.nav.style ?? {};
  if (style.bg || style.bgOpacity != null) {
    const color = resolveColor(style.bg ?? 'surface');
    const pct = Math.round((style.bgOpacity ?? 0.85) * 100);
    nav.style.background = `color-mix(in srgb, ${color} ${pct}%, transparent)`;
  }
  if (style.blur === false) nav.style.backdropFilter = 'none';
  if (style.textColor) nav.style.color = resolveColor(style.textColor);

  const logoDef = site.nav.logo ?? { type: 'text', value: site.site.title };
  const logo = document.createElement('a');
  logo.className = 'urd-nav-logo';
  logo.href = '/';
  logo.title = 'Til forsiden';

  const logoImg = (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = site.site.title;
    img.style.height = `${logoDef.size ?? 32}px`;
    if (logoDef.radius) img.style.borderRadius = `${logoDef.radius}px`;
    return img;
  };
  // Logoteksten kan stiles uavhengig av temaet (additive felt fra v0.5);
  // standard er temaets overskriftsfont i fet.
  const logoText = () => {
    const span = document.createElement('span');
    span.textContent = logoDef.value || site.site.title;
    if (logoDef.font) span.style.fontFamily = logoDef.font;
    if (logoDef.textSize) span.style.fontSize = `${logoDef.textSize}px`;
    if (logoDef.bold === false) span.style.fontWeight = '400';
    if (logoDef.italic) span.style.fontStyle = 'italic';
    return span;
  };

  if (logoDef.type === 'image') {
    logo.appendChild(logoImg(logoDef.value));
  } else if (logoDef.type === 'both' && logoDef.image) {
    // Bilde + tekst, i valgt rekkefølge.
    if ((logoDef.order ?? 'image-first') === 'image-first') {
      logo.append(logoImg(logoDef.image), logoText());
    } else {
      logo.append(logoText(), logoImg(logoDef.image));
    }
  } else {
    logo.appendChild(logoText());
  }
  nav.appendChild(logo);

  const list = document.createElement('ul');
  list.className = 'urd-nav-list';
  for (const item of site.nav.items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = item.label;
    if (item.page) {
      const target = site.pages.find((p) => p.id === item.page);
      a.href = target ? target.path : '#';
      if (!target) console.warn(`Urd: nav-element peker på ukjent side '${item.page}'`);
    } else {
      a.href = item.href;
      a.rel = 'noopener';
    }
    li.appendChild(a);
    list.appendChild(li);
  }
  nav.appendChild(list);
  host.appendChild(nav);
}
