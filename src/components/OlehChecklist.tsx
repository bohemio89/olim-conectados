import React, { useState, useEffect } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Building2,
  Calendar,
  CreditCard,
  HeartPulse,
  Landmark,
  Plane,
  FileText,
  Car,
  Home,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Users,
  Info
} from 'lucide-react';

export type AliyahType = 
  | 'Absorción directa' 
  | 'Centro de absorción' 
  | 'Ulpán en kibutz' 
  | 'Otro programa';

export interface ChecklistStep {
  id: string;
  shortTitle: string;
  fullTitle: string;
  when: string;
  agency: string;
  instructions: string[];
  alert?: string;
  source: string;
  icon: React.ComponentType<{ className?: string }>;
  actionTabId?: string;
  linkText?: string;
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  name: string;
  steps: ChecklistStep[];
}

interface OlehChecklistProps {
  onNavigateToTab?: (tabId: string) => void;
}

// 1. Definición completa de pasos y etapas para cada tipo de Aliá
const COMMON_STEPS: Record<string, ChecklistStep> = {
  aeropuerto: {
    id: 'aeropuerto',
    shortTitle: 'Aeropuerto',
    fullTitle: 'Llegada al Aeropuerto Ben Gurión',
    when: 'Día 1 · Ministerio de Aliá',
    agency: 'Ministerio de Aliá e Integración',
    instructions: [
      'Recibes tu Teudat Olé oficial en el aeropuerto.',
      'Teudat Zehut temporal válida por 9 meses.',
      'Cobras el primer pago del Sal Klitá en efectivo y te entregan el voucher de traslado gratuito a tu destino.'
    ],
    source: 'Ministerio de Aliá e Integración · gov.il · revisado oct 2026',
    icon: Plane
  },
  'kupat-jolim': {
    id: 'kupat-jolim',
    shortTitle: 'Kupat Jolim',
    fullTitle: 'Inscripción en Kupat Jolim (Obra Social)',
    when: 'Día 1 o dentro de 90 días',
    agency: 'Bituaj Leumi y Ministerio de Salud',
    instructions: [
      'Inscríbete directamente en el puesto del aeropuerto si está disponible.',
      'Si no, hazlo dentro de los 90 días en la web de Bituaj Leumi (gratis).',
      'También puedes realizar la inscripción presencial en el correo.'
    ],
    source: 'Bituaj Leumi y Ministerio de Salud · gov.il · revisado oct 2026',
    icon: HeartPulse,
    actionTabId: 'doctors',
    linkText: 'Ver directorio de médicos en español'
  },
  'cuenta-bancaria': {
    id: 'cuenta-bancaria',
    shortTitle: 'Cuenta bancaria',
    fullTitle: 'Apertura de cuenta bancaria israelí',
    when: 'Primeros días · Banco comercial',
    agency: 'Banco de Israel y Ministerio de Aliá',
    instructions: [
      'Abre una cuenta en shekels en un banco comercial local.',
      'Haz un depósito inicial de al menos 1 ₪ para activarla.',
      'Pide la constancia oficial de cuenta (Ishur Nihul Kheshbón).'
    ],
    source: 'Banco de Israel y Ministerio de Aliá · gov.il · revisado oct 2026',
    icon: CreditCard
  },
  'cita-asesor': {
    id: 'cita-asesor',
    shortTitle: 'Cita con el asesor',
    fullTitle: 'Cita con el asesor de absorción',
    when: 'Primeros días · Ministerio de Aliá',
    agency: 'Ministerio de Aliá e Integración',
    instructions: [
      'Pide turno por myVisit, llamando al *2994 o por tu área personal.',
      'Lleva la constancia del banco (Ishur Nihul Kheshbón) para cobrar los 6 pagos que faltan del Sal Klitá.',
      'Recibe la derivación oficial para inscribirte en el Ulpán de hebreo.'
    ],
    alert: 'Sin cuenta bancaria no cobras el resto del Sal Klitá.',
    source: 'Ministerio de Aliá e Integración · gov.il · revisado oct 2026',
    icon: Landmark
  },
  'tofes-101': {
    id: 'tofes-101',
    shortTitle: 'Tofes 101 al trabajar',
    fullTitle: 'Formulario 101 al ingresar a trabajar',
    when: 'Al comenzar a trabajar · Rashut HaMisim',
    agency: 'Autoridad Tributaria (Rashut HaMisim)',
    instructions: [
      'Completa el formulario 101 al incorporarte a cualquier empleo.',
      'Marca claramente que eres olé jadash.',
      'Adjunta copia de tu Teudat Olé para recibir puntos de crédito fiscal (descuento directo en el impuesto a las ganancias).'
    ],
    source: 'Autoridad Tributaria · gov.il · revisado oct 2026',
    icon: FileText,
    actionTabId: 'bureaucracy',
    linkText: 'Consultar guía de trámites y formularios'
  },
  'teudat-zehut-biometrica': {
    id: 'teudat-zehut-biometrica',
    shortTitle: 'Teudat Zehut biométrica',
    fullTitle: 'Teudat Zehut biométrica definitiva',
    when: 'Primer año · Autoridad de Población',
    agency: 'Autoridad de Población e Inmigración',
    instructions: [
      'Pide turno en la Autoridad de Población (Misrad HaPnim) a través de la app MyVisit.',
      'Haz el trámite antes de que venza la tarjeta temporal de 9 meses.',
      'Recibe tu Teudat Zehut inteligente permanente en tu domicilio.'
    ],
    source: 'Autoridad de Población e Inmigración · gov.il · revisado oct 2026',
    icon: Landmark
  },
  'licencia-conducir': {
    id: 'licencia-conducir',
    shortTitle: 'Licencia de conducir',
    fullTitle: 'Conversión de licencia de conducir',
    when: 'Primer año · Ministerio de Transporte',
    agency: 'Ministerio de Transporte',
    instructions: [
      'Con tu licencia extranjera puedes manejar solo durante el primer año.',
      'Inicia la conversión oficial antes de cumplir los 12 meses de Aliá.',
      'Revisa los pasos y requisitos en la sección de Licencia de Conducir.'
    ],
    source: 'Ministerio de Transporte · gov.il · revisado oct 2026',
    icon: Car,
    actionTabId: 'license',
    linkText: 'Ir a Licencia de Conducir'
  }
};

// Pasos específicos para Absorción Directa
const DIRECT_STAGES: RoadmapStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    name: 'Día 1',
    steps: [COMMON_STEPS.aeropuerto, COMMON_STEPS['kupat-jolim']]
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    name: 'Primeros días',
    steps: [COMMON_STEPS['cuenta-bancaria'], COMMON_STEPS['cita-asesor']]
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    name: 'Al instalarte',
    steps: [
      {
        id: 'alquilar-departamento',
        shortTitle: 'Alquilar departamento',
        fullTitle: 'Alquilar departamento y registrar dirección',
        when: 'Al instalarte · Vivienda',
        agency: 'Ministerio de la Vivienda y gov.il',
        instructions: [
          'Firma contrato de alquiler a tu nombre.',
          'Después actualiza tu dirección online gratis en gov.il.',
          'Guarda copia del contrato firmado para presentar en los trámites municipales.'
        ],
        source: 'Ministerio de la Vivienda y gov.il · revisado oct 2026',
        icon: Home
      },
      {
        id: 'ulpan-cerca',
        shortTitle: 'Ulpán cerca de casa',
        fullTitle: 'Inscripción al Ulpán de hebreo estatal',
        when: 'Al instalarte · Ministerio de Aliá',
        agency: 'Ministerio de Aliá e Integración',
        instructions: [
          'Inscríbete con la derivación oficial que te entregó tu asesor.',
          'El curso estatal de hebreo es completamente gratuito.',
          'Dura aproximadamente 5 meses en horario intensivo de mañana o tarde.'
        ],
        source: 'Ministerio de Aliá e Integración · gov.il · revisado oct 2026',
        icon: GraduationCap,
        actionTabId: 'bureaucracy',
        linkText: 'Ver información de vouchers de Ulpán'
      }
    ]
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    name: 'Primeros meses',
    steps: [
      COMMON_STEPS['tofes-101'],
      {
        id: 'arnona-descuento',
        shortTitle: 'Descuento de Arnoná',
        fullTitle: 'Descuento del 90% en impuesto de Arnoná',
        when: 'Dentro de los primeros 24 meses · Municipio',
        agency: 'Municipalidad (Iriyá)',
        instructions: [
          'Pídelo formalmente en tu municipio; el descuento NO es automático.',
          'Aplica un 90% de descuento sobre los primeros 100 m² de la propiedad.',
          'Es válido durante 12 meses dentro de tus primeros 24 meses desde la fecha de Aliá.'
        ],
        source: 'Reglamento de descuentos de Arnoná · municipio · revisado oct 2026',
        icon: Landmark
      }
    ]
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    name: 'Primer año',
    steps: [COMMON_STEPS['teudat-zehut-biometrica'], COMMON_STEPS['licencia-conducir']]
  }
];

// Pasos específicos para Centro de Absorción
const ABSORPTION_CENTER_STAGES: RoadmapStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    name: 'Día 1',
    steps: [COMMON_STEPS.aeropuerto, COMMON_STEPS['kupat-jolim']]
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    name: 'Primeros días',
    steps: [COMMON_STEPS['cuenta-bancaria'], COMMON_STEPS['cita-asesor']]
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    name: 'En el centro',
    steps: [
      {
        id: 'ulpan-en-centro',
        shortTitle: 'Ulpán en el centro',
        fullTitle: 'Ulpán de hebreo en el centro de absorción',
        when: 'En el centro · Ministerio de Aliá',
        agency: 'Centro de Absorción y Ministerio de Aliá',
        instructions: [
          'El cursado es directamente en las instalaciones del centro o en un edificio muy cercano.',
          'Aprende hebreo intensivo con otros olim y con apoyo del equipo de asistentes sociales.',
          'Combina el estudio con las orientaciones comunitarias y laborales.'
        ],
        source: 'Ministerio de Aliá e Integración · gov.il · revisado oct 2026',
        icon: GraduationCap
      },
      COMMON_STEPS['tofes-101']
    ]
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    name: 'Antes de salir',
    steps: [
      {
        id: 'buscar-departamento',
        shortTitle: 'Buscar departamento',
        fullTitle: 'Buscar departamento de alquiler',
        when: 'Antes de terminar la estadía en el centro',
        agency: 'Vivienda particular y municipio',
        instructions: [
          'Busca alquiler en la zona donde vas a vivir de forma definitiva.',
          'Firma el contrato a tu nombre antes de que termine tu estadía en el centro de absorción.',
          'Al mudarte, actualiza tu dirección online y pide el descuento de Arnoná en el municipio.'
        ],
        alert: 'Los 12 meses de descuento de Arnoná tienen que caer dentro de tus primeros 24.',
        source: 'Reglamento de descuentos de Arnoná · municipio · revisado oct 2026',
        icon: Home
      },
      COMMON_STEPS['teudat-zehut-biometrica']
    ]
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    name: 'Al mudarte',
    steps: [
      {
        id: 'direccion-arnona',
        shortTitle: 'Dirección y Arnoná',
        fullTitle: 'Actualización de dirección y solicitud de Arnoná',
        when: 'Al mudarte · Municipio y gov.il',
        agency: 'Municipalidad (Iriyá) y gov.il',
        instructions: [
          'Actualiza tu dirección de forma online y gratuita en el portal gov.il.',
          'Pide el 90% de descuento de Arnoná en la oficina o web del municipio correspondiente.',
          'Presenta el contrato de alquiler firmado y fotocopia de tu Teudat Olé y Teudat Zehut.'
        ],
        source: 'Reglamento de descuentos de Arnoná · municipio · revisado oct 2026',
        icon: Landmark
      },
      COMMON_STEPS['licencia-conducir']
    ]
  }
];

// Pasos para Ulpán en Kibutz y Otro Programa (solo Día 1 y Primeros días)
const SHORT_PROGRAM_STAGES: RoadmapStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    name: 'Día 1',
    steps: [COMMON_STEPS.aeropuerto, COMMON_STEPS['kupat-jolim']]
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    name: 'Primeros días',
    steps: [COMMON_STEPS['cuenta-bancaria'], COMMON_STEPS['cita-asesor']]
  }
];

export const OlehChecklist: React.FC<OlehChecklistProps> = ({ onNavigateToTab }) => {
  // 1. Tipo de Aliá persistido en localStorage
  const [aliyahType, setAliyahType] = useState<AliyahType>(() => {
    const saved = localStorage.getItem('olim_aliyah_type');
    if (
      saved === 'Absorción directa' ||
      saved === 'Centro de absorción' ||
      saved === 'Ulpán en kibutz' ||
      saved === 'Otro programa'
    ) {
      return saved;
    }
    return 'Absorción directa';
  });

  // Guardar cambio de tipo de Aliá
  const handleSelectAliyahType = (type: AliyahType) => {
    setAliyahType(type);
    localStorage.setItem('olim_aliyah_type', type);
  };

  // 2. Pasos completados persistidos en localStorage por ID
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
    } catch {
      // Ignorar errores de parsing
    }
    return {
      aeropuerto: true,
      'kupat-jolim': true
    };
  });

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      const completedArray = Object.keys(updated).filter(k => updated[k]);
      localStorage.setItem('olim_checklist_completed', JSON.stringify(completedArray));
      return updated;
    });
  };

  // 3. Etapas actuales según el tipo de Aliá
  const stages: RoadmapStage[] = (() => {
    switch (aliyahType) {
      case 'Centro de absorción':
        return ABSORPTION_CENTER_STAGES;
      case 'Ulpán en kibutz':
      case 'Otro programa':
        return SHORT_PROGRAM_STAGES;
      case 'Absorción directa':
      default:
        return DIRECT_STAGES;
    }
  })();

  // Todos los pasos planos del tipo activo
  const allCurrentSteps = stages.flatMap(s => s.steps);
  const totalSteps = allCurrentSteps.length;
  const completedCount = allCurrentSteps.filter(s => !!completedSteps[s.id]).length;

  // Paso seleccionado para la tarjeta de detalle (por defecto el primero o el primero incompleto)
  const [selectedStepId, setSelectedStepId] = useState<string>(() => {
    return 'cita-asesor';
  });

  // Asegurar que selectedStepId pertenezca a la lista activa
  useEffect(() => {
    const exists = allCurrentSteps.some(s => s.id === selectedStepId);
    if (!exists && allCurrentSteps.length > 0) {
      const firstIncomplete = allCurrentSteps.find(s => !completedSteps[s.id]);
      setSelectedStepId(firstIncomplete ? firstIncomplete.id : allCurrentSteps[0].id);
    }
  }, [aliyahType, allCurrentSteps, completedSteps, selectedStepId]);

  const activeStep = allCurrentSteps.find(s => s.id === selectedStepId) || allCurrentSteps[0];

  // Cálculo de estado por etapa:
  // Completa: todos los pasos completados
  // Actual ("Estás acá"): la PRIMERA etapa no completa
  // Futura: etapas posteriores
  const stageStatuses = stages.map((stg) => {
    const isStageComplete = stg.steps.every(step => !!completedSteps[step.id]);
    return {
      stageId: stg.id,
      isComplete: isStageComplete
    };
  });

  const currentStageIndex = stageStatuses.findIndex(s => !s.isComplete);
  // Si todas están completas, la última queda como actual o completa
  const activeStageIndex = currentStageIndex === -1 ? stages.length - 1 : currentStageIndex;

  // Subtítulo dinámico
  const roadmapSubtitle = (() => {
    switch (aliyahType) {
      case 'Centro de absorción':
        return 'Vives y estudias en el centro durante la transición. Después alquilas.';
      case 'Ulpán en kibutz':
        return 'Programa intensivo de hebreo y trabajo comunitario en un kibutz.';
      case 'Otro programa':
        return 'Programas de integración para jóvenes, estudiantes y programas específicos.';
      case 'Absorción directa':
      default:
        return 'Toca un paso para ver qué llevar. Se guarda en tu dispositivo.';
    }
  })();

  const aliyahOptions: AliyahType[] = [
    'Absorción directa',
    'Centro de absorción',
    'Ulpán en kibutz',
    'Otro programa'
  ];

  return (
    <div className="space-y-6">
      {/* TARJETA PRINCIPAL DEL ROADMAP */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-200/80 shadow-xs">
        
        {/* 1. Selector de Tipo de Aliá */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-slate-800 mb-3">
            ¿Cómo hiciste la Aliá?
          </p>
          <div className="bg-amber-50/50 sm:bg-amber-50/60 p-1.5 rounded-2xl flex flex-wrap gap-1.5 sm:gap-2 border border-amber-100/70">
            {aliyahOptions.map((option) => {
              const isSelected = aliyahType === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectAliyahType(option)}
                  className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex-1 sm:flex-initial text-center ${
                    isSelected
                      ? 'bg-white text-[#6B4FA0] border-2 border-[#6B4FA0] shadow-xs font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Encabezado de Tu Roadmap + Barra de Progreso */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Tu roadmap
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-0.5">
              {roadmapSubtitle}
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

        {/* 3. ROADMAP EN NOTEBOOK (HORIZONTAL) */}
        <div className="hidden lg:block">
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`
            }}
          >
            {stages.map((stage, idx) => {
              const isComplete = stageStatuses[idx]?.isComplete;
              const isCurrent = idx === activeStageIndex && !isComplete;
              const isFuture = !isComplete && !isCurrent;

              return (
                <div key={stage.id} className="relative flex flex-col items-center">
                  {/* Línea conectora horizontal entre círculos */}
                  {idx > 0 && (
                    <div 
                      className={`absolute top-[22px] -left-1/2 w-full h-[3px] -z-0 transition-colors ${
                        stageStatuses[idx - 1]?.isComplete ? 'bg-[#2A7050]' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Círculo indicador de etapa */}
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

                    {/* Nombre de la etapa */}
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

                  {/* 2 Botones de pasos apilados debajo de cada etapa */}
                  <div className="w-full mt-4 space-y-2.5">
                    {stage.steps.map((step) => {
                      const isChecked = !!completedSteps[step.id];
                      const isSelected = activeStep?.id === step.id;

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => setSelectedStepId(step.id)}
                          className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-400 bg-amber-50/25 ring-2 ring-amber-300/80 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Checkbox circular interactivo */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStepCompleted(step.id);
                              }}
                              aria-label={`Marcar ${step.shortTitle}`}
                              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                            >
                              {isChecked ? (
                                <div className="w-5 h-5 rounded-md bg-[#2A7050] text-white flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white hover:border-slate-400" />
                              )}
                            </button>

                            {/* Título corto del paso */}
                            <span className={`text-sm truncate font-medium ${
                              isChecked 
                                ? 'line-through text-slate-400' 
                                : 'text-slate-800'
                            }`}>
                              {step.shortTitle}
                            </span>
                          </div>

                          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'text-amber-600 rotate-180' : 'text-slate-400'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. ROADMAP EN CELULAR (VERTICAL) */}
        <div className="block lg:hidden space-y-6">
          {stages.map((stage, idx) => {
            const isComplete = stageStatuses[idx]?.isComplete;
            const isCurrent = idx === activeStageIndex && !isComplete;

            return (
              <div key={stage.id} className="relative flex gap-4">
                {/* Riel conector vertical */}
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
                  {idx < stages.length - 1 && (
                    <div 
                      className={`w-[2.5px] flex-1 my-1 transition-colors ${
                        isComplete ? 'bg-[#2A7050]' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>

                {/* Contenido de la etapa en celular */}
                <div className="flex-1 pb-4 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-2.5">
                    <h3 className="text-base font-bold text-slate-900">
                      {stage.name}
                    </h3>
                    <span className={`text-xs font-semibold ${
                      isComplete 
                        ? 'text-slate-500' 
                        : isCurrent 
                        ? 'text-[#E8A33D]' 
                        : 'text-slate-500'
                    }`}>
                      {isComplete ? 'Completo' : isCurrent ? 'Estás acá' : `${stage.steps.length} pasos`}
                    </span>
                  </div>

                  {/* Pasos de esta etapa en celular */}
                  <div className="space-y-2">
                    {stage.steps.map((step) => {
                      const isChecked = !!completedSteps[step.id];
                      const isSelected = activeStep?.id === step.id;

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => setSelectedStepId(step.id)}
                          className={`w-full min-h-[44px] px-3.5 py-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-400 bg-amber-50/25 ring-2 ring-amber-300/80 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStepCompleted(step.id);
                              }}
                              aria-label={`Marcar ${step.shortTitle}`}
                              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 cursor-pointer"
                            >
                              {isChecked ? (
                                <div className="w-5 h-5 rounded-md bg-[#2A7050] text-white flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white" />
                              )}
                            </button>

                            <span className={`text-sm truncate font-medium ${
                              isChecked ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}>
                              {step.shortTitle}
                            </span>
                          </div>

                          <ChevronRight className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-amber-600' : 'text-slate-400'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje Informativo especial para Ulpán en kibutz y Otro programa */}
        {(aliyahType === 'Ulpán en kibutz' || aliyahType === 'Otro programa') && (
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <Info className="w-6 h-6 text-[#6B4FA0] shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {aliyahType === 'Ulpán en kibutz' ? (
                <>
                  <strong className="text-slate-900 block font-semibold mb-1">
                    Gestión del programa en Kibutz
                  </strong>
                  Los detalles de este programa los da la Agencia Judía. La vivienda, la comida, las clases intensivas de hebreo y las jornadas de trabajo comunitario se coordinan directamente con los responsables del kibutz asignado.
                </>
              ) : (
                <>
                  <strong className="text-slate-900 block font-semibold mb-1">
                    Canales de atención por programa
                  </strong>
                  Estudiantes: Administración de Estudiantes Olim del Ministerio de Aliá. Jóvenes de secundaria: programa Naalé del Ministerio de Educación.
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. TARJETA DE DETALLE DEL PASO SELECCIONADO */}
      {activeStep && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          {/* Encabezado del detalle: Ícono violeta + Título + Subtítulo */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#6B4FA0] text-white flex items-center justify-center shrink-0 shadow-xs">
              <activeStep.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeStep.fullTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-500 font-medium mt-0.5">
                {activeStep.when}
              </p>
            </div>
          </div>

          {/* Pasos numerados con círculos violetas */}
          <div className="space-y-3.5 mb-6">
            {activeStep.instructions.map((inst, index) => (
              <div key={index} className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {inst}
                </p>
              </div>
            ))}
          </div>

          {/* Cuadro de Alerta (si corresponde) */}
          {activeStep.alert && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base font-semibold text-amber-900 leading-relaxed">
                {activeStep.alert}
              </p>
            </div>
          )}

          {/* Enlace opcional a sección interna */}
          {activeStep.actionTabId && onNavigateToTab && (
            <div className="mb-6">
              <button
                type="button"
                onClick={() => onNavigateToTab(activeStep.actionTabId!)}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#6B4FA0] hover:text-[#523A7E] hover:underline cursor-pointer"
              >
                <span>{activeStep.linkText || 'Ver sección relacionada'}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Pie de la tarjeta de detalle: Fuente + Botón Marcar/Desmarcar */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Fuente Oficial */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
              <span>Fuente: {activeStep.source}</span>
            </div>

            {/* Botón interactivo de acción de estado */}
            <button
              type="button"
              onClick={() => toggleStepCompleted(activeStep.id)}
              className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                completedSteps[activeStep.id]
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#2A7050] text-white hover:bg-[#235d43] shadow-xs'
              }`}
            >
              {completedSteps[activeStep.id] ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Desmarcar paso</span>
                </>
              ) : (
                <>
                  <span>Marcar como hecho</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 6. FRANJA VERDE INFERIOR (Solo en Absorción directa) */}
      {aliyahType === 'Absorción directa' && (
        <div className="rounded-2xl bg-[#EAF5EE] border border-[#2A7050]/20 p-4 sm:p-5 flex items-center gap-3.5 text-sm sm:text-base font-semibold text-[#1B5238]">
          <Home className="w-6 h-6 text-[#2A7050] shrink-0" />
          <p className="leading-snug">
            Ayuda de alquiler: llega sola desde el mes 7 si tu estatus de olé es desde el 1-mar-2024, o desde el mes 8 si es anterior.
          </p>
        </div>
      )}
    </div>
  );
};
export default OlehChecklist;
