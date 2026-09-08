/**
 * Guard for the content canvas (ADR-0018) and for the pinning that lives on
 * top of it.
 *
 * `.urd-canvas` binds the blocks to the design width. If it gets transform,
 * filter, perspective, backdrop-filter, contain, container-type or
 * will-change, it becomes the containing block for `position: fixed`, and
 * pinned and screen-docked blocks (sticky.js) die silently: they would
 * position themselves relative to the canvas instead of the window. The bug
 * is invisible in all unit tests and only surfaces as a visual defect, so it
 * is guarded mechanically here instead of with a comment.
 *
 * Same genre as the modulepreload test: read the source, recompute, require
 * equality.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { engineImport } from './_engine.mjs';

const { applySiteLayout } = await engineImport('render.js');

const CSS = readFileSync(new URL('../template/assets/styles/base.css', import.meta.url), 'utf-8');

/** Properties that create a containing block for position: fixed. */
const FORBIDDEN = [
  'transform',
  'filter',
  'perspective',
  'backdrop-filter',
  'contain',
  'container-type',
  'will-change',
];

/** Get the declarations in the rule for a selector, comments stripped.
 *  All regex metacharacters are escaped, in every occurrence, not just the
 *  first dot (CodeQL js/incomplete-sanitization). */
function ruleBody(css, selector) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = stripped.match(new RegExp(`(^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, 'm'));
  return match ? match[2] : null;
}

test('.urd-canvas exists in base.css', () => {
  assert.ok(ruleBody(CSS, '.urd-canvas'), 'rule .urd-canvas is missing');
});

test('.urd-canvas has no property that creates a containing block for fixed', () => {
  const body = ruleBody(CSS, '.urd-canvas');
  for (const prop of FORBIDDEN) {
    assert.ok(
      !new RegExp(`(^|;|\\s)${prop}\\s*:`).test(body),
      `.urd-canvas sets ${prop}, which would kill pinned blocks (ADR-0018)`,
    );
  }
});

test('.urd-canvas binds the width and centers', () => {
  const body = ruleBody(CSS, '.urd-canvas');
  assert.match(body, /width:\s*min\(/, 'the width must be bound with min()');
  assert.match(body, /--urd-canvas-w/, 'the width must read --urd-canvas-w');
  assert.match(body, /margin-inline:\s*auto/, 'the canvas must be centered');
});

// applySiteLayout is pure enough to test with a minimal stub: it only
// touches setProperty on one element.
const stubRoot = () => {
  const props = new Map();
  return { props, style: { setProperty: (k, v) => props.set(k, v) } };
};

test('applySiteLayout writes width in px and gutter in vw', () => {
  const root = stubRoot();
  applySiteLayout({ layout: { contentWidth: 960, gutter: 9 } }, root);
  assert.equal(root.props.get('--urd-canvas-w'), '960px');
  // The unit is what separates a gutter that follows the screen from a fixed one.
  assert.equal(root.props.get('--urd-canvas-gutter-desktop'), '9vw');
});

test('applySiteLayout: "full" gives an unbound canvas', () => {
  const root = stubRoot();
  applySiteLayout({ layout: { contentWidth: 'full', gutter: 0 } }, root);
  assert.equal(root.props.get('--urd-canvas-w'), '100%');
  assert.equal(root.props.get('--urd-canvas-gutter-desktop'), '0vw');
});

test('applySiteLayout without a layout field falls back to the default', () => {
  const root = stubRoot();
  applySiteLayout({}, root);
  assert.equal(root.props.get('--urd-canvas-w'), '1440px');
  assert.equal(root.props.get('--urd-canvas-gutter-desktop'), '6vw');
});

test('applySiteLayout tolerates a missing site without throwing', () => {
  const root = stubRoot();
  applySiteLayout(undefined, root);
  assert.equal(root.props.get('--urd-canvas-w'), '1440px');
});
