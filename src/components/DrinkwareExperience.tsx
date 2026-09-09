import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Star, 
  Leaf, 
  ShieldCheck, 
  Heart,
  ChevronDown,
  Home
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface DrinkwareExperienceProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateHome?: () => void;
}

interface DrinkwareDisplayCard {
  id: string;
  name: string;
  tagline: string;
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

export const DrinkwareExperience: React.FC<DrinkwareExperienceProps> = ({
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
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);
  const [inStockFilter, setInStockFilter] = useState<boolean>(false);
  const [showMoreColors, setShowMoreColors] = useState<boolean>(false);

  // Selected color per card
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'g-tumbler-04': 'Porcelain White',
    'g-drinkware-tumbler-02': 'Forest Green',
    'g-drinkware-mug-03': 'Porcelain White',
    'g-drinkware-glass-04': 'Clear Glass',
    'g-drinkware-travel-05': 'Stealth Black',
    'g-drinkware-kids-06': 'Electric Blue'
  });

  // The 6 exact drinkware items from the design
  const drinkwareItems: DrinkwareDisplayCard[] = [
    {
      id: 'g-tumbler-04',
      name: 'Google Bottle',
      tagline: 'Stay refreshed with double-wall insulated...',
      price: 32.00,
      rating: 4.9,
      reviewCount: 156,
      badge: {
        label: 'Bestseller',
        bgClass: 'bg-amber-400',
        textClass: 'text-neutral-900 font-bold'
      },
      image: '/products/pixel-bottle.jpg',
      colors: [
        { name: 'Porcelain White', hex: '#ffffff', border: true },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Google Red', hex: '#dc2626' }
      ],
      inStock: true
    },
    {
      id: 'g-drinkware-tumbler-02',
      name: 'Google Tumbler',
      tagline: 'Keep drinks hot or cold with a sleek design.',
      price: 28.00,
      rating: 4.8,
      reviewCount: 102,
      badge: {
        label: 'Eco Friendly',
        bgClass: 'bg-emerald-600',
        textClass: 'text-white'
      },
      image: '/products/google-tumbler.jpg',
      colors: [
        { name: 'Forest Green', hex: '#15803d' },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Steel Grey', hex: '#64748b' }
      ],
      inStock: true
    },
    {
      id: 'g-drinkware-mug-03',
      name: 'Google Mug',
      tagline: 'Classic ceramic mug with a clean design.',
      price: 18.00,
      originalPrice: 24.00,
      rating: 4.6,
      reviewCount: 87,
      badge: {
        label: 'Sale',
        bgClass: 'bg-rose-600',
        textClass: 'text-white'
      },
      image: '/products/google-ceramic-mug.jpg',
      colors: [
        { name: 'Porcelain White', hex: '#ffffff', border: true },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Slate Grey', hex: '#64748b' }
      ],
      inStock: true
    },
    {
      id: 'g-drinkware-glass-04',
      name: 'Google Glass Water Bottle',
      tagline: 'Borosilicate glass with bamboo lid.',
      price: 28.00,
      rating: 4.7,
      reviewCount: 73,
      badge: {
        label: 'Eco Friendly',
        bgClass: 'bg-emerald-600',
        textClass: 'text-white'
      },
      image: '/products/google-glass-bottle.jpg',
      colors: [
        { name: 'Clear Glass', hex: '#ffffff', border: true },
        { name: 'Black', hex: '#111827' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Slate Grey', hex: '#9ca3af' }
      ],
      inStock: true
    },
    {
      id: 'g-drinkware-travel-05',
      name: 'Google Travel Tumbler',
      tagline: 'Perfect for work, travel and on the go.',
      price: 36.00,
      rating: 4.8,
      reviewCount: 66,
      badge: {
        label: 'Fan Favorite',
        bgClass: 'bg-purple-600',
        textClass: 'text-white'
      },
      image: '/products/google-travel-tumbler.jpg',
      colors: [
        { name: 'Stealth Black', hex: '#111827' },
        { name: 'Charcoal Grey', hex: '#64748b' },
        { name: 'Google Blue', hex: '#2563eb' },
        { name: 'Google Green', hex: '#16a34a' }
      ],
      inStock: true
    },
    {
      id: 'g-drinkware-kids-06',
      name: 'Google Kids Bottle',
      tagline: 'Durable, lightweight and easy to carry.',
      price: 22.00,
      rating: 4.5,
      reviewCount: 48,
      badge: {
        label: 'New Arrival',
        bgClass: 'bg-blue-600',
        textClass: 'text-white'
      },
      image: '/products/google-kids-bottle.jpg',
      colors: [
        { name: 'Electric Blue', hex: '#2563eb' },
        { name: 'Bubblegum Pink', hex: '#ec4899' },
        { name: 'Grass Green', hex: '#16a34a' },
        { name: 'Sunny Yellow', hex: '#eab308' }
      ],
      inStock: true
    }
  ];

  // Available colors list for sidebar filter
  const colorFilterOptions = [
    { label: 'White', hex: '#ffffff', border: true },
    { label: 'Black', hex: '#111827' },
    { label: 'Blue', hex: '#2563eb' },
    { label: 'Green', hex: '#16a34a' },
    { label: 'Red', hex: '#dc2626' },
    { label: 'Silver', hex: '#9ca3af' },
    ...(showMoreColors ? [
      { label: 'Pink', hex: '#ec4899' },
      { label: 'Yellow', hex: '#eab308' }
    ] : [])
  ];

  // Filter & sort logic
  const filteredItems = drinkwareItems.filter(item => {
    if (inStockFilter && !item.inStock) return false;
    if (priceFilter === 'under-30') return item.price < 30;
    if (priceFilter === '30-60') return item.price >= 30 && item.price <= 60;
    if (priceFilter === 'over-60') return item.price > 60;
    if (selectedColorFilter) {
      const match = item.colors.some(c => 
        c.name.toLowerCase().includes(selectedColorFilter.toLowerCase())
      );
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'price-asc') return a.price - b.price;
    if (selectedSort === 'price-desc') return b.price - a.price;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return 0; // default bestsellers
  });

  const handleAddToCart = (item: DrinkwareDisplayCard, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = products.find(p => p.id === item.id) || {
      id: item.id,
      slug: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      tagline: item.tagline,
      price: item.price,
      originalPrice: item.originalPrice,
      category: 'drinkware',
      categoryLabel: 'Drinkware',
      badge: item.badge.label,
      isBestseller: true,
      inStock: true,
      stockCount: 30,
      rating: item.rating,
      reviewCount: item.reviewCount,
      images: [item.image],
      colors: item.colors.map(c => ({ name: c.name, hex: c.hex })),
      sizes: ['One Size'],
      description: 'Official Google Campus Drinkware crafted for premium hydration and daily durability.',
      features: ['Double-wall insulation', 'BPA-free sustainable materials', 'Iconic Google branding'],
      materials: 'Stainless Steel & Food-grade Silicone',
      care: 'Hand wash recommended.'
    } as Product;

    const color = selectedColors[item.id] || item.colors[0].name;
    addToCart(product, color, 'One Size');
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  const handleCardClick = (item: DrinkwareDisplayCard) => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      trackProductView(product);
      onSelectProduct(product);
    }
  };

  const scrollToGrid = () => {
    const gridEl = document.getElementById('drinkware-products-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Banner */}
      <section 
        id="drinkware-hero-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50/50 via-neutral-50 to-sky-50/40 border border-neutral-200/90 shadow-2xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 z-10">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-2">
              GOOGLE MERCHANDISE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight mb-2">
              Drinkware
            </h1>
            <p className="text-lg sm:text-xl font-bold text-neutral-800 mb-3">
              Hydrate. Stay inspired.
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md mb-6">
              From water bottles to tumblers, find the perfect Google drinkware for your everyday adventures.
            </p>
            <button
              id="drinkware-shop-all-cta"
              onClick={scrollToGrid}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm cursor-pointer"
            >
              <span>Shop All Drinkware</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-7 h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] relative overflow-hidden flex items-center justify-end">
            <img 
              src="/drinkware-hero-banner.jpg" 
              alt="Google water bottles, tumblers, and mugs with Stay Refreshed Stay Google lettering" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent lg:hidden pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 2. Collection Title & Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Our Drinkware Collection
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Sustainable. Stylish. Everyday essentials.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <label htmlFor="drinkware-sort-select" className="sr-only">Sort drinkware</label>
          <div className="relative inline-flex items-center">
            <select
              id="drinkware-sort-select"
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
      <div id="drinkware-products-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                  <span className="text-xs text-neutral-400 font-semibold">16</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('clothing')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition font-medium cursor-pointer"
                >
                  <span>Apparel</span>
                  <span className="text-xs text-neutral-400 font-semibold">4</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('drinkware')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold transition cursor-pointer shadow-2xs"
                >
                  <span>Drinkware</span>
                  <span className="text-xs text-blue-100 font-bold">3</span>
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
                    name="drinkware-price"
                    checked={priceFilter === 'all'}
                    onChange={() => setPriceFilter('all')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>All Prices</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="drinkware-price"
                    checked={priceFilter === 'under-30'}
                    onChange={() => setPriceFilter('under-30')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>Under $30</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="drinkware-price"
                    checked={priceFilter === '30-60'}
                    onChange={() => setPriceFilter('30-60')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>$30 to $60</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="drinkware-price"
                    checked={priceFilter === 'over-60'}
                    onChange={() => setPriceFilter('over-60')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>$60 and Above</span>
                </label>
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-5 mt-5 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-neutral-900">
                  Color
                </h4>
                {selectedColorFilter && (
                  <button
                    onClick={() => setSelectedColorFilter(null)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2 text-xs font-medium text-neutral-700">
                {colorFilterOptions.map(color => (
                  <button
                    key={color.label}
                    type="button"
                    onClick={() => setSelectedColorFilter(selectedColorFilter === color.label ? null : color.label)}
                    className={`w-full flex items-center space-x-2.5 px-1 py-1 rounded-md transition text-left cursor-pointer ${
                      selectedColorFilter === color.label ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <span 
                      className={`w-3.5 h-3.5 rounded-full inline-block shrink-0 ${color.border ? 'border border-neutral-300' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowMoreColors(!showMoreColors)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold pt-1 block cursor-pointer"
                >
                  {showMoreColors ? 'Show less' : '+ More'}
                </button>
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
        </aside>

        {/* Right Product Grid (6 Drinkware Cards) */}
        <main className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isAdded = addedId === item.id;
              const activeColorName = selectedColors[item.id] || item.colors[0].name;

              return (
                <div
                  key={item.id}
                  id={`drinkware-card-${item.id}`}
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

                      {/* Tagline / Subtitle */}
                      <p className="text-xs text-neutral-500 line-clamp-1 mb-2">
                        {item.tagline}
                      </p>

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
                      id={`drinkware-add-btn-${item.id}`}
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

      {/* 4. Bottom Banner: "Make a Greener Choice" */}
      <section 
        id="make-a-greener-choice-section"
        className="mt-14 rounded-3xl bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-green-50/70 border border-emerald-100 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xs"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title and CTA */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4 shadow-2xs">
              <Leaf className="w-6 h-6 fill-emerald-600 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2">
              Make a Greener Choice
            </h2>
            <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
              Eco-friendly drinkware for a brighter future.
            </p>
            <button
              onClick={() => onSelectCategory('drinkware')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs sm:text-sm transition shadow-2xs cursor-pointer"
            >
              <span>Shop Sustainable</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Middle 3 Feature Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-emerald-200/60">
            {/* Pillar 1: Sustainable Materials */}
            <div className="pt-4 sm:pt-0 sm:pr-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-center text-emerald-600 mb-2.5 shadow-2xs">
                <Leaf className="w-5 h-5 fill-emerald-600 text-emerald-600" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 mb-1">
                Sustainable Materials
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Recycled & responsibly sourced.
              </p>
            </div>

            {/* Pillar 2: Durable & Long-Lasting */}
            <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-center text-blue-600 mb-2.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 mb-1">
                Durable & Long-Lasting
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Built for everyday use.
              </p>
            </div>

            {/* Pillar 3: Good for the Planet */}
            <div className="pt-4 sm:pt-0 sm:pl-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-center text-blue-600 mb-2.5 shadow-2xs">
                <Heart className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 mb-1">
                Good for the Planet
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Small choices. Big impact.
              </p>
            </div>
          </div>

          {/* Right Product Still Life Graphic */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="relative max-w-[240px] rounded-3xl overflow-hidden shadow-xs border border-white/80">
              <img 
                src="/eco-drinkware.jpg" 
                alt="Green insulated drinkware surrounded by lush tropical plant leaves"
                className="w-full h-auto object-cover rounded-3xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
