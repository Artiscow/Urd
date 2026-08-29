/**
 * Stegvis versjonsløfting - Urds kjerne-invariant (se docs/adr/0005).
 *
 * All data (blokker, bakgrunnslag, animasjoner, seksjoner) bærer `version`,
 * og hver typedefinisjon oppgir `version` + `migrations` der migrations[n]
 * løfter nøyaktig v(n) → v(n+1) som en ren funksjon (props inn, props ut).
 *
 * Løfting skjer i minnet ved lasting - filene på disk skrives først ved
 * neste publisering. Ved ukjent type eller manglende migrering droppes
 * ALDRI data: innslaget markeres som plassholder og originalen beholdes.
 */

/**
 * Løfter ett datainnslag til definisjonens nåværende versjon.
 *
 * @param {{type?: string, version: number, props: object}} data
 *   Innslag fra innholdsfil (muteres ikke).
 * @param {{version: number, migrations?: Record<number, (props: object) => object>}|undefined} def
 *   Typedefinisjon fra registeret, eller undefined om typen er ukjent.
 * @returns {{ok: boolean, version: number, props: object, placeholder?: string}}
 *   ok=true med løftede props, eller ok=false med `placeholder`-årsak og
 *   originale props urørt ('unknown-type' | 'missing-migration' | 'newer-than-engine').
 */
export function lift(data, def) {
  if (!def) {
    return { ok: false, version: data.version, props: data.props, placeholder: 'unknown-type' };
  }
  // Manglende/ugyldig version (håndredigert eller amputert data) behandles
  // som v1, aldri som gjeldende: uten dette hopper while-løkken over alle
  // migreringene (undefined < n er falsk) og gammelt format leses som nytt.
  const from = Number.isInteger(data.version) ? data.version : 1;
  if (from > def.version) {
    // Innholdet er skrevet av en nyere motor - rendres som plassholder,
    // aldri feiltolket eller nedgradert.
    return { ok: false, version: from, props: data.props, placeholder: 'newer-than-engine' };
  }

  let version = from;
  let props = data.props;
  while (version < def.version) {
    const step = def.migrations && def.migrations[version];
    if (typeof step !== 'function') {
      return { ok: false, version: from, props: data.props, placeholder: 'missing-migration' };
    }
    props = step(structuredClone(props));
    version++;
  }
  return { ok: true, version, props };
}

/** Gjeldende versjon av sidefil-formatet (content/pages/*.json). */
export const PAGE_SCHEMA_VERSION = 4;

/**
 * Radhøyden i mobil-radnettet (ADR-0019), i px. En modellkonstant på linje
 * med brekkpunktet: aldri koblet til grid.size, som er et snappeverktøy
 * for desktop.
 */
export const MOBILE_ROW = 8;

/** Loddrett luft mellom flytblokker i mobil-radnettet, i px. */
export const MOBILE_GAP = 16;

/** Gjeldende versjon av site.json-formatet. */
export const SITE_SCHEMA_VERSION = 3;

/**
 * Migreringer på filnivå. Hver funksjon løfter nøyaktig én versjon og
 * får hele sidefilen (klonet) + site.json som kontekst.
 */

/** Flytens topp-padding i det gamle mobilformatet: materialiseringen målte
 *  y fra flatetoppen, altså inkludert paddingen, så den trekkes fra før
 *  radindeksen regnes ut. */
const V1_FLOW_PAD = 24;

/** attention.reason-tokens var norske i v1; datakontrakter bruker engelske
 *  identifikatorer. */
const V1_REASONS = {
  'oppsett-byttet': 'layout-changed',
  'blokk-endret': 'block-edited',
  'desktop-endret-etter-mobil': 'desktop-changed-after-mobile',
  'seksjonshøyde': 'section-height',
  'blokk-flyttet': 'block-moved',
  'blokk-slettet': 'block-deleted',
  'blokk-lagt-til': 'block-added',
};

/**
 * Løfter en blokks frames.mobile fra v1-formen (full frame {x, y, w, h})
 * til radnett-plasseringen (ADR-0019). En plassering i ny form (uten y/h)
 * returneres urørt, og en byte-lik kopi av desktop-framen gir null: det
 * var materialiseringens fallback for blokker utenfor flyten, aldri en
 * håndsatt plassering. Brukes av sidemigreringen OG av mal-innsettingen
 * (templates-model.js), som setter inn lagrede nyttelaster utenom sideløftet.
 */
export function liftMobileFrame(m, desktop) {
  if (!m || !('y' in m || 'h' in m)) return m ?? null;
  if (desktop && m.x === desktop.x && m.y === desktop.y && m.w === desktop.w && m.h === desktop.h) {
    return null;
  }
  const placement = { x: m.x, w: m.w };
  if (Number.isFinite(m.y)) {
    placement.row = Math.max(1, Math.round((m.y - V1_FLOW_PAD) / MOBILE_ROW) + 1);
    placement.rows = Number.isFinite(m.h) ? Math.max(1, Math.ceil(m.h / MOBILE_ROW)) : 1;
  }
  if (Number.isFinite(m.z) && m.z !== 1) placement.z = m.z;
  if (m.rot) placement.rot = m.rot;
  return placement;
}

/**
 * Core block types were Norwegian before v3; data contracts use English
 * identifiers (ADR-0021). Plugin-owned types (kalender, kart, skjema) are
 * deliberately absent: old plugin folders in user repos keep defining the
 * old ids forever, so those are resolved through registry aliases instead.
 */
export const V2_BLOCK_TYPES = {
  samling: 'collection',
  galleri: 'gallery',
  tidslinje: 'timeline',
  sitat: 'quote',
  statistikk: 'stats',
  tabell: 'table',
  deling: 'share',
  nedteller: 'countdown',
  produkt: 'product',
  handlekurv: 'cart',
  kasse: 'checkout',
};

/** Background layer types renamed in v3 (ADR-0021). */
export const V2_LAYER_TYPES = {
  bildegalleri: 'slideshow',
};

/** Section theme roles renamed in v3 (ADR-0021); see SECTION_THEMES in theme.js. */
export const V2_SECTION_THEMES = {
  flate: 'surface',
  aksent: 'accent',
  invers: 'inverse',
  dus: 'soft',
  dempet: 'muted',
  dyp: 'deep',
  uthevet: 'highlighted',
};

/**
 * Core section preset ids renamed in v4 (ADR-0021). Plugin preset ids
 * (hva-skjer, finn-oss, kontaktskjema) are deliberately absent; they resolve
 * through registry aliases like the plugin block types.
 */
export const V3_PRESET_IDS = {
  tom: 'blank',
  'hero-sentrert': 'hero-centered',
  bilder: 'images',
  galleri: 'gallery',
  kontakt: 'contact',
  funksjonskort: 'feature-cards',
  'funksjonskort-enkel': 'feature-cards-simple',
  nyheter: 'news',
  'nyheter-samling': 'news-collection',
  oppslagstavle: 'noticeboard',
  publikasjonsarkiv: 'publication-archive',
  arrangementer: 'events',
  tidslinje: 'timeline',
  steg: 'steps',
  hovedoppslag: 'lead-story',
  produkter: 'products',
  butikk: 'shop',
  'butikk-hero': 'shop-hero',
  'butikk-kategorier': 'shop-categories',
  'butikk-tillit': 'shop-trust',
  'butikk-utstilling': 'shop-showcase',
  kasse: 'checkout',
  sitat: 'quote',
  statistikk: 'stats',
  sponsorer: 'sponsors',
  medlemskap: 'membership',
};

/**
 * Renames contract tokens (block types, background layer types and section
 * theme roles) in place. Accepts a section-like object ({blocks, background,
 * theme}) or a bare block array. Used by pageMigrations[2] and by template
 * insertion (templates-model), which inserts stored payloads outside the
 * page lift.
 */
export function liftContractTokens(target) {
  const blocks = Array.isArray(target) ? target : target.blocks ?? [];
  for (const block of blocks) {
    if (V2_BLOCK_TYPES[block.type]) block.type = V2_BLOCK_TYPES[block.type];
  }
  if (!Array.isArray(target)) {
    for (const layer of target.background?.layers ?? []) {
      if (V2_LAYER_TYPES[layer.type]) layer.type = V2_LAYER_TYPES[layer.type];
    }
    if (V2_SECTION_THEMES[target.theme]) target.theme = V2_SECTION_THEMES[target.theme];
    if (V3_PRESET_IDS[target.preset]) target.preset = V3_PRESET_IDS[target.preset];
  }
  return target;
}

const pageMigrations = {
  // 1 -> 2 (synket mobilmodell, ADR-0019): frames.mobile bytter form fra
  // full frame {x,y,w,h} til partiell radnett-plassering {x,w,row,rows},
  // seksjonsmodusen 'manual' pensjoneres, og dekor-blokker får det nye
  // hideMobile-feltet som overtar mobilskjulingen. Pre-v1 er utseende-
  // endringen (radkvantisering ±8 px) akseptert (ADR-0005).
  1: (page) => {
    for (const section of page.sections ?? []) {
      const mobile = section.responsive?.mobile;
      for (const block of section.blocks ?? []) {
        if (block.decor) block.hideMobile = true;
        if (block.frames?.mobile) {
          block.frames.mobile = liftMobileFrame(block.frames.mobile, block.frames.desktop);
        }
      }
      if (mobile?.mode === 'manual') mobile.mode = 'auto';
      const reason = mobile?.attention?.reason;
      if (reason && V1_REASONS[reason]) mobile.attention.reason = V1_REASONS[reason];
    }
    return page;
  },
  // 2 -> 3 (ADR-0021): core block and background layer types renamed from
  // Norwegian to English contract identifiers.
  2: (page) => {
    for (const section of page.sections ?? []) liftContractTokens(section);
    return page;
  },
  // 3 -> 4 (ADR-0021): core section preset ids renamed. liftContractTokens
  // covers presets too, so a v2 page gets them in the first step and this
  // step is its no-op second pass; pages written at exactly v3 need it.
  3: (page) => {
    for (const section of page.sections ?? []) liftContractTokens(section);
    return page;
  },
};

const siteMigrations = {
  // 1 -> 2 (breddegrepet, ADR-0018): innholdet bindes av en designbredde i
  // stedet for å følge vindusbredden. Standarden skrives inn eksplisitt i
  // stedet for å utledes ved lesing, så motoren og editoren aldri kan komme
  // til hver sin verdi. Pre-v1 er utseende-endringen akseptert (ADR-0005).
  1: (site) => ({ ...site, layout: site.layout ?? { contentWidth: 1440, gutter: 6 } }),
  // 2 -> 3: sidemargen byttet fra piksler til PROSENT AV VINDUSBREDDEN.
  // Den gamle verdien kan ikke regnes om meningsfullt (24 px er ikke en fast
  // andel av noe), så alle settes til standarden. Pre-v1 er den lille
  // utseende-endringen akseptert (ADR-0005).
  2: (site) => ({ ...site, layout: { ...(site.layout ?? { contentWidth: 1440 }), gutter: 6 } }),
};

/**
 * Løfter site.json til gjeldende schemaVersion. Samme regler som
 * liftPageFile: stegvis, aldri destruktivt, original muteres aldri.
 */
export function liftSiteFile(site) {
  let lifted = structuredClone(site);
  let version = lifted.schemaVersion ?? 1;
  while (version < SITE_SCHEMA_VERSION) {
    const step = siteMigrations[version];
    if (typeof step !== 'function') return site;
    lifted = step(lifted) ?? lifted;
    version++;
    lifted.schemaVersion = version;
  }
  return lifted;
}

/**
 * Løfter en sidefil til gjeldende schemaVersion. Stegvis og aldri
 * destruktivt: mangler et migreringssteg (eller er filen NYERE enn
 * motoren), returneres den urørt i stedet for å feiltolkes.
 *
 * @param {object} page Sidefil, allerede parset
 * @param {object} site site.json (kontekst for omregninger)
 * @returns {object} Løftet kopi (originalen muteres aldri)
 */
export function liftPageFile(page, site) {
  let lifted = structuredClone(page);
  let version = lifted.schemaVersion ?? 1;
  while (version < PAGE_SCHEMA_VERSION) {
    const step = pageMigrations[version];
    if (typeof step !== 'function') return page;
    lifted = step(lifted, site) ?? lifted;
    version++;
    lifted.schemaVersion = version;
  }
  return lifted;
}
