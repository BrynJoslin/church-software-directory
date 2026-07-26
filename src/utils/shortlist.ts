import { decisionFieldDefinitions } from "./decision-evidence.ts";

export type ContactBand = "small" | "medium" | "large" | "multi-site";
export type ShortlistApproach = "integrated" | "specialist";

export type ShortlistAnswers = {
  job: string;
  contactBand: "any" | ContactBand;
  ukLocation: "any" | "yes";
  giftAid: "any" | "yes";
  approach: "any" | ShortlistApproach;
};

export type ShortlistQuestionKey = Exclude<keyof ShortlistAnswers, "job">;

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

type ShortlistQuestionOption = {
  value: string;
  label: string;
};

export type ShortlistQuestionDefinition = {
  key: ShortlistQuestionKey;
  parameter: string;
  legend: string;
  hint: string;
  options: readonly ShortlistQuestionOption[];
  categories?: readonly string[];
};

export type ViableShortlistQuestion = Omit<ShortlistQuestionDefinition, "options"> & {
  options: Array<ShortlistQuestionOption & { count: number }>;
};

export const defaultShortlistAnswers = (): ShortlistAnswers => ({
  job: "",
  contactBand: "any",
  ukLocation: "any",
  giftAid: "any",
  approach: "any"
});

export const shortlistQuestionDefinitions: readonly ShortlistQuestionDefinition[] = [
  {
    key: "contactBand",
    parameter: "contact-band",
    legend: "Which recorded church scale should the products cover?",
    hint: "These are editorial context labels, not supplier contact or attendance limits. Only options that narrow the current matches are shown.",
    options: [
      { value: "small", label: "Smaller church" },
      { value: "medium", label: "Medium church" },
      { value: "large", label: "Larger church" },
      { value: "multi-site", label: "Multi-site church" }
    ]
  },
  {
    key: "ukLocation",
    parameter: "uk-location",
    legend: "Is strong UK-specific product evidence essential?",
    hint: "This keeps products whose profiles record a strong UK focus. It is not a legal-compliance judgement.",
    options: [{ value: "yes", label: "Yes, strong UK-specific evidence is essential" }]
  },
  {
    key: "giftAid",
    parameter: "gift-aid",
    legend: "Must the product have a recorded Gift Aid workflow?",
    hint: "This uses recorded supplier evidence. Your church should still test the declaration, claim and reconciliation workflow.",
    options: [{ value: "yes", label: "Yes, Gift Aid is essential" }],
    categories: ["church-management", "online-giving", "church-accounting"]
  },
  {
    key: "approach",
    parameter: "approach",
    legend: "Would you prefer a broader system or a specialist tool?",
    hint: "A broader system is also recorded as church-management software. A specialist tool focuses on the selected category.",
    options: [
      { value: "integrated", label: "Broader integrated system" },
      { value: "specialist", label: "Specialist tool" }
    ]
  }
] as const;

export const shortlistParameterFor = (key: ShortlistQuestionKey) =>
  shortlistQuestionDefinitions.find((question) => question.key === key)?.parameter;

export const decisionFieldLabel = (key: string) =>
  decisionFieldDefinitions.find((field) => field.key === key)?.label ??
  key.replaceAll("-", " ");

export const decisionFieldQuestion = (key: string) =>
  decisionFieldDefinitions.find((field) => field.key === key)?.question ??
  `Ask the supplier about ${key.replaceAll("-", " ")}.`;

const reasonsFor = (product: ShortlistProduct, answers: ShortlistAnswers) => {
  const reasons = [
    product.categories[0] === answers.job
      ? "Its primary recorded category matches the category you selected."
      : "It is recorded in the category you selected."
  ];
  if (answers.contactBand !== "any" && product.suitableChurchSizes.includes(answers.contactBand)) {
    reasons.push("Its editorial context includes the scale you selected; this is not a published contact limit.");
  }
  if (answers.ukLocation === "yes") reasons.push("The profile has strong UK-specific evidence.");
  if (answers.giftAid === "yes") reasons.push("A Gift Aid workflow is recorded in the profile.");
  if (answers.approach === "integrated") reasons.push("It is recorded as a church-management system as well as the selected category.");
  if (answers.approach === "specialist") reasons.push("It focuses on the selected category rather than being recorded as a church-management suite.");
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

const matchesAnswers = (product: ShortlistProduct, answers: ShortlistAnswers) =>
  product.categories.includes(answers.job) &&
  (answers.contactBand === "any" || product.suitableChurchSizes.includes(answers.contactBand)) &&
  (answers.ukLocation !== "yes" || product.ukFocus === "strong") &&
  (answers.giftAid !== "yes" || product.giftAid === "yes") &&
  (answers.approach !== "integrated" || product.categories.includes("church-management")) &&
  (answers.approach !== "specialist" || !product.categories.includes("church-management"));

const sortMatches = (products: ShortlistProduct[], answers: ShortlistAnswers) =>
  [...products].sort((a, b) => {
    const primary = Number(b.categories[0] === answers.job) - Number(a.categories[0] === answers.job);
    if (primary) return primary;
    const uk = Number(b.ukFocus === "strong") - Number(a.ukFocus === "strong");
    if (uk) return uk;
    return a.name.localeCompare(b.name);
  });

export const matchingShortlistProducts = (products: ShortlistProduct[], answers: ShortlistAnswers) => {
  if (!answers.job) return [];
  return sortMatches(products.filter((product) => matchesAnswers(product, answers)), answers);
};

export const shortlistProducts = (products: ShortlistProduct[], answers: ShortlistAnswers) =>
  matchingShortlistProducts(products, answers)
    .slice(0, 5)
    .map((product) => ({ product, reasons: reasonsFor(product, answers) }));

const withQuestionAnswer = (
  answers: ShortlistAnswers,
  key: ShortlistQuestionKey,
  value: string
): ShortlistAnswers => ({
  ...answers,
  [key]: value
}) as ShortlistAnswers;

export const nextShortlistQuestion = (
  products: ShortlistProduct[],
  answers: ShortlistAnswers,
  skipped: readonly ShortlistQuestionKey[] = []
): ViableShortlistQuestion | null => {
  const currentCount = matchingShortlistProducts(products, answers).length;
  if (!currentCount) return null;

  for (const question of shortlistQuestionDefinitions) {
    if (
      answers[question.key] !== "any" ||
      skipped.includes(question.key) ||
      (question.categories && !question.categories.includes(answers.job))
    ) {
      continue;
    }

    const options = question.options.flatMap((option) => {
      const count = matchingShortlistProducts(
        products,
        withQuestionAnswer(answers, question.key, option.value)
      ).length;
      return count > 0 && count < currentCount ? [{ ...option, count }] : [];
    });

    if (options.length) return { ...question, options };
  }

  return null;
};

export const answerLabels: Record<ShortlistQuestionKey, Record<string, string>> = {
  contactBand: { small: "Smaller church", medium: "Medium church", large: "Larger church", "multi-site": "Multi-site church" },
  ukLocation: { yes: "Strong UK-specific evidence is essential" },
  giftAid: { yes: "Gift Aid is essential" },
  approach: { integrated: "Prefer a broader integrated system", specialist: "Prefer a specialist tool" }
};

export const answerHeading: Record<ShortlistQuestionKey, string> = {
  contactBand: "Church scale",
  ukLocation: "UK-specific evidence",
  giftAid: "Gift Aid",
  approach: "System preference"
};
