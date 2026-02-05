import { useTranslations } from 'next-intl';
import FAQClient from '@/components/FAQClient';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'FAQ' });

    return {
        title: `${t('title')} | Mr. Fix İstanbul`,
        description: t('subtitle'),
    };
}

export default function FAQPage() {
    return <FAQClient />;
}
