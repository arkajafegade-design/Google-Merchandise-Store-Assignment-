import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface BestSellersProps {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

// Google "G" 4-color Logo SVG Component
const GoogleGLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const BestSellers: React.FC<BestSellersProps> = ({
  products = PRODUCTS,
  onSelectProduct,
  onViewAll
}) => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('Apparel');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  // Per-card selected swatches
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'g-hoodie-01': 'White',
    'g-tee-02': 'Crisp White',
    'g-tumbler-04': 'Porcelain White',
    'g-socks-05': 'Crisp White'
  });

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'g-hoodie-01': 'M',
    'g-tee-02': 'M',
    'g-tumbler-04': '24 oz (710 ml)',
    'g-socks-05': 'S/M (US 6-9)'
  });

  // Top 4 Featured Popular Products shown in the screenshot
  const featuredProductIds = ['g-hoodie-01', 'g-tee-02', 'g-tumbler-04', 'g-socks-05'];
  const featuredProducts = useMemo(() => {
    return featuredProductIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [products]);

  // Recently Viewed products (Hoodie, Pixel Bottle, Classic Cap, Everyday Backpack)
  const recentlyViewedIds = ['g-hoodie-01', 'g-tumbler-04', 'g-cap-03', 'g-backpack-06'];
  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewedIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [products]);

  // You May Also Like products (Classic Cap, Pixel Bottle, Everyday Backpack, Dino Socks)
  const youMayAlsoLikeIds = ['g-cap-03', 'g-tumbler-04', 'g-backpack-06', 'g-socks-05'];
  const youMayAlsoLikeProducts = useMemo(() => {
    return youMayAlsoLikeIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [products]);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const color = selectedColors[product.id] || product.colors[0]?.name || 'Default';
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : undefined);
    addToCart(product, color, size, 1);
    setAddedSuccessId(product.id);
    setTimeout(() => {
      setAddedSuccessId(null);
    }, 2000);
  };

  const handleColorSelect = (productId: string, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColors(prev => ({ ...prev, [productId]: colorName }));
  };

  const handleSizeSelect = (productId: string, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const categories = ['Apparel', 'Drinkware', 'Bags', 'Accessories'];

  return (
    <section id="popular-products-section" className="py-14 sm:py-20 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ============================================================ */}
        {/* 1. POPULAR PRODUCTS MAIN SECTION                             */}
        {/* ============================================================ */}
        <div>
          {/* Section Header with Google G Logo & Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-start space-x-3 sm:space-x-3.5">
              <GoogleGLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Popular Products
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  The highest-rated apparel, drinkware and accessories chosen by Google enthusiasts worldwide.
                </p>
              </div>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`filter-pill-${cat.toLowerCase()}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border border-blue-400 font-semibold shadow-2xs'
                        : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Featured Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {featuredProducts.map(product => {
              const isLiked = likedProducts.has(product.id);
              const isAdded = addedSuccessId === product.id;
              const activeColorName = selectedColors[product.id] || product.colors[0]?.name;
              const activeSize = selectedSizes[product.id] || product.sizes?.[0];

              // Badge styling logic
              const isLimited = product.badge?.toLowerCase().includes('limited');
              const isPopular = product.badge === 'Popular';

              return (
                <div
                  key={product.id}
                  id={`popular-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-md transition duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  {/* Card Top: Image + Badges + Wishlist */}
                  <div className="relative aspect-square w-full bg-neutral-100/60 p-4 flex items-center justify-center overflow-hidden">
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      {isLimited ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200/80">
                          <span>🔥 Limited Stock</span>
                        </span>
                      ) : isPopular ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          Popular
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200/80">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      id={`wishlist-btn-${product.id}`}
                      onClick={(e) => toggleWishlist(product.id, e)}
                      aria-label="Save to wishlist"
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-red-500 shadow-2xs flex items-center justify-center transition cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 transition ${
                          isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-neutral-600'
                        }`}
                      />
                    </button>

                    {/* Product Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card Body: Details & Actions */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Official Google Merch Badge */}
                      <div className="flex items-center space-x-1.5 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-[11px] font-medium text-neutral-600">
                          Official Google Merch
                        </span>
                      </div>

                      {/* Category Label */}
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        {product.categoryLabel.toUpperCase()}
                      </p>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1.5 mt-1 text-xs text-neutral-600">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="ml-1 font-semibold text-neutral-800">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-neutral-400">
                          ({product.reviewCount > 999 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-2.5">
                        <span className="text-base sm:text-lg font-bold text-neutral-900">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Swatches & Sizes Row */}
                      <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-neutral-100">
                        {/* Color Swatch Dots */}
                        <div className="flex items-center space-x-1.5">
                          {product.colors.map(color => {
                            const isSelected = activeColorName === color.name;
                            return (
                              <button
                                key={color.name}
                                onClick={(e) => handleColorSelect(product.id, color.name, e)}
                                title={color.name}
                                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                                  isSelected
                                    ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110'
                                    : 'border border-neutral-300 hover:scale-110'
                                }`}
                                style={{ backgroundColor: color.hex }}
                              />
                            );
                          })}
                        </div>

                        {/* Size Letters Preview */}
                        {product.sizes && product.sizes.length > 1 && (
                          <div className="flex items-center space-x-1 text-[11px] font-semibold text-neutral-500">
                            {product.sizes.slice(0, 4).map(size => (
                              <button
                                key={size}
                                onClick={(e) => handleSizeSelect(product.id, size, e)}
                                className={`px-1 rounded-xs transition ${
                                  activeSize === size
                                    ? 'text-neutral-900 font-bold bg-neutral-100'
                                    : 'hover:text-neutral-900'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons: Add to Cart + Quick View */}
                    <div className="mt-4 pt-3 flex items-center space-x-2">
                      <button
                        id={`popular-add-to-cart-${product.id}`}
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-900 hover:bg-black text-white active:scale-98'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`popular-quick-view-${product.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 flex items-center justify-center space-x-1.5 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Quick View</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. RECENTLY VIEWED SECTION                                   */}
        {/* ============================================================ */}
        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Recently Viewed
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Keep exploring products you viewed recently.
              </p>
            </div>

            <button
              id="view-all-recently-viewed"
              onClick={onViewAll}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1 transition cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyViewedProducts.map(product => (
              <div
                key={product.id}
                id={`recently-viewed-${product.id}`}
                onClick={() => onSelectProduct(product)}
                className="group p-3 sm:p-3.5 bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-xs transition duration-200 cursor-pointer flex items-center justify-between space-x-3"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-neutral-100/80 p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate group-hover:text-blue-600 transition">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-neutral-800 mt-0.5">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label="Wishlist"
                    className="mt-1 text-neutral-400 hover:text-red-500 transition"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Chevron Link */}
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. YOU MAY ALSO LIKE SECTION                                 */}
        {/* ============================================================ */}
        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                You May Also Like
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Based on your recent views and interests.
              </p>
            </div>

            <button
              id="view-all-you-may-like"
              onClick={onViewAll}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1 transition cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {youMayAlsoLikeProducts.map(product => (
              <div
                key={product.id}
                id={`you-may-like-${product.id}`}
                onClick={() => onSelectProduct(product)}
                className="group p-3 sm:p-3.5 bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-xs transition duration-200 cursor-pointer flex items-center justify-between space-x-3"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-neutral-100/80 p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate group-hover:text-blue-600 transition">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-neutral-800 mt-0.5">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-1 text-[11px] text-amber-500 font-semibold mt-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Chevron Link */}
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
