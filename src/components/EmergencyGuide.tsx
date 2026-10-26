import React, { useState } from 'react';
import { 
  Phone, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';

export const EmergencyGuide: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const cases: Record<string, {
    title: string;
    description: string;
    level: 'danger' | 'warning';
    verdict: string;
    route: string[];
    costWarning: string;
    recommendedAction: string;
  }> = {
    'fiebre': {
      title: 'Fiebre alta de noche, sin riesgo de vida',
      description: 'Sientes fiebre de 39°C o malestar fuerte durante la noche o Shabat con la clínica cerrada.',
      level: 'warning',
      verdict: 'NO vayas directo a la guardia hospitalaria (Miún)',
      route: [
        '1. Entra a la app de tu Kupá (Maccabi / Clalit) y usa la telemedicina 24/7 sin cargo.',
        '2. Si requieres atención física presencial, acude a Terem o Bikur Rofé (copago de ~40 a 90 ₪).',
        '3. Si el médico de Terem constata gravedad, él mismo emite la derivación (hafniá) oficial para el hospital.',
      ],
      costWarning: 'Si vas directo al hospital sin hafniá, pagarás una factura de hasta 1.233 ₪ que la Kupá no devolverá.',
      recommendedAction: 'Llama al *3555 (Maccabi) o *2700 (Clalit) o acude al centro Terem más cercano.',
    },
    'pecho': {
      title: 'Dolor de pecho o falta de aire',
      description: 'Dolor opresivo retroesternal, dificultad respiratoria súbita, parálisis facial o pérdida de conocimiento.',
      level: 'danger',
      verdict: 'Urgencia inmediata: Llama al 101 (MADA) o acude al Miún más cercano',
      route: [
        '1. Llama de inmediato a MADA (Ambulancia al 101).',
        '2. Traslado de urgencia al Miún hospitalario.',
        '3. Si el paciente queda internado (ishpuz), el costo hospitalario queda cubierto al 100% por la ley.',
      ],
      costWarning: 'En caso de riesgo vital evidente o internación posterior, la ley exime de costos tras tramitar el Tofes 17.',
      recommendedAction: 'Marca 101 sin demora y brinda tu dirección exacta en Israel.',
    },
    'fractura': {
      title: 'Fractura o corte profundo',
      description: 'Traumatismo con sospecha de fractura ósea, corte profundo con hemorragia o quemadura.',
      level: 'warning',
      verdict: 'Acude a Terem con rayos X o directamente al Miún',
      route: [
        '1. Si estás cerca de un centro Terem con radiología, la atención suele ser más rápida que en el hospital.',
        '2. Si acudes al Miún y se confirma fractura desplazada con radiografía, la Kupá cubre la atención.',
        '3. Exige y guarda siempre el informe de alta (Sijum Miún) para gestionar la cobertura.',
      ],
      costWarning: 'Las fracturas confirmadas por rayos X tienen exención legal de cobro hospitalario.',
      recommendedAction: 'Acudir a urgencias. Conservar copias de todas las radiografías e informes.',
    },
    'trabajo': {
      title: 'Accidente en el trabajo',
      description: 'Lesión ocurrida en tu lugar de trabajo o en el trayecto directo de ida o vuelta a tu hogar.',
      level: 'warning',
      verdict: 'Exige el formulario BL 250 a tu empleador y di "Teunát Avodá"',
      route: [
        '1. Notifica a tu empleador de inmediato y solicita el formulario BL 250 firmado.',
        '2. En la guardia, recalca al personal médico: "Zot teunát avodá" (esto es un accidente laboral).',
        '3. El resumen médico debe indicar expresamente que ocurrió durante el trabajo para que Bituaj Leumi cubra los gastos y salarios.',
      ],
      costWarning: 'Si el médico no asienta que fue laboral, Bituaj Leumi rechazará el expediente y el hospital te cobrará a ti.',
      recommendedAction: 'Guardar copia de cada documento y solicitar turno urgente con médico laboral (Rofé Taasukatí).',
    },
  };

  const hebrewPhraseForHafnia = 'אני צריך הפניה למיון כדי שהקופה תכסה את הביקור בבית החולים.';

  const handleCopy = () => {
    navigator.clipboard.writeText(hebrewPhraseForHafnia);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2200);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Four Phone Cards (Matching 04-guardia-miun-celular.png and 04-guardia-miun-notebook.png) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* MADA 101 */}
        <div className="bg-[#C0392B] text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[13px] font-semibold text-white/90">Ambulancia MADA</p>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">101</p>
          </div>
          <a
            href="tel:101"
            className="mt-4 w-full min-h-[44px] bg-white text-[#C0392B] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition shadow-2xs text-[15px]"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Llamar</span>
          </a>
        </div>

        {/* Maccabi *3555 */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <p className="text-[13px] font-semibold text-slate-600">Maccabi 24/7</p>
            <p className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900">*3555</p>
          </div>
          <a
            href="tel:*3555"
            className="mt-4 w-full min-h-[44px] bg-[#2A7050] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#235e43] transition shadow-2xs text-[15px]"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Llamar</span>
          </a>
        </div>

        {/* Clalit *2700 */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <p className="text-[13px] font-semibold text-slate-600">Clalit 24/7</p>
            <p className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900">*2700</p>
          </div>
          <a
            href="tel:*2700"
            className="mt-4 w-full min-h-[44px] bg-[#1F5F8B] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#194c70] transition shadow-2xs text-[15px]"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Llamar</span>
          </a>
        </div>

        {/* Terem urgencias *2884 */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <p className="text-[13px] font-semibold text-slate-600">Terem urgencias</p>
            <p className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900">*2884</p>
          </div>
          <a
            href="tel:*2884"
            className="mt-4 w-full min-h-[44px] bg-[#B85D19] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#9c4d13] transition shadow-2xs text-[15px]"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Llamar</span>
          </a>
        </div>
      </div>

      {/* 2. Decision Tree Card: "¿A dónde voy?" */}
      <div className="bg-white rounded-3xl border border-black/10 p-5 sm:p-8 shadow-2xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">¿A dónde voy?</h2>
        <p className="text-[15px] sm:text-base text-slate-600 mt-0.5">Dos preguntas para no pagar de más.</p>

        {/* Visual Decision Tree - CELULAR (Linear vertical layout matching 04-guardia-miun-celular.png) */}
        <div className="mt-6 flex flex-col items-center max-w-md mx-auto md:hidden">
          {/* Question 1 */}
          <div className="w-full bg-[#0E2559] text-white font-bold text-center px-6 py-3.5 rounded-2xl shadow-sm text-base">
            ¿Hay riesgo de vida?
          </div>
          
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest my-2">SÍ</span>
          
          <div className="w-full bg-[#C0392B] text-white rounded-2xl p-4 text-center shadow-xs">
            <p className="font-extrabold text-base leading-tight">Llama al 101</p>
            <p className="text-xs text-white/90 mt-1 font-medium">Ambulancia MADA</p>
          </div>

          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest my-2">NO</span>

          {/* Question 2 */}
          <div className="w-full bg-[#1F5F8B] text-white font-bold text-center px-6 py-3 rounded-2xl shadow-xs text-base">
            ¿Tu clínica está abierta?
          </div>

          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest my-2">SÍ</span>

          <div className="w-full bg-[#2A7050]/10 border-2 border-[#2A7050] rounded-2xl p-3.5 text-center">
            <p className="font-bold text-sm text-[#0E2559]">Médico de cabecera</p>
            <p className="text-[13px] text-[#2A7050] font-extrabold mt-0.5">Copago 0 ₪</p>
          </div>

          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest my-2">NO</span>

          <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 text-center">
            <p className="font-bold text-sm text-[#0E2559]">Terem / Bikur Rofé</p>
            <p className="text-[13px] text-amber-800 font-extrabold mt-0.5">Copago según tu Kupá</p>
          </div>

          <div className="w-0.5 h-4 bg-slate-300 my-2"></div>

          <div className="w-full bg-[#1F5F8B]/10 border-2 border-[#1F5F8B] rounded-2xl p-3.5 text-center">
            <p className="font-bold text-sm text-[#0E2559]">Miún, solo con hafniá</p>
            <p className="text-[13px] text-[#1F5F8B] font-extrabold mt-0.5">Sin hafniá: hasta 1.233 ₪</p>
          </div>
        </div>

        {/* Visual Decision Tree - NOTEBOOK / DESKTOP (Side-by-side branches matching 04-guardia-miun-notebook.png) */}
        <div className="hidden md:flex flex-col items-center max-w-2xl mx-auto mt-8">
          {/* Question 1 Pill */}
          <div className="bg-[#0E2559] text-white font-bold text-center px-8 py-3.5 rounded-2xl shadow-sm text-base sm:text-lg">
            ¿Hay riesgo de vida?
          </div>

          {/* 2-Column Branches */}
          <div className="w-full grid grid-cols-2 gap-6 lg:gap-8 mt-5 pt-2">
            {/* Left Branch: SÍ */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">SÍ</span>
              <div className="w-full bg-[#C0392B] text-white rounded-2xl p-4 sm:p-5 text-center shadow-xs">
                <p className="font-extrabold text-base sm:text-lg leading-tight">Llama al 101</p>
                <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">Ambulancia MADA</p>
              </div>
            </div>

            {/* Right Branch: NO */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">NO</span>
              
              {/* Question 2 */}
              <div className="w-full bg-[#1F5F8B] text-white font-bold text-center px-4 py-3 rounded-2xl shadow-xs text-sm sm:text-base">
                ¿Tu clínica está abierta?
              </div>

              {/* Sub-branches for Question 2 */}
              <div className="w-full grid grid-cols-2 gap-3 mt-4 pt-2">
                {/* SÍ */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">SÍ</span>
                  <div className="w-full bg-[#2A7050]/10 border-2 border-[#2A7050] rounded-2xl p-3 sm:p-4 text-center">
                    <p className="font-bold text-xs sm:text-sm text-[#0E2559] leading-snug">Médico de cabecera</p>
                    <p className="text-[13px] text-[#2A7050] font-extrabold mt-1">Copago 0 ₪</p>
                  </div>
                </div>

                {/* NO */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">NO</span>
                  <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 text-center">
                    <p className="font-bold text-xs sm:text-sm text-[#0E2559] leading-snug">Terem / Bikur Rofé</p>
                    <p className="text-[13px] text-amber-800 font-extrabold mt-1">Copago según tu Kupá</p>
                  </div>
                </div>
              </div>

              {/* Step to Miún */}
              <div className="w-full mt-4 pt-2 flex flex-col items-center">
                <div className="w-0.5 h-4 bg-slate-300 mb-2"></div>
                <div className="w-full bg-[#1F5F8B]/10 border-2 border-[#1F5F8B] rounded-2xl p-3 sm:p-4 text-center">
                  <p className="font-bold text-xs sm:text-sm text-[#0E2559]">Miún, solo con hafniá</p>
                  <p className="text-[13px] text-[#1F5F8B] font-extrabold mt-0.5">Sin hafniá: hasta 1.233 ₪</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line & SourceBadge as specified in Requirement 3 */}
        <div className="mt-8 pt-5 border-t border-black/10 flex flex-col gap-3">
          <p className="text-[14px] sm:text-[15px] text-slate-700 leading-relaxed">
            No pagas si quedas internado, si vas con derivación de las últimas 24 horas, con una fractura nueva, una herida que necesita puntos o un accidente de trabajo avisado dentro de 7 días.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <SourceBadge organismo="Ministerio de Salud" sitio="tarifas" fecha="revisado oct 2026" />
          </div>
        </div>
      </div>

      {/* 3. Bottom Grid: Frase para pedir hafniá + Simulador de casos (2 columns on notebook) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Frase para pedir la hafniá */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">
              Frase para pedir la hafniá
            </h3>
            <p className="text-[15px] text-slate-600 mt-1">
              Muéstrasela al médico o cópiala en WhatsApp.
            </p>

            {/* Hebrew Quote Box */}
            <div className="mt-5 bg-[#FBF3E6] border border-[#E8A33D]/30 rounded-2xl p-5 text-right font-hebrew text-lg sm:text-xl font-bold text-[#0E2559] leading-relaxed" lang="he" dir="rtl">
              {hebrewPhraseForHafnia}
            </div>

            <p className="text-sm text-slate-600 italic mt-3 leading-relaxed">
              "Necesito una derivación a la guardia para que la Kupá cubra la visita."
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="mt-6 w-full min-h-[44px] bg-[#0E2559] hover:bg-[#1a3875] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition text-[15px]"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Copiado en el portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar en hebreo</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Simulador: ¿cuál es tu caso? */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">
              Simulador: ¿cuál es tu caso?
            </h3>
            <p className="text-[15px] text-slate-600 mt-1">
              Haz clic en tu situación clínica para ver la recomendación inmediata:
            </p>

            <div className="mt-4 space-y-2.5">
              {Object.entries(cases).map(([key, item], index) => {
                const isOpen = selectedCase === key;
                const isFirstDefault = selectedCase === null && index === 0;
                
                return (
                  <div key={key} className="border border-black/10 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setSelectedCase(isOpen ? null : key)}
                      className={`w-full min-h-[44px] px-4 py-3 text-left font-bold text-[14px] sm:text-[15px] flex items-center justify-between transition-colors ${
                        isOpen || isFirstDefault
                          ? 'bg-[#0E2559] text-white' 
                          : 'bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span>{item.title}</span>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 shrink-0 text-white" />
                      ) : (
                        <ChevronRight className={`w-4 h-4 shrink-0 ${isFirstDefault ? 'text-white' : 'text-slate-400'}`} />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-slate-50/70 border-t border-black/5 space-y-3 text-[14px] leading-relaxed">
                        <div className="p-3 rounded-xl bg-white border border-black/10">
                          <p className="font-extrabold text-[#0E2559] text-[15px]">
                            {item.verdict}
                          </p>
                          <p className="text-slate-600 text-[13.5px] mt-1">
                            {item.description}
                          </p>
                        </div>

                        <div className="space-y-1.5 text-slate-700 text-[13.5px]">
                          {item.route.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#2A7050] shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[13px] font-medium flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>{item.costWarning}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default EmergencyGuide;
