/**
 * Guard for the compatibility surface plugin copies rely on (SCHEMA.md,
 * «The compatibility surface for plugin copies»). plugins/** are user paths
 * the updater never touches, so every engine keeps running plugin folders
 * copied from 0.6.11: their auto-grow parses the section's inline
 * min-height with parseFloat and writes a plain px value back, their config
 * panels carry the old class names, and their templates register through
 * Urd.maler. Same genre as the canvas and modulepreload tests: read the
 * source, require the contract.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { engineImport, ENGINE_DIR } from './_engine.mjs';

const { sectionMinHeight } = await engineImport('render.js');

const TEMPLATE = new URL('../template/', import.meta.url);
const read = (url) => readFileSync(url, 'utf-8');
const CSS = read(new URL('assets/styles/base.css', TEMPLATE));
const RENDER = read(new URL('render.js', ENGINE_DIR));
const PREVIEW_EDIT = read(new URL('preview-edit.js', ENGINE_DIR));
const URD = read(new URL('urd.js', ENGINE_DIR));

/** The declarations in the rule for a selector, comments stripped. */
function ruleBody(css, selector) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = stripped.match(new RegExp(`(^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, 'm'));
  return match ? match[2] : null;
}

/** Source without comments, so a mention in a comment never counts. */
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

test('the inline section min-height is a plain CSS length, never a calc()', () => {
  assert.match(sectionMinHeight({ size: {} }, 480), /^\d+(\.\d+)?px$/);
  assert.equal(sectionMinHeight({}, 312.5), '312.5px');
  assert.equal(sectionMinHeight({ size: { minHeight: '85vh' } }, 480), '85vh', 'a stored height passes through untouched');
  assert.equal(sectionMinHeight({ size: { minHeight: '1152px' } }, 480), '1152px');
});

test('no engine or plugin source writes a calc() into style.minHeight', () => {
  const pluginDir = new URL('plugins/', TEMPLATE);
  const plugins = readdirSync(pluginDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => new URL(`plugins/${d.name}/index.js`, TEMPLATE));
  const sources = [['render.js', RENDER], ['preview-edit.js', PREVIEW_EDIT]];
  for (const url of plugins) {
    try { sources.push([url.pathname, read(url)]); } catch { /* a language pack has no entry */ }
  }
  for (const [name, src] of sources) {
    assert.ok(!/minHeight\s*=\s*`calc\(/.test(stripComments(src)), `${name} writes a calc() min-height`);
  }
});

test('the nav clearance is section padding, so an overwritten min-height keeps it', () => {
  const section = ruleBody(CSS, '.urd-section');
  assert.ok(section, 'rule .urd-section is missing');
  assert.match(section, /box-sizing:\s*content-box/, 'the section must be content-box (min-height excludes the clearance)');
  assert.match(section, /padding-top:\s*var\(--urd-section-clear/, 'the section must carry the clearance as padding');
  const mobileCanvas = ruleBody(CSS, 'body.urd-mobile .urd-canvas');
  assert.ok(mobileCanvas, 'rule body.urd-mobile .urd-canvas is missing');
  assert.ok(!/padding-top/.test(mobileCanvas), 'the mobile canvas must not add the clearance a second time');
});

test('the preview click guard recognises the plugin config panels, old names included', () => {
  for (const cls of ['.urd-cal-config', '.urd-form-config', '.urd-kal-config', '.urd-skjema-config', '.urd-kart-config']) {
    assert.ok(stripComments(PREVIEW_EDIT).includes(cls), `the click guard is missing ${cls}`);
  }
});

test('Urd.maler stays an alias of Urd.templates', () => {
  assert.match(stripComments(URD), /Urd\.maler\s*=\s*Urd\.templates/);
});
