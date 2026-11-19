/**
 * The shape model (shape-model.js, ADR-0035): a shape read within its ranges and limits, stored as what differs from the circle, drawn as an outline in the box from its values or its points, handed over as points, and the shipped shapes with their words.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { shapeOf, shapeStored, shapeOutline, outlinePath, outlineMiddle, shapeToPoints, shapeLimits, shapeId, SHAPES, SHAPE_BLANK, SHAPE_POINTS } = await engineImport('shape-model.js');

const inBox = (pts) => pts.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y) && x >= -0.01 && x <= 100.01 && y >= -0.01 && y <= 100.01);
const span = (pts, axis) => Math.max(...pts.map((p) => p[axis])) - Math.min(...pts.map((p) => p[axis]));

test('a shape that sets nothing is the circle, and each value is read within its range and the shape\'s limits', () => {
  assert.deepEqual(shapeOf(null), { ...SHAPE_BLANK, points: null, icon: null });
  assert.deepEqual(shapeOf('star'), shapeOf({}));
  const odd = shapeOf({ sides: 7, square: 400, corners: -5, cornerStyle: 'wavy', bulge: 900, stretch: -900, waves: 300, count: 99, sharp: 'x', waveStyle: 'zig', swirl: -500, point: 200, dir: 9, wobble: 101, seed: 0 });
  assert.equal(odd.sides, 0, 'sides the model does not have read as round');
  assert.deepEqual([odd.square, odd.corners, odd.cornerStyle, odd.bulge, odd.stretch], [100, 0, 'round', 100, -60]);
  assert.deepEqual([odd.waves, odd.count, odd.sharp, odd.waveStyle, odd.swirl], [100, 18, 30, 'round', -100]);
  assert.deepEqual([odd.point, odd.dir, odd.wobble, odd.seed], [40, 3, 100, 1], 'the point ends earlier on deep waves');
  // The limits: waves end earlier on few sides, a turn at half a side.
  assert.deepEqual(shapeLimits({ sides: 0, waves: 0 }), { waves: 100, point: 100, turn: 0 });
  assert.deepEqual(shapeLimits({ sides: 3, waves: 0 }), { waves: 35, point: 100, turn: 60 });
  assert.equal(shapeOf({ sides: 3, waves: 90, turn: 80 }).waves, 35);
  assert.equal(shapeOf({ sides: 6, turn: 55 }).turn, 30);
});

test('a shape is stored as what differs from the circle, and what only shows with another value goes with it', () => {
  assert.deepEqual(shapeStored(shapeOf({})), {});
  assert.deepEqual(shapeStored(shapeOf({ sides: 6, corners: 28, turn: 30, square: 50 })), { sides: 6, corners: 28, turn: 30 }, 'no squareness on a polygon');
  assert.deepEqual(shapeStored(shapeOf({ corners: 80, cornerStyle: 'cut', bulge: 30, count: 12, sharp: 90, swirl: 40, dir: 2, seed: 44 })), {}, 'nothing of a polygon, of waves, of a point or of a wobble without them');
  assert.deepEqual(shapeStored(shapeOf({ waves: 20, count: 10, waveStyle: 'cog', wobble: 30, seed: 9, icon: [61.4, 66] })), { waves: 20, count: 10, waveStyle: 'cog', wobble: 30, seed: 9, icon: [61, 66] });
  const drawn = shapeOf({ sides: 4, points: [[50, 4], [96, 50, 60, 'cut'], [50, 96, 100, 'scoop'], [4, 50, 45, 'zig']] });
  assert.deepEqual(drawn.points, [{ x: 50, y: 4, size: 0, style: 'round' }, { x: 96, y: 50, size: 60, style: 'cut' }, { x: 50, y: 96, size: 100, style: 'scoop' }, { x: 4, y: 50, size: 45, style: 'round' }]);
  assert.deepEqual(shapeStored(drawn), { sides: 4, points: [[50, 4, 0, 'round'], [96, 50, 60, 'cut'], [50, 96, 100, 'scoop'], [4, 50, 45, 'round']] }, 'the values kept beside the points');
  assert.equal(shapeOf({ points: [[1, 1], [2, 2]] }).points, null, 'too few points are none');
  assert.equal(shapeOf({ points: Array.from({ length: 60 }, (_, i) => [i, i]) }).points.length, SHAPE_POINTS.max);
  assert.deepEqual(shapeOf(shapeStored(drawn)), drawn, 'what is stored reads back the same');
});

test('every outline stays in the box and fills it, whatever the values', () => {
  const many = [{}, { square: 100 }, { stretch: 60 }, { stretch: -60 }, { sides: 3, corners: 0, bulge: -100 }, { sides: 12, corners: 100, bulge: 100, turn: 15 }, { waves: 100, count: 3, sharp: 100, alt: 100, swirl: 100 }, { waves: 100, count: 18, waveStyle: 'cog' }, { waves: 60, waveStyle: 'scoop', swirl: -100 }, { point: 100, dir: 2 }, { wobble: 100, seed: 9999 }, { sides: 5, waves: 50, point: 100, wobble: 100, stretch: 30 }];
  for (const raw of many) {
    const pts = shapeOutline(shapeOf(raw));
    assert.ok(inBox(pts), JSON.stringify(raw));
    assert.ok(Math.abs(Math.max(span(pts, 0), span(pts, 1)) - 100) < 0.01, `${JSON.stringify(raw)} fills the box`);
    assert.match(outlinePath(pts), /^M [\d.]+ [\d.]+ L .* Z$/);
  }
  assert.ok(span(shapeOutline(shapeOf({ stretch: 60 })), 1) < 70, 'a wide shape is lower than the box');
  const ring = shapeOutline(shapeOf({ sides: 6 }), 4);
  assert.ok(Math.abs(Math.max(span(ring, 0), span(ring, 1)) - 92) < 0.01, 'a margin keeps the outline that far inside');
  // The same seed gives the same wobble, another seed another.
  const wobble = (seed) => outlinePath(shapeOutline(shapeOf({ wobble: 60, seed })));
  assert.equal(wobble(7), wobble(7));
  assert.notEqual(wobble(7), wobble(8));
  // The waves: deeper is deeper, a cog and a scooped edge are other outlines, every other wave is shorter.
  const radii = (raw) => shapeOutline(shapeOf(raw)).map(([x, y]) => Math.hypot(x - 50, y - 50));
  const depth = (raw) => { const r = radii(raw); return Math.max(...r) - Math.min(...r); };
  assert.ok(depth({ waves: 80, count: 8 }) > depth({ waves: 20, count: 8 }) * 2);
  assert.notEqual(outlinePath(shapeOutline(shapeOf({ waves: 30, waveStyle: 'cog' }))), outlinePath(shapeOutline(shapeOf({ waves: 30 }))));
  assert.notEqual(outlinePath(shapeOutline(shapeOf({ waves: 30, alt: 80 }))), outlinePath(shapeOutline(shapeOf({ waves: 30 }))));
});

test('the middle is the shape\'s own: the box\'s on a shape alike all round, lower on one with a point at the top', () => {
  for (const raw of [{}, { sides: 6 }, { waves: 40, count: 8 }]) assert.deepEqual(outlineMiddle(shapeOutline(shapeOf(raw))).map((n) => Math.round(n)), [50, 50]);
  assert.ok(outlineMiddle(shapeOutline(shapeOf({ point: 70 })))[1] > 52);
  assert.ok(outlineMiddle(shapeOutline(shapeOf({ point: 70, dir: 1 })))[0] < 48, 'to the left of a point at the right');
  // A drawing whose edge crosses itself has little area to weigh: its middle is the middle of the room it takes, never outside it.
  for (const points of [[[4, 4], [96, 4], [6, 96], [96, 96]], [[4, 4, 50], [96, 4, 50], [6, 96, 50], [96, 96, 50]], [[50, 4], [96, 90], [4, 40], [96, 40], [4, 90]]]) {
    const [x, y] = outlineMiddle(shapeOutline(shapeOf({ points })));
    assert.ok(x > 40 && x < 60 && y > 40 && y < 60, `${JSON.stringify(points)} gives ${x}, ${y}`);
  }
});

test('a drawn shape goes through its points, each with its corner, and a shape\'s values are handed over as points', () => {
  const square = (size, style) => shapeOf({ points: [[10, 10, size, style], [90, 10, size, style], [90, 90, size, style], [10, 90, size, style]] });
  assert.deepEqual(shapeOutline(square(0, 'round')), [[10, 10], [90, 10], [90, 90], [10, 90]], 'sharp corners are the points themselves');
  assert.equal(shapeOutline(square(50, 'cut')).length, 8, 'a cut corner is two points');
  const round = shapeOutline(square(100, 'round')), scoop = shapeOutline(square(100, 'scoop'));
  const reach = (pts) => Math.max(...pts.map(([x, y]) => Math.hypot(x - 50, y - 50)));
  assert.ok(reach(round) < 56.6 && reach(scoop) < reach(round), 'a round corner stays inside the point, a scooped one further in');
  // The handover: a polygon's corners, a point on each crest and in each dip, or eight round points.
  const hex = shapeToPoints(shapeOf({ sides: 6, corners: 28, cornerStyle: 'cut', turn: 30 }));
  assert.equal(hex.length, 6);
  assert.ok(hex.every((p) => p.size === 28 && p.style === 'cut'));
  const star = shapeToPoints(shapeOf({ waves: 100, count: 5, sharp: 100 }));
  assert.equal(star.length, 10);
  assert.deepEqual(star.map((p) => p.size), [0, 100, 0, 100, 0, 100, 0, 100, 0, 100], 'sharp crests, round dips');
  const drop = shapeToPoints(shapeOf({ point: 70 }));
  assert.equal(drop.length, 8);
  assert.deepEqual([drop[0].size, drop[1].size], [30, 100], 'the point drawn out is the sharp one');
  assert.ok(Math.abs(drop[0].x - 50) < 1 && drop[0].y < 5, 'at the top');
  for (const points of [hex, star, drop]) assert.ok(inBox(shapeOutline(shapeOf({ points: points.map((p) => [p.x, p.y, p.size, p.style]) }))));
});

test('the shipped shapes: the circle first, each with its own outline, known by its id, and named in the three core languages', async () => {
  assert.deepEqual(SHAPES[0], ['circle', {}]);
  const ids = SHAPES.map(([id]) => id);
  assert.equal(new Set(ids).size, ids.length);
  const paths = SHAPES.map(([, values]) => outlinePath(shapeOutline(shapeOf(values))));
  assert.equal(new Set(paths).size, paths.length, 'no two shapes alike');
  for (const [id, values] of SHAPES) {
    assert.equal(shapeId(shapeOf(values)), id);
    assert.equal(shapeId(shapeOf({ ...values, icon: [40, 60] })), id, 'the mark\'s place is not the shape');
    assert.ok(inBox(shapeOutline(shapeOf(values))), id);
  }
  assert.equal(shapeId(shapeOf({ sides: 6, corners: 29, turn: 30 })), null, 'values of the owner\'s own');
  assert.equal(shapeId(shapeOf({ points: [[50, 4], [96, 50], [50, 96]] })), null, 'a drawn shape');
  for (const lang of ['nb', 'en-GB', 'tr']) {
    const dict = (await engineImport(`locales/admin/${lang}.js`)).default.strings;
    for (const id of ids) assert.ok(dict[`outlineShape.${id}`], `${lang} outlineShape.${id}`);
  }
});
