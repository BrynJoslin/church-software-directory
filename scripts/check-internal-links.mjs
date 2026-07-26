import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("dist");
const filesIn = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesIn(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]));
  return nested.flat();
};
const htmlFiles = (await filesIn(output)).filter((file) => file.endsWith(".html"));
const missing = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const links = [...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const href of links) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathname = decodeURIComponent(href.split(/[?#]/)[0]);
    if (pathname.startsWith("/data/") || pathname.includes(".")) continue;
    const target = pathname === "/" ? path.join(output, "index.html") : path.join(output, pathname, "index.html");
    try { await readFile(target); } catch { missing.push(`${path.relative(output, file)} -> ${href}`); }
  }
}

if (missing.length) throw new Error(`Broken internal links:\n${[...new Set(missing)].join("\n")}`);
console.log(`Internal-link coverage verified across ${htmlFiles.length} HTML pages.`);
