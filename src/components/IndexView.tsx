import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Siren, 
  FileText, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Check,
  Languages,
  ShieldCheck,
  Heart,
  Route
} from 'lucide-react';
import { LogoSymbol } from './LogoSymbol';

interface IndexViewProps {
  onNavigateToTab: (tabId: string) => void;
  onOpenAssistantWithQuery: (query: string) => void;
}

type AliyahType = 
  | 'Absorción directa' 
  | 'Centro de absorción' 
  | 'Ulpán en kibutz' 
  | 'Otro programa';

interface StepSummary {
  id: string;
  shortTitle: string;
}

interface StageSummary {
  id: string;
  stageNumber: number;
  name: string;
  steps: StepSummary[];
}

const STAGES_BY_TYPE: Record<AliyahType, StageSummary[]> = {
  'Absorción directa': [
    {
      id: 'stage-1',
      stageNumber: 1,
      name: 'Día 1',
      steps: [
        { id: 'aeropuerto', shortTitle: 'Aeropuerto' },
        { id: 'kupat-jolim', shortTitle: 'Kupat Jolim' }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      name: 'Primeros días',
      steps: [
        { id: 'cuenta-bancaria', shortTitle: 'Cuenta bancaria' },
        { id: 'cita-asesor', shortTitle: 'Cita con el asesor' }
      ]
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      name: 'Al instalarte',
      steps: [
        { id: 'alquilar-departamento', shortTitle: 'Alquilar departamento' },
        { id: 'ulpan-cerca', shortTitle: 'Ulpán cerca de casa' }
      ]
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      name: 'Primeros meses',
      steps: [
        { id: 'tofes-101', shortTitle: 'Tofes 101 al trabajar' },
        { id: 'arnona-descuento', shortTitle: 'Descuento de Arnoná' }
      ]
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      name: 'Primer año',
      steps: [
        { id: 'teudat-zehut-biometrica', shortTitle: 'Teudat Zehut biométrica' },
        { id: 'licencia-conducir', shortTitle: 'Licencia de conducir' }
      ]
    }
  ],
  'Centro de absorción': [
    {
      id: 'stage-1',
      stageNumber: 1,
      name: 'Día 1',
      steps: [
        { id: 'aeropuerto', shortTitle: 'Aeropuerto' },
        { id: 'kupat-jolim', shortTitle: 'Kupat Jolim' }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      name: 'Primeros días',
      steps: [
        { id: 'cuenta-bancaria', shortTitle: 'Cuenta bancaria' },
        { id: 'cita-asesor', shortTitle: 'Cita con el asesor' }
      ]
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      name: 'En el centro',
      steps: [
        { id: 'ulpan-en-centro', shortTitle: 'Ulpán en el centro' },
        { id: 'tofes-101', shortTitle: 'Tofes 101 al trabajar' }
      ]
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      name: 'Antes de salir',
      steps: [
        { id: 'buscar-departamento', shortTitle: 'Buscar departamento' },
        { id: 'teudat-zehut-biometrica', shortTitle: 'Teudat Zehut biométrica' }
      ]
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      name: 'Al mudarte',
      steps: [
        { id: 'direccion-arnona', shortTitle: 'Dirección y Arnoná' },
        { id: 'licencia-conducir', shortTitle: 'Licencia de conducir' }
      ]
    }
  ],
  'Ulpán en kibutz': [
    {
      id: 'stage-1',
      stageNumber: 1,
      name: 'Día 1',
      steps: [
        { id: 'aeropuerto', shortTitle: 'Aeropuerto' },
        { id: 'kupat-jolim', shortTitle: 'Kupat Jolim' }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      name: 'Primeros días',
      steps: [
        { id: 'cuenta-bancaria', shortTitle: 'Cuenta bancaria' },
        { id: 'cita-asesor', shortTitle: 'Cita con el asesor' }
      ]
    }
  ],
  'Otro programa': [
    {
      id: 'stage-1',
      stageNumber: 1,
      name: 'Día 1',
      steps: [
        { id: 'aeropuerto', shortTitle: 'Aeropuerto' },
        { id: 'kupat-jolim', shortTitle: 'Kupat Jolim' }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      name: 'Primeros días',
      steps: [
        { id: 'cuenta-bancaria', shortTitle: 'Cuenta bancaria' },
        { id: 'cita-asesor', shortTitle: 'Cita con el asesor' }
      ]
    }
  ]
};

const ALIYAH_TYPES_ORDER: AliyahType[] = [
  'Absorción directa',
  'Centro de absorción',
  'Ulpán en kibutz',
  'Otro programa'
];

export const IndexView: React.FC<IndexViewProps> = ({
  onNavigateToTab,
  onOpenAssistantWithQuery,
}) => {
  // Sincronización con localStorage idéntica a OlehChecklist
  const [aliyahType, setAliyahType] = useState<AliyahType>(() => {
    try {
      const saved = localStorage.getItem('olim_aliyah_type');
      if (
        saved === 'Absorción directa' ||
        saved === 'Centro de absorción' ||
        saved === 'Ulpán en kibutz' ||
        saved === 'Otro programa'
      ) {
        return saved;
      }
    } catch {}
    return 'Absorción directa';
  });

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('olim_checklist_completed');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const record: Record<string, boolean> = {};
          parsed.forEach((id: string) => {
            record[id] = true;
          });
          return record;
        } else if (typeof parsed === 'object' && parsed !== null) {
          return parsed;
        }
      }
    } catch {}
    return {
      aeropuerto: true,
      'kupat-jolim': true
    };
  });

  // Escuchar cambios en localStorage si el usuario navega o actualiza en otra pestaña
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedType = localStorage.getItem('olim_aliyah_type');
        if (savedType && savedType in STAGES_BY_TYPE) {
          setAliyahType(savedType as AliyahType);
        }
        const savedCompleted = localStorage.getItem('olim_checklist_completed');
        if (savedCompleted) {
          const parsed = JSON.parse(savedCompleted);
          if (Array.isArray(parsed)) {
            const record: Record<string, boolean> = {};
            parsed.forEach((id: string) => {
              record[id] = true;
            });
            setCompletedSteps(record);
          }
        }
      } catch {}
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Alternar el tipo de Aliá desde el botón "Cambiar"
  const cycleAliyahType = () => {
    const currentIndex = ALIYAH_TYPES_ORDER.indexOf(aliyahType);
    const nextType = ALIYAH_TYPES_ORDER[(currentIndex + 1) % ALIYAH_TYPES_ORDER.length];
    setAliyahType(nextType);
    try {
      localStorage.setItem('olim_aliyah_type', nextType);
    } catch {}
  };

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      const completedArray = Object.keys(updated).filter(k => updated[k]);
      try {
        localStorage.setItem('olim_checklist_completed', JSON.stringify(completedArray));
      } catch {}
      return updated;
    });
  };

  const currentStages = STAGES_BY_TYPE[aliyahType] || STAGES_BY_TYPE['Absorción directa'];
  const allCurrentSteps = currentStages.flatMap(s => s.steps);
  const totalSteps = allCurrentSteps.length;
  const completedCount = allCurrentSteps.filter(s => !!completedSteps[s.id]).length;

  const stageStatuses = currentStages.map((stg) => {
    const isStageComplete = stg.steps.every(step => !!completedSteps[step.id]);
    return {
      stageId: stg.id,
      isComplete: isStageComplete
    };
  });

  const firstIncompleteIndex = stageStatuses.findIndex(s => !s.isComplete);
  const activeStageIndex = firstIncompleteIndex === -1 ? currentStages.length - 1 : firstIncompleteIndex;

  // 4. "Las preguntas de siempre" con etiquetas de color oficiales
  const frequentQuestions = [
    {
      topic: 'SALUD',
      topicBg: 'bg-[#1F5F8B]',
      question: '¿Hay médicos que hablen español en mi Kupá?',
    },
    {
      topic: 'URGENTE',
      topicBg: 'bg-[#C0392B]',
      question: '¿Puedo ir al Miún sin derivación?',
    },
    {
      topic: 'TRÁMITES',
      topicBg: 'bg-[#6B4FA0]',
      question: '¿Mi licencia vencida se canjea o empiezo de cero?',
    },
    {
      topic: 'COMUNIDAD',
      topicBg: 'bg-[#2A7050]',
      question: '¿Dónde compro yerba y alfajores?',
    },
    {
      topic: 'SALUD',
      topicBg: 'bg-[#1F5F8B]',
      question: '¿Cómo activo mi cobertura en la Kupá?',
    },
    {
      topic: 'TRÁMITES',
      topicBg: 'bg-[#6B4FA0]',
      question: 'Me lesioné trabajando: ¿qué hago con Bituaj Leumi?',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 font-sans">
      
      {/* ========================================================
          BLOQUE 1: SALUDO & MARCA
          ======================================================== */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#FFF5DF] border border-[#F2DEB0] p-6 sm:p-10 md:p-12 shadow-xs">
        <div className="flex items-center justify-between gap-8">
          {/* Contenido textual a la izquierda */}
          <div className="max-w-2xl">
            {/* Saludo en hebreo con mano saludando */}
            <div className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-[#0E2559]">
              <span lang="he" dir="rtl">שלום</span>
              <span>👋</span>
            </div>

            {/* Título principal */}
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2559] tracking-tight leading-tight">
              Tu vida en Israel,<br />más simple.
            </h1>

            {/* Subtítulo */}
            <p className="mt-3 text-base sm:text-lg text-[#0E2559]/80 font-medium leading-relaxed">
              Médicos, trámites y comunidad, todo en español.
            </p>

            {/* 3 Sellos chicos en una sola línea */}
            <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-[#0E2559]">
              <div className="inline-flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-[#2A7050] shrink-0" />
                <span>Todo en español</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
                <span>Fuentes oficiales</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#2A7050] fill-[#2A7050]/20 shrink-0" />
                <span>Por y para olim</span>
              </div>
            </div>
          </div>

          {/* Logo grande a la derecha: SOLO EN NOTEBOOK */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="w-44 h-44 rounded-full bg-[#F5D59A]/60 flex items-center justify-center p-3 shadow-xs">
              <LogoSymbol className="w-28 h-28 drop-shadow-xs" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BLOQUE 2: "¿QUÉ NECESITAS HOY?" (4 tarjetas + franja amarilla)
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-[#0E2559] tracking-tight">
          ¿Qué necesitas hoy?
        </h2>

        {/* 4 Tarjetas: 2x2 en celular, 4 en una fila en notebook */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Tarjeta 1: Necesito un médico */}
          <button
            type="button"
            onClick={() => onNavigateToTab('doctors')}
            className="text-left bg-[#E8F3FA] hover:bg-[#deeff8] rounded-2xl p-4 sm:p-5 border border-sky-100 transition-all hover:shadow-xs cursor-pointer min-h-[44px] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1F5F8B] text-white flex items-center justify-center shadow-xs">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0E2559] mt-3 leading-snug">
                Necesito un médico
              </h3>
              <p className="text-xs text-[#0E2559]/70 mt-1">
                Verificados en tu Kupá
              </p>
            </div>
          </button>

          {/* Tarjeta 2: Es urgente */}
          <button
            type="button"
            onClick={() => onNavigateToTab('emergency')}
            className="text-left bg-[#FDE8E8] hover:bg-[#fadcdc] rounded-2xl p-4 sm:p-5 border border-red-100 transition-all hover:shadow-xs cursor-pointer min-h-[44px] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C0392B] text-white flex items-center justify-center shadow-xs">
                <Siren className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0E2559] mt-3 leading-snug">
                Es urgente
              </h3>
              <p className="text-xs text-[#0E2559]/70 mt-1">
                A dónde ir y a quién llamar
              </p>
            </div>
          </button>

          {/* Tarjeta 3: Tengo un trámite */}
          <button
            type="button"
            onClick={() => onNavigateToTab('bureaucracy')}
            className="text-left bg-[#F1EDF9] hover:bg-[#eae3f7] rounded-2xl p-4 sm:p-5 border border-purple-100 transition-all hover:shadow-xs cursor-pointer min-h-[44px] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#6B4FA0] text-white flex items-center justify-center shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0E2559] mt-3 leading-snug">
                Tengo un trámite
              </h3>
              <p className="text-xs text-[#0E2559]/70 mt-1">
                Tofes 101, Ulpán, Arnoná
              </p>
            </div>
          </button>

          {/* Tarjeta 4: Quiero conectar */}
          <button
            type="button"
            onClick={() => onNavigateToTab('community')}
            className="text-left bg-[#EAF5EE] hover:bg-[#e0f0e5] rounded-2xl p-4 sm:p-5 border border-emerald-100 transition-all hover:shadow-xs cursor-pointer min-h-[44px] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2A7050] text-white flex items-center justify-center shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0E2559] mt-3 leading-snug">
                Quiero conectar
              </h3>
              <p className="text-xs text-[#0E2559]/70 mt-1">
                Comercios, fiestas, negocios
              </p>
            </div>
          </button>
        </div>

        {/* Franja Amarilla: Alerta guardia sin hafniá */}
        <div className="bg-[#FFF5DF] border border-amber-200/90 rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold text-amber-950">
              Antes de ir a la guardia: sin hafniá te pueden cobrar hasta 1.233 ₪.
            </p>
          </div>

          {/* Botón Ver a dónde ir (solo notebook) */}
          <button
            type="button"
            onClick={() => onNavigateToTab('emergency')}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full bg-[#0E2559] hover:bg-[#16336f] text-white font-bold text-xs sm:text-sm shadow-xs transition shrink-0 cursor-pointer"
          >
            Ver a dónde ir
          </button>
        </div>
      </section>

      {/* ========================================================
          BLOQUE 3: "TU CAMINO COMO OLEH" (Roadmap resumido)
          ======================================================== */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Encabezado del Roadmap */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Tu camino como Oleh
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Marca lo que ya hiciste. Se guarda en tu dispositivo.
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="w-28 sm:w-36 h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2A7050] transition-all duration-300 rounded-full"
                style={{ width: `${Math.round((completedCount / totalSteps) * 100)}%` }}
              />
            </div>
            <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
              {completedCount} de {totalSteps}
            </span>
          </div>
        </div>

        {/* Línea: Tu camino: [tipo] · Cambiar */}
        <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
          <Route className="w-4 h-4 text-[#6B4FA0] shrink-0" />
          <span>Tu camino: <strong>{aliyahType}</strong></span>
          <span>·</span>
          <button
            type="button"
            onClick={cycleAliyahType}
            className="text-[#6B4FA0] hover:text-[#523A7E] font-bold hover:underline cursor-pointer"
          >
            Cambiar
          </button>
        </div>

        {/* ROADMAP EN NOTEBOOK: Horizontal con etapas y 2 pasos debajo */}
        <div className="hidden lg:block">
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${currentStages.length}, minmax(0, 1fr))`
            }}
          >
            {currentStages.map((stage, idx) => {
              const isComplete = stageStatuses[idx]?.isComplete;
              const isCurrent = idx === activeStageIndex && !isComplete;

              return (
                <div key={stage.id} className="relative flex flex-col items-center">
                  {/* Línea conectora */}
                  {idx > 0 && (
                    <div 
                      className={`absolute top-[22px] -left-1/2 w-full h-[3px] -z-0 transition-colors ${
                        stageStatuses[idx - 1]?.isComplete ? 'bg-[#2A7050]' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Círculo indicador */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base transition-all shadow-xs ${
                        isComplete
                          ? 'bg-[#2A7050] text-white'
                          : isCurrent
                          ? 'bg-[#E8A33D] text-white ring-4 ring-amber-100 font-black'
                          : 'bg-white border-[2.5px] border-[#0E2559] text-[#0E2559] font-black'
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-6 h-6 stroke-[3]" />
                      ) : (
                        stage.stageNumber
                      )}
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-sm font-bold text-slate-900">
                        {stage.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        isComplete 
                          ? 'text-slate-500 font-medium' 
                          : isCurrent 
                          ? 'text-[#E8A33D] font-bold' 
                          : 'text-slate-500'
                      }`}>
                        {isComplete 
                          ? 'Completo' 
                          : isCurrent 
                          ? 'Estás acá' 
                          : `${stage.steps.length} pasos`}
                      </p>
                    </div>
                  </div>

                  {/* 2 Pasos apilados debajo */}
                  <div className="w-full mt-4 space-y-2.5">
                    {stage.steps.map((step) => {
                      const isChecked = !!completedSteps[step.id];

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => toggleStepCompleted(step.id)}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-left flex items-center gap-2.5 transition-all cursor-pointer"
                        >
                          <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0">
                            {isChecked ? (
                              <div className="w-5 h-5 rounded-md bg-[#2A7050] text-white flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white" />
                            )}
                          </div>
                          <span className={`text-sm truncate font-medium ${
                            isChecked ? 'line-through text-slate-400' : 'text-slate-800'
                          }`}>
                            {step.shortTitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROADMAP EN CELULAR: Solo los círculos con título (sin botones de paso) */}
        <div className="block lg:hidden space-y-4">
          {currentStages.map((stage, idx) => {
            const isComplete = stageStatuses[idx]?.isComplete;
            const isCurrent = idx === activeStageIndex && !isComplete;

            return (
              <div key={stage.id} className="relative flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all shadow-xs ${
                      isComplete
                        ? 'bg-[#2A7050] text-white'
                        : isCurrent
                        ? 'bg-[#E8A33D] text-white ring-4 ring-amber-100 font-black'
                        : 'bg-white border-[2.5px] border-[#0E2559] text-[#0E2559] font-black'
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      stage.stageNumber
                    )}
                  </div>
                  {idx < currentStages.length - 1 && (
                    <div 
                      className={`w-[2.5px] h-6 my-1 transition-colors ${
                        isComplete ? 'bg-[#2A7050]' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 pb-1">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {stage.name}
                  </h3>
                  <p className={`text-xs mt-0.5 ${
                    isComplete 
                      ? 'text-slate-500' 
                      : isCurrent 
                      ? 'text-[#E8A33D] font-bold' 
                      : 'text-slate-500'
                  }`}>
                    {isComplete ? 'Completo' : isCurrent ? 'Estás acá' : `${stage.steps.length} pasos`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Ver mi roadmap completo */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigateToTab('checklist')}
            className="min-h-[44px] px-6 py-3 rounded-full bg-[#0E2559] hover:bg-[#16336f] text-white font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>Ver mi roadmap completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================
          BLOQUE 4: "LAS PREGUNTAS DE SIEMPRE" (6 Tarjetas con Etiqueta de Color)
          ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-black text-[#0E2559] tracking-tight">
            Las preguntas de siempre
          </h2>
          <span className="hidden sm:inline text-xs sm:text-sm text-slate-500 font-medium">
            Respondidas con fuente oficial
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {frequentQuestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onOpenAssistantWithQuery(item.question)}
              className="text-left bg-white hover:bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between min-h-[140px] cursor-pointer group"
            >
              <div>
                {/* Etiqueta / Badge de color */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white tracking-wide ${item.topicBg}`}>
                  {item.topic}
                </span>

                {/* Pregunta */}
                <h3 className="text-base font-bold text-slate-900 mt-3.5 leading-snug group-hover:text-[#0E2559]">
                  {item.question}
                </h3>
              </div>

              {/* Enlace con flecha */}
              <div className="mt-4 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6B4FA0] group-hover:translate-x-0.5 transition-transform">
                <span>Ver respuesta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

export default IndexView;
