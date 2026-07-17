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
  addSectionToolbar(host, section, grid);
  // Strukturendring (seksjonshøyde) hører til desktopvisningen.
  if (!isMobile()) addSectionHeightHandle(host, section, grid);
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
 * Dra-håndtak i underkant av seksjonen: justerer size.minHeight, snappet
 * til gridets radhøyde. Lagres i px (rerender kan fortsatt vokse seksjonen
 * hvis blokkene trenger mer, se render.js).
 */
function addSectionHeightHandle(host, section, grid) {
  const handle = document.createElement('div');
  handle.className = 'urd-section-resize';
  handle.title = 'Dra for å endre seksjonens høyde';

  handle.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    const startY = event.clientY;
    const startHeight = host.getBoundingClientRect().height;
    let px = startHeight;

    const onMove = (ev) => {
      px = Math.max(grid.size * 3, startHeight + (ev.clientY - startY));
      // Piksel-presist når snap er av eller Shift holdes inne.
      const free = grid.snap === false || ev.shiftKey;
      px = free ? Math.round(px) : Math.round(px / grid.size) * grid.size;
      host.style.minHeight = `${px}px`;
    };
    const onUp = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      if (Math.abs(px - startHeight) < 2) return;
      const minHeight = `${px}px`;
      section.size = { ...section.size, minHeight };
      post({ type: 'urd-section-size', sectionId: section.id, minHeight });
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
  });

  host.appendChild(handle);
}

/**
 * Legger «+ Ny seksjon»-barer mellom (og rundt) seksjonene. Kalles av
 * render.js etter hver hele siderendering i preview-modus.
 *
 * @param {HTMLElement} root Sidens rotelement
 * @param {object} page Sidedata (for antall seksjoner)
 * @param {object} site site.json (ubrukt foreløpig, med for symmetri)
 */
export function enhancePage(root, page, site) {
  root.querySelectorAll('.urd-add-section').forEach((el) => el.remove());
  // Mobilvisning er justering og tilsyn, ikke strukturbygging.
  if (isMobile()) return;
  const hosts = [...root.querySelectorAll(':scope > .urd-section')];
  hosts.forEach((el, i) => root.insertBefore(makeSectionAdder(i), el));
  root.appendChild(makeSectionAdder(hosts.length));
}

/** Baren med «+ Ny seksjon»; klikk viser preset-valgene fra registeret. */
function makeSectionAdder(index) {
  const bar = document.createElement('div');
  bar.className = 'urd-add-section';

  const collapse = () => {
    bar.replaceChildren(openBtn);
  };

  const openBtn = document.createElement('button');
  openBtn.textContent = '+ Ny seksjon';
  openBtn.addEventListener('click', () => {
    bar.replaceChildren();
    for (const id of window.Urd.sections.ids()) {
      const def = window.Urd.sections.get(id);
      const choice = document.createElement('button');
      choice.textContent = def.label;
      choice.addEventListener('click', () => {
        post({ type: 'urd-add-section', index, section: def.create() });
      });
      bar.appendChild(choice);
    }
    const cancel = document.createElement('button');
    cancel.textContent = '×';
    cancel.title = 'Avbryt';
    cancel.addEventListener('click', collapse);
    bar.appendChild(cancel);
  });

  collapse();
  return bar;
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
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') return;
  const target = event.target;
  if (target instanceof HTMLElement && target.isContentEditable) return;
  event.preventDefault();
  post({ type: 'urd-undo', redo: event.shiftKey });
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
// iframen ut av redigeringsmodus.
document.addEventListener('click', (event) => {
  const a = event.target instanceof HTMLElement ? event.target.closest('a[href]') : null;
  if (!a) return;
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

document.addEventListener('pointerdown', (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  selectBlock(target?.closest('.urd-block') ?? null);

  // Aktiv seksjon: paletten i editoren legger nye blokker i den sist
  // klikkede seksjonen. Markeres med en aksentlinje i venstre kant.
  const host = target?.closest('.urd-section');
  document.querySelectorAll('.urd-section-active').forEach((s) => {
    if (s !== host) s.classList.remove('urd-section-active');
  });
  if (host) {
    host.classList.add('urd-section-active');
    post({ type: 'urd-select-section', sectionId: host.dataset.sectionId });
  }
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
        post({ type: 'urd-move', sectionId: section.id, blockId: other.id, frame, coalesce: true });
      }
    }
    const frame = { ...block.frames.desktop, z };
    block.frames.desktop = frame;
    el.style.zIndex = String(z);
    post({ type: 'urd-move', sectionId: section.id, blockId: block.id, frame });
  };
  // Struktur (z-orden, dekor, sletting) redigeres i desktopvisning;
  // mobilvisningen er ren layoutjustering.
  if (!mobile) {
    const frontBtn = document.createElement('button');
    frontBtn.textContent = '⬆';
    frontBtn.title = 'Legg foran (z-orden)';
    frontBtn.addEventListener('click', () => bumpZ(1));
    toolbar.appendChild(frontBtn);

    const backBtn = document.createElement('button');
    backBtn.textContent = '⬇';
    backBtn.title = 'Legg bak (z-orden)';
    backBtn.addEventListener('click', () => bumpZ(-1));
    toolbar.appendChild(backBtn);

    const decorBtn = document.createElement('button');
    decorBtn.className = 'urd-edit-decor';
    decorBtn.textContent = '✦';
    decorBtn.title = 'Dekor: utelates fra automatisk mobil-layout';
    decorBtn.classList.toggle('on', Boolean(block.decor));
    decorBtn.addEventListener('click', () => {
      block.decor = !block.decor;
      decorBtn.classList.toggle('on', block.decor);
      el.classList.toggle('urd-decor', block.decor);
      post({ type: 'urd-block-flag', sectionId: section.id, blockId: block.id, decor: block.decor });
    });
    toolbar.appendChild(decorBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'urd-edit-delete';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Slett blokken (Ctrl+Z angrer)';
    deleteBtn.addEventListener('click', () => {
      post({ type: 'urd-delete', sectionId: section.id, blockId: block.id });
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

  /**
   * Felles dra-logikk for flytting og resize. Piksler oversettes til
   * grid-enheter og rundes fortløpende, så blokken snapper synlig
   * mens man drar. Ved slipp meldes den nye framen til editoren.
   */
  function wireDrag(handle, kind) {
    handle.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      handle.setPointerCapture(event.pointerId);

      // Første håndjustering i mobilvisning: seksjonen materialiseres
      // (auto → manuell) før draet fortsetter på samme element.
      if (mobile && (section.responsive?.mobile?.mode ?? 'auto') !== 'manual') {
        materializeMobile(host, section);
      }
      const frameKey = mobile ? 'mobile' : 'desktop';

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

      const onMove = (ev) => {
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
              y: Math.max(0, snapPx(orig.y + dy)),
            }
          : {
              ...orig,
              w: clamp(snapPct(orig.w + dx), r2(colStep), r2(100 - orig.x)),
              h: Math.max(4, snapPx(orig.h + dy)),
            };
        Object.assign(el.style, frameToCss(current));
      };

      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        overlay.remove();
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
