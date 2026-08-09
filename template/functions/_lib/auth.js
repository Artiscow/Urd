/**
 * Delt auth-prolog for muterende endepunkter (v0.6 M1, teknisk opprydding).
 * Samler det som før var duplisert i commit.js og revert.js: konfig, CSRF-sjekk
 * (Sec-Fetch-Site med Origin som reserve), cookie-token, GitHub-brukeroppslag
 * og ALLOWED_LOGINS-håndhevelse.
 */
import { cfg, currentUser } from './github.js';
import { readCookie } from './cookies.js';
import { isAllowedLogin } from './guard.js';

const json = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

/**
 * Er dette kallet fra et FREMMED nettsted? Ren funksjon, testet i tests/auth.test.mjs.
 *
 * Gjelder ALLE metoder, ikke bare de muterende: hjelperen brukes kun av
 * innloggede endepunkter (publisering, angring, oppdatering), og der er et
 * kall fra en fremmed side aldri legitimt. Oppdaterings-sjekken er en GET som
 * bruker eierens GitHub-token, så et generelt unntak for trygge metoder ville
 * latt en fremmed side utløse den fra eierens nettleser.
 *
 * Sec-Fetch-Site er primærsignalet (satt av nettleseren selv, kan ikke
 * overstyres av JavaScript, i alle nettlesere siden mars 2023) og forteller kun
 * FORHOLDET mellom avsender og mottaker, aldri avsenderadressen - altså mindre
 * lekkasje enn Origin. `same-origin` er vår egen admin; `none` er brukerens egen
 * navigasjon (adressefelt/bokmerke). `same-site` avvises med vilje: på delte
 * verter (f.eks. *.pages.dev) deler naboer registrerbart domene, og SameSite=Lax
 * skiller ikke dem fra oss.
 *
 * Origin er reserve for klienter uten Sec-Fetch. Mangler BEGGE, er det ikke en
 * nettleser fra etter 2020, og da finnes ikke angrepet - kallet slippes gjennom
 * (samme avveining som Go-standardbibliotekets CrossOriginProtection).
 *
 * @param {{secFetchSite: string|null, origin: string|null, url: string}} req
 * @returns {boolean}
 */
export function isCrossOrigin({ secFetchSite, origin, url }) {
  if (secFetchSite) return secFetchSite !== 'same-origin' && secFetchSite !== 'none';
  if (origin) return origin !== new URL(url).origin;
  return false;
}

/**
 * Kjører hele prologen. Returnerer {config, token, user} ved suksess,
 * eller {response} som endepunktet skal returnere direkte ved avvisning.
 *
 * @param {Request} request
 * @param {object} env
 * @returns {Promise<{config?: object, token?: string, user?: object, response?: Response}>}
 */
export async function requirePublisher(request, env) {
  let config;
  try {
    config = cfg(env);
  } catch (err) {
    return { response: json({ error: err.message, code: err.code, key: err.key }, 503) };
  }

  // Forsvar i dybden mot CSRF (i tillegg til SameSite=Lax på cookien):
  // innloggede kall skal komme fra vår egen side, aldri fra et fremmed nettsted.
  const crossOrigin = isCrossOrigin({
    secFetchSite: request.headers.get('sec-fetch-site'),
    origin: request.headers.get('origin'),
    url: request.url,
  });
  if (crossOrigin) {
    return { response: json({ error: 'The request comes from the wrong site', code: 'wrongOrigin' }, 403) };
  }

  const token = readCookie(request, 'urd_gh');
  if (!token) return { response: json({ error: 'Not signed in', code: 'notLoggedIn' }, 401) };

  let user;
  try {
    user = await currentUser(token);
  } catch (err) {
    if (err.status === 401) return { response: json({ error: 'Invalid or expired sign-in', code: 'loginExpired' }, 401) };
    return { response: json({ error: 'GitHub is unavailable right now - try again shortly', code: 'githubUnavailable' }, 503) };
  }
  if (!isAllowedLogin(user.login, env)) {
    return { response: json({ error: `The GitHub user '${user.login}' does not have publishing access`, code: 'notAllowed', login: user.login }, 403) };
  }

  return { config, token, user };
}
