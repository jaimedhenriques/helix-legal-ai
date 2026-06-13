export type WorkflowId =
  | 'contract-review'
  | 'diligence'
  | 'legal-research'
  | 'outside-counsel-billing'
  | 'compliance-audit';

export type CitationStatus = 'verified' | 'needs-review' | 'missing-source';
export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface WorkflowDefinition {
  id: WorkflowId;
  title: string;
  description: string;
  deliverables: string[];
}

export interface MatterIntake {
  clientName: string;
  matterName: string;
  jurisdiction: string;
  objective: string;
  riskTolerance: 'Conservative' | 'Balanced' | 'Aggressive';
}

export interface SourceDocument {
  id: string;
  title: string;
  content: string;
}

export interface Finding {
  id: string;
  title: string;
  summary: string;
  severity: Severity;
  citation: string;
  citationStatus: CitationStatus;
  recommendation: string;
}

export interface AnalysisResult {
  executiveSummary: string;
  confidence: number;
  generatedAt: string;
  guardrails: string[];
  findings: Finding[];
}
