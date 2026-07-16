/**
 * GET /api/github/history
 * Siste commits på publiseringsgrenen. Grunnlag for historikkvisning og
 * forhåndsvisning av «angre siste publisering» (v0.5).
 */
export async function onRequestGet({ request, env }) {
  return new Response('TODO v0.5: history-endepunktet er ikke implementert ennå', { status: 501 });
}
