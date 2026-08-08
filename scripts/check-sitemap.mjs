import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { canonicalErrors, routeForFile, sitemapCoverage } from "./indexing-validation.mjs";

const outputDirectory = path.resolve("dist");
const rawConfig = JSON.parse(await readFile(new URL("../src/config/site.json", import.meta.url), "utf8"));
const siteUrl = new URL(rawConfig.url);

const readFiles = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true })).map((entry) => {
  const entryPath = path.join(directory, entry.name);
  return entry.isDirectory() ? readFiles(entryPath) : [entryPath];
}))).flat();
const getLocValues = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const sitemapPathFor = (url) => {
  if (url.origin !== siteUrl.origin) throw new Error(`Sitemap reference must use ${siteUrl.origin}: ${url.href}`);
  return path.join(outputDirectory, decodeURIComponent(url.pathname));
};

const sitemapIndex = await readFile(path.join(outputDirectory, "sitemap-index.xml"), "utf8");
const sitemapReferences = getLocValues(sitemapIndex);
if (!sitemapReferences.length) throw new Error("dist/sitemap-index.xml does not reference a sitemap.");

const sitemapUrls = new Set();
for (const reference of sitemapReferences) {
  const sitemap = await readFile(sitemapPathFor(new URL(reference)), "utf8");
  for (const url of getLocValues(sitemap)) sitemapUrls.add(new URL(url).href);
}

const htmlFiles = (await readFiles(outputDirectory)).filter((file) => file.endsWith(".html"));
const routes = await Promise.all(htmlFiles
  .filter((file) => path.basename(file) !== "404.html")
  .map(async (file) => ({ file, path: routeForFile(file, outputDirectory), html: await readFile(file, "utf8") })));
const canonicalIssues = routes.flatMap((route) => canonicalErrors({ html: route.html, route: route.path, siteUrl })
  .map((issue) => `${route.path}: ${issue}`));
const { expectedUrls, missing: missingFromSitemap, unexpected: invalidSitemapUrls } = sitemapCoverage(routes, sitemapUrls, siteUrl);

if (canonicalIssues.length || missingFromSitemap.length || invalidSitemapUrls.length) {
  throw new Error([
    canonicalIssues.length && `Canonical validation failures:\n${canonicalIssues.join("\n")}`,
    missingFromSitemap.length && `Indexable pages missing from sitemap:\n${missingFromSitemap.join("\n")}`,
    invalidSitemapUrls.length && `Sitemap URLs without an indexable self-canonical route:\n${invalidSitemapUrls.join("\n")}`
  ].filter(Boolean).join("\n"));
}

console.log(`Sitemap and canonical coverage verified for ${expectedUrls.size} indexable HTML routes.`);
