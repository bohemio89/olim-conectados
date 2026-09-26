import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Ambulance, 
  Hospital, 
  PhoneCall, 
  Clock, 
  CheckCircle, 
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const EmergencyGuide: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('fiebre-nocturna');
  const [copiedText, setCopiedText] = useState(false);

  const scenarios: Record<string, {
    title: string;
    description: string;
    level: 'danger' | 'warning' | 'safe';
    verdict: string;
    route: string[];
    costWarning: string;
    recommendedAction: string;
  }> = {
    'fiebre-nocturna': {
      title: 'Fiebre alta o malestar general a las 2:00 AM (Sin riesgo de vida)',
      description: 'Sientes fiebre de 39°C o dolor de garganta fuerte un sábado o noche con Kupá cerrada.',
      level: 'warning',
      verdict: '¡NO vayas directo a la guardia del hospital (Miún)!',
      route: [
        '1. Entra a la App de tu Kupá (Maccabi / Clalit) y usa la Telemedicina 24/7.',
        '2. Si requieres examen presencial, acude a Terem (טרם) o Bikur Rofé (ביקור רופא). El copago es de solo aprox. 40 - 90 NIS.',
        '3. Si el médico de Terem evalúa gravedad, él mismo emitirá la derivación (Hafniá) oficial para el hospital.',
      ],
      costWarning: 'Si vas directo al hospital sin Hafniá pagarás una factura de 700 a 1.200 NIS que la Kupá NO te devolverá.',
      recommendedAction: 'Llama al *3555 (Maccabi) o *2700 (Clalit) o acude a la clínica Terem más cercana.',
    },
    'riesgo-vital': {
      title: 'Dolor opresivo de pecho, asfixia o pérdida de consciencia',
      description: 'Síntomas cardiovasculares, ACV (parálisis facial o brazo) o traumatismo severo.',
      level: 'danger',
      verdict: '¡URGENCIA INMEDIATA: Llama al 101 (MADA) o ve al Miún más cercano!',
      route: [
        '1. Llama de inmediato a MADA (Ambulancia al 101).',
        '2. Traslado directo al Miún (Guardia de emergencias hospitalarias).',
        '3. Si el paciente queda internado (Ishpuz), la factura de MADA queda exenta o cubierta al 100% por la Kupá.',
      ],
      costWarning: 'En casos de riesgo vital evidente o internación médica posterior, la ley exime de costos tras tramitar el Tofes 17.',
      recommendedAction: 'Marcar 101 sin demora. Proporcionar dirección exacta en Israel.',
    },
    'accidente-fractura': {
      title: 'Fractura ósea evidente, corte profundo con hemorragia o quemadura',
      description: 'Accidente doméstico o en la calle con hueso visible o herida punzante.',
      level: 'danger',
      verdict: 'Acude a Terem traumatológico o directamente a Miún.',
      route: [
        '1. Si estás cerca de un Terem con rayos X, te atenderán más rápido que en un gran hospital.',
        '2. Si vas a Miún por fractura desplazada comprobada con radiografía, la Kupá otorga la cobertura por criterio de urgencia traumática.',
        '3. Solicita siempre el resumen de alta (Sijum Miún) para la posterior solicitud del Tofes 17.',
      ],
      costWarning: 'Las fracturas confirmadas por rayos X suelen tener exención legal de cobro hospitalario.',
      recommendedAction: 'Acudir a urgencias. Guardar radiografías e informe médico.',
    },
    'accidente-trabajo': {
      title: 'Accidente mientras trabajabas o en el trayecto de ida/vuelta',
      description: 'Caída en la oficina, corte en taller o choque en el trayecto al trabajo.',
      level: 'warning',
      verdict: 'Exige el formulario BL 250 de tu empleador y di "Be-Avodá".',
      route: [
        '1. Notifica al empleador de inmediato y pide el Tofes BL 250.',
        '2. En la guardia, recalca al médico: "Zot teunát avodá" (esto es un accidente laboral).',
        '3. El resumen médico debe decir que ocurrió trabajando para que Bituaj Leumi cubra los gastos y el salario.',
      ],
      costWarning: 'Si el médico NO pone que fue en el trabajo, Bituaj Leumi rechazará el pago y el hospital te cobrará a ti.',
      recommendedAction: 'Guardar copia de cada papel y pedir turno urgente con el Rofé Taasukatí.',
    },
  };

  const currentScenario = scenarios[selectedScenario];

  const hebrewPhraseForHafnia = 'אני צריך הפניה למיון כדי שהקופה תכסה את הביקור בבית החולים.';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hebrewPhraseForHafnia);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Red Alert Header */}
      <div className="bg-gradient-to-br from-rose-700 via-red-800 to-rose-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/5 rounded-full blur-2xl"></div>
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-rose-600/60 border border-rose-400/50 text-rose-100 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Alerta Económica Médica para Olim</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ¿Cuándo ir a Guardia (Miún) y cómo evitar cobros de cientos de shékels?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-rose-100/90 leading-relaxed">
            El hospital en Israel <strong>NO es gratuito</strong> para consultas espontáneas. Si vas a la guardia (<strong>Miún</strong> [מיון]) sin derivación (<strong>hafniá</strong> [הפניה]), recibirás una factura de hasta <strong>1.000+ NIS</strong> que la Kupá no reembolsa. Sigue la ruta escalonada oficial para cuidar tu salud y tu bolsillo.
          </p>
        </div>
      </div>

      {/* The 3-Tier Official Escalation Route */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          La Ruta Escalonada Oficial para No Pagar de Más
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Aprende el orden correcto según el horario y la gravedad de los síntomas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Step 1 */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 bg-blue-200/80 px-2 py-0.5 rounded">
                  NIVEL 1 · Horario Hábil
                </span>
                <span className="text-xs font-bold text-emerald-600">Copago: 0 NIS</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-2">
                Médico de Cabecera (Rofé Mishpajá)
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Clínica barrial de tu Kupá o telemedicina en la app. Es el único que emite <strong>hafniot</strong> sin costo para estudios, especialistas o guardia.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-blue-700 font-semibold bg-white/70 p-2 rounded-lg border border-blue-100">
              💡 Tip: Muchas Kupot tienen médico de guardia online 24/7 en la aplicación móvil.
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  NIVEL 2 · Noches y Shabat
                </span>
                <span className="text-xs font-bold text-amber-800">Copago: ~40 - 90 NIS</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-2">
                Centros Intermedios (Terem / Bikur Rofé)
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Centros de urgencia ambulatoria cuando la Kupá está cerrada. Cuentan con rayos X, análisis de sangre y suturas.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-amber-900 font-semibold bg-white/70 p-2 rounded-lg border border-amber-100">
              🔑 Si tu cuadro requiere hospital, ellos te extienden la <strong>hafniá</strong> para que el Miún sea gratuito.
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 bg-rose-200/80 px-2 py-0.5 rounded">
                  NIVEL 3 · Emergencia Grave
                </span>
                <span className="text-xs font-bold text-rose-800">Sin hafniá: 700 - 1200 NIS</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-2">
                Hospital General (Miún)
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Guardia de alta complejidad (Ichilov, Sheba, Hadassah, Rambam, etc.). Solo acudir con:
              </p>
              <ul className="text-[11px] text-gray-700 list-disc pl-4 mt-1 space-y-0.5">
                <li>Derivación escrita (**hafniá**)</li>
                <li>Riesgo vital o traumatismo severo</li>
                <li>Internación efectiva (**ishpuz**)</li>
              </ul>
            </div>
            <div className="mt-3 text-[11px] text-rose-800 font-bold bg-white/80 p-2 rounded-lg border border-rose-200">
              ⚠️ Sin internación ni hafniá, el costo corre por tu cuenta.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Triage Selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              Simulador de Triage: ¿A dónde debo acudir en mi caso?
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Selecciona tu situación clínica actual para ver la recomendación económica y médica:
            </p>
          </div>
        </div>

        {/* Scenario Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
          {Object.entries(scenarios).map(([key, sc]) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`p-3 text-left rounded-xl border transition-all text-xs font-medium ${
                selectedScenario === key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <p className="font-bold line-clamp-2">{sc.title}</p>
            </button>
          ))}
        </div>

        {/* Selected Scenario Output */}
        <div className="mt-5 p-5 rounded-xl border border-blue-100 bg-blue-50/40 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  currentScenario.level === 'danger'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {currentScenario.level === 'danger' ? 'Prioridad Médica Alta' : 'Atención Ambulatoria Recomendada'}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">{currentScenario.verdict}</h3>
              <p className="text-xs text-gray-600 mt-0.5">{currentScenario.description}</p>
            </div>
          </div>

          {/* Route Steps */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Conducta recomendada paso a paso:
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              {currentScenario.route.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost warning & direct action */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-rose-900">
              <strong className="block font-bold text-rose-950 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Riesgo de Facturación:
              </strong>
              {currentScenario.costWarning}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-900">
              <strong className="block font-bold text-emerald-950 mb-1 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Acción Inmediata:
              </strong>
              {currentScenario.recommendedAction}
            </div>
          </div>
        </div>
      </div>

      {/* MADA Ambulance Rules & Exemption Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MADA Ambulance Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Ambulance className="w-5 h-5" />
            Ambulancias MADA (Maguen David Adom - 101)
          </div>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            Cuando pides una ambulancia, MADA emite una factura legal (aproximadamente 400 a 850 NIS dependiendo de la hora y distancia).
          </p>

          <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-200 space-y-2 text-xs">
            <p className="font-bold text-gray-800">¿Cuándo queda exenta o cubierta al 100%?</p>
            <div className="space-y-1.5 text-gray-700">
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Si el paciente queda internado (Ishpuz):</strong> El hospital sella la exención y la Kupá lo absorbe automáticamente.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Parto activo:</strong> Si da a luz dentro de las 24 horas del traslado en ambulancia.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Accidente de tránsito:</strong> Cubierto por el seguro obligatorio del vehículo (Bituaj Jov).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">✖</span>
                <span><strong>Si no queda internado y no había riesgo de vida vital:</strong> La factura de MADA debe abonarse (o gestionar copago del 50% según la póliza complementaria de la Kupá).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hebrew Helper Box for Hafnia Request */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Hospital className="w-5 h-5" />
              Frase Clave para Solicitar la Hafniá (הפניה)
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Si estás en un centro Terem o hablando con la telemedicina de tu Kupá y consideras que necesitas ir al hospital, muéstrale o dile esta frase exacta:
            </p>

            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-right font-hebrew text-base font-bold text-blue-950">
              "{hebrewPhraseForHafnia}"
            </div>
            <p className="text-xs text-gray-500 mt-1 italic">
              "Necesito una derivación (hafniá) a la guardia para que la Kupá cubra la visita al hospital."
            </p>
          </div>

          <button
            onClick={copyToClipboard}
            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Frase en Hebreo Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar texto en Hebreo para WhatsApp o mostrar al médico</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-600" />
          Teléfonos de Urgencias y Centrales Médicas en Israel
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-rose-800 uppercase">Ambulancia MADA</span>
            <p className="text-xl font-black text-rose-700 mt-1">101</p>
            <p className="text-[10px] text-rose-600">Emergencia médica vital</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-blue-800 uppercase">Maccabi Central</span>
            <p className="text-xl font-black text-blue-700 mt-1">*3555</p>
            <p className="text-[10px] text-blue-600">Turnos y telemedicina 24/7</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-emerald-800 uppercase">Clalit Central</span>
            <p className="text-xl font-black text-emerald-700 mt-1">*2700</p>
            <p className="text-[10px] text-emerald-600">Línea de enfermería 24h</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-purple-800 uppercase">Terem Urgencias</span>
            <p className="text-xl font-black text-purple-700 mt-1">*2884</p>
            <p className="text-[10px] text-purple-600">Centros de guardia ambulatoria</p>
          </div>
        </div>
      </div>
    </div>
  );
};
