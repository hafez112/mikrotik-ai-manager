# MikroTik AI Manager

تطبيق ويب تقدمي لإدارة MikroTik. هذه النسخة تتضمن واجهة عربية، خادم API، ومزود RouterOS REST آمن مع وضع تجريبي عند عدم ضبط بيانات الجهاز.

## التشغيل

```bash
cp .env.example .env
npm start
```

افتح `http://localhost:3000`.

## ربط RouterOS

اضبط `MIKROTIK_URL` مثل `https://192.168.88.1` و`MIKROTIK_USER` و`MIKROTIK_PASSWORD`. يفضل استخدام HTTPS وشهادة موثوقة، ولا تعرض الخادم مباشرة للإنترنت.

## API

- `GET /api/health`
- `GET /api/devices`
- `GET /api/routeros/system/resource`
- `POST /api/ai/analyze` مع `{ "question": "..." }`

أوامر RouterOS الفعلية محمية ولا توجد نقطة تنفيذ عامة للأوامر في هذه النسخة. أضف المصادقة والصلاحيات قبل تشغيلها في بيئة إنتاجية.
