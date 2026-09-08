import { WallcoveringProduct, Colorway, Language } from '../types';

export function formatWhatsAppUrl(phoneNumber: string, message: string): string {
  // Strip all non-digit characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function generateProductInquiryMessage(
  product: WallcoveringProduct,
  selectedColor: Colorway | undefined,
  lang: Language
): string {
  const colorName = selectedColor 
    ? (lang === 'ar' ? selectedColor.nameAr : lang === 'zh' ? selectedColor.nameZh : selectedColor.nameEn)
    : '';

  if (lang === 'ar') {
    return `مرحباً، أود الاستفسار بخصوص قماش الجدران من allwall:
• رمز المنتج: ${product.code}
• الاسم: ${product.nameAr}
${colorName ? `• اللون المفضل: ${colorName}\n` : ''}• السعر المعلن: ${product.pricePerSqmAED} درهم / متر مربع
• التوفر: ${product.stockStatus === 'in_stock' ? `متوفر (${product.inStockRolls} رول في مستودع دبي)` : 'طلب خاص / تصنيع'}

أرجو تزويدي بالكميات المتوفرة وأسعار الجملة للكميات الكبيرة وإمكانية زيارة المعرض في ورسان أو إرسال فني للقياس. شكراً!`;
  }

  if (lang === 'zh') {
    return `您好！我在【allwall 迪拜奢华无缝墙布】官网上看到了这款产品，特向您咨询：
• 款号 SKU: ${product.code}
• 品名: ${product.nameZh}
${colorName ? `• 心仪色号: ${colorName}\n` : ''}• 网站标价: ${product.pricePerSqmAED} AED / 平米
• 迪拜现货: ${product.inStockRolls} 卷 (${product.stockStatus === 'in_stock' ? '现货仓可快速发货' : '支持定制'})

请问当前针对该款号是否有工程批发优惠？另外方便安排上门量尺或来迪拜国际城展厅看实物大版吗？谢谢！`;
  }

  return `Hello allwall Wallcoverings Team, I would like to inquire about this wall covering collection:
• Product Code: ${product.code}
• Collection: ${product.nameEn}
${colorName ? `• Preferred Colorway: ${colorName}\n` : ''}• Listed Price: AED ${product.pricePerSqmAED} / sq.m
• Warehouse Availability: ${product.stockStatus === 'in_stock' ? `In Stock (${product.inStockRolls} rolls in Dubai)` : 'Made to Order'}

Could you please share stock availability, wholesale bulk project discounts, and the sample book? Thank you!`;
}

export function generateSampleBookingMessage(data: {
  clientName: string;
  phoneNumber: string;
  emirate: string;
  address: string;
  companyOrProject?: string;
  selectedCodes: string[];
  notes?: string;
  lang: Language;
}): string {
  const { clientName, phoneNumber, emirate, address, companyOrProject, selectedCodes, notes, lang } = data;
  const swatchesList = selectedCodes.length > 0 ? selectedCodes.join(', ') : 'Catalog Recommendation Book';

  if (lang === 'ar') {
    return `مرحباً allwall، أود تأكيد حجز صندوق العينات القماشية المجاني في دولة الإمارات:
• الاسم: ${clientName}
• رقم التواصل: ${phoneNumber}
• الإمارة / المدينة: ${emirate}
• عنوان التوصيل: ${address}
${companyOrProject ? `• الشركة أو المشروع: ${companyOrProject}\n` : ''}• العينات المطلوبة: ${swatchesList}
${notes ? `• ملاحظات إضافية: ${notes}\n` : ''}
يرجى تأكيد موعد الشحن والتوصيل مع المندوب. شكراً جزيلاً!`;
  }

  if (lang === 'zh') {
    return `您好！我刚在 allwall 官网提交了【免费实物样板册与色卡】寄送预约：
• 客户姓名: ${clientName}
• 联系电话: ${phoneNumber}
• 所在酋长国/城市: ${emirate}
• 详细收件地址: ${address}
${companyOrProject ? `• 公司/项目名称: ${companyOrProject}\n` : ''}• 申请样板型号: ${swatchesList}
${notes ? `• 备注要求: ${notes}\n` : ''}
请安排迪拜国际城现货仓专人寄送色卡样板，并请发我单号。谢谢！`;
  }

  return `Hello allwall Wallcoverings, I have submitted a Free Physical Sample Box request in the UAE:
• Name: ${clientName}
• Mobile / WhatsApp: ${phoneNumber}
• Emirate / City: ${emirate}
• Delivery Address: ${address}
${companyOrProject ? `• Company / Project: ${companyOrProject}\n` : ''}• Requested Sample SKUs: ${swatchesList}
${notes ? `• Special Notes: ${notes}\n` : ''}
Please confirm sample kit dispatch to my location. Thank you!`;
}

export function generateCalculatorQuoteMessage(data: {
  width: number;
  height: number;
  wallsCount: number;
  totalArea: number;
  fabricLength: number;
  rollsRecommended: number;
  estimatedCost: number;
  selectedProductCode?: string;
  lang: Language;
}): string {
  const { width, height, wallsCount, totalArea, fabricLength, rollsRecommended, estimatedCost, selectedProductCode, lang } = data;

  if (lang === 'ar') {
    return `مرحباً allwall، قمت بحساب أبعاد المشروع عبر حاسبة الموقع وأطلب عرض سعر دقيق:
${selectedProductCode ? `• رمز الموديل المرغوب: ${selectedProductCode}\n` : ''}• أبعاد الجدار: عرض ${width} م × ارتفاع ${height} م
• عدد الجدران: ${wallsCount}
• المساحة الكلية: ${totalArea.toFixed(1)} متر مربع
• طول القماش المستمر المطلوب: ${fabricLength.toFixed(1)} متر
• عدد اللفات الموصى بها: ${rollsRecommended} رول
• الميزانية التقديرية المحسوبة: حوالي ${estimatedCost.toLocaleString()} درهم إماراتي

أرجو تأكيد السعر النهائي مع الخصم للمشروع وإمكانية حجز موعد للمعاينة وأخذ القياسات الدقيقة في الموقع. شكراً!`;
  }

  if (lang === 'zh') {
    return `您好！我使用 allwall 官网智能计算器得出了房间墙布尺寸与预算估算，现申请精准工程报价：
${selectedProductCode ? `• 意向型号: ${selectedProductCode}\n` : ''}• 墙面规格: 宽 ${width}米 × 高 ${height}米
• 相同房间/墙面数: ${wallsCount} 面
• 实铺总平米: ${totalArea.toFixed(1)} m²
• 建议连续无缝布长: ${fabricLength.toFixed(1)} 米
• 推荐备货整卷数: ${rollsRecommended} 卷
• 官网预估预算: 约 ${estimatedCost.toLocaleString()} AED

请问针对此面积可享受多少工程优惠折扣？是否支持迪拜或阿布扎比现场复尺与安装？谢谢！`;
  }

  return `Hello allwall Wallcoverings, I calculated our project wallcovering requirements and would like an official quote:
${selectedProductCode ? `• Target Product Code: ${selectedProductCode}\n` : ''}• Dimensions: Width ${width}m × Height ${height}m
• Walls / Rooms: ${wallsCount}
• Total Surface Area: ${totalArea.toFixed(1)} sq.m
• Continuous Seamless Length: ${fabricLength.toFixed(1)} meters
• Recommended Rolls: ${rollsRecommended} Rolls
• Estimated Budget: Approx AED ${estimatedCost.toLocaleString()}

Please provide an exact quotation and advise if on-site measurement in Dubai/UAE is available. Thank you!`;
}
