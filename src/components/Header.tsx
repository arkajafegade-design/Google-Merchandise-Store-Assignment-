import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Activity, 
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface HeaderProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateHome: () => void;
  onOpenSearch: () => void;
  onOpenCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onNavigateHome,
  onOpenSearch,
  onOpenCheckout
}) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { events, setIsInspectorOpen } = useAnalytics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: Array<{ id: ProductCategory; label: string; badge?: string }> = [
    { id: 'all', label: 'All Products' },
    { id: 'clothing', label: 'Apparel' },
    { id: 'drinkware', label: 'Drinkware' },
    { id: 'bags', label: 'Bags' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'tech-stationery', label: 'Collectibles' },
    { id: 'new-arrivals', label: 'New Arrivals', badge: 'Spring 26' }
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-semibold bg-blue-600 text-white uppercase tracking-wider">
              Promo
            </span>
            <span className="font-medium text-neutral-200">
              Spring Refresh: Use code <strong className="text-yellow-400 font-bold">GOOGLE20</strong> for 20% off apparel & drinkware!
            </span>
            <span className="hidden md:inline text-neutral-400">• Free shipping on orders over $50</span>
          </div>
          
          <div className="flex items-center space-x-3 shrink-0">
            {/* GA4 Inspector Quick Status Indicator */}
            <button
              id="ga4-inspector-trigger-btn"
              onClick={() => setIsInspectorOpen(true)}
              className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-neutral-700 transition cursor-pointer"
              title="Inspect GA4 Ecommerce Funnel & Event Stream"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <Activity className="w-3 h-3" />
              <span className="hidden sm:inline">GA4 Live:</span>
              <span className="text-white font-mono">{events.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Brand Identity */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={onNavigateHome}
              className="flex items-center space-x-2.5 text-left group focus:outline-hidden"
            >
              {/* Google 4-Color Super G Symbol */}
              <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center p-1 border border-neutral-200 group-hover:border-neutral-300 transition shadow-xs">
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 leading-none flex items-center gap-1.5">
                  Google <span className="font-normal text-neutral-500">Merchandise</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-medium tracking-wide">Official Campus Store</span>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map(cat => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons: Search & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Input Trigger */}
            <button
              id="header-search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 text-neutral-500 hover:text-neutral-800 bg-neutral-100 hover:bg-neutral-200/80 rounded-full text-xs font-medium transition cursor-pointer border border-transparent focus:border-neutral-300"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 text-neutral-600" />
              <span className="hidden sm:inline">Search merch (e.g. hoodie, tumbler)...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400 bg-white border border-neutral-200 rounded-sm">
                ⌘K
              </kbd>
            </button>

            {/* Cart Bag Icon with Live Badge */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer focus:outline-hidden"
              aria-label={`View shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-neutral-800" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-xs animate-scale">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 px-3 pb-1">
              Shop Collections
            </p>
            {categories.map(cat => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`mobile-nav-cat-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium transition ${
                    isActive
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              id="mobile-search-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-neutral-100 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-200"
            >
              <Search className="w-4 h-4" />
              <span>Search Store Catalog</span>
            </button>

            <button
              id="mobile-view-cart-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Cart ({itemCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
