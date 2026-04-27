'use client';

import { useState } from 'react';
import { fetchProductDetails } from '@/lib/productDetailsApi';
import { PriceResult } from '@/lib/types';
import { ProductHistory } from '@/components/ProductHistory';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ChevronDown } from 'lucide-react';

export function ProductDetailsPanel() {
  const [details, setDetails] = useState<PriceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    history: true,
    reviews: true,
  });

  const handleGetDetails = async (productUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductDetails(productUrl);
      console.log('Product details:', data);
      setDetails(data);
    } catch (err) {
      console.error('Failed to fetch details:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="section-spacing max-w-4xl">
      {/* Header Section */}
      <div className="card-smooth p-4 sm:p-6 border border-border rounded-lg bg-gradient-to-br from-card to-card/95 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Product Details Fetcher</h2>
            <p className="text-sm text-muted-foreground">Fetch and compare product information across platforms</p>
          </div>
          
          <button 
            onClick={() => handleGetDetails('https://www.amazon.in/s?k=iphone')}
            disabled={loading}
            className="button-smooth px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:from-primary/90 hover:to-primary disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Loading...
              </div>
            ) : (
              '🔍 Fetch iPhone Details'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-slide-up">
            <p className="text-sm text-destructive font-semibold">❌ {error}</p>
          </div>
        )}
      </div>

      {details && (
        <>
          {/* Details Section */}
          <div className="border border-border rounded-lg bg-card overflow-hidden card-smooth card-hover shadow-sm">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="text-left">
                <h3 className="font-bold text-lg text-foreground">📋 Raw Product Details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Complete API response data</p>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                  expandedSections.details ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.details && (
              <div className="border-t border-border px-4 sm:px-5 pb-4 sm:pb-5 pt-4 animate-slide-down">
                <div className="bg-muted/40 rounded-lg overflow-hidden border border-border/50">
                  <pre className="p-4 overflow-x-auto text-xs sm:text-xs text-foreground font-mono leading-relaxed">
                    {JSON.stringify(details, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Price History Section */}
          <div className="border border-border rounded-lg bg-card overflow-hidden card-smooth card-hover shadow-sm">
            <button
              onClick={() => toggleSection('history')}
              className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="text-left">
                <h3 className="font-bold text-lg text-foreground">📊 Price History & Analytics</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Track price trends and savings</p>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                  expandedSections.history ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.history && (
              <div className="border-t border-border px-4 sm:px-5 pb-4 sm:pb-5 pt-4 animate-slide-down">
                <ProductHistory
                  priceHistory={{
                    platform: (details.platform as any) || 'Amazon',
                    history: [
                      { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), price: details.price + 5000 },
                      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), price: details.price + 3000 },
                      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), price: details.price + 2000 },
                      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), price: details.price + 1000 },
                      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), price: details.price },
                      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), price: details.price - 500 },
                      { date: new Date().toISOString(), price: details.price },
                    ],
                    lowestPrice: details.price - 500,
                    highestPrice: details.price + 5000,
                    averagePrice: details.price + 1000,
                    currentTrend: 'down',
                    priceDropAmount: 5500,
                  }}
                />
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="border border-border rounded-lg bg-card overflow-hidden card-smooth card-hover shadow-sm">
            <button
              onClick={() => toggleSection('reviews')}
              className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="text-left">
                <h3 className="font-bold text-lg text-foreground">⭐ Customer Reviews & Ratings</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Verified customer feedback</p>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                  expandedSections.reviews ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.reviews && (
              <div className="border-t border-border px-4 sm:px-5 pb-4 sm:pb-5 pt-4 animate-slide-down">
                <ReviewsSection
                  reviews={[
                    {
                      id: '1',
                      userName: 'John Doe',
                      rating: 5,
                      title: 'Amazing product!',
                      content: 'Great quality and fast delivery. Highly recommended!',
                      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                      helpful: 45,
                      verified: true,
                    },
                    {
                      id: '2',
                      userName: 'Jane Smith',
                      rating: 4,
                      title: 'Good value for money',
                      content: 'Good quality product. Packaging could have been better.',
                      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                      helpful: 23,
                      verified: true,
                    },
                    {
                      id: '3',
                      userName: 'Mike Johnson',
                      rating: 5,
                      title: 'Perfect!',
                      content: 'Exactly as described. Very satisfied with the purchase.',
                      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                      helpful: 67,
                      verified: true,
                    },
                  ]}
                  rating={details.rating || 4.5}
                  reviewCount={135}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
