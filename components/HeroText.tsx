'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "Boya Badana",
  "Montaj",
  "Temizlik",
  "Tesisat",
  "Elektrik"
];

export default function HeroText() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0D1C2E] leading-[1.1] mb-6">
        Eviniz İçin <br />
        
        {/* TEK YAPILI GRID SİSTEMİ (Layout Shift Engelleyici) */}
        {/* Bu yapı hem sunucuda hem istemcide AYNIDIR. React yıkıp yeniden yapmaz. */}
        <span className="inline-grid grid-cols-1 grid-rows-1 text-[#F59E0B]">
          
          {/* KATMAN 1: GÖRÜNMEZ İSKELET (Ghost Text) */}
          {/* En uzun kelimeyi buraya koyuyoruz. Sayfa yüklenir yüklenmez yer kaplar. 
              Kutu boyutunu bu belirler, asla değişmez. */}
          <span className="col-start-1 row-start-1 opacity-0 pointer-events-none select-none whitespace-nowrap px-1">
            Boya Badana?
          </span>

          {/* KATMAN 2: GÖRÜNEN METİN */}
          {/* İskeletin tam üzerine biner. */}
          <span className="col-start-1 row-start-1 whitespace-nowrap px-1">
            {/* Sayfa tam yüklenmediyse (isMounted false) sabit yazıyı göster, yüklenince animasyonu başlat */}
            {!isMounted ? (
              <span>Temizlik?</span>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20, 
                    mass: 0.5 
                  }}
                  className="block"
                >
                  {words[index]}?
                </motion.span>
              </AnimatePresence>
            )}
          </span>

        </span>
      </h1>
      
      <p className="mt-4 text-lg text-slate-500 max-w-lg">
        Eyüphan Usta ve profesyonel ekibiyle evinizdeki tüm tamirat işleri için <span className="font-bold text-slate-800">hızlı, garantili</span> ve <span className="font-bold text-slate-800">ekonomik</span> çözümler.
      </p>
    </div>
  );
}