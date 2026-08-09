/**
 * Validerer eksempelinnholdet i template/ mot JSON-skjemaene i schema/.
 * Kjøres med `npm run validate` (og i CI). Feiler med kode 1 og tydelig
 * utskrift hvis noe ikke stemmer med kontrakten.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = fileURLToPath(new URL('../..', import.meta.url));
const load = (path) => JSON.parse(readFileSync(new URL(path, `file://${root}`), 'utf8'));

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const siteSchema = load('schema/site.schema.json');
const pageSchema = load('schema/page.schema.json');
const pluginSchema = load('schema/plugin.schema.json');
const collectionSchema = load('schema/collection.schema.json');
const malSchema = load('schema/mal.schema.json');
ajv.addSchema(siteSchema); // page.schema.json refererer site.schema.json ($id)
ajv.addSchema(pageSchema); // mal.schema.json refererer page-skjemaets $defs ($id)

const cases = [
  ['template/content/site.json', siteSchema.$id],
  ['template/content/pages/hjem.json', pageSchema.$id],
  ['template/content/pages/om-oss.json', pageSchema.$id],
  ['template/plugins/kalender/plugin.json', pluginSchema],
  ['template/plugins/skjema/plugin.json', pluginSchema],
  ['template/plugins/kart/plugin.json', pluginSchema],
  ['template/plugins/sprak-svensk/plugin.json', pluginSchema],
];

// Alle samlinger fra indeksfilen valideres mot collection-skjemaet (ADR-0007).
for (const id of load('template/content/samlinger.json').samlinger ?? []) {
  cases.push([`template/content/samlinger/${id}.json`, collectionSchema]);
}

// Alle maler fra indeksfilen valideres mot mal-skjemaet (samme mønster;
// malrepoet skipper tom indeks, så listen er gjerne tom her).
for (const id of load('template/content/maler.json').maler ?? []) {
  cases.push([`template/content/maler/${id}.json`, malSchema]);
}

let failed = false;
for (const [path, schema] of cases) {
  const validate = typeof schema === 'string' ? ajv.getSchema(schema) : ajv.compile(schema);
  if (validate(load(path))) {
    console.log(`OK    ${path}`);
  } else {
    failed = true;
    console.error(`FEIL  ${path}`);
    for (const err of validate.errors ?? []) {
      console.error(`      ${err.instancePath || '(rot)'}: ${err.message}`);
    }
  }
}

// Seksjonspresetene valideres også: hver create() pluss to item-runder skal gi skjemagyldige seksjoner.
// Strukturen og plasseringsgeometrien testes i tests/presets.test.mjs; her er det skjemakontrakten som gjelder.
// Motorstien er versjonert (ADR-0013): mappenavnet leses fra urd.json.engine.
const engineVersion = JSON.parse(readFileSync(`${root}template/urd.json`, 'utf-8')).engine;
const { registerSectionPresets } = await import(new URL(`template/assets/engine/${engineVersion}/sections/presets.js`, `file://${root}`));
const defs = new Map();
registerSectionPresets({ sections: { define: (id, def) => defs.set(id, def) } });
const sections = [];
for (const def of defs.values()) {
  const section = def.create();
  if (def.item) {
    for (let i = 0; i < 2; i++) section.blocks.push(...def.item(section).blocks);
  }
  sections.push(section);
}
const presetPage = { schemaVersion: 1, meta: { id: 'presets', title: 'Presets' }, sections };
const validatePresets = ajv.getSchema(pageSchema.$id);
if (validatePresets(presetPage)) {
  console.log(`OK    seksjonspresets (${defs.size} presets mot page-skjemaet)`);
} else {
  failed = true;
  console.error('FEIL  seksjonspresets');
  for (const err of validatePresets.errors ?? []) {
    console.error(`      ${err.instancePath || '(rot)'}: ${err.message}`);
  }
}

// Startpakkene (innebygde side-maler, 0.6.7.12): hver bygde side skal være
// skjemagyldig. Preset-referansene og id-unikheten testes i
// tests/page-presets.test.mjs; her gjelder skjemakontrakten.
const { PAGE_PRESETS, buildPagePreset } = await import(new URL(`template/assets/engine/${engineVersion}/page-presets.js`, `file://${root}`));
let pagePresetOk = true;
for (const preset of PAGE_PRESETS) {
  const built = buildPagePreset(preset.id, { pageId: 'startpakke', title: 'Startpakke' });
  if (!validatePresets(built)) {
    failed = true;
    pagePresetOk = false;
    console.error(`FEIL  startpakke (${preset.id})`);
    for (const err of validatePresets.errors ?? []) {
      console.error(`      ${err.instancePath || '(rot)'}: ${err.message}`);
    }
  }
}
if (pagePresetOk) console.log(`OK    startpakker (${PAGE_PRESETS.length} mot page-skjemaet)`);

// Syntetiske mal-caser: indeksen skipper tom, så kontrakten valideres med en
// seksjons-, en blokkgruppe- og en side-mal bygget fra ekte presets.
// Re-id-regelen og geometrien testes i tests/maler.test.mjs; her gjelder
// skjemakontrakten. En preset med blokker (den første, «tom», har ingen).
const malSection = [...defs.values()].map((d) => d.create()).find((s) => s.blocks.length > 0);
const syntheticMaler = [
  { schemaVersion: 1, mal: { name: 'Testmal seksjon', kind: 'section' }, section: malSection },
  { schemaVersion: 1, mal: { name: 'Testmal gruppe', kind: 'blocks' }, blocks: malSection.blocks },
  { schemaVersion: 1, mal: { name: 'Testmal side', kind: 'page' }, page: presetPage },
];
const validateMal = ajv.compile(malSchema);
let malOk = true;
for (const sample of syntheticMaler) {
  if (!validateMal(sample)) {
    failed = true;
    malOk = false;
    console.error(`FEIL  syntetisk mal (${sample.mal.kind})`);
    for (const err of validateMal.errors ?? []) {
      console.error(`      ${err.instancePath || '(rot)'}: ${err.message}`);
    }
  }
}
if (malOk) console.log('OK    syntetiske maler (3 mot mal-skjemaet)');

process.exit(failed ? 1 : 0);
