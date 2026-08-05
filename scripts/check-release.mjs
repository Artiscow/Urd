/**
 * Versjonskonsistens-vakt for release-Action-en (se UTVIKLING.md).
 *
 * Sannhetskilden er engine-feltet i template/urd.json; git-taggen og
 * CHANGELOG-overskriften skal alltid stemme med den. Kjøres fra repo-roten:
 *
 *     node scripts/check-release.mjs v0.6.9 [--prerelease]
 *
 * Med --prerelease (rc-synk for oppdaterer-testing) hoppes CHANGELOG- og
 * editor/package.json-sjekkene over: en rc har ingen utgivelsesoverskrift.
 */
import { readFileSync, statSync } from 'node:fs';
import process from 'node:process';

const [tag, flag] = process.argv.slice(2);
const prerelease = flag === '--prerelease';
const errors = [];

if (!tag || !/^v\d+\.\d+\.\d+$/.test(tag)) {
  console.error(`FEIL  taggen må ha formen vX.Y.Z (fikk: ${tag ?? '(mangler)'})`);
  process.exit(1);
}

const engine = JSON.parse(readFileSync('template/urd.json', 'utf-8')).engine;
if (`v${engine}` !== tag) {
  errors.push(`taggen ${tag} matcher ikke urd.json.engine (${engine})`);
}

// Motormappa skal finnes under navnet engine-feltet oppgir (ADR-0013);
// resten av invariantene (skall, HTML-referanser) dekkes av testsuiten,
// som Action-en kjører etter denne sjekken.
try {
  if (!statSync(`template/assets/engine/${engine}`).isDirectory()) throw new Error();
} catch {
  errors.push(`motormappa template/assets/engine/${engine}/ finnes ikke`);
}

if (!prerelease) {
  // Første utgivelsesoverskrift i CHANGELOG (## [X.Y.Z] - dato, Keep a
  // Changelog) skal være denne versjonen: [Ulansert]-seksjonen skal altså
  // være døpt om (eller tømt til) utgivelsen før taggingen.
  const changelog = readFileSync('docs/CHANGELOG.md', 'utf-8');
  const heading = changelog.match(/^## \[(?!Ulansert\])([^\]]+)\]/m)?.[1];
  if (heading !== engine) {
    errors.push(`CHANGELOG-overskriften er [${heading ?? '(ingen)'}], ventet [${engine}]`);
  }

  const pkg = JSON.parse(readFileSync('editor/package.json', 'utf-8')).version;
  if (pkg !== engine) {
    errors.push(`editor/package.json er ${pkg}, ventet ${engine}`);
  }
}

if (errors.length) {
  for (const err of errors) console.error(`FEIL  ${err}`);
  process.exit(1);
}
console.log(`OK    ${tag}: engine, mappe${prerelease ? '' : ', CHANGELOG og package.json'} stemmer`);
