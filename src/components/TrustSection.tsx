import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Leaf } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      title: 'Free Shipping Over $50',
      description: 'Standard trackable delivery anywhere in the US. Express 2-day options available at checkout.'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-emerald-600" />,
      title: '30-Day Return Guarantee',
      description: 'Try it on at home. Hassle-free exchanges and instant refunds with prepaid return labels.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: '100% Genuine Google Store',
      description: 'Official merchandise created in partnership with Google design teams in Mountain View.'
    },
    {
      icon: <Leaf className="w-6 h-6 text-teal-600" />,
      title: 'Sustainable Materials',
      description: 'GOTS-certified organic cotton, recycled ocean-bound plastics, and 100% recyclable packaging.'
    }
  ];

  return (
    <section className="py-12 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center mb-3.5 border border-neutral-100">
                {pillar.icon}
              </div>
              <h4 className="text-base font-bold text-neutral-900 mb-1">
                {pillar.title}
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
