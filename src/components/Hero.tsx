import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Package, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  Maximize2, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onOpenSampleModal: () => void;
  onOpenCalculatorModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onExploreClick,
  onOpenSampleModal,
  onOpenCalculatorModal
}) => {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden bg-radial from-stone-900 via-stone-950 to-black text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Decorative Gold & Ambient Backdrops */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* UAE Local Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl font-normal leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm sm:text-base shadow-lg shadow-amber-900/40 hover:shadow-amber-900/60 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.heroCtaBrowse}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-order-sample-btn"
                onClick={onOpenSampleModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 text-amber-200 border border-amber-500/30 font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span>{t.heroCtaSample}</span>
              </button>

              <button
                id="hero-calc-budget-btn"
                onClick={onOpenCalculatorModal}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-stone-300 hover:text-white border border-stone-700 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>{t.heroCtaCalc}</span>
              </button>
            </div>

            {/* Quick Bullet Trust Checkpoints */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-300 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Seams (3m Seamless)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ASTM E84 Class A Fire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dubai Showroom & Stock</span>
              </div>
            </div>
          </div>

          {/* Luxury Visual Showcase Right Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-stone-900 group">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Dubai Villa Interior Wallcovering" 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/90 backdrop-blur-md border border-amber-500/30 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Emirates Hills & Palm Jumeirah Choice</span>
                  </div>
                  <div className="text-sm font-serif font-bold text-white mt-0.5">
                    Imperial Damask Silk Jacquard (AW-9101)
                  </div>
                  <div className="text-xs text-stone-400">
                    Seamless 3.05m • In Dubai Warehouse
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-xs text-stone-400">Starting from</div>
                  <div className="text-base font-bold text-amber-300 font-mono">28 AED/m²</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Metrics Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">{t.metric1Val}</div>
              <div className="text-xs sm:text-sm text-stone-400 leading-snug">{t.metric1Label}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">{t.metric2Val}</div>
              <div className="text-xs sm:text-sm text-stone-400 leading-snug">{t.metric2Label}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">{t.metric3Val}</div>
              <div className="text-xs sm:text-sm text-stone-400 leading-snug">{t.metric3Label}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-white">{t.metric4Val}</div>
              <div className="text-xs sm:text-sm text-stone-400 leading-snug">{t.metric4Label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
