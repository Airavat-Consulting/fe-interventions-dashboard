"use client";
import { useMemo } from 'react';
import { useAppState } from '@/lib/store';
import ScenarioTable from '@/components/ScenarioTable';
import type { RoadProduct, SeaProduct } from '@/lib/types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ScenarioPage() {
  const { roadProducts, seaProducts, scenario } = useAppState();
  const rows = useMemo(() => {
    return scenario.map((item) => {
      const product: RoadProduct | SeaProduct | undefined =
        item.type === 'road'
          ? roadProducts.find((p) => p.id === item.productId)
          : seaProducts.find((p) => p.id === item.productId);
      return {
        name: product?.name || 'Unknown',
        type: item.type,
        quantity: item.quantity,
        price: (product?.priceEur || 0) * item.quantity
      };
    });
  }, [scenario, roadProducts, seaProducts]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.capex += row.price;
        return acc;
      },
      { capex: 0 }
    );
  }, [rows]);

  const exportToXlsx = () => {
    const worksheetData = [
      ['Name', 'Type', 'Quantity', 'CAPEX (€)'],
      ...rows.map((r) => [r.name, r.type, r.quantity, r.price])
    ];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Scenario');
    XLSX.writeFile(wb, 'scenario_export.xlsx');
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text('FleetEnergies Scenario Summary', 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [['Name', 'Type', 'Quantity', 'CAPEX (€)']],
      body: rows.map((r) => [r.name, r.type, String(r.quantity), String(r.price)]),
      styles: { fontSize: 8 }
    });
    doc.text(`Total CAPEX: €${totals.capex.toFixed(0)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save('scenario_export.pdf');
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Scenario Builder</h1>
      {rows.length === 0 ? (
        <p className="text-gray-600">Add interventions from the Road or Maritime pages to start building your scenario.</p>
      ) : (
        <>
          <ScenarioTable roadProducts={roadProducts} seaProducts={seaProducts} />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm font-medium">Total CAPEX: €{totals.capex.toFixed(0)}</div>
            <div className="space-x-2">
              <button
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-light"
                onClick={exportToXlsx}
              >
                Export XLSX
              </button>
              <button
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-light"
                onClick={exportToPdf}
              >
                Export PDF
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}