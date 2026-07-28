export const setupResultReveal = (
  results: HTMLElement,
  cards: HTMLElement[],
  limit = 20
) => {
  const controls = results.parentElement;
  const button = controls?.querySelector<HTMLButtonElement>("[data-show-more-results]");
  const status = controls?.querySelector<HTMLElement>("[data-result-reveal-status]");
  let shown = limit;

  const update = (visibleCards: HTMLElement[], reset = false) => {
    if (reset) shown = limit;
    const visibleLimit = Math.min(shown, visibleCards.length);
    const visibleSet = new Set(visibleCards);

    cards.forEach((card) => {
      card.hidden = !visibleSet.has(card) || visibleCards.indexOf(card) >= visibleLimit;
    });

    if (button) {
      const remaining = visibleCards.length - visibleLimit;
      button.hidden = remaining <= 0;
      button.textContent = `Show ${Math.min(limit, remaining)} more products (${remaining} remaining)`;
    }
    if (status) {
      status.textContent =
        visibleCards.length > visibleLimit
          ? `Showing ${visibleLimit} of ${visibleCards.length} products.`
          : `Showing all ${visibleCards.length} products.`;
    }
  };

  button?.addEventListener("click", () => {
    shown += limit;
    update(cards.filter((card) => !card.dataset.filterMatch || card.dataset.filterMatch === "true"));
  });

  update(cards);
  return { update };
};

const staticResults = document.querySelector<HTMLElement>("[data-result-reveal]:not([data-software-results])");
if (staticResults) {
  setupResultReveal(
    staticResults,
    Array.from(staticResults.querySelectorAll<HTMLElement>("[data-software-card]"))
  );
}
