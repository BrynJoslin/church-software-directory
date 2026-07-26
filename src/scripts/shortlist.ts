import {
  answerLabels,
  decisionFieldLabel,
  decisionFieldQuestion,
  shortlistJobs,
  shortlistProducts,
  unresolvedFor,
  type ShortlistAnswers,
  type ShortlistProduct
} from "../utils/shortlist";

export {};

const root = document.querySelector<HTMLElement>("[data-shortlist]");
const form = document.querySelector<HTMLFormElement>("[data-shortlist-form]");
const results = document.querySelector<HTMLElement>("[data-shortlist-results]");
const empty = document.querySelector<HTMLElement>("[data-shortlist-empty]");
const cards = document.querySelector<HTMLElement>("[data-shortlist-cards]");
const summary = document.querySelector<HTMLElement>("[data-shortlist-summary]");
const emptyCopy = document.querySelector<HTMLElement>("[data-shortlist-empty-copy]");
const requirements = document.querySelector<HTMLElement>("[data-pack-requirements]");
const questions = document.querySelector<HTMLElement>("[data-pack-questions]");
const trusteeSummary = document.querySelector<HTMLElement>("[data-pack-summary]");

const products: ShortlistProduct[] = root?.dataset.products ? JSON.parse(root.dataset.products) : [];
const validJobs = new Set<string>(shortlistJobs.map((job) => job.value));
const defaults: ShortlistAnswers = { job: "", contactBand: "any", ukLocation: "any", giftAid: "any", approach: "any", technicalAdministration: "any" };
const fieldMap: Record<keyof ShortlistAnswers, string> = { job: "job", contactBand: "contact-band", ukLocation: "uk-location", giftAid: "gift-aid", approach: "approach", technicalAdministration: "technical-administration" };
const validValues: Record<Exclude<keyof ShortlistAnswers, "job">, Set<string>> = {
  contactBand: new Set(["any", "small", "medium", "large", "multi-site"]),
  ukLocation: new Set(["any", "yes"]),
  giftAid: new Set(["any", "yes"]),
  approach: new Set(["any", "integrated", "specialist"]),
  technicalAdministration: new Set(["any", "limited", "available"])
};

const readAnswers = (): ShortlistAnswers => {
  const params = new URLSearchParams(window.location.search);
  const answers = { ...defaults };
  (Object.keys(fieldMap) as Array<keyof ShortlistAnswers>).forEach((key) => {
    const value = params.get(fieldMap[key]);
    if (value) (answers[key] as string) = value;
  });
  if (!validJobs.has(answers.job)) answers.job = "";
  (Object.keys(validValues) as Array<Exclude<keyof ShortlistAnswers, "job">>).forEach((key) => {
    if (!validValues[key].has(answers[key])) (answers as Record<string, string>)[key] = "any";
  });
  return answers;
};

const setFormValues = (answers: ShortlistAnswers) => {
  if (!form) return;
  (Object.keys(fieldMap) as Array<keyof ShortlistAnswers>).forEach((key) => {
    const input = form.elements.namedItem(fieldMap[key]) as HTMLSelectElement | null;
    if (input) input.value = answers[key];
  });
};

const appendText = (parent: HTMLElement, tag: keyof HTMLElementTagNameMap, text: string) => {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.append(element);
  return element;
};

const renderPack = (answers: ShortlistAnswers, matched: ReturnType<typeof shortlistProducts>) => {
  if (!requirements || !questions || !trusteeSummary) return;
  requirements.replaceChildren(); questions.replaceChildren(); trusteeSummary.replaceChildren();
  const requirementList = document.createElement("ul");
  const job = shortlistJobs.find((item) => item.value === answers.job)?.label ?? "Selected job";
  appendText(requirementList, "li", `Job to improve: ${job}.`);
  (Object.keys(answerLabels) as Array<keyof typeof answerLabels>).forEach((key) => appendText(requirementList, "li", `${key === "contactBand" ? "Church scale" : key === "ukLocation" ? "Location" : key === "giftAid" ? "Gift Aid" : key === "approach" ? "System preference" : "Technical administration"}: ${answerLabels[key][answers[key]]}.`));
  appendText(requirements, "p", "Use this as a working brief. Confirm the details below with the people who will own the process."); requirements.append(requirementList);
  const questionList = document.createElement("ul");
  matched.forEach(({ product }) =>
    unresolvedFor(product, answers).forEach((key) =>
      appendText(questionList, "li", `${product.name}: ${decisionFieldQuestion(key)}`)
    )
  );
  appendText(questionList, "li", "Ask each supplier to demonstrate one real workflow using your church’s roles, data and reporting needs."); questions.append(questionList);
  appendText(trusteeSummary, "p", `The team investigated ${matched.map(({ product }) => product.name).join(", ")}. This is an evidence-backed shortlist for ${job.toLowerCase()}, not a recommendation or final purchase decision.`);
  appendText(trusteeSummary, "p", "Before approval, record the total cost, contract and cancellation terms, data export route, implementation owner, and the outcome of a real workflow trial.");
};

const render = (answers: ShortlistAnswers) => {
  setFormValues(answers);
  if (!answers.job) { results && (results.hidden = true); empty && (empty.hidden = true); return; }
  const matched = shortlistProducts(products, answers);
  if (!matched.length) {
    results && (results.hidden = true); if (empty) empty.hidden = false;
    if (emptyCopy) emptyCopy.textContent = "Fewer than three recorded profiles meet every requirement you selected. This may mean the catalogue is incomplete for this combination, not that no suitable product exists.";
    return;
  }
  empty && (empty.hidden = true); results && (results.hidden = false); cards?.replaceChildren();
  if (summary) summary.textContent = `${matched.length} profiles meet the recorded requirements. Start with the workflow test and unanswered questions, not a feature list.`;
  matched.forEach(({ product, reasons }) => {
    const article = document.createElement("article"); article.className = "shortlist-card";
    const heading = document.createElement("h3"); const link = document.createElement("a"); link.href = `/software/${product.slug}/`; link.textContent = product.name; heading.append(link); article.append(heading);
    const why = document.createElement("ul"); why.className = "shortlist-card__reasons"; reasons.forEach((reason) => appendText(why, "li", reason)); article.append(why);
    appendText(article, "p", `First workflow to test: ${product.procurementVerdict.problem}.`);
    const unresolved = unresolvedFor(product, answers);
    appendText(
      article,
      "p",
      unresolved.length
        ? `Questions to settle: ${unresolved.map(decisionFieldLabel).join(", ")}.`
        : `First check: ${product.procurementVerdict.firstCheck}.`
    );
    const pricing = product.pricing.startingPrice;
    if (pricing?.currency === "GBP") appendText(article, "p", `Published starting point: £${pricing.amount} per ${pricing.period}${pricing.qualifier ? ` (${pricing.qualifier})` : ""}. This is not a total cost estimate.`);
    else appendText(article, "p", "Pricing: Contact supplier or review the profile; this tool does not estimate quote-based, foreign-currency or incomplete costs.");
    cards?.append(article);
  });
  renderPack(answers, matched);
};

const updateUrl = (answers: ShortlistAnswers, mode: "push" | "replace") => {
  const params = new URLSearchParams();
  (Object.keys(fieldMap) as Array<keyof ShortlistAnswers>).forEach((key) => { if (answers[key] && answers[key] !== "any") params.set(fieldMap[key], answers[key]); });
  window.history[`${mode}State`]({}, "", `${window.location.pathname}${params.size ? `?${params}` : ""}`);
};

if (root && form) {
  const initial = readAnswers(); render(initial);
  form.addEventListener("submit", (event) => { event.preventDefault(); const answers = Object.fromEntries(new FormData(form)) as unknown as ShortlistAnswers; updateUrl(answers, "push"); render(answers); });
  window.addEventListener("popstate", () => render(readAnswers()));
  document.querySelector<HTMLButtonElement>("[data-print-pack]")?.addEventListener("click", () => window.print());
}
