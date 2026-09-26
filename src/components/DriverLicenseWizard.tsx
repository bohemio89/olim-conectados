import React, { useState } from 'react';
import { 
  Car, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Eye, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const DriverLicenseWizard: React.FC = () => {
  // Wizard state
  const [licenseStatus, setLicenseStatus] = useState<'vigente' | 'vencida'>('vigente');
  const [drivingExperience, setDrivingExperience] = useState<'>5' | '<5'>('>5');
  const [timeInIsrael, setTimeInIsrael] = useState<'<12' | '12-60' | '>60'>('<12');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <Car className="w-3.5 h-3.5 text-blue-300" />
            <span>Misrad HaRishuí (משרד הרישוי)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Canje y Conversión de Licencia de Conducir (Hamarat Rishayón)
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Solo puedes conducir legalmente con tu registro extranjero durante los <strong>primeros 12 meses</strong> desde tu llegada. Tienes hasta <strong>5 años</strong> para hacer la conversión simplificada con beneficios de Olé Jadash.
          </p>
        </div>
      </div>

      {/* Interactive Wizard Selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Configura tu Situación Actual:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 1: License status */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              1. Estado de tu Licencia Extranjera:
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setLicenseStatus('vigente')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  licenseStatus === 'vigente'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Plástico Físico VIGENTE</span>
                {licenseStatus === 'vigente' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => setLicenseStatus('vencida')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  licenseStatus === 'vencida'
                    ? 'bg-amber-50 border-amber-500 text-amber-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Plástico Físico VENCIDO</span>
                {licenseStatus === 'vencida' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
              </button>
            </div>
          </div>

          {/* Question 2: Driving experience */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              2. Antigüedad Previa a la Aliá:
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setDrivingExperience('>5')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  drivingExperience === '>5'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Más de 5 años manejando</span>
                {drivingExperience === '>5' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => setDrivingExperience('<5')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  drivingExperience === '<5'
                    ? 'bg-amber-50 border-amber-500 text-amber-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Menos de 5 años de manejo</span>
                {drivingExperience === '<5' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
              </button>
            </div>
          </div>

          {/* Question 3: Time since aliyah */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              3. Tiempo transcurrido desde tu Aliá:
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTimeInIsrael('<12')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  timeInIsrael === '<12'
                    ? 'bg-blue-50 border-blue-500 text-blue-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Menos de 1 año (Habilitado)</span>
                {timeInIsrael === '<12' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                type="button"
                onClick={() => setTimeInIsrael('12-60')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  timeInIsrael === '12-60'
                    ? 'bg-purple-50 border-purple-500 text-purple-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Entre 1 y 5 años (Derecho de canje)</span>
                {timeInIsrael === '12-60' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </button>

              <button
                type="button"
                onClick={() => setTimeInIsrael('>60')}
                className={`w-full p-2.5 text-xs font-semibold rounded-lg border text-left transition flex items-center justify-between ${
                  timeInIsrael === '>60'
                    ? 'bg-rose-50 border-rose-500 text-rose-900'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <span>Más de 5 años (Venció beneficio)</span>
                {timeInIsrael === '>60' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic RoadMap Output */}
        <div className="p-5 rounded-2xl border bg-gray-50/70 space-y-4">
          {/* Driving Authorization Status */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Diagnóstico de tu Trámite:
            </span>
            {timeInIsrael === '<12' ? (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Puedes manejar legalmente con tu registro extranjero hasta cumplir el mes 12
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                YA NO puedes manejar con tu registro extranjero. Debes finalizar el canje.
              </span>
            )}
          </div>

          {/* Path Details */}
          {licenseStatus === 'vigente' && drivingExperience === '>5' && timeInIsrael !== '>60' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                ¡Excelente! Calificas para CONVERSIÓN DIRECTA (Hamarat Rishayón) sin exámenes.
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Al tener más de 5 años ininterrumpidos y tu registro vigente, el Estado de Israel te exime del examen teórico (teoriá) y del examen práctico de manejo.
              </p>

              <div className="space-y-2 text-xs text-gray-800 bg-white p-3.5 rounded-lg border border-emerald-200">
                <strong className="block font-bold text-gray-900">Pasos a Seguir:</strong>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <span><strong>Tofes Yarok (טופס ירוק) online:</strong> Ingresa a gov.il y completa la solicitud médica digital para licencia particular (categoría B). Recibirás un SMS con código.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <span><strong>Examen de Vista (Bedikat Einaim [בדיקת עיניים]):</strong> Acude a cualquier óptica autorizada (Optica Halperin, Erroca, etc.). Cuesta aprox. 50 NIS. La óptica sube el apto al sistema del gobierno al instante.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <span><strong>Turno en Misrad HaRishuí vía MyVisit:</strong> Lleva tu Teudat Zehut, Teudat Olé y la licencia extranjera original física. Te emitirán el comprobante de pago provisorio para el carné israelí.</span>
                </div>
              </div>
            </div>
          )}

          {licenseStatus === 'vencida' && timeInIsrael !== '>60' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
                Caso: Licencia Vencida. No califica para canje simple directo con el plástico.
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed">
                El empleado de Misrad HaRishuí no puede validar un plástico vencido. Tienes 2 soluciones oficiales:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-amber-200">
                  <strong className="block text-amber-950 font-bold mb-1">
                    Opción A: Certificado de Legalidad
                  </strong>
                  Solicita a la entidad de tránsito de tu país de origen (ej: Agencia Nacional de Seguridad Vial de Argentina, etc.) el <strong>Certificado de Antigüedad y Legalidad</strong> apostillado que certifique que manejabas legalmente durante más de 5 años antes de hacer la aliá.
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200">
                  <strong className="block text-amber-950 font-bold mb-1">
                    Opción B: Prueba Práctica Abreviada (Mivján Shlitá)
                  </strong>
                  Si no puedes conseguir el certificado o tienes menos de 5 años de antigüedad, debes rendir una prueba práctica abreviada de control (<strong>Mivján Shlitá</strong> [מבחן שליטה]) con un instructor de manejo en Israel (1 o 2 clases de práctica previas recomendadas).
                </div>
              </div>
            </div>
          )}

          {drivingExperience === '<5' && licenseStatus === 'vigente' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-2">
              <h3 className="font-bold text-sm text-blue-950">
                Tienes menos de 5 años de experiencia de manejo previa
              </h3>
              <p>
                Aunque tu licencia esté vigente, al no alcanzar los 5 años completos de antigüedad antes de la aliá, se te exigirá rendir el <strong>Mivján Shlitá (מבחן שליטה)</strong>, un examen práctico breve para validar el dominio del vehículo en el tránsito israelí.
              </p>
            </div>
          )}

          {timeInIsrael === '>60' && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-900 space-y-2">
              <h3 className="font-bold text-sm text-rose-950">
                Han pasado más de 5 años desde tu fecha de Aliá
              </h3>
              <p>
                El beneficio especial de conversión para Olim Jadashim caduca a los 5 años. Deberás iniciar el trámite ordinario de obtención de licencia israelí (curso teórico y práctico completo).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
