import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { userQuery, messages } = req.body || {};
  const currentQuery = (userQuery || (messages && messages.length > 0 ? messages[messages.length - 1].content : '') || '').trim();

  if (!currentQuery) {
    return res.status(400).json({ error: 'La consulta no puede estar vacía' });
  }

  const q = currentQuery.toLowerCase();

  // 1. Cuenta bancaria para Sal Klitá
  if (q.includes('sal klit') || (q.includes('cuenta') && (q.includes('banco') || q.includes('abrir') || q.includes('informo') || q.includes('teudat ole')))) {
    return res.json({
      text: `🏦 **Cómo Abrir tu Cuenta Bancaria e Informar al Misrad HaAliyah:**

1. **Abrir la cuenta en el banco:** Acude con tu libreta de Teudat Olé, Teudat Zehut provisoria de papel y tu pasaporte extranjero.
2. **Pedir el comprobante de cuenta:** Exige en el banco el certificado oficial llamado **Ishur Nihul Jeshbón** (אישור ניהול חשבון) o un cheque anulado donde conste tu nombre y número de cuenta.
3. **Presentarlo ante Misrad HaAliyah:** 
   - Entrégaselo a tu asesor personal (**póked**) en la sucursal de tu ciudad.
   - O envíalo escaneado/fotografiado por correo electrónico al asesor asignado o mediante la zona personal en **gov.il**.
4. **Cobro del Sal Klitá:** Una vez cargada la cuenta en el sistema, las cuotas mensuales restantes se depositarán de forma automática.`
    });
  }

  // 2. Canje de licencia de conducir (>5 años)
  if (q.includes('licencia') && (q.includes('canje') || q.includes('canjeo') || q.includes('5 años') || q.includes('extranjera'))) {
    return res.json({
      text: `🚗 **Canje de Licencia de Conducir Extranjera (>5 años de antigüedad):**

Si tu licencia extranjera tiene más de 5 años de antigüedad comprobada y estás dentro de tus primeros años de Aliá:
- **Exención total:** Puedes realizar la conversión directa **sin rendir examen práctico ni teórico**.

📋 **Pasos Obligatorios:**
1. **Tofes Yarok:** Completa el formulario digital en la web de Misrad HaRishuí (Ministerio de Transporte).
2. **Control visual:** Realiza el examen de vista con un óptico autorizado (Bedikat Einaim).
3. **Turno en Misrad HaRishuí:** Reserva tu turno por **MyVisit** para acudir a la oficina de licencias.
4. **Documentos a presentar:** Pasaporte original, Teudat Zehut, Teudat Olé y tu licencia de conducir física vigente de tu país de origen.`
    });
  }

  // 3. Tofes 101 y Mas Hajnasá
  if (q.includes('101') || (q.includes('mas hajnas') && q.includes('reteng'))) {
    return res.json({
      text: `📑 **Cómo completar el Tofes 101 para evitar retenciones de más (Mas Hajnasá):**

1. **Cuándo se llena:** Al ingresar a cualquier trabajo en Israel o en el mes de enero de cada nuevo año fiscal.
2. **Puntos de Crédito (Nekudot Zijui):** 
   - En la sección correspondiente a tu estatus personal, debes tildar expresamente la casilla de **Olé Jadash** (Nuevo Inmigrante).
   - Adjunta siempre una copia legible de tu **Teudat Olé** con la fecha exacta de llegada al país.
3. **El beneficio:** Durante tus primeros 42 meses de Aliá recibes puntos adicionales de descuento fiscal que anulan o reducen notablemente el impuesto a las ganancias.
4. **Verificación:** Al recibir tu primer recibo de sueldo (**tlush sajar**), controla que figuren asignadas tus Nekudot Zijui de Olé.`
    });
  }

  // 4. Corte de ayuda de alquiler en mes 30
  if (q.includes('mes 30') || (q.includes('alquiler') && (q.includes('corta') || q.includes('termina') || q.includes('finaliza')))) {
    return res.json({
      text: `🏠 **¿Por qué se corta la ayuda de alquiler en el mes 30?:**

- **Límite legal del Ministerio de Aliá:** La ayuda automática de alquiler (**Siyua bi'Sjirot**) otorgada por **Misrad HaAliyah** tiene una duración reglamentaria máxima de **24 meses continuos** (comienza automáticamente en el mes 7 y finaliza de manera estricta en el mes 30).
- **Mes 31 en adelante:** El derecho inicial de absorción concluye por normativa general.
- **Continuidad por necesidad económica:** Si cumplido el mes 30 tu familia califica bajo condiciones socioeconómicas vulnerables o de bajos ingresos, la asistencia económica deja de depender de Aliá y pasa a tramitarse ante el **Ministerio de Construcción y Vivienda (Misrad HaBinui VeHaShikún)** mediante evaluación social individual.`
    });
  }

  // 5. Dos trabajos simultáneos y Teum Mas (47%)
  if (q.includes('teum mas') || q.includes('47%') || q.includes('2 trabajos') || q.includes('dos trabajos')) {
    return res.json({
      text: `⚠️ **Dos trabajos simultáneos: Cómo hacer el Teum Mas y evitar el 47%:**

Por normativa fiscal en Israel, si tienes más de un empleo y no presentas una coordinación impositiva, el empleador secundario está obligado a retener la tasa máxima legal (aproximadamente el 47%).

📋 **Solución Paso a Paso:**
1. **Número de Tik Nikuyim:** Pídele a cada uno de tus empleadores su número de deducción patronal de 9 dígitos (**Tik Nikuyim** - תיק ניכויים).
2. **Trámite por Internet:** Ingresa al portal de **Rashut HaMisim** (Autoridad Tributaria) en la sección **Teum Mas Online**.
3. **Declaración de Empleos:** Indica cuál es tu empleo principal (donde aplicas tus puntos de crédito de Olé Jadash) y cuál es el secundario con su sueldo estimado.
4. **Presentación:** Descarga la constancia oficial de retención que emite el sistema y preséntala en la oficina de contabilidad o RRHH de tu segundo trabajo.`
    });
  }

  // 6. Pikud HaOref y directivas laborales
  if (q.includes('pikud') || (q.includes('despedir') && q.includes('vacaciones')) || q.includes('haoref')) {
    return res.json({
      text: `🛡️ **Directivas de Pikud HaOref y Derechos Laborales:**

1. **Prohibición estricta de despido:**
   - La ley israelí protege al trabajador: **está terminantemente prohibido despedir** a un empleado que no pueda concurrir a su puesto debido a instrucciones oficiales de seguridad del Comando del Frente Interno (**Pikud HaOref**), falta de refugio reglamentario (**Mamad/Miklat**) accesible en la zona de trabajo, o por tener que cuidar a hijos menores tras el cierre oficial de colegios.
2. **Días de vacaciones:**
   - El empleador **no puede descontar de manera arbitraria** estos días de tus vacaciones si no cuentas con saldo positivo acumulado de descanso, ni puede dejar tu saldo de vacaciones en negativo sin tu consentimiento previo.
3. **Compensación salarial:**
   - En estados de emergencia civil o conflicto, el Ministerio de Trabajo y Bituaj Leumi implementan acuerdos marco para el pago de salarios de las jornadas no trabajadas por causas de fuerza mayor.`
    });
  }

  // 7. Número de celular y tarjeta Rav-Kav
  if ((q.includes('celular') || q.includes('telefono')) && (q.includes('rav-kav') || q.includes('rav kav') || q.includes('transporte'))) {
    return res.json({
      text: `📱 **Cómo obtener número de celular y tarjeta Rav-Kav:**

📲 **1. Celular israelí:**
- Es prioritario obtenerlo en tus primeras 24-48 horas para trámites del banco, turnos y Misrad HaAliyah.
- Puedes contratar una línea (chip SIM prepago o plan pospago) en empresas locales como Partner, Cellcom, Pelephone, HOT Mobile, Golan Telecom o 019.
- Solo requieres presentarte con tu pasaporte extranjero o Teudat Zehut provisoria y un medio de pago.

🚆 **2. Tarjeta de transporte Rav-Kav (רב-קו):**
- En Israel el transporte público no acepta dinero en efectivo a bordo de colectivos ni trenes.
- **Tarjeta física personalizada:** La puedes tramitar de manera gratuita con tu Teudat Olé y pasaporte en las terminales **Al HaKav** (ubicadas en estaciones de trenes principales como Savidor Merkaz o HaShalom) o en el aeropuerto.
- **Viajar con el celular:** También puedes pagar directamente desde el celular descargando aplicaciones como **Moovit**, **HopOn** o **Rav-Kav Online**, cargándoles saldo o vinculando una tarjeta de crédito.`
    });
  }

  // 8. Urgencias y Miún
  if (q.includes('miun') || q.includes('miún') || q.includes('hospital') || q.includes('guardia')) {
    return res.json({
      text: `⚠️ **Alerta Económica Importante de Guardia (Miún):**
El hospital en Israel **NO es gratuito** para consultas espontáneas. Si te presentas en la guardia (**Miún**) sin derivación previa (**hafniá**), recibirás una factura de cientos de shékels.

1. Consulta primero a tu médico de cabecera o telemedicina de la Kupá.
2. Si está cerrado, acude a centros de urgencias intermedias como **Terem** (*2884) o **Bikur Rofé**.
3. Acude a la guardia hospitalaria únicamente con derivación formal, por riesgo de vida o internación directa.`
    });
  }

  // Respuesta general de respaldo
  return res.json({
    text: `Para consultas puntuales sobre trámites oficiales de Aliyah (Sal Klitá, licencias, Tofes 101, Bituaj Leumi o Pikud HaOref), por favor especifica el trámite para brindarte el paso a paso detallado.`
  });
}
