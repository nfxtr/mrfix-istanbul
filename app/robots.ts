import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Domain adresinizi buraya yazın
    const baseUrl = 'https://www.mrfix-istanbul.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
