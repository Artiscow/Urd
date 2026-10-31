/**
 * A caret's place as a path of child positions (caret-path.js), found again in a field drawn anew with the same markup.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { pathTo, nodeAt } = await engineImport('caret-path.js');

/** A node tree of plain objects with the two links the module reads. */
function tree(shape, parentNode = null) {
  const node = { parentNode, childNodes: [] };
  node.childNodes = (shape ?? []).map((child) => tree(child, node));
  return node;
}

test('a path leads from the field to the node and back to the same place in a copy', () => {
  // <p>text</p><p>text<b>bold</b></p>, drawn twice.
  const shape = [[[]], [[], [[]]]];
  const field = tree(shape);
  const bold = field.childNodes[1].childNodes[1].childNodes[0];
  const path = pathTo(field, bold);
  assert.deepEqual(path, [1, 1, 0]);
  const again = tree(shape);
  assert.equal(nodeAt(again, path), again.childNodes[1].childNodes[1].childNodes[0]);
});

test('the field itself is the empty path', () => {
  const field = tree([[]]);
  assert.deepEqual(pathTo(field, field), []);
  assert.equal(nodeAt(field, []), field);
});

test('a node outside the field, or a place the markup lacks, gives null', () => {
  const field = tree([[]]);
  const other = tree([[]]);
  assert.equal(pathTo(field, other.childNodes[0]), null);
  assert.equal(nodeAt(field, [0, 3]), null);
  assert.equal(nodeAt(field, [5]), null);
});
