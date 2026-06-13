# Helix Legal AI — Product Brief

## One-line positioning

Helix Legal AI is an AI workbench for lean in-house legal teams and boutique firms that turns contracts, policies, and matter documents into structured first-pass review, redlines, risk memos, and lawyer-ready workflows with auditable human approval gates.

## Problem

Legal teams lose high-leverage hours to routine document work:

- First-pass contract review and clause extraction.
- NDA, MSA, DPA, vendor agreement, and policy comparison.
- Repetitive drafting and redlining against playbooks.
- Summarizing long document sets for commercial, regulatory, or litigation context.
- Translating business questions into legal triage without losing confidentiality, auditability, or professional responsibility controls.

The core pain is not “lawyers need chat.” The pain is that legal teams need reliable, reviewable work product that fits existing approval workflows.

## Target ICP

### Primary ICP: lean in-house legal teams

- Company size: 100–2,000 employees.
- Legal team: 1–15 lawyers/legal ops staff.
- Sectors: B2B SaaS, fintech-adjacent, healthcare-adjacent non-PHI pilots, marketplaces, agencies, venture-backed services.
- Trigger events: sales cycle pressure, vendor security backlog, new procurement process, rapid fundraising/M&A prep, privacy program catch-up.
- Buyer: General Counsel, Head of Legal, Legal Ops, COO at smaller companies.
- Champion: legal ops manager, commercial counsel, contracts manager.
- Budget owner: GC/COO/CFO.

### Secondary ICP: boutique commercial/privacy firms

- Firm size: 5–50 lawyers.
- Practice areas: commercial contracts, privacy, employment handbooks, startup counsel, legal ops consulting.
- Use case: standardize first-pass analysis and produce client-ready issue lists faster.

## Beachhead use cases

1. **Contract first-pass review**
   - Upload NDA/MSA/DPA/vendor agreement.
   - Extract parties, term, renewal, liability, indemnity, data protection, governing law, assignment, termination, unusual clauses.
   - Compare against a client playbook.
   - Return risk table, clause-by-clause notes, and suggested redline language.

2. **Legal intake triage**
   - Business user submits request and documents.
   - System classifies matter type, urgency, missing information, and approval path.
   - Lawyer receives concise briefing pack.

3. **Policy/document summarization**
   - Turn long legal docs into consistent structured summaries.
   - Require “not specified” for missing facts and citations/snippets for source grounding.

4. **Deal desk support**
   - Sales/legal alignment around standard fallback positions.
   - Produce negotiation memo with business risk tags.

## Competitive wedge

Helix Legal AI should not compete head-on as another generic legal chatbot. The wedge is:

- **Workflow-first, not prompt-first:** intake, playbooks, approvals, evidence, and export are the product.
- **Human-in-the-loop by default:** no final legal advice leaves the system without named legal reviewer approval.
- **Structured output over narrative answers:** consistent extract fields, issue severity, fallback language, “not specified” handling, confidence labels.
- **Small-team speed:** implementation measured in days, not enterprise procurement quarters.
- **Private playbook memory:** customer-specific clause rules and fallback language, versioned and approved.
- **Audit-ready:** matter log, prompt/version trace, model/version trace, source snippets, reviewer decisions.

## Competitive context

Likely adjacent products include:

- Contract lifecycle management suites with AI add-ons.
- Legal AI assistants focused on research or drafting.
- Document review and eDiscovery platforms.
- Generic enterprise LLM copilots.
- Specialist contract review tools.

Helix’s market entry should emphasize “legal ops automation for teams that cannot wait for a CLM rebuild.”

## MVP scope

### Must-have

- Secure document upload for PDF/DOCX/TXT.
- Text extraction and normalized matter workspace.
- Contract summary template with consistent sections.
- Clause extraction and risk issue list.
- Playbook comparison for one agreement type, starting with NDA or MSA.
- Reviewer approval workflow: draft → legal review → approved/exported.
- Export: PDF/Docx-style memo or Markdown/HTML briefing.
- Admin controls: workspace, users, roles, data retention settings.
- Basic audit log.

### Should-have

- Clause library and fallback text.
- Versioned playbooks.
- Source citations/snippets.
- Matter tags and searchable history.
- Slack/email intake.

### Explicitly out of MVP

- Autonomous legal advice to non-lawyers.
- Litigation strategy recommendations without attorney review.
- Regulated high-risk advice without customer counsel validation.
- Unsupervised filing/submission to courts, regulators, or counterparties.

## Product principles

- AI drafts; lawyers decide.
- Every assertion should be traceable to a document source or playbook rule.
- If the document does not say it, the system says “not specified.”
- Risk labels are configurable by customer, not universal legal truth.
- The product should reduce review time without reducing professional accountability.

## Demo narrative

“Upload an NDA. Helix extracts the key terms, compares it to your approved playbook, flags non-standard confidentiality term, broad residuals language, missing data protection terms, and non-mutual obligations, then drafts proposed redlines. The commercial counsel reviews the issue list, edits two recommendations, approves the memo, and exports a negotiation briefing for sales.”

## Pricing hypothesis

- Starter pilot: $1,500–$3,000/month, 3–5 users, limited document volume, one playbook.
- Team: $4,000–$8,000/month, 10–25 users, multiple playbooks, SSO/audit exports.
- Firm package: per-seat plus matter-volume tier, with client workspace separation.

## Success metrics

- First-pass review time reduced by 40–70% on selected agreement types.
- 90%+ of extracted key fields accepted or lightly edited by reviewers.
- 70%+ of AI issue classifications accepted by reviewers after playbook tuning.
- Median time from intake to lawyer-ready memo under 10 minutes for standard docs.
- Zero unapproved external legal-advice outputs in pilot.


---
Document owner: Helix Labs / Helix Legal AI  
Status: Draft for founder, counsel, and pilot-customer review  
Last updated: 2026-05-12
