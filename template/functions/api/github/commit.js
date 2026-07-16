/**
 * POST /api/github/commit
 * Kjernen i publiseringen. Body: { message, files: [{path, content, encoding}] }.
 *
 * Flyt (implementeres i v0.2):
 *  1. Les token fra cookie; avvis uinnlogget.
 *  2. Håndhev ALLOWED_LOGINS på nytt (guard.isAllowedLogin, forsvar i dybden).
 *  3. Valider HVER filsti med guard.isAllowedPath - publisering kan kun
 *     skrive innhold (content/, media/, plugins/plugins.json), aldri kode.
 *  4. Maks 200 filer per commit.
 *  5. Committer alt som ÉN commit via github.commitFiles (Git Data API).
 *  6. Returner ny commit-SHA (editorens nye baseline).
 */
export async function onRequestPost({ request, env }) {
  return new Response('TODO v0.2: commit-endepunktet er ikke implementert ennå', { status: 501 });
}
