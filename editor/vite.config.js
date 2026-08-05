import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Motoren bor i en versjonert mappe (ADR-0013); mappenavnet er alltid lik
// engine-feltet i template/urd.json, så aliaset følger fase-slippets
// omdøping automatisk. All editor-kode importerer motoren via $engine.
const engineVersion = JSON.parse(
  readFileSync(new URL('../template/urd.json', import.meta.url), 'utf-8'),
).engine;
const engineDir = fileURLToPath(new URL(`../template/assets/engine/${engineVersion}`, import.meta.url));

// Bygger editoren til template/admin/assets/ - den ferdigbygde outputen
// COMMITTES slik at klonede sider fungerer uten byggesteg (se ADR-0002).
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
