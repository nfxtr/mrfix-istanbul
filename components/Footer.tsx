'use client';

import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // Removed in favor of useLocale
import { useTranslations, useLocale } from 'next-intl';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const tServices = useTranslations('ServiceItems'); // Reuse service names
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1C2E] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* ÜST KISIM - 4 SÜTUNLU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* 1. SÜTUN: MARKA & HAKKINDA */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-1 mb-4">
              <span className="text-3xl font-black text-white">
                Mr.<span className="text-amber-500">Fix</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('brand_desc')}
            </p>

          </div>

          {/* 2. SÜTUN: HIZLI LİNKLER */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t('quick_links')}</h4>
            <ul className="space-y-3">
              <FooterLink href={`/${locale}`} label={t('home')} />

              {/* Hakkımızda ve Projeler kaldırıldı */}

              <FooterLink href={`/${locale}#services`} label={t('services')} />
              <FooterLink href={`/${locale}/contact`} label={t('contact')} />
            </ul>
          </div>

          {/* 3. SÜTUN: HİZMETLER */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t('services')}</h4>
            <ul className="space-y-3">
              <FooterLink href={`/${locale}?category=montaj#services`} label={tServices('mobilya_montaji')} />
              <FooterLink href={`/${locale}?category=elektrik#services`} label={tServices('priz_anahtar')} /> {/* Using specific item representing the category */}
              <FooterLink href={`/${locale}?category=tamirat#services`} label={tServices('musluk_tamiri')} />
              <FooterLink href={`/${locale}?category=boya#services`} label={tServices('oda_boyama')} />
              <FooterLink href={`/${locale}?category=temizlik#services`} label={tServices('ev_temizligi')} />
            </ul>
          </div>

          {/* 4. SÜTUN: İLETİŞİM */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm">+90 (533) 196 30 61</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm">info@mrfixistanbul.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ALT KISIM - TELİF HAKKI */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Mr. Fix İstanbul. {t('all_rights_reserved')}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-amber-500 transition">{t('privacy_policy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-amber-500 transition">{t('terms_of_use')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// YARDIMCI BİLEŞENLER
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm hover:text-amber-500 transition flex items-center gap-2 group">
        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-500 transition" />
        {label}
      </Link>
    </li>
  );
}