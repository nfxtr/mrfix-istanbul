import { getTranslations } from 'next-intl/server';
import ContactClient from '@/components/ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.contact' });
    return {
        title: t('title'),
        description: t('description')
    };
}

export default function ContactPage() {
    return <ContactClient />;
}
