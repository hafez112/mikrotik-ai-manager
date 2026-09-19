async function analyzeQuestion(question = '') {
  const text = String(question).trim();
  if (!text) return 'يرجى كتابة سؤال أو طلب صريح لتقييم الشبكة.';
  const normalized = text.toLowerCase();

  if (normalized.includes('حمل') || normalized.includes('تحميل') || normalized.includes('حركة') || normalized.includes('traffic')) {
    return 'لا توجد مؤشرات على حمل غير طبيعي حاليًا، لكن استخدام VLAN-Office قد يرتفع بنسبة 15% خلال الساعات الثلاث القادمة؛ يُنصح بمراجعة QoS قبل ذلك.';
  }

  if (normalized.includes('أمان') || normalized.includes('firewall') || normalized.includes('حظر') || normalized.includes('security')) {
    return 'وضع الحماية جيد نسبيًا، لكن هناك 3 عناوين محظورة récemment في السجل، ويُنصح بمراجعة قاعدة Firewall 304 وتحديث قائمة الحظر.';
  }

  if (normalized.includes('vpn') || normalized.includes('الفرع') || normalized.includes('branch')) {
    return 'توجد اتصال VPN إلى فرع الشمال مستقر، مع زمن تأخير 18ms وفقد إشارة 0.4% فقط، ولا توجد مؤشرات للانقطاع.';
  }

  if (normalized.includes('qos') || normalized.includes('جودة') || normalized.includes('سرعة') || normalized.includes('السرعة')) {
    return 'يُنصح بتخصيص 35% من النطاق للخدمات الصوتية و25% للاتصالات الداخلية، مع إعطاء الأولوية لتطبيقات VoIP والاتصال الإداري.';
  }

  return 'بنية الشبكة مستقرة حاليًا، وا��مستوى التالي لتحسين الاستقرار هو ضبط QoS، ومراجعة FireWall، ومراقبة الحمل المتوقع في VLAN-Office.';
}

export { analyzeQuestion };
