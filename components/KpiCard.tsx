interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
}

export default function KpiCard({ title, value, subtext }: KpiCardProps) {
  return (
    <div className="p-4 bg-white rounded-md shadow border border-border flex flex-col">
      <span className="text-sm text-gray-500 mb-1">{title}</span>
      <span className="text-2xl font-semibold text-primary">{value}</span>
      {subtext && <span className="text-xs text-gray-400 mt-1">{subtext}</span>}
    </div>
  );
}