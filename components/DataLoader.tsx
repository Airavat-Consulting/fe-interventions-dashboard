"use client";
import { useEffect } from 'react';
import { useAppState } from '@/lib/store';
import { parseInterventionWorkbook, parseMaritimeEvidenceWorkbook } from '@/lib/parsers';

/**
 * Component responsible for loading demo data from the public/data folder on initial load.
 * It uses the app state to check if data is already loaded. If not, it fetches and parses
 * the Excel files shipped with the repo. It also exposes an onDrop handler for file uploads.
 */
export default function DataLoader() {
  const { roadProducts, seaProducts, setRoadProducts, setSeaProducts, setEtsSettings } = useAppState();

  useEffect(() => {
    async function loadDemo() {
      if (roadProducts.length === 0 && seaProducts.length === 0) {
        try {
          const [interventionRes, maritimeRes] = await Promise.all([
            fetch('/data/Intervention_Products_EU_with_ETS.xlsx'),
            fetch('/data/FleetEnergies_Maritime_Evidence_Log_DUMMY_v3.xlsx')
          ]);
          const interventionBuffer = await interventionRes.arrayBuffer();
          const maritimeBuffer = await maritimeRes.arrayBuffer();
          const { roadProducts: road, seaProducts: sea, etsSettings } = parseInterventionWorkbook(interventionBuffer);
          setRoadProducts(road);
          setSeaProducts(sea);
          setEtsSettings(etsSettings);
          parseMaritimeEvidenceWorkbook(maritimeBuffer); // stub for now
        } catch (err) {
          console.error('Failed to load demo data', err);
        }
      }
    }
    loadDemo();
  }, [roadProducts, seaProducts, setRoadProducts, setSeaProducts, setEtsSettings]);

  return null;
}