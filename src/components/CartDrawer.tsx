import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Lock, 
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onNavigateHome: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onNavigateHome
}) => {
  const {
    items,
    itemCount,
    subtotal,
    discountCode,
    discountRate,
    discountAmount,
    shippingCost,
    tax,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    isCartOpen,
    setIsCartOpen,
    appliedPromoError,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const { trackBeginCheckout } = useAnalytics();
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    trackBeginCheckout(items, total);
    setIsCartOpen(false);
    onOpenCheckout();
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer Panel (CART-07 mobile responsive) */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900">
              Shopping Bag ({itemCount})
            </h2>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (CART-04) */}
        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-neutral-800 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              {amountNeededForFreeShipping > 0 ? (
                <>Add <strong className="text-blue-600 font-bold">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Express Shipping</>
              ) : (
                <span className="text-emerald-600 font-bold">You unlocked Free Express Shipping!</span>
              )}
            </span>
            <span className="text-[11px] font-mono text-neutral-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingProgress >= 100 ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List (CART-01, CART-03) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Explore official Google hoodies, Pixel tumblers, and accessories.
                </p>
              </div>
              <button
                id="cart-empty-browse-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateHome();
                }}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition"
              >
                <span>Discover Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-neutral-100">
              {items.map(item => (
                <div key={item.id} className="pt-3 first:pt-0 flex space-x-3.5">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          id={`remove-item-${item.id}`}
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Color: <span className="text-neutral-700 font-medium">{item.selectedColor}</span>
                        {item.selectedSize && (
                          <> • Size: <span className="text-neutral-700 font-medium">{item.selectedSize}</span></>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Modifier (CART-03) */}
                      <div className="inline-flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-1 py-0.5">
                        <button
                          id={`qty-minus-${item.id}`}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-plus-${item.id}`}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total line price */}
                      <span className="text-xs sm:text-sm font-bold text-neutral-900">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Breakdown (CART-02, CART-05) */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. GOOGLE20)"
                    className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 uppercase font-mono font-medium focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition"
                >
                  Apply
                </button>
              </div>

              {discountCode && (
                <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <span className="font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Code '{discountCode}' applied ({discountRate * 100}% off)
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-neutral-400 hover:text-red-600 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {appliedPromoError && (
                <p className="text-[11px] text-red-600">{appliedPromoError}</p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo Savings</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-emerald-600">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                <span>Total Due</span>
                <span className="text-base text-neutral-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Proceed to Checkout CTA (CART-02) */}
            <button
              id="cart-proceed-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-neutral-900 hover:bg-neutral-800 transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee (CART-05) */}
            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>256-bit SSL Encrypted • Fast Guest Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
