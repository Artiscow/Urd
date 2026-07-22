/**
 * Bygger navigasjonen fra site.json - sideregisteret (site.pages) og
 * nav-dataene (site.nav). Ingenting hardkodes: nav-elementer med `page`
 * slår opp path i sideregisteret; elementer med `href` er eksterne lenker.
 *
 * Undermenyer følger WAI-ARIA-mønsteret «disclosure navigation» (ikke
 * menubar): ekte knapper med aria-expanded/aria-controls, naturlig
 * Tab-rekkefølge og ingen role="menu". Et punkt med både eget mål og
 * undermeny rendres som lenke + egen pilknapp, så siden alltid er nåbar.
 * Mobilmenyen (burgeren) er en ikke-modal disclosure av samme liste og
 * styles av body.urd-mobile (breakpointet settes i urd.js fra site.json).
 */

import { navItems, navClasses, navSurface } from './nav-model.js';

/** Hvor lenge undermenyen står åpen etter at pekeren forlater punktet. */
const HOVER_CLOSE_DELAY = 250;

// renderNav kjøres på nytt for hvert site-utkast fra editoren; controlleren
// kobler fra forrige renderings lyttere (også de på document) så det aldri
// finnes mer enn ett aktivt sett.
let navController = null;

const svg = (path) =>
  `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const CHEVRON = svg('<path d="M6 9l6 6 6-6"/>');
const BURGER = svg('<path d="M4 6h16M4 12h16M4 18h16"/>');

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Element navigasjonen bygges inn i
 */
export function renderNav(site, host) {
  navController?.abort();
  navController = new AbortController();
  const signal = navController.signal;

  host.replaceChildren();
  const nav = document.createElement('nav');
  // layout (additivt fra v0.5): hvor menypunktene står; logoen er alltid
  // først og fungerer som «Hjem»-knapp.
  nav.className = navClasses(site);
  // Klistret meny (standard): sticky må ligge på VERTEN (header-elementet),
  // ikke på nav-en - et sticky-element kan aldri forlate forelderen sin,
  // og forelderen her er nøyaktig like høy som nav-en.
  host.classList.toggle('urd-nav-sticky', site.nav.sticky !== false);

  // Utseende (nav.style, additivt fra v0.5): bakgrunnsfarge med dekkevne,
  // uskarphet bak, og egen tekstfarge. Bakgrunnen settes som CSS-var så
  // undermenyer og mobilpanelet arver samme flate; uten style gjelder
  // CSS-standarden.
  const surface = navSurface(site.nav.style);
  if (surface.bg) nav.style.setProperty('--urd-nav-bg', surface.bg);
  if (surface.blur === false) nav.style.backdropFilter = 'none';
  if (surface.color) nav.style.color = surface.color;

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

  // Burgeren (kun synlig i mobilvisning via CSS): ikke-modal disclosure av
  // menylisten - ingen fokusfelle eller scroll-lås, panelet scroller selv.
  const burger = document.createElement('button');
  burger.className = 'urd-nav-burger';
  burger.type = 'button';
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'urd-nav-menu');
  burger.setAttribute('aria-label', 'Meny');
  burger.innerHTML = BURGER;
  nav.appendChild(burger);

  const setMobileOpen = (open) => {
    nav.classList.toggle('urd-nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => {
    setMobileOpen(!nav.classList.contains('urd-nav-open'));
  }, { signal });

  const list = document.createElement('ul');
  list.className = 'urd-nav-list';
  list.id = 'urd-nav-menu';

  /** Alle li-er med undermeny, for closeAll. */
  const subs = [];
  const setOpen = (entry, open) => {
    entry.li.classList.toggle('open', open);
    entry.button.setAttribute('aria-expanded', String(open));
  };
  const closeAll = (except) => {
    for (const entry of subs) if (entry !== except) setOpen(entry, false);
  };

  // Hover åpner kun på enheter med ekte peker - touch skal aldri få
  // hover-tilstander som krever et ekstra trykk for å bli kvitt.
  const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const items = navItems(site);
  items.forEach((item, index) => {
    if (item.missing && !item.external) {
      console.warn(`Urd: nav-element peker på ukjent side (${item.label})`);
    }
    const li = document.createElement('li');

    const makeLink = (target) => {
      const a = document.createElement('a');
      a.textContent = target.label;
      a.href = target.href;
      if (target.external) a.rel = 'noopener';
      return a;
    };

    if (item.kind === 'link') {
      li.appendChild(makeLink(item));
      list.appendChild(li);
      return;
    }

    // Punkt med undermeny: 'split' = lenke + egen pilknapp (siden er alltid
    // nåbar); 'toggle' = én knapp bærer både tittelen og pilen.
    li.className = 'urd-nav-has-sub';
    const subId = `urd-nav-sub-${index}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', subId);

    if (item.kind === 'split') {
      li.appendChild(makeLink(item));
      button.className = 'urd-nav-caret';
      button.setAttribute('aria-label', `Undermeny for ${item.label}`);
      button.innerHTML = CHEVRON;
    } else {
      button.className = 'urd-nav-toggle';
      const title = document.createElement('span');
      title.textContent = item.label;
      button.appendChild(title);
      button.insertAdjacentHTML('beforeend', CHEVRON);
    }
    li.appendChild(button);

    const sub = document.createElement('ul');
    sub.className = 'urd-nav-sub';
    sub.id = subId;
    for (const child of item.children) {
      if (child.missing && !child.external) {
        console.warn(`Urd: nav-element peker på ukjent side (${child.label})`);
      }
      const childLi = document.createElement('li');
      childLi.appendChild(makeLink(child));
      sub.appendChild(childLi);
    }
    li.appendChild(sub);

    const entry = { li, button };
    subs.push(entry);

    button.addEventListener('click', () => {
      const open = !li.classList.contains('open');
      closeAll(entry);
      setOpen(entry, open);
    }, { signal });

    if (hoverable) {
      // Kun ekte mus: på hybride enheter (laptop med touchskjerm) fyrer et
      // trykk både pointerenter og click, og uten vakten ville undermenyen
      // åpnet på enter og lukket igjen på click.
      let closeTimer = null;
      li.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(closeTimer);
        closeAll(entry);
        setOpen(entry, true);
      }, { signal });
      li.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => setOpen(entry, false), HOVER_CLOSE_DELAY);
      }, { signal });
    }

    // Tab ut av punktet lukker undermenyen - fokus skal aldri «etterlate»
    // en åpen meny bak seg.
    li.addEventListener('focusout', (event) => {
      if (!li.contains(event.relatedTarget)) setOpen(entry, false);
    }, { signal });

    list.appendChild(li);
  });

  nav.appendChild(list);
  host.appendChild(nav);

  // Escape lukker nærmeste åpne lag og gir fokuset tilbake til knappen som
  // åpnet det, så tastaturbrukere lander der de var.
  nav.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openSub = subs.find((entry) => entry.li.classList.contains('open'));
    if (openSub) {
      setOpen(openSub, false);
      openSub.button.focus();
    } else if (nav.classList.contains('urd-nav-open')) {
      setMobileOpen(false);
      burger.focus();
    }
  }, { signal });

  // Klikk utenfor nav-en lukker både undermenyer og mobilpanelet.
  document.addEventListener('pointerdown', (event) => {
    if (nav.contains(event.target)) return;
    closeAll();
    setMobileOpen(false);
  }, { signal });
}
