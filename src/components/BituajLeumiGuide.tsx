import React, { useState } from 'react';
import { 
  Briefcase, 
  AlertOctagon, 
  FileCheck, 
  Stethoscope, 
  CheckSquare, 
  Copy, 
  Check, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  FileWarning
} from 'lucide-react';

export const BituajLeumiGuide: React.FC = () => {
  const [selectedInjuryType, setSelectedInjuryType] = useState<'repetitive' | 'acute'>('repetitive');
  const [copiedPhrase, setCopiedPhrase] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  const toggleStep = (key: string) => {
    setCheckedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hebrewPhrases = {
    repetitive: {
      hebrew: 'אני עובד בעבודה פיזית הכוללת תנועות חוזרות ונשנות. הכאב ביד ובשורש כף היד החל והחמיר עקב העבודה (מיקרוטראומה / תסמונת דה קרוון / תעלה קרפלית). אבקש לציין במפורש בסיכום הרפואי שהפגיעה נגרמה בעבודה.',
      transliteration: 'Ani oved be-avodá fizit ha-kolelet tnuot jozrot ve-nishnot. Ha-keev ba-yad ve-be-shoresh kaf ha-yad hejel ve-hejmir ekev ha-avodá. Evakesh letzayen be-meforash ba-sijum ha-refuati she-ha-pgiá nigremá ba-avodá.',
      spanish: 'Trabajo en tareas físicas con movimientos repetitivos. El dolor en mi mano y muñeca comenzó y empeoró debido al trabajo (microtraumatismo / tendinitis de De Quervain / túnel carpiano). Pido que conste expresamente en el resumen médico que la afección se produjo EN EL TRABAJO.',
    },
    acute: {
      hebrew: 'נפגעתי בתאונה תוך כדי ועקב עבודתי (או בדרך לעבודה). אבקש לרשום בסיכום שהאירוע התרחש בעבודה, לרבות שעת האירוע ונסיבותיו המדויקות.',
      transliteration: 'Nifgati be-teuná toj kdé ve-ekev avodatí (o ba-derej la-avodá). Evakesh lirshom ba-sijum she-ha-eruá hitrajez ba-avodá.',
      spanish: 'Sufrí un accidente durante y como consecuencia de mi trabajo (o en el trayecto). Pido asentar en el informe médico que el hecho ocurrió en el trabajo, con la hora y circunstancias exactas.',
    },
  };

  const activePhrase = hebrewPhrases[selectedInjuryType];

  const handleCopyPhrase = () => {
    navigator.clipboard.writeText(activePhrase.hebrew);
    setCopiedPhrase(true);
    setTimeout(() => setCopiedPhrase(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Red Alert Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-300" />
            <span>Trampas Burocráticas Evitables</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Accidentes Laborales, Tendinitis y Bituaj Leumi
          </h1>
          <p className="mt-2 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Una lesión por esfuerzo repetitivo (tendinitis de De Quervain, túnel carpiano en cocina, construcción o informática) o un golpe en el trabajo <strong>deben documentarse con precisión quirúrgica desde el primer minuto</strong>. Si el primer médico no escribe expresamente que ocurrió trabajando, <strong>Bituaj Leumi desestimará tu reclamo</strong>.
          </p>
        </div>
      </div>

      {/* The 3 Golden Steps Protocol */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          El Protocolo de Oro de 3 Pasos
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Sigue este orden estricto para no perder la indemnización ni el salario por baja laboral (Dmei Pgiá):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Step 1 */}
          <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Avisar al Empleador y Pedir el BL 250
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Notifica de inmediato a tu supervisor o RRHH y exige el <strong>Formulario BL 250 (Tofes Dmei Pgiá)</strong> firmado y sellado por la empresa.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-semibold text-blue-800 bg-white p-2.5 rounded-lg border border-blue-200">
              📌 Debe detallar fecha, hora y descripción exacta de la tarea que provocó la lesión.
            </div>
          </div>

          {/* Step 2 */}
          <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                La Clave Médica: "Be-Avodá"
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                En tu primera visita médica (Kupá o guardia), exige que en el resumen (<strong>sijum majalí</strong>) figure por escrito que el dolor se produjo trabajando.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-bold text-amber-900 bg-white p-2.5 rounded-lg border border-amber-200">
              ⚠️ Si el médico omite escribir "be-avodá" [בעבודה], Bituaj Leumi considerará que fue una afección común.
            </div>
          </div>

          {/* Step 3 */}
          <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Turno con Médico Ocupacional (Rofé Taasukatí)
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Saca turno urgente con el <strong>Rofé Taasukatí</strong> [רופא תעסוקתי] de tu Kupá. Solo su dictamen de incapacidad laboral tiene validez plena para el subsidio.
              </p>
            </div>
            <div className="mt-4 text-[11px] font-semibold text-emerald-900 bg-white p-2.5 rounded-lg border border-emerald-200">
              📑 Es quien determina los días de reposo o restricciones para que el empleador adapte tu puesto.
            </div>
          </div>
        </div>
      </div>

      {/* Hebrew Script Assistant: What to show to the Doctor */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-indigo-600" />
              Generador de Frase Exacta para Mostrarle al Médico
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Si tu hebreo no es fluido, abre esta pantalla frente al doctor en la consulta o cópialo en un mensaje:
            </p>
          </div>

          {/* Selector Type */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedInjuryType('repetitive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                selectedInjuryType === 'repetitive'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tendinitis / Esfuerzo Repetitivo
            </button>
            <button
              onClick={() => setSelectedInjuryType('acute')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                selectedInjuryType === 'acute'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Accidente / Golpe Directo
            </button>
          </div>
        </div>

        {/* Phrase Display */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 space-y-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded uppercase">
              Texto en Hebreo (Muéstrale la pantalla al profesional):
            </span>
            <div className="mt-2 text-right font-hebrew text-lg font-bold text-indigo-950 bg-white p-4 rounded-xl border border-indigo-200 shadow-inner">
              {activePhrase.hebrew}
            </div>
          </div>

          <div className="text-xs text-gray-600">
            <strong>Traducción:</strong> {activePhrase.spanish}
          </div>

          <button
            onClick={handleCopyPhrase}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition"
          >
            {copiedPhrase ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar texto en Hebreo para WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Verification Checklist */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          Checklist de Documentos para Presentar ante Bituaj Leumi
        </h3>

        <div className="space-y-2.5">
          {[
            {
              id: 'step1',
              title: 'Formulario BL 250 (Tofes 250)',
              desc: 'Completado, firmado y sellado por el empleador con los datos de tu puesto y descripción del siniestro.',
            },
            {
              id: 'step2',
              title: 'Primer Informe Médico (Sijum Majalí Inicial)',
              desc: 'Donde consta expresamente que el dolor o lesión empezó en el trabajo ("be-avodá").',
            },
            {
              id: 'step3',
              title: 'Certificado de Incapacidad Ocupacional (Ishur Rofé Taasukatí)',
              desc: 'Dictamen oficial del médico laboral que determina los días de reposo o adecuación de tareas.',
            },
            {
              id: 'step4',
              title: 'Últimos 3 Recibos de Sueldo (Tlush Sajar)',
              desc: 'Para calcular el promedio de tu salario de los meses previos a la lesión.',
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => toggleStep(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                checkedSteps[item.id]
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="mt-0.5">
                {checkedSteps[item.id] ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
                )}
              </div>
              <div className="text-xs">
                <p className="font-bold">{item.title}</p>
                <p className="text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
