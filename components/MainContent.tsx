'use client';

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
          <CompanyTable companies={companies} />
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col flex-1 overflow-auto gap-4 border-4">
          <div className="min-h-[50vh] max-w-full">
            <BitcoinPriceChart />
          </div>
          <div className="min-h-[50vh] max-w-full">
            <BitcoinScatterChart />
          </div>
          <div className='max-w-full min-h-[80vh] overflow-scroll border-4'>
            <CompanyTable companies={companies} />
          </div>
          {/* <div className="min-h-[50vh] max-w-full">
            <CompanyTable companies={companies} />
          </div> */}
      </div>
    </>
  );
}
