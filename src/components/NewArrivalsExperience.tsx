import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Star, 
  Leaf, 
  Sparkles,
  Flame,
  Award,
  Heart,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface NewArrivalsExperienceProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateHome?: () => void;
}

export const NewArrivalsExperience: React.FC<NewArrivalsExperienceProps> = ({
  products,
  onSelectProduct,
  onSelectCategory,
  onNavigateHome
}) => {
  const { addToCart } = useCart();
  const { trackProductView } = useAnalytics();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Selected colors for each card
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'g-hoodie-01': 'Heather Grey',
    'g-backpack-06': 'Black',
    'g-tumbler-04': 'Porcelain White',
    'g-cap-03': 'Stealth Black'
  });

  // Find products by ID or fallback
  const hoodie = products.find(p => p.id === 'g-hoodie-01');
  const backpack = products.find(p => p.id === 'g-backpack-06');
  const bottle = products.find(p => p.id === 'g-tumbler-04');
  const cap = products.find(p => p.id === 'g-cap-03');
  const tee = products.find(p => p.id === 'g-tee-02');

  const featuredItems = [
    {
      product: hoodie,
      title: 'Google Hoodie',
      price: 85.00,
      rating: 4.8,
      reviews: 124,
      image: '/products/grey-hoodie.jpg',
      isEco: true,
      colors: [
        { name: 'Heather Grey', hex: '#d1d5db' },
        { name: 'Black', hex: '#111827' },
        { name: 'Blue', hex: '#2563eb' },
        { name: 'Red', hex: '#dc2626' }
      ]
    },
    {
      product: backpack,
      title: 'Google Backpack',
      price: 75.00,
      rating: 4.7,
      reviews: 98,
      image: '/products/black-backpack.jpg',
      isEco: true,
      colors: [
        { name: 'Black', hex: '#111827' },
        { name: 'Grey', hex: '#6b7280' },
        { name: 'Blue', hex: '#2563eb' }
      ]
    },
    {
      product: bottle,
      title: 'Google Bottle',
      price: 32.00,
      rating: 4.9,
      reviews: 156,
      image: '/products/pixel-bottle.jpg',
      isEco: true,
      colors: [
        { name: 'Porcelain White', hex: '#ffffff' },
        { name: 'Black', hex: '#111827' },
        { name: 'Blue', hex: '#2563eb' },
        { name: 'Green', hex: '#16a34a' }
      ]
    },
    {
      product: cap,
      title: 'Google Cap',
      price: 28.00,
      rating: 4.6,
      reviews: 87,
      image: '/products/black-cap.jpg',
      isEco: false,
      colors: [
        { name: 'Stealth Black', hex: '#111827' },
        { name: 'Light Grey', hex: '#d1d5db' },
        { name: 'Blue', hex: '#2563eb' },
        { name: 'Red', hex: '#dc2626' }
      ]
    }
  ];

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

  return (
    <div id="new-arrivals-experience" className="bg-white min-h-screen text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
        
        {/* ========================================================= */}
        {/* 1. FEATURED PRODUCTS SECTION                              */}
        {/* ========================================================= */}
        <section id="featured-products-section" className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Featured Products
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-normal">
              Iconic designs. Everyday essentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {featuredItems.map((item, idx) => {
              const prodId = item.product?.id || `item-${idx}`;
              const isAdded = addedId === prodId;
              const activeColor = selectedColors[prodId] || item.colors[0].name;

              return (
                <div
                  key={prodId}
                  id={`featured-card-${idx}`}
                  onClick={() => handleProductCardClick(item.product)}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Card Image Area */}
                  <div className="relative aspect-square w-full bg-neutral-50 p-6 flex items-center justify-center overflow-hidden">
                    {/* Eco Friendly Badge */}
                    {item.isEco && (
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-700 text-white shadow-2xs">
                          Eco Friendly
                        </span>
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card Meta & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Rating */}
                      <div className="flex items-center space-x-1.5 text-xs text-neutral-600">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-current"
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-neutral-800">{item.rating.toFixed(1)}</span>
                        <span>({item.reviews})</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* Price */}
                      <div className="text-base font-extrabold text-neutral-900">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center space-x-2 pt-1">
                        {item.colors.map(color => {
                          const isSelected = activeColor === color.name;
                          return (
                            <button
                              key={color.name}
                              type="button"
                              title={color.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedColors(prev => ({ ...prev, [prodId]: color.name }));
                              }}
                              className={`w-4 h-4 rounded-full transition-transform border ${
                                isSelected 
                                  ? 'ring-2 ring-offset-1 ring-neutral-900 scale-110' 
                                  : 'hover:scale-105 border-neutral-300'
                              }`}
                              style={{ backgroundColor: color.hex }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      id={`btn-add-${prodId}`}
                      type="button"
                      onClick={(e) => handleAddToCart(item.product, item.title, item.price, e)}
                      className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                      }`}
                    >
                      {isAdded ? (
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
              );
            })}
          </div>
        </section>


        {/* ========================================================= */}
        {/* 2. COMPLETE YOUR GOOGLE LOOK & GOOD FOR THE PLANET        */}
        {/* ========================================================= */}
        <section id="curated-duo-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Complete Your Google Look */}
          <div id="complete-google-look" className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-1 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Complete Your Google Look
              </h2>
              <p className="text-sm text-neutral-600">
                Pair your favorite merch with customer favorites.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Mini Item 1: Backpack */}
              <div 
                onClick={() => handleProductCardClick(backpack)}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center mb-2">
                  <img
                    src="/products/black-backpack.jpg"
                    alt="Backpack"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">Backpack</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Carry your world</p>
              </div>

              {/* Mini Item 2: Bottle */}
              <div 
                onClick={() => handleProductCardClick(bottle)}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center mb-2">
                  <img
                    src="/products/pixel-bottle.jpg"
                    alt="Bottle"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">Bottle</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Stay refreshed</p>
              </div>

              {/* Mini Item 3: Cap */}
              <div 
                onClick={() => handleProductCardClick(cap)}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center mb-2">
                  <img
                    src="/products/black-cap.jpg"
                    alt="Cap"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">Cap</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Keep it classic</p>
              </div>

              {/* Mini Item 4: T-Shirt */}
              <div 
                onClick={() => handleProductCardClick(tee)}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center mb-2">
                  <img
                    src="/products/google-tee.jpg"
                    alt="T-Shirt"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition">T-Shirt</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Simple & iconic</p>
              </div>
            </div>
          </div>

          {/* Right: Good for You. Better for the Planet. */}
          <div id="good-for-planet" className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-1 mb-6 flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Good for You.<br />Better for the Planet.
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Explore our sustainable collection.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Organic Cotton */}
              <div 
                onClick={() => onSelectCategory('clothing')}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden mb-2 bg-amber-50/50 flex items-center justify-center">
                  <img
                    src="/eco-cotton.jpg"
                    alt="Organic Cotton"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition">Organic Cotton</h4>
                <p className="text-xs text-neutral-500 mt-0.5">T-shirts & hoodies</p>
              </div>

              {/* Recycled Materials */}
              <div 
                onClick={() => onSelectCategory('bags')}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden mb-2 bg-neutral-100 flex items-center justify-center">
                  <img
                    src="/eco-recycled.jpg"
                    alt="Recycled Materials"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition">Recycled Materials</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Bags & accessories</p>
              </div>

              {/* Reusable Drinkware */}
              <div 
                onClick={() => onSelectCategory('drinkware')}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-xl p-3.5 border border-neutral-100 text-center transition flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden mb-2 bg-blue-50/50 flex items-center justify-center">
                  <img
                    src="/eco-drinkware.jpg"
                    alt="Reusable Drinkware"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition">Reusable Drinkware</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Bottles & tumblers</p>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 3. LIFESTYLE HERO BANNER: WEAR WHAT YOU GOOGLE             */}
        {/* ========================================================= */}
        <section id="wear-what-you-google-banner" className="relative rounded-3xl overflow-hidden shadow-md border border-neutral-200">
          <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-end">
            {/* Background Lifestyle Photo */}
            <img
              src="/wear-what-you-google.jpg"
              alt="Wear What You Google Lifestyle"
              className="absolute inset-0 w-full h-full object-cover object-left"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Mask for readable text on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white/95 sm:via-white/60 sm:to-white"></div>

            {/* Graphic Accents (Google Brand Colors curves) */}
            <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none opacity-25 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-500 blur-2xl"></div>
              <div className="absolute top-1/2 -right-8 w-48 h-48 rounded-full bg-emerald-500 blur-2xl"></div>
              <div className="absolute -bottom-10 right-8 w-48 h-48 rounded-full bg-rose-500 blur-2xl"></div>
            </div>

            {/* Banner Copy on the Right */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-xl text-right sm:text-left">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-tight">
                Wear What<br className="hidden sm:inline" /> You Google
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-medium mt-3 mb-6">
                Everyday essentials made for Google fans.
              </p>

              <button
                id="btn-explore-apparel"
                type="button"
                onClick={() => onSelectCategory('clothing')}
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
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
        <section id="trending-now-section" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Trending Now
            </h2>

            <button
              onClick={() => onSelectCategory('all')}
              className="inline-flex items-center space-x-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
            >
              <span>Trending Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Google Hoodie (Trending) */}
            <div
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
              <div className="p-5 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                    Google Hoodie
                  </h3>
                  <div className="text-base font-extrabold text-neutral-900 mt-0.5">
                    $85.00
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.8</span>
                  <span>(124)</span>
                </div>
              </div>
            </div>

            {/* Card 2: Google Bottle (Bestseller) */}
            <div
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
              <div className="p-5 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                    Google Bottle
                  </h3>
                  <div className="text-base font-extrabold text-neutral-900 mt-0.5">
                    $32.00
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.9</span>
                  <span>(156)</span>
                </div>
              </div>
            </div>

            {/* Card 3: Google Backpack (Popular) */}
            <div
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
              <div className="p-5 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                    Google Backpack
                  </h3>
                  <div className="text-base font-extrabold text-neutral-900 mt-0.5">
                    $75.00
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.7</span>
                  <span>(98)</span>
                </div>
              </div>
            </div>

            {/* Card 4: Google Cap (Fan Favorite) */}
            <div
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
              <div className="p-5 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition">
                    Google Cap
                  </h3>
                  <div className="text-base font-extrabold text-neutral-900 mt-0.5">
                    $28.00
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-600">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-800">4.6</span>
                  <span>(87)</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* 5. LOVED BY GOOGLE FANS (TESTIMONIALS)                    */}
        {/* ========================================================= */}
        <section id="loved-by-fans-section" className="space-y-6 pt-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Heading & Overall Rating */}
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Loved by Google Fans
              </h2>
              
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-sm text-neutral-700 font-medium italic">
                “The quality is amazing and the design is simple enough for everyday use.”
              </p>
            </div>

            {/* Right Column: 4 User Reviews */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Review 1 */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    SM
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900">Sarah M.</h5>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  “Great quality, super comfortable and looks amazing!”
                </p>
              </div>

              {/* Review 2 */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                    JT
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900">James T.</h5>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  “Perfect for everyday use. I get compliments all the time!”
                </p>
              </div>

              {/* Review 3 */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                    ER
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900">Emily R.</h5>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  “Love the eco-friendly options. Good quality and great style!”
                </p>
              </div>

              {/* Review 4 */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                    DL
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900">David L.</h5>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  “The backpack is spacious and well designed. Highly recommend!”
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
