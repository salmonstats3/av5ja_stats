import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { VitePWA } from "vite-plugin-pwa";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  server: {
    port: 8000,
    cors: true,
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    ViteYaml(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectManifest: {
        rollupFormat:'iife'
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        lang: "ja",
        name: "Salmon Stats+",
        short_name: "Salmon Stats+",
        background_color: "#212121",
        theme_color: "#212121",
        display: "standalone",
        scope: "/",
        start_url: "/",
        description: "The website for Salmon Run of Splatoon 3",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: 'any maskable'
          },
        ],
        dir: "ltr",
        orientation: "portrait",
        display_override: [
          "standalone"
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
