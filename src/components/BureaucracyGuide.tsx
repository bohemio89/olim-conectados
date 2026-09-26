import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  GraduationCap, 
  Home, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  Percent,
  Sparkles,
  Calendar,
  Building
} from 'lucide-react';

export const BureaucracyGuide: React.FC = () => {
  const [activeBureaucracyTab, setActiveBureaucracyTab] = useState<'tofes101' | 'myvisit' | 'ulpan' | 'arnona' | 'olei'>('tofes101');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-indigo-300" />
            <span>Guía de Trámites y Burocracia Oficial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Evita Retenciones de Impuestos, Consigue Turnos y Tramita Vouchers
          </h1>
          <p className="mt-2 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Desde cómo evitar descuentos de miles de shékels en el <strong>Tofes 101</strong>, hasta el truco horario de <strong>MyVisit</strong>, el voucher de 5.200 NIS de <strong>Ulpán</strong> y el descuento de <strong>Arnoná</strong>.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto pb-1">
        {[
          { id: 'tofes101', label: 'Tofes 101 (Nekudot Zijui)', icon: Percent },
          { id: 'myvisit', label: 'Turnos en MyVisit (Truco Matutino)', icon: Clock },
          { id: 'ulpan', label: 'Voucher de Ulpán (5.200 NIS)', icon: GraduationCap },
          { id: 'arnona', label: 'Descuento de Arnoná (Iriyá)', icon: Home },
          { id: 'olei', label: 'OLEI & Misrad HaAliyah', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeBureaucracyTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveBureaucracyTab(tab.id as any)}
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

      {/* Tab 1: Tofes 101 */}
      {activeBureaucracyTab === 'tofes101' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                Alerta de Retención Salarial
              </span>
              <h2 className="text-lg font-bold text-gray-900 mt-1">
                Tofes 101 (טופס 101) y Puntos de Crédito (Nekudot Zijui)
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Se completa obligatoriamente al entrar a cualquier empleo y al inicio de cada año fiscal (enero).
              </p>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-950 space-y-1">
            <strong className="block font-bold text-rose-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              ¡El error más común de los nuevos inmigrantes!
            </strong>
            <p className="leading-relaxed">
              Si olvidas marcar la casilla de <strong>Olé Jadash</strong> o no adjuntas tu Teudat Olé, el software contable de la empresa asumirá que eres residente común y te retendrá indebidamente el impuesto a las ganancias (<strong>Mas Hajnasá</strong> [מס הכנסה]).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Cómo completarlo correctamente:
              </h3>
              <ul className="space-y-1.5 text-gray-700 list-disc pl-4">
                <li>Ve a la sección <strong>"Peratim al Hakalot be-Mas"</strong> (פרטים על הקלות במס).</li>
                <li>Tilda la casilla <strong>"Ani Olé Jadash" (אני עולה חדש)</strong>.</li>
                <li>Escribe tu fecha exacta de llegada a Israel según tu Teudat Olé.</li>
                <li>Adjunta fotocopia digital de tu <strong>Teudat Olé</strong> y tu <strong>Teudat Zehut</strong>.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-blue-600" />
                Escala de Nekudot Zijui para Olim:
              </h3>
              <p className="text-gray-600">
                Cada punto de crédito fiscal (Nekudat Zijui) reduce el impuesto en aprox. 242 NIS mensuales (casi 3.000 NIS al año):
              </p>
              <ul className="space-y-1 text-gray-700 text-[11px]">
                <li><strong>Meses 1 a 12:</strong> 3 puntos de crédito adicionales.</li>
                <li><strong>Meses 13 a 24:</strong> 2 puntos de crédito adicionales.</li>
                <li><strong>Meses 25 a 36:</strong> 1 punto de crédito adicional.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: MyVisit */}
      {activeBureaucracyTab === 'myvisit' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
              Citas Estatales Oficiales
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              El Sistema MyVisit y el "Truco Matutino" (7:00 a 8:30 AM)
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Plataforma para sacar turnos en <strong>Misrad HaPnim</strong> (Teudat Zehut, Pasaportes) y <strong>Misrad HaRishuí</strong> (Licencias de conducir).
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
              <Clock className="w-5 h-5 text-amber-600" />
              ¿Por qué no hay turnos disponibles a meses vista?
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              La demanda supera ampliamente la capacidad de las oficinas públicas. Los turnos que buscas en horas de la tarde aparecen agotados hasta 4 meses después.
            </p>

            <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-xs">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                El Secreto de la Comunidad: Conéctate de 7:00 a 8:30 AM
              </h3>
              <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">
                Todas las mañanas, entre las <strong>7:00 y las 8:30 AM</strong>, los servidores de MyVisit liberan automáticamente:
              </p>
              <ul className="text-xs text-gray-700 list-disc pl-4 mt-2 space-y-1">
                <li>Los turnos que la gente canceló la noche anterior.</li>
                <li>Cupos especiales asignados para atención en el mismo día o en las siguientes 48 horas.</li>
              </ul>
              <p className="text-[11px] text-blue-700 font-semibold mt-2">
                💡 Si refrescas la app en ese horario matutino, conseguirás turno para esa misma semana en sedes como Tel Aviv, Ramat Gan o Netanya.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Ulpán Voucher */}
      {activeBureaucracyTab === 'ulpan' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Misrad HaAliyah ve-haKlitá
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Ulpán Inicial y Vouchers para Ulpán Privado (~5.200 NIS)
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Beneficio estatal para continuar aprendiendo hebreo de nivel intermedio o avanzado.
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-xs text-rose-950 space-y-1">
            <strong className="block font-bold text-rose-900 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              ¡Condición Estricta!: El Voucher NO es dinero a fondo perdido
            </strong>
            <p className="leading-relaxed">
              El Ministerio no entrega el dinero en efectivo ni paga directamente a la academia privada sin condiciones. <strong>Tú debes adelantar el pago (o cuotas con tarjeta)</strong> y el Estado solo te reintegrará los 5.200 NIS si cumples con las exigencias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="font-bold text-gray-900 mb-1">1. Requisito Previo</div>
              <p className="text-gray-600">
                Haber completado y aprobado el examen del Ulpán estatal inicial (Ulpán Álef subvencionado).
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="font-bold text-gray-900 mb-1">2. Asistencia Mínima 80%</div>
              <p className="text-gray-600">
                Debes firmar asistencia en cada clase. Si faltas y quedas por debajo del 80%, <strong>pierdes el derecho a reintegro</strong>.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="font-bold text-gray-900 mb-1">3. Examen Final Aprobado</div>
              <p className="text-gray-600">
                Al concluir el curso privado, la institución te toma un examen oficial. Solo con el certificado de aprobación el ministerio efectúa el depósito en tu cuenta bancaria.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Arnoná */}
      {activeBureaucracyTab === 'arnona' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
              Municipalidad (Iriyá)
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Descuento de Arnoná (Impuesto Municipal sobre la Vivienda)
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Subsidio de entre 70% y 90% (según el municipio) durante 12 meses continuos dentro de los primeros años de aliá.
            </p>
          </div>

          <div className="space-y-3 text-xs text-gray-700">
            <p className="leading-relaxed">
              La <strong>Arnoná (ארנונה)</strong> es el impuesto municipal que paga el inquilino que habita el departamento. Como olé jadash tienes derecho a un descuento sustancial en hasta 100 metros cuadrados de la vivienda durante 12 meses continuos.
            </p>

            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4">
              <h3 className="font-bold text-blue-950 mb-2">Requisitos para pedirlo en tu Iriyá local:</h3>
              <ul className="list-disc pl-4 space-y-1 text-blue-900">
                <li>Contrato de alquiler legal firmado (mínimo de 1 año de duración) a tu nombre.</li>
                <li>Teudat Olé y Teudat Zehut con el anexo (séjaj) que muestre la dirección de ese municipio.</li>
                <li>Última factura de Arnoná que llegó al buzón del departamento (para tener el número de cuenta de la propiedad).</li>
                <li>Solicitud en el departamento de rentas de la Iriyá o por el portal web municipal.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: OLEI & Proyectistas */}
      {activeBureaucracyTab === 'olei' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Acompañamiento en Español
            </span>
            <h2 className="text-lg font-bold text-gray-900 mt-1">
              Apoyo de OLEI y Asesores de Misrad HaAliyah
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Organizaciones y funcionarios estatales que te asisten en tu propio idioma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                OLEI (Organización de Latinoamericanos, Españoles y Portugueses)
              </h3>
              <p className="text-emerald-900 leading-relaxed">
                Voluntarios con décadas en Israel que brindan asesoramiento presencial gratuito.
              </p>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-gray-800 space-y-1">
                <p><strong>En qué te ayudan:</strong></p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Acompañamiento a bancos para apertura de cuenta sin comisiones abusivas.</li>
                  <li>Elección y gestión del carné de Kupat Jolim (Maccabi, Clalit, etc.).</li>
                  <li>Revisión de cartas oficiales en hebreo.</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-700" />
                Proyectistas de Misrad HaAliyah (Klitá)
              </h3>
              <p className="text-blue-900 leading-relaxed">
                Cada olé tiene asignado un proyectista de integración (<strong>proyektit klitá</strong>).
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-200 text-gray-800 space-y-1">
                <p><strong>Canales de consulta:</strong></p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Portal personal de gov.il (puedes enviar mensajes directos a tu asesor).</li>
                  <li>Atención presencial: Las sedes de Tel Aviv, Jerusalén, Netanya y Haifa cuentan con proyectistas hispanohablantes dedicados.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
