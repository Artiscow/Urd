/**
 * A module hook for a test that runs the engine's runtime imports in node: an absolute address on the site (/assets/..., /plugins/...) resolves to the template folder, as the site serves it.
 * Imported by the test that needs it (i18n.test.mjs), and node:module's registerHooks() runs it in the test's own thread.
 */
import { registerHooks } from 'node:module';

const TEMPLATE = new URL('../template/', import.meta.url);

function resolve(specifier, context, next) {
  if (/^\/(assets|plugins)\//.test(specifier)) return { url: new URL(specifier.slice(1), TEMPLATE).href, shortCircuit: true };
  return next(specifier, context);
}

registerHooks({ resolve });
