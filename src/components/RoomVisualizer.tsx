import React, { useState } from 'react';
import { 
  Compass, 
  Sun, 
  Moon, 
  Sparkles, 
  MessageCircle, 
  Layers, 
  Eye, 
  Check 
} from 'lucide-react';
import { WallcoveringProduct, Language, StoreSettings } from '../types';
import { translations } from '../data/translations';
import { formatWhatsAppUrl } from '../utils/whatsapp';

interface RoomVisualizerProps {
  products: WallcoveringProduct[];
  currentLang: Language;
  storeSettings: StoreSettings;
}

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({
  products,
  currentLang,
  storeSettings
}) => {
  const [activeSceneId, setActiveSceneId] = useState<'majlis' | 'penthouse' | 'bedroom' | 'hotel'>('majlis');
  const [activeLighting, setActiveLighting] = useState<'daylight' | 'chandelier' | 'night'>('chandelier');
  const [selectedProductCode, setSelectedProductCode] = useState<string>(products[0]?.code || 'AQ-9101');

  const t = translations[currentLang];
  const selectedProduct = products.find(p => p.code === selectedProductCode) || products[0];

  const scenes = [
    { 
      id: 'majlis', 
      label: t.sceneMajlis,
      baseImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
      description: 'Emirates Hills Grand Majlis with traditional high ceilings & gold chandeliers'
    },
    { 
      id: 'penthouse', 
      label: t.scenePenthouse,
      baseImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      description: 'Downtown Dubai Skyline Penthouse featuring open minimalist layout'
    },
    { 
      id: 'bedroom', 
      label: t.sceneBedroom,
      baseImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
      description: 'Palm Jumeirah Villa Master Bedroom with acoustic thermal comfort'
    },
    { 
      id: 'hotel', 
      label: t.sceneHotel,
      baseImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80',
      description: 'DIFC Luxury Hotel Suite & VIP Executive Boardroom'
    }
  ];

  const currentScene = scenes.find(s => s.id === activeSceneId) || scenes[0];

  // Dynamic overlay style for lighting and fabric tint
  const getLightingOverlayClass = () => {
    switch (activeLighting) {
      case 'daylight':
        return 'mix-blend-overlay opacity-35 bg-amber-50';
      case 'chandelier':
        return 'mix-blend-color-burn opacity-40 bg-amber-200';
      case 'night':
        return 'mix-blend-multiply opacity-50 bg-stone-900';
    }
  };

  const primaryColor = selectedProduct?.colorways[0]?.hex || '#D4AF37';

  const inquiryUrl = formatWhatsAppUrl(
    storeSettings.whatsappNumber,
    currentLang === 'ar'
      ? `مرحباً أقمشة القصر، شاهدت محاكي الغرف ثلاثي الأبعاد وأعجبني تركيب موديل (${selectedProduct?.code} - ${selectedProduct?.nameAr}) في (${currentScene.label}). أرجو تزويدي بالأسعار وإمكانية إرسال عينة للموقع.`
      : currentLang === 'zh'
      ? `您好！我在官网3D实景模拟器中查看了【${selectedProduct?.code} - ${selectedProduct?.nameZh}】在【${currentScene.label}】的上墙效果，十分满意，想咨询该款现货库存与工程报价。`
      : `Hello Al-Qasr Wallcoverings, I simulated ${selectedProduct?.code} (${selectedProduct?.nameEn}) in the ${currentScene.label} setting. Please share quotation and sample availability.`
  );

  return (
    <section id="visualizer-section" className="py-16 sm:py-20 bg-stone-950 text-white relative overflow-hidden">
      {/* Decorative lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>INTERACTIVE ROOM SIMULATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              {t.vizTitle}
            </h2>
            <p className="text-sm text-stone-400 mt-1 max-w-xl">
              {t.vizSubtitle}
            </p>
          </div>

          {/* Scene Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800">
            {scenes.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSceneId(s.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSceneId === s.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Stage */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 group">
          {/* Base Scene Photo */}
          <img 
            src={currentScene.baseImage} 
            alt={currentScene.label}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Wallcovering Applied Texture Blend Layer */}
          <div 
            className="absolute inset-0 transition-all duration-700 pointer-events-none mix-blend-multiply opacity-40"
            style={{ 
              backgroundColor: primaryColor,
              backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)`
            }}
          />

          {/* Lighting Mode Blend Filter */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${getLightingOverlayClass()}`} />

          {/* Floating Lighting Controls (Top Right) */}
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex items-center gap-1.5 p-1.5 rounded-xl bg-stone-900/85 backdrop-blur-md border border-stone-700/80 text-xs">
            <button
              onClick={() => setActiveLighting('daylight')}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium ${
                activeLighting === 'daylight' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title={t.vizDaylight}
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.vizDaylight}</span>
            </button>
            <button
              onClick={() => setActiveLighting('chandelier')}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium ${
                activeLighting === 'chandelier' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title={t.vizEvening}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.vizEvening}</span>
            </button>
            <button
              onClick={() => setActiveLighting('night')}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium ${
                activeLighting === 'night' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title={t.vizNight}
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.vizNight}</span>
            </button>
          </div>

          {/* Floating Bottom Info Pill with WhatsApp Link */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-amber-500/30 text-white flex items-center justify-between gap-4 shadow-xl">
            <div className="overflow-hidden">
              <div className="text-[10px] text-amber-400 font-mono font-semibold uppercase tracking-wider">
                Current Applied Wall Fabric
              </div>
              <div className="font-serif font-bold text-sm text-white truncate">
                {selectedProduct?.code} - {currentLang === 'ar' ? selectedProduct?.nameAr : currentLang === 'zh' ? selectedProduct?.nameZh : selectedProduct?.nameEn}
              </div>
              <div className="text-xs text-stone-300 font-mono">
                {selectedProduct?.pricePerSqmAED} AED / sq.m • Seamless 3.0m
              </div>
            </div>

            <a
              href={inquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Fabric Swatch Picker Strip */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wide">
            {t.selectWallcovering}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {products.map((p) => {
              const isSelected = p.code === selectedProductCode;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductCode(p.code)}
                  className={`p-2 rounded-2xl border text-start transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-stone-800 border-amber-500 ring-2 ring-amber-400/20'
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <img 
                    src={p.imageUrl} 
                    alt={p.code} 
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-stone-700" 
                  />
                  <div className="overflow-hidden">
                    <div className="font-mono text-xs font-bold text-white flex items-center gap-1">
                      <span>{p.code}</span>
                      {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                    </div>
                    <div className="text-[11px] text-amber-300/90 font-mono">
                      {p.pricePerSqmAED} AED
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
