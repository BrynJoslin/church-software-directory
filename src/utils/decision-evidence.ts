import type { CollectionEntry } from "astro:content";
import {
  decisionFieldDefinitions,
  type DecisionFieldKey
} from "../config/decision-fields.ts";
import { formatCompactDate, triStateLabel } from "./content.ts";

export { decisionFieldDefinitions, type DecisionFieldKey };
export type EvidenceState =
  | "supplier-published"
  | "independent-source"
  | "directory-tested"
  | "needs-refresh";
export type DecisionField = {
  key: DecisionFieldKey;
  label: string;
  value: string;
  state: EvidenceState;
  source?: { label: string; url: string; checked: Date };
  note?: string;
  question: string;
};

type SoftwareEntry = CollectionEntry<"software">;

export const evidenceStateLabel = (state: EvidenceState) => ({
  "supplier-published": "Supplier source",
  "independent-source": "Independent source",
  "directory-tested": "Directory tested",
  "needs-refresh": "Recheck source"
})[state];

const findSource = (entry: SoftwareEntry, hints: readonly string[]) =>
  entry.data.sources.find((source) => {
    const supported = source.supports.join(" ").toLowerCase();
    return hints.some((hint) => supported.includes(hint));
  });

const isPossiblyOutdated = (date: Date) =>
  Date.now() - date.getTime() > 180 * 24 * 60 * 60 * 1000;

const inferredValue = (entry: SoftwareEntry, key: DecisionFieldKey): string | null => {
  const { data } = entry;
  if (key === "gbp-pricing") {
    if (data.pricing.startingPrice?.currency === "GBP") return "Published GBP starting price";
    if (data.pricing.startingPrice) return `Published ${data.pricing.startingPrice.currency} starting price`;
    return null;
  }
  if (key === "gift-aid") return data.giftAid ? triStateLabel(data.giftAid) : null;
  if (key === "hosting") return data.dataHosting ?? null;
  if (key === "exports") return data.importExport.length ? data.importExport.join("; ") : null;
  if (key === "uk-support") return data.support.length ? data.support.join("; ") : null;
  return null;
};

export const decisionFieldsFor = (entry: SoftwareEntry): DecisionField[] =>
  decisionFieldDefinitions.flatMap((definition) => {
    const override = entry.data.decisionEvidence[definition.key];
    if (override) {
      return [{
        key: definition.key,
        label: definition.label,
        value: override.value,
        state: override.state,
        source: override.source && override.checked
          ? { label: "Recorded evidence", url: override.source, checked: override.checked }
          : undefined,
        note: override.note,
        question: definition.question
      }];
    }
    const source = findSource(entry, definition.hints);
    const value = inferredValue(entry, definition.key);
    if (!source || !value) return [];
    const state: EvidenceState = isPossiblyOutdated(source.checked)
      ? "needs-refresh"
      : "supplier-published";
    return [{
      key: definition.key,
      label: definition.label,
      value,
      state,
      source: source ? { label: source.label, url: source.url, checked: source.checked } : undefined,
      note: source
        ? `Checked ${formatCompactDate(source.checked)}`
        : undefined,
      question: definition.question
    }];
  });

export const evidenceSummaryFor = (entry: SoftwareEntry) => {
  const fields = decisionFieldsFor(entry);
  const counts = fields.reduce<Record<EvidenceState, number>>((result, field) => {
    result[field.state] += 1;
    return result;
  }, {
    "supplier-published": 0,
    "independent-source": 0,
    "directory-tested": 0,
    "needs-refresh": 0
  });
  return { fields, counts };
};
