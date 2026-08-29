/**
 * Render-løkka: side → seksjoner → bakgrunnslag + blokker.
 *
 * All data løftes via migrate.lift() før rendering. Ukjente typer og
 * render-feil gir nøytrale plassholdere (blokker) eller hoppes over
 * (bakgrunnslag er dekorative) - siden krasjer aldri av dårlig data.
 *
 * To viewporter (opts.viewport):
 *  - 'desktop': absolutt posisjonering fra frames.desktop.
 *  - 'mobile': radnettet (ADR-0019), én sti for alle seksjoner. Blokker
 *    uten frames.mobile auto-plasseres i leserekkefølge (stackOrder);
 *    blokker med row i frames.mobile pinnes til eksplisitte radspor.
 *    hideMobile-blokker utelates, tekst og autovoksende blokker får
 *    naturlig høyde, og seksjonshøyden følger av rutenettet.
 */
import { lift, MOBILE_ROW, MOBILE_GAP } from './migrate.js';
import { applyAnimation, applyCardAnimation } from './animations/core.js';
import { applySectionTheme } from './theme.js';
import { refreshSticky } from './sticky.js';
import { t } from './i18n.js';

/**
 * Tegner bakgrunnslagene (color/gradient/glow/grain/image/bildegalleri) inn i
 * host som `div.urd-bg-layer`-elementer, nedenfra og opp. Delt av seksjoner
 * (render.js), nav (nav.js) og footer (footer.js) - samme lagmodell overalt.
 * Hvert lag løftes via lift() før render; ukjente typer og render-feil hoppes
 * over med en advarsel (bakgrunner er dekorative, de velter aldri siden).
 * @param {HTMLElement} host Elementet lagene bygges inn i
 * @param {{layers?: Array<{type: string, version?: number, props?: object}>}} [background]
 */
export function renderBackgroundLayers(host, background) {
  const Urd = window.Urd;
  for (const layer of background?.layers ?? []) {
    const el = document.createElement('div');
    el.className = 'urd-bg-layer';
    const lifted = lift(layer, Urd.backgrounds.get(layer.type));
    if (!lifted.ok) {
      console.warn(`Urd: hopper over bakgrunnslag '${layer.type}' (${lifted.placeholder})`);
      continue;
    }
    try {
      Urd.backgrounds.get(layer.type).render(el, lifted.props);
      host.appendChild(el);
    } catch (err) {
      console.warn(`Urd: bakgrunnslag '${layer.type}' feilet under render`, err);
    }
  }
}

/**
 * Oversetter en frame til CSS-posisjonering.
 * Ren funksjon (ingen DOM), testet i tests/render.test.mjs.
 *
 * Frames er i FYSISKE enheter: x/w i prosent av
 * seksjonsbredden (flyter med skjermen), y/h i px. Gridet er kun et
 * snappeverktøy ved redigering og påvirker aldri plasseringen.
 *
 * @param {{x: number, y: number, w: number, h: number, z?: number, rot?: number}} frame
 * @returns {{left: string, top: string, width: string, height: string, zIndex: string, transform: string}}
 */
/**
 * Skriver nettstedets layout-tokens på rot-elementet (ADR-0018). Kanvasen
 * i hver seksjon leser dem, så én skriving styrer hele siden.
 *
 * Ligger her og ikke i en egen modul med vilje: nye motormoduler trekkes
 * inn i den statiske import-lukningen, som modulepreload-testen tvinger
 * inn i alle HTML-skallene.
 *
 * @param {object} site site.json (løftet)
 * @param {HTMLElement} [root] Elementet tokenene settes på
 */
export function applySiteLayout(site, root = document.documentElement) {
  const width = site?.layout?.contentWidth ?? 1440;
  // Margen er PROSENT AV VINDUSBREDDEN (vw), ikke piksler: den virker bare i
  // båndet der bredden ikke binder ennå, og der skal luften følge skjermen.
  const gutter = site?.layout?.gutter ?? 6;
  root.style.setProperty('--urd-canvas-w', width === 'full' ? '100%' : `${width}px`);
  root.style.setProperty('--urd-canvas-gutter-desktop', `${Number(gutter) || 0}vw`);
}

/**
 * Løfter seksjonens min-height så innhold ned til `bottom` px (i innholds-
 * flatens koordinater) får plass. Brukes av autovoksende blokker. Nav-
 * klaringen (--urd-section-clear) holdes utenfor sammenligningen og skrives
 * tilbake i kalkylen, samme form som renderSection setter: computed
 * min-height er klaring medregnet, mens `bottom` er ren innholdshøyde.
 * @param {HTMLElement} sectionEl Seksjonselementet
 * @param {number} bottom Innholdets nederste kant i px
 */
export function growSectionTo(sectionEl, bottom) {
  const cs = getComputedStyle(sectionEl);
  const clear = Number.parseFloat(cs.getPropertyValue('--urd-section-clear')) || 0;
  const current = (Number.parseFloat(cs.minHeight) || 0) - clear;
  if (bottom > current) sectionEl.style.minHeight = `calc(${bottom}px + var(--urd-section-clear, 0px))`;
}

export function frameToCss(frame) {
  return {
    left: `${frame.x}%`,
    top: `${frame.y}px`,
    width: `${frame.w}%`,
    height: `${frame.h}px`,
    zIndex: String(frame.z ?? 1),
    transform: frame.rot ? `rotate(${frame.rot}deg)` : '',
  };
}

/**
 * Leserekkefølgen i mobil-radnettet: sortert på desktop-y, deretter x;
 * blokker med hideMobile utelates. Pinnede blokker (frames.mobile med row)
 * er MED, i samme leserekkefølge: auto-plasseringen hopper over dem, men
 * DOM-rekkefølgen bærer opplesingsrekkefølgen. Ren funksjon, testet.
 *
 * @param {Array<object>} blocks Seksjonens blokker
 * @returns {Array<object>} Blokkene som skal rendres på mobil, i rekkefølge
 */
export function stackOrder(blocks) {
  // mobileOrder (additivt felt) overstyrer sorteringsnøkkelen og tolkes på samme skala som desktop-y.
  // Presetene bruker det til å holde kort samlet (ikon + boks) i stedet for at y-sorteringen splitter kortene i bånd; blokker uten feltet sorterer som før.
  const key = (block) => block.mobileOrder ?? block.frames.desktop.y;
  return blocks
    .filter((block) => !block.hideMobile && block.frames?.desktop)
    .slice()
    .sort((a, b) => (key(a) - key(b)) || (a.frames.desktop.x - b.frames.desktop.x));
}

/**
 * Ny mobileOrder-nøkkel for å flytte en blokk ett hakk opp eller ned i
 * mobil-leserekkefølgen. Ren funksjon, testet.
 *
 * Nøkkelen legges MELLOM naboenes nøkler (midtpunkt), så ingen andre
 * blokker trenger nye nøkler. Kun flytende blokker deltar: pinnede har
 * eksplisitt rad og står utenfor flytrekkefølgen. Returnerer null når
 * blokken alt står i enden (eller ikke flyter).
 *
 * @param {Array<object>} blocks Seksjonens blokker
 * @param {string} blockId Blokken som skal flyttes
 * @param {number} dir -1 = tidligere, 1 = senere
 * @returns {number|null} Ny mobileOrder, eller null når flytting er umulig
 */
export function reorderMobileKey(blocks, blockId, dir) {
  const flow = stackOrder(blocks).filter((b) => !Number.isFinite(b.frames.mobile?.row));
  const i = flow.findIndex((b) => b.id === blockId);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= flow.length) return null;
  const key = (b) => b.mobileOrder ?? b.frames.desktop.y;
  const target = key(flow[j]);
  const beyond = flow[j + dir] ? key(flow[j + dir]) : null;
  const next = beyond === null ? target + dir * 16 : (target + beyond) / 2;
  // Like nabonøkler gir et midtpunkt som ikke flytter noe (rekkefølgen
  // avgjøres da av x-tiebreaket); legg nøkkelen et knepp forbi i stedet.
  const nudged = next === target ? target + dir * 0.01 : next;
  return Math.round(nudged * 100) / 100;
}

/**
 * Oversetter en mobil-plassering til CSS for radnettet (ADR-0019).
 * Ren funksjon (ingen DOM), testet i tests/render.test.mjs.
 *
 * `placement` er blokkens frames.mobile: null betyr at blokken følger
 * desktop fullt ut, et objekt uten `row` overstyrer kun feltene som står
 * der (blokken flyter fortsatt), og et objekt med `row` pinner blokken til
 * eksplisitte radspor. Radene er minmax(MOBILE_ROW, auto) og vokser med
 * innholdet, så en radposisjon er en posisjon i komposisjonen, ikke en
 * frossen pikselavstand.
 *
 * @param {{x?: number, w?: number, row?: number, rows?: number, z?: number, rot?: number}|null} placement
 * @param {{x: number, y: number, w: number, h: number, z?: number, rot?: number}} desktop Blokkens desktop-frame
 * @param {{autoGrow?: boolean}} [opts] autoGrow: tekst og datablokker med naturlig høyde
 * @returns {object} Stilkart for Object.assign(el.style, ...)
 */
export function mobilePlacementToCss(placement, desktop, opts = {}) {
  const css = {};
  // z og rot faller begge tilbake til desktop-framen: plasseringen
  // overstyrer kun feltene som faktisk står i den.
  const rot = placement?.rot ?? desktop.rot;
  if (rot) css.transform = `rotate(${rot}deg)`;
  const z = placement?.z ?? desktop.z;
  if (z != null) css.zIndex = String(z);

  if (Number.isFinite(placement?.row)) {
    // Pinnet: eksplisitte radspor. Uten rows avledes spennet fra
    // desktophøyden. Høyden settes ikke: elementet strekkes til sporene
    // sine (grid-stretch), og vokser innholdet, vokser sporene med.
    const rows = Number.isFinite(placement.rows)
      ? placement.rows
      : Math.max(1, Math.ceil(desktop.h / MOBILE_ROW));
    css.gridRow = `${placement.row} / span ${rows}`;
    css.width = `${placement.w ?? desktop.w}%`;
    css.marginLeft = `${placement.x ?? desktop.x}%`;
    css.justifySelf = 'start';
    return css;
  }

  // Flyter: auto-plassert. Partielle overstyringer gjelder kun feltene
  // som faktisk står i plasseringen.
  if (placement?.w != null) css.width = `${placement.w}%`;
  if (placement?.x != null) {
    css.marginLeft = `${placement.x}%`;
    css.justifySelf = 'start';
  }
  if (!opts.autoGrow) {
    // Fast høyde fra desktop; spennet rommer margin-bottom (MOBILE_GAP fra
    // base.css), så radsporene forblir MOBILE_ROW px og aldri blåses opp.
    css.height = `${desktop.h}px`;
    css.gridRow = `auto / span ${Math.max(1, Math.ceil((desktop.h + MOBILE_GAP) / MOBILE_ROW))}`;
  }
  return css;
}

/**
 * Render en hel side inn i root. Hver seksjon får sitt eget <section>-
 * element, slik at renderSection kan rerendre én seksjon alene senere.
 *
 * @param {object} page Sidefil (content/pages/*.json), allerede parset
 * @param {object} site site.json
 * @param {HTMLElement} root
 * @param {{preview?: boolean, viewport?: 'desktop'|'mobile'}} [opts]
 */
export function renderPage(page, site, root, opts = {}) {
  root.replaceChildren();
  for (const section of page.sections) {
    const host = document.createElement('section');
    root.appendChild(host);
    renderSection(section, site, host, opts);
  }
  // «+ Ny seksjon»-barene mellom seksjonene (kun i preview).
  if (opts.preview) window.UrdPreviewEdit?.enhancePage(root, page, site);
  // Sticky blokker måles på nytt (re-render kan ha endret høyder/felt).
  refreshSticky();
}

/**
 * Render (eller rerender) én seksjon - grunnlaget for inkrementell preview.
 *
 * @param {object} section Seksjonsdata
 * @param {object} site site.json
 * @param {HTMLElement} host Seksjonselementet (tømmes og bygges på nytt)
 * @param {{preview?: boolean, viewport?: 'desktop'|'mobile'}} [opts]
 */
export function renderSection(section, site, host, opts = {}) {
  const Urd = window.Urd;
  const grid = section.grid ?? site.grid;
  const viewport = opts.viewport ?? 'desktop';
  const ctx = { site, section, grid, viewport, preview: Boolean(opts.preview) };

  host.className = 'urd-section';
  host.dataset.sectionId = section.id;
  // DOM-id gjør seksjonen til ankermål (#<seksjons-id> fra footer-kolonner,
  // menypunkter og blokk-lenker); myk ankerscroll kommer fra base.css.
  if (typeof section.id === 'string' && section.id) host.id = section.id;
  // Ferdig seksjonstema (rollesett, additivt fra v0.6): overstyrer seksjonens
  // fargetokens på host, blokkene arver dem. Nullstiller ved Standard/fravær.
  applySectionTheme(host, section.theme);
  host.replaceChildren();

  renderBackgroundLayers(host, section.background);

  // Innholdsflaten (ADR-0018): seksjonen er full vindusbredde og eier
  // bakgrunnen, kanvasen binder innholdet til designbredden og sentrerer
  // det. Blokkenes x/w er prosent AV DENNE, ikke av vinduet, så layouten
  // slutter å vokse med skjermen. Bredden settes i CSS (base.css), ikke
  // her, så editoren kan MÅLE den i stedet for å regne den ut.
  const canvas = document.createElement('div');
  canvas.className = 'urd-canvas';
  // Per-seksjon overstyring: 'full' gir kant-til-kant innhold (helter,
  // skillelinjer), en CSS-lengde gir egen bredde for denne seksjonen.
  const secWidth = section.size?.maxWidth;
  if (secWidth) canvas.style.setProperty('--urd-canvas-w', secWidth === 'full' ? '100%' : secWidth);
  host.appendChild(canvas);

  if (viewport === 'mobile') {
    // Mobil-radnettet (ADR-0019): én sti for alle seksjoner. Urørte
    // blokker auto-plasseres i leserekkefølge, pinnede får eksplisitte
    // radspor, og minmax-radene lar innholdet vokse uten JS.
    const flow = document.createElement('div');
    flow.className = 'urd-flow';
    for (const block of stackOrder(section.blocks)) {
      const el = document.createElement('div');
      const pinned = Number.isFinite(block.frames.mobile?.row);
      el.className = pinned ? 'urd-block urd-block-pinned' : 'urd-block urd-block-flow';
      el.dataset.blockId = block.id;
      // Dekor-merket leses av stagger-animasjonen (dekor er pynt og skal
      // ikke forsinke innholdsbølgen).
      if (block.decor) el.dataset.decor = '1';
      // Autovoksende blokker (tekst, og def.autoGrow: faq/galleri/samling
      // og plugin-blokker med eget innhold) får naturlig høyde: fast
      // desktophøyde ville klippet høyere mobilinnhold.
      const def = Urd.blocks.get(block.type);
      const autoGrow = block.type === 'text' || Boolean(def?.autoGrow);
      Object.assign(el.style, mobilePlacementToCss(block.frames.mobile, block.frames.desktop, { autoGrow }));
      // Skjermdokking gjelder også mobil: sticky.js dokker blokken mot
      // dens egen målte størrelse. Scroll-festing er desktop-eneste
      // (radnettet er dokumentflyt), så den modusen merkes ikke her.
      if (block.sticky && typeof block.sticky.offset === 'number' && block.sticky.mode === 'screen') {
        el.classList.add('urd-sticky-able');
        el.dataset.stickyOffset = String(block.sticky.offset);
        el.dataset.stickyMode = 'screen';
        el.dataset.stickyDock = block.sticky.dock ?? 'bottom-right';
        el.dataset.stickyGroup = block.sticky.group ?? '';
      }
      renderBlock(Urd, el, block, ctx);
      flow.appendChild(el);
    }
    canvas.appendChild(flow);
    host.style.minHeight = 'auto';
  } else {
    // Desktop: absolutt posisjonering fra desktop-frames.
    let maxBottomPx = 0;
    for (const block of section.blocks) {
      // En blokk uten desktop-frame (håndredigert/ødelagt data) hoppes over i stedet for å velte hele seksjonen.
      if (!block.frames?.desktop) {
        console.warn(`Urd: blokk '${block.id ?? block.type}' mangler frames.desktop - hoppes over`);
        continue;
      }
      const el = document.createElement('div');
      el.className = 'urd-block';
      el.dataset.blockId = block.id;
      // Dekor-merket leses av stagger-animasjonen (dekor er pynt og skal
      // ikke forsinke innholdsbølgen); mobilflyten filtrerer på feltet selv.
      if (block.decor) el.dataset.decor = '1';
      const frame = block.frames.desktop;
      Object.assign(el.style, frameToCss(frame));
      // Sticky («fest ved scrolling», additivt felt): kun merking her;
      // selve festingen gjør sticky.js ved scroll. Mobilgrenen over merker
      // kun skjermdokking (scroll-festing hører til absolutt layout).
      if (block.sticky && typeof block.sticky.offset === 'number') {
        el.classList.add('urd-sticky-able');
        el.dataset.stickyOffset = String(block.sticky.offset);
        el.dataset.stickyUntil = block.sticky.until ?? '';
        // Additive felt: modus ('screen' dokker til vinduet), dokkpunkt og
        // gruppe-id (blokker med samme id festes samlet).
        el.dataset.stickyMode = block.sticky.mode ?? 'scroll';
        el.dataset.stickyDock = block.sticky.dock ?? 'bottom-right';
        el.dataset.stickyGroup = block.sticky.group ?? '';
      }
      maxBottomPx = Math.max(maxBottomPx, frame.y + frame.h);
      renderBlock(Urd, el, block, ctx);
      canvas.appendChild(el);
    }

    // Seksjonshøyden er brukerens: blokker kan bevisst henge utover
    // kanten (seksjoner klipper aldri). Uten satt høyde brukes
    // blokkenes utstrekning. Nav-klaringen (--urd-section-clear, 0 utenom
    // første seksjon under en meny utenfor flyten, se base.css) legges
    // oppå, så innholdsflaten beholder høyden sin når den skyves ned.
    host.style.minHeight = `calc(${section.size?.minHeight ?? `${maxBottomPx}px`} + var(--urd-section-clear, 0px))`;
  }

  // Valgfri seksjonsanimasjon (additivt felt fra v0.5). Inn-animasjonen
  // (animation) og pekereffekten (hover, additivt felt fra v0.6) er
  // uavhengige og kan kombineres.
  renderAnimation(Urd, host, section.animation, ctx);
  renderAnimation(Urd, host, section.hover, ctx);

  // Mobil-tilsyn: redaksjonell markering, kun i preview (besøkende
  // ignorerer flagget, se docs/SKJEMA.md#mobil-tilsyn).
  if (ctx.preview && section.responsive?.mobile?.attention?.needed) {
    host.classList.add('urd-attention');
  }

  // I preview-modus kobles editeringslaget (dra/resize/slett) på etter
  // hver rendering. Satt av urd.js; finnes aldri hos besøkende.
  if (ctx.preview) window.UrdPreviewEdit?.enhanceSection(host, section, grid);
  // Sticky blokker måles på nytt (inkrementell rerender av én seksjon).
  refreshSticky();
}

/** Felles blokk-rendering med migrering og plassholder-fallback. */
function renderBlock(Urd, el, block, ctx) {
  const def = Urd.blocks.get(block.type);
  const lifted = lift(block, def);
  if (lifted.ok) {
    try {
      def.render(el, lifted.props, ctx);
      // Inn-animasjon og pekereffekt er uavhengige felt og kan kombineres.
      // Kortvis-blokker (animPerCard) sprer feltene på kortene sine selv
      // via renderCardAnimations når kortene er hentet; markøren settes
      // synkront her: seksjons-stagger velger målene sine i samme task,
      // før kortene og klassene deres finnes.
      if (!def.animPerCard) {
        renderAnimation(Urd, el, block.animation, ctx);
        renderAnimation(Urd, el, block.hover, ctx);
      } else if (block.animation?.type || block.hover?.type) {
        el.classList.add('urd-anim-kortvis');
      }
    } catch (err) {
      console.warn(`Urd: blokk '${block.type}' feilet under render`, err);
      renderPlaceholder(el, block.type);
    }
  } else {
    renderPlaceholder(el, block.type);
  }
}

/**
 * Kortvis animasjon for blokker med animPerCard-flagget: blokkens
 * animasjons- og hover-felt spres på kortene i stedet for blokk-elementet.
 * Kortene finnes først etter datahenting, så blokken kaller selv når de
 * er bygget; uten kort kan blokken sende seg selv som eneste mål, så
 * feltene aldri står døde. Registeret leses fra window.Urd (satt av
 * urd.js før første render; direkte import ville gitt en sirkel).
 */
export function renderCardAnimations(el, cards, block, ctx) {
  if (!window.Urd) return;
  for (const animation of [block?.animation, block?.hover]) {
    renderAnimation(window.Urd, el, animation, ctx,
      (target, type, props, def, c) => applyCardAnimation(target, cards, type, props, def, c));
  }
}

/**
 * Valgfri animasjon på blokk/seksjon. Ukjent eller feilende animasjon
 * viser innholdet uanimert - animasjon er dekor og velter aldri siden.
 * apply-parameteren lar kortvis-stien dele løftet og vernet her.
 */
function renderAnimation(Urd, el, animation, ctx, apply = applyAnimation) {
  if (!animation?.type) return;
  const def = Urd.animations.get(animation.type);
  const lifted = lift(animation, def);
  if (!lifted.ok) return;
  try {
    apply(el, animation.type, lifted.props, def, ctx);
  } catch (err) {
    console.warn(`Urd: animasjonen '${animation.type}' feilet`, err);
  }
}

/**
 * Nøytral plassholder for ukjente/feilende blokker. Dataene bak er
 * urørt; dette er kun visning (se løfte 2 og ADR-0005).
 * @param {HTMLElement} el
 * @param {string} type
 */
function renderPlaceholder(el, type) {
  el.classList.add('urd-placeholder');
  el.textContent = type;
  el.title = t('render.missingPlugin', { type });
}
