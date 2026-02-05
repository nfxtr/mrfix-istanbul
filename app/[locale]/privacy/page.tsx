import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
    const t = useTranslations('PrivacyPolicy');

    return (
        <main className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-[#0D1C2E] mb-8">{t('title')}</h1>
                <div className="prose prose-slate lg:prose-lg">
                    <p>{t('last_updated')}</p>
                    <div dangerouslySetInnerHTML={{ __html: t.raw('content') }} />
                </div>
            </div>
        </main>
    );
}
