import { ASSISTANT_ENABLED } from '../config';
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
  ChevronRight,
  GraduationCap,
  Repeat,
  MonitorCheck,
  ClipboardCheck,
  BadgeCheck,
  Wallet,
  Languages,
  UserCheck,
  Moon,
  Timer,
  Smartphone,
  Camera,
  Users,
  Phone,
  ArrowRight
} from 'lucide-react';

// Fuentes: Kol Zchut (canje para olim, pedido de licencia, exámenes) y gov.il
// (tasas abril 2026, guía de acompañamiento, estudio sobre la licencia por etapas).
const LINKS = {
  pedidoLicencia: 'https://www.gov.il/he/service/apply_for_new_driver_drivers_license',
  finAcompanamiento: 'https://www.gov.il/he/service/new_driver_accompaniment_period_statement',
  myVisit: 'https://govisit.gov.il'
};

const OFICINAS = {
  todas: 'Holón · Haifa (Mifratz) · Tiberíades · Afula · Netanya · Hadera · Ashkelon · Ashdod · Jerusalén (Beit Kalal y Talpiot)',
  soloAuto: 'Rejovot · Petaj Tikva · Ramat Gan'
};

type TabType = 'cero' | 'canje';

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

// ───────────────────────── Pestaña "Desde cero" ─────────────────────────

interface CeroStep {
  title: string;
  desc: string;
  where: string;
  link?: string;
  cost?: { label: string; official: boolean };
  spanish?: boolean;
  goal?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const CERO_STEPS: CeroStep[] = [
  {
    title: 'Pedido online y examen de vista',
    desc: 'Formulario en gov.il con declaración de salud. Después, foto y examen de vista en una estación de fotos.',
    where: 'gov.il · Pedido de licencia',
    link: LINKS.pedidoLicencia,
    cost: { label: 'Foto gratis · vista paga', official: false },
    icon: FileText
  },
  {
    title: 'Estudias la teoría',
    desc: 'Señales, reglas y manejo seguro. El Ministerio recomienda rendir el teórico antes de empezar las clases.',
    where: 'Sitio del Ministerio de Transporte',
    icon: BookOpen
  },
  {
    title: 'Examen teórico',
    desc: '30 preguntas en computadora. Apruebas con 26. Vale 5 años.',
    where: 'Te avisan por SMS para anotarte',
    cost: { label: '57 ₪', official: true },
    spanish: true,
    icon: MonitorCheck
  },
  {
    title: 'Clases de manejo',
    desc: 'Mínimo 28 clases con un instructor habilitado, y su examen interno.',
    where: 'Escuela o instructor habilitado',
    cost: { label: 'Precio de cada escuela', official: false },
    icon: Car
  },
  {
    title: 'Test práctico',
    desc: 'Tu instructor pide el turno: el primero sale en 3 a 5 días.',
    where: 'Lo coordina tu instructor',
    cost: { label: '165 ₪ + uso del auto', official: true },
    icon: ClipboardCheck
  },
  {
    title: '¡Licencia de conductor nuevo!',
    desc: 'El resultado llega por SMS en 24 horas. El permiso para manejar sale en 72 horas.',
    where: 'Tu área personal en gov.il',
    goal: true,
    icon: BadgeCheck
  }
];

const COSTS: { icon: React.ComponentType<{ className?: string }>; name: string; value: string; official: boolean }[] = [
  { icon: Camera, name: 'Foto', value: 'Gratis', official: true },
  { icon: Eye, name: 'Examen de vista', value: 'Lo cobra la estación', official: false },
  { icon: MonitorCheck, name: 'Examen teórico', value: '57 ₪', official: true },
  { icon: Car, name: 'Clases (mín. 28) y examen interno', value: 'Precio de cada escuela', official: false },
  { icon: ClipboardCheck, name: 'Test práctico', value: '165 ₪ + uso del auto', official: true }
];

const costChipClass = (official: boolean) =>
  official ? 'bg-[#E5F3EB] text-[#2A7050]' : 'bg-[#FFF1D6] text-[#7A4E07]';

const WhereChip: React.FC<{ where: string; link?: string }> = ({ where, link }) =>
  link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFF8] text-[#6B4FA0] border border-[#E4DCF0] hover:bg-[#EAE4F3] transition-colors"
    >
      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
      <span>{where}</span>
    </a>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFF8] text-[#6B4FA0] border border-[#E4DCF0]">
      <MapPin className="w-3.5 h-3.5 shrink-0" />
      <span>{where}</span>
    </span>
  );

const DesdeCero: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6 items-start">

      {/* Camino paso a paso */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
        <h2 className="text-xl font-black text-[#0E2559] tracking-tight">Tu camino, paso a paso</h2>
        <ol className="relative mt-5 space-y-4">
          <div
            aria-hidden="true"
            className="absolute left-[23px] sm:left-[29px] top-8 bottom-8 w-1.5 rounded-full"
            style={{ background: 'repeating-linear-gradient(180deg,#6B4FA0 0 14px,#CDBFE6 14px 22px)' }}
          />
          {CERO_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <li key={step.title} className="relative flex items-start gap-3 sm:gap-4">
                <div className="relative shrink-0 z-10">
                  <div className={`w-12 h-12 sm:w-[60px] sm:h-[60px] rounded-full border-[3px] sm:border-4 flex items-center justify-center ${
                    step.goal ? 'bg-[#2A7050] border-[#2A7050] text-white' : 'bg-white border-[#6B4FA0] text-[#6B4FA0]'
                  }`}>
                    <StepIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0E2559] text-white text-[11px] font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 space-y-2">
                  <h3 className="text-base sm:text-[17px] font-black text-[#0E2559] leading-snug flex flex-wrap items-center gap-2">
                    {step.title}
                    {step.spanish && (
                      <span className="text-[11px] font-black bg-[#2A7050] text-white rounded-full px-2.5 py-0.5">En español</span>
                    )}
                  </h3>
                  <p className="text-sm text-slate-600 leading-snug">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <WhereChip where={step.where} link={step.link} />
                    {step.cost && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${costChipClass(step.cost.official)}`}>
                        <Wallet className="w-3.5 h-3.5 shrink-0" />
                        {step.cost.label}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Columna lateral */}
      <aside className="space-y-6 lg:sticky lg:top-4">
        <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
          <h2 className="text-xl font-black text-[#0E2559] tracking-tight flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#6B4FA0]" />
            ¿Cuánto sale?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Las tasas del Estado son bajas. Lo que más pesa son las clases: pide el precio antes de empezar.
          </p>
          <ul className="mt-3 divide-y divide-slate-100">
            {COSTS.map(({ icon: CIcon, name, value, official }) => (
              <li key={name} className="flex items-center justify-between gap-3 py-2.5">
                <span className="flex items-center gap-2 text-sm font-bold text-[#0E2559]">
                  <CIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  {name}
                </span>
                <span className={`text-xs font-black rounded-full px-2.5 py-1 text-right ${costChipClass(official)}`}>{value}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 mt-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm bg-[#2A7050] inline-block" />Tasa oficial 2026</span>
            <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm bg-[#E8A33D] inline-block" />Varía según el lugar</span>
          </div>
        </section>

        <section className="bg-[#E5F3EB] rounded-3xl p-5 sm:p-6">
          <p className="flex items-center gap-2 text-base font-black text-[#0E2559]">
            <Languages className="w-5 h-5 text-[#2A7050]" />
            El teórico se rinde en español
          </p>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            También en hebreo, inglés, ruso, francés, árabe y amárico. Lo eliges al anotarte.
          </p>
        </section>
      </aside>
    </div>

    {/* Primeros 2 años */}
    <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
      <h2 className="text-xl font-black text-[#0E2559] tracking-tight">Ya la tienes: tus primeros 2 años</h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] rounded-2xl overflow-hidden">
        {[
          { cls: 'bg-[#0E2559] text-white', icon: UserCheck, title: 'Con acompañante', sub: 'Día y noche', time: '0–3 meses' },
          { cls: 'bg-[#3B3F8F] text-white', icon: Moon, title: 'De noche', sub: 'Con acompañante, de 21 a 6 h', time: '3–6 meses' },
          { cls: 'bg-[#E8A33D] text-[#3D2703]', icon: AlertTriangle, title: 'Cartel', sub: 'En la luneta trasera, los 2 años', time: 'hasta 2 años', sign: true },
        ].map(({ cls, icon: SIcon, title, sub, time, sign }) => (
          <div key={time} className={`${cls} px-4 py-3 flex items-center justify-between gap-3`}>
            <div>
              <p className="flex items-center gap-1.5 text-sm sm:text-[15px] font-black">
                <SIcon className="w-4 h-4 shrink-0" />
                {title}
                {sign && <span dir="rtl" className="bg-white text-[#3D2703] rounded-md px-1.5 font-black">נהג חדש</span>}
              </p>
              <p className="text-xs font-bold opacity-90">{sub}</p>
            </div>
            <span className="md:hidden text-xs font-black bg-white/20 rounded-full px-2.5 py-1 whitespace-nowrap">{time}</span>
          </div>
        ))}
      </div>
      <div className="hidden md:grid grid-cols-[1fr_1fr_2fr] text-xs font-black text-slate-500 -mt-2">
        <span>0–3 meses</span><span>3–6 meses</span><span className="text-right">hasta 2 años</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold bg-[#F1ECF9] text-[#6B4FA0] rounded-full px-3 py-1.5">
          <UserCheck className="w-4 h-4 shrink-0" />
          El acompañante es obligatorio si tienes menos de 24 años
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold bg-[#F1ECF9] text-[#6B4FA0] rounded-full px-3 py-1.5">
          <Users className="w-4 h-4 shrink-0" />
          ¿Menos de 21? Máximo 2 pasajeros, salvo que vaya el acompañante
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { icon: UserCheck, c: 'text-[#6B4FA0] bg-[#F1ECF9]', title: '¿Quién te acompaña?', text: 'Alguien de 24+ con 5 años de licencia, o de 30+ con 3 años.' },
          { icon: Timer, c: 'text-[#6B4FA0] bg-[#F1ECF9]', title: '50 horas en total', text: '20 en ciudad, 15 en ruta y 15 de noche.' },
          { icon: Smartphone, c: 'text-[#2A7050] bg-[#E5F3EB]', title: 'Al terminar, avisas', text: 'Firmas la declaración de fin del acompañamiento. Sin ella no recibes la licencia definitiva.', link: LINKS.finAcompanamiento },
          { icon: AlertTriangle, c: 'text-[#C0392B] bg-[#FCE8E5]', title: 'Cuidado con las multas', text: 'Una infracción grave te obliga a repetir exámenes y suma 2 años más como conductor nuevo.' },
        ].map(({ icon: RIcon, c, title, text, link }) => (
          <div key={title} className="border border-slate-200 rounded-2xl p-4 flex md:flex-col gap-3">
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c}`}>
              <RIcon className="w-5 h-5" />
            </span>
            <div className="space-y-1.5">
              <p className="text-[15px] font-black text-[#0E2559] leading-snug">{title}</p>
              <p className="text-sm text-slate-600 leading-snug">{text}</p>
              {link && <WhereChip where="gov.il · Fin del acompañamiento" link={link} />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 pt-3 border-t border-slate-200/60">
        <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
        <span>Fuente: Kol Zchut · Ministerio de Transporte (tasas abril 2026 y guía de acompañamiento)</span>
      </div>
    </section>
  </div>
);

// ───────────────────────── Componente principal ─────────────────────────

export const DriverLicenseWizard: React.FC = () => {
  // Estado del Wizard
  const [vehicle, setVehicle] = useState<VehicleType>('auto');
  const [isValid, setIsValid] = useState<ValidityType>('si');
  const [yearsExperience, setYearsExperience] = useState<ExperienceType>('5_o_mas');
  const [aliaYears, setAliaYears] = useState<AliyahTimeType>('menos_5');
  const [tab, setTab] = useState<TabType>('cero');

  const goToCero = () => {
    setTab('cero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pasos del canje
  const stepTurno: StepItem = {
    id: 'turno',
    title: 'Sacas turno',
    desc: 'En GoVisit, en una oficina de licencias.',
    where: 'GoVisit · Ministerio de Transporte',
    link: LINKS.myVisit,
    icon: Calendar
  };

  const stepOficina: StepItem = {
    id: 'oficina',
    title: 'Vas a la oficina',
    desc: 'Con los papeles. Ahí pagas la tasa y te pueden pedir examen de vista.',
    where: 'Oficina de licencias habilitada',
    icon: FolderCheck
  };

  const stepPractico: StepItem = {
    id: 'practico',
    title: 'Examen práctico',
    desc: 'Tienes 2 intentos. No hay mínimo de clases.',
    where: 'Te lo indican en la oficina',
    icon: Car
  };

  const stepRenovar: StepItem = {
    id: 'renovar',
    title: 'Renuévala',
    desc: 'En tu país, antes del turno.',
    where: 'Quien emitió tu licencia, en tu país',
    icon: RotateCw
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
    alertRed?: boolean;
    oficinas?: 'todas' | 'all';
    showCeroBtn?: boolean;
    showHelpBtns?: boolean;
  };

  const motoTxt = vehicle === 'moto' ? ' Vale igual para moto.' : '';

  if (vehicle === 'camion') {
    // a) Camión, colectivo o taxi
    resultCase = {
      color: 'orange',
      icon: Truck,
      title: 'Canje con examen práctico',
      subtitle: 'El canje sin examen es solo para auto y moto.',
      badge: 'Con examen práctico',
      steps: [stepTurno, stepOficina, stepPractico],
      showDocs: true,
      alertText: 'En la oficina te dicen si te piden algo más para tu categoría.',
      oficinas: 'todas'
    };
  } else if (aliaYears === '5_o_mas') {
    // b) Pasaron 5 años o más desde la Aliá
    resultCase = {
      color: 'red',
      icon: GraduationCap,
      title: 'Ya no se puede canjear',
      subtitle: 'El canje se hace solo en tus primeros 5 años en Israel.',
      badge: 'Desde cero',
      steps: [],
      showDocs: false,
      alertText: 'Pasado ese plazo, sacas la licencia israelí desde cero.',
      alertRed: true,
      showCeroBtn: true
    };
  } else if (isValid === 'no') {
    // c) Licencia vencida
    resultCase = {
      color: 'red',
      icon: RotateCw,
      title: 'Primero, renueva tu licencia',
      subtitle: 'Para el canje hay que llevar la licencia original y vigente.',
      badge: 'Primero renovar',
      steps: [stepRenovar, stepTurno, stepOficina],
      showDocs: true,
      alertText: '¿No puedes renovarla? Consulta tu caso en el Ministerio de Transporte: *5678.',
      alertRed: true,
      oficinas: 'all',
      showHelpBtns: true
    };
  } else if (yearsExperience === 'menos_5') {
    // d) Menos de 5 años con licencia
    resultCase = {
      color: 'orange',
      icon: vehicle === 'moto' ? Bike : Car,
      title: 'Canje con examen práctico',
      subtitle: `Tenías la licencia menos de 5 años al llegar.${motoTxt}`,
      badge: 'Con examen práctico',
      steps: [stepTurno, stepOficina, stepPractico],
      showDocs: true,
      alertText: 'Si no apruebas el práctico 2 veces, rindes el teórico y otro práctico.',
      oficinas: 'all'
    };
  } else {
    // e) Auto o moto, vigente, 5+ años con licencia, menos de 5 años desde la Aliá
    resultCase = {
      color: 'green',
      icon: CheckCircle2,
      title: 'Canje sin examen',
      subtitle: `Licencia vigente y con 5 años o más al llegar.${motoTxt}`,
      badge: 'Sin examen',
      steps: [stepTurno, stepOficina],
      showDocs: true,
      alertText: '',
      oficinas: 'all'
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
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Elige tu caso y sigue el camino.</p>
        </div>
      </div>

      {/* Pestañas: Desde cero / Canje */}
      <div role="tablist" aria-label="Tipo de trámite" className="grid grid-cols-2 gap-2 sm:gap-3">
        {[
          { id: 'cero' as TabType, title: 'Desde cero', sub: 'Nunca tuviste licencia', icon: GraduationCap },
          { id: 'canje' as TabType, title: 'Canje', sub: 'Ya tienes licencia de otro país', icon: Repeat },
        ].map(({ id, title, sub, icon: TabIcon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(id)}
              className={`min-w-0 text-left rounded-3xl border-2 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 transition cursor-pointer ${
                active
                  ? 'border-[#6B4FA0] bg-[#F1ECF9] shadow-[0_0_0_3px_rgba(107,79,160,0.15)]'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${active ? 'bg-[#6B4FA0] text-white' : 'bg-[#F1ECF9] text-[#6B4FA0]'}`}>
                <TabIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-base sm:text-lg font-black text-[#0E2559] leading-tight">{title}</span>
                <span className="block text-xs sm:text-sm text-slate-500 font-semibold leading-snug">{sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      {tab === 'cero' && <DesdeCero />}

      {tab === 'canje' && (<>
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

        {resultCase.steps.length > 0 && (<>
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
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
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

        </>)}

        {/* Franja de Documentos requeridos */}
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
                Licencia extranjera original y vigente
              </span>
              <span className="bg-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 border border-slate-200/90 shadow-2xs">
                Traducción notarial, si no está en inglés
              </span>
            </div>
          </div>
        )}

        {/* Oficinas que hacen el canje */}
        {resultCase.oficinas && (
          <div className="border border-slate-200 rounded-2xl p-4 space-y-1.5 text-sm text-slate-600">
            <p className="flex items-center gap-2 font-black text-[#0E2559]">
              <MapPin className="w-4 h-4 shrink-0" />
              Oficinas que hacen el canje
            </p>
            <p><strong className="text-[#0E2559]">Todas las categorías:</strong> {OFICINAS.todas}</p>
            {resultCase.oficinas === 'all' && (
              <p><strong className="text-[#0E2559]">Solo auto:</strong> {OFICINAS.soloAuto}</p>
            )}
          </div>
        )}

        {/* Alerta de advertencia del caso */}
        {resultCase.alertText && (
          <div 
            className={`rounded-2xl p-4 flex items-start sm:items-center gap-3 text-sm font-semibold ${
              resultCase.alertRed
                ? 'bg-[#FDECEA] border border-red-200/90 text-red-950'
                : 'bg-[#FFF5DF] border border-amber-200/90 text-amber-950'
            }`}
          >
            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 sm:mt-0 ${
              resultCase.alertRed ? 'text-[#C0392B]' : 'text-[#E8A33D]'
            }`} />
            <span>{resultCase.alertText}</span>
          </div>
        )}

        {/* Botón al camino desde cero (5+ años desde la Aliá) */}
        {resultCase.showCeroBtn && (
          <button
            type="button"
            onClick={goToCero}
            className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#0E2559] hover:bg-[#153477] text-white font-bold text-sm inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 text-[#E8A33D]" />
            <span>Ver el camino desde cero</span>
          </button>
        )}

        {/* Licencia vencida: llamar al Ministerio o preguntar al asistente */}
        {resultCase.showHelpBtns && (
          <div className="flex flex-wrap gap-2.5">
            <a
              href="tel:*5678"
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#0E2559] hover:bg-[#153477] text-white font-bold text-sm inline-flex items-center gap-2 shadow-2xs transition-colors"
            >
              <Phone className="w-4 h-4 text-[#E8A33D]" />
              <span>Llamar al *5678</span>
            </a>
            {ASSISTANT_ENABLED && <button
              type="button"
              onClick={handleAskAssistant}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:bg-slate-50 text-[#0E2559] font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#6B4FA0]" />
              <span>Preguntar al asistente</span>
            </button>}
          </div>
        )}

        {/* Pie del Resultado */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 pt-2 border-t border-slate-200/60">
          <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
          <span>Fuente: Ministerio de Transporte · Kol Zchut · revisado oct 2026</span>
        </div>

      </section>
      </>)}

    </div>
  );
};
