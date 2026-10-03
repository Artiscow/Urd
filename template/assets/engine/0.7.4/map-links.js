/**
 * The link from a place written as text («The hall, Storgata 1, 7011
 * Trondheim») to a map: the map services a site can choose between
 * (`site.mapService`), and the search each of them is given. A link only:
 * nothing is loaded from a service until the visitor follows it. Pure and
 * DOM-free, loaded by the blocks that draw a place and bundled by the editor
 * for the list of services.
 */

/** The services in the order they are offered, the default first. The search is appended to `url`, as a query value or, for HERE WeGo, as the last part of the path. `names` marks a service that knows venues by name, so the name is kept in its search. */
const SERVICES = {
  osm: { url: 'https://www.openstreetmap.org/search?query=', names: false },
  duckduckgo: { url: 'https://duckduckgo.com/?iaxm=maps&q=', names: true },
  brave: { url: 'https://search.brave.com/maps?q=', names: true },
  here: { url: 'https://wego.here.com/search/', names: true },
  google: { url: 'https://www.google.com/maps/search/?api=1&query=', names: true },
  apple: { url: 'https://maps.apple.com/search?query=', names: true },
  norgeskart: { url: 'https://norgeskart.no/?sok=', names: false },
  finn: { url: 'https://kart.finn.no/?q=', names: true },
};

export const MAP_SERVICES = Object.keys(SERVICES);

/** The site's map service: the stored id when it is one of the services, else OpenStreetMap. */
export function mapService(site) {
  const id = site?.site?.mapService;
  return Object.hasOwn(SERVICES, id) ? id : 'osm';
}

const COUNTRY = /^(norge|noreg|norway|norga)$/i;

/**
 * What a service is asked for. A service with a register of venues gets the
 * place as it is written. One that knows addresses only gets it without a
 * venue's name in front of its address («The hall, Storgata 1, 7011
 * Trondheim» is searched as «Storgata 1, 7011 Trondheim»); a place without
 * a number in it is asked for as it is. Norgeskart searches Norway alone and
 * finds nothing with the country's name in the search.
 */
export function mapQuery(place, service = 'osm') {
  let parts = String(place ?? '').split(',').map((part) => part.trim()).filter(Boolean);
  if (SERVICES[service]?.names) return parts.join(', ');
  const rest = parts.slice(1);
  if (parts.length > 1 && !/\d/.test(parts[0]) && rest.some((part) => /\d/.test(part))) parts = rest;
  if (service === 'norgeskart' && parts.length > 1 && COUNTRY.test(parts[parts.length - 1])) parts = parts.slice(0, -1);
  return parts.join(', ');
}

/** The address that opens a place in a map service; an unknown service is OpenStreetMap. */
export function mapSearchUrl(place, service = 'osm') {
  const id = Object.hasOwn(SERVICES, service) ? service : 'osm';
  return SERVICES[id].url + encodeURIComponent(mapQuery(place, id));
}
