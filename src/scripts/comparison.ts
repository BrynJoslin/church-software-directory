const picker = document.querySelector<HTMLFormElement>(
  "[data-comparison-picker]"
);

export {};
const table = document.querySelector<HTMLElement>("[data-comparison-table]");
const message = document.querySelector<HTMLElement>(
  "[data-comparison-message]"
);
const checkboxes = Array.from(
  document.querySelectorAll<HTMLInputElement>(
    '[data-comparison-picker] input[name="products"]'
  )
);
const columns = Array.from(
  document.querySelectorAll<HTMLElement>("[data-product-column]")
);
const copyButton = document.querySelector<HTMLButtonElement>(
  "[data-copy-comparison]"
);
const questionsSection = document.querySelector<HTMLElement>(
  "[data-comparison-questions]"
);
const questionList = document.querySelector<HTMLUListElement>(
  "[data-supplier-questions]"
);
const copyQuestionsButton = document.querySelector<HTMLButtonElement>(
  "[data-copy-questions]"
);
const comparisonRows = Array.from(
  document.querySelectorAll<HTMLTableRowElement>("[data-comparison-row]")
);
const comparisonGroups = new Map(
  Array.from(document.querySelectorAll<HTMLTableSectionElement>("[data-comparison-group]")).map(
    (group) => [group.dataset.comparisonGroup, group]
  )
);
const comparisonGroupHeadings = new Map(
  Array.from(document.querySelectorAll<HTMLTableSectionElement>("[data-comparison-group-heading]")).map(
    (group) => [group.dataset.comparisonGroupHeading, group]
  )
);
const comparisonToggles = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-comparison-toggle]")
);
const canonicalSiteUrl = picker?.dataset.siteUrl;
const validSlugs = new Set(checkboxes.map((checkbox) => checkbox.value));

const selectedSlugs = () =>
  checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

const groupComparisonRows = (selected: string[]) => {
  const counts = { differences: 0, shared: 0, unresolved: 0 };
  comparisonRows.forEach((row) => {
    const cells = selected.map((slug) =>
      row.querySelector<HTMLElement>(`[data-product-column="${slug}"]`)
    );
    const states = cells.map((cell) => cell?.dataset.evidenceState ?? "question");
    const values = new Set(cells.map((cell) => cell?.dataset.comparisonValue ?? ""));
    const group = states.some((state) => state === "question" || state === "needs-refresh")
      ? "unresolved"
      : values.size > 1
        ? "differences"
        : "shared";
    comparisonGroups.get(group)?.append(row);
    counts[group] += 1;
  });
  comparisonGroups.forEach((group, key) => {
    const groupKey = key as keyof typeof counts;
    const hasRows = counts[groupKey] > 0;
    const heading = comparisonGroupHeadings.get(key);
    heading && (heading.hidden = !hasRows);
    const headingCell = heading?.querySelector<HTMLTableCellElement>("th");
    headingCell?.setAttribute("colspan", String(selected.length + 1));
    const count = heading?.querySelector<HTMLElement>(`[data-comparison-group-count="${key}"]`);
    if (count) count.textContent = `(${counts[groupKey]})`;
    if (key === "differences") {
      group.hidden = !hasRows;
    } else if (!hasRows) {
      group.hidden = true;
    }
  });
};

const renderSupplierQuestions = (selected: string[]) => {
  if (!questionsSection || !questionList) return;
  const questions = comparisonRows.flatMap((row) => {
    const question = row.dataset.question;
    if (!question) return [];
    return selected.flatMap((slug) => {
      const cell = row.querySelector<HTMLElement>(`[data-product-column="${slug}"]`);
      if (!cell || !["question", "needs-refresh"].includes(cell.dataset.evidenceState ?? "")) return [];
      return [`${cell.dataset.productName}: ${question}`];
    });
  });
  questionList.replaceChildren(...questions.map((question) => {
    const item = document.createElement("li");
    item.textContent = question;
    return item;
  }));
  questionsSection.hidden = questions.length === 0;
  copyQuestionsButton && (copyQuestionsButton.disabled = questions.length === 0);
};

const updateComparison = (
  announce = true,
  historyMode: "push" | "replace" = "replace"
) => {
  if (!picker || !table || !message) return;
  const selected = selectedSlugs();

  columns.forEach((column) => {
    column.hidden = !selected.includes(column.dataset.productColumn ?? "");
  });

  const ready = selected.length >= 2 && selected.length <= 4;
  table.hidden = !ready;
  if (ready) {
    groupComparisonRows(selected);
    renderSupplierQuestions(selected);
  } else if (questionsSection) {
    questionsSection.hidden = true;
  }
  if (announce) {
    message.textContent =
      selected.length === 0
        ? "Choose at least two products to begin."
        : selected.length === 1
          ? "Choose one more product to create a comparison."
          : `Comparing ${selected.length} products.`;
  }

  const parameters = new URLSearchParams();
  if (selected.length > 0) parameters.set("products", selected.join(","));
  const nextUrl = `${window.location.pathname}${
    parameters.size > 0 ? `?${parameters.toString()}` : ""
  }`;
  if (historyMode === "push") {
    window.history.pushState({}, "", nextUrl);
  } else {
    window.history.replaceState({}, "", nextUrl);
  }
  if (copyButton) copyButton.disabled = !ready;
};

const loadComparisonFromUrl = () => {
  const parameters = new URLSearchParams(window.location.search);
  const requested = (parameters.get("products") ?? "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
  const uniqueRequested = [...new Set(requested)];
  const invalid = uniqueRequested.filter((slug) => !validSlugs.has(slug));
  const selected = uniqueRequested
    .filter((slug) => validSlugs.has(slug))
    .slice(0, 4);

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selected.includes(checkbox.value);
  });

  return { invalid, selected, overflow: uniqueRequested.length > 4 };
};

if (picker && table && message) {
  const { invalid, selected, overflow } = loadComparisonFromUrl();

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedCount = checkboxes.filter((item) => item.checked).length;
      if (selectedCount > 4) {
        checkbox.checked = false;
        message.textContent = "You can compare no more than four products.";
        return;
      }
      updateComparison(true, "push");
    });
  });

  updateComparison(false);
  if (invalid.length > 0 || overflow) {
    const issue = [
      invalid.length > 0
        ? `Ignored unrecognised product ${
            invalid.length === 1 ? "slug" : "slugs"
          }: ${invalid.join(", ")}.`
        : "",
      overflow ? "Only the first four unique valid products were selected." : ""
    ]
      .filter(Boolean)
      .join(" ");
    message.textContent = `${issue} ${
      selected.length >= 2
        ? `Comparing ${selected.length} valid products.`
        : "Choose at least two valid products."
    }`;
  } else if (selected.length === 1) {
    message.textContent = "Choose one more product to create a comparison.";
  } else if (selected.length >= 2) {
    message.textContent = `Comparing ${selected.length} products.`;
  } else {
    message.textContent = "Choose at least two products to begin.";
  }

  copyButton?.addEventListener("click", async () => {
    try {
      const comparisonUrl = canonicalSiteUrl
        ? new URL(
            `${window.location.pathname}${window.location.search}`,
            canonicalSiteUrl
          ).href
        : window.location.href;
      await navigator.clipboard.writeText(comparisonUrl);
      message.textContent = "Comparison link copied.";
    } catch {
      message.textContent =
        "Copy was not available. Select the address in your browser to share this comparison.";
    }
  });

  copyQuestionsButton?.addEventListener("click", async () => {
    const questions = Array.from(questionList?.querySelectorAll("li") ?? []).map(
      (item) => item.textContent ?? ""
    );
    try {
      await navigator.clipboard.writeText(questions.map((question) => `- ${question}`).join("\n"));
      message.textContent = "Supplier questions copied.";
    } catch {
      message.textContent = "Copy was not available. Select the questions to copy them.";
    }
  });

  comparisonToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const group = comparisonGroups.get(toggle.dataset.comparisonToggle);
      if (!group) return;
      group.hidden = !group.hidden;
      toggle.setAttribute("aria-expanded", String(!group.hidden));
    });
  });

  window.addEventListener("popstate", () => {
    const state = loadComparisonFromUrl();
    updateComparison(false);
    if (state.invalid.length > 0 || state.overflow) {
      message.textContent = "Invalid products were ignored; choose two to four valid products.";
    }
  });
}
