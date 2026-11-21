/**
 * The engine's own block and background types, each with the module that defines it (ADR-0036): a visitor's page loads the modules of the types it, its nav and its footer use, and the editor's preview loads them all.
 * The loaders name their modules literally, so the modules stay out of the boot's static closure and the shells' preload list, and are fetched from the versioned engine folder as they are asked for (ADR-0013).
 */

/** The core block types and the modules that define them. */
export const CORE_BLOCKS = {
  text: () => import('./blocks/text.js').then((m) => m.textBlock),
  terms: () => import('./blocks/text.js').then((m) => m.termsBlock),
  image: () => import('./blocks/image.js').then((m) => m.imageBlock),
  button: () => import('./blocks/button.js').then((m) => m.buttonBlock),
  shape: () => import('./blocks/shape.js').then((m) => m.shapeBlock),
  spacer: () => import('./blocks/spacer.js').then((m) => m.spacerBlock),
  video: () => import('./blocks/video.js').then((m) => m.videoBlock),
  icon: () => import('./blocks/icon.js').then((m) => m.iconBlock),
  collection: () => import('./blocks/collection.js').then((m) => m.collectionBlock),
  gallery: () => import('./blocks/gallery.js').then((m) => m.galleryBlock),
  faq: () => import('./blocks/faq.js').then((m) => m.faqBlock),
  timeline: () => import('./blocks/timeline.js').then((m) => m.timelineBlock),
  quote: () => import('./blocks/quote.js').then((m) => m.quoteBlock),
  stats: () => import('./blocks/stats.js').then((m) => m.statsBlock),
  table: () => import('./blocks/table.js').then((m) => m.tableBlock),
  share: () => import('./blocks/share.js').then((m) => m.shareBlock),
  contact: () => import('./blocks/contact.js').then((m) => m.contactBlock),
  privacy: () => import('./blocks/privacy.js').then((m) => m.privacyBlock),
  countdown: () => import('./blocks/countdown.js').then((m) => m.countdownBlock),
  audio: () => import('./blocks/audio.js').then((m) => m.audioBlock),
  product: () => import('./blocks/product.js').then((m) => m.productBlock),
  cart: () => import('./blocks/cart.js').then((m) => m.cartBlock),
  checkout: () => import('./blocks/checkout.js').then((m) => m.checkoutBlock),
  map: () => import('./blocks/map.js').then((m) => m.mapBlock),
  form: () => import('./blocks/form.js').then((m) => m.formBlock),
  calendar: () => import('./blocks/calendar.js').then((m) => m.calendarBlock),
  ribbon: () => import('./blocks/ribbon.js').then((m) => m.ribbonBlock),
};

/** The core background layer types and the modules that define them. */
export const CORE_BACKGROUNDS = {
  color: () => import('./backgrounds/color.js').then((m) => m.colorLayer),
  gradient: () => import('./backgrounds/gradient.js').then((m) => m.gradientLayer),
  glow: () => import('./backgrounds/glow.js').then((m) => m.glowLayer),
  grain: () => import('./backgrounds/grain.js').then((m) => m.grainLayer),
  pattern: () => import('./backgrounds/pattern.js').then((m) => m.patternLayer),
  image: () => import('./backgrounds/image.js').then((m) => m.imageLayer),
  slideshow: () => import('./backgrounds/slideshow.js').then((m) => m.slideshowLayer),
  video: () => import('./backgrounds/video.js').then((m) => m.videoLayer),
};

/** The old plugin contract ids of blocks that are core since 0.7.18 (ADR-0021): a page holding one loads the type it stands for. */
export const BLOCK_ALIASES = { kalender: 'calendar', kart: 'map', skjema: 'form' };

const TABLES = { blocks: CORE_BLOCKS, backgrounds: CORE_BACKGROUNDS };

/** The definer each registry handed back when its core ids were reserved (reserveCoreTypes), by registry. */
const DEFINERS = new WeakMap();

/**
 * Loads and defines the core types a page uses (pageTypes in plugins.js), an old id's type among them, or every core type with `all`; a type already defined is left as it is.
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
 * Holds every core block and background id as the engine's own in the registries, before any module has defined it: a plugin may then never take one, however its loading and the page's interleave, and the engine defines them through the definers the registries hand back.
 * @param {typeof window.Urd} Urd
 */
export function reserveCoreTypes(Urd) {
  for (const [kind, table] of Object.entries(TABLES)) DEFINERS.set(Urd[kind], Urd[kind].reserve(Object.keys(table)));
}
