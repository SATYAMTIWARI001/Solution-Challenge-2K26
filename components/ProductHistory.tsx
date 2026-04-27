'use client';

import { TrendingDown, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { PriceHistory } from '@/lib/types';

interface ProductHistoryProps {
  priceHistory: PriceHistory;
}

export function ProductHistory({ priceHistory }: ProductHistoryProps) {
  const { history, lowestPrice, highestPrice, averagePrice, currentTrend, priceDropAmount } = priceHistory;

  if (!history || history.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-muted/50 border">
        <p className="text-muted-foreground text-sm">No price history available.</p>
      </div>
    );
  }

  // Get recent prices for trend visualization
  const recentPrices = history.slice(-7);
  const currentPrice = history[history.length - 1]?.price || 0;
  const priceChange = history.length > 1 
    ? currentPrice - history[history.length - 2].price 
    : 0;

  return (
    <div className="space-y-4">
      {/* Price Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Current Price */}
        <div className="p-3 rounded-lg bg-muted/50 border">
          <div className="text-xs text-muted-foreground mb-1">Current Price</div>
          <div className="text-lg font-bold">₹{currentPrice.toLocaleString('en-IN')}</div>
        </div>

        {/* Lowest Price */}
        <div className="p-3 rounded-lg bg-muted/50 border">
          <div className="text-xs text-muted-foreground mb-1">Lowest Price</div>
          <div className="text-lg font-bold text-success">₹{lowestPrice.toLocaleString('en-IN')}</div>
        </div>

        {/* Highest Price */}
        <div className="p-3 rounded-lg bg-muted/50 border">
          <div className="text-xs text-muted-foreground mb-1">Highest Price</div>
          <div className="text-lg font-bold text-destructive">₹{highestPrice.toLocaleString('en-IN')}</div>
        </div>

        {/* Average Price */}
        <div className="p-3 rounded-lg bg-muted/50 border">
          <div className="text-xs text-muted-foreground mb-1">Average Price</div>
          <div className="text-lg font-bold">₹{averagePrice.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Price Trend */}
      <div className="p-4 rounded-lg bg-muted/50 border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm">Price Trend</h4>
          <div className="flex items-center gap-2">
            {currentTrend === 'down' ? (
              <>
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-xs text-success font-medium">Decreasing</span>
              </>
            ) : currentTrend === 'up' ? (
              <>
                <TrendingUp className="h-4 w-4 text-destructive" />
                <span className="text-xs text-destructive font-medium">Increasing</span>
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4 text-warning" />
                <span className="text-xs text-warning font-medium">Stable</span>
              </>
            )}
          </div>
        </div>

        {/* Price Change */}
        <div className="mb-3">
          {priceDropAmount && priceDropAmount > 0 ? (
            <div className="text-sm">
              <span className="text-success font-semibold">
                ₹{priceDropAmount.toLocaleString('en-IN')} reduction
              </span>
              <span className="text-muted-foreground ml-2">from highest price</span>
            </div>
          ) : priceChange !== 0 ? (
            <div className="text-sm">
              <span className={priceChange > 0 ? 'text-destructive font-semibold' : 'text-success font-semibold'}>
                ₹{Math.abs(priceChange).toLocaleString('en-IN')} 
                {priceChange > 0 ? ' increase' : ' decrease'}
              </span>
              <span className="text-muted-foreground ml-2">from last tracked price</span>
            </div>
          ) : null}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium mb-2">Recent History</div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {recentPrices.map((point, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground w-24">
                  {new Date(point.date).toLocaleDateString('en-IN')}
                </span>
                <span className="font-medium">
                  ₹{point.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="p-3 rounded-lg bg-info/10 border border-info/20">
        <p className="text-xs text-info">
          📊 Price history tracked over {history.length} data points to help you make informed decisions.
        </p>
      </div>
    </div>
  );
}
