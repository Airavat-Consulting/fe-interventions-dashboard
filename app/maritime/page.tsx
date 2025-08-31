"use client";
import { useState, useMemo } from 'react';
import { useAppState } from '@/lib/store';
import MaritimeProductTable from '@/components/MaritimeProductTable';
import MaritimeRoiCalculator from '@/components/MaritimeRoiCalculator';

export default function MaritimePage() {
  const { seaProducts } = useAppState();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return seaProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [seaProducts, search]);

  const selectedProduct = seaProducts.find((p) => p.id === selectedId) || null;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Maritime Interventions</h1>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="mb-2 w-full px-3 py-2 border rounded-md"
          />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Manufacturer</th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Class</th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Saving % (mid)</th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-500">Fuel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`cursor-pointer ${selectedId === p.id ? 'bg-green-50' : ''}`}
                  >
                    <td className="px-3 py-2 text-sm text-gray-700">{p.name}</td>
                    <td className="px-3 py-2 text-sm text-gray-700">{p.manufacturer}</td>
                    <td className="px-3 py-2 text-sm text-gray-700">{p.vesselClass}</td>
                    <td className="px-3 py-2 text-sm text-gray-700">{p.savingPctMid.toFixed(1)}%</td>
                    <td className="px-3 py-2 text-sm text-gray-700">{p.fuelType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-1/3">
          <MaritimeRoiCalculator product={selectedProduct} />
        </div>
      </div>
    </div>
  );
}