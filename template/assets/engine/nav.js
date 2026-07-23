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

import { navItems, navClasses, navSurface, navSubSurface, hostClasses, clampSideWidth } from './nav-model.js';
import { themeMode, toggleThemeMode, resolveColor } from './theme.js';

/** Hvor lenge undermenyen står åpen etter at pekeren forlater punktet. */
const HOVER_CLOSE_DELAY = 250;

// renderNav kjøres på nytt for hvert site-utkast fra editoren; controlleren
// kobler fra forrige renderings lyttere (også de på document) så det aldri
// finnes mer enn ett aktivt sett.
let navController = null;

// Sidestilt kolonne på trange vinduer: under 900px rendres menyen som en
// VANLIG topplinje (effektiv variant bar) med horisontale punkter; burgeren
// kommer først ved mobil-breakpointet, som for stripe-varianten (eiers valg
// 23. juli 2026). Egen brytekant uavhengig av mobil-breakpointet OG av
// editorens viewport-valg, så det virker også i previewens desktop-modus.
const narrowMq = window.matchMedia('(max-width: 900px)');
let lastRender = null;
narrowMq.addEventListener('change', () => {
  const variant = lastRender?.site.nav.variant;
  if (variant === 'side-left' || variant === 'side-right') {
    renderNav(lastRender.site, lastRender.host);
  }
});

const svg = (path) =>
  `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const CHEVRON = svg('<path d="M6 9l6 6 6-6"/>');
const BURGER = svg('<path d="M4 6h16M4 12h16M4 18h16"/>');
const SUN = svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');
const MOON = svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>');

/**
 * @param {object} site site.json, allerede parset
 * @param {HTMLElement} host Element navigasjonen bygges inn i
 */
export function renderNav(site, host) {
  navController?.abort();
  navController = new AbortController();
  const signal = navController.signal;
  lastRender = { site, host };

  // Trange vinduer: sidestilt rendres som vanlig topplinje (effektiv
  // variant bar); breakpoint-lytteren over rendrer på nytt ved kryssing.
  const wantsSide = site.nav.variant === 'side-left' || site.nav.variant === 'side-right';
  const effSite = wantsSide && narrowMq.matches
    ? { ...site, nav: { ...site.nav, variant: 'bar' } }
    : site;

  host.replaceChildren();
  const nav = document.createElement('nav');
  // layout (additivt fra v0.5): hvor menypunktene står; logoen er alltid
  // først og fungerer som «Hjem»-knapp.
  nav.className = navClasses(effSite);
  // Klistret meny (standard): sticky må ligge på VERTEN (header-elementet),
  // ikke på nav-en - et sticky-element kan aldri forlate forelderen sin,
  // og forelderen her er nøyaktig like høy som nav-en.
  host.classList.toggle('urd-nav-sticky', effSite.nav.sticky !== false);
  // Varianten styrer verten og body: flytende tar verten ut av flyten
  // (hero-en starter bak pillen), sidestilt gjør verten til fast kolonne
  // og gir body innholds-padding. Alle klasser toggles hver rendering,
  // så variantbytte i editoren aldri etterlater rester.
  const hc = hostClasses(effSite);
  for (const cls of ['urd-nav-float', 'urd-nav-side-host', 'urd-nav-side-host-left', 'urd-nav-side-host-right']) {
    host.classList.toggle(cls, hc.host.includes(cls));
  }
  for (const cls of ['urd-side-left', 'urd-side-right']) {
    document.body.classList.toggle(cls, hc.body.includes(cls));
  }
  // Sidekolonnens bredde: settes på body så både kolonnen og innholds-
  // paddingen leser samme verdi.
  const isSide = hc.body.length > 0;
  if (isSide) {
    document.body.style.setProperty('--urd-nav-side-width', `${clampSideWidth(site.nav.style?.width)}px`);
  } else {
    document.body.style.removeProperty('--urd-nav-side-width');
  }

  // Utseende (nav.style, additivt fra v0.5): bakgrunnsfarge med dekkevne,
  // uskarphet bak, og egen tekstfarge. Bakgrunnen settes som CSS-var så
  // undermenyer og mobilpanelet arver samme flate; uten style gjelder
  // CSS-standarden.
  const surface = navSurface(site.nav.style);
  if (surface.bg) nav.style.setProperty('--urd-nav-bg', surface.bg);
  // Blur styres via custom property (arver til undermenyer og mobilpanel;
  // backdrop-filter selv arver ikke, så inherit i CSS-en ville stoppet på li-en).
  if (surface.blur === false) nav.style.setProperty('--urd-nav-blur', 'none');
  if (surface.color) nav.style.color = surface.color;
  // Undermenyen og mobilpanelet får sin egen flate: som standard kun
  // fargesløret, aldri bakgrunnsbildet (subImage skrur bildet på).
  const subBg = navSubSurface(site.nav.style);
  if (subBg) nav.style.setProperty('--urd-nav-sub-bg', subBg);
  // Hover-farger (additive fra v0.6): effektfargen (strek/pille-flate/glød)
  // og tekstfargen ved hover; uten valg gjelder aksentfargen som før.
  if (site.nav.style?.hoverColor) {
    nav.style.setProperty('--urd-nav-hover', resolveColor(site.nav.style.hoverColor));
  }
  if (site.nav.style?.hoverTextColor) {
    nav.style.setProperty('--urd-nav-hover-text', resolveColor(site.nav.style.hoverTextColor));
  }
  // Glødstyrke for «Løft med glød» (0..1, standard 0.6): settes som ferdig
  // prosent, så CSS-ens color-mix kan bruke verdien rett.
  const glowStrength = Number(site.nav.style?.hoverGlow);
  if (Number.isFinite(glowStrength)) {
    nav.style.setProperty('--urd-nav-hover-glow', `${Math.round(Math.min(1, Math.max(0, glowStrength)) * 100)}%`);
  }
  // Undermeny-kolonner (n x n): punktene legges i grid med valgt kolonnetall.
  const subCols = Math.round(Number(site.nav.style?.subColumns));
  if (subCols >= 2) nav.style.setProperty('--urd-nav-sub-cols', String(Math.min(4, subCols)));

  const logoDef = site.nav.logo ?? { type: 'text', value: site.site.title };
  const logo = document.createElement('a');
  logo.className = 'urd-nav-logo';
  logo.href = '/';
  logo.title = 'Til forsiden';

  const logoImg = (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = site.site.title;
    // Høyden settes via variabel, ikke inline height: CSS-kalibreringen
    // (negativ blokkmarg som skalerer med størrelsen) holder barens høyde
    // konstant uansett bildehøyde - bildet fyller ut, baren vokser aldri.
    img.style.setProperty('--urd-logo-size', `${logoDef.size ?? 32}px`);
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

  // Verktøy-klyngen ytterst til høyre: lys/mørk-bryteren (når temaet har
  // et alt-motstykke) og burgeren. Tom klynge skjules i CSS (:empty).
  const tools = document.createElement('span');
  tools.className = 'urd-nav-tools';

  if (site.theme?.alt?.tokens) {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'urd-nav-theme';
    themeBtn.type = 'button';
    const paintToggle = () => {
      const dark = themeMode() === 'dark';
      // Ikonet viser modusen du BYTTER TIL (konvensjonen folk kjenner).
      themeBtn.innerHTML = dark ? SUN : MOON;
      themeBtn.setAttribute('aria-label', dark ? 'Bytt til lyst tema' : 'Bytt til mørkt tema');
    };
    paintToggle();
    themeBtn.addEventListener('click', () => {
      toggleThemeMode(site.theme);
      paintToggle();
    }, { signal });
    tools.appendChild(themeBtn);
  }

  // Burgeren (kun synlig i mobilvisning via CSS): ikke-modal disclosure av
  // menylisten - ingen fokusfelle eller scroll-lås, panelet scroller selv.
  const burger = document.createElement('button');
  burger.className = 'urd-nav-burger';
  burger.type = 'button';
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'urd-nav-menu');
  burger.setAttribute('aria-label', 'Meny');
  burger.innerHTML = BURGER;
  tools.appendChild(burger);

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
  // I den sidestilte kolonnen er undermenyene trekkspill i flyten: hover-
  // lukking ville kortet ned hele kolonnen under pekeren og gitt feilklikk
  // (eiers testfunn 23. juli 2026). Der styres de kun av klikk.
  const isColumn = hc.host.includes('urd-nav-side-host');
  const hoverable = !isColumn && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
  nav.appendChild(tools);
  host.appendChild(nav);

  // Sidekolonnens bredde justeres ved å dra i innerkanten (kun i preview,
  // som seksjonshøydene). Live-oppdatering via CSS-varen; ved slipp meldes
  // bredden til editoren, som eier utkastet (urd-nav-width).
  if (isSide && document.body.classList.contains('urd-preview')) {
    const grip = document.createElement('div');
    grip.className = 'urd-nav-side-resize';
    grip.title = 'Dra for å endre kolonnebredden';
    const rightSide = hc.host.includes('urd-nav-side-host-right');
    grip.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      grip.setPointerCapture(event.pointerId);
      const startX = event.clientX;
      const startW = clampSideWidth(site.nav.style?.width);
      let width = startW;
      const onMove = (ev) => {
        const delta = rightSide ? startX - ev.clientX : ev.clientX - startX;
        width = clampSideWidth(startW + delta);
        document.body.style.setProperty('--urd-nav-side-width', `${width}px`);
      };
      const onUp = () => {
        grip.removeEventListener('pointermove', onMove);
        grip.removeEventListener('pointerup', onUp);
        if (width !== startW) window.parent?.postMessage({ type: 'urd-nav-width', width }, location.origin);
      };
      grip.addEventListener('pointermove', onMove);
      grip.addEventListener('pointerup', onUp);
    }, { signal });
    host.appendChild(grip);
  }

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
