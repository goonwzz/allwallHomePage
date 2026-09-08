import React, { useState } from 'react';
import { 
  MessageCircle, 
  Package, 
  Check, 
  Eye, 
  Maximize2, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { WallcoveringProduct, Language, StoreSettings } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl, generateProductInquiryMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: WallcoveringProduct;
  currentLang: Language;
  onSelectProduct: (product: WallcoveringProduct) => void;
  isInSampleBox: boolean;
  onToggleSample: (productCode: string) => void;
  storeSettings: StoreSettings;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentLang,
  onSelectProduct,
  isInSampleBox,
  onToggleSample,
  storeSettings
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
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

  // Stock badge styling
  const getStockBadge = () => {
    switch (product.stockStatus) {
      case 'in_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {product.inStockRolls} {t.rollsAvailable}
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {t.lowStockDubai} ({product.inStockRolls} left)
          </span>
        );
      case 'made_to_order':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
            {t.madeToOrder}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600">
            {t.outOfStock}
          </span>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col">
      {/* Image & Top Badges Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img 
          src={product.imageUrl} 
          alt={`${product.code} - ${productName}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3.5 py-2 rounded-xl bg-white/90 text-stone-900 text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <Eye className="w-4 h-4 text-amber-700" />
            {t.viewDetails}
          </span>
        </div>

        {/* Top SKU Badge */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-stone-900/85 backdrop-blur-xs text-white font-mono text-xs font-bold shadow-xs">
            {product.code}
          </span>
          {product.isFeatured && (
            <span className="px-2 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              HOT
            </span>
          )}
        </div>

        {/* Bottom Seamless Height overlay */}
        <div className="absolute bottom-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2 py-0.5 rounded-md bg-stone-900/75 backdrop-blur-xs text-stone-200 text-[11px] font-mono flex items-center gap-1">
          <Maximize2 className="w-3 h-3 text-amber-400" />
          <span>{product.specs.seamlessHeight.split(' ')[0]}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Stock and Price Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {getStockBadge()}
            <div className="text-end">
              <span className="text-xs text-stone-400 font-normal">{t.fromPrice} </span>
              <span className="text-base sm:text-lg font-serif font-bold text-amber-900 font-mono">
                {product.pricePerSqmAED}
              </span>
              <span className="text-xs text-stone-500 font-medium"> AED/m²</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif font-bold text-base sm:text-lg text-stone-900 hover:text-amber-800 transition-colors line-clamp-1 cursor-pointer"
          >
            {productName}
          </h3>

          {/* Brief Description */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {productDesc}
          </p>

          {/* Colorways Selector Pill List */}
          <div className="mt-3 pt-2.5 border-t border-stone-100">
            <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
              <span>{t.availableColors} ({product.colorways.length})</span>
              <span className="font-medium text-stone-700 truncate max-w-[120px]">{activeColorName}</span>
            </div>

            <div className="flex items-center gap-2">
              {product.colorways.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                    selectedColorIdx === idx 
                      ? 'border-amber-700 ring-2 ring-amber-400/30 scale-110' 
                      : 'border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={currentLang === 'ar' ? c.nameAr : currentLang === 'zh' ? c.nameZh : c.nameEn}
                />
              ))}
            </div>
          </div>

          {/* Key Quick Technical Feature Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-stone-600">
            <span className="px-2 py-0.5 rounded bg-stone-100 flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              <span>ASTM E84</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-100 flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-amber-600" />
              <span>{product.specs.soundAbsorption.split(' ')[0]} {product.specs.soundAbsorption.split(' ')[1]}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-100 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{product.specs.gsm} gsm</span>
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
          {/* Add/Remove from Sample Box */}
          <button
            id={`sample-toggle-btn-${product.code}`}
            onClick={() => onToggleSample(product.code)}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isInSampleBox
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            {isInSampleBox ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-800" />
                <span>{t.sampleAdded}</span>
              </>
            ) : (
              <>
                <Package className="w-3.5 h-3.5 text-stone-500" />
                <span>{t.addSample}</span>
              </>
            )}
          </button>

          {/* Quick WhatsApp Inquiry */}
          <a
            id={`whatsapp-inquire-btn-${product.code}`}
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>{t.quickWhatsApp}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
