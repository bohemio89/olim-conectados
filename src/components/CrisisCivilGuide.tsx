import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Coins, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Wallet,
  Briefcase,
  Bell,
  ArrowRight,
  Building2
} from 'lucide-react';

// Tramos mensuales de impuesto a las ganancias 2026 (Autoridad Tributaria, lehavot ezer 2026)
const BRACKETS_2026: [number, number][] = [
  [7010, 0.10],
  [10060, 0.14],
  [16150, 0.20],
  [22440, 0.31],
  [46690, 0.35],
  [60130, 0.47],
  [Infinity, 0.50]
];

const monthlyTax = (income: number) => {
  let tax = 0;
  let prev = 0;
  for (const [top, rate] of BRACKETS_2026) {
    if (income <= prev) break;
    tax += (Math.min(income, top) - prev) * rate;
    prev = top;
  }
  return tax;
};

export const CrisisCivilGuide: React.FC = () => {
  const [activeChip, setActiveChip] = useState<'salklita' | 'teummas' | 'pikud'>('salklita');

  // Card 1: Sal Klitá & Alquiler Month & Status
  const [aliyahMonth, setAliyahMonth] = useState<number>(14);
  const [isDetailOpen1, setIsDetailOpen1] = useState(false);

  // Card 2: Teum Mas
  const [mainSalary, setMainSalary] = useState<number>(7000);
  const [secondarySalary, setSecondarySalary] = useState<number>(3500);
  const [isDetailOpen2, setIsDetailOpen2] = useState(false);


  // Calculations for Teum Mas
  // Sin Teum Mas: el 2º empleador retiene la tasa máxima (47%).
  // Con Teum Mas: estimado = impuesto sobre el total − impuesto sobre el sueldo principal (sin puntos de crédito).
  const taxWithout = Math.round(secondarySalary * 0.47);
  const taxWith = Math.round(monthlyTax(mainSalary + secondarySalary) - monthlyTax(mainSalary));
  const withPct = secondarySalary > 0 ? Math.round((taxWith / secondarySalary) * 100) : 0;
  const taxSaved = Math.max(0, taxWithout - taxWith);

  const scrollToCard = (id: 'salklita' | 'teummas' | 'pikud') => {
    setActiveChip(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Timeline position calculation for notebook badge
  const calculateMarkerLeft = () => {
    if (aliyahMonth <= 6) {
      return Math.max(4, Math.min(26, (aliyahMonth / 6) * 26));
    }
    if (aliyahMonth <= 30) {
      return 27 + ((aliyahMonth - 6) / 24) * 58;
    }
    return Math.min(94, 86 + ((aliyahMonth - 30) / 10) * 8);
  };

  const goToWarSection = () => {
    window.history.pushState({ tabId: 'war' }, '', '/guerra-y-emergencias');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="space-y-6">
      
      {/* Chips superiores que llevan a cada tarjeta */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => scrollToCard('salklita')}
          className={`min-h-[44px] px-6 py-2.5 rounded-full font-bold text-sm sm:text-[15px] whitespace-nowrap transition-all cursor-pointer ${
            activeChip === 'salklita'
              ? 'bg-[#0E2559] text-white shadow-2xs'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-black/10'
          }`}
        >
          Sal Klitá y alquiler
        </button>

        <button
          onClick={() => scrollToCard('teummas')}
          className={`min-h-[44px] px-6 py-2.5 rounded-full font-bold text-sm sm:text-[15px] whitespace-nowrap transition-all cursor-pointer ${
            activeChip === 'teummas'
              ? 'bg-[#0E2559] text-white shadow-2xs'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-black/10'
          }`}
        >
          Dos trabajos
        </button>

        <button
          onClick={() => scrollToCard('pikud')}
          className={`min-h-[44px] px-6 py-2.5 rounded-full font-bold text-sm sm:text-[15px] whitespace-nowrap transition-all cursor-pointer ${
            activeChip === 'pikud'
              ? 'bg-[#0E2559] text-white shadow-2xs'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-black/10'
          }`}
        >
          Pikud HaOref
        </button>
      </div>

      {/* 1. Tarjeta: "¿Qué cobras según tu mes de Aliá?" */}
      <div id="salklita" className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">
              ¿Qué cobras según tu mes de Aliá?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-0.5">
              Los depósitos del Ministerio, mes por mes.
            </p>
          </div>

          {/* Campo: Llevo en Israel [N] meses */}
          <div className="w-full md:w-56 shrink-0">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Llevo en Israel
            </span>
            <div className="bg-white border border-black/10 rounded-2xl px-4 py-2 flex items-center justify-between min-h-[50px] shadow-2xs">
              <input
                type="number"
                min={1}
                max={72}
                value={aliyahMonth}
                onChange={(e) => setAliyahMonth(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 text-2xl font-black text-[#0E2559] bg-transparent focus:outline-none"
              />
              <span className="text-sm font-semibold text-slate-500">meses</span>
            </div>
          </div>
        </div>

        {/* Barra de tiempo de 3 tramos (Notebook) */}
        <div className="hidden md:block pt-6 pb-2">
          {/* Marcador "Tú: mes N" */}
          <div className="relative w-full h-8 mb-1">
            <div 
              className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-300"
              style={{ left: `${calculateMarkerLeft()}%` }}
            >
              <div className="bg-[#0E2559] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-xs">
                Tú: mes {aliyahMonth}
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#0E2559]" />
            </div>
          </div>

          {/* Barra continua con 3 segmentos */}
          <div className="w-full flex rounded-2xl overflow-hidden h-16 shadow-2xs">
            {/* Tramo 1 */}
            <div className="w-[28%] bg-[#6B4FA0] text-white px-4 py-2.5 flex flex-col justify-center">
              <span className="font-extrabold text-sm sm:text-base leading-tight">Sal Klitá</span>
              <span className="text-xs text-white/90">7 pagos en 6 meses</span>
            </div>

            {/* Tramo 2 */}
            <div className="w-[58%] bg-[#6B4FA0]/20 text-[#0E2559] px-4 py-2.5 flex flex-col justify-center border-l border-white/20">
              <span className="font-extrabold text-sm sm:text-base leading-tight">Ayuda de alquiler</span>
              <span className="text-xs text-slate-700">
                Meses 7–30 · automática
              </span>
            </div>

            {/* Tramo 3 */}
            <div className="w-[14%] bg-amber-100/60 text-slate-700 px-3 py-2.5 flex flex-col justify-center border-l border-black/5">
              <span className="font-bold text-sm leading-tight">Fin</span>
              <span className="text-xs text-slate-500">
                Mes 31+
              </span>
            </div>
          </div>

          {/* Escala numérica inferior */}
          <div className="flex justify-between text-xs text-slate-500 font-semibold px-2 mt-2">
            <span>Mes 1</span>
            <span>Mes 7</span>
            <span>Mes 31</span>
          </div>
        </div>

        {/* Barra de tiempo de 3 tramos (Celular - Vertical) */}
        <div className="block md:hidden rounded-2xl overflow-hidden shadow-2xs divide-y divide-black/5">
          <div className="bg-[#6B4FA0] text-white p-4">
            <span className="font-extrabold text-base block leading-tight">Sal Klitá</span>
            <span className="text-xs text-white/90">7 pagos en 6 meses</span>
          </div>

          <div className="bg-[#6B4FA0]/20 text-[#0E2559] p-4">
            <span className="font-extrabold text-base block leading-tight">Ayuda de alquiler</span>
            <span className="text-xs text-slate-700">
              Meses 7–30 · automática
            </span>
          </div>

          <div className="bg-amber-100/60 text-slate-700 p-4">
            <span className="font-bold text-base block leading-tight">Fin</span>
            <span className="text-xs text-slate-500">
              Mes 31+
            </span>
          </div>
        </div>

        {/* Mensaje verde según el caso */}
        <div className="bg-[#E7F6EE] border border-[#2A7050]/20 rounded-2xl p-4 flex items-center gap-3 text-[#0E2559] text-sm sm:text-[15px] font-semibold">
          <CheckCircle2 className="w-5 h-5 text-[#2A7050] shrink-0" />
          <p>
            {aliyahMonth <= 6 ? (
              <>Mes {aliyahMonth}: estás cobrando el <strong>Sal Klitá</strong> (7 pagos en 6 meses: el 1.º en el aeropuerto y 6 mensuales).</>
            ) : aliyahMonth <= 30 ? (
              <>Mes {aliyahMonth}: estás cobrando la <strong>ayuda de alquiler</strong>. Termina en el mes 30.</>
            ) : (
              <>Mes {aliyahMonth}: ya pasaste el mes 30. El Sal Klitá y la ayuda de alquiler terminaron.</>
            )}
          </p>
        </div>

        {/* Centro de absorción */}
        <div className="bg-[#F1ECF9] rounded-2xl p-4 flex items-start gap-3 text-sm sm:text-[15px] text-[#0E2559] font-semibold">
          <Building2 className="w-5 h-5 text-[#6B4FA0] shrink-0 mt-0.5" />
          <p>
            ¿Vives en un centro de absorción (merkaz klitá)? Mientras vivas ahí no cobras la ayuda de alquiler. Cuando te mudes, pide el <strong>certificado de salida del centro</strong> (ishur azivat merkaz klitá).
          </p>
        </div>

        {/* Detalle desplegable Card 1 */}
        {isDetailOpen1 && (
          <div className="mt-4 pt-4 border-t border-black/5 text-sm text-slate-700 space-y-3 bg-slate-50/80 p-5 rounded-2xl leading-relaxed">
            <p className="font-bold text-[#0E2559]">Detalle normativo del Sal Klitá y la Ayuda de Alquiler:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
              <li>
                <strong>Sal Klitá:</strong> Consiste en <strong>7 pagos</strong> (el primero en el aeropuerto Ben Gurion con entrega de efectivo inicial y transferencia bancaria, seguido de 6 pagos mensuales directos en tu cuenta israelí).
              </li>
              <li>
                <strong>Ayuda de alquiler (Siyua bi'Sjirot):</strong>
                {' Para quienes recibieron el estatus de olé desde el 1 de marzo de 2024: se deposita del mes 7 al mes 30, de forma automática, sin presentar el contrato de alquiler.'}
              </li>
              <li>
                <strong>Meses 7 a 12:</strong> si no trabajas, puedes tener derecho a la ayuda de subsistencia (dmei kiyum) del Ministerio de Aliá. Consulta en tu oficina o al *2994.
              </li>
            </ul>
          </div>
        )}

        {/* Pie Card 1 */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-600 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
            <span>Fuente: Procedimiento 429 · Ministerio de Aliá · Guía para el oleh (gov.il) · respaldo: Kol Zchut</span>
          </div>
          <button
            onClick={() => setIsDetailOpen1(!isDetailOpen1)}
            className="min-h-[44px] text-[#6B4FA0] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isDetailOpen1 ? 'Menos detalle' : 'Ver detalle'}</span>
            {isDetailOpen1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Tarjeta: "¿Tienes dos trabajos? Haz el Teum Mas" */}
      <div id="teummas" className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">
              ¿Tienes dos trabajos? Haz el Teum Mas
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-0.5">
              Sin él, el segundo empleador te descuenta el 47%. Pon tus sueldos brutos.
            </p>
          </div>

          {/* Campos: sueldo del trabajo principal y del 2º trabajo */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-[26rem] shrink-0">
            {[
              { label: 'Sueldo principal', value: mainSalary, set: setMainSalary },
              { label: '2º sueldo', value: secondarySalary, set: setSecondarySalary },
            ].map(({ label, value, set }) => (
              <label key={label} className="block min-w-0">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {label}
                </span>
                <span className="bg-white border border-black/10 rounded-2xl px-3 py-2 flex items-center gap-1.5 min-h-[50px] shadow-2xs">
                  <span className="text-lg font-black text-[#0E2559]">₪</span>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={value}
                    onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full min-w-0 text-lg sm:text-xl font-black text-[#0E2559] bg-transparent focus:outline-none"
                  />
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 2 Barras Horizontales Comparativas */}
        <div className="space-y-4 pt-1">
          {/* Barra: Sin Teum Mas (47%) */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-1">Sin Teum Mas · 47% del 2º sueldo</span>
            <div className="w-full bg-amber-100/60 rounded-2xl h-12 overflow-hidden flex items-center p-1">
              <div 
                className="bg-[#C0392B] text-white font-extrabold h-full rounded-xl flex items-center justify-center px-2 whitespace-nowrap transition-all duration-300 shadow-2xs text-sm sm:text-base"
                style={{ width: '47%' }}
              >
                ₪ {taxWithout.toLocaleString('es-ES')}
              </div>
            </div>
          </div>

          {/* Barra: Con Teum Mas (~14%) */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-1">Con Teum Mas · ~{withPct}% según tus tramos</span>
            <div className="w-full bg-amber-100/60 rounded-2xl h-12 overflow-hidden flex items-center p-1">
              <div 
                className="bg-[#2A7050] text-white font-extrabold h-full rounded-xl flex items-center justify-center px-2 whitespace-nowrap transition-all duration-300 shadow-2xs text-sm sm:text-base"
                style={{ width: `${Math.max(18, (withPct / 47) * 47)}%` }}
              >
                ₪ {taxWith.toLocaleString('es-ES')}
              </div>
            </div>
          </div>
        </div>

        {/* Franja de Ahorro */}
        <div className="bg-[#E7F6EE] border border-[#2A7050]/20 rounded-2xl p-4 flex items-center gap-2.5 text-[#0E2559] font-bold text-sm sm:text-base">
          <Wallet className="w-5 h-5 text-[#2A7050] shrink-0" />
          <span>Te ahorras ~₪{taxSaved.toLocaleString('es-ES')} por mes.</span>
          <span className="ml-auto text-xs font-semibold text-slate-500 hidden sm:inline">Estimado con los tramos 2026, sin puntos de crédito</span>
        </div>

        {/* 3 Pasos */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 p-3.5 bg-slate-50/70 border border-black/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                1
              </div>
              <span className="text-sm sm:text-[15px] font-bold text-slate-800">
                Pide a cada empleador su Tik Nikuyim
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium sm:shrink-0 pl-9 sm:pl-0">
              Número de deducciones de 9 dígitos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 p-3.5 bg-slate-50/70 border border-black/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                2
              </div>
              <span className="text-sm sm:text-[15px] font-bold text-slate-800">
                Haz el Teum Mas en gov.il
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium sm:shrink-0 pl-9 sm:pl-0">
              Autoridad Tributaria · gratis
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 p-3.5 bg-slate-50/70 border border-black/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                3
              </div>
              <span className="text-sm sm:text-[15px] font-bold text-slate-800">
                Entrega el certificado al 2º trabajo
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium sm:shrink-0 pl-9 sm:pl-0">
              Vale por un año fiscal
            </span>
          </div>
        </div>

        {/* Detalle desplegable Card 2 */}
        {isDetailOpen2 && (
          <div className="mt-4 pt-4 border-t border-black/5 text-sm text-slate-700 space-y-2 bg-slate-50/80 p-5 rounded-2xl leading-relaxed">
            <p className="font-bold text-[#0E2559]">¿Por qué te descuentan el 47% y cómo evitarlo?</p>
            <p className="text-xs sm:text-sm text-slate-600">
              Si tienes más de un empleador y no haces el Teum Mas, cada uno te descuenta impuesto a la tasa máxima (47%).
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              El trámite es gratis y se hace online en el área personal de la Autoridad Tributaria. Vale por un año fiscal; muchas veces se renueva solo en enero. Si ya pagaste de más, el descuento extra vuelve en tu próximo sueldo.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              El Teum Mas es solo para el impuesto a las ganancias. Para el Bituaj Leumi hay que coordinar aparte.
            </p>
          </div>
        )}

        {/* Pie Card 2 */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-600 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
            <span>Fuente: Autoridad Tributaria · tramos 2026 (gov.il) · respaldo: Kol Zchut</span>
          </div>
          <button
            onClick={() => setIsDetailOpen2(!isDetailOpen2)}
            className="min-h-[44px] text-[#6B4FA0] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isDetailOpen2 ? 'Menos detalle' : 'Ver detalle'}</span>
            {isDetailOpen2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Tarjeta: Pikud HaOref → sección Guerra y emergencias */}
      <div id="pikud" className="bg-[#FCE8E5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-4">
        <span className="w-12 h-12 rounded-2xl bg-[#C0392B] text-white flex items-center justify-center shrink-0">
          <Bell className="w-6 h-6" />
        </span>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">Pikud HaOref y guerra</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5">
            Qué hacer en una alarma, tus derechos en el trabajo y qué pasa con las clases.
          </p>
        </div>
        <button
          type="button"
          onClick={goToWarSection}
          className="self-start md:self-center min-h-[44px] px-5 rounded-full bg-[#0E2559] hover:bg-[#153477] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowRight className="w-4 h-4 text-[#E8A33D]" />
          Ver Guerra y emergencias
        </button>
      </div>

    </div>
  );
};

export default CrisisCivilGuide;
