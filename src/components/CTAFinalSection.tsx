'use client'

import { ArrowRight, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { CTA_CONFIGS } from "@/routes";
import { getServiceFromPath, trackEvent } from "@/lib/analytics";

export default function CTAFinalSection() {
  const pathname = usePathname();
  const service = getServiceFromPath(pathname);

  return (
    <section className="relative py-24 md:py-32 bg-[#0B1C2D] overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C2D] via-[#0B1C2D] to-[#12324A] opacity-90" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Seu Ambiente TOTVS Está Realmente Seguro?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-14 leading-relaxed">
            Ambientes críticos não falham por acaso. Eles falham por ausência de monitoramento estruturado,
            governança técnica e acompanhamento especializado.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-6">

            <a
              href={CTA_CONFIGS.institutional.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CTA_CONFIGS.institutional.label}
              onClick={() => trackEvent('cta_click', { page_path: pathname ?? '', service, cta_location: 'home_final_cta' })}
              className="w-full sm:w-auto px-6 sm:px-10 py-5 bg-[#1DAEFF] hover:bg-[#1493d6] text-[#0B1C2D] font-semibold text-lg text-center whitespace-normal rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg shadow-[#1DAEFF]/30"
            >
              Agendar triagem técnica
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA */}
            <a
              href={CTA_CONFIGS.institutional.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CTA_CONFIGS.institutional.label}
              onClick={() => trackEvent('cta_click', { page_path: pathname ?? '', service, cta_location: 'home_final_cta' })}
              className="text-white/70 hover:text-white text-sm flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              Prefere falar direto? Conversar agora
            </a>

          </div>

          {/* Trust Line */}
          <div className="mt-12 text-white/60 text-sm">
            Triagem técnica para ambientes críticos • Triagem técnica de 20 minutos
          </div>

        </div>
      </div>
    </section>
  );
}
