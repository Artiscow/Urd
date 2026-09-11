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

// Builds the editor into template/admin/assets/ - the built output is
// COMMITTED so that cloned sites work without a build step (see ADR-0002).
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: { $engine: engineDir },
  },
  build: {
    outDir: '../template/admin/assets',
    emptyOutDir: true,
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'editor.js',
      cssFileName: 'editor',
    },
  },
});
