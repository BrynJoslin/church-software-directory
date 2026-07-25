const picker = document.querySelector<HTMLFormElement>(
  "[data-comparison-picker]"
);
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
const validSlugs = new Set(checkboxes.map((checkbox) => checkbox.value));

const updateComparison = (
  announce = true,
  historyMode: "push" | "replace" = "replace"
) => {
  if (!picker || !table || !message) return;
  const selected = checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  columns.forEach((column) => {
    column.hidden = !selected.includes(column.dataset.productColumn ?? "");
  });

  const ready = selected.length >= 2 && selected.length <= 4;
  table.hidden = !ready;
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
        ? `Ignored unknown product ${
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
      await navigator.clipboard.writeText(window.location.href);
      message.textContent = "Comparison link copied.";
    } catch {
      message.textContent =
        "Copy was not available. Select the address in your browser to share this comparison.";
    }
  });

  window.addEventListener("popstate", () => {
    const state = loadComparisonFromUrl();
    updateComparison(false);
    if (state.invalid.length > 0 || state.overflow) {
      message.textContent = "Invalid products were ignored; choose two to four valid products.";
    }
  });
}
