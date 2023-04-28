import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteYaml from "@modyfi/vite-plugin-yaml";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    cors: true,
  },
  ssr: {
    noExternal: true,
    target: "webworker",
  },
  plugins: [vue(), vuetify({ autoImport: true }), ViteYaml()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
