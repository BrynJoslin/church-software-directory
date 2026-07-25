import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const triState = z.enum(["yes", "no", "unknown"]);
const churchSize = z.enum(["small", "medium", "large", "multi-site"]);
const pricingModel = z.enum([
  "free",
  "freemium",
  "flat-rate",
  "tiered",
  "usage-based",
  "quote-based",
  "unknown"
]);
const verificationStatus = z.enum([
  "verified",
  "partially-verified",
  "needs-review"
]);
const evidenceState = z.enum([
  "confirmed",
  "independently-evidenced",
  "supplier-claim",
  "not-confirmed",
  "possibly-outdated"
]);
const decisionEvidence = z.object({
  value: z.string().min(1),
  state: evidenceState,
  source: z.url().optional(),
  checked: z.coerce.date().optional(),
  note: z.string().min(1).optional()
});
const sourceSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
  checked: z.coerce.date(),
  supports: z.array(z.string().min(1)).min(1)
});
const externalReviewSchema = z
  .object({
    platform: z.string().min(1),
    profileUrl: z.url(),
    rating: z.number().nonnegative().optional(),
    maximumRating: z.number().positive().optional(),
    reviewCount: z.number().int().nonnegative().optional(),
    lastChecked: z.coerce.date(),
    collectionType: z.enum(["product", "company"]),
    dataAccessMethod: z.enum(["manual", "api", "syndication"]),
    note: z.string().min(1).optional()
  })
  .superRefine((review, context) => {
    if (review.rating !== undefined && review.maximumRating === undefined) {
      context.addIssue({
        code: "custom",
        message: "maximumRating is required when rating is recorded.",
        path: ["maximumRating"]
      });
    }

    if (review.rating === undefined && review.maximumRating !== undefined) {
      context.addIssue({
        code: "custom",
        message: "rating is required when maximumRating is recorded.",
        path: ["rating"]
      });
    }

    if (
      review.rating !== undefined &&
      review.maximumRating !== undefined &&
      review.rating > review.maximumRating
    ) {
      context.addIssue({
        code: "custom",
        message: "rating cannot exceed maximumRating.",
        path: ["rating"]
      });
    }
  });
const longFormSection = z.object({
  heading: z.string().min(1),
  question: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1)
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/software" }),
  schema: z.object({
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    shortDescription: z.string().min(40).max(220),
    officialWebsite: z.url(),
    company: z.string().min(1),
    countryOfOrigin: z.string().optional(),
    ukFocus: z.enum(["strong", "general", "unknown"]),
    ukOrganisation: triState.default("unknown"),
    categories: z.array(reference("categories")).min(1),
    suitableChurchSizes: z.array(churchSize).min(1),
    suitableContexts: z.array(z.string().min(1)).default([]),
    pricing: z.object({
      model: pricingModel,
      summary: z.string().min(1),
      startingPrice: z
        .object({
          amount: z.number().nonnegative(),
          currency: z.enum(["GBP", "USD", "EUR"]),
          period: z.enum(["month", "year", "transaction"]),
          qualifier: z.string().optional()
        })
        .optional(),
      tiers: z
        .array(
          z.object({
            label: z.string().min(1),
            price: z.string().min(1),
            detail: z.string().min(1)
          })
        )
        .default([]),
      trialDetails: z.string().min(1).optional()
    }),
    freePlan: triState,
    freeTrial: triState,
    // Only record Gift Aid for products that handle donation or charity-finance workflows.
    giftAid: triState.optional(),
    demoAvailable: triState,
    dataHosting: z.string().optional(),
    gdprInformation: z.string().optional(),
    coreFeatures: z.array(z.string().min(1)).default([]),
    integrations: z.array(z.string().min(1)).default([]),
    importExport: z.array(z.string().min(1)).default([]),
    support: z.array(z.string().min(1)).default([]),
    decisionEvidence: z.record(z.string(), decisionEvidence).default({}),
    brandAssets: z
      .object({
        logo: z.object({
          src: z.string().regex(/^\//),
          alt: z.string().min(1),
          source: z.url(),
          checked: z.coerce.date()
        })
      })
      .optional(),
    editorial: z.object({
      assessment: z.string().min(40),
      bestFor: z.array(z.string().min(1)).min(1),
      strengths: z.array(z.string().min(1)).min(1),
      limitations: z.array(z.string().min(1)).min(1),
          procurementVerdict: z
        .object({
          problem: z.string().min(1),
          differentiator: z.string().min(1),
          firstCheck: z.string().min(1)
        })
        .optional()
    }),
    longForm: z
      .object({
        verdict: z.string().min(80),
        decisionLens: z.object({
          heading: z.string().min(1),
          text: z.string().min(80)
        }),
        sections: z.array(longFormSection).min(1),
        userFeedback: z.object({
          summary: z.string().min(80),
          themes: z.array(z.string().min(1)).min(1),
          caveat: z.string().min(40)
        }),
        faq: z
          .array(
            z.object({
              question: z.string().min(1),
              answer: z.string().min(30)
            })
          )
          .min(1)
      })
      .optional(),
    verificationStatus,
    lastChecked: z.coerce.date(),
    sources: z.array(sourceSchema).min(1),
    externalReviews: z.array(externalReviewSchema).default([]),
    affiliateRelationship: triState.default("no"),
    affiliateUrl: z.url().optional(),
    sponsored: z.boolean().default(false),
    seo: z.object({
      title: z.string().max(65),
      description: z.string().min(50).max(170)
    })
  })
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    shortDescription: z.string().min(40).max(220),
    ownerRoles: z.array(z.string().min(1)).min(1),
    selectionCriteria: z.array(z.string().min(1)).min(1),
    ukConsiderations: z.array(z.string().min(1)).min(1),
    seo: z.object({
      title: z.string().max(65),
      description: z.string().min(50).max(170)
    })
  })
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    guideType: z.enum([
      "buyers-guide",
      "comparison",
      "alternatives",
      "cost-guide",
      "explainer",
      "how-to"
    ]),
    standardVersion: z.enum(["legacy", "1.0"]),
    summary: z.string().min(40).max(240),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    relatedCategories: z.array(reference("categories")).default([]),
    seo: z.object({
      title: z.string().max(65),
      description: z.string().min(50).max(170)
    })
  })
});

export const collections = { software, categories, guides };
