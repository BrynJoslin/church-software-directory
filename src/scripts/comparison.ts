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

const updateComparison = (announce = true) => {
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
  window.history.replaceState({}, "", nextUrl);
  if (copyButton) copyButton.disabled = !ready;
};

if (picker && table && message) {
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
    checkbox.addEventListener("change", () => {
      const selectedCount = checkboxes.filter((item) => item.checked).length;
      if (selectedCount > 4) {
        checkbox.checked = false;
        message.textContent = "You can compare no more than four products.";
        return;
      }
      updateComparison();
    });
  });

  updateComparison(false);
  if (invalid.length > 0) {
    message.textContent = `Ignored unknown product ${
      invalid.length === 1 ? "slug" : "slugs"
    }: ${invalid.join(", ")}. ${
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
}
