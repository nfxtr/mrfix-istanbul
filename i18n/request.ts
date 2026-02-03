import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Gelen dil isteğini al
  let locale = await requestLocale;

  // Desteklenen tüm dillerin listesi
  const supportedLocales = ['tr', 'en', 'ru', 'ar', 'de', 'fr', 'es', 'it', 'fa', 'az', 'nl', 'uk'];

  // Eğer gelen dil undefined ise veya listemizde yoksa 'tr'ye zorla
  if (!locale || !supportedLocales.includes(locale)) {
    locale = 'tr';
  }

  return {
    locale,
    // Mesaj dosyasını içe aktar
    // Not: messages klasörü bu dosyanın bir üst dizinindeyse (../messages) bu yol doğrudur.
    messages: (await import(`../messages/${locale}.json`)).default
  };
});