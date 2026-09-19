# تطبيق Android حقيقي

هذا المشروع يستخدم Capacitor لتحويل واجهة الويب إلى تطبيق Android أصلي، ويستخدم Node.js API مع SQLite للتخزين.

## إعداد أول مرة

```bash
npm install
npx cap add android
npm run android:sync
```

لإنشاء APK تجريبي:

```bash
npm run android:build
```

سيظهر الملف في:
`android/app/build/outputs/apk/debug/app-debug.apk`

لفتح المشروع في Android Studio:

```bash
npm run android:open
```

## متطلبات Android

- Node.js 20 أو أحدث
- Android Studio
- Android SDK وPlatform Tools
- Java 17

## SQLite

يُحفظ SQLite في `data/mikrotik-ai.sqlite` عند تشغيل Node.js. في Render استخدم PostgreSQL أو Render Disk للحفاظ على البيانات؛ نظام ملفات الخدمة وحده غير دائم. تطبيق Android يتصل بخادم Node المنشور عبر HTTPS، ولا يضع بيانات MikroTik داخل التطبيق.

اضبط عنوان الـ API قبل بناء التطبيق في واجهة Capacitor أو عبر متغير بيئة للخادم. لا تستخدم عنوان `localhost` داخل Android؛ استخدم رابط Render HTTPS.
