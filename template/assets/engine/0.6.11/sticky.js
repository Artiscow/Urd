/**
 * Sticky blokker («fest ved scrolling»): DOM-delen. Tilstanden regnes av
 * de rene funksjonene i sticky-model.js; her måles dokumentet og modusen
 * påføres. Festingen er JS-basert position:fixed, ikke CSS sticky: sticky
 * kan aldri stikke ut av sin egen container, og until-modellen (hold festet
 * forbi egen seksjon) krever fritt tak.
 *
 * To modi: 'scroll' (standard) fester blokken ved vindustoppen når den nås
 * og slipper ved grensen, mens 'screen' dokker den i et fast punkt i vinduet
 * for hele siden. Blokker med samme sticky-group festes som én enhet og
 * beholder plasseringen seg imellom, i stedet for å legge seg oppå hverandre.
 *
 * Festing er aktiv også i editorens preview, så bryteren gjør noe synlig
 * der man slår den på. Konflikten med dra-redigeringen (begge skriver
 * left/top/width på blokken) løses ved at draget suspenderer festingen:
 * preview-edit kaller suspendSticky ved dra-start og resumeSticky ved
 * slipp, så blokken alltid redigeres der den faktisk hører hjemme.
 * Mobilvisningen er dokumentflyt og har aldri festing.
 *
 * Festing er posisjonering uten transitions, så prefers-reduced-motion
 * krever ingen særbehandling.
 */
import { stickyState, groupBox, dockPosition } from './sticky-model.js';

/** Under navens 100002 og editor-chromen, over vanlig innhold. */
const FIXED_Z = '900';

let wired = false;
let ticking = false;
// Teller, ikke flagg: to samtidige dra (to fingre) skal ikke la det første
// slippet gjenoppta festingen mens det andre fortsatt pågår.
let suspendDepth = 0;

/** Kobles én gang fra boot(); scroll/resize er rAF-throttlet. */
export function initSticky() {
  if (wired) return;
  wired = true;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      applySticky();
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // Krympende meny (nav.scroll: 'shrink') endrer høyde med en overgang. Stopper
  // scrollingen midt i den, ville avstanden under blitt stående på gammel
  // menyhøyde til neste scroll; transitionend gir en siste måling.
  document.addEventListener('transitionend', (e) => {
    if (e.target instanceof Element && e.target.id === 'urd-nav') onScroll();
  });
  applySticky();
}

/** Kalles etter re-render og ved bytte av Ren visning (urd-chrome). */
export function refreshSticky() {
  if (wired) applySticky();
}

/**
 * Redigering som skriver geometri (dra, resize, juster/fordel, piltaster)
 * starter: løs alle festede blokker tilbake til sin ekte plass. Uten dette
 * ville skrivingen lagt left/top oppå en fastfrosset blokk.
 */
export function suspendSticky() {
  if (suspendDepth++ === 0) {
    for (const el of document.querySelectorAll('.urd-sticky-able')) release(el);
  }
}

/** Redigeringen ferdig: mål på nytt fra blokkenes nye utgangsverdier. */
export function resumeSticky() {
  suspendDepth = Math.max(0, suspendDepth - 1);
  if (suspendDepth === 0 && wired) applySticky();
}

/** Blokkens egne inline-verdier, slik render.js satte dem fra framen. */
function readGeom(el) {
  return {
    y: parseFloat(el.style.top) || 0,
    top: el.style.top,
    left: el.style.left,
    width: el.style.width,
    z: el.style.zIndex,
  };
}

function restore(el, base) {
  el.classList.remove('urd-sticky-fixed');
  el.style.position = '';
  el.style.left = base.left;
  el.style.width = base.width;
  el.style.top = base.top;
  el.style.zIndex = base.z;
}

/**
 * Slipper blokken tilbake til sine egne verdier og glemmer mellomlagringen.
 * Mellomlagringen finnes KUN mens blokken er festet: da er inline-verdiene
 * overskrevet og de opprinnelige må huskes. Står blokken fritt, leses de
 * ferskt hver gang, så en flytting fra piltaster eller juster/fordel (som
 * ikke rendrer previewen på nytt) aldri måles mot en foreldet posisjon.
 */
function release(el) {
  if (!el._urdStickyBase) return;
  restore(el, el._urdStickyBase);
  delete el._urdStickyBase;
}

function applySticky() {
  // Suspendert (redigering skriver geometri): blokkene er alt løst tilbake
  // til sin ekte plass, og en måling her ville lest mål midt i skrivingen.
  if (suspendDepth > 0) return;
  const els = document.querySelectorAll('.urd-sticky-able');
  if (!els.length) return;
  const body = document.body;
  const inactive = body.classList.contains('urd-mobile');
  const scrollY = window.scrollY;
  // En klistret meny ligger over den festede blokken (nav har høyere z-index,
  // og å heve blokken over menyen ville lagt den oppå undermenyene). Derfor
  // festes blokken UNDER menyen: dens høyde legges til den valgte avstanden.
  // Kun topplinjen tar plass i toppen; en sidestilt meny er en kolonne. Er
  // menyen glidd ut (scroll-adferden 'hide'), beholdes avstanden likevel:
  // en blokk som hoppet opp og ned i takt med menyen ville flimret.
  const stickyNav = document.querySelector('header#urd-nav.urd-nav-sticky:not(.urd-nav-side-host)');
  const navH = stickyNav ? stickyNav.offsetHeight : 0;

  // Blokker med samme sticky-group festes som ÉN enhet; resten er egne
  // grupper på ett medlem, så hele løkka under har samme form.
  const groups = new Map();
  for (const [i, el] of els.entries()) {
    const key = el.dataset.stickyGroup || `solo-${i}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  }

  for (const members of groups.values()) {
    const lead = members[0];
    const section = lead.closest('.urd-section');
    // En transformert seksjonsforfar ville gjort fixed relativ til seg
    // selv (containing block); da er festing meningsløs - stå stille.
    const blocked = inactive || !section || getComputedStyle(section).transform !== 'none';
    if (blocked) {
      for (const el of members) release(el);
      continue;
    }

    const sectionRect = section.getBoundingClientRect();
    // Geometrien leses fra mellomlagringen mens blokken er festet (inline-
    // verdiene er da overskrevet), ellers ferskt fra elementet.
    const geoms = new Map(members.map((el) => [el, el._urdStickyBase ?? readGeom(el)]));
    // Medlemmenes mål i px, felles for begge modusene. left/width regnes fra
    // seksjonsrekten hver gang (tåler resize); rotasjon og høyde røres aldri.
    const boxes = members.map((el) => ({
      el,
      x: sectionRect.width * ((parseFloat(geoms.get(el).left) || 0) / 100),
      y: geoms.get(el).y,
      w: sectionRect.width * ((parseFloat(geoms.get(el).width) || 0) / 100),
      h: el.offsetHeight,
    }));
    const box = groupBox(boxes);

    const place = (el, left, top) => {
      // Mellomlagres først når blokken faktisk festes: da overskrives
      // inline-verdiene, og de opprinnelige må huskes til den slippes.
      el._urdStickyBase ??= geoms.get(el);
      el.classList.add('urd-sticky-fixed');
      el.style.position = 'fixed';
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      // Gruppens innbyrdes lagrekkefølge skal overleve festingen, så blokkens
      // egen z legges oppå gulvet i stedet for å erstattes av det.
      el.style.zIndex = String(Number(FIXED_Z) + (Number(geoms.get(el).z) || 0));
    };

    // Fest til skjermen: gruppen dokkes i et fast punkt i vinduet og blir
    // stående der uansett scrolling. Slippgrensen gjelder ikke her.
    if (lead.dataset.stickyMode === 'screen') {
      const view = { w: document.documentElement.clientWidth, h: window.innerHeight };
      const pos = dockPosition(lead.dataset.stickyDock, Number(lead.dataset.stickyOffset) || 0, box, view);
      for (const b of boxes) {
        b.el.style.width = `${b.w}px`;
        place(b.el, pos.left + (b.x - box.x), pos.top + (b.y - box.y));
      }
      continue;
    }

    const sectionTop = sectionRect.top + scrollY;
    let limitBottom = sectionRect.bottom + scrollY;
    const untilId = lead.dataset.stickyUntil;
    if (untilId) {
      const untilEl = document.querySelector(`.urd-section[data-section-id="${CSS.escape(untilId)}"]`);
      // Slettet/ukjent until-seksjon degraderer til egen seksjons grense.
      if (untilEl) limitBottom = untilEl.getBoundingClientRect().bottom + scrollY;
    }

    // Gruppen måles som én blokk: den fester seg når toppen av boksen når
    // avstanden, og medlemmene beholder plassen sin inne i boksen.
    const state = stickyState(scrollY, {
      sectionTop,
      blockY: box.y,
      blockH: box.h,
      limitBottom,
      offset: (Number(lead.dataset.stickyOffset) || 0) + navH,
    });

    for (const b of boxes) {
      if (state.mode === 'fixed') {
        b.el.style.width = `${b.w}px`;
        place(b.el, sectionRect.left + b.x, state.top + (b.y - box.y));
      } else if (state.mode === 'parked') {
        // Parkert overskriver top, så mellomlagringen må BESTÅ: uten den ville
        // neste måling lest parkeringshøyden som blokkens naturlige plass.
        b.el._urdStickyBase ??= geoms.get(b.el);
        restore(b.el, b.el._urdStickyBase);
        b.el.style.top = `${state.y + (b.y - box.y)}px`;
      } else {
        release(b.el);
      }
    }
  }
}
