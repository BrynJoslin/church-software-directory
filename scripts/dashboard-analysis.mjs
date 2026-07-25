const DAY = 86_400_000;

export const COMPLETENESS_FIELDS = [
  ["name", "Required", (item) => item.name],
  ["slug", "Required", (item) => item.slug],
  ["short description", "Required", (item) => item.shortDescription],
  ["official website", "Required", (item) => item.officialWebsite],
  ["company", "Required", (item) => item.company],
  ["categories", "Required", (item) => item.categories?.length],
  ["church sizes", "Required", (item) => item.suitableChurchSizes?.length],
  ["pricing summary", "Required", (item) => item.pricing?.summary],
  ["editorial assessment", "Required", (item) => item.editorial?.assessment],
  ["sources", "Required", (item) => item.sources?.length],
  ["verification status", "Required", (item) => item.verificationStatus],
  ["last checked", "Required", (item) => item.lastChecked],
  ["SEO title", "Required", (item) => item.seo?.title],
  ["SEO description", "Required", (item) => item.seo?.description],
  ["UK organisation status", "Useful", (item) => item.ukOrganisation && item.ukOrganisation !== "unknown"],
  ["country of origin", "Useful", (item) => item.countryOfOrigin],
  ["suitable contexts", "Useful", (item) => item.suitableContexts?.length],
  ["pricing tiers or starting price", "Useful", (item) => item.pricing?.tiers?.length || item.pricing?.startingPrice],
  ["trial details", "Useful", (item) => item.pricing?.trialDetails],
  ["data hosting", "Useful", (item) => item.dataHosting],
  ["GDPR information", "Useful", (item) => item.gdprInformation],
  ["core features", "Useful", (item) => item.coreFeatures?.length],
  ["integrations", "Useful", (item) => item.integrations?.length],
  ["import/export", "Useful", (item) => item.importExport?.length],
  ["support", "Useful", (item) => item.support?.length],
  ["logo", "Useful", (item) => item.brandAssets?.logo],
  ["long-form profile", "Useful", (item) => item.longForm]
];

export function parseDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function freshness(value, now = new Date(), threshold = 180) {
  const date = parseDate(value);
  if (!date) return { state: "missing-or-invalid", days: null };
  const days = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - date.getTime()) / DAY);
  if (days < 0) return { state: "future", days };
  if (days > threshold) return { state: "stale", days };
  if (days >= Math.floor(threshold * 0.75)) return { state: "approaching", days };
  return { state: "recent", days };
}

export function completeness(item) {
  const missing = COMPLETENESS_FIELDS.filter(([, , present]) => !present(item)).map(([name, group]) => ({ name, group }));
  return { percentage: Math.round(((COMPLETENESS_FIELDS.length - missing.length) / COMPLETENESS_FIELDS.length) * 100), missing };
}

export function isValidUrl(value) {
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname); } catch { return false; }
}

export function csvEscape(value) {
  const string = String(value ?? "");
  return /[",\r\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

export const priorityFor = (type) => ({
  "invalid-category": "Critical", "duplicate-identifier": "Critical", "invalid-url": "Critical",
  "no-sources": "High", "stale": "High", "invalid-date": "High", "missing-required": "High",
  "needs-review": "Medium", "partially-verified": "Medium", "missing-optional": "Medium", "missing-seo": "Medium",
  "missing-logo": "Low", "short-summary": "Low", "comparison-opportunity": "Low", "taxonomy": "Medium"
}[type] ?? "Low");

export function duplicateValues(items, property) {
  const values = new Map();
  for (const item of items) { const value = item[property]; if (value) values.set(value, [...(values.get(value) ?? []), item]); }
  return [...values.entries()].filter(([, matches]) => matches.length > 1);
}
