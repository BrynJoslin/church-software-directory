const form = document.querySelector<HTMLFormElement>("[data-directory-form]");
const results = document.querySelector<HTMLElement>("[data-software-results]");
const cards = Array.from(
  document.querySelectorAll<HTMLElement>("[data-software-card]")
);
const resultCount = document.querySelector<HTMLElement>("#result-count");
const emptyState = document.querySelector<HTMLElement>("[data-empty-state]");
const allowedValues: Record<string, Set<string>> = {
  category: new Set(["church-management", "online-giving", "worship-planning"]),
  "uk-focus": new Set(["strong", "general", "unknown"]),
  size: new Set(["small", "medium", "large", "multi-site"]),
  "free-plan": new Set(["yes", "no", "unknown"]),
  "free-trial": new Set(["yes", "no", "unknown"]),
  "gift-aid": new Set(["yes", "no", "unknown"]),
  pricing: new Set([
    "free",
    "freemium",
    "flat-rate",
    "tiered",
    "usage-based",
    "quote-based",
    "unknown"
  ]),
  sort: new Set(["name", "last-checked"])
};

const getControl = (name: string) =>
  form?.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;

const clearFilters = () => {
  form?.reset();
  const sort = getControl("sort");
  if (sort) sort.value = "name";
  applyFilters("push");
};

const matchesList = (value: string | undefined, selected: string) =>
  !selected || (value ?? "").split(",").includes(selected);

const applyFilters = (historyMode: "push" | "replace" = "replace") => {
  if (!form || !results || !resultCount || !emptyState) return;

  const query = (getControl("q")?.value ?? "").trim().toLowerCase();
  const category = getControl("category")?.value ?? "";
  const ukFocus = getControl("uk-focus")?.value ?? "";
  const size = getControl("size")?.value ?? "";
  const freePlan = getControl("free-plan")?.value ?? "";
  const freeTrial = getControl("free-trial")?.value ?? "";
  const giftAid = getControl("gift-aid")?.value ?? "";
  const pricing = getControl("pricing")?.value ?? "";
  const sort = getControl("sort")?.value ?? "name";
  let visibleCount = 0;

  cards.forEach((card) => {
    const visible =
      (!query || (card.dataset.search ?? "").includes(query)) &&
      matchesList(card.dataset.categories, category) &&
      (!ukFocus || card.dataset.ukFocus === ukFocus) &&
      matchesList(card.dataset.sizes, size) &&
      (!freePlan || card.dataset.freePlan === freePlan) &&
      (!freeTrial || card.dataset.freeTrial === freeTrial) &&
      (!giftAid || card.dataset.giftAid === giftAid) &&
      (!pricing || card.dataset.pricing === pricing);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  const sortedCards = [...cards].sort((a, b) => {
    if (sort === "last-checked") {
      const dateDifference = (b.dataset.lastChecked ?? "").localeCompare(
        a.dataset.lastChecked ?? ""
      );
      if (dateDifference !== 0) return dateDifference;
    }
    return (a.dataset.name ?? "").localeCompare(b.dataset.name ?? "");
  });
  sortedCards.forEach((card) => results.append(card));

  resultCount.textContent = `${visibleCount} ${
    visibleCount === 1 ? "result" : "results"
  }`;
  emptyState.hidden = visibleCount !== 0;

  const parameters = new URLSearchParams();
  const values: Record<string, string> = {
    q: query,
    category,
    "uk-focus": ukFocus,
    size,
    "free-plan": freePlan,
    "free-trial": freeTrial,
    "gift-aid": giftAid,
    pricing,
    sort: sort === "name" ? "" : sort
  };
  Object.entries(values).forEach(([key, value]) => {
    if (value) parameters.set(key, value);
  });
  const nextUrl = `${window.location.pathname}${
    parameters.size > 0 ? `?${parameters.toString()}` : ""
  }`;
  if (historyMode === "push") {
    window.history.pushState({}, "", nextUrl);
  } else {
    window.history.replaceState({}, "", nextUrl);
  }
};

const loadFiltersFromUrl = () => {
  if (!form) return;
  form.reset();
  const parameters = new URLSearchParams(window.location.search);
  Array.from(parameters.entries()).forEach(([key, value]) => {
    const control = getControl(key);
    if (!control) return;
    if (key === "q") {
      control.value = value.slice(0, 120);
    } else if (allowedValues[key]?.has(value)) {
      control.value = value;
    }
  });
};

if (form) {
  loadFiltersFromUrl();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters("push");
  });
  form.addEventListener("input", () => applyFilters());
  form.addEventListener("change", () => applyFilters("push"));
  document
    .querySelectorAll<HTMLElement>("[data-clear-filters], [data-empty-clear]")
    .forEach((button) => button.addEventListener("click", clearFilters));
  window.addEventListener("popstate", () => {
    loadFiltersFromUrl();
    applyFilters();
  });
  applyFilters();
}
