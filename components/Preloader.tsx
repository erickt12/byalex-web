// components/Preloader.tsx
'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useGSAP(() => {
    // Cronometramos la salida: La barra tarda 3s en llenarse (ver CSS abajo)
    // A los 3.2 segundos, hacemos desaparecer el loader hacia arriba.
    const timer = setTimeout(() => {
      if (!container.current) return;
      
      gsap.to(container.current, {
        yPercent: -100, // Se va hacia arriba como un telón
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setFinished(true)
      });
    }, 3200);

    return () => clearTimeout(timer);
  }, { scope: container });

  if (finished) return null;

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark flex-col gap-2"
    >
      {/* TEXTO DE BIENVENIDA */}
      <div className="text-white text-xl font-sans font-semibold ml-2 tracking-wider flex">
        Bienvenido
        <span className="dot animate-blink">.</span>
        <span className="dot animate-blink delay-200">.</span>
        <span className="dot animate-blink delay-500">.</span>
      </div>

      {/* BARRA DE FONDO */}
      <div className="relative flex items-center p-[5px] w-[250px] h-[30px] bg-[#212121] rounded-full shadow-[inset_-2px_2px_4px_0px_#0c0c0c]">
        
        {/* BARRA DE PROGRESO (relleno) */}
        <div className="bar-fill relative flex justify-center flex-col w-0 h-[20px] overflow-hidden rounded-full">
            {/* El color Cyan Neon (Gradiente sutil) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f3ff] to-[#00c3cc]" />
            
            {/* BRILLOS BLANCOS (Efecto cristal) */}
            <div className="absolute flex items-center gap-[18px] top-[-5px]">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-[10px] h-[45px] bg-white/30 rotate-45 transform" />
                ))}
            </div>
        </div>

      </div>

      {/* ESTILOS INTERNOS (Para animaciones específicas) */}
      <style jsx>{`
        .dot {
          animation: blink 1.5s infinite;
          margin-left: 3px;
        }
        
        /* Retrasos para los puntos */
        .dot:nth-child(2) { animation-delay: 0.3s; }
        .dot:nth-child(3) { animation-delay: 0.6s; }

        .bar-fill {
          /* Aquí definimos que tarde 3 segundos en llenarse */
          animation: fillBar 3s ease-out forwards;
        }

        @keyframes fillBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}