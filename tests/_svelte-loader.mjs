/**
 * Module hooks that let a test import the editor's Svelte components in
 * node: a .svelte file is compiled for the server, a .svelte.js module the
 * same, the editor's $engine alias resolves to the engine directory named in
 * template/urd.json, and a bare `svelte/...` import from a test resolves
 * against the editor's own node_modules. Registered by the test that needs
 * it (menu-render.test.mjs) with node:module's register().
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = new URL('../', import.meta.url);
const EDITOR_SRC = new URL('editor/src/x.js', ROOT).href;
const ENGINE = JSON.parse(readFileSync(new URL('template/urd.json', ROOT), 'utf8')).engine;
const compilerUrl = new URL('editor/node_modules/svelte/src/compiler/index.js', ROOT).href;

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('$engine/')) {
    return { url: new URL(`template/assets/engine/${ENGINE}/${specifier.slice(8)}`, ROOT).href, shortCircuit: true };
  }
  if ((specifier === 'svelte' || specifier.startsWith('svelte/')) && context.parentURL?.includes('/tests/')) {
    return next(specifier, { ...context, parentURL: EDITOR_SRC });
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith('.svelte') || url.endsWith('.svelte.js')) {
    const { compile, compileModule } = await import(compilerUrl);
    const filename = fileURLToPath(url);
    const source = readFileSync(filename, 'utf8');
    const { js } = url.endsWith('.svelte')
      ? compile(source, { generate: 'server', filename })
      : compileModule(source, { generate: 'server', filename });
    return { format: 'module', source: js.code, shortCircuit: true };
  }
  return next(url, context);
}

export const engineUrl = pathToFileURL(fileURLToPath(new URL(`template/assets/engine/${ENGINE}/`, ROOT))).href;
