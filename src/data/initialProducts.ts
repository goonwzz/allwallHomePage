import { WallcoveringProduct, StoreSettings } from '../types';

export const defaultStoreSettings: StoreSettings = {
  whatsappNumber: '971551789188', // WhatsApp (+971 55 178 9188)
  displayPhone: '+971 55 178 9188',
  secondaryPhone: '',
  email: 'contact@allwall.ae',
  companyNameEn: 'allwall Luxury Wallcoverings Dubai',
  companyNameAr: 'allwall لأقمشة الجدران الفاخرة دبي',
  companyNameZh: 'allwall 迪拜奢华无缝墙布',
  showroomAddressEn: 'Warsan Village Villa D 899, International City, Dubai, United Arab Emirates',
  showroomAddressAr: 'قرية ورسان فيلا D 899، المدينة العالمية (إنترناشونال سيتي)، دبي، الإمارات العربية المتحدة',
  showroomAddressZh: '阿联酋迪拜国际城 Warsan Village Villa D 899',
  googleMapsUrl: 'https://maps.google.com/?q=Warsan+Village+Villa+D+899+International+City+Dubai',
  workingHoursEn: 'Monday to Saturday: 8:30 AM – 8:00 PM | Sunday: 10:00 AM – 6:00 PM',
  workingHoursAr: 'الإثنين إلى السبت: ٨:٣٠ صباحاً – ٨:٠٠ مساءً | الأحد: ١٠:٠٠ صباحاً – ٦:٠٠ مساءً',
  workingHoursZh: '周一至周六: 8:30 – 20:00 | 周日: 10:00 – 18:00'
};

export const initialProducts: WallcoveringProduct[] = [
  {
    id: 'prod-01',
    code: 'AW-9101',
    nameEn: 'Imperial Damask Pure Silk Jacquard',
    nameAr: 'جاكار الحرير الإمبراطوري دمشقي فاخر',
    nameZh: '皇家真丝高密大马士革无缝提花',
    category: 'silk_jacquard',
    pricePerSqmAED: 28,
    inStockRolls: 38,
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    isFeatured: true,
    sampleAvailable: true,
    suitableRooms: ['majlis', 'living_room', 'dining_room'],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    descriptionEn: 'Ultra-high density silk jacquard with subtle metallic weave reflecting Arabian sunlight. Engineered at 3.05m seamless height specifically for grand Emirates Hills and Palm Jumeirah villa majlis halls.',
    descriptionAr: 'حرير وجاكار فائق الكثافة بنسيج معدني خافت يعكس ضوء الشمس العربي. مصمم بارتفاع ٣.٠٥ متر بدون فواصل خصيصاً لمجالس فلل تلال الإمارات ونخلة جميرا الفاخرة.',
    descriptionZh: '超高密真丝大马士革提花，微光金丝交织。3.05米高定无缝高度，专为迪拜阿联酋山庄及朱美拉棕榈岛高端别墅阿拉伯会客厅（Majlis）量身定制。',
    tags: ['Luxury Majlis', 'Silk Jacquard', 'Seamless 3m', 'allwall Exclusive'],
    specs: {
      gsm: 480,
      fireRating: 'ASTM E84 Class A (UAE Civil Defense Compliant)',
      waterResistant: true,
      mildewResistant: true,
      soundAbsorption: 'NRC 0.32 (Echo Reduction)',
      seamlessHeight: '3.05 Meters (Continuous Seamless)',
      rollLength: 50,
      ecoCert: 'OEKO-TEX Standard 100 / Low TVOC',
      cleaningGuideEn: 'Vacuum lightly; wipe with damp soft microfiber cloth and neutral cleanser.',
      cleaningGuideAr: 'تنظيف خفيف بالمكنسة الكهربائية والمسح بقطعة قماش ناعمة مع منظف معتدل.',
      cleaningGuideZh: '吸尘器日常吸尘；轻微污渍可用湿微纤维布蘸中性清洗剂轻擦。'
    },
    colorways: [
      {
        id: 'c1',
        nameEn: 'Oasis Gold & Champagne',
        nameAr: 'ذهب الواحة والشمبانيا',
        nameZh: '沙漠香槟金',
        hex: '#C8A870',
        textureLabelEn: 'Silk Sheen',
        textureLabelAr: 'بريق حريري',
        textureLabelZh: '微光丝光'
      },
      {
        id: 'c2',
        nameEn: 'Royal Ivory & Platinum',
        nameAr: 'العاج الملكي والبلاتين',
        nameZh: '皇家象牙白金',
        hex: '#E6E1DA',
        textureLabelEn: 'Matte Pearl',
        textureLabelAr: 'لؤلؤي غير لامع',
        textureLabelZh: '柔润珠光'
      },
      {
        id: 'c3',
        nameEn: 'Midnight Arabian Blue',
        nameAr: 'أزرق ليالي العرب الملكي',
        nameZh: '阿拉伯午夜蓝',
        hex: '#1D2A44',
        textureLabelEn: 'Rich Contrast',
        textureLabelAr: 'تباين غني',
        textureLabelZh: '深邃提花'
      }
    ]
  },
  {
    id: 'prod-02',
    code: 'AW-7208',
    nameEn: 'Desert Sand Organic Acoustic Linen',
    nameAr: 'كتان عضوي عازل للصوت بلون رمال الصحراء',
    nameZh: '天然透气吸音高密原织亚麻',
    category: 'acoustic_linen',
    pricePerSqmAED: 22,
    inStockRolls: 52,
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    isFeatured: true,
    sampleAvailable: true,
    suitableRooms: ['living_room', 'master_bedroom', 'office'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    descriptionEn: 'Pure natural linen texture with non-woven acoustic backing that breathes effectively in GCC air-conditioned environments, preventing mold while absorbing reverberations in high-ceiling spaces.',
    descriptionAr: 'ملمس كتان طبيعي نقي مع طبقة خلفية عازلة للصوت تتنفس بكفاءة في بيئة التكييف الخليجية، وتمنع العفن وتمتص صدى الصوت في الأسقف المرتفعة.',
    descriptionZh: '天然高品质原麻纹理，搭配吸音无纺布底，在中东常年空调环境下透气防潮，防霉抗裂，有效消除挑高大平层的声音回荡。',
    tags: ['Acoustic', 'Anti-Mold', 'Natural Linen', 'Breathable'],
    specs: {
      gsm: 410,
      fireRating: 'ASTM E84 Class A',
      waterResistant: true,
      mildewResistant: true,
      soundAbsorption: 'NRC 0.38 (High Acoustic Performance)',
      seamlessHeight: '3.10 Meters',
      rollLength: 60,
      ecoCert: 'Greenguard Gold Certified',
      cleaningGuideEn: 'Dry clean brush or dry sponge; naturally dust-repellent.',
      cleaningGuideAr: 'تنظيف بالفرشاة الجافة أو الإسفنج؛ مقاوم طبيعي للأتربة.',
      cleaningGuideZh: '软毛刷除尘；天然抗静电不易积灰。'
    },
    colorways: [
      {
        id: 'c4',
        nameEn: 'Warm Desert Khaki',
        nameAr: 'كاكي رمال الصحراء الدافئ',
        nameZh: '沙漠暖卡其',
        hex: '#C2B199',
        textureLabelEn: 'Raw Slub Texture',
        textureLabelAr: 'نسيج خشن طبيعي',
        textureLabelZh: '粗粝肌理'
      },
      {
        id: 'c5',
        nameEn: 'Alabaster Chalk Grey',
        nameAr: 'رمادي طباشيري ناعم',
        nameZh: '雪花石灰',
        hex: '#D9D7D2',
        textureLabelEn: 'Fine Weave',
        textureLabelAr: 'نسيج ناعم دقيق',
        textureLabelZh: '细腻平纹'
      },
      {
        id: 'c6',
        nameEn: 'Earthy Clay Terracotta',
        nameAr: 'طين أرضي تيراكوتا',
        nameZh: '陶土大地色',
        hex: '#A77560',
        textureLabelEn: 'Textured Depth',
        textureLabelAr: 'عمق لوني بارز',
        textureLabelZh: '温润厚实质感'
      }
    ]
  },
  {
    id: 'prod-03',
    code: 'AW-8403',
    nameEn: 'Emirati Royal Suede & Embossed Velvet',
    nameAr: 'شمواه ومخمل إماراتي ملكي منقوش',
    nameZh: '中东奢华微绒仿麂皮立体压纹',
    category: 'suede_velvet',
    pricePerSqmAED: 26,
    inStockRolls: 24,
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    isFeatured: true,
    sampleAvailable: true,
    suitableRooms: ['master_bedroom', 'majlis', 'hotel_project'],
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    descriptionEn: 'Plush thermal-insulated faux suede wall covering with deep tactile warmth. Perfect for master suites, home cinemas, and VIP boardrooms across Dubai and Abu Dhabi.',
    descriptionAr: 'قماش جدران فاخر من الشمواه مع ملمس دافئ وعزل حراري فائق. مثالي للأجنحة الرئيسية وصالات السينما المنزلية وقاعات كبار الشخصيات.',
    descriptionZh: '丝滑亲肤的微绒仿麂皮质感，具有优异的遮光与保温吸音效果。是迪拜与阿布扎比豪宅主卧套房、私人影音室及VIP接待室的首选。',
    tags: ['Royal Suede', 'Cinema Room', 'Sound Dampening', 'Ultra Luxury'],
    specs: {
      gsm: 520,
      fireRating: 'ASTM E84 Class A (Flame Retardant)',
      waterResistant: true,
      mildewResistant: true,
      soundAbsorption: 'NRC 0.45 (Studio Acoustic Grade)',
      seamlessHeight: '3.00 Meters',
      rollLength: 45,
      ecoCert: 'OEKO-TEX Certified non-toxic',
      cleaningGuideEn: 'Soft velvet brush; gentle steam refreshing if needed.',
      cleaningGuideAr: 'فرشاة مخمل ناعمة؛ يمكن استخدام البخار الخفيف عند الحاجة.',
      cleaningGuideZh: '专用丝绒软刷；也可用蒸汽熨刷远距离杀菌蓬松。'
    },
    colorways: [
      {
        id: 'c7',
        nameEn: 'Emirates Forest Emerald',
        nameAr: 'زمردي غابات الإمارات',
        nameZh: '祖母绿奢绒',
        hex: '#234433',
        textureLabelEn: 'Velvety Suede',
        textureLabelAr: 'ملمس مخملي',
        textureLabelZh: '哑光丝绒'
      },
      {
        id: 'c8',
        nameEn: 'Dune Sand Velour',
        nameAr: 'بيج كثبان الرمال',
        nameZh: '流沙暖驼绒',
        hex: '#BAA288',
        textureLabelEn: 'Soft Sheen',
        textureLabelAr: 'بريق ناعم',
        textureLabelZh: '细腻触感'
      },
      {
        id: 'c9',
        nameEn: 'Bespoke Charcoal Graphite',
        nameAr: 'فحمي جرافيت مخصص',
        nameZh: '石墨曜黑绒',
        hex: '#37383B',
        textureLabelEn: 'Deep Shadow',
        textureLabelAr: 'ظل عميق',
        textureLabelZh: '立体暗黑'
      }
    ]
  },
  {
    id: 'prod-04',
    code: 'AW-6502',
    nameEn: 'Burj Gold Leaf & Brushed Metallic Wallcloth',
    nameAr: 'قماش حائط رقائق ذهب برج خليفة والمعدن المصقول',
    nameZh: '哈利法金属金箔拉丝轻奢无缝布',
    category: 'metallic_foil',
    pricePerSqmAED: 29,
    inStockRolls: 18,
    stockStatus: 'low_stock',
    leadTimeDays: 2,
    isFeatured: true,
    sampleAvailable: true,
    suitableRooms: ['living_room', 'dining_room', 'hotel_project'],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    descriptionEn: 'Contemporary brushed brass and gold leaf interlaced with woven fiber core. Creates a dazzling reflection under chandeliers, accentuating modern architecture in Downtown Dubai penthouses.',
    descriptionAr: 'نحاس مصقول حديث ورقائق ذهبية متداخلة مع ألياف منسوجة. يعطي انعكاسات آسرة تحت الثريات لإبراز فخامة بنتهاوس داون تاون دبي.',
    descriptionZh: '将现代拉丝金属丝与金箔微粒融入底织结构，在吊灯光影下展现流光溢彩的奢华层次，现代极简大平层背景墙点睛之作。',
    tags: ['Metallic Gold', 'Penthouse Luxe', 'Reflective Sheen', 'Downtown Dubai'],
    specs: {
      gsm: 490,
      fireRating: 'ASTM E84 Class A',
      waterResistant: true,
      mildewResistant: true,
      soundAbsorption: 'NRC 0.28',
      seamlessHeight: '3.00 Meters',
      rollLength: 40,
      ecoCert: 'Zero Formaldehyde Tested',
      cleaningGuideEn: 'Wipe lightly with dry or slightly damp soft cloth only.',
      cleaningGuideAr: 'المسح بقطعة قماش ناعمة جافة أو رطبة قليلاً فقط.',
      cleaningGuideZh: '仅需柔软干布或微湿棉布轻轻擦拭表面。'
    },
    colorways: [
      {
        id: 'c10',
        nameEn: 'Burj Champagne Gold',
        nameAr: 'ذهب الشمبانيا البرجي',
        nameZh: '哈利法金箔',
        hex: '#D1B46A',
        textureLabelEn: 'Metallic Brush',
        textureLabelAr: 'معدن مصقول',
        textureLabelZh: '金属拉丝'
      },
      {
        id: 'c11',
        nameEn: 'Rose Gold Shimmer',
        nameAr: 'بريق الذهب الوردي',
        nameZh: '暮光玫瑰金',
        hex: '#CFA18C',
        textureLabelEn: 'Gentle Glow',
        textureLabelAr: 'توهج هادئ',
        textureLabelZh: '微光玫瑰'
      },
      {
        id: 'c12',
        nameEn: 'Brushed Titanium Bronze',
        nameAr: 'برونز تيتانيوم مصقول',
        nameZh: '钛金古铜',
        hex: '#8C7456',
        textureLabelEn: 'Architectural Metal',
        textureLabelAr: 'معدن معماري',
        textureLabelZh: '重金属哑光'
      }
    ]
  },
  {
    id: 'prod-05',
    code: 'AW-5110',
    nameEn: 'Commercial Heavy-Duty Fire-Rated Fabric Vinyl',
    nameAr: 'فينيل قماشي معتمد للمشاريع الفندقية والمقاومة العالية',
    nameZh: '阿联酋五星酒店工程级加厚阻燃布底PVC',
    category: 'commercial_vinyl',
    pricePerSqmAED: 18,
    inStockRolls: 140,
    stockStatus: 'in_stock',
    leadTimeDays: 1,
    isFeatured: false,
    sampleAvailable: true,
    suitableRooms: ['hotel_project', 'office', 'living_room'],
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    descriptionEn: 'High-traffic commercial wallcovering featuring a woven fabric backing with an antimicrobial, scrubbable vinyl surface. Certified for Dubai Civil Defense, major hospitality brands, and high-rise developments.',
    descriptionAr: 'قماش جدران تجاري للمناطق عالية الحركة مع ظهر قماشي منسوج وسطح فينيل قابل للغسل ومضاد للميكروبات. معتمد لمشاريع الفنادق والدفاع المدني.',
    descriptionZh: '重度耐磨酒店工程级墙布，加厚布底结合抗磨抗菌压纹表层，可用洗涤剂反复擦洗。阿联酋民防防火核准，常年大量供货迪拜五星酒店与写字楼。',
    tags: ['Hotel Grade', 'High Traffic', 'Scrubbable', 'UAE Civil Defense'],
    specs: {
      gsm: 580,
      fireRating: 'Class 0 / ASTM E84 Class A (UAE Civil Defense Verified)',
      waterResistant: true,
      mildewResistant: true,
      soundAbsorption: 'NRC 0.25',
      seamlessHeight: '2.80 - 3.00 Meters',
      rollLength: 70,
      ecoCert: 'Type II Commercial Wallcovering Standard',
      cleaningGuideEn: 'Washable with sponge, soap and standard sanitizers.',
      cleaningGuideAr: 'قابل للغسل التام بالإسفنج والصابون والمعقمات.',
      cleaningGuideZh: '耐酸碱擦洗，可用海绵、清洁剂及消毒液水洗。'
    },
    colorways: [
      {
        id: 'c13',
        nameEn: 'Jumeirah Travertine Cream',
        nameAr: 'كريمي ترافرتين جميرا',
        nameZh: '洞石暖米黄',
        hex: '#E0D5C1',
        textureLabelEn: 'Stone Stucco',
        textureLabelAr: 'ملمس حجري',
        textureLabelZh: '石纹肌理'
      },
      {
        id: 'c14',
        nameEn: 'Corporate Business Silver',
        nameAr: 'فضي مكتبي للأعمال',
        nameZh: '商务沉着银灰',
        hex: '#BFC3C7',
        textureLabelEn: 'Cross-Hatch',
        textureLabelAr: 'تظليل متقاطع',
        textureLabelZh: '编织网纹'
      }
    ]
  },
  {
    id: 'prod-06',
    code: 'AW-9988',
    nameEn: 'Custom Seamless Panoramic Mural: Arabian Mirage',
    nameAr: 'جدارية بانورامية مخصصة بدون فواصل: سراب الصحراء والخليج',
    nameZh: '高定巨幅无缝全景壁画：阿拉伯金色幻境',
    category: 'custom_mural',
    pricePerSqmAED: 29,
    inStockRolls: 15,
    stockStatus: 'made_to_order',
    leadTimeDays: 5,
    isFeatured: true,
    sampleAvailable: true,
    suitableRooms: ['majlis', 'living_room', 'dining_room'],
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    descriptionEn: 'One continuous, un-split artistic silk fresco rendered to exact wall dimensions up to 25 meters in length without a single seam. Depicting abstract Arabian golden dunes and modern Dubai skyline mirage.',
    descriptionAr: 'لوحة جدارية فنية حريرية مستمرة بقطعة واحدة مقصوصة حسب أبعاد جدارك بدقة حتى طول ٢٥ متراً بدون أي فاصل. تجسد الكثبان الذهبية وأفق دبي المعاصر.',
    descriptionZh: '按墙面尺寸一比一高定打印整幅无缝丝绸壁画，最长可达25米无任何裁切拼缝。融合阿拉伯金色沙丘与现代天际线抽象意境，气派非凡。',
    tags: ['Custom Mural', 'No Seam 25m', 'Artistic Silk', 'VIP Villa'],
    specs: {
      gsm: 450,
      fireRating: 'ASTM E84 Class A',
      waterResistant: true,
      mildewResistant: true,
      soundAbsorption: 'NRC 0.35',
      seamlessHeight: 'Up to 3.80 Meters Custom Height',
      rollLength: 25,
      ecoCert: 'UV Pigment Inks Zero Odor',
      cleaningGuideEn: 'Dust with electrostatic duster or dry microfiber.',
      cleaningGuideAr: 'تنظيف بواسطة منفضة الغبار الكهروستاتيكية أو قماش جاف.',
      cleaningGuideZh: '静电除尘掸或干微纤维布扫尘；环保UV微喷持久不掉色。'
    },
    colorways: [
      {
        id: 'c15',
        nameEn: 'Golden Mirage Accent',
        nameAr: 'لمسات السراب الذهبي',
        nameZh: '金辉落霞全景',
        hex: '#D6A85D',
        textureLabelEn: 'Silk Canvas',
        textureLabelAr: 'قماش حريري فني',
        textureLabelZh: '丝绢宣画'
      },
      {
        id: 'c16',
        nameEn: 'Opal Mist & Pearl',
        nameAr: 'ضباب الأوبال واللؤلؤ',
        nameZh: '淡雅珠光水墨',
        hex: '#DDD7CB',
        textureLabelEn: 'Subtle Sheen',
        textureLabelAr: 'لمعان لؤلؤي هادئ',
        textureLabelZh: '柔和珠光'
      }
    ]
  }
];
