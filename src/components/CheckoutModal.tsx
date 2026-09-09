import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Lock, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { ShippingAddress, ShippingMethod, ShippingMethodId, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderComplete
}) => {
  const { 
    items, 
    subtotal, 
    discountCode, 
    discountAmount, 
    shippingCost, 
    tax, 
    total, 
    clearCart 
  } = useCart();

  const { 
    trackAddShippingInfo, 
    trackAddPaymentInfo, 
    trackPurchase 
  } = useAnalytics();

  // Form State (CO-07: preserved throughout validation)
  const [formData, setFormData] = useState<ShippingAddress>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'CA',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>(
    subtotal >= 50 ? 'standard' : 'standard'
  );

  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'card' | 'paypal'>('gpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1); // 1: Shipping & Details, 2: Delivery Speed, 3: Payment

  if (!isOpen) return null;

  // Shipping Method Definitions (CO-03)
  const shippingMethods: Record<ShippingMethodId, ShippingMethod> = {
    standard: {
      id: 'standard',
      name: 'Standard Ground Delivery',
      estimatedDelivery: '3–5 business days',
      price: subtotal >= 50 || discountCode === 'FREESHIP' ? 0 : 5.00,
      description: 'Carbon-neutral ground transit by FedEx'
    },
    express: {
      id: 'express',
      name: 'Google Campus Express Air',
      estimatedDelivery: '1–2 business days',
      price: 12.00,
      description: 'Priority handling with guaranteed morning delivery'
    }
  };

  const selectedShipping = shippingMethods[shippingMethod];
  const finalShippingCost = selectedShipping.price;
  const finalTotal = Number((subtotal - discountAmount + finalShippingCost + tax).toFixed(2));

  // Quick Demo Autofill Helper
  const handleAutofillDemo = () => {
    setFormData({
      email: 'alex.developer@google.com',
      firstName: 'Alex',
      lastName: 'Chen',
      address: '1600 Amphitheatre Pkwy',
      apartment: 'Bldg 43',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
      country: 'United States',
      phone: '(650) 253-0000'
    });
    setCardNumber('4532 •••• •••• 8821');
    setCardExp('12/28');
    setCardCvc('842');
    setCardName('Alex Chen');
    setErrors({});
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid email address for your receipt';
    }
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.zipCode.trim() || formData.zipCode.length < 5) {
      errs.zipCode = 'Valid 5-digit ZIP code required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: Record<string, string> = {};
    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.length < 12) errs.cardNumber = 'Enter a valid 16-digit card number';
      if (!cardExp) errs.cardExp = 'MM/YY required';
      if (!cardCvc || cardCvc.length < 3) errs.cardCvc = 'CVC required';
      if (!cardName.trim()) errs.cardName = 'Name on card required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToShipping = () => {
    if (validateStep1()) {
      trackAddShippingInfo(selectedShipping.name, items, finalTotal);
      setActiveStep(2);
    }
  };

  const handleNextToPayment = () => {
    trackAddPaymentInfo(paymentMethod, items, finalTotal);
    setActiveStep(3);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card' && !validatePayment()) {
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `G-${Math.floor(100000 + Math.random() * 900000)}`;

    // Track purchase event (AN-04, CO-10)
    trackPurchase(
      generatedOrderId,
      items,
      finalTotal,
      tax,
      finalShippingCost,
      discountCode || undefined
    );

    const completeOrder: OrderDetails = {
      orderId: generatedOrderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      customer: formData,
      items: [...items],
      shippingMethod: selectedShipping,
      paymentMethod,
      subtotal,
      discountAmount,
      discountCode,
      shippingCost: finalShippingCost,
      tax,
      total: finalTotal
    };

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      onOrderComplete(completeOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Checkout Window */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col my-auto max-h-[90vh]">
        
        {/* Header with Step Progress */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                Secure Express Checkout
              </h2>
              <p className="text-[11px] text-neutral-500">
                CO-01 Guest Checkout Enabled • No Account Required
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="autofill-demo-btn"
              onClick={handleAutofillDemo}
              className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 transition"
              title="Fill with test customer info"
            >
              <Zap className="w-3 h-3 text-amber-700" />
              <span>Autofill Test Address</span>
            </button>
            <button
              id="close-checkout-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-step Breadcrumbs Indicator */}
        <div className="bg-neutral-100 px-4 sm:px-6 py-2.5 border-b border-neutral-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-4">
            <span className={`flex items-center space-x-1.5 ${activeStep === 1 ? 'text-blue-600 font-bold' : activeStep > 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${activeStep === 1 ? 'bg-blue-600 text-white' : activeStep > 1 ? 'bg-emerald-600 text-white' : 'bg-neutral-300 text-neutral-700'}`}>
                {activeStep > 1 ? '✓' : '1'}
              </span>
              <span>1. Contact & Address</span>
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />

            <span className={`flex items-center space-x-1.5 ${activeStep === 2 ? 'text-blue-600 font-bold' : activeStep > 2 ? 'text-neutral-900' : 'text-neutral-400'}`}>
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${activeStep === 2 ? 'bg-blue-600 text-white' : activeStep > 2 ? 'bg-emerald-600 text-white' : 'bg-neutral-300 text-neutral-700'}`}>
                {activeStep > 2 ? '✓' : '2'}
              </span>
              <span>2. Shipping Method</span>
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />

            <span className={`flex items-center space-x-1.5 ${activeStep === 3 ? 'text-blue-600 font-bold' : 'text-neutral-400'}`}>
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${activeStep === 3 ? 'bg-blue-600 text-white' : 'bg-neutral-300 text-neutral-700'}`}>
                3
              </span>
              <span>3. Payment</span>
            </span>
          </div>

          <span className="hidden md:inline text-neutral-500 font-normal">
            Total: <strong className="text-neutral-900">${finalTotal.toFixed(2)}</strong>
          </span>
        </div>

        {/* Content Body: Left Form + Right Order Summary (CO-08) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          
          {/* Form Columns */}
          <div className="lg:col-span-7 p-4 sm:p-6 space-y-6">
            
            {/* Express Checkout 1-Tap Google Pay Banner */}
            <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-300">Express 1-Tap Checkout</span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Biometric Secured
                </span>
              </div>

              <button
                type="button"
                id="express-gpay-btn"
                onClick={() => {
                  handleAutofillDemo();
                  setPaymentMethod('gpay');
                  setActiveStep(3);
                }}
                className="w-full py-2.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-sm flex items-center justify-center space-x-2 transition cursor-pointer shadow-xs"
              >
                <span>Pay with</span>
                {/* Google Pay Wordmark */}
                <span className="font-extrabold tracking-tight flex items-center">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                  <span className="text-neutral-900 font-medium ml-1">Pay</span>
                </span>
              </button>
            </div>

            {/* STEP 1: Contact & Delivery Address */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Contact Information</h3>
                  <p className="text-xs text-neutral-500">Order receipts & tracking link will be sent here</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="checkout-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className={`w-full text-xs p-2.5 rounded-xl border ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white'
                    } focus:ring-1 focus:ring-neutral-900`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-bold text-neutral-900">Shipping Address</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      id="checkout-firstname"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Jane"
                      className={`w-full text-xs p-2.5 rounded-xl border ${
                        errors.firstName ? 'border-red-500 bg-red-50' : 'border-neutral-300'
                      }`}
                    />
                    {errors.firstName && <p className="text-[11px] text-red-600 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      id="checkout-lastname"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className={`w-full text-xs p-2.5 rounded-xl border ${
                        errors.lastName ? 'border-red-500 bg-red-50' : 'border-neutral-300'
                      }`}
                    />
                    {errors.lastName && <p className="text-[11px] text-red-600 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    id="checkout-address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="1600 Amphitheatre Pkwy"
                    className={`w-full text-xs p-2.5 rounded-xl border ${
                      errors.address ? 'border-red-500 bg-red-50' : 'border-neutral-300'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">City *</label>
                    <input
                      type="text"
                      id="checkout-city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Mountain View"
                      className={`w-full text-xs p-2.5 rounded-xl border ${
                        errors.city ? 'border-red-500 bg-red-50' : 'border-neutral-300'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                    >
                      <option value="CA">California (CA)</option>
                      <option value="NY">New York (NY)</option>
                      <option value="WA">Washington (WA)</option>
                      <option value="TX">Texas (TX)</option>
                      <option value="IL">Illinois (IL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      id="checkout-zip"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="94043"
                      className={`w-full text-xs p-2.5 rounded-xl border ${
                        errors.zipCode ? 'border-red-500 bg-red-50' : 'border-neutral-300'
                      }`}
                    />
                    {errors.zipCode && <p className="text-[11px] text-red-600 mt-1">{errors.zipCode}</p>}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    id="continue-to-shipping-btn"
                    onClick={handleNextToShipping}
                    className="w-full py-3.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Continue to Shipping Method</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Method Selection (CO-03) */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Select Shipping Speed</h3>
                    <p className="text-xs text-neutral-500">Delivering to {formData.address}, {formData.city}</p>
                  </div>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Standard Shipping */}
                  <label
                    className={`block p-4 rounded-xl border-2 transition cursor-pointer ${
                      shippingMethod === 'standard'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="text-neutral-900 focus:ring-neutral-900"
                        />
                        <div>
                          <p className="text-xs font-bold text-neutral-900">
                            Standard Ground Delivery (3–5 business days)
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            Carbon-neutral delivery by FedEx
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-neutral-900">
                        {subtotal >= 50 || discountCode === 'FREESHIP' ? (
                          <span className="text-emerald-600">FREE</span>
                        ) : (
                          '$5.00'
                        )}
                      </span>
                    </div>
                  </label>

                  {/* Express Shipping */}
                  <label
                    className={`block p-4 rounded-xl border-2 transition cursor-pointer ${
                      shippingMethod === 'express'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="text-neutral-900 focus:ring-neutral-900"
                        />
                        <div>
                          <p className="text-xs font-bold text-neutral-900">
                            Google Campus Express Air (1–2 business days)
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            Priority rush handling with guaranteed delivery window
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-neutral-900">
                        $12.00
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-3 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-3 border border-neutral-300 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    id="continue-to-payment-btn"
                    onClick={handleNextToPayment}
                    className="flex-1 py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Details (CO-04, CO-09) */}
            {activeStep === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Payment Information</h3>
                    <p className="text-xs text-neutral-500">All transactions are encrypted and processed securely</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Edit Shipping
                  </button>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'gpay'
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <span>Google Pay</span>
                    <span className="text-[10px] opacity-80">1-Tap Fast</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'card'
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <span>Credit Card</span>
                    <span className="text-[10px] opacity-80">Visa / MC / Amex</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'paypal'
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <span>PayPal</span>
                    <span className="text-[10px] opacity-80">Buyer Protection</span>
                  </button>
                </div>

                {/* Card input fields when credit card is selected */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 animate-fadeIn">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">Card Number *</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="checkout-cardnumber"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 0000 0000 0000"
                          className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                        />
                        <CreditCard className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
                      </div>
                      {errors.cardNumber && <p className="text-[11px] text-red-600 mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">Expiration *</label>
                        <input
                          type="text"
                          id="checkout-cardexp"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                        />
                        {errors.cardExp && <p className="text-[11px] text-red-600 mt-1">{errors.cardExp}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">CVC Code *</label>
                        <input
                          type="text"
                          id="checkout-cardcvc"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                        />
                        {errors.cardCvc && <p className="text-[11px] text-red-600 mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">Name on Card *</label>
                      <input
                        type="text"
                        id="checkout-cardname"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Alex Chen"
                        className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                      />
                      {errors.cardName && <p className="text-[11px] text-red-600 mt-1">{errors.cardName}</p>}
                    </div>
                  </div>
                )}

                {paymentMethod === 'gpay' && (
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Google Pay Instant Authorization
                    </p>
                    <p className="text-neutral-600">
                      Your default payment method and shipping address from your Google Account will be charged safely without exposing card numbers.
                    </p>
                  </div>
                )}

                {/* Final Submit CTA Button (CO-09) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="place-order-final-btn"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-extrabold text-sm sm:text-base transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Authorizing & Placing Order...</span>
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order • ${finalTotal.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-neutral-400 mt-2">
                    By placing your order, you agree to the Google Merchandise Store Terms of Service & Privacy Policy.
                  </p>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Order Summary (CO-08) */}
          <div className="lg:col-span-5 bg-neutral-50/90 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-neutral-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Item list preview */}
            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-neutral-200/60 pr-1">
              {items.map(item => (
                <div key={item.id} className="pt-2.5 first:pt-0 flex items-center space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-neutral-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-neutral-500">
                      Qty: {item.quantity} • {item.selectedColor} {item.selectedSize ? `/ ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 shrink-0">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo Code ({discountCode})</span>
                  <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({selectedShipping.name})</span>
                <span className="font-medium text-neutral-900">
                  {finalShippingCost === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `$${finalShippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex justify-between text-base font-black text-neutral-900">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Guarantee notice */}
            <div className="p-3 rounded-xl bg-white border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
              <p className="font-bold text-neutral-900 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                Estimated Delivery Date:
              </p>
              <p className="text-neutral-500">
                {selectedShipping.id === 'express' ? 'Delivered in 1–2 business days' : 'Delivered in 3–5 business days'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
