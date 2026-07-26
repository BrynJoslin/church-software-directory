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
const files = (await filesIn(output)).filter((file) => file.endsWith(".html"));
const issues = [];
const stripTags = (value) => value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();

for (const file of files) {
  const html = await readFile(file, "utf8"); const name = path.relative(output, file);
  if (!/<html\b[^>]*\blang=["']en-GB["']/i.test(html)) issues.push(`${name}: missing en-GB page language`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) issues.push(`${name}: requires exactly one h1`);
  if (!/<main\b[^>]*\bid=["']main-content["']/i.test(html)) issues.push(`${name}: missing main landmark`);
  if (!/<a\b[^>]*href=["']#main-content["']/i.test(html)) issues.push(`${name}: missing skip link`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) if (!/\balt=["']/i.test(image[0])) issues.push(`${name}: image missing alt text`);
  for (const button of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)) if (!stripTags(button[1])) issues.push(`${name}: empty button label`);
  for (const link of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = link[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href || !/^https?:\/\//i.test(href)) continue;
    if (!/\btarget=["']_blank["']/i.test(link[0])) issues.push(`${name}: external link does not open in a new tab (${href})`);
    if (!/\brel=["'][^"']*\bnoopener\b[^"']*["']/i.test(link[0])) issues.push(`${name}: external link is missing noopener protection (${href})`);
  }
}
if (issues.length) throw new Error(`Critical accessibility check failed:\n${issues.join("\n")}`);
console.log(`Critical accessibility checks passed for ${files.length} HTML pages.`);
