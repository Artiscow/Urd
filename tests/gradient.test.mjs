/**
 * Contract tests for the gradient layer: gradientRender (pure render
 * recipe: CSS, animation class, style vars), the stops' positions and the
 * 1 -> 2 migration from shares to positions.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';
const { gradientRender, gradientLayer, stopPositions, sharesToPositions, gradientSpeed, loopGeometry, loopGradientCss } = await engineImport('backgrounds/gradient.js');
const { lift } = await engineImport('migrate.js');

test('linear gradient: the stops sit at their positions', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 90,
    stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }],
  });
  assert.equal(r.background, 'linear-gradient(90deg, #000000 25%, #ffffff 75%)');
  assert.equal(r.className, null);
});

test('the stops are read in position order, stable at one position, so a hard edge keeps its colors the way round they were given', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 0,
    stops: [{ color: '#bbbbbb', at: 90 }, { color: '#000000', at: 50 }, { color: '#ff0000', at: 50 }, { color: '#cccccc', at: 10 }],
  });
  assert.equal(r.background, 'linear-gradient(0deg, #cccccc 10%, #000000 50%, #ff0000 50%, #bbbbbb 90%)');
});

test('a stop with its own opacity is mixed towards transparent', () => {
  const r = gradientRender({ kind: 'linear', angle: 180, stops: [{ color: '#000000', at: 0, alpha: 0 }, { color: 'accent', at: 100, alpha: 0.7 }] });
  assert.equal(r.background, 'linear-gradient(180deg, color-mix(in srgb, #000000 0%, transparent) 0%, color-mix(in srgb, var(--urd-color-accent) 70%, transparent) 100%)');
});

test('missing positions spread the stops evenly, a bare color string is a stop, and a position outside 0 to 100 is clamped', () => {
  assert.deepEqual(stopPositions([{ color: '#000000' }, '#ffffff', { color: '#ff0000' }]), [
    { color: '#000000', at: 0, alpha: 1 },
    { color: '#ffffff', at: 50, alpha: 1 },
    { color: '#ff0000', at: 100, alpha: 1 },
  ]);
  assert.deepEqual(stopPositions([{ color: '#000000', at: -5 }, { color: '#ffffff', at: 140 }]).map((s) => s.at), [0, 100]);
  assert.equal(gradientRender({ kind: 'linear', angle: 0, stops: [] }).background, 'linear-gradient(0deg, #0b0e14 0%, #1a1030 100%)');
});

test('the 1 -> 2 migration puts each color at the center of its band, so the gradient looks the same', () => {
  assert.deepEqual(sharesToPositions([{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }]), [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }]);
  assert.deepEqual(sharesToPositions([{ color: '#aaaaaa', share: 150 }, { color: '#bbbbbb', share: 50 }]).map((s) => s.at), [37.5, 87.5]);
  // A share of 0 was a hard edge: the color lands on its neighbors' boundary.
  assert.deepEqual(sharesToPositions([{ color: '#000000', share: 50 }, { color: '#ff0000', share: 0 }, { color: '#ffffff', share: 50 }]).map((s) => s.at), [25, 50, 75]);
  // Missing shares, and stops stored as bare strings (the hero preset before 0.7.10.15), spread evenly.
  assert.deepEqual(sharesToPositions(['#0b0e14', '#1a1030']), [{ color: '#0b0e14', at: 25 }, { color: '#1a1030', at: 75 }]);
  const lifted = lift({ type: 'gradient', version: 1, props: { kind: 'linear', angle: 160, animation: 'pan', stops: [{ color: '#00fff5', share: 50 }, { color: '#00a19b', share: 50 }] } }, gradientLayer);
  assert.equal(lifted.ok, true);
  assert.equal(lifted.version, 2);
  assert.deepEqual(lifted.props, { kind: 'linear', angle: 160, animation: 'pan', stops: [{ color: '#00fff5', at: 25 }, { color: '#00a19b', at: 75 }] });
  assert.equal(gradientRender(lifted.props).runner.background, 'linear-gradient(160deg, #00fff5 25%, #00a19b 75%)');
});

test('radial gradient uses center x/y in percent', () => {
  const r = gradientRender({
    kind: 'radial',
    x: 0.3,
    y: 0.2,
    stops: [{ color: '#111111', at: 25 }, { color: '#222222', at: 75 }],
  });
  assert.equal(r.background, 'radial-gradient(circle at 30% 20%, #111111 25%, #222222 75%)');
});

test('theme color token resolves to a CSS variable', () => {
  const r = gradientRender({ kind: 'linear', angle: 45, stops: [{ color: 'accent', at: 25 }, { color: 'bg', at: 75 }] });
  assert.ok(r.background.includes('var(--urd-color-accent) 25%'));
  assert.ok(r.background.includes('var(--urd-color-bg) 75%'));
});

test('pan-loop gives a circular cycle that follows the angle, with the widest band as the period\'s room', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 160,
    animation: 'pan-loop',
    stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }],
  });
  // The cycle appears once (no color is visible twice at the same time), and
  // ends with the first color - the transition back is the loop itself.
  assert.equal(r.background, null);
  assert.equal(r.loop.angle, 160);
  assert.equal(r.loop.maxShare, 0.5);
  assert.deepEqual(r.loop.stops, [
    { color: '#000000', alpha: 1, at: 0 },
    { color: '#ffffff', alpha: 1, at: 50 },
    { color: '#000000', alpha: 1, at: 100 },
  ]);
});

test('pan-loop with three colors reads 1 2 3 and glides back to 1', () => {
  const r = gradientRender({
    kind: 'linear',
    animation: 'pan-loop',
    stops: [{ color: '#ff0000', at: 15 }, { color: '#00ff00', at: 50 }, { color: '#0000ff', at: 85 }],
  });
  // Shifted so color 1 sits at 0, with color 1 as the finish at 100; the
  // widest band is the middle one, from 32.5 to 67.5.
  assert.deepEqual(r.loop.stops.map((s) => s.at), [0, 35, 70, 100]);
  assert.equal(r.loop.maxShare, 0.35);
});

test('loopGeometry: the period is the line plus room for the widest color', () => {
  // 2 equal colors (maxShare 0.5): the period is double the line - only then
  // is the hidden part large enough that a half is never split.
  assert.deepEqual(loopGeometry(1000, 500, 90, 0.5), { period: 2000, dx: 2000, dy: 0 });
  // 7 equal colors: only 1/6 longer than the line (the colors keep roughly
  // a static size).
  const g7 = loopGeometry(1200, 0, 90, 1 / 7);
  assert.ok(Math.abs(g7.period - 1400) < 0.05, `period ${g7.period}`);
  // 0 degrees (upwards): the gradient line is the height, the offset upwards.
  assert.deepEqual(loopGeometry(1000, 500, 0, 0.5), { period: 1000, dx: 0, dy: -1000 });
  // 180 degrees (downwards): the offset downwards.
  assert.deepEqual(loopGeometry(1000, 500, 180, 0.5), { period: 1000, dx: 0, dy: 1000 });
  // Slanted angle: the offset's length is exactly one period along the axis.
  const g = loopGeometry(1000, 500, 160, 0.25);
  const expected = (Math.abs(1000 * Math.sin((160 * Math.PI) / 180)) + Math.abs(500 * Math.cos((160 * Math.PI) / 180))) / 0.75;
  assert.ok(Math.abs(g.period - expected) < 0.05, `period ${g.period} vs ${expected}`);
  assert.ok(Math.abs(Math.hypot(g.dx, g.dy) - g.period) < 0.05);
  // The direction points where the gradient flows (downward component at 160 degrees).
  assert.ok(g.dx > 0 && g.dy > 0);
  // An extremely dominant color is clamped (never division by zero).
  assert.ok(loopGeometry(1000, 0, 90, 1).period === 10000);
});

test('loopGradientCss builds a repeating gradient in px of the period, with a stop\'s opacity kept', () => {
  const css = loopGradientCss(
    [{ color: '#ff0000', at: 0 }, { color: 'accent', at: 50, alpha: 0.5 }, { color: '#ff0000', at: 100 }],
    160,
    800,
  );
  assert.equal(css, 'repeating-linear-gradient(160deg, #ff0000 0px, color-mix(in srgb, var(--urd-color-accent) 50%, transparent) 400px, #ff0000 800px)');
});

test('rotate uses the registered angle variable', () => {
  const r = gradientRender({ kind: 'linear', angle: 160, animation: 'rotate', stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }] });
  assert.ok(r.background.startsWith('linear-gradient(calc(var(--urd-grad-spin, 0deg) + 160deg),'));
  assert.equal(r.className, 'urd-bg-rotate');
});

test('pan gives a 200% runner with the gradient (transform, not background-position)', () => {
  const r = gradientRender({ kind: 'linear', angle: 90, animation: 'pan', stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }] });
  assert.equal(r.background, null);
  assert.equal(r.className, null);
  assert.equal(r.runner.className, 'urd-bg-pan-runner');
  assert.equal(r.runner.background, 'linear-gradient(90deg, #000000 25%, #ffffff 75%)');
  // Pan has no anchoring: the runner sits at the host's top left.
  assert.equal(r.runner.left, undefined);
  assert.equal(r.runner.top, undefined);
});

test('orbit gives a 200% runner anchored so the center stays in place', () => {
  const r = gradientRender({ kind: 'radial', x: 0.7, y: 0.2, animation: 'orbit', stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }] });
  assert.equal(r.background, null);
  assert.equal(r.className, null);
  assert.equal(r.runner.className, 'urd-bg-orbit-runner');
  assert.equal(r.runner.background, 'radial-gradient(circle at 70% 20%, #000000 25%, #ffffff 75%)');
  // The anchoring -x/-y (of the surface) puts the runner's point (x, y) on
  // the surface's point (x, y): the center sits where it sits unanimated.
  assert.equal(r.runner.left, '-70%');
  assert.equal(r.runner.top, '-20%');
});

test('pulse passes the layer strength to the breathing animation', () => {
  const r = gradientRender({ kind: 'radial', animation: 'pulse', opacity: 0.8, stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }] });
  assert.equal(r.className, 'urd-bg-pulse');
  assert.equal(r.styles['--urd-bg-op'], '0.8');
});

test('an animation that does not exist for the shape renders unanimated', () => {
  const r = gradientRender({ kind: 'radial', animation: 'rotate', stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }] });
  assert.equal(r.className, null);
  const r2 = gradientRender({ kind: 'linear', angle: 0, animation: 'pulse', stops: [{ color: '#000000', at: 25 }, { color: '#ffffff', at: 75 }] });
  assert.equal(r2.className, null);
});

test('the layer is version 2 with defaults at the ends', () => {
  assert.equal(gradientLayer.version, 2);
  assert.deepEqual(gradientLayer.defaults().stops, [{ color: '#0b0e14', at: 0 }, { color: '#1a1030', at: 100 }]);
});

test('the speed is written as the time per round, inside its bounds, and each animation keeps its own pace without one', () => {
  const stops = [{ color: '#000000', at: 0 }, { color: '#ffffff', at: 100 }];
  assert.equal(gradientRender({ kind: 'linear', animation: 'pan', speed: 12, stops }).styles['--urd-grad-time'], '12s');
  assert.equal(gradientRender({ kind: 'radial', animation: 'pulse', speed: 200, stops }).styles['--urd-grad-time'], '90s');
  assert.equal(gradientRender({ kind: 'linear', animation: 'rotate', stops }).styles['--urd-grad-time'], undefined);
  assert.equal(gradientRender({ kind: 'linear', animation: 'none', speed: 12, stops }).styles['--urd-grad-time'], undefined);
  assert.equal(gradientSpeed({}, 'orbit'), 26);
  assert.equal(gradientSpeed({ speed: 1 }, 'pan-loop'), 3);
});
