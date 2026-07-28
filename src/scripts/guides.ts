const form = document.querySelector<HTMLFormElement>("[data-guide-form]");
export {};
const searchInput = form?.elements.namedItem("q") as HTMLInputElement | null;
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-guide-card]"));
const resultCount = document.querySelector<HTMLElement>("#guide-result-count");
const appliedFilters = document.querySelector<HTMLElement>("[data-guide-applied-filters]");
const filterSummary = document.querySelector<HTMLElement>("[data-guide-filter-summary]");
const emptyState = document.querySelector<HTMLElement>("[data-guide-empty-state]");
const allGuidesSection = document.querySelector<HTMLElement>("#all-guides");
const taskLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-guide-task-link]"));

const taskLabels = new Map(taskLinks.map((link) => [link.dataset.taskValue ?? "", link.querySelector("strong")?.textContent ?? ""]));
const validTasks = new Set(taskLabels.keys());

const normalise = (value: string) =>
  value
    .toLocaleLowerCase("en-GB")
    .replace(/[’'“”".,:;!?()[\]{}\-/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const stateFromUrl = () => {
  const parameters = new URLSearchParams(window.location.search);
  const task = parameters.get("task") ?? "";
  return {
    query: (parameters.get("q") ?? "").slice(0, 120),
    task: validTasks.has(task) ? task : ""
  };
};

const updateUrl = (state: ReturnType<typeof stateFromUrl>, mode: "push" | "replace") => {
  const parameters = new URLSearchParams();
  if (state.query) parameters.set("q", state.query);
  if (state.task) parameters.set("task", state.task);
  const next = `${window.location.pathname}${parameters.size ? `?${parameters}` : ""}`;
  if (mode === "push") window.history.pushState({}, "", next);
  else window.history.replaceState({}, "", next);
};

const applyFilters = (mode: "push" | "replace" = "replace") => {
  if (!searchInput || !resultCount || !appliedFilters || !filterSummary || !emptyState) return;
  const state = stateFromUrl();
  const query = normalise(searchInput.value || state.query);
  const terms = query.split(" ").filter(Boolean);
  const visible = cards.filter((card) => {
    const search = normalise(card.dataset.search ?? "");
    const matchesSearch = terms.every((term) => search.includes(term));
    const matchesTask = !state.task || card.dataset.task === state.task;
    const matches = matchesSearch && matchesTask;
    card.hidden = !matches;
    return matches;
  });
  const summary = [
    query ? `Search: “${searchInput.value.trim()}”` : "",
    state.task ? taskLabels.get(state.task) : ""
  ].filter(Boolean);
  resultCount.textContent = `${visible.length} ${visible.length === 1 ? "guide" : "guides"}`;
  filterSummary.textContent = summary.length ? `Showing ${summary.join(" · ")}` : "";
  appliedFilters.hidden = summary.length === 0;
  emptyState.hidden = visible.length !== 0;
  taskLinks.forEach((link) => {
    if (link.dataset.taskValue === state.task) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
  updateUrl({ ...state, query: searchInput.value.trim() }, mode);
};

const loadFromUrl = () => {
  if (!searchInput) return;
  const state = stateFromUrl();
  searchInput.value = state.query;
  applyFilters();
};

const clearFilters = () => {
  if (!searchInput) return;
  searchInput.value = "";
  window.history.pushState({}, "", window.location.pathname);
  applyFilters();
};

if (form && searchInput) {
  loadFromUrl();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters("push");
    allGuidesSection?.scrollIntoView({ block: "start" });
  });
  searchInput.addEventListener("input", () => applyFilters());
  taskLinks.forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    const parameters = new URLSearchParams(window.location.search);
    const value = link.dataset.taskValue ?? "";
    if (parameters.get("task") === value) parameters.delete("task");
    else parameters.set("task", value);
    window.history.pushState({}, "", `${window.location.pathname}?${parameters}`);
    loadFromUrl();
  }));
  document.querySelectorAll<HTMLElement>("[data-clear-guide-filters]").forEach((button) => {
    button.addEventListener("click", clearFilters);
  });
  window.addEventListener("popstate", loadFromUrl);
}
