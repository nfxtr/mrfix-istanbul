import {
    Hammer, Wrench, Zap, Paintbrush, Sparkles, Truck, HelpCircle,
    Search, MessageCircle, MapPin, X, HelpCircle as HelpIcon
} from 'lucide-react';

export const WHATSAPP_NUMBER = "905331963061";

export const serviceCategories = [
    {
        id: 'montaj',
        icon: Hammer,
        items: [
            { id: 'mobilya_montaji', keywords: ['dolap', 'masa', 'sandalye', 'ikea', 'kurulum', 'gardırop', 'baza'], img: '/image.png' },
            { id: 'tv_montaji', keywords: ['televizyon', 'ekran', 'uydu', 'askı aparatı', 'led tv'], img: '/tvasma.png' },
            { id: 'raf_dolap', keywords: ['kitaplık', 'raf montajı', 'duvar rafı', 'mutfak dolabı'], img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600' },
            { id: 'perde_kornism', keywords: ['stor', 'jaluzi', 'korniş takma', 'perde'], img: '/perde.png' },
        ]
    },
    {
        id: 'tamirat',
        icon: Wrench,
        items: [
            { id: 'musluk_tamiri', keywords: ['su tesisatı', 'lavabo', 'akıtan musluk', 'conta', 'batarya'], img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600' },
            { id: 'kapi_kilit', keywords: ['çilingir', 'kapı kolu', 'menteşe', 'kilit değiştirme', 'barel'], img: '/kapikolu.png' },
            { id: 'pencere_ayari', keywords: ['pimapen', 'cam', 'fitil', 'kapanmayan pencere', 'ısıcam'], img: '/cam.png' },
            { id: 'genel_onarim', keywords: ['ufak tamirat', 'tadilat', 'usta', 'matkap'], img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=600' },
        ]
    },
    {
        id: 'elektrik',
        icon: Zap,
        items: [
            { id: 'avize_montaji', keywords: ['lamba', 'aydınlatma', 'sarkıt', 'aplik'], img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600' },
            { id: 'priz_anahtar', keywords: ['elektrik düğmesi', 'fiş', 'kablo', 'sigorta'], img: '/priz.png' },
            { id: 'elektrikci', keywords: ['şartel', 'elektrik kesintisi', 'kaçak akım', 'pano'], img: '/sigorta.png' },
            { id: 'led_aydinlatma', keywords: ['şerit led', 'spot', 'gizli ışık', 'rgb'], img: '/led.png' },
        ]
    },
    {
        id: 'boya',
        icon: Paintbrush,
        items: [
            { id: 'oda_boyama', keywords: ['duvar boyası', 'badana', 'salon boyama', 'jotun', 'dyo'], img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600' },
            { id: 'tavan_boyama', keywords: ['banyo tavanı', 'rutubet', 'kabarma'], img: '/tavan.png' },
            { id: 'duvar_kagidi', keywords: ['duvar kaplama', 'dekorasyon', 'vinil'], img: '/duvarkagidi.png' },
            { id: 'alci_siva', keywords: ['alçıpan', 'delik kapatma', 'yama', 'saten alçı'], img: '/siva.png' },
        ]
    },
    {
        id: 'temizlik',
        icon: Sparkles,
        items: [
            { id: 'ev_temizligi', keywords: ['gündelikçi', 'detaylı temizlik', 'boş ev', 'hijyen'], img: '/temizlik.png' },
            { id: 'ofis_temizligi', keywords: ['iş yeri', 'büro', 'düzenli temizlik'], img: '/ofis.png' },
            { id: 'koltuk_yikama', keywords: ['kanepe', 'berjer', 'yatak yıkama', 'buharlı temizlik'], img: '/koltuk.png' },
            { id: 'insaat_sonrasi', keywords: ['tadilat temizliği', 'inşaat artığı', 'boya kalıntısı'], img: '/insaat.png' },
        ]
    },
    {
        id: 'nakliye',
        icon: Truck,
        items: [
            { id: 'parca_esya', keywords: ['kamyonet', 'doblo', 'koltuk taşıma', 'buzdolabı'], img: '/tasinma.png' },
            { id: 'evden_eve', keywords: ['taşınma', 'nakliyat', 'eşya taşıma'], img: '/araba.png' },
            { id: 'esya_paketleme', keywords: ['kolileme', 'ambalaj', 'balonlu naylon'], img: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=600' },
            { id: 'ofis_tasima', keywords: ['iş yeri taşıma', 'dosya taşıma', 'masa taşıma'], img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
        ]
    },
    {
        id: 'diger',
        icon: HelpCircle,
        items: [
            { id: 'ozel_istek', keywords: ['farklı işler', 'yardım', 'destek', 'bilinmeyen', 'usta'], img: '/ozel.png' },
        ]
    }
];
