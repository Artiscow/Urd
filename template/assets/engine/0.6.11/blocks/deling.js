/**
 * Kjerneblokk: delingsknapper. Rene, statiske delingslenker uten sporing
 * (aldri leverandør-SDK-er): hver tjeneste er en vanlig `<a>` til tjenestens
 * delings-URL med sidens adresse som parameter, tegnet med ikonbibliotekets
 * SVG-er. «Kopier lenke» bruker Clipboard API og vises kun der API-et
 * finnes (ADR-0011: funksjonssjekk, aldri et halvdødt element).
 */
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady, t } from '../i18n.js';
import { iconSvg } from '../icons.js';

/** Tjeneste-id (datakontrakt) → ikon-id og merkenavn (oversettes aldri). */
export const SHARE_SERVICES = [
  ['facebook', 'facebook', 'Facebook'],
  ['x', 'x', 'X'],
  ['linkedin', 'linkedin', 'LinkedIn'],
  ['whatsapp', 'whatsapp', 'WhatsApp'],
  ['email', 'mail', null],
  ['copy', 'share', null],
];

/**
 * Delings-URL for en tjeneste (ren, node-testbar). Alt URL-encodes; 'copy'
 * og ukjente tjenester gir null (kopiering er en knapp, ingen lenke).
 * @param {string} service Tjeneste-id fra SHARE_SERVICES
 * @param {string} pageUrl Sidens fulle adresse
 * @param {string} title Sidens tittel (med i tekstbaserte delinger)
 * @returns {string|null}
 */
export function shareUrl(service, pageUrl, title) {
  const url = encodeURIComponent(String(pageUrl ?? ''));
  const text = encodeURIComponent(String(title ?? ''));
  if (service === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (service === 'x') return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
  if (service === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  if (service === 'whatsapp') return `https://wa.me/?text=${text}%20${url}`;
  if (service === 'email') return `mailto:?subject=${text}&body=${url}`;
  return null;
}

export const delingBlock = {
  version: 1,
  // Naturlig høyde i mobil-radnettet (knappene radbryter på smale skjermer).
  autoGrow: true,
  label: 'Delingsknapper',
  labelKey: 'blocks.deling',
  defaults: () => ({
    services: ['facebook', 'x', 'linkedin', 'whatsapp', 'email', 'copy'],
    variant: 'icons',
    size: 38,
    color: '',
  }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{services?: string[], variant?: string, size?: number, color?: string}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const host = document.createElement('div');
    host.className = `urd-deling${props.variant === 'labels' ? ' urd-deling-labels' : ''}`;
    const size = Math.min(64, Math.max(24, Number(props.size) || 38));
    host.style.setProperty('--urd-deling-size', `${size}px`);
    // Fargen valideres som hex eller tematoken; alt annet gir aksentfargen.
    const color = String(props.color ?? '');
    if (/^#[0-9a-fA-F]{3,8}$/.test(color)) host.style.setProperty('--urd-deling-color', color);
    else if (/^[a-z][a-z0-9-]*$/.test(color)) host.style.setProperty('--urd-deling-color', `var(--urd-color-${color})`);
    el.appendChild(host);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';

    const wanted = Array.isArray(props.services) ? props.services : [];
    for (const [service, icon, brand] of SHARE_SERVICES) {
      if (!wanted.includes(service)) continue;
      const label = brand ?? t(service === 'copy' ? 'deling.copy' : 'deling.email');
      const inner = `<span class="urd-deling-ikon">${iconSvg(icon) ?? ''}</span><span class="urd-deling-navn"></span>`;
      if (service === 'copy') {
        // Kopier lenke: kun med Clipboard API (funksjonssjekk, ADR-0011).
        if (!navigator.clipboard?.writeText) continue;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'urd-deling-knapp';
        btn.innerHTML = inner;
        btn.querySelector('.urd-deling-navn').textContent = label;
        btn.title = label;
        btn.setAttribute('aria-label', label);
        btn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(location.href);
            btn.querySelector('.urd-deling-navn').textContent = t('deling.copied');
            btn.classList.add('urd-deling-kopiert');
            setTimeout(() => {
              btn.querySelector('.urd-deling-navn').textContent = label;
              btn.classList.remove('urd-deling-kopiert');
            }, 1600);
          } catch {
            // Avslått tillatelse: knappen står urørt, ingen feiltilstand å vise.
          }
        });
        host.appendChild(btn);
        continue;
      }
      const link = document.createElement('a');
      link.className = 'urd-deling-knapp';
      // Adressen og tittelen leses ved klikk, ikke ved render: klientside-
      // navigasjon kan ha byttet side siden blokken ble tegnet.
      link.href = '#';
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // Aldri åpne delingsvinduer fra editoren, heller ikke i mobilvisningen
        // (ctx.preview, aldri editable: den er falsk i mobil-viewporten).
        if (ctx.preview) return;
        const target = shareUrl(service, location.href, document.title);
        if (!target) return;
        if (service === 'email') location.href = target;
        else window.open(target, '_blank', 'noopener');
      });
      link.innerHTML = inner;
      link.querySelector('.urd-deling-navn').textContent = label;
      const aria = brand ? t('deling.share', { service: brand }) : label;
      link.title = aria;
      link.setAttribute('aria-label', aria);
      host.appendChild(link);
    }

    if (editable) {
      // Hjelpechipen (ADR-0008): sporingsfriheten er blokkens særtrekk.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintDeling.title'),
          lines: [ta('hintDeling.l1'), ta('hintDeling.l2'), ta('hintDeling.l3')],
        });
      });
    }
  },
};
