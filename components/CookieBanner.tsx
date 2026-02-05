'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

export default function CookieBanner() {
    const t = useTranslations('CookieBanner');
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const currentLang = pathname?.split('/')[1] || 'tr';

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl bg-[#0D1C2E] text-slate-300 p-5 rounded-2xl shadow-2xl border border-slate-700 z-50 animate-fade-in-up flex flex-col md:flex-row items-center gap-4 md:gap-6 backdrop-blur-md bg-opacity-95">
            <button
                onClick={handleDecline}
                className="absolute top-2 right-2 text-slate-500 hover:text-white transition"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            <p className="text-sm leading-relaxed text-center md:text-left flex-1">
                {t('message')}{' '}
                <Link href={`/${currentLang}/privacy`} className="text-amber-500 hover:underline whitespace-nowrap">
                    {t('privacy_link')}
                </Link>
            </p>

            <div className="flex gap-3 w-full md:w-auto shrink-0">
                <button
                    onClick={handleAccept}
                    className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-600 text-[#0D1C2E] font-bold py-2 px-6 rounded-lg transition text-sm whitespace-nowrap"
                >
                    {t('accept')}
                </button>
                <button
                    onClick={handleDecline}
                    className="flex-1 md:flex-none bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold py-2 px-6 rounded-lg transition text-sm whitespace-nowrap"
                >
                    {t('decline')}
                </button>
            </div>
        </div>
    );
}
