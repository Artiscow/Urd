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
  if (data.version > def.version) {
    // Innholdet er skrevet av en nyere motor - rendres som plassholder,
    // aldri feiltolket eller nedgradert.
    return { ok: false, version: data.version, props: data.props, placeholder: 'newer-than-engine' };
  }

  let version = data.version;
  let props = data.props;
  while (version < def.version) {
    const step = def.migrations && def.migrations[version];
    if (typeof step !== 'function') {
      return { ok: false, version: data.version, props: data.props, placeholder: 'missing-migration' };
    }
    props = step(structuredClone(props));
    version++;
  }
  return { ok: true, version, props };
}

/** Gjeldende versjon av sidefil-formatet (content/pages/*.json). */
export const PAGE_SCHEMA_VERSION = 3;

/** Gjeldende versjon av site.json-formatet. */
export const SITE_SCHEMA_VERSION = 2;

const r2 = (v) => Math.round(v * 100) / 100;

/**
 * Grid v2: kvadratiske ruter med én størrelse (px) + snap. Konverterer
 * fra det gamle formatet (columns/rowHeight/gap) ved å beholde
 * radhøyden som rutestørrelse.
 */
function gridToSquare(grid) {
  if (!grid) return null;
  if (typeof grid.size === 'number') return grid;
  return { size: Math.max(2, grid.rowHeight ?? 16), snap: grid.snap !== false };
}

/**
 * Migreringer på filnivå. Hver funksjon løfter nøyaktig én versjon og
 * får hele sidefilen (klonet) + site.json som kontekst.
 *
 * v1 → v2: frames gikk fra grid-enheter (x/w i kolonner, y/h i rader) til
 * fysiske enheter (x/w i prosent av seksjonsbredden, y/h i px). Omregningen
 * bruker gridet innholdet ble laget mot (seksjonens eget, ellers sitets),
 * slik at ingenting flytter seg. Etter v2 er gridet KUN et snappeverktøy.
 */
const pageMigrations = {
  1: (page, site) => {
    for (const section of page.sections ?? []) {
      // Site-konteksten kan allerede være løftet til kvadratgrid ({size, snap}), siden site løftes før sidene.
      // Da er columns borte og omregningen ville gitt NaN: fall tilbake til v1-standarden 24 kolonner, og bruk size som radhøyde (gridToSquare beholdt nettopp radhøyden som size).
      const raw = section.grid ?? site?.grid;
      const g = typeof raw?.columns === 'number'
        ? raw
        : { columns: 24, rowHeight: raw?.size ?? raw?.rowHeight ?? 8 };
      for (const block of section.blocks ?? []) {
        for (const key of ['desktop', 'mobile']) {
          const f = block.frames?.[key];
          if (!f) continue;
          block.frames[key] = {
            ...f,
            x: r2((f.x * 100) / g.columns),
            w: r2((f.w * 100) / g.columns),
            y: f.y * g.rowHeight,
            h: f.h * g.rowHeight,
          };
        }
      }
    }
    return page;
  },
  // v2 → v3: seksjonenes grid-overstyr går til kvadratformatet.
  2: (page) => {
    for (const section of page.sections ?? []) {
      if (section.grid) section.grid = gridToSquare(section.grid);
    }
    return page;
  },
};

const siteMigrations = {
  // v1 → v2: gridet går fra kolonner/radhøyde til kvadratiske ruter.
  1: (site) => {
    site.grid = gridToSquare(site.grid) ?? { size: 16, snap: true };
    return site;
  },
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
