import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary">FleetEnergies Interventions Dashboard</h1>
      <p className="max-w-xl text-center text-gray-700">
        This demo dashboard helps EU road fleets and shippers convert measured fuel savings into verified carbon savings
        aligned with ETS/ETS2, CSRD, ISO 14083/GLEC and IMO CII. Upload the provided Excel workbooks or explore the
        pre‑seeded data on the demo route.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/overview"
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-light focus:ring focus:outline-none"
        >
          Get Started
        </Link>
        <Link
          href="/demo"
          className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white focus:ring focus:outline-none"
        >
          View Demo
        </Link>
      </div>
    </main>
  );
}