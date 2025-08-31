# FleetEnergies Interventions Dashboard

This repository contains a demo web application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Recharts**, **Zod**, **Zustand**, **SheetJS** and **jsPDF**. The aim of the project is to help EU road fleets and shippers convert measured fuel savings into verified carbon savings aligned with ETS/ETS2, CSRD, ISO 14083/GLEC and IMO CII.

## Features

* Drag‑and‑drop upload of two Excel workbooks or automatic loading of bundled sample files located under `/public/data`.
* Parsing of workbook sheets into typed models using **SheetJS** and **Zod**.
* Persistent state management with **Zustand** (basket, filters) stored in `localStorage`.
* Pages for overview, road interventions, maritime interventions, scenario builder and MRV evidence.
* KPI cards, stacked bar charts and ROI mini‑calculators for road and maritime products.
* Scenario builder with the ability to export selections to **XLSX** and **PDF**.
* Responsive green/white theme consistent with the FleetEnergies brand and accessible focus states.
* Optional demo passcode gate and Plausible analytics integration.

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

3. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Environment Variables

The application reads a small number of environment variables to alter runtime behaviour. Create a `.env.local` file in the root of the repo during development.

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_DEMO_PASSCODE` | If defined, the `/demo` route will prompt for this passcode before showing seeded data. | *(no passcode)* |
| `PLAUSIBLE_DOMAIN` | Domain for Plausible analytics. Analytics are disabled if not defined. | *(analytics disabled)* |
| `NEXT_PUBLIC_ANALYTICS_DISABLED` | Set to `1` to disable analytics even if `PLAUSIBLE_DOMAIN` is provided. | `0` |

## File Mapping

The dashboard expects two Excel workbooks with the following sheet→model mappings. Column headings are validated with Zod but allow minor variations (e.g., `PriceEUR` vs `Price (€)`):

| Workbook & Sheet | Parsed Model | Notes |
|---|---|---|
| **Intervention_Products_EU_with_ETS.xlsx** | | |
| ├ `Road_Products` | `RoadProduct[]` | Contains road intervention measures with pricing and saving percentages. |
| ├ `Maritime_Products` | `SeaProduct[]` | Contains maritime intervention measures with vessel class and fuel type. |
| └ `ETS_Settings` | `EtsSettings` | Defines ETS and ETS2 prices, lane coverage share and phase‑in factors. |
| **FleetEnergies_Maritime_Evidence_Log_DUMMY_v3.xlsx** | | |
| ├ Multiple sheets (e.g. `Calc_Summary`, `Vessel_Fleet`) | *(planned)* | Parsing functions are stubbed – extend `parseMaritimeEvidenceWorkbook` to ingest these sheets. |

## Developing & Testing

* **Unit Tests** live under `__tests__/` and use Jest with `ts-jest`.
* **End‑to‑end tests** can be added with Playwright (not yet implemented).
* Pre‑commit hooks can be configured with **commitlint** and **husky** to enforce conventional commits.

## Deployment

The repository is prepared to deploy on Vercel. When connected, preview deployments are created for every Pull Request and the `main` branch deploys the production site. Workflows under `.github/workflows` run type‑checking, linting, testing and build.

## License

This project is released under the MIT License. See `LICENSE` for details.