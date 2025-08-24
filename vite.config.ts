import { defineConfig } from 'vite';
import { safexTransform } from 'vite-plugin-safex-transform';
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  define: {
    'process.env': {},
  },
  publicDir: 'res',
  build: {
    copyPublicDir: false,
  },
  server: { port: 8080 },
  plugins: [safexTransform(), wasm(), topLevelAwait()],
})
