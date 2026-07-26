export const triStateLabel = (value: "yes" | "no" | "unknown") => {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return null;
};

export const ukFocusLabel = (
  value: "strong" | "general" | "unknown"
) => {
  if (value === "strong") return "UK-specific evidence";
  if (value === "general") return "Available more broadly";
  return null;
};

export const ukOrganisationLabel = (value: "yes" | "no" | "unknown") => {
  if (value === "yes") return "UK registered";
  if (value === "no") return "Not UK registered";
  return null;
};

export const verificationLabel = (
  value: "verified" | "partially-verified" | "needs-review"
) =>
  ({
    verified: "Verified",
    "partially-verified": "Partially verified",
    "needs-review": "Needs review"
  })[value];

export const pricingModelLabel = (value: string) =>
  ({
    free: "Free",
    freemium: "Freemium",
    "flat-rate": "Flat rate",
    tiered: "Tiered",
    "usage-based": "Usage based",
    "quote-based": "Quote based",
    unknown: null
  })[value] ?? null;

export const formatDate = (value: Date | string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value));

export const formatCompactDate = (value: Date | string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));

export const formatStartingPrice = (
  value:
    | {
        amount: number;
        currency: "GBP" | "USD" | "EUR";
        period: "month" | "year" | "transaction";
      }
    | undefined
) => {
  if (!value) return null;

  const amount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: value.currency,
    maximumFractionDigits: value.amount % 1 === 0 ? 0 : 2
  }).format(value.amount);

  return `${amount} / ${value.period}`;
};
