# Minimum-owner agent protocol — prototype

> **Provisional prototype, not operating authority.**
>
> This document exists to answer one question: can agents run most Church
> Software UK work while keeping Bryn's planned involvement below two hours per
> month and preserving the agreed reputation controls?
>
> Nothing here authorises automatic publishing, outreach, spending, commercial
> commitments or access to new accounts. The protocol becomes authoritative
> only if Bryn approves it and the necessary implementation controls are
> separately put in place.

## Prototype verdict to test

A four-tier authority model appears capable of meeting the two-hour limit if:

- agents can monitor, research, analyse, test and prepare work without asking
  for routine permission;
- all owner decisions arrive in one small monthly packet;
- no more than five decisions and two send-or-post actions enter a packet;
- unreviewed work waits safely instead of being published automatically;
- high-risk events stop the relevant workflow and reach Bryn immediately; and
- the site does less work when the review capacity is full rather than lowering
  its evidence or editorial standard.

The important trade-off is slower growth in a busy month. That is preferable to
either exceeding the time budget or giving agents unsafe external authority.

## Operating outcomes

The protocol should make the following true:

1. Bryn does not need to remember or initiate routine monitoring cycles.
2. Agents complete safe private work and assemble evidence-linked proposals.
3. Bryn sees decisions, not raw research or activity logs.
4. One approval covers the exact implementation and release described in the
   packet; the agent does not return for avoidable duplicate approval.
5. Silence means “hold the external change”, not “assume approval”.
6. Reputation-sensitive work cannot be smuggled into a low-risk batch.
7. Every action can be traced to evidence, authority and a named owner.
8. The operation records both revenue and the time required from Bryn.

## Authority tiers

### Tier A — run and record

Agents may perform this work autonomously because it is read-only, private or a
reversible local diagnostic with no external audience.

Examples:

- run repository checks, builds, link checks, stale checks and maintenance
  reports;
- inspect public supplier pages and record possible changes privately;
- collect read-only Search Console, analytics and affiliate-dashboard data
  through approved access;
- calculate factual period comparisons without presenting an interpretation as
  a public conclusion;
- detect stale sources, broken links, count mismatches, missing disclosures and
  expired review dates;
- maintain private queues, evidence ledgers, cost records and decision logs;
- identify internal-link opportunities and zero-result searches;
- stop the agent's own queued work when a safety trigger occurs; and
- prepare the monthly status page.

Required record:

- date and cycle;
- inputs and source;
- result;
- any uncertainty or failed access;
- time and attributable cost;
- next review date; and
- whether the result created a Tier B, C or D item.

Tier A may not change the public site, contact anyone or create a financial
commitment.

### Tier B — prepare for review

Agents may autonomously create a private proposal, draft or isolated code
change. Nothing is published, sent, merged into production or presented as
Bryn's view.

Examples:

- evidence packs and proposed listing updates;
- guide or landing-page briefs grounded in existing evidence and demand data;
- code, accessibility, metadata and internal-link improvements on an isolated
  branch or worktree;
- source-backed correction proposals;
- personalised supplier or partner email drafts;
- social and newsletter drafts derived from an approved substantive asset;
- a commercial-model comparison with risks and assumptions;
- an analytics interpretation marked as a proposal;
- a release candidate with checks and rollback instructions; and
- a recommended defer, narrow, remove or stop decision.

Every Tier B proposal must contain:

- the precise outcome sought;
- evidence and checked dates;
- material uncertainty;
- public wording or exact change;
- affected routes, people and commercial relationships;
- risk tier and reason;
- checks completed;
- rollback or safe non-action;
- estimated result and maintenance burden; and
- the smallest decision Bryn needs to make.

Tier B work may be discarded without publication. Producing a draft does not
create a presumption that it should ship.

### Tier C — execute only after batch approval

These actions are normally suitable for the monthly packet. Bryn must approve
the exact proposal before the external effect occurs.

Examples:

- publishing a low- or medium-risk evidence-backed content change;
- releasing an approved bug fix, accessibility improvement or technical SEO
  change;
- updating an existing affiliate link or its disclosure without changing the
  underlying commercial relationship;
- replying to a routine correction after the evidence and response are
  approved;
- publishing an approved guide, comparison or decision tool;
- making an approved privacy-conscious analytics interpretation affect the
  roadmap;
- sending a factual operational message from a project mailbox where Bryn has
  explicitly approved the exact message and sending method; and
- releasing a tested rollback or correction that does not involve a dispute.

An approval applies only to the evidence, wording, targets, cost and release
described in the packet. A material change returns the item to Tier B or D.

Relationship-based supplier, partner and community outreach remains a Bryn
send action even when an agent prepares the message. Social posts in Bryn's
voice remain a Bryn publish action.

### Tier D — stop and escalate

Agents may research and organise evidence, but they may not decide, publish,
send, negotiate or spend on these matters.

Triggers:

- a new affiliate, sponsorship, referral, advertising or paid-content
  relationship;
- pricing, contract, tax, payment, data-protection, security, safeguarding or
  legal claims with material unresolved risk;
- an overall ranking, award, score, endorsement or claim of hands-on
  experience;
- supplier criticism, a contested correction, takedown demand, legal threat or
  substantive dispute;
- any proposed compromise of the no-paid-ranking or independence policy;
- use of private correspondence as public evidence;
- access to sensitive church, member, pastoral, safeguarding or financial
  information;
- a new collection of personal data, form provider, advertising tracker or
  customer-review system;
- new spending, paid advertising, binding terms or a financial commitment;
- credentials, secrets, access-control changes or suspected compromise;
- an irreversible or broad destructive action;
- a material change to the authority model; or
- any situation where an agent cannot establish its authority confidently.

The safe default is to pause the affected work, preserve evidence and present a
short escalation. Agents do not argue, threaten, concede liability or improvise
on Bryn's behalf.

## Work-type authority matrix

| Work type | Agent may run | Agent may prepare | External action |
| --- | --- | --- | --- |
| Builds, validation and accessibility checks | Tier A | Fix proposal at Tier B | Tier C release |
| Public-source and freshness monitoring | Tier A | Evidence-linked update at Tier B | Tier C; Tier D for material risk or dispute |
| Routine factual listing maintenance | Tier A | Tier B | Tier C after human factual review |
| Pricing, hosting, security, safeguarding or legal-sensitive fields | Tier A | Tier B with explicit uncertainty | Tier D when consequential or unresolved |
| Guide and comparison research | Tier A | Tier B | Tier C; rankings and endorsements are Tier D |
| Analytics and search reporting | Tier A | Interpretation at Tier B | Tier C for roadmap changes; never public claims without approval |
| Internal links, metadata and low-risk technical SEO | Tier A | Tier B | Tier C release |
| Dependency and security updates | Tier A | Tested change at Tier B | Tier C for routine changes; Tier D for compromise or major migration |
| Contributions and correction emails | Triage at Tier A | Response and change at Tier B | Tier C routine response; Tier D dispute/private evidence |
| Supplier and partner outreach | Public-contact research at Tier A | Personalised draft at Tier B | Bryn approves and sends; dispute/commercial discussion is Tier D |
| Social or personal-profile content | Research at Tier A | Draft at Tier B | Bryn approves and posts |
| Existing affiliate-link monitoring | Tier A | Correction at Tier B | Tier C if relationship unchanged |
| New commercial relationship or offer | Public research at Tier A | Options at Tier B | Tier D |
| Spending, ads or paid tools | Cost research at Tier A | Options at Tier B | Tier D |
| Legal, privacy, security or reputation incident | Evidence preservation and workflow pause at Tier A | Factual brief at Tier B | Tier D |

## Monthly operating cycle

### Continuous agent work

Agents may run approved Tier A cycles and Tier B preparation throughout the
month. They should consolidate duplicate findings and avoid creating work
merely to keep the queue busy.

### Monthly packet

By the agreed monthly review date, an agent prepares one packet containing:

1. **Arrival status**
   - monthly operating profit and three-month sequence;
   - Bryn's planned minutes used this month;
   - status of the six-month reputation-control period.
2. **Exceptions first**
   - incidents, disclosure gaps, stale high-risk claims, failed checks or
     account-access problems;
   - “none” when there are none.
3. **Up to five decisions**
   - recommendation;
   - exact public or operational effect;
   - evidence and uncertainty;
   - risk tier;
   - expected value and maintenance cost;
   - rollback or safe non-action;
   - estimated Bryn review time.
4. **Up to two Bryn send-or-post actions**
   - complete final text;
   - recipient or channel;
   - reason the action is appropriate;
   - evidence and disclosure required.
5. **Autonomous work completed**
   - totals and exceptions only, with the detailed log linked rather than
     reproduced.
6. **Deferred or stopped work**
   - reason;
   - consequence of waiting;
   - next review point.

### Approval language

The packet should allow a compact response such as:

> Approve decisions 1, 2 and 4 for implementation and release as written.
> Defer 3. Reject 5. I will send message A; do not send message B.

“Approve” includes the exact checks, implementation and release path specified
in the item. It does not authorise adjacent changes.

### Time budget

The standard packet is designed for:

- 10 minutes: arrival status and exceptions;
- 50 minutes: up to five decisions;
- 15 minutes: up to two send-or-post actions;
- 15 minutes: clarifications or a risk-weighted sample check.

Planned review time is 90 minutes. The remaining 30 minutes is a hard monthly
buffer, not permission to expand the queue. When the total would exceed 120
minutes, the agent must prioritise by reputation risk, arrival impact and
expiry, then defer the rest.

If Bryn does not review the packet, Tier A monitoring and Tier B preparation
may continue. Tier C and D actions remain paused. The following month's packet
must not grow without limit; stale proposals are revalidated or removed.

## Decision admission rules

An item enters the monthly packet only when it:

- requires Bryn's authority;
- is ready to decide;
- has current evidence;
- has a named external or operational effect;
- can be understood without opening a long research trail;
- is more valuable or more time-sensitive than the items deferred; and
- includes a recommendation.

The packet excludes:

- raw activity logs;
- decisions whose prerequisite research is incomplete;
- speculative content ideas unsupported by demand;
- multiple minor decisions that can be resolved by one governing rule;
- cosmetic preferences with no material outcome;
- large batches whose review would be superficial; and
- work created solely because an agent can do it.

## Incident and stop rules

### Immediate Tier D alert

Alert Bryn promptly and pause the affected workflow for:

- a suspected secret or personal-data exposure;
- a credible legal threat;
- a fabricated claim found on the live site;
- an external message sent without authority;
- an undisclosed commercial relationship or paid influence;
- a high-severity factual error affecting a live purchasing, safeguarding,
  security, legal or financial decision;
- a compromised account or unexplained production change; or
- a supplier dispute likely to affect Bryn personally or publicly.

The alert contains only:

- what is known;
- what is not known;
- the live or potential impact;
- containment already performed within Tier A authority;
- the recommended next action; and
- the decision required.

### Pre-authorised containment proposed by this prototype

Until Bryn decides otherwise, agents may:

- stop their own queued publication, outreach or scheduled analysis;
- revoke no credentials but ask the platform or Bryn to do so;
- preserve logs and evidence without copying secrets into reports;
- prepare a rollback to the last known good version; and
- mark affected data as unfit for further automated use.

Agents may not silently rewrite disputed public content or deploy a live
rollback without explicit authority. A later incident drill may show that one
narrow emergency rollback permission is necessary; it is not assumed here.

## Audit and control

Each monthly cycle should produce:

- an authority log showing the tier used for every external effect;
- a public-change log linked to evidence and approval;
- a commercial-relationship register reconciled with live disclosures;
- a cost and Bryn-time ledger;
- a list of failed, skipped or blocked checks;
- a risk-weighted sample of three public changes for Bryn to inspect; and
- an agent cross-check of calculations, links, disclosures and source support.

Agent cross-checking reduces routine mistakes but does not replace Bryn's
accountability for the high-risk classes retained in Tiers C and D.

No agent should both make and independently approve the same consequential
claim. A separate verification pass may challenge the evidence, but it cannot
manufacture human authority.

## Credentials, privacy and records

- Use read-only access wherever possible.
- Give an agent only the account and permissions required for its current
  cycle.
- Never put secrets, private correspondence or sensitive church data in the
  repository, approval packet or public export.
- Record commercial terms and contact history in an approved private location.
- Do not retain personal data merely because an agent may find it useful later.
- Account access, retention and deletion rules must be decided before connecting
  a new operating system.
- Failed access is reported; it is not bypassed.

## Worked monthly packet — fictional example

The entries below are deliberately fictional. They demonstrate the approval
experience and do not assert current traffic, revenue, errors or supplier
changes.

### Arrival status

| Measure | Example status | Attention needed |
| --- | --- | --- |
| Operating profit | £84 this month; one positive month | No decision |
| Bryn planned time | 0 minutes before this packet | 75–90 minutes proposed |
| Reputation-control period | Month 2 of 6; no recorded breach | Review sample |

### Exceptions

- No Tier D incident.
- One affiliate destination returned an unexpected redirect. The agent paused
  the proposed link update and prepared decision 1.

### Decisions

1. **Repair an existing affiliate destination and retain its disclosure**
   - Recommendation: approve the evidenced replacement URL after checking that
     the underlying relationship and terms are unchanged.
   - External effect: one link change; no editorial change.
   - Risk: Tier C, commercial disclosure.
   - Safe non-action: retain the current link while it remains functional, or
     temporarily use the ordinary supplier URL.
   - Review time: 10 minutes.

2. **Publish three routine source-backed listing corrections**
   - Recommendation: approve only the three exact factual changes in the linked
     evidence table.
   - External effect: three profiles and their checked dates.
   - Risk: Tier C; no legal, safeguarding or security conclusion.
   - Safe non-action: leave existing qualified wording and dates unchanged.
   - Review time: 20 minutes.

3. **Improve five contextual internal links**
   - Recommendation: approve the tested changes because they help readers
     continue the same decision and make no ranking claim.
   - External effect: five existing pages; no new indexable route.
   - Risk: Tier C, low.
   - Safe non-action: no change.
   - Review time: 5 minutes.

4. **Defer a proposed “best” comparison**
   - Recommendation: accept the deferral because search and comparison evidence
     is insufficient to justify the scope or ranking implication.
   - External effect: none.
   - Risk: avoiding premature editorial positioning.
   - Review time: 3 minutes.

### Bryn send-or-post actions

A. **Send one approved supplier correction request**
   - The agent provides the final email, public contact route, listing link and
     three precise evidence questions.
   - Bryn checks and sends it.
   - Estimated time: 7 minutes.

### Autonomous work completed

- Repository and content checks run.
- Public-source freshness queue refreshed.
- Monthly analytics and cost inputs prepared.
- Detailed logs linked privately; no further review requested.

### Deferred

- Two low-value metadata suggestions deferred because they do not justify
  owner attention this month.
- A commercial-model idea remains in research because pricing and demand
  evidence are incomplete.

**Estimated Bryn time for this fictional packet:** 60–75 minutes.

## Prototype test

This prototype succeeds if Bryn can answer the following without needing a
second operating document:

1. Which work may agents do without asking?
2. Which public changes can wait for one monthly review?
3. Which matters always stop and reach Bryn?
4. What happens when Bryn does not review a packet?
5. How is the two-hour ceiling enforced?
6. Can Bryn approve or reject the worked packet in under 90 minutes?

## Decision requested

Choose one:

- **Approve as the basis for implementation.** Preserve the four tiers,
  90-minute standard packet and 120-minute hard cap.
- **Approve with named changes.** Identify only the authority or time-budget
  rules that should change.
- **Reject and redesign.** State which risk or workload the model fails to
  address.

Approval adopts the operating design, not any tooling, credentials, automation,
publication, outreach or spending. Those remain separately scoped enabling
actions.
