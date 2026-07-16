/**
 * Cookie-hjelpere for OAuth-tokenet.
 *
 * Tokenet lagres i en httpOnly + Secure + SameSite=Lax-cookie ('urd_gh')
 * og når ALDRI nettleser-JS. En kortlevd 'urd_state'-cookie beskytter
 * OAuth-flyten mot CSRF. (Mønster validert i ApeironLF.)
 */

/**
 * @param {string} name
 * @param {string} value
 * @param {{maxAge?: number}} [opts] maxAge i sekunder (standard 30 dager)
 * @returns {string} Verdi for en Set-Cookie-header
 */
export function serializeCookie(name, value, opts = {}) {
  throw new Error('TODO v0.2: serializeCookie er ikke implementert ennå');
}

/**
 * @param {Request} request
 * @param {string} name
 * @returns {string|null}
 */
export function readCookie(request, name) {
  throw new Error('TODO v0.2: readCookie er ikke implementert ennå');
}
