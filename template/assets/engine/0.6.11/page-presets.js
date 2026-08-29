/**
 * Innebygde side-maler («startpakker», 0.6.7.12): hele sider komponert av
 * kjerne-seksjonspresets, vist i «Ny side fra mal»-rutenettet i Sider-panelet
 * under gruppen Innebygde. Kode-definerte (ikke content/maler/-filer) så de
 * følger motorversjonen, alltid finnes på ferske kloner og holder brukerens
 * egen mal-liste ren.
 *
 * Kun kjerne-presets refereres (plugins kan være avslått). create() kjøres
 * ved bygging, så seed-tekstene oversettes da (ADR-0012) og makeId gir ferske
 * id-er; ingen re-id trengs ved innsetting. EDITOR-ONLY: importeres kun av
 * admin ($engine-bundelen), aldri av besøkende-lukningen (modulepreload-
 * testen vokter).
 */
import { registerSectionPresets } from './sections/presets.js';
import { PAGE_SCHEMA_VERSION } from './migrate.js';

/* Seksjons-defs samles med validate.mjs-trikset: registreringen trenger kun
   en define-krok, ikke hele Urd-objektet. */
const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });

/** Startpakkene i visningsrekkefølge; sections er kjerne-preset-id-er. */
export const PAGE_PRESETS = [
  { id: 'landing', labelKey: 'pageTemplate.landing', sections: ['hero', 'feature-cards', 'stats', 'quote', 'cta'] },
  { id: 'about', labelKey: 'pageTemplate.about', sections: ['hero-centered', 'team', 'timeline', 'sponsors', 'cta'] },
  { id: 'contact', labelKey: 'pageTemplate.contact', sections: ['hero-centered', 'contact', 'faq'] },
  { id: 'portfolio', labelKey: 'pageTemplate.portfolio', sections: ['hero-centered', 'gallery', 'quote', 'cta'] },
  { id: 'event', labelKey: 'pageTemplate.event', sections: ['lead-story', 'events', 'steps', 'faq', 'cta'] },
  // Butikkmønsteret (0.7.5): butikken er en egen side, og kassen sin egen -
  // eieren peker handlekurvens Kasseside-valg på kassesiden etterpå.
  // butikkforside er den fulle butikkfronten (Shopify-mønsteret): kampanje-
  // hero, produktbånd, kategorifliser, statement-bånd, tillit og CTA.
  { id: 'shop', labelKey: 'pageTemplate.shop', sections: ['shop-hero', 'shop', 'faq', 'cta'] },
  { id: 'shop-front', labelKey: 'pageTemplate.shopFront', sections: ['shop-hero', 'shop', 'shop-categories', 'shop-showcase', 'shop-trust', 'cta'] },
  { id: 'checkout', labelKey: 'pageTemplate.checkout', sections: ['checkout', 'contact'] },
];

/**
 * Bygger en komplett, gyldig sidefil fra en startpakke.
 * @param {string} id Startpakke-id fra PAGE_PRESETS
 * @param {{pageId: string, title: string}} meta Den nye sidens slug og tittel
 * @returns {object|null} Sidefil, eller null ved ukjent id
 */
export function buildPagePreset(id, { pageId, title }) {
  const preset = PAGE_PRESETS.find((p) => p.id === id);
  if (!preset) return null;
  return {
    schemaVersion: PAGE_SCHEMA_VERSION,
    meta: { id: pageId, title },
    sections: preset.sections.map((sid) => defs.get(sid).create()),
  };
}
