import * as XLSX from 'xlsx';
import { z } from 'zod';
import type { RoadProduct, SeaProduct, EtsSettings } from './types';

// Define Zod schemas for basic columns. These can be extended to match the real Excel structure.
const RoadProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  manufacturer: z.string().optional().default(''),
  priceEur: z.number().nonnegative(),
  savingPctMin: z.number().nonnegative(),
  savingPctMid: z.number().nonnegative(),
  savingPctMax: z.number().nonnegative(),
  evidenceUrl: z.string().url().optional()
});

const SeaProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  manufacturer: z.string().optional().default(''),
  vesselClass: z.string().optional().default(''),
  corridor: z.string().optional().default(''),
  priceEur: z.number().nonnegative(),
  savingPctMin: z.number().nonnegative(),
  savingPctMid: z.number().nonnegative(),
  savingPctMax: z.number().nonnegative(),
  fuelType: z.union([z.literal('VLSFO'), z.literal('MGO')]),
  evidenceUrl: z.string().url().optional()
});

const EtsSettingsSchema = z.object({
  analysisYear: z.number(),
  etsPriceEur: z.number().nonnegative(),
  ets2PriceEur: z.number().nonnegative(),
  maritimeLaneShare: z.number().nonnegative(),
  roadPhaseInFactor: z.number().nonnegative(),
  seaPhaseInFactor: z.number().nonnegative()
});

export interface ParsedInterventions {
  roadProducts: RoadProduct[];
  seaProducts: SeaProduct[];
  etsSettings: EtsSettings;
}

/**
 * Generic function to parse an uploaded Excel file into structured data. It looks for
 * sheet names matching the expected ones and gracefully handles missing or extra columns.
 */
export function parseInterventionWorkbook(file: ArrayBuffer): ParsedInterventions {
  const workbook = XLSX.read(file, { type: 'array' });

  // Parse road products from Road_Products sheet
  const roadSheet = workbook.Sheets['Road_Products'];
  const roadRows: any[] = XLSX.utils.sheet_to_json(roadSheet, { defval: '' });
  const roadProducts: RoadProduct[] = [];
  for (const row of roadRows) {
    try {
      // Map column names from the sheet to our schema fields. Adjust these mappings to the exact workbook.
      const candidate = {
        id: String(row.ID || row.Id || row.id),
        name: row.Name || row.Product || '',
        manufacturer: row.Manufacturer || row.Maker || '',
        priceEur: Number(row.PriceEUR || row['Price (€)'] || 0),
        savingPctMin: Number(row.SavingPctMin || row['Saving % min'] || 0),
        savingPctMid: Number(row.SavingPctMid || row['Saving % mid'] || 0),
        savingPctMax: Number(row.SavingPctMax || row['Saving % max'] || 0),
        evidenceUrl: row.EvidenceURL || row['Evidence Link']
      };
      const validated = RoadProductSchema.parse(candidate);
      roadProducts.push(validated);
    } catch (err) {
      console.warn('Invalid road product row', err);
    }
  }

  // Parse sea products from Maritime_Products sheet
  const seaSheet = workbook.Sheets['Maritime_Products'];
  const seaRows: any[] = XLSX.utils.sheet_to_json(seaSheet, { defval: '' });
  const seaProducts: SeaProduct[] = [];
  for (const row of seaRows) {
    try {
      const candidate = {
        id: String(row.ID || row.Id || row.id),
        name: row.Name || row.Product || '',
        manufacturer: row.Manufacturer || row.Maker || '',
        vesselClass: row.VesselClass || row['Class'] || '',
        corridor: row.Corridor || '',
        priceEur: Number(row.PriceEUR || row['Price (€)'] || 0),
        savingPctMin: Number(row.SavingPctMin || row['Saving % min'] || 0),
        savingPctMid: Number(row.SavingPctMid || row['Saving % mid'] || 0),
        savingPctMax: Number(row.SavingPctMax || row['Saving % max'] || 0),
        fuelType: row.FuelType || row['Fuel'] || 'VLSFO',
        evidenceUrl: row.EvidenceURL || row['Evidence Link']
      };
      const validated = SeaProductSchema.parse(candidate);
      seaProducts.push(validated);
    } catch (err) {
      console.warn('Invalid sea product row', err);
    }
  }

  // Parse ETS settings from ETS_Settings sheet
  const settingsSheet = workbook.Sheets['ETS_Settings'];
  const settingsRow: any = XLSX.utils.sheet_to_json(settingsSheet, { defval: '' })[0] || {};
  const settingsCandidate = {
    analysisYear: Number(settingsRow.AnalysisYear || new Date().getFullYear()),
    etsPriceEur: Number(settingsRow.ETSPrice || settingsRow['ETS Price (€/t)'] || 0),
    ets2PriceEur: Number(settingsRow.ETS2Price || settingsRow['ETS2 Price (€/t)'] || 0),
    maritimeLaneShare: Number(settingsRow.LaneShare || settingsRow['Lane Share'] || 0),
    roadPhaseInFactor: Number(settingsRow.RoadPhaseIn || 1),
    seaPhaseInFactor: Number(settingsRow.SeaPhaseIn || 1)
  };
  const etsSettings: EtsSettings = EtsSettingsSchema.parse(settingsCandidate);

  return {
    roadProducts,
    seaProducts,
    etsSettings
  };
}

/**
 * Stub parser for the maritime evidence log workbook. The actual workbook contains numerous sheets
 * (Project_Boundary, Shipping_Lines, Vessel_Fleet, Retrofits, Voyages, Fuel_BDN, Shore_Power,
 * Sampling_QA, Methods, Calc_Summary, Verification_Pack). For the purposes of this demo the function
 * returns an empty object. Extend this to read the relevant sheets and map them to typed models.
 */
export function parseMaritimeEvidenceWorkbook(_file: ArrayBuffer) {
  console.warn('parseMaritimeEvidenceWorkbook is not yet implemented');
  return {};
}