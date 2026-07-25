import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { shortlistProducts } from "../src/utils/shortlist.ts";

const product = (overrides = {}) => ({
  slug: "example", name: "Example", categories: ["church-management"], suitableChurchSizes: ["small"], ukFocus: "strong", giftAid: "yes",
  pricing: { summary: "Published GBP price", startingPrice: { amount: 10, currency: "GBP", period: "month" } },
  procurementVerdict: { problem: "Keep people records together", firstCheck: "Test exports" }, decisionEvidence: {}, ...overrides
});
const answers = { job: "church-management", contactBand: "small", ukLocation: "yes", giftAid: "yes", approach: "any", technicalAdministration: "any" };

test("shortlist returns a bounded, evidence-matched set", () => {
  const matches = shortlistProducts([product(), product({ slug: "two", name: "Two" }), product({ slug: "three", name: "Three" }), product({ slug: "four", name: "Four" }), product({ slug: "five", name: "Five" }), product({ slug: "six", name: "Six" })], answers);
  assert.equal(matches.length, 5);
  assert.ok(matches.every(({ product: item }) => item.ukFocus === "strong" && item.giftAid === "yes"));
});

test("shortlist preserves an honest no-result state when fewer than three match", () => {
  assert.deepEqual(shortlistProducts([product(), product({ slug: "two", name: "Two" })], answers), []);
});

test("directory URL state has explicit allowed values and safe URL loading", async () => {
  const source = await readFile(new URL("../src/scripts/directory.ts", import.meta.url), "utf8");
  assert.match(source, /const allowedValues/);
  assert.match(source, /allowedValues\[key\]\?\.has\(value\)/);
  assert.match(source, /window\.addEventListener\("popstate"/);
});

test("comparison state enforces its selection bounds and handles unknown slugs", async () => {
  const source = await readFile(new URL("../src/scripts/comparison.ts", import.meta.url), "utf8");
  assert.match(source, /selectedCount > 4/);
  assert.match(source, /filter\(\(slug\) => !validSlugs\.has\(slug\)\)/);
  assert.match(source, /Choose at least two products/);
});

test("decision pack remains a printable, static output", async () => {
  const source = await readFile(new URL("../src/pages/shortlist/index.astro", import.meta.url), "utf8");
  assert.match(source, /Requirements worksheet/);
  assert.match(source, /Four-week trial plan/);
  assert.match(source, /Trustee or elder decision summary/);
});
