/**
 * Version consistency guard for the release Action (see UTVIKLING.md).
 *
 * The source of truth is the engine field in template/urd.json; the git tag
 * and the CHANGELOG heading must always agree with it. Run from the repo root:
 *
 *     node scripts/check-release.mjs v0.6.9 [--prerelease]
 *
 * With --prerelease (the rc sync for updater testing) the CHANGELOG and
 * editor/package.json checks are skipped: an rc has no release heading.
 */
import { readFileSync, statSync } from 'node:fs';
import process from 'node:process';

const [tag, flag] = process.argv.slice(2);
const prerelease = flag === '--prerelease';
const errors = [];

if (!tag || !/^v\d+\.\d+\.\d+$/.test(tag)) {
  console.error(`FAIL  the tag must have the form vX.Y.Z (got: ${tag ?? '(missing)'})`);
  process.exit(1);
}

const engine = JSON.parse(readFileSync('template/urd.json', 'utf-8')).engine;
if (`v${engine}` !== tag) {
  errors.push(`tag ${tag} does not match urd.json.engine (${engine})`);
}

// The release Action runs the workflow of the ref it was started from: a release runs its tag's, a manual run the chosen ref's.
// An older workflow skips steps a newer tag needs (the template's _headers, scripts/release-headers.mjs), so only main's or the synced tag's is accepted.
const workflowRef = process.env.GITHUB_WORKFLOW_REF;
if (workflowRef && !workflowRef.endsWith(`@refs/tags/${tag}`) && !workflowRef.endsWith('@refs/heads/main')) {
  errors.push(`the release workflow ran from ${workflowRef.slice(workflowRef.indexOf('@') + 1)}; start it from main or from the tag ${tag}`);
}

// The engine folder must exist under the name the engine field gives
// (ADR-0013); the remaining invariants (shells, HTML references) are covered
// by the test suite, which the Action runs after this check.
try {
  if (!statSync(`template/assets/engine/${engine}`).isDirectory()) throw new Error();
} catch {
  errors.push(`engine folder template/assets/engine/${engine}/ does not exist`);
}

if (!prerelease) {
  // The first release heading in the CHANGELOG (## [X.Y.Z] - date, Keep a
  // Changelog) must be this version: the [Ulansert] section has to be renamed
  // (or emptied into) the release before tagging.
  const changelog = readFileSync('docs/CHANGELOG.md', 'utf-8');
  const heading = changelog.match(/^## \[(?!Ulansert\])([^\]]+)\]/m)?.[1];
  if (heading !== engine) {
    errors.push(`the CHANGELOG heading is [${heading ?? '(none)'}], expected [${engine}]`);
  }

  const pkg = JSON.parse(readFileSync('editor/package.json', 'utf-8')).version;
  if (pkg !== engine) {
    errors.push(`editor/package.json is ${pkg}, expected ${engine}`);
  }
}

if (errors.length) {
  for (const err of errors) console.error(`FAIL  ${err}`);
  process.exit(1);
}
console.log(`OK    ${tag}: engine, folder${prerelease ? '' : ', CHANGELOG and package.json'} all match`);
