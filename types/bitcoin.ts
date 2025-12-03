// Binance API returns data as arrays for efficiency
// Each array represents: [timestamp, open, high, low, close, volume, closeTime, quoteVolume, trades, takerBuyBase, takerBuyQuote, ignore]
export type BinanceKlineData = [
  number,  // 0: Open time (epoch)
  string,  // 1: Open price
  string,  // 2: High price
  string,  // 3: Low price
  string,  // 4: Close price
  string,  // 5: Volume
  number,  // 6: Close time
  string,  // 7: Quote asset volume
  number,  // 8: Number of trades
  string,  // 9: Taker buy base asset volume
  string,  // 10: Taker buy quote asset volume
  string   // 11: Ignore
];

export interface BitcoinPriceData {
  timestamp: number;
  closePrice: number;
}

export interface BitcoinScatterData {
  volume: number;
  priceVolatility: number; // Percentage difference between high and low
}
