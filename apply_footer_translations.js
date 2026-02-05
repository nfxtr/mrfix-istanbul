const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');

const translations = {
    de: {
        brand_desc: "Professionelle Reparatur-, Montage- und Wartungsdienste in ganz Istanbul. Wir bieten zuverlässige und schnelle Lösungen für jedes Problem in Ihrem Zuhause.",
        quick_links: "Schnellzugriff",
        services: "Dienstleistungen",
        contact: "Kontakt",
        home: "Startseite",
        all_rights_reserved: "Alle Rechte vorbehalten.",
        privacy_policy: "Datenschutzrichtlinie",
        terms_of_use: "Nutzungsbedingungen",
        address: "Maslak 1453 Straße, Tasyoncasi Straße Sariyer/Istanbul"
    },
    fr: {
        brand_desc: "Services professionnels de réparation, montage et entretien dans tout Istanbul. Nous offrons des solutions fiables et rapides pour chaque problème de votre maison.",
        quick_links: "Liens Rapides",
        services: "Services",
        contact: "Contact",
        home: "Accueil",
        all_rights_reserved: "Tous droits réservés.",
        privacy_policy: "Politique de Confidentialité",
        terms_of_use: "Conditions d'Utilisation",
        address: "Rue Maslak 1453, Rue Tasyoncasi Sariyer/Istanbul"
    },
    ru: {
        brand_desc: "Профессиональные услуги ремонта, монтажа и обслуживания по всему Стамбулу. Мы предлагаем надежные и быстрые решения для любой проблемы в вашем доме.",
        quick_links: "Быстрые Ссылки",
        services: "Uслуги",
        contact: "Контакты",
        home: "Главная",
        all_rights_reserved: "Все права защищены.",
        privacy_policy: "Политика Конфиденциальности",
        terms_of_use: "Условия Использования",
        address: "Улица Маслак 1453, Улица Ташьйонджаси Сарыер/Стамбул"
    },
    ar: {
        brand_desc: "خدمات إصلاح وتجميع وصيانة احترافية في جميع أنحاء إسطنبول. نقدم حلولاً موثوقة وسريعة لكل مشكلة في منزلك.",
        quick_links: "روابط سريعة",
        services: "خدماتنا",
        contact: "اتصل بنا",
        home: "الرئيسية",
        all_rights_reserved: "جميع الحقوق محفوظة.",
        privacy_policy: "سياسة الخصوصية",
        terms_of_use: "شروط الاستخدام",
        address: "شارع مسلك 1453، شارع تاشيونجاسي ساريير/إسطنبول"
    },
    es: {
        brand_desc: "Servicios profesionales de reparación, montaje y mantenimiento en todo Estambul. Ofrecemos soluciones confiables y rápidas para cada problema en su hogar.",
        quick_links: "Enlaces Rápidos",
        services: "Servicios",
        contact: "Contacto",
        home: "Inicio",
        all_rights_reserved: "Todos los derechos reservados.",
        privacy_policy: "Política de Privacidad",
        terms_of_use: "Términos de Uso",
        address: "Calle Maslak 1453, Calle Tasyoncasi Sariyer/Estambul"
    },
    it: {
        brand_desc: "Servizi professionali di riparazione, montaggio e manutenzione in tutta Istanbul. Offriamo soluzioni affidabili e veloci per ogni problema della vostra casa.",
        quick_links: "Link Veloci",
        services: "Servizi",
        contact: "Contatto",
        home: "Home",
        all_rights_reserved: "Tutti i diritti riservati.",
        privacy_policy: "Politica sulla Privacy",
        terms_of_use: "Termini di Utilizzo",
        address: "Via Maslak 1453, Via Tasyoncasi Sariyer/Istanbul"
    },
    nl: {
        brand_desc: "Professionele reparatie-, montage- en onderhoudsdiensten in heel Istanbul. Wij bieden betrouwbare en snelle oplossingen voor elk probleem in uw huis.",
        quick_links: "Snelle Links",
        services: "Diensten",
        contact: "Contact",
        home: "Home",
        all_rights_reserved: "Alle rechten voorbehouden.",
        privacy_policy: "Privacybeleid",
        terms_of_use: "Gebruiksvoorwaarden",
        address: "Maslak 1453 Straat, Tasyoncasi Straat Sariyer/Istanbul"
    },
    uk: {
        brand_desc: "Професійні послуги ремонту, монтажу та обслуговування по всьому Стамбулу. Ми пропонуємо надійні та швидкі рішення для будь-якої проблеми у вашому домі.",
        quick_links: "Швидкі Посилання",
        services: "Послуги",
        contact: "Контакти",
        home: "Головна",
        all_rights_reserved: "Всі права захищені.",
        privacy_policy: "Політика Конфіденційності",
        terms_of_use: "Умови Використання",
        address: "Вулиця Маслак 1453, Вулиця Ташьйонджаси Сариєр/Стамбул"
    },
    az: {
        brand_desc: "İstanbul daxilində peşəkar təmir, quraşdırma və texniki xidmət. Evinizdəki hər bir problem üçün etibarlı və sürətli həllər təklif edirik.",
        quick_links: "Sürətli Keçidlər",
        services: "Xidmətlər",
        contact: "Əlaqə",
        home: "Ana Səhifə",
        all_rights_reserved: "Bütün hüquqlar qorunur.",
        privacy_policy: "Məxfilik Siyasəti",
        terms_of_use: "İstifadə Şərtləri",
        address: "Maslak 1453 küçəsi, Taşyoncası küçəsi Sarıyer/İstanbul"
    },
    fa: {
        brand_desc: "خدمات حرفه ای تعمیر، مونتاژ و نگهداری در سراسر استانبول. ما راه حل های سریع و قابل اعتمادی را برای هر مشکلی در خانه شما ارائه می دهیم.",
        quick_links: "لینک های سریع",
        services: "خدمات",
        contact: "تماس",
        home: "خانه",
        all_rights_reserved: "کلیه حقوق محفوظ است.",
        privacy_policy: "سیاست حفظ حریم خصوصی",
        terms_of_use: "شرایط استفاده",
        address: "خیابان مسلک 1453، خیابان تاشیونجاسی ساریر/استانبول"
    }
};

Object.keys(translations).forEach(lang => {
    const filePath = path.join(messagesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            content.Footer = translations[lang];
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
            console.log(`Updated translations for ${lang}`);
        } catch (e) {
            console.error(`Failed to update ${lang}:`, e);
        }
    }
});
