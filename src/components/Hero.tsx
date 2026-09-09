import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, Flame } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onShopNow: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onSelectCategory }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50/50 pt-8 pb-12 sm:pb-16 border-b border-neutral-200/70">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-yellow-100/50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Primary CTA (HP-01) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Official 2026 Collection • Sustainable Campus Gear</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.12]">
              Wear the innovation. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-500">
                Official Google Merch.
              </span>
            </h1>

            {/* Sub-text */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
              Designed in Mountain View, crafted with certified organic materials. Discover premium hoodies, Pixel-inspired tumblers, and developer favorites built for every day.
            </p>

            {/* Primary Action Group (HP-01 Above the Fold) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-shop-now-btn"
                onClick={onShopNow}
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-apparel-btn"
                onClick={() => onSelectCategory('clothing')}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full text-base font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 transition cursor-pointer"
              >
                <span>Browse Clothing</span>
              </button>
            </div>

            {/* Quick Micro-Trust Signals */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>100% Genuine Store Guarantee</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Easy 30-day returns</span>
              </div>
            </div>

            {/* Instant Category Jump Pills (HP-02) */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                Quick Category Discovery:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  id="hero-pill-clothing"
                  onClick={() => onSelectCategory('clothing')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition"
                >
                  👕 Hoodies & Tees
                </button>
                <button
                  id="hero-pill-drinkware"
                  onClick={() => onSelectCategory('drinkware')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition"
                >
                  ☕ Pixel Tumblers & Mugs
                </button>
                <button
                  id="hero-pill-accessories"
                  onClick={() => onSelectCategory('accessories')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition"
                >
                  🎒 24L Tech Backpacks
                </button>
                <button
                  id="hero-pill-stationery"
                  onClick={() => onSelectCategory('tech-stationery')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition"
                >
                  🤖 Android Plush & Journals
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                  alt="Featured Google Heritage Hoodie Collection"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-900 w-fit mb-2">
                    Top Rated Item
                  </span>
                  <h3 className="text-xl font-bold">Google Heritage Tricolor Hoodie</h3>
                  <p className="text-sm text-neutral-200 mt-0.5">Heavyweight organic fleece • $64.00</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-900 border border-white"></span>
                      <span className="w-4 h-4 rounded-full bg-gray-500 border border-white"></span>
                      <span className="w-4 h-4 rounded-full bg-emerald-800 border border-white"></span>
                    </div>
                    <span className="text-xs text-neutral-300 font-medium">★ 4.9 (142 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Floating Floating Accent Pill */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-neutral-200/80 p-3 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Same-Day Dispatch</p>
                  <p className="text-[11px] text-neutral-500">Fast orders from Google Campuses</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
