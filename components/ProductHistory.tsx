'use client';

import { TrendingDown, TrendingUp, DollarSign, Calendar, ArrowDown, ArrowUp } from 'lucide-react';
import { PriceHistory } from '@/lib/types';

interface ProductHistoryProps {
  priceHistory: PriceHistory;
}

export function ProductHistory({ priceHistory }: ProductHistoryProps) {
  const { history, lowestPrice, highestPrice, averagePrice, currentTrend, priceDropAmount } = priceHistory;

  if (!history || history.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-muted/50 border animate-fade-in">
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

  // Calculate percentage change
  const percentageChange = history.length > 1 
    ? ((priceChange / history[history.length - 2].price) * 100).toFixed(1)
    : 0;

  const savings = history.length > 0 ? (highestPrice - currentPrice) : 0;
  const savingsPercentage = history.length > 0 
    ? ((savings / highestPrice) * 100).toFixed(1)
    : 0;

  return (
    <div className="section-spacing">
      {/* Price Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* Current Price */}
        <div className="card-smooth p-3 sm:p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-md hover:border-primary/40">
          <div className="text-xs sm:text-sm text-muted-foreground font-semibold mb-1.5">Current</div>
          <div className="text-xl sm:text-2xl font-bold text-foreground">₹{currentPrice.toLocaleString('en-IN')}</div>
          <div className="text-xs text-muted-foreground mt-1">Latest price</div>
        </div>

        {/* Lowest Price */}
        <div className="card-smooth p-3 sm:p-4 rounded-lg bg-gradient-to-br from-success/5 to-success/10 border border-success/20 hover:shadow-md hover:border-success/40">
          <div className="text-xs sm:text-sm text-success font-semibold mb-1.5 flex items-center gap-1">
            <ArrowDown className="h-3 w-3" />
            Lowest
          </div>
          <div className="text-xl sm:text-2xl font-bold text-success">₹{lowestPrice.toLocaleString('en-IN')}</div>
          <div className="text-xs text-success/70 mt-1">Best deal</div>
        </div>

        {/* Highest Price */}
        <div className="card-smooth p-3 sm:p-4 rounded-lg bg-gradient-to-br from-destructive/5 to-destructive/10 border border-destructive/20 hover:shadow-md hover:border-destructive/40">
          <div className="text-xs sm:text-sm text-destructive font-semibold mb-1.5 flex items-center gap-1">
            <ArrowUp className="h-3 w-3" />
            Highest
          </div>
          <div className="text-xl sm:text-2xl font-bold text-destructive">₹{highestPrice.toLocaleString('en-IN')}</div>
          <div className="text-xs text-destructive/70 mt-1">Peak price</div>
        </div>

        {/* Average Price */}
        <div className="card-smooth p-3 sm:p-4 rounded-lg bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20 hover:shadow-md hover:border-warning/40">
          <div className="text-xs sm:text-sm text-warning font-semibold mb-1.5">Average</div>
          <div className="text-xl sm:text-2xl font-bold text-warning">₹{averagePrice.toLocaleString('en-IN')}</div>
          <div className="text-xs text-warning/70 mt-1">Historical avg</div>
        </div>
      </div>

      {/* Price Trend & Savings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Price Trend Card */}
        <div className="card-smooth p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm text-foreground">Price Trend</h4>
            {currentTrend === 'down' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full badge-success text-xs font-semibold">
                <TrendingDown className="h-3.5 w-3.5" />
                Decreasing
              </span>
            ) : currentTrend === 'up' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full badge-destructive text-xs font-semibold">
                <TrendingUp className="h-3.5 w-3.5" />
                Increasing
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full badge-warning text-xs font-semibold">
                <DollarSign className="h-3.5 w-3.5" />
                Stable
              </span>
            )}
          </div>

          {priceChange !== 0 && (
            <div className="space-y-2">
              <div className={`p-2 rounded-lg ${priceChange > 0 ? 'bg-destructive/10' : 'bg-success/10'}`}>
                <div className="flex items-baseline gap-2">
                  <span className={`text-lg font-bold ${priceChange > 0 ? 'text-destructive' : 'text-success'}`}>
                    {priceChange > 0 ? '+' : ''}₹{Math.abs(priceChange).toLocaleString('en-IN')}
                  </span>
                  <span className={`text-xs font-semibold ${priceChange > 0 ? 'text-destructive' : 'text-success'}`}>
                    ({priceChange > 0 ? '+' : ''}{percentageChange}%)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total Savings Card */}
        <div className="card-smooth p-4 rounded-lg bg-gradient-to-br from-success/5 to-success/10 border border-success/20 hover:border-success/50 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h4 className="font-semibold text-sm text-foreground mb-3">Potential Savings</h4>
          <div className="space-y-2">
            <div className="p-2 rounded-lg bg-success/10">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-success">
                  ₹{savings.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-semibold text-success">
                  ({savingsPercentage}% off)
                </span>
              </div>
              <p className="text-xs text-success/70 mt-1">vs highest price</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card-smooth p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-sm text-foreground">Recent History</h4>
            <p className="text-xs text-muted-foreground">Last {recentPrices.length} tracked prices</p>
          </div>
          <Calendar className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>

        <div className="space-y-1.5">
          {recentPrices.map((point, index) => {
            const isLatest = index === recentPrices.length - 1;
            const nextPrice = index < recentPrices.length - 1 ? recentPrices[index + 1].price : point.price;
            const change = point.price - nextPrice;
            
            return (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  isLatest ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50'
                }`}
                style={{ animation: `slideUp 0.4s ease-out ${index * 0.05}s both` }}
              >
                <div className="text-xs text-muted-foreground min-w-20 font-medium">
                  {new Date(point.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1">
                  <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 animate-chart-bar"
                      style={{ 
                        width: `${((point.price - lowestPrice) / (highestPrice - lowestPrice)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 min-w-32">
                  <span className={`font-semibold text-sm ${isLatest ? 'text-primary' : 'text-foreground'}`}>
                    ₹{point.price.toLocaleString('en-IN')}
                  </span>
                  {change !== 0 && (
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      change > 0 ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10'
                    }`}>
                      {change > 0 ? '↓' : '↑'} ₹{Math.abs(change)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div className="card-smooth p-3 sm:p-4 rounded-lg bg-info/10 border border-info/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <p className="text-xs sm:text-sm text-info font-semibold">
          📊 <span className="ml-1">Price history tracked over {history.length} data points to help you make informed purchasing decisions.</span>
        </p>
      </div>
    </div>
  );
}
