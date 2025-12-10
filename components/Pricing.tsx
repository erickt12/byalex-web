// src/components/Pricing.tsx
'use client';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Para leer la URL
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 1,
    name: "LANDING PAGE",
    priceARS: "250.000",
    priceUSD: "200",
    desc: "Convierte visitas en clientes. Ideal para Profesionales, Servicios y Ads.",
    features: [
      "Diseño One-Page de Alto Impacto",
      "Optimización para Ventas (CRO)",
      "Animaciones Suaves (GSAP)",
      "Botón a WhatsApp Integrado",
      "Entrega en 5-7 días"
    ],
    color: "border-gray-500",
    glow: "group-hover:shadow-gray-500/50",
    popular: false
  },
  {
    id: 2,
    name: "INSTITUCIONAL",
    priceARS: "400.000",
    priceUSD: "400",
    desc: "Tu oficina digital. Genera autoridad y confianza para tu marca.",
    features: [
      "Hasta 5 Secciones Internas",
      "Blog / Noticias Autoadministrable",
      "SEO Técnico Avanzado",
      "Formularios de Contacto",
      "Diseño 100% Personalizado"
    ],
    color: "border-neon-cyan",
    glow: "group-hover:shadow-neon-cyan/50",
    popular: true
  },
  {
    id: 3,
    name: "E-COMMERCE",
    priceARS: "450.000",
    priceUSD: "450",
    desc: "Vende 24/7. Una tienda robusta, segura y automatizada.",
    features: [
      "Código a Medida (Next.js) o Shopify",
      "Pasarelas de Pago Integradas",
      "Panel de Administración",
      "Catálogo de Productos",
      "Opción No-Code a 300$ disponible"
    ],
    color: "border-neon-purple",
    glow: "group-hover:shadow-neon-purple/50",
    popular: false
  }
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  
  // Estado para la moneda: 'ARS' por defecto
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [loading, setLoading] = useState(true);

  // DETECCIÓN INTELIGENTE DE PAÍS
  useEffect(() => {
    const checkLocation = async () => {
      // 1. Prioridad: Si la URL tiene ?pais=EC o ?cur=USD, forzamos Dólares
      const urlCountry = searchParams.get('pais');
      const urlCur = searchParams.get('cur');

      if (urlCountry === 'EC' || urlCountry === 'USA' || urlCur === 'USD') {
        setCurrency('USD');
        setLoading(false);
        return;
      }
      
      // 2. Si es ?pais=AR, forzamos Pesos
      if (urlCountry === 'AR' || urlCur === 'ARS') {
        setCurrency('ARS');
        setLoading(false);
        return;
      }

      // 3. Si no hay nada en la URL, intentamos detectar IP (Opcional)
      try {
        // Usamos una API gratuita para ver de dónde viene
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Si no es Argentina, asumimos que es Dólares (Ecuador, USA, Europa)
        if (data.country_code !== 'AR') {
          setCurrency('USD');
        }
      } catch (error) {
        console.log("No se pudo detectar país, usando ARS por defecto");
      } finally {
        setLoading(false);
      }
    };

    checkLocation();
  }, [searchParams]);

  useGSAP(() => {
    const cards = document.querySelectorAll('.pricing-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  const handleWsp = (planName: string, price: string, currentCurrency: string) => {
    const symbol = currentCurrency === 'ARS' ? '$' : 'USD ';
    const message = `Hola Erick! 👋 Vengo de tu web. Me interesa el plan *${planName}* de ${symbol}${price}. ¿Podemos charlar?`;
    const phone = "5492211234567"; // TU NÚMERO AQUÍ
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-20 bg-dark relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(189,0,255,0.05),transparent_70%)] pointer-events-none" />

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black font-sans text-white tracking-tighter">
            INVERSIÓN <span className="text-neon-purple">INTELIGENTE</span>
        </h2>
        
        {/* Toggle Manual de Moneda (Por si la detección falla) */}
        <div className="flex justify-center items-center gap-4 mt-8">
            <button 
                onClick={() => setCurrency('ARS')}
                className={`text-sm font-mono px-4 py-1 rounded-full border transition-all ${currency === 'ARS' ? 'bg-neon-cyan text-black border-neon-cyan' : 'border-white/20 text-gray-500 hover:text-white'}`}
            >
                ARS ($)
            </button>
            <button 
                onClick={() => setCurrency('USD')}
                className={`text-sm font-mono px-4 py-1 rounded-full border transition-all ${currency === 'USD' ? 'bg-neon-cyan text-black border-neon-cyan' : 'border-white/20 text-gray-500 hover:text-white'}`}
            >
                USD (U$D)
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`pricing-card group relative bg-glass backdrop-blur-xl border ${plan.color} p-8 rounded-3xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${plan.glow} flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-cyan text-black font-bold font-mono text-xs py-1 px-4 rounded-full uppercase tracking-widest shadow-[0_0_10px_#00f3ff]">
                Recomendado
              </div>
            )}

            <div className="mb-8 text-center">
                <h3 className="font-mono text-gray-400 text-sm tracking-widest mb-2 uppercase">
                    {plan.name}
                </h3>
                <div className="flex items-start justify-center gap-1 text-white">
                    <span className="text-2xl mt-2">
                        {currency === 'ARS' ? '$' : 'U$D'}
                    </span>
                    <span className="text-6xl font-black font-sans tracking-tighter">
                        {/* Mostramos el precio según la moneda seleccionada */}
                        {currency === 'ARS' ? plan.priceARS.split('.')[0] : plan.priceUSD}
                    </span>
                    <div className="flex flex-col items-start mt-2">
                         {/* Solo mostramos decimales si es ARS y tiene punto */}
                        {currency === 'ARS' && <span className="text-xl font-bold">.{plan.priceARS.split('.')[1]}</span>}
                        <span className="text-xs text-gray-500 font-bold">
                            {currency === 'ARS' ? 'ARS' : 'DOLAR'}
                        </span>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                    {plan.desc}
                </p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <svg className={`w-5 h-5 ${plan.popular ? 'text-neon-cyan' : 'text-neon-purple'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>

            <button 
                onClick={() => handleWsp(plan.name, currency === 'ARS' ? plan.priceARS : plan.priceUSD, currency)}
                className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all duration-300 uppercase text-sm
                    ${plan.popular 
                        ? 'bg-neon-cyan text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                        : 'bg-transparent border border-white/20 text-white hover:bg-neon-purple hover:border-neon-purple hover:text-white'
                    }
                `}
            >
                Empezar Proyecto
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}