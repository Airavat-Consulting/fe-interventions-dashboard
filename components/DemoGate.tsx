"use client";

import { useState } from 'react';

interface DemoGateProps {
  children: React.ReactNode;
}

export default function DemoGate({ children }: DemoGateProps) {
  const passcode = process.env.NEXT_PUBLIC_DEMO_PASSCODE;
  const [entered, setEntered] = useState('');
  const [unlocked, setUnlocked] = useState(!passcode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode || entered === passcode) {
      setUnlocked(true);
    } else {
      alert('Incorrect passcode');
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="mb-4 text-xl font-semibold">Enter Demo Passcode</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="password"
          value={entered}
          onChange={(e) => setEntered(e.target.value)}
          className="px-2 py-1 border rounded-md focus:ring focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 py-1 text-white bg-primary rounded-md hover:bg-primary-light focus:ring focus:outline-none"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}