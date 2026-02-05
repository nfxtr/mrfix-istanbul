'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
    MessageCircle, ArrowLeft, CheckCircle2, ShieldCheck,
    Wrench, Hammer, Sparkles, MapPin, Phone, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { serviceCategories, WHATSAPP_NUMBER } from '@/constants/services';
import { notFound } from 'next/navigation';

import { richContent } from '@/constants/content';

export default function ServiceDetailClient({ serviceId }: { serviceId: string }) {
    const t = useTranslations();
    const tServ = useTranslations('ServiceItems');
    const tNav = useTranslations('Navigation');
    const tCards = useTranslations('Cards');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    // Servis bulma
    const service = serviceCategories
        .flatMap(cat => cat.items)
        .find(item => item.id === serviceId);

    if (!service) {
        notFound();
    }

    // Zengin İçerik Kontrolü
    const richData = richContent[locale]?.[serviceId];

    const createWhatsAppLink = () => {
        const serviceName = richData?.title || tServ(service.id);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Merhaba Mr. Fix, ${serviceName} hakkında bilgi almak istiyorum.`)}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <main className="max-w-5xl mx-auto px-6 pt-24 lg:pt-32">
                {/* Geri Dön Linki (İçerik içinde) */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className={`inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors font-semibold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        {isRTL ? <ArrowLeft className="w-4 h-4 rotate-180" /> : <ArrowLeft className="w-4 h-4" />}
                        <span>{t('Navbar.home')}</span>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Sol Kolon: Görsel ve Rozetler */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
                            <img
                                src={service.img}
                                alt={richData?.title || tServ(service.id)}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        {t('Hero.badge_insured')}
                                    </span>
                                    <span className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                        {t('Hero.badge_satisfaction')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Öne Çıkan Özellikler (Zengin içerik varsa oradan, yoksa standart) */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                {t('Features.title')}
                            </h4>
                            <ul className="space-y-3">
                                {richData ? (
                                    richData.features.map((feature, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                                            <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))
                                ) : (
                                    [1, 2, 3].map((i) => (
                                        <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                                            <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                                            </div>
                                            {t(`Features.f${i}_desc`)}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        {/* Zengin İçerik: SSS Bölümü */}
                        {richData && (
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-blue-500" />
                                    Sıkça Sorulan Sorular
                                </h4>
                                <div className="space-y-4">
                                    {richData.faq.map((item, i) => (
                                        <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
                                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-800 font-semibold text-sm group-hover:text-amber-600 transition-colors">
                                                <span>{item.q}</span>
                                                <span className="shrink-0 rounded-full bg-white p-1.5 text-slate-900 sm:p-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0 transition duration-300 group-open:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </summary>
                                            <p className="mt-2 leading-relaxed text-slate-500 text-sm">
                                                {item.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Sağ Kolon: İçerik ve Aksiyonlar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black text-[#0D1C2E] mt-2 mb-6 leading-tight">
                                {richData?.title || tServ(service.id)}
                            </h1>
                            <div className="h-2 w-20 bg-amber-500 rounded-full mb-8" />

                            {richData ? (
                                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                    {richData.description.map((desc, i) => (
                                        <p key={i}>{desc}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium italic">
                                    "{tServ(service.id + '_desc')}"
                                </p>
                            )}
                        </div>

                        <div className="bg-amber-50 p-6 lg:p-8 rounded-[2rem] border border-amber-100 flex flex-col gap-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-800">{t('Cards.whatsapp_btn')}</h3>
                                <p className="text-sm text-slate-600">{t('Categories.subtitle')}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={createWhatsAppLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-[#25D366] hover:bg-[#1fb355] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-200 transition-all active:scale-95 text-lg"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-7 h-7 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>WhatsApp</span>
                                </a>
                                <Link
                                    href="/contact"
                                    className="flex-1 bg-[#0D1C2E] hover:bg-[#1a365d] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-slate-200 transition-all active:scale-95 text-lg"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>{t('Navbar.contact')}</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* SEO: JSON-LD Schema Markup */}
            {richData && (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Service",
                                "name": richData.title,
                                "description": richData.description.join(' '),
                                "provider": {
                                    "@type": "LocalBusiness",
                                    "name": "Mr. Fix İstanbul",
                                    "address": {
                                        "@type": "PostalAddress",
                                        "addressLocality": "İstanbul",
                                        "addressCountry": "TR"
                                    },
                                    "telephone": `+${WHATSAPP_NUMBER}`
                                },
                                "areaServed": {
                                    "@type": "City",
                                    "name": "İstanbul"
                                },
                                "category": "Home Service",
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": typeof window !== 'undefined' ? window.location.href : ""
                                }
                            })
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": richData.faq.map(item => ({
                                    "@type": "Question",
                                    "name": item.q,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": item.a
                                    }
                                }))
                            })
                        }}
                    />
                </>
            )}
        </div>
    );
}
