import React, { useState } from 'react';
import { ShoppingBag, Star, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes ? product.sizes[0] : undefined);
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If product has sizes and there are more than 1 size, open the quick size selector
    if (product.sizes && product.sizes.length > 1 && !showQuickAdd) {
      setShowQuickAdd(true);
      return;
    }

    addToCart(product, selectedColor, selectedSize, 1);
    setAddedSuccess(true);
    setShowQuickAdd(false);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  const handleSizePick = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, selectedColor, size, 1);
    setAddedSuccess(true);
    setShowQuickAdd(false);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 shadow-xs hover:shadow-md transition duration-300 overflow-hidden cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Secondary hover angle image if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
            loading="lazy"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold tracking-tight shadow-xs ${
              product.badge === 'Bestseller' 
                ? 'bg-amber-400 text-neutral-900' 
                : product.badge === 'New Arrival'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-900 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-600 text-white shadow-xs">
              Sale
            </span>
          )}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-neutral-700 shadow-2xs">
            {product.stockCount < 20 ? `Only ${product.stockCount} left` : 'In Stock'}
          </span>
        </div>

        {/* Quick Size Selection Overlay when requested */}
        {showQuickAdd && product.sizes && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-white/95 backdrop-blur-xs p-4 flex flex-col justify-center items-center text-center z-20 animate-fadeIn"
          >
            <p className="text-xs font-bold text-neutral-900 mb-2">Select Size</p>
            <div className="flex flex-wrap justify-center gap-1.5 mb-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  id={`quick-size-btn-${product.id}-${size}`}
                  onClick={(e) => handleSizePick(size, e)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowQuickAdd(false)}
              className="text-[11px] text-neutral-500 hover:text-neutral-800 underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="font-medium text-[11px] uppercase tracking-wider">{product.categoryLabel}</span>
            <div className="flex items-center space-x-1 text-amber-500 font-semibold text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline space-x-1.5">
            <span className="text-base sm:text-lg font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action Button (Add to Cart / View) */}
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-100 hover:bg-neutral-900 text-neutral-800 hover:text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

        {/* Color Swatch Dots Preview */}
        {product.colors && product.colors.length > 1 && (
          <div className="mt-2 flex items-center space-x-1.5">
            {product.colors.map(color => (
              <span
                key={color.name}
                className={`w-2.5 h-2.5 rounded-full border ${
                  selectedColor === color.name ? 'ring-1 ring-offset-1 ring-neutral-700' : 'border-neutral-300'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 font-medium ml-1">
              {product.colors.length} colors
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
