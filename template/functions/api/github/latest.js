/**
 * GET /api/github/latest[?base=<sha>]
 * Returnerer HEAD-commit; med ?base sammenlignes base..HEAD og filene som
 * er endret siden listes. Editoren bruker dette til konfliktdeteksjon:
 * har noen andre publisert de samme filene siden innlasting, varsles
 * redaktøren før publisering.
 */
export async function onRequestGet({ request, env }) {
  return new Response('TODO v0.2: latest-endepunktet er ikke implementert ennå', { status: 501 });
}
