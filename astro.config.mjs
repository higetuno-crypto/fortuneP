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
      },
    },
  },
});
