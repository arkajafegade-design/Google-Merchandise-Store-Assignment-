import React, { useState } from 'react';
import { 
  Activity, 
  X, 
  Trash2, 
  Copy, 
  Check, 
  ChevronRight, 
  Layers, 
  BarChart3, 
  Code, 
  TrendingUp,
  Info
} from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';
import { GA4EventLog } from '../types';

export const GA4Inspector: React.FC = () => {
  const { 
    events, 
    funnelStats, 
    isInspectorOpen, 
    setIsInspectorOpen, 
    clearEvents 
  } = useAnalytics();

  const [selectedEvent, setSelectedEvent] = useState<GA4EventLog | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'funnel'>('events');
  const [copied, setCopied] = useState(false);

  if (!isInspectorOpen) return null;

  const handleCopyJSON = (data: any) => {
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // PRD Baseline Numbers from Section 2 & 3
  const baseline = {
    views: 16737,
    addToCart: 4059, // 24.25%
    checkout: 2180, // 13.02%
    purchases: 1065 // 6.36%
  };

  const currentCartConv = funnelStats.productViews > 0 
    ? ((funnelStats.addToCarts / funnelStats.productViews) * 100).toFixed(1) 
    : '0.0';

  const currentCheckoutConv = funnelStats.addToCarts > 0 
    ? ((funnelStats.checkoutStarts / funnelStats.addToCarts) * 100).toFixed(1) 
    : '0.0';

  const currentPurchaseConv = funnelStats.checkoutStarts > 0 
    ? ((funnelStats.purchases / funnelStats.checkoutStarts) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-xl bg-neutral-900 text-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                GA4 Ecommerce Inspector
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                  Live Stream
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                PRD Section 9 & 10 Event Telemetry & Funnel Validation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={clearEvents}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition"
              title="Clear logged events"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              id="close-ga4-inspector-btn"
              onClick={() => setIsInspectorOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'events' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Event Stream ({events.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('funnel')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'funnel' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Funnel & Baseline Comparison</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
          
          {activeTab === 'events' && (
            <div className="space-y-3">
              {events.length === 0 ? (
                <div className="text-center py-16 space-y-3 text-neutral-500">
                  <Activity className="w-10 h-10 mx-auto text-neutral-600" />
                  <p className="text-xs">No ecommerce events tracked in this session yet.</p>
                  <p className="text-[11px] text-neutral-600">
                    Interact with the store (view products, add to cart, click promotions, checkout) to verify event payload generation!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {events.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={`p-3 rounded-xl border transition cursor-pointer text-xs ${
                        selectedEvent?.id === evt.id
                          ? 'border-emerald-500/80 bg-neutral-800/90'
                          : 'border-neutral-800 bg-neutral-950/70 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-emerald-400">
                          {evt.eventName}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {evt.timestamp}
                        </span>
                      </div>

                      {/* Brief payload glance */}
                      <div className="text-[11px] text-neutral-400 line-clamp-1 font-mono">
                        {evt.params.value ? `value: $${evt.params.value.toFixed(2)} • ` : ''}
                        {evt.params.items ? `${evt.params.items.length} items` : ''}
                        {evt.params.promotion_name ? `promo: ${evt.params.promotion_name}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Event Payload Inspector Drawer */}
              {selectedEvent && (
                <div className="mt-4 p-4 rounded-xl bg-black border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      Payload: {selectedEvent.eventName}
                    </span>
                    <button
                      onClick={() => handleCopyJSON(selectedEvent.params)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono transition"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-neutral-300 overflow-x-auto p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 max-h-56">
                    {JSON.stringify(selectedEvent.params, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'funnel' && (
            <div className="space-y-6 text-xs">
              {/* Research Baseline Comparison Table (from PRD Section 2 & 3) */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center space-x-2 text-white font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Redesign Conversion vs. GA4 Baseline</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Tracking progression through the 4 critical funnel stages identified in research:
                </p>

                <div className="space-y-3 pt-2">
                  {/* Step 1: Product Views */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span>1. Product Page Views (`view_item`)</span>
                      <span className="font-mono font-bold text-white">{funnelStats.productViews} (Research: 16,737)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-full"></div>
                    </div>
                  </div>

                  {/* Step 2: Add to Cart */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span>2. Add to Cart (`add_to_cart`)</span>
                      <span className="font-mono font-bold text-emerald-400">{funnelStats.addToCarts} (Conv: {currentCartConv}%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(10, (funnelStats.addToCarts / Math.max(1, funnelStats.productViews)) * 100))}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-neutral-500">Baseline research: 4,059 users (24.2% view-to-cart conversion)</p>
                  </div>

                  {/* Step 3: Checkout Starts */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span>3. Checkout Starts (`begin_checkout`)</span>
                      <span className="font-mono font-bold text-yellow-400">{funnelStats.checkoutStarts}</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-yellow-500 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(10, (funnelStats.checkoutStarts / Math.max(1, funnelStats.addToCarts)) * 100))}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-neutral-500">Baseline research: 2,180 users began checkout</p>
                  </div>

                  {/* Step 4: Purchases */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span>4. Completed Purchases (`purchase`)</span>
                      <span className="font-mono font-bold text-emerald-300">{funnelStats.purchases} (Total: ${funnelStats.totalRevenue.toFixed(2)})</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(10, (funnelStats.purchases / Math.max(1, funnelStats.checkoutStarts)) * 100))}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-neutral-500">Baseline research: 1,065 purchases (48.8% checkout completion)</p>
                  </div>
                </div>
              </div>

              {/* Promotions Metrics (PRD Section 10) */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-neutral-400">
                  Promotion Attribution Telemetry (Section 10)
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-[11px] text-neutral-400 block">Promo Impressions (`view_promotion`)</span>
                    <span className="font-mono text-lg font-bold text-white">{funnelStats.promoViews}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="text-[11px] text-neutral-400 block">Promo Clicks (`select_promotion`)</span>
                    <span className="font-mono text-lg font-bold text-emerald-400">{funnelStats.promoClicks}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <span>DataLayer sync: <strong className="text-emerald-400">Active</strong></span>
          <button
            onClick={() => setIsInspectorOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
