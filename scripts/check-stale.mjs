import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(
  await readFile(path.join(root, "src", "config", "site.json"), "utf8")
);
const sourceDirectory = path.join(root, "src", "content", "software");
const files = (await readdir(sourceDirectory)).filter((file) =>
  file.endsWith(".json")
);
const today = new Date();
const stale = [];

for (const file of files) {
  const entry = JSON.parse(
    await readFile(path.join(sourceDirectory, file), "utf8")
  );
  const checked = new Date(`${entry.lastChecked}T00:00:00Z`);
  const ageDays = Math.floor((today.getTime() - checked.getTime()) / 86_400_000);

  if (!Number.isFinite(checked.getTime())) {
    stale.push(`${entry.name ?? file}: invalid lastChecked date`);
  } else if (ageDays > config.staleListingDays) {
    stale.push(
      `${entry.name}: ${ageDays} days old (threshold: ${config.staleListingDays})`
    );
  }
}

if (stale.length > 0) {
  console.error("Stale software listings:");
  stale.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(
    `All ${files.length} listings are within the ${config.staleListingDays}-day review threshold.`
  );
}
