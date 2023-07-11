import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import deno from "@astrojs/deno";


// https://astro.build/config
export default defineConfig({
  output: "server",
  experimental: {
    middleware: true
  },
  integrations: [react()],
  vite: {
    define: {
      isEditor: false,
      __SRV_URL__: '"https://apinew.lmtd.id"'
    }
  },
  adapter: node({
    mode: "standalone"
  })
});