import assert from "node:assert/strict";
import test from "node:test";
import { canonicalErrors, expectedCanonical, incomingLinks, isStaticComparisonQueryLink, sitemapCoverage } from "../scripts/indexing-validation.mjs";

const siteUrl = new URL("https://churchsoftware.co.uk/");
const page = (path, html) => ({ path, html });
const canonical = (href) => `<link rel="canonical" href="${href}">`;

test("accepts a self-canonical indexable page represented in the sitemap", () => {
  const route = "/guides/";
  const url = expectedCanonical(route, siteUrl);
  assert.deepEqual(canonicalErrors({ html: canonical(url), route, siteUrl }), []);
  assert.deepEqual(sitemapCoverage([page(route, canonical(url))], new Set([url]), siteUrl).missing, []);
});

test("rejects mismatched and cross-origin canonicals", () => {
  assert.match(canonicalErrors({ html: canonical("https://example.com/guides/"), route: "/guides/", siteUrl }).join(" "), /churchsoftware\.co\.uk/);
  assert.match(canonicalErrors({ html: canonical("https://churchsoftware.co.uk/compare/"), route: "/guides/", siteUrl }).join(" "), /self-reference/);
});

test("rejects canonical query strings and fragments", () => {
  const errors = canonicalErrors({ html: canonical("https://churchsoftware.co.uk/guides/?task=choose#start"), route: "/guides/", siteUrl });
  assert.match(errors.join(" "), /query string or fragment/);
});

test("identifies an indexable route missing from a sitemap set", () => {
  const route = "/software/example/";
  const result = sitemapCoverage([page(route, canonical(expectedCanonical(route, siteUrl)))], new Set(), siteUrl);
  assert.deepEqual(result.missing, [expectedCanonical(route, siteUrl)]);
});

test("reports an orphan indexable route and accepts a static incoming link", () => {
  const orphanRoutes = [page("/", canonical("https://churchsoftware.co.uk/")), page("/orphan/", canonical("https://churchsoftware.co.uk/orphan/"))];
  assert.equal(incomingLinks(orphanRoutes, siteUrl).get("/orphan/").size, 0);
  const linkedRoutes = [page("/", `${canonical("https://churchsoftware.co.uk/")}<a href="/guide/">Guide</a>`), page("/guide/", canonical("https://churchsoftware.co.uk/guide/"))];
  assert.deepEqual([...incomingLinks(linkedRoutes, siteUrl).get("/guide/")], ["/"]);
});

test("continues to prohibit static product comparison query links", () => {
  assert.equal(isStaticComparisonQueryLink("/compare/?products=worship-player", "https://churchsoftware.co.uk/", siteUrl), true);
});
