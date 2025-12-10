// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import ProjectGallery from '@/components/ProjectGallery';
import SmoothScroll from '@/components/SmoothScroll';
import Ribbons from '@/components/Ribbons';
import Ballpit from '@/components/Ballpit';
import TopBar from '@/components/TopBar';
import TextType from '@/components/TextType'; // Importante: Importar el efecto de texto

export default function Home() {
  // Estado para controlar la cantidad de bolas según el dispositivo
  const [ballCount, setBallCount] = useState(50); 

  useEffect(() => {
    const updateCount = () => {
      // 120 bolas en PC, 50 en celular
      setBallCount(window.innerWidth > 768 ? 85 : 50);
    };

    updateCount(); // Ejecutar al inicio
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  return (
    <>
      {/* 1. CURSOR (Solo en PC) */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-[50]">
        <Ribbons enableShaderEffect={true} />
      </div>

      {/* 2. TOP BAR */}
      <TopBar /> 

      {/* 3. PRELOADER */}
      <Preloader />

      {/* 4. CONTENIDO PRINCIPAL */}
      <SmoothScroll>
        <main className="bg-dark min-h-screen text-white selection:bg-neon-cyan selection:text-black">
          
          {/* --- HERO SECTION --- */}
          <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
            
            {/* FONDO INTERACTIVO */}
            <div className="absolute inset-0 z-0">
               <Ballpit 
                  count={ballCount}
                  gravity={0.1}
                  friction={0.95}
                  wallBounce={0.95}
                  followCursor={true}
                  colors={['#00f3ff', '#bd00ff', '#1a1a1a']}
               />
            </div>

            {/* CONTENIDO HERO */}
            <div className="z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
              
              {/* Títulos */}
              <div className="flex flex-col items-start relative">
                <span className="font-mono text-xl md:text-5xl font-bold tracking-widest text-neon-purple mb-0 md:mb-2 ml-1">
                  BYALEX
                </span>
                <h1 className="text-[14vw] md:text-[8vw] leading-[0.9] font-black font-sans tracking-tighter text-white">
                  DISEÑADOR WEB
                </h1>
              </div>

              {/* Botones (Con pointer-events-auto para que funcionen) */}
              <div className="flex flex-col md:flex-row gap-6 mt-8 md:mt-12 pointer-events-auto">
                {/* Botón 1 */}
                <button className="group relative px-8 py-4 rounded-full border border-[#bd00ff] bg-transparent overflow-hidden transition-all duration-300 hover:bg-[#bd00ff]/10 active:scale-95">
                  <span className="relative z-10 font-mono font-bold text-white tracking-wider text-sm">
                    DESCUBRIR MÁS
                  </span>
                </button>

                {/* Botón 2 */}
                <button className="group relative pl-2 pr-8 py-2 rounded-full border border-[#bd00ff] bg-[#bd00ff] flex items-center gap-4 shadow-[0_0_20px_rgba(189,0,255,0.4)] hover:shadow-[0_0_40px_rgba(189,0,255,0.6)] hover:scale-105 transition-all duration-300 active:scale-95">
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

            {/* Footer del Hero */}
            <div className="absolute bottom-10 flex justify-between w-full px-10 font-mono text-xs uppercase opacity-70 pointer-events-none text-white">
              <span>[ SCROLL ]</span>
              <span>Based in Ensenada</span>
            </div>
          </section>

          {/* --- INTRO TEXT REVEAL (Recuperado) --- */}
          <section className="min-h-[50vh] flex items-center justify-center py-20 px-4 md:px-20">
              {/* Aquí aplicamos los estilos que pediste: Negrita, texto junto (leading-none), tamaño responsivo */}
              <div className="text-2xl md:text-4xl font-bold text-center leading-none max-w-5xl">
                  <TextType
                    text={[
                      "Diseñamos el futuro de la web, combinando código artesanal con narrativas visuales inmersivas."
                    ]}
                    typingSpeed={35}      
                    startOnVisible={true} 
                    loop={false}          
                    showCursor={true}     
                    cursorCharacter="|"
                    className="text-white" 
                  />
              </div>
          </section>

          {/* --- PROYECTOS --- */}
          <ProjectGallery />

          {/* --- FOOTER --- */}
          <section className="h-screen flex items-center justify-center bg-black">
              <h2 className="text-[15vw] font-bold text-gray-900 hover:text-white transition-colors duration-500 cursor-pointer">
                  CONTACT
              </h2>
          </section>

        </main>
      </SmoothScroll>
    </>
  );
}