// src/app/page.tsx
'use client';
import { useState, useEffect, Suspense } from 'react'; // <--- 1. IMPORTAMOS SUSPENSE
import Preloader from '@/components/Preloader';
import ProjectGallery from '@/components/ProjectGallery';
import SmoothScroll from '@/components/SmoothScroll';
import Ribbons from '@/components/Ribbons';
import Ballpit from '@/components/Ballpit';
import TopBar from '@/components/TopBar';
import TextType from '@/components/TextType';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import GlobalScroll from '@/components/GlobalScroll';

export default function Home() {
  const [ballCount, setBallCount] = useState(50);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setBallCount(mobile ? 35 : 85);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToAbout = () => {
    const section = document.getElementById('intro');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Agrega esta función arriba, junto a scrollToAbout
const scrollToPricing = () => {
  const section = document.getElementById('pricing');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <>
      <div className="hidden md:block fixed inset-0 pointer-events-none z-[50]">
        <Ribbons enableShaderEffect={true} />
      </div>

      <TopBar /> 
      <GlobalScroll />
      <Preloader />

      <SmoothScroll>
        <main className="bg-dark min-h-screen text-white selection:bg-neon-cyan selection:text-black">
          
          {/* HERO SECTION */}
          <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
            <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
               <Ballpit 
                  count={ballCount}
                  gravity={0.1}
                  friction={0.95}
                  wallBounce={0.95}
                  followCursor={!isMobile} 
                  colors={['#00f3ff', '#bd00ff', '#1a1a1a']}
               />
            </div>

            <div className="z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
              <div className="flex flex-col items-start relative">
                <span className="font-mono text-xl md:text-5xl font-bold tracking-widest text-neon-purple mb-0 md:mb-2 ml-1">
                  BYALEX
                </span>
                <h1 className="text-[14vw] md:text-[8vw] leading-[0.9] font-black font-sans tracking-tighter text-white">
                  DISEÑADOR WEB
                </h1>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mt-8 md:mt-12 pointer-events-auto">
                <button 
                  onClick={scrollToAbout}
                  className="group relative px-8 py-4 rounded-full border border-[#bd00ff] bg-transparent overflow-hidden transition-all duration-300 hover:bg-[#bd00ff]/10 active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 font-mono font-bold text-white tracking-wider text-sm">
                    DESCUBRIR MÁS
                  </span>
                </button>

                <button 
                onClick={scrollToPricing} // <--- AQUÍ LA MAGIA
                className="group relative pl-2 pr-8 py-2 rounded-full border border-[#bd00ff] bg-[#bd00ff] flex items-center gap-4 shadow-[0_0_20px_rgba(189,0,255,0.4)] hover:shadow-[0_0_40px_rgba(189,0,255,0.6)] hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#bd00ff] group-hover:rotate-[-45deg] transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                  <span className="font-mono font-bold text-white tracking-wider text-sm">
                    CREA TU PROYECTO
                  </span>
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 flex justify-between w-full px-10 font-mono text-xs uppercase opacity-70 pointer-events-none text-white">
              <span></span>
              <span></span>
            </div>
          </section>

          {/* INTRO TEXT REVEAL */}
          <section id="intro" className="min-h-[50vh] flex items-center justify-center py-20 px-4 md:px-20 scroll-mt-20">
              <div className="text-2xl md:text-4xl font-bold text-center leading-none max-w-5xl">
                  <TextType
                    text={[
                      "CREO EXPERIENCIAS DIGITALES QUE NO SOLO SE VEN BIEN, SINO QUE CUENTAN UNA HISTORIA Y ELEVAN EL VALOR PERCIBIDO DE TU MARCA"
                    ]}
                    typingSpeed={55}      
                    startOnVisible={true} 
                    loop={false}          
                    showCursor={true}     
                    cursorCharacter="|"
                    className="text-white" 
                  />
              </div>
          </section>

          <ProjectGallery />
          
          <Process />

          {/* 2. ENVOLVEMOS PRICING EN SUSPENSE */}
          {/* <Suspense fallback={<div className="h-screen bg-dark" />}>
            <Pricing />
          </Suspense> */}

          {/* AGREGAMOS id="pricing" AQUÍ PARA QUE EL SCROLL SEPA DONDE BAJAR */}
{/* PRECIOS Y FAQ EN SUSPENSE */}
<Suspense fallback={<div className="h-screen bg-dark" />}>
            
            {/* SECCIÓN CON ID PARA EL SCROLL */}
            <section id="pricing" className="scroll-mt-20">
               <Pricing />
            </section>

            {/* FAQ VA DESPUÉS */}
            <FAQ />
            
          </Suspense>

          {/* --- MINI FOOTER (CRÉDITOS) --- */}
          <footer className="py-10 text-center border-t border-white/10 bg-black">
              <p className="font-mono text-gray-600 text-xs">
                  © {new Date().getFullYear()} BYALEX. ALL RIGHTS RESERVED.
              </p>
          </footer>

        </main>
      </SmoothScroll>
    </>
  );
}