import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: './',

  define: {
    global: 'window',
  },

  server: {
    open: true,
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});