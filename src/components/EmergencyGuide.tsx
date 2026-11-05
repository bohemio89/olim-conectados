import React, { useState } from 'react';
import {
  Phone,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Siren,
  Stethoscope,
  Clock,
  Hospital,
  BedDouble,
  FileText,
  Bone,
  Scissors,
  Activity,
  HardHat,
  Car,
  School,
  Moon,
  ArrowDown
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';

// Fuentes: Ministerio de Salud — "Exención de pago en la guardia" (gov.il/he/service/emergency-room-payment),
// circular 21/2016, centro de información en emergencias (teléfonos 24/7 de las Kupot) y "Kol HaBriut" (call.gov.il).

type Icon = React.ComponentType<{ className?: string }>;

const KUPOT: { name: string; phone: string; color: string }[] = [
  { name: 'Clalit', phone: '*2700', color: 'bg-[#1F5F8B] hover:bg-[#194c70]' },
  { name: 'Maccabi', phone: '*3555', color: 'bg-[#2A7050] hover:bg-[#235e43]' },
  { name: 'Meuhedet', phone: '*3833', color: 'bg-[#6B4FA0] hover:bg-[#5a4288]' },
  { name: 'Leumit', phone: '*507', color: 'bg-[#B85D19] hover:bg-[#9c4d13]' }
];

const PATH: { n: number; q: string; icon: Icon; title: string; text: string; tag: string; tone: string; dot: string }[] = [
  {
    n: 1,
    q: '¿Hay riesgo de vida?',
    icon: Siren,
    title: 'Llama al 101 (MADA)',
    text: 'Dolor de pecho, falta de aire, desmayo, sangrado fuerte.',
    tag: 'Ambulancia',
    tone: 'bg-[#FCE8E5] border-[#C0392B]',
    dot: 'bg-[#C0392B]'
  },
  {
    n: 2,
    q: '¿Tu clínica está abierta?',
    icon: Stethoscope,
    title: 'Ve a tu médico de familia',
    text: 'Es el primer paso. Si hace falta, él te deriva.',
    tag: 'Sin copago',
    tone: 'bg-[#E5F3EB] border-[#2A7050]',
    dot: 'bg-[#2A7050]'
  },
  {
    n: 3,
    q: '¿Está cerrada? (noche, Shabat, feriado)',
    icon: Clock,
    title: 'Llama al 24/7 de tu Kupá o ve a un centro de urgencias',
    text: 'Te atienden sin turno. Con derivación del médico, no pagas.',
    tag: 'Copago según tu Kupá',
    tone: 'bg-[#FFF1D6] border-[#E8A33D]',
    dot: 'bg-[#E8A33D]'
  },
  {
    n: 4,
    q: '¿Te mandan al hospital?',
    icon: Hospital,
    title: 'Miún (guardia) con derivación',
    text: 'Lleva la derivación (hafniá) o el Tofes 17 de tu Kupá.',
    tag: 'No pagas',
    tone: 'bg-[#E6EEF5] border-[#1F5F8B]',
    dot: 'bg-[#1F5F8B]'
  }
];

const FREE_CASES: { icon: Icon; text: string }[] = [
  { icon: BedDouble, text: 'Quedas internado' },
  { icon: FileText, text: 'Llevas derivación o Tofes 17' },
  { icon: Bone, text: 'Fractura nueva' },
  { icon: Scissors, text: 'Herida que necesita puntos' },
  { icon: Activity, text: 'Hombro o articulación salida' },
  { icon: HardHat, text: 'Accidente de trabajo, con el formulario 250 del empleador' },
  { icon: Car, text: 'Accidente de tránsito, con la constancia de la policía' },
  { icon: School, text: 'Alumno lastimado en la escuela, con la constancia de la escuela' }
];

const CASES: Record<string, {
  title: string;
  verdict: string;
  route: string[];
  warning: string;
}> = {
  fiebre: {
    title: 'Fiebre alta de noche, sin riesgo de vida',
    verdict: 'No vayas directo al Miún',
    route: [
      'Llama al 24/7 de tu Kupá: te dicen a dónde ir.',
      'Si te tienen que ver, ve a un centro de urgencias de tu Kupá.',
      'Si el médico ve que hace falta, te da la derivación al hospital.'
    ],
    warning: 'Sin derivación, el Miún te cobra la tarifa completa del Ministerio de Salud (más de 1.100 ₪).'
  },
  pecho: {
    title: 'Dolor de pecho o falta de aire',
    verdict: 'Urgencia: llama al 101',
    route: [
      'Llama al 101 (MADA) y di tu dirección exacta.',
      'La ambulancia te lleva al Miún.',
      'Si quedas internado, no pagas la visita al Miún.'
    ],
    warning: 'Ante un riesgo de vida, no pierdas tiempo buscando derivación: llama al 101.'
  },
  fractura: {
    title: 'Posible fractura o corte profundo',
    verdict: 'Puedes ir al Miún aunque no tengas derivación',
    route: [
      'Una fractura nueva o una herida que necesita puntos no paga el Miún.',
      'También si se te salió el hombro u otra articulación.',
      'Guarda el informe de alta y las radiografías.'
    ],
    warning: 'Si al final no era fractura ni necesitaba puntos, el Miún te puede cobrar.'
  },
  trabajo: {
    title: 'Accidente en el trabajo',
    verdict: 'Pide a tu empleador el formulario 250',
    route: [
      'Avisa a tu empleador y pídele el formulario 250 del Bituaj Leumi.',
      'En el Miún, di que fue en el trabajo: "Zo teunat avodá".',
      'Con el formulario 250 no pagas el Miún.'
    ],
    warning: 'Si en el informe no dice que fue un accidente de trabajo, puede costarte el reconocimiento del Bituaj Leumi.'
  }
};

export const EmergencyGuide: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string>('fiebre');
  const [copiedText, setCopiedText] = useState(false);

  const hebrewPhraseForHafnia = 'אני צריך הפניה למיון כדי שהקופה תכסה את הביקור בבית החולים.';

  const handleCopy = () => {
    navigator.clipboard.writeText(hebrewPhraseForHafnia);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2200);
  };

  return (
    <div className="space-y-6">

      {/* 1. Teléfonos: MADA + las 4 Kupot */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="col-span-2 lg:col-span-1 bg-[#C0392B] text-white rounded-2xl p-4 shadow-sm flex lg:flex-col items-center lg:items-stretch justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white/90">Ambulancia MADA</p>
            <p className="text-4xl font-extrabold tracking-tight leading-none mt-1">101</p>
          </div>
          <a
            href="tel:101"
            className="min-h-[44px] px-5 bg-white text-[#C0392B] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition text-[15px]"
          >
            <Phone className="w-4 h-4 fill-current" />
            Llamar
          </a>
        </div>
        {KUPOT.map(({ name, phone, color }) => (
          <div key={name} className="bg-white border border-black/10 rounded-2xl p-4 shadow-2xs flex flex-col justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold text-slate-600">{name} · 24/7</p>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-none mt-1">{phone}</p>
            </div>
            <a
              href={`tel:${phone}`}
              className={`min-h-[44px] w-full text-white font-bold rounded-xl flex items-center justify-center gap-2 transition text-[15px] ${color}`}
            >
              <Phone className="w-4 h-4 fill-current" />
              Llamar
            </a>
          </div>
        ))}
      </div>

      {/* 2. ¿A dónde voy? — camino paso a paso */}
      <div className="bg-white rounded-3xl border border-black/10 p-5 sm:p-8 shadow-2xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">¿A dónde voy?</h2>
        <p className="text-[15px] sm:text-base text-slate-600 mt-0.5">Sigue los pasos en orden para no pagar de más.</p>

        <ol className="mt-6 space-y-2">
          {PATH.map(({ n, q, icon: PIcon, title, text, tag, tone, dot }, i) => (
            <li key={n}>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,15rem)_auto_minmax(0,1fr)] gap-2 md:gap-4 items-stretch">
                {/* Pregunta */}
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-full text-white font-black flex items-center justify-center shrink-0 ${dot}`}>{n}</span>
                  <p className="font-extrabold text-[#0E2559] text-[15px] sm:text-base leading-snug">{q}</p>
                </div>
                <div className="hidden md:flex items-center text-slate-400 font-black text-sm">
                  Sí <ChevronRight className="w-4 h-4" />
                </div>
                {/* Respuesta */}
                <div className={`ml-12 md:ml-0 border-l-4 rounded-2xl px-4 py-3 flex items-start gap-3 ${tone}`}>
                  <PIcon className="w-5 h-5 text-[#0E2559] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-[#0E2559] text-[15px] leading-snug">{title}</p>
                    <p className="text-sm text-slate-600 leading-snug">{text}</p>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-black bg-white text-[#0E2559] rounded-full px-3 py-1 whitespace-nowrap self-center">{tag}</span>
                </div>
              </div>
              {i < PATH.length - 1 && (
                <div className="flex items-center gap-2 pl-[11px] my-1 text-xs font-extrabold text-slate-400">
                  <ArrowDown className="w-4 h-4" /> No
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-5 rounded-2xl bg-[#FCE8E5] text-[#8E2318] px-4 py-3 flex items-start gap-2.5 text-sm sm:text-[15px] font-bold">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>Si vas al Miún sin derivación, pagas la tarifa del Ministerio de Salud: más de 1.100 ₪. Salvo en los casos de abajo.</span>
        </div>
      </div>

      {/* 3. Cuándo no pagas el Miún */}
      <div className="bg-white rounded-3xl border border-black/10 p-5 sm:p-8 shadow-2xs">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">No pagas el Miún si…</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5">
          {FREE_CASES.map(({ icon: FIcon, text }) => (
            <div key={text} className="flex items-center gap-3 border border-slate-200 rounded-2xl p-3">
              <span className="w-10 h-10 rounded-xl bg-[#E5F3EB] text-[#2A7050] flex items-center justify-center shrink-0">
                <FIcon className="w-5 h-5" />
              </span>
              <span className="text-sm font-bold text-[#0E2559] leading-snug">{text}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-[#E6EEF5] text-[#0E2559] px-4 py-3 flex items-start gap-2.5 text-sm font-semibold">
          <Moon className="w-5 h-5 text-[#1F5F8B] shrink-0 mt-0.5" />
          <span>Entre la 1 y las 6 de la mañana pagas solo la tarifa de ingreso (agrat miún), si la visita se justificaba.</span>
        </div>
        <div className="mt-5 pt-4 border-t border-black/10">
          <SourceBadge organismo="Ministerio de Salud" sitio="gov.il" fecha="revisado nov 2026" />
        </div>
      </div>

      {/* 4. Frase en hebreo + casos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">Frase para pedir la derivación</h3>
            <p className="text-[15px] text-slate-600 mt-1">Muéstrasela al médico o cópiala en WhatsApp.</p>
            <div className="mt-5 bg-[#FBF3E6] border border-[#E8A33D]/30 rounded-2xl p-5 text-right font-hebrew text-lg sm:text-xl font-bold text-[#0E2559] leading-relaxed" lang="he" dir="rtl">
              {hebrewPhraseForHafnia}
            </div>
            <p className="text-sm text-slate-600 italic mt-3 leading-relaxed">
              "Necesito una derivación a la guardia para que la Kupá cubra la visita al hospital."
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="mt-6 w-full min-h-[44px] bg-[#0E2559] hover:bg-[#1a3875] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition text-[15px] cursor-pointer"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar en hebreo</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">¿Cuál es tu caso?</h3>
          <p className="text-[15px] text-slate-600 mt-1">Toca tu situación para ver qué hacer.</p>
          <div className="mt-4 space-y-2.5">
            {Object.entries(CASES).map(([key, item]) => {
              const isOpen = selectedCase === key;
              return (
                <div key={key} className="border border-black/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setSelectedCase(isOpen ? '' : key)}
                    aria-expanded={isOpen}
                    className={`w-full min-h-[44px] px-4 py-3 text-left font-bold text-[14px] sm:text-[15px] flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isOpen ? 'bg-[#0E2559] text-white' : 'bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{item.title}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-slate-50/70 border-t border-black/5 space-y-3 text-[14px] leading-relaxed">
                      <p className="font-extrabold text-[#0E2559] text-[15px]">{item.verdict}</p>
                      <ol className="space-y-1.5 text-slate-700 text-[13.5px]">
                        {item.route.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#2A7050] shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[13px] font-medium flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>{item.warning}</span>
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
  );
};

export default EmergencyGuide;
