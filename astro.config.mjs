import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import siteConfig from "./src/config/site.json";

export default defineConfig({
  site: siteConfig.url,
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  build: {
    format: "directory"
  }
});
