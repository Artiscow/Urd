/**
 * The repository's own workflows (.github/workflows/): the release sync reads the template repo's token only in its protected environment, and CodeQL scans the workflows as code of their own.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const DIR = new URL('../.github/workflows/', import.meta.url);
const read = (name) => readFileSync(new URL(name, DIR), 'utf8');

test('the release sync reads the template repo\'s token in the protected environment alone', () => {
  const release = read('release.yml');
  assert.match(release, /jobs:\s*\n\s+sync:\s*\n\s+runs-on: ubuntu-latest\s*\n(\s+#[^\n]*\n)*\s+environment: release\s*\n/, 'the job that reads it stands in `release`');
  const jobs = release.slice(release.indexOf('\njobs:'));
  assert.equal((jobs.match(/^ {2}[a-z][\w-]*:/gm) ?? []).length, 1, 'one job, the one in the environment');
  for (const name of readdirSync(DIR).filter((n) => n.endsWith('.yml') && n !== 'release.yml')) {
    assert.doesNotMatch(read(name), /URD_TEMPLATE_PAT/, `${name} never reads the release token`);
  }
});

test('CodeQL scans the workflows beside the JavaScript', () => {
  assert.match(read('codeql.yml'), /language: \[javascript-typescript, actions\]/);
});
