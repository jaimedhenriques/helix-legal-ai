import type { AnalysisResult, Finding, MatterIntake, SourceDocument, WorkflowDefinition, WorkflowId } from './types';

export const workflows: WorkflowDefinition[] = [
  {
    id: 'contract-review',
    title: 'Contract Review',
    description: 'Find obligations, risky clauses, missing terms, renewal traps, and negotiation priorities.',
    deliverables: ['Issue list', 'Clause citations', 'Negotiation playbook'],
  },
  {
    id: 'diligence',
    title: 'Diligence',
    description: 'Summarize documents, surface red flags, and track open diligence requests.',
    deliverables: ['Red-flag report', 'Open requests', 'Source binder'],
  },
  {
    id: 'legal-research',
    title: 'Legal Research',
    description: 'Structure a research memo with authority checks and confidence boundaries.',
    deliverables: ['Research memo', 'Authority map', 'Open questions'],
  },
  {
    id: 'outside-counsel-billing',
    title: 'Outside Counsel Billing',
    description: 'Audit invoices for guideline compliance, block billing, staffing, and budget variance.',
    deliverables: ['Billing exceptions', 'Savings estimate', 'Appeal notes'],
  },
  {
    id: 'compliance-audit',
    title: 'Compliance Audit',
    description: 'Map controls to policy text, identify evidence gaps, and prioritize remediation.',
    deliverables: ['Control matrix', 'Gap register', 'Remediation plan'],
  },
];

export const sampleDocuments: Record<WorkflowId, SourceDocument[]> = {
  'contract-review': [
    {
      id: 'contract-1',
      title: 'Master Services Agreement excerpt',
      content:
        'Section 4.2: Customer must pay invoices within 15 days. Section 8.1: Vendor may auto-renew the agreement for successive one-year terms unless customer gives notice 90 days before the renewal date. Section 11.3: Liability is uncapped for confidentiality breaches and payment obligations.',
    },
  ],
  diligence: [
    {
      id: 'diligence-1',
      title: 'Target company disclosure excerpt',
      content:
        'The company has three unresolved customer claims above $250,000. Two key supplier contracts expire within 45 days and require consent before assignment. Data room evidence for SOC 2 controls is pending.',
    },
  ],
  'legal-research': [
    {
      id: 'research-1',
      title: 'Research notes excerpt',
      content:
        'Question presented: whether a non-compete covenant is enforceable after the 2024 statutory update. Existing notes identify one appellate case but no current administrative guidance. Jurisdiction-specific exceptions may apply.',
    },
  ],
  'outside-counsel-billing': [
    {
      id: 'billing-1',
      title: 'Outside counsel invoice excerpt',
      content:
        'Partner review: 8.2 hours, strategy and revise memo and calls. Associate research: 14.4 hours on background law. Invoice exceeds phase budget by 22%. Travel time billed at full rate despite billing guideline cap at 50%.',
    },
  ],
  'compliance-audit': [
    {
      id: 'audit-1',
      title: 'Compliance policy excerpt',
      content:
        'Policy requires quarterly access reviews, vendor risk assessments before onboarding, and incident response tabletop exercises annually. Q3 access review attestation is missing. Vendor file for Acme Analytics lacks a completed risk questionnaire.',
    },
  ],
};

const workflowCopy: Record<WorkflowId, Pick<AnalysisResult, 'executiveSummary' | 'guardrails'>> = {
  'contract-review': {
    executiveSummary:
      'The agreement is commercially workable but contains renewal, payment, and liability terms that should be escalated before signature.',
    guardrails: [
      'No legal advice is provided; attorney review remains required before client action.',
      'Citations are limited to pasted local source text and are not external-law validated.',
      'Unverified or missing-source findings must not be used in final work product.',
    ],
  },
  diligence: {
    executiveSummary:
      'The diligence packet shows assignment, customer-claim, and control-evidence gaps that should drive follow-up requests.',
    guardrails: [
      'This demo does not contact the target, counsel, cloud systems, or third-party data rooms.',
      'Findings summarize only supplied text and may omit issues outside the uploaded scope.',
      'High-risk items require human legal and business validation.',
    ],
  },
  'legal-research': {
    executiveSummary:
      'The research record is incomplete: authority is sparse and jurisdiction-specific exceptions need validation before a memo is relied on.',
    guardrails: [
      'No external legal database search is performed in this MVP.',
      'Authorities are not Shepardized, KeyCited, or otherwise validated.',
      'Use this as a memo scaffold, not a legal conclusion.',
    ],
  },
  'outside-counsel-billing': {
    executiveSummary:
      'The invoice presents likely guideline exceptions involving block billing, budget variance, and travel-rate treatment.',
    guardrails: [
      'Savings estimates are directional and require billing-guideline confirmation.',
      'No invoice data leaves the browser in this local-first demo.',
      'Human review should approve any appeal or write-down communication.',
    ],
  },
  'compliance-audit': {
    executiveSummary:
      'The audit source identifies control evidence gaps around access reviews, vendor onboarding, and tabletop exercise proof.',
    guardrails: [
      'This tool does not certify compliance or replace a formal audit.',
      'Control mapping is based only on user-provided policy text.',
      'Remediation dates and owners should be confirmed with control owners.',
    ],
  },
};

const findingTemplates: Record<WorkflowId, Omit<Finding, 'id'>[]> = {
  'contract-review': [
    {
      title: 'Auto-renewal notice window is unusually long',
      summary: 'The 90-day notice requirement creates a renewal trap if the business does not track the deadline.',
      severity: 'high',
      citation: 'Section 8.1: Vendor may auto-renew... unless customer gives notice 90 days before the renewal date.',
      citationStatus: 'verified',
      recommendation: 'Negotiate a shorter notice window, add reminder obligations, or require affirmative renewal consent.',
    },
    {
      title: 'Uncapped liability carve-outs need business approval',
      summary: 'Confidentiality breaches and payment obligations are excluded from the cap, increasing downside exposure.',
      severity: 'medium',
      citation: 'Section 11.3: Liability is uncapped for confidentiality breaches and payment obligations.',
      citationStatus: 'verified',
      recommendation: 'Confirm risk appetite and consider a super-cap for confidentiality rather than uncapped exposure.',
    },
    {
      title: 'Data processing terms not found',
      summary: 'The supplied excerpt does not show privacy, security, or DPA terms that may be needed for SaaS processing.',
      severity: 'medium',
      citation: 'No matching source text supplied.',
      citationStatus: 'missing-source',
      recommendation: 'Request full data processing and security exhibits before final approval.',
    },
  ],
  diligence: [
    {
      title: 'Material customer claims require quantification',
      summary: 'Three unresolved customer claims above $250,000 may affect purchase price, indemnity, or closing conditions.',
      severity: 'high',
      citation: 'The company has three unresolved customer claims above $250,000.',
      citationStatus: 'verified',
      recommendation: 'Request claim pleadings, reserves, settlement history, and management assessment.',
    },
    {
      title: 'Supplier assignment consent risk',
      summary: 'Expiring supplier contracts with consent requirements may disrupt post-closing operations.',
      severity: 'critical',
      citation: 'Two key supplier contracts expire within 45 days and require consent before assignment.',
      citationStatus: 'verified',
      recommendation: 'Add consent tracker and make renewal/consent a signing or closing deliverable.',
    },
    {
      title: 'SOC 2 evidence is pending',
      summary: 'Control evidence is referenced but not available, leaving security diligence incomplete.',
      severity: 'medium',
      citation: 'Data room evidence for SOC 2 controls is pending.',
      citationStatus: 'verified',
      recommendation: 'Keep the request open and require auditor report plus bridge letter if applicable.',
    },
  ],
  'legal-research': [
    {
      title: 'Research authority is incomplete',
      summary: 'Only one appellate case is identified and no current administrative guidance is included.',
      severity: 'high',
      citation: 'Existing notes identify one appellate case but no current administrative guidance.',
      citationStatus: 'verified',
      recommendation: 'Run jurisdiction-specific legal database research and update the authority table.',
    },
    {
      title: 'Statutory update creates validation risk',
      summary: 'The enforceability question depends on a 2024 statutory update that has not been fully analyzed.',
      severity: 'critical',
      citation: 'Question presented: whether a non-compete covenant is enforceable after the 2024 statutory update.',
      citationStatus: 'verified',
      recommendation: 'Confirm effective date, exceptions, and retroactivity before issuing a conclusion.',
    },
    {
      title: 'Administrative guidance missing',
      summary: 'Agency interpretation could affect practical enforceability but is not in the record.',
      severity: 'medium',
      citation: 'No current administrative guidance.',
      citationStatus: 'needs-review',
      recommendation: 'Add regulator FAQs, enforcement guidance, and pending rulemaking if relevant.',
    },
  ],
  'outside-counsel-billing': [
    {
      title: 'Potential block billing',
      summary: 'Partner entry combines review, strategy, revisions, and calls in a single 8.2-hour block.',
      severity: 'high',
      citation: 'Partner review: 8.2 hours, strategy and revise memo and calls.',
      citationStatus: 'verified',
      recommendation: 'Request task-level breakdown or apply guideline reduction for block billing.',
    },
    {
      title: 'Phase budget variance exceeds threshold',
      summary: 'The invoice is 22% above budget, which may require pre-approval under common guidelines.',
      severity: 'medium',
      citation: 'Invoice exceeds phase budget by 22%.',
      citationStatus: 'verified',
      recommendation: 'Ask counsel for variance explanation and approval record.',
    },
    {
      title: 'Travel billed above guideline cap',
      summary: 'Travel time appears billed at full rate despite a 50% cap.',
      severity: 'medium',
      citation: 'Travel time billed at full rate despite billing guideline cap at 50%.',
      citationStatus: 'verified',
      recommendation: 'Calculate proposed write-down to the allowed travel rate.',
    },
  ],
  'compliance-audit': [
    {
      title: 'Missing quarterly access review evidence',
      summary: 'The Q3 access review attestation is absent despite policy requiring quarterly reviews.',
      severity: 'high',
      citation: 'Policy requires quarterly access reviews... Q3 access review attestation is missing.',
      citationStatus: 'verified',
      recommendation: 'Assign control owner and obtain or recreate Q3 attestation evidence.',
    },
    {
      title: 'Vendor onboarding file incomplete',
      summary: 'Acme Analytics lacks the required vendor risk questionnaire.',
      severity: 'medium',
      citation: 'Vendor file for Acme Analytics lacks a completed risk questionnaire.',
      citationStatus: 'verified',
      recommendation: 'Complete retrospective vendor risk assessment and document compensating controls.',
    },
    {
      title: 'Incident tabletop evidence not supplied',
      summary: 'Annual tabletop exercises are required, but no exercise record appears in the supplied text.',
      severity: 'medium',
      citation: 'Policy requires... incident response tabletop exercises annually.',
      citationStatus: 'needs-review',
      recommendation: 'Request latest tabletop agenda, attendee list, after-action report, and remediation tracker.',
    },
  ],
};

export function runMockAnalysis(
  workflowId: WorkflowId,
  intake: MatterIntake,
  documents: SourceDocument[],
): AnalysisResult {
  const providedText = documents.map((document) => document.content.toLowerCase()).join('\n');
  const base = workflowCopy[workflowId];
  const findings = findingTemplates[workflowId].map((finding, index) => {
    const sourceSnippet = finding.citation.toLowerCase().slice(0, 42);
    const citationStatus = finding.citationStatus === 'missing-source'
      ? finding.citationStatus
      : providedText.includes(sourceSnippet.split(' ').slice(0, 4).join(' '))
        ? finding.citationStatus
        : 'needs-review';

    return {
      ...finding,
      id: `${workflowId}-${index + 1}`,
      citationStatus,
    };
  });

  const objectiveNote = intake.objective.trim()
    ? ` Objective focus: ${intake.objective.trim()}`
    : '';

  return {
    executiveSummary: `${base.executiveSummary}${objectiveNote}`,
    confidence: Math.max(62, 94 - findings.filter((finding) => finding.citationStatus !== 'verified').length * 11),
    generatedAt: new Date().toISOString(),
    guardrails: base.guardrails,
    findings,
  };
}

export function exportMarkdown(
  intake: MatterIntake,
  workflow: WorkflowDefinition,
  documents: SourceDocument[],
  result: AnalysisResult,
): string {
  const findings = result.findings
    .map(
      (finding) =>
        `### ${finding.title}\n- Severity: ${finding.severity}\n- Citation status: ${finding.citationStatus}\n- Summary: ${finding.summary}\n- Citation: ${finding.citation}\n- Recommendation: ${finding.recommendation}`,
    )
    .join('\n\n');

  return `# Helix Legal AI Report\n\n## Matter\n- Client: ${intake.clientName || 'Not supplied'}\n- Matter: ${intake.matterName || 'Not supplied'}\n- Jurisdiction: ${intake.jurisdiction || 'Not supplied'}\n- Risk tolerance: ${intake.riskTolerance}\n- Workflow: ${workflow.title}\n\n## Executive summary\n${result.executiveSummary}\n\n## Guardrails\n${result.guardrails.map((guardrail) => `- ${guardrail}`).join('\n')}\n\n## Source documents\n${documents.map((document) => `- ${document.title} (${document.content.length} chars)`).join('\n')}\n\n## Findings\n${findings}\n`;
}
