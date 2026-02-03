'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Mevcut dili URL'den al
  const currentLang = pathname?.split('/')[1] || 'tr';

  const languages = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'ru', label: 'Русский' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'it', label: 'Italiano' },
    { code: 'fa', label: 'فارسی' },
    { code: 'az', label: 'Azərbaycan' },
    { code: 'uk', label: 'Українська' },
  ];

  const changeLanguage = (lang: string) => {
    const newPath = pathname.replace(
      /^\/(tr|en|ar|ru|de|fr|es|it|fa|az|nl|uk)/,
      `/${lang}`
    );
    router.push(newPath);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href={`/${currentLang}`}
          className="flex items-center gap-1.5 text-3xl font-bold tracking-tight"
        >
          <span className="text-[#0D1C2E]">Mr.</span>
          <span className="text-[#F59E0B]">Fix</span>
        </Link>

        {/* ORTA MENÜ */}
        <nav className="hidden md:flex gap-8">
          <Link
            href={`/${currentLang}`}
            className="text-sm font-bold text-slate-600 hover:text-[#F59E0B]"
          >
            {currentLang === 'en' ? 'Home' : 'Ana Sayfa'}
          </Link>
          <Link href="#" className="text-sm font-bold text-slate-600 hover:text-[#F59E0B]">
            {currentLang === 'en' ? 'Services' : 'Hizmetler'}
          </Link>
          <Link href="#" className="text-sm font-bold text-slate-600 hover:text-[#F59E0B]">
            {currentLang === 'en' ? 'Contact' : 'İletişim'}
          </Link>
        </nav>

        {/* SAĞ TARAF */}
        <div className="flex items-center gap-4">

          {/* DİL SEÇİCİ */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-200 transition"
            >
              <Globe className="w-4 h-4" />
              {currentLang.toUpperCase()}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl border bg-white shadow-xl overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 ${
                      currentLang === lang.code
                        ? 'bg-slate-100 font-bold'
                        : ''
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button className="bg-[#0D1C2E] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-lg">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">
              {currentLang === 'en' ? 'Call Now' : 'Hemen Ara'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
