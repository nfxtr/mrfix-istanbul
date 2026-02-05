'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Hammer,
  Paintbrush,
  Zap,
  Wrench,
  Sparkles,
  Check,
  Truck,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const languages = [
  { code: 'tr', name: 'Türkçe', flagCode: 'tr' },
  { code: 'en', name: 'English', flagCode: 'gb' },
  { code: 'ru', name: 'Русский', flagCode: 'ru' },
  { code: 'ar', name: 'العربية', flagCode: 'sa' },
  { code: 'de', name: 'Deutsch', flagCode: 'de' },
  { code: 'fr', name: 'Français', flagCode: 'fr' },
  { code: 'es', name: 'Español', flagCode: 'es' },
  { code: 'it', name: 'Italiano', flagCode: 'it' },
  { code: 'fa', name: 'فارسی', flagCode: 'ir' },
  { code: 'az', name: 'Azərbaycan', flagCode: 'az' },
  { code: 'nl', name: 'Nederlands', flagCode: 'nl' },
  { code: 'uk', name: 'Українська', flagCode: 'ua' },
];

const servicesList = [
  { icon: Hammer, categoryId: 'montaj' },
  { icon: Wrench, categoryId: 'tamirat' },
  { icon: Zap, categoryId: 'elektrik' },
  { icon: Paintbrush, categoryId: 'boya' },
  { icon: Sparkles, categoryId: 'temizlik' },
  { icon: Truck, categoryId: 'nakliye' },
];

export default function Navbar() {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] || 'tr';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menü veya dil modalı açıldığında arka plan kaydırmayı durdur
  useEffect(() => {
    if (langModalOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [langModalOpen, mobileMenuOpen]);

  const changeLanguage = (lang: string) => {
    const newPath = pathname.replace(
      /^\/(tr|en|ru|ar|de|fr|es|it|fa|az|nl|uk)/,
      `/${lang}`
    );
    router.push(newPath);
    setLangModalOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link href={`/${currentLang}`} className="flex items-center gap-1 z-50">
            <span className="text-3xl font-black text-[#0D1C2E]">
              Mr.<span className="text-amber-500">Fix</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href={`/${currentLang}`}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-amber-600 rounded-full hover:bg-amber-50 transition"
            >
              {t('home')}
            </Link>

            {/* --- HİZMETLER DROPDOWN --- */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-slate-600 hover:text-amber-600 rounded-full hover:bg-amber-50">
                {t('services')}
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition" />
              </button>

              <div className="absolute top-full left-0 pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top group-hover:translate-y-0 translate-y-2">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">
                  {servicesList.map((service, i) => (
                    <Link
                      key={i}
                      // Link, ana sayfadaki "services" bölümüne gider ve ilgili kategoriyi seçer
                      href={`/${currentLang}?category=${service.categoryId}#services`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 transition cursor-pointer group/item"
                    >
                      <service.icon className="w-4 h-4 text-amber-500 group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm font-bold text-slate-700">
                        {t(`menu_${service.categoryId}`)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`/${currentLang}/contact`}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-amber-600 rounded-full hover:bg-amber-50 transition"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 z-50">
            <button
              onClick={() => setLangModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border bg-white hover:bg-amber-50 transition"
            >
              <Image
                src={`https://hatscripts.github.io/circle-flags/flags/${languages.find(l => l.code === currentLang)?.flagCode
                  }.svg`}
                alt="flag"
                width={20}
                height={20}
              />
              <span className="font-bold text-sm uppercase">{currentLang}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/905331963061"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'call_now_click', {
                    event_category: 'Contact',
                    event_label: 'Navbar'
                  });
                }
              }}
              className="hidden md:flex items-center gap-2 bg-[#0D1C2E] text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              {t('call_now')}
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div
          className={`
            absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
          `}
        >
          <div className="p-6 flex flex-col gap-2">
            <Link
              href={`/${currentLang}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition"
            >
              <span className="font-bold text-slate-700 text-lg">
                {t('home')}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>

            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition"
            >
              <span className="font-bold text-slate-700 text-lg">
                {t('services')}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>

            <Link
              href={`/${currentLang}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition"
            >
              <span className="font-bold text-slate-700 text-lg">
                {t('contact')}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <a
                href="tel:+905331963061"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'call_now_click', {
                      event_category: 'Contact',
                      event_label: 'Mobile Menu'
                    });
                  }
                }}
                className="w-full bg-[#0D1C2E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-lg">
                  {t('call_now')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* LANGUAGE MODAL (Max-w-3xl ve 4 Sütunlu Hali) */}
      {mounted &&
        langModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setLangModalOpen(false)}
            />
            <div className="relative bg-white rounded-[2rem] p-6 md:p-8 max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">Dil Seçimi / Language</h3>
                <button onClick={() => setLangModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition hover:scale-[1.02] active:scale-95 ${currentLang === lang.code
                      ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                      }`}
                  >
                    <Image
                      src={`https://hatscripts.github.io/circle-flags/flags/${lang.flagCode}.svg`}
                      alt={lang.name}
                      width={28}
                      height={28}
                      className="shrink-0"
                    />
                    <span className="font-bold text-sm text-slate-700 truncate">{lang.name}</span>
                    {currentLang === lang.code && (
                      <Check className="ml-auto text-amber-600 w-4 h-4 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}