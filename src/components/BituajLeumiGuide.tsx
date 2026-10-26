import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertTriangle,
  CheckSquare
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';

export const BituajLeumiGuide: React.FC = () => {
  const [selectedInjuryType, setSelectedInjuryType] = useState<'repetitive' | 'acute'>('acute');
  const [copiedPhrase, setCopiedPhrase] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 4 Documentos con casillas (2 de 4 marcados por defecto como en la captura)
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    doc1: true,
    doc2: true,
    doc3: false,
    doc4: false,
  });

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;

  const hebrewPhrases = {
    repetitive: {
      hebrew: 'אני עובד בעבודה פיזית עם תנועות חוזרות. הכאב החל והחמיר עקב העבודה. אבקש לרשום בסיכום שהפגיעה נגרמה בעבודה.',
      spanish: '"Trabajo en tareas físicas con movimientos repetitivos. El dolor comenzó y empeoró por el trabajo. Pido que conste en el informe médico que ocurrió en el trabajo."',
    },
    acute: {
      hebrew: 'נפגעתי בתאונה תוך כדי ועקב עבודתי. אבקש לרשום בסיכום שהאירוע התרחש בעבודה.',
      spanish: '"Me accidenté trabajando. Pido que el informe diga que ocurrió en el trabajo."',
    },
  };

  const activePhrase = hebrewPhrases[selectedInjuryType];

  const handleCopyPhrase = () => {
    navigator.clipboard.writeText(activePhrase.hebrew);
    setCopiedPhrase(true);
    setTimeout(() => setCopiedPhrase(false), 2000);
  };

  const steps = [
    {
      num: 1,
      title: 'Avisa y pide el BL 250',
      desc: 'Tu empleador lo firma y sella con fecha, hora y tarea.',
    },
    {
      num: 2,
      title: 'Que el médico escriba "be-avodá"',
      desc: 'En el primer resumen médico (sijum majalí).',
    },
    {
      num: 3,
      title: 'Médico ocupacional',
      desc: 'El Rofé Taasukatí de tu Kupá define los días de reposo.',
    },
    {
      num: 4,
      isFinal: true,
      title: 'Presenta en Bituaj Leumi',
      desc: 'Te pagan el 75% del salario desde el día siguiente a la lesión, hasta 91 días.',
    },
  ];

  const documents = [
    { id: 'doc1', title: 'Formulario BL 250' },
    { id: 'doc2', title: 'Primer informe médico con "be-avodá"' },
    { id: 'doc3', title: 'Certificado del médico ocupacional' },
    { id: 'doc4', title: 'Últimos 3 recibos de sueldo' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Franja roja */}
      <div className="bg-rose-50/90 border border-rose-200 text-rose-950 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
        <p className="font-bold text-sm sm:text-base leading-snug">
          Si el médico no escribe "be-avodá" (בעבודה), Bituaj Leumi puede rechazar tu reclamo.
        </p>
      </div>

      {/* 2. Card: Qué hacer si te lesionas trabajando con roadmap de 4 pasos */}
      <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-2xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">
          Qué hacer si te lesionas trabajando
        </h2>

        {/* Roadmap de 4 pasos - Notebook (Horizontal con flechas) */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-2.5 pt-2">
          {steps.map((st, idx) => (
            <React.Fragment key={st.num}>
              {st.isFinal ? (
                <div className="bg-[#6B4FA0] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-full bg-white text-[#6B4FA0] flex items-center justify-center font-black text-sm mb-3">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <h3 className="text-base font-extrabold leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-white/90 mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#6B4FA0] text-white flex items-center justify-center font-black text-xs mb-3">
                      {st.num}
                    </div>
                    <h3 className="text-base font-extrabold text-[#0E2559] leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              )}

              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Roadmap de 4 pasos - Celular (Vertical con flechas) */}
        <div className="flex flex-col lg:hidden gap-3 pt-1">
          {steps.map((st, idx) => (
            <React.Fragment key={st.num}>
              {st.isFinal ? (
                <div className="bg-[#6B4FA0] text-white rounded-2xl p-5 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-white text-[#6B4FA0] flex items-center justify-center font-black text-sm mb-2.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-base font-extrabold leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-1.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[#6B4FA0] text-white flex items-center justify-center font-black text-xs mb-2.5">
                    {st.num}
                  </div>
                  <h3 className="text-base font-extrabold text-[#0E2559] leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              )}

              {idx < steps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Detalle desplegable */}
        {isDetailOpen && (
          <div className="mt-4 pt-4 border-t border-black/5 text-sm text-slate-700 space-y-2 bg-slate-50/80 p-5 rounded-2xl leading-relaxed">
            <p className="font-bold text-[#0E2559]">Normativa de accidentes de trabajo (Dmei Pgiá):</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li>El empleador abona el salario del día de la lesión. Bituaj Leumi cubre el 75% del salario bruto a partir del día siguiente y hasta un máximo de 91 días de incapacidad laboral certificada.</li>
              <li>Aplica tanto a accidentes ocurridos en el puesto de trabajo como en el trayecto directo de ida o vuelta entre tu hogar y el lugar laboral.</li>
              <li>Exige siempre que cada informe médico incluya la frase "be-avodá" (בעבודה) para evitar que la aseguradora estatal lo tramite como enfermedad común.</li>
            </ul>
          </div>
        )}

        {/* Pie Roadmap: SourceBadge + Ver detalle */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-600 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
            <span>Fuente: Bituaj Leumi · btl.gov.il · revisado oct 2026</span>
          </div>
          <button
            onClick={() => setIsDetailOpen(!isDetailOpen)}
            className="min-h-[44px] text-[#6B4FA0] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isDetailOpen ? 'Menos detalle' : 'Ver detalle'}</span>
            {isDetailOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Debajo en 2 columnas: Frase para el médico + Documentos para presentar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Columna 1: Frase para el médico */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">
              Frase para el médico
            </h3>

            {/* Selector: Tendinitis / esfuerzo vs Accidente / golpe */}
            <div className="grid grid-cols-2 bg-slate-100/70 p-1 rounded-2xl border border-black/5 gap-1">
              <button
                type="button"
                onClick={() => setSelectedInjuryType('repetitive')}
                className={`min-h-[44px] py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer text-center ${
                  selectedInjuryType === 'repetitive'
                    ? 'bg-white text-[#0E2559] border border-[#6B4FA0] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tendinitis / esfuerzo
              </button>

              <button
                type="button"
                onClick={() => setSelectedInjuryType('acute')}
                className={`min-h-[44px] py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer text-center ${
                  selectedInjuryType === 'acute'
                    ? 'bg-white text-[#0E2559] border border-[#6B4FA0] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Accidente / golpe
              </button>
            </div>

            {/* Caja hebreo */}
            <div className="bg-[#FBF3E6] border border-[#E8A33D]/30 rounded-2xl p-5 text-right font-hebrew text-lg sm:text-xl font-bold text-[#0E2559] leading-relaxed shadow-inner" lang="he" dir="rtl">
              {activePhrase.hebrew}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 italic">
              {activePhrase.spanish}
            </p>
          </div>

          <button
            onClick={handleCopyPhrase}
            className="w-full min-h-[44px] bg-[#0E2559] hover:bg-[#1a3875] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-2xs text-sm sm:text-[15px] cursor-pointer"
          >
            {copiedPhrase ? (
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

        {/* Columna 2: Documentos para presentar */}
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">
              Documentos para presentar
            </h3>

            {/* Lista de 4 documentos con casillas */}
            <div className="space-y-2.5">
              {documents.map((doc) => {
                const isChecked = !!checkedDocs[doc.id];
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className={`min-h-[44px] p-3.5 rounded-2xl border transition flex items-center gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-white border-black/10 text-[#2A7050]'
                        : 'bg-white border-black/10 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-[#2A7050]" />
                      ) : (
                        <div className="w-5 h-5 rounded-md border-2 border-slate-400" />
                      )}
                    </div>
                    <span className={`text-sm sm:text-[15px] font-bold ${isChecked ? 'text-[#2A7050]' : 'text-slate-800'}`}>
                      {doc.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Barra de progreso "X de 4 listos" */}
          <div className="pt-2 flex items-center gap-3">
            <div className="w-32 bg-amber-100/60 rounded-full h-3 overflow-hidden shrink-0">
              <div 
                className="bg-[#2A7050] h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / 4) * 100}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              {completedCount} de 4 listos
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BituajLeumiGuide;
