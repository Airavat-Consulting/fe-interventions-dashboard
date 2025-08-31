# MRV Alignment

This document outlines how the FleetEnergies Interventions Dashboard aligns with international and EU measurement, reporting and verification (MRV) frameworks including **ISO 14083**, **GLEC**, **IMO CII** and the expanding EU Emissions Trading System (ETS/ETS2)**.**

## ISO 14083 & GLEC

ISO 14083 (published 2023) and the GLEC Framework (Global Logistics Emissions Council) provide methodologies for calculating and reporting greenhouse‑gas emissions from logistics and transport operations. In order to be compliant, fleet operators must:

* Define project boundaries and system components (e.g. vehicles, vessels, shore power) and ensure functional equivalence between test and control groups. The **Project_Boundary** sheet in the maritime evidence workbook captures these boundaries.
* Use fuel‑based emission factors (well‑to‑tank and tank‑to‑wheel) appropriate to the fuel type (e.g. VLSFO, MGO, diesel). The dashboard defaults to commonly accepted factors but allows toggling fuel types.
* Document activity data (distance travelled, fuel consumed, days at sea) and apply sampling quality‑assurance (QA) procedures. Planned `Sampling_QA` and `Voyages` sheets will support QA checks and variance analyses.
* Provide a calculation summary (see `Calc_Summary` sheet) that links activity data, emission factors and improvement measures. This summary can feed the **Scenario Builder** to ensure that reported savings map back to raw data.

## IMO CII

The International Maritime Organization’s Carbon Intensity Indicator (CII) rates vessels based on their gram CO₂ per deadweight‑tonne nautical mile. The dashboard does not calculate CII directly but can ingest data from `Vessel_Fleet` and `Shore_Power` sheets to highlight baseline CII ratings and reductions achieved through interventions. Operators should:

* Record baseline CII scores for vessels in the `Vessel_Fleet` sheet.
* Link retrofit measures (e.g. hull cleaning, propeller upgrades) to changes in fuel consumption and speed profiles.
* Store evidence of shore power utilisation (plug‑in sessions vs. at‑berth emissions) in the `Shore_Power` sheet.

## EU ETS & ETS2

The EU Emissions Trading System covers maritime transport from 2024 and road transport under ETS2 from 2027. Compliance requires:

* Tracking emissions subject to pricing – only a fraction of emissions may be covered in early years (phase‑in). The dashboard’s `EtsSettings` model includes `roadPhaseInFactor` and `seaPhaseInFactor` to adjust savings.
* Applying the correct allowance price (€/t) for each segment. Prices fluctuate annually; the application loads default values from the workbook but allows users to override them in the scenario builder.
* Documenting evidence for emission reductions. The `Verification_Pack` sheet (planned) should assemble data sufficient for third‑party verifiers.

## Non‑Claim Language

*The dashboard provides indicative calculations for demonstration purposes. Actual carbon‑credit issuance and regulatory compliance require professional verification.* The following principles should be followed:

* Savings estimates are conservative (use mid‑range values) and accompanied by ranges (min–max).
* Users must obtain vendor quotes for CAPEX and ensure interventions are installed and maintained correctly.
* Evidence logs should be verified by accredited auditors before reporting to regulators or credit registries.