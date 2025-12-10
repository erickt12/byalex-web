// src/components/Process.tsx
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "DESCUBRIMIENTO",
    desc: "Inmersión total. Analizo tu marca, tus objetivos y a tu audiencia para encontrar la estrategia ganadora."
  },
  {
    id: 2,
    title: "CONCEPTO Y DISEÑO",
    desc: "Traducimos ideas en píxeles. Creamos wireframes y prototipos visuales de alto impacto."
  },
  {
    id: 3,
    title: "DESARROLLO",
    desc: "Código limpio y artesanal (Next.js). Construimos una web rápida, segura y escalable."
  },
  {
    id: 4,
    title: "OPTIMIZACIÓN",
    desc: "Pulimos cada detalle. Ajustes de SEO, animaciones fluidas y rendimiento máximo en móviles."
  },
  {
    id: 5,
    title: "LANZAMIENTO",
    desc: "Despegue. Tu sitio web sale al mundo listo para convertir visitantes en clientes."
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de la línea (Crece hacia abajo)
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );

    // Animación de los textos (Aparecen suaves)
    const stepsElements = document.querySelectorAll('.step-item');
    stepsElements.forEach((step) => {
        gsap.fromTo(step,
            { opacity: 0, x: -20 }, // En móvil se siente mejor si vienen un poquito de lado
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 px-4 md:px-20 bg-dark overflow-hidden">
      
      {/* Título */}
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-6xl font-black font-sans text-white tracking-tighter">
            CÓMO <span className="text-neon-cyan">TRABAJO</span>
        </h2>
        <p className="font-mono text-gray-400 mt-4 text-xs md:text-base tracking-widest">
            DEL CONCEPTO A LA REALIDAD
        </p>
      </div>

      {/* Contenedor del Timeline */}
      <div className="relative max-w-5xl mx-auto">
        
        {/* --- LÍNEAS (EJE VERTICAL) --- */}
        {/* CAMBIO CLAVE: En móvil (default) está en left-4. En escritorio (md) se va a left-1/2 */}
        
        {/* Línea Gris (Fondo) */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-white/10" />

        {/* Línea Cyan (Progreso) */}
        <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-[2px] bg-neon-cyan top-0 shadow-[0_0_15px_#00f3ff]"
        >
            {/* Puntito Brillante */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-black border-2 border-neon-cyan rounded-full shadow-[0_0_20px_#00f3ff]" />
        </div>


        {/* --- LOS PASOS --- */}
        <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {steps.map((step, index) => (
                <div 
                    key={step.id} 
                    className={`step-item flex flex-col md:flex-row items-start md:items-center w-full ${
                        index % 2 === 0 ? '' : 'md:flex-row-reverse' // Solo alterna en escritorio
                    }`}
                >
                    {/* Lado del TÍTULO */}
                    {/* EN MÓVIL: pl-12 (padding left) para dejar espacio a la línea y text-left */}
                    <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left mb-2 md:mb-0`}>
                        <span className="font-mono text-neon-purple text-lg md:text-xl font-bold block mb-1 md:mb-2">
                            PASO 0{step.id}
                        </span>
                        <h3 className="font-sans font-bold text-2xl md:text-4xl text-white">
                            {step.title}
                        </h3>
                    </div>

                    {/* Espaciador Central (Solo visible en escritorio) */}
                    <div className="hidden md:block w-2/12" />

                    {/* Lado de la DESCRIPCIÓN */}
                    {/* EN MÓVIL: pl-12 y text-left también */}
                    <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-left text-gray-400 font-light leading-relaxed text-sm md:text-base`}>
                        <p>{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}