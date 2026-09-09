import React, { useState } from 'react';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { BestSellers } from './components/BestSellers';
import { PromotionBanner } from './components/PromotionBanner';
import { TrustSection } from './components/TrustSection';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmation } from './components/OrderConfirmation';
import { QuickSearchModal } from './components/QuickSearchModal';
import { GA4Inspector } from './components/GA4Inspector';
import { Footer } from './components/Footer';
import { PRODUCTS, PROMOTIONS } from './data/products';
import { Product, ProductCategory, OrderDetails } from './types';
import { 
  Activity, 
  Home, 
  Search, 
  ShoppingBag, 
  Grid, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Inner component to access context hooks
const GoogleStoreApp: React.FC = () => {
  const { isCartOpen, setIsCartOpen, itemCount } = useCart();
  const { events, setIsInspectorOpen } = useAnalytics();

  // Navigation and view state
  const [currentView, setCurrentView] = useState<'home' | 'plp' | 'pdp' | 'confirmation'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Navigation handlers
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleOrderComplete = (order: OrderDetails) => {
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setCurrentView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setCompletedOrder(null);
    handleNavigateHome();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 pb-16 lg:pb-0">
      
      {/* Top Announcement Bar */}
      <div className="bg-neutral-950 text-white text-[11px] sm:text-xs py-2 px-4 text-center border-b border-neutral-800 flex items-center justify-center space-x-2">
        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-sm bg-blue-600 text-white font-bold text-[10px]">
          SPRING 2026
        </span>
        <span className="text-neutral-300">
          Official Google Merchandise • Free standard shipping on orders $50+ with code <strong className="text-white font-mono">FREESHIP</strong>
        </span>
      </div>

      {/* Global Responsive Navigation Header */}
      <Header
        activeCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onNavigateHome={handleNavigateHome}
      />

      {/* Dynamic View Router */}
      <div className="flex-1">
        {/* HOMEPAGE VIEW */}
        {currentView === 'home' && (
          <main className="space-y-0 animate-fadeIn">
            {/* Promotion Banner with Promo tracking (AN-05, PR-01) */}
            <PromotionBanner
              promotion={PROMOTIONS[0]}
              onShopNow={handleSelectCategory}
            />

            {/* Hero Section with clear primary CTA (HP-01, HP-02) */}
            <Hero
              onShopNow={() => handleSelectCategory('all')}
              onShopNewArrivals={() => handleSelectCategory('new-arrivals')}
            />

            {/* Shop By Category Visual Grid (HP-03, NAV-01) */}
            <ShopByCategory onSelectCategory={handleSelectCategory} />

            {/* Best Sellers Section with 1-click Quick Add (HP-05) */}
            <BestSellers
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => handleSelectCategory('all')}
            />

            {/* Secondary Promotion Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <PromotionBanner
                promotion={PROMOTIONS[1]}
                onShopNow={handleSelectCategory}
              />
            </div>

            {/* Trust & Shipping Pillars (HP-06) */}
            <TrustSection />
          </main>
        )}

        {/* PRODUCT LISTING PAGE (PLP) */}
        {currentView === 'plp' && (
          <ProductListingPage
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={handleNavigateHome}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
          />
        )}

        {/* PRODUCT DETAIL PAGE (PDP) */}
        {currentView === 'pdp' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigateHome={handleNavigateHome}
            onNavigateCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* ORDER CONFIRMATION VIEW */}
        {currentView === 'confirmation' && completedOrder && (
          <OrderConfirmation
            order={completedOrder}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </div>

      {/* Site Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
      />

      {/* Global Modals & Drawers */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onSearchSubmit={handleSearchSubmit}
      />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onNavigateHome={handleNavigateHome}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      <GA4Inspector />

      {/* Floating GA4 Inspector Trigger Pill */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        <button
          id="floating-ga4-inspector-trigger"
          onClick={() => setIsInspectorOpen(true)}
          className="group flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-900 text-white shadow-xl hover:shadow-2xl border border-neutral-700/80 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Open GA4 Analytics Inspector"
        >
          <div className="relative">
            <Activity className="w-4 h-4 text-emerald-400 group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <span className="text-xs font-bold font-mono">
            GA4 Inspector
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-neutral-800 text-emerald-400 font-mono text-[10px] font-bold border border-neutral-700">
            {events.length}
          </span>
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar (Mobile Shopping & discovery enhancement) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2 px-6 flex items-center justify-between shadow-lg">
        <button
          id="mobile-nav-home"
          onClick={handleNavigateHome}
          className={`flex flex-col items-center space-y-1 text-[11px] font-medium transition ${
            currentView === 'home' ? 'text-neutral-900 font-bold' : 'text-neutral-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          id="mobile-nav-catalog"
          onClick={() => handleSelectCategory('all')}
          className={`flex flex-col items-center space-y-1 text-[11px] font-medium transition ${
            currentView === 'plp' ? 'text-neutral-900 font-bold' : 'text-neutral-500'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Shop All</span>
        </button>

        <button
          id="mobile-nav-search"
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center space-y-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          id="mobile-nav-bag"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center space-y-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 relative transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-neutral-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

        <button
          id="mobile-nav-inspector"
          onClick={() => setIsInspectorOpen(true)}
          className="flex flex-col items-center space-y-1 text-[11px] font-medium text-emerald-600 transition"
        >
          <Activity className="w-5 h-5" />
          <span>GA4</span>
        </button>
      </nav>

    </div>
  );
};

export default function App() {
  return (
    <AnalyticsProvider>
      <CartProvider>
        <GoogleStoreApp />
      </CartProvider>
    </AnalyticsProvider>
  );
}
