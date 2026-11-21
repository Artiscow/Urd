/**
 * A module hook for a test that runs the engine's runtime imports in node: an absolute address on the site (/assets/..., /plugins/...) resolves to the template folder, as the site serves it.
 * Registered by the test that needs it (i18n.test.mjs) with node:module's register().
 */
const TEMPLATE = new URL('../template/', import.meta.url);

export async function resolve(specifier, context, next) {
  if (/^\/(assets|plugins)\//.test(specifier)) return { url: new URL(specifier.slice(1), TEMPLATE).href, shortCircuit: true };
  return next(specifier, context);
}
