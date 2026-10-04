/**
 * Every engine file parses as an ES module.
 * Most engine modules draw in the browser and are never imported by a test, so a syntax error in one of them would otherwise first show on a page.
 * The files are parsed in one child process as vm.SourceTextModule, which reads the source as a module without linking or running it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { ENGINE_DIR } from './_engine.mjs';

/** Every .js file under a folder, at any depth. */
function scripts(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return scripts(path);
    return name.endsWith('.js') ? [path] : [];
  });
}

const PARSE = `
const vm = require('node:vm');
const fs = require('node:fs');
const bad = [];
for (const file of process.argv.slice(1)) {
  try {
    new vm.SourceTextModule(fs.readFileSync(file, 'utf8'), { identifier: file });
  } catch (error) {
    bad.push(file + ': ' + error.message);
  }
}
process.stdout.write(JSON.stringify(bad));
`;

test('every engine file parses as an ES module', () => {
  const files = scripts(fileURLToPath(ENGINE_DIR));
  assert.ok(files.length > 50, 'the engine files are found');
  const out = execFileSync(process.execPath, ['--experimental-vm-modules', '--no-warnings', '-e', PARSE, ...files], { encoding: 'utf8' });
  assert.deepEqual(JSON.parse(out), []);
});
