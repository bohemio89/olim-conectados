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
      title: 'Llama al *2994',
      desc: 'Información de negocios e impuestos, en español. Gratis.',
      isHighlight: false,
    },
    {
      num: 2,
      title: 'Pide cita en un centro Maalot',
      desc: 'Desde gov.il o llamando al centro de tu zona.',
      isHighlight: false,
    },
    {
      num: 3,
      title: 'Diagnóstico y modelo',
      desc: 'Evalúan tu idea y arman el modelo de negocio.',
      isHighlight: false,
    },
    {
      num: 4,
      title: 'Plan de negocio y préstamo',
      desc: 'Te ayudan con el plan (aporte de 250 ₪) y a pedir préstamos.',
      isHighlight: true,
    },
  ];

  const centers = [
    {
      name: 'Gush Dan y Shfelá',
      cities: 'Tel Aviv-Yafo, Holón, Bat Yam, Petaj Tikva, Bnei Brak, Modiín, Ariel, Ramla, Lod, Rishón LeTzión, Rejovot, Yavne',
      phone: '03-5501128',
      tel: 'tel:+97235501128',
    },
    {
      name: 'Jerusalén',
      cities: 'Jerusalén, Beit Shemesh, Maalé Adumim, Gush Etzión',
      phone: '02-6794242 (ext. 3)',
      tel: 'tel:+97226794242',
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
            Asesoría del Ministerio de Aliá para abrir o hacer crecer tu negocio.
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
            organismo="Ministerio de Aliá e Integración · centros Maalot"
            sitio="gov.il"
            fecha="revisado nov 2026"
          />
        </div>
      </div>

      {/* Centros Maalot por zona */}
      <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-xl text-[#0E2559]">Centros Maalot</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {centers.map((c) => (
            <div key={c.name} className="rounded-2xl border border-neutral-200 p-4 space-y-3">
              <div>
                <p className="font-extrabold text-[#0E2559]">{c.name}</p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-snug">{c.cities}</p>
              </div>
              <a
                href={c.tel}
                className="min-h-[44px] w-full bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>{c.phone}</span>
              </a>
            </div>
          ))}
        </div>
        <a
          href="https://www.gov.il/he/service/business-centers-new-immigrants-and-returning-residents"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] w-full border border-neutral-300 hover:bg-neutral-50 text-[#0E2559] font-bold text-sm rounded-full flex items-center justify-center gap-2 transition"
        >
          <span>Otras zonas y solicitud online (gov.il)</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Dos tarjetas: ¿Quién puede usarlo? y Qué incluye */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-xl text-[#0E2559]">¿Quién puede usarlo?</h3>
          <div className="space-y-3">
            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#2A7050] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="font-bold text-sm sm:text-base text-[#0E2559]">
                Olim · hasta 10 años desde la Aliá
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#2A7050] shrink-0">
                <Repeat className="w-5 h-5" />
              </div>
              <p className="font-bold text-sm sm:text-base text-[#0E2559]">
                Residentes que vuelven · 5+ años afuera, hasta 2 años de regreso
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600">
            Para el *2994 además hay que tener más de 21 años.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-xl text-[#0E2559]">Qué incluye</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: TrendingUp, label: 'Viabilidad' },
              { icon: FileText, label: 'Impuestos' },
              { icon: Landmark, label: 'Préstamos' },
              { icon: Users, label: 'Talleres' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-neutral-200 p-3 sm:p-4 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm sm:text-base text-[#0E2559]">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-neutral-600">
            Gratis. Solo el plan de negocio tiene un aporte de 250 ₪; talleres y cursos, un aporte simbólico.
          </p>
        </div>

      </div>

    </div>
  );
};

export default BusinessPlanGuide;
