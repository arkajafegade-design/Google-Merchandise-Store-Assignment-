import React from 'react';
import { ShieldCheck, Heart, ArrowUpRight, Activity } from 'lucide-react';
import { ProductCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome
}) => {
  const { setIsInspectorOpen } = useAnalytics();

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-2 text-left"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-neutral-900 text-sm shadow-xs">
                <span className="text-[#4285F4]">G</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Google <span className="text-neutral-400 font-normal">Merchandise Store</span>
              </span>
            </button>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Official merchandise from the Google Store. Designed in Mountain View, California with certified organic cotton, recycled ocean plastics, and carbon-neutral distribution.
            </p>

            <div className="pt-2">
              <button
                id="footer-ga4-inspector-trigger"
                onClick={() => setIsInspectorOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-emerald-400 border border-neutral-700 transition cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open GA4 Analytics Inspector</span>
              </button>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => onSelectCategory('apparel')}
                  className="hover:text-white transition"
                >
                  Apparel & Fleeces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('drinkware')}
                  className="hover:text-white transition"
                >
                  Drinkware & Tumblers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bags')}
                  className="hover:text-white transition"
                >
                  Backpacks & Totes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lifestyle')}
                  className="hover:text-white transition"
                >
                  Lifestyle & Novelty
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('stationery')}
                  className="hover:text-white transition"
                >
                  Office & Stationery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('new-arrivals')}
                  className="text-blue-400 hover:text-blue-300 transition font-semibold"
                >
                  New Arrivals (Spring 2026)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Track Order Status
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Shipping & Free Returns Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Apparel Size & Fit Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Google Sustainability Pledges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Help Center & FAQs
                </span>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Store Credentials
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% Genuine Authorized Google Merchandise</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                1600 Amphitheatre Parkway, Mountain View, CA 94043
              </p>
              <div className="pt-2 text-[11px] text-neutral-500">
                <span>Accepted Payments: Google Pay, Visa, Mastercard, American Express, PayPal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Google LLC. Google and the Google logo are trademarks of Google LLC.</p>
          <div className="flex space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
