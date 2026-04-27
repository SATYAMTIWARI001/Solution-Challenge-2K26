'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Star,
  TrendingDown,
  Truck,
  Heart,
  ShoppingCart,
  Bell,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  AlertTriangle,
  Award,
  BarChart3
} from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlatformLogo } from '@/components/PlatformLogo';
import { PriceChart } from '@/components/PriceChart';
import { ReviewsSection } from '@/components/ReviewsSection';
import { PriceAlertModal } from '@/components/PriceAlertModal';
import { cn, sanitizeUrl } from '@/lib/utils';
import { ProductGroup, NormalizedProduct } from '@/lib/types';
import { formatPrice, getValueTagColor, getTrustTagColor } from '@/lib/scoreEngines';
import { useUser } from '@/lib/UserContext';

interface ProductComparisonCardProps {
  group: ProductGroup;
  className?: string;
}

function PriceRow({
  product,
  groupId,
  isCheapest,
  isCostliest,
  isBestValue,
  isFastest,
  isTopRated
}: {
  product: NormalizedProduct;
  groupId: string;
  isCheapest: boolean;
  isCostliest: boolean;
  isBestValue: boolean;
  isFastest: boolean;
  isTopRated: boolean;
}) {
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart, isInCart } = useUser();
  const [showAlertModal, setShowAlertModal] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const productUrl = product.productUrl ? sanitizeUrl(product.productUrl) : '';

  const platformBgClass = {
    Amazon: 'bg-amazon-bg border-amazon/30',
    Flipkart: 'bg-flipkart-bg border-flipkart/30',
    Meesho: 'bg-meesho-bg border-meesho/30',
  }[product.source];

  return (
    <>
      <div className={cn(
        'relative p-4 rounded-xl border-2',
        platformBgClass
      )}>

        <div className="flex items-start gap-4 mt-2">
          <div className="flex items-center gap-3 flex-1">
            <PlatformLogo platform={product.source} size="md" />
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">

          <Button size="sm" variant="ghost"
            onClick={() => isWishlisted
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id, groupId)}
          >
            <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
          </Button>

          <Button size="sm" variant="ghost"
            onClick={() => addToCart(product.id, groupId)}
          >
            <ShoppingCart className={cn('h-4 w-4', inCart && 'fill-current')} />
          </Button>

          <Button size="sm" variant="ghost"
            onClick={() => setShowAlertModal(true)}
          >
            <Bell className="h-4 w-4" />
          </Button>

          {productUrl ? (
            <a
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                console.log('product link', productUrl);
              }}
              className={cn(buttonVariants({ size: 'sm' }), 'ml-auto')}
            >
              Visit Store
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </a>
          ) : (
            <span className="ml-auto text-xs text-red-500">
              No link available
            </span>
          )}
        </div>
      </div>

      <PriceAlertModal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        product={product}
        groupId={groupId}
      />
    </>
  );
}
export function ProductComparisonCard({ group, className }: ProductComparisonCardProps) {
  return (
    <div className={cn('p-4', className)}>
      <h2 className="text-lg font-semibold mb-2">{group.title}</h2>

      <div className="space-y-3">
        {group.products.map((product) => (
          <PriceRow
            key={product.id}
            product={product}
            groupId={group.groupId}
            isCheapest={product.id === group.cheapest.id}
            isCostliest={product.id === group.costliest.id}
            isBestValue={product.id === group.bestValue.id}
            isFastest={product.id === group.fastestDelivery.id}
            isTopRated={product.id === group.topRated.id}
          />
        ))}
      </div>
    </div>
  );
}