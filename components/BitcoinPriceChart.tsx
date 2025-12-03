'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useBitcoinPriceData } from '@/hooks/useBitcoinData';
import { Spinner, Alert, Card } from 'flowbite-react';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function BitcoinPriceChart() {
  const { data, isLoading, error } = useBitcoinPriceData();

  // Memoize chart series data to prevent unnecessary re-renders
  const series = useMemo(() => {
    return [
      {
        name: 'BTC Close Price',
        data: data.map((item) => ({
          x: item.timestamp,
          y: item.closePrice,
        })),
      },
    ];
  }, [data]);

  // Memoize chart options
  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: 'Bitcoin Price - Last 30 Days',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 600,
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'MMM dd',
        },
        title: {
          text: 'Date',
        },
      },
      yaxis: {
        title: {
          text: 'Close Price (USDT)',
        },
        labels: {
          formatter: (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
        y: {
          formatter: (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
      grid: {
        borderColor: '#e7e7e7',
      },
      colors: ['#3b82f6'],
    }),
    []
  );

  if (isLoading) {
    return (
      <Card className='w-full h-full'>
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
          <span className="ml-3">Loading Bitcoin price data...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='w-full h-full'>
        <Alert color="failure">
          <span className="font-medium">Error loading chart:</span> {error}
        </Alert>
      </Card>
    );
  }

  return (
    <Card className='w-full h-full'>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </Card>
  );
}
