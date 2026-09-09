import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';

interface ShopByCategoryProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Department Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Shop by Category
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Explore curated Google merchandise tailored for engineering, design, and campus life.
            </p>
          </div>

          <button
            id="view-all-categories-btn"
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center space-x-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid (4 columns desktop, 2 columns tablet/mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(category => (
            <div
              key={category.id}
              id={`category-card-${category.id}`}
              onClick={() => onSelectCategory(category.id as ProductCategory)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 cursor-pointer shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="aspect-4/3 sm:aspect-square w-full overflow-hidden bg-neutral-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
                <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
                  {category.count} Products
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-300 transition mt-0.5">
                  {category.name}
                </h3>
                <p className="hidden sm:block text-xs text-neutral-300 line-clamp-2 mt-1">
                  {category.description}
                </p>
                <div className="mt-2.5 flex items-center space-x-1 text-xs font-semibold text-white/90 group-hover:translate-x-1 transition duration-200">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
