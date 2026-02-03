import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// DÜZELTME: src kısmını sildik, doğru yolu gösterdik
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'hatscripts.github.io' }, // Bayraklar için
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
};

export default withNextIntl(nextConfig);