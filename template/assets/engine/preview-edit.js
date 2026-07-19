/**
 * Editeringslaget for preview-modus: dra, resize (med grid-snapping) og
 * slett direkte i den ekte siden inne i editorens iframe.
 *
 * Lastes KUN i preview-modus (dynamisk import i urd.js) - besøkende
 * laster aldri denne filen. Endringer meldes til editoren, som eier
 * utkastet:
 *   side → editor: { type: 'urd-move',   sectionId, blockId, frame, frameKey }
 *                  { type: 'urd-delete', sectionId, blockId }
 *                  { type: 'urd-add-section', index, section }
 *                  { type: 'urd-move-section', sectionId, dir }
 *                  { type: 'urd-delete-section', sectionId }
 *                  { type: 'urd-section-size', sectionId, minHeight }
 *                  { type: 'urd-mobile-manual', sectionId, frames }  (seksjon materialisert)
 *                  { type: 'urd-mobile-auto', sectionId }            (tilbake til auto)
 *                  { type: 'urd-review-done', sectionId }            (mobil gjennomgått)
 *                  { type: 'urd-block-flag', sectionId, blockId, decor }
 */
import { frameToCss } from './render.js';

/** Mobilvisning? Motoren setter body-klassen ut fra breakpointet. */
const isMobile = () => document.body.classList.contains('urd-mobile');

/**
 * Kobler editeringshåndtak på alle blokkene i en rendret seksjon.
 * Kalles av render.js etter hver (re)rendering i preview-modus.
 *
 * @param {HTMLElement} host Seksjonselementet
 * @param {object} section Seksjonsdata
 * @param {{columns: number, rowHeight: number}} grid Effektivt grid
 */
export function enhanceSection(host, section, grid) {
  for (const el of host.querySelectorAll('.urd-block')) {
    const block = section.blocks.find((b) => b.id === el.dataset.blockId);
    if (block) enhanceBlock(el, block, section, grid, host);
  }
  // Markeringen skal overleve rerendringer (f.eks. endringer fra
  // Egenskaper-panelet, som rerendrer hele seksjonen).
  if (selectedBlockId) {
    host.querySelector(`.urd-block[data-block-id="${selectedBlockId}"]`)?.classList.add('urd-selected');
  }
  addSectionToolbar(host, section, grid);
  // Strukturendring (seksjonshøyde) hører til desktopvisningen.
  if (!isMobile()) {
    addSectionHeightHandle(host, section, grid);
    addBlockAdder(host, section);
  }
  // Vedvarende grid-visning (grid-menyen i editoren er åpen) skal
  // overleve rerendringer av seksjonen.
  if (gridOverlaysOn) showGridOverlay(host, grid).classList.add('urd-grid-persistent');
}

/**
 * Plasserer en ny blokk fra editorens palett midt i brukerens synsfelt:
 * i den aktive seksjonen, ellers seksjonen nærmest midten av viewporten.
 * Iframen vet hvor brukeren har scrollet; det gjør ikke editoren.
 */
export function placeBlock(block, root) {
  let host = root.querySelector('.urd-section-active');
  if (!host) {
    let best = null;
    let bestDist = Infinity;
    for (const el of root.querySelectorAll('.urd-section')) {
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) continue;
      const dist = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
      if (dist < bestDist) { best = el; bestDist = dist; }
    }
    host = best ?? root.querySelector('.urd-section');
  }
  if (!host) return;

  const rect = host.getBoundingClientRect();
  const visibleTop = Math.max(0, -rect.top);
  const visibleBottom = Math.max(visibleTop, Math.min(rect.height, window.innerHeight - rect.top));
  const frame = block.frames.desktop;
  frame.y = Math.max(8, Math.round((visibleTop + visibleBottom) / 2 - frame.h / 2));
  frame.x = Math.round(((100 - frame.w) / 2) * 100) / 100;

  post({ type: 'urd-add-block', sectionId: host.dataset.sectionId, block });
}

/**
 * Spiller en inngangsanimasjon på nytt (demo når editoren endrer den):
 * snapp tilbake til starttilstanden uten transition, og gli inn igjen.
 */
export function demoAnimation(el) {
  if (!el) return;
  const entrance = ['urd-anim-fade-in', 'urd-anim-slide-up', 'urd-anim-zoom-in']
    .some((c) => el.classList.contains(c));
  if (!entrance) return;
  el.style.transition = 'none';
  el.classList.remove('urd-anim-in');
  void el.offsetWidth; // tving reflow så starttilstanden faktisk settes
  el.style.transition = '';
  requestAnimationFrame(() => el.classList.add('urd-anim-in'));
}

/** Om vedvarende grid-visning er på (styrt av editorens grid-meny). */
let gridOverlaysOn = false;

/**
 * Slår grid-visning i alle seksjoner av/på. Brukes mens grid-menyen i
 * editoren er åpen, så innstillingsendringer ses umiddelbart.
 */
export function toggleGridOverlays(visible, page, site) {
  gridOverlaysOn = visible;
  document.querySelectorAll('.urd-grid-persistent').forEach((el) => el.remove());
  if (!visible || !page || !site) return;
  for (const host of document.querySelectorAll('.urd-section')) {
    const section = page.sections.find((s) => s.id === host.dataset.sectionId);
    if (!section) continue;
    showGridOverlay(host, section.grid ?? site.grid).classList.add('urd-grid-persistent');
  }
}

/**
 * Felles høyde-dra: flytter seksjonens underkant (size.minHeight), snappet
 * til gridet. Brukes av håndtaket i seksjonens underkant OG av «+ Ny
 * seksjon»-baren (som ligger på samme grense). Lagres i px (rerender kan
 * fortsatt vokse seksjonen hvis blokkene trenger mer, se render.js).
 *
 * Draget starter først etter en liten terskel, slik at target også kan
 * være en klikkbar knapp; opts.onDragged kalles da (før knappens click),
 * så klikket kan undertrykkes.
 */
function wireHeightDrag(target, host, section, grid, opts = {}) {
  target.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    target.setPointerCapture(event.pointerId);
    const startY = event.clientY;
    const startHeight = host.getBoundingClientRect().height;
    let px = startHeight;
    let moved = false;

    const onMove = (ev) => {
      if (!moved && Math.abs(ev.clientY - startY) < 4) return;
      moved = true;
      px = Math.max(grid.size * 3, startHeight + (ev.clientY - startY));
      // Piksel-presist når snap er av eller Shift holdes inne.
      const free = grid.snap === false || ev.shiftKey;
      px = free ? Math.round(px) : Math.round(px / grid.size) * grid.size;
      host.style.minHeight = `${px}px`;
    };
    const onUp = () => {
      target.removeEventListener('pointermove', onMove);
      target.removeEventListener('pointerup', onUp);
      if (!moved) return;
      opts.onDragged?.();
      if (Math.abs(px - startHeight) < 2) return;
      const minHeight = `${px}px`;
      section.size = { ...section.size, minHeight };
      post({ type: 'urd-section-size', sectionId: section.id, minHeight });
    };
    target.addEventListener('pointermove', onMove);
    target.addEventListener('pointerup', onUp);
  });
}

/**
 * «+ Legg til blokk» nederst i seksjonen (vises ved hover): klikk åpner
 * en meny med alle blokktypene, og valget meldes til editoren, som
 * bygger blokken og legger den i akkurat denne seksjonen.
 */
const BLOCK_KINDS = [
  ['text', 'Tekst'], ['text-box', 'Tekstboks'], ['button', 'Knapp'],
  ['image', 'Bilde'], ['video', 'Video'], ['icon', 'Ikon'],
  ['shape-line', 'Strek'], ['shape-arrow', 'Pil'], ['shape-circle', 'Sirkel'],
  ['shape-rect', 'Rektangel'], ['shape-triangle', 'Trekant'],
];

function addBlockAdder(host, section) {
  const wrap = document.createElement('div');
  wrap.className = 'urd-add-block';

  const openBtn = document.createElement('button');
  openBtn.className = 'urd-add-block-open';
  openBtn.textContent = '+ Ny blokk';

  const menu = document.createElement('div');
  menu.className = 'urd-add-block-menu';
  for (const [kind, label] of BLOCK_KINDS) {
    const b = document.createElement('button');
    b.textContent = label;
    b.addEventListener('click', () => {
      menu.classList.remove('open');
      post({ type: 'urd-request-block', sectionId: section.id, kind });
    });
    menu.appendChild(b);
  }
  openBtn.addEventListener('click', () => menu.classList.toggle('open'));
  // enhanceSection kjører etter HVER rerender på samme host-element: lytteren legges kun én gang og slår opp gjeldende meny ved hendelsen, ellers hoper det seg opp én lytter per rerender.
  if (!host._urdAdderLeaveWired) {
    host._urdAdderLeaveWired = true;
    host.addEventListener('mouseleave', () => {
      host.querySelector('.urd-add-block-menu')?.classList.remove('open');
    });
  }

  wrap.append(openBtn, menu);
  host.appendChild(wrap);
}

/** Dra-håndtak i underkant av seksjonen: justerer size.minHeight. */
function addSectionHeightHandle(host, section, grid) {
  const handle = document.createElement('div');
  handle.className = 'urd-section-resize';
  handle.title = 'Dra for å endre seksjonens høyde';
  wireHeightDrag(handle, host, section, grid);
  host.appendChild(handle);
}

/**
 * Legger «+ Ny seksjon»-barer mellom (og rundt) seksjonene. Kalles av
 * render.js etter hver hele siderendering i preview-modus.
 *
 * @param {HTMLElement} root Sidens rotelement
 * @param {object} page Sidedata (for antall seksjoner)
 * @param {object} site site.json (gridet for dra på seksjonsgrensen)
 */
export function enhancePage(root, page, site) {
  initTextToolbar();
  root.querySelectorAll('.urd-add-section').forEach((el) => el.remove());
  // Mobilvisning er justering og tilsyn, ikke strukturbygging.
  if (isMobile()) return;
  const hosts = [...root.querySelectorAll(':scope > .urd-section')];
  // Baren ligger på grensen mellom to seksjoner: dra i den flytter
  // grensen (= høyden på seksjonen OVER), akkurat som seksjonslinjen.
  const above = (i) => (i > 0 ? {
    host: hosts[i - 1],
    section: page.sections[i - 1],
    grid: page.sections[i - 1]?.grid ?? site.grid,
  } : null);
  hosts.forEach((el, i) => root.insertBefore(makeSectionAdder(i, above(i)), el));
  root.appendChild(makeSectionAdder(hosts.length, above(hosts.length)));
}

/** Baren med «+ Ny seksjon»; klikk viser preset-valgene fra registeret,
 *  dra flytter seksjonsgrensen (når det finnes en seksjon over). */
function makeSectionAdder(index, above = null) {
  const bar = document.createElement('div');
  bar.className = 'urd-add-section';

  const collapse = () => {
    bar.classList.remove('open');
    bar.replaceChildren(openBtn);
  };

  const openBtn = document.createElement('button');
  openBtn.textContent = '+ Ny seksjon';
  if (above) {
    openBtn.title = 'Klikk: ny seksjon her. Dra: flytt seksjonsgrensen (Shift = fri høyde)';
    let dragged = false;
    wireHeightDrag(openBtn, above.host, above.section, above.grid, {
      onDragged: () => { dragged = true; },
    });
    // Et fullført dra skal ikke også åpne preset-menyen.
    openBtn.addEventListener('click', (e) => {
      if (dragged) {
        dragged = false;
        e.stopImmediatePropagation();
      }
    }, { capture: true });
  }
  openBtn.addEventListener('click', () => {
    bar.classList.add('open');
    bar.replaceChildren();

    // Preset-galleriet: gruppert etter def.group med def.hint som beskrivelse.
    // Feltene er valgfrie; presets uten group havner under «Annet».
    // Gruppene beholder registerets rekkefølge.
    const menu = document.createElement('div');
    menu.className = 'urd-preset-menu';
    // Den nederste grensen ligger ved sidens slutt, der iframen ikke har plass under: åpne galleriet oppover i stedet.
    // På en tom side (kun én grense) finnes ingenting over, da åpnes det fortsatt nedover.
    if (!bar.nextElementSibling && bar.previousElementSibling) menu.classList.add('urd-preset-up');

    const head = document.createElement('div');
    head.className = 'urd-preset-head';
    const title = document.createElement('span');
    title.textContent = 'Ny seksjon';
    const cancel = document.createElement('button');
    cancel.className = 'urd-preset-close';
    cancel.textContent = '×';
    cancel.title = 'Avbryt';
    cancel.addEventListener('click', collapse);
    head.append(title, cancel);
    menu.appendChild(head);

    const groups = new Map();
    for (const id of window.Urd.sections.ids()) {
      const def = window.Urd.sections.get(id);
      const group = def.group ?? 'Annet';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(def);
    }
    for (const [name, defs] of groups) {
      const heading = document.createElement('div');
      heading.className = 'urd-preset-group';
      heading.textContent = name;
      menu.appendChild(heading);
      for (const def of defs) {
        const choice = document.createElement('button');
        choice.type = 'button';
        choice.className = 'urd-preset-choice';
        const label = document.createElement('span');
        label.className = 'urd-preset-label';
        label.textContent = def.label;
        choice.appendChild(label);
        if (def.hint) {
          const hint = document.createElement('span');
          hint.className = 'urd-preset-hint';
          hint.textContent = def.hint;
          choice.appendChild(hint);
        }
        choice.addEventListener('click', () => {
          post({ type: 'urd-add-section', index, section: def.create() });
          // Rerenderingen fjerner menyen fra DOM: rydd document-lytteren nå i stedet for ved neste tilfeldige klikk.
          cleanupOutside();
        });
        menu.appendChild(choice);
      }
    }
    bar.appendChild(menu);

    // Klikk utenfor menyen lukker den, samme forventning som ellers i editoren.
    // Listeneren ryddes ved lukking og ved preset-valg.
    const outside = (event) => {
      if (!menu.contains(event.target)) {
        cleanupOutside();
        collapse();
      }
    };
    function cleanupOutside() {
      document.removeEventListener('pointerdown', outside, true);
    }
    setTimeout(() => document.addEventListener('pointerdown', outside, true), 0);
  });

  collapse();
  return bar;
}

/**
 * Formateringslinjen for tekstfelt (à la Squarespace): vises over BLOKKEN
 * så lenge et tekstfelt redigeres, med overskriftsnivå, fet/kursiv/
 * understrek, farger, lenke, justering, lister, sitat og fjern-formatering.
 * Kommandoene går via contenteditable (execCommand), som utløser
 * input-hendelsen i text.js - lagringen gjenbruker hele utkastflyten.
 * (Font og grunnstørrelse per felt bor i Egenskaper-panelet.)
 */
let textToolbarReady = false;

function initTextToolbar() {
  if (textToolbarReady) return;
  textToolbarReady = true;

  const bar = document.createElement('div');
  bar.className = 'urd-text-toolbar';
  // Klikk i linjen skal ikke flytte fokus ut av tekstfeltet.
  bar.addEventListener('mousedown', (event) => event.preventDefault());

  const exec = (name, value = null) => document.execCommand(name, false, value);
  const btn = (html, title, run) => {
    const b = document.createElement('button');
    b.innerHTML = html;
    b.title = title;
    b.addEventListener('click', () => { run(); reposition(); });
    bar.appendChild(b);
    return b;
  };
  const sep = () => {
    const s = document.createElement('span');
    s.className = 'urd-tt-sep';
    bar.appendChild(s);
  };

  // Overskriftsnivå
  const level = document.createElement('select');
  level.className = 'urd-tt-level';
  level.title = 'Tekstnivå';
  for (const [value, name] of [['p', 'Avsnitt'], ['h1', 'Overskrift 1'], ['h2', 'Overskrift 2'], ['h3', 'Overskrift 3']]) {
    const o = document.createElement('option');
    o.value = value;
    o.textContent = name;
    level.appendChild(o);
  }
  level.addEventListener('change', () => exec('formatBlock', level.value));
  bar.appendChild(level);
  sep();

  btn('<b>F</b>', 'Fet', () => exec('bold'));
  btn('<i>K</i>', 'Kursiv', () => exec('italic'));
  btn('<u>U</u>', 'Understrek', () => exec('underline'));
  sep();

  // Temafargene (leses ved klikk, så de følger gjeldende tema) + fri farge.
  for (const token of ['text', 'accent']) {
    const b = btn('', token === 'text' ? 'Tekstfarge' : 'Aksentfarge', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(`--urd-color-${token}`).trim();
      exec('foreColor', value);
    });
    b.className = 'urd-text-swatch';
    b.style.background = `var(--urd-color-${token})`;
  }
  const custom = document.createElement('input');
  custom.type = 'color';
  custom.className = 'urd-tt-color';
  custom.title = 'Egen farge';
  custom.addEventListener('input', () => exec('foreColor', custom.value));
  bar.appendChild(custom);

  // Utheving (markeringstusj): aksentfarget bakgrunn på markert tekst.
  const hl = btn('<span class="urd-tt-hl">A</span>', 'Uthev med aksentfargen (klikk igjen på uthevet tekst fjerner via Fjern formatering)', () => {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--urd-color-accent').trim();
    exec('hiliteColor', accent);
  });
  hl.classList.add('urd-tt-hl-btn');
  const hlCustom = document.createElement('input');
  hlCustom.type = 'color';
  hlCustom.className = 'urd-tt-color';
  hlCustom.title = 'Uthev med egen farge';
  hlCustom.addEventListener('input', () => exec('hiliteColor', hlCustom.value));
  bar.appendChild(hlCustom);
  sep();

  const alignIcon = (kind) =>
    `<span class="urd-ticon urd-ticon-${kind}"><i></i><i></i><i></i></span>`;
  btn(alignIcon('left'), 'Venstrejuster', () => exec('justifyLeft'));
  btn(alignIcon('center'), 'Midtstill', () => exec('justifyCenter'));
  btn(alignIcon('right'), 'Høyrejuster', () => exec('justifyRight'));
  sep();

  btn('<span class="urd-licon"><i></i><i></i><i></i></span>', 'Punktliste',
    () => exec('insertUnorderedList'));
  btn('<span class="urd-licon urd-licon-ol"><i>1</i><i>2</i><i>3</i></span>', 'Nummerert liste',
    () => exec('insertOrderedList'));
  btn('❝', 'Sitat', () => exec('formatBlock', 'blockquote'));
  sep();

  const LINK_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg>';
  btn(LINK_SVG, 'Lenke (tomt felt fjerner lenken)', () => {
    const url = prompt('Lenkeadresse:', 'https://');
    if (url === null) return;
    const trimmed = url.trim();
    // Kun vanlige lenkeformer: javascript:-URL-er (og andre aktive skjemaer) skal aldri bli klikkbare hos besøkende.
    if (/^(javascript|data|vbscript):/i.test(trimmed)) {
      alert('Lenkeadressen må være en vanlig nettadresse (https://…), e-post (mailto:) eller intern sti.');
      return;
    }
    if (trimmed) exec('createLink', trimmed);
    else exec('unlink');
  });
  btn('T<sub>×</sub>', 'Fjern formatering', () => {
    exec('removeFormat');
    exec('unlink');
    exec('formatBlock', 'p');
  });
  document.body.appendChild(bar);

  // Linjen vises så lenge et tekstfelt har fokus, forankret over blokken
  // (mousedown på linjen preventDefaults, så fokus består ved klikk der).
  let activeText = null;

  const reposition = () => {
    if (!activeText || !activeText.isConnected) {
      bar.classList.remove('vis');
      return;
    }
    const block = activeText.closest('.urd-block') ?? activeText;
    const rect = block.getBoundingClientRect();
    // Blokkverktøylinjen (⠿, lag, dekor, ×) ligger over blokken: legg tekstlinjen
    // over DEN, så de aldri overlapper.
    const blockToolbar = block.querySelector(':scope > .urd-edit-toolbar');
    const anchorTop = blockToolbar
      ? Math.min(rect.top, blockToolbar.getBoundingClientRect().top)
      : rect.top;
    bar.classList.add('vis');
    bar.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - bar.offsetWidth - 8))}px`;
    bar.style.top = `${Math.max(8, anchorTop - bar.offsetHeight - 8)}px`;
    // Nivåvelgeren speiler markørens plassering.
    try {
      const value = (document.queryCommandValue('formatBlock') || 'p').toLowerCase();
      level.value = ['h1', 'h2', 'h3'].includes(value) ? value : 'p';
    } catch { /* enkelte nettlesere nekter før første kommando */ }
  };

  document.addEventListener('focusin', (event) => {
    const target = event.target instanceof HTMLElement
      ? event.target.closest('.urd-text[contenteditable="true"]')
      : null;
    if (target) activeText = target;
    reposition();
  });
  document.addEventListener('focusout', () => {
    // Vent et blunk: fokus kan være på vei til selve linjen.
    requestAnimationFrame(() => {
      const el = document.activeElement;
      if (!(el instanceof HTMLElement) || !el.closest('.urd-text[contenteditable="true"]')) {
        activeText = null;
        reposition();
      }
    });
  });
  document.addEventListener('selectionchange', reposition);
  window.addEventListener('scroll', reposition, { passive: true, capture: true });
  window.addEventListener('resize', reposition);
}

/** Verktøylinje øverst til høyre i seksjonen. Desktop: flytt opp/ned,
 *  tilpass høyde, slett. Mobil: gjennomgått (✓) og tilbake til auto (↺). */
function addSectionToolbar(host, section, grid) {
  const bar = document.createElement('div');
  bar.className = 'urd-section-toolbar';

  const mk = (text, title, onClick) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.title = title;
    btn.addEventListener('click', onClick);
    bar.appendChild(btn);
  };

  if (isMobile()) {
    const mobile = section.responsive?.mobile;
    if (mobile?.attention?.needed) {
      mk('✓', 'Sett mobil-layouten som gjennomgått', (event) => {
        section.responsive.mobile.attention = null;
        host.classList.remove('urd-attention');
        event.target.remove();
        post({ type: 'urd-review-done', sectionId: section.id });
      });
    }
    if (mobile?.mode === 'manual') {
      mk('↺', 'Tilbakestill til automatisk mobil-layout', () => {
        post({ type: 'urd-mobile-auto', sectionId: section.id });
      });
    }
  } else {
    // Utvidbare presets: «+ kort/rad/person»-knapp som legger til NESTE element i seksjonen.
    // Fabrikken (def.item) bor i preset-definisjonen; seksjonen forblir en generisk container.
    const def = section.preset ? window.Urd.sections.get(section.preset) : null;
    if (def?.item) {
      mk(`+ ${def.itemLabel ?? 'element'}`, `Legg til: ${def.itemLabel ?? 'element'} (Ctrl+Z angrer)`, (event) => {
        // Deaktiver til seksjonen rerendres: et dobbeltklikk før rundturen ville lagt to element i samme rute.
        event.target.disabled = true;
        const next = def.item(section);
        post({ type: 'urd-add-blocks', sectionId: section.id, blocks: next.blocks, minBottom: next.bottom, moves: next.moves ?? [] });
      });
    }
    mk('↑', 'Flytt seksjonen opp', () => post({ type: 'urd-move-section', sectionId: section.id, dir: -1 }));
    mk('↓', 'Flytt seksjonen ned', () => post({ type: 'urd-move-section', sectionId: section.id, dir: 1 }));
    mk('⤓', 'Tilpass høyden til innholdet', () => {
      const maxBottom = Math.max(0, ...section.blocks.map((b) => b.frames.desktop.y + b.frames.desktop.h));
      const minHeight = `${Math.max(grid.size * 3, maxBottom + grid.size)}px`;
      section.size = { ...section.size, minHeight };
      host.style.minHeight = minHeight;
      post({ type: 'urd-section-size', sectionId: section.id, minHeight });
    });
    mk('×', 'Slett seksjonen (Ctrl+Z angrer)', () => {
      post({ type: 'urd-delete-section', sectionId: section.id });
    });
  }

  if (bar.childElementCount) host.appendChild(bar);
}

/**
 * Første håndjustering i mobilvisning: seksjonen går til manuell modus,
 * og ALLE blokkene får konkrete mobil-frames lest fra flyt-posisjonene
 * i øyeblikket (dekor-blokker, som ikke er i flyten, arver desktop-
 * framen som utgangspunkt). DOM-en konverteres på stedet uten rerender,
 * så et pågående dra ikke avbrytes; editoren bokfører via meldingen.
 */
function materializeMobile(host, section) {
  const flow = host.querySelector(':scope > .urd-flow');
  const hostRect = host.getBoundingClientRect();
  const frames = [];
  const flowEls = flow ? [...flow.querySelectorAll(':scope > .urd-block')] : [];

  for (const el of flowEls) {
    const block = section.blocks.find((b) => b.id === el.dataset.blockId);
    if (!block) continue;
    const r = el.getBoundingClientRect();
    block.frames.mobile = {
      x: Math.round(((r.left - hostRect.left) / hostRect.width) * 10000) / 100,
      y: Math.round(r.top - hostRect.top),
      w: Math.round((r.width / hostRect.width) * 10000) / 100,
      h: Math.round(r.height),
      z: block.frames.desktop.z ?? 1,
      rot: block.frames.desktop.rot ?? 0,
    };
    frames.push({ blockId: block.id, frame: block.frames.mobile });
  }
  for (const block of section.blocks) {
    if (!block.frames.mobile) {
      block.frames.mobile = { ...block.frames.desktop };
      frames.push({ blockId: block.id, frame: block.frames.mobile });
    }
  }

  section.responsive = {
    ...(section.responsive ?? {}),
    mobile: { mode: 'manual', attention: section.responsive?.mobile?.attention ?? null },
  };

  // Konverter DOM-en: ut av flyten, inn i absolutt posisjonering.
  for (const el of flowEls) {
    const block = section.blocks.find((b) => b.id === el.dataset.blockId);
    if (!block) continue;
    el.classList.remove('urd-block-flow');
    Object.assign(el.style, frameToCss(block.frames.mobile));
    host.appendChild(el);
  }
  flow?.remove();
  const maxBottom = Math.max(0, ...section.blocks.map((b) => b.frames.mobile.y + b.frames.mobile.h));
  host.style.minHeight = `${maxBottom}px`;

  post({ type: 'urd-mobile-manual', sectionId: section.id, frames });
}

function post(msg) {
  window.parent?.postMessage(msg, location.origin);
}

// Ctrl+Z / Ctrl+Shift+Z inne i iframen videresendes til editoren, som eier
// historikken - MED MINDRE fokus står i redigerbar tekst (der skal
// nettleserens egen tekst-angring gjelde; urd-edit holder utkastet i synk).
window.addEventListener('keydown', (event) => {
  if (!(event.ctrlKey || event.metaKey)) return;
  const key = event.key.toLowerCase();
  if (key !== 'z' && key !== 'y') return;
  const target = event.target;
  if (target instanceof HTMLElement && target.isContentEditable) return;
  event.preventDefault();
  post({ type: 'urd-undo', redo: key === 'y' || event.shiftKey });
});

// Markering: klikk på en blokk gir den varig fokus (håndtakene holder seg
// synlige, se base.css). Klikk utenfor alle blokker avvelger. Markeringen
// overlever rerender via id-en.
let selectedBlockId = null;

function selectBlock(el) {
  const previous = selectedBlockId;
  selectedBlockId = el?.dataset.blockId ?? null;
  document.querySelectorAll('.urd-block.urd-selected').forEach((b) => {
    if (b !== el) b.classList.remove('urd-selected');
  });
  el?.classList.add('urd-selected');
  if (previous !== selectedBlockId) {
    post({
      type: 'urd-select-block',
      sectionId: el?.closest('.urd-section')?.dataset.sectionId ?? null,
      blockId: selectedBlockId,
    });
  }
}

// Intern navigasjon i preview går via editoren (som bytter side og holder
// nedtrekket i synk); eksterne lenker åpnes i ny fane i stedet for å dra
// iframen ut av redigeringsmodus. Lenker INNE i blokker (knapper, bilder,
// tekstlenker) utløses aldri i redigering: klikket markerer blokken, og
// lenken testes via «Se siden».
document.addEventListener('click', (event) => {
  const a = event.target instanceof HTMLElement ? event.target.closest('a[href]') : null;
  if (!a) return;
  if (a.closest('.urd-block')) {
    event.preventDefault();
    return;
  }
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#')) return;
  event.preventDefault();
  const url = new URL(href, location.href);
  if (url.origin === location.origin) {
    post({ type: 'urd-navigate', path: url.pathname });
  } else {
    window.open(url, '_blank', 'noopener');
  }
});

// Tastatur på markert blokk: piltaster flytter (grid-steg; Shift = 1 px),
// Delete sletter, Esc avmarkerer. Aldri når fokus står i tekst/felt, og
// flytting gjelder desktopvisningen (mobil justeres med dra).
window.addEventListener('keydown', (event) => {
  if (!selectedBlockId) return;
  const target = event.target;
  if (target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return;

  if (event.key === 'Escape') {
    selectBlock(null);
    return;
  }

  const el = document.querySelector(`.urd-block[data-block-id="${selectedBlockId}"]`);
  const ctx = el?._urdCtx;
  if (!ctx) return;

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
    if (isMobile()) return;
    event.preventDefault();
    duplicateBlock(ctx.section, ctx.block);
    return;
  }

  if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();
    post({ type: 'urd-delete', sectionId: ctx.section.id, blockId: selectedBlockId });
    selectBlock(null);
    return;
  }

  const dirs = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const dir = dirs[event.key];
  if (!dir || isMobile()) return;
  event.preventDefault();

  const stepPx = event.shiftKey ? 1 : ctx.grid.size;
  const pctPerPx = 100 / ctx.host.clientWidth;
  const r1 = (v) => Math.round(v * 10) / 10;
  const frame = { ...ctx.block.frames.desktop };
  frame.x = clamp(r1(frame.x + dir[0] * stepPx * pctPerPx), 0, r1(100 - frame.w));
  frame.y = frame.y + dir[1] * stepPx;
  ctx.block.frames.desktop = frame;
  Object.assign(el.style, frameToCss(frame));
  // coalesce: en skur av piltastetrykk blir ett angre-steg.
  post({ type: 'urd-move', sectionId: ctx.section.id, blockId: selectedBlockId, frame, frameKey: 'desktop', coalesce: true });
});

// Aktiv seksjon: paletten i editoren legger nye blokker i den sist klikkede seksjonen.
// Markeres med en aksentlinje i venstre kant. Kalles også fra håndtak som stopper propageringen (⠿/resize/rotasjon), så grep i et håndtak teller som klikk i seksjonen.
function markActive(host) {
  document.querySelectorAll('.urd-section-active').forEach((s) => {
    if (s !== host) s.classList.remove('urd-section-active');
  });
  if (host) {
    host.classList.add('urd-section-active');
    post({ type: 'urd-select-section', sectionId: host.dataset.sectionId });
  }
}

document.addEventListener('pointerdown', (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  selectBlock(target?.closest('.urd-block') ?? null);
  markActive(target?.closest('.urd-section'));
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Dupliser en blokk: kopi med ny id, litt forskjøvet, i samme seksjon. */
function duplicateBlock(section, block) {
  const copy = JSON.parse(JSON.stringify(block));
  copy.id = `blk-${crypto.randomUUID().slice(0, 8)}`;
  const f = copy.frames.desktop;
  copy.frames.desktop = {
    ...f,
    x: clamp(Math.round((f.x + 2) * 100) / 100, 0, Math.max(0, Math.round((100 - f.w) * 100) / 100)),
    y: f.y + 16,
  };
  post({ type: 'urd-add-block', sectionId: section.id, block: copy });
}

/**
 * Synlig grid-overlegg i seksjonen mens man drar/resizer, så snappingen
 * har noe å snappe synlig mot. Linjene tegnes med CSS-gradienter i
 * nøyaktig kolonnebredde/radhøyde.
 */
function showGridOverlay(host, grid) {
  const overlay = document.createElement('div');
  overlay.className = 'urd-grid-overlay';
  overlay.style.backgroundSize = `${grid.size}px ${grid.size}px`;
  host.appendChild(overlay);
  return overlay;
}

function enhanceBlock(el, block, section, grid, host) {
  el.classList.add('urd-editable');
  if (block.id === selectedBlockId) el.classList.add('urd-selected');
  if (block.decor) el.classList.add('urd-decor');
  // Tastaturhåndtereren (piltaster/Delete) trenger blokkens kontekst.
  el._urdCtx = { block, section, grid, host };

  const mobile = isMobile();
  const activeFrame = () =>
    (mobile ? (block.frames.mobile ?? block.frames.desktop) : block.frames.desktop);

  const toolbar = document.createElement('div');
  toolbar.className = 'urd-edit-toolbar';
  // Ligger blokken helt i toppen av siden, legges verktøylinjen inni
  // blokken i stedet for over den.
  if (activeFrame().y < 36 && !mobile) {
    toolbar.classList.add('urd-edit-toolbar-inside');
  }

  const moveHandle = document.createElement('button');
  moveHandle.className = 'urd-edit-move';
  moveHandle.textContent = '⠿';
  moveHandle.title = 'Dra for å flytte (snapper til grid)';
  toolbar.appendChild(moveHandle);

  // z-orden: legg blokken øverst/nederst blant seksjonens blokker.
  const bumpZ = (dir) => {
    const others = section.blocks.filter((b) => b.id !== block.id);
    const zs = others.map((b) => b.frames.desktop.z ?? 1);
    let z;
    if (dir > 0) {
      z = zs.length ? Math.max(...zs) + 1 : 1;
    } else if (!zs.length || Math.min(...zs) > 1) {
      z = 1;
    } else {
      // Noen ligger allerede på bunnen: skyv de andre ett hakk opp i
      // stedet, så denne kan legges nederst (z går aldri under 1).
      z = 1;
      for (const other of others) {
        const frame = { ...other.frames.desktop, z: (other.frames.desktop.z ?? 1) + 1 };
        other.frames.desktop = frame;
        host.querySelector(`[data-block-id="${other.id}"]`)?.style.setProperty('z-index', String(frame.z));
        // groupKey samler hele z-omordningen (alle blokkene) i ETT angre-steg hos editoren.
        post({ type: 'urd-move', sectionId: section.id, blockId: other.id, frame, coalesce: true, groupKey: `z-${block.id}` });
      }
    }
    const frame = { ...block.frames.desktop, z };
    block.frames.desktop = frame;
    el.style.zIndex = String(z);
    post({ type: 'urd-move', sectionId: section.id, blockId: block.id, frame, coalesce: true, groupKey: `z-${block.id}` });
  };
  // Struktur (z-orden, dekor, sletting) redigeres i desktopvisning;
  // mobilvisningen er ren layoutjustering.
  if (!mobile) {
    const Z_FRONT_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14"/><path d="M12 20V9"/><path d="M7 13l5-5 5 5"/></svg>';
    const Z_BACK_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20h14"/><path d="M12 4v11"/><path d="M7 11l5 5 5-5"/></svg>';
    const frontBtn = document.createElement('button');
    frontBtn.innerHTML = Z_FRONT_SVG;
    frontBtn.title = 'Legg foran (z-orden). NB: mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning';
    frontBtn.addEventListener('click', () => bumpZ(1));
    toolbar.appendChild(frontBtn);

    const backBtn = document.createElement('button');
    backBtn.innerHTML = Z_BACK_SVG;
    backBtn.title = 'Legg bak (z-orden). NB: mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning';
    backBtn.addEventListener('click', () => bumpZ(-1));
    toolbar.appendChild(backBtn);

    // Dekor-flagget vises som mobil-synlighet - det er det flagget GJØR:
    // telefon = blokken vises i automatisk mobil-layout, overstrøket
    // telefon = den skjules (pynt/dekor). Ikonet ER tilstanden (tegnet
    // SVG, ikke emoji); tooltipen forklarer klikket.
    const PHONE_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.2h3"/></svg>';
    const PHONE_OFF_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.2h3"/><path d="M3.5 3.5l17 17"/></svg>';
    const decorBtn = document.createElement('button');
    decorBtn.className = 'urd-edit-decor';
    const syncDecor = () => {
      decorBtn.innerHTML = block.decor ? PHONE_OFF_SVG : PHONE_SVG;
      decorBtn.title = block.decor
        ? 'Skjult på mobil (pynt/dekor). Klikk for å vise blokken i automatisk mobil-layout.'
        : 'Vises på mobil. Klikk for å skjule blokken i automatisk mobil-layout (pynt/dekor).';
      decorBtn.classList.toggle('on', Boolean(block.decor));
    };
    syncDecor();
    decorBtn.addEventListener('click', () => {
      block.decor = !block.decor;
      el.classList.toggle('urd-decor', block.decor);
      syncDecor();
      post({ type: 'urd-block-flag', sectionId: section.id, blockId: block.id, decor: block.decor });
    });
    toolbar.appendChild(decorBtn);

    const DUP_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';
    const dupBtn = document.createElement('button');
    dupBtn.innerHTML = DUP_SVG;
    dupBtn.title = 'Dupliser blokken (Ctrl+D)';
    dupBtn.addEventListener('click', () => duplicateBlock(section, block));
    toolbar.appendChild(dupBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'urd-edit-delete';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Slett blokken (Ctrl+Z angrer)';
    deleteBtn.addEventListener('click', () => {
      post({ type: 'urd-delete', sectionId: section.id, blockId: block.id });
      // Uten avvalg ville en fantom-markering av den slettede blokken overleve i modultilstanden.
      selectBlock(null);
    });
    toolbar.appendChild(deleteBtn);
  }
  el.appendChild(toolbar);

  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'urd-edit-resize';
  resizeHandle.title = 'Dra for å endre størrelse';
  el.appendChild(resizeHandle);

  wireDrag(moveHandle, 'move');
  wireDrag(resizeHandle, 'resize');
  // Hele blokkflaten kan også dras direkte (⠿ består). Terskel gjør at
  // klikk forblir klikk; redigerbar tekst og håndtak er unntatt.
  wireDrag(el, 'move', { surface: true });
  // Lenker/bilder skal aldri starte nettleserens egen dra-oppførsel.
  el.addEventListener('dragstart', (event) => event.preventDefault());

  // Rotasjonshåndtak (kun desktop: rot bor i desktop-framen). Dras rundt
  // blokkens sentrum; snapper til 15°-steg, Shift gir fri vinkel.
  if (!mobile) {
    const rotHandle = document.createElement('div');
    rotHandle.className = 'urd-edit-rotate';
    rotHandle.textContent = '⟳';
    rotHandle.title = 'Dra for å rotere (15°-steg; Shift = fritt)';
    el.appendChild(rotHandle);

    rotHandle.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      markActive(host);
      selectBlock(el);
      rotHandle.setPointerCapture(event.pointerId);
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angleAt = (ev) => (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI;
      const startAngle = angleAt(event);
      const orig = block.frames.desktop.rot ?? 0;
      let rot = orig;

      const onMove = (ev) => {
        rot = orig + (angleAt(ev) - startAngle);
        rot = ev.shiftKey ? Math.round(rot) : Math.round(rot / 15) * 15;
        if (rot > 180) rot -= 360;
        if (rot < -180) rot += 360;
        el.style.transform = rot ? `rotate(${rot}deg)` : '';
      };
      const onUp = () => {
        rotHandle.removeEventListener('pointermove', onMove);
        rotHandle.removeEventListener('pointerup', onUp);
        if (rot === orig) return;
        const frame = { ...block.frames.desktop, rot };
        block.frames.desktop = frame;
        post({ type: 'urd-move', sectionId: section.id, blockId: block.id, frame, frameKey: 'desktop' });
      };
      rotHandle.addEventListener('pointermove', onMove);
      rotHandle.addEventListener('pointerup', onUp);
    });
  }

  /**
   * Felles dra-logikk for flytting og resize. Piksler oversettes til
   * grid-enheter og rundes fortløpende, så blokken snapper synlig
   * mens man drar. Ved slipp meldes den nye framen til editoren.
   */
  function wireDrag(handle, kind, opts = {}) {
    handle.addEventListener('pointerdown', (event) => {
      if (opts.surface) {
        const target = event.target instanceof HTMLElement ? event.target : null;
        // Redigerbar tekst er kun unntatt når blokken ALT er valgt (da
        // redigerer man teksten). En uvalgt blokk dras fritt også fra
        // teksten - klikk uten dra velger den, klikk igjen redigerer.
        if (target?.closest('.urd-text[contenteditable="true"]') && selectedBlockId === block.id) return;
        if (target?.closest('.urd-edit-toolbar, .urd-edit-resize, .urd-edit-rotate, button, input, select, textarea')) return;
        // Auto-mobil: første materialisering skal være et bevisst valg
        // (dra i ⠿), ikke et klikk på blokken.
        if (mobile && (section.responsive?.mobile?.mode ?? 'auto') !== 'manual') return;
        event.preventDefault();
      } else {
        event.preventDefault();
        event.stopPropagation();
        markActive(host);
        selectBlock(el);
      }
      handle.setPointerCapture(event.pointerId);

      // Første håndjustering i mobilvisning: seksjonen materialiseres
      // (auto → manuell) før draet fortsetter på samme element.
      if (mobile && (section.responsive?.mobile?.mode ?? 'auto') !== 'manual') {
        materializeMobile(host, section);
      }
      const frameKey = mobile ? 'mobile' : 'desktop';

      // Flate-dra starter først etter en liten terskel, så klikk
      // (markering, caret) forblir klikk.
      const threshold = opts.surface ? 4 : 0;
      let started = threshold === 0;

      const start = { x: event.clientX, y: event.clientY };
      const orig = { ...(block.frames[frameKey] ?? block.frames.desktop) };
      // Frames er fysiske (x/w i %, y/h i px); gridet styrer KUN hva vi
      // snapper mot: kvadratiske ruter på grid.size px. Snap av gir fri
      // plassering (0,1 % / 1 px-presisjon).
      const pctPerPx = 100 / host.clientWidth;
      const colStep = grid.size * pctPerPx;
      const r2 = (v) => Math.round(v * 100) / 100;
      const overlay = showGridOverlay(host, grid);
      let current = orig;

      // Smart guides (à la Wix): naboblokkers kanter/senter + seksjonens
      // midtlinje som snappelinjer. Målene samles ved dra-start.
      const GUIDE_TOL = 5;
      const xTargets = [host.clientWidth / 2];
      const yTargets = [];
      for (const other of host.querySelectorAll(':scope > .urd-block')) {
        if (other === el) continue;
        const left = other.offsetLeft;
        const top = other.offsetTop;
        xTargets.push(left, left + other.offsetWidth / 2, left + other.offsetWidth);
        yTargets.push(top, top + other.offsetHeight / 2, top + other.offsetHeight);
      }
      const guideEls = [];
      const clearGuides = () => {
        for (const g of guideEls) g.remove();
        guideEls.length = 0;
      };
      const drawGuide = (axis, px) => {
        const g = document.createElement('div');
        g.className = `urd-smart-guide urd-smart-guide-${axis}`;
        if (axis === 'v') g.style.left = `${px}px`;
        else g.style.top = `${px}px`;
        host.appendChild(g);
        guideEls.push(g);
      };
      /** Justerer current mot nærmeste snappelinje og tegner den. */
      const applyGuides = () => {
        clearGuides();
        if (kind !== 'move') return;
        const wPx = (current.w / 100) * host.clientWidth;
        let leftPx = (current.x / 100) * host.clientWidth;
        let best = null;
        for (const t of xTargets) {
          for (const edge of [0, wPx / 2, wPx]) {
            const d = t - (leftPx + edge);
            if (Math.abs(d) <= GUIDE_TOL && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, line: t };
          }
        }
        if (best) {
          leftPx += best.d;
          current = { ...current, x: clamp(r2((leftPx * 100) / host.clientWidth), 0, r2(100 - current.w)) };
          drawGuide('v', best.line);
        }
        best = null;
        for (const t of yTargets) {
          for (const edge of [0, current.h / 2, current.h]) {
            const d = t - (current.y + edge);
            if (Math.abs(d) <= GUIDE_TOL && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, line: t };
          }
        }
        if (best) {
          current = { ...current, y: current.y + best.d };
          drawGuide('h', best.line);
        }
      };

      const onMove = (ev) => {
        if (!started) {
          if (Math.abs(ev.clientX - start.x) + Math.abs(ev.clientY - start.y) < threshold) return;
          started = true;
        }
        // Shift holdt inne = midlertidig fri plassering (0,1 % / 1 px);
        // ellers styrer grid.snap.
        const free = grid.snap === false || ev.shiftKey;
        const snapPct = free ? (v) => Math.round(v * 10) / 10 : (v) => r2(Math.round(v / colStep) * colStep);
        const snapPx = free ? Math.round : (v) => Math.round(v / grid.size) * grid.size;
        const dx = (ev.clientX - start.x) * pctPerPx;
        const dy = ev.clientY - start.y;
        current = kind === 'move'
          ? {
              ...orig,
              x: clamp(snapPct(orig.x + dx), 0, r2(100 - orig.w)),
              // y er ubegrenset i begge retninger: blokker kan bevisst
              // henge over seksjonstoppen, akkurat som under bunnen.
              y: snapPx(orig.y + dy),
            }
          : {
              ...orig,
              w: clamp(snapPct(orig.w + dx), r2(colStep), r2(100 - orig.x)),
              h: Math.max(4, snapPx(orig.h + dy)),
            };
        // Shift = helt fritt: da hopper vi også over smart guides.
        if (!free) applyGuides();
        else clearGuides();
        Object.assign(el.style, frameToCss(current));
      };

      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        overlay.remove();
        clearGuides();
        if (!started) return;

        // Slippes blokkens SENTRUM over en annen seksjon (desktop),
        // flytter blokken dit - grid og tilhørighet skal følge seksjonen
        // den faktisk ligger i, ikke den den kom fra.
        if (kind === 'move' && !mobile) {
          const rect = el.getBoundingClientRect();
          const target = document
            .elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
            .find((n) => n instanceof HTMLElement && n.classList.contains('urd-section'));
          if (target && target.dataset.sectionId !== section.id) {
            const tRect = target.getBoundingClientRect();
            const frame = { ...current, y: Math.round(rect.top - tRect.top) };
            post({
              type: 'urd-move-block-section',
              fromSectionId: section.id,
              toSectionId: target.dataset.sectionId,
              blockId: block.id,
              frame,
            });
            return;
          }
        }

        if (current.x !== orig.x || current.y !== orig.y || current.w !== orig.w || current.h !== orig.h) {
          block.frames[frameKey] = current;
          post({ type: 'urd-move', sectionId: section.id, blockId: block.id, frame: current, frameKey });
        }
      };

      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp);
    });
  }
}
