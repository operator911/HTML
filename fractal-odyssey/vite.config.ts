import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { host: true, port: 5175 },
  build: { target: 'es2020', chunkSizeWarningLimit: 1200 },
});
