import { getTranslations } from 'next-intl/server';
import ServiceDetailClient from '@/components/ServiceDetailClient';
import { richContent } from '@/constants/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, serviceId: string }> }) {
    const { locale, serviceId } = await params;

    // Zengin içerik kontrolü
    const richData = richContent[locale]?.[serviceId];

    if (richData) {
        return {
            title: `${richData.title} | Mr. Fix İstanbul`,
            description: richData.description[0].substring(0, 160),
        };
    }

    const t = await getTranslations({ locale, namespace: 'ServiceItems' });
    const serviceName = t(serviceId);

    return {
        title: `${serviceName} | Mr. Fix İstanbul`,
        description: t(`${serviceId}_desc`),
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceId: string }> }) {
    const { serviceId } = await params;
    return <ServiceDetailClient serviceId={serviceId} />;
}
