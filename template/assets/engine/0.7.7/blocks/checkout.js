/**
 * Core block: checkout (the shop).
 * The order summary is read from the basket (shop.js), the contact fields (name, email, phone, comment) are validated, and the order is sent as an email draft (mailto, zero setup), as JSON to an optional endpoint, or to the optional payment layer (ADR-0020).
 * The order lines and the total are repeated right above the order buttons, and the buttons' texts say that ordering is a purchase or a payment: angrerettloven § 16 asks for both, and without the wording the buyer is not bound.
 * The buttons are described by the summary, so a screen reader that tabs to them hears the order and the total.
 * Under the buttons the seller is named from the Site panel's contact details (angrerettloven § 8 d), unless the block leaves it out (`seller: false`).
 * The honeypot field stops simple bots (filled in = discarded silently).
 * With a Vipps number set, payment is an instruction shown in the form above the order summary.
 * An external endpoint requires connect-src in _headers (ADR-0006).
 */
import {
  readCart, writeCart, cartTotal, formatPrice, orderLines, orderSummary,
  buildOrderBody, buildOrderMailto, buildOrderPayload, isEmail, onCartChange,
} from '../shop.js';
// Only called in preview (after the admin dictionary has loaded): never at module level.
import { ta, adminLocaleReady, t } from '../i18n.js';
import { sellerParts } from '../contact-model.js';
import { legalText } from '../footer.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

/** The order summary: the lines plus the total, or the empty text. Rebuilt on basket change. */
function renderSummary(box, currency) {
  box.textContent = '';
  const items = readCart();
  if (!items.length) {
    box.appendChild(el2('p', 'urd-checkout-empty', t('shop.cartEmpty')));
    return;
  }
  const list = el2('ul', 'urd-checkout-lines');
  for (const line of orderLines(items, currency)) list.appendChild(el2('li', null, line));
  box.appendChild(list);
  const sum = el2('div', 'urd-checkout-total');
  sum.append(el2('span', null, t('shop.total')), el2('strong', null, formatPrice(cartTotal(items), currency)));
  box.appendChild(sum);
}

/** The summary right above the order buttons: the order in one line and the total; hidden with an empty basket. */
function renderRecap(box, currency) {
  box.textContent = '';
  const items = readCart();
  box.hidden = !items.length;
  if (!items.length) return;
  const sum = el2('div', 'urd-checkout-total');
  sum.append(el2('span', null, t('shop.total')), el2('strong', null, formatPrice(cartTotal(items), currency)));
  box.append(el2('p', 'urd-checkout-recap-lines', orderSummary(items)), sum);
}

/** Numbers the summaries above the buttons, so two checkouts on a page keep their descriptions apart. */
let recapCount = 0;

/** The seller under the order buttons, as an <address>: «Seller: Apeiron Linjeforening · Org.nr. … · Street 1, 7034 Town», the phone and the email as links. */
function buildSeller(seller) {
  const box = el2('address', 'urd-checkout-seller');
  box.appendChild(el2('span', 'urd-checkout-seller-label', `${t('shop.seller')}:`));
  const text = [seller.name, seller.legal.length ? legalText(seller.legal) : '', seller.address].filter(Boolean).join(' · ');
  if (text) box.appendChild(el2('span', null, text));
  for (const item of [seller.phone, seller.email]) {
    if (!item) continue;
    const node = el2(item.href ? 'a' : 'span', null, item.label);
    if (item.href) node.href = item.href;
    box.appendChild(node);
  }
  return box;
}

export const checkoutBlock = {
  version: 1,
  autoGrow: true,
  label: 'Checkout',
  labelKey: 'blocks.checkout',
  defaults: () => ({ recipient: '', endpoint: '', vipps: '', currency: 'kr', vippsCheckout: false, seller: true }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{recipient?: string, endpoint?: string, vipps?: string, currency?: string}} props
   * @param {object} ctx Render context
   */
  render(el, props, ctx) {
    const host = el2('div', 'urd-checkout');
    el.appendChild(host);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
    // The payment layer charges in NOK, so with it on the prices show kr whatever word the block holds.
    const currency = props.vippsCheckout ? 'kr' : (props.currency || 'kr');

    const summary = el2('div', 'urd-checkout-summary');
    renderSummary(summary, currency);
    host.appendChild(summary);
    const recap = el2('div', 'urd-checkout-recap');
    recapCount += 1;
    recap.id = `urd-checkout-recap-${recapCount}`;
    renderRecap(recap, currency);
    onCartChange(el, () => {
      renderSummary(summary, currency);
      renderRecap(recap, currency);
    });

    const form = el2('form', 'urd-checkout-form');
    form.noValidate = true;
    const field = (labelKey, tag, type) => {
      const label = el2('label', 'urd-checkout-field');
      label.appendChild(el2('span', null, t(labelKey)));
      const input = document.createElement(tag);
      if (type) input.type = type;
      if (tag === 'textarea') input.rows = 3;
      input.className = 'urd-checkout-input';
      label.appendChild(input);
      form.appendChild(label);
      return input;
    };
    const nameInput = field('shop.name', 'input', 'text');
    const emailInput = field('shop.email', 'input', 'email');
    const phoneInput = field('shop.phone', 'input', 'tel');
    const commentInput = field('shop.comment', 'textarea');

    // Honeypot: a hidden field bots fill in; humans never see or hit it.
    const hpWrap = el2('label', 'urd-checkout-hp');
    hpWrap.setAttribute('aria-hidden', 'true');
    const hp = document.createElement('input');
    hp.type = 'text';
    hp.name = 'website';
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hpWrap.appendChild(hp);
    form.appendChild(hpWrap);

    if (props.vipps) {
      form.appendChild(el2('p', 'urd-checkout-vipps', t('shop.vippsHint', { number: props.vipps })));
    }

    form.appendChild(recap);
    const buttons = el2('div', 'urd-checkout-buttons');
    const submit = el2('button', 'urd-checkout-send', t('shop.sendOrder'));
    submit.type = 'submit';
    submit.setAttribute('aria-describedby', recap.id);
    buttons.appendChild(submit);
    form.appendChild(buttons);

    const status = el2('p', 'urd-checkout-status');
    status.setAttribute('aria-live', 'polite');
    status.hidden = true;
    form.appendChild(status);
    const seller = props.seller === false ? null : sellerParts(ctx.site);
    if (seller) form.appendChild(buildSeller(seller));
    const setStatus = (text, isError) => {
      status.textContent = text;
      status.hidden = false;
      status.classList.toggle('urd-checkout-error', Boolean(isError));
    };

    // The optional payment layer (ADR-0020): the button sends the basket to
    // the site's own function, which recomputes the total from the catalogue
    // and answers with the Vipps session URL; payment happens at Vipps.
    if (props.vippsCheckout) {
      const pay = el2('button', 'urd-checkout-vippspay', t('shop.payWithVipps'));
      pay.type = 'button';
      pay.setAttribute('aria-describedby', recap.id);
      pay.addEventListener('click', async () => {
        // Same send guard as the form: never in preview, whatever the viewport.
        if (ctx.preview) return;
        const items = readCart();
        if (!items.length) {
          setStatus(t('shop.cartEmpty'), true);
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
            // The session's reference is kept for the return, which asks whether this session was paid.
            try { sessionStorage.setItem('urd-vipps-reference', String(data.reference ?? '')); } catch { /* no storage: the basket then stays after the payment */ }
            location.href = data.url;
            return;
          }
          setStatus(t(res.status === 503 ? 'shop.vippsUnavailable' : 'shop.sendFailed'), true);
        } catch {
          setStatus(t('shop.sendFailed'), true);
        }
        pay.disabled = false;
      });
      buttons.appendChild(pay);
    }

    // Return from payment (?ordered=<reference>): the basket is emptied and the buyer thanked only when the reference is the one this browser started and the site's session endpoint says the session was paid, so neither a shared address nor a cancelled payment empties a basket.
    // The parameter is cleaned away so a refresh does not ask again.
    const ordered = new URLSearchParams(location.search).get('ordered');
    if (props.vippsCheckout && !ctx.preview && ordered !== null) {
      const url = new URL(location.href);
      url.searchParams.delete('ordered');
      history.replaceState(null, '', url);
      let started = '';
      try { started = sessionStorage.getItem('urd-vipps-reference') ?? ''; } catch { /* no storage */ }
      if (started && ordered === started && /^urd-[0-9a-f]{24}$/.test(ordered)) {
        // Vipps may send the buyer back before the session is settled, so the page asks a few times while it is still being paid.
        const ask = async (left) => {
          const data = await fetch(`/api/vipps/session?reference=${encodeURIComponent(ordered)}`).then((res) => (res.ok ? res.json() : null));
          if (data?.paid) {
            writeCart([]);
            setStatus(t('shop.orderSent'), false);
            try { sessionStorage.removeItem('urd-vipps-reference'); } catch { /* no storage */ }
            return;
          }
          if (left > 0 && ['SessionCreated', 'PaymentInitiated'].includes(data?.state)) setTimeout(() => ask(left - 1).catch(() => {}), 2000);
        };
        ask(5).catch(() => {});
      }
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      // Nothing is ever sent from the editor, not even in the mobile view
      // (ctx.preview, never editable: that one is false in the mobile viewport).
      if (ctx.preview) return;
      // Honeypot filled in: discard silently, show success so the bot gives up.
      if (hp.value.trim()) {
        setStatus(t('shop.orderSent'), false);
        return;
      }
      const items = readCart();
      if (!items.length) {
        setStatus(t('shop.cartEmpty'), true);
        return;
      }
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      if (!name || !isEmail(email)) {
        setStatus(t('shop.fillRequired'), true);
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
          // The endpoint has confirmed: the basket is delivered, so it is emptied.
          writeCart([]);
          form.reset();
          setStatus(t('shop.orderSent'), false);
        } catch {
          setStatus(t('shop.sendFailed'), true);
        }
        return;
      }
      if (props.recipient) {
        const body = buildOrderBody(items, {
          [t('shop.name')]: name,
          [t('shop.email')]: email,
          [t('shop.phone')]: contact.phone,
          [t('shop.comment')]: contact.comment,
        }, currency, t('shop.total'));
        location.href = buildOrderMailto(props.recipient, t('shop.orderSubject', { site: document.title }), body);
        // mailto opens a draft: the basket survives until the email is actually sent.
        setStatus(t('shop.orderDraft'), false);
        return;
      }
      setStatus(t('shop.missingTarget'), true);
    });
    host.appendChild(form);

    if (editable) {
      // The help chip (ADR-0008): the send methods and the honeypot explain themselves.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintCheckout.title'),
          lines: [ta('hintCheckout.l1'), ta('hintCheckout.l2'), ta('hintCheckout.l3'), ta('hintCheckout.l4')],
        });
      });
    }
  },
};
