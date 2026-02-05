'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQClient() {
    const t = useTranslations('FAQ');
    const locale = useLocale();
    const [openId, setOpenId] = useState<number | null>(1); // Default first one open

    const faqs = [
        { id: 1, q: t('q1'), a: t('a1') },
        { id: 2, q: t('q2'), a: t('a2') },
        { id: 3, q: t('q3'), a: t('a3') },
        { id: 4, q: t('q4'), a: t('a4') },
        { id: 5, q: t('q5'), a: t('a5') },
        { id: 6, q: t('q6'), a: t('a6') },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-6"
                    >
                        <HelpCircle className="w-4 h-4" />
                        {t('title')}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-[#0D1C2E] mb-6"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors group"
                            >
                                <span className={`text-lg font-bold transition-colors ${openId === faq.id ? 'text-amber-600' : 'text-slate-800'}`}>
                                    {faq.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openId === faq.id ? 'bg-amber-500 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                    {openId === faq.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 p-8 rounded-3xl bg-[#0D1C2E] text-white text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">{t('cta_title')}</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">{t('cta_desc')}</p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="https://wa.me/905331963061"
                                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                            >
                                {t('cta_whatsapp')}
                            </a>
                            <a
                                href={`/${locale}/contact`}
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 backdrop-blur-sm"
                            >
                                {t('cta_form')}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
