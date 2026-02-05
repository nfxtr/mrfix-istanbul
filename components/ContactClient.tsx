'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send, CheckCircle2, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import Link from 'next/link';

// Custom WhatsApp Icon Component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
}

export default function ContactClient() {
    const t = useTranslations('ContactPage');
    const locale = useLocale();
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [consentError, setConsentError] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConsentError(false);

        const formData = new FormData(e.currentTarget);

        // Custom Validation for Consent
        if (!formData.get('privacy-consent')) {
            setConsentError(true);
            return;
        }

        setFormStatus('submitting');

        try {
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message'),
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormStatus('success');
                // Scroll to top of the form container to ensure message is visible
                // Using a small timeout to ensure DOM update is complete
                setTimeout(() => {
                    const formElement = formRef.current;
                    if (formElement) {
                        const yOffset = -100; // Offset for sticky header if any
                        const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }, 100);
            } else {
                const resData = await response.json();
                console.error('Form submission failed', resData);
                alert(resData.error || t('error_message'));
                setFormStatus('idle');
            }
        } catch (error) {
            console.error('Network error:', error);
            setFormStatus('idle');
        }
    };

    const contactDetails = [
        { icon: Phone, title: t('contact_info.phone'), value: t('contact_info.call_now'), href: "tel:+905331963061", color: "text-blue-500", bg: "bg-blue-50" },
        { icon: WhatsAppIcon, title: t('contact_info.whatsapp'), value: t('contact_info.chat_whatsapp'), href: "https://wa.me/905331963061", color: "text-green-500", bg: "bg-green-50" },
        { icon: MapPin, title: t('contact_info.address'), value: "Maslak 1453 caddesi, taşyoncası sokak Sarıyer/İstanbul", href: null, color: "text-amber-500", bg: "bg-amber-50" },
        { icon: Clock, title: t('contact_info.working_hours'), value: t('contact_info.working_hours_val'), href: null, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-[#0D1C2E] mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: CONTACT INFO */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {contactDetails.map((item, idx) => (
                            <div key={idx} className={`relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 transition-all duration-300 group
                                ${item.href ? 'hover:shadow-lg hover:border-amber-200 cursor-pointer active:scale-[0.99]' : ''} 
                                ${item.title ? 'items-start' : 'items-center'}`}
                            >
                                {/* Make entire card clickable if href exists */}
                                {item.href && (
                                    <a
                                        href={item.href}
                                        className="absolute inset-0 z-10"
                                        aria-label={item.value}
                                    />
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${item.href ? 'group-hover:bg-[#0D1C2E] group-hover:text-white' : ''} ${item.bg} ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    {item.title && <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>}
                                    <p className={`font-medium text-sm md:text-base transition-colors ${item.href ? 'text-slate-600 group-hover:text-amber-600' : 'text-slate-600'}`}>
                                        {item.value}
                                    </p>
                                </div>

                                {/* Optional: Add a subtle arrow indicator for clickable items */}
                                {item.href && (
                                    <div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 self-center">
                                        <Send className="w-5 h-5 text-amber-500 -rotate-45" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* GOOGLE MAPS EMBED */}
                        <div className="bg-slate-200 rounded-2xl h-64 w-full relative overflow-hidden mt-6 shadow-sm border border-slate-200">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src="https://maps.google.com/maps?q=Maslak+1453+caddesi,+taşyoncası+sokak+Sarıyer/İstanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-xs text-slate-800 shadow-md flex items-center gap-2 border border-slate-100">
                                    <MapPin className="w-3 h-3 text-red-500" />
                                    Maslak 1453
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <div ref={formRef} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 h-full relative overflow-hidden transition-all duration-300">

                            {formStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center text-center p-8 min-h-[600px]">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('success_title')}</h3>
                                    <p className="text-slate-500 max-w-md">{t('success_desc')}</p>
                                    <button
                                        onClick={() => setFormStatus('idle')}
                                        className="mt-8 px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition"
                                    >
                                        Yeni Mesaj Gönder
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-[#0D1C2E] mb-2">{t('form_title')}</h2>
                                        <p className="text-slate-500">{t('form_desc')}</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">{t('labels.name_placeholder')}</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                                    placeholder="Örn: Ahmet Yılmaz"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">{t('labels.phone_placeholder')}</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                                    placeholder="Örn: 0555 123 45 67"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">{t('labels.subject_placeholder')}</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                                placeholder="Örn: Mobilya Montajı Hakkında"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">{t('labels.message_placeholder')}</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none"
                                                placeholder="..."
                                            ></textarea>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-3 pt-2">
                                                <div className="relative flex items-center">
                                                    <input
                                                        id="privacy-consent"
                                                        name="privacy-consent"
                                                        type="checkbox"
                                                        onChange={() => setConsentError(false)}
                                                        className={`peer appearance-none w-4 h-4 border-2 rounded bg-white checked:bg-amber-500 checked:border-amber-500 focus:ring-4 focus:ring-amber-500/20 cursor-pointer transition-all ${consentError ? 'border-red-500' : 'border-slate-300'}`}
                                                    />
                                                    <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 transition-opacity" strokeWidth={3} />
                                                </div>
                                                <label htmlFor="privacy-consent" className={`text-sm font-medium cursor-pointer select-none transition-colors ${consentError ? 'text-red-500' : 'text-slate-600'}`}>
                                                    {t.rich('checkbox_consent', {
                                                        link: (chunks) => (
                                                            <Link
                                                                href={`/${locale}/privacy`}
                                                                className="text-amber-500 hover:text-amber-600 font-bold hover:underline transition-colors relative z-10"
                                                                target="_blank"
                                                            >
                                                                {chunks}
                                                            </Link>
                                                        )
                                                    })}
                                                </label>
                                            </div>
                                            {consentError && (
                                                <p className="text-red-500 text-xs font-bold pl-7 animate-pulse">
                                                    {t('checkbox_required_error')}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                className="w-full bg-[#0D1C2E] text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {formStatus === 'submitting' ? (
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                ) : (
                                                    <> <Send className="w-5 h-5" /> <span>{t('btn_send')}</span> </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
