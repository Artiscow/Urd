/**
 * The block catalogue: every block type's seed and name, building and placing a new block, and the calendar designs as blocks.
 */
import { ta } from '$engine/i18n.js';
import { defaultFormFields } from '$engine/blocks/form.js';
import { makeId, termsHtml } from '$engine/sections/presets.js';
import { termsSeed } from '../lib/site-seed.js';
import { calDesign } from '$engine/calendar-designs.js';
import { frameAtPoint } from '$engine/place.js';
import { fitsWhenAdded, fittedFrame } from '$engine/add-fit.js';
import { phoneAdded } from '$engine/phone-moves.js';
import { claimAnchors } from '$engine/anchor-model.js';
import { historyState } from './history.svelte.js';
import { mediaState } from './media.svelte.js';
import { pageState } from './page.svelte.js';
import { previewState } from './preview.svelte.js';
import { shellState } from './shell.svelte.js';
import { siteState } from './site.svelte.js';
import { collectionsState } from './collections.svelte.js';
import { shopOn } from '$engine/block-palette.js';

/** Names of the block types in the panel. */
const BLOCK_LABELS = $derived({ text: ta('blocks.text'), button: ta('blocks.button'), image: ta('blocks.image'), shape: ta('blocks.shape'), spacer: ta('blocks.spacer'), video: ta('blocks.video'), icon: ta('blocks.icon'), gallery: ta('blocks.gallery'), faq: ta('blocks.faq'), collection: ta('blocks.collection'), timeline: ta('blocks.timeline'), quote: ta('blocks.quote'), stats: ta('blocks.stats'), ribbon: ta('blocks.ribbon'), table: ta('blocks.table'), share: ta('blocks.share'), contact: ta('blocks.contact'), countdown: ta('blocks.countdown'), audio: ta('blocks.audio'), product: ta('blocks.product'), cart: ta('blocks.cart'), checkout: ta('blocks.checkout'), map: ta('blocks.map'), form: ta('blocks.form'), calendar: ta('blocks.calendar'), privacy: ta('blocks.privacy'), terms: ta('blocks.terms') });

/** The block palette's new blocks: w in per cent of the section, h in px; a wide block's 88.89 % is 80 of the content's 90 grid cells, centred. */
const BLOCK_DEFAULTS = $derived({
  text: { type: 'text', props: { html: ta('seed.text'), align: 'left' }, w: 33, h: 28 },
  'text-box': { type: 'text', props: { html: ta('seed.textBox'), align: 'left', box: true }, w: 30, h: 150 },
  button: { type: 'button', props: { label: ta('seed.newButton'), page: null, href: null, style: 'primary' }, w: 20, h: 36 },
  'shape-line': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'line', color: 'accent', thickness: 2, fill: null }, w: 25, h: 8 },
  'shape-arrow': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'arrow', color: 'accent', thickness: 2, fill: null }, w: 25, h: 16 },
  'shape-circle': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'circle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
  'shape-rect': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'rect', color: 'accent', thickness: 2, fill: null }, w: 20, h: 110 },
  'shape-triangle': { type: 'shape', decor: true, hideMobile: true, props: { kind: 'triangle', color: 'accent', thickness: 2, fill: null }, w: 10, h: 110 },
  spacer: { type: 'spacer', props: {}, w: 88.89, h: 48 },
  image: { type: 'image', props: { src: '', alt: '', fit: 'cover', radius: 'md', href: null }, w: 30, h: 220 },
  video: { type: 'video', props: { url: '', title: 'Video' }, w: 45, h: 300 },
  map: { type: 'map', props: { location: '', zoom: 15 }, w: 60, h: 360 },
  form: {
    type: 'form',
    props: {
      recipient: '', subject: '', mode: 'mailto', endpoint: '',
      submitLabel: ta('form.sendDefault'), successText: ta('form.thanksDefault'),
      fields: defaultFormFields(),
    },
    w: 50, h: 380,
  },
  calendar: { type: 'calendar', props: { sources: [], view: 'list', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }, w: 60, h: 320 },
  'calendar-cards': { type: 'calendar', props: { sources: [], view: 'cards', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }, w: 88, h: 320 },
  'calendar-month': { type: 'calendar', props: { sources: [], view: 'month', limit: 6, showCategories: false, showSubscribe: false, showSignup: false }, w: 88, h: 480 },
  'calendar-next': { type: 'calendar', props: { sources: [], view: 'next', limit: 6, nextCount: 3, laterCount: 3, showCategories: false, showSubscribe: false, showSignup: false }, w: 40, h: 180 },
  'calendar-agenda': { type: 'calendar', props: { sources: [], view: 'agenda', limit: 8, showCategories: false, showSubscribe: false, showSignup: false }, w: 60, h: 360 },
  icon: { type: 'icon', decor: true, hideMobile: true, props: { glyph: '★', color: 'accent', size: 48 }, w: 8, h: 64 },
  collection: { type: 'collection', props: { collection: null, view: 'cards', limit: 6, newestFirst: true }, w: 88.89, h: 200 },
  gallery: { type: 'gallery', props: { images: [], view: 'grid', columns: 3, gap: 12, radius: 'md', lightbox: true, interval: 5, width: 'canvas' }, w: 88.89, h: 320 },
  faq: {
    type: 'faq',
    props: {
      items: [
        { q: ta('seed.faq.q1'), a: ta('seed.faq.answer') },
        { q: ta('seed.faq.q2'), a: ta('seed.faq.answer') },
        { q: ta('seed.faq.q3'), a: ta('seed.faq.answer') },
      ],
      multi: false,
    },
    w: 50, h: 220,
  },
  timeline: {
    type: 'timeline',
    props: {
      items: [
        { year: '2019', title: ta('seed.timeline.t1'), text: ta('seed.timeline.text') },
        { year: '2022', title: ta('seed.timeline.t2'), text: ta('seed.timeline.text') },
        { year: '2026', title: ta('seed.timeline.t3'), text: ta('seed.timeline.text') },
      ],
      variant: 'left',
      marker: 'filled',
      accent: null,
    },
    w: 42, h: 260,
  },
  quote: {
    type: 'quote',
    props: { text: ta('seed.quoteBlock.text'), attribution: ta('seed.quoteBlock.name'), role: ta('seed.quoteBlock.role'), variant: 'large', image: '', accent: null },
    w: 44, h: 180,
  },
  stats: {
    type: 'stats',
    props: { value: '4800', prefix: '', suffix: '+', label: ta('seed.statsBlock.label'), countUp: true },
    w: 20, h: 90,
  },
  ribbon: {
    type: 'ribbon',
    props: {
      items: [ta('seed.ribbonBlock.a'), ta('seed.ribbonBlock.b'), ta('seed.ribbonBlock.c')],
      sep: 'dot', speed: 60, direction: 'left', pauseOnHover: true, width: 'canvas',
      variant: 'band', size: 'md', caps: false, tilt: 0, fade: true, gap: 40,
    },
    w: 88.89, h: 70,
  },
  table: {
    type: 'table',
    props: {
      header: true,
      striped: false,
      lines: 'rows',
      rows: [
        [ta('seed.table.h1'), ta('seed.table.h2'), ta('seed.table.h3')],
        [ta('seed.table.r1c1'), ta('seed.table.r1c2'), ''],
        [ta('seed.table.r2c1'), ta('seed.table.r2c2'), ''],
      ],
    },
    w: 50, h: 160,
  },
  contact: {
    type: 'contact',
    props: { parts: ['name', 'address', 'phone', 'email'], design: 'lines' },
    w: 30, h: 130,
  },
  privacy: {
    type: 'privacy',
    props: {},
    w: 60, h: 600,
  },
  // The terms of sale (blocks/text.js termsBlock): written in the site's language with the site's facts before it is placed (seedTerms).
  terms: {
    type: 'terms',
    props: { html: '', align: 'left', design: 'long' },
    w: 60, h: 700,
  },
  // The links block (type id `share`, blocks/share.js version 2): the site's links, with no own list.
  share: {
    type: 'share',
    version: 2,
    props: { useSite: true, hidden: [], links: [], variant: 'icons', size: 38, color: '' },
    w: 34, h: 48,
  },
  countdown: {
    type: 'countdown',
    // The target is seeded 30 days ahead (at 18:00), so the block counts from the start.
    props: {
      target: (() => {
        const d = new Date(Date.now() + 30 * 86400 * 1000);
        const p = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T18:00`;
      })(),
      doneText: ta('seed.countdown.done'),
      variant: 'boxes',
      showSeconds: true,
    },
    w: 40, h: 110,
  },
  audio: { type: 'audio', props: { src: '', title: '', loop: false }, w: 34, h: 80 },
  product: { type: 'product', props: { collection: null, limit: 0, columns: 0, currency: 'kr' }, w: 88.89, h: 300 },
  cart: { type: 'cart', props: { variant: 'button', href: '', currency: 'kr' }, w: 16, h: 48 },
  // The checkout block (blocks/checkout.js version 2): the payment settings as one object (ADR-0028).
  checkout: { type: 'checkout', version: 2, props: { recipient: '', endpoint: '', currency: 'kr', seller: true, payments: { vipps: false, card: 'none', paypal: false, capture: 'ship', manual: [] } }, w: 44, h: 430 },
});

/** Whether the shop's blocks stand in the block lists (block-palette.js shopOn): the site's own choice, else a product catalogue among the collections. */
function shopBlocksOn() {
  const hasProducts = collectionsState.collectionIds.some((id) => collectionsState.collectionStores[id]?.data?.kind === 'products');
  return shopOn(siteState.siteDraft?.site, hasProducts);
}

/** Whether every new block of a type starts with a block-level flag on (`decor`, `hideMobile`), as the shapes and the icon do. */
function blockStarts(type, flag) {
  const seeds = Object.values(BLOCK_DEFAULTS).filter((d) => d.type === type);
  return seeds.length > 0 && seeds.every((d) => d[flag] === true);
}

/** The value a prop starts with on every new block of a type (BLOCK_DEFAULTS), or undefined where the type has no seed or its seeds differ. */
function propStarts(type, key) {
  const seeds = Object.values(BLOCK_DEFAULTS).filter((d) => d.type === type);
  if (!seeds.length) return undefined;
  const first = JSON.stringify(seeds[0].props?.[key]);
  return seeds.every((d) => JSON.stringify(d.props?.[key]) === first) ? seeds[0].props?.[key] : undefined;
}

function buildBlock(kind) {
  const d = BLOCK_DEFAULTS[kind];
  if (!d) return null;
  return {
    id: makeId('blk'),
    type: d.type,
    version: d.version ?? 1,
    // A shape starts as decor, outside the entrance wave, and hidden on phones; both can be turned off per block.
    decor: Boolean(d.decor),
    hideMobile: Boolean(d.hideMobile),
    props: structuredClone(d.props),
    animation: null,
    frames: { desktop: { x: 4, y: 8, w: d.w, h: d.h, z: 1, rot: 0 }, mobile: null },
  };
}

/** The terms of sale's words, in the site's language with the site's facts (lib/site-seed.js), as the page template «Terms of sale» writes them. */
async function seedTerms(block) {
  if (block?.type === 'terms') block.props.html = termsHtml(await termsSeed(siteState.siteDraft));
  return block;
}

/** The preview places the block in the middle of the viewport and answers with urd-add-block, which insertBlock takes. */
async function requestPlacement(block) {
  if (!block) return;
  await seedTerms(block);
  if (previewState.bridge) {
    previewState.bridge.sendPlaceBlock(block);
  } else {
    insertBlock(pageState.targetSection()?.id, block, { fit: true });
  }
}

/**
 * The phone's place a message adding blocks carries (`phone`): from the phone view, the drop where the first lands (phoneAdded); null from the desktop view.
 * @param {{phone?: {drop?: object|null}}} msg
 * @returns {{drop: object|null}|null}
 */
function phoneOf(msg) {
  const phone = msg?.phone;
  if (!phone || typeof phone !== 'object') return null;
  return { drop: phone.drop && typeof phone.drop === 'object' && typeof phone.drop.pos === 'string' ? phone.drop : null };
}

/** Blocks added in the phone view written into their section (phoneAdded): on phones only, in the phone's order where asked for, the desktop as it was. */
function addOnPhone(section, blocks, phone) {
  const next = phoneAdded(section, blocks, phone.drop);
  section.blocks = next.blocks;
  for (const key of ['phoneStacks', 'phoneList', 'phoneLoose']) {
    if (next[key] === undefined) delete section[key];
    else section[key] = next[key];
  }
}

/** The new blocks waiting for their box fitted to what they draw (add-fit.js), by id: the frame they were added at, and the undo step that added them. */
const pendingFits = new Map();

/**
 * A block put in a section as one step: a new block (`fit`) gets its box fitted to what it draws (handleNewFitted); one added in the phone view stands there only.
 * @param {string} sectionId
 * @param {object} block
 * @param {{fit?: boolean, phone?: {drop: object|null}|null}} [options]
 */
function insertBlock(sectionId, block, { fit = false, phone = null } = {}) {
  const section = pageState.store.data.sections.find((s) => s.id === sectionId) ?? pageState.store.data.sections[0];
  if (!section) return;
  historyState.pushHistory('add-block');
  // New and duplicated blocks go to the top of the stacking order.
  const topZ = Math.max(0, ...section.blocks.map((b) => b.frames?.desktop?.z ?? 1)) + 1;
  if (block.frames?.desktop) block.frames.desktop = { ...block.frames.desktop, z: topZ };
  // A name the page already uses arrives as name-2 (a template's block).
  claimAnchors([block], pageState.store.data);
  if (phone) {
    const id = block.id;
    addOnPhone(section, [block], phone);
    block = section.blocks.find((b) => b.id === id) ?? block;
  } else section.blocks.push(block);
  pageState.markPinnedBehind(section);
  pageState.store.save();
  historyState.updateDirty();
  // A new block's fit is asked for before its section is sent, so the preview draws it hidden and shows it fitted.
  const fits = fit && !phone && fitsWhenAdded(block) && previewState.viewMode === 'desktop' && Boolean(block.frames?.desktop);
  if (fits) {
    pendingFits.set(block.id, { w: block.frames.desktop.w, h: block.frames.desktop.h, step: historyState.history.at(-1) });
    previewState.bridge?.sendFitNew(section.id, block.id, block.frames.desktop.w);
  }
  previewState.bridge?.sendSection(pageState.pageId, section);
  // A block that follows its content (ADR-0025) gets its frame fitted to what it shows; one fitted as it is added gets it in handleNewFitted.
  if (!fits) pageState.fitBlockSoon(section.id, block);
}

/**
 * A new block's fitted box from the preview (urd-new-fitted), written into the step that added it while that step is last and the block stands as added.
 */
function handleNewFitted(msg) {
  const pending = pendingFits.get(msg.blockId);
  const section = pageState.store.data.sections.find((s) => s.id === msg.sectionId);
  const block = section?.blocks.find((b) => b.id === msg.blockId);
  const frame = block?.frames?.desktop;
  pendingFits.delete(msg.blockId);
  if (!block || !frame) return;
  const sized = Number.isFinite(msg.w) && Number.isFinite(msg.h);
  if (sized && pending && historyState.lastHistoryKey === 'add-block' && historyState.history.at(-1) === pending.step && frame.w === pending.w && frame.h === pending.h) {
    block.frames.desktop = fittedFrame(frame, msg.w, msg.h);
    pageState.store.save();
    historyState.updateDirty();
    if (pageState.selectedBlock?.blockId === block.id) pageState.syncSelectedBlock();
    // Nothing is drawn again: the preview already shows the block at this frame.
  } else if (sized) {
    // A fit the draft does not take: the section is drawn again from the draft.
    previewState.bridge?.sendSection(pageState.pageId, section);
  }
  // The height of a block that follows its content is fitted at the width it now stands at.
  pageState.fitBlockSoon(section.id, block);
}

/** A preset item's blocks added to a section in one undo step, `moves` shifting blocks already there, and a min height in px grown to `minBottom`. */
function insertBlocks(sectionId, blocks, minBottom, moves, phone = null) {
  const section = pageState.store.data.sections.find((s) => s.id === sectionId);
  if (!section || !blocks?.length) return;
  historyState.pushHistory('add-blocks');
  // Added in the phone view, the blocks stand on the phone only and the desktop is left as it is.
  if (phone) {
    claimAnchors(blocks, pageState.store.data);
    addOnPhone(section, blocks, phone);
    pageState.store.save();
    historyState.updateDirty();
    previewState.bridge?.sendSection(pageState.pageId, section);
    return;
  }
  for (const move of moves ?? []) {
    const block = section.blocks.find((b) => b.id === move.blockId);
    if (block && typeof move.dy === 'number') {
      block.frames.desktop = { ...block.frames.desktop, y: block.frames.desktop.y + move.dy };
    }
  }
  // Names the page already uses arrive as name-2 (a block group template).
  claimAnchors(blocks, pageState.store.data);
  section.blocks.push(...blocks);
  const current = String(section.size?.minHeight ?? '');
  if (minBottom && current.endsWith('px') && Number.parseFloat(current) < minBottom) {
    section.size = { ...section.size, minHeight: `${minBottom}px` };
  }
  pageState.markPinnedBehind(section);
  pageState.store.save();
  historyState.updateDirty();
  previewState.bridge?.sendSection(pageState.pageId, section);
}

/** The size a new calendar starts at, by the view its design shows; the frame is fitted to the design once it is placed. */
const CAL_KIND_BY_VIEW = { list: 'calendar', cards: 'calendar-cards', month: 'calendar-month', next: 'calendar-next', agenda: 'calendar-agenda', week: 'calendar-month', day: 'calendar', year: 'calendar-month' };

/** A new calendar in one of the designs: placed in the view, or in the section and at the point the canvas menu was opened from (`place`). */
function addCalendarDesign(id, place = null) {
  const design = calDesign(id);
  const block = buildBlock(CAL_KIND_BY_VIEW[design.view] ?? 'calendar');
  if (!block) return;
  block.props = {
    ...block.props,
    ...(design.view ? { view: design.view } : {}),
    ...(design.id === 'plain' ? {} : { design: design.id }),
    ...(design.view === 'next' ? { nextCount: 3, laterCount: 3 } : {}),
    ...(design.limit ? { limit: design.limit } : {}),
  };
  if (place?.sectionId) placeInSection(block, place.sectionId, place.at, place.phone ?? null);
  else requestPlacement(block);
}

/**
 * A block put in a section and selected: centred on a click point (`at`, frameAtPoint) or centred across; added in the phone view, it stands on the phone only.
 */
function placeInSection(block, sectionId, at, phone = null) {
  if (!phone && at && typeof at.x === 'number' && typeof at.y === 'number') {
    const section = pageState.store.data.sections.find((s) => s.id === sectionId);
    const grid = section?.grid ?? siteState.siteDraft.grid;
    const pos = frameAtPoint({ x: at.x, y: at.y, w: block.frames.desktop.w, h: block.frames.desktop.h, grid });
    block.frames.desktop.x = pos.x;
    block.frames.desktop.y = pos.y;
  } else {
    block.frames.desktop.x = Math.round(((100 - block.frames.desktop.w) / 2) * 100) / 100;
    block.frames.desktop.y = 40;
  }
  insertBlock(sectionId, block, { fit: true, phone });
  previewState.bridge?.sendSelect(block.id);
}

/**
 * «+ New block» in a section: the block built with the pictures picked in the preview, and placed unless its section has left the page meanwhile.
 */
async function handleRequestBlock(msg) {
  const block = buildBlock(msg.kind);
  if (!block) return;
  const files = Array.isArray(msg.files) ? msg.files.filter((f) => f instanceof Blob) : [];
  const stillThere = () => pageState.store.data.sections.some((s) => s.id === msg.sectionId);
  let report = null;
  if (files.length && msg.kind === 'image') {
    const img = await mediaState.imageForBlock(files[0]);
    if (!img) return;
    block.props = { ...block.props, src: img.src, alt: img.alt };
    block.frames.desktop.h = Math.max(40, Math.round((img.height / img.width) * (block.frames.desktop.w / 100) * (previewState.iframeEl?.clientWidth ?? 1280)));
    report = () => shellState.setStatus('');
  } else if (files.length && msg.kind === 'gallery') {
    shellState.setStatus(ta('status.compressingImages'));
    const { images, failed, unsafe } = await mediaState.compressMany(files, 'gallery');
    if (!images.length) {
      mediaState.reportUpload(0, failed, unsafe);
      return;
    }
    block.props = { ...block.props, images };
    report = () => mediaState.reportUpload(images.length, failed, unsafe);
  }
  await seedTerms(block);
  if (!stillThere()) {
    shellState.setStatus(ta('status.blockNotPlaced'), 'error');
    return;
  }
  placeInSection(block, msg.sectionId, msg.at, phoneOf(msg));
  report?.();
  if (!files.length && msg.kind === 'image') shellState.setStatus(ta('status.imageBlockAdded'));
  if (!files.length && msg.kind === 'gallery') shellState.setStatus(ta('status.galleryBlockAdded'));
}

/** What the other parts read and write through, and the effects the shell runs once. */
export const blocksState = {
  get BLOCK_LABELS() { return BLOCK_LABELS; },
  shopBlocksOn,
  get BLOCK_DEFAULTS() { return BLOCK_DEFAULTS; },
  blockStarts,
  propStarts,
  buildBlock,
  requestPlacement,
  insertBlock,
  insertBlocks,
  CAL_KIND_BY_VIEW,
  addCalendarDesign,
  phoneOf,
  handleRequestBlock,
  handleNewFitted,
};
