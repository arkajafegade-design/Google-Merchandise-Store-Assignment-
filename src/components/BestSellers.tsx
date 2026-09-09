import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface BestSellersProps {
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onSelectProduct, onViewAll }) => {
  const bestSellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-neutral-50/70 border-y border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Campus Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Best Sellers
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              The highest-rated apparel, drinkware, and accessories chosen by Google enthusiasts worldwide.
            </p>
          </div>

          <button
            id="view-all-bestsellers-btn"
            onClick={onViewAll}
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-neutral-800 hover:text-blue-600 transition cursor-pointer"
          >
            <span>Explore All 12 Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid (2 columns on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
