import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// The engine lives in a versioned folder (ADR-0013); the folder name always
// equals the engine field in template/urd.json, so the alias follows the
// phase release's rename automatically. All editor code imports the engine
// through $engine.
const engineVersion = JSON.parse(
  readFileSync(new URL('../template/urd.json', import.meta.url), 'utf-8'),
).engine;
const engineDir = fileURLToPath(new URL(`../template/assets/engine/${engineVersion}`, import.meta.url));

/**
 * The admin's own stylesheet (src/app.css) stands last in editor.css, after the rules of every component, those of the parts loaded on demand included, so its rules win a tie with theirs, as main.js imports it after the components to do.
 * The build writes the parts' styles after the entry's, app.css among them, so app.css is marked by two rules of its own as it is read, and its block is moved to the end, without the marks, once the stylesheet is written.
 */
function appCssLast() {
  const START = '.urd-app-css-start{--urd-app-css:start}';
  const END = '.urd-app-css-end{--urd-app-css:end}';
  return {
    name: 'urd-app-css-last',
    transform: {
      order: 'pre',
      handler(code, id) {
        if (!/[\\/]src[\\/]app\.css$/.test(id)) return null;
        return { code: `${START}\n${code}\n${END}\n`, map: null };
      },
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const sheet = Object.values(bundle).find((file) => file.type === 'asset' && file.fileName === 'editor.css');
        const css = String(sheet?.source ?? '');
        const start = css.indexOf(START);
        const end = css.indexOf(END);
        if (start < 0 || end < start) this.error('urd-app-css-last: app.css was not found in editor.css');
        const rest = css.slice(0, start) + css.slice(end + END.length);
        // A comment the build writes at the sheet's end stays there.
        const tail = rest.match(/(?:\s*\/\*(?:[^*]|\*(?!\/))*\*\/)*\s*$/)[0];
        sheet.source = rest.slice(0, rest.length - tail.length) + css.slice(start + START.length, end) + tail;
      },
    },
  };
}

// Builds the editor into template/admin/assets/ - the built output is
// COMMITTED so that cloned sites work without a build step (see ADR-0002).
export default defineConfig({
  plugins: [svelte(), appCssLast()],
  resolve: {
    alias: { $engine: engineDir },
  },
  build: {
    outDir: '../template/admin/assets',
    emptyOutDir: true,
    // The bundle is minified in full, whitespace included, which a library build leaves out by default: the editor is loaded by the browser as it is, never by another bundler, and its readable source is this folder (ADR-0002).
    // Everything the admin starts with stands in editor.js: the code the entry imports (`$initial`) is one group, which joins the entry since editor.js exports nothing to keep.
    // Each part loaded on demand (src/lib/parts.svelte.js) is a file of its own beside it, named by its content, and code only those parts share is a file of its own too.
    rolldownOptions: {
      preserveEntrySignatures: false,
      output: {
        minify: true,
        codeSplitting: { groups: [{ name: 'editor', tags: ['$initial'] }] },
      },
    },
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'editor.js',
      cssFileName: 'editor',
    },
  },
});
