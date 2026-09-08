import React from 'react';
import { 
  Layers, 
  MapPin, 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Sliders 
} from 'lucide-react';
import { Language, StoreSettings } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  currentLang: Language;
  onOpenAdminModal: () => void;
  onOpenSampleModal: () => void;
  onOpenCalculatorModal: () => void;
  storeSettings: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenAdminModal,
  onOpenSampleModal,
  onOpenCalculatorModal,
  storeSettings
}) => {
  const t = translations[currentLang];

  const showroomAddress = currentLang === 'ar' 
    ? storeSettings.showroomAddressAr 
    : currentLang === 'zh' 
    ? storeSettings.showroomAddressZh 
    : storeSettings.showroomAddressEn;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const directWhatsAppLink = formatWhatsAppUrl(
    storeSettings.whatsappNumber,
    currentLang === 'ar' 
      ? 'مرحباً allwall، أود الاستفسار عن كتالوج أقمشة وورق الجدران الفاخر في دبي.' 
      : currentLang === 'zh'
      ? '您好！我想咨询 allwall 迪拜奢华无缝墙布现货供应与合作详情。'
      : 'Hello allwall Wallcoverings, I would like to inquire about your luxury seamless collections in Dubai.'
  );

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex items-center">
                <span className="font-serif font-black text-2xl text-white tracking-tight lowercase">
                  allwall
                </span>
                <span className="text-[11px] ms-2 px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 font-mono uppercase font-bold">
                  DUBAI
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-400 font-mono">
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">ASTM E84 Class A</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">UAE Civil Defense</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">3.0m Seamless</span>
            </div>
          </div>

          {/* Quick Access */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => scrollTo('catalog-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.navCatalog}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('visualizer-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.navVisualizer}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSampleModal}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.navSamples}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCalculatorModal}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.navCalculator}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('showroom-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.navShowroom}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAdminModal}
                  className="text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{t.navAdmin}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Showroom */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              {t.footerContact}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{showroomAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={directWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-emerald-400 font-semibold font-mono"
                >
                  WhatsApp: {storeSettings.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${storeSettings.whatsappNumber}`} className="hover:text-white font-mono">
                  Call: {storeSettings.displayPhone}
                </a>
              </div>
              {storeSettings.secondaryPhone && (
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href={`tel:${storeSettings.secondaryPhone}`} className="hover:text-white font-mono">
                    Tel: {storeSettings.secondaryPhone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${storeSettings.email}`} className="hover:text-white font-mono">
                  {storeSettings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{t.footerRights}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Dubai</span>
            <span>•</span>
            <span>Abu Dhabi</span>
            <span>•</span>
            <span>Sharjah</span>
            <span>•</span>
            <span>All UAE Emirates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
