'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
    ShieldCheck, Languages, Wallet, Sparkles, Search, CheckCircle2, ArrowRight,
    Wrench, Hammer, Paintbrush, Zap, Truck, ChevronRight, UserCheck, Phone, MessageCircle, MapPin, X, HelpCircle, ChevronLeft, Check
} from 'lucide-react';
import { Poppins } from 'next/font/google';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
});

const WHATSAPP_NUMBER = "905331963061";

// --- HERO SLIDER GÖRSELLERİ ---
const heroImages = [
    "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=2070&auto=format&fit=crop", // Genel Usta
    "https://images.unsplash.com/photo-1623161551706-318825cd18ef?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Tamirat
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2070&auto=format&fit=crop", // Boya
    "/resim123.png"  // Elektrik (Yerel Dosya)
];

export default function HomeClient() {
    // --- ÇEVİRİ KANCALARI (HOOKS) ---
    const t = useTranslations();
    const tNav = useTranslations('Navigation');
    const tHero = useTranslations('Hero');
    const tCat = useTranslations('Categories');
    const tServ = useTranslations('ServiceItems');
    const tCards = useTranslations('Cards');
    const tWork = useTranslations('HowItWorks');
    const tFeat = useTranslations('Features');
    const tSearch = useTranslations('Search');

    // Dil ve Yön Kontrolü
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const searchParams = useSearchParams();


    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('montaj');
    const [activeStep, setActiveStep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // --- SLIDER & OK STATE ---
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // Hero Slider State
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    // --- HİZMET VERİLERİ ---
    const serviceCategories = [
        {
            id: 'montaj',
            label: tCat('montaj'),
            icon: Hammer,
            items: [
                { name: tServ('mobilya_montaji'), keywords: ['dolap', 'masa', 'sandalye', 'ikea', 'kurulum'], img: '/image.png' },
                { name: tServ('tv_montaji'), keywords: ['televizyon', 'ekran', 'uydu', 'askı aparatı'], img: '/tvasma.png' },
                { name: tServ('raf_dolap'), keywords: ['kitaplık', 'raf montajı', 'duvar rafı'], img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600' },
                { name: tServ('perde_kornism'), keywords: ['stor', 'jaluzi', 'korniş takma'], img: '/perde.png' },
            ]
        },
        {
            id: 'tamirat',
            label: tCat('tamirat'),
            icon: Wrench,
            items: [
                { name: tServ('musluk_tamiri'), keywords: ['su tesisatı', 'lavabo', 'akıtan musluk', 'conta'], img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600' },
                { name: tServ('kapi_kilit'), keywords: ['çilingir', 'kapı kolu', 'menteşe', 'kilit değiştirme'], img: '/kapikolu.png' },
                { name: tServ('pencere_ayari'), keywords: ['pimapen', 'cam', 'fitil', 'kapanmayan pencere'], img: '/cam.png' },
                { name: tServ('genel_onarim'), keywords: ['ufak tamirat', 'tadilat', 'usta'], img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=600' },
            ]
        },
        {
            id: 'elektrik',
            label: tCat('elektrik'),
            icon: Zap,
            items: [
                { name: tServ('avize_montaji'), keywords: ['lamba', 'aydınlatma', 'sarkıt'], img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600' },
                { name: tServ('priz_anahtar'), keywords: ['elektrik düğmesi', 'fiş', 'kablo'], img: '/priz.png' },
                { name: tServ('sigorta_pano'), keywords: ['şartel', 'elektrik kesintisi', 'kaçak akım'], img: '/sigorta.png' },
                { name: tServ('led_aydinlatma'), keywords: ['şerit led', 'spot', 'gizli ışık'], img: '/led.png' },
            ]
        },
        {
            id: 'boya',
            label: tCat('boya'),
            icon: Paintbrush,
            items: [
                { name: tServ('oda_boyama'), keywords: ['duvar boyası', 'badana', 'salon boyama'], img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600' },
                { name: tServ('tavan_boyama'), keywords: ['banyo tavanı', 'rutubet'], img: '/tavan.png' },
                { name: tServ('duvar_kagidi'), keywords: ['duvar kaplama', 'dekorasyon'], img: '/duvarkagidi.png' },
                { name: tServ('alci_siva'), keywords: ['alçıpan', 'delik kapatma', 'yama'], img: '/siva.png' },
            ]
        },
        {
            id: 'temizlik',
            label: tCat('temizlik'),
            icon: Sparkles,
            items: [
                { name: tServ('ev_temizligi'), keywords: ['gündelikçi', 'detaylı temizlik', 'boş ev'], img: '/temizlik.png' },
                { name: tServ('ofis_temizligi'), keywords: ['iş yeri', 'büro'], img: '/ofis.png' },
                { name: tServ('koltuk_yikama'), keywords: ['kanepe', 'berjer', 'yatak yıkama'], img: '/koltuk.png' },
                { name: tServ('insaat_sonrasi'), keywords: ['tadilat temizliği', 'inşaat artığı'], img: '/insaat.png' },
            ]
        },
        {
            id: 'nakliye',
            label: tCat('nakliye'),
            icon: Truck,
            items: [
                { name: tServ('parca_esya'), keywords: ['kamyonet', 'doblo', 'koltuk taşıma'], img: '/tasinma.png' },
                { name: tServ('evden_eve'), keywords: ['taşınma', 'nakliyat'], img: '/araba.png' },
                { name: tServ('esya_paketleme'), keywords: ['kolileme', 'ambalaj'], img: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=600' },
                { name: tServ('ofis_tasima'), keywords: ['iş yeri taşıma'], img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
            ]
        },
        {
            id: 'diger',
            label: tCat('diger'),
            icon: HelpCircle,
            items: [
                { name: tServ('ozel_istek'), keywords: ['farklı işler', 'yardım', 'destek', 'bilinmeyen'], img: '/ozel.png' },
            ]
        }
    ];

    // --- NASIL ÇALIŞIYORUZ VERİLERİ (GÜNCELLENDİ: Minimalist & Profesyonel) ---
    const howItWorksSteps = [
        {
            id: 1,
            title: tWork('step1_title'),
            description: tWork('step1_desc'),
            icon: Search,
            // Minimalist Görsel: Büyük, temiz bir ikon ve hareketli halkalar
            screenContent: (
                <div className="h-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50/50" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-64 h-64 rounded-full bg-blue-100/50"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute w-44 h-44 rounded-full bg-blue-200/50"
                    />
                    <div className="relative z-10 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-blue-600 border border-blue-50">
                        <Search className="w-10 h-10" />
                    </div>
                    {/* Dekoratif yüzen elemanlar */}
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 right-10 bg-white p-2 rounded-lg shadow-sm text-amber-500"><Hammer className="w-4 h-4" /></motion.div>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-12 left-12 bg-white p-2 rounded-lg shadow-sm text-purple-500"><Paintbrush className="w-4 h-4" /></motion.div>
                </div>
            )
        },
        {
            id: 2,
            title: tWork('step2_title'),
            description: tWork('step2_desc'),
            icon: MessageCircle,
            // Minimalist Görsel: İletişim vurgusu
            screenContent: (
                <div className="h-full bg-[#128C7E]/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-50/50" />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-24 h-24 bg-[#25D366] rounded-3xl shadow-lg shadow-green-200 flex items-center justify-center text-white relative z-10">
                                <MessageCircle className="w-10 h-10" />
                            </div>
                            {/* Arkadaki "ping" efekti */}
                            <span className="absolute -inset-2 rounded-3xl bg-[#25D366] opacity-30 animate-ping"></span>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-600">{tNav('online')}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: tWork('step3_title'),
            description: tWork('step3_desc'),
            icon: UserCheck,
            // Minimalist Görsel: Güven ve Onay
            screenContent: (
                <div className="h-full bg-amber-50 flex items-center justify-center relative overflow-hidden">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 max-w-[220px]"
                    >
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Usta" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="h-2 w-20 bg-slate-100 rounded-full mb-2"></div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                            </div>
                        </div>
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm">
                            <Check className="w-4 h-4" />
                        </div>
                    </motion.div>

                    {/* Arka plan deseni */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
            )
        }
    ];

    // --- FONKSİYONLAR ---
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query.length < 2) { setSearchResults([]); return; }
        const results: any[] = [];
        serviceCategories.forEach(category => {
            category.items.forEach(item => {
                if (item.name.toLowerCase().includes(query) || item.keywords?.some((k: string) => k.toLowerCase().includes(query))) {
                    results.push({ ...item, categoryId: category.id });
                }
            });
        });
        setSearchResults(results);
    };

    const handleResultClick = (categoryId: string) => {
        setActiveTab(categoryId); setSearchQuery(''); setSearchResults([]);
        const element = document.getElementById('services');
        if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    };

    const createFallbackWhatsAppLink = (query: string) => {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${tSearch('not_found_desc')} (${query})`)}`;
    };

    const createWhatsAppLink = (serviceName: string) => {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Merhaba Mr. Fix, ${serviceName} hakkında bilgi almak istiyorum.`)}`;
    };

    // --- OTOMATİK SLIDER (5 Saniye) ---
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // 5000 milisaniye = 5 saniye

        return () => clearInterval(timer);
    }, []);

    // --- OKLAR İÇİN SCROLL DİNLEYİCİ ---
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollWidth - clientWidth - scrollLeft > 10);
        }
    };

    // Ok Butonlarına Tıklayınca Kaydırma
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        // Scroll dinleyicisini ekle
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            // İlk yüklemede ok durumunu kontrol et
            handleScroll();
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // --- URL'DEN KATEGORİ SEÇİMİNİ DİNLEME ---
    useEffect(() => {
        const category = searchParams.get('category');
        if (category && serviceCategories.some(c => c.id === category)) {
            setActiveTab(category);
        }

        const handleCategoryChange = (event: CustomEvent) => {
            const categoryId = event.detail;
            if (categoryId && serviceCategories.some(c => c.id === categoryId)) {
                setActiveTab(categoryId);
            }
        };

        window.addEventListener('categoryChange', handleCategoryChange as EventListener);

        return () => {
            window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
        };
    }, [searchParams]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) { setSearchResults([]); }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- HATA DÜZELTME: Bu useEffect en son çalışmalı ---
    useEffect(() => {
        const interval = setInterval(() => { setActiveStep((prev) => (prev + 1) % howItWorksSteps.length); }, 6000);
        return () => clearInterval(interval);
    }, [howItWorksSteps.length]);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') { window.history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }
    }, []);

    return (
        // Arapça ise 'rtl' (sağdan sola) yönünü uygula
        <main dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen bg-white text-slate-900 ${poppins.className} overflow-x-hidden selection:bg-amber-100 selection:text-amber-900`}>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-24 pb-12 lg:pt-40 lg:pb-24 overflow-visible z-0">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="flex flex-col items-start text-left z-10 order-1 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0D1C2E] leading-[1.1] mb-4 lg:mb-6">
                            {tHero('title_start')} <br />
                            <span className="text-[#F59E0B] inline-block min-h-[1.2em] min-w-[200px] md:min-w-[400px] whitespace-nowrap align-top">
                                {mounted ? (
                                    <TypeAnimation
                                        sequence={[
                                            tHero('typewriter.t1'), 2000, tHero('typewriter.t2'), 2000,
                                            tHero('typewriter.t3'), 2000, tHero('typewriter.t4'), 2000, tHero('typewriter.t5'), 2000
                                        ]}
                                        wrapper="span" speed={50} deletionSpeed={75} repeat={Infinity} cursor={false} style={{ display: 'inline-block' }}
                                    />
                                ) : (
                                    <span>{tHero('typewriter.t1')}</span>
                                )}
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 mb-6 lg:mb-8 font-medium leading-relaxed max-w-lg">
                            {tHero.rich('description', {
                                highlight1: (chunks) => <span className="text-slate-900 font-semibold">{chunks}</span>,
                                highlight2: (chunks) => <span className="text-slate-900 font-semibold">{chunks}</span>,
                                highlight3: (chunks) => <span className="text-slate-900 font-semibold">{chunks}</span>
                            })}
                        </p>

                        {/* ARAMA ÇUBUĞU */}
                        <div ref={searchContainerRef} className="relative w-full max-w-xl z-[100]">
                            <div className="w-full bg-white p-1.5 rounded-full border border-slate-200 shadow-lg shadow-slate-200/40 flex flex-row items-center gap-2 mb-6 lg:mb-8 focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all relative z-20">
                                <div className="flex-1 flex items-center px-4 w-full h-11 lg:h-14">
                                    {/* Arapça ise ikonun yönünü/yerini değiştir */}
                                    <Search className={`w-5 h-5 text-slate-400 shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                                    <input
                                        type="text"
                                        placeholder={tNav('search_placeholder')}
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="w-full h-full outline-none text-slate-800 placeholder:text-slate-400 bg-transparent font-medium text-sm lg:text-lg"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <button className="bg-[#0D1C2E] hover:bg-[#1a365d] text-white font-bold py-2.5 px-5 lg:py-3 lg:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 shrink-0 text-sm lg:text-base whitespace-nowrap">
                                    <span>{tNav('search_btn')}</span>
                                    {/* Arapça ise oku ters çevir */}
                                    {isRTL ? <ArrowRight className="w-4 h-4 hidden sm:block rotate-180" /> : <ArrowRight className="w-4 h-4 hidden sm:block" />}
                                </button>
                            </div>

                            {/* ARAMA SONUÇLARI */}
                            <AnimatePresence>
                                {searchResults.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-[calc(100%-25px)] left-4 right-4 bg-white rounded-b-2xl rounded-t-lg shadow-xl border border-slate-100 overflow-hidden z-[90] max-h-[300px] overflow-y-auto">
                                        {searchResults.map((result, idx) => (
                                            <div key={idx} onClick={() => handleResultClick(result.categoryId)} className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0"><img src={result.img} alt={result.name} className="w-full h-full object-cover" /></div>
                                                <div><div className="font-bold text-slate-800 text-sm">{result.name}</div><div className="text-xs text-slate-500">{tSearch('category_go')}</div></div>
                                                <ChevronRight className={`w-4 h-4 text-slate-400 ${isRTL ? 'mr-auto rotate-180' : 'ml-auto'}`} />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                                {searchResults.length === 0 && searchQuery.length > 1 && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-[calc(100%-25px)] left-4 right-4 bg-white rounded-b-2xl rounded-t-lg shadow-xl border border-amber-100 overflow-hidden z-[90]">
                                        <div className="p-4 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600"><HelpCircle className="w-5 h-5" /></div>
                                            <div className="flex-1"><div className="font-bold text-slate-800 text-sm">{tSearch('not_found_title')}</div><div className="text-xs text-slate-500">{tSearch('not_found_desc')}</div></div>
                                        </div>
                                        <a href={createFallbackWhatsAppLink(searchQuery)} target="_blank" rel="noopener noreferrer" className="block bg-amber-50 hover:bg-amber-100 text-amber-700 text-center text-sm font-bold py-3 transition-colors flex items-center justify-center gap-2">
                                            <MessageCircle className="w-4 h-4" /><span>{tSearch('whatsapp_help')}</span>
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm font-medium text-slate-500">
                            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> {tHero('badge_insured')}</div>
                            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> {tHero('badge_satisfaction')}</div>
                        </div>
                    </div>

                    {/* --- HERO IMAGE SLIDER (GÜNCELLENDİ: SMOOTH GEÇİŞ) --- */}
                    <div className="relative order-2 lg:order-2 h-[280px] md:h-[350px] lg:h-[600px] w-full flex items-center justify-center lg:-mt-12">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-100/40 to-blue-50/40 rounded-full blur-3xl -z-10" />
                        <div className="relative w-full h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] lg:border-[8px] border-white bg-slate-200 group">

                            {/* Resim Slider - Smooth Geçiş */}
                            <AnimatePresence>
                                <motion.img
                                    key={currentHeroIndex}
                                    src={heroImages[currentHeroIndex]}
                                    alt="Usta Hizmeti"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Mutlu Müşteri Kartı */}
                            <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 bg-white/95 backdrop-blur-md p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 lg:gap-4 animate-fade-in-up z-20">
                                <div className="flex -space-x-3 lg:-space-x-4">
                                    <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-full border-[2px] lg:border-[3px] border-white bg-slate-200 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=11" alt="User" /></div>
                                    <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-full border-[2px] lg:border-[3px] border-white bg-slate-300 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=33" alt="User" /></div>
                                    <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-full border-[2px] lg:border-[3px] border-white bg-[#0D1C2E] flex items-center justify-center text-[10px] lg:text-xs font-bold text-white shadow-sm">+500</div>
                                </div>
                                <div><div className="font-bold text-slate-900 text-xs lg:text-sm">{tHero('happy_customer')}</div><div className="text-[10px] lg:text-xs text-slate-500">{tHero('location')}</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HİZMETLER BÖLÜMÜ --- */}
            <section id="services" className="py-12 lg:py-20 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 lg:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0D1C2E]">{tCat('title')}</h2>
                        <p className="mt-3 lg:mt-4 text-base lg:text-lg text-slate-600">{tCat('subtitle')}</p>
                    </div>

                    <div className="relative group/arrows w-full">
                        {/* MOBİL OKLAR - Konumlandırma İyileştirildi */}
                        <button
                            onClick={() => scroll('left')}
                            className={`md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg border border-slate-200 rounded-full p-2.5 text-slate-700 hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 ${showLeftArrow ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className={`md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg border border-slate-200 rounded-full p-2.5 text-slate-700 hover:text-amber-500 hover:bg-amber-50 transition-all duration-300 ${showRightArrow ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* SİLİK KENARLIKLAR */}
                        <div className={`md:hidden absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/90 to-transparent z-30 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`} />
                        <div className={`md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent z-30 pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`} />

                        {/* LİSTE - px-12 (PADDING) EKLENDİ - Bu, ikonların okların altından çıkmasını sağlar */}
                        <div
                            ref={scrollRef}
                            className="flex items-center justify-start md:justify-center overflow-x-auto py-6 lg:py-8 gap-4 lg:gap-14 no-scrollbar px-12 md:px-4 snap-x scroll-smooth relative z-10"
                        >
                            {serviceCategories.map((category) => {
                                const isActive = activeTab === category.id;
                                return (
                                    <button key={category.id} onClick={() => setActiveTab(category.id)} className="group flex flex-col items-center gap-3 lg:gap-4 min-w-[70px] lg:min-w-[80px] cursor-pointer relative snap-center">
                                        <div className={`relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-110' : 'hover:bg-slate-50 group-hover:-translate-y-2'}`}>
                                            <category.icon className={`w-6 h-6 lg:w-8 lg:h-8 transition-all duration-300 ${isActive ? 'text-amber-500 stroke-[2.5px]' : 'text-slate-500 stroke-2 group-hover:text-[#0D1C2E]'}`} />
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`text-sm lg:text-base whitespace-nowrap transition-all duration-300 ${isActive ? 'font-bold text-[#0D1C2E]' : 'font-medium text-slate-500 group-hover:text-slate-800'}`}>{category.label}</span>
                                            {isActive ? (<motion.div layoutId="underline" className="w-full h-[3px] bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.6)]" />) : (<div className="w-0 h-[3px] bg-transparent" />)}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="min-h-[120px] pt-6 lg:pt-8 border-t border-slate-100">
                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                                className={activeTab === 'diger' ? "flex justify-center py-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4"}
                            >
                                {serviceCategories.find(c => c.id === activeTab)?.items.map((item: any, idx) => {
                                    const CardContent = () => (
                                        <>
                                            <div className="relative h-44 lg:h-48 w-full overflow-hidden">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                            </div>
                                            <div className="p-5 lg:p-6 flex flex-col flex-1">
                                                <h3 className="text-lg lg:text-xl font-bold text-[#0D1C2E] mb-2 group-hover:text-amber-600 transition-colors">{item.name}</h3>
                                                <p className="text-xs lg:text-sm text-slate-500 mb-4 lg:mb-6 line-clamp-2">{tCards('desc_template', { service: item.name })}</p>
                                                <div className="mt-auto">
                                                    <div className="w-full py-2.5 lg:py-3 rounded-xl border border-slate-200 font-bold text-slate-600 flex items-center justify-center gap-2 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent transition-all duration-300 text-sm lg:text-base">
                                                        <MessageCircle className="w-4 h-4" /><span>{tCards('whatsapp_btn')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );

                                    const containerClass = `group bg-white rounded-[1.5rem] lg:rounded-3xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full shadow-sm ${activeTab === 'diger' ? 'w-full max-w-md' : ''}`;

                                    return (
                                        <div key={idx} className={containerClass}>
                                            <a href={createWhatsAppLink(item.name)} target="_blank" rel="noopener noreferrer" className="contents">
                                                <CardContent />
                                            </a>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* --- HİZMET STANDARTLARIMIZ --- */}
            <section className="py-16 lg:py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-xs lg:text-sm">Neden Biz?</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0D1C2E] mt-2 mb-4">{tFeat('title')}</h2>
                        <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { icon: ShieldCheck, color: "blue", title: tFeat('f1_title'), desc: tFeat('f1_desc') },
                            { icon: Languages, color: "purple", title: tFeat('f2_title'), desc: tFeat('f2_desc') },
                            { icon: Wallet, color: "green", title: tFeat('f3_title'), desc: tFeat('f3_desc') },
                            { icon: Sparkles, color: "amber", title: tFeat('f4_title'), desc: tFeat('f4_desc') }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 bg-white text-${feature.color}-600 shadow-sm`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
