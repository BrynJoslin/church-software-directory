export const decisionFieldDefinitions = [
  {
    key: "contact-band",
    label: "Contact or pricing band",
    question:
      "Which contact, attendance or pricing band applies to us, and how would it change as we grow?",
    hints: ["contact", "package limit"]
  },
  {
    key: "multi-site",
    label: "Multi-site support",
    question:
      "Please demonstrate the multi-site, campus or parish structure that would apply to us.",
    hints: ["multi-site", "campus", "location"]
  },
  {
    key: "administrator-limits",
    label: "Administrator limits",
    question:
      "How many administrators can we have on this plan, and which roles need paid or privileged access?",
    hints: ["administrator", "user limit", "plan detail"]
  },
  {
    key: "volunteer-usability",
    label: "Volunteer usability",
    question:
      "Can occasional volunteers complete their normal workflow with the permissions, devices and training we have?",
    hints: ["volunteer usability"]
  },
  {
    key: "implementation",
    label: "Implementation complexity",
    question:
      "What implementation tasks, training, data preparation and ongoing ownership should we budget for?",
    hints: ["implementation", "migration", "training"]
  },
  {
    key: "technical-administration",
    label: "Technical administration",
    question:
      "Which routine technical administration tasks will a church need to own after launch?",
    hints: ["technical administration"]
  },
  {
    key: "uk-purchasing",
    label: "UK purchasing availability",
    question:
      "Can you confirm that this plan, payment route and support arrangement are currently available to a UK church?",
    hints: ["uk purchasing", "uk availability"]
  },
  {
    key: "gbp-pricing",
    label: "GBP pricing",
    question:
      "Please confirm the current GBP price, billing basis and any currency conversion or payment charges.",
    hints: ["pricing", "price", "tier"]
  },
  {
    key: "vat-treatment",
    label: "VAT treatment",
    question:
      "Please confirm whether VAT applies, how it is shown and which charges it covers.",
    hints: ["vat"]
  },
  {
    key: "gift-aid",
    label: "Gift Aid",
    question:
      "Please demonstrate the Gift Aid declaration, claim, correction and reconciliation workflow that applies to this church.",
    hints: ["gift aid"]
  },
  {
    key: "mfa",
    label: "Multi-factor authentication",
    question:
      "Is multi-factor authentication available for the roles we would use, and can it be enforced?",
    hints: ["multi-factor", "mfa", "two-factor", "2fa"]
  },
  {
    key: "role-permissions",
    label: "Role-based permissions",
    question:
      "Please show the role-based permissions and how sensitive records are restricted and reviewed.",
    hints: ["permission", "access control", "administrator"]
  },
  {
    key: "audit-logs",
    label: "Audit logs",
    question:
      "What audit logs are available for record access, changes, exports and administrator actions?",
    hints: ["audit", "log"]
  },
  {
    key: "data-processing",
    label: "Data-processing agreement",
    question:
      "Please provide the current data-processing agreement and sub-processor information.",
    hints: ["data-processing", "dpa"]
  },
  {
    key: "hosting",
    label: "Hosting and location",
    question:
      "Where is our data hosted and processed, and what sub-processors or transfers would apply?",
    hints: ["hosting", "storage", "aws", "azure"]
  },
  {
    key: "transfers",
    label: "International transfers",
    question:
      "Which international transfers could apply to our data and what safeguards support them?",
    hints: ["transfer", "eea", "international"]
  },
  {
    key: "exports",
    label: "Export formats",
    question:
      "Please show the data-export formats, scope, timing and any restrictions before we commit.",
    hints: ["export", "download", "backup"]
  },
  {
    key: "migration",
    label: "Migration assistance",
    question:
      "What migration support, data preparation and validation are included in our plan?",
    hints: ["migration", "import"]
  },
  {
    key: "uk-support",
    label: "UK support hours",
    question:
      "What support hours and escalation arrangements apply to a UK church, including Sunday-critical issues?",
    hints: ["uk support"]
  },
  {
    key: "contract",
    label: "Contract and cancellation",
    question:
      "What is the contract term, notice period, cancellation process and data-retention position after exit?",
    hints: ["cancellation", "termination", "contract"]
  }
] as const;

export type DecisionFieldKey =
  (typeof decisionFieldDefinitions)[number]["key"];

export const decisionFieldKeys = decisionFieldDefinitions.map(
  ({ key }) => key
) as [DecisionFieldKey, ...DecisionFieldKey[]];

export const decisionFieldKeySet = new Set<DecisionFieldKey>(decisionFieldKeys);
