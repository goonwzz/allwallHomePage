import React, { useState } from 'react';
import { 
  Globe, 
  MessageCircle, 
  Package, 
  Layers, 
  Compass, 
  Calculator, 
  MapPin, 
  Sliders, 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';
import { Language, StoreSettings } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  sampleCount: number;
  onOpenSampleModal: () => void;
  onOpenCalculatorModal: () => void;
  onOpenAdminModal: () => void;
  storeSettings: StoreSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  sampleCount,
  onOpenSampleModal,
  onOpenCalculatorModal,
  onOpenAdminModal,
  storeSettings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs transition-all">
      {/* Top UAE Notice Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100/90 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              DUBAI • WARSAN VILLAGE
            </span>
            <span className="hidden sm:inline text-stone-300">
              {t.heroBadge}
            </span>
            <span className="sm:hidden text-stone-300">
              Dubai 24-48h Delivery • WhatsApp: {storeSettings.displayPhone}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${storeSettings.whatsappNumber}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call Direct"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px] font-medium tracking-wide">
                {storeSettings.displayPhone}
              </span>
            </a>
            <span className="text-stone-600 hidden md:inline">|</span>
            <a 
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono text-[11px] font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="text-stone-600">|</span>
            <div className="flex items-center gap-1 text-[11px] text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ASTM E84 Class A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 flex items-center justify-center text-white shadow-md shadow-amber-900/15 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6 text-amber-100" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-xl sm:text-2xl text-stone-900 tracking-tight leading-none lowercase">
                    allwall
                  </span>
                  <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold tracking-wider font-mono uppercase">
                    DUBAI
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-medium tracking-normal line-clamp-1">
                  {t.brandTagline}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-800 rounded-lg hover:bg-amber-50/70 transition-colors"
            >
              {t.navCatalog}
            </button>
            <button
              onClick={() => handleNavClick('visualizer-section')}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-800 rounded-lg hover:bg-amber-50/70 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              {t.navVisualizer}
            </button>
            <button
              onClick={onOpenCalculatorModal}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-800 rounded-lg hover:bg-amber-50/70 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-amber-700" />
              {t.navCalculator}
            </button>
            <button
              onClick={() => handleNavClick('showroom-section')}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-800 rounded-lg hover:bg-amber-50/70 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-amber-700" />
              {t.navShowroom}
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  currentLang === 'en'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  currentLang === 'ar'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="العربية"
              >
                عربي
              </button>
              <button
                onClick={() => onLanguageChange('zh')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  currentLang === 'zh'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="中文"
              >
                中文
              </button>
            </div>

            {/* Sample Box Indicator Button */}
            <button
              id="sample-box-header-btn"
              onClick={onOpenSampleModal}
              className="relative p-2.5 rounded-xl border border-amber-300/80 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 transition-all flex items-center gap-2 shadow-xs group"
              title={t.navSamples}
            >
              <Package className="w-4 h-4 text-amber-800 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-semibold text-amber-950">
                {t.navSamples}
              </span>
              {sampleCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold shadow-xs">
                  {sampleCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct CTA */}
            <a
              id="whatsapp-header-btn"
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-sm hover:shadow transition-all group"
            >
              <MessageCircle className="w-4 h-4 fill-current group-hover:rotate-6 transition-transform" />
              <span>WhatsApp</span>
            </a>

            {/* Admin Management Discrete Button */}
            <button
              id="admin-inventory-header-btn"
              onClick={onOpenAdminModal}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              title={t.navAdmin}
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-100">
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="w-full text-start py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-50 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-amber-700" />
              {t.navCatalog}
            </button>
            <button
              onClick={() => handleNavClick('visualizer-section')}
              className="w-full text-start py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-50 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              {t.navVisualizer}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculatorModal();
              }}
              className="w-full text-start py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-50 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-700" />
              {t.navCalculator}
            </button>
            <button
              onClick={() => handleNavClick('showroom-section')}
              className="w-full text-start py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-50 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-amber-700" />
              {t.navShowroom}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSampleModal();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium text-sm flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-700" />
                {t.sampleModalTitle}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                {sampleCount}
              </span>
            </button>

            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-medium text-center text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              {t.contactWhatsApp} ({storeSettings.displayPhone})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
