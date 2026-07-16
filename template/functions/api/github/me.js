/**
 * GET /api/github/me
 * Innloggingsstatus: leser token-cookien, henter brukeren fra GitHub og
 * håndhever ALLOWED_LOGINS (guard.isAllowedLogin). Editoren bruker svaret
 * til å vise innloggingsstatus og skru på publiseringsknappen.
 */
export async function onRequestGet({ request, env }) {
  return new Response('TODO v0.2: me-endepunktet er ikke implementert ennå', { status: 501 });
}
