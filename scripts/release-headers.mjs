/**
 * The template's _headers at a release (ADR-0013 addendum, 7 October 2026).
 *
 * In the Urd monorepo the engine's files change between releases under the same versioned folder, so template/_headers lets the browser revalidate them (no-cache).
 * A release gives the engine a new folder, so the template repo caches the modules forever.
 * The release Action runs this script on its copy of _headers, after the copy of template/ and before the commit:
 *
 *     node scripts/release-headers.mjs urd-template/_headers
 *
 * The release block is the template's text byte for byte.
 * The updater shows a site's owner a «change by hand» note when the site's _headers differs from the template's at the version it updates to, so a site that never edited the file sees one only when the template's text changes.
 */
import { readFileSync, realpathSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

/** The engine block of the monorepo's template/_headers. */
export const MONOREPO_BLOCK = `# The engine is version-addressed (assets/engine/<version>/..., ADR-0013), but in the Urd monorepo its files change between releases under the same folder name.
# A deployment of this folder (the test site) or a local Wrangler server therefore asks before every use (no-cache: a 304 when the file is unchanged).
# The release sync writes the template's own block in its place (scripts/release-headers.mjs): there every release gets a new folder, so the modules are cached forever.
# The rule is version-neutral (/assets/engine/* covers any versioned folder).
# The stable plugin API shells in /assets/urd/ stay OUTSIDE and revalidate normally.
/assets/engine/*
  Cache-Control: no-cache
`;

/** The engine block of the template repo's _headers, as released in v0.7.4. */
export const RELEASE_BLOCK = `# The engine is version-addressed (assets/engine/<version>/..., ADR-0013): a
# new engine gets a new folder, so the modules can be cached forever. The rule
# is DELIBERATELY version-neutral (/assets/engine/* covers any versioned
# folder), so this hand-edited file never needs changing on an engine bump.
# The stable plugin API shells in /assets/urd/ stay OUTSIDE and revalidate
# normally.
/assets/engine/*
  Cache-Control: public, max-age=31536000, immutable
`;

/** The template's _headers made from the monorepo's: the engine block swapped, every other byte kept. */
export function releaseHeaders(text) {
  const count = text.split(MONOREPO_BLOCK).length - 1;
  if (count !== 1) {
    throw new Error(`_headers must hold the monorepo's engine block exactly once (found ${count})`);
  }
  return text.replace(MONOREPO_BLOCK, () => RELEASE_BLOCK);
}

// Run as a command (the path resolved, as Node resolves the module's own), not when imported by the tests.
if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [file] = process.argv.slice(2);
  if (!file) {
    console.error('FAIL  usage: node scripts/release-headers.mjs <path to _headers>');
    process.exit(1);
  }
  try {
    writeFileSync(file, releaseHeaders(readFileSync(file, 'utf-8')));
    console.log(`OK    ${file}: the engine rule is the template's (cached forever)`);
  } catch (err) {
    console.error(`FAIL  ${file}: ${err.message}`);
    process.exit(1);
  }
}
