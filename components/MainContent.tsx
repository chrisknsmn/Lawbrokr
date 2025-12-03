'use client';

import { Spinner, Alert } from 'flowbite-react';
import { BitcoinPriceChart } from '@/components/BitcoinPriceChart';
import { BitcoinScatterChart } from '@/components/BitcoinScatterChart';
import { CompanyTable } from '@/components/CompanyTable';
import { useCompanyData } from '@/hooks/useCompanyData';

export function MainContent() {
  const { companies, isLoading, error, resetData } = useCompanyData();

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex flex-1 flex-col gap-2 overflow-scroll md:overflow-hidden">
        {/* Charts Row */}
        <div className='h-full flex flex-col md:flex-row gap-2'>
          <div className='flex-1 overflow-hidden flex items-center justify-center'>
            <BitcoinPriceChart />
          </div>
          <div className='flex-1 overflow-hidden flex items-center justify-center'>
            <BitcoinScatterChart /> 
          </div>
        </div>
        {/* Bottom Section */}
        <div className='h-half overflow-scroll border border-primary rounded-md'>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner size="xl" />
              <span className="ml-3 text-lg">Loading company data...</span>
            </div>
          ) : error ? (
            <div className="p-4">
              <Alert color="failure">
                <span className="font-medium">Error:</span> {error}
              </Alert>
            </div>
          ) : (
            <CompanyTable companies={companies} />
          )}
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col flex-1 overflow-auto gap-4">
          <div className="min-h-[50vh] max-w-full">
            <BitcoinPriceChart />
          </div>
          <div className="min-h-[50vh] max-w-full">
            <BitcoinScatterChart />
          </div>
          <div className='w-full min-h-[80vh] overflow-x-auto overflow-y-auto'>
            {isLoading ? (
              <div className="flex items-center justify-center h-full py-12">
                <Spinner size="xl" />
                <span className="ml-3 text-lg">Loading company data...</span>
              </div>
            ) : error ? (
              <div className="p-4">
                <Alert color="failure">
                  <span className="font-medium">Error:</span> {error}
                </Alert>
              </div>
            ) : (
              <div style={{ minWidth: '100%', width: 'max-content' }}>
                <CompanyTable companies={companies} />
              </div>
            )}
          </div>
      </div>
    </>
  );
}
