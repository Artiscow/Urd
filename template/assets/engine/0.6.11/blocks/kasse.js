/**
 * Kjerneblokk: kasse (butikken). Bestillingsskjema uten betalingsgateway:
 * ordresammendraget leses fra kurven (butikk.js), kontaktfeltene (navn,
 * e-post, telefon, kommentar) valideres, og bestillingen sendes som
 * e-postutkast (mailto, null oppsett) eller som JSON til et valgfritt
 * endepunkt. Honeypot-feltet stopper enkle bots (utfylt = forkastet i
 * stillhet). Betaling er en instruks: Vipps-nummeret vises under skjemaet.
 * Et eksternt endepunkt krever connect-src i _headers (ADR-0006).
 */
import {
  readCart, writeCart, cartTotal, formatPrice, orderLines,
  buildOrderBody, buildOrderMailto, buildOrderPayload, isEmail, onCartChange,
} from '../butikk.js';
import { growSectionTo } from '../render.js';
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady, t } from '../i18n.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

/** Ordresammendraget: linjene + sum, eller tom-teksten. Rebygges ved kurvendring. */
function renderSummary(box, currency) {
  box.textContent = '';
  const items = readCart();
  if (!items.length) {
    box.appendChild(el2('p', 'urd-kasse-tom', t('butikk.cartEmpty')));
    return;
  }
  const list = el2('ul', 'urd-kasse-linjer');
  for (const line of orderLines(items, currency)) list.appendChild(el2('li', null, line));
  box.appendChild(list);
  const sum = el2('div', 'urd-kasse-sum');
  sum.append(el2('span', null, t('butikk.total')), el2('strong', null, formatPrice(cartTotal(items), currency)));
  box.appendChild(sum);
}

export const kasseBlock = {
  version: 1,
  autoGrow: true,
  label: 'Kasse',
  labelKey: 'blocks.kasse',
  defaults: () => ({ recipient: '', endpoint: '', vipps: '', currency: 'kr', vippsCheckout: false }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{recipient?: string, endpoint?: string, vipps?: string, currency?: string}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const host = el2('div', 'urd-kasse');
    el.appendChild(host);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
    const currency = props.currency || 'kr';

    const summary = el2('div', 'urd-kasse-sammendrag');
    renderSummary(summary, currency);
    host.appendChild(summary);
    onCartChange(el, () => renderSummary(summary, currency));

    const form = el2('form', 'urd-kasse-skjema');
    form.noValidate = true;
    const field = (labelKey, tag, type) => {
      const label = el2('label', 'urd-kasse-felt');
      label.appendChild(el2('span', null, t(labelKey)));
      const input = document.createElement(tag);
      if (type) input.type = type;
      if (tag === 'textarea') input.rows = 3;
      input.className = 'urd-kasse-input';
      label.appendChild(input);
      form.appendChild(label);
      return input;
    };
    const nameInput = field('butikk.name', 'input', 'text');
    const emailInput = field('butikk.email', 'input', 'email');
    const phoneInput = field('butikk.phone', 'input', 'tel');
    const commentInput = field('butikk.comment', 'textarea');

    // Honeypot: skjult felt bots fyller ut; mennesker ser og treffer det aldri.
    const hpWrap = el2('label', 'urd-kasse-hp');
    hpWrap.setAttribute('aria-hidden', 'true');
    const hp = document.createElement('input');
    hp.type = 'text';
    hp.name = 'website';
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hpWrap.appendChild(hp);
    form.appendChild(hpWrap);

    if (props.vipps) {
      form.appendChild(el2('p', 'urd-kasse-vipps', t('butikk.vippsHint', { number: props.vipps })));
    }

    const buttons = el2('div', 'urd-kasse-knapper');
    const submit = el2('button', 'urd-kasse-send', t('butikk.sendOrder'));
    submit.type = 'submit';
    buttons.appendChild(submit);
    form.appendChild(buttons);

    const status = el2('p', 'urd-kasse-status');
    status.setAttribute('aria-live', 'polite');
    status.hidden = true;
    form.appendChild(status);
    const setStatus = (text, isError) => {
      status.textContent = text;
      status.hidden = false;
      status.classList.toggle('urd-kasse-feil', Boolean(isError));
    };

    // Det valgfrie betalingslaget (ADR-0020): knappen sender kurven til
    // sidens egen funksjon, som regner summen på nytt fra katalogen og
    // svarer med Vipps-sesjonens URL; betalingen skjer hos Vipps.
    if (props.vippsCheckout) {
      const pay = el2('button', 'urd-kasse-vippsbetal', t('butikk.payWithVipps'));
      pay.type = 'button';
      pay.addEventListener('click', async () => {
        // Samme sendevakt som skjemaet: aldri i preview, uansett viewport.
        if (ctx.preview) return;
        const items = readCart();
        if (!items.length) {
          setStatus(t('butikk.cartEmpty'), true);
          return;
        }
        pay.disabled = true;
        try {
          const res = await fetch('/api/vipps/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order: items.map(({ id, qty, variant }) => ({ id, qty, ...(variant ? { variant } : {}) })),
              contact: {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                comment: commentInput.value.trim(),
              },
              returnPath: location.pathname,
            }),
          });
          const data = await res.json().catch(() => null);
          if (res.ok && data?.url) {
            location.href = data.url;
            return;
          }
          setStatus(t(res.status === 503 ? 'butikk.vippsUnavailable' : 'butikk.sendFailed'), true);
        } catch {
          setStatus(t('butikk.sendFailed'), true);
        }
        pay.disabled = false;
      });
      buttons.appendChild(pay);
    }

    // Retur fra betalingen (?bestilt=1): kvittering + tøm kurven. Parameteren
    // ryddes bort, så en oppfrisking ikke tømmer en ny kurv. Kun med
    // betalingslaget på: ellers kunne en delt lenke tømme kurven.
    if (props.vippsCheckout && !ctx.preview && new URLSearchParams(location.search).has('bestilt')) {
      writeCart([]);
      setStatus(t('butikk.orderSent'), false);
      const url = new URL(location.href);
      url.searchParams.delete('bestilt');
      history.replaceState(null, '', url);
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      // I editoren sendes aldri noe, heller ikke i mobilvisningen (ctx.preview,
      // aldri editable: den er falsk i mobil-viewporten).
      if (ctx.preview) return;
      // Utfylt honeypot: forkast i stillhet, vis suksess så boten gir seg.
      if (hp.value.trim()) {
        setStatus(t('butikk.orderSent'), false);
        return;
      }
      const items = readCart();
      if (!items.length) {
        setStatus(t('butikk.cartEmpty'), true);
        return;
      }
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      if (!name || !isEmail(email)) {
        setStatus(t('butikk.fillRequired'), true);
        return;
      }
      const contact = { name, email, phone: phoneInput.value.trim(), comment: commentInput.value.trim() };
      if (props.endpoint) {
        try {
          const res = await fetch(props.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildOrderPayload(items, contact)),
          });
          if (!res.ok) throw new Error(String(res.status));
          // Endepunktet har bekreftet: kurven er levert og tømmes.
          writeCart([]);
          form.reset();
          setStatus(t('butikk.orderSent'), false);
        } catch {
          setStatus(t('butikk.sendFailed'), true);
        }
        return;
      }
      if (props.recipient) {
        const body = buildOrderBody(items, {
          [t('butikk.name')]: name,
          [t('butikk.email')]: email,
          [t('butikk.phone')]: contact.phone,
          [t('butikk.comment')]: contact.comment,
        }, currency, t('butikk.total'));
        location.href = buildOrderMailto(props.recipient, t('butikk.orderSubject', { site: document.title }), body);
        // mailto åpner et utkast: kurven består til e-posten faktisk er sendt.
        setStatus(t('butikk.orderDraft'), false);
        return;
      }
      setStatus(t('butikk.missingTarget'), true);
    });
    host.appendChild(form);

    if (editable) {
      // Hjelpechipen (ADR-0008): sendemåtene og honeypoten forklarer seg selv.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintKasse.title'),
          lines: [ta('hintKasse.l1'), ta('hintKasse.l2'), ta('hintKasse.l3')],
        });
      });
    }

    // Autovekst: sammendraget varierer med kurven. KUN høyden meldes (urd-grow).
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
            window.parent?.postMessage({ type: 'urd-grow', sectionId: ctx.section.id, blockId: el.dataset.blockId, h: needed }, location.origin);
          }
        }
      }
    });
  },
};
