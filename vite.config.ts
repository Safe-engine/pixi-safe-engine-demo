import { defineConfig } from 'vite'
import { safexTransform } from 'vite-plugin-safex-transform'

export default defineConfig({
  define: {
    'process.env': {},
  },
  publicDir: 'res',
  build: {
    copyPublicDir: false,
  },
  server: { port: 8080 },
  plugins: [safexTransform()],
})
