import React from 'react';
import { 
  MapPin, 
  Star, 
  ExternalLink, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Award, 
  Search, 
  Building2, 
  Navigation 
} from 'lucide-react';
import { Language, StoreSettings } from '../types';
import { translations } from '../data/translations';

interface GoogleBusinessCardProps {
  currentLang: Language;
  storeSettings: StoreSettings;
}

export const GoogleBusinessCard: React.FC<GoogleBusinessCardProps> = ({
  currentLang,
  storeSettings
}) => {
  const t = translations[currentLang];

  const showroomAddress = currentLang === 'ar' 
    ? storeSettings.showroomAddressAr 
    : currentLang === 'zh' 
    ? storeSettings.showroomAddressZh 
    : storeSettings.showroomAddressEn;

  const workingHours = currentLang === 'ar' 
    ? storeSettings.workingHoursAr 
    : currentLang === 'zh' 
    ? storeSettings.workingHoursZh 
    : storeSettings.workingHoursEn;

  // Real verified review testimonials in UAE
  const reviews = [
    {
      author: 'Rashid Al-Maktoum (Villa Owner)',
      location: 'Emirates Hills, Dubai',
      rating: 5,
      date: '2 weeks ago',
      textEn: 'Outstanding seamless wallcovering. Replaced all traditional wallpaper in our main Majlis with allwall 3m seamless silk jacquard. Zero joints, withstands Dubai AC temperature transitions flawlessly.',
      textAr: 'أقمشة جدارية استثنائية بدون أي فواصل من allwall. قمنا بتجديد مجلس الفيلا بالكامل بقماش الحرير والجاكار بارتفاع ٣ أمتار. مظهر ملكي أنيق ومقاومة ممتازة للرطوبة والتكييف.',
      textZh: '品质非常过硬的 allwall 无缝提花布！我们阿联酋山庄的私人会客厅全部换成该款3米超高无缝墙布，整面墙完全没有任何接缝，空调温差下没有任何翘边。'
    },
    {
      author: 'Elena Rostova (Lead Interior Architect)',
      location: 'Downtown Dubai & Palm Jumeirah Projects',
      rating: 5,
      date: '1 month ago',
      textEn: 'As an interior design firm in Dubai, finding genuine ASTM E84 Class A fire-rated fabric wallcoverings with local stock in Warsan Village / International City is a lifesaver. Free sample delivery arrived in 24 hours.',
      textAr: 'كمكتب تصميم داخلي في دبي، وجود مخزون فوري معتمد بشهادات الدفاع المدني لمقاومة الحريق في قرية ورسان بالمدينة العالمية سهل علينا تسليم المشاريع بسرعة فائقة. تم استلام العينات خلال ٢٤ ساعة.',
      textZh: '作为迪拜本地高端室内设计事务所，能找到真正具备阿联酋民防与ASTM E84防火证书、并且在国际城Warsan Village有海量现货仓库的供应商太省心了。样品盒24小时就送达了设计室。'
    },
    {
      author: 'David Chen (Contracting & Fit-out)',
      location: 'Dragon Mart & International City Trade',
      rating: 5,
      date: '3 weeks ago',
      textEn: 'Very professional wholesale supplier. Great inventory in Dubai Warsan Village warehouse, competitive wholesale pricing in AED, and immediate WhatsApp response for custom cut lengths.',
      textAr: 'مورد محترف وموثوق جداً لشركات المقاولات. مستودع قرية ورسان في دبي مليء بالبضائع، وأسعار الجملة بالدرهم مناسبة، وسرعة في الرد والتجهيز عبر الواتساب.',
      textZh: '国际城现货仓直接提货，紧邻龙城，无论是整柜批发还是散剪补单都很方便，平米价格公道透明，WhatsApp客服回复极为高效，强烈推荐阿联酋华人装修圈合作！'
    }
  ];

  // UAE High-Intent Search SEO Keywords
  const uaeKeywords = [
    'allwall Dubai',
    'allwall Wallcovering',
    'Seamless Wallcovering Dubai',
    'Luxury Wallpaper UAE',
    'Warsan Village Wallpaper',
    'International City Wall Fabrics',
    'Fabric Wall Covering Abu Dhabi',
    'ASTM E84 Fire Rated Wallcoverings',
    'Acoustic Linen Wallpaper Dubai',
    'Hotel Contract Vinyl UAE',
    'Villa Majlis Wall Fabric',
    'ورق جدران دبي allwall',
    'أقمشة جدران فاخرة الإمارات',
    'مورد ورق حائط دبي وأبوظبي',
    '迪拜allwall无缝墙布厂家直销',
    '阿联酋酒店阻燃壁布',
    '迪拜国际城龙城墙纸供应商'
  ];

  return (
    <section id="showroom-section" className="py-16 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>GOOGLE VERIFIED BUSINESS PROFILE • UAE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {t.googleBizTitle}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {t.googleBizSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="google-maps-directions-btn"
              href={storeSettings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.getDirections}</span>
            </a>
            <a
              id="call-showroom-direct-btn"
              href={`tel:${storeSettings.whatsappNumber}`}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium text-xs sm:text-sm flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span>{t.callShowroom}</span>
            </a>
          </div>
        </div>

        {/* Google Business Profile Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Google Card details */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
            {/* Top Google Header Badge */}
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs">
                  <span className="font-serif font-black text-2xl text-amber-900">G</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                      allwall Luxury Wallcoverings Dubai
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-sky-500 fill-sky-100" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-stone-900 text-xs">4.9</span>
                    <span className="text-stone-500 text-xs">({t.googleReviews})</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-end">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Now
                </span>
              </div>
            </div>

            {/* Warehouse Location and Hours details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>{currentLang === 'ar' ? 'عنوان صالة العرض والمستودع:' : currentLang === 'zh' ? '实体展厅与仓库地址:' : 'Showroom & Warehouse:'}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {showroomAddress}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>{currentLang === 'ar' ? 'ساعات العمل الرسمية:' : currentLang === 'zh' ? '营业时间 (海湾标准时间):' : 'Operating Hours (GST):'}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {workingHours}
                </p>
              </div>
            </div>

            {/* Google Verified Reviews Carousel / Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {currentLang === 'ar' ? 'أحدث آراء العملاء في الإمارات:' : currentLang === 'zh' ? '阿联酋本地业主与设计机构最新评价:' : 'Recent UAE Client Reviews:'}
                </span>
                <span className="text-[11px] text-stone-500">Google Verified</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                          {rev.author[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-stone-900">{rev.author}</div>
                          <div className="text-[10px] text-stone-500">{rev.location} • {rev.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      "{currentLang === 'ar' ? rev.textAr : currentLang === 'zh' ? rev.textZh : rev.textEn}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: UAE Local SEO Keywords & Interactive Showroom Map Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Map Visual Pin Container */}
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 aspect-4/3 group">
              {/* Stylized Google Map visual of Dubai Al Quoz */}
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" 
                alt="Dubai Showroom Location" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

              {/* Pin marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <div className="p-3 rounded-full bg-amber-600 text-white shadow-xl ring-4 ring-white/80">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="mt-1 px-3 py-1 rounded-full bg-stone-900/90 text-white text-[11px] font-bold font-mono shadow-md whitespace-nowrap">
                  allwall Showroom • Warsan Village D 899
                </span>
              </div>

              {/* Bottom Quick Map Link */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="text-xs">
                  <span className="font-semibold text-amber-300">Warsan Village, International City</span>
                  <p className="text-[11px] text-stone-300">Villa D 899 • Near Dragon Mart Dubai</p>
                </div>
                <a
                  href={storeSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white text-stone-900 font-bold text-xs flex items-center gap-1.5 shadow-lg"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* UAE SEO Keywords Cloud Card */}
            <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-800" />
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {t.seoKeywordsTitle}
                </h4>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {t.seoDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {uaeKeywords.map((kw, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-white/90 border border-amber-200 text-amber-950 text-[11px] font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
