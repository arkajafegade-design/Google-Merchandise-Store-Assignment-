import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Star, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  Heart,
  ChevronDown,
  Home
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface ApparelExperienceProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateHome?: () => void;
}

interface ApparelDisplayCard {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge: {
    label: string;
    bgClass: string;
    textClass: string;
  };
  image: string;
  colors: Array<{
    name: string;
    hex: string;
    border?: boolean;
  }>;
  inStock: boolean;
}

export const ApparelExperience: React.FC<ApparelExperienceProps> = ({
  products,
  onSelectProduct,
  onSelectCategory,
  onNavigateHome
}) => {
  const { addToCart } = useCart();
  const { trackProductView } = useAnalytics();
  
  const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>('bestseller');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-30' | '30-60' | 'over-60'>('all');
  const [inStockFilter, setInStockFilter] = useState<boolean>(false);

  // Selected color per card
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'g-hoodie-01': 'Heather Grey',
    'g-tee-02': 'Crisp White',
    'g-cap-03': 'Stealth Black',
    'g-crewneck-04': 'Charcoal Black',
    'g-longsleeve-05': 'Crisp White',
    'g-ziphoodie-06': 'Onyx Black'
  });

  // The 6 exact apparel items from the design
  const apparelItems: ApparelDisplayCard[] = [
    {
      id: 'g-hoodie-01',
      name: 'Google Hoodie',
      price: 85.00,
      rating: 4.8,
      reviewCount: 124,
      badge: {
        label: 'Eco Friendly',
        bgClass: 'bg-emerald-600',
        textClass: 'text-white'
      },
      image: '/products/grey-hoodie.jpg',
      colors: [
        { name: 'Heather Grey', hex: '#d1d5db' },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Google Red', hex: '#dc2626' }
      ],
      inStock: true
    },
    {
      id: 'g-tee-02',
      name: 'Google T-Shirt',
      price: 28.00,
      rating: 4.8,
      reviewCount: 180,
      badge: {
        label: 'Popular',
        bgClass: 'bg-slate-900',
        textClass: 'text-white'
      },
      image: '/products/google-tee.jpg',
      colors: [
        { name: 'Crisp White', hex: '#ffffff', border: true },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Google Green', hex: '#16a34a' }
      ],
      inStock: true
    },
    {
      id: 'g-cap-03',
      name: 'Google Cap',
      price: 28.00,
      rating: 4.6,
      reviewCount: 87,
      badge: {
        label: 'Fan Favorite',
        bgClass: 'bg-purple-700',
        textClass: 'text-white'
      },
      image: '/products/black-cap.jpg',
      colors: [
        { name: 'Stealth Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Light Grey', hex: '#9ca3af' },
        { name: 'Google Red', hex: '#dc2626' }
      ],
      inStock: true
    },
    {
      id: 'g-crewneck-04',
      name: 'Google Crewneck Sweatshirt',
      price: 65.00,
      rating: 4.7,
      reviewCount: 96,
      badge: {
        label: 'Bestseller',
        bgClass: 'bg-blue-600',
        textClass: 'text-white'
      },
      image: '/products/crewneck-sweatshirt.jpg',
      colors: [
        { name: 'Charcoal Black', hex: '#111827' },
        { name: 'Heather Grey', hex: '#9ca3af' },
        { name: 'Google Blue', hex: '#2563eb' }
      ],
      inStock: true
    },
    {
      id: 'g-longsleeve-05',
      name: 'Google Long Sleeve Tee',
      price: 32.00,
      rating: 4.6,
      reviewCount: 73,
      badge: {
        label: 'New Arrival',
        bgClass: 'bg-emerald-700',
        textClass: 'text-white'
      },
      image: '/products/longsleeve-tee.jpg',
      colors: [
        { name: 'Crisp White', hex: '#ffffff', border: true },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' }
      ],
      inStock: true
    },
    {
      id: 'g-ziphoodie-06',
      name: 'Google Zip Hoodie',
      price: 95.00,
      originalPrice: 120.00,
      rating: 4.5,
      reviewCount: 62,
      badge: {
        label: 'Sale',
        bgClass: 'bg-rose-600',
        textClass: 'text-white'
      },
      image: '/products/zip-hoodie.jpg',
      colors: [
        { name: 'Onyx Black', hex: '#111827' },
        { name: 'Heather Grey', hex: '#9ca3af' },
        { name: 'Google Blue', hex: '#2563eb' }
      ],
      inStock: true
    }
  ];

  // Filter & sort logic
  const filteredItems = apparelItems.filter(item => {
    if (inStockFilter && !item.inStock) return false;
    if (priceFilter === 'under-30') return item.price < 30;
    if (priceFilter === '30-60') return item.price >= 30 && item.price <= 60;
    if (priceFilter === 'over-60') return item.price > 60;
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'price-asc') return a.price - b.price;
    if (selectedSort === 'price-desc') return b.price - a.price;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return 0; // default bestsellers
  });

  const handleAddToCart = (item: ApparelDisplayCard, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = products.find(p => p.id === item.id) || {
      id: item.id,
      slug: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      tagline: 'Official Google Campus Merchandise',
      price: item.price,
      originalPrice: item.originalPrice,
      category: 'clothing',
      categoryLabel: 'Apparel',
      badge: item.badge.label,
      isBestseller: true,
      inStock: true,
      stockCount: 25,
      rating: item.rating,
      reviewCount: item.reviewCount,
      images: [item.image],
      colors: item.colors.map(c => ({ name: c.name, hex: c.hex })),
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Official Google Campus Merchandise crafted for superior everyday comfort.',
      features: ['Certified organic materials', 'Tailored ergonomic fit', 'Vibrant Google logo print'],
      materials: '100% Organic Cotton',
      care: 'Machine wash cold.'
    } as Product;

    const color = selectedColors[item.id] || item.colors[0].name;
    addToCart(product, color, 'M');
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  const handleCardClick = (item: ApparelDisplayCard) => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      trackProductView(product);
      onSelectProduct(product);
    }
  };

  const scrollToGrid = () => {
    const gridEl = document.getElementById('apparel-products-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Banner */}
      <section 
        id="apparel-hero-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-50 via-sky-50/40 to-blue-50/60 border border-neutral-200/90 shadow-2xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 z-10">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-2">
              GOOGLE MERCHANDISE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight mb-2">
              Apparel
            </h1>
            <p className="text-lg sm:text-xl font-bold text-neutral-800 mb-3">
              Comfortable. Stylish. Iconic.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md mb-6">
              From everyday tees to cozy hoodies, find apparel that lets you show your Google pride.
            </p>
            <button
              id="apparel-shop-all-cta"
              onClick={scrollToGrid}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm cursor-pointer"
            >
              <span>Shop All Apparel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Hero Image (Googlers with 'Wear Your Passion' signage) */}
          <div className="lg:col-span-6 h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] relative overflow-hidden">
            <img 
              src="/apparel-hero-banner.jpg" 
              alt="People wearing Google hoodies and tees with Wear Your Passion banner" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent lg:hidden pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. Breadcrumbs & Sorting Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-500">
          <button 
            onClick={onNavigateHome}
            className="hover:text-neutral-900 transition flex items-center space-x-1 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>&gt;</span>
          <span className="font-semibold text-neutral-900">Apparel</span>
        </nav>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <label htmlFor="apparel-sort-select" className="sr-only">Sort apparel</label>
          <div className="relative inline-flex items-center">
            <select
              id="apparel-sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none bg-white border border-neutral-200 rounded-xl px-3.5 py-1.5 pr-8 text-xs sm:text-sm font-semibold text-neutral-700 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer"
            >
              <option value="bestseller">Sort by: Best Sellers</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Layout: Sidebar + Products Grid */}
      <div id="apparel-products-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Categories Nav Box */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-2xs">
            <h3 className="text-sm font-bold text-neutral-900 mb-3 tracking-tight">
              Categories
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition font-medium cursor-pointer"
                >
                  <span>All Products</span>
                  <span className="text-xs text-neutral-400 font-semibold">13</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('clothing')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold transition cursor-pointer shadow-2xs"
                >
                  <span>Apparel</span>
                  <span className="text-xs text-blue-100 font-bold">4</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('drinkware')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition font-medium cursor-pointer"
                >
                  <span>Drinkware</span>
                  <span className="text-xs text-neutral-400 font-semibold">3</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bags')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition font-medium cursor-pointer"
                >
                  <span>Bags</span>
                  <span className="text-xs text-neutral-400 font-semibold">3</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition font-medium cursor-pointer"
                >
                  <span>Accessories</span>
                  <span className="text-xs text-neutral-400 font-semibold">4</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('new-arrivals')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition font-medium cursor-pointer"
                >
                  <span>New Arrivals</span>
                  <span className="text-xs text-neutral-400 font-semibold">5</span>
                </button>
              </li>
            </ul>

            {/* Price Range Filter */}
            <div className="pt-5 mt-5 border-t border-neutral-100">
              <h4 className="text-sm font-bold text-neutral-900 mb-3">
                Price Range
              </h4>
              <div className="space-y-2 text-xs font-medium text-neutral-700">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="apparel-price"
                    checked={priceFilter === 'all'}
                    onChange={() => setPriceFilter('all')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>All Prices</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="apparel-price"
                    checked={priceFilter === 'under-30'}
                    onChange={() => setPriceFilter('under-30')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>Under $30</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="apparel-price"
                    checked={priceFilter === '30-60'}
                    onChange={() => setPriceFilter('30-60')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>$30 to $60</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="apparel-price"
                    checked={priceFilter === 'over-60'}
                    onChange={() => setPriceFilter('over-60')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>$60 and Above</span>
                </label>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="pt-5 mt-5 border-t border-neutral-100">
              <h4 className="text-sm font-bold text-neutral-900 mb-3">
                Availability
              </h4>
              <label className="flex items-center space-x-2.5 text-xs font-medium text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockFilter}
                  onChange={(e) => setInStockFilter(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-blue-600 focus:ring-blue-500 border-neutral-300 cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Sustainability Card at Sidebar Bottom */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5 fill-emerald-600 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 mb-1 leading-snug">
              Google Apparel Made for a Brighter Future
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              High-quality fabrics. Lower environmental impact.
            </p>
            <button
              onClick={() => onSelectCategory('clothing')}
              className="inline-flex items-center text-neutral-800 hover:text-blue-600 transition font-bold text-sm cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Right Product Grid (6 Cards) */}
        <main className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isAdded = addedId === item.id;
              const activeColorName = selectedColors[item.id] || item.colors[0].name;

              return (
                <div
                  key={item.id}
                  id={`apparel-card-${item.id}`}
                  onClick={() => handleCardClick(item)}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Top Image Box with Badges */}
                  <div className="relative aspect-square w-full bg-neutral-50 p-4 flex items-center justify-center overflow-hidden">
                    {/* Badge on Left */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-2xs ${item.badge.bgClass} ${item.badge.textClass}`}>
                        {item.badge.label}
                      </span>
                    </div>

                    {/* In Stock Label on Right */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="text-xs text-neutral-500 font-medium">
                        In Stock
                      </span>
                    </div>

                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain object-center transform group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Review Count */}
                      <div className="flex items-center space-x-1.5 mb-1.5">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-neutral-600 font-semibold">
                          {item.rating} <span className="text-neutral-400 font-normal">({item.reviewCount})</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-base text-neutral-900 group-hover:text-blue-600 transition tracking-tight mb-1">
                        {item.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className="text-lg font-extrabold text-neutral-900">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center space-x-1.5 mb-4" onClick={(e) => e.stopPropagation()}>
                        {item.colors.map(color => {
                          const isSelected = activeColorName === color.name;
                          return (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => {
                                setSelectedColors(prev => ({
                                  ...prev,
                                  [item.id]: color.name
                                }));
                              }}
                              className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                                color.border ? 'border border-neutral-300' : ''
                              } ${
                                isSelected ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110' : 'hover:scale-105 opacity-90'
                              }`}
                              style={{ backgroundColor: color.hex }}
                              aria-label={`Select ${color.name}`}
                              title={color.name}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      id={`apparel-add-btn-${item.id}`}
                      type="button"
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition cursor-pointer shadow-2xs ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
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
        </main>
      </div>

      {/* 4. Bottom Banner: "Why Choose Google Apparel?" */}
      <section 
        id="why-choose-google-apparel-section"
        className="mt-14 rounded-3xl bg-gradient-to-r from-sky-50/80 via-blue-50/30 to-sky-100/60 border border-sky-100 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xs"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-8">
          Why Choose Google Apparel?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 4 Feature Pillars on Left */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Feature 1: Premium Quality */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200/80 flex items-center justify-center text-blue-600 mb-3.5 shadow-2xs">
                <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">
                Premium Quality
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Built for comfort and durability.
              </p>
            </div>

            {/* Feature 2: Sustainable Choices */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200/80 flex items-center justify-center text-blue-600 mb-3.5 shadow-2xs">
                <Leaf className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">
                Sustainable Choices
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Eco-friendly materials and processes.
              </p>
            </div>

            {/* Feature 3: Fast Shipping */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200/80 flex items-center justify-center text-blue-600 mb-3.5 shadow-2xs">
                <Truck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">
                Fast Shipping
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Get your merch delivered quickly.
              </p>
            </div>

            {/* Feature 4: Show Your Support */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200/80 flex items-center justify-center text-blue-600 mb-3.5 shadow-2xs">
                <Heart className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">
                Show Your Support
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Be part of the Google community.
              </p>
            </div>
          </div>

          {/* Right Product Still Life Graphic */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-xs border border-white/60">
              <img 
                src="/apparel-features-merch.jpg" 
                alt="Stacked folded Google hoodie, cap, and tumbler with plant"
                className="w-full h-auto object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
