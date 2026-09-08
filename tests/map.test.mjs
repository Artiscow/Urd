/**
 * Contract tests for the map plugin's pure OSM logic (location parsing,
 * embed URL, larger-map link). DOM rendering is tested manually.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseLocation, buildEmbedUrl, buildLargerMapUrl, OSM_HOST } from '../template/plugins/map/osm.js';

test('parseLocation: plain coordinates with comma or space', () => {
  assert.deepEqual(parseLocation('59.913, 10.739'), { lat: 59.913, lon: 10.739, zoom: null });
  assert.deepEqual(parseLocation('59.913 10.739'), { lat: 59.913, lon: 10.739, zoom: null });
  assert.deepEqual(parseLocation('-33.87 151.21'), { lat: -33.87, lon: 151.21, zoom: null });
});

test('parseLocation: OSM link with #map=zoom/lat/lon', () => {
  assert.deepEqual(
    parseLocation('https://www.openstreetmap.org/#map=15/59.9130/10.7390'),
    { lat: 59.913, lon: 10.739, zoom: 15 },
  );
});

test('parseLocation: OSM link with marker parameters', () => {
  assert.deepEqual(
    parseLocation('https://www.openstreetmap.org/?mlat=59.913&mlon=10.739#map=12/59/10'),
    { lat: 59.913, lon: 10.739, zoom: 12 },
  );
});

test('parseLocation: invalid input gives null', () => {
  // Deliberate Norwegian inputs: a street address and plain text, not coordinates.
  assert.equal(parseLocation('Storgata 1, Oslo'), null);
  assert.equal(parseLocation(''), null);
  assert.equal(parseLocation('bare tekst'), null);
});

test('parseLocation: clamps values outside the valid range', () => {
  const loc = parseLocation('99, 200');
  assert.equal(loc.lat, 85);
  assert.equal(loc.lon, 180);
});

test('buildEmbedUrl: official OSM iframe with bbox and marker', () => {
  const url = buildEmbedUrl({ lat: 59.913, lon: 10.739, zoom: 15 });
  assert.ok(url.startsWith('https://www.openstreetmap.org/export/embed.html?'));
  assert.match(url, /layer=mapnik/);
  assert.match(url, /marker=59\.91300%2C10\.73900/);
  assert.match(url, /bbox=/);
});

test('buildEmbedUrl: higher zoom gives a narrower bbox', () => {
  const wide = new URLSearchParams(buildEmbedUrl({ lat: 0, lon: 0, zoom: 5 }).split('?')[1]).get('bbox');
  const tight = new URLSearchParams(buildEmbedUrl({ lat: 0, lon: 0, zoom: 16 }).split('?')[1]).get('bbox');
  const width = (b) => { const p = b.split(',').map(Number); return p[2] - p[0]; };
  assert.ok(width(tight) < width(wide));
});

test('buildLargerMapUrl: points to openstreetmap.org for the spot', () => {
  const url = buildLargerMapUrl({ lat: 59.913, lon: 10.739, zoom: 15 });
  assert.ok(url.startsWith(`${OSM_HOST}/?mlat=59.91300&mlon=10.73900`));
  assert.match(url, /#map=15\//);
});
