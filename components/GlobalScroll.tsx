// src/components/GlobalScroll.tsx
'use client';

export default function GlobalScroll() {
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col items-center gap-2 mix-blend-difference pointer-events-none">
      
      {/* Texto SCROLL (Ahora horizontal) */}
      <p className="font-mono text-white text-[10px] tracking-widest uppercase opacity-80">
        
      </p>

      {/* Flecha rebotando */}
      <div className="animate-bounce">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="white" 
            className="w-6 h-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>

    </div>
  );
}