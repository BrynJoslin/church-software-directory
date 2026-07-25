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
const sourceSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
  checked: z.coerce.date(),
  supports: z.array(z.string().min(1)).min(1)
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
        .optional()
    }),
    freePlan: triState,
    freeTrial: triState,
    giftAid: triState,
    demoAvailable: triState,
    dataHosting: z.string().optional(),
    gdprInformation: z.string().optional(),
    coreFeatures: z.array(z.string().min(1)).default([]),
    integrations: z.array(z.string().min(1)).default([]),
    importExport: z.array(z.string().min(1)).default([]),
    support: z.array(z.string().min(1)).default([]),
    editorial: z.object({
      assessment: z.string().min(40),
      bestFor: z.array(z.string().min(1)).min(1),
      strengths: z.array(z.string().min(1)).min(1),
      limitations: z.array(z.string().min(1)).min(1)
    }),
    verificationStatus,
    lastChecked: z.coerce.date(),
    sources: z.array(sourceSchema).min(1),
    affiliateRelationship: triState.default("no"),
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
