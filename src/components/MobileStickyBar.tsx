import React from 'react';
import { MessageCircle, Package, Calculator, PhoneCall } from 'lucide-react';
import { Language, StoreSettings } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl } from '../utils/whatsapp';

interface MobileStickyBarProps {
  currentLang: Language;
  sampleCount: number;
  onOpenSampleModal: () => void;
  onOpenCalculatorModal: () => void;
  storeSettings: StoreSettings;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  currentLang,
  sampleCount,
  onOpenSampleModal,
  onOpenCalculatorModal,
  storeSettings
}) => {
  const t = translations[currentLang];

  const whatsAppUrl = formatWhatsAppUrl(
    storeSettings.whatsappNumber,
    currentLang === 'ar'
      ? 'مرحباً allwall، أود التواصل المباشر للاستفسار عن أسعار وكتالوج الأقمشة الجدارية في دبي.'
      : currentLang === 'zh'
      ? '您好！我在移动端浏览了 allwall 迪拜奢华无缝墙布，想向您咨询现货与色卡寄送。'
      : 'Hello allwall Wallcoverings, I am browsing your mobile portal and would like to inquire about current stock and quotes.'
  );

  return (
    <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
      {/* Sample Swatches Box */}
      <button
        id="mobile-sticky-sample-btn"
        onClick={onOpenSampleModal}
        className="flex-1 py-2 px-2 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs relative"
      >
        <Package className="w-4 h-4 text-amber-700" />
        <span className="truncate">{currentLang === 'ar' ? 'العينات' : currentLang === 'zh' ? '免费取样' : 'Samples'}</span>
        {sampleCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
            {sampleCount}
          </span>
        )}
      </button>

      {/* Area & Budget Calculator */}
      <button
        id="mobile-sticky-calc-btn"
        onClick={onOpenCalculatorModal}
        className="py-2 px-3 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5"
        title={t.navCalculator}
      >
        <Calculator className="w-4 h-4 text-amber-800" />
        <span className="hidden xs:inline">{currentLang === 'ar' ? 'الحاسبة' : currentLang === 'zh' ? '测算' : 'Calc'}</span>
      </button>

      {/* Direct Call */}
      <a
        id="mobile-sticky-call-btn"
        href={`tel:${storeSettings.whatsappNumber}`}
        className="p-2 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center"
        title={`Call ${storeSettings.displayPhone}`}
      >
        <PhoneCall className="w-4 h-4 text-amber-800" />
      </a>

      {/* WhatsApp Primary Button */}
      <a
        id="mobile-sticky-whatsapp-btn"
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.5] py-2.5 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span className="truncate">WhatsApp {currentLang === 'ar' ? 'فوري' : currentLang === 'zh' ? '立即沟通' : 'Direct'}</span>
      </a>
    </aside>
  );
};
