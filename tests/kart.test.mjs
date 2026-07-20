/**
 * Kontraktstester for kart-pluginens rene OSM-logikk (posisjonstolking,
 * innbyggings-URL, større-kart-lenke). DOM-rendering testes manuelt.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseLocation, buildEmbedUrl, buildLargerMapUrl, OSM_HOST } from '../template/plugins/kart/osm.js';

test('parseLocation: rene koordinater med komma eller mellomrom', () => {
  assert.deepEqual(parseLocation('59.913, 10.739'), { lat: 59.913, lon: 10.739, zoom: null });
  assert.deepEqual(parseLocation('59.913 10.739'), { lat: 59.913, lon: 10.739, zoom: null });
  assert.deepEqual(parseLocation('-33.87 151.21'), { lat: -33.87, lon: 151.21, zoom: null });
});

test('parseLocation: OSM-lenke med #map=zoom/lat/lon', () => {
  assert.deepEqual(
    parseLocation('https://www.openstreetmap.org/#map=15/59.9130/10.7390'),
    { lat: 59.913, lon: 10.739, zoom: 15 },
  );
});

test('parseLocation: OSM-lenke med markør-parametre', () => {
  assert.deepEqual(
    parseLocation('https://www.openstreetmap.org/?mlat=59.913&mlon=10.739#map=12/59/10'),
    { lat: 59.913, lon: 10.739, zoom: 12 },
  );
});

test('parseLocation: ugyldig innskriving gir null', () => {
  assert.equal(parseLocation('Storgata 1, Oslo'), null);
  assert.equal(parseLocation(''), null);
  assert.equal(parseLocation('bare tekst'), null);
});

test('parseLocation: klemmer verdier utenfor gyldig område', () => {
  const loc = parseLocation('99, 200');
  assert.equal(loc.lat, 85);
  assert.equal(loc.lon, 180);
});

test('buildEmbedUrl: offisiell OSM-iframe med bbox og markør', () => {
  const url = buildEmbedUrl({ lat: 59.913, lon: 10.739, zoom: 15 });
  assert.ok(url.startsWith('https://www.openstreetmap.org/export/embed.html?'));
  assert.match(url, /layer=mapnik/);
  assert.match(url, /marker=59\.91300%2C10\.73900/);
  assert.match(url, /bbox=/);
});

test('buildEmbedUrl: høyere zoom gir smalere bbox', () => {
  const wide = new URLSearchParams(buildEmbedUrl({ lat: 0, lon: 0, zoom: 5 }).split('?')[1]).get('bbox');
  const tight = new URLSearchParams(buildEmbedUrl({ lat: 0, lon: 0, zoom: 16 }).split('?')[1]).get('bbox');
  const width = (b) => { const p = b.split(',').map(Number); return p[2] - p[0]; };
  assert.ok(width(tight) < width(wide));
});

test('buildLargerMapUrl: peker til openstreetmap.org for punktet', () => {
  const url = buildLargerMapUrl({ lat: 59.913, lon: 10.739, zoom: 15 });
  assert.ok(url.startsWith(`${OSM_HOST}/?mlat=59.91300&mlon=10.73900`));
  assert.match(url, /#map=15\//);
});
