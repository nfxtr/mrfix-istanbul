import React from 'react';

export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "Mr. Fix İstanbul | Tadilat & Montaj",
        "image": "https://www.mrfix-istanbul.com/logo.png",
        "@id": "https://www.mrfix-istanbul.com",
        "url": "https://www.mrfix-istanbul.com",
        "telephone": "+905331963061",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Maslak 1453 caddesi, taşyoncası sokak",
            "addressLocality": "Sarıyer",
            "addressRegion": "İstanbul",
            "postalCode": "34485",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 41.111,
            "longitude": 29.02
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://instagram.com/mrfixistanbul",
            "https://facebook.com/mrfixistanbul"
        ]
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </section>
    );
}
