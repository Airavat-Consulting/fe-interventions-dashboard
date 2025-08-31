# Architecture Overview

This document describes the high‑level architecture of the FleetEnergies Interventions Dashboard. The goal of the dashboard is to ingest two Excel workbooks, map the data to strongly‑typed models, perform simple calculations to estimate fuel and carbon savings and present the results to end users through interactive charts, tables and calculators.

## Data Flow

1. **Data loading**: When the application loads, the `DataLoader` component checks whether any interventions have been loaded into the global state. If not, it fetches the bundled sample files from `/public/data/Intervention_Products_EU_with_ETS.xlsx` and `/public/data/FleetEnergies_Maritime_Evidence_Log_DUMMY_v3.xlsx` and parses them. Users can also drag and drop their own Excel files (feature to be implemented) which will trigger the same parsing logic.
2. **Parsing**: Parsing is handled in `lib/parsers.ts` using the [SheetJS](https://sheetjs.com/) library. Each sheet is converted into JSON and validated against Zod schemas. Graceful fallbacks allow slight variations in column headings. Invalid rows are skipped with a warning.
3. **State management**: Parsed data is stored in a global state via `useAppState` (Zustand) with persistence. Key slices include:
   * `roadProducts`: array of `RoadProduct` objects.
   * `seaProducts`: array of `SeaProduct` objects.
   * `etsSettings`: global ETS/ETS2 parameters for the scenario builder.
   * `scenario`: array of selected products with quantities.
4. **Pages**: The app is split into pages under the `app/` directory using Next.js App Router:
   * **/overview** – Shows KPI cards and a stacked bar chart summarising interventions.
   * **/road** – Lists road interventions with search/filter and a ROI mini‑calculator.
   * **/maritime** – Lists maritime interventions and ROI calculator; includes a fuel type toggle.
   * **/scenario** – Displays selected products, computes totals and exports to XLSX and PDF.
   * **/evidence** – Placeholder for MRV evidence aligned with ISO 14083/GLEC and IMO CII (to be implemented).

## Parsing Logic

The `parseInterventionWorkbook` function reads three sheets:

* **Road_Products** – Mapped to the `RoadProduct` interface with fields: `id`, `name`, `manufacturer`, `priceEur`, `savingPctMin`, `savingPctMid`, `savingPctMax` and an optional `evidenceUrl`.
* **Maritime_Products** – Mapped to `SeaProduct` including `vesselClass` and `fuelType` (either `VLSFO` or `MGO`).
* **ETS_Settings** – Mapped to `EtsSettings` with numeric values for ETS/ETS2 prices, coverage share and phase‑in factors.

Rows are validated via Zod. When a column is missing or cannot be parsed, the row is skipped and a warning is printed in the console. To adapt to varying workbooks, adjust the property mapping in `parseInterventionWorkbook`.

`parseMaritimeEvidenceWorkbook` currently returns an empty object; extend it to read sheets such as `Calc_Summary`, `Vessel_Fleet`, `Shore_Power` and build the corresponding models. Align the data extraction with ISO 14083/GLEC requirements, capturing control/test boundaries and sampling QA.

## Calculation Formulas

### Road ETS2 Savings

For a road intervention, the estimated annual CO₂e avoided (t) is calculated by combining default or user‑entered assumptions:

```
annual_fuel_consumption_l = (annual_distance_km * fuel_consumption_l_per_100km) / 100
annual_fuel_saved_l = annual_fuel_consumption_l * (saving_pct_mid / 100)
annual_co2e_saved_t = (annual_fuel_saved_l * emission_factor_kg_co2_per_l) / 1000
ets2_eur_saved = annual_co2e_saved_t * ets2_price_eur_per_t
```

The ROI mini‑calculator divides the product CAPEX by the annual euros saved to estimate a simple payback period.

### Maritime ETS Savings

For maritime interventions the calculation uses daily fuel consumption and number of operating days:

```
annual_consumption_t = days_per_year * tons_per_day
annual_fuel_saved_t = annual_consumption_t * (saving_pct_mid / 100)
annual_co2e_saved_t = annual_fuel_saved_t * emission_factor_t_co2_per_t_fuel
ets_eur_saved = annual_co2e_saved_t * ets_price_eur_per_t * maritime_lane_share * sea_phase_in_factor
```

The ROI mini‑calculator uses fuel price (€/t) to estimate annual euro savings and divides the CAPEX by this figure for payback.

### Phase‑In Factors

ETS and ETS2 regulations introduce phased coverage where only a fraction of emissions are subject to pricing in the early years. The `EtsSettings` object includes `roadPhaseInFactor` and `seaPhaseInFactor` which should be functions of the analysis year (e.g., 0.4 in 2024, 0.7 in 2025, 1.0 in 2026). Update these fields when importing ETS settings or compute them dynamically based on the year.

## Extending the App

* **Evidence and MRV alignment** – Implement `parseMaritimeEvidenceWorkbook` and corresponding pages to visualise fuel logs, CII scores and QA sampling. Highlight where data supports ISO 14083/GLEC requirements and where additional documentation or certification is needed.
* **Drag‑and‑drop uploads** – Create a component that listens for file drop events, reads the files via `FileReader` and invokes the parsers.
* **Testing** – Add unit tests for each parser and calculator using Jest. For end‑to‑end assurance, use Playwright to upload sample files and assert that charts render correctly and exports succeed.
* **Security** – Keep all processing on the client; do not send uploaded data to the server. See `SECURITY.md` for more details.