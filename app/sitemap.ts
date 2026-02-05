import { MetadataRoute } from 'next';
import { serviceCategories } from '@/constants/services';

const baseUrl = 'https://mrfixistanbul.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['tr', 'en', 'ru', 'ar', 'de', 'fr', 'es', 'it', 'fa', 'az', 'nl', 'uk'];
    const staticPaths = ['/', '/contact', '/faq', '/privacy', '/terms'];

    let sitemapEntries: MetadataRoute.Sitemap = [];

    // Sabit sayfalar
    staticPaths.forEach(path => {
        locales.forEach(locale => {
            const fullPath = path === '/' ? `/${locale}` : `/${locale}${path}`;
            sitemapEntries.push({
                url: `${baseUrl}${fullPath}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: path === '/' ? 1 : 0.8,
            });
        });
    });

    // Hizmet detay sayfaları
    serviceCategories.forEach(category => {
        category.items.forEach(service => {
            locales.forEach(locale => {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/services/${service.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.9,
                });
            });
        });
    });

    return sitemapEntries;
}
