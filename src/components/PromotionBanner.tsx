import React, { useEffect, useRef } from 'react';
import { ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { Promotion, ProductCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import { useCart } from '../context/CartContext';

interface PromotionBannerProps {
  promotion: Promotion;
  onNavigateToCollection: (category?: ProductCategory) => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({
  promotion,
  onNavigateToCollection
}) => {
  const { trackViewPromotion, trackSelectPromotion } = useAnalytics();
  const { applyPromoCode } = useCart();
  const [copied, setCopied] = React.useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  // Trigger view_promotion event once visible (AN-03)
  useEffect(() => {
    if (!hasTrackedView.current) {
      trackViewPromotion(promotion);
      hasTrackedView.current = true;
    }
  }, [promotion, trackViewPromotion]);

  const handleBannerClick = () => {
    trackSelectPromotion(promotion);
    if (promotion.discountCode) {
      applyPromoCode(promotion.discountCode);
    }
    onNavigateToCollection(promotion.categoryTarget);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackSelectPromotion(promotion);
    applyPromoCode(promotion.discountCode);
    navigator.clipboard?.writeText(promotion.discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={bannerRef}
          id={`promo-banner-${promotion.id}`}
          onClick={handleBannerClick}
          className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl cursor-pointer group border border-neutral-800"
        >
          {/* Background image with gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={promotion.bannerImage}
              alt={promotion.title}
              className="w-full h-full object-cover object-center opacity-40 group-hover:scale-103 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/80 to-neutral-900/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-400 text-neutral-950 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{promotion.tagline}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {promotion.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {promotion.subtitle}
              </p>

              {/* Promo Code Chip */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs text-neutral-400 font-medium">Use code at checkout:</span>
                <button
                  id="promo-copy-code-btn"
                  onClick={handleCopyCode}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-bold tracking-wider transition cursor-pointer"
                  title="Click to apply promo code"
                >
                  <Tag className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{promotion.discountCode}</span>
                  {copied ? (
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-sans">
                      <Check className="w-3 h-3" /> Applied!
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-400 font-sans font-normal">(Click to Apply)</span>
                  )}
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="shrink-0">
              <button
                id="promo-shop-collection-btn"
                onClick={handleBannerClick}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-bold text-neutral-900 bg-white hover:bg-neutral-100 transition shadow-lg group-hover:bg-yellow-400 duration-300 cursor-pointer"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
