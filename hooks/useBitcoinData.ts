import { useState, useEffect, useMemo } from 'react';
import { BinanceKlineData, BitcoinPriceData, BitcoinScatterData } from '@/types/bitcoin';

const BINANCE_30_DAYS_URL = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=30';
const BINANCE_180_DAYS_URL = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=180';

/**
 * Custom hook for fetching Bitcoin price data (30 days)
 * Returns time-series data for close prices
 */
export function useBitcoinPriceData() {
  const [data, setData] = useState<BitcoinPriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(BINANCE_30_DAYS_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch Bitcoin data: ${response.status} ${response.statusText}`);
        }

        const rawData: BinanceKlineData[] = await response.json();

        // Transform data: extract timestamp (index 0) and close price (index 4)
        const priceData: BitcoinPriceData[] = rawData.map((item) => ({
          timestamp: item[0],
          closePrice: parseFloat(item[4]),
        }));

        setData(priceData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching Bitcoin price data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

/**
 * Custom hook for fetching Bitcoin volume and volatility data (180 days)
 * Returns scatter plot data: volume vs price volatility percentage
 */
export function useBitcoinScatterData() {
  const [data, setData] = useState<BitcoinScatterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(BINANCE_180_DAYS_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch Bitcoin data: ${response.status} ${response.statusText}`);
        }

        const rawData: BinanceKlineData[] = await response.json();

        // Transform data: calculate volume and price volatility percentage
        const scatterData: BitcoinScatterData[] = rawData.map((item) => {
          const high = parseFloat(item[2]);
          const low = parseFloat(item[3]);
          const volume = parseFloat(item[5]);

          // Calculate percentage difference between high and low
          const priceVolatility = ((high - low) / low) * 100;

          return {
            volume,
            priceVolatility,
          };
        });

        setData(scatterData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching Bitcoin scatter data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize the processed data to prevent unnecessary recalculations
  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, isLoading, error };
}
