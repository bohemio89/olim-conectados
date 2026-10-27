import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Check, 
  Clock, 
  Plane, 
  Flag, 
  AlertTriangle, 
  RotateCw, 
  ShieldCheck, 
  FileText, 
  Eye, 
  Calendar, 
  CreditCard, 
  BookOpen, 
  FileCheck2, 
  MapPin, 
  ExternalLink, 
  FolderCheck, 
  MessageCircle,
  Home,
  ChevronRight
} from 'lucide-react';

const LINKS = {
  tofesYarok: '', // vacío por ahora, se completará cuando tengamos el link final
  myVisit: 'https://govisit.gov.il',
  oficinas: ''
};

type VehicleType = 'auto' | 'moto' | 'camion';
type ValidityType = 'si' | 'no';
type ExperienceType = '5_o_mas' | 'menos_5';
type AliyahTimeType = 'menos_5' | '5_o_mas';

interface StepItem {
  id: string;
  title: string;
  desc: string;
  where: string;
  link?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DriverLicenseWizard: React.FC = () => {
  // Estado del Wizard
  const [vehicle, setVehicle] = useState<VehicleType>('auto');
  const [isValid, setIsValid] = useState<ValidityType>('si');
  const [yearsExperience, setYearsExperience] = useState<ExperienceType>('5_o_mas');
  const [aliaYears, setAliaYears] = useState<AliyahTimeType>('menos_5');

  // Pasos reutilizables
  const stepA: StepItem = {
    id: 'A',
    title: 'Formulario de salud',
    desc: 'Completa el Tofes Yarok online.',
    where: 'gov.il · Tofes Yarok',
    link: LINKS.tofesYarok,
    icon: FileText
  };

  const stepB: StepItem = {
    id: 'B',
    title: 'Vista y foto',
    desc: 'Examen de la vista y foto para la licencia.',
    where: 'Óptica autorizada con estación de fotos',
    icon: Eye
  };

  const stepC: StepItem = {
    id: 'C',
    title: 'Turno en la oficina',
    desc: 'Vas en persona con los papeles.',
    where: 'MyVisit · Ministerio de Transporte',
    link: LINKS.myVisit,
    icon: Calendar
  };

  const stepD: StepItem = {
    id: 'D',
    title: 'Pagas y la recibes',
    desc: 'Te dan una licencia temporal. La de plástico llega por correo.',
    where: 'Online o en el correo',
    icon: CreditCard
  };

  const stepP: StepItem = {
    id: 'P',
    title: 'Examen práctico',
    desc: 'Lo coordinas con el instructor, que pone el auto.',
    where: 'Un instructor de manejo habilitado',
    icon: Car
  };

  const stepR: StepItem = {
    id: 'R',
    title: 'Renuévala',
    desc: 'Haz la renovación en tu país, antes del canje.',
    where: 'Quien emitió tu licencia, en tu país',
    icon: RotateCw
  };

  const stepCCurso: StepItem = {
    id: 'C_curso',
    title: 'Curso y teórico',
    desc: 'Haces el curso del vehículo que quieres manejar.',
    where: 'Escuela de manejo autorizada',
    icon: BookOpen
  };

  const stepPCurso: StepItem = {
    id: 'P_curso',
    title: 'Examen práctico',
    desc: 'Rindes el examen con la escuela.',
    where: 'Un instructor de manejo habilitado',
    icon: Car
  };

  const stepCTeorico: StepItem = {
    id: 'C_teorico',
    title: 'Examen teórico',
    desc: 'Estudias y rindes el teórico oficial.',
    where: 'Centro de exámenes teóricos',
    icon: FileCheck2
  };

  const stepPClases: StepItem = {
    id: 'P_clases',
    title: 'Clases y práctico',
    desc: 'Mínimo de clases prácticas con instructor y examen.',
    where: 'Escuela e instructor habilitado',
    icon: Car
  };

  // Función para abrir el asistente de Olim Conectados
  const handleAskAssistant = () => {
    const assistantBtn = document.querySelector('button[aria-label="Abrir asistente de Olim Conectados"]') as HTMLButtonElement | null;
    if (assistantBtn) {
      assistantBtn.click();
    } else {
      window.history.pushState({ tabId: 'assistant' }, '', '/asistente');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // EVALUACIÓN DE CASOS EN ORDEN ESTRICTO:
  let resultCase: {
    color: 'green' | 'orange' | 'red';
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    badge: string;
    steps: StepItem[];
    showDocs: boolean;
    alertText: string;
    showAssistantBtn?: boolean;
  };

  if (vehicle === 'camion') {
    // Caso a: Camión, colectivo o taxi
    resultCase = {
      color: 'orange',
      icon: Truck,
      title: 'Siempre con curso y exámenes',
      subtitle: 'Para vehículos comerciales y transporte público.',
      badge: 'Curso + exámenes',
      steps: [stepA, stepB, stepCCurso, stepPCurso],
      showDocs: false,
      alertText: 'Colectivo y taxi: desde los 21 años. El taxi pide además 2 años de licencia.'
    };
  } else if (aliaYears === '5_o_mas') {
    // Caso b: Pasaron 5 años desde la Aliá
    resultCase = {
      color: 'red',
      icon: AlertTriangle,
      title: 'Ya no se puede canjear',
      subtitle: 'Pasaron 5 años desde tu Aliá: sacas la licencia israelí desde cero.',
      badge: 'Proceso completo',
      steps: [stepA, stepB, stepCTeorico, stepPClases],
      showDocs: false,
      alertText: 'Aunque tu licencia extranjera esté vigente, ya no te sirve para manejar en Israel.'
    };
  } else if (isValid === 'no') {
    // Caso c: Licencia vencida
    resultCase = {
      color: 'red',
      icon: RotateCw,
      title: 'Primero, renueva tu licencia',
      subtitle: 'El canje solo se hace con una licencia vigente.',
      badge: 'Licencia vencida',
      steps: [stepR, stepA, stepB, stepC, stepD],
      showDocs: true,
      alertText: '¿No puedes renovarla? Tienes que sacar la licencia israelí desde cero: clases, examen teórico y práctico.',
      showAssistantBtn: true
    };
  } else if (yearsExperience === 'menos_5') {
    // Caso d: Menos de 5 años con licencia
    resultCase = {
      color: 'orange',
      icon: vehicle === 'moto' ? Bike : Car,
      title: 'Canje con examen práctico',
      subtitle: `Tenías la licencia menos de 5 años al llegar.${vehicle === 'moto' ? ' Vale igual para moto.' : ''}`,
      badge: 'Con examen práctico',
      steps: [stepA, stepB, stepC, stepP, stepD],
      showDocs: true,
      alertText: 'Si no lo apruebas 2 veces, también rindes el examen teórico.'
    };
  } else {
    // Caso e: Default (Auto o Moto, vigente, 5+ años experiencia, menos de 5 años Aliá)
    resultCase = {
      color: 'green',
      icon: CheckCircle2,
      title: 'Canje sin examen',
      subtitle: `Licencia vigente y con 5 años o más al llegar.${vehicle === 'moto' ? ' Vale igual para moto.' : ''}`,
      badge: 'Sin examen',
      steps: [stepA, stepB, stepC, stepD],
      showDocs: true,
      alertText: ''
    };
  }

  // Tokens de estilo según color del caso
  const colorStyles = {
    green: {
      cardBorder: 'border-[#2A7050]',
      iconBg: 'bg-[#2A7050]',
      badgeBg: 'bg-[#2A7050]',
      circleBorder: 'border-[#2A7050]',
      circleText: 'text-[#2A7050]',
      connectorLine: 'bg-[#2A7050]'
    },
    orange: {
      cardBorder: 'border-[#E8A33D]',
      iconBg: 'bg-[#E8A33D]',
      badgeBg: 'bg-[#E8A33D]',
      circleBorder: 'border-[#E8A33D]',
      circleText: 'text-[#E8A33D]',
      connectorLine: 'bg-[#E8A33D]'
    },
    red: {
      cardBorder: 'border-[#C0392B]',
      iconBg: 'bg-[#C0392B]',
      badgeBg: 'bg-[#C0392B]',
      circleBorder: 'border-[#C0392B]',
      circleText: 'text-[#C0392B]',
      connectorLine: 'bg-[#C0392B]'
    }
  }[resultCase.color];

  const ResultIcon = resultCase.icon;
  const isCamion = vehicle === 'camion';

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb de navegación */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
        <Home className="w-4 h-4 shrink-0 text-slate-400" />
        <span>Inicio</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Derechos &amp; Trámites</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="font-bold text-[#0E2559]">Licencia de Conducir</span>
      </nav>

      {/* Encabezado de la Sección */}
      <div className="bg-[#FAF7F2] border border-[#EFE8DF] rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-2xs">
        <div className="w-12 h-12 rounded-2xl bg-[#6B4FA0] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Car className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0E2559] tracking-tight">Licencia de Conducir</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Responde 4 preguntas y mira tu camino al carné israelí.</p>
        </div>
      </div>

      {/* 2. TARJETA: Tus dos fechas clave (infografía) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
        <h2 className="text-xl font-black text-[#0E2559] tracking-tight">Tus dos fechas clave</h2>

        {/* Versión Desktop: Línea de tiempo horizontal */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 relative">
          
          {/* Nodo 1: Aliá */}
          <div className="flex flex-col items-center text-center relative z-10 w-44">
            <div className="w-14 h-14 rounded-full bg-[#0E2559] text-white flex items-center justify-center shadow-xs">
              <Plane className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-[#0E2559] mt-3">Aliá</span>
            <span className="text-xs text-slate-500 mt-0.5">Empieza a contar</span>
          </div>

          {/* Tramo 1: Verde sólido */}
          <div className="flex-1 h-1.5 bg-[#2A7050] mx-2 -mt-10 rounded-full" />

          {/* Nodo 2: 1 año */}
          <div className="flex flex-col items-center text-center relative z-10 w-48">
            <div className="w-14 h-14 rounded-full bg-[#2A7050] text-white flex items-center justify-center shadow-xs">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-[#0E2559] mt-3">1 año</span>
            <span className="text-xs text-slate-500 mt-0.5 max-w-[150px]">Manejas con tu licencia extranjera</span>
          </div>

          {/* Tramo 2: Naranja punteado */}
          <div className="flex-1 border-t-4 border-dashed border-[#E8A33D] mx-2 -mt-10" />

          {/* Nodo 3: 5 años */}
          <div className="flex flex-col items-center text-center relative z-10 w-48">
            <div className="w-14 h-14 rounded-full bg-[#E8A33D] text-white flex items-center justify-center shadow-xs">
              <Flag className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-[#0E2559] mt-3">5 años</span>
            <span className="text-xs text-slate-500 mt-0.5 max-w-[150px]">Último plazo para canjearla</span>
          </div>
        </div>

        {/* Versión Mobile: Línea de tiempo vertical */}
        <div className="md:hidden space-y-6 pl-2 relative">
          
          {/* Línea conectora vertical de fondo */}
          <div className="absolute left-[29px] top-6 bottom-8 w-1 bg-gradient-to-b from-[#2A7050] via-[#2A7050] to-[#E8A33D]" />

          {/* Nodo 1: Aliá */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#0E2559] text-white flex items-center justify-center shadow-xs shrink-0 ring-4 ring-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-[#0E2559] block">Aliá</span>
              <span className="text-xs text-slate-500">Empieza a contar</span>
            </div>
          </div>

          {/* Nodo 2: 1 año */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#2A7050] text-white flex items-center justify-center shadow-xs shrink-0 ring-4 ring-white">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-[#0E2559] block">1 año</span>
              <span className="text-xs text-slate-500">Manejas con tu licencia extranjera</span>
            </div>
          </div>

          {/* Nodo 3: 5 años */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#E8A33D] text-white flex items-center justify-center shadow-xs shrink-0 ring-4 ring-white">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-[#0E2559] block">5 años</span>
              <span className="text-xs text-slate-500">Último plazo para canjearla</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. TARJETA: Tu situación (4 preguntas con botones grandes) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
        <h2 className="text-xl font-black text-[#0E2559] tracking-tight">Tu situación</h2>

        {/* Grilla de 4 columnas en desktop, vertical en celular */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          
          {/* Pregunta 1: ¿Qué vas a manejar? */}
          <div className="space-y-2.5">
            <label className="block text-sm font-bold text-[#0E2559]">
              1. ¿Qué vas a manejar?
            </label>
            
            {/* Desktop: botones apilados verticalmente; Mobile: 3 botones en fila compacta */}
            <div className="hidden md:flex flex-col gap-2">
              {[
                { id: 'auto' as VehicleType, label: 'Auto', icon: Car },
                { id: 'moto' as VehicleType, label: 'Moto', icon: Bike },
                { id: 'camion' as VehicleType, label: 'Camión, colectivo o taxi', icon: Truck },
              ].map(({ id, label, icon: IconComp }) => {
                const isSelected = vehicle === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setVehicle(id)}
                    className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-3 transition cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                        : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#0E2559]'}`} />
                    <span className="text-left leading-snug">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile (3 columnas con ícono arriba y texto) */}
            <div className="grid grid-cols-3 gap-2 md:hidden">
              {[
                { id: 'auto' as VehicleType, label: 'Auto', icon: Car },
                { id: 'moto' as VehicleType, label: 'Moto', icon: Bike },
                { id: 'camion' as VehicleType, label: 'Camión, colectivo o taxi', icon: Truck },
              ].map(({ id, label, icon: IconComp }) => {
                const isSelected = vehicle === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setVehicle(id)}
                    className={`min-h-[64px] px-2 py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer border text-center ${
                      isSelected
                        ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                        : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#0E2559]'}`} />
                    <span className="leading-tight line-clamp-2">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pregunta 2: ¿Tu licencia está vigente? */}
          <div className={`space-y-2.5 transition-opacity duration-200 ${isCamion ? 'opacity-40 pointer-events-none' : ''}`}>
            <label className="block text-sm font-bold text-[#0E2559]">
              2. ¿Tu licencia está vigente?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <button
                type="button"
                aria-pressed={isValid === 'si'}
                onClick={() => setIsValid('si')}
                disabled={isCamion}
                className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2.5 transition cursor-pointer border ${
                  isValid === 'si'
                    ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                    : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${isValid === 'si' ? 'text-white' : 'text-slate-500'}`} />
                <span>Sí, vigente</span>
              </button>

              <button
                type="button"
                aria-pressed={isValid === 'no'}
                onClick={() => setIsValid('no')}
                disabled={isCamion}
                className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2.5 transition cursor-pointer border ${
                  isValid === 'no'
                    ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                    : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <XCircle className={`w-4 h-4 shrink-0 ${isValid === 'no' ? 'text-white' : 'text-slate-500'}`} />
                <span>No, está vencida</span>
              </button>
            </div>
          </div>

          {/* Pregunta 3: ¿Años con licencia al llegar? */}
          <div className={`space-y-2.5 transition-opacity duration-200 ${isCamion ? 'opacity-40 pointer-events-none' : ''}`}>
            <label className="block text-sm font-bold text-[#0E2559]">
              3. ¿Años con licencia al llegar?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <button
                type="button"
                aria-pressed={yearsExperience === '5_o_mas'}
                onClick={() => setYearsExperience('5_o_mas')}
                disabled={isCamion}
                className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2.5 transition cursor-pointer border ${
                  yearsExperience === '5_o_mas'
                    ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                    : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <Check className={`w-4 h-4 shrink-0 ${yearsExperience === '5_o_mas' ? 'text-white' : 'text-slate-500'}`} />
                <span>5 años o más</span>
              </button>

              <button
                type="button"
                aria-pressed={yearsExperience === 'menos_5'}
                onClick={() => setYearsExperience('menos_5')}
                disabled={isCamion}
                className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2.5 transition cursor-pointer border ${
                  yearsExperience === 'menos_5'
                    ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                    : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <Clock className={`w-4 h-4 shrink-0 ${yearsExperience === 'menos_5' ? 'text-white' : 'text-slate-500'}`} />
                <span>Menos de 5</span>
              </button>
            </div>
          </div>

          {/* Pregunta 4: ¿Cuándo hiciste la Aliá? */}
          <div className={`space-y-2.5 transition-opacity duration-200 ${isCamion ? 'opacity-40 pointer-events-none' : ''}`}>
            <label className="block text-sm font-bold text-[#0E2559]">
              4. ¿Cuándo hiciste la Aliá?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <button
                type="button"
                aria-pressed={aliaYears === 'menos_5'}
                onClick={() => setAliaYears('menos_5')}
                disabled={isCamion}
                className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2.5 transition cursor-pointer border ${
                  aliaYears === 'menos_5'
                    ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                    : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <Plane className={`w-4 h-4 shrink-0 ${aliaYears === 'menos_5' ? 'text-white' : 'text-slate-500'}`} />
                <span className="text-center md:text-left">Hace menos de 5 años</span>
              </button>

              <button
                type="button"
                aria-pressed={aliaYears === '5_o_mas'}
                onClick={() => setAliaYears('5_o_mas')}
                disabled={isCamion}
                className={`min-h-[46px] w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center md:justify-start gap-2.5 transition cursor-pointer border ${
                  aliaYears === '5_o_mas'
                    ? 'bg-[#0E2559] text-white border-[#0E2559] shadow-xs'
                    : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <Flag className={`w-4 h-4 shrink-0 ${aliaYears === '5_o_mas' ? 'text-white' : 'text-slate-500'}`} />
                <span className="text-center md:text-left">Hace 5 años o más</span>
              </button>
            </div>
          </div>

        </div>

        {/* Línea aclaratoria debajo de las preguntas */}
        <p className="text-xs sm:text-sm text-slate-500 font-medium pt-1">
          La licencia tiene que ser de antes de tu Aliá.
        </p>
      </div>

      {/* 4. RESULTADOS (Roadmap visual con DÓNDE y accesibilidad) */}
      <section 
        aria-live="polite"
        className={`bg-white rounded-3xl border-2 ${colorStyles.cardBorder} p-6 sm:p-7 shadow-xs space-y-6 transition-all duration-300`}
      >
        
        {/* Encabezado del Resultado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl ${colorStyles.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
              <ResultIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0E2559] tracking-tight">{resultCase.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{resultCase.subtitle}</p>
            </div>
          </div>
          <div className="self-start sm:self-center">
            <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold text-white ${colorStyles.badgeBg} shadow-2xs`}>
              {resultCase.badge}
            </span>
          </div>
        </div>

        {/* Roadmap: Versión Desktop (Horizontal) */}
        <div className="hidden md:block relative pt-4 pb-2">
          {/* Línea conectora horizontal de fondo */}
          <div className="absolute top-[38px] left-12 right-12 h-1 bg-[#EADDCB] -z-0" />

          <div className="grid gap-3 relative z-10" style={{ gridTemplateColumns: `repeat(${resultCase.steps.length}, minmax(0, 1fr))` }}>
            {resultCase.steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center px-1">
                  
                  {/* Círculo numerado con ícono */}
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full border-3 ${colorStyles.circleBorder} bg-white flex items-center justify-center shadow-xs`}>
                      <StepIcon className={`w-6 h-6 ${colorStyles.circleText}`} />
                    </div>
                    {/* Badge con número de paso */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0E2559] text-white text-[11px] font-black flex items-center justify-center shadow-2xs">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Título del paso */}
                  <h4 className="text-sm font-bold text-[#0E2559] mt-3">{step.title}</h4>

                  {/* Descripción corta de 1 línea */}
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1 leading-snug">
                    {step.desc}
                  </p>

                  {/* Chip DÓNDE */}
                  <div className="mt-3">
                    {step.link ? (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFF8] text-[#6B4FA0] border border-[#E4DCF0] hover:bg-[#EAE4F3] transition-colors shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>{step.where}</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFF8] text-[#6B4FA0] border border-[#E4DCF0] shadow-2xs">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{step.where}</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Roadmap: Versión Mobile (Vertical con línea conectora) */}
        <div className="md:hidden relative space-y-6 pl-2 py-2">
          {/* Línea conectora vertical */}
          <div className="absolute left-[31px] top-6 bottom-8 w-1 bg-[#EADDCB]" />

          {resultCase.steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="relative z-10 flex items-start gap-4">
                
                {/* Círculo numerado con ícono */}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full border-3 ${colorStyles.circleBorder} bg-white flex items-center justify-center shadow-xs ring-4 ring-white`}>
                    <StepIcon className={`w-5 h-5 ${colorStyles.circleText}`} />
                  </div>
                  {/* Badge con número de paso */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0E2559] text-white text-[10px] font-black flex items-center justify-center shadow-2xs">
                    {idx + 1}
                  </div>
                </div>

                {/* Contenido del paso a la derecha */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="text-base font-bold text-[#0E2559]">{step.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">{step.desc}</p>
                  
                  {/* Chip DÓNDE */}
                  <div className="mt-2">
                    {step.link ? (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFF8] text-[#6B4FA0] border border-[#E4DCF0] hover:bg-[#EAE4F3] transition-colors shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>{step.where}</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFF8] text-[#6B4FA0] border border-[#E4DCF0] shadow-2xs">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{step.where}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Franja de Documentos requeridos (Casos c, d y e) */}
        {resultCase.showDocs && (
          <div className="bg-[#FFF9EE] border border-amber-200/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-2 text-[#0E2559] font-bold text-sm shrink-0">
              <FolderCheck className="w-5 h-5 text-[#0E2559]" />
              <span>Lleva:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 border border-slate-200/90 shadow-2xs">
                Teudat Olé original
              </span>
              <span className="bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 border border-slate-200/90 shadow-2xs">
                Teudat Zehut
              </span>
              <span className="bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 border border-slate-200/90 shadow-2xs">
                Licencia extranjera original y vigente
              </span>
              <span className="bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 border border-slate-200/90 shadow-2xs">
                Traducción notarial, si no está en inglés
              </span>
            </div>
          </div>
        )}

        {/* Alerta de advertencia del caso */}
        {resultCase.alertText && (
          <div 
            className={`rounded-2xl p-4 flex items-start sm:items-center gap-3 text-sm font-semibold ${
              resultCase.color === 'red'
                ? 'bg-[#FDECEA] border border-red-200/90 text-red-950'
                : 'bg-[#FFF5DF] border border-amber-200/90 text-amber-950'
            }`}
          >
            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 sm:mt-0 ${
              resultCase.color === 'red' ? 'text-[#C0392B]' : 'text-[#E8A33D]'
            }`} />
            <span>{resultCase.alertText}</span>
          </div>
        )}

        {/* Bloque secundario en Caso c (Licencia vencida): Preguntar al asistente */}
        {resultCase.showAssistantBtn && (
          <div className="pt-2">
            <p className="text-sm font-bold text-[#0E2559] mb-2">¿Dudas con tu caso?</p>
            <button
              type="button"
              onClick={handleAskAssistant}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#0E2559] hover:bg-[#153477] text-white font-bold text-sm inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
              <span>Preguntar al asistente</span>
            </button>
          </div>
        )}

        {/* Pie del Resultado */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 pt-2 border-t border-slate-200/60">
          <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
          <span>Fuente: Ministerio de Transporte · Kol Zchut · revisado oct 2026</span>
        </div>

      </section>

    </div>
  );
};
