/**
 * GET /api/github/callback
 * OAuth-retur: validerer state mot cookien, bytter code mot token
 * SERVER-SIDE (med client_secret), lagrer tokenet i httpOnly-cookien
 * 'urd_gh' og omdirigerer til /admin/. Tokenet når aldri nettleser-JS.
 */
export async function onRequestGet({ request, env }) {
  return new Response('TODO v0.2: OAuth-callback er ikke implementert ennå', { status: 501 });
}
