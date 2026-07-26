/**
 * Return related products only where a shared primary decision context and at
 * least one further structured similarity are present. Category order is the
 * recorded primary-to-secondary decision order for the current content model.
 */
export function findRelatedProducts(current, candidates, limit = 3) {
  const primaryCategory = current.data.categories[0]?.id;
  if (!primaryCategory) return [];

  return candidates
    .filter((candidate) => candidate.id !== current.id)
    .map((candidate) => {
      if (candidate.data.categories[0]?.id !== primaryCategory) return null;
      const reasons = [`Both are listed primarily for ${primaryCategory.replaceAll("-", " ")}.`];
      let score = 8;
      const sharedSizes = current.data.suitableChurchSizes.filter((size) => candidate.data.suitableChurchSizes.includes(size));
      if (sharedSizes.length) { reasons.push(`Both are listed for ${sharedSizes.join(", ")} churches.`); score += 3; }
      if (current.data.ukFocus === candidate.data.ukFocus) { reasons.push("Both record the same level of UK-specific evidence."); score += 2; }
      if (current.data.pricing.model === candidate.data.pricing.model) { reasons.push(`Both use a ${current.data.pricing.model.replaceAll("-", " ")} pricing model.`); score += 1; }
      if (current.data.coreFeatures.some((feature) => candidate.data.coreFeatures.includes(feature))) { reasons.push("Both record at least one of the same core features."); score += 1; }
      if (current.data.integrations.some((integration) => candidate.data.integrations.includes(integration))) { reasons.push("Both record at least one of the same integration areas."); score += 1; }
      if (reasons.length < 2) return null;
      return { entry: candidate, score, reason: reasons.slice(0, 2).join(" ") };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.entry.data.name.localeCompare(b.entry.data.name))
    .slice(0, limit);
}
