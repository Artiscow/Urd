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
export const PAGE_SCHEMA_VERSION = 2;

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
        const m = block.frames?.mobile;
        if (!m) continue;
        const d = block.frames.desktop;
        if (d && m.x === d.x && m.y === d.y && m.w === d.w && m.h === d.h) {
          // Ren kopi av desktop-framen er materialiseringens fallback for
          // blokker utenfor flyten, aldri en håndsatt plassering.
          block.frames.mobile = null;
          continue;
        }
        const placement = { x: m.x, w: m.w };
        if (Number.isFinite(m.y)) {
          placement.row = Math.max(1, Math.round((m.y - V1_FLOW_PAD) / MOBILE_ROW) + 1);
          placement.rows = Number.isFinite(m.h) ? Math.max(1, Math.ceil(m.h / MOBILE_ROW)) : 1;
        }
        if (Number.isFinite(m.z) && m.z !== 1) placement.z = m.z;
        if (m.rot) placement.rot = m.rot;
        block.frames.mobile = placement;
      }
      if (mobile?.mode === 'manual') mobile.mode = 'auto';
      const reason = mobile?.attention?.reason;
      if (reason && V1_REASONS[reason]) mobile.attention.reason = V1_REASONS[reason];
    }
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
