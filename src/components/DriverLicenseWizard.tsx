import React, { useState } from 'react';
import { 
  Car, 
  Bike,
  Truck,
  Bus,
  CarTaxiFront,
  Tractor,
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Briefcase,
  ExternalLink,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

type VehicleType = 'auto' | 'moto' | 'camion' | 'colectivo' | 'taxi' | 'tractor';

export const DriverLicenseWizard: React.FC = () => {
  // Wizard state
  const [vehicle, setVehicle] = useState<VehicleType>('auto');
  const [issuedBeforeAliyah, setIssuedBeforeAliyah] = useState<'si' | 'no'>('si');
  const [isValid, setIsValid] = useState<'si' | 'no'>('si');
  const [yearsExperience, setYearsExperience] = useState<'5_o_mas' | 'menos_5'>('5_o_mas');
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // Determinar diagnóstico
  const isAuto = vehicle === 'auto';

  return (
    <div className="space-y-6">
      
      {/* 1. Franja amarilla informativa */}
      <div className="bg-[#FFF5DF] border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 text-amber-950 font-bold sm:font-semibold text-sm sm:text-base shadow-2xs">
        <Car className="w-5 h-5 text-amber-800 shrink-0" />
        <span>Con tu licencia extranjera puedes manejar solo el primer año desde la Aliá.</span>
      </div>

      {/* 2. Sección Tu situación */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#0E2559]">Tu situación</h2>

        {/* Pregunta 1: ¿Qué vas a manejar? */}
        <div className="space-y-3">
          <label className="block text-sm sm:text-base font-bold text-slate-800">
            1. ¿Qué vas a manejar?
          </label>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'auto' as VehicleType, label: 'Auto', icon: Car },
              { id: 'moto' as VehicleType, label: 'Moto', icon: Bike },
              { id: 'camion' as VehicleType, label: 'Camión', icon: Truck },
              { id: 'colectivo' as VehicleType, label: 'Colectivo', icon: Bus },
              { id: 'taxi' as VehicleType, label: 'Taxi', icon: CarTaxiFront },
              { id: 'tractor' as VehicleType, label: 'Tractor', icon: Tractor }
            ].map(({ id, label, icon: IconComponent }) => {
              const isSelected = vehicle === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setVehicle(id)}
                  className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-bold flex items-center gap-2 border transition shadow-2xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#0E2559] text-white border-[#0E2559]'
                      : 'bg-white text-[#0E2559] border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#0E2559]'}`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preguntas 2, 3 y 4 (Solo si es Auto) */}
        {isAuto && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Pregunta 2 */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800">
                2. ¿La sacaste antes de la Aliá?
              </label>
              <div className="bg-[#FFF9EE] p-1.5 rounded-2xl flex flex-col sm:flex-row gap-1.5 border border-amber-100">
                <button
                  type="button"
                  onClick={() => setIssuedBeforeAliyah('si')}
                  className={`flex-1 min-h-[44px] py-2 px-3 text-center rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    issuedBeforeAliyah === 'si'
                      ? 'bg-white text-[#0E2559] border-2 border-[#6B4FA0] shadow-2xs'
                      : 'text-slate-700 hover:text-black font-semibold'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setIssuedBeforeAliyah('no')}
                  className={`flex-1 min-h-[44px] py-2 px-3 text-center rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    issuedBeforeAliyah === 'no'
                      ? 'bg-white text-[#0E2559] border-2 border-[#6B4FA0] shadow-2xs'
                      : 'text-slate-700 hover:text-black font-semibold'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Pregunta 3 */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800">
                3. ¿Está vigente?
              </label>
              <div className="bg-[#FFF9EE] p-1.5 rounded-2xl flex flex-col sm:flex-row gap-1.5 border border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsValid('si')}
                  className={`flex-1 min-h-[44px] py-2 px-3 text-center rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    isValid === 'si'
                      ? 'bg-white text-[#0E2559] border-2 border-[#6B4FA0] shadow-2xs'
                      : 'text-slate-700 hover:text-black font-semibold'
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setIsValid('no')}
                  className={`flex-1 min-h-[44px] py-2 px-3 text-center rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    isValid === 'no'
                      ? 'bg-white text-[#0E2559] border-2 border-[#6B4FA0] shadow-2xs'
                      : 'text-slate-700 hover:text-black font-semibold'
                  }`}
                >
                  No, vencida
                </button>
              </div>
            </div>

            {/* Pregunta 4 */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800">
                4. Años con licencia
              </label>
              <div className="bg-[#FFF9EE] p-1.5 rounded-2xl flex flex-col sm:flex-row gap-1.5 border border-amber-100">
                <button
                  type="button"
                  onClick={() => setYearsExperience('5_o_mas')}
                  className={`flex-1 min-h-[44px] py-2 px-3 text-center rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    yearsExperience === '5_o_mas'
                      ? 'bg-white text-[#0E2559] border-2 border-[#6B4FA0] shadow-2xs'
                      : 'text-slate-700 hover:text-black font-semibold'
                  }`}
                >
                  5 o más
                </button>
                <button
                  type="button"
                  onClick={() => setYearsExperience('menos_5')}
                  className={`flex-1 min-h-[44px] py-2 px-3 text-center rounded-xl font-bold text-sm sm:text-base transition cursor-pointer ${
                    yearsExperience === 'menos_5'
                      ? 'bg-white text-[#0E2559] border-2 border-[#6B4FA0] shadow-2xs'
                      : 'text-slate-700 hover:text-black font-semibold'
                  }`}
                >
                  Menos de 5
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 3. Tarjeta de Resultado Dinámica */}
      {isAuto ? (
        // Casos para AUTO
        issuedBeforeAliyah === 'no' ? (
          // Auto sacada después de la Aliá
          <div className="bg-white rounded-3xl border-2 border-rose-300 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0E2559]">
                  Esta licencia no se puede canjear
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Auto, sacada después de la Aliá.
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-800 font-medium bg-rose-50/70 p-4 rounded-2xl border border-rose-200">
              Esta licencia no se puede canjear. Tienes que sacar la licencia israelí desde el principio.
            </p>

            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2A7050]" />
                <span>Fuente: Ministerio de Transporte · gov.il · revisado oct 2026</span>
              </div>
            </div>
          </div>
        ) : isValid === 'no' ? (
          // Auto con licencia vencida
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0E2559]">
                  Estamos confirmando esta regla
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Auto, licencia vencida.
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-800 font-medium bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              Estamos confirmando esta regla con el Ministerio de Transporte. Mientras tanto, consulta en una oficina de licencias.
            </p>

            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2A7050]" />
                <span>Fuente: Ministerio de Transporte · gov.il · revisado oct 2026</span>
              </div>
            </div>
          </div>
        ) : yearsExperience === '5_o_mas' ? (
          // Auto, antes de Aliá, vigente, 5 años o más: CANJE SIN EXAMEN PRÁCTICO
          <div className="bg-white rounded-3xl border-2 border-[#2A7050] p-6 sm:p-7 shadow-xs space-y-6">
            
            {/* Header del resultado */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#2A7050] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0E2559]">
                  Canje sin examen práctico
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                  Auto, licencia vigente, sacada antes de la Aliá, 5 años o más.
                </p>
              </div>
            </div>

            {/* Roadmap de 4 pasos */}
            <div className="flex flex-col md:flex-row items-stretch gap-2.5 sm:gap-3">
              
              {/* Paso 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex-1 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#2A7050] text-white font-black text-sm flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="font-extrabold text-[#0E2559] text-base mb-1">
                    Solicitud online
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    En govforms, con la declaración médica.
                  </p>
                </div>
              </div>

              {/* Flecha separadora */}
              <div className="flex items-center justify-center py-0.5">
                <ChevronRight className="w-6 h-6 text-[#2A7050] shrink-0 hidden md:block" />
                <ChevronDown className="w-6 h-6 text-[#2A7050] shrink-0 md:hidden" />
              </div>

              {/* Paso 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex-1 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#2A7050] text-white font-black text-sm flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="font-extrabold text-[#0E2559] text-base mb-1">
                    Examen de vista
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Con un optometrista, en una estación de fotos.
                  </p>
                </div>
              </div>

              {/* Flecha separadora */}
              <div className="flex items-center justify-center py-0.5">
                <ChevronRight className="w-6 h-6 text-[#2A7050] shrink-0 hidden md:block" />
                <ChevronDown className="w-6 h-6 text-[#2A7050] shrink-0 md:hidden" />
              </div>

              {/* Paso 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex-1 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#2A7050] text-white font-black text-sm flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="font-extrabold text-[#0E2559] text-base mb-1">
                    Turno en la oficina de licencias
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Por myVisit.
                  </p>
                </div>
              </div>

              {/* Flecha separadora */}
              <div className="flex items-center justify-center py-0.5">
                <ChevronRight className="w-6 h-6 text-[#2A7050] shrink-0 hidden md:block" />
                <ChevronDown className="w-6 h-6 text-[#2A7050] shrink-0 md:hidden" />
              </div>

              {/* Paso 4 (Tarjeta Verde Destacada) */}
              <div className="bg-[#2A7050] text-white rounded-2xl p-4 sm:p-5 flex-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-white text-[#2A7050] flex items-center justify-center mb-3">
                    <Car className="w-4 h-4 text-[#2A7050]" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">
                    Carné israelí
                  </h4>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Pagas la tasa y lo recibes.
                  </p>
                </div>
              </div>

            </div>

            {/* Documentos a llevar */}
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#0E2559] pt-2">
              <Briefcase className="w-5 h-5 text-[#0E2559] shrink-0" />
              <span>Lleva: licencia original · Teudat Olé · Teudat Zehut</span>
            </div>

            {/* Footer con Fuente */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2A7050]" />
                  <span>Fuente: Ministerio de Transporte · gov.il · revisado oct 2026</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetail(!showDetail)}
                  className="text-[#2A7050] font-bold flex items-center gap-1 hover:underline min-h-[32px] cursor-pointer"
                >
                  <span>Ver detalle</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDetail ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Detalle desplegable */}
              {showDetail && (
                <div className="bg-slate-50 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-2 border border-slate-200/80">
                  <p className="font-semibold text-[#0E2559]">
                    Información oficial del trámite (Misrad HaRishuí):
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>La solicitud online se completa mediante el formulario oficial (Tofes Yarok digital) en govforms.</li>
                    <li>En la estación de fotos se realiza la foto digital biométrica y el control optométrico.</li>
                    <li>El turno presencial en la oficina de licencias se agenda previamente mediante la aplicación o sitio de myVisit.</li>
                    <li>En la oficina revisan la licencia física original, Teudat Olé y Teudat Zehut para emitir la licencia temporal con la boleta de pago.</li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        ) : (
          // Auto, antes de Aliá, vigente, menos de 5 años: NECESITAS UN EXAMEN PRÁCTICO
          <div className="bg-white rounded-3xl border-2 border-[#6B4FA0] p-6 sm:p-7 shadow-xs space-y-6">
            
            {/* Header del resultado */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#6B4FA0] text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0E2559]">
                  Necesitas un examen práctico
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                  Auto, licencia vigente, sacada antes de la Aliá, menos de 5 años.
                </p>
              </div>
            </div>

            {/* Roadmap de 4 pasos */}
            <div className="flex flex-col md:flex-row items-stretch gap-2.5 sm:gap-3">
              
              {/* Paso 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex-1 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#6B4FA0] text-white font-black text-sm flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="font-extrabold text-[#0E2559] text-base mb-1">
                    Solicitud online
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    En govforms, con la declaración médica.
                  </p>
                </div>
              </div>

              {/* Flecha separadora */}
              <div className="flex items-center justify-center py-0.5">
                <ChevronRight className="w-6 h-6 text-[#6B4FA0] shrink-0 hidden md:block" />
                <ChevronDown className="w-6 h-6 text-[#6B4FA0] shrink-0 md:hidden" />
              </div>

              {/* Paso 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex-1 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#6B4FA0] text-white font-black text-sm flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="font-extrabold text-[#0E2559] text-base mb-1">
                    Examen de vista
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Con un optometrista, en una estación de fotos.
                  </p>
                </div>
              </div>

              {/* Flecha separadora */}
              <div className="flex items-center justify-center py-0.5">
                <ChevronRight className="w-6 h-6 text-[#6B4FA0] shrink-0 hidden md:block" />
                <ChevronDown className="w-6 h-6 text-[#6B4FA0] shrink-0 md:hidden" />
              </div>

              {/* Paso 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex-1 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#6B4FA0] text-white font-black text-sm flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="font-extrabold text-[#0E2559] text-base mb-1">
                    Turno en la oficina de licencias
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Por myVisit.
                  </p>
                </div>
              </div>

              {/* Flecha separadora */}
              <div className="flex items-center justify-center py-0.5">
                <ChevronRight className="w-6 h-6 text-[#6B4FA0] shrink-0 hidden md:block" />
                <ChevronDown className="w-6 h-6 text-[#6B4FA0] shrink-0 md:hidden" />
              </div>

              {/* Paso 4 (Examen Práctico) */}
              <div className="bg-[#6B4FA0] text-white rounded-2xl p-4 sm:p-5 flex-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-white text-[#6B4FA0] flex items-center justify-center mb-3">
                    <FileCheck2 className="w-4 h-4 text-[#6B4FA0]" />
                  </div>
                  <h4 className="font-extrabold text-white text-base mb-1">
                    Examen práctico
                  </h4>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    Con un instructor habilitado (conviene tomar clases antes).
                  </p>
                </div>
              </div>

            </div>

            {/* Documentos a llevar */}
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#0E2559] pt-2">
              <Briefcase className="w-5 h-5 text-[#0E2559] shrink-0" />
              <span>Lleva: licencia original · Teudat Olé · Teudat Zehut</span>
            </div>

            {/* Footer con Fuente */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2A7050]" />
                  <span>Fuente: Ministerio de Transporte · gov.il · revisado oct 2026</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetail(!showDetail)}
                  className="text-[#6B4FA0] font-bold flex items-center gap-1 hover:underline min-h-[32px] cursor-pointer"
                >
                  <span>Ver detalle</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDetail ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Detalle desplegable */}
              {showDetail && (
                <div className="bg-slate-50 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-2 border border-slate-200/80">
                  <p className="font-semibold text-[#0E2559]">
                    Información oficial del trámite (Misrad HaRishuí):
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>La solicitud online se completa mediante el formulario oficial (Tofes Yarok digital) en govforms.</li>
                    <li>En la estación de fotos se realiza la foto digital biométrica y el control optométrico.</li>
                    <li>El turno presencial en la oficina de licencias se agenda previamente mediante la aplicación o sitio de myVisit.</li>
                    <li>Al tener menos de 5 años de antigüedad con la licencia extranjera, la normativa exige rendir un examen práctico con instructor habilitado.</li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        )
      ) : (
        // Casos para OTROS VEHÍCULOS seleccionados en pregunta 1
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0E2559] text-white flex items-center justify-center shrink-0">
              {vehicle === 'moto' && <Bike className="w-6 h-6 text-white" />}
              {vehicle === 'camion' && <Truck className="w-6 h-6 text-white" />}
              {vehicle === 'colectivo' && <Bus className="w-6 h-6 text-white" />}
              {vehicle === 'taxi' && <CarTaxiFront className="w-6 h-6 text-white" />}
              {vehicle === 'tractor' && <Tractor className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0E2559]">
                {vehicle === 'moto' && 'Licencia para Moto'}
                {vehicle === 'camion' && 'Licencia para Camión'}
                {vehicle === 'colectivo' && 'Licencia para Colectivo'}
                {vehicle === 'taxi' && 'Licencia para Taxi'}
                {vehicle === 'tractor' && 'Licencia para Tractor'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                Requisitos según la normativa del Ministerio de Transporte.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <p className="text-base sm:text-lg text-slate-800 font-medium">
              {vehicle === 'moto' && 'Estamos confirmando esta regla con el Ministerio de Transporte.'}
              {vehicle === 'camion' && 'Curso, examen teórico y examen práctico, aunque tengas 5 años o más, más curso de primeros auxilios y de incendios.'}
              {vehicle === 'colectivo' && 'Curso, examen teórico y examen práctico, aunque tengas 5 años o más, más curso de primeros auxilios y de incendios. Desde 21 años.'}
              {vehicle === 'taxi' && '21 años, 2 años de licencia, certificado de buena conducta y curso de 3 meses con exámenes.'}
              {vehicle === 'tractor' && 'Desde 16 años, con curso, examen médico y exámenes.'}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#2A7050]" />
              <span>Fuente: Ministerio de Transporte · gov.il · revisado oct 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bloque "Otros vehículos" con 3 mini cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-[#0E2559]">Otros vehículos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Camión, colectivo o taxi */}
          <div 
            onClick={() => setVehicle('camion')}
            className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/60 hover:bg-slate-100/60 transition cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-[#6B4FA0] shrink-0" />
              <h4 className="font-bold text-[#0E2559] text-base">
                Camión, colectivo o taxi
              </h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Curso, teórico y práctico aunque tengas 5 años o más.
            </p>
          </div>

          {/* Card 2: Moto */}
          <div 
            onClick={() => setVehicle('moto')}
            className="border border-dashed border-amber-300 rounded-2xl p-4 sm:p-5 bg-amber-50/40 hover:bg-amber-100/40 transition cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <Bike className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="font-bold text-[#0E2559] text-base">
                Moto
              </h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Estamos confirmando la regla con el Ministerio.
            </p>
          </div>

          {/* Card 3: Tractor */}
          <div 
            onClick={() => setVehicle('tractor')}
            className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/60 hover:bg-slate-100/60 transition cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <Tractor className="w-5 h-5 text-[#2A7050] shrink-0" />
              <h4 className="font-bold text-[#0E2559] text-base">
                Tractor
              </h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Desde 16 años, con curso, examen médico y exámenes.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
