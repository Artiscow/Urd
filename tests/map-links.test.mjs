/**
 * The map links (map-links.js): the services a site can choose between and
 * the search each of them is given for a place written as text.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { MAP_SERVICES, mapService, mapQuery, mapSearchUrl } = await engineImport('map-links.js');

const PLACE = 'Mormors Stue, Nedre Enkeltskillingsveita 2, 7011 Trondheim, Norge';

test('mapService: the stored service, else OpenStreetMap', () => {
  assert.equal(MAP_SERVICES[0], 'osm');
  assert.equal(mapService({ site: { mapService: 'apple' } }), 'apple');
  assert.equal(mapService({ site: {} }), 'osm');
  assert.equal(mapService({ site: { mapService: 'toString' } }), 'osm');
  assert.equal(mapService(null), 'osm');
});

test('mapQuery: a venue name in front of an address is left out for a service that knows addresses only', () => {
  assert.equal(mapQuery(PLACE), 'Nedre Enkeltskillingsveita 2, 7011 Trondheim, Norge');
  assert.equal(mapQuery('The hall, Storgata 1'), 'Storgata 1');
  // An address first, a place without a number, and one part are asked for as they are.
  assert.equal(mapQuery('Storgata 1, 7011 Trondheim'), 'Storgata 1, 7011 Trondheim');
  assert.equal(mapQuery('Trondheim, Norge'), 'Trondheim, Norge');
  assert.equal(mapQuery('The clubhouse'), 'The clubhouse');
  assert.equal(mapQuery(''), '');
});

test('mapQuery: each service gets the search it finds', () => {
  // A service with a register of venues gets the whole place.
  for (const service of ['duckduckgo', 'brave', 'here', 'google', 'apple', 'finn']) assert.equal(mapQuery(PLACE, service), PLACE);
  // Norgeskart finds nothing with the country in the search.
  assert.equal(mapQuery(PLACE, 'norgeskart'), 'Nedre Enkeltskillingsveita 2, 7011 Trondheim');
  assert.equal(mapQuery('Norge', 'norgeskart'), 'Norge');
});

test('mapSearchUrl: an https address on the service own host, with the search encoded', () => {
  const hosts = { osm: 'www.openstreetmap.org', duckduckgo: 'duckduckgo.com', brave: 'search.brave.com', here: 'wego.here.com', google: 'www.google.com', apple: 'maps.apple.com', norgeskart: 'norgeskart.no', finn: 'kart.finn.no' };
  assert.deepEqual(Object.keys(hosts), MAP_SERVICES);
  for (const service of MAP_SERVICES) {
    const url = new URL(mapSearchUrl('A & B, Storgata 1', service));
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, hosts[service]);
    // The search is a query value, or the last part of the path.
    assert.ok([...url.searchParams.values(), decodeURIComponent(url.pathname)].some((value) => value.includes('Storgata 1')), service);
  }
  assert.equal(mapSearchUrl('Storgata 1', 'nowhere'), mapSearchUrl('Storgata 1', 'osm'));
  assert.equal(new URL(mapSearchUrl('A & B', 'google')).searchParams.get('query'), 'A & B');
  assert.equal(new URL(mapSearchUrl('A/B, Storgata 1', 'here')).pathname, '/search/A%2FB%2C%20Storgata%201');
});

test('mapSearchUrl: a feed own point opens the point where the service has an address for one', () => {
  const geo = { lat: 63.4327, lon: 10.395 };
  const osm = new URL(mapSearchUrl('The hall', 'osm', geo));
  assert.equal(osm.searchParams.get('mlat'), '63.4327');
  assert.equal(osm.hash, '#map=17/63.4327/10.395');
  const apple = new URL(mapSearchUrl('The hall', 'apple', geo));
  assert.equal(apple.searchParams.get('ll'), '63.4327,10.395');
  assert.equal(apple.searchParams.get('q'), 'The hall');
  // Google Maps knows the venue by its words, and takes the point for a place without them.
  assert.equal(mapSearchUrl('The hall', 'google', geo), mapSearchUrl('The hall', 'google'));
  assert.equal(new URL(mapSearchUrl('', 'google', geo)).searchParams.get('query'), '63.4327,10.395');
  // A service without an address for a point searches by the words, and without words the point opens in OpenStreetMap.
  assert.equal(mapSearchUrl('The hall', 'finn', geo), mapSearchUrl('The hall', 'finn'));
  assert.equal(new URL(mapSearchUrl('', 'finn', geo)).hostname, 'www.openstreetmap.org');
  // A point outside the globe is no point.
  assert.equal(mapSearchUrl('The hall', 'osm', { lat: 120, lon: 10 }), mapSearchUrl('The hall', 'osm'));
});
