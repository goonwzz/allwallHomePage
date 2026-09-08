export type Language = 'en' | 'ar' | 'zh';

export type StockStatus = 'in_stock' | 'low_stock' | 'made_to_order' | 'out_of_stock';

export type ProductCategory = 
  | 'silk_jacquard'
  | 'acoustic_linen'
  | 'suede_velvet'
  | 'metallic_foil'
  | 'commercial_vinyl'
  | 'custom_mural';

export type RoomSuitability = 'majlis' | 'living_room' | 'master_bedroom' | 'hotel_project' | 'dining_room' | 'office';

export interface Colorway {
  id: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  hex: string;
  patternUrl?: string;
  textureLabelEn: string;
  textureLabelAr: string;
  textureLabelZh: string;
}

export interface ProductSpecs {
  gsm: number; // grams per square meter
  fireRating: string; // e.g. ASTM E84 Class A / UAE Civil Defense
  waterResistant: boolean;
  mildewResistant: boolean;
  soundAbsorption: string; // e.g. NRC 0.35
  seamlessHeight: string; // e.g. 2.8m - 3.2m
  rollLength: number; // e.g. 50m / roll or cut to length
  ecoCert: string; // e.g. OEKO-TEX Standard 100 / Low VOC
  cleaningGuideEn: string;
  cleaningGuideAr: string;
  cleaningGuideZh: string;
}

export interface WallcoveringProduct {
  id: string;
  code: string; // e.g. AQ-701
  nameEn: string;
  nameAr: string;
  nameZh: string;
  category: ProductCategory;
  pricePerSqmAED: number;
  inStockRolls: number; // Rolls in Dubai warehouse
  stockStatus: StockStatus;
  leadTimeDays: number; // 1-2 days for in-stock, 7-14 for made to order
  isFeatured: boolean;
  sampleAvailable: boolean;
  suitableRooms: RoomSuitability[];
  imageUrl: string;
  secondaryImageUrl?: string;
  colorways: Colorway[];
  specs: ProductSpecs;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh: string;
  tags: string[];
}

export interface SampleRequest {
  id: string;
  clientName: string;
  phoneNumber: string;
  emirate: string;
  address: string;
  companyOrProject?: string;
  selectedProductCodes: string[];
  notes?: string;
  createdAt: string;
}

export interface StoreSettings {
  whatsappNumber: string; // UAE format, digits only without +, e.g. 971551789188
  displayPhone: string; // e.g. +971 55 178 9188
  secondaryPhone: string; // e.g. 052 138 6870 or +971 52 138 6870
  email: string;
  companyNameEn: string;
  companyNameAr: string;
  companyNameZh: string;
  showroomAddressEn: string;
  showroomAddressAr: string;
  showroomAddressZh: string;
  googleMapsUrl: string;
  workingHoursEn: string;
  workingHoursAr: string;
  workingHoursZh: string;
}
