import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import apparelImg from '../assets/images/cat_apparel_1788961704925.jpg';
import drinkwareImg from '../assets/images/cat_drinkware_1788961723863.jpg';
import bagsImg from '../assets/images/cat_bags_1788961740178.jpg';
import accessoriesImg from '../assets/images/cat_accessories_1788961754885.jpg';

interface ShopByCategoryProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  clothing: apparelImg,
  drinkware: drinkwareImg,
  bags: bagsImg,
  accessories: accessoriesImg
};

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section id="shop-by-category-section" className="py-12 sm:py-16 bg-white">
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

        {/* Category Cards Grid (4 columns desktop, 2 columns mobile/tablet) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(category => {
            const imgSrc = CATEGORY_IMAGE_MAP[category.id] || category.image;

            return (
              <div
                key={category.id}
                id={`category-card-${category.id}`}
                onClick={() => onSelectCategory(category.id as ProductCategory)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-neutral-300 transition duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-square w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Footer with Brand Color Dot & Category Title */}
                <div className="px-4 py-3.5 sm:py-4 bg-white flex items-center space-x-2.5 sm:space-x-3 border-t border-neutral-100">
                  <span
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: category.dotColor }}
                    aria-hidden="true"
                  />
                  <h3 className="text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest text-neutral-800 uppercase transition-colors duration-200 group-hover:text-neutral-950">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
