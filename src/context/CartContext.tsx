import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useAnalytics } from './AnalyticsContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountCode: string;
  discountRate: number;
  discountAmount: number;
  shippingCost: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedPromoError: string | null;
  addedItemToast: CartItem | null;
  setAddedItemToast: (item: CartItem | null) => void;
  addToCart: (product: Product, color: string, size?: string, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 50.0;
const STANDARD_SHIPPING_RATE = 5.0;
const TAX_RATE = 0.0825; // 8.25% California state/local avg

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { trackAddToCart } = useAnalytics();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gstore_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>(() => {
    return localStorage.getItem('gstore_promo_code') || '';
  });

  const [discountRate, setDiscountRate] = useState<number>(() => {
    const saved = localStorage.getItem('gstore_promo_rate');
    return saved ? parseFloat(saved) : 0;
  });

  const [appliedPromoError, setAppliedPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [addedItemToast, setAddedItemToast] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gstore_cart_items', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('gstore_promo_code', discountCode);
      localStorage.setItem('gstore_promo_rate', discountRate.toString());
    } catch {
      // ignore
    }
  }, [discountCode, discountRate]);

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Number(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2));
  const discountAmount = Number((subtotal * discountRate).toFixed(2));
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  // Free shipping over $50 or if FREESHIP coupon used
  const isFreeShipping = discountCode.toUpperCase() === 'FREESHIP' || subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_RATE;
  const tax = Number((discountedSubtotal * TAX_RATE).toFixed(2));
  const total = Number((discountedSubtotal + shippingCost + tax).toFixed(2));
  const amountNeededForFreeShipping = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)));

  const addToCart = (product: Product, color: string, size?: string, quantity: number = 1) => {
    const id = `${product.id}-${color.replace(/\s+/g, '-').toLowerCase()}-${size || 'default'}`;

    let newItem: CartItem;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(it => it.id === id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        newItem = updated[existingIndex];
        return updated;
      } else {
        newItem = {
          id,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          unitPrice: product.price
        };
        return [...prevItems, newItem];
      }
    });

    const itemForAnalytics: CartItem = {
      id,
      productId: product.id,
      product,
      selectedColor: color,
      selectedSize: size,
      quantity,
      unitPrice: product.price
    };

    trackAddToCart(itemForAnalytics);

    // Show instant feedback toast & preview
    setAddedItemToast(itemForAnalytics);
    setTimeout(() => {
      setAddedItemToast(null);
    }, 4000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((it): it is CartItem => it !== null);
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GOOGLE20') {
      setDiscountCode('GOOGLE20');
      setDiscountRate(0.20);
      setAppliedPromoError(null);
      return true;
    } else if (clean === 'FREESHIP') {
      setDiscountCode('FREESHIP');
      setDiscountRate(0);
      setAppliedPromoError(null);
      return true;
    } else if (clean === 'CAMPUS10') {
      setDiscountCode('CAMPUS10');
      setDiscountRate(0.10);
      setAppliedPromoError(null);
      return true;
    } else {
      setAppliedPromoError('Invalid promo code. Try "GOOGLE20" for 20% off or "FREESHIP".');
      return false;
    }
  };

  const removePromoCode = () => {
    setDiscountCode('');
    setDiscountRate(0);
    setAppliedPromoError(null);
  };

  const clearCart = () => {
    setItems([]);
    removePromoCode();
    try {
      localStorage.removeItem('gstore_cart_items');
      localStorage.removeItem('gstore_promo_code');
      localStorage.removeItem('gstore_promo_rate');
    } catch {
      // ignore
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountCode,
        discountRate,
        discountAmount,
        shippingCost,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isCartOpen,
        setIsCartOpen,
        appliedPromoError,
        addedItemToast,
        setAddedItemToast,
        addToCart,
        updateQuantity,
        removeItem,
        applyPromoCode,
        removePromoCode,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
