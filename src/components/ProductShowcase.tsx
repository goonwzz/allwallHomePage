import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { WallcoveringProduct, Language, StoreSettings, ProductCategory, RoomSuitability } from '../types';
import { translations } from '../data/translations';
import { ProductCard } from './ProductCard';

interface ProductShowcaseProps {
  products: WallcoveringProduct[];
  currentLang: Language;
  onSelectProduct: (product: WallcoveringProduct) => void;
  sampleBoxCodes: string[];
  onToggleSample: (productCode: string) => void;
  storeSettings: StoreSettings;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  currentLang,
  onSelectProduct,
  sampleBoxCodes,
  onToggleSample,
  storeSettings
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const t = translations[currentLang];

  // Category tab definitions
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'silk_jacquard', label: t.catSilkJaoquard },
    { id: 'acoustic_linen', label: t.catAcousticLinen },
    { id: 'suede_velvet', label: t.catSuedeVelvet },
    { id: 'metallic_foil', label: t.catMetallicFoil },
    { id: 'commercial_vinyl', label: t.catCommercialVinyl },
    { id: 'custom_mural', label: t.catCustomMural },
  ];

  // Room filters
  const rooms: { id: string; label: string }[] = [
    { id: 'all', label: currentLang === 'ar' ? 'جميع المساحات' : currentLang === 'zh' ? '全部适用空间' : 'All Spaces' },
    { id: 'majlis', label: t.roomMajlis },
    { id: 'living_room', label: t.roomLiving },
    { id: 'master_bedroom', label: t.roomBedroom },
    { id: 'hotel_project', label: t.roomHotel },
    { id: 'dining_room', label: t.roomDining },
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Room match
      if (selectedRoom !== 'all' && !p.suitableRooms.includes(selectedRoom as RoomSuitability)) {
        return false;
      }
      // In stock in Dubai only
      if (inStockOnly && p.stockStatus !== 'in_stock') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const codeMatch = p.code.toLowerCase().includes(q);
        const nameMatch = 
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.toLowerCase().includes(q) ||
          p.nameZh.toLowerCase().includes(q);
        const tagMatch = p.tags.some(t => t.toLowerCase().includes(q));
        return codeMatch || nameMatch || tagMatch;
      }
      return true;
    });
  }, [products, selectedCategory, selectedRoom, inStockOnly, searchQuery]);

  return (
    <section id="catalog-section" className="py-16 sm:py-20 bg-stone-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>DUBAI WAREHOUSE COLLECTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {t.navCatalog}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              {t.seamlessAdvantage}
            </p>
          </div>

          {/* Search bar & In-Stock filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'ar' ? 'بحث برمز الموديل أو الاسم...' : currentLang === 'zh' ? '搜索款号或材质 (如 AQ-9101)...' : 'Search SKU or material...'}
                className="w-full sm:w-64 pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs"
              />
            </div>

            <button
              id="filter-in-stock-btn"
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                inStockOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`} />
              <span>{t.inStockDubai}</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Scrolling Tabs */}
        <div className="border-b border-stone-200 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Room Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-stone-500 me-1">
            {currentLang === 'ar' ? 'المساحة المستهدفة:' : currentLang === 'zh' ? '应用空间:' : 'Room Type:'}
          </span>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedRoom === room.id
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {room.label}
            </button>
          ))}
          <span className="ms-auto text-xs text-stone-400 font-mono">
            {filteredProducts.length} {currentLang === 'ar' ? 'منتج' : currentLang === 'zh' ? '款产品' : 'Items'}
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentLang={currentLang}
                onSelectProduct={onSelectProduct}
                isInSampleBox={sampleBoxCodes.includes(product.code)}
                onToggleSample={onToggleSample}
                storeSettings={storeSettings}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <Layers className="w-12 h-12 text-stone-300 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-stone-800">
              {currentLang === 'ar' ? 'لا توجد نتائج مطابقة' : currentLang === 'zh' ? '未找到符合条件的墙布' : 'No matching wallcoverings found'}
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {currentLang === 'ar' 
                ? 'يرجى تجربة تغيير التصنيف أو خيارات البحث، أو تواصل معنا عبر واتساب لطلب أقمشة خاصة.' 
                : currentLang === 'zh'
                ? '请尝试清除筛选条件或关键词，或直接联系客服获取更多未上架款号。'
                : 'Try adjusting your filters or search keywords, or chat with us on WhatsApp for custom orders.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRoom('all');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-700"
            >
              {currentLang === 'ar' ? 'إعادة ضبط التصفية' : currentLang === 'zh' ? '重置全部筛选' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* Bottom Fast Info Banner */}
        <div className="bg-gradient-to-r from-amber-900 to-stone-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <div className="font-serif font-bold text-lg text-amber-200">
              {currentLang === 'ar' ? 'هل تحتاج إلى كميات جملة لمشروع فندقي أو فيلا خاصة؟' : currentLang === 'zh' ? '酒店大型工装项目或联排别墅全屋定制采购？' : 'Supplying a Large Hotel or Luxury Villa Project?'}
            </div>
            <div className="text-xs text-stone-300">
              {currentLang === 'ar' ? 'نوفر أسعار الموزعين وتوريد مباشر من المستودع مع شهادات الدفاع المدني.' : currentLang === 'zh' ? '支持集装箱直柜或迪拜现货拆零混批，提供阿联酋民防防火检测证书。' : 'We offer direct container imports and local Dubai wholesale pallet dispatch with full ASTM E84 documentation.'}
            </div>
          </div>
          <a
            href={`https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent(
              currentLang === 'ar' 
                ? 'مرحباً، أود الحصول على قائمة أسعار الجملة لمشاريع الفلل والفنادق.' 
                : currentLang === 'zh'
                ? '您好！我想了解工程批发价与大宗采购优惠政策。'
                : 'Hello, I would like to receive the wholesale B2B price list for contract projects.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs whitespace-nowrap shadow-md"
          >
            {t.inquirePricingWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
};
