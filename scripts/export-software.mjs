import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "src", "content", "software");
const outputDirectory = path.join(root, "public", "data");
const outputFile = path.join(outputDirectory, "software.json");

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
      giftAid: entry.giftAid,
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
