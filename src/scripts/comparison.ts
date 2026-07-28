const picker = document.querySelector<HTMLFormElement>("[data-comparison-picker]");

export {};
const table = document.querySelector<HTMLElement>("[data-comparison-table]");
const message = document.querySelector<HTMLElement>("[data-comparison-message]");
const selectors = Array.from(document.querySelectorAll<HTMLElement>("[data-comparison-selector]"));
const productSelects = Array.from(document.querySelectorAll<HTMLSelectElement>("[data-comparison-product-select]"));
const columns = Array.from(document.querySelectorAll<HTMLElement>("[data-product-column]"));
const copyButton = document.querySelector<HTMLButtonElement>("[data-copy-comparison]");
const questionsSection = document.querySelector<HTMLElement>("[data-comparison-questions]");
const questionList = document.querySelector<HTMLUListElement>("[data-supplier-questions]");
const copyQuestionsButton = document.querySelector<HTMLButtonElement>("[data-copy-questions]");
const comparisonRows = Array.from(document.querySelectorAll<HTMLTableRowElement>("[data-comparison-row]"));
const comparisonGroups = new Map(Array.from(document.querySelectorAll<HTMLTableSectionElement>("[data-comparison-group]")).map((group) => [group.dataset.comparisonGroup, group]));
const comparisonGroupHeadings = new Map(Array.from(document.querySelectorAll<HTMLTableSectionElement>("[data-comparison-group-heading]")).map((group) => [group.dataset.comparisonGroupHeading, group]));
const comparisonToggles = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-comparison-toggle]"));
const canonicalSiteUrl = picker?.dataset.siteUrl;
const validSlugs = new Set(productSelects.flatMap((select) => Array.from(select.options).map((option) => option.value).filter(Boolean)));

const selectedSlugs = () => productSelects.map((select) => select.value).filter(Boolean);

const updateSelectorOptions = (selector: HTMLElement) => {
  const search = selector.querySelector<HTMLInputElement>("[data-comparison-search]")?.value.trim().toLowerCase() ?? "";
  const category = selector.querySelector<HTMLSelectElement>("[data-comparison-category]")?.value ?? "";
  const select = selector.querySelector<HTMLSelectElement>("[data-comparison-product-select]");
  if (!select) return;
  const selectedElsewhere = new Set(productSelects.filter((item) => item !== select).map((item) => item.value).filter(Boolean));
  Array.from(select.options).forEach((option) => {
    if (!option.value) return;
    const categoryMatch = !category || (option.dataset.categories ?? "").split(",").includes(category);
    const searchMatch = !search || option.text.toLowerCase().includes(search);
    option.hidden = !categoryMatch || !searchMatch;
    option.disabled = selectedElsewhere.has(option.value);
  });
  if (select.selectedOptions[0]?.disabled || select.selectedOptions[0]?.hidden) select.value = "";
};

const refreshSelectors = () => selectors.forEach(updateSelectorOptions);

const groupComparisonRows = (selected: string[]) => {
  const counts = { differences: 0, shared: 0, unresolved: 0 };
  comparisonRows.forEach((row) => {
    const cells = selected.map((slug) => row.querySelector<HTMLElement>(`[data-product-column="${slug}"]`));
    const states = cells.map((cell) => cell?.dataset.evidenceState ?? "question");
    const values = new Set(cells.map((cell) => cell?.dataset.comparisonValue ?? ""));
    const group = states.some((state) => state === "question" || state === "needs-refresh") ? "unresolved" : values.size > 1 ? "differences" : "shared";
    comparisonGroups.get(group)?.append(row);
    counts[group] += 1;
  });
  comparisonGroups.forEach((group, key) => {
    const groupKey = key as keyof typeof counts;
    const hasRows = counts[groupKey] > 0;
    const heading = comparisonGroupHeadings.get(key);
    if (heading) heading.hidden = !hasRows;
    heading?.querySelector<HTMLTableCellElement>("th")?.setAttribute("colspan", String(selected.length + 1));
    const count = heading?.querySelector<HTMLElement>(`[data-comparison-group-count="${key}"]`);
    if (count) count.textContent = `(${counts[groupKey]})`;
    group.hidden = key === "differences" ? !hasRows : true;
  });
};

const renderSupplierQuestions = (selected: string[]) => {
  if (!questionsSection || !questionList) return;
  const questions = comparisonRows.flatMap((row) => {
    const question = row.dataset.question;
    if (!question) return [];
    return selected.flatMap((slug) => {
      const cell = row.querySelector<HTMLElement>(`[data-product-column="${slug}"]`);
      return cell && ["question", "needs-refresh"].includes(cell.dataset.evidenceState ?? "") ? [`${cell.dataset.productName}: ${question}`] : [];
    });
  });
  questionList.replaceChildren(...questions.map((question) => Object.assign(document.createElement("li"), { textContent: question })));
  questionsSection.hidden = questions.length === 0;
  if (copyQuestionsButton) copyQuestionsButton.disabled = questions.length === 0;
};

const updateComparison = (announce = true, historyMode: "push" | "replace" = "replace") => {
  if (!picker || !table || !message) return;
  const selected = selectedSlugs();
  columns.forEach((column) => { column.hidden = !selected.includes(column.dataset.productColumn ?? ""); });
  const ready = selected.length >= 2 && selected.length <= 4;
  table.hidden = !ready;
  if (ready) { groupComparisonRows(selected); renderSupplierQuestions(selected); }
  else if (questionsSection) questionsSection.hidden = true;
  if (announce) message.textContent = selected.length === 0 ? "Choose at least two products to begin." : selected.length === 1 ? "Choose one more product to create a comparison." : `Comparing ${selected.length} products.`;
  const parameters = new URLSearchParams();
  if (selected.length) parameters.set("products", selected.join(","));
  const nextUrl = `${window.location.pathname}${parameters.size ? `?${parameters.toString()}` : ""}`;
  window.history[historyMode === "push" ? "pushState" : "replaceState"]({}, "", nextUrl);
  if (copyButton) copyButton.disabled = !ready;
};

const loadComparisonFromUrl = () => {
  const requested = (new URLSearchParams(window.location.search).get("products") ?? "").split(",").map((slug) => slug.trim()).filter(Boolean);
  const uniqueRequested = [...new Set(requested)];
  const invalid = uniqueRequested.filter((slug) => !validSlugs.has(slug));
  const selected = uniqueRequested.filter((slug) => validSlugs.has(slug)).slice(0, 4);
  productSelects.forEach((select, index) => { select.value = selected[index] ?? ""; });
  return { invalid, selected, overflow: uniqueRequested.length > 4 };
};

if (picker && table && message) {
  const { invalid, selected, overflow } = loadComparisonFromUrl();
  refreshSelectors();
  selectors.forEach((selector) => {
    selector.querySelector<HTMLInputElement>("[data-comparison-search]")?.addEventListener("input", () => updateSelectorOptions(selector));
    selector.querySelector<HTMLSelectElement>("[data-comparison-category]")?.addEventListener("change", () => updateSelectorOptions(selector));
  });
  productSelects.forEach((select) => select.addEventListener("change", () => { refreshSelectors(); updateComparison(true, "push"); }));
  updateComparison(false);
  message.textContent = invalid.length || overflow
    ? `${invalid.length ? `Ignored unrecognised product ${invalid.length === 1 ? "slug" : "slugs"}: ${invalid.join(", ")}. ` : ""}${overflow ? "Only the first four unique valid products were selected. " : ""}${selected.length >= 2 ? `Comparing ${selected.length} valid products.` : "Choose at least two valid products."}`
    : selected.length === 1 ? "Choose one more product to create a comparison."
    : selected.length >= 2 ? `Comparing ${selected.length} products.`
    : "Choose at least two products to begin.";
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(canonicalSiteUrl ? new URL(`${window.location.pathname}${window.location.search}`, canonicalSiteUrl).href : window.location.href);
      message.textContent = "Comparison link copied.";
    } catch { message.textContent = "Copy was not available. Select the address in your browser to share this comparison."; }
  });
  copyQuestionsButton?.addEventListener("click", async () => {
    const questions = Array.from(questionList?.querySelectorAll("li") ?? []).map((item) => item.textContent ?? "");
    try { await navigator.clipboard.writeText(questions.map((question) => `- ${question}`).join("\n")); message.textContent = "Supplier questions copied."; }
    catch { message.textContent = "Copy was not available. Select the questions to copy them."; }
  });
  comparisonToggles.forEach((toggle) => toggle.addEventListener("click", () => {
    const group = comparisonGroups.get(toggle.dataset.comparisonToggle);
    if (!group) return;
    group.hidden = !group.hidden;
    toggle.setAttribute("aria-expanded", String(!group.hidden));
  }));
  window.addEventListener("popstate", () => { const state = loadComparisonFromUrl(); refreshSelectors(); updateComparison(false); if (state.invalid.length || state.overflow) message.textContent = "Invalid products were ignored; choose two to four valid products."; });
}
