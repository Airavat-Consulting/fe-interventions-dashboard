# Changelog

## v0.1.0 – Initial release

### Added

* **Project scaffolding** with Next.js 14 App Router, TypeScript and TailwindCSS.
* **Sample Excel workbooks** for interventions and maritime evidence stored in `public/data/`.
* **Data parsing logic** using SheetJS and Zod with type‑safe models for road products, sea products and ETS settings.
* **Global state management** via Zustand with persistence of selected products and filters.
* **Overview page** with KPI cards and a stacked bar chart summarising interventions.
* **Road interventions page** featuring search, interactive table and ROI mini‑calculator with adjustable assumptions.
* **Maritime interventions page** mirroring road functionality and supporting fuel type toggles.
* **Scenario builder** that aggregates selected products, computes totals and exports to XLSX and PDF via jsPDF.
* **MRV evidence page** placeholder and documentation aligning the app with ISO 14083/GLEC and IMO CII.
* **Demo route** with optional passcode gating; seeded with bundled sample data.
* **CI configuration** for type checking, linting, tests and build; PR preview comment workflow stub.
* **Documentation**: README, architecture overview, MRV alignment and security policy.

### Known Limitations

* Drag‑and‑drop file upload UI is not yet implemented.
* `parseMaritimeEvidenceWorkbook` is a stub; maritime evidence sheets are not ingested.
* Playwright end‑to‑end tests are pending.
* Real ETS/ETS2 prices and phase‑in factors must be updated manually in the Excel workbook or via a future settings panel.