import siteConfig from "../src/config/site.json" with { type: "json" };

const key = "944b4790100affdffd99d443305ad24b0f1018294e270cfa";
const endpoint = "https://api.indexnow.org/indexnow";
const siteUrl = new URL(siteConfig.url);
const sitemapUrl = new URL("sitemap-index.xml", siteUrl);

const extractLocations = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());

const getSitemapUrls = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load ${url}: HTTP ${response.status}`);
  }

  return extractLocations(await response.text());
};

const sitemapLocations = await getSitemapUrls(sitemapUrl);
const urls = (
  await Promise.all(
    sitemapLocations.map(async (location) => {
      const url = new URL(location);

      if (url.hostname !== siteUrl.hostname) {
        throw new Error(`Sitemap contains a URL outside ${siteUrl.hostname}: ${url}`);
      }

      return getSitemapUrls(url);
    }),
  )
).flat();

if (urls.length === 0) {
  throw new Error(`No page URLs found in ${sitemapUrl}`);
}

if (urls.length > 10_000) {
  throw new Error(`IndexNow accepts at most 10,000 URLs per request; found ${urls.length}`);
}

const payload = {
  host: siteUrl.hostname,
  key,
  keyLocation: new URL(`${key}.txt`, siteUrl).href,
  urlList: urls,
};

if (process.argv.includes("--dry-run")) {
  console.log(`IndexNow dry run: ${urls.length} sitemap URLs would be submitted.`);
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${await response.text()}`);
}

console.log(`IndexNow accepted ${urls.length} sitemap URLs (HTTP ${response.status}).`);
