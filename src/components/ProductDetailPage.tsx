import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  ChevronRight, 
  Home, 
  Check, 
  AlertCircle, 
  Sparkles,
  Heart,
  Share2
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onNavigateHome: () => void;
  onNavigateCategory: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigateHome,
  onNavigateCategory,
  onSelectProduct
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { trackViewItem } = useAnalytics();

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes ? product.sizes[0] : undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'shipping' | 'reviews'>('description');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Trigger view_item GA4 event on mount / product change (AN-01)
  useEffect(() => {
    trackViewItem(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIdx(0);
    setSelectedColor(product.colors[0]?.name || 'Default');
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
    setQuantity(1);
  }, [product.id, trackViewItem]);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products (same category or bestsellers, excluding current)
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.isBestseller)).slice(0, 4);
  }, [product]);

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-neutral-500 mb-6 flex-wrap gap-y-1">
          <button onClick={onNavigateHome} className="flex items-center space-x-1 hover:text-neutral-900 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigateCategory(product.category)} 
            className="hover:text-neutral-900 capitalize transition"
          >
            {product.categoryLabel}
          </button>
          <span>/</span>
          <span className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: Gallery + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery (PDP-01) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Display Image */}
            <div className="relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={`${product.name} - View ${activeImageIdx + 1}`}
                className="w-full h-full object-cover object-center transition duration-300"
              />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-900 shadow-xs">
                    {product.badge}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-xs">
                    Save ${(product.originalPrice - product.price).toFixed(0)}
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                id="share-product-btn"
                onClick={handleShare}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-sm transition"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -bottom-7 right-0 text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded-sm whitespace-nowrap">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumb-btn-${idx}`}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      activeImageIdx === idx 
                        ? 'border-blue-600 ring-2 ring-blue-100' 
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumb ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Google Eco & Quality Promise Accordion */}
            <div className="hidden sm:grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-center">
                <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-neutral-900">100% Genuine</p>
                <p className="text-[11px] text-neutral-500">Official Google Merch</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-center">
                <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-neutral-900">Fast Dispatch</p>
                <p className="text-[11px] text-neutral-500">Tracked US delivery</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-center">
                <RotateCcw className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-neutral-900">30-Day Returns</p>
                <p className="text-[11px] text-neutral-500">Prepaid return label</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchasing Panel (PDP-02, PDP-03, PDP-04, PDP-05) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Ratings */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.subcategory}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Reviews & Star Rating */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'fill-neutral-200 text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-800">
                  {product.rating} ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex items-baseline justify-between">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-neutral-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* In Stock Availability Badge (PDP-05) */}
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>
                  {product.stockCount < 15 ? `Only ${product.stockCount} left in stock` : 'In Stock • Ready to ship'}
                </span>
              </div>
            </div>

            {/* Color Variant Selector (PDP-03) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">
                  Color: <span className="font-medium text-neutral-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    id={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative p-1 rounded-full border-2 transition ${
                      selectedColor === color.name ? 'border-neutral-900 scale-110 shadow-xs' : 'border-transparent hover:border-neutral-300'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-neutral-300 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Variant Selector & Size Guide (PDP-03, PDP-08) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">
                    Select Size: <span className="font-medium text-neutral-600">{selectedSize}</span>
                  </span>
                  <button
                    id="size-guide-open-btn"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Fit Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      id={`size-btn-${size.toLowerCase()}`}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition text-center ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Main Add to Cart CTA (PDP-04) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Quantity Stepper */}
                <div className="inline-flex items-center rounded-xl border border-neutral-300 bg-white p-1">
                  <button
                    id="qty-decrement-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-neutral-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    id="qty-increment-btn"
                    onClick={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
                    disabled={quantity >= product.stockCount}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button (PDP-04) */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base transition cursor-pointer flex items-center justify-center space-x-2 shadow-md hover:shadow-lg ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-98'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy / View Cart Shortcut */}
              <button
                id="instant-checkout-btn"
                onClick={() => {
                  addToCart(product, selectedColor, selectedSize, quantity);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/80 transition"
              >
                Proceed to Checkout with this item
              </button>
            </div>

            {/* Shipping & Delivery Promise Box (PDP-06, PDP-07) */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-neutral-800">
                  Free standard shipping on orders $50+
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 pl-6">
                Estimated arrival in 3–5 business days with standard shipping. Express overnight options available at checkout.
              </p>
              <div className="flex items-center space-x-2 pt-1 border-t border-neutral-200/60">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>30 days for return or exchange with prepaid shipping label included.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Description, Specs & Materials, Reviews (PDP-09, PDP-11) */}
        <div className="mt-14 pt-8 border-t border-neutral-200">
          <div className="flex border-b border-neutral-200 space-x-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'description' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Description & Highlights
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'materials' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Fabric & Care Specs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'reviews' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Reviews ({product.reviews?.length || 0})
            </button>
          </div>

          <div className="py-6 max-w-3xl">
            {activeTab === 'description' && (
              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                <p>{product.description}</p>
                <div className="pt-2">
                  <h4 className="font-bold text-neutral-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1.5 list-disc pl-5 text-neutral-600">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-3 text-sm text-neutral-700">
                <div>
                  <h4 className="font-bold text-neutral-900">Materials:</h4>
                  <p className="text-neutral-600">{product.materials}</p>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Care Instructions:</h4>
                  <p className="text-neutral-600">{product.care}</p>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Origin & Sustainability:</h4>
                  <p className="text-neutral-600">Produced under fair labor certifications with eco-friendly recycled packaging.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Customer Feedback</h3>
                    <p className="text-xs text-neutral-500">100% verified purchasers from Google Store</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-neutral-900">{product.rating}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Cards List */}
                <div className="space-y-4">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-neutral-900">{rev.author}</span>
                            {rev.verified && (
                              <span className="inline-flex items-center space-x-0.5 text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded-sm font-semibold">
                                <Check className="w-2.5 h-2.5" />
                                <span>Verified Buyer</span>
                              </span>
                            )}
                          </div>
                          <span className="text-neutral-400">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <h5 className="text-xs font-bold text-neutral-900">{rev.title}</h5>
                        <p className="text-xs text-neutral-600">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-500">No reviews yet for this variant.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section (PDP-10) */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                Frequently Bought Together
              </h2>
              <p className="text-xs text-neutral-500">Complimentary Google Store gear</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Mobile Purchase Bar (PDP-12) */}
      {/* Solves the research problem: Mobile product-page drop-off! Keeps CTA visible regardless of scroll depth */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-11 h-11 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 truncate">{product.name}</h4>
            <div className="flex items-baseline space-x-1">
              <span className="text-sm font-extrabold text-neutral-900">${product.price.toFixed(2)}</span>
              {selectedSize && <span className="text-[10px] text-neutral-500">({selectedSize})</span>}
            </div>
          </div>
        </div>

        <button
          id="sticky-mobile-add-cart-btn"
          onClick={handleAddToCart}
          className={`shrink-0 py-2.5 px-5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-md ${
            addedAnimation ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productTitle={product.name}
      />
    </div>
  );
};
