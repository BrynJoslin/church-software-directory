import test from "node:test";
import assert from "node:assert/strict";
import { buildManifest, cycleFor, mondayFor } from "../scripts/weekly-maintenance.mjs";

test("allocates the complete snapshot exactly once", () => {
  const manifest = buildManifest({ runDate: "2026-08-03", software: Array.from({ length: 147 }, (_, index) => ({ slug: `software-${index}`, lastReviewed: "2026-01-01", volatility: 0 })), guides: Array.from({ length: 27 }, (_, index) => ({ slug: `guide-${index}`, lastReviewed: null, volatility: 0 })), categories: Array.from({ length: 17 }, (_, index) => `category-${index}`) });
  assert.equal(new Set(manifest.software.map((item) => item.slug)).size, 147);
  assert.equal(new Set(manifest.guides.map((item) => item.slug)).size, 27);
  assert.deepEqual(manifest.software.reduce((result, item) => ({ ...result, [item.slot]: (result[item.slot] ?? 0) + 1 }), {}), { 1: 11, 2: 11, 3: 11, 4: 12, 5: 11, 6: 11, 7: 12, 8: 11, 9: 11, 10: 12, 11: 11, 12: 11, 13: 12 });
  assert.equal(manifest.guides.filter((item) => item.slot === 13).length, 3);
});

test("anchors the first weekly cycle on Monday", () => {
  assert.equal(mondayFor("2026-08-06"), "2026-08-03");
  assert.deepEqual(cycleFor("2026-10-26"), { cycle: 1, week: 13 });
});
