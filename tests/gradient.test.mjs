/**
 * Kontraktstester for gradient-laget v3: gradientRender (ren
 * render-oppskrift: CSS, animasjonsklasse, style-vars) og
 * migreringskjeden v1 → v2 → v3.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { gradientRender, gradientLayer, loopGeometry, loopGradientCss } from '../template/assets/engine/backgrounds/gradient.js';
import { lift } from '../template/assets/engine/migrate.js';

test('lineær gradient: like andeler gir båndsentre 25/75', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 90,
    stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }],
  });
  assert.equal(r.background, 'linear-gradient(90deg, #000000 25%, #ffffff 75%)');
  assert.equal(r.className, null);
});

test('andelene er vekter: 75/25 normaliseres uansett sum', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 0,
    stops: [{ color: '#aaaaaa', share: 150 }, { color: '#bbbbbb', share: 50 }],
  });
  assert.equal(r.background, 'linear-gradient(0deg, #aaaaaa 37.5%, #bbbbbb 87.5%)');
});

test('rekkefølgen er listens rekkefølge, aldri sortert', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 0,
    stops: [{ color: '#cccccc', share: 20 }, { color: '#aaaaaa', share: 60 }, { color: '#bbbbbb', share: 20 }],
  });
  assert.equal(r.background, 'linear-gradient(0deg, #cccccc 10%, #aaaaaa 50%, #bbbbbb 90%)');
});

test('plass 0 gir hard kant (sentrum på båndgrensen)', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 0,
    stops: [{ color: '#000000', share: 50 }, { color: '#ff0000', share: 0 }, { color: '#ffffff', share: 50 }],
  });
  assert.equal(r.background, 'linear-gradient(0deg, #000000 25%, #ff0000 50%, #ffffff 75%)');
});

test('manglende/ugyldige andeler faller til lik fordeling', () => {
  const r = gradientRender({ kind: 'linear', angle: 0, stops: [{ color: '#000000' }, { color: '#ffffff' }] });
  assert.equal(r.background, 'linear-gradient(0deg, #000000 25%, #ffffff 75%)');
});

test('radiell gradient bruker sentrum x/y i prosent', () => {
  const r = gradientRender({
    kind: 'radial',
    x: 0.3,
    y: 0.2,
    stops: [{ color: '#111111', share: 50 }, { color: '#222222', share: 50 }],
  });
  assert.equal(r.background, 'radial-gradient(circle at 30% 20%, #111111 25%, #222222 75%)');
});

test('temafarge-token løses til CSS-variabel', () => {
  const r = gradientRender({ kind: 'linear', angle: 45, stops: [{ color: 'accent', share: 50 }, { color: 'bg', share: 50 }] });
  assert.ok(r.background.includes('var(--urd-color-accent) 25%'));
  assert.ok(r.background.includes('var(--urd-color-bg) 75%'));
});

test('pan-loop gir en sirkulær syklus som følger vinkelen', () => {
  const r = gradientRender({
    kind: 'linear',
    angle: 160,
    animation: 'pan-loop',
    stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }],
  });
  // Syklusen ligger én gang (ingen farge synes to ganger samtidig), og
  // avsluttes med første farge - overgangen tilbake er selve loopen.
  assert.equal(r.background, null);
  assert.equal(r.loop.angle, 160);
  assert.equal(r.loop.maxShare, 0.5);
  assert.deepEqual(r.loop.stops, [
    { color: '#000000', at: 0 },
    { color: '#ffffff', at: 50 },
    { color: '#000000', at: 100 },
  ]);
});

test('pan-loop med tre farger leses 1 2 3 og glir tilbake til 1', () => {
  const r = gradientRender({
    kind: 'linear',
    animation: 'pan-loop',
    stops: [{ color: '#ff0000', share: 30 }, { color: '#00ff00', share: 40 }, { color: '#0000ff', share: 30 }],
  });
  // Sykliske sentre 0, 35, 70 (skiftet så farge 1 står på 0) + farge 1
  // som avslutning på 100.
  assert.deepEqual(r.loop.stops.map((s) => s.at), [0, 35, 70, 100]);
});

test('loopGeometry: perioden er linjen pluss plass til største farge', () => {
  // 2 like farger (maxShare 0.5): perioden er dobbel linje - først da er
  // den skjulte delen stor nok til at halvparten aldri splittes.
  assert.deepEqual(loopGeometry(1000, 500, 90, 0.5), { period: 2000, dx: 2000, dy: 0 });
  // 7 like farger: bare 1/6 lengre enn linjen (fargene beholder omtrent
  // statisk størrelse, eiers krav 24. juli 2026).
  const g7 = loopGeometry(1200, 0, 90, 1 / 7);
  assert.ok(Math.abs(g7.period - 1400) < 0.05, `period ${g7.period}`);
  // 0 grader (oppover): gradientlinjen er høyden, forskyvningen oppover.
  assert.deepEqual(loopGeometry(1000, 500, 0, 0.5), { period: 1000, dx: 0, dy: -1000 });
  // 180 grader (nedover): forskyvningen nedover.
  assert.deepEqual(loopGeometry(1000, 500, 180, 0.5), { period: 1000, dx: 0, dy: 1000 });
  // Skrå vinkel: forskyvningens lengde er nøyaktig én periode langs aksen.
  const g = loopGeometry(1000, 500, 160, 0.25);
  const expected = (Math.abs(1000 * Math.sin((160 * Math.PI) / 180)) + Math.abs(500 * Math.cos((160 * Math.PI) / 180))) / 0.75;
  assert.ok(Math.abs(g.period - expected) < 0.05, `period ${g.period} vs ${expected}`);
  assert.ok(Math.abs(Math.hypot(g.dx, g.dy) - g.period) < 0.05);
  // Retningen peker dit gradienten flyter (nedover-komponent ved 160 grader).
  assert.ok(g.dx > 0 && g.dy > 0);
  // En ekstremt dominant farge klemmes (aldri deling på null).
  assert.ok(loopGeometry(1000, 0, 90, 1).period === 10000);
});

test('loopGradientCss bygger gjentakende gradient i px av perioden', () => {
  const css = loopGradientCss(
    [{ color: '#ff0000', at: 0 }, { color: 'accent', at: 50 }, { color: '#ff0000', at: 100 }],
    160,
    800,
  );
  assert.equal(css, 'repeating-linear-gradient(160deg, #ff0000 0px, var(--urd-color-accent) 400px, #ff0000 800px)');
});

test('rotate bruker den registrerte vinkel-variabelen', () => {
  const r = gradientRender({ kind: 'linear', angle: 160, animation: 'rotate', stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }] });
  assert.ok(r.background.startsWith('linear-gradient(calc(var(--urd-grad-spin, 0deg) + 160deg),'));
  assert.equal(r.className, 'urd-bg-rotate');
});

test('orbit setter posisjons-vars som holder sentrum på plass', () => {
  const r = gradientRender({ kind: 'radial', x: 0.7, y: 0.2, animation: 'orbit', stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }] });
  assert.equal(r.className, 'urd-bg-orbit');
  assert.equal(r.styles['--urd-bg-px'], '70%');
  assert.equal(r.styles['--urd-bg-py'], '20%');
  assert.equal(r.styles['background-size'], '200% 200%');
  assert.equal(r.styles['background-repeat'], 'no-repeat');
});

test('pulse sender lagets styrke til pust-animasjonen', () => {
  const r = gradientRender({ kind: 'radial', animation: 'pulse', opacity: 0.8, stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }] });
  assert.equal(r.className, 'urd-bg-pulse');
  assert.equal(r.styles['--urd-bg-op'], '0.8');
});

test('animasjon som ikke finnes for formen rendres uanimert', () => {
  const r = gradientRender({ kind: 'radial', animation: 'rotate', stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }] });
  assert.equal(r.className, null);
  const r2 = gradientRender({ kind: 'linear', angle: 0, animation: 'pulse', stops: [{ color: '#000000', share: 50 }, { color: '#ffffff', share: 50 }] });
  assert.equal(r2.className, null);
});

test('migrering v1 til v3: strenger blir andeler, jevnt fordelt', () => {
  const res = lift(
    { type: 'gradient', version: 1, props: { stops: ['#000000', '#888888', '#ffffff'], angle: 120, animate: false } },
    gradientLayer,
  );
  assert.equal(res.ok, true);
  assert.equal(res.version, 3);
  assert.equal(res.props.kind, 'linear');
  assert.equal(res.props.animation, 'none');
  // v1-posisjonene 0/50/100 gir båndgrenser 0/25/75/100 -> andeler 25/50/25.
  assert.deepEqual(res.props.stops, [
    { color: '#000000', share: 25 },
    { color: '#888888', share: 50 },
    { color: '#ffffff', share: 25 },
  ]);
  assert.equal(res.props.angle, 120);
});

test('migrering v2 til v3: usorterte posisjoner sorteres inn i rekkefølgen', () => {
  const res = lift(
    { type: 'gradient', version: 2, props: { kind: 'radial', x: 0.3, y: 0.2, stops: [{ color: '#ffffff', at: 100 }, { color: '#0000ff', at: 43 }], angle: 160, animate: false } },
    gradientLayer,
  );
  assert.equal(res.version, 3);
  assert.equal(res.props.kind, 'radial');
  assert.equal(res.props.x, 0.3);
  // Grensen mellom 43 og 100 er 71.5 -> andeler 71.5 og 28.5, blå først.
  assert.deepEqual(res.props.stops, [
    { color: '#0000ff', share: 71.5 },
    { color: '#ffffff', share: 28.5 },
  ]);
});

test('migrering: animate true blir pan (lineær) og orbit (radiell)', () => {
  const lin = lift({ type: 'gradient', version: 2, props: { kind: 'linear', stops: [{ color: '#000000', at: 0 }, { color: '#ffffff', at: 100 }], angle: 0, animate: true } }, gradientLayer);
  assert.equal(lin.props.animation, 'pan');
  const rad = lift({ type: 'gradient', version: 2, props: { kind: 'radial', stops: [{ color: '#000000', at: 0 }, { color: '#ffffff', at: 100 }], animate: true } }, gradientLayer);
  assert.equal(rad.props.animation, 'orbit');
});

test('migrering av tom/ugyldig stoppliste faller til standardfargene', () => {
  const res = lift({ type: 'gradient', version: 1, props: { stops: [], angle: 160, animate: false } }, gradientLayer);
  assert.equal(res.ok, true);
  assert.equal(res.props.stops.length, 2);
  assert.ok(res.props.stops.every((s) => typeof s.share === 'number'));
});
