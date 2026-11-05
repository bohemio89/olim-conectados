import React, { useState } from 'react';
import { 
  Percent, 
  GraduationCap, 
  Home, 
  Calendar, 
  AlertTriangle, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  HeartHandshake,
  ExternalLink
} from 'lucide-react';

interface ProcedureCard {
  id: string;
  category: 'impuestos' | 'hebreo' | 'vivienda' | 'turnos';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  steps: string[];
  alertType: 'warning' | 'tip';
  alertText: string;
  sourceType: 'official' | 'community';
  sourceText: string;
  details: {
    explanation: string;
    bulletPoints: string[];
  };
}

const PROCEDURES: ProcedureCard[] = [
  {
    id: 'tofes101',
    category: 'impuestos',
    icon: Percent,
    title: 'Tofes 101: paga menos impuesto',
    subtitle: 'Al entrar a un trabajo y cada enero',
    steps: [
      'Marca que eres olé jadash (עולה חדש)',
      'Escribe tu fecha de llegada',
      'Adjunta tu Teudat Olé'
    ],
    alertType: 'warning',
    alertText: 'Si no lo marcas, te descuentan impuesto de más.',
    sourceType: 'official',
    sourceText: 'Fuente: Autoridad Tributaria · art. 35 de la Ordenanza (gov.il) · revisado nov 2026',
    details: {
      explanation: 'Como olé tienes puntos de crédito: cada punto es un descuento directo en el impuesto de tu sueldo. Si hiciste la Aliá desde 2022, son 54 meses:',
      bulletPoints: [
        '• Meses 1 a 12: 1 punto por mes.',
        '• Meses 13 a 30: 3 puntos por mes.',
        '• Meses 31 a 42: 2 puntos por mes.',
        '• Meses 43 a 54: 1 punto por mes.',
        'Si hiciste la Aliá antes de 2022, el esquema era de 42 meses.',
        'Además, quienes hicieron la Aliá entre el 5-nov-2025 y el 31-dic-2026 tienen una exención temporal en 2026.'
      ]
    }
  },
  {
    id: 'ulpan',
    category: 'hebreo',
    icon: GraduationCap,
    title: 'Voucher para Ulpán privado',
    subtitle: 'Cuando terminaste el Ulpán inicial',
    steps: [
      'Termina el Ulpán inicial del Estado',
      'Pide el voucher en tu área personal o en el Ministerio de Aliá',
      'Estudia en un Ulpán privado de la lista oficial'
    ],
    alertType: 'warning',
    alertText: 'La carta de aprobación vale 3 meses: inscríbete antes de que venza.',
    sourceType: 'official',
    sourceText: 'Fuente: Ministerio de Aliá · Ulpanim privados (gov.il) · revisado nov 2026',
    details: {
      explanation: 'El Ministerio de Aliá te ayuda a pagar un Ulpán privado en grupos chicos (hasta 12 alumnos) y con horarios flexibles.',
      bulletPoints: [
        'Para quienes tenían 17 años o más al hacer la Aliá.',
        'Hasta 10 años desde la Aliá (15 para olim de Etiopía, Yemen y Bnei Menashe).',
        'El curso es de 150 a 200 horas, en hasta 8 meses.',
        'Los mayores de 60 no rinden examen final.',
        'El reintegro se pide hasta medio año después de terminar el curso.'
      ]
    }
  },
  {
    id: 'arnona',
    category: 'vivienda',
    icon: Home,
    title: 'Descuento de Arnoná: 90%',
    subtitle: 'Sobre 100 m², 12 meses dentro de tus primeros 24',
    steps: [
      'Pídelo en tu municipio (Iriyá)',
      'Lleva tu Teudat Olé',
      'Elige cuándo empezar: 12 meses seguidos'
    ],
    alertType: 'warning',
    alertText: 'Los 12 meses tienen que caer dentro de tus primeros 24 meses.',
    sourceType: 'official',
    sourceText: 'Fuente: Reglamento de descuentos de Arnoná 1993, art. 2(a)(6) · municipios · revisado nov 2026',
    details: {
      explanation: 'Los olim tienen 90% de descuento en el impuesto municipal (Arnoná).',
      bulletPoints: [
        'Se aplica sobre los primeros 100 m² de la vivienda.',
        'Dura 12 meses, dentro de los primeros 24 desde tu Aliá.',
        'Cada municipio te dice qué documentos llevar.'
      ]
    }
  },
  {
    id: 'govisit',
    category: 'turnos',
    icon: Calendar,
    title: 'Turnos en GoVisit',
    subtitle: 'Teudat Zehut, pasaporte, licencia',
    steps: [
      'Entra a govisit.gov.il',
      'Elige: Autoridad de Población o Ministerio de Transporte',
      'Elige oficina, día y hora'
    ],
    alertType: 'tip',
    alertText: 'Es el sistema oficial del gobierno: no pagues por turnos en otros sitios.',
    sourceType: 'official',
    sourceText: 'Fuente: Autoridad de Población e Inmigración (gov.il) · revisado nov 2026',
    details: {
      explanation: 'GoVisit es el sistema oficial para sacar turno en oficinas del gobierno.',
      bulletPoints: [
        'Sirve para la Autoridad de Población (Teudat Zehut, pasaporte) y para licencias de conducir.',
        'En algunas oficinas hay puestos digitales de autoservicio para pedir la Teudat Zehut biométrica.'
      ]
    }
  }
];

export const BureaucracyGuide: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const filterTabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'impuestos', label: 'Impuestos' },
    { id: 'hebreo', label: 'Hebreo' },
    { id: 'vivienda', label: 'Vivienda' },
    { id: 'turnos', label: 'Turnos' },
  ];

  const filteredProcedures = activeFilter === 'todos' 
    ? PROCEDURES 
    : PROCEDURES.filter(p => p.category === activeFilter);

  const toggleDetails = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Chips de Filtro (Todos, Impuestos, Hebreo, Vivienda, Turnos) */}
      <div className="flex flex-wrap items-center gap-2">
        {filterTabs.map(tab => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`min-h-[44px] px-4 sm:px-6 py-2.5 rounded-full font-bold text-sm sm:text-[15px] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0E2559] text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-black/10'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Grilla de 2 columnas en notebook (1 en celular) con las 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProcedures.map(card => {
          const Icon = card.icon;
          const isExpanded = !!expandedCards[card.id];

          return (
            <div 
              key={card.id}
              className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between transition-shadow hover:shadow-xs"
            >
              <div>
                {/* Encabezado: Ícono púrpura de grupo + Título + Línea gris de cuándo */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#6B4FA0] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-slate-600 mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* 3 Pasos Numerados */}
                <div className="mt-5 space-y-3">
                  {card.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-[15px] sm:text-base text-slate-800 font-medium">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Alerta / Tip Box */}
                <div className="mt-5">
                  {card.alertType === 'warning' ? (
                    <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 text-amber-900 text-sm font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{card.alertText}</span>
                    </div>
                  ) : (
                    <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 text-amber-900 text-sm font-semibold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{card.alertText}</span>
                    </div>
                  )}
                </div>

                {/* Detalle largo desplegable */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-black/5 text-[14px] sm:text-[15px] text-slate-700 space-y-2.5 bg-slate-50/80 p-4 rounded-2xl">
                    <p className="leading-relaxed font-medium text-slate-800">
                      {card.details.explanation}
                    </p>
                    <ul className="space-y-1.5 text-slate-600 text-[13.5px]">
                      {card.details.bulletPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Pie de tarjeta: SourceBadge o Tip comunitario + Botón "Ver detalle" */}
              <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[13px] text-slate-600 font-medium flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  {card.sourceType === 'official' ? (
                    <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{card.sourceText}</span>
                </div>

                <button
                  onClick={() => toggleDetails(card.id)}
                  className="min-h-[44px] text-[#6B4FA0] font-bold hover:underline flex items-center gap-1 focus:outline-none cursor-pointer"
                >
                  <span>{isExpanded ? 'Menos detalle' : 'Ver detalle'}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Franja verde al pie: "¿Quieres que alguien te acompañe? OLEI tiene voluntarios que hablan español." */}
      <div className="bg-[#E7F6EE] border border-[#2A7050]/20 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2A7050]/15 text-[#2A7050] flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <p className="text-[15px] sm:text-base font-semibold text-[#0E2559] leading-snug">
            ¿Quieres que alguien te acompañe? OLEI tiene voluntarios que hablan español.
          </p>
        </div>

        <a
          href="https://olei.org.il"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-6 py-2.5 bg-[#2A7050] hover:bg-[#235e43] text-white font-bold rounded-xl whitespace-nowrap transition shadow-2xs flex items-center justify-center gap-2 text-sm sm:text-[15px] shrink-0"
        >
          <span>Contactar OLEI</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};

export default BureaucracyGuide;
