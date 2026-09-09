import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Star, 
  Leaf, 
  Flame,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  Shirt,
  Coffee,
  Glasses,
  Award,
  Clock,
  Briefcase
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface AllProductsExperienceProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateHome?: () => void;
  onViewCatalog?: () => void;
  selectedPriceRange: 'all' | 'under-30' | '30-60' | 'over-60';
  onSelectPriceRange: (range: 'all' | 'under-30' | '30-60' | 'over-60') => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
}

export const AllProductsExperience: React.FC<AllProductsExperienceProps> = ({
  products,
  onSelectProduct,
  onSelectCategory,
  onNavigateHome,
  onViewCatalog,
  selectedPriceRange,
  onSelectPriceRange,
  inStockOnly,
  onToggleInStock
}) => {
  const { addToCart } = useCart();
  const { trackProductView } = useAnalytics();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Selected colors for each trending card
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'g-hoodie-01': 'Black',
    'g-tumbler-04': 'Porcelain White',
    'g-backpack-06': 'Google Blue',
    'g-cap-03': 'Stealth Black'
  });

  // Find products by ID or fallback
  const hoodie = products.find(p => p.id === 'g-hoodie-01');
  const backpack = products.find(p => p.id === 'g-backpack-06');
  const bottle = products.find(p => p.id === 'g-tumbler-04');
  const cap = products.find(p => p.id === 'g-cap-03');
  const tee = products.find(p => p.id === 'g-tee-02');

  const handleAddToCart = (product: Product | undefined, defaultTitle: string, defaultPrice: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    
    const colorName = selectedColors[product.id] || (product.colors && product.colors[0]?.name) || 'Standard';
    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;

    addToCart(product, colorName, size);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  const handleProductCardClick = (product?: Product) => {
    if (product) {
      trackProductView(product);
      onSelectProduct(product);
    }
  };

  // Sidebar category definitions with exact counts as requested in image
  const sidebarCategories: Array<{
    id: ProductCategory;
    label: string;
    count: number;
    icon: React.ReactNode;
  }> = [
    { id: 'all', label: 'All Products', count: 74, icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'clothing', label: 'Apparel', count: 13, icon: <Shirt className="w-4 h-4" /> },
    { id: 'drinkware', label: 'Drinkware', count: 8, icon: <Coffee className="w-4 h-4" /> },
    { id: 'bags', label: 'Bags', count: 7, icon: <Briefcase className="w-4 h-4" /> },
    { id: 'accessories', label: 'Accessories', count: 12, icon: <Glasses className="w-4 h-4" /> },
    { id: 'tech-stationery', label: 'Collectibles', count: 6, icon: <Award className="w-4 h-4" /> },
    { id: 'new-arrivals', label: 'New Arrivals', count: 5, icon: <Clock className="w-4 h-4" /> }
  ];

  return (
    <div id="all-products-experience" className="space-y-12 sm:space-y-16 pb-12">
      
      {/* ========================================================= */}
      {/* 1. TOP HERO BANNER: ALL GOOGLE MERCH                      */}
      {/* ========================================================= */}
      <section 
        id="all-merch-hero-banner" 
        className="relative bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 rounded-3xl border border-neutral-200 overflow-hidden shadow-2xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[280px] sm:min-h-[320px]">
          
          {/* Left Column: Headline & CTA */}
          <div className="p-8 sm:p-12 lg:p-14 lg:col-span-6 z-10 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              All Google Merch
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-medium">
              Wear. Carry. Stay Connected.
            </p>
            <div className="pt-2">
              <button
                id="btn-shop-all-products-banner"
                type="button"
                onClick={onViewCatalog}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Merchandise Showcase & Quote */}
          <div className="relative lg:col-span-6 p-6 sm:p-8 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg flex items-center justify-center">
              {/* Product composite montage */}
              <div className="flex items-end justify-center space-x-2 sm:space-x-4">
                {/* Hoodie */}
                <div className="w-28 sm:w-36 transition-transform hover:scale-105 duration-300">
                  <img
                    src="/products/grey-hoodie.jpg"
                    alt="Google Hoodie"
                    className="w-full h-auto object-contain mix-blend-multiply drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Backpack */}
                <div className="w-32 sm:w-44 transition-transform hover:scale-105 duration-300 -ml-4 sm:-ml-6 z-10">
                  <img
                    src="/products/black-backpack.jpg"
                    alt="Google Backpack"
                    className="w-full h-auto object-contain mix-blend-multiply drop-shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Bottle */}
                <div className="w-14 sm:w-20 transition-transform hover:scale-105 duration-300 -ml-2 sm:-ml-4 z-20">
                  <img
                    src="/products/pixel-bottle.jpg"
                    alt="Google Bottle"
                    className="w-full h-auto object-contain mix-blend-multiply drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Cap */}
                <div className="w-20 sm:w-28 transition-transform hover:scale-105 duration-300 -ml-4 z-30">
                  <img
                    src="/products/black-cap.jpg"
                    alt="Google Cap"
                    className="w-full h-auto object-contain mix-blend-multiply drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Tagline Quote overlay on the right */}
              <div className="hidden sm:block absolute -right-2 top-2 lg:top-4 text-right pointer-events-none select-none">
                <p className="font-serif italic text-lg lg:text-xl font-bold text-slate-700 leading-tight">
                  Same<br />people.<br /><span className="text-blue-600">Bigger</span><br />ideas.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 2. MAIN SECTION: SIDEBAR + SHOP BY CATEGORY + PLANET       */}
      {/* ========================================================= */}
      <section id="sidebar-and-category-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ----------------- LEFT SIDEBAR ----------------- */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs space-y-6">
            
            {/* Shop by Category List */}
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900 tracking-tight mb-3">
                Shop by Category
              </h3>
              <div className="space-y-1">
                {sidebarCategories.map(cat => {
                  const isActive = cat.id === 'all';
                  return (
                    <button
                      key={cat.id}
                      id={`sidebar-cat-${cat.id}`}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 shadow-2xs'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={isActive ? 'text-blue-600' : 'text-neutral-500'}>
                          {cat.icon}
                        </span>
                        <span>{cat.label}</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-blue-600 text-white' : 'text-neutral-500 bg-neutral-100'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-5">
              {/* Price Range */}
              <h3 className="text-sm font-extrabold text-neutral-900 tracking-tight mb-3">
                Price Range
              </h3>
              <div className="space-y-2 text-xs text-neutral-700">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-30', label: 'Under $30' },
                  { id: '30-60', label: '$30 to $60' },
                  { id: 'over-60', label: '$60 and Above' }
                ].map(r => (
                  <label 
                    key={r.id} 
                    className="flex items-center space-x-2.5 cursor-pointer hover:text-neutral-900"
                  >
                    <input
                      type="radio"
                      name="all-price-range"
                      value={r.id}
                      checked={selectedPriceRange === r.id}
                      onChange={() => onSelectPriceRange(r.id as any)}
                      className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={selectedPriceRange === r.id ? 'font-bold text-neutral-900' : 'font-medium'}>
                      {r.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-5">
              {/* Availability */}
              <h3 className="text-sm font-extrabold text-neutral-900 tracking-tight mb-3">
                Availability
              </h3>
              <label className="flex items-center space-x-2.5 text-xs text-neutral-700 cursor-pointer hover:text-neutral-900">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => onToggleInStock(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-sm border-neutral-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className={inStockOnly ? 'font-bold text-neutral-900' : 'font-medium'}>
                  In Stock Only
                </span>
              </label>
            </div>

          </div>
        </aside>


        {/* ----------------- RIGHT CONTENT AREA ----------------- */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Shop by Category Section */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Shop by Category
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                  Find your favorite Google products, from apparel to accessories.
                </p>
              </div>

              <button
                type="button"
                onClick={onViewCatalog}
                className="inline-flex items-center space-x-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 6 Category Cards Grid: Row 1 has 4 cards, Row 2 has 2 wide cards */}
            <div className="space-y-4">
              {/* Row 1: Apparel, Drinkware, Bags, Accessories */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                {/* 1. Apparel */}
                <div
                  id="cat-card-apparel"
                  onClick={() => onSelectCategory('clothing')}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-square w-full bg-neutral-50 rounded-xl mb-3 flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src="/products/grey-hoodie.jpg"
                      alt="Apparel"
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                        Apparel
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        T-Shirts, Hoodies & More
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-neutral-600 transition">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 2. Drinkware */}
                <div
                  id="cat-card-drinkware"
                  onClick={() => onSelectCategory('drinkware')}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-square w-full bg-neutral-50 rounded-xl mb-3 flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src="/products/pixel-bottle.jpg"
                      alt="Drinkware"
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                        Drinkware
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Bottles, Tumblers & Mugs
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-neutral-600 transition">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 3. Bags */}
                <div
                  id="cat-card-bags"
                  onClick={() => onSelectCategory('bags')}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-square w-full bg-neutral-50 rounded-xl mb-3 flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src="/products/black-backpack.jpg"
                      alt="Bags"
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                        Bags
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Backpacks, Totes & More
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-neutral-600 transition">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 4. Accessories */}
                <div
                  id="cat-card-accessories"
                  onClick={() => onSelectCategory('accessories')}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-square w-full bg-neutral-50 rounded-xl mb-3 flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src="/products/black-cap.jpg"
                      alt="Accessories"
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                        Accessories
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Hats, Socks, Keychains & More
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-neutral-600 transition">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 2: Collectibles, New Arrivals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 5. Collectibles */}
                <div
                  id="cat-card-collectibles"
                  onClick={() => onSelectCategory('tech-stationery')}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="h-44 sm:h-48 w-full bg-neutral-50 rounded-xl mb-3 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src="/category-collectibles.jpg"
                      alt="Collectibles"
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                        Collectibles
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Fun & Unique Items
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-neutral-600 transition">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 6. New Arrivals */}
                <div
                  id="cat-card-new-arrivals"
                  onClick={() => onSelectCategory('new-arrivals')}
                  className="group bg-white rounded-2xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="h-44 sm:h-48 w-full bg-neutral-50 rounded-xl mb-3 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src="/products/google-tee.jpg"
                      alt="New Arrivals"
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">
                        New Arrivals
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Latest Google Merch
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-neutral-600 transition">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* ----------------- GOOD FOR YOU. BETTER FOR THE PLANET. ----------------- */}
          <div 
            id="all-merch-planet-banner" 
            className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-2xs"
          >
            {/* Corner leaf subtle watermark */}
            <div className="absolute top-2 left-2 text-emerald-600/10 pointer-events-none">
              <Leaf className="w-24 h-24 transform -rotate-12" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              
              {/* Left text block */}
              <div className="lg:col-span-4 space-y-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Leaf className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                  Good for You.<br />Better for the Planet.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Explore our sustainable collection.
                </p>
                <div className="pt-1">
                  <button
                    id="btn-shop-sustainable-banner"
                    type="button"
                    onClick={() => onSelectCategory('clothing')}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                  >
                    <span>Shop Sustainable</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 3 eco cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Card 1: Organic Cotton */}
                <div
                  onClick={() => onSelectCategory('clothing')}
                  className="group bg-white rounded-xl border border-neutral-200/80 p-3 shadow-2xs hover:shadow-xs transition flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-4/3 w-full rounded-lg overflow-hidden mb-2.5 bg-amber-50/50 flex items-center justify-center">
                    <img
                      src="/eco-cotton.jpg"
                      alt="Organic Cotton"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700 transition">
                      Organic Cotton
                    </h5>
                    <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center justify-between">
                      <span>T-shirts & hoodies</span>
                      <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition" />
                    </p>
                  </div>
                </div>

                {/* Card 2: Recycled Materials */}
                <div
                  onClick={() => onSelectCategory('bags')}
                  className="group bg-white rounded-xl border border-neutral-200/80 p-3 shadow-2xs hover:shadow-xs transition flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-4/3 w-full rounded-lg overflow-hidden mb-2.5 bg-neutral-100 flex items-center justify-center">
                    <img
                      src="/eco-recycled.jpg"
                      alt="Recycled Materials"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700 transition">
                      Recycled Materials
                    </h5>
                    <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center justify-between">
                      <span>Bags & accessories</span>
                      <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition" />
                    </p>
                  </div>
                </div>

                {/* Card 3: Reusable Drinkware */}
                <div
                  onClick={() => onSelectCategory('drinkware')}
                  className="group bg-white rounded-xl border border-neutral-200/80 p-3 shadow-2xs hover:shadow-xs transition flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-4/3 w-full rounded-lg overflow-hidden mb-2.5 bg-blue-50/50 flex items-center justify-center">
                    <img
                      src="/eco-drinkware.jpg"
                      alt="Reusable Drinkware"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700 transition">
                      Reusable Drinkware
                    </h5>
                    <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center justify-between">
                      <span>Bottles & tumblers</span>
                      <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition" />
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* 3. LIFESTYLE BANNER: WEAR WHAT YOU GOOGLE                  */}
      {/* ========================================================= */}
      <section 
        id="all-merch-wear-what-you-google" 
        className="relative rounded-3xl overflow-hidden shadow-md border border-neutral-200"
      >
        <div className="relative min-h-[360px] sm:min-h-[400px] flex items-center justify-end">
          {/* Lifestyle Photo */}
          <img
            src="/wear-what-you-google.jpg"
            alt="Wear What You Google"
            className="absolute inset-0 w-full h-full object-cover object-left"
            referrerPolicy="no-referrer"
          />

          {/* Clean fade gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white/95 sm:via-white/70 sm:to-white"></div>

          {/* Google Color accents in the top-right and bottom-right */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-500/20 blur-xl pointer-events-none"></div>
          <div className="absolute right-12 bottom-0 w-40 h-40 rounded-full bg-emerald-500/20 blur-xl pointer-events-none"></div>
          <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-rose-500/20 blur-xl pointer-events-none"></div>

          {/* Text block */}
          <div className="relative z-10 p-8 sm:p-14 max-w-xl text-left">
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
              Wear What<br />You Google
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 font-medium mt-2 mb-6">
              Everyday essentials made for Google fans.
            </p>

            <button
              id="btn-all-explore-apparel"
              type="button"
              onClick={() => onSelectCategory('clothing')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Apparel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 4. TRENDING NOW SECTION                                   */}
      {/* ========================================================= */}
      <section id="all-merch-trending-section" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Trending Now
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Our most popular Google merch, loved by fans.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewCatalog}
            className="inline-flex items-center space-x-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Google Hoodie */}
          <div
            id="trending-card-hoodie"
            onClick={() => handleProductCardClick(hoodie)}
            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square w-full bg-neutral-50 p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-2xs">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>Trending</span>
                </span>
              </div>
              <img
                src="/products/grey-hoodie.jpg"
                alt="Google Hoodie"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                  Google Hoodie
                </h3>
                <div className="text-base font-extrabold text-neutral-900">
                  $85.00
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600 pt-0.5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.8</span>
                  <span>(124)</span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center space-x-2 pt-2">
                  {[
                    { name: 'Black', hex: '#111827' },
                    { name: 'Heather Grey', hex: '#d1d5db' },
                    { name: 'Google Blue', hex: '#2563eb' },
                    { name: 'Google Red', hex: '#dc2626' }
                  ].map(color => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, 'g-hoodie-01': color.name }));
                      }}
                      className={`w-4 h-4 rounded-full transition-transform border ${
                        selectedColors['g-hoodie-01'] === color.name
                          ? 'ring-2 ring-offset-1 ring-neutral-900 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                id="btn-trending-add-hoodie"
                type="button"
                onClick={(e) => handleAddToCart(hoodie, 'Google Hoodie', 85.00, e)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                  addedId === 'g-hoodie-01'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                }`}
              >
                {addedId === 'g-hoodie-01' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Google Bottle */}
          <div
            id="trending-card-bottle"
            onClick={() => handleProductCardClick(bottle)}
            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square w-full bg-neutral-50 p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-2xs">
                  Bestseller
                </span>
              </div>
              <img
                src="/products/pixel-bottle.jpg"
                alt="Google Bottle"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                  Google Bottle
                </h3>
                <div className="text-base font-extrabold text-neutral-900">
                  $32.00
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600 pt-0.5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.9</span>
                  <span>(156)</span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center space-x-2 pt-2">
                  {[
                    { name: 'Porcelain White', hex: '#ffffff' },
                    { name: 'Black', hex: '#111827' },
                    { name: 'Blue', hex: '#2563eb' },
                    { name: 'Green', hex: '#16a34a' },
                    { name: 'Red', hex: '#dc2626' }
                  ].map(color => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, 'g-tumbler-04': color.name }));
                      }}
                      className={`w-4 h-4 rounded-full transition-transform border ${
                        selectedColors['g-tumbler-04'] === color.name
                          ? 'ring-2 ring-offset-1 ring-neutral-900 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                id="btn-trending-add-bottle"
                type="button"
                onClick={(e) => handleAddToCart(bottle, 'Google Bottle', 32.00, e)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                  addedId === 'g-tumbler-04'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                }`}
              >
                {addedId === 'g-tumbler-04' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. Google Backpack */}
          <div
            id="trending-card-backpack"
            onClick={() => handleProductCardClick(backpack)}
            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square w-full bg-neutral-50 p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-2xs">
                  Popular
                </span>
              </div>
              <img
                src="/products/black-backpack.jpg"
                alt="Google Backpack"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                  Google Backpack
                </h3>
                <div className="text-base font-extrabold text-neutral-900">
                  $75.00
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600 pt-0.5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.7</span>
                  <span>(98)</span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center space-x-2 pt-2">
                  {[
                    { name: 'Google Blue', hex: '#2563eb' },
                    { name: 'Black', hex: '#111827' },
                    { name: 'Grey', hex: '#64748b' },
                    { name: 'White', hex: '#ffffff' }
                  ].map(color => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, 'g-backpack-06': color.name }));
                      }}
                      className={`w-4 h-4 rounded-full transition-transform border ${
                        selectedColors['g-backpack-06'] === color.name
                          ? 'ring-2 ring-offset-1 ring-neutral-900 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                id="btn-trending-add-backpack"
                type="button"
                onClick={(e) => handleAddToCart(backpack, 'Google Backpack', 75.00, e)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                  addedId === 'g-backpack-06'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                }`}
              >
                {addedId === 'g-backpack-06' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. Google Cap */}
          <div
            id="trending-card-cap"
            onClick={() => handleProductCardClick(cap)}
            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square w-full bg-neutral-50 p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-2xs">
                  Fan Favorite
                </span>
              </div>
              <img
                src="/products/black-cap.jpg"
                alt="Google Cap"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                  Google Cap
                </h3>
                <div className="text-base font-extrabold text-neutral-900">
                  $28.00
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600 pt-0.5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.6</span>
                  <span>(87)</span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center space-x-2 pt-2">
                  {[
                    { name: 'Stealth Black', hex: '#111827' },
                    { name: 'Blue', hex: '#2563eb' },
                    { name: 'White', hex: '#ffffff' },
                    { name: 'Red', hex: '#dc2626' }
                  ].map(color => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, 'g-cap-03': color.name }));
                      }}
                      className={`w-4 h-4 rounded-full transition-transform border ${
                        selectedColors['g-cap-03'] === color.name
                          ? 'ring-2 ring-offset-1 ring-neutral-900 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                id="btn-trending-add-cap"
                type="button"
                onClick={(e) => handleAddToCart(cap, 'Google Cap', 28.00, e)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                  addedId === 'g-cap-03'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                }`}
              >
                {addedId === 'g-cap-03' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. LOVED BY GOOGLE FANS SECTION                           */}
      {/* ========================================================= */}
      <section 
        id="all-merch-loved-by-fans" 
        className="bg-sky-50/60 border border-sky-100 rounded-3xl p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Title & Overall Stars */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Loved by Google Fans
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Real people. Real feedback.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800">4.8</span>
              <span className="text-xs text-neutral-500">(324 reviews)</span>
            </div>
          </div>

          {/* Right 4 Testimonials */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
            
            {/* Review 1 */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Sarah M."
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-neutral-900">Sarah M.</h5>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-600 italic leading-relaxed">
                “Great quality, super comfortable and looks amazing!”
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="James T."
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-neutral-900">James T.</h5>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-600 italic leading-relaxed">
                “Perfect for everyday use. I get compliments all the time!”
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
                  alt="Emily R."
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-neutral-900">Emily R.</h5>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-600 italic leading-relaxed">
                “Love the eco-friendly options. Good quality and great style!”
              </p>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
              <div className="flex items-center space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                  alt="David L."
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-neutral-900">David L.</h5>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-600 italic leading-relaxed">
                “The backpack is spacious and well designed. Highly recommend!”
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
