import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Tıpkı request.ts'deki gibi 12 dilin hepsini buraya ekliyoruz
  locales: ['tr', 'en', 'ar', 'ru', 'de', 'fr', 'es', 'it', 'fa', 'az', 'nl', 'uk'],

  // Varsayılan dil
  defaultLocale: 'tr'
});

export const config = {
  // Matcher regex'ini de tüm dilleri kapsayacak şekilde güncelliyoruz
  matcher: ['/', '/(tr|en|ar|ru|de|fr|es|it|fa|az|nl|uk)/:path*']
};