// src/components/FAQ.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Necesario para detectar país
import gsap from 'gsap';

const faqs = [
  // ... (tus preguntas siguen igual) ...
  {
    question: "¿Cuánto tiempo tarda un proyecto completo?",
    answer: "Depende de la magnitud. Una Landing Page de alto impacto toma entre 5 a 7 días. Un sitio corporativo completo o E-commerce suele llevar de 2 a 4 semanas. Siempre priorizo la calidad sobre la velocidad."
  },
  {
    question: "¿Puedo administrar mi tienda sin conocimientos técnicos?",
    answer: "¡Absolutamente! Te entrego un panel de control intuitivo (Dashboard) donde podrás cambiar precios, subir fotos, editar textos y gestionar pedidos sin tocar una sola línea de código."
  },
  {
    question: "¿Trabajas con plantillas o es 100% personalizado?",
    answer: "Cero plantillas genéricas. Todo lo que ves es código artesanal (Next.js + React) diseñado exclusivamente para tu marca. Esto garantiza que tu web sea única, vuele en velocidad y posicione mejor en Google."
  },
  {
    question: "¿Qué te diferencia de una agencia tradicional?",
    answer: "El trato directo. Sin intermediarios, sin burocracia y sin tiempos muertos. Hablas directamente con quien diseña y programa tu web. Además, combino ingeniería de software con diseño de vanguardia (Awwwards)."
  },
  {
    question: "¿Trabajas con clientes internacionales?",
    answer: "Sí, trabajo con clientes de todo el mundo (Latam, USA, Europa). Acepto pagos en Dólares, transferencias internacionales y si eres de Ecuador o Argentina puedes pagar directamente desde tu banca mobile o mercado pago."  },
  {
    question: "¿Aceptas trabajos pequeños?",
    answer: "No hay proyecto pequeño si la visión es grande. Me encanta trabajar con emprendedores que recién inician tanto como con empresas consolidadas. Si el proyecto me desafía, cuenta conmigo."
  },
  {
    question: "¿Cómo son las formas de pago?",
    answer: "Para iniciar el proyecto se abona el 50% de anticipo para empezar a trabajar en tu proyecto, y el 50% restante se abona contra entrega, una vez que estés 100% satisfecho con el resultado."  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');

  // LÓGICA DE DETECCIÓN (Copiada de Pricing para consistencia)
  useEffect(() => {
    const checkLocation = async () => {
      const urlCountry = searchParams.get('pais');
      const urlCur = searchParams.get('cur');

      if (urlCountry === 'EC' || urlCountry === 'USA' || urlCur === 'USD') {
        setCurrency('USD');
        return;
      }
      if (urlCountry === 'AR' || urlCur === 'ARS') {
        setCurrency('ARS');
        return;
      }
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code !== 'AR') setCurrency('USD');
      } catch (error) {
        console.log("Error detectando país");
      }
    };
    checkLocation();
  }, [searchParams]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleFinalWsp = () => {
    // --- TUS NÚMEROS AQUÍ TAMBIÉN ---
    // const PHONE_ARG = "5492215383081";
    const PHONE_ECU = "593963977819";  // Num Ecuador
    // -------------------------------

// El mensaje que quieres que llegue
    const message = "Hola Erick! Tengo algunas dudas sobre mis proyectos web. ¿Podemos hablar?";
    
    // --- LÓGICA SIMPLIFICADA ---
    // Antes preguntábamos la moneda, ahora vamos directo a Ecuador:
    window.open(`https://wa.me/${PHONE_ECU}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-32 px-4 md:px-20 bg-dark relative z-10">
      
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black font-sans text-white tracking-tighter">
            PREGUNTAS <span className="text-neon-cyan">FRECUENTES</span>
        </h2>
        <p className="font-mono text-gray-400 mt-4 text-sm md:text-base">
            TODO LO QUE NECESITAS SABER ANTES DE EMPEZAR
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                activeIndex === index 
                ? 'border-neon-purple bg-white/5' 
                : 'border-white/10 bg-transparent hover:border-white/30'
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className={`font-sans font-bold text-lg md:text-xl transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}>
                {faq.question}
              </span>
              <span className="relative ml-4 flex-shrink-0">
                 <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-neon-cyan">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                 </div>
              </span>
            </button>

            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out`}
                style={{ 
                    maxHeight: activeIndex === index ? '200px' : '0px',
                    opacity: activeIndex === index ? 1 : 0
                }}
            >
              <div className="p-6 pt-0 text-gray-400 font-light leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <p className="text-white mb-6 font-mono">¿Tienes otra duda o estás listo?</p>
        <button 
             onClick={handleFinalWsp} // <--- Usa la nueva función inteligente
             className="px-10 py-4 bg-neon-cyan text-black font-bold text-xl rounded-full hover:shadow-[0_0_30px_#00f3ff] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
            HABLAR CON ERICK
        </button>
      </div>

    </section>
  );
}