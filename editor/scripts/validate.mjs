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
ajv.addSchema(siteSchema); // page.schema.json refererer site.schema.json ($id)

const cases = [
  ['template/content/site.json', siteSchema.$id],
  ['template/content/pages/hjem.json', pageSchema],
  ['template/content/pages/om-oss.json', pageSchema],
  ['template/plugins/eksempel-kalender/plugin.json', pluginSchema],
];

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

process.exit(failed ? 1 : 0);
