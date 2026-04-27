'use client';

import { useMemo, useState } from 'react';
import {
  Star,
  StarHalf,
  Circle,
  ShoppingCart,
  ShoppingBag,
  Tag,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

const filterOptions = [
  { label: '1 Month', value: '1m', days: 30 },
  { label: '3 Months', value: '3m', days: 90 },
  { label: '6 Months', value: '6m', days: 180 },
  { label: '1 Year', value: '1y', days: 365 },
  { label: 'All Time', value: 'all', days: Infinity },
];

const mockReviews = [
  {
    id: 'r1',
    name: 'Ananya Singh',
    platform: 'Amazon',
    rating: 5,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'The phone arrived quickly and the camera is outstanding. Totally worth the price!',
    verified: true,
    sentiment: 'Positive',
    helpful: 42,
  },
  {
    id: 'r2',
    name: 'Rohit Patel',
    platform: 'Flipkart',
    rating: 4,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Good performance and battery life, but packaging could be improved.',
    verified: true,
    sentiment: 'Positive',
    helpful: 27,
  },
  {
    id: 'r3',
    name: 'Meera Nair',
    platform: 'Meesho',
    rating: 3,
    date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Decent product for the price, but expected a few more features.',
    verified: false,
    sentiment: 'Neutral',
    helpful: 11,
  },
  {
    id: 'r4',
    name: 'Karan Verma',
    platform: 'Amazon',
    rating: 2,
    date: new Date(Date.now() - 59 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'The device heats up after extended use and customer service was slow.',
    verified: true,
    sentiment: 'Critical',
    helpful: 18,
  },
  {
    id: 'r5',
    name: 'Pooja Desai',
    platform: 'Flipkart',
    rating: 5,
    date: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Loved the value, especially the delivery speed. Excellent experience.',
    verified: true,
    sentiment: 'Positive',
    helpful: 54,
  },
  {
    id: 'r6',
    name: 'Amit Chauhan',
    platform: 'Meesho',
    rating: 4,
    date: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Nice design and easy to use. A couple of minor software bugs remain.',
    verified: false,
    sentiment: 'Positive',
    helpful: 16,
  },
  {
    id: 'r7',
    name: 'Sneha Gupta',
    platform: 'Amazon',
    rating: 1,
    date: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Poor build quality and the product stopped working in two weeks.',
    verified: true,
    sentiment: 'Critical',
    helpful: 31,
  },
  {
    id: 'r8',
    name: 'Vikram Rao',
    platform: 'Flipkart',
    rating: 5,
    date: new Date(Date.now() - 270 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Outstanding value and the seller was very responsive. Highly recommended.',
    verified: true,
    sentiment: 'Positive',
    helpful: 39,
  },
  {
    id: 'r9',
    name: 'Nisha Mehta',
    platform: 'Meesho',
    rating: 4,
    date: new Date(Date.now() - 320 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Good features for the price. Minor issues with the firmware update.',
    verified: false,
    sentiment: 'Neutral',
    helpful: 21,
  },
  {
    id: 'r10',
    name: 'Aditya Kumar',
    platform: 'Amazon',
    rating: 3,
    date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    text: 'Reasonable product. It does the job, but I expected a bit more polish.',
    verified: true,
    sentiment: 'Neutral',
    helpful: 14,
  },
];

const platformStyles = {
  Amazon: 'bg-[rgba(255,132,0,0.12)] text-[#FF8400]',
  Flipkart: 'bg-[rgba(24,86,255,0.12)] text-[#1856FF]',
  Meesho: 'bg-[rgba(230,65,146,0.12)] text-[#E64192]',
};

const sentimentStyles = {
  Positive: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-200/20 dark:text-emerald-200',
  Neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-800/70 dark:text-slate-200',
  Critical: 'bg-rose-100 text-rose-800 dark:bg-rose-200/20 dark:text-rose-200',
};

const platformIcons = {
  Amazon: ShoppingBag,
  Flipkart: ShoppingCart,
  Meesho: Tag,
};

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const avatarColor = (name) => {
  const code = name
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const colors = [
    'from-sky-400 to-blue-600',
    'from-emerald-400 to-teal-600',
    'from-violet-400 to-purple-600',
    'from-orange-400 to-amber-600',
    'from-rose-400 to-pink-600',
  ];
  return colors[code % colors.length];
};

const timeAgo = (isoDate) => {
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) return `${years}yr ago`;
  if (months >= 1) return `${months}mo ago`;
  if (days >= 1) return `${days}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  return `${minutes || 1}m ago`;
};

const LiveReviews = () => {
  const [activeFilter, setActiveFilter] = useState('1m');
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredReviews = useMemo(() => {
    const filter = filterOptions.find((item) => item.value === activeFilter);
    if (!filter) return mockReviews;
    if (filter.days === Infinity) return mockReviews;

    const cutoff = Date.now() - filter.days * 24 * 60 * 60 * 1000;
    return mockReviews.filter((review) => new Date(review.date).getTime() >= cutoff);
  }, [activeFilter]);

  const stats = useMemo(() => {
    const total = filteredReviews.length || 1;
    const averageRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0) / total;
    const positiveCount = filteredReviews.filter((review) => review.rating >= 4).length;
    const verifiedCount = filteredReviews.filter((review) => review.verified).length;
    const breakdown = [5, 4, 3, 2, 1].map((value) => ({
      rating: value,
      count: filteredReviews.filter((review) => review.rating === value).length,
    }));

    return {
      averageRating: filteredReviews.length ? averageRating.toFixed(1) : '0.0',
      positivePercent: Math.round((positiveCount / total) * 100),
      verifiedCount,
      breakdown,
    };
  }, [filteredReviews]);

  const reviewsToShow = filteredReviews.slice(0, visibleCount);
  const remainingCount = Math.max(filteredReviews.length - reviewsToShow.length, 0);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-3xl border border-border bg-card/90 p-5 shadow-sm shadow-slate-200/30 backdrop-blur dark:bg-slate-900/90 dark:shadow-slate-950/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground dark:text-slate-100">Live Reviews</h2>
              <p className="max-w-2xl text-sm text-muted-foreground dark:text-slate-400">
                Stay updated with the latest review trends across Amazon, Flipkart and Meesho. Filter by time range to see the freshest feedback instantly.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.value);
                  setVisibleCount(4);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'border-border bg-transparent text-foreground hover:border-primary/70 hover:bg-primary/5 dark:text-slate-200 dark:hover:bg-slate-700/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-slate-50 p-5 shadow-sm dark:bg-slate-950 dark:border-slate-800">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <Sparkles className="h-4 w-4 text-primary" />
              Average Rating
            </div>
            <div className="mt-4 text-4xl font-semibold text-foreground dark:text-slate-100">
              {stats.averageRating}
            </div>
            <div className="mt-1 text-sm text-muted-foreground dark:text-slate-400">Based on {filteredReviews.length} reviews</div>
          </div>

          <div className="rounded-3xl border border-border bg-slate-50 p-5 shadow-sm dark:bg-slate-950 dark:border-slate-800">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <Circle className="h-4 w-4 text-emerald-500" />
              Positive Reviews
            </div>
            <div className="mt-4 text-4xl font-semibold text-emerald-700 dark:text-emerald-300">
              {stats.positivePercent}%
            </div>
            <div className="mt-1 text-sm text-muted-foreground dark:text-slate-400">Rated 4★ and up</div>
          </div>

          <div className="rounded-3xl border border-border bg-slate-50 p-5 shadow-sm dark:bg-slate-950 dark:border-slate-800">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Verified Purchases
            </div>
            <div className="mt-4 text-4xl font-semibold text-foreground dark:text-slate-100">
              {stats.verifiedCount}
            </div>
            <div className="mt-1 text-sm text-muted-foreground dark:text-slate-400">Trusted buyer reviews</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-border bg-slate-50 p-5 shadow-sm dark:bg-slate-950 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-foreground dark:text-slate-100">Rating Breakdown</h3>
          <div className="mt-5 space-y-4">
            {stats.breakdown.map((item) => {
              const percentage = filteredReviews.length
                ? Math.round((item.count / filteredReviews.length) * 100)
                : 0;
              return (
                <div key={item.rating} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-foreground dark:text-slate-100">
                    <span>{item.rating}★</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-warning to-amber-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <div className="space-y-4">
          {reviewsToShow.length === 0 ? (
            <div className="rounded-3xl border border-border bg-slate-50 p-8 text-center text-slate-500 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400">
              No reviews available for this time frame.
            </div>
          ) : (
            reviewsToShow.map((review) => {
              const PlatformIcon = platformIcons[review.platform] || Circle;
              return (
                <article
                  key={review.id}
                  className="rounded-3xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:bg-slate-900 dark:border-slate-800"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${avatarColor(review.name)} text-sm font-semibold uppercase text-white shadow-sm`}
                      >
                        {initials(review.name)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-semibold text-foreground dark:text-slate-100">{review.name}</h4>
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <PlatformIcon className="h-3.5 w-3.5" />
                            {review.platform}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground dark:text-slate-400">
                          <span>{timeAgo(review.date)}</span>
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                              <CheckCircle className="h-3 w-3" />
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < review.rating ? 'text-warning' : 'text-slate-300 dark:text-slate-600'}`}
                          />
                        ))}
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sentimentStyles[review.sentiment]}`}>
                        {review.sentiment}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground dark:text-slate-300">{review.text}</p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <span>{review.helpful} found this helpful</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${review.verified ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                      <CheckCircle className="h-3.5 w-3.5" />
                      {review.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </article>
              );
            })
          )}

          {filteredReviews.length > 4 && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => Math.min(count + 4, filteredReviews.length))}
                disabled={reviewsToShow.length >= filteredReviews.length}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-slate-100"
              >
                {reviewsToShow.length >= filteredReviews.length
                  ? 'No more reviews'
                  : `Load more (${remainingCount} more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveReviews;
