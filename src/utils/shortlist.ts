export type ShortlistAnswers = {
  job: string;
  contactBand: "any" | "small" | "medium" | "large" | "multi-site";
  ukLocation: "any" | "yes";
  giftAid: "any" | "yes";
  approach: "any" | "integrated" | "specialist";
  technicalAdministration: "any" | "limited" | "available";
};

export type ShortlistProduct = {
  slug: string;
  name: string;
  categories: string[];
  suitableChurchSizes: string[];
  ukFocus: "strong" | "general" | "unknown";
  giftAid?: "yes" | "no" | "unknown";
  pricing: {
    summary: string;
    startingPrice?: { amount: number; currency: "GBP" | "USD" | "EUR"; period: "month" | "year" | "transaction"; qualifier?: string };
  };
  procurementVerdict: { problem: string; firstCheck: string };
  decisionEvidence: Record<string, { value: string; state: string }>;
};

export const shortlistJobs = [
  { value: "church-management", label: "Bring people records and church administration together" },
  { value: "online-giving", label: "Improve online or in-person giving" },
  { value: "church-accounting", label: "Manage church accounting and finance" },
  { value: "events-ticketing", label: "Run events, bookings or ticketing" },
  { value: "worship-planning", label: "Plan services and coordinate volunteers" },
  { value: "presentation-software", label: "Present content in services" },
  { value: "church-websites", label: "Build or improve the church website" },
  { value: "church-communications", label: "Communicate with the church" },
  { value: "livestreaming", label: "Livestream services" },
  { value: "sermon-hosting", label: "Publish sermons or teaching" },
  { value: "childrens-ministry", label: "Support children’s ministry and check-in" },
  { value: "bible-study", label: "Support Bible study and research" }
] as const;

const knownTechnicalAdministration = (product: ShortlistProduct) => {
  const field = product.decisionEvidence["technical-administration"];
  return field && field.state !== "needs-refresh";
};

export const decisionFieldLabel = (key: string) =>
  decisionFieldDefinitions.find((field) => field.key === key)?.label ??
  key.replaceAll("-", " ");

export const decisionFieldQuestion = (key: string) =>
  decisionFieldDefinitions.find((field) => field.key === key)?.question ??
  `Ask the supplier about ${key.replaceAll("-", " ")}.`;

const reasonsFor = (product: ShortlistProduct, answers: ShortlistAnswers) => {
  const reasons = [
    product.categories[0] === answers.job
      ? "Its primary recorded category matches the job you selected."
      : "It is recorded in the category for the job you selected."
  ];
  if (answers.contactBand !== "any" && product.suitableChurchSizes.includes(answers.contactBand)) {
    reasons.push("Its editorial context includes the scale you selected; this is not a published contact limit.");
  }
  if (answers.ukLocation === "yes") reasons.push("The profile has UK-specific evidence.");
  if (answers.giftAid === "yes") reasons.push("A Gift Aid workflow is recorded in the profile.");
  if (answers.approach === "integrated") reasons.push("It is recorded as a church-management system as well as the selected task.");
  if (answers.approach === "specialist") reasons.push("It focuses on the selected task rather than being recorded as a church-management suite.");
  return reasons;
};

export const unresolvedFor = (product: ShortlistProduct, answers: ShortlistAnswers) => {
  const fields = ["contact-band", "uk-purchasing", "technical-administration", "implementation", "gbp-pricing"];
  if (answers.giftAid === "yes") fields.push("gift-aid");
  return fields
    .filter((key) => {
      const field = product.decisionEvidence[key];
      return !field || field.state === "needs-refresh";
    })
    .slice(0, 3);
};

export const shortlistProducts = (products: ShortlistProduct[], answers: ShortlistAnswers) => {
  if (!answers.job) return [];
  const matches = products
    .filter((product) => product.categories.includes(answers.job))
    .filter((product) => answers.contactBand === "any" || product.suitableChurchSizes.includes(answers.contactBand))
    .filter((product) => answers.ukLocation !== "yes" || product.ukFocus === "strong")
    .filter((product) => answers.giftAid !== "yes" || product.giftAid === "yes")
    .filter((product) => answers.approach !== "integrated" || product.categories.includes("church-management"))
    .filter((product) => answers.approach !== "specialist" || !product.categories.includes("church-management"))
    .sort((a, b) => {
      const primary = Number(b.categories[0] === answers.job) - Number(a.categories[0] === answers.job);
      if (primary) return primary;
      const uk = Number(b.ukFocus === "strong") - Number(a.ukFocus === "strong");
      if (uk) return uk;
      return a.name.localeCompare(b.name);
    });

  // The technical-administration answer is intentionally not a filter unless
  // profiles contain sufficient evidence. It remains visible in the decision pack.
  void knownTechnicalAdministration;
  return matches.length >= 3 ? matches.slice(0, 5).map((product) => ({ product, reasons: reasonsFor(product, answers) })) : [];
};

export const answerLabels: Record<keyof Omit<ShortlistAnswers, "job">, Record<string, string>> = {
  contactBand: { any: "Not specified", small: "Smaller church", medium: "Medium church", large: "Larger church", "multi-site": "Multi-site church" },
  ukLocation: { any: "Not specified", yes: "Based in the UK" },
  giftAid: { any: "Not specified", yes: "Gift Aid is needed" },
  approach: { any: "No preference", integrated: "Prefer an integrated system", specialist: "Prefer a specialist tool" },
  technicalAdministration: { any: "Not specified", limited: "Limited technical administration available", available: "Technical administration is available" }
};
import { decisionFieldDefinitions } from "./decision-evidence.ts";
