import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "src", "content", "software");
const cacheDirectory = path.join(root, ".internal", "dashboard");
const cacheFile = path.join(cacheDirectory, "link-check.json");
const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith(".json"));
const entries = await Promise.all(files.map(async (file) => JSON.parse(await readFile(path.join(sourceDirectory, file), "utf8"))));
const urls = [...new Set(entries.flatMap((entry) => [entry.officialWebsite, ...(entry.sources ?? []).map((source) => source.url)]).filter(Boolean))];
const timeout = 10_000; const concurrency = 4; const results = [];
async function check(url) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "manual", signal: controller.signal, headers: { "User-Agent": "ChurchSoftwareUK-Maintenance/1.0 (+local link check)" } });
    return { url, status: response.status, redirect: response.status >= 300 && response.status < 400 ? response.headers.get("location") : null, result: response.ok ? "ok" : response.status === 403 || response.status === 429 ? "blocked-or-rate-limited" : "failed" };
  } catch (error) { return { url, result: error.name === "AbortError" ? "timeout" : "inaccessible", detail: error.message }; } finally { clearTimeout(timer); }
}
let cursor = 0; await Promise.all(Array.from({ length: concurrency }, async () => { while (cursor < urls.length) { const url = urls[cursor++]; results.push(await check(url)); } }));
await mkdir(cacheDirectory, { recursive: true }); await writeFile(cacheFile, `${JSON.stringify({ checkedAt: new Date().toISOString(), timeoutMs: timeout, concurrency, results }, null, 2)}\n`);
const failed = results.filter((result) => result.result === "failed" || result.result === "timeout").length;
const confirmedBroken = results.filter((result) => result.status === 404 || result.status === 410);
console.log(`Checked ${results.length} URLs; ${failed} failed or timed out; ${confirmedBroken.length} confirmed broken. Results: .internal/dashboard/link-check.json`);
if (confirmedBroken.length) {
  throw new Error(`Confirmed broken source URLs:\n${confirmedBroken.map((result) => `${result.status} ${result.url}`).join("\n")}`);
}
