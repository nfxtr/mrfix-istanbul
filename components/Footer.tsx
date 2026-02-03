'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  // URL'den mevcut dili al (Örn: /en/services -> 'en')
  const currentLang = pathname?.split('/')[1] || 'tr';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1C2E] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* ÜST KISIM - 4 SÜTUNLU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* 1. SÜTUN: MARKA & HAKKINDA */}
          <div className="space-y-4">
            <Link href={`/${currentLang}`} className="flex items-center gap-1 mb-4">
              <span className="text-3xl font-black text-white">
                Mr.<span className="text-amber-500">Fix</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              İstanbul genelinde profesyonel tamirat, montaj ve bakım hizmetleri.
              Evinizdeki her sorun için güvenilir ve hızlı çözümler sunuyoruz.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          {/* 2. SÜTUN: HIZLI LİNKLER */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Hızlı Erişim</h4>
            <ul className="space-y-3">
              <FooterLink href={`/${currentLang}`} label="Ana Sayfa" />

              {/* Hakkımızda ve Projeler kaldırıldı */}

              <FooterLink href={`/${currentLang}#services`} label="Hizmetlerimiz" />
              <FooterLink href={`/${currentLang}#contact`} label="İletişim" />
            </ul>
          </div>

          {/* 3. SÜTUN: HİZMETLER */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              <FooterLink href={`/${currentLang}?category=montaj#services`} label="Mobilya Montajı" />
              <FooterLink href={`/${currentLang}?category=elektrik#services`} label="Elektrik Tesisatı" />
              <FooterLink href={`/${currentLang}?category=tamirat#services`} label="Su Tesisatı" />
              <FooterLink href={`/${currentLang}?category=boya#services`} label="Boya & Badana" />
              <FooterLink href={`/${currentLang}?category=temizlik#services`} label="Profesyonel Temizlik" />
            </ul>
          </div>

          {/* 4. SÜTUN: İLETİŞİM */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">Maslak 1453 caddesi, taşyoncası sokak Sarıyer/İstanbul</span>
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
          <p>&copy; {currentYear} Mr. Fix İstanbul. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-amber-500 transition">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-amber-500 transition">Kullanım Şartları</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// YARDIMCI BİLEŞENLER
function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition duration-300">
      <Icon className="w-5 h-5" />
    </a>
  );
}

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