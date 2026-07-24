/**
 * Kjerneblokk: FAQ-akkordeon. Spørsmål og svar der svaret foldes ut ved
 * klikk (disclosure-mønsteret: knapp med aria-expanded + region, aldri
 * role="menu", se ADR-0010). Hos besøkende åpner klikk hvor som helst på
 * spørsmålsraden; i editoren er tekstene direkte redigerbare, så der er
 * det kun pilknappen som åpner og lukker.
 *
 * Åpne/lukkede svar er visningstilstand, aldri innhold: blokkens lagrede
 * høyde er alltid den sammenfoldede (autovekst via urd-grow som de andre
 * datablokkene), og utfolding vokser kun visuelt.
 */
import { stripActiveContent } from '../sanitize.js';
import { boxStyleCss } from '../box-style.js';

/**
 * Neste åpen-tilstand ved klikk på et spørsmål (ren, node-testbar).
 *
 * @param {number[]} open Indeksene som er åpne nå
 * @param {number} index Spørsmålet som ble klikket
 * @param {boolean} multi Om flere kan stå åpne samtidig
 * @returns {number[]} Ny åpen-liste, stigende sortert
 */
export function nextOpen(open, index, multi) {
  const set = new Set(open);
  if (set.has(index)) {
    set.delete(index);
  } else {
    if (!multi) set.clear();
    set.add(index);
  }
  return [...set].sort((a, b) => a - b);
}

const CHEVRON = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg>';

export const faqBlock = {
  version: 1,
  label: 'FAQ',
  defaults: () => ({
    items: [
      { q: 'Hvordan blir jeg medlem?', a: '<p>Skriv svaret her.</p>' },
      { q: 'Når er dere åpne?', a: '<p>Skriv svaret her.</p>' },
      { q: 'Hvordan kontakter jeg dere?', a: '<p>Skriv svaret her.</p>' },
    ],
    multi: false,
  }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{items: Array<{q: string, a: string}>, multi?: boolean, boxStyle?: object}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const host = document.createElement('div');
    host.className = 'urd-faq';
    el.appendChild(host);
    const post = (msg) => window.parent?.postMessage(msg, location.origin);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
    let open = [];

    /** Leser gjeldende tekster ut av DOM-en og melder hele items-listen. */
    const postItems = () => {
      const items = [...host.querySelectorAll('.urd-faq-item')].map((item) => ({
        q: item.querySelector('.urd-faq-q')?.textContent ?? '',
        a: item.querySelector('.urd-faq-a .urd-text')?.innerHTML ?? '',
      }));
      post({
        type: 'urd-edit',
        sectionId: ctx.section.id,
        blockId: el.dataset.blockId,
        props: { ...props, items },
      });
    };

    /** Visuell høyde: sammenfoldet basis + de åpne svarene. Kun visning,
     *  aldri bokført i utkastet (urd-grow melder alltid den sammenfoldede). */
    const adjustHeight = () => {
      const openHeights = [...host.querySelectorAll('.urd-faq-item.open .urd-faq-a > .urd-text')]
        .reduce((sum, a) => sum + a.scrollHeight, 0);
      const needed = (el._urdFaqBase ?? host.scrollHeight) + openHeights;
      el.style.height = `${needed}px`;
      const sectionEl = el.closest('.urd-section');
      if (sectionEl) {
        const bottom = el.offsetTop + needed + 24;
        const current = Number.parseFloat(sectionEl.style.minHeight) || 0;
        if (bottom > current) sectionEl.style.minHeight = `${bottom}px`;
      }
    };

    const applyOpen = () => {
      host.querySelectorAll('.urd-faq-item').forEach((item, i) => {
        const isOpen = open.includes(i);
        item.classList.toggle('open', isOpen);
        const btn = item.querySelector('.urd-faq-toggle');
        if (btn) btn.setAttribute('aria-expanded', String(isOpen));
      });
      adjustHeight();
    };

    const toggle = (i) => {
      open = nextOpen(open, i, Boolean(props.multi));
      applyOpen();
    };

    (props.items ?? []).forEach((entry, i) => {
      const item = document.createElement('div');
      item.className = 'urd-faq-item urd-text-box';
      Object.assign(item.style, boxStyleCss(props.boxStyle));

      const head = document.createElement('div');
      head.className = 'urd-faq-head';
      const q = document.createElement('span');
      q.className = 'urd-faq-q';
      q.textContent = entry.q ?? '';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'urd-faq-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Vis eller skjul svaret');
      btn.innerHTML = CHEVRON;
      // Uten stopp ville pointerdown boble til dokumentets markeringslytter,
      // og en re-render kunne bytte ut knappen før click fyrte (samme vern
      // som blokk-menyens tannhjul i preview-edit).
      btn.addEventListener('pointerdown', (event) => event.stopPropagation());
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggle(i);
      });
      head.append(q, btn);

      const region = document.createElement('div');
      region.className = 'urd-faq-a';
      region.setAttribute('role', 'region');
      const answer = document.createElement('div');
      answer.className = 'urd-text';
      answer.innerHTML = entry.a ?? '';
      answer.querySelectorAll('.urd-edit-toolbar, .urd-edit-resize, .urd-edit-rotate, button').forEach((n) => n.remove());
      stripActiveContent(answer);
      region.appendChild(answer);
      item.append(head, region);
      host.appendChild(item);

      if (editable) {
        // Klikk-og-skriv som tekstblokken: spørsmålet er ren tekst,
        // svaret rik tekst (.urd-text[contenteditable] gir formateringslinjen).
        try {
          q.contentEditable = 'plaintext-only';
        } catch {
          q.contentEditable = 'true';
        }
        answer.contentEditable = 'true';
        q.addEventListener('input', postItems);
        answer.addEventListener('input', () => {
          postItems();
          adjustHeight();
        });
      } else {
        // Besøkende: hele raden åpner og lukker.
        head.addEventListener('click', () => toggle(i));
        head.style.cursor = 'pointer';
      }
    });

    if (editable) {
      // Hjelpechipen (ADR-0008): blokken har spesialfunksjoner og forklarer seg selv.
      import('../hint.js').then(({ attachHint }) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: 'FAQ-blokken',
          lines: [
            'Klikk rett i et spørsmål eller svar for å skrive',
            'Pilknappen åpner og lukker svaret; besøkende kan klikke hele raden',
            'Nye spørsmål, rekkefølge, flere åpne samtidig og kortstil i Egenskaper',
            'Blokken lagrer sammenfoldet høyde og vokser kun visuelt ved åpning',
          ],
        });
      });
    }

    // Autovekst (som samling-blokken): rammen følger den sammenfoldede
    // høyden. KUN høyden meldes (urd-grow), aldri hele framen.
    requestAnimationFrame(() => {
      if (!el.isConnected) return;
      el._urdFaqBase = host.scrollHeight;
      const needed = host.scrollHeight;
      if (Math.abs(needed - el.clientHeight) > 8 && ctx.viewport !== 'mobile') {
        el.style.height = `${needed}px`;
        const sectionEl = el.closest('.urd-section');
        if (sectionEl) {
          const bottom = el.offsetTop + needed + 24;
          const current = Number.parseFloat(sectionEl.style.minHeight) || 0;
          if (bottom > current) sectionEl.style.minHeight = `${bottom}px`;
        }
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
