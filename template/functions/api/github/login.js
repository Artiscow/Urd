/**
 * GET /api/github/login
 * Starter GitHub OAuth: setter en tilfeldig state-cookie (CSRF-vern) og
 * omdirigerer til github.com/login/oauth/authorize med client_id + scope.
 */
export async function onRequestGet({ request, env }) {
  return new Response('TODO v0.2: OAuth-login er ikke implementert ennå', { status: 501 });
}
