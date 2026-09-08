import React, { useState, useEffect } from 'react';
import { Language, WallcoveringProduct, StoreSettings } from './types';
import { initialProducts, defaultStoreSettings } from './data/initialProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { RoomVisualizer } from './components/RoomVisualizer';
import { GoogleBusinessCard } from './components/GoogleBusinessCard';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { SampleRequestModal } from './components/SampleRequestModal';
import { AreaCalculatorModal } from './components/AreaCalculatorModal';
import { AdminModal } from './components/AdminModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  // Multilingual State: English ('en'), Arabic ('ar'), Chinese ('zh')
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('allwall_lang');
    return (saved as Language) || 'en';
  });

  // Products state (persisted in localStorage for admin modifications)
  const [products, setProducts] = useState<WallcoveringProduct[]>(() => {
    const saved = localStorage.getItem('allwall_products');
    if (saved) {
      try {
        const parsed: WallcoveringProduct[] = JSON.parse(saved);
        let hasPriceOver30 = false;
        const normalized = parsed.map(p => {
          const defaultMatch = initialProducts.find(ip => ip.id === p.id || ip.code === p.code);
          if (defaultMatch && p.pricePerSqmAED > 30) {
            hasPriceOver30 = true;
            return { ...p, pricePerSqmAED: defaultMatch.pricePerSqmAED };
          }
          if (p.pricePerSqmAED > 30) {
            hasPriceOver30 = true;
            return { ...p, pricePerSqmAED: 28 };
          }
          return p;
        });

        if (hasPriceOver30) {
          localStorage.setItem('allwall_products', JSON.stringify(normalized));
        }
        return normalized;
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return initialProducts;
  });

  // Store Settings (WhatsApp number, showroom, etc.)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('allwall_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.secondaryPhone && (parsed.secondaryPhone.includes('052 138 6870') || parsed.secondaryPhone.includes('0521386870'))) {
          parsed.secondaryPhone = '';
          localStorage.setItem('allwall_settings', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved store settings', e);
      }
    }
    return defaultStoreSettings;
  });

  // Sample Box Cart (List of SKU codes)
  const [sampleBoxCodes, setSampleBoxCodes] = useState<string[]>(() => {
    const saved = localStorage.getItem('allwall_sample_codes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse sample codes', e);
      }
    }
    return ['AW-9101', 'AW-7208']; // default 2 popular samples
  });

  // Modals state
  const [selectedProductForModal, setSelectedProductForModal] = useState<WallcoveringProduct | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Sync RTL and language attribute on document root
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('allwall_lang', currentLang);
  }, [currentLang]);

  // Persist products when updated
  const handleUpdateProducts = (newProducts: WallcoveringProduct[]) => {
    setProducts(newProducts);
    localStorage.setItem('allwall_products', JSON.stringify(newProducts));
  };

  // Persist store settings
  const handleUpdateStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    localStorage.setItem('allwall_settings', JSON.stringify(newSettings));
  };

  // Toggle SKU in sample box
  const handleToggleSample = (code: string) => {
    setSampleBoxCodes((prev) => {
      let updated: string[];
      if (prev.includes(code)) {
        updated = prev.filter(c => c !== code);
      } else {
        updated = [...prev, code];
      }
      localStorage.setItem('allwall_sample_codes', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveSampleCode = (code: string) => {
    setSampleBoxCodes((prev) => {
      const updated = prev.filter(c => c !== code);
      localStorage.setItem('allwall_sample_codes', JSON.stringify(updated));
      return updated;
    });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${currentLang === 'ar' ? 'font-[Cairo,sans-serif]' : ''}`}>
      {/* Top Header & Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        sampleCount={sampleBoxCodes.length}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
        onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        storeSettings={storeSettings}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onExploreClick={scrollToCatalog}
          onOpenSampleModal={() => setIsSampleModalOpen(true)}
          onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
        />

        {/* Product Catalog Showcase */}
        <ProductShowcase
          products={products}
          currentLang={currentLang}
          onSelectProduct={setSelectedProductForModal}
          sampleBoxCodes={sampleBoxCodes}
          onToggleSample={handleToggleSample}
          storeSettings={storeSettings}
        />

        {/* Interactive 3D Room Visualizer */}
        <RoomVisualizer
          products={products}
          currentLang={currentLang}
          storeSettings={storeSettings}
        />

        {/* Google Business Profile & UAE Local Search Showcase */}
        <GoogleBusinessCard
          currentLang={currentLang}
          storeSettings={storeSettings}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
        onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
        storeSettings={storeSettings}
      />

      {/* Mobile Bottom Sticky Bar */}
      <MobileStickyBar
        currentLang={currentLang}
        sampleCount={sampleBoxCodes.length}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
        onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
        storeSettings={storeSettings}
      />

      {/* Modals */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          currentLang={currentLang}
          isInSampleBox={sampleBoxCodes.includes(selectedProductForModal.code)}
          onToggleSample={handleToggleSample}
          storeSettings={storeSettings}
        />
      )}

      {isSampleModalOpen && (
        <SampleRequestModal
          isOpen={isSampleModalOpen}
          onClose={() => setIsSampleModalOpen(false)}
          selectedCodes={sampleBoxCodes}
          onRemoveCode={handleRemoveSampleCode}
          products={products}
          currentLang={currentLang}
          storeSettings={storeSettings}
        />
      )}

      {isCalculatorModalOpen && (
        <AreaCalculatorModal
          isOpen={isCalculatorModalOpen}
          onClose={() => setIsCalculatorModalOpen(false)}
          products={products}
          currentLang={currentLang}
          storeSettings={storeSettings}
        />
      )}

      {isAdminModalOpen && (
        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          products={products}
          onUpdateProducts={handleUpdateProducts}
          storeSettings={storeSettings}
          onUpdateStoreSettings={handleUpdateStoreSettings}
          currentLang={currentLang}
        />
      )}
    </div>
  );
}
