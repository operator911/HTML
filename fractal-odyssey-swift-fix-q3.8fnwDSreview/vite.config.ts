import { defineConfig, type Plugin } from 'vite';

/**
 * Inlines every JS/CSS asset into the built index.html so the finished app is
 * one self-contained file that also works opened directly from disk (file://).
 */
function inlineSingleFile(): Plugin {
  return {
    name: 'fractal-odyssey:inline-single-file',
    enforce: 'post',
    generateBundle(_options, bundle) {
      let js = '';
      let css = '';
      for (const [key, item] of Object.entries(bundle)) {
        if (item.type === 'chunk') {
          js = item.code;
          delete bundle[key];
        } else if (item.type === 'asset' && key.endsWith('.css')) {
          css = String(item.source);
          delete bundle[key];
        }
      }
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') return;
      let source = String(html.source);
      source = source.replace(
        /<script[^>]*src="[^"]*"[^>]*>\s*<\/script>/g,
        () => `<script type="module">\n${js}\n</script>`
      );
      source = source.replace(
        /<link[^>]*rel="stylesheet"[^>]*>/g,
        () => `<style>\n${css}\n</style>`
      );
      html.source = source;
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [inlineSingleFile()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
