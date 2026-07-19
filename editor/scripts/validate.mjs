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
ajv.addSchema(siteSchema); // page.schema.json refererer site.schema.json ($id)

const cases = [
  ['template/content/site.json', siteSchema.$id],
  ['template/content/pages/hjem.json', pageSchema],
  ['template/content/pages/om-oss.json', pageSchema],
  ['template/plugins/kalender/plugin.json', pluginSchema],
];

// Alle samlinger fra indeksfilen valideres mot collection-skjemaet (ADR-0007).
for (const id of load('template/content/samlinger.json').samlinger ?? []) {
  cases.push([`template/content/samlinger/${id}.json`, collectionSchema]);
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
const { registerSectionPresets } = await import(new URL('template/assets/engine/sections/presets.js', `file://${root}`));
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
const presetPage = { schemaVersion: 3, meta: { id: 'presets', title: 'Presets' }, sections };
const validatePresets = typeof pageSchema === 'string' ? ajv.getSchema(pageSchema) : ajv.compile(pageSchema);
if (validatePresets(presetPage)) {
  console.log(`OK    seksjonspresets (${defs.size} presets mot page-skjemaet)`);
} else {
  failed = true;
  console.error('FEIL  seksjonspresets');
  for (const err of validatePresets.errors ?? []) {
    console.error(`      ${err.instancePath || '(rot)'}: ${err.message}`);
  }
}

process.exit(failed ? 1 : 0);
