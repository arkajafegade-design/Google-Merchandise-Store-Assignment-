import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GA4EventLog, GA4EventType, Product, CartItem, Promotion } from '../types';

interface FunnelStats {
  productViews: number;
  addToCarts: number;
  checkoutStarts: number;
  purchases: number;
  promoViews: number;
  promoClicks: number;
  totalRevenue: number;
}

interface AnalyticsContextType {
  events: GA4EventLog[];
  funnelStats: FunnelStats;
  isInspectorOpen: boolean;
  setIsInspectorOpen: (open: boolean) => void;
  lastEvent: GA4EventLog | null;
  clearEvents: () => void;
  trackViewItem: (product: Product) => void;
  trackAddToCart: (item: CartItem) => void;
  trackBeginCheckout: (items: CartItem[], total: number) => void;
  trackAddShippingInfo: (shippingTier: string, items: CartItem[], value: number) => void;
  trackAddPaymentInfo: (paymentType: string, items: CartItem[], value: number) => void;
  trackPurchase: (orderId: string, items: CartItem[], value: number, tax: number, shipping: number, coupon?: string) => void;
  trackViewPromotion: (promo: Promotion) => void;
  trackSelectPromotion: (promo: Promotion) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<GA4EventLog[]>(() => {
    try {
      const saved = sessionStorage.getItem('gstore_ga4_events');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [funnelStats, setFunnelStats] = useState<FunnelStats>(() => {
    try {
      const saved = sessionStorage.getItem('gstore_ga4_funnel');
      return saved ? JSON.parse(saved) : {
        productViews: 0,
        addToCarts: 0,
        checkoutStarts: 0,
        purchases: 0,
        promoViews: 0,
        promoClicks: 0,
        totalRevenue: 0
      };
    } catch {
      return {
        productViews: 0,
        addToCarts: 0,
        checkoutStarts: 0,
        purchases: 0,
        promoViews: 0,
        promoClicks: 0,
        totalRevenue: 0
      };
    }
  });

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [lastEvent, setLastEvent] = useState<GA4EventLog | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('gstore_ga4_events', JSON.stringify(events.slice(0, 100)));
      sessionStorage.setItem('gstore_ga4_funnel', JSON.stringify(funnelStats));
    } catch {
      // ignore
    }
  }, [events, funnelStats]);

  const recordEvent = useCallback((eventName: GA4EventType, params: Record<string, any>) => {
    const newLog: GA4EventLog = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      eventName,
      params
    };

    setEvents(prev => [newLog, ...prev]);
    setLastEvent(newLog);

    // Also push to standard window.dataLayer and gtag if they exist
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: eventName,
        ecommerce: params
      });
      if (typeof w.gtag === 'function') {
        w.gtag('event', eventName, params);
      }
      // Console debug log for QA
      console.log(`%c[GA4 Ecommerce] ${eventName}`, 'color: #1a73e8; font-weight: bold;', params);
    }
  }, []);

  const trackViewItem = useCallback((product: Product) => {
    recordEvent('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }
      ]
    });
    setFunnelStats(prev => ({ ...prev, productViews: prev.productViews + 1 }));
  }, [recordEvent]);

  const trackAddToCart = useCallback((item: CartItem) => {
    recordEvent('add_to_cart', {
      currency: 'USD',
      value: item.unitPrice * item.quantity,
      items: [
        {
          item_id: item.product.id,
          item_name: item.product.name,
          item_category: item.product.category,
          item_variant: `${item.selectedColor}${item.selectedSize ? ` / ${item.selectedSize}` : ''}`,
          price: item.unitPrice,
          quantity: item.quantity
        }
      ]
    });
    setFunnelStats(prev => ({ ...prev, addToCarts: prev.addToCarts + item.quantity }));
  }, [recordEvent]);

  const trackBeginCheckout = useCallback((items: CartItem[], total: number) => {
    recordEvent('begin_checkout', {
      currency: 'USD',
      value: total,
      items: items.map(it => ({
        item_id: it.product.id,
        item_name: it.product.name,
        item_category: it.product.category,
        item_variant: `${it.selectedColor}${it.selectedSize ? ` / ${it.selectedSize}` : ''}`,
        price: it.unitPrice,
        quantity: it.quantity
      }))
    });
    setFunnelStats(prev => ({ ...prev, checkoutStarts: prev.checkoutStarts + 1 }));
  }, [recordEvent]);

  const trackAddShippingInfo = useCallback((shippingTier: string, items: CartItem[], value: number) => {
    recordEvent('add_shipping_info', {
      currency: 'USD',
      value,
      shipping_tier: shippingTier,
      items: items.map(it => ({
        item_id: it.product.id,
        item_name: it.product.name,
        price: it.unitPrice,
        quantity: it.quantity
      }))
    });
  }, [recordEvent]);

  const trackAddPaymentInfo = useCallback((paymentType: string, items: CartItem[], value: number) => {
    recordEvent('add_payment_info', {
      currency: 'USD',
      value,
      payment_type: paymentType,
      items: items.map(it => ({
        item_id: it.product.id,
        item_name: it.product.name,
        price: it.unitPrice,
        quantity: it.quantity
      }))
    });
  }, [recordEvent]);

  const trackPurchase = useCallback((orderId: string, items: CartItem[], value: number, tax: number, shipping: number, coupon?: string) => {
    recordEvent('purchase', {
      transaction_id: orderId,
      value,
      tax,
      shipping,
      currency: 'USD',
      coupon: coupon || undefined,
      items: items.map(it => ({
        item_id: it.product.id,
        item_name: it.product.name,
        item_category: it.product.category,
        item_variant: `${it.selectedColor}${it.selectedSize ? ` / ${it.selectedSize}` : ''}`,
        price: it.unitPrice,
        quantity: it.quantity
      }))
    });
    setFunnelStats(prev => ({
      ...prev,
      purchases: prev.purchases + 1,
      totalRevenue: Number((prev.totalRevenue + value).toFixed(2))
    }));
  }, [recordEvent]);

  const trackViewPromotion = useCallback((promo: Promotion) => {
    recordEvent('view_promotion', {
      promotion_id: promo.id,
      promotion_name: promo.name,
      creative_name: promo.creative_name,
      creative_slot: promo.creative_slot,
      location_id: 'featured_carousel'
    });
    setFunnelStats(prev => ({ ...prev, promoViews: prev.promoViews + 1 }));
  }, [recordEvent]);

  const trackSelectPromotion = useCallback((promo: Promotion) => {
    recordEvent('select_promotion', {
      promotion_id: promo.id,
      promotion_name: promo.name,
      creative_name: promo.creative_name,
      creative_slot: promo.creative_slot,
      location_id: 'featured_carousel'
    });
    setFunnelStats(prev => ({ ...prev, promoClicks: prev.promoClicks + 1 }));
  }, [recordEvent]);

  const clearEvents = useCallback(() => {
    setEvents([]);
    setFunnelStats({
      productViews: 0,
      addToCarts: 0,
      checkoutStarts: 0,
      purchases: 0,
      promoViews: 0,
      promoClicks: 0,
      totalRevenue: 0
    });
    try {
      sessionStorage.removeItem('gstore_ga4_events');
      sessionStorage.removeItem('gstore_ga4_funnel');
    } catch {
      // ignore
    }
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        events,
        funnelStats,
        isInspectorOpen,
        setIsInspectorOpen,
        lastEvent,
        clearEvents,
        trackViewItem,
        trackAddToCart,
        trackBeginCheckout,
        trackAddShippingInfo,
        trackAddPaymentInfo,
        trackPurchase,
        trackViewPromotion,
        trackSelectPromotion
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
