"use client";
import { useState } from 'react';
import type { RoadProduct } from '@/lib/types';

interface Props {
  product: RoadProduct | null;
}

export default function RoadRoiCalculator({ product }: Props) {
  const [kmPerYear, setKmPerYear] = useState(100000);
  const [consumptionLPer100km, setConsumption] = useState(30);
  const dieselPrice = 1.7; // € per litre, common average
  const emissionFactor = 2.68; // kg CO2 per litre diesel

  if (!product) {
    return <p className="text-gray-500">Select a product to calculate ROI.</p>;
  }

  const annualLitresUsed = (kmPerYear * consumptionLPer100km) / 100;
  const annualLitresSaved = annualLitresUsed * (product.savingPctMid / 100);
  const annualEuroSaved = annualLitresSaved * dieselPrice;
  const annualTco2eSaved = (annualLitresSaved * emissionFactor) / 1000; // convert kg to t
  const paybackYears = product.priceEur > 0 ? product.priceEur / annualEuroSaved : Infinity;

  return (
    <div className="space-y-2 p-4 border rounded-md">
      <h3 className="font-medium">ROI Calculator</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <label>
          Annual distance (km)
          <input
            type="number"
            value={kmPerYear}
            onChange={(e) => setKmPerYear(Number(e.target.value))}
            className="w-full mt-1 px-2 py-1 border rounded-md"
          />
        </label>
        <label>
          Consumption (L/100km)
          <input
            type="number"
            value={consumptionLPer100km}
            onChange={(e) => setConsumption(Number(e.target.value))}
            className="w-full mt-1 px-2 py-1 border rounded-md"
          />
        </label>
      </div>
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <strong>Annual fuel saved:</strong> {annualLitresSaved.toFixed(0)} L
        </p>
        <p>
          <strong>Annual € saved:</strong> €{annualEuroSaved.toFixed(0)}
        </p>
        <p>
          <strong>Annual tCO₂e avoided:</strong> {annualTco2eSaved.toFixed(2)} t
        </p>
        <p>
          <strong>Estimated payback:</strong> {paybackYears < Infinity ? paybackYears.toFixed(2) + ' years' : 'N/A'}
        </p>
      </div>
    </div>
  );
}