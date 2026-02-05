import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd"; // Schema eklendi
import GoogleAnalytics from "@/components/GoogleAnalytics"; // Analytics eklendi
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CookieBanner from "@/components/CookieBanner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mr. Fix",
  description: "Premium Home Services",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      {/* min-h-screen ve flex yapısı Footer'ın her zaman en altta kalmasını sağlar */}
      <body className={`${montserrat.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>

          <Navbar />

          {/* flex-grow: İçerik azsa bile main alanı kaplar, footer'ı aşağı iter */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          <FloatingWhatsApp />
          <CookieBanner />
          <JsonLd />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}