import { useMemo, useState } from 'react';
import { exportMarkdown, runMockAnalysis, sampleDocuments, workflows } from './mockAi';
import type { AnalysisResult, MatterIntake, SourceDocument, WorkflowId } from './types';

const defaultIntake: MatterIntake = {
  clientName: 'Acme Robotics Ltd.',
  matterName: 'Q2 commercial risk review',
  jurisdiction: 'England & Wales',
  objective: 'Prioritise business-facing legal risks and cite every issue to local source text.',
  riskTolerance: 'Balanced',
};

const statusLabels = {
  verified: 'Verified citation',
  'needs-review': 'Needs source review',
  'missing-source': 'Missing source',
};

const severityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

function App() {
  const [intake, setIntake] = useState<MatterIntake>(defaultIntake);
  const [workflowId, setWorkflowId] = useState<WorkflowId>('contract-review');
  const [documents, setDocuments] = useState<SourceDocument[]>(sampleDocuments['contract-review']);
  const [activeDocId, setActiveDocId] = useState(documents[0].id);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const workflow = workflows.find((item) => item.id === workflowId) ?? workflows[0];
  const activeDocument = documents.find((document) => document.id === activeDocId) ?? documents[0];
  const markdown = useMemo(
    () => (result ? exportMarkdown(intake, workflow, documents, result) : ''),
    [documents, intake, result, workflow],
  );

  const verifiedCount = result?.findings.filter((finding) => finding.citationStatus === 'verified').length ?? 0;
  const criticalCount = result?.findings.filter((finding) => finding.severity === 'critical').length ?? 0;
  const maxSeverity = result?.findings.reduce((max, finding) => Math.max(max, severityRank[finding.severity]), 0) ?? 0;

  function updateIntake<K extends keyof MatterIntake>(key: K, value: MatterIntake[K]) {
    setIntake((current) => ({ ...current, [key]: value }));
  }

  function selectWorkflow(nextWorkflowId: WorkflowId) {
    const nextDocuments = sampleDocuments[nextWorkflowId];
    setWorkflowId(nextWorkflowId);
    setDocuments(nextDocuments);
    setActiveDocId(nextDocuments[0].id);
    setResult(null);
  }

  function updateActiveDocument(key: keyof SourceDocument, value: string) {
    setDocuments((current) =>
      current.map((document) => (document.id === activeDocument.id ? { ...document, [key]: value } : document)),
    );
    setResult(null);
  }

  function addDocument() {
    const nextDocument: SourceDocument = {
      id: `doc-${Date.now()}`,
      title: `Source document ${documents.length + 1}`,
      content: '',
    };
    setDocuments((current) => [...current, nextDocument]);
    setActiveDocId(nextDocument.id);
    setResult(null);
  }

  function runAnalysis() {
    setIsRunning(true);
    window.setTimeout(() => {
      setResult(runMockAnalysis(workflowId, intake, documents));
      setIsRunning(false);
    }, 450);
  }

  async function copyMarkdown() {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
  }

  return (
    <main className="app-shell">
      <section className="hero panel">
        <div>
          <p className="eyebrow">Local-first legal AI SaaS demo</p>
          <h1>Helix Legal AI</h1>
          <p className="hero-copy">
            Intake a matter, select a legal workflow, paste source documents, and run a mocked AI analysis with citation
            verification, risk flags, guardrails, and markdown export. No external sends, no API keys, no secrets.
          </p>
        </div>
        <div className="trust-card">
          <span>Privacy posture</span>
          <strong>Browser-only MVP</strong>
          <small>All analysis is deterministic mock logic over local source text.</small>
        </div>
      </section>

      <section className="grid two-columns">
        <div className="panel stack">
          <div className="section-heading">
            <span>1</span>
            <div>
              <h2>Matter intake</h2>
              <p>Capture context before any AI-assisted work product is drafted.</p>
            </div>
          </div>
          <label>
            Client
            <input value={intake.clientName} onChange={(event) => updateIntake('clientName', event.target.value)} />
          </label>
          <label>
            Matter
            <input value={intake.matterName} onChange={(event) => updateIntake('matterName', event.target.value)} />
          </label>
          <label>
            Jurisdiction
            <input value={intake.jurisdiction} onChange={(event) => updateIntake('jurisdiction', event.target.value)} />
          </label>
          <label>
            Risk tolerance
            <select
              value={intake.riskTolerance}
              onChange={(event) => updateIntake('riskTolerance', event.target.value as MatterIntake['riskTolerance'])}
            >
              <option>Conservative</option>
              <option>Balanced</option>
              <option>Aggressive</option>
            </select>
          </label>
          <label>
            Objective
            <textarea
              rows={4}
              value={intake.objective}
              onChange={(event) => updateIntake('objective', event.target.value)}
            />
          </label>
        </div>

        <div className="panel stack">
          <div className="section-heading">
            <span>2</span>
            <div>
              <h2>Workflow</h2>
              <p>Choose the legal-service motion to demonstrate.</p>
            </div>
          </div>
          <div className="workflow-list">
            {workflows.map((item) => (
              <button
                className={item.id === workflowId ? 'workflow-card active' : 'workflow-card'}
                key={item.id}
                onClick={() => selectWorkflow(item.id)}
                type="button"
              >
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
          <div className="deliverables">
            <strong>Expected deliverables</strong>
            <ul>
              {workflow.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid two-columns">
        <div className="panel stack">
          <div className="section-heading">
            <span>3</span>
            <div>
              <h2>Source documents</h2>
              <p>Paste contract, diligence, research, invoice, or policy excerpts.</p>
            </div>
          </div>
          <div className="doc-tabs">
            {documents.map((document) => (
              <button
                className={document.id === activeDocument.id ? 'active' : ''}
                key={document.id}
                onClick={() => setActiveDocId(document.id)}
                type="button"
              >
                {document.title || 'Untitled'}
              </button>
            ))}
            <button onClick={addDocument} type="button">+ Add</button>
          </div>
          <label>
            Document title
            <input value={activeDocument.title} onChange={(event) => updateActiveDocument('title', event.target.value)} />
          </label>
          <label>
            Document text
            <textarea
              className="source-box"
              rows={11}
              value={activeDocument.content}
              onChange={(event) => updateActiveDocument('content', event.target.value)}
            />
          </label>
          <button className="primary-action" disabled={isRunning} onClick={runAnalysis} type="button">
            {isRunning ? 'Running grounded mock analysis…' : 'Run mocked AI analysis'}
          </button>
        </div>

        <div className="panel stack">
          <div className="section-heading">
            <span>4</span>
            <div>
              <h2>Dashboard</h2>
              <p>Risk flags, citation verification, and compliance guardrails.</p>
            </div>
          </div>
          <div className="metrics">
            <article>
              <span>Confidence</span>
              <strong>{result ? `${result.confidence}%` : '—'}</strong>
            </article>
            <article>
              <span>Verified citations</span>
              <strong>{result ? `${verifiedCount}/${result.findings.length}` : '—'}</strong>
            </article>
            <article>
              <span>Critical flags</span>
              <strong>{result ? criticalCount : '—'}</strong>
            </article>
            <article>
              <span>Max severity</span>
              <strong>{maxSeverity ? Object.keys(severityRank).find((key) => severityRank[key as keyof typeof severityRank] === maxSeverity) : '—'}</strong>
            </article>
          </div>

          {!result ? (
            <div className="empty-state">
              <strong>Ready for local analysis</strong>
              <p>Run the workflow to populate source-grounded findings. The mock engine never sends data externally.</p>
            </div>
          ) : (
            <>
              <div className="summary-card">
                <span>Executive summary</span>
                <p>{result.executiveSummary}</p>
              </div>
              <div className="findings-list">
                {result.findings.map((finding) => (
                  <article className={`finding ${finding.severity}`} key={finding.id}>
                    <div className="finding-header">
                      <strong>{finding.title}</strong>
                      <span>{finding.severity}</span>
                    </div>
                    <p>{finding.summary}</p>
                    <blockquote>{finding.citation}</blockquote>
                    <div className={`citation-status ${finding.citationStatus}`}>
                      {statusLabels[finding.citationStatus]}
                    </div>
                    <small>{finding.recommendation}</small>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="grid two-columns bottom-grid">
        <div className="panel stack">
          <h2>Compliance guardrails</h2>
          <ul className="guardrails">
            {(result?.guardrails ?? [
              'No external network calls or model APIs are configured in this scaffold.',
              'Do not rely on generated output without qualified attorney review.',
              'Citation statuses distinguish verified local text from missing or review-needed support.',
            ]).map((guardrail) => (
              <li key={guardrail}>{guardrail}</li>
            ))}
          </ul>
        </div>

        <div className="panel stack">
          <div className="export-heading">
            <h2>Export markdown</h2>
            <button disabled={!markdown} onClick={copyMarkdown} type="button">Copy</button>
          </div>
          <textarea readOnly rows={12} value={markdown || 'Run an analysis to generate an exportable markdown report.'} />
        </div>
      </section>
    </main>
  );
}

export default App;
