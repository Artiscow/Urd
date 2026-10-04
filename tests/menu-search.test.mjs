/**
 * The element menu's search (editor/src/lib/menu-search.js): which parts of a
 * menu a query shows, with the word match the editor gives it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchParts } from '../editor/src/lib/menu-search.js';
import { engineImport } from './_engine.mjs';
const { matchWords } = await engineImport('palette-search.js');

const row = (text) => ({ kind: 'row', text });
const heading = (text) => ({ kind: 'heading', text });
const rule = () => ({ kind: 'rule', text: '' });
const group = (text, children) => ({ kind: 'group', text, children });

/** The texts of the parts a query shows, in menu order, groups and headings included. */
function shown(parts, query) {
  const set = searchParts(parts, (text) => matchWords(text, query));
  const out = [];
  const walk = (list) => {
    for (const part of list) {
      if (set.has(part)) out.push(part.text);
      if (part.children) walk(part.children);
    }
  };
  walk(parts);
  return out;
}

const calendar = () => [
  group('Sources', [row('Calendar address'), row('Add calendar')]),
  group('View and count', [
    row('View'),
    row('Max count The most events shown'),
    row('Clock 24 hours is the default'),
    row('Reset this group'),
  ]),
  group('Colours', [row('Ground Text Accent'), heading('Panel'), row('Panel ground Panel text'), rule(), row('Edge')]),
  row('Hide on mobile'),
];

test('a word from a label deep in a closed group shows that setting and its group, and nothing else', () => {
  assert.deepEqual(shown(calendar(), 'clock'), ['View and count', 'Clock 24 hours is the default']);
  assert.deepEqual(shown(calendar(), 'mobile'), ['Hide on mobile']);
});

test('a tooltip counts as much as the label', () => {
  assert.deepEqual(shown(calendar(), 'events shown'), ['View and count', 'Max count The most events shown']);
});

test('a query naming a group shows the whole group', () => {
  assert.deepEqual(shown(calendar(), 'view and count'), ['View and count', 'View', 'Max count The most events shown', 'Clock 24 hours is the default', 'Reset this group']);
});

test('the words may be shared between a group or a heading and a setting under it', () => {
  assert.deepEqual(shown(calendar(), 'count clock'), ['View and count', 'Clock 24 hours is the default']);
  assert.deepEqual(shown(calendar(), 'colours text'), ['Colours', 'Ground Text Accent', 'Panel', 'Panel ground Panel text']);
});

test('a heading shows with a part under it, and its words reach until the next rule', () => {
  assert.deepEqual(shown(calendar(), 'panel'), ['Colours', 'Panel', 'Panel ground Panel text']);
  assert.deepEqual(shown(calendar(), 'colours panel'), ['Colours', 'Panel', 'Panel ground Panel text'], 'the edge after the rule is not under the heading');
  assert.deepEqual(shown(calendar(), 'edge'), ['Colours', 'Edge']);
});

test('a query nothing matches shows nothing, and a rule is never shown', () => {
  assert.deepEqual(shown(calendar(), 'zzz'), []);
  const everything = shown(calendar(), 'a');
  assert.ok(everything.includes('Colours') && !everything.includes(''), 'the rule stays hidden even when all else matches');
});

test('a control without words of its own is shown with its group, never found alone', () => {
  const parts = [group('Text fields', [row(''), row('Font'), row('Size (px)'), row('Italic Underline Text colour')]), row('')];
  assert.deepEqual(shown(parts, 'size'), ['Text fields', '', 'Size (px)'], 'the field picker stays over the size it sets');
  assert.deepEqual(shown(parts, 'zzz'), []);
});

test('a group inside a group opens with its parent', () => {
  const parts = [group('Placement', [row('Layer'), group('Motion', [row('Entrance'), row('On hover')])])];
  assert.deepEqual(shown(parts, 'hover'), ['Placement', 'Motion', 'On hover']);
  assert.deepEqual(shown(parts, 'placement'), ['Placement', 'Layer', 'Motion', 'Entrance', 'On hover']);
});
