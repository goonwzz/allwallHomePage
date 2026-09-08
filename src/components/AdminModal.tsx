import React, { useState } from 'react';
import { 
  X, 
  Sliders, 
  Plus, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  MessageCircle, 
  Package, 
  AlertTriangle, 
  Phone 
} from 'lucide-react';
import { WallcoveringProduct, Language, StoreSettings, StockStatus, ProductCategory } from '../types';
import { translations } from '../data/translations';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: WallcoveringProduct[];
  onUpdateProducts: (newProducts: WallcoveringProduct[]) => void;
  storeSettings: StoreSettings;
  onUpdateStoreSettings: (newSettings: StoreSettings) => void;
  currentLang: Language;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  storeSettings,
  onUpdateStoreSettings,
  currentLang
}) => {
  const [localProducts, setLocalProducts] = useState<WallcoveringProduct[]>(products);
  const [localSettings, setLocalSettings] = useState<StoreSettings>(storeSettings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // New product form state
  const [newCode, setNewCode] = useState('AW-');
  const [newNameEn, setNewNameEn] = useState('');
  const [newNameAr, setNewNameAr] = useState('');
  const [newNameZh, setNewNameZh] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('silk_jacquard');
  const [newPrice, setNewPrice] = useState<number>(25);
  const [newRolls, setNewRolls] = useState<number>(30);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80');

  if (!isOpen) return null;

  const t = translations[currentLang];

  // Calculated metrics
  const totalRolls = localProducts.reduce((acc, p) => acc + (p.inStockRolls || 0), 0);
  const lowStockCount = localProducts.filter(p => p.stockStatus === 'low_stock' || p.inStockRolls < 20).length;

  const handleRollChange = (productId: string, delta: number) => {
    setLocalProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedRolls = Math.max(0, p.inStockRolls + delta);
        let newStatus: StockStatus = p.stockStatus;
        if (updatedRolls === 0) newStatus = 'out_of_stock';
        else if (updatedRolls < 20) newStatus = 'low_stock';
        else newStatus = 'in_stock';
        return { ...p, inStockRolls: updatedRolls, stockStatus: newStatus };
      }
      return p;
    }));
  };

  const handlePriceChange = (productId: string, newPrice: number) => {
    setLocalProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, pricePerSqmAED: Math.max(1, newPrice) };
      }
      return p;
    }));
  };

  const handleStatusChange = (productId: string, status: StockStatus) => {
    setLocalProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stockStatus: status };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج؟' : currentLang === 'zh' ? '确定要删除此产品SKU吗？' : 'Are you sure you want to delete this SKU?')) {
      setLocalProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleSaveAll = () => {
    onUpdateProducts(localProducts);
    onUpdateStoreSettings(localSettings);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newNameEn.trim()) {
      alert('Please provide at least SKU Code and English Name.');
      return;
    }

    const created: WallcoveringProduct = {
      id: `prod-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      nameEn: newNameEn.trim(),
      nameAr: newNameAr.trim() || newNameEn.trim(),
      nameZh: newNameZh.trim() || newNameEn.trim(),
      category: newCategory,
      pricePerSqmAED: newPrice,
      inStockRolls: newRolls,
      stockStatus: newRolls > 0 ? (newRolls < 20 ? 'low_stock' : 'in_stock') : 'made_to_order',
      leadTimeDays: newRolls > 0 ? 1 : 10,
      isFeatured: false,
      sampleAvailable: true,
      suitableRooms: ['majlis', 'living_room'],
      imageUrl: newImageUrl,
      descriptionEn: `Luxury UAE custom seamless wallcovering ${newCode}`,
      descriptionAr: `قماش جدران فاخر بدون فواصل ${newCode}`,
      descriptionZh: `阿联酋定制高端无缝墙布 ${newCode}`,
      tags: ['New Arrival', 'Dubai Stock'],
      specs: {
        gsm: 460,
        fireRating: 'ASTM E84 Class A (UAE Civil Defense)',
        waterResistant: true,
        mildewResistant: true,
        soundAbsorption: 'NRC 0.35',
        seamlessHeight: '3.00 Meters',
        rollLength: 50,
        ecoCert: 'OEKO-TEX Standard 100',
        cleaningGuideEn: 'Wipe with soft damp cloth',
        cleaningGuideAr: 'مسح بقطعة قماش ناعمة',
        cleaningGuideZh: '干微纤维布扫尘'
      },
      colorways: [
        {
          id: 'c-default',
          nameEn: 'Standard Classic Gold',
          nameAr: 'ذهبي كلاسيكي',
          nameZh: '经典金',
          hex: '#C8A870',
          textureLabelEn: 'Silk Jacquard',
          textureLabelAr: 'حرير وجاكار',
          textureLabelZh: '高密提花'
        }
      ]
    };

    setLocalProducts(prev => [created, ...prev]);
    setShowAddForm(false);
    // Reset inputs
    setNewCode('AW-');
    setNewNameEn('');
    setNewNameAr('');
    setNewNameZh('');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      products: localProducts,
      settings: localSettings
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `allwall_Inventory_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.products && Array.isArray(parsed.products)) {
            setLocalProducts(parsed.products);
            if (parsed.settings) setLocalSettings(parsed.settings);
            alert(currentLang === 'ar' ? 'تم استيراد البيانات بنجاح!' : currentLang === 'zh' ? '数据导入成功！' : 'Data imported successfully!');
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {t.adminTitle}
              </h3>
              <p className="text-xs text-amber-200/80">
                {t.adminSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success toast */}
        {saveSuccessNotice && (
          <div className="bg-emerald-600 text-white text-xs px-6 py-2 flex items-center justify-between animate-in slide-in-from-top-2">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4" />
              {t.adminSaveSuccess}
            </span>
          </div>
        )}

        {/* Admin Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-500">{t.adminStatsTotal}</div>
                <div className="text-2xl font-bold font-mono text-stone-900 mt-0.5">
                  {localProducts.length}
                </div>
              </div>
              <Package className="w-8 h-8 text-stone-400" />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-800">{t.adminStatsStock}</div>
                <div className="text-2xl font-bold font-mono text-emerald-900 mt-0.5">
                  {totalRolls}
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-amber-800">{t.adminStatsLowStock}</div>
                <div className="text-2xl font-bold font-mono text-amber-900 mt-0.5">
                  {lowStockCount}
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          {/* WhatsApp & Contact Settings Card */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.adminWhatsAppConfig}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-stone-600 mb-1">
                  {t.adminWhatsAppNumber}
                </label>
                <input
                  type="text"
                  value={localSettings.whatsappNumber}
                  onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-mono"
                  placeholder="971551789188"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">
                  WhatsApp Display (Header & Button)
                </label>
                <input
                  type="text"
                  value={localSettings.displayPhone}
                  onChange={(e) => setLocalSettings({ ...localSettings, displayPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-mono"
                  placeholder="+971 55 178 9188"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">
                  Direct Telephone / Optional Landline
                </label>
                <input
                  type="text"
                  value={localSettings.secondaryPhone || ''}
                  onChange={(e) => setLocalSettings({ ...localSettings, secondaryPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-mono"
                  placeholder="Optional, e.g. +971 4 XXX XXXX"
                />
              </div>
            </div>
          </div>

          {/* Table Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t.adminAddProduct}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-medium text-xs flex items-center gap-1.5 cursor-pointer"
                title="Backup inventory"
              >
                <Download className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">{t.adminExportData}</span>
              </button>

              <label className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 font-medium text-xs flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">{t.adminImportData}</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>
          </div>

          {/* New Product Form Drawer */}
          {showAddForm && (
            <form onSubmit={handleAddNewProduct} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4 animate-in fade-in">
              <div className="font-bold text-xs text-amber-950 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-700" />
                <span>Add New Wallpaper Collection to Catalog</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="AQ-8899"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">English Name *</label>
                  <input
                    type="text"
                    required
                    value={newNameEn}
                    onChange={(e) => setNewNameEn(e.target.value)}
                    placeholder="Imperial Damask Silk"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Arabic Name</label>
                  <input
                    type="text"
                    value={newNameAr}
                    onChange={(e) => setNewNameAr(e.target.value)}
                    placeholder="حرير ملكي دمشقي"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Chinese Name</label>
                  <input
                    type="text"
                    value={newNameZh}
                    onChange={(e) => setNewNameZh(e.target.value)}
                    placeholder="皇家真丝大马士革"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="silk_jacquard">Silk & Jacquard</option>
                    <option value="acoustic_linen">Acoustic Linen</option>
                    <option value="suede_velvet">Suede & Velvet</option>
                    <option value="metallic_foil">Metallic Foil</option>
                    <option value="commercial_vinyl">Commercial Vinyl</option>
                    <option value="custom_mural">Custom Mural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Price (AED / m²)</label>
                  <input
                    type="number"
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Stock Rolls (Dubai)</label>
                  <input
                    type="number"
                    min="0"
                    value={newRolls}
                    onChange={(e) => setNewRolls(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-semibold">Image URL</label>
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-800 text-white font-bold text-xs hover:bg-amber-700 shadow-xs"
                >
                  Confirm & Add SKU
                </button>
              </div>
            </form>
          )}

          {/* Product Inventory Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-stone-100 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-start">{t.adminTableCode}</th>
                    <th className="px-4 py-3 text-start">{t.adminTableCategory}</th>
                    <th className="px-4 py-3 text-start">{t.adminTablePrice}</th>
                    <th className="px-4 py-3 text-start">{t.adminTableRolls}</th>
                    <th className="px-4 py-3 text-start">{t.adminTableStatus}</th>
                    <th className="px-4 py-3 text-end">{t.adminTableActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {localProducts.map((p) => {
                    const displayName = currentLang === 'ar' ? p.nameAr : currentLang === 'zh' ? p.nameZh : p.nameEn;
                    return (
                      <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* SKU and Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={p.imageUrl} 
                              alt={p.code} 
                              className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0" 
                            />
                            <div>
                              <div className="font-mono font-bold text-stone-900">{p.code}</div>
                              <div className="text-[11px] text-stone-500 truncate max-w-[180px]">{displayName}</div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3 text-stone-600">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 font-mono text-[10px]">
                            {p.category.replace('_', ' ')}
                          </span>
                        </td>

                        {/* Price per Sqm */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="1"
                              value={p.pricePerSqmAED}
                              onChange={(e) => handlePriceChange(p.id, parseFloat(e.target.value) || 0)}
                              className="w-16 px-2 py-1 bg-stone-50 border border-stone-200 rounded text-center font-mono font-bold text-amber-900"
                            />
                            <span className="text-stone-400 font-mono">AED</span>
                          </div>
                        </td>

                        {/* Dubai Warehouse Rolls (+ / - controls) */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleRollChange(p.id, -5)}
                              className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 font-bold text-stone-700 flex items-center justify-center cursor-pointer"
                              title="-5 rolls"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-mono font-bold text-stone-900">
                              {p.inStockRolls}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRollChange(p.id, 5)}
                              className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 font-bold text-stone-700 flex items-center justify-center cursor-pointer"
                              title="+5 rolls"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Stock Status Selector */}
                        <td className="px-4 py-3">
                          <select
                            value={p.stockStatus}
                            onChange={(e) => handleStatusChange(p.id, e.target.value as StockStatus)}
                            className="px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold"
                          >
                            <option value="in_stock">In Stock (Dubai)</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="made_to_order">Made to Order</option>
                            <option value="out_of_stock">Out of Stock</option>
                          </select>
                        </td>

                        {/* Delete action */}
                        <td className="px-4 py-3 text-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete SKU"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Admin Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            * Changes are persisted to local storage and active across all storefront pages.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors"
          >
            {t.adminClose}
          </button>
        </div>
      </div>
    </div>
  );
};
