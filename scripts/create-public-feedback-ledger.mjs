import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "src", "content", "software");
const outputDirectory = path.join(root, ".internal", "public-feedback");
const scanDate = process.argv[2] ?? new Date().toISOString().slice(0, 10);
const completeDiscovery = process.argv.includes("--complete-discovery");
const querySuffixes = ["review", "church software", "support", "migration", "export", "mobile", "usability", "recommend", "problems", "alternative", "UK"];
const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith(".json")).sort();
const entries = await Promise.all(files.map(async (file) => {
  const item = JSON.parse(await readFile(path.join(sourceDirectory, file), "utf8"));
  return {
    id: `PF-${item.slug.toUpperCase()}`,
    slug: item.slug,
    identity: { product: item.name, company: item.company, officialDomain: new URL(item.officialWebsite).hostname, externalProfiles: (item.externalReviews ?? []).map((review) => ({ platform: review.platform, url: review.profileUrl, scope: review.collectionType })) },
    discovery: {
      searchDate: scanDate,
      searchService: "Web search",
      completedQueries: completeDiscovery ? querySuffixes.map((suffix) => `\"${item.name}\" ${suffix}`) : [`\"${item.name}\" review`],
      queuedQueries: completeDiscovery ? [] : querySuffixes.filter((suffix) => suffix !== "review").map((suffix) => `\"${item.name}\" ${suffix}`),
      status: completeDiscovery ? "base-query-pack-completed" : "first-pass-discovery-completed"
    },
    evidence: [],
    editorialStatus: "awaiting-source-permission-and-human-review"
  };
}));
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "ledger.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), retention: "Review and delete raw discovery records after the editorial decision; do not add personal data or copied review text.", entries }, null, 2)}\n`);
console.log(`Created private public-feedback ledger for ${entries.length} listings.`);
