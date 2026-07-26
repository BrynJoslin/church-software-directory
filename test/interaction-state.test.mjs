import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import {
  matchingShortlistProducts,
  nextShortlistQuestion,
  shortlistProducts
} from "../src/utils/shortlist.ts";

const product = (overrides = {}) => ({
  slug: "example", name: "Example", categories: ["church-management"], suitableChurchSizes: ["small"], ukFocus: "strong", giftAid: "yes",
  pricing: { summary: "Published GBP price", startingPrice: { amount: 10, currency: "GBP", period: "month" } },
  procurementVerdict: { problem: "Keep people records together", firstCheck: "Test exports" }, decisionEvidence: {}, ...overrides
});
const answers = { job: "church-management", contactBand: "small", ukLocation: "yes", giftAid: "yes", approach: "any" };

test("shortlist returns a bounded, evidence-matched set", () => {
  const matches = shortlistProducts([product(), product({ slug: "two", name: "Two" }), product({ slug: "three", name: "Three" }), product({ slug: "four", name: "Four" }), product({ slug: "five", name: "Five" }), product({ slug: "six", name: "Six" })], answers);
  assert.equal(matches.length, 5);
  assert.ok(matches.every(({ product: item }) => item.ukFocus === "strong" && item.giftAid === "yes"));
});

test("exact matching remains unbounded while detailed results stop at five", () => {
  const products = Array.from({ length: 7 }, (_, index) => product({ slug: `product-${index}`, name: `Product ${index}` }));
  assert.equal(matchingShortlistProducts(products, answers).length, 7);
  assert.equal(shortlistProducts(products, answers).length, 5);
});

test("a genuine one or two-product result is retained", () => {
  const products = [product(), product({ slug: "two", name: "Two" })];
  assert.equal(shortlistProducts(products, answers).length, 2);
});

test("questions expose only positive answers that reduce the current matches", () => {
  const products = [
    product(),
    product({ slug: "two", name: "Two", suitableChurchSizes: ["medium"] }),
    product({ slug: "three", name: "Three", suitableChurchSizes: ["medium"] }),
    product({ slug: "four", name: "Four", suitableChurchSizes: ["small", "medium"] })
  ];
  const question = nextShortlistQuestion(products, { ...answers, contactBand: "any", ukLocation: "any", giftAid: "any" });
  assert.equal(question?.key, "contactBand");
  assert.deepEqual(question?.options.map(({ value, count }) => [value, count]), [["small", 2], ["medium", 3]]);
  assert.ok(question?.options.every(({ count }) => count > 0 && count < products.length));
});

test("the journey skips unchanged questions and advances to the next useful one", () => {
  const products = [
    product(),
    product({ slug: "two", name: "Two", giftAid: "no" }),
    product({ slug: "three", name: "Three", giftAid: "no" })
  ];
  const question = nextShortlistQuestion(products, { ...answers, contactBand: "any", ukLocation: "any", giftAid: "any" });
  assert.equal(question?.key, "giftAid");
  assert.deepEqual(question?.options.map(({ value, count }) => [value, count]), [["yes", 1]]);
});

test("a deliberately skipped question advances to a later useful question", () => {
  const products = [
    product(),
    product({ slug: "two", name: "Two", suitableChurchSizes: ["medium"], giftAid: "no" }),
    product({ slug: "three", name: "Three", suitableChurchSizes: ["medium"], giftAid: "no" })
  ];
  const openAnswers = { ...answers, contactBand: "any", ukLocation: "any", giftAid: "any" };
  assert.equal(nextShortlistQuestion(products, openAnswers)?.key, "contactBand");
  assert.equal(nextShortlistQuestion(products, openAnswers, ["contactBand"])?.key, "giftAid");
});

test("the journey ends when no remaining question can reduce the list", () => {
  const products = [product(), product({ slug: "two", name: "Two" })];
  assert.equal(
    nextShortlistQuestion(products, { ...answers, contactBand: "any", ukLocation: "any", giftAid: "any" }),
    null
  );
});

test("category-specific questions are not asked outside their decision context", () => {
  const products = [
    product({ categories: ["presentation-software", "church-management"], giftAid: "yes" }),
    product({ slug: "two", name: "Two", categories: ["presentation-software"], giftAid: "no" })
  ];
  const question = nextShortlistQuestion(products, {
    job: "presentation-software",
    contactBand: "any",
    ukLocation: "any",
    giftAid: "any",
    approach: "any"
  });
  assert.equal(question?.key, "approach");
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
  assert.match(source, /Answer another question/);
  assert.match(source, /Every answer shown will reduce/);
});

test("shortlist URL loading validates every answer against the current count", async () => {
  const source = await readFile(new URL("../src/scripts/shortlist.ts", import.meta.url), "utf8");
  assert.match(source, /afterCount > 0 && afterCount < beforeCount/);
  assert.match(source, /params\.get\("category"\) \?\? params\.get\("job"\)/);
  assert.match(source, /window\.addEventListener\("popstate"/);
});
