const proseTables = document.querySelectorAll<HTMLTableElement>(".prose table");

for (const table of proseTables) {
  if (table.parentElement?.classList.contains("prose-table-scroll")) {
    continue;
  }

  const firstHeader = table.querySelector("th")?.textContent?.trim();
  const wrapper = document.createElement("div");
  const label = firstHeader ? `Data table: ${firstHeader}` : "Data table";

  wrapper.className = "prose-table-scroll";
  wrapper.tabIndex = 0;
  wrapper.setAttribute("role", "region");
  wrapper.setAttribute("aria-label", label);
  wrapper.addEventListener("keydown", (event) => {
    if (event.target !== wrapper) {
      return;
    }

    const scrollStep = 64;
    const maximumScroll = wrapper.scrollWidth - wrapper.clientWidth;

    if (event.key === "ArrowRight") {
      wrapper.scrollLeft = Math.min(
        wrapper.scrollLeft + scrollStep,
        maximumScroll
      );
    } else if (event.key === "ArrowLeft") {
      wrapper.scrollLeft = Math.max(wrapper.scrollLeft - scrollStep, 0);
    } else if (event.key === "Home") {
      wrapper.scrollLeft = 0;
    } else if (event.key === "End") {
      wrapper.scrollLeft = maximumScroll;
    } else {
      return;
    }

    event.preventDefault();
  });

  if (!table.hasAttribute("aria-label")) {
    table.setAttribute("aria-label", label);
  }

  table.replaceWith(wrapper);
  wrapper.append(table);
}
