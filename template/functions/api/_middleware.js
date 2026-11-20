/**
 * Every answer of the site's functions carries nosniff, and one that is not a web page carries a policy that runs nothing in it, so a function's text is never read as a script or drawn as a page.
 * The headers are set here because _headers reaches the site's static files only.
 * An answer that sets its own policy (the picture route's sandbox) keeps it.
 */
export async function onRequest({ next }) {
  const res = await next();
  const out = new Response(res.body, res);
  out.headers.set('x-content-type-options', 'nosniff');
  if (!out.headers.has('content-security-policy') && !/^text\/html/i.test(out.headers.get('content-type') ?? '')) {
    out.headers.set('content-security-policy', "default-src 'none'; frame-ancestors 'none'; sandbox");
  }
  return out;
}
