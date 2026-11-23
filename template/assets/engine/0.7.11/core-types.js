/**
 * The engine's own block and background types, each with the module that defines it (ADR-0036): a page loads the modules of the types it uses.
 * Notes: docs/engine-notes/core-types.md (Urd repository).
 */

/**
 * A type's module asked for in one wave with the modules it imports that the boot does not load, so no module waits for its importer to arrive.
 * @param {Promise<object>} main
 * @param {...Promise<object>} parts
 * @returns {Promise<object>}
 */
const beside = (main, ...parts) => {
  for (const part of parts) part.catch(() => {});
  return main;
};

/** The core block types and the modules that define them. */
export const CORE_BLOCKS = {
  text: () => beside(import('./blocks/text.js'), import('./box-style.js'), import('./sanitize.js')).then((m) => m.textBlock),
  terms: () => beside(import('./blocks/text.js'), import('./box-style.js'), import('./sanitize.js')).then((m) => m.termsBlock),
  image: () => beside(import('./blocks/image.js'), import('./picture.js')).then((m) => m.imageBlock),
  button: () => import('./blocks/button.js').then((m) => m.buttonBlock),
  shape: () => import('./blocks/shape.js').then((m) => m.shapeBlock),
  spacer: () => import('./blocks/spacer.js').then((m) => m.spacerBlock),
  video: () => beside(import('./blocks/video.js'), import('./backgrounds/image.js'), import('./backgrounds/video.js'), import('./embed-cover.js'), import('./picture.js')).then((m) => m.videoBlock),
  icon: () => import('./blocks/icon.js').then((m) => m.iconBlock),
  collection: () => beside(import('./blocks/collection.js'), import('./picture.js'), import('./sanitize.js')).then((m) => m.collectionBlock),
  gallery: () => beside(import('./blocks/gallery.js'), import('./blocks/image.js'), import('./blocks/ribbon.js'), import('./gallery-layout.js'), import('./gallery-model.js'), import('./picture.js'), import('./ribbon-model.js')).then((m) => m.galleryBlock),
  faq: () => beside(import('./blocks/faq.js'), import('./box-style.js'), import('./sanitize.js')).then((m) => m.faqBlock),
  timeline: () => import('./blocks/timeline.js').then((m) => m.timelineBlock),
  quote: () => beside(import('./blocks/quote.js'), import('./blocks/timeline.js'), import('./picture.js')).then((m) => m.quoteBlock),
  stats: () => import('./blocks/stats.js').then((m) => m.statsBlock),
  table: () => import('./blocks/table.js').then((m) => m.tableBlock),
  share: () => import('./blocks/share.js').then((m) => m.shareBlock),
  contact: () => beside(import('./blocks/contact.js'), import('./blocks/map.js'), import('./embed-cover.js'), import('./osm.js'), import('./picture.js')).then((m) => m.contactBlock),
  privacy: () => beside(import('./blocks/privacy.js'), import('./embed-cover.js'), import('./osm.js'), import('./picture.js'), import('./privacy-model.js')).then((m) => m.privacyBlock),
  countdown: () => import('./blocks/countdown.js').then((m) => m.countdownBlock),
  audio: () => import('./blocks/audio.js').then((m) => m.audioBlock),
  product: () => beside(import('./blocks/product.js'), import('./blocks/collection.js'), import('./picture.js'), import('./sanitize.js')).then((m) => m.productBlock),
  cart: () => import('./blocks/cart.js').then((m) => m.cartBlock),
  checkout: () => import('./blocks/checkout.js').then((m) => m.checkoutBlock),
  map: () => beside(import('./blocks/map.js'), import('./embed-cover.js'), import('./osm.js'), import('./picture.js')).then((m) => m.mapBlock),
  form: () => beside(import('./blocks/form.js'), import('./form-model.js')).then((m) => m.formBlock),
  calendar: () => beside(import('./blocks/calendar.js'), import('./blocks/calendar-load.js'), import('./sanitize.js')).then((m) => m.calendarBlock),
  ribbon: () => beside(import('./blocks/ribbon.js'), import('./ribbon-model.js')).then((m) => m.ribbonBlock),
};

/** The core background layer types and the modules that define them. */
export const CORE_BACKGROUNDS = {
  color: () => import('./backgrounds/color.js').then((m) => m.colorLayer),
  gradient: () => import('./backgrounds/gradient.js').then((m) => m.gradientLayer),
  glow: () => import('./backgrounds/glow.js').then((m) => m.glowLayer),
  grain: () => import('./backgrounds/grain.js').then((m) => m.grainLayer),
  pattern: () => import('./backgrounds/pattern.js').then((m) => m.patternLayer),
  image: () => beside(import('./backgrounds/image.js'), import('./picture.js')).then((m) => m.imageLayer),
  slideshow: () => beside(import('./backgrounds/slideshow.js'), import('./backgrounds/image.js'), import('./gallery-layout.js'), import('./gallery-model.js'), import('./photo-source.js'), import('./picture.js'), import('./ribbon-model.js')).then((m) => m.slideshowLayer),
  video: () => beside(import('./backgrounds/video.js'), import('./backgrounds/image.js'), import('./picture.js')).then((m) => m.videoLayer),
};

/**
 * The core block types readied before a page is drawn (prepareBlocks): each loads what readies a block of it, the calendar's with its parts in one wave.
 */
export const CORE_BLOCK_READY = {
  calendar: () => {
    for (const part of [import('./ics.js'), import('./calendar-designs.js'), import('./calendar-format.js'), import('./map-links.js'), import('./meeting-links.js')]) part.catch(() => {});
    return import('./blocks/calendar-load.js').then((m) => m.prepareCalendar);
  },
};
/** The old plugin contract ids of the core blocks calendar, map and form (ADR-0021): a page holding one loads the type it stands for. */
export const BLOCK_ALIASES = { kalender: 'calendar', kart: 'map', skjema: 'form' };

const TABLES = { blocks: CORE_BLOCKS, backgrounds: CORE_BACKGROUNDS };

/** The definer each registry handed back when its core ids were reserved (reserveCoreTypes), by registry. */
const DEFINERS = new WeakMap();

/**
 * Loads and defines the core types a page uses, an old id's type included, or every core type with `all`; a type already defined is left as it is.
 * @param {typeof window.Urd} Urd
 * @param {{blocks: Set<string>, backgrounds: Set<string>}|null} types
 * @param {{all?: boolean}} [options]
 * @returns {Promise<void>}
 */
export async function loadCoreTypes(Urd, types, { all = false } = {}) {
  const jobs = [];
  for (const [kind, table] of Object.entries(TABLES)) {
    const asked = all ? Object.keys(table) : [...(types?.[kind] ?? [])].map((type) => (kind === 'blocks' && !table[type] ? BLOCK_ALIASES[type] : type));
    for (const type of new Set(asked)) {
      if (!type || !Object.hasOwn(table, type) || Urd[kind].ids().includes(type)) continue;
      jobs.push(table[type]().then((def) => [kind, type, def], (err) => {
        console.warn(`Urd: the ${kind} type '${type}' could not be loaded`, err);
        return null;
      }));
    }
  }
  // A module that fails leaves its type undefined, so its blocks are drawn as an unknown type and the rest of the page as usual.
  for (const job of await Promise.all(jobs)) {
    if (!job) continue;
    const [kind, type, def] = job;
    if (def && !Urd[kind].ids().includes(type)) (DEFINERS.get(Urd[kind]) ?? Urd[kind].define)(type, def);
  }
}

/**
 * The blocks a page and its footer hold, wherever they stand, found as pageTypes in plugins.js finds their types.
 * @param {...unknown} parts The page, the site's footer
 * @returns {Array<{type: string, props?: object}>}
 */
export function pageBlocks(...parts) {
  const found = [];
  const seen = new Set();
  const walk = (value, depth) => {
    if (!value || typeof value !== 'object' || depth > 40 || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) { for (const item of value) walk(item, depth + 1); return; }
    for (const [key, child] of Object.entries(value)) {
      if (key === 'blocks' && Array.isArray(child)) for (const block of child) if (typeof block?.type === 'string') found.push(block);
      walk(child, depth + 1);
    }
  };
  for (const part of parts) walk(part, 0);
  return found;
}

/** How long a page waits for its blocks' readying at most: as long as a calendar's loading bars wait before they show (base.css). */
export const READY_WAIT_MS = 500;

/**
 * Readies what the engine's own blocks on a page draw with beyond their module, before the page is drawn; settles once all are readied or after `wait`.
 * @param {Array<{type: string, props?: object, hideDesktop?: boolean, hideMobile?: boolean}>} blocks pageBlocks
 * @param {{site: object, preview: boolean, viewport: 'desktop'|'mobile'}} ctx
 * @param {number} [wait]
 * @returns {Promise<void>}
 */
export async function prepareBlocks(blocks, ctx, wait = READY_WAIT_MS) {
  const readying = Promise.all(blocks.map((block) => {
    if (!Object.hasOwn(CORE_BLOCK_READY, block.type)) return null;
    if (!ctx.preview && (ctx.viewport === 'mobile' ? block.hideMobile : block.hideDesktop)) return null;
    return CORE_BLOCK_READY[block.type]().then((ready) => ready(block.props ?? {}, ctx)).catch(() => {});
  }));
  await Promise.race([readying, new Promise((resolve) => setTimeout(resolve, wait))]);
}

/**
 * Reserves every core block and background id as the engine's own, so no plugin can take one; the engine defines them through the definers handed back.
 * @param {typeof window.Urd} Urd
 */
export function reserveCoreTypes(Urd) {
  for (const [kind, table] of Object.entries(TABLES)) DEFINERS.set(Urd[kind], Urd[kind].reserve(Object.keys(table)));
}
