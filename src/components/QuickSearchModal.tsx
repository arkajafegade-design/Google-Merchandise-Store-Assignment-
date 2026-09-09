import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchSubmit: (query: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchSubmit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = [
    'Heritage Hoodie',
    'Pixel Tumbler',
    'Chrome Dinosaur Socks',
    'Commuter Backpack',
    'Gemini Cap',
    'Android Plushie'
  ];

  const filteredProducts = searchTerm.trim()
    ? PRODUCTS.filter(p => {
        const q = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        onSearchSubmit(searchTerm.trim());
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handlePopularClick = (term: string) => {
    setSearchTerm(term);
    onSearchSubmit(term);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-neutral-200 animate-fadeIn">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center space-x-3 bg-neutral-50/70">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search merchandise by keyword, category, or color..."
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-hidden text-neutral-900 placeholder:text-neutral-400 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded-md text-neutral-500 hover:bg-neutral-200/60"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {searchTerm.trim() ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider pb-1">
                  <span>Matching Products</span>
                  <span>{filteredProducts.length} Found</span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {filteredProducts.map(p => (
                    <div
                      key={p.id}
                      id={`search-result-${p.id}`}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="py-2.5 flex items-center justify-between hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-neutral-100 border border-neutral-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{p.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-xs font-bold text-neutral-900">${p.price.toFixed(2)}</span>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onSearchSubmit(searchTerm);
                    onClose();
                  }}
                  className="w-full mt-3 py-2 text-center text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  View full results for "{searchTerm}" →
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <p className="text-sm font-bold text-neutral-800">No items found matching "{searchTerm}"</p>
                <p className="text-xs text-neutral-500">
                  Try searching for apparel, mugs, caps, backpacks or plushies.
                </p>
              </div>
            )
          ) : (
            /* Default Suggestions */
            <div className="space-y-4">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Popular Searches</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => handlePopularClick(term)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Collections</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      onSearchSubmit('Hoodie');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-neutral-200 hover:border-neutral-900 text-left font-semibold text-neutral-800 transition"
                  >
                    🧥 Hoodies & Organic Fleece
                  </button>
                  <button
                    onClick={() => {
                      onSearchSubmit('Tumbler');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-neutral-200 hover:border-neutral-900 text-left font-semibold text-neutral-800 transition"
                  >
                    ☕ Pixel Matte Tumblers
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
