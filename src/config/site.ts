import rawConfig from "./site.json";
import { z } from "astro/zod";

const optionalUrl = z.url().optional();

export const siteConfigSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  url: z.url(),
  description: z.string().min(1),
  contactEmail: z.email().optional(),
  publisher: z.object({
    name: z.string().min(1).optional(),
    background: z.string().min(1).optional(),
    correctionRoute: z.url().optional()
  }).default({}),
  social: z.object({ mastodon: z.string(), linkedin: z.string() }),
  forms: z.object({
    enabled: z.boolean(),
    suggestSoftware: optionalUrl,
    updateListing: optionalUrl
  }).superRefine((value, context) => {
    if (value.enabled && (!value.suggestSoftware || !value.updateListing)) {
      context.addIssue({ code: "custom", message: "Enabled forms need both configured endpoints." });
    }
  }),
  analytics: z.object({ enabled: z.boolean(), provider: z.string() }),
  features: z.object({ affiliateLinks: z.boolean(), sponsoredListings: z.boolean() }),
  defaultSeoImage: z.string().regex(/^\//),
  staleListingDays: z.number().int().positive()
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse(rawConfig);
