'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useBitcoinScatterData } from '@/hooks/useBitcoinData';
import { Spinner, Alert, Card } from 'flowbite-react';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function BitcoinScatterChart() {
  const { data, isLoading, error } = useBitcoinScatterData();

  // Memoize chart series data to prevent unnecessary re-renders
  const series = useMemo(() => {
    return [
      {
        name: 'BTC Volume vs Volatility',
        data: data.map((item) => ({
          x: item.volume,
          y: item.priceVolatility,
        })),
      },
    ];
  }, [data]);

  // Memoize chart options
  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: 'scatter',
        height: 350,
        zoom: {
          enabled: true,
          type: 'xy',
        },
        toolbar: {
          show: true,
        },
      },
      title: {
        text: 'Bitcoin Volume vs Price Volatility - Last 180 Days',
        align: 'left',
        style: {
          fontSize: '18px',
          fontWeight: 600,
        },
      },
      xaxis: {
        type: 'numeric',
        title: {
          text: 'Volume (BTC)',
        },
        labels: {
          formatter: (value: number | string): string => {
            if (typeof value === 'number') {
              return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
            }
            return String(value);
          },
        },
      },
      yaxis: {
        title: {
          text: 'Price Volatility (%)',
        },
        labels: {
          formatter: (value) => `${value.toFixed(2)}%`,
        },
      },
      tooltip: {
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          return `
            <div class="px-3 py-2">
              <div class="font-semibold mb-1">Data Point</div>
              <div>Volume: ${point.x.toLocaleString('en-US', { maximumFractionDigits: 2 })} BTC</div>
              <div>Volatility: ${point.y.toFixed(2)}%</div>
            </div>
          `;
        },
      },
      markers: {
        size: 6,
        colors: ['#10b981'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 8,
        },
      },
      grid: {
        borderColor: '#e7e7e7',
      },
      colors: ['#10b981'],
    }),
    []
  );

  if (isLoading) {
    return (
      <Card className='w-full h-full'>
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
          <span className="ml-3">Loading Bitcoin scatter data...</span>
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
      <ReactApexChart options={options} series={series} type="scatter" height={350} />
    </Card>
  );
}
