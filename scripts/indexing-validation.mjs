import path from "node:path";

const attributesFor = (tag) => Object.fromEntries(
  [...tag.matchAll(/\b([\w:-]+)(?:\s*=\s*(["'])(.*?)\2)?/g)]
    .map(([, name, , value]) => [name.toLowerCase(), value ?? ""])
);

export const isNoindex = (html) => [...html.matchAll(/<meta\b[^>]*>/gi)]
  .some((match) => {
    const attributes = attributesFor(match[0]);
    return attributes.name?.toLowerCase() === "robots" && /\bnoindex\b/i.test(attributes.content);
  });

export const canonicalHrefs = (html) => [...html.matchAll(/<link\b[^>]*>/gi)]
  .map((match) => attributesFor(match[0]))
  .filter((attributes) => attributes.rel?.split(/\s+/).some((value) => value.toLowerCase() === "canonical"))
  .map((attributes) => attributes.href)
  .filter(Boolean);

export const routeForFile = (file, outputDirectory) => {
  const relative = path.relative(outputDirectory, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
};

export const expectedCanonical = (route, siteUrl) => new URL(route, siteUrl).href;

export const sitemapCoverage = (routes, sitemapUrls, siteUrl) => {
  const expectedUrls = new Set(routes
    .filter((route) => !isNoindex(route.html))
    .map((route) => expectedCanonical(route.path, siteUrl)));
  return {
    expectedUrls,
    missing: [...expectedUrls].filter((url) => !sitemapUrls.has(url)),
    unexpected: [...sitemapUrls].filter((url) => !expectedUrls.has(url))
  };
};

export const canonicalErrors = ({ html, route, siteUrl }) => {
  if (isNoindex(html)) return [];

  const canonicals = canonicalHrefs(html);
  if (canonicals.length !== 1) {
    return [`must have exactly one canonical link (found ${canonicals.length})`];
  }

  let canonical;
  try {
    canonical = new URL(canonicals[0]);
  } catch {
    return [`has an invalid canonical URL: ${canonicals[0]}`];
  }

  const expected = expectedCanonical(route, siteUrl);
  const issues = [];
  if (canonical.origin !== siteUrl.origin) issues.push(`canonical must use ${siteUrl.origin}`);
  if (canonical.search || canonical.hash) issues.push("canonical must not contain a query string or fragment");
  if (canonical.href !== expected) issues.push(`canonical must self-reference ${expected}`);
  return issues;
};

export const linksFromHtml = (html) => [...html.matchAll(/<a\b[^>]*>/gi)]
  .map((match) => attributesFor(match[0]))
  .filter((attributes) => attributes.href)
  .map((attributes) => ({
    href: attributes.href,
    nofollow: attributes.rel?.split(/\s+/).some((value) => value.toLowerCase() === "nofollow") ?? false
  }));

export const crawlTarget = ({ href, nofollow }, sourceUrl, siteUrl) => {
  if (nofollow || href.startsWith("#")) return null;

  let target;
  try {
    target = new URL(href, sourceUrl);
  } catch {
    return null;
  }

  if (target.origin !== siteUrl.origin || target.search || target.hash) return null;
  if (path.posix.extname(target.pathname)) return null;
  return target.pathname;
};

export const isStaticComparisonQueryLink = (href, sourceUrl, siteUrl) => {
  try {
    const target = new URL(href, sourceUrl);
    return target.origin === siteUrl.origin && target.pathname === "/compare/" && target.searchParams.has("products");
  } catch {
    return false;
  }
};

export const incomingLinks = (routes, siteUrl) => {
  const indexedRoutes = routes.filter((route) => !isNoindex(route.html));
  const incoming = new Map(indexedRoutes.map((route) => [route.path, new Set()]));

  for (const source of indexedRoutes) {
    const sourceUrl = expectedCanonical(source.path, siteUrl);
    for (const link of linksFromHtml(source.html)) {
      const target = crawlTarget(link, sourceUrl, siteUrl);
      if (target && target !== source.path && incoming.has(target)) incoming.get(target).add(source.path);
    }
  }

  return incoming;
};
