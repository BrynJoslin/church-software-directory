import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const offers = (await getCollection("charityOffers"))
    .filter((entry) => ["published", "warning"].includes(entry.data.publicationStatus))
    .map(({ data }) => ({ name: data.name, slug: data.slug, provider: data.provider, summary: data.summary, categories: data.categories, benefits: data.benefits, churchEligibility: data.churchEligibility, ukAvailability: data.ukAvailability, application: data.application, caveats: data.caveats, firstCheck: data.firstCheck, relatedSoftware: data.relatedSoftware?.id, sources: data.sources, lastChecked: data.lastChecked, reviewDue: data.reviewDue, publicationStatus: data.publicationStatus }));
  return new Response(JSON.stringify(offers, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8" } });
};
