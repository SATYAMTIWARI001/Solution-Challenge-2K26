'use client';

import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Review } from '@/lib/types';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="section-spacing">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {/* Overall rating */}
        <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 card-smooth">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl font-bold text-primary mb-2">{rating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mt-2 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`h-5 w-5 transition-all duration-300 ${
                    star <= Math.round(rating)
                      ? 'fill-warning text-warning scale-110'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm font-semibold text-foreground">
              {reviewCount.toLocaleString()} verified reviews
            </div>
          </div>
        </div>

        {/* Rating distribution */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {distribution.map(({ star, count, percentage }, index) => (
            <div 
              key={star} 
              className="flex items-center gap-3 group"
              style={{ animation: `slideUp 0.4s ease-out ${index * 0.05}s both` }}
            >
              <div className="flex items-center gap-1 min-w-10">
                <span className="text-sm font-semibold text-foreground">{star}</span>
                <Star className="h-3 w-3 fill-warning text-warning" />
              </div>
              <div className="flex-1 h-2.5 bg-muted/30 rounded-full overflow-hidden group-hover:bg-muted/50 transition-colors">
                <div
                  className="h-full bg-gradient-to-r from-warning to-warning/70 rounded-full transition-all duration-500 animate-chart-bar"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-muted-foreground min-w-6 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h4 className="font-bold text-lg text-foreground">Customer Reviews</h4>
        
        {reviews.length === 0 ? (
          <div className="p-6 rounded-lg bg-muted/20 border border-border/50 text-center">
            <p className="text-muted-foreground text-sm font-medium">No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.slice(0, 5).map((review, index) => (
              <div 
                key={review.id} 
                className="card-smooth p-4 rounded-lg bg-muted/40 border border-border hover:border-primary/50 hover:shadow-md card-hover animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{review.userName}</span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full badge-success text-xs font-semibold">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 transition-all ${
                              star <= review.rating
                                ? 'fill-warning text-warning'
                                : 'fill-muted text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {new Date(review.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h5 className="font-semibold text-foreground mb-1.5">{review.title}</h5>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{review.content}</p>
                
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted/50">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
