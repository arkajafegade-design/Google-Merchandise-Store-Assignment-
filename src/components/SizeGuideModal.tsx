import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  productTitle
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const measurementsInches = [
    { size: 'XS', chest: '34 - 36', length: '27', sleeve: '32.5' },
    { size: 'S', chest: '36 - 38', length: '28', sleeve: '33.5' },
    { size: 'M', chest: '38 - 40', length: '29', sleeve: '34.5' },
    { size: 'L', chest: '42 - 44', length: '30', sleeve: '35.5' },
    { size: 'XL', chest: '46 - 48', length: '31', sleeve: '36.5' },
    { size: '2XL', chest: '50 - 52', length: '32', sleeve: '37.5' }
  ];

  const measurementsCm = [
    { size: 'XS', chest: '86 - 91', length: '68.5', sleeve: '82.5' },
    { size: 'S', chest: '91 - 96', length: '71', sleeve: '85' },
    { size: 'M', chest: '96 - 101', length: '73.5', sleeve: '87.5' },
    { size: 'L', chest: '106 - 111', length: '76', sleeve: '90' },
    { size: 'XL', chest: '116 - 122', length: '78.5', sleeve: '92.5' },
    { size: '2XL', chest: '127 - 132', length: '81', sleeve: '95' }
  ];

  const currentData = unit === 'in' ? measurementsInches : measurementsCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 space-y-5 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-neutral-900">Size & Fit Guide</h3>
          </div>
          <button
            id="close-size-guide-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-600">
            For: <strong className="text-neutral-900">{productTitle}</strong>
          </span>

          {/* Unit Toggle */}
          <div className="inline-flex rounded-lg border border-neutral-200 p-0.5 bg-neutral-100 text-xs font-semibold">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-md transition ${unit === 'in' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500'}`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-md transition ${unit === 'cm' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500'}`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
          <table className="min-w-full divide-y divide-neutral-200 text-left text-xs">
            <thead className="bg-neutral-50 font-bold text-neutral-700">
              <tr>
                <th className="px-3.5 py-2.5">Size</th>
                <th className="px-3.5 py-2.5">Chest ({unit})</th>
                <th className="px-3.5 py-2.5">Body Length ({unit})</th>
                <th className="px-3.5 py-2.5">Sleeve ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white text-neutral-600">
              {currentData.map(row => (
                <tr key={row.size} className="hover:bg-neutral-50/80">
                  <td className="px-3.5 py-2 font-bold text-neutral-900">{row.size}</td>
                  <td className="px-3.5 py-2">{row.chest}</td>
                  <td className="px-3.5 py-2">{row.length}</td>
                  <td className="px-3.5 py-2">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit advice */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1">
          <p className="font-bold">Google Apparel Fit Advice:</p>
          <p className="text-neutral-700 leading-relaxed">
            All Google Store garments are cut in standard unisex retail sizing with pre-shrunk organic cotton. If you prefer a tailored fit, select your true size. For a relaxed, streetwear campus fit, order one size up.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition"
        >
          Close Size Guide
        </button>
      </div>
    </div>
  );
};
