/**
 * Kjerneblokk: produktkort (butikken, datablokk-mønsteret ADR-0007).
 * Rendrer innslagene i en produktsamling (kind «products») som kort med
 * bilde, badge, pris (og evt. medlemspris), størrelses- og fargevalg og
 * «Legg i handlekurv». Fargevalg med eget bilde bytter kortets bilde.
 * Katalogen er git-eid data; kurven bor hos den besøkende (butikk.js).
 *
 * Hos besøkende åpner klikk på bilde/tittel en quick view: produktdetaljene
 * i en native <dialog> (ADR-0011) med bildegalleri, full tekst, variantvalg
 * og kjøpsknapp - produktsiden uten sidebytte (Squarespace-mønsteret).
 * I editoren eier klikk redigeringen, og et «+ Produkt»-kort sist i
 * rutenettet legger et nytt produkt i samlingen (urd-collection-add).
 *
 * Innholdet er strukturert DATA: tittel/tekst er rik tekst gjennom samme
 * vern som samling-blokken, alt annet rendres med textContent.
 */
import { getCollection } from '../samlinger.js';
import { applyEntryImageStyle } from './samling.js';
import { growSectionTo } from '../render.js';
import { stripActiveContent } from '../sanitize.js';
import { iconSvg } from '../icons.js';
import { readCart, writeCart, cartAdd, itemKey, variantLabel, formatPrice, altCardImage } from '../butikk.js';
// Kun kalt i preview (etter at admin-ordboka er lastet): aldri på modulnivå.
import { ta, adminLocaleReady, t } from '../i18n.js';

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

const post = (msg) => window.parent?.postMessage(msg, location.origin);

/** Rik tekst-node (tittel/tekst) med klikk-og-skriv i preview (urd-collection-edit). */
function richNode(tag, className, entry, field, collection, editable) {
  const value = entry[field];
  if (!value && !editable) return null;
  const node = el2(tag, className);
  if (value) {
    node.innerHTML = value;
    stripActiveContent(node);
  } else {
    node.classList.add('urd-samling-placeholder');
    node.dataset.placeholder = 'Skriv tekst …';
  }
  if (editable) {
    node.contentEditable = 'true';
    node.classList.add('urd-samling-editable', 'urd-text');
    node.addEventListener('input', () => {
      post({ type: 'urd-collection-edit', collection, entryId: entry.id, field, value: node.innerHTML });
    });
  }
  return node;
}

/** Valg-chips (størrelse/farge): én rad knapper der ett valg kan være aktivt. */
function choiceRow(className, labels, onPick) {
  const row = el2('div', `urd-produkt-valg ${className}`);
  let active = null;
  for (const label of labels) {
    const btn = el2('button', 'urd-produkt-chip', label);
    btn.type = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      // Klikk på det aktive valget opphever det (valg er valgfritt).
      const next = active === label ? null : label;
      active = next;
      for (const other of row.children) other.setAttribute('aria-pressed', String(other === btn && next !== null));
      onPick(next);
    });
    row.appendChild(btn);
  }
  return row;
}

/** Prisrad: vises kun når prisen er satt (nytt produkt skal ikke vise «0 kr»). */
function priceRow(entry, currency) {
  if (entry.price == null) return null;
  const row = el2('div', 'urd-produkt-pris');
  row.appendChild(el2('strong', null, formatPrice(entry.price, currency)));
  if (entry.memberPrice != null) {
    row.appendChild(el2('span', 'urd-produkt-medlem',
      t('butikk.memberPrice', { price: formatPrice(entry.memberPrice, currency) })));
  }
  return row;
}

/** Kjøpsknapp med lagt-i-kurven-kvittering; getChoice() leser gjeldende variantvalg. */
function buyButton(entry, currency, colors, getChoice) {
  const buy = el2('button', 'urd-produkt-kjop', t('butikk.addToCart'));
  buy.type = 'button';
  buy.addEventListener('click', () => {
    const { size, color } = getChoice();
    const variant = variantLabel(size, color);
    const chosen = colors.find((c) => c.name === color);
    writeCart(cartAdd(readCart(), {
      key: itemKey(entry.id, variant),
      id: entry.id,
      // Tittelen er rik tekst; kurvlinjen trenger ren tekst.
      title: String(entry.title ?? '').replace(/<[^>]*>/g, '').trim(),
      price: Number(entry.price) || 0,
      variant: variant || undefined,
      image: chosen?.image || entry.image || undefined,
    }));
    buy.textContent = t('butikk.added');
    buy.classList.add('urd-produkt-lagt');
    setTimeout(() => {
      buy.textContent = t('butikk.addToCart');
      buy.classList.remove('urd-produkt-lagt');
    }, 1400);
  });
  return buy;
}

/**
 * Quick view (kun besøkende): produktdetaljene i en native <dialog> med
 * galleri (hovedbilde + fargebilder), rik tekst og eget variantvalg.
 * Bygges ved første åpning og gjenbrukes.
 */
function openQuickView(card, entry, props) {
  let dialog = card.querySelector('.urd-produkt-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'urd-produkt-dialog';
    const colors = Array.isArray(entry.colors) ? entry.colors.filter((c) => c?.name) : [];
    let size = null;
    let color = null;

    const close = el2('button', 'urd-produkt-lukk');
    close.type = 'button';
    close.innerHTML = iconSvg('cross') ?? '';
    close.setAttribute('aria-label', t('butikk.close'));
    close.addEventListener('click', () => dialog.close());
    dialog.appendChild(close);

    const body = el2('div', 'urd-produkt-dialogkropp');
    const images = [entry.image, ...colors.map((c) => c.image)].filter(Boolean)
      .filter((src, i, all) => all.indexOf(src) === i);
    let mainImg = null;
    if (images.length) {
      const gallery = el2('div', 'urd-produkt-galleri');
      mainImg = document.createElement('img');
      mainImg.src = images[0];
      mainImg.alt = entry.imageAlt ?? '';
      gallery.appendChild(mainImg);
      if (images.length > 1) {
        const thumbs = el2('div', 'urd-produkt-miniatyrer');
        for (const src of images) {
          const thumb = document.createElement('img');
          thumb.src = src;
          thumb.alt = '';
          thumb.addEventListener('click', () => { mainImg.src = src; });
          thumbs.appendChild(thumb);
        }
        gallery.appendChild(thumbs);
      }
      body.appendChild(gallery);
    }

    const info = el2('div', 'urd-produkt-dialoginfo');
    if (entry.badge) info.appendChild(el2('span', 'urd-produkt-badge', entry.badge));
    const title = richNode('strong', 'urd-produkt-tittel', entry, 'title', props.collection, false);
    if (title) info.appendChild(title);
    const text = richNode('div', 'urd-produkt-tekst', entry, 'text', props.collection, false);
    if (text) info.appendChild(text);
    const price = priceRow(entry, props.currency);
    if (price) info.appendChild(price);
    const sizes = Array.isArray(entry.sizes) ? entry.sizes.filter(Boolean) : [];
    if (sizes.length) info.appendChild(choiceRow('urd-produkt-storrelser', sizes, (v) => { size = v; }));
    if (colors.length) {
      info.appendChild(choiceRow('urd-produkt-farger', colors.map((c) => c.name), (name) => {
        color = name;
        const picked = colors.find((c) => c.name === name);
        if (mainImg) mainImg.src = picked?.image || images[0];
      }));
    }
    info.appendChild(buyButton(entry, props.currency, colors, () => ({ size, color })));
    body.appendChild(info);
    dialog.appendChild(body);

    // Lysavvisning: klikk på ::backdrop treffer selve dialog-elementet.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    card.appendChild(dialog);
  }
  dialog.showModal();
}

function renderCard(entry, props, editable) {
  const card = el2('article', 'urd-produkt-kort');
  let chosenSize = null;
  let chosenColor = null;

  // Bildet: samme ikke-destruktive stil som samlingsinnslag. Fargevalg med
  // eget bilde bytter src; uten valg vises innslagets hovedbilde.
  const baseImage = entry.image ?? '';
  let img = null;
  let wrap = null;
  if (baseImage) {
    img = document.createElement('img');
    img.src = baseImage;
    img.loading = 'lazy';
    img.draggable = false;
    wrap = el2('span', 'urd-samling-imgwrap urd-produkt-bilde');
    wrap.appendChild(img);
    applyEntryImageStyle(wrap, entry);
    // Sekundærbilde (første fargebilde): tones inn ved hover (CSS-først,
    // ADR-0011); viker når et fargevalg med eget bilde er aktivt.
    const alt = altCardImage(entry);
    if (alt) {
      const altImg = document.createElement('img');
      altImg.src = alt;
      altImg.alt = '';
      altImg.loading = 'lazy';
      altImg.draggable = false;
      altImg.className = 'urd-produkt-bilde-alt';
      wrap.appendChild(altImg);
    }
    card.appendChild(wrap);
  }
  if (entry.badge) {
    card.appendChild(el2('span', `urd-produkt-badge${img ? ' urd-produkt-badge-over' : ''}`, entry.badge));
  }

  const title = richNode('strong', 'urd-produkt-tittel', entry, 'title', props.collection, editable);
  if (title) card.appendChild(title);
  const text = richNode('div', 'urd-produkt-tekst', entry, 'text', props.collection, editable);
  if (text) card.appendChild(text);
  const price = priceRow(entry, props.currency);
  if (price) card.appendChild(price);

  const sizes = Array.isArray(entry.sizes) ? entry.sizes.filter(Boolean) : [];
  if (sizes.length) card.appendChild(choiceRow('urd-produkt-storrelser', sizes, (v) => { chosenSize = v; }));

  const colors = Array.isArray(entry.colors) ? entry.colors.filter((c) => c?.name) : [];
  if (colors.length) {
    card.appendChild(choiceRow('urd-produkt-farger', colors.map((c) => c.name), (name) => {
      chosenColor = name;
      const picked = colors.find((c) => c.name === name);
      if (img) img.src = picked?.image || baseImage;
      wrap?.classList.toggle('urd-produkt-farge-valgt', Boolean(picked?.image));
    }));
  }

  card.appendChild(buyButton(entry, props.currency, colors, () => ({ size: chosenSize, color: chosenColor })));

  // Quick view hos besøkende: bilde og tittel åpner detaljvisningen.
  // I editoren eier klikk redigeringen (klikk-og-skriv), så ingen kobling der.
  if (!editable) {
    for (const target of [wrap, title].filter(Boolean)) {
      target.classList.add('urd-produkt-apner');
      target.setAttribute('role', 'button');
      target.setAttribute('aria-label', t('butikk.quickView'));
      target.tabIndex = 0;
      const open = () => openQuickView(card, entry, props);
      target.addEventListener('click', open);
      target.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
    }
  }
  return card;
}

/** «+ Produkt»-adderen (kun editor): ber editoren legge et nytt produkt i samlingen. */
function adderCard(collection) {
  const btn = el2('button', 'urd-produkt-adder', ta('canvas.addProduct'));
  btn.type = 'button';
  btn.addEventListener('click', () => {
    post({ type: 'urd-collection-add', collection });
  });
  return btn;
}

function emptyState(el, ctx, message, action) {
  if (!ctx.preview) return;
  const box = el2('div', 'urd-samling-empty', message);
  if (action) box.appendChild(action);
  el.appendChild(box);
}

export const produktBlock = {
  version: 1,
  autoGrow: true,
  // Samlingskonsument: urd-collections-meldingen rerendrer kun seksjoner med
  // blokker som bærer dette flagget (scrollposisjonen bevares).
  usesCollections: true,
  label: 'Produktkort',
  labelKey: 'blocks.produkt',
  defaults: () => ({ collection: null, limit: 0, columns: 0, currency: 'kr' }),
  migrations: {},
  /**
   * @param {HTMLElement} el
   * @param {{collection: string|null, limit?: number, columns?: number, currency?: string}} props
   * @param {object} ctx Render-kontekst
   */
  render(el, props, ctx) {
    const host = el2('div', 'urd-produkt');
    el.appendChild(host);
    const editable = Boolean(ctx.preview) && ctx.viewport !== 'mobile';

    if (!props.collection) {
      adminLocaleReady.then(() => {
        if (host.isConnected) emptyState(el, ctx, ta('canvas.produktEmpty'));
      });
      return;
    }

    getCollection(props.collection).then((data) => {
      // Blokken kan være rerendret/fjernet mens dataene ble hentet.
      if (!host.isConnected) return;

      // Autovekst: kortene er dynamisk innhold, rammen følger dem (som samling).
      // Kalles på nytt når adder-kortet legges til, så også dets rad måles.
      const fit = () => {
        const needed = host.scrollHeight;
        if (Math.abs(needed - el.clientHeight) > 8 && ctx.viewport !== 'mobile') {
          el.style.height = `${needed}px`;
          const sectionEl = el.closest('.urd-section');
          if (sectionEl) growSectionTo(sectionEl, el.offsetTop + needed + 24);
          if (ctx.preview) {
            const block = ctx.section?.blocks?.find((b) => b.id === el.dataset.blockId);
            if (block && block.frames.desktop.h !== needed) {
              block.frames.desktop = { ...block.frames.desktop, h: needed };
              // KUN høyden meldes (urd-grow), aldri hele framen.
              post({ type: 'urd-grow', sectionId: ctx.section.id, blockId: el.dataset.blockId, h: needed });
            }
          }
        }
      };

      const all = Array.isArray(data?.entries) ? data.entries : [];
      let entries = all;
      if (props.limit > 0) entries = entries.slice(0, props.limit);
      if (!entries.length) {
        adminLocaleReady.then(() => {
          if (!host.isConnected) return;
          emptyState(el, ctx, ta('canvas.produktNoEntries', { name: data?.name ?? props.collection }),
            editable ? adderCard(props.collection) : null);
        });
        return;
      }
      const grid = el2('div', 'urd-produkt-kortliste');
      const columns = Math.min(6, Math.max(0, Number(props.columns) || 0));
      if (columns) grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      for (const entry of entries) grid.appendChild(renderCard(entry, props, editable));
      host.appendChild(grid);
      fit();

      if (editable) {
        Promise.all([import('../hint.js'), adminLocaleReady]).then(([{ attachHint }]) => {
          if (!el.isConnected) return;
          // Adderen kun når rutenettet ikke er avkortet av limit: et nytt
          // innslag ville ellers vært utenfor visningen og klikket sett dødt ut.
          if (!(props.limit > 0 && all.length >= props.limit)) {
            grid.appendChild(adderCard(props.collection));
            fit();
          }
          // Hjelpechipen (ADR-0008): katalogen bor i Samlinger-panelet.
          if (el.querySelector('.urd-hint-chip')) return;
          attachHint(el, {
            title: ta('hintProdukt.title'),
            lines: [ta('hintProdukt.l1'), ta('hintProdukt.l2'), ta('hintProdukt.l3'), ta('hintProdukt.l4')],
          });
        });
      }
    });
  },
};
