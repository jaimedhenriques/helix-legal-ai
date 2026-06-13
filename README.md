# Helix Legal AI

Runnable TypeScript MVP scaffold for a local-first legal AI SaaS demo.

## Features

- Matter intake for client, matter, jurisdiction, objective, and risk tolerance.
- Workflow selection for contract review, diligence, legal research, outside counsel billing, and compliance audit.
- Local source-document entry with sample excerpts per workflow.
- Mocked AI analysis with deterministic findings, risk severity, source citations, and citation verification statuses.
- Dashboard metrics for confidence, verified citations, critical flags, and maximum severity.
- Compliance guardrails emphasizing attorney review, source limitations, and no external sends.
- Markdown report export/copy.

## Local development

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

This scaffold intentionally has no API keys, external model calls, server component, or hardcoded secrets.
