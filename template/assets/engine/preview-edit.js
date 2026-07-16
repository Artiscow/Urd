/**
 * Editeringslaget for preview-modus: dra, resize (med grid-snapping) og
 * slett direkte i den ekte siden inne i editorens iframe.
 *
 * Lastes KUN i preview-modus (dynamisk import i urd.js) - besøkende
 * laster aldri denne filen. Endringer meldes til editoren, som eier
 * utkastet:
 *   side → editor: { type: 'urd-move',   sectionId, blockId, frame }
 *                  { type: 'urd-delete', sectionId, blockId }
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
}

function post(msg) {
  window.parent?.postMessage(msg, location.origin);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function enhanceBlock(el, block, section, grid, host) {
  el.classList.add('urd-editable');

  const toolbar = document.createElement('div');
  toolbar.className = 'urd-edit-toolbar';

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
      let current = orig;

      const onMove = (ev) => {
        const dx = (ev.clientX - start.x) / colWidth;
        const dy = (ev.clientY - start.y) / grid.rowHeight;
        current = kind === 'move'
          ? {
              ...orig,
              x: clamp(Math.round(orig.x + dx), 0, grid.columns - orig.w),
              y: Math.max(0, Math.round(orig.y + dy)),
            }
          : {
              ...orig,
              w: clamp(Math.round(orig.w + dx), 1, grid.columns - orig.x),
              h: Math.max(1, Math.round(orig.h + dy)),
            };
        Object.assign(el.style, frameToCss(current, grid));
      };

      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
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
