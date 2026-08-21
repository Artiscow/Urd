/**
 * Kjerneblokk: tabell (åpningstider, prislister). Semantisk `<table>` i en
 * overflow-x-wrapper, så brede tabeller ruller i sin egen flate i stedet for
 * å velte siden. Cellene redigeres rett på lerretet (klikk-og-skriv);
 * rader/kolonner legges til og fjernes i Egenskaper. Stilvalgene (overskrifts-
 * rad, stripete rader, linjer) bor i Stil-fanen.
 */
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady } from '../i18n.js';
import { growSectionTo } from '../render.js';

/**
 * Rektangulariserer radene (ren, node-testbar): alle rader like lange
 * (korte fylles med tomme celler), minst 1 x 1, kun strenger.
 * @param {unknown} rows props.rows slik de står i dataene
 * @returns {string[][]}
 */
export function normalizeRows(rows) {
  const safe = (Array.isArray(rows) ? rows : [])
    .filter(Array.isArray)
    .map((row) => row.map((cell) => String(cell ?? '')));
  if (!safe.length) return [['']];
  const cols = Math.max(1, ...safe.map((row) => row.length));
  return safe.map((row) => [...row, ...Array(cols - row.length).fill('')]);
}

export const tabellBlock = {
  version: 1,
  autoGrow: true,
  label: 'Tabell',
  labelKey: 'blocks.tabell',
  // Seed-regelen (ADR-0012): ta() kalles kun her ved innsetting i preview.
  defaults: () => ({
    header: true,
    striped: false,
    lines: 'rows',
    rows: [
      [ta('seed.tabell.h1'), ta('seed.tabell.h2'), ta('seed.tabell.h3')],
      [ta('seed.tabell.r1c1'), ta('seed.tabell.r1c2'), ''],
      [ta('seed.tabell.r2c1'), ta('seed.tabell.r2c2'), ''],
    ],
  }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{header?: boolean, striped?: boolean, lines?: string, rows?: string[][]}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const host = document.createElement('div');
    host.className = 'urd-tabell';
    el.appendChild(host);
    const post = (msg) => window.parent?.postMessage(msg, location.origin);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';

    const rows = normalizeRows(props.rows);
    const table = document.createElement('table');
    const lines = ['rows', 'grid', 'none'].includes(props.lines) ? props.lines : 'rows';
    table.className = `urd-tabell-table urd-tabell-lines-${lines}${props.striped ? ' urd-tabell-striped' : ''}`;

    const makeCell = (tag, text) => {
      const cell = document.createElement(tag);
      cell.textContent = text;
      if (tag === 'th') cell.scope = 'col';
      return cell;
    };
    const body = document.createElement('tbody');
    rows.forEach((row, index) => {
      const tr = document.createElement('tr');
      const headerRow = props.header !== false && index === 0;
      for (const cell of row) tr.appendChild(makeCell(headerRow ? 'th' : 'td', cell));
      if (headerRow) {
        const head = document.createElement('thead');
        head.appendChild(tr);
        table.appendChild(head);
      } else {
        body.appendChild(tr);
      }
    });
    if (body.rows.length) table.appendChild(body);
    host.appendChild(table);

    if (editable) {
      // Klikk-og-skriv per celle; hele radsettet leses fra DOM ved endring,
      // så props alltid speiler det som faktisk står i tabellen.
      const collect = () => [...table.rows].map((tr) => [...tr.cells].map((cell) => cell.textContent ?? ''));
      for (const tr of table.rows) {
        for (const cell of tr.cells) {
          try {
            cell.contentEditable = 'plaintext-only';
          } catch {
            cell.contentEditable = 'true';
          }
          cell.addEventListener('input', () => {
            post({
              type: 'urd-edit',
              sectionId: ctx.section.id,
              blockId: el.dataset.blockId,
              props: { ...props, rows: collect() },
            });
          });
        }
      }
      // Hjelpechipen (ADR-0008): celle-på-lerret + rader/kolonner i panelet.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintTabell.title'),
          lines: [ta('hintTabell.l1'), ta('hintTabell.l2'), ta('hintTabell.l3')],
        });
      });
    }

    // Autovekst: rammen følger innholdshøyden. KUN høyden meldes (urd-grow).
    requestAnimationFrame(() => {
      if (!el.isConnected) return;
      const needed = host.scrollHeight;
      if (Math.abs(needed - el.clientHeight) > 8 && ctx.viewport !== 'mobile') {
        el.style.height = `${needed}px`;
        const sectionEl = el.closest('.urd-section');
        if (sectionEl) growSectionTo(sectionEl, el.offsetTop + needed + 24);
        if (ctx.preview) {
          const block = ctx.section?.blocks?.find((b) => b.id === el.dataset.blockId);
          if (block && block.frames.desktop.h !== needed) {
            block.frames.desktop = { ...block.frames.desktop, h: needed };
            post({ type: 'urd-grow', sectionId: ctx.section.id, blockId: el.dataset.blockId, h: needed });
          }
        }
      }
    });
  },
};
