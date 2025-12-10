// components/TopBar.tsx
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[40] flex items-center justify-center px-6 py-3 border-b border-white/10 bg-dark/30 backdrop-blur-md">
      
      {/* Contenedor del mensaje */}
      <div className="flex items-center gap-3">
        
        {/* Punto de estado parpadeante (Live) */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
        </span>

        {/* Texto del anuncio */}
        <p className="font-mono text-xs md:text-sm tracking-widest text-white/90">
          STATUS: <span className="text-neon-cyan">OPEN FOR WORK</span> — OFERTA DE NAVIDAD: -20% OFF
        </p>

        {/* Botón pequeño de acción (opcional) */}
        <Link 
            href="#contact" 
            className="hidden md:block ml-4 text-[10px] uppercase font-bold border border-white/20 px-2 py-1 rounded hover:bg-white hover:text-black transition-colors"
        >
            Reservar ahora
        </Link>
      </div>

    </div>
  );
}
