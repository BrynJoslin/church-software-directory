export const guideTasks = [
  {
    value: "choose",
    label: "Choose software",
    description: "Define the work, shortlist sensible options and test the fit."
  },
  {
    value: "compare",
    label: "Compare or replace options",
    description: "Examine meaningful differences before changing a system."
  },
  {
    value: "change",
    label: "Plan or make a change",
    description: "Prepare people, records and ownership for a safer transition."
  },
  {
    value: "check",
    label: "Check risk, cost and responsibilities",
    description: "Work through the questions that need evidence and accountable owners."
  }
] as const;

export type GuideTask = (typeof guideTasks)[number]["value"];

export const guideTaskLabel = (value: GuideTask) =>
  guideTasks.find((task) => task.value === value)?.label ?? value;
