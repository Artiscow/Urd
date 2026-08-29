/**
 * Analytics-referansepluginen (SEO-pakken, funksjonskartet C14):
 * personvennlig besøksmåling via Cloudflare Web Analytics - ingen cookies,
 * ingen fingerprinting, sporingsfri kjerne. Pluginen registrerer ingen
 * blokker: den legger kun målescriptet på besøkende sider når token er
 * satt i plugin.json (git-eid oppsett, se README.md).
 *
 * CSP (ADR-0006): script-src- og connect-src-unntakene deklareres i
 * manifestet; Plugins-panelet viser eieren de nøyaktige _headers-linjene.
 */
export async function register() {
  // Aldri i editorens preview: redigeringsøkter er ikke besøk.
  if (new URLSearchParams(location.search).has('preview')) return;
  let config;
  try {
    config = (await (await fetch('/plugins/analytics/plugin.json')).json()).config;
  } catch {
    return;
  }
  const token = config?.token;
  if (typeof token !== 'string' || !token) return;
  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({ token });
  document.head.appendChild(beacon);
}
