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

test("comparison selectors prevent duplicates and preserve valid URL state", async () => {
  const [source, page] = await Promise.all([
    readFile(new URL("../src/scripts/comparison.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/compare/index.astro", import.meta.url), "utf8")
  ]);
  assert.match(source, /selectedElsewhere/);
  assert.match(source, /option\.disabled = selectedElsewhere\.has/);
  assert.match(source, /filter\(\(slug\) => !validSlugs\.has\(slug\)\)/);
  assert.match(source, /slice\(0, 4\)/);
  assert.match(source, /window\.addEventListener\("popstate"/);
  assert.match(page, /data-comparison-search/);
  assert.match(page, /comparison-fallback-list/);
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

test("homepage search uses the directory query state and its entry routes are consent-measurable", async () => {
  const [home, layout] = await Promise.all([
    readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8"),
    readFile(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8")
  ]);
  assert.match(home, /action="\/software\/" method="get"/);
  assert.match(home, /name="q"/);
  assert.match(home, /homepage_search/);
  assert.match(home, /homepage_directory_entry/);
  assert.match(home, /homepage_comparison_entry/);
  assert.match(home, /homepage_shortlist_start/);
  assert.match(home, /getDirectoryStats\(software\)/);
  assert.match(home, /directoryStats\.sourceLinkCount/);
  assert.match(layout, /data-analytics-event/);
  assert.match(layout, /localStorage\.getItem\(consentKey\) === "accepted"/);
});

test("directory reveal keeps filtering and sorting on the complete card set", async () => {
  const [directory, reveal, cards] = await Promise.all([
    readFile(new URL("../src/scripts/directory.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/scripts/result-reveal.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/components/SoftwareCard.astro", import.meta.url), "utf8")
  ]);
  assert.match(directory, /setupResultReveal\(results, cards\)/);
  assert.match(directory, /sortedCards\.filter\(\(card\) => card\.dataset\.filterMatch === "true"\)/);
  assert.match(reveal, /const visibleLimit = Math\.min\(shown, visibleCards\.length\)/);
  assert.match(reveal, /Show \$\{Math\.min\(limit, remaining\)\} more products/);
  assert.match(cards, /Published from/);
  assert.match(cards, /Relevant check/);
  assert.match(cards, /Best fit/);
  assert.match(cards, /Add to comparison/);
});

test("profiles present a three-level answer before the full evidence record", async () => {
  const source = await readFile(new URL("../src/pages/software/[slug].astro", import.meta.url), "utf8");
  const summary = source.indexOf("30-second answer");
  const assessment = source.indexOf("Five-minute assessment");
  const dueDiligence = source.indexOf("Full due diligence");
  const sources = source.indexOf("Sources reviewed");
  assert.ok(summary > -1 && assessment > summary && dueDiligence > assessment && sources > dueDiligence);
  assert.match(source, /Shortlist when/);
  assert.match(source, /Check first/);
  assert.match(source, /Settle before buying/);
});

test("guide hub keeps static content while restoring valid URL search and filters", async () => {
  const [page, source] = await Promise.all([
    readFile(new URL("../src/pages/guides/index.astro", import.meta.url), "utf8"),
    readFile(new URL("../src/scripts/guides.ts", import.meta.url), "utf8")
  ]);
  assert.match(page, /data-guide-card/);
  assert.match(page, /data-guide-task-link/);
  assert.match(page, /\/guides\/topics\/\$\{category\.data\.slug\}/);
  assert.doesNotMatch(page, /data-guide-category-link/);
  assert.match(page, /data-guide-empty-state/);
  assert.match(page, /<noscript>/);
  assert.match(page, /action="\/guides\/#all-guides"/);
  assert.match(page, /id="all-guides"/);
  assert.match(source, /const validTasks/);
  assert.doesNotMatch(source, /validCategories/);
  assert.match(source, /window\.addEventListener\("popstate"/);
  assert.match(source, /terms\.every/);
  assert.match(source, /allGuidesSection\?\.scrollIntoView\(\{ block: "start" \}\)/);
});

test("guide navigation remains curated and contextually rendered", async () => {
  const [checker, categoryPage, softwarePage, guidePage, topicPage, home] = await Promise.all([
    readFile(new URL("../scripts/check-guides.mjs", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/categories/[slug].astro", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/software/[slug].astro", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/guides/[slug].astro", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/guides/topics/[slug].astro", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8")
  ]);
  assert.match(checker, /featured category .*relatedCategories/);
  assert.match(checker, /featured software .*software-profile link/);
  assert.match(checker, /exactly three unique startHereOrder/);
  assert.match(categoryPage, /Guides for this decision/);
  assert.match(softwarePage, /Guides that discuss/);
  assert.match(guidePage, /Continue your decision/);
  assert.match(topicPage, /getStaticPaths/);
  assert.match(topicPage, /Complete guide list/);
  assert.match(topicPage, /What to settle before choosing/);
  assert.match(topicPage, /UK considerations/);
  assert.match(home, /startHereOrder/);
});
