"use client";
import { useAppState } from '@/lib/store';
import type { RoadProduct, SeaProduct } from '@/lib/types';

interface Props {
  roadProducts: RoadProduct[];
  seaProducts: SeaProduct[];
}

export default function ScenarioTable({ roadProducts, seaProducts }: Props) {
  const { scenario, removeFromScenario } = useAppState();
  const rows = scenario.map((item) => {
    const product = item.type === 'road'
      ? roadProducts.find((p) => p.id === item.productId)
      : seaProducts.find((p) => p.id === item.productId);
    return {
      ...item,
      name: product?.name || 'Unknown',
      price: product?.priceEur || 0
    };
  });
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Name</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Type</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
          <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">CAPEX €</th>
          <th className="px-3 py-2"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row) => (
          <tr key={row.productId}>
            <td className="px-3 py-2 text-sm text-gray-700">{row.name}</td>
            <td className="px-3 py-2 text-sm text-gray-700 capitalize">{row.type}</td>
            <td className="px-3 py-2 text-sm text-gray-700">{row.quantity}</td>
            <td className="px-3 py-2 text-sm text-gray-700">€{(row.price * row.quantity).toFixed(0)}</td>
            <td className="px-3 py-2 text-right">
              <button
                className="px-2 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-500"
                onClick={() => removeFromScenario(row.productId)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}