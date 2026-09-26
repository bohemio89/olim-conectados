import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Building2, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export interface ChecklistItem {
  id: string;
  stepNumber: number;
  stage: 'Día 1 a 3 (Llegada)' | 'Semana 1 a 2' | 'Mes 1' | 'Mes 2 a 6' | 'Primer Año';
  title: string;
  description: string;
  agency: string;
  timeframe: string;
  warningAlert?: string;
  actionHint?: string;
  linkText?: string;
  actionTabId?: string;
}

const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    stage: 'Día 1 a 3 (Llegada)',
    title: 'Recibir Teudat Olé & Primera cuota de Sal Klitá',
    description: 'En el aeropuerto Ben Gurión te entregan la Teudat Olé provisoria y el primer pago en efectivo/cheque de tu canasta de absorción.',
    agency: 'Misrad HaAliyah (Aeropuerto)',
    timeframe: 'Día de llegada',
    warningAlert: 'Guardá muy bien el sobre con los certificados originales y la Teudat Olé.',
    actionHint: 'Asegurate de que tus nombres estén escritos igual que en tu pasaporte.'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    stage: 'Día 1 a 3 (Llegada)',
    title: 'Abrir Cuenta Bancaria Israelí',
    description: 'Concurrir a una sucursal bancaria (Hapoalim, Leumi, Discount, Mizrahi) con la Teudat Olé para abrir la cuenta y obtener la constancia bancaria (Ishur Nihul Kheshbón).',
    agency: 'Banco Comercial',
    timeframe: 'Primeras 48-72 horas',
    warningAlert: 'No podés recibir las cuotas restantes del Sal Klitá ni el sueldo sin cuenta bancaria activa.',
    actionHint: 'Pedí tarjeta de débito local y clave de home banking en el acto.'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    stage: 'Semana 1 a 2',
    title: 'Inscripción en Kupat Jolim (Obra Social)',
    description: 'Completar la afiliación a la Kupá elegida (Clalit, Maccabi, Meuhedet o Leumit) en el Correo (Doar Israel) o la oficina de la Kupá, vinculando la cuenta para el pago de seguro complementario.',
    agency: 'Doar Israel / Kupat Jolim',
    timeframe: 'Días 3 a 10',
    warningAlert: '¡Clave!: Tenés cobertura básica sin costo de membresía los primeros meses por tu Sal Klitá.',
    actionTabId: 'doctors',
    linkText: 'Buscar médicos que hablan español'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    stage: 'Semana 1 a 2',
    title: 'Cita en Misrad HaAliyah para Sal Klitá en cuenta',
    description: 'Entregar la constancia bancaria (Ishur Nihul Kheshbón) a tu proyectista de absorción para que comiencen a transferir las 5 cuotas restantes del Sal Klitá.',
    agency: 'Misrad HaAliyah',
    timeframe: 'Semana 1 o 2',
    actionHint: 'Las sedes centrales suelen contar con atención en español.'
  },
  {
    id: 'step-5',
    stepNumber: 5,
    stage: 'Mes 1',
    title: 'Tramitar Teudat Zehut Biométrica (MyVisit)',
    description: 'Solicitar turno en la app o sitio MyVisit para Misrad HaPnim (Autoridad de Población) para tramitar tu DNI biométrico permanente.',
    agency: 'Misrad HaPnim (Rashut HaOjlusin)',
    timeframe: 'Mes 1',
    warningAlert: 'Buscá turnos temprano por la mañana (7:00 a 8:30 AM) para capturar cancelaciones del día.',
    actionTabId: 'bureaucracy',
    linkText: 'Ver guía de MyVisit'
  },
  {
    id: 'step-6',
    stepNumber: 6,
    stage: 'Mes 1',
    title: 'Inscripción al Ulpán de Hebreo',
    description: 'Elegir entre Ulpán presencial subvencionado o solicitar el Voucher de Misrad HaAliyah (~5.200 NIS) para cursar en academia privada autorizada.',
    agency: 'Misrad HaAliyah / Ulpan',
    timeframe: 'Primeros 30-45 días',
    warningAlert: 'El voucher exige mínimo 80% de asistencia y aprobar el examen final para el reintegro.',
    actionTabId: 'bureaucracy',
    linkText: 'Ver requisitos del voucher de Ulpán'
  },
  {
    id: 'step-7',
    stepNumber: 7,
    stage: 'Mes 2 a 6',
    title: 'Completar Tofes 101 al comenzar a trabajar',
    description: 'Completar el formulario impositivo obligatorio de tu empleador marcando explícitamente la casilla de Olé Jadash para obtener los puntos de crédito (Nekudot Zijui).',
    agency: 'Empleador / Rashut HaMisim',
    timeframe: 'Al iniciar empleo',
    warningAlert: 'Si no lo marcas, te retendrán retenciones innecesarias de Ganancias (Mas Hajnasá).',
    actionTabId: 'bureaucracy',
    linkText: 'Ver cómo completar Tofes 101'
  },
  {
    id: 'step-8',
    stepNumber: 8,
    stage: 'Mes 2 a 6',
    title: 'Solicitar Descuento de Arnoná en la Municipalidad (Iriyá)',
    description: 'Presentar el contrato de alquiler y la Teudat Olé en la municipalidad local para acceder a una bonificación de hasta 70%-90% en la tasa municipal durante 12 meses.',
    agency: 'Municipalidad local (Iriyá)',
    timeframe: 'Al firmar contrato de vivienda',
    warningAlert: 'El derecho dura 12 meses pero debe solicitarse formalmente; no es automático.',
    actionTabId: 'bureaucracy'
  },
  {
    id: 'step-9',
    stepNumber: 9,
    stage: 'Primer Año',
    title: 'Canjear Licencia de Conducir Extranjera',
    description: 'Completar el Tofes Yarok online, realizar el test de agudeza visual en óptica y sacar turno en Misrad HaRishuí para canjear tu carné sin examen si tenés +5 años de antigüedad.',
    agency: 'Misrad HaRishuí',
    timeframe: 'Antes de cumplir 12 meses en Israel',
    warningAlert: 'Solo podés manejar legalmente con la licencia extranjera durante los primeros 12 meses de aliá.',
    actionTabId: 'license',
    linkText: 'Ver Asistente de Licencia'
  },
  {
    id: 'step-10',
    stepNumber: 10,
    stage: 'Primer Año',
    title: 'Verificar cobro de Ayuda de Alquiler (Mes 7 al 30)',
    description: 'Al agotarse los 6 meses de Sal Klitá, se activa automáticamente el subsidio de alquiler de Misrad HaAliyah / Misrad HaBinui hasta el mes 30.',
    agency: 'Misrad HaBinui / Misrad HaAliyah',
    timeframe: 'Mes 7 de aliá',
    warningAlert: 'Tené en cuenta que finaliza exactamente en el mes 30 (24 meses totales de ayuda).',
    actionTabId: 'crisis-civil',
    linkText: 'Ver detalles de Siyua biSjirot'
  }
];

interface OlehChecklistProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const OlehChecklist: React.FC<OlehChecklistProps> = ({ onNavigateToTab }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('olim_checklist_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedStage, setSelectedStage] = useState<string>('Todas');

  const stages = [
    'Todas',
    'Día 1 a 3 (Llegada)',
    'Semana 1 a 2',
    'Mes 1',
    'Mes 2 a 6',
    'Primer Año'
  ];

  const handleToggle = (id: string) => {
    setCompletedSteps((prev) => {
      const updated = {
        ...prev,
        [id]: !prev[id]
      };
      try {
        localStorage.setItem('olim_checklist_completed', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleResetChecklist = () => {
    if (window.confirm('¿Deseas reiniciar tu progreso en la lista de trámites?')) {
      setCompletedSteps({});
      try {
        localStorage.removeItem('olim_checklist_completed');
      } catch {}
    }
  };

  const totalSteps = DEFAULT_CHECKLIST_ITEMS.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const filteredItems = DEFAULT_CHECKLIST_ITEMS.filter((item) => {
    return selectedStage === 'Todas' || item.stage === selectedStage;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner with Real-time Progress Bar */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>Ruta Oficial de Integración y Burocracia</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mi Checklist de Oleh Jadash
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Los trámites en Israel son secuenciales: completar uno te desbloquea el siguiente. Marcá cada paso completado para llevar tu registro personal ordenado y evitar errores que retrasan tus derechos.
          </p>

          {/* Progress Tracker Card */}
          <div className="mt-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Progreso General de Trámites:
              </span>
              <span className="text-amber-300 text-base">
                {completedCount} de {totalSteps} completados ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
              <div 
                className="bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-blue-200 pt-1">
              <span>Guardado automáticamente en tu dispositivo</span>
              {completedCount > 0 && (
                <button
                  onClick={handleResetChecklist}
                  className="hover:text-white flex items-center gap-1 underline transition"
                >
                  <RotateCcw className="w-3 h-3" /> Reiniciar checklist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stage Filter Buttons */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 scrollbar-none">
          {stages.map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                selectedStage === stg
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-gray-400 hidden md:inline shrink-0">
          Mostrando {filteredItems.length} trámites
        </span>
      </div>

      {/* Step Items List */}
      <div className="space-y-3.5">
        {filteredItems.map((item) => {
          const isDone = !!completedSteps[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`rounded-2xl border p-4 sm:p-5 transition cursor-pointer select-none ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Checkbox Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(item.id);
                  }}
                  className="mt-0.5 shrink-0 focus:outline-none"
                  aria-label={isDone ? 'Marcar como incompleto' : 'Marcar como completado'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 hover:text-blue-500" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        Paso {item.stepNumber} · {item.stage}
                      </span>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {item.agency}
                      </span>
                    </div>

                    <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.timeframe}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold transition ${
                    isDone ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${
                    isDone ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>

                  {/* Warning alert if applicable */}
                  {item.warningAlert && (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item.warningAlert}</span>
                    </div>
                  )}

                  {/* Action hint / Tab link */}
                  {item.actionTabId && onNavigateToTab && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToTab(item.actionTabId!);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <span>{item.linkText || 'Ver guía detallada en el sitio'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
