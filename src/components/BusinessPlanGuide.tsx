import React from 'react';
import { 
  Phone, 
  ChevronRight, 
  TrendingUp, 
  FileText, 
  Landmark, 
  Users, 
  CheckCircle2, 
  Repeat, 
  Rocket,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';

export const BusinessPlanGuide: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Pide turno',
      desc: 'Llama al *2994 o completa el formulario en gov.il.',
      isHighlight: false,
    },
    {
      num: 2,
      title: 'Centro Maalot',
      desc: 'Primera reunión con un asesor de tu zona.',
      isHighlight: false,
    },
    {
      num: 3,
      title: 'Plan de negocio',
      desc: 'Viabilidad, modelo e impuestos.',
      isHighlight: false,
    },
    {
      num: 4,
      title: 'Financiamiento',
      desc: 'Ayuda para tramitar préstamos y talleres.',
      isHighlight: true,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Botón de llamada en celular (en notebook ya figura en el SectionHeader) */}
      <div className="sm:hidden">
        <a
          href="tel:*2994"
          className="w-full min-h-[48px] bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-base px-5 py-3 rounded-2xl shadow-2xs flex items-center justify-center gap-2 transition"
        >
          <Phone className="w-5 h-5 text-white" />
          <span>Llamar *2994 (Ministerio de Aliá)</span>
        </a>
      </div>

      {/* Tarjeta Principal: De la idea a tu negocio con Roadmap de 4 pasos */}
      <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-2xs space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E2559]">
            De la idea a tu negocio
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-1">
            Servicio gratuito del Ministerio de Aliá, en español.
          </p>
        </div>

        {/* Roadmap de 4 pasos - Notebook (Horizontal con flechas) */}
        <div className="hidden lg:grid grid-cols-4 gap-3 items-center">
          {steps.map((st, idx) => (
            <React.Fragment key={st.num}>
              <div
                className={`rounded-2xl p-5 flex flex-col justify-between h-[160px] transition ${
                  st.isHighlight
                    ? 'bg-[#2A7050] text-white shadow-sm'
                    : 'bg-white border border-neutral-200 text-[#0E2559]'
                }`}
              >
                <div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm ${
                      st.isHighlight
                        ? 'bg-white/20 text-white'
                        : 'bg-[#2A7050] text-white'
                    }`}
                  >
                    {st.isHighlight ? <Rocket className="w-4 h-4 text-white" /> : st.num}
                  </div>
                  <h3
                    className={`font-extrabold text-base mt-3 leading-tight ${
                      st.isHighlight ? 'text-white' : 'text-[#0E2559]'
                    }`}
                  >
                    {st.title}
                  </h3>
                </div>
                <p
                  className={`text-xs sm:text-[13px] leading-snug mt-1.5 ${
                    st.isHighlight ? 'text-white/90' : 'text-neutral-600'
                  }`}
                >
                  {st.desc}
                </p>
              </div>

              {/* Flecha conectora entre pasos */}
              {idx < steps.length - 1 && (
                <div className="hidden -mr-6 -ml-6 z-10 pointer-events-none self-center justify-center">
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Roadmap de 4 pasos - Celular (Vertical con flechas) */}
        <div className="lg:hidden space-y-3">
          {steps.map((st, idx) => (
            <div key={st.num} className="space-y-2">
              <div
                className={`rounded-2xl p-4 flex items-start gap-3.5 transition ${
                  st.isHighlight
                    ? 'bg-[#2A7050] text-white shadow-sm'
                    : 'bg-white border border-neutral-200 text-[#0E2559]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 mt-0.5 ${
                    st.isHighlight
                      ? 'bg-white/20 text-white'
                      : 'bg-[#2A7050] text-white'
                  }`}
                >
                  {st.isHighlight ? <Rocket className="w-4 h-4 text-white" /> : st.num}
                </div>
                <div>
                  <h3
                    className={`font-extrabold text-base leading-tight ${
                      st.isHighlight ? 'text-white' : 'text-[#0E2559]'
                    }`}
                  >
                    {st.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm mt-1 leading-snug ${
                      st.isHighlight ? 'text-white/90' : 'text-neutral-600'
                    }`}
                  >
                    {st.desc}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer con SourceBadge */}
        <div className="pt-3 border-t border-black/5">
          <SourceBadge
            organismo="Ministerio de Aliá e Integración"
            sitio="gov.il"
            fecha="revisado oct 2026"
          />
        </div>
      </div>

      {/* Dos tarjetas: ¿Quién puede usarlo? y Qué incluye */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tarjeta 1: ¿Quién puede usarlo? */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-xl text-[#0E2559]">
            ¿Quién puede usarlo?
          </h3>

          <div className="space-y-3">
            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3.5 bg-white">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#2A7050] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="font-bold text-sm sm:text-base text-[#0E2559]">
                Olim · hasta 10 años desde la Aliá, mayores de 21
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3.5 bg-white">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#2A7050] shrink-0">
                <Repeat className="w-5 h-5" />
              </div>
              <p className="font-bold text-sm sm:text-base text-[#0E2559]">
                Residentes que vuelven · 5+ años afuera, hasta 2 años de regreso
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Qué incluye */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-xl text-[#0E2559]">
            Qué incluye
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-white">
              <div className="w-9 h-9 rounded-xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm sm:text-base text-[#0E2559]">
                Viabilidad
              </span>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-white">
              <div className="w-9 h-9 rounded-xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm sm:text-base text-[#0E2559]">
                Impuestos
              </span>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-white">
              <div className="w-9 h-9 rounded-xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm sm:text-base text-[#0E2559]">
                Préstamos
              </span>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3 bg-white">
              <div className="w-9 h-9 rounded-xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm sm:text-base text-[#0E2559]">
                Talleres
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BusinessPlanGuide;
