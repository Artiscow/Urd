/**
 * Editeringslaget for preview-modus: dra, resize (med grid-snapping) og
 * slett direkte i den ekte siden inne i editorens iframe.
 *
 * Lastes KUN i preview-modus (dynamisk import i urd.js) - besøkende
 * laster aldri denne filen. Endringer meldes til editoren, som eier
 * utkastet:
 *   side → editor: { type: 'urd-move',   sectionId, blockId, frame }
 *                  { type: 'urd-delete', sectionId, blockId }
 *                  { type: 'urd-add-section', index, section }
 *                  { type: 'urd-move-section', sectionId, dir }
 *                  { type: 'urd-delete-section', sectionId }
 *                  { type: 'urd-section-size', sectionId, minHeight }
 */
import { frameToCss } from './render.js';

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
  addSectionToolbar(host, section);
  addSectionHeightHandle(host, section, grid);
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
      px = Math.max(grid.rowHeight * 4, startHeight + (ev.clientY - startY));
      // Snapper til radhøyden kun når snap er på, ellers piksel-presist.
      px = grid.snap === false ? Math.round(px) : Math.round(px / grid.rowHeight) * grid.rowHeight;
      host.style.minHeight = `${px}px`;
    };
    const onUp = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      if (Math.abs(px - startHeight) < grid.rowHeight) return;
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

/** Verktøylinje øverst til høyre i seksjonen: flytt opp/ned, slett. */
function addSectionToolbar(host, section) {
  const bar = document.createElement('div');
  bar.className = 'urd-section-toolbar';

  const mk = (text, title, onClick) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.title = title;
    btn.addEventListener('click', onClick);
    bar.appendChild(btn);
  };

  mk('↑', 'Flytt seksjonen opp', () => post({ type: 'urd-move-section', sectionId: section.id, dir: -1 }));
  mk('↓', 'Flytt seksjonen ned', () => post({ type: 'urd-move-section', sectionId: section.id, dir: 1 }));
  mk('×', 'Slett seksjonen', () => {
    if (confirm('Slette hele seksjonen med alt innhold?')) {
      post({ type: 'urd-delete-section', sectionId: section.id });
    }
  });

  host.appendChild(bar);
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
  selectedBlockId = el?.dataset.blockId ?? null;
  document.querySelectorAll('.urd-block.urd-selected').forEach((b) => {
    if (b !== el) b.classList.remove('urd-selected');
  });
  el?.classList.add('urd-selected');
}

document.addEventListener('pointerdown', (event) => {
  const el = event.target instanceof HTMLElement ? event.target.closest('.urd-block') : null;
  selectBlock(el);
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
  const colPx = host.clientWidth / grid.columns;
  overlay.style.backgroundSize = `${colPx}px ${grid.rowHeight}px`;
  host.appendChild(overlay);
  return overlay;
}

function enhanceBlock(el, block, section, grid, host) {
  el.classList.add('urd-editable');
  if (block.id === selectedBlockId) el.classList.add('urd-selected');

  const toolbar = document.createElement('div');
  toolbar.className = 'urd-edit-toolbar';
  // Ligger blokken helt i toppen av seksjonen, ville verktøylinjen over
  // blitt klippet av seksjonens overflow - legg den inni blokken i stedet.
  if (block.frames.desktop.y * grid.rowHeight < 36) {
    toolbar.classList.add('urd-edit-toolbar-inside');
  }

  const moveHandle = document.createElement('button');
  moveHandle.className = 'urd-edit-move';
  moveHandle.textContent = '⠿';
  moveHandle.title = 'Dra for å flytte (snapper til grid)';
  toolbar.appendChild(moveHandle);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'urd-edit-delete';
  deleteBtn.textContent = '×';
  deleteBtn.title = 'Slett blokken';
  deleteBtn.addEventListener('click', () => {
    if (confirm('Slette blokken?')) {
      post({ type: 'urd-delete', sectionId: section.id, blockId: block.id });
    }
  });
  toolbar.appendChild(deleteBtn);
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

      const start = { x: event.clientX, y: event.clientY };
      const orig = { ...block.frames.desktop };
      const colWidth = host.clientWidth / grid.columns;
      // snap av (grid.snap === false) gir fri plassering i kvarte
      // grid-enheter, så JSON-verdiene holder seg lesbare.
      const round = grid.snap === false ? (v) => Math.round(v * 4) / 4 : Math.round;
      const overlay = showGridOverlay(host, grid);
      let current = orig;

      const onMove = (ev) => {
        const dx = (ev.clientX - start.x) / colWidth;
        const dy = (ev.clientY - start.y) / grid.rowHeight;
        current = kind === 'move'
          ? {
              ...orig,
              x: clamp(round(orig.x + dx), 0, grid.columns - orig.w),
              y: Math.max(0, round(orig.y + dy)),
            }
          : {
              ...orig,
              w: clamp(round(orig.w + dx), 1, grid.columns - orig.x),
              h: Math.max(1, round(orig.h + dy)),
            };
        Object.assign(el.style, frameToCss(current, grid));
      };

      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        overlay.remove();
        if (current.x !== orig.x || current.y !== orig.y || current.w !== orig.w || current.h !== orig.h) {
          block.frames.desktop = current;
          post({ type: 'urd-move', sectionId: section.id, blockId: block.id, frame: current });
        }
      };

      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp);
    });
  }
}
