/**
 * Validates the example content in template/ against the JSON schemas in
 * schema/. Run with `npm run validate` (and in CI). Exits with code 1 and a
 * clear printout if anything does not match the contract.
 */
import { readdirSync, readFileSync } from 'node:fs';
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
const templateSchema = load('schema/mal.schema.json');
ajv.addSchema(siteSchema); // page.schema.json references site.schema.json ($id)
ajv.addSchema(pageSchema); // mal.schema.json references the page schema's $defs ($id)

const cases = [
  ['template/content/site.json', siteSchema.$id],
  ['template/plugins/calendar/plugin.json', pluginSchema],
  ['template/plugins/lang-sv/plugin.json', pluginSchema],
];

// Every page in the page registry is validated, not a hand-picked list: that
// catches both a new page nobody remembered to add here, and a registry entry
// pointing at a file that does not exist (load throws with the path). Files on
// disk that are NOT in the registry are included as well, so an orphaned page
// file is never left unvalidated.
const registered = new Set();
for (const page of load('template/content/site.json').pages ?? []) {
  registered.add(`template/${page.file}`);
  cases.push([`template/${page.file}`, pageSchema.$id]);
}
for (const name of readdirSync(new URL('template/content/pages/', `file://${root}`))) {
  const path = `template/content/pages/${name}`;
  if (name.endsWith('.json') && !registered.has(path)) cases.push([path, pageSchema.$id]);
}

// Every collection in the index file is validated against the collection schema (ADR-0007).
for (const id of load('template/content/samlinger.json').samlinger ?? []) {
  cases.push([`template/content/samlinger/${id}.json`, collectionSchema]);
}

// Every template in the index file is validated against the mal schema (same
// pattern; the template repo ships an empty index, so the list is often empty here).
for (const id of load('template/content/maler.json').maler ?? []) {
  cases.push([`template/content/maler/${id}.json`, templateSchema]);
}

let failed = false;
for (const [path, schema] of cases) {
  const validate = typeof schema === 'string' ? ajv.getSchema(schema) : ajv.compile(schema);
  if (validate(load(path))) {
    console.log(`OK    ${path}`);
  } else {
    failed = true;
    console.error(`ERROR ${path}`);
    for (const err of validate.errors ?? []) {
      console.error(`      ${err.instancePath || '(root)'}: ${err.message}`);
    }
  }
}

// The section presets are validated too: every create() plus two item rounds must yield schema-valid sections.
// The structure and the placement geometry are tested in tests/presets.test.mjs; here it is the schema contract that applies.
// The engine path is versioned (ADR-0013): the folder name is read from urd.json.engine.
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
  console.log(`OK    section presets (${defs.size} presets against the page schema)`);
} else {
  failed = true;
  console.error('ERROR section presets');
  for (const err of validatePresets.errors ?? []) {
    console.error(`      ${err.instancePath || '(root)'}: ${err.message}`);
  }
}

// The starter packs (built-in page templates): every built page must be
// schema-valid. The preset references and the id uniqueness are tested in
// tests/page-presets.test.mjs; here the schema contract applies.
const { PAGE_PRESETS, buildPagePreset } = await import(new URL(`template/assets/engine/${engineVersion}/page-presets.js`, `file://${root}`));
let pagePresetOk = true;
for (const preset of PAGE_PRESETS) {
  const built = buildPagePreset(preset.id, { pageId: 'starter-pack', title: 'Starter pack' });
  if (!validatePresets(built)) {
    failed = true;
    pagePresetOk = false;
    console.error(`ERROR starter pack (${preset.id})`);
    for (const err of validatePresets.errors ?? []) {
      console.error(`      ${err.instancePath || '(root)'}: ${err.message}`);
    }
  }
}
if (pagePresetOk) console.log(`OK    starter packs (${PAGE_PRESETS.length} against the page schema)`);

// Synthetic template cases: the index ships empty, so the contract is validated
// with a section, a block-group and a page template built from real presets.
// The re-id rule and the geometry are tested in tests/templates.test.mjs; here the
// schema contract applies. A preset with blocks (the first one, "empty", has none).
const templateSection = [...defs.values()].map((d) => d.create()).find((s) => s.blocks.length > 0);
const syntheticTemplates = [
  { schemaVersion: 1, mal: { name: 'Test template section', kind: 'section' }, section: templateSection },
  { schemaVersion: 1, mal: { name: 'Test template group', kind: 'blocks' }, blocks: templateSection.blocks },
  { schemaVersion: 1, mal: { name: 'Test template page', kind: 'page' }, page: presetPage },
];
const validateTemplate = ajv.compile(templateSchema);
let templateOk = true;
for (const sample of syntheticTemplates) {
  if (!validateTemplate(sample)) {
    failed = true;
    templateOk = false;
    console.error(`ERROR synthetic template (${sample.mal.kind})`);
    for (const err of validateTemplate.errors ?? []) {
      console.error(`      ${err.instancePath || '(root)'}: ${err.message}`);
    }
  }
}
if (templateOk) console.log('OK    synthetic templates (3 against the template schema)');

process.exit(failed ? 1 : 0);
