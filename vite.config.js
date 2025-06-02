import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Build optimizations
  build: {
    // Generate source maps for debugging
    sourcemap: true,

    // Minify the output
    minify: "terser",

    // Optimize chunks
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        kanji: resolve(__dirname, "pages/kanji.html"),
        alphabet: resolve(__dirname, "pages/alphabet.html"),
      },
      output: {
        manualChunks: {
          // Separate vendor libraries if any are added later
          vendor: [],
        },
      },
    },

    // Optimize CSS
    cssCodeSplit: true,

    // Target modern browsers for better optimization
    target: "esnext",

    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
  },

  // Development server settings
  server: {
    port: 3000,
    open: true, // Automatically open browser
    host: true, // Allow external connections
  },

  // CSS preprocessing
  css: {
    // PostCSS config can be added here if needed
    devSourcemap: true,
  },

  // Assets optimization
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],

  // Enable legacy browser support if needed
  // @vitejs/plugin-legacy can be added for older browser support
});
