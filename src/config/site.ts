import rawConfig from "./site.json";

export type SiteConfig = typeof rawConfig;

export const siteConfig: SiteConfig = rawConfig;
