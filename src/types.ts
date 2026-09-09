export type ProductCategory = 
  | 'all'
  | 'clothing'
  | 'accessories'
  | 'bags'
  | 'drinkware'
  | 'tech-stationery'
  | 'new-arrivals';

export interface ProductColor {
  name: string;
  hex: string;
  imageIdx?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  categoryLabel: string;
  subcategory: string;
  images: string[];
  description: string;
  features: string[];
  materials: string;
  care: string;
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes?: string[]; // e.g. ['XS', 'S', 'M', 'L', 'XL', '2XL']
  badge?: string;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // unique combo key: `${productId}-${color}-${size}`
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
}

export interface Promotion {
  id: string;
  name: string;
  creative_name: string;
  creative_slot: string;
  title: string;
  subtitle: string;
  discountCode: string;
  discountRate: number; // e.g. 0.20 for 20%
  bannerImage: string;
  categoryTarget?: ProductCategory;
  tagline: string;
}

export type GA4EventType =
  | 'view_item'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'add_shipping_info'
  | 'add_payment_info'
  | 'purchase'
  | 'view_promotion'
  | 'select_promotion';

export interface GA4EventLog {
  id: string;
  timestamp: string;
  eventName: GA4EventType;
  params: Record<string, any>;
}

export interface ShippingAddress {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export type ShippingMethodId = 'standard' | 'express';

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  estimatedDelivery: string;
  price: number;
  description: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customer: ShippingAddress;
  items: CartItem[];
  shippingMethod: ShippingMethod;
  paymentMethod: 'gpay' | 'card' | 'paypal';
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  shippingCost: number;
  tax: number;
  total: number;
}
