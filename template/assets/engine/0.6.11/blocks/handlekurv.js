/**
 * Kjerneblokk: handlekurv (butikken). En knapp med antall-badge som åpner
 * en skuff bygget på native `<dialog>`/showModal (ADR-0011: top-layer,
 * ::backdrop, fokusfelle og Escape gratis). Kurven bor i localStorage
 * (butikk.js); skuffen viser linjene med antall-styring, sum og en valgfri
 * lenke til kassesiden. Badge og skuff følger urd-cart-change-hendelsen.
 */
import { readCart, writeCart, cartSetQty, cartRemove, cartCount, cartTotal, formatPrice, onCartChange } from '../butikk.js';
import { iconSvg } from '../icons.js';
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady, t } from '../i18n.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

/** Skuffens innhold bygges på nytt ved åpning og ved hver kurvendring. */
function renderDrawer(body, props, currency) {
  body.textContent = '';
  const items = readCart();
  if (!items.length) {
    body.appendChild(el2('p', 'urd-handlekurv-tom', t('butikk.cartEmpty')));
    return;
  }
  const list = el2('div', 'urd-handlekurv-linjer');
  for (const item of items) {
    const row = el2('div', 'urd-handlekurv-linje');
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = '';
      img.className = 'urd-handlekurv-minibilde';
      row.appendChild(img);
    }
    const info = el2('div', 'urd-handlekurv-info');
    info.appendChild(el2('strong', null, item.title));
    if (item.variant) info.appendChild(el2('span', 'urd-handlekurv-variant', item.variant));
    row.appendChild(info);

    const qty = el2('div', 'urd-handlekurv-antall');
    const minus = el2('button', 'urd-handlekurv-steg', '−');
    minus.type = 'button';
    minus.setAttribute('aria-label', t('butikk.decrease'));
    minus.addEventListener('click', () => writeCart(cartSetQty(readCart(), item.key, item.qty - 1)));
    const count = el2('span', 'urd-handlekurv-tall', String(item.qty));
    const plus = el2('button', 'urd-handlekurv-steg', '+');
    plus.type = 'button';
    plus.setAttribute('aria-label', t('butikk.increase'));
    plus.addEventListener('click', () => writeCart(cartSetQty(readCart(), item.key, item.qty + 1)));
    qty.append(minus, count, plus);
    row.appendChild(qty);

    row.appendChild(el2('span', 'urd-handlekurv-linjesum', formatPrice(item.price * item.qty, currency)));
    const remove = el2('button', 'urd-handlekurv-fjern', '');
    remove.type = 'button';
    remove.innerHTML = iconSvg('cross') ?? '';
    remove.setAttribute('aria-label', t('butikk.remove'));
    remove.addEventListener('click', () => writeCart(cartRemove(readCart(), item.key)));
    row.appendChild(remove);
    list.appendChild(row);
  }
  body.appendChild(list);

  const foot = el2('div', 'urd-handlekurv-sum');
  foot.appendChild(el2('span', null, t('butikk.total')));
  foot.appendChild(el2('strong', null, formatPrice(cartTotal(items), currency)));
  body.appendChild(foot);

  if (props.href) {
    const checkout = el2('a', 'urd-handlekurv-kasse', t('butikk.checkout'));
    checkout.href = props.href;
    body.appendChild(checkout);
  }
}

export const handlekurvBlock = {
  version: 1,
  autoGrow: true,
  label: 'Handlekurv',
  labelKey: 'blocks.handlekurv',
  defaults: () => ({ variant: 'button', href: '', currency: 'kr' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{variant?: string, href?: string, currency?: string}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';
    const currency = props.currency || 'kr';

    const btn = el2('button', `urd-handlekurv-knapp${props.variant === 'icon' ? ' urd-handlekurv-ikonknapp' : ''}`);
    btn.type = 'button';
    const icon = el2('span', 'urd-handlekurv-ikon');
    icon.innerHTML = iconSvg('cart') ?? '';
    btn.appendChild(icon);
    const label = el2('span', 'urd-handlekurv-etikett', t('butikk.cart'));
    if (props.variant !== 'icon') btn.appendChild(label);
    btn.setAttribute('aria-label', t('butikk.cart'));
    const badge = el2('span', 'urd-handlekurv-badge', '0');
    badge.hidden = true;
    btn.appendChild(badge);
    el.appendChild(btn);

    const dialog = document.createElement('dialog');
    dialog.className = 'urd-handlekurv-dialog';
    const head = el2('div', 'urd-handlekurv-hode');
    head.appendChild(el2('strong', null, t('butikk.cart')));
    const close = el2('button', 'urd-handlekurv-lukk');
    close.type = 'button';
    close.innerHTML = iconSvg('cross') ?? '';
    close.setAttribute('aria-label', t('butikk.close'));
    close.addEventListener('click', () => dialog.close());
    head.appendChild(close);
    dialog.appendChild(head);
    const body = el2('div', 'urd-handlekurv-kropp');
    dialog.appendChild(body);
    // Lysavvisning: klikk på ::backdrop treffer selve dialog-elementet.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    el.appendChild(dialog);

    const updateBadge = () => {
      const count = cartCount(readCart());
      badge.textContent = String(count);
      badge.hidden = count === 0;
    };
    updateBadge();
    btn.addEventListener('click', () => {
      renderDrawer(body, props, currency);
      dialog.showModal();
    });

    // Kurvendringer fra produktkort/skuffen selv: badge alltid, skuffen når åpen.
    onCartChange(el, () => {
      updateBadge();
      if (dialog.open) renderDrawer(body, props, currency);
    });

    if (editable) {
      // Hjelpechipen (ADR-0008): kurven virker i forhåndsvisningen også.
      Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
        if (!el.isConnected || el.querySelector('.urd-hint-chip')) return;
        attachHint(el, {
          title: ta('hintHandlekurv.title'),
          lines: [ta('hintHandlekurv.l1'), ta('hintHandlekurv.l2'), ta('hintHandlekurv.l3')],
        });
      });
    }
  },
};
