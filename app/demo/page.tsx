import DemoGate from '@/components/DemoGate';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <DemoGate>
      <main className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-primary">FleetEnergies Demo</h1>
        <p className="text-gray-700 max-w-2xl">
          This demo is preloaded with the sample Excel files located in <code>/public/data</code>. Explore the
          dashboard without uploading your own data. Use the navigation below to explore different pages.
        </p>
        <nav className="space-x-4">
          <Link href="/overview" className="text-primary underline">
            Overview
          </Link>
          <Link href="/road" className="text-primary underline">
            Road
          </Link>
          <Link href="/maritime" className="text-primary underline">
            Maritime
          </Link>
          <Link href="/scenario" className="text-primary underline">
            Scenario Builder
          </Link>
        </nav>
      </main>
    </DemoGate>
  );
}