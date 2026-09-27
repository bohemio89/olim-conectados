import React from 'react';
import { 
  Building2, 
  Phone, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Lightbulb, 
  AlertTriangle,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const BusinessPlanGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs px-3 py-1 rounded-full font-medium mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Servicio Oficial y Gratuito del Estado de Israel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Plan de Negocio y Emprendimiento para Olim
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
            Guía oficial de asesoramiento empresarial, evaluación de viabilidad y financiamiento para nuevos olim y residentes retornados que desean abrir o hacer crecer su propio negocio en Israel.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="tel:*2994"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar a la División de Emprendimiento: *2994</span>
            </a>
            <span className="text-xs text-blue-200 flex items-center gap-1.5 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Atención multilingüe (incluido español)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Centro de Información & Centros Maalot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Centro de Información Económico-Empresarial */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Misrad HaAliyah
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Centro de Información Económico-Empresarial
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Servicio gratuito del Ministerio de Aliyá y Absorción (Misrad HaAliyah veHaKlitá), a través de la División de Emprendimiento Empresarial (<em>Agaf Yazamut Iskit</em> - אגף יזמות עסקית).
              </p>
            </div>

            {/* Direct Contact Phone */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-gray-500 block">Línea Telefónica Directa:</span>
                <span className="text-base font-extrabold text-gray-900 font-mono">*2994</span>
              </div>
              <a
                href="tel:*2994"
                className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamar</span>
              </a>
            </div>

            {/* Elegibilidad */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                ¿Quiénes pueden usarlo?
              </span>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nuevos Olim:</strong> Hasta 10 años desde la obtención del estatus de oleh, mayores de 21 años.
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Residentes retornados:</strong> Quienes vivieron al menos 5 años seguidos fuera de Israel y no pasaron más de 2 años desde que recuperaron su estatus.
                  </span>
                </li>
              </ul>
            </div>

            {/* Servicios que ofrece */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                ¿Qué servicios ofrece?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/70 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Evaluación de viabilidad de negocio</span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/70 flex items-start gap-2">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Información impositiva</span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/70 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Ayuda para tramitar préstamos de fondos de financiamiento</span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100/70 flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Acompañamiento empresarial y talleres</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
            💬 <strong>Idioma:</strong> Atención en varios idiomas, incluido <strong>español</strong>.
          </div>
        </div>

        {/* Card 2: Centros de Negocios Maalot */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                מרכזי מעלו״ת
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Centros de Negocios Maalot (מרכזי מעלו״ת)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Centros regionales de asesoramiento empresarial para olim y residentes retornados que quieren abrir o desarrollar un negocio en Israel.
              </p>
            </div>

            {/* Asesores destacados */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Equipo de Asesores Homologados</span>
              </div>
              <p className="text-xs text-purple-900/80 leading-relaxed">
                Cuentan con alrededor de <strong>155 asesores de negocios multilingües</strong>, aprobados oficialmente por la División de Emprendimiento del Ministerio.
              </p>
            </div>

            {/* Servicios Maalot */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Servicios disponibles en los Centros Maalot:
              </span>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Opinión inicial y relevamiento detallado de necesidades del proyecto.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Armado estructurado del modelo de negocio comercial.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Ayuda profesional para armar el <strong>plan de negocio</strong> completo (incluido para <em>startups</em> y empresas de base tecnológica).</span>
                </li>
              </ul>
            </div>

            {/* Cómo pedir turno */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                ¿Cómo solicitar turno?
              </span>
              <p className="text-xs text-gray-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                Se puede pedir turno completando el <strong>formulario online</strong> a través de gov.il o llamando directamente al <strong>centro Maalot de tu zona de residencia</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-600">Consultas oficiales:</span>
            <a
              href="https://www.gov.il"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <span>Portal gov.il</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Mandatory Official Clarification / Disclaimer */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 sm:p-6 text-amber-950 space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Aclaración Oficial Importante</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
          Este es un <strong>servicio oficial y gratuito</strong> del Ministerio de Aliyá y Absorción (<em>Misrad HaAliyah veHaKlitá</em>), no de terceros. Los datos de contacto y requisitos pueden cambiar — verificar vigencia en <strong>gov.il</strong> antes de asumir que la información sigue igual.
        </p>
      </div>
    </div>
  );
};
