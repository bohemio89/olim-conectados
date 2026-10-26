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
  Bell
} from 'lucide-react';

export const CrisisCivilGuide: React.FC = () => {
  const [activeChip, setActiveChip] = useState<'salklita' | 'teummas' | 'pikud'>('salklita');

  // Card 1: Sal Klitá & Alquiler Month & Status
  const [aliyahMonth, setAliyahMonth] = useState<number>(14);
  const [statusDate, setStatusDate] = useState<'desde' | 'antes'>('desde');
  const [isDetailOpen1, setIsDetailOpen1] = useState(false);

  // Card 2: Teum Mas
  const [secondarySalary, setSecondarySalary] = useState<number>(3500);
  const [isDetailOpen2, setIsDetailOpen2] = useState(false);

  // Card 3: Pikud HaOref
  const [isDetailOpen3, setIsDetailOpen3] = useState(false);

  // Calculations for Teum Mas
  const taxWithout = Math.round(secondarySalary * 0.47);
  const taxWith = Math.round(secondarySalary * 0.14);
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
    if (statusDate === 'desde') {
      if (aliyahMonth <= 6) {
        return Math.max(4, Math.min(26, (aliyahMonth / 6) * 26));
      }
      if (aliyahMonth <= 30) {
        return 27 + ((aliyahMonth - 6) / 24) * 58;
      }
      return Math.min(94, 86 + ((aliyahMonth - 30) / 10) * 8);
    } else {
      if (aliyahMonth <= 7) {
        return Math.max(4, Math.min(24, (aliyahMonth / 7) * 24));
      }
      if (aliyahMonth <= 60) {
        return 25 + ((aliyahMonth - 7) / 53) * 60;
      }
      return 92;
    }
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

        {/* Selector: Mi estatus de olé es */}
        <div>
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Mi estatus de olé es
          </span>
          <div className="inline-flex flex-col sm:flex-row bg-slate-100/70 p-1 rounded-2xl border border-black/5 gap-1 w-full sm:w-auto">
            <button
              onClick={() => setStatusDate('desde')}
              className={`min-h-[44px] px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer text-center ${
                statusDate === 'desde'
                  ? 'bg-white text-[#0E2559] shadow-2xs border border-black/10'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Desde el 1-mar-2024
            </button>
            <button
              onClick={() => setStatusDate('antes')}
              className={`min-h-[44px] px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer text-center ${
                statusDate === 'antes'
                  ? 'bg-white text-[#0E2559] shadow-2xs border border-black/10'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Antes del 1-mar-2024
            </button>
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
                {statusDate === 'desde' ? 'Meses 7–30 · automática' : 'Mes 8 al final del año 5'}
              </span>
            </div>

            {/* Tramo 3 */}
            <div className="w-[14%] bg-amber-100/60 text-slate-700 px-3 py-2.5 flex flex-col justify-center border-l border-black/5">
              <span className="font-bold text-sm leading-tight">Fin</span>
              <span className="text-xs text-slate-500">
                {statusDate === 'desde' ? 'Mes 31+' : 'Año 6+'}
              </span>
            </div>
          </div>

          {/* Escala numérica inferior */}
          <div className="flex justify-between text-xs text-slate-500 font-semibold px-2 mt-2">
            <span>Mes 1</span>
            <span>{statusDate === 'desde' ? 'Mes 7' : 'Mes 8'}</span>
            <span>{statusDate === 'desde' ? 'Mes 31' : 'Año 6'}</span>
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
              {statusDate === 'desde' ? 'Meses 7–30 · automática' : 'Mes 8 al final del año 5'}
            </span>
          </div>

          <div className="bg-amber-100/60 text-slate-700 p-4">
            <span className="font-bold text-base block leading-tight">Fin</span>
            <span className="text-xs text-slate-500">
              {statusDate === 'desde' ? 'Mes 31+' : 'Año 6+'}
            </span>
          </div>
        </div>

        {/* Mensaje verde según el caso */}
        <div className="bg-[#E7F6EE] border border-[#2A7050]/20 rounded-2xl p-4 flex items-center gap-3 text-[#0E2559] text-sm sm:text-[15px] font-semibold">
          <CheckCircle2 className="w-5 h-5 text-[#2A7050] shrink-0" />
          <p>
            {statusDate === 'desde' ? (
              aliyahMonth <= 6 ? (
                <>Mes {aliyahMonth}: estás cobrando el <strong>Sal Klitá</strong> (7 pagos en 6 meses: el 1.º en el aeropuerto y 6 mensuales).</>
              ) : aliyahMonth <= 30 ? (
                <>Mes {aliyahMonth}: estás cobrando la <strong>ayuda de alquiler</strong>. Termina en el mes 30.</>
              ) : (
                <>Mes {aliyahMonth}: has superado el mes 30. El Sal Klitá y la ayuda de alquiler finalizaron reglamentariamente.</>
              )
            ) : (
              aliyahMonth <= 7 ? (
                <>Mes {aliyahMonth}: cobro del <strong>Sal Klitá</strong> (7 pagos en 6 meses).</>
              ) : aliyahMonth <= 60 ? (
                <>Mes {aliyahMonth}: estás en el período de <strong>ayuda de alquiler</strong>. Se cobra hasta el final del año 5.</>
              ) : (
                <>Mes {aliyahMonth}: has superado el año 5. La ayuda de alquiler finalizó reglamentariamente.</>
              )
            )}
          </p>
        </div>

        <p className="text-xs text-slate-500">
          Con estatus anterior al 1-mar-2024, la ayuda va del mes 8 al final del año 5.
        </p>

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
                {statusDate === 'desde'
                  ? ' Para quienes recibieron el estatus de olé a partir del 1 de marzo de 2024, la ayuda se abona de los meses 7 a 30 de forma automática en la cuenta bancaria.'
                  : ' Para quienes recibieron el estatus antes del 1 de marzo de 2024, la ayuda comienza en el mes 8 y se extiende hasta finalizar el año 5 desde la Aliá.'}
              </li>
              <li>
                No requiere renovaciones presenciales periódicas siempre que mantengas la misma cuenta bancaria y datos actualizados ante el Ministerio.
              </li>
            </ul>
          </div>
        )}

        {/* Pie Card 1 */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-600 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
            <span>Fuente: Procedimiento 429 · Ministerio de Construcción · gov.il · revisado oct 2026</span>
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
              Sin él, el segundo empleador retiene el 47%.
            </p>
          </div>

          {/* Campo: Sueldo bruto del 2º trabajo */}
          <div className="w-full md:w-56 shrink-0">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sueldo bruto del 2º trabajo
            </span>
            <div className="bg-white border border-black/10 rounded-2xl px-4 py-2 flex items-center gap-2 min-h-[50px] shadow-2xs">
              <span className="text-xl font-black text-[#0E2559]">₪</span>
              <input
                type="number"
                min={0}
                step={100}
                value={secondarySalary}
                onChange={(e) => setSecondarySalary(Math.max(0, Number(e.target.value) || 0))}
                className="w-full text-xl sm:text-2xl font-black text-[#0E2559] bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2 Barras Horizontales Comparativas */}
        <div className="space-y-4 pt-1">
          {/* Barra: Sin Teum Mas (47%) */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-1">Sin Teum Mas</span>
            <div className="w-full bg-amber-100/60 rounded-2xl h-12 overflow-hidden flex items-center p-1">
              <div 
                className="bg-[#C0392B] text-white font-extrabold h-full rounded-xl flex items-center justify-center px-4 transition-all duration-300 shadow-2xs text-sm sm:text-base"
                style={{ width: '47%' }}
              >
                ₪ {taxWithout.toLocaleString('es-ES')}
              </div>
            </div>
          </div>

          {/* Barra: Con Teum Mas (~14%) */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-1">Con Teum Mas</span>
            <div className="w-full bg-amber-100/60 rounded-2xl h-12 overflow-hidden flex items-center p-1">
              <div 
                className="bg-[#2A7050] text-white font-extrabold h-full rounded-xl flex items-center justify-center px-4 transition-all duration-300 shadow-2xs text-sm sm:text-base"
                style={{ width: '25%' }}
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
        </div>

        {/* 3 Pasos */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50/70 border border-black/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                1
              </div>
              <span className="text-sm sm:text-[15px] font-bold text-slate-800">
                Pide a cada empleador su Tik Nikuyim
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium shrink-0">
              Número de deducciones de 9 dígitos
            </span>
          </div>

          <div className="flex items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50/70 border border-black/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                2
              </div>
              <span className="text-sm sm:text-[15px] font-bold text-slate-800">
                Haz el Teum Mas en gov.il
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium shrink-0">
              Autoridad Tributaria · gratis
            </span>
          </div>

          <div className="flex items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50/70 border border-black/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B4FA0] text-white text-xs font-black flex items-center justify-center shrink-0">
                3
              </div>
              <span className="text-sm sm:text-[15px] font-bold text-slate-800">
                Entrega el certificado al 2º trabajo
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium shrink-0">
              Antes del cierre del sueldo
            </span>
          </div>
        </div>

        {/* Detalle desplegable Card 2 */}
        {isDetailOpen2 && (
          <div className="mt-4 pt-4 border-t border-black/5 text-sm text-slate-700 space-y-2 bg-slate-50/80 p-5 rounded-2xl leading-relaxed">
            <p className="font-bold text-[#0E2559]">¿Por qué se retiene el 47% y cómo evitarlo?</p>
            <p className="text-xs sm:text-sm text-slate-600">
              Por ley fiscal en Israel, los sistemas contables aplican automáticamente la tasa marginal más alta (47%) al segundo empleador si no se presenta un certificado de coordinación impositiva (Teum Mas).
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              El trámite es completamente gratuito y se completa en 5 minutos en el portal de la Autoridad Tributaria (Rashut HaMisim). Una vez obtenido el PDF, se envía al área de recursos humanos del segundo empleo antes del cierre mensual de nómina para que liquiden según tu escala real.
            </p>
          </div>
        )}

        {/* Pie Card 2 */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-600 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
            <span>Fuente: Autoridad de Impuestos · gov.il · revisado oct 2026</span>
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

      {/* 3. Tarjeta: Pikud HaOref */}
      <div id="pikud" className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-2xs space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">
            Pikud HaOref y seguridad civil
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5">
            Alarmas, refugios y pautas de emergencia.
          </p>
        </div>

        {/* Mensaje 1: App y refugio */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-950 text-sm sm:text-base font-semibold leading-relaxed">
          <Bell className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p>
            Instala la app del Pikud HaOref. Cuando suena la alarma, el refugio de un edificio tiene que estar accesible.
          </p>
        </div>

        {/* Mensaje 2: Derechos laborales */}
        <div className="bg-slate-50 border border-black/10 rounded-2xl p-4 flex items-start gap-3 text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
          <Briefcase className="w-5 h-5 text-[#6B4FA0] shrink-0 mt-0.5" />
          <p>
            Para tus derechos laborales en una emergencia, consulta al Ministerio de Trabajo: las reglas cambian según la situación.
          </p>
        </div>

        {/* Detalle desplegable Card 3 */}
        {isDetailOpen3 && (
          <div className="mt-4 pt-4 border-t border-black/5 text-sm text-slate-700 space-y-2 bg-slate-50/80 p-5 rounded-2xl leading-relaxed">
            <p className="font-bold text-[#0E2559]">Pautas clave de seguridad civil:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
              <li>
                <strong>Tipos de refugio:</strong> Mamad (habitación segura dentro del departamento), Mamak (refugio protegido en el palier del piso) o Miklat (refugio comunal en el subsuelo del edificio o público en la calle).
              </li>
              <li>
                <strong>Tiempos de alerta:</strong> Varían según la región del país (desde inmediatos/15 segundos en zonas fronterizas hasta 90 segundos en el centro del país). Conoce el tiempo de tu localidad.
              </li>
              <li>
                <strong>Normativa laboral en emergencias:</strong> Las compensaciones salariales y la suspensión de actividades presenciales se rigen por directivas emitidas por el Comando del Frente Interno y acuerdos específicos del Ministerio de Trabajo con Bituaj Leumi.
              </li>
            </ul>
          </div>
        )}

        {/* Pie Card 3 */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-600 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
            <span>Fuente: Pikud HaOref y Ministerio de Trabajo · gov.il · revisado oct 2026</span>
          </div>
          <button
            onClick={() => setIsDetailOpen3(!isDetailOpen3)}
            className="min-h-[44px] text-[#6B4FA0] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isDetailOpen3 ? 'Menos detalle' : 'Ver detalle'}</span>
            {isDetailOpen3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default CrisisCivilGuide;
