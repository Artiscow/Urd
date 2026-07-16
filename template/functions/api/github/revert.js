/**
 * POST /api/github/revert
 * «Angre siste publisering» som FORWARD-revert: en ny commit som peker på
 * forrige commits tre, med HEAD som forelder - historikk slettes aldri.
 * Body {expect: <sha>} vokter mot samtidig HEAD-flytting (409 hvis flyttet).
 */
export async function onRequestPost({ request, env }) {
  return new Response('TODO v0.5: revert-endepunktet er ikke implementert ennå', { status: 501 });
}
