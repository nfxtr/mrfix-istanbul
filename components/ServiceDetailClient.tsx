'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
    MessageCircle, ArrowLeft, CheckCircle2, ShieldCheck,
    Wrench, Hammer, Sparkles, MapPin, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { serviceCategories, WHATSAPP_NUMBER } from '@/constants/services';
import { notFound } from 'next/navigation';

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

    const createWhatsAppLink = () => {
        const serviceName = tServ(service.id);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Merhaba Mr. Fix, ${serviceName} hakkında bilgi almak istiyorum.`)}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Üst Bar / Geri Dön */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        {isRTL ? <ArrowLeft className="w-5 h-5 rotate-180" /> : <ArrowLeft className="w-5 h-5" />}
                        <span>{t('Navbar.home')}</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{tNav('online')}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 pt-8 lg:pt-12">
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
                                alt={tServ(service.id)}
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

                        {/* Öne Çıkan Özellikler */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                {t('Features.title')}
                            </h4>
                            <ul className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                                        <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                                        </div>
                                        {t(`Features.f${i}_desc`)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Sağ Kolon: İçerik ve Aksiyonlar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Mr. Fix İstanbul</span>
                            <h1 className="text-4xl lg:text-5xl font-black text-[#0D1C2E] mt-2 mb-6 leading-tight uppercase">
                                {tServ(service.id)}
                            </h1>
                            <div className="h-2 w-20 bg-amber-500 rounded-full mb-8" />
                            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium italic">
                                "{tServ(service.id + '_desc')}"
                            </p>
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
                                    <MessageCircle className="w-6 h-6" />
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

                        {/* Bilgi Kutusu */}
                        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{t('Metadata.contact.title')}</h4>
                                <p className="text-xs text-slate-500">{t('Hero.location')}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
