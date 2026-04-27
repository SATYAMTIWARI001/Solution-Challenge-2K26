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
    <div className="space-y-4">
      {/* Header Section */}
      <div className="p-4 border border-border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Product Details Fetcher</h2>
        
        <button 
          onClick={() => handleGetDetails('https://www.amazon.in/s?k=iphone')}
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {loading ? 'Loading...' : 'Fetch iPhone Details'}
        </button>

        {error && <p className="text-destructive mt-3 text-sm">{error}</p>}
      </div>

      {details && (
        <>
          {/* Details Section */}
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground">Raw Product Details</h3>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  expandedSections.details ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.details && (
              <div className="border-t border-border px-4 pb-4 pt-4">
                <pre className="p-4 bg-muted rounded-lg overflow-auto text-xs text-foreground border border-border">
                  {JSON.stringify(details, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Price History Section */}
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <button
              onClick={() => toggleSection('history')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground">📊 Price History</h3>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  expandedSections.history ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.history && (
              <div className="border-t border-border px-4 pb-4 pt-4">
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
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <button
              onClick={() => toggleSection('reviews')}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground">⭐ Customer Reviews</h3>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  expandedSections.reviews ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.reviews && (
              <div className="border-t border-border px-4 pb-4 pt-4">
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
