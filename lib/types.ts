export interface RoadProduct {
  id: string;
  name: string;
  manufacturer: string;
  priceEur: number;
  savingPctMin: number;
  savingPctMid: number;
  savingPctMax: number;
  evidenceUrl?: string;
}

export interface SeaProduct {
  id: string;
  name: string;
  manufacturer: string;
  vesselClass: string;
  corridor?: string;
  priceEur: number;
  savingPctMin: number;
  savingPctMid: number;
  savingPctMax: number;
  fuelType: 'VLSFO' | 'MGO';
  evidenceUrl?: string;
}

export interface EtsSettings {
  analysisYear: number;
  etsPriceEur: number;
  ets2PriceEur: number;
  maritimeLaneShare: number; // share of ETS coverage for maritime lanes
  roadPhaseInFactor: number;
  seaPhaseInFactor: number;
}

export interface ScenarioItem {
  type: 'road' | 'sea';
  productId: string;
  quantity: number;
}