import {
  answerHeading,
  answerLabels,
  decisionFieldLabel,
  decisionFieldQuestion,
  defaultShortlistAnswers,
  matchingShortlistProducts,
  nextShortlistQuestion,
  shortlistProducts,
  shortlistQuestionDefinitions,
  unresolvedFor,
  type ShortlistAnswers,
  type ShortlistProduct,
  type ShortlistQuestionKey,
  type ViableShortlistQuestion
} from "../utils/shortlist";

export {};

type ShortlistCategory = {
  value: string;
  label: string;
  count: number;
};

type JourneyState = {
  answers: ShortlistAnswers;
  skipped: ShortlistQuestionKey[];
  view: "checkpoint" | "shortlist";
};

const root = document.querySelector<HTMLElement>("[data-shortlist]");
const categoryForm = document.querySelector<HTMLFormElement>("[data-category-form]");
const categorySelect = document.querySelector<HTMLSelectElement>("[name='category']");
const journey = document.querySelector<HTMLElement>("[data-shortlist-journey]");
const checkpointHeading = document.querySelector<HTMLElement>("[data-checkpoint-heading]");
const countStatus = document.querySelector<HTMLElement>("[data-shortlist-count]");
const checkpointActions = document.querySelector<HTMLElement>("[data-checkpoint-actions]");
const nextButton = document.querySelector<HTMLButtonElement>("[data-next-question]");
const questionForm = document.querySelector<HTMLFormElement>("[data-question-form]");
const questionLegend = document.querySelector<HTMLElement>("[data-question-legend]");
const questionHint = document.querySelector<HTMLElement>("[data-question-hint]");
const questionOptions = document.querySelector<HTMLElement>("[data-question-options]");
const answerSummary = document.querySelector<HTMLElement>("[data-answer-summary]");
const answerList = document.querySelector<HTMLElement>("[data-answer-list]");
const results = document.querySelector<HTMLElement>("[data-shortlist-results]");
const resultsHeading = document.querySelector<HTMLElement>("#shortlist-results-heading");
const empty = document.querySelector<HTMLElement>("[data-shortlist-empty]");
const cards = document.querySelector<HTMLElement>("[data-shortlist-cards]");
const summary = document.querySelector<HTMLElement>("[data-shortlist-summary]");
const allMatches = document.querySelector<HTMLDetailsElement>("[data-all-matches]");
const allMatchesSummary = document.querySelector<HTMLElement>("[data-all-matches-summary]");
const allMatchesList = document.querySelector<HTMLElement>("[data-all-matches-list]");
const refineButton = document.querySelector<HTMLButtonElement>("[data-refine-shortlist]");
const requirements = document.querySelector<HTMLElement>("[data-pack-requirements]");
const questions = document.querySelector<HTMLElement>("[data-pack-questions]");
const trusteeSummary = document.querySelector<HTMLElement>("[data-pack-summary]");

const products: ShortlistProduct[] = root?.dataset.products ? JSON.parse(root.dataset.products) : [];
const categories: ShortlistCategory[] = root?.dataset.categories ? JSON.parse(root.dataset.categories) : [];
const categoryMap = new Map(categories.map((category) => [category.value, category]));
const questionKeys = new Set<ShortlistQuestionKey>(shortlistQuestionDefinitions.map((question) => question.key));
const validValues = new Map(
  shortlistQuestionDefinitions.map((question) => [
    question.key,
    new Set(question.options.map((option) => option.value))
  ])
);

let currentState: JourneyState = {
  answers: defaultShortlistAnswers(),
  skipped: [],
  view: "checkpoint"
};
let activeQuestion: ViableShortlistQuestion | null = null;
let checkpointMessage = "";

const pluralise = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

const appendText = (parent: HTMLElement, tag: keyof HTMLElementTagNameMap, text: string) => {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.append(element);
  return element;
};

const questionApplies = (key: ShortlistQuestionKey, job: string) => {
  const definition = shortlistQuestionDefinitions.find((question) => question.key === key);
  return !definition?.categories || definition.categories.includes(job);
};

const readState = (): JourneyState => {
  const params = new URLSearchParams(window.location.search);
  const answers = defaultShortlistAnswers();
  const requestedCategory = params.get("category") ?? params.get("job") ?? "";
  if (categoryMap.has(requestedCategory)) answers.job = requestedCategory;

  shortlistQuestionDefinitions.forEach((question) => {
    const value = params.get(question.parameter);
    if (
      !answers.job ||
      !value ||
      !validValues.get(question.key)?.has(value) ||
      !questionApplies(question.key, answers.job)
    ) {
      return;
    }

    const beforeCount = matchingShortlistProducts(products, answers).length;
    const proposed = { ...answers, [question.key]: value } as ShortlistAnswers;
    const afterCount = matchingShortlistProducts(products, proposed).length;
    if (afterCount > 0 && afterCount < beforeCount) Object.assign(answers, proposed);
  });

  const skipped = (params.get("skip") ?? "")
    .split(",")
    .filter((key): key is ShortlistQuestionKey =>
      questionKeys.has(key as ShortlistQuestionKey) &&
      answers[key as ShortlistQuestionKey] === "any" &&
      questionApplies(key as ShortlistQuestionKey, answers.job)
    );

  return {
    answers,
    skipped,
    view: params.get("view") === "shortlist" && answers.job ? "shortlist" : "checkpoint"
  };
};

const stateUrl = (state: JourneyState) => {
  const params = new URLSearchParams();
  if (state.answers.job) params.set("category", state.answers.job);
  shortlistQuestionDefinitions.forEach((question) => {
    const value = state.answers[question.key];
    if (value !== "any") params.set(question.parameter, value);
  });
  if (state.skipped.length) params.set("skip", state.skipped.join(","));
  if (state.view === "shortlist") params.set("view", "shortlist");
  return `${window.location.pathname}${params.size ? `?${params}` : ""}`;
};

const updateUrl = (state: JourneyState, mode: "push" | "replace") => {
  window.history[`${mode}State`]({}, "", stateUrl(state));
};

const renderAnswerSummary = (answers: ShortlistAnswers) => {
  if (!answerSummary || !answerList) return;
  answerList.replaceChildren();
  shortlistQuestionDefinitions.forEach((question) => {
    const value = answers[question.key];
    if (value === "any") return;
    const item = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = `${answerHeading[question.key]}: ${answerLabels[question.key][value]}.`;
    const button = document.createElement("button");
    button.className = "button-link";
    button.type = "button";
    button.dataset.removeAnswer = question.key;
    button.textContent = "Remove";
    button.setAttribute("aria-label", `Remove ${answerHeading[question.key].toLowerCase()} requirement`);
    item.append(text, button);
    answerList.append(item);
  });
  answerSummary.hidden = !answerList.childElementCount;
};

const renderPack = (
  answers: ShortlistAnswers,
  matched: ReturnType<typeof shortlistProducts>
) => {
  if (!requirements || !questions || !trusteeSummary) return;
  requirements.replaceChildren();
  questions.replaceChildren();
  trusteeSummary.replaceChildren();

  const requirementList = document.createElement("ul");
  const category = categoryMap.get(answers.job)?.label ?? "Selected category";
  appendText(requirementList, "li", `Software category: ${category}.`);
  shortlistQuestionDefinitions.forEach((question) => {
    const value = answers[question.key];
    if (value !== "any") {
      appendText(requirementList, "li", `${answerHeading[question.key]}: ${answerLabels[question.key][value]}.`);
    }
  });
  appendText(requirements, "p", "Use this as a working brief. Confirm the details below with the people who will own the process.");
  requirements.append(requirementList);

  const questionList = document.createElement("ul");
  matched.forEach(({ product }) =>
    unresolvedFor(product, answers).forEach((key) =>
      appendText(questionList, "li", `${product.name}: ${decisionFieldQuestion(key)}`)
    )
  );
  appendText(questionList, "li", "Ask each supplier to demonstrate one real workflow using your church’s roles, data and reporting needs.");
  questions.append(questionList);

  const names = matched.map(({ product }) => product.name).join(", ");
  appendText(trusteeSummary, "p", `The team investigated ${names}. This is an evidence-backed shortlist for ${category.toLowerCase()}, not a recommendation or final purchase decision.`);
  appendText(trusteeSummary, "p", "Before approval, record the total cost, contract and cancellation terms, data export route, implementation owner, and the outcome of a real workflow trial.");
};

const renderAllMatches = (matches: ShortlistProduct[]) => {
  if (!allMatches || !allMatchesSummary || !allMatchesList) return;
  allMatchesList.replaceChildren();
  allMatches.hidden = matches.length <= 5;
  if (matches.length <= 5) return;

  allMatchesSummary.textContent = `See all ${matches.length} matching profiles`;
  matches.forEach((product) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `/software/${product.slug}/`;
    link.textContent = product.name;
    item.append(link);
    allMatchesList.append(item);
  });
};

const renderResults = (state: JourneyState, focus = false) => {
  const matches = matchingShortlistProducts(products, state.answers);
  const matched = shortlistProducts(products, state.answers);
  journey && (journey.hidden = true);
  empty && (empty.hidden = Boolean(matches.length));
  results && (results.hidden = !matches.length);
  if (!matches.length) return;

  if (summary) {
    summary.textContent = matches.length > 5
      ? `${pluralise(matches.length, "recorded profile")} meet your requirements. Five detailed starting points are shown below, followed by the complete matching list.`
      : `${pluralise(matches.length, "recorded profile")} meet your requirements. Start with the workflow test and unanswered questions, not a feature list.`;
  }

  cards?.replaceChildren();
  matched.forEach(({ product, reasons }) => {
    const article = document.createElement("article");
    article.className = "shortlist-card";
    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = `/software/${product.slug}/`;
    link.textContent = product.name;
    heading.append(link);
    article.append(heading);
    const why = document.createElement("ul");
    why.className = "shortlist-card__reasons";
    reasons.forEach((reason) => appendText(why, "li", reason));
    article.append(why);
    appendText(article, "p", `First workflow to test: ${product.procurementVerdict.problem}.`);
    const unresolved = unresolvedFor(product, state.answers);
    appendText(
      article,
      "p",
      unresolved.length
        ? `Questions to settle: ${unresolved.map(decisionFieldLabel).join(", ")}.`
        : `First check: ${product.procurementVerdict.firstCheck}.`
    );
    const pricing = product.pricing.startingPrice;
    if (pricing?.currency === "GBP") {
      appendText(article, "p", `Published starting point: £${pricing.amount} per ${pricing.period}${pricing.qualifier ? ` (${pricing.qualifier})` : ""}. This is not a total cost estimate.`);
    } else {
      appendText(article, "p", "Pricing: Contact the supplier or review the profile; this tool does not estimate quote-based, foreign-currency or incomplete costs.");
    }
    cards?.append(article);
  });

  renderAllMatches(matches);
  renderPack(state.answers, matched);
  if (refineButton) {
    refineButton.hidden = !nextShortlistQuestion(products, state.answers, state.skipped);
  }
  if (focus) resultsHeading?.focus();
};

const renderCheckpoint = (state: JourneyState, focus = false) => {
  const matches = matchingShortlistProducts(products, state.answers);
  const nextQuestion = nextShortlistQuestion(products, state.answers, state.skipped);
  results && (results.hidden = true);
  empty && (empty.hidden = Boolean(matches.length));

  if (!matches.length) {
    journey && (journey.hidden = true);
    return;
  }

  if (!nextQuestion) {
    state.view = "shortlist";
    updateUrl(state, "replace");
    renderResults(state, focus);
    return;
  }

  journey && (journey.hidden = false);
  questionForm && (questionForm.hidden = true);
  checkpointActions && (checkpointActions.hidden = false);
  activeQuestion = null;
  if (countStatus) {
    countStatus.textContent = checkpointMessage || `${pluralise(matches.length, "recorded product")} match so far.`;
  }
  checkpointMessage = "";
  renderAnswerSummary(state.answers);
  if (focus) checkpointHeading?.focus();
};

const renderState = (state: JourneyState, focus: "checkpoint" | "results" | false = false) => {
  currentState = state;
  activeQuestion = null;
  if (categorySelect) categorySelect.value = state.answers.job;

  if (!state.answers.job) {
    journey && (journey.hidden = true);
    results && (results.hidden = true);
    empty && (empty.hidden = true);
    return;
  }

  if (state.view === "shortlist") renderResults(state, focus === "results");
  else renderCheckpoint(state, focus === "checkpoint");
};

const showQuestion = (question: ViableShortlistQuestion) => {
  if (!questionForm || !questionLegend || !questionHint || !questionOptions) return;
  activeQuestion = question;
  checkpointActions && (checkpointActions.hidden = true);
  questionForm.hidden = false;
  questionLegend.textContent = question.legend;
  questionHint.textContent = question.hint;
  questionOptions.replaceChildren();

  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "shortlist-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option.value;
    input.required = true;
    if (index === 0) input.checked = true;
    const copy = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = option.label;
    const count = document.createElement("small");
    count.textContent = `${pluralise(option.count, "product")} would remain`;
    copy.append(title, count);
    label.append(input, copy);
    questionOptions.append(label);
  });

  questionLegend.tabIndex = -1;
  questionLegend.focus();
};

categoryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const category = categorySelect?.value ?? "";
  if (!categoryMap.has(category)) return;
  const answers = { ...defaultShortlistAnswers(), job: category };
  const count = matchingShortlistProducts(products, answers).length;
  checkpointMessage = `That category narrows the catalogue from ${products.length} to ${pluralise(count, "recorded product")}.`;
  const state: JourneyState = { answers, skipped: [], view: "checkpoint" };
  updateUrl(state, "push");
  renderState(state, "checkpoint");
});

nextButton?.addEventListener("click", () => {
  const question = nextShortlistQuestion(products, currentState.answers, currentState.skipped);
  if (question) showQuestion(question);
  else {
    currentState.view = "shortlist";
    updateUrl(currentState, "replace");
    renderState(currentState, "results");
  }
});

questionForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activeQuestion) return;
  const value = new FormData(questionForm).get("answer");
  const selected = activeQuestion.options.find((option) => option.value === value);
  if (!selected) return;

  const beforeCount = matchingShortlistProducts(products, currentState.answers).length;
  currentState.answers = {
    ...currentState.answers,
    [activeQuestion.key]: selected.value
  } as ShortlistAnswers;
  const afterCount = matchingShortlistProducts(products, currentState.answers).length;
  checkpointMessage = `That narrows the list from ${beforeCount} to ${pluralise(afterCount, "recorded product")}.`;
  currentState.view = "checkpoint";
  updateUrl(currentState, "push");
  renderState(currentState, "checkpoint");
});

document.querySelector<HTMLButtonElement>("[data-skip-question]")?.addEventListener("click", () => {
  if (!activeQuestion) return;
  currentState.skipped = [...new Set([...currentState.skipped, activeQuestion.key])];
  checkpointMessage = `${pluralise(matchingShortlistProducts(products, currentState.answers).length, "recorded product")} still match. That question was skipped.`;
  updateUrl(currentState, "push");
  renderState(currentState, "checkpoint");
});

const showShortlist = () => {
  currentState.view = "shortlist";
  updateUrl(currentState, "push");
  renderState(currentState, "results");
};

document.querySelector<HTMLButtonElement>("[data-show-shortlist]")?.addEventListener("click", showShortlist);
document.querySelector<HTMLButtonElement>("[data-question-shortlist]")?.addEventListener("click", showShortlist);

refineButton?.addEventListener("click", () => {
  currentState.view = "checkpoint";
  updateUrl(currentState, "push");
  renderState(currentState, "checkpoint");
});

answerList?.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-remove-answer]");
  const key = button?.dataset.removeAnswer as ShortlistQuestionKey | undefined;
  if (!key || !questionKeys.has(key)) return;
  currentState.answers = { ...currentState.answers, [key]: "any" };
  currentState.skipped = [];
  currentState.view = "checkpoint";
  checkpointMessage = `${answerHeading[key]} was removed. ${pluralise(matchingShortlistProducts(products, currentState.answers).length, "recorded product")} now match.`;
  updateUrl(currentState, "push");
  renderState(currentState, "checkpoint");
});

document.querySelector<HTMLButtonElement>("[data-print-pack]")?.addEventListener("click", () => window.print());

window.addEventListener("popstate", () => {
  checkpointMessage = "";
  renderState(readState());
});

if (root && categoryForm) renderState(readState());
