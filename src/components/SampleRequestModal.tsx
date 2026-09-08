import React, { useState } from 'react';
import { 
  X, 
  Package, 
  MessageCircle, 
  Trash2, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Plus 
} from 'lucide-react';
import { Language, StoreSettings, WallcoveringProduct } from '../types';
import { translations, emiratesList } from '../data/translations';
import { formatWhatsAppUrl, generateSampleBookingMessage } from '../utils/whatsapp';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCodes: string[];
  onRemoveCode: (code: string) => void;
  products: WallcoveringProduct[];
  currentLang: Language;
  storeSettings: StoreSettings;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  isOpen,
  onClose,
  selectedCodes,
  onRemoveCode,
  products,
  currentLang,
  storeSettings
}) => {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedEmirate, setSelectedEmirate] = useState('Dubai');
  const [address, setAddress] = useState('');
  const [companyOrProject, setCompanyOrProject] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const t = translations[currentLang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phoneNumber.trim()) {
      alert(currentLang === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف للمتابعة' : currentLang === 'zh' ? '请填写您的称呼与联系电话' : 'Please enter your name and phone number to proceed');
      return;
    }

    const message = generateSampleBookingMessage({
      clientName,
      phoneNumber,
      emirate: selectedEmirate,
      address: address || 'To be confirmed on WhatsApp',
      companyOrProject,
      selectedCodes,
      notes,
      lang: currentLang
    });

    const url = formatWhatsAppUrl(storeSettings.whatsappNumber, message);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-900 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {t.sampleModalTitle}
              </h3>
              <p className="text-xs text-amber-200/80">
                UAE Express Dispatch • Dubai & Abu Dhabi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Subtitle / Promise */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.sampleModalSubtitle}
            </p>
          </div>

          {/* Selected Swatches Preview */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
              {t.selectedSwatches} ({selectedCodes.length}):
            </label>

            {selectedCodes.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 text-center text-xs text-stone-500">
                {t.noSwatchesSelected}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCodes.map((code) => {
                  const prod = products.find(p => p.code === code);
                  return (
                    <div 
                      key={code}
                      className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {prod && (
                          <img 
                            src={prod.imageUrl} 
                            alt={code} 
                            className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0" 
                          />
                        )}
                        <div className="truncate">
                          <div className="font-mono text-xs font-bold text-stone-900">{code}</div>
                          <div className="text-[11px] text-stone-500 truncate">
                            {prod ? (currentLang === 'ar' ? prod.nameAr : currentLang === 'zh' ? prod.nameZh : prod.nameEn) : 'Wallcovering'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveCode(code)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-200/60 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.clientName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Mohammed Al-Falasi / Mr. Zhang"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.phoneNumber} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+971 50 xxx xxxx"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.emirateLabel}
              </label>
              <select
                value={selectedEmirate}
                onChange={(e) => setSelectedEmirate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              >
                {emiratesList.map((em) => (
                  <option key={em.id} value={em.id}>
                    {currentLang === 'ar' ? em.nameAr : currentLang === 'zh' ? em.nameZh : em.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.companyLabel}
              </label>
              <input
                type="text"
                value={companyOrProject}
                onChange={(e) => setCompanyOrProject(e.target.value)}
                placeholder="e.g. Villa 14 Emirates Hills / Studio Luxe"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.addressLabel}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Street 12, Villa 45, Al Barsha 2, Dubai"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please include both gold and champagne fabric swatches..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            />
          </div>

          {/* UAE WhatsApp Submit Button */}
          <div className="pt-2">
            <button
              id="submit-sample-request-btn"
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.submitSampleWhatsApp}</span>
            </button>
            <p className="text-[11px] text-center text-stone-500 mt-2">
              {t.sampleDisclaimer}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
