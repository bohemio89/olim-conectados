import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Coins, 
  FileSpreadsheet, 
  Plane, 
  Bus, 
  Vote, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  ExternalLink, 
  Calendar,
  Building2,
  Percent,
  Info
} from 'lucide-react';

export const CrisisCivilGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'salklita' | 'teummas' | 'pikud' | 'darkon' | 'transporte' | 'kneset'>('salklita');

  // Interactive Calculator for Sal Klitá / Alquiler month check
  const [aliyahMonthInput, setAliyahMonthInput] = useState<number>(14);

  // Interactive Calculator for Teum Mas
  const [secondaryJobSalary, setSecondaryJobSalary] = useState<number>(3500);

  const taxWithoutTeumMas = Math.round(secondaryJobSalary * 0.47);
  const estimatedTaxWithTeumMas = Math.round(secondaryJobSalary * 0.14); // Average progressive bracket for secondary modest job
  const taxSaved = taxWithoutTeumMas - estimatedTaxWithTeumMas;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span>Módulo Oficial de Crisis, Economía y Vida Civil</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sal Klitá, Alquiler, Pluriempleo, Guerra y Pasaportes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Plazos reglamentarios exactos de subsidios (corte en el mes 30), cómo evitar que te retengan el <strong>47%</strong> en tu segundo empleo (**Teum Mas**), tus derechos laborales ante alertas de <strong>Pikud HaOref</strong> y advertencias con la <strong>Teudat Ma'avar</strong>.
          </p>
        </div>
      </div>

      {/* Sub-Navigation Switcher */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto pb-1">
        {[
          { id: 'salklita', label: 'Sal Klitá & Alquiler (Mes 30)', icon: Coins },
          { id: 'teummas', label: 'Pluriempleo & Teum Mas (47%)', icon: Percent },
          { id: 'pikud', label: 'Laboral en Guerra (Pikud HaOref)', icon: ShieldAlert },
          { id: 'darkon', label: 'Darkón vs Teudat Ma\'avar', icon: Plane },
          { id: 'transporte', label: 'Transporte en Jagim y Shabat', icon: Bus },
          { id: 'kneset', label: 'Sistema Electoral (Knéset)', icon: Vote },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 11. Sal Klitá y Subsidio de Alquiler */}
      {activeSubTab === 'salklita' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Misrad HaAliyah ve-haKlitá
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Sal Klitá (סל קליטה) y Ayuda de Alquiler (סיוע בשכר דירה)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Cronograma cronológico de depósitos bancarios y el porqué del cese al finalizar el mes 30.
            </p>
          </div>

          {/* Visual Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-800 bg-blue-200 px-2 py-0.5 rounded">
                  ETAPA 1 · Meses 1 a 6
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-2">
                  Sal Klitá (Canasta Básica)
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Se abona en <strong>6 cuotas</strong>: el primer pago en efectivo/depósito al arribar al aeropuerto Ben Gurion, seguido de <strong>5 cuotas mensuales directas a tu cuenta bancaria</strong>.
                </p>
              </div>
              <div className="mt-3 text-[11px] text-blue-700 font-semibold bg-white p-2 rounded-lg border border-blue-100">
                ✔️ Diseñado para sostenimiento durante el ulpán inicial.
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
                  ETAPA 2 · Meses 7 a 30
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-2">
                  Subsidio de Alquiler (Siyua bi'Sjirot)
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Inicia <strong>automáticamente en el mes 7</strong> (al terminar el Sal Klitá). Tiene una duración estricta de <strong>24 meses consecutivos</strong> (aprox. 200 a 400 NIS mensuales según estado civil y familia).
                </p>
              </div>
              <div className="mt-3 text-[11px] text-emerald-800 font-semibold bg-white p-2 rounded-lg border border-emerald-100">
                ✔️ No requiere trámite si no cambiaste de cuenta de banco.
              </div>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-800 bg-rose-200 px-2 py-0.5 rounded">
                  ETAPA 3 · Mes 31 en Adelante
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-2">
                  Fin Reglamentario Definitivo
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Al cumplir el <strong>mes 30 desde tu Aliá</strong>, el beneficio cesa de manera automática por ley reglamentaria del Ministerio de Vivienda y Aliá.
                </p>
              </div>
              <div className="mt-3 text-[11px] text-rose-900 font-bold bg-white p-2 rounded-lg border border-rose-200">
                ⚠️ Si dejaste de cobrar en el mes 30, no es un error bancario: es el vencimiento legal del beneficio.
              </div>
            </div>
          </div>

          {/* Interactive Aliyah Month Checker */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              Comprobador de Beneficio por Mes de Aliá:
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-xs text-gray-700 font-medium">
                ¿Cuántos meses llevas en Israel desde tu fecha de llegada?
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={36}
                  value={aliyahMonthInput}
                  onChange={(e) => setAliyahMonthInput(Number(e.target.value))}
                  className="w-40 accent-blue-600"
                />
                <span className="font-mono font-bold text-xs bg-white px-2 py-1 rounded border border-gray-300">
                  Mes {aliyahMonthInput}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border text-xs bg-white">
              {aliyahMonthInput <= 6 && (
                <div className="text-blue-900">
                  <strong>Estado:</strong> Te encuentras en el período de <strong>Sal Klitá (סל קליטה)</strong>. Debes recibir la cuota {aliyahMonthInput} de 6 directamente de Misrad HaAliyah.
                </div>
              )}
              {aliyahMonthInput >= 7 && aliyahMonthInput <= 30 && (
                <div className="text-emerald-900">
                  <strong>Estado:</strong> Te encuentras en el período de <strong>Ayuda de Alquiler (סיוע בשכר דירה)</strong>. Estás en el mes {aliyahMonthInput - 6} de los 24 meses totales de subsidio de vivienda. El cobro continuará hasta el mes 30.
                </div>
              )}
              {aliyahMonthInput > 30 && (
                <div className="text-rose-900">
                  <strong>Estado:</strong> Has superado el <strong>mes 30</strong>. Por normativa de absorción, la ayuda financiera general y de alquiler finalizó definitivamente.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 12. Pluriempleo y Teum Mas */}
      {activeSubTab === 'teummas' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
              Alerta Impositiva de Pluriempleo
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Dos o Más Empleos Simultáneos y el Trámite de Teum Mas (תיאום מס)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Cómo evitar que el segundo empleador te retenga por ley el 47% de impuesto a las ganancias.
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-xs text-rose-950 space-y-1">
            <strong className="block font-bold text-rose-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              ¡Peligro de retención confiscatoria del 47%!
            </strong>
            <p className="leading-relaxed">
              En Israel, si comienzas a trabajar en un segundo empleo (o das clases particulares contratadas, limpieza, guardias o consultoría) y no presentas la coordinación fiscal (**Teum Mas**), el software contable del segundo empleador <strong>está forzado por ley a retener el 47%</strong> en concepto de Mas Hajnasá en tu recibo de sueldo (**tlush sajar**).
            </p>
          </div>

          {/* Interactive Calculator Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Simulador del Segundo Empleo:
              </h3>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Sueldo Bruto Estimado en el 2º Trabajo:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={secondaryJobSalary}
                    onChange={(e) => setSecondaryJobSalary(Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs font-bold px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-gray-700">NIS</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between items-center text-rose-700 bg-rose-100/60 p-2 rounded-lg">
                  <span>Retención SIN Teum Mas (47%):</span>
                  <strong className="font-mono">-{taxWithoutTeumMas} NIS</strong>
                </div>

                <div className="flex justify-between items-center text-emerald-800 bg-emerald-100/60 p-2 rounded-lg">
                  <span>Retención CON Teum Mas (~14%):</span>
                  <strong className="font-mono">-{estimatedTaxWithTeumMas} NIS</strong>
                </div>

                <div className="p-2.5 bg-blue-600 text-white rounded-lg flex justify-between items-center font-bold">
                  <span>Dinero que salvas en tu bolsillo:</span>
                  <span className="font-mono text-sm">+{taxSaved} NIS / mes</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2 text-xs">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cómo hacer el Teum Mas Digital (Gratis):
              </h3>
              <ol className="list-decimal pl-4 space-y-1.5 text-gray-700">
                <li>
                  <strong>Pide los Tik Nikuyim:</strong> Solicita al departamento de RRHH de cada empresa su número de deducción patronal (**Tik Nikuyim** [תיק ניכויים] de 9 dígitos).
                </li>
                <li>
                  <strong>Ingresa a gov.il:</strong> Entra al portal de **Rashut HaMisim** (Autoridad Tributaria) en la sección <em>"Teum Mas be-Internet"</em>.
                </li>
                <li>
                  <strong>Define Empleador Principal:</strong> Indica dónde recibes tu ingreso principal (allí se aplican tus **Nekudot Zijui** de olé jadash).
                </li>
                <li>
                  <strong>Descarga y Entrega:</strong> El sistema emite certificados automáticos en PDF con el porcentaje exacto de retención. <strong>Entrégalos de inmediato a RRHH del segundo trabajo</strong> antes del cierre de planilla.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* 13. Protocolo Laboral en Estado de Guerra */}
      {activeSubTab === 'pikud' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              Pikud HaOref (Comando del Frente Interno)
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Derechos Laborales en Estado de Guerra y Emergencia
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Protección legal frente a despidos, falta de refugio (Mamad/Miklat) y vacaciones forzadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 space-y-2">
              <h3 className="font-bold text-red-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Prohibición Estricta de Despido
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Si las directivas de **Pikud HaOref** prohíben la actividad presencial en tu zona o si tu lugar de trabajo **no cuenta con refugio protegido (Mamad [ממ"ד] o Miklat [מקלט])** alcanzable en el tiempo de alarma, <strong>la ley prohíbe que el empleador te despida</strong> por no concurrir.
              </p>
              <div className="bg-white p-2 rounded border border-red-200 text-red-900 font-semibold text-[11px]">
                Aplica también si debes quedarte al cuidado de tus hijos menores por suspensión escolar oficial.
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
              <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-amber-600" />
                Vacaciones Forzadas Ilegales
              </h3>
              <p className="text-gray-700 leading-relaxed">
                El empleador **NO puede descontar días de vacaciones de forma arbitraria** si no dispones de saldo positivo acumulado en tu haber.
              </p>
              <div className="bg-white p-2 rounded border border-amber-200 text-amber-950 font-semibold text-[11px]">
                No es legal que el empleador te deje con días de vacaciones en "negativo" sin tu consentimiento explícito.
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
              <h3 className="font-bold text-blue-950 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-blue-600" />
                Sueldos y Compensación Bituaj Leumi
              </h3>
              <p className="text-gray-700 leading-relaxed">
                En emergencias declaradas (**Matzav Meiyujad ba-Oref**), el Estado suscribe acuerdos colectivos con **Bituaj Leumi** y la Histadrut para subsidiar los salarios de las empresas afectadas y resguardar el ingreso de los trabajadores.
              </p>
              <div className="bg-white p-2 rounded border border-blue-200 text-blue-900 font-semibold text-[11px]">
                El empleador tramita el reembolso de salarios directamente ante Bituaj Leumi.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 14. Darkón vs Teudat Ma'avar */}
      {activeSubTab === 'darkon' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
              Misrad HaPnim (Ministerio del Interior)
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Pasaporte Israelí (Darkón) vs. Teudat Ma'avar (Documento Provisorio)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              La regla del primer año de residencia y la advertencia crítica sobre visados de viaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">
                  Darkón Regular (דרכון ישראלי)
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Pasaporte Estándar
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Es el pasaporte biométrico azul oficial del Estado de Israel.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                <li><strong>Requisito temporal:</strong> Como norma general, el olé debe acreditar <strong>al menos 1 año (12 meses)</strong> de residencia efectiva y centro de vida en Israel.</li>
                <li><strong>Exenciones de visa:</strong> Cuenta con todos los convenios bilaterales internacionales de ingreso libre sin visa (Unión Europea, Reino Unido, etc.).</li>
              </ul>
            </div>

            <div className="bg-amber-50/80 p-5 rounded-xl border border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-950 text-sm">
                  Teudat Ma'avar (תעודת מעבר)
                </h3>
                <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Documento Provisorio
                </span>
              </div>
              <p className="text-amber-900 leading-relaxed">
                Documento de viaje oficial (Travel Document in Lieu of Passport) expedido si el olé necesita viajar al exterior <strong>antes de cumplir su primer año</strong>.
              </p>
              <div className="bg-white p-3 rounded-lg border border-amber-300 text-amber-950 space-y-1">
                <strong className="block text-rose-700 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> ¡ADVERTENCIA CRÍTICA DE VISADOS!
                </strong>
                <p className="text-[11px] leading-relaxed">
                  Muchos países que permiten la entrada libre a portadores de Darkón <strong>NO reconocen automáticamente la Teudat Ma'avar</strong>. Debes consultar siempre a la embajada de destino si requieres tramitar una <u>visa consular previa</u> antes de comprar tus pasajes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 15. Transporte Público en Jagim y Shabat */}
      {activeSubTab === 'transporte' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Israel Railways & Colectivos
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Transporte Público en Shabat y Festividades (Jagim)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Cese anticipado en vísperas, paralización en Iom Kipur y frecuencias de Jol HaMoed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                Vísperas de Fiesta (Erev Jag)
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tanto trenes como colectivos interurbanos dejan de funcionar <strong>varias horas antes del anochecer</strong> (generalmente entre las 14:00 y las 16:30 según la época del año).
              </p>
              <div className="text-[11px] text-blue-800 font-semibold bg-blue-50 p-2 rounded">
                Planifica llegar a destino con al menos 2 horas de anticipación antes de la caída del sol.
              </div>
            </div>

            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
              <h3 className="font-bold text-rose-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Iom Kipur (Cese Absoluto)
              </h3>
              <p className="text-rose-900 leading-relaxed">
                Durante Iom Kipur, la paralización del transporte terrestre, marítimo y aéreo en Israel es del <strong>100%</strong>. No circulan colectivos, trenes ni automóviles particulares (salvo ambulancias y seguridad).
              </p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
              <h3 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Jol HaMoed (חול המועד)
              </h3>
              <p className="text-emerald-900 leading-relaxed">
                En los días intermedios de Pésaj y Sucot, el transporte público <strong>SÍ opera</strong>, pero con esquemas especiales o de horario de vacaciones. Consulta siempre en Moovit o Rav-Kav Online.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 16. Sistema Político y Elecciones (Knéset) */}
      {activeSubTab === 'kneset' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
              Democracia Parlamentaria
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Sistema Electoral y Político: La Knéset (הכנסת)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Voto optativo, listas partidarias y la regla de los 61 escaños para formar coalición.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Vote className="w-4 h-4 text-indigo-600" />
                El Sufragio es Optativo (No Obligatorio)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                En Israel no existe obligación legal ni multa por no concurrir a votar. Todo ciudadano mayor de 18 años inscripto en el padrón electoral (**Pinkas Bojarim**) recibe una notificación con su centro de votación.
              </p>
              <div className="bg-white p-3 rounded-lg border border-gray-200 text-[11px] text-gray-600">
                📌 <strong>Iom Shabaton:</strong> El día de elecciones generales nacionales es feriado no laborable pago en todo el país.
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                Los 120 Escaños y la Regla de los 61
              </h3>
              <p className="text-gray-700 leading-relaxed">
                No se vota directamente a un candidato individual para Primer Ministro, sino a una **lista cerrada de partido** para los **120 escaños de la Knéset**.
              </p>
              <div className="bg-white p-3 rounded-lg border border-gray-200 text-[11px] text-gray-700">
                🤝 <strong>Coalición de Gobierno:</strong> Para gobernar, se debe tejer una alianza parlamentaria que alcance al menos <strong>61 votos de confianza</strong> en el parlamento.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
