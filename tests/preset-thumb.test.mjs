/**
 * Kontraktstester for miniatyr-generatoren (preset-thumb.js): skissene
 * tegnes fra faktiske preset-data, og fidelitetsreglene som testrundene
 * har avdekket vaktes her - overskrifter forsvinner aldri fra sidebåndene,
 * tomme mediablokker tegnes tomme, og innholdet står innrykket som på den
 * bundne innholdsflaten (ADR-0018).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { presetThumb, pageThumb, parseMinHeightPx } = await engineImport('preset-thumb.js');

const textBlock = (html, extra = {}) => ({
  type: 'text',
  frames: { desktop: { x: 0, y: 0, w: 60, h: 38 } },
  props: { html, ...extra },
});

const section = (blocks, minHeight = '400px') => ({
  size: { minHeight },
  background: { layers: [] },
  blocks,
});

test('parseMinHeightPx: px, vh og søppel', () => {
  assert.equal(parseMinHeightPx('360px'), 360);
  assert.equal(parseMinHeightPx('70vh'), 560);
  assert.equal(parseMinHeightPx('tull'), 400);
});

test('sidebånd: overskriften tegnes også når båndet er lavt', () => {
  // Fem seksjoner på 400 px gir bånd på ~22 px og sy ≈ 0,06: den gamle
  // generatoren droppet da alle tekstlinjene (absolutt linjehøyde + avbrudd).
  const page = { sections: Array.from({ length: 5 }, () => section([textBlock('<h2>Tittel</h2>')])) };
  const svg = pageThumb(page);
  assert.match(svg, /opacity="0\.8"/, 'første tekstlinje (overskriftssporet) mangler i båndet');
});

test('tomt bilde tegnes som tom tilstand, satt bilde som fylt', () => {
  const empty = presetThumb(section([{ type: 'image', frames: { desktop: { x: 10, y: 20, w: 40, h: 200 } }, props: { src: '' } }]));
  assert.match(empty, /stroke-dasharray/, 'tomt bilde skal ha stiplet omriss');
  const filled = presetThumb(section([{ type: 'image', frames: { desktop: { x: 10, y: 20, w: 40, h: 200 } }, props: { src: '/media/x.jpg' } }]));
  assert.ok(!filled.includes('stroke-dasharray'), 'satt bilde skal tegnes fylt');
});

test('tomt galleri tegnes tomt, fylt galleri fylt', () => {
  const empty = presetThumb(section([{ type: 'galleri', frames: { desktop: { x: 5, y: 20, w: 90, h: 200 } }, props: { images: [] } }]));
  assert.match(empty, /stroke-dasharray/);
  const filled = presetThumb(section([{ type: 'galleri', frames: { desktop: { x: 5, y: 20, w: 90, h: 200 } }, props: { images: ['/media/a.jpg'] } }]));
  assert.ok(!filled.includes('stroke-dasharray'));
});

test('faq tegnes som trekkspillrader, ikke tomt kort', () => {
  const svg = presetThumb(section([{ type: 'faq', frames: { desktop: { x: 10, y: 20, w: 80, h: 240 } }, props: { items: [] } }]));
  // Minst to rader (flate + spørsmålslinje per rad) pluss bakgrunnen.
  const rects = svg.match(/<rect/g) ?? [];
  assert.ok(rects.length >= 5, `faq skal tegne rader, fikk ${rects.length} rects`);
  assert.match(svg, /<circle/, 'chevron-prikken mangler');
});

test('box-tekst får kortflate bak linjene', () => {
  const svg = presetThumb(section([textBlock('<p>tekst</p>', { box: true })]));
  assert.match(svg, /--urd-color-surface/, 'kortflaten (surface) mangler for box-tekst');
});

test('innholdet står innrykket fra kanten (den bundne flaten)', () => {
  const svg = presetThumb(section([textBlock('<h2>x</h2>')]));
  // Blokken har x: 0, men skal tegnes fra sidemargen, aldri fra kant.
  assert.ok(!/<rect x="0(\.0)?" y="[^"]*" width="[^"]*" height="[^"]*" fill="var\(--urd-color-text/.test(svg),
    'tekstlinjen starter helt i kanten uten innrykk');
});

test('tom side gir rent bakgrunnsfelt', () => {
  const svg = pageThumb({ sections: [] });
  assert.match(svg, /--urd-color-bg/);
});

test('rollesett overtoner bakgrunnen i skissen (dyp = tekst-token, dus = surface)', () => {
  const dyp = presetThumb({ ...section([textBlock('<h2>x</h2>')]), theme: 'dyp' });
  assert.match(dyp, /^<svg[^>]*>\s*<rect[^>]*fill="var\(--urd-color-text/, 'dyp-bånd skal ha tekst-tonet bakgrunn');
  const dus = presetThumb({ ...section([textBlock('<h2>x</h2>')]), theme: 'dus' });
  assert.match(dus, /^<svg[^>]*>\s*<rect[^>]*fill="var\(--urd-color-surface/, 'dus-bånd skal ha surface-tonet bakgrunn');
});
