import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  MessageCircle, 
  Sparkles, 
  Info, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';
import { Language, StoreSettings, WallcoveringProduct } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl, generateCalculatorQuoteMessage } from '../utils/whatsapp';

interface AreaCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: WallcoveringProduct[];
  currentLang: Language;
  storeSettings: StoreSettings;
}

export const AreaCalculatorModal: React.FC<AreaCalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
  currentLang,
  storeSettings
}) => {
  const [wallWidth, setWallWidth] = useState<number>(14); // 14m perimeter (e.g. 4m x 3m room)
  const [wallHeight, setWallHeight] = useState<number>(3.0); // 3.0m standard UAE ceiling
  const [wallsCount, setWallsCount] = useState<number>(1);
  const [deductOpenings, setDeductOpenings] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Calculation logic - must be called before any early return to satisfy Rules of Hooks
  const calculation = useMemo(() => {
    const rawPerimeter = Math.max(1, wallWidth) * Math.max(1, wallsCount);
    const height = Math.max(2, wallHeight);
    
    // Continuous seamless wallcovering needs linear meters equal to wall perimeter plus 5% corner/cutting reserve
    const continuousFabricLength = rawPerimeter * 1.05;
    
    // Gross area
    let grossArea = rawPerimeter * height;
    if (deductOpenings) {
      grossArea = grossArea * 0.85; // 15% deduction for doors/windows
    }
    const netArea = Math.max(1, grossArea);

    // Roll length assumption: each roll is typically 50 linear meters
    const rollCapacityMeters = selectedProduct?.specs?.rollLength || 50;
    const rollsRecommended = Math.ceil(continuousFabricLength / rollCapacityMeters);

    // Cost estimation based on product price per sq.m
    const pricePerSqm = selectedProduct?.pricePerSqmAED || 25;
    const estimatedCost = Math.round(netArea * pricePerSqm);

    return {
      netArea,
      continuousFabricLength,
      rollsRecommended,
      estimatedCost
    };
  }, [wallWidth, wallHeight, wallsCount, deductOpenings, selectedProduct]);

  if (!isOpen) return null;

  const t = translations[currentLang];

  const handleSendToWhatsApp = () => {
    const msg = generateCalculatorQuoteMessage({
      width: wallWidth,
      height: wallHeight,
      wallsCount,
      totalArea: calculation.netArea,
      fabricLength: calculation.continuousFabricLength,
      rollsRecommended: calculation.rollsRecommended,
      estimatedCost: calculation.estimatedCost,
      selectedProductCode: selectedProduct?.code,
      lang: currentLang
    });

    const url = formatWhatsAppUrl(storeSettings.whatsappNumber, msg);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-950 via-stone-900 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {t.calcTitle}
              </h3>
              <p className="text-xs text-amber-200/80">
                UAE Standard Height (2.8m - 3.2m Seamless Fabric)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Input Column */}
            <div className="md:col-span-6 space-y-4">
              {/* Product selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  {currentLang === 'ar' ? 'اختر الموديل أو القماش المرغوب:' : currentLang === 'zh' ? '选择目标墙布型号:' : 'Select Target Wallcovering:'}
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                >
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.code} - {currentLang === 'ar' ? prod.nameAr : currentLang === 'zh' ? prod.nameZh : prod.nameEn} ({prod.pricePerSqmAED} AED/m²)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dimensions Input */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span className="font-semibold">{t.wallWidth}:</span>
                    <span className="font-mono font-bold text-amber-900">{wallWidth} m</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="100"
                    step="0.5"
                    value={wallWidth}
                    onChange={(e) => setWallWidth(parseFloat(e.target.value))}
                    className="w-full accent-amber-700"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>3m (Single Wall)</span>
                    <span>25m (Villa Hall)</span>
                    <span>100m+ (Palace)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span className="font-semibold">{t.wallHeight}:</span>
                    <span className="font-mono font-bold text-amber-900">{wallHeight} m</span>
                  </div>
                  <input
                    type="range"
                    min="2.4"
                    max="3.8"
                    step="0.1"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(parseFloat(e.target.value))}
                    className="w-full accent-amber-700"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                    <span>2.4m</span>
                    <span>3.0m (UAE Standard)</span>
                    <span>3.8m (High Ceiling)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span className="font-semibold">{t.numberOfWalls}:</span>
                    <span className="font-mono font-bold text-amber-900">{wallsCount}</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={wallsCount}
                    onChange={(e) => setWallsCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-mono"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={deductOpenings}
                      onChange={(e) => setDeductOpenings(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>{t.deductDoorsWindows}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="md:col-span-6 bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>{t.calcResults}</span>
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-stone-600">{t.totalArea}</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {calculation.netArea.toFixed(1)} m²
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-stone-600">{t.seamlessFabricLength}</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {calculation.continuousFabricLength.toFixed(1)} m
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                    <span className="text-stone-600">{t.recommendedRolls}</span>
                    <span className="font-mono font-bold text-amber-900 text-sm">
                      {calculation.rollsRecommended} {currentLang === 'ar' ? 'لفة' : currentLang === 'zh' ? '卷' : 'Rolls'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-900 to-stone-900 text-white space-y-0.5">
                    <div className="text-[11px] text-amber-200">{t.estimatedCost}</div>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300">
                      AED {calculation.estimatedCost.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-stone-300">
                      * Includes continuous fabric allowance. On-site installation service in UAE quoted separately.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-stone-600 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-amber-200/50">
                <Info className="w-3.5 h-3.5 text-amber-700 inline me-1" />
                {t.calcNote}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed CTA */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end">
          <button
            id="send-calculator-quote-btn"
            onClick={handleSendToWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.sendQuoteWhatsApp}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
