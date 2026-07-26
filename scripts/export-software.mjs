import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "src", "content", "software");
const outputDirectory = path.join(root, "public", "data");
const outputFile = path.join(outputDirectory, "software.json");

const decisionFields = [
  ["contact-band", ["contact", "package limit"]],
  ["multi-site", ["multi-site", "campus", "location"]],
  ["administrator-limits", ["administrator", "user limit", "plan detail"]],
  ["volunteer-usability", ["volunteer usability"]],
  ["implementation", ["implementation", "migration", "training"]],
  ["technical-administration", ["technical administration"]],
  ["uk-purchasing", ["uk purchasing", "uk availability"]],
  ["gbp-pricing", ["pricing", "price", "tier"]],
  ["vat-treatment", ["vat"]],
  ["gift-aid", ["gift aid"]],
  ["mfa", ["multi-factor", "mfa", "two-factor", "2fa"]],
  ["role-permissions", ["permission", "access control", "administrator"]],
  ["audit-logs", ["audit", "log"]],
  ["data-processing", ["data-processing", "dpa"]],
  ["hosting", ["hosting", "storage", "aws", "azure"]],
  ["transfers", ["transfer", "eea", "international"]],
  ["exports", ["export", "download", "backup"]],
  ["migration", ["migration", "import"]],
  ["uk-support", ["uk support"]],
  ["contract", ["cancellation", "termination", "contract"]]
];

const decisionEvidenceFor = (entry) => Object.fromEntries(decisionFields.flatMap(([key, hints]) => {
  const override = entry.decisionEvidence?.[key];
  if (override) return [[key, override]];
  const source = entry.sources.find((item) => {
    const supports = item.supports.join(" ").toLowerCase();
    return hints.some((hint) => supports.includes(hint));
  });
  let value = null;
  if (key === "gbp-pricing") value = entry.pricing.startingPrice?.currency === "GBP" ? "Published GBP starting price" : entry.pricing.startingPrice ? `Published ${entry.pricing.startingPrice.currency} starting price` : null;
  if (key === "gift-aid" && entry.giftAid !== "unknown") value = entry.giftAid ? ({ yes: "Yes", no: "No" })[entry.giftAid] : null;
  if (key === "hosting") value = entry.dataHosting ?? null;
  if (key === "exports") value = entry.importExport?.length ? entry.importExport.join("; ") : null;
  if (key === "uk-support") value = entry.support?.length ? entry.support.join("; ") : null;
  if (!source || !value) return [];
  return [[key, {
    value,
    state: Date.now() - new Date(source.checked).getTime() > 180 * 24 * 60 * 60 * 1000 ? "needs-refresh" : "supplier-published",
    source: source.url,
    checked: source.checked,
    sourceLabel: source.label
  }]];
}));

const files = (await readdir(sourceDirectory))
  .filter((file) => file.endsWith(".json"))
  .sort();

const entries = await Promise.all(
  files.map(async (file) => {
    const entry = JSON.parse(
      await readFile(path.join(sourceDirectory, file), "utf8")
    );

    return {
      name: entry.name,
      slug: entry.slug,
      shortDescription: entry.shortDescription,
      officialWebsite: entry.officialWebsite,
      company: entry.company,
      countryOfOrigin: entry.countryOfOrigin ?? null,
      ukFocus: entry.ukFocus,
      ...(entry.ukOrganisation && entry.ukOrganisation !== "unknown" ? { ukOrganisation: entry.ukOrganisation } : {}),
      categories: entry.categories,
      suitableChurchSizes: entry.suitableChurchSizes,
      pricing: entry.pricing.model === "unknown"
        ? { ...entry.pricing, model: undefined }
        : entry.pricing,
      ...(entry.freePlan !== "unknown" ? { freePlan: entry.freePlan } : {}),
      ...(entry.freeTrial !== "unknown" ? { freeTrial: entry.freeTrial } : {}),
      ...(entry.giftAid && entry.giftAid !== "unknown" ? { giftAid: entry.giftAid } : {}),
      decisionEvidence: decisionEvidenceFor(entry),
      lastChecked: entry.lastChecked,
      sources: entry.sources
    };
  })
);

await mkdir(outputDirectory, { recursive: true });
const contentAsOf = entries
  .map((entry) => entry.lastChecked)
  .sort()
  .at(-1);
await writeFile(
  outputFile,
  `${JSON.stringify(
    {
      contentAsOf,
      licence: "No reuse licence has yet been selected.",
      count: entries.length,
      software: entries
    },
    null,
    2
  )}\n`
);

console.log(`Exported ${entries.length} software entries to public/data/software.json`);
