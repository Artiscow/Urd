/**
 * Kjerneblokk: nedteller mot et tidspunkt (typisk et arrangement). Fire
 * enhetsbokser (dager/timer/minutter/sekunder) som tikker med setInterval;
 * tikkingen er logikk, ikke animasjon (ADR-0011), så redusert bevegelse
 * krever ingen særbehandling. Passert mål viser ferdig-teksten. Enhets-
 * ordene er egne nøkler i stedet for Intl.RelativeTimeFormat (nordsamisk
 * mangler i ICU og ville falt til rått tall).
 */
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady, t } from '../i18n.js';

/**
 * Deler tiden fram til målet i enheter (ren, node-testbar).
 * @param {number} targetMs Målet i epoch-ms
 * @param {number} nowMs Nå i epoch-ms
 * @returns {{done: boolean, days: number, hours: number, minutes: number, seconds: number}}
 */
export function countdownParts(targetMs, nowMs) {
  const left = Math.floor((targetMs - nowMs) / 1000);
  if (!Number.isFinite(left) || left <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    done: false,
    days: Math.floor(left / 86400),
    hours: Math.floor((left % 86400) / 3600),
    minutes: Math.floor((left % 3600) / 60),
    seconds: left % 60,
  };
}

/** Måltidspunktet i epoch-ms, eller null når props.target ikke kan tolkes. */
export function parseTarget(target) {
  const text = String(target ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(text)) return null;
  const ms = new Date(text).getTime();
  return Number.isFinite(ms) ? ms : null;
}

export const nedtellerBlock = {
  version: 1,
  // Naturlig høyde i mobil-radnettet (boksene radbryter på smale skjermer).
  autoGrow: true,
  label: 'Nedteller',
  labelKey: 'blocks.nedteller',
  // Seed-regelen (ADR-0012): ta() kalles kun her ved innsetting i preview.
  // Målet seedes 30 dager fram, så blokken teller fra første stund.
  defaults: () => {
    const soon = new Date(Date.now() + 30 * 86400 * 1000);
    const pad = (n) => String(n).padStart(2, '0');
    return {
      target: `${soon.getFullYear()}-${pad(soon.getMonth() + 1)}-${pad(soon.getDate())}T18:00`,
      doneText: ta('seed.nedteller.done'),
      variant: 'boxes',
      showSeconds: true,
    };
  },
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{target?: string, doneText?: string, variant?: string, showSeconds?: boolean}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const host = document.createElement('div');
    host.className = `urd-nedteller${props.variant === 'plain' ? ' urd-nedteller-enkel' : ''}`;
    el.appendChild(host);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';

    const target = parseTarget(props.target);
    const units = [
      ['days', t('nedteller.days')],
      ['hours', t('nedteller.hours')],
      ['minutes', t('nedteller.minutes')],
      ...(props.showSeconds !== false ? [['seconds', t('nedteller.seconds')]] : []),
    ];
    const cells = {};
    for (const [unit, label] of units) {
      const box = document.createElement('div');
      box.className = 'urd-nedteller-enhet';
      const value = document.createElement('div');
      value.className = 'urd-nedteller-tall';
      value.textContent = '0';
      const name = document.createElement('div');
      name.className = 'urd-nedteller-navn';
      name.textContent = label;
      box.append(value, name);
      host.appendChild(box);
      cells[unit] = value;
    }
    const doneEl = document.createElement('div');
    doneEl.className = 'urd-nedteller-ferdig';
    doneEl.textContent = props.doneText ?? '';

    const paint = () => {
      const parts = countdownParts(target ?? 0, Date.now());
      if (target === null || parts.done) {
        host.replaceChildren(doneEl);
        return false;
      }
      cells.days.textContent = String(parts.days);
      cells.hours.textContent = String(parts.hours).padStart(2, '0');
      cells.minutes.textContent = String(parts.minutes).padStart(2, '0');
      if (cells.seconds) cells.seconds.textContent = String(parts.seconds).padStart(2, '0');
      return true;
    };

    if (paint()) {
      const timer = setInterval(() => {
        // Rerender bytter ut elementet: tikkeren følger elementets levetid.
        if (!el.isConnected || !paint()) clearInterval(timer);
      }, 1000);
    }

    if (editable) {
      // Ferdig-teksten er klikk-og-skriv når den vises; målet settes i panelet.
      if (target === null || countdownParts(target, Date.now()).done) {
        try {
          doneEl.contentEditable = 'plaintext-only';
        } catch {
          doneEl.contentEditable = 'true';
        }
        doneEl.addEventListener('input', () => {
          window.parent?.postMessage({
            type: 'urd-edit',
            sectionId: ctx.section.id,
            blockId: el.dataset.blockId,
            props: { ...props, doneText: doneEl.textContent ?? '' },
          }, location.origin);
        });
      }
      // Hjelpechipen (ADR-0008): målet og ferdig-tilstanden trenger forklaring.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintNedteller.title'),
          lines: [ta('hintNedteller.l1'), ta('hintNedteller.l2'), ta('hintNedteller.l3')],
        });
      });
    }
  },
};
