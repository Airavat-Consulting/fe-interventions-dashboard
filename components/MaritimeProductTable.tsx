"use client";
import { useAppState } from '@/lib/store';
import type { SeaProduct } from '@/lib/types';

interface Props {
  products: SeaProduct[];
}

export default function MaritimeProductTable({ products }: Props) {
  const { addToScenario } = useAppState();
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Name</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Manufacturer</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Class</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Saving % (mid)</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Fuel</th>
          <th className="px-3 py-2"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {products.map((p) => (
          <tr key={p.id}>
            <td className="px-3 py-2 text-sm text-gray-700">{p.name}</td>
            <td className="px-3 py-2 text-sm text-gray-700">{p.manufacturer}</td>
            <td className="px-3 py-2 text-sm text-gray-700">{p.vesselClass}</td>
            <td className="px-3 py-2 text-sm text-gray-700">{p.savingPctMid.toFixed(1)}%</td>
            <td className="px-3 py-2 text-sm text-gray-700">{p.fuelType}</td>
            <td className="px-3 py-2 text-right">
              <button
                className="px-2 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-light"
                onClick={() => addToScenario({ type: 'sea', productId: p.id, quantity: 1 })}
              >
                Add
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}