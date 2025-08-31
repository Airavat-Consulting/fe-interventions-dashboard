"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

interface BarData {
  name: string;
  road: number;
  sea: number;
}

interface StackedBarChartProps {
  data: BarData[];
}

export default function StackedBarChart({ data }: StackedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="road" stackId="a" fill="#16A34A" />
        <Bar dataKey="sea" stackId="a" fill="#22C55E" />
      </BarChart>
    </ResponsiveContainer>
  );
}