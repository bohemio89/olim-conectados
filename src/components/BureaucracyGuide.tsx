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
      'Marca "Ani Olé Jadash" (אני עולה חדש)',
      'Escribe tu fecha de llegada',
      'Adjunta Teudat Olé y Teudat Zehut'
    ],
    alertType: 'warning',
    alertText: 'Si no lo marcas, te retienen impuesto de más.',
    sourceType: 'official',
    sourceText: 'Fuente: Autoridad de Impuestos · gov.il · revisado oct 2026',
    details: {
      explanation: 'El Tofes 101 es el formulario de deducciones impositivas que presentas a tu empleador al ingresar a un empleo y al comienzo de cada año fiscal (enero).',
      bulletPoints: [
        'Puntos de crédito fiscal (Nekudot Zijui) por 42 meses desde tu Aliá:',
        '• 3 puntos en los meses 1 a 18.',
        '• 2 puntos en los meses 19 a 30.',
        '• 1 punto en los meses 31 a 42.',
        'Exención temporal 2026 para quienes hicieron la Aliá entre el 5-nov-2025 y el 31-dic-2026.',
        'Cada punto de crédito representa un descuento directo sobre el impuesto a las ganancias retenido en tu recibo de sueldo.'
      ]
    }
  },
  {
    id: 'ulpan',
    category: 'hebreo',
    icon: GraduationCap,
    title: 'Voucher para Ulpán privado',
    subtitle: 'Hasta 5.000 ₪ de reintegro',
    steps: [
      'Termina el Ulpán inicial',
      'Pide el certificado en tu área personal',
      'Asiste al 80% y rinde el examen'
    ],
    alertType: 'warning',
    alertText: 'Sin certificado previo no hay reintegro.',
    sourceType: 'official',
    sourceText: 'Fuente: Procedimiento 372 · Ministerio de Aliá · gov.il · revisado oct 2026',
    details: {
      explanation: 'El Ministerio de Aliá otorga un voucher de hasta 5.000 ₪ para cursar hebreo en instituciones privadas homologadas.',
      bulletPoints: [
        'Destinado a quien tenía 17 años o más al recibir el estatus de olé.',
        'Se solicita dentro de los 10 años desde la Aliá (15 años para olim de Etiopía, Yemen y Bnei Menashe).',
        'No hace falta terminar el Ulpán inicial si eres soldado, haces servicio nacional, eres estudiante o pasaron 2 años desde tu estatus.',
        'El certificado de elegibilidad tiene una validez de 3 meses para inscribirse.',
        'Pagas tú el curso y te devuelven el 50% al inscribirte y el 50% restante al terminar.',
        'Válido únicamente para niveles A y B (Álef y Bet).',
        'Los mayores de 60 años no rinden examen final para cobrar el reintegro.',
        'No se puede estudiar a la vez en el Ulpán estatal.'
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
      'Contrato de alquiler a tu nombre',
      'Teudat Zehut con la nueva dirección',
      'Pídelo en la Iriyá o en su web'
    ],
    alertType: 'warning',
    alertText: 'No es automático: tienes que pedirlo.',
    sourceType: 'official',
    sourceText: 'Fuente: Reglamento de descuentos de Arnoná · municipio · revisado oct 2026',
    details: {
      explanation: 'Beneficio fiscal municipal que concede una bonificación del 90% sobre el impuesto de Arnoná.',
      bulletPoints: [
        'Aplica sobre hasta 100 m² de la vivienda arrendada o propia.',
        'Válido por 12 meses continuos a utilizar dentro de los primeros 24 meses desde la fecha de recepción de tu estatus de Olé.',
        'Requisitos: contrato de alquiler firmado a tu nombre por al menos 12 meses y Teudat Zehut con anexo de dirección (séjaj) actualizado.',
        'El descuento no es automático: debes solicitarlo de forma presencial o a través del portal de tu municipalidad (Iriyá).'
      ]
    }
  },
  {
    id: 'myvisit',
    category: 'turnos',
    icon: Calendar,
    title: 'Turnos en MyVisit',
    subtitle: 'Teudat Zehut, pasaporte, licencia',
    steps: [
      'Descarga la app MyVisit',
      'Elige la oficina: Misrad HaPnim o HaRishuí',
      'Elige día y hora'
    ],
    alertType: 'tip',
    alertText: 'Temprano a la mañana suelen aparecer turnos cancelados.',
    sourceType: 'community',
    sourceText: 'Tip de la comunidad · sin fuente oficial',
    details: {
      explanation: 'MyVisit es la plataforma oficial centralizada para reservar citas previas en oficinas públicas de Israel.',
      bulletPoints: [
        'Gestiones habituales: Teudat Zehut biométrica y pasaporte en la Autoridad de Población (Misrad HaPnim); canje de licencia de conducir en la Oficina de Licencias (Misrad HaRishuí).',
        'Temprano a la mañana (entre 7:00 y 8:30 AM) suelen liberarse en el sistema turnos cancelados para el mismo día o la misma semana.',
        'Si no encuentras disponibilidad en tu ciudad, consulta sucursales en localidades cercanas.',
        'Lleva siempre el mensaje SMS de confirmación con el código de turno el día de tu cita.'
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
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filterTabs.map(tab => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`min-h-[44px] px-6 py-2.5 rounded-full font-bold text-sm sm:text-[15px] whitespace-nowrap transition-all cursor-pointer ${
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
