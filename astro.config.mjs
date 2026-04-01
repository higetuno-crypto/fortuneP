import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://higetuno-crypto.github.io",
  base: "/fortuneP",
  integrations: [tailwind()],
  vite: {
    resolve: {
      alias: {
        "@/lib": "/src/lib",
        "circular-natal-horoscope-js": new URL("node_modules/circular-natal-horoscope-js/dist/index.js", import.meta.url).pathname,
        "astrochart-lib": new URL("node_modules/@astrodraw/astrochart/dist/astrochart.js", import.meta.url).pathname,
      },
    },
  },
});
