# Helix Legal AI — Security, Privacy, and Compliance Package

## Executive posture

Helix Legal AI should be positioned as a governed legal workflow product for legal professionals, not as a substitute attorney. The product must assume legal documents are sensitive, potentially privileged, commercially confidential, and sometimes regulated.

## Core risk principles

- Human legal review before final legal output.
- Least-privilege access to matters and documents.
- Workspace/customer isolation.
- Clear data retention and deletion controls.
- No training on customer data unless explicitly agreed in writing.
- Source-grounded outputs and audit logging.
- Conservative handling of regulated data and privileged materials.

## Data classification

### Restricted

- Attorney-client privileged materials.
- Non-public contracts and negotiation positions.
- Personal data in contracts, HR, employment, or privacy documents.
- Security questionnaires, DPAs, customer/vendor confidential information.
- Litigation or regulatory investigation materials.

### Confidential

- Playbooks, fallback language, templates, company policies.
- Internal legal intake notes.
- Matter metadata.

### Public/sample

- Public SEC contracts.
- Sanitized templates.
- Demo documents.

## Recommended data flow

1. User authenticates into workspace.
2. User uploads document.
3. System stores encrypted original and extracted text.
4. Text extraction pipeline normalizes content.
5. AI analysis runs with customer-selected playbook and template.
6. Output is stored as draft work product.
7. Legal reviewer accepts/edits/rejects findings.
8. Approved output is exported.
9. Audit log records upload, analysis, review, approval, export, deletion.

## Required controls for MVP

### Identity and access

- Workspace-based tenancy.
- Role-based permissions: admin, legal reviewer, requester/viewer.
- Strong password/auth provider support.
- Optional SSO in later enterprise tier.
- Session timeout and access revocation.

### Data protection

- TLS for data in transit.
- Encryption at rest for documents and derived text.
- Separate storage namespaces per customer/workspace.
- Secrets managed outside source code.
- Signed URLs or equivalent short-lived access for downloads.

### Retention and deletion

- Configurable retention window per workspace.
- Delete original document, extracted text, AI outputs, and exports on request unless legally required to retain.
- Admin-visible deletion status.

### Model/vendor controls

- Use API terms appropriate for third-party products; do not route customer workloads through consumer accounts.
- Document whether model provider stores prompts/outputs and whether zero data retention or equivalent is enabled.
- Keep model name/version and prompt/template version in audit log.
- Block use of customer data for model training unless explicitly contracted.

### Auditability

- Log matter creation, upload, analysis run, prompt/template version, playbook version, reviewer actions, approval, export, deletion.
- Preserve source snippets supporting each finding where feasible.
- Maintain immutable or tamper-evident audit exports for pilots.

## AI governance controls

- Structured output schema with validation.
- Required “not specified” for absent facts.
- Confidence/severity labels are advisory, not determinative.
- Source snippets/citations for material claims.
- Reviewer decision capture for each issue.
- Regression tests on a fixed contract set before prompt/model changes.
- Change log for prompts, playbooks, and model versions.

## Legal/professional responsibility posture

Helix Legal AI should include clear customer-facing terms:

- The product provides AI-assisted drafting, summarization, classification, and workflow support.
- It does not provide legal advice to end users by itself.
- Outputs must be reviewed by qualified legal professionals before reliance or external use.
- Customers are responsible for professional judgment, legal advice, and final work product.
- The system may make mistakes, omit issues, or misclassify clauses.

## Unauthorized practice of law mitigation

- Sell to legal teams, firms, or businesses using their own counsel.
- Avoid direct-to-consumer legal advice workflows.
- Require approved reviewer for final outputs.
- Avoid claims like “automated lawyer,” “legal advice without counsel,” or “guaranteed compliance.”
- Maintain disclaimers in UI and contracts.

## Privacy checklist

- Privacy notice updated for document processing.
- DPA template prepared for business customers.
- Subprocessor list prepared.
- Data residency stance documented if applicable.
- DSAR/deletion process documented for personal data.
- Breach notification process documented.
- DPIA/LIA template for EU/UK customers if processing personal data at scale.

## Security review questions to answer before pilots

- Where are documents stored?
- Who can access customer documents?
- Are prompts/outputs retained by model providers?
- Is customer data used to train models?
- Can a customer delete all documents and derived data?
- Are audit logs exportable?
- Is SSO available or planned?
- What happens if the model produces incorrect output?
- Is there incident response coverage?
- What subprocessors are used?

## Pilot risk matrix

### Hallucinated legal issue

- Likelihood: medium.
- Impact: high if relied upon without review.
- Mitigation: source snippets, reviewer approval, disclaimers, regression tests.

### Missed material clause

- Likelihood: medium.
- Impact: high.
- Mitigation: checklist-based extraction, playbook coverage, negative test cases, reviewer review.

### Privileged/confidential data leakage

- Likelihood: low with controls; high impact.
- Impact: critical.
- Mitigation: encryption, access controls, no training, vendor review, limited pilot data.

### Customer misuse by non-lawyers

- Likelihood: medium.
- Impact: high.
- Mitigation: role controls, approval gates, UX warnings, contractual restrictions.

### Regulatory/privacy breach

- Likelihood: low/medium depending data.
- Impact: high.
- Mitigation: avoid sensitive regulated data in early pilots, DPA, retention/deletion, subprocessor review.

## Minimum launch gates

- Security/privacy owner signs off on data flow and vendor terms.
- Counsel/advisor signs off on disclaimers and UPL posture.
- Product enforces human approval before final export.
- Audit log exists and is testable.
- Pilot customers receive security FAQ, DPA, and acceptable-use boundaries.


---
Document owner: Helix Labs / Helix Legal AI  
Status: Draft for founder, counsel, and pilot-customer review  
Last updated: 2026-05-12
