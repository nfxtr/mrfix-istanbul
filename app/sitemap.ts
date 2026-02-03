import { MetadataRoute } from 'next';

const baseUrl = 'https://www.mrfix-istanbul.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['tr', 'en', 'ar', 'ru', 'de', 'fa'];
    const paths = ['/', '/contact'];

    let sitemapEntries: MetadataRoute.Sitemap = [];

    paths.forEach(path => {
        locales.forEach(locale => {
            // Root path '/' should map to '/locale' 
            const fullPath = path === '/' ? `/${locale}` : `/${locale}${path}`;

            sitemapEntries.push({
                url: `${baseUrl}${fullPath}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: path === '/' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
