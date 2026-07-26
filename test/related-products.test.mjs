import assert from "node:assert/strict";
import test from "node:test";
import { findRelatedProducts } from "../src/utils/related-products.js";

const entry = (id, categories, overrides = {}) => ({ id, data: { name: id, categories: categories.map((category) => ({ id: category })), suitableChurchSizes: ["small"], ukFocus: "strong", pricing: { model: "tiered" }, coreFeatures: [], integrations: [], ...overrides } });

test("requires a shared primary decision context and another similarity", () => {
  const current = entry("current", ["church-management", "online-giving"]);
  const valid = entry("valid", ["church-management"]);
  const secondaryOnly = entry("secondary-only", ["online-giving", "church-management"]);
  const unrelated = entry("unrelated", ["presentation-software"]);
  const related = findRelatedProducts(current, [valid, secondaryOnly, unrelated]);
  assert.deepEqual(related.map((item) => item.entry.id), ["valid"]);
  assert.match(related[0].reason, /primarily for church management/);
});
