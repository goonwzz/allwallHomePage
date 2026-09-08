import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Package, 
  Check, 
  Flame, 
  Volume2, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  Droplets, 
  Clock, 
  FileText 
} from 'lucide-react';
import { WallcoveringProduct, Language, StoreSettings } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl, generateProductInquiryMessage } from '../utils/whatsapp';

interface ProductModalProps {
  product: WallcoveringProduct | null;
  onClose: () => void;
  currentLang: Language;
  isInSampleBox: boolean;
  onToggleSample: (productCode: string) => void;
  storeSettings: StoreSettings;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  currentLang,
  isInSampleBox,
  onToggleSample,
  storeSettings
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!product) return null;

  const t = translations[currentLang];
  const activeColor = product.colorways[selectedColorIdx] || product.colorways[0];

  const productName = currentLang === 'ar' 
    ? product.nameAr 
    : currentLang === 'zh' 
    ? product.nameZh 
    : product.nameEn;

  const productDesc = currentLang === 'ar' 
    ? product.descriptionAr 
    : currentLang === 'zh' 
    ? product.descriptionZh 
    : product.descriptionEn;

  const activeColorName = activeColor 
    ? (currentLang === 'ar' ? activeColor.nameAr : currentLang === 'zh' ? activeColor.nameZh : activeColor.nameEn)
    : '';

  const whatsAppUrl = formatWhatsAppUrl(
    storeSettings.whatsappNumber,
    generateProductInquiryMessage(product, activeColor, currentLang)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-white font-mono font-bold text-xs">
              {product.code}
            </span>
            <span className="text-xs font-semibold text-stone-500 uppercase">
              {product.category.replace('_', ' ')}
            </span>
          </div>
          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Image & Colorway Zoom */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
                <img 
                  src={product.imageUrl} 
                  alt={productName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-xs font-mono">
                  {activeColorName}
                </div>
              </div>

              {/* Colorway Swatches */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span className="font-semibold">{t.availableColors}:</span>
                  <span className="font-mono text-amber-900 font-bold">{activeColorName}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colorways.map((color, idx) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`flex flex-col items-center gap-1 group transition-all`}
                    >
                      <div 
                        className={`w-9 h-9 rounded-full border-2 transition-all shadow-xs ${
                          selectedColorIdx === idx 
                            ? 'border-amber-700 ring-4 ring-amber-400/30 scale-110' 
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] text-stone-500 line-clamp-1 max-w-[60px] text-center">
                        {currentLang === 'ar' ? color.nameAr : currentLang === 'zh' ? color.nameZh : color.nameEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seamless Advantage Box */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>The UAE Seamless 3.0m Advantage</span>
                </div>
                <p className="leading-relaxed text-stone-700">
                  {t.seamlessAdvantage}
                </p>
              </div>
            </div>

            {/* Right Information & Technical Sheet */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-serif font-bold text-stone-900 leading-tight">
                    {productName}
                  </h2>
                  <div className="text-end shrink-0">
                    <span className="text-2xl font-bold font-mono text-amber-900">
                      {product.pricePerSqmAED}
                    </span>
                    <span className="text-xs text-stone-500 font-medium"> AED/m²</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {product.stockStatus === 'in_stock' ? `${product.inStockRolls} ${t.rollsAvailable} in Dubai` : t.madeToOrder}
                  </span>
                  <span className="text-xs text-stone-500">
                    • Lead time: {product.leadTimeDays === 1 ? 'Next-Day Dubai' : `${product.leadTimeDays} Days`}
                  </span>
                </div>

                <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                  {productDesc}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
                <div className="bg-stone-100 px-4 py-2.5 font-bold text-stone-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-stone-600" />
                  <span>{t.productDetailsTitle}</span>
                </div>
                <div className="divide-y divide-stone-200">
                  <div className="grid grid-cols-2 px-4 py-2 bg-white">
                    <span className="text-stone-500">{t.specFireRating}</span>
                    <span className="font-semibold text-stone-900">{product.specs.fireRating}</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-stone-50/50">
                    <span className="text-stone-500">{t.specWeight}</span>
                    <span className="font-semibold text-stone-900">{product.specs.gsm} GSM (Heavy Duty)</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-white">
                    <span className="text-stone-500">{t.specHeight}</span>
                    <span className="font-semibold text-stone-900">{product.specs.seamlessHeight}</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-stone-50/50">
                    <span className="text-stone-500">{t.specAcoustic}</span>
                    <span className="font-semibold text-stone-900">{product.specs.soundAbsorption}</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-white">
                    <span className="text-stone-500">{t.specWater} & {t.specMildew}</span>
                    <span className="font-semibold text-emerald-700">Certified 100% Resistant</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-stone-50/50">
                    <span className="text-stone-500">{t.specRollLength}</span>
                    <span className="font-semibold text-stone-900">{product.specs.rollLength} Meters / Roll</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-white">
                    <span className="text-stone-500">{t.specEco}</span>
                    <span className="font-semibold text-stone-900">{product.specs.ecoCert}</span>
                  </div>
                  <div className="grid grid-cols-2 px-4 py-2 bg-stone-50/50">
                    <span className="text-stone-500">{t.specCleaning}</span>
                    <span className="text-stone-700">
                      {currentLang === 'ar' ? product.specs.cleaningGuideAr : currentLang === 'zh' ? product.specs.cleaningGuideZh : product.specs.cleaningGuideEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed CTA Actions */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="modal-sample-toggle-btn"
            onClick={() => onToggleSample(product.code)}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isInSampleBox
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-100'
            }`}
          >
            {isInSampleBox ? (
              <>
                <Check className="w-4 h-4 text-amber-800" />
                <span>{t.sampleAdded}</span>
              </>
            ) : (
              <>
                <Package className="w-4 h-4 text-amber-800" />
                <span>{t.orderSampleBtn}</span>
              </>
            )}
          </button>

          <a
            id="modal-whatsapp-inquiry-btn"
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.inquirePricingWhatsApp}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
