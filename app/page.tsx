'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { MainContent } from '@/components/MainContent';

export default function Home() {

  const [open, setOpen] = useState(false);

  return (
    <main className="h-screen w-screen flex max-w-7xl mx-auto relative overflow-hidden">
      {/* --- SIDEBAR --- */}
      <AppSidebar
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />

      {/* --- MAIN --- */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* --- TITLE BAR --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-4xl font-bold flex-1">Welcome Back!</h1>
          <p>
            Your StoreFront URL:
            <br />
            <b>www.smithlaw.lawbrokr.com</b>
          </p>
        </div>

        {/* --- MAIN CONTENT --- */}
        <MainContent />
      </div>
    </main>
  );
}
