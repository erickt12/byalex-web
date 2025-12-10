// src/components/ProjectGallery.tsx
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Clinica Dental",
    cat: "LANDINGPAGE",
    img: "/img/foto1.png", 
    link: "https://clinica-dental-one.vercel.app/" 
  },
  {
    id: 2,
    title: "Tienda Online",
    cat: "ECOMERCE",
    img: "/img/foto2.png",
    link: "https://frontend-tienda-erick.vercel.app/" 
  },
  {
    id: 3,
    title: "Estudio de Arquitectura",
    cat: "LANDINGPAGE",
    img: "/img/foto3.png",
    link: "https://estudio-arquitectura-omega.vercel.app/"   
  },
];

export default function ProjectGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const totalWidth = sectionRef.current.scrollWidth - window.innerWidth;

    gsap.fromTo(sectionRef.current,
      { x: 0 },
      {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      }
    );
  }, { scope: triggerRef });

  const handleProjectClick = (link: string) => {
    if (typeof window !== 'undefined') {
      window.open(link, '_blank');
    }
  };

  return (
    <section ref={triggerRef} className="overflow-hidden bg-dark relative z-20">
      <div ref={sectionRef} className="flex h-screen w-fit">

        {/* Intro Slide */}
        <div className="w-screen h-screen flex items-center justify-center flex-col shrink-0 px-20">
            <h2 className="text-[10vw] font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                PROYECTOS
            </h2>
            <p className="font-mono text-neon-cyan mt-4 tracking-widest">SCROLL --&gt;</p>
        </div>

        {/* Project Cards */}
        {projects.map((project) => (
          <div key={project.id} className="w-[85vw] md:w-[80vw] h-screen p-4 md:p-10 flex items-center justify-center shrink-0 relative group">
            
            {/* CORRECCIÓN: Quitamos onTouchEnd. Solo onClick. */}
            <div 
                onClick={() => handleProjectClick(project.link)}
                className="relative w-full h-[70%] md:h-[80%] overflow-hidden bg-glass border border-white/10 backdrop-blur-md rounded-2xl transition-all duration-700 ease-out transform scale-100 md:scale-95 md:group-hover:scale-100 group-hover:shadow-2xl group-hover:border-white/30 cursor-pointer"
                role="link"
                tabIndex={0}
            >
                <img
                    src={project.img}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 grayscale-0 md:opacity-60 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-1000 ease-out pointer-events-none"
                />

                <div className="absolute top-6 right-6 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent w-full translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    <span className="font-mono font-bold text-xs md:text-sm text-neon-purple mb-2 block uppercase tracking-wider">
                      {project.cat}
                    </span>
                    <h3 className="text-4xl md:text-7xl font-sans font-black text-white uppercase leading-none">
                      {project.title}
                    </h3>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}