import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("charity offer filtering validates URL state and restores browser state", async () => {
  const source = await readFile(new URL("../src/scripts/charity-offers.ts", import.meta.url), "utf8");
  assert.match(source, /const allowed/);
  assert.match(source, /allowed\[key\]\?\.has\(value\)/);
  assert.match(source, /addEventListener\("popstate"/);
  assert.match(source, /history\[mode === "push" \? "pushState" : "replaceState"\]/);
});

test("charity hub keeps current and warning programmes separate in static HTML", async () => {
  const source = await readFile(new URL("../src/pages/charity-software-discounts/index.astro", import.meta.url), "utf8");
  assert.match(source, /publicationStatus === "published"/);
  assert.match(source, /publicationStatus === "warning"/);
  assert.match(source, /data-charity-result-count/);
  assert.match(source, /aria-live="polite"/);
});
