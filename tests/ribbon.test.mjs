/**
 * Contract tests for the ribbon's pure logic (ribbon-model.js) and the block
 * definition. The DOM building (blocks/ribbon.js) and the motion itself are
 * tested manually; what is tested here is the arithmetic the motion rests on:
 * a duration that follows the measured track, and choices that can never
 * become an unknown class name.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const {
  ribbonItems, normalizeSpeed, ribbonDuration, separatorMark, ribbonRows,
  clampTilt, ribbonSize, canRoll, ribbonMotion, ribbonWidth, ribbonMoves,
  mainMode, stripeMode, stripePlace, clampThickness, normalizeDwell, ribbonStepDuration,
  RIBBON_MARKS, RIBBON_SEPARATORS, RIBBON_SIZES, RIBBON_SPEED, RIBBON_MOTIONS, RIBBON_WIDTHS,
  RIBBON_MAIN_MODES, RIBBON_STRIPE_MODES, RIBBON_THICKNESS, RIBBON_DWELL, RIBBON_STRIPE_PLACES,
} = await engineImport('ribbon-model.js');
const { ribbonBlock } = await engineImport('blocks/ribbon.js');

// Deliberately Norwegian item texts: user data stays Norwegian (ADR-0021).
test('ribbonItems: trims, drops the empty ones and keeps the order', () => {
  assert.deepEqual(ribbonItems(['  Ferskt brød  ', '', '   ', 'Kaker', null, 7, 'Kurs']),
    ['Ferskt brød', 'Kaker', 'Kurs']);
  assert.deepEqual(ribbonItems(undefined), []);
  assert.deepEqual(ribbonItems('Kaker'), []);
});

test('normalizeSpeed: inside the bounds, with the default for junk', () => {
  assert.equal(normalizeSpeed(60), 60);
  assert.equal(normalizeSpeed(5), RIBBON_SPEED.min);
  assert.equal(normalizeSpeed(9000), RIBBON_SPEED.max);
  assert.equal(normalizeSpeed(0), RIBBON_SPEED.dflt);
  assert.equal(normalizeSpeed(-40), RIBBON_SPEED.dflt);
  assert.equal(normalizeSpeed('fort'), RIBBON_SPEED.dflt);
  assert.equal(normalizeSpeed(undefined), RIBBON_SPEED.dflt);
});

test('ribbonDuration: the width divided by the speed, with a floor', () => {
  // 1200 px at 60 px per second is twenty seconds for one period.
  assert.equal(ribbonDuration(1200, 60), 20);
  assert.equal(ribbonDuration(600, 300), 4);
  // A short band would otherwise loop several times a second.
  assert.equal(ribbonDuration(60, 300), 4);
  assert.equal(ribbonDuration(0, 60), 4);
  assert.equal(ribbonDuration(-100, 60), 4);
  assert.equal(ribbonDuration('bred', 60), 4);
  // A junk speed still gives a duration, from the default speed.
  assert.equal(ribbonDuration(1200, 'fort'), 20);
});

test('separatorMark: a drawn mark, own text, or nothing', () => {
  assert.deepEqual(RIBBON_MARKS, ['dot', 'dash', 'slash', 'star']);
  assert.deepEqual(RIBBON_SEPARATORS, ['dot', 'dash', 'slash', 'star', 'none', 'custom']);
  assert.deepEqual(separatorMark('star'), { kind: 'draw', value: 'star' });
  assert.deepEqual(separatorMark('none'), { kind: 'none', value: '' });
  assert.deepEqual(separatorMark('custom', '  ***  '), { kind: 'text', value: '***' });
  // An own separator without text is nothing, not a run of spaces.
  assert.deepEqual(separatorMark('custom', '   '), { kind: 'none', value: '' });
  assert.deepEqual(separatorMark('custom'), { kind: 'none', value: '' });
  // An unknown mark can never become a class name of its own.
  assert.deepEqual(separatorMark('heart'), { kind: 'draw', value: 'dot' });
  assert.deepEqual(separatorMark(undefined), { kind: 'draw', value: 'dot' });
});

test('ribbonRows, clampTilt and ribbonSize: allowlisted choices', () => {
  assert.equal(ribbonRows(2), 2);
  assert.equal(ribbonRows('2'), 2);
  assert.equal(ribbonRows(1), 1);
  assert.equal(ribbonRows(7), 1);
  assert.equal(ribbonRows(undefined), 1);
  assert.equal(clampTilt(4), 4);
  assert.equal(clampTilt(-4.4), -4);
  assert.equal(clampTilt(90), 10);
  assert.equal(clampTilt(-90), -10);
  assert.equal(clampTilt('skrå'), 0);
  assert.deepEqual(RIBBON_SIZES, ['sm', 'md', 'lg', 'xl']);
  assert.equal(ribbonSize('xl'), 'xl');
  assert.equal(ribbonSize('huge'), 'md');
  assert.equal(ribbonSize(undefined), 'md');
});

test('canRoll: never empty, never under reduced motion', () => {
  assert.equal(canRoll({ count: 1 }), true);
  assert.equal(canRoll({ count: 0 }), false);
  assert.equal(canRoll({ count: 3, reducedMotion: true }), false);
  assert.equal(canRoll(), false);
});

test('the ribbon block: the def contract', () => {
  assert.equal(ribbonBlock.version, 1);
  assert.equal(typeof ribbonBlock.render, 'function');
  assert.ok(ribbonBlock.migrations);
  const a = ribbonBlock.defaults();
  const b = ribbonBlock.defaults();
  assert.notEqual(a.items, b.items, 'defaults() must give fresh objects');
  assert.ok(a.items.length >= 1);
  assert.equal(a.direction, 'left');
  assert.equal(a.variant, 'band');
  assert.equal(a.pauseOnHover, true);
  assert.equal(normalizeSpeed(a.speed), a.speed, 'the seeded speed must be inside the bounds');
  assert.deepEqual(separatorMark(a.sep, a.sepText).kind, 'draw');
});

test('ribbonMotion and ribbonWidth: allowlisted, with the roll and the content surface as defaults', () => {
  assert.deepEqual(RIBBON_MOTIONS, ['roll', 'sway', 'step', 'none']);
  assert.deepEqual(RIBBON_WIDTHS, ['content', 'page']);
  assert.equal(ribbonMotion('sway'), 'sway');
  assert.equal(ribbonMotion('none'), 'none');
  assert.equal(ribbonMotion('spin'), 'roll');
  assert.equal(ribbonMotion(undefined), 'roll');
  assert.equal(ribbonWidth('page'), 'page');
  assert.equal(ribbonWidth('content'), 'content');
  assert.equal(ribbonWidth('window'), 'content');
});

test('ribbonMoves: the motion, the words and reduced motion all have a veto', () => {
  assert.equal(ribbonMoves({ count: 3 }), true);
  assert.equal(ribbonMoves({ count: 3, motion: 'sway' }), true);
  assert.equal(ribbonMoves({ count: 3, motion: 'none' }), false);
  assert.equal(ribbonMoves({ count: 0 }), false);
  assert.equal(ribbonMoves({ count: 3, reducedMotion: true }), false);
});

test('the stripe modes: the main one always holds something, the thin ones may hold nothing', () => {
  assert.deepEqual(RIBBON_MAIN_MODES, ['text', 'marks', 'plain']);
  assert.deepEqual(RIBBON_STRIPE_MODES, ['none', 'text', 'marks', 'plain']);
  assert.equal(mainMode('marks'), 'marks');
  assert.equal(mainMode('none'), 'text', 'the main stripe can never be absent');
  assert.equal(mainMode(undefined), 'text');
  assert.equal(stripeMode('plain'), 'plain');
  assert.equal(stripeMode('nothing'), 'none');
  assert.equal(stripeMode(undefined), 'none');
});

test('clampThickness: the thin stripes stay inside their bounds', () => {
  assert.equal(clampThickness(14), 14);
  assert.equal(clampThickness(0), RIBBON_THICKNESS.dflt);
  assert.equal(clampThickness(1), RIBBON_THICKNESS.min);
  assert.equal(clampThickness(400), RIBBON_THICKNESS.max);
  assert.equal(clampThickness('tjukk'), RIBBON_THICKNESS.dflt);
  assert.equal(clampThickness(7.6), 8);
});

test('the ticker is timed per word, not per pixel', () => {
  assert.equal(normalizeDwell(2), 2);
  assert.equal(normalizeDwell(0), RIBBON_DWELL.dflt);
  assert.equal(normalizeDwell(99), RIBBON_DWELL.max);
  assert.equal(normalizeDwell(0.1), RIBBON_DWELL.min);
  // Three words at one second each is a three second period, whatever the width.
  assert.equal(ribbonStepDuration(3, 1), 3);
  assert.equal(ribbonStepDuration(16, 0.5), 8);
  assert.equal(ribbonStepDuration(0, 2), 2);
  assert.equal(ribbonStepDuration('tre', 2), 2);
  assert.equal(ribbonStepDuration(4, undefined), 4 * RIBBON_DWELL.dflt);
});

test('stripePlace: stacked unless the edges are asked for', () => {
  assert.deepEqual(RIBBON_STRIPE_PLACES, ['stack', 'edge']);
  assert.equal(stripePlace('edge'), 'edge');
  assert.equal(stripePlace('stack'), 'stack');
  assert.equal(stripePlace('outside'), 'stack');
  assert.equal(stripePlace(undefined), 'stack');
});
