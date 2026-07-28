---
title: "How to migrate church management software"
slug: migrate-church-management-software
guideType: how-to
standardVersion: "1.0"
summary: "A careful migration plan for UK churches moving between church-management systems, from export and mapping through cut-over, reconciliation and old-system closure."
published: 2026-07-28
updated: 2026-07-28
relatedCategories:
  - church-management
  - church-communications
seo:
  title: "How to migrate church management software | Church Software UK"
  description: "Plan a church-management software migration with data mapping, controlled testing, reconciliation, training, cut-over and a clear old-system exit."
---

## Quick answer

A church-management migration is a records and operating-model change, not a file upload. Start by agreeing what will move, what will be retained elsewhere, what will be archived or deleted under the church's applicable policy, and who can approve each decision. Then use a small, repeatable rehearsal: export, map, import non-sensitive test data, reconcile the result, train the people who will work in it and test the fallback before the real cut-over. Do not promise a lossless migration. Different systems model households, groups, consent, giving, files and historic activity differently, so some information must be transformed, left behind or treated as a separate records decision.

Keep the old service available only as long as policy, contract and practical support require. The goal is not to preserve every historic field forever. It is to establish a trustworthy current record, a defensible archive and a clear owner for the new system.

## Set the boundary and name accountable owners

Begin with a one-page migration charter. State why the church is changing, the cut-over date range, the source and destination systems, the modules in scope, exclusions, and the decision-maker for each data type. Include contact records, households, groups, rotas, event information, communications preferences, documents, giving or finance links, booking data and any sensitive workstream separately. A system administrator should not silently decide the fate of all historic data.

Some records need specialist review. Safeguarding, pastoral, HR, DBS, finance and complaint records must not be bundled into a routine contact import merely because they are accessible in the outgoing account. Use the church's policy and appropriate advisers to decide their handling. For Church of England bodies, current records guidance points to a May 2026 retention schedule and a record-keeping review method; other bodies should use the rules and advice applicable to them.[^cofe]

Give named people responsibility for data, technical administration, user training, communications and final acceptance. This prevents the common pattern in which a supplier completes an import but no one checks whether church teams can safely carry on their work.

## Audit and minimise before exporting

Exporting a system is an opportunity to remove obvious duplication and obsolete working lists, not an invitation to copy everything automatically. Build an inventory with the fields shown below.

| Data area | Source owner | Destination purpose | Action before migration | Acceptance evidence |
| --- | --- | --- | --- | --- |
| People and households | Church office | Current contact record | Deduplicate and map relationships | Sampled household records reconcile |
| Groups and rotas | Ministry leads | Operational scheduling | Confirm live groups and owners | Leads can find and update their groups |
| Preferences | Communications owner | Contact choices | Review fields and policy context | Test communication uses the expected list |
| Historic reports | Trustees or records lead | Reference/archive | Decide retention and storage route | Archive is readable and access controlled |
| Sensitive records | Relevant lead | Usually excluded from routine import | Obtain specific approved plan | No unapproved material enters trial data |

The ICO's data-minimisation guidance says personal data should be adequate, relevant and limited to what is necessary. That is a useful discipline for migration, but it does not choose a retention period for the church.[^minimisation] Keep a decision log for fields that are removed, transformed or retained outside the new system.

## Map fields and test a rehearsal import

Create a mapping sheet from source field to destination field. Record the format, transformation, default value, owner, whether it is in scope and how it will be checked. Include the awkward details: preferred names, shared addresses, membership or group status, consent history, notes, tags, dates and links between people. Do not assume fields with similar labels have the same meaning.

Supplier documentation can show what an import supports but does not settle your mapping. For example, ChurchSuite's current support article describes CSV import, field headings, mapping preview and validation of incoming rows.[^churchsuite-import] Its public export article describes CSV reports and exports for module data.[^churchsuite-export] Those are useful product-specific starting points, not evidence that every system, custom field, file or historical relationship will transfer.

Use fictional or properly approved, minimised test data for the first rehearsal. Import enough scenarios to expose household links, duplicate names, groups, preferences, multi-site arrangements and an incomplete record. Check the preview, resolve warnings and record every exception. Do not press ahead because the row count looks plausible.

## Reconcile the results, not just the row count

Set acceptance measures before the real import. Compare totals by meaningful group, not only the number of people: active contacts, households, group members, opted-in communication recipients, active rotas, current events and a sample of edge cases. Give ministry leads a short script of tasks to complete in the destination system.

Use a migration-rehearsal checklist:

1. Export a versioned, access-controlled source copy and note the time.
2. Run the mapping and import a controlled test set.
3. Compare counts, samples and exception reports with the source.
4. Correct the mapping or source data, then repeat rather than patching errors invisibly.
5. Test key everyday tasks with least-privilege user accounts.
6. Confirm how the church can recover if the final import fails or is delayed.
7. Obtain written sign-off for each in-scope area before scheduling cut-over.

This is where a migration earns trust. A difference may be correct if a record was intentionally excluded, but it should always be explainable from the decision log.

## Implementation, cut-over and old-system closure

Train each role on its real tasks: finding a person, correcting a record, adding someone to a group, running a report, communicating with a permitted list, and seeking help. Publish a simple cut-over message that says when the old system becomes read-only, who should report an issue, and which urgent procedures are unchanged. Keep a small support log for the first weeks so recurring errors become a training or configuration fix.

Make the final export and import during an agreed freeze period. Re-run the acceptance checks, then make the decision to go live. If a material control, data set or user journey fails, use the agreed fallback rather than quietly extending a half-complete parallel run.

At contract end, ask the supplier for the current return/deletion process and retain the evidence appropriate to your records policy. The ICO's controller–processor contract guidance says contracts should require deletion or return of personal data as requested at the end of the contract.[^ico-contract] That is a contractual and governance question, not a guarantee that every historic configuration is useful or transferable.

## Software listings to explore

These profiles are places to investigate destination systems and supplier evidence. A listing is not a migration guarantee.

- [ChurchSuite](/software/churchsuite/) publishes product and support information relevant to imports, exports and administrator roles.
- [iKnow Church](/software/iknow/) and [ChurchTools](/software/churchtools/) are church-management profiles to compare against the church's mapped workflows.
- [Planning Center](/software/planning-center/) may be relevant where the new operating model centres on planning, people and service workflows.
- [ChurchBase](/software/churchbase/) is another directory starting point for a specific migration brief.

Use the [church-management category](/categories/church-management/) to find alternatives, but keep the final shortlist bounded to systems that the church has actually trialled against its migration charter.

## Sources and research limits

This guide was researched and checked on 28 July 2026. It provides an operational framework, not legal, data-protection, accounting, safeguarding or supplier implementation advice. Export formats, imports and contract terms change, so check current documentation for both systems before a live migration.

[^cofe]: [Church of England: Records and Information Management](https://www.churchofengland.org/about/libraries-and-archives/records-and-information-management) (accessed 28 July 2026).
[^minimisation]: [Information Commissioner's Office: Data minimisation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/) (accessed 28 July 2026).
[^churchsuite-import]: [ChurchSuite: Import your data into ChurchSuite](https://support.churchsuite.com/article/11-import-your-data-into-churchsuite) (accessed 28 July 2026).
[^churchsuite-export]: [ChurchSuite: Custom reporting and exporting data](https://support.churchsuite.com/article/419-custom-reporting-with-the-table-generator) (accessed 28 July 2026).
[^ico-contract]: [Information Commissioner's Office: Contracts between controllers and processors](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/) (accessed 28 July 2026).
