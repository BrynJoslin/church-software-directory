import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist");
const rawConfig = JSON.parse(
  await readFile(new URL("../src/config/site.json", import.meta.url), "utf8")
);
const siteUrl = new URL(rawConfig.url);

const readFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? readFiles(entryPath) : [entryPath];
  }));

  return files.flat();
};

const getLocValues = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const sitemapPathFor = (url) => {
  if (url.origin !== siteUrl.origin) {
    throw new Error(`Sitemap reference must use ${siteUrl.origin}: ${url.href}`);
  }

  return path.join(outputDirectory, decodeURIComponent(url.pathname));
};

const sitemapIndex = await readFile(path.join(outputDirectory, "sitemap-index.xml"), "utf8");
const sitemapReferences = getLocValues(sitemapIndex);

if (sitemapReferences.length === 0) {
  throw new Error("dist/sitemap-index.xml does not reference a sitemap.");
}

const sitemapUrls = new Set();

for (const reference of sitemapReferences) {
  const sitemap = await readFile(sitemapPathFor(new URL(reference)), "utf8");
  for (const url of getLocValues(sitemap)) {
    sitemapUrls.add(new URL(url).href);
  }
}

const htmlFiles = (await readFiles(outputDirectory)).filter((file) => file.endsWith(".html"));
const missingCanonical = [];
const missingFromSitemap = [];

for (const file of htmlFiles) {
  if (path.basename(file) === "404.html") {
    continue;
  }

  const html = await readFile(file, "utf8");
  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);

  if (!canonical) {
    missingCanonical.push(path.relative(outputDirectory, file));
    continue;
  }

  const robotsMetaTags = [...html.matchAll(/<meta\s+[^>]*>/gi)].map((match) => match[0]);
  const isNoindex = robotsMetaTags.some((tag) =>
    /name=["']robots["']/i.test(tag) && /content=["'][^"']*\bnoindex\b/i.test(tag)
  );

  if (!isNoindex && !sitemapUrls.has(new URL(canonical[1]).href)) {
    missingFromSitemap.push(new URL(canonical[1]).href);
  }
}

if (missingCanonical.length > 0 || missingFromSitemap.length > 0) {
  const issues = [
    missingCanonical.length > 0 && `Pages without canonical URLs: ${missingCanonical.join(", ")}`,
    missingFromSitemap.length > 0 && `Indexable pages missing from sitemap: ${missingFromSitemap.join(", ")}`
  ].filter(Boolean);

  throw new Error(issues.join("\n"));
}

console.log(`Sitemap coverage verified for ${sitemapUrls.size} URLs and ${htmlFiles.length - 1} public HTML pages.`);
