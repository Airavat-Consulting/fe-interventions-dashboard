"use client";
import { useState } from 'react';
import type { SeaProduct } from '@/lib/types';

interface Props {
  product: SeaProduct | null;
}

export default function MaritimeRoiCalculator({ product }: Props) {
  const [daysPerYear, setDaysPerYear] = useState(250);
  const [tonsPerDay, setTonsPerDay] = useState(20);
  const vlsfoPrice = 650; // €/t
  const mgoPrice = 950; // €/t
  const vlsfoEf = 3.206; // tCO2/t
  const mgoEf = 3.206; // same for demonstration

  if (!product) {
    return <p className="text-gray-500">Select a product to calculate ROI.</p>;
  }

  // Determine fuel-specific parameters
  const price = product.fuelType === 'MGO' ? mgoPrice : vlsfoPrice;
  const emissionFactor = product.fuelType === 'MGO' ? mgoEf : vlsfoEf;

  const annualConsumption = daysPerYear * tonsPerDay;
  const annualTonsSaved = annualConsumption * (product.savingPctMid / 100);
  const annualEuroSaved = annualTonsSaved * price;
  const annualTco2eSaved = annualTonsSaved * emissionFactor;
  const paybackYears = product.priceEur > 0 ? product.priceEur / annualEuroSaved : Infinity;

  return (
    <div className="space-y-2 p-4 border rounded-md">
      <h3 className="font-medium">ROI Calculator</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <label>
          Days per year
          <input
            type="number"
            value={daysPerYear}
            onChange={(e) => setDaysPerYear(Number(e.target.value))}
            className="w-full mt-1 px-2 py-1 border rounded-md"
          />
        </label>
        <label>
          Fuel burned (t/day)
          <input
            type="number"
            value={tonsPerDay}
            onChange={(e) => setTonsPerDay(Number(e.target.value))}
            className="w-full mt-1 px-2 py-1 border rounded-md"
          />
        </label>
      </div>
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <strong>Annual fuel saved:</strong> {annualTonsSaved.toFixed(2)} t
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