import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, Home, ShoppingBag } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderConfirmationProps {
  order: OrderDetails;
  onContinueShopping: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onContinueShopping
}) => {
  return (
    <div className="bg-neutral-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8 animate-fadeIn">
          
          {/* Top Celebration Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-scale">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              Payment Authorized • Order Confirmed
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              Thank you for your order!
            </h1>

            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              We've received your order and sent a confirmation receipt to <strong className="text-neutral-900">{order.customer.email}</strong>.
            </p>
          </div>

          {/* Key Order Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Order Number:</span>
              <span className="font-mono font-bold text-neutral-900 text-sm">{order.orderId}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Date:</span>
              <span className="font-bold text-neutral-900">{order.date}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Payment Method:</span>
              <span className="font-bold text-neutral-900 uppercase">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Total Paid:</span>
              <span className="font-bold text-emerald-700 text-sm font-mono">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Timeline Progress */}
          <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/50 space-y-3">
            <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs sm:text-sm">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Estimated Delivery: {order.shippingMethod.estimatedDelivery}</span>
            </div>
            <p className="text-xs text-neutral-600">
              Your Google campus order will be carefully packed in 100% recyclable, plastic-free materials and dispatched from Mountain View, CA.
            </p>
          </div>

          {/* Order Item List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider text-xs">
              Purchased Items ({order.items.length})
            </h3>
            <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden">
              {order.items.map(item => (
                <div key={item.id} className="p-4 flex items-center space-x-4 bg-white">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-neutral-900 text-sm">{item.product.name}</h4>
                    <p className="text-neutral-500">
                      Color: {item.selectedColor} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                    </p>
                    <p className="text-neutral-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-neutral-900">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
              <h4 className="font-bold text-neutral-900 mb-1">Shipping Destination:</h4>
              <p className="text-neutral-700 font-medium">{order.customer.firstName} {order.customer.lastName}</p>
              <p className="text-neutral-600">{order.customer.address} {order.customer.apartment}</p>
              <p className="text-neutral-600">{order.customer.city}, {order.customer.state} {order.customer.zipCode}</p>
              <p className="text-neutral-600">{order.customer.country}</p>
              {order.customer.phone && <p className="text-neutral-500 pt-1">{order.customer.phone}</p>}
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
              <h4 className="font-bold text-neutral-900 mb-1">Financial Summary:</h4>
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({order.discountCode})</span>
                  <span>-${order.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping ({order.shippingMethod.name})</span>
                <span>{order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Tax (8.25%)</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-neutral-900 text-sm">
                <span>Total Amount</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions: Continue Shopping */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              id="order-confirmation-continue-btn"
              onClick={onContinueShopping}
              className="flex-1 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-3.5 border border-neutral-300 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
