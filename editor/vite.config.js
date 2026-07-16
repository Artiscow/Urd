import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Bygger editoren til template/admin/assets/ - den ferdigbygde outputen
// COMMITTES slik at klonede sider fungerer uten byggesteg (se ADR-0002).
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../template/admin/assets',
    emptyOutDir: true,
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'editor.js',
    },
  },
});
