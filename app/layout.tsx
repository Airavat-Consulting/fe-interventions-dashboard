import './globals.css';
import DataLoader from '@/components/DataLoader';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'FleetEnergies Interventions Dashboard',
  description: 'Visualise and plan fleet interventions for ETS/ETS2 savings.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-900 flex flex-col">
        {/* Global data loader */}
        <DataLoader />
        <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-lg font-semibold text-primary">FleetEnergies</a>
          <nav className="space-x-4 text-sm">
            <a href="/overview" className="text-gray-700 hover:text-primary">Overview</a>
            <a href="/road" className="text-gray-700 hover:text-primary">Road</a>
            <a href="/maritime" className="text-gray-700 hover:text-primary">Maritime</a>
            <a href="/scenario" className="text-gray-700 hover:text-primary">Scenario</a>
            <a href="/evidence" className="text-gray-700 hover:text-primary">Evidence</a>
            <a href="/demo" className="text-gray-700 hover:text-primary">Demo</a>
          </nav>
        </header>
        <main className="flex-1">
          {children}
        </main>
        {process.env.PLAUSIBLE_DOMAIN && process.env.NEXT_PUBLIC_ANALYTICS_DISABLED !== '1' && (
          <script
            defer
            data-domain={process.env.PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}