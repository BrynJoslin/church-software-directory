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

const decisionEvidenceFor = (entry) => Object.fromEntries(decisionFields.map(([key, hints]) => {
  const override = entry.decisionEvidence?.[key];
  if (override) return [key, override];
  const source = entry.sources.find((item) => {
    const supports = item.supports.join(" ").toLowerCase();
    return hints.some((hint) => supports.includes(hint));
  });
  let value = "Not confirmed";
  if (key === "gbp-pricing") value = entry.pricing.startingPrice?.currency === "GBP" ? "Published GBP starting price" : entry.pricing.startingPrice ? `Published ${entry.pricing.startingPrice.currency} starting price` : "Pricing needs verification";
  if (key === "gift-aid") value = entry.giftAid ? ({ yes: "Yes", no: "No", unknown: "Not confirmed" })[entry.giftAid] : "Not applicable to this product profile";
  if (key === "hosting") value = entry.dataHosting ?? "Not confirmed";
  if (key === "exports") value = entry.importExport?.length ? entry.importExport.join("; ") : "Not confirmed";
  if (key === "uk-support") value = entry.support?.length ? entry.support.join("; ") : "Not confirmed";
  return [key, {
    value,
    state: value === "Not confirmed" || value === "Pricing needs verification" ? "not-confirmed" : source ? (Date.now() - new Date(source.checked).getTime() > 180 * 24 * 60 * 60 * 1000 ? "possibly-outdated" : "supplier-claim") : "not-confirmed",
    ...(source ? { source: source.url, checked: source.checked, sourceLabel: source.label } : { note: "No supporting source is recorded for this field." })
  }];
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
      ukOrganisation: entry.ukOrganisation ?? "unknown",
      categories: entry.categories,
      suitableChurchSizes: entry.suitableChurchSizes,
      pricing: entry.pricing,
      freePlan: entry.freePlan,
      freeTrial: entry.freeTrial,
      ...(entry.giftAid ? { giftAid: entry.giftAid } : {}),
      decisionEvidence: decisionEvidenceFor(entry),
      verificationStatus: entry.verificationStatus,
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
