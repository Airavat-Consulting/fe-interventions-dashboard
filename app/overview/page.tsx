"use client";
import { useEffect, useState } from 'react';
import { useAppState } from '@/lib/store';
import KpiCard from '@/components/KpiCard';
import StackedBarChart from '@/components/StackedBarChart';

export default function OverviewPage() {
  const { roadProducts, seaProducts } = useAppState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chartData, setChartData] = useState<{ name: string; road: number; sea: number }[]>([]);

  useEffect(() => {
    // generate simple chart data by intervention type (count). In a real implementation this would aggregate savings.
    const totalRoad = roadProducts.length;
    const totalSea = seaProducts.length;
    setChartData([
      { name: 'Interventions', road: totalRoad, sea: totalSea }
    ]);
    setDataLoaded(true);
  }, [roadProducts, seaProducts]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Overview</h1>
      <p className="text-gray-700 max-w-2xl">
        Summary of interventions and savings. Upload your Excel files on the main page or explore the seeded demo data.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total interventions" value={roadProducts.length + seaProducts.length} />
        <KpiCard title="Road products" value={roadProducts.length} />
        <KpiCard title="Maritime products" value={seaProducts.length} />
      </div>
      {dataLoaded && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Interventions by segment</h2>
          <StackedBarChart data={chartData} />
        </div>
      )}
    </div>
  );
}