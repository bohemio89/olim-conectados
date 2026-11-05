import React, { useState } from 'react';
import {
  Siren,
  Briefcase,
  School,
  Smartphone,
  MapPin,
  Phone,
  Building2,
  Footprints,
  Car,
  Shield,
  Timer,
  Package,
  Droplets,
  Flashlight,
  Cross,
  Radio,
  FileText,
  ShieldCheck,
  CircleCheck,
  CircleX,
  Info,
  Baby,
  TreePalm,
  CirclePause,
  Wallet,
  Landmark,
  ExternalLink,
  MessageCircle,
  Shuffle,
  Monitor,
  Laptop,
  CalendarDays,
  ArrowRight
} from 'lucide-react';

// Fuentes: Pikud HaOref (oref.org.il y guía de preparación en gov.il), Centro de Cartografía de Israel,
// Bituaj Leumi (tabla de desempleo 2026 y plan de jal'at "Shaagat HaAri"), Ministerio de Trabajo
// (Ley de Protección de Empleados en Emergencia), Autoridad Tributaria (instrucción 07/2026),
// Ministerio de Educación y Contralor del Estado (informe enero 2026). Respaldo: Kol Zchut.

type Icon = React.ComponentType<{ className?: string }>;
type TabId = 'alarma' | 'trabajo' | 'clases';
type SitId = 'cierre' | 'hijos' | 'vac' | 'halat' | 'desc';
type PointKind = 'ok' | 'no' | 'warn';

const LINKS = {
  oref: 'https://www.oref.org.il',
  btlGuerra: 'https://www.btl.gov.il/StateOfEmergency/ShaagatHari/Pages/halat-shaagatHari1.aspx'
};

const POINT_STYLE: Record<PointKind, { icon: Icon; cls: string }> = {
  ok: { icon: CircleCheck, cls: 'bg-[#E5F3EB] text-[#2A7050]' },
  no: { icon: CircleX, cls: 'bg-[#FCE8E5] text-[#C0392B]' },
  warn: { icon: Info, cls: 'bg-[#FFF1D6] text-[#7A4E07]' }
};

const Point: React.FC<{ kind: PointKind; children: React.ReactNode }> = ({ kind, children }) => {
  const { icon: PIcon, cls } = POINT_STYLE[kind];
  return (
    <div className="flex items-start gap-3 text-[15px] font-bold text-[#0E2559] leading-snug">
      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${cls}`}>
        <PIcon className="w-4 h-4" />
      </span>
      <span className="pt-0.5">{children}</span>
    </div>
  );
};

const Source: React.FC<{ children: React.ReactNode; border?: boolean }> = ({ children, border = true }) => (
  <div className={`flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-semibold ${border ? 'pt-3 mt-4 border-t border-slate-200/70' : ''}`}>
    <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
    <span>Fuente: {children}</span>
  </div>
);

const Card: React.FC<{ title: string; icon: Icon; children: React.ReactNode; className?: string }> = ({ title, icon: CIcon, children, className = '' }) => (
  <section className={`bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs ${className}`}>
    <h2 className="text-lg sm:text-xl font-black text-[#0E2559] tracking-tight flex items-center gap-2">
      <CIcon className="w-5 h-5 text-[#C0392B] shrink-0" />
      {title}
    </h2>
    {children}
  </section>
);

// ───────────────────────── Alarma y refugio ─────────────────────────

const WHERE: { icon: Icon; title: string; steps: string[] }[] = [
  { icon: Building2, title: 'En casa o en un edificio', steps: ['Ve al mamad, al refugio, a la escalera o a un cuarto interior.', 'Cierra puertas y ventanas.'] },
  { icon: Footprints, title: 'En la calle', steps: ['Entra al edificio o refugio más cercano.', '¿No hay? Acuéstate en el piso y cúbrete la cabeza con los brazos.'] },
  { icon: Car, title: 'Manejando', steps: ['Estaciona al costado y entra a un edificio.', '¿No hay? Sal del auto, acuéstate y cúbrete la cabeza.'] }
];

const KIT: { icon: Icon; title: string; sub: string }[] = [
  { icon: Droplets, title: 'Agua', sub: '3 L por persona por día, para 3 días' },
  { icon: Package, title: 'Comida envasada', sub: 'Latas, snacks' },
  { icon: Flashlight, title: 'Linterna y pilas', sub: 'Luz de emergencia' },
  { icon: Cross, title: 'Botiquín', sub: 'Y tus remedios' },
  { icon: Radio, title: 'Radio a pilas', sub: 'Por si se corta la luz' },
  { icon: FileText, title: 'Copias de recetas', sub: 'De tus remedios crónicos' }
];

const AlarmaTab: React.FC = () => (
  <div className="space-y-5">
    <Card title="Cuando suena la alarma" icon={Siren}>
      <p className="text-sm text-slate-600 mt-1">Ve al espacio protegido más cercano. Según dónde estés:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {WHERE.map(({ icon: WIcon, title, steps }) => (
          <div key={title} className="border border-slate-200 rounded-2xl p-4 flex md:flex-col gap-3">
            <span className="w-12 h-12 rounded-full bg-[#C0392B] text-white flex items-center justify-center shrink-0">
              <WIcon className="w-6 h-6" />
            </span>
            <div className="space-y-2">
              <h3 className="text-base font-black text-[#0E2559]">{title}</h3>
              <ol className="space-y-1.5">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-2 text-sm text-slate-600 leading-snug">
                    <span className="w-5 h-5 rounded-full bg-[#FCE8E5] text-[#C0392B] text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-[#0E2559] text-white rounded-2xl px-4 sm:px-5 py-3.5 flex items-center gap-4">
        <p className="text-4xl font-black leading-none shrink-0">10<span className="text-base font-extrabold ml-1">min</span></p>
        <p className="text-sm font-semibold text-white/90 leading-snug">
          <strong className="block text-base font-black text-white">Quédate adentro al menos 10 minutos</strong>
          Y sigue siempre lo que indique el Pikud HaOref en ese momento. Deja abierta la puerta del edificio para quien venga de afuera.
        </p>
      </div>
    </Card>

    <Card title="Prepárate antes" icon={Shield}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-5 mt-4">
        <div>
          <p className="text-[15px] font-black text-[#0E2559] flex items-center gap-2 mb-3">
            <Timer className="w-4 h-4" />¿Cuánto tiempo tienes para llegar?
          </p>
          <div className="space-y-2">
            {['Entra a oref.org.il', 'Escribe tu dirección', 'Ves tu zona y tus segundos'].map((t, i) => (
              <div key={t} className="flex items-center gap-3 bg-[#FBF3E6] rounded-xl px-3 py-2.5 text-sm font-extrabold text-[#0E2559]">
                <span className="w-7 h-7 rounded-full bg-[#6B4FA0] text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</span>
                {i === 0 ? <a href={LINKS.oref} target="_blank" rel="noopener noreferrer" className="underline decoration-[#6B4FA0]/40">{t}</a> : t}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-3">Tu zona de alerta es el nombre de tu ciudad. Las ciudades grandes tienen varias zonas.</p>
          <p className="text-sm text-slate-600 mt-2">¿Dudas sobre refugios públicos? Llama a tu municipio: <strong className="text-[#0E2559]">106</strong>.</p>
        </div>
        <div>
          <p className="text-[15px] font-black text-[#0E2559] flex items-center gap-2 mb-3">
            <Package className="w-4 h-4" />Kit para el espacio protegido
          </p>
          <div className="grid grid-cols-2 gap-2">
            {KIT.map(({ icon: KIcon, title, sub }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="w-9 h-9 rounded-lg bg-[#FFF1D6] text-[#7A4E07] flex items-center justify-center shrink-0">
                  <KIcon className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-[#0E2559] leading-tight">{title}</span>
                  <span className="block text-xs font-semibold text-slate-500 leading-tight">{sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Source>Pikud HaOref · Centro de Cartografía de Israel (gov.il)</Source>
    </Card>
  </div>
);

// ───────────────────────── Trabajo y sueldo ─────────────────────────

interface Situation {
  label: string;
  icon: Icon;
  tone: 'green' | 'orange' | 'red';
  headIcon: Icon;
  title: string;
  points: [PointKind, string][];
  how?: boolean;
  source: string;
}

const SITUATIONS: Record<SitId, Situation> = {
  cierre: {
    label: 'No puedo ir: orden del Pikud HaOref', icon: Building2, tone: 'green', headIcon: ShieldCheck, title: 'Estás protegido',
    points: [
      ['ok', 'No te pueden despedir por faltar por orden del Pikud HaOref.'],
      ['ok', 'No te pueden descontar vacaciones por esos días si tu zona está en emergencia declarada.'],
      ['warn', 'El sueldo de esos días depende del plan de cada guerra. En 2026 el Estado compensó a los empleadores que siguieron pagando.']
    ],
    source: 'Ley de Protección de Empleados en Emergencia (Ministerio de Trabajo) · Autoridad Tributaria · respaldo: Kol Zchut'
  },
  hijos: {
    label: 'Cerraron la escuela de mis hijos', icon: Baby, tone: 'green', headIcon: ShieldCheck, title: 'Estás protegido',
    points: [
      ['ok', 'Si tienes hijos menores de 14 años y la escuela cerró por orden del Pikud HaOref, no te pueden despedir por quedarte a cuidarlos.'],
      ['warn', 'El sueldo de esos días sigue el plan de cada guerra, igual que en el caso anterior.']
    ],
    source: 'Ley de Protección de Empleados en Emergencia (Ministerio de Trabajo)'
  },
  vac: {
    label: 'Me mandan de vacaciones', icon: TreePalm, tone: 'orange', headIcon: TreePalm, title: 'Depende de quién cerró',
    points: [
      ['ok', 'Si el Pikud HaOref cerró tu zona: no te pueden descontar vacaciones.'],
      ['warn', 'Si no la cerró y tu empleador decide mandarte: sí puede descontarlas. Si son 7 días o más, tiene que avisarte por escrito 14 días antes.'],
      ['ok', '¿No te quedan días? No pueden dejarte en negativo: o te pagan o no te mandan.']
    ],
    source: 'Ley de Vacaciones Anuales, art. 8 y 9 · Ley de Protección de Empleados en Emergencia, art. 18B · respaldo: Kol Zchut'
  },
  halat: {
    label: "Me pusieron en jal'at (sin sueldo)", icon: CirclePause, tone: 'red', headIcon: Landmark, title: 'Te paga el Bituaj Leumi, no el 100%',
    points: [
      ['warn', "Durante el jal'at no cobras sueldo: cobras el seguro de desempleo del Bituaj Leumi, que es una parte de tu sueldo."],
      ['ok', "En la guerra de 2026 bastaban 10 días de jal'at (no 30), sin perder los primeros 5 días y sin usar antes tus vacaciones."]
    ],
    how: true,
    source: "Bituaj Leumi · plan de jal'at \"Shaagat HaAri\" (marzo–mayo 2026)"
  },
  desc: {
    label: 'Me pagan menos o me descuentan', icon: Wallet, tone: 'red', headIcon: CircleX, title: 'No pueden descontar lo que quieran',
    points: [
      ['no', 'Tu empleador solo puede descontar del sueldo lo que permite la Ley de Protección del Salario.'],
      ['warn', "Si te pagan sueldo por días de jal'at, esos días no los cobras como desempleo."]
    ],
    source: 'Ley de Protección del Salario, art. 25 · Bituaj Leumi'
  }
};

const TONE = {
  green: { border: 'border-[#2A7050]', head: 'bg-[#E5F3EB]', icon: 'bg-[#2A7050]' },
  orange: { border: 'border-[#E8A33D]', head: 'bg-[#FFF1D6]', icon: 'bg-[#E8A33D]' },
  red: { border: 'border-[#C0392B]', head: 'bg-[#FCE8E5]', icon: 'bg-[#C0392B]' }
};

// Ejemplos de la tabla oficial de desempleo 2026 (28 años o más)
const PAY: [number, number, number][] = [
  [5000, 4000, 80],
  [10000, 6445, 64],
  [15000, 8002, 53],
  [20000, 9502, 48]
];

const fmt = (n: number) => n.toLocaleString('es-AR');

const TrabajoTab: React.FC<{ sit: SitId; setSit: (s: SitId) => void; onAsk: () => void }> = ({ sit, setSit, onAsk }) => {
  const S = SITUATIONS[sit];
  const tone = TONE[S.tone];
  const HeadIcon = S.headIcon;
  return (
    <div className="space-y-5">
      <Card title="¿Qué te pasó en el trabajo?" icon={Briefcase}>
        <p className="text-sm text-slate-600 mt-1">Cada guerra el gobierno aprueba reglas nuevas. Aquí está lo que dice la ley y lo que rigió en la última, en 2026.</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {(Object.keys(SITUATIONS) as SitId[]).map((id) => {
            const { label, icon: SIcon } = SITUATIONS[id];
            const on = sit === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setSit(id)}
                className={`min-h-[44px] px-3.5 rounded-full border text-sm font-extrabold inline-flex items-center gap-2 text-left transition cursor-pointer ${
                  on ? 'bg-[#0E2559] border-[#0E2559] text-white' : 'bg-white border-slate-300 text-[#0E2559] hover:bg-slate-50'
                }`}
              >
                <SIcon className={`w-4 h-4 shrink-0 ${on ? 'text-white' : 'text-slate-500'}`} />
                {label}
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className={`mt-4 rounded-2xl border-2 overflow-hidden ${tone.border}`}>
          <div className={`${tone.head} px-4 sm:px-5 py-3.5 flex items-center gap-3`}>
            <span className={`w-11 h-11 rounded-xl text-white flex items-center justify-center shrink-0 ${tone.icon}`}>
              <HeadIcon className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#0E2559] leading-tight">{S.title}</h3>
          </div>
          <div className="px-4 sm:px-5 py-4 space-y-3">
            {S.points.map(([kind, text]) => (
              <Point key={text} kind={kind}>{text}</Point>
            ))}
            {S.how && (
              <div className="pt-1">
                <p className="text-sm font-black text-[#0E2559] flex items-center gap-1.5 mb-2"><Landmark className="w-4 h-4" />Cómo pedirlo</p>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-[#FBF3E6] rounded-2xl p-3">
                  {['Reclamo online en btl.gov.il', 'Te inscribes en el Servicio de Empleo', 'Tu empleador informa las fechas (Formulario 100)'].map((t, i) => (
                    <li key={t} className="flex md:flex-col gap-2 md:gap-1 items-center md:items-start text-sm font-extrabold text-[#0E2559] leading-snug">
                      <span className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <Source>{S.source}</Source>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 items-start">
        <Card title="¿El desempleo es el 100%?" icon={Wallet}>
          <p className="text-sm text-slate-600 mt-1">No. Cuanto más ganas, menor es el porcentaje. Ejemplos oficiales 2026, para 28 años o más:</p>
          <div className="space-y-3 mt-4">
            {PAY.map(([salary, benefit, pct]) => (
              <div key={salary} className="grid grid-cols-[84px_1fr_52px] sm:grid-cols-[110px_1fr_62px] gap-2 sm:gap-3 items-center">
                <p className="text-sm font-extrabold text-[#0E2559] leading-tight">
                  {fmt(salary)} ₪<span className="block text-[11px] font-bold text-slate-500">tu sueldo</span>
                </p>
                <div className="space-y-1">
                  <div className="h-3.5 rounded-full bg-[#F1E8D6] overflow-hidden"><div className="h-full rounded-full bg-[#CFC6B5]" style={{ width: `${salary / 200}%` }} /></div>
                  <div className="h-3.5 rounded-full bg-[#F1E8D6] overflow-hidden"><div className="h-full rounded-full bg-[#2A7050]" style={{ width: `${benefit / 200}%` }} /></div>
                </div>
                <p className="text-xl font-black text-[#2A7050] text-right">{pct}%</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-[#CFC6B5] inline-block" />Sueldo bruto</span>
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-[#2A7050] inline-block" />Lo que paga el Bituaj Leumi</span>
          </div>
          <div className="mt-4 flex gap-2.5 items-start rounded-2xl bg-[#FFF1D6] text-[#7A4E07] px-4 py-3 text-sm font-bold">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            Menores de 28 cobran un porcentaje más bajo. Tope: 550,76 ₪ por día los primeros 125 días.
          </div>
          <Source>Bituaj Leumi, tabla de desempleo 2026</Source>
        </Card>

        <Card title="¿Tu caso es distinto?" icon={MessageCircle}>
          <p className="text-sm text-slate-600 mt-1 mb-4">Las reglas cambian con cada guerra. Revisa siempre la página del Bituaj Leumi o pregúntale al asistente.</p>
          <div className="flex flex-wrap gap-2.5">
            <a href={LINKS.btlGuerra} target="_blank" rel="noopener noreferrer" className="min-h-[44px] px-5 rounded-full bg-[#0E2559] hover:bg-[#153477] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors">
              <ExternalLink className="w-4 h-4 text-[#E8A33D]" />Bituaj Leumi: guerra
            </a>
            <button type="button" onClick={onAsk} className="min-h-[44px] px-5 rounded-full bg-white border border-slate-300 hover:bg-slate-50 text-[#0E2559] font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer">
              <MessageCircle className="w-4 h-4 text-[#6B4FA0]" />Preguntar al asistente
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ───────────────────────── Clases ─────────────────────────

const LEVELS: { icon: Icon; title: string; text: string; tag: string; box: string; dot: string; tagText: string }[] = [
  { icon: School, title: 'Clases normales', text: 'Todos van a la escuela.', tag: 'Actividad completa', box: 'bg-[#E5F3EB] border-[#2A7050]', dot: 'bg-[#2A7050]', tagText: 'text-[#2A7050]' },
  { icon: Shuffle, title: 'Clases mixtas', text: 'Presencial solo donde se llega al refugio a tiempo. El resto, a distancia.', tag: 'Actividad parcial', box: 'bg-[#FFF1D6] border-[#7A4E07]', dot: 'bg-[#7A4E07]', tagText: 'text-[#7A4E07]' },
  { icon: Monitor, title: 'Solo a distancia', text: 'No hay clases presenciales. Se estudia desde casa.', tag: 'Actividad limitada', box: 'bg-[#FCE8E5] border-[#C0392B]', dot: 'bg-[#C0392B]', tagText: 'text-[#C0392B]' }
];

const ClasesTab: React.FC<{ goToHijos: () => void }> = ({ goToHijos }) => (
  <div className="space-y-5">
    <Card title="¿Hay clases durante la guerra?" icon={School}>
      <p className="text-sm text-slate-600 mt-1">Depende del nivel de actividad que el Pikud HaOref fija para tu zona. Puede cambiar de un día para otro.</p>
      <div className="space-y-2.5 mt-4">
        {LEVELS.map(({ icon: LIcon, title, text, tag, box, dot, tagText }) => (
          <div key={title} className={`rounded-2xl border-l-[6px] px-3.5 sm:px-4 py-3 flex flex-wrap sm:flex-nowrap items-center gap-3 ${box}`}>
            <span className={`w-11 h-11 rounded-xl text-white flex items-center justify-center shrink-0 ${dot}`}>
              <LIcon className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-[180px]">
              <p className="text-base font-black text-[#0E2559]">{title}</p>
              <p className="text-sm font-semibold text-slate-600 leading-snug">{text}</p>
            </div>
            <span className={`text-xs font-black bg-white rounded-full px-3 py-1 whitespace-nowrap ml-14 sm:ml-0 ${tagText}`}>{tag}</span>
          </div>
        ))}
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card title="¿Hay clases digitales?" icon={Laptop}>
        <div className="space-y-3 mt-4">
          <Point kind="ok">Sí. La escuela pasa a clases a distancia con las mismas plataformas que usa siempre.</Point>
          <Point kind="ok">Todos los años las escuelas hacen un simulacro de clases a distancia con el Pikud HaOref.</Point>
          <Point kind="warn">¿No tienes computadora en casa? Habla con la escuela: puede prestarte un equipo o darte material impreso.</Point>
        </div>
      </Card>
      <Card title="¿Se alarga el año escolar?" icon={CalendarDays}>
        <div className="space-y-3 mt-4">
          <Point kind="warn">No hay una regla fija. Si se pierden muchos días, el distrito del Ministerio de Educación puede aprobar que algunas escuelas alarguen el año.</Point>
          <Point kind="ok">La escuela te avisa los cambios. Sigue sus mensajes y los del Ministerio de Educación.</Point>
        </div>
      </Card>
    </div>

    <section className="bg-[#F1ECF9] rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4">
      <span className="w-12 h-12 rounded-2xl bg-[#6B4FA0] text-white flex items-center justify-center shrink-0">
        <Briefcase className="w-6 h-6" />
      </span>
      <div className="flex-1">
        <p className="text-base sm:text-lg font-black text-[#0E2559]">¿Tienes que quedarte en casa con tus hijos?</p>
        <p className="text-sm font-semibold text-slate-600">Si son menores de 14 años y la escuela cerró por orden del Pikud HaOref, no te pueden despedir.</p>
      </div>
      <button type="button" onClick={goToHijos} className="self-start md:self-center min-h-[44px] px-5 rounded-full bg-[#0E2559] hover:bg-[#153477] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap">
        <ArrowRight className="w-4 h-4 text-[#E8A33D]" />Ver Trabajo y sueldo
      </button>
    </section>

    <Source border={false}>Ministerio de Educación (gov.il) · Contralor del Estado, informe enero 2026</Source>
  </div>
);

// ───────────────────────── Componente principal ─────────────────────────

const QUICK: { icon: Icon; title: string; sub: string; href?: string; cls: string }[] = [
  { icon: Smartphone, title: 'App del Pikud HaOref', sub: 'Alertas en tu celular', cls: 'bg-[#FCE8E5] text-[#C0392B]' },
  { icon: MapPin, title: 'oref.org.il', sub: 'Tu zona y tu tiempo', href: LINKS.oref, cls: 'bg-[#F1ECF9] text-[#6B4FA0]' },
  { icon: Phone, title: '104', sub: 'Pikud HaOref', href: 'tel:104', cls: 'bg-[#E6E9F2] text-[#0E2559]' },
  { icon: Phone, title: '106', sub: 'Tu municipio', href: 'tel:106', cls: 'bg-[#E5F3EB] text-[#2A7050]' }
];

const TABS: { id: TabId; icon: Icon; title: string; sub: string }[] = [
  { id: 'alarma', icon: Siren, title: 'Alarma y refugio', sub: 'Qué hacer y cómo prepararte' },
  { id: 'trabajo', icon: Briefcase, title: 'Trabajo y sueldo', sub: 'Quién paga y qué te pueden descontar' },
  { id: 'clases', icon: School, title: 'Clases', sub: 'Escuela y clases a distancia' }
];

export const WarGuide: React.FC = () => {
  const [tab, setTab] = useState<TabId>('alarma');
  const [sit, setSit] = useState<SitId>('cierre');

  const handleAskAssistant = () => {
    const assistantBtn = document.querySelector('button[aria-label="Abrir asistente de Olim Conectados"]') as HTMLButtonElement | null;
    if (assistantBtn) {
      assistantBtn.click();
    } else {
      window.history.pushState({ tabId: 'assistant' }, '', '/asistente');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const goToHijos = () => {
    setSit('hijos');
    setTab('trabajo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-5">
      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {QUICK.map(({ icon: QIcon, title, sub, href, cls }) => {
          const inner = (
            <>
              <span className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
                <QIcon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm sm:text-base font-black text-[#0E2559] leading-tight">{title}</span>
                <span className="block text-xs font-bold text-slate-500 leading-tight">{sub}</span>
              </span>
            </>
          );
          const cardCls = 'bg-white border border-slate-200/80 rounded-2xl p-3 flex items-center gap-2.5 sm:gap-3 shadow-2xs';
          return href ? (
            <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cardCls} hover:border-slate-300 transition-colors`}>
              {inner}
            </a>
          ) : (
            <div key={title} className={cardCls}>{inner}</div>
          );
        })}
      </div>

      {/* Pestañas */}
      <div role="tablist" aria-label="Temas de la guía" className="grid grid-cols-3 gap-2 sm:gap-3">
        {TABS.map(({ id, icon: TIcon, title, sub }) => {
          const on = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(id)}
              className={`min-w-0 text-left rounded-3xl border-2 p-2.5 sm:p-4 flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3.5 transition cursor-pointer ${
                on ? 'border-[#C0392B] bg-[#FCE8E5] shadow-[0_0_0_3px_rgba(192,57,43,0.12)]' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${on ? 'bg-[#C0392B] text-white' : 'bg-[#FCE8E5] text-[#C0392B]'}`}>
                <TIcon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm sm:text-lg font-black text-[#0E2559] leading-tight">{title}</span>
                <span className="hidden sm:block text-xs sm:text-sm font-semibold text-slate-500 leading-snug">{sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      {tab === 'alarma' && <AlarmaTab />}
      {tab === 'trabajo' && <TrabajoTab sit={sit} setSit={setSit} onAsk={handleAskAssistant} />}
      {tab === 'clases' && <ClasesTab goToHijos={goToHijos} />}
    </div>
  );
};
