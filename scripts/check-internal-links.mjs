import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { expectedCanonical, incomingLinks, isNoindex, isStaticComparisonQueryLink, linksFromHtml, routeForFile } from "./indexing-validation.mjs";

const output = path.resolve("dist");
const rawConfig = JSON.parse(await readFile(new URL("../src/config/site.json", import.meta.url), "utf8"));
const siteUrl = new URL(rawConfig.url);
const filesIn = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true })).map((entry) => {
  const entryPath = path.join(directory, entry.name);
  return entry.isDirectory() ? filesIn(entryPath) : [entryPath];
}))).flat();
const targetFor = (pathname) => pathname === "/" ? path.join(output, "index.html") : path.join(output, pathname, "index.html");

const htmlFiles = (await filesIn(output)).filter((file) => file.endsWith(".html"));
const routes = await Promise.all(htmlFiles.map(async (file) => ({
  file,
  path: routeForFile(file, output),
  html: await readFile(file, "utf8")
})));
const missing = [];
const comparisonQueryLinks = [];

for (const route of routes) {
  const sourceUrl = expectedCanonical(route.path, siteUrl);
  for (const link of linksFromHtml(route.html)) {
    if (isStaticComparisonQueryLink(link.href, sourceUrl, siteUrl)) comparisonQueryLinks.push(`${path.relative(output, route.file)} -> ${link.href}`);
    let target;
    try { target = new URL(link.href, sourceUrl); } catch { continue; }
    if (target.origin !== siteUrl.origin || !target.pathname.startsWith("/") || path.posix.extname(target.pathname) || target.pathname.startsWith("/data/")) continue;
    try { await readFile(targetFor(decodeURIComponent(target.pathname))); } catch { missing.push(`${path.relative(output, route.file)} -> ${link.href}`); }
  }
}

const incoming = incomingLinks(routes, siteUrl);
const orphans = [...incoming.entries()]
  .filter(([route, sources]) => route !== "/" && sources.size === 0)
  .map(([route]) => route);

if (missing.length || comparisonQueryLinks.length || orphans.length) {
  throw new Error([
    missing.length && `Broken internal links:\n${[...new Set(missing)].join("\n")}`,
    comparisonQueryLinks.length && `Static comparison query links are not allowed; use /compare/ with progressive enhancement:\n${[...new Set(comparisonQueryLinks)].join("\n")}`,
    orphans.length && `Indexable routes without a crawlable incoming link from another indexable route:\n${orphans.join("\n")}`
  ].filter(Boolean).join("\n"));
}

const indexableRoutes = routes.filter((route) => !isNoindex(route.html)).length;
console.log(`Internal-link and crawl-path coverage verified across ${indexableRoutes} indexable HTML routes.`);
