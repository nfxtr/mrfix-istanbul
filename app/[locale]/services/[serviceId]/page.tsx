import { getTranslations } from 'next-intl/server';
import ServiceDetailClient from '@/components/ServiceDetailClient';

export async function generateMetadata({ params: { locale, serviceId } }: { params: { locale: string, serviceId: string } }) {
    const t = await getTranslations({ locale, namespace: 'ServiceItems' });
    const serviceName = t(serviceId);

    return {
        title: `${serviceName} | Mr. Fix İstanbul`,
        description: t(`${serviceId}_desc`),
    };
}

export default function ServiceDetailPage({ params: { serviceId } }: { params: { serviceId: string } }) {
    return <ServiceDetailClient serviceId={serviceId} />;
}
