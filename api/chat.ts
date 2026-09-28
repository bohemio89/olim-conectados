export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { userQuery, messages } = req.body || {};
  const currentQuery = (userQuery || (messages && messages.length > 0 ? messages[messages.length - 1].content : '') || '').trim();

  if (!currentQuery) {
    return res.status(400).json({ error: 'Consulta vacía' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  const systemPrompt = `================================================================================
ROL Y MISIÓN — ASISTENTE SENIOR EXPERTO DE "OLIM CONECTADOS"
================================================================================
Sos el Asistente Experto y Consultor Senior en Procesos de Absorción e Integración de Inmigrantes en Israel para la plataforma oficial "Olim Conectados". Tu propósito es orientar con absoluta claridad, empatía, practicidad, rigor institucional y fidelidad factual a los Olim Jadashim hispanohablantes.

================================================================================
REGLAS DE OPERACIÓN ESTRICTAS
================================================================================
1. INFORMACIÓN OFICIAL, EXHAUSTIVA Y SECUENCIAL:
   - Toda respuesta debe ser rica en detalles, pasos secuenciales ordenados en listas numeradas (1, 2, 3), nombres exactos de formularios y advertencias económicas preventivas en negrita.
   - NUNCA entregar respuestas cortas, vagas o derivar con mensajes genéricos vacíos.
   - NUNCA inventar procedimientos, plazos ni normativas inexistentes.
   - PROHIBIDO agregar al pie del texto etiquetas residuales o artificiales como "Fuente: ...". Las entidades oficiales y normativas deben citarse de forma natural y fluida dentro del cuerpo del mensaje.
   - Vocabulario en hebreo transliterado obligatorio en términos clave, siempre entre paréntesis y en negrita (ej: **Ishur Nihul Jeshbón** [אישור ניהול חשבון], **hafniá** [הפניה], **BL 250** [טופס 250], **Nekudot Zijui** [נקודות זיכוי], **Tik Nikuyim** [תיק ניכויים]).

2. BASE DE CONOCIMIENTO INSTITUCIONAL OBLIGATORIA:
   • OLEI: ONG voluntaria y comunitaria sin fines de lucro, NO una entidad gubernamental ni médica. Sedes activas obligatorias: Tel Aviv, Jerusalén, Haifa, Netanya, Ashdod, Ra'anana, Beer Sheva, Karmiel, Modi'in y Rishon LeZion. Acompañamiento presencial y traducción en bancos, citas de Kupat Jolim y oficinas de absorción; asesoramiento legal/social inicial; eventos comunitarios; biblioteca en español (olei.org.il).
   • Misrad HaAliyah: Sal Klitá (apertura de cuenta con libreta de Teudat Olé provisoria de papel, emisión de Ishur Nihul Jeshbón [אישור ניהול חשבון] o cheque anulado, entrega presencial al póked o en gov.il); Voucher de Ulpán Privado de hasta 5.200 NIS con autorización previa obligatoria del póked (Schovar Klitá) ANTES de pagar; Subsidio de alquiler (Siyua bi'Sjirot) finalizando estrictamente en el mes 30 (cubre de mes 7 a 30) y continuidad posterior solo vía Misrad HaBinui VeHaShikún; Asesoramiento empresarial (*2994 / Maalot) con consultores y contadores homologados en español para plan de negocio, Osek Patur/Murshe y préstamos preferenciales.
   • Bituaj Leumi: Formulario BL 250 (Tofes le-matan tipul refu'í) sellado por el empleador obligatorio para tendinitis/lesión laboral que cubre 100% de atención y estudios médicos; Teudá Refu'it Rishoná y formulario BL 211 para subsidio Dmei Pgi'á (hasta 91 días); Alerta Miún sin hafniá.
   • Rashut HaMisim: Tofes 101 con casilla Olé Jadash para Nekudot Zijui por 42 meses; Teum Mas online con Tik Nikuyim (9 dígitos) de cada empleador para evitar retención del 47% en segundo empleo.
   • Misrad HaRishuí: Canje con >5 años de antigüedad exento de exámenes teórico y práctico con Tofes Yarok, Bedikat Einaim en óptica autorizada y turno MyVisit; Rav-Kav y telefonía celular prioritaria.
   • Pikud HaOref: Prohibición absoluta de despido laboral por directivas de seguridad, falta de Mamad/Miklat o cuidado de hijos; prohibición de descontar vacaciones forzadas a saldo negativo sin consentimiento previo.
   • Kupot Jolim: Filtro por idioma (Español / ספרדית) en apps/webs o central telefónica (*3555, *2700, *3833, *507) pidiendo meturgeman be-sfaradit.
   • Vida cotidiana: Allenby 37, Levanda 13 ("La Tienda"), calle Bialik en Ramat Gan (aclarando honestamente la falta de numeración exacta), Shuk HaCarmel (solo frutas/especias, NO yerba ni alfajores), Tiv Ta'am y Keshet Teamim.

3. ENFOQUE CONVERSACIONAL Y RESPUESTA PUNTUAL:
   - Responde de manera conversacional, directa y enfocada ÚNICAMENTE a lo que se te pregunta.
   - Si el usuario pregunta por una dirección o altura puntual (ej. "¿En Bialik, tenés la dirección para comprar yerba?"), contesta específicamente sobre ese punto: confirma que sobre la calle Bialik (en Ramat Gan) hay comercios y dietéticas que traen yerba, pero admite con total honestidad que no cuentas con la numeración catastral exacta de la calle en tu base de datos confirmada. NO listes Tel Aviv, Shuk HaCarmel o envíos a menos que el usuario pida alternativas o la pregunta sea amplia.
   - PROHIBIDO volcar el contexto completo si no fue solicitado expresamente.`;

  // 1. LLAMADA AL MODELO DE IA
  if (apiKey) {
    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              ...(messages && messages.length > 1
                ? messages.slice(-5).map((m: any) => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }]
                  }))
                : [{ role: 'user', parts: [{ text: currentQuery }] }])
            ],
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.25,
              maxOutputTokens: 1600
            }
          })
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated) {
          return res.status(200).json({ text: generated });
        }
      }
    } catch (err) {
      console.error('Error al consultar Gemini REST:', err);
    }
  }

  // 2. BASE OFICIAL DE RESPALDO (100% RESTAURADA Y EXHAUSTIVA)
  const q = currentQuery.toLowerCase();

  // 1. OLEI (Organización de Latinoamericanos, Españoles y Portugueses en Israel)
  if (
    q.includes('olei') ||
    q.includes('organización de inmigrantes') ||
    q.includes('organizacion de inmigrantes') ||
    q.includes('asociacion de olim') ||
    q.includes('asociación de olim') ||
    (q.includes('acompaña') && (q.includes('banco') || q.includes('kupa') || q.includes('kupá') || q.includes('tramite') || q.includes('trámite') || q.includes('voluntari')))
  ) {
    return res.status(200).json({
      text: `🤝 **OLEI - Organización de Latinoamericanos, Españoles y Portugueses en Israel:**

1. **Naturaleza Institucional:**
   - La **OLEI** [עולי] es una **organización no gubernamental (ONG), voluntaria y comunitaria sin fines de lucro**, NO una entidad gubernamental ni médica. Su propósito es brindar orientación, contención afectiva y acompañamiento solidario a los inmigrantes hispanohablantes.

2. **Filiales y Presencia Geográfica (Sedes Activas Obligatorias):**
   - Cuenta con delegaciones activas y voluntariado en ciudades clave: **Tel Aviv, Jerusalén, Haifa, Netanya, Ashdod, Ra'anana, Beer Sheva, Karmiel, Modi'in y Rishon LeZion**.

3. **Servicios Reales y Acompañamiento Práctico:**
   - **Acompañamiento presencial y traducción:** Dispone de una red de voluntarios que te acompañan personalmente al banco, a consultas médicas en **Kupot Jolim** y a dependencias oficiales de absorción si aún no dominas el hebreo.
   - **Orientación inicial:** Asesoramiento legal y social primario, apoyo en la comprensión de contratos de alquiler y boletas municipales de **Arnoná**.
   - **Comunidad y cultura:** Encuentros comunitarios, grupos de integración social por edades y biblioteca en español.
   - **Contacto y sitio web:** Puedes comunicarte con la sede de tu ciudad o ingresar a su portal oficial [olei.org.il](https://olei.org.il).`
    });
  }

  // 2. Misrad HaAliyah — Apertura de Cuenta Bancaria e Información de Cuenta para Cobrar Sal Klitá
  if (
    q.includes('sal klit') ||
    (q.includes('cuenta') && (q.includes('banco') || q.includes('informo') || q.includes('informar') || q.includes('cobrar') || q.includes('abrir') || q.includes('nihul') || q.includes('jeshbon') || q.includes('kheshbon')))
  ) {
    return res.status(200).json({
      text: `🏦 **Cómo Abrir tu Cuenta Bancaria e Informar al Misrad HaAliyah para Cobrar el Sal Klitá:**

1. **Apertura de Cuenta en el Banco:**
   - Acude a una sucursal bancaria durante tus primeros 3 a 5 días hábiles en Israel.
   - **Documentos obligatorios:** Libreta física de **Teudat Olé** [תעודת עולה] provisoria de papel (entregada en el aeropuerto), **Teudat Zehut** provisoria, pasaporte extranjero original y número de celular israelí activo.
   - Solicita la exención de comisiones de mantenimiento para nuevo inmigrante (**Ptor me-Amalot**).

2. **Obtención del Documento Oficial de Cuenta:**
   - Exige en ventanilla el certificado bancario oficial llamado **Ishur Nihul Jeshbón** (**אישור ניהול חשבון**) o un cheque anulado donde conste tu nombre, número de sucursal (**snif**) y número de cuenta.

3. **Presentación ante Misrad HaAliyah:**
   - Puedes entregar el comprobante en mano a tu asesor personal (**póked**) en la sucursal de tu ciudad.
   - O enviarlo escaneado por correo electrónico al asesor asignado o cargarlo a través de la zona personal en **gov.il**.

4. **Plazos y Modalidad de Cobro:**
   - El **Sal Klitá** [סל קליטה] consta de 6 cuotas: un primer pago inicial en el aeropuerto/efectivo seguido de **5 cuotas mensuales consecutivas** que se depositarán automáticamente en tu cuenta una vez registrada en el sistema.`
    });
  }

  // 3. Misrad HaAliyah — Voucher de Ulpán Privado (5.200 NIS)
  if (
    q.includes('voucher') ||
    (q.includes('ulp') && (q.includes('privado') || q.includes('5.200') || q.includes('5200') || q.includes('citizen') || q.includes('bayit')))
  ) {
    return res.status(200).json({
      text: `🎓 **Voucher de Ulpán Privado de Misrad HaAliyah (Hasta 5.200 NIS):**

1. **Beneficio Oficial:**
   - Subsidio oficial de hasta **5.200 NIS** para cursar hebreo en institutos privados autorizados por el Estado (como *Citizen Café*, *Ulpan Bayit*, etc.).

2. **Requisitos de Elegibilidad:**
   - Haber finalizado el Ulpán estatal inicial (**Ulpán Álef** [אולפן א׳]) o demostrar que no existen cupos públicos disponibles en tu zona geográfica dentro de tu período de derechos de Aliá.

3. **Paso Crítico Obligatorio (Autorización Previa del Póked):**
   - **¡ADVERTENCIA FUNDAMENTAL!:** La solicitud del voucher (**Schovar Klitá** [שובר קליטה]) debe tramitarse y aprobarse formalmente con tu asesor (**póked**) en **Misrad HaAliyah** **ANTES de inscribirte o abonar el curso en la institución privada**. Si pagas la matrícula antes de contar con la autorización formal previa, el ministerio no otorgará el reintegro.

4. **Condiciones para el Reintegro Económico:**
   - Cumplir con una asistencia presencial o digital mínima del **80%** de las clases.
   - Rendir y aprobar el examen final del instituto privado autorizado.
   - Presentar la factura cancelada y el certificado de aprobación en el ministerio para que se efectúe la transferencia a tu cuenta bancaria.`
    });
  }

  // 4. Misrad HaAliyah — Corte de Ayuda de Alquiler en el Mes 30
  if (
    q.includes('mes 30') ||
    (q.includes('alquiler') && (q.includes('corta') || q.includes('termina') || q.includes('finaliza') || q.includes('siyua') || q.includes('sjirot') || q.includes('deje de cobrar') || q.includes('dejé de cobrar')))
  ) {
    return res.status(200).json({
      text: `🏠 **Subsidio de Alquiler de Misrad HaAliyah y Corte Reglamentario en el Mes 30:**

1. **Cronograma y Duración Legal:**
   - La ayuda automática de alquiler (**Siyua bi'Sjirot** [סיוע בשכר דירה]) otorgada por **Misrad HaAliyah** comienza de forma automática a partir del **mes 7** de tu llegada a Israel.
   - Tiene una duración reglamentaria máxima fijada por ley de **24 meses continuos** (cubre de forma ininterrumpida desde el **mes 7 hasta el mes 30** de tu Aliá).

2. **¿Por qué se corta en el mes 30?:**
   - Al finalizar el mes 30 de residencia, el derecho de absorción inicial **concluye por normativa general del Ministerio de Aliá**. No se trata de un error bancario ni de una suspensión individual.

3. **Mes 31 en adelante (Continuidad por Vulnerabilidad Socioeconómica):**
   - A partir del mes 31, la asistencia económica ya no depende del Ministerio de Aliá.
   - Si tu grupo familiar califica bajo condiciones socioeconómicas vulnerables o de bajos ingresos comprobados, la continuidad del subsidio habitacional pasa a tramitarse ante el **Ministerio de Construcción y Vivienda (Misrad HaBinui VeHaShikún)** a través de sus empresas gestoras (Amidar, Milgam o Matan) mediante evaluación social individual.`
    });
  }

  // 5. Misrad HaAliyah — Asesoramiento Empresarial (*2994 / Maalot)
  if (
    q.includes('2994') ||
    q.includes('maalot') ||
    q.includes('מעלות') ||
    q.includes('plan de negocio') ||
    (q.includes('negocio') && (q.includes('abrir') || q.includes('asesor') || q.includes('emprender') || q.includes('autónomo') || q.includes('osek') || q.includes('préstamo') || q.includes('prestamo')))
  ) {
    return res.status(200).json({
      text: `💼 **Asesoramiento Oficial Gratuito para Emprendedores y Negocios (*2994 / Maalot):**

Para abrir, trasladar o formalizar un negocio en Israel, el Ministerio de Aliyá y Absorción (**Misrad HaAliyah veHaKlitá**) ofrece asistencia oficial a través de la División de Emprendimiento Empresarial (**Agaf Yazamut Iskit**):

1. **Línea Telefónica Directa Gratuita:**
   - Comunícate al centro oficial llamando al ***2994** (atención multilingüe, incluyendo asesores en español).

2. **Centros de Negocios Maalot (מרכזי מעלו״ת):**
   - Red de más de 150 consultores y contadores públicos homologados.
   - Cada Olé Jadash tiene derecho a **horas de consultoría subvencionadas sin costo** con especialistas hispanohablantes para analizar la viabilidad comercial, diseñar el modelo de negocio y estructurar el plan financiero.

3. **Estructura Tributaria y Trámites:**
   - Asesoramiento paso a paso para la apertura de expediente fiscal como autónomo exento (**Osek Patur** [עוסק פטור]) o autónomo general (**Osek Murshe** [עוסק מורשה]), junto con las gestiones ante **Mas Hajnasá**, **Ma'am** (IVA) y **Bituaj Leumi**.

4. **Financiamiento Preferencial:**
   - Gestión y acceso a líneas de crédito preferenciales y fondos de garantía estatal específicos para nuevos inmigrantes.`
    });
  }

  // 6. Bituaj Leumi — Lesiones, Tendinitis y Formulario BL 250
  if (
    q.includes('tendinitis') ||
    q.includes('bl 250') ||
    q.includes('bl250') ||
    (q.includes('250') && q.includes('formulario')) ||
    (q.includes('dolor') && q.includes('trabajo')) ||
    (q.includes('accidente') && (q.includes('trabajo') || q.includes('laboral') || q.includes('trayecto')))
  ) {
    return res.status(200).json({
      text: `🏥 **Lesiones Laborales, Tendinitis y Formulario BL 250 (Bituaj Leumi):**

Si sufres dolores por esfuerzo repetitivo (tendinitis), molestias musculares o un accidente en tu puesto o en el trayecto laboral, es obligatorio seguir este procedimiento desde el primer minuto:

1. **Firma y Sello del Formulario BL 250 (טופס 250):**
   - El empleador **DEBE completar, firmar y sellar de forma obligatoria** el formulario oficial **BL 250** (**Tofes le-matan tipul refu'í le-nifgá avodá** [טופס למתן טיפול רפואי לנפגע בעבודה]).
   - Con este formulario sellado, la atención médica de urgencia, consultas especializadas y estudios diagnósticos en tu **Kupat Jolim** o guardia quedan **cubiertos al 100% sin costo para ti**.

2. **Primera Atención Médica (Registro Clave):**
   - Al acudir al médico en la Kupá o guardia, exige expresamente que en el resumen clínico (**sijum majalí** [סיכום מחלה]) se asiente de forma textual que la dolencia se inició trabajando (**be-avodá** [בעבודה]). Si el médico omite la causa laboral, Bituaj Leumi rechazará el reconocimiento.
   - El profesional expedirá la **Teudá Refu'it Rishoná le-Nifgá Avodá** (**תעודה רפואית ראשונה לנפגע בעבודה**) donde se fijan los días de reposo.

3. **Cobro de Salarios Caídos (BL 211 - Dmei Pgi'á):**
   - Para percibir la compensación económica por los días no trabajados (**Dmei Pgi'á** [דמי פגיעה], cubierto hasta 91 días al 75% del salario base), presenta ante **Bituaj Leumi** el formulario **BL 211** adjuntando el BL 250 sellado y los comprobantes médicos.

4. **Secuelas e Incapacidad:**
   - Si la dolencia persiste o genera limitación funcional prolongada, solicita evaluación ante el Médico Ocupacional (**Rofé Taasukatí** [רופא תעסוקתי]) y apertura de expediente de discapacidad laboral.`
    });
  }

  // 7. Salud y Urgencias — Alerta Miún (Guardia Hospitalaria) y MADA
  if (
    (q.includes('miun') || q.includes('miún') || q.includes('guardia') || q.includes('hospital') || q.includes('mada') || q.includes('ambulancia')) &&
    !q.includes('activar') &&
    !q.includes('credencial') &&
    !q.includes('turno')
  ) {
    return res.status(200).json({
      text: `⚠️ **Alerta Económica Importante: Guardia Hospitalaria (Miún) y Ambulancias (MADA):**

El hospital en Israel **NO es gratuito para consultas médicas espontáneas**. Acudir por cuenta propia sin seguir los pasos oficiales genera facturas elevadas (**heshbonit** [חשבונית]) de entre 500 y más de 1.000 NIS que tu obra médica no reembolsará:

1. **Paso 1 - Médico de Cabecera o Telemedicina:**
   - Consulta primero con tu médico de familia (**Rofé Mishpajá** [רופא משפחה]) o accede a la telemedicina y chat médico 24/7 disponible en la app oficial de tu Kupá.

2. **Paso 2 - Urgencias Intermedias (Fuera de horario y fines de semana):**
   - Si la clínica está cerrada, acude a centros de atención intermedia como **Terem** [טרם] (teléfono ***2884**) o **Bikur Rofé** [ביקור רופא]. El copago es sumamente bajo y sus médicos evaluarán si tu cuadro clínico requiere derivación formal.

3. **Paso 3 - Cuándo acudir al Hospital (Miún [מיון]):**
   - Concurre a la guardia hospitalaria **ÚNICAMENTE con orden de derivación formal (Hafniá [הפניה]) emitida por un médico**, si sufres un traumatismo severo con fractura evidente o si el cuadro reviste riesgo inminente de vida. Si el paciente queda efectivamente internado (**ishpuz** [אשפוז]), la factura queda 100% exenta.

4. **Ambulancias (MADA - 101):**
   - El despacho de una ambulancia de **Magen David Adom** emite factura de cobro automática. Solo queda exenta o cubierta al 100% si el traslado culmina en **internación hospitalaria efectiva** o responde a emergencias vitales tipificadas por la ley de salud.`
    });
  }

  // 8. Rashut HaMisim — Tofes 101 y Puntos de Crédito (Nekudot Zijui)
  if (
    q.includes('101') ||
    (q.includes('mas hajnas') && (q.includes('reteng') || q.includes('llenar') || q.includes('tofes') || q.includes('impuesto')))
  ) {
    return res.status(200).json({
      text: `📑 **Cómo Completar el Tofes 101 para Evitar Retenciones de Más (Mas Hajnasá):**

1. **Obligatoriedad y Plazo:**
   - Se debe completar al ingresar a cualquier nuevo empleo en Israel y anualmente en el mes de enero al inicio de cada año fiscal.

2. **Puntos de Crédito para Inmigrantes (Nekudot Zijui):**
   - En la sección relativa a tu condición personal, **debes tildar expresamente la casilla de Olé Jadash [עולה חדש]**.
   - Anexa siempre una **copia legible de tu Teudat Olé** donde conste con claridad tu fecha de llegada al país (**Taarij Aliyá**).

3. **Vigencia del Beneficio Fiscal (Primeros 42 Meses):**
   - Los puntos de crédito fiscal adicionales (**Nekudot Zijui** [נקודות זיכוי]) descuentan directamente el impuesto a las ganancias (**Mas Hajnasá**):
     * **Meses 1 a 18 de Aliá:** 3 puntos de crédito adicionales.
     * **Meses 19 a 30 de Aliá:** 2 puntos de crédito adicionales.
     * **Meses 31 a 42 de Aliá:** 1 punto de crédito adicional.

4. **Verificación en el Recibo de Sueldo (Tlush Sajar):**
   - Al cobrar tu primer salario, controla en tu **tlush sajar** [תלוש שכר] en el casillero de *Nekudot Zijui* que figuren computados tus puntos de Olé para confirmar que no te aplicaron retenciones indebidas.`
    });
  }

  // 9. Rashut HaMisim — Dos Trabajos Simultáneos y Teum Mas (47%)
  if (
    q.includes('teum mas') ||
    q.includes('47%') ||
    (q.includes('2 trabajos') || q.includes('dos trabajos') || q.includes('segundo trabajo') || q.includes('pluriempleo'))
  ) {
    return res.status(200).json({
      text: `⚠️ **Dos Trabajos Simultáneos: Cómo Hacer el Teum Mas y Evitar la Retención del 47%:**

Por normativa fiscal en Israel, si una persona tiene más de un empleo y no presenta la coordinación impositiva oficial, el segundo empleador está legalmente obligado a retener la tasa máxima marginal (aproximadamente el **47%** de tu sueldo secundario).

📋 **Procedimiento Obligatorio Paso a Paso:**
1. **Paso 1 - Obtener el Tik Nikuyim de cada Empleador:**
   - Solicita en el departamento de RRHH o contabilidad de cada uno de tus empleadores su número de expediente de deducción patronal (**Tik Nikuyim** [תיק ניכויים], un código numérico de 9 dígitos).

2. **Paso 2 - Trámite Digital en Rashut HaMisim:**
   - Ingresa al portal oficial de **Rashut HaMisim** [רשות המסים] (Autoridad Tributaria) en el aplicativo **Teum Mas Online** (תיאום מס באינטרנט).

3. **Paso 3 - Declaración y Asignación de Beneficios:**
   - Declara cuál es tu empleo principal (donde aplicas tus puntos de crédito **Nekudot Zijui** de Olé Jadash) y declara el sueldo bruto proyectado para el segundo empleo.

4. **Paso 4 - Entrega de la Constancia Oficial:**
   - El sistema emite un certificado oficial con la tasa de retención exacta que le corresponde aplicar a tu segundo trabajo. **Descarga el documento y entrégalo en administración de tu segundo empleo** antes de la fecha de cierre de liquidación de sueldos.`
    });
  }

  // 10. Misrad HaRishuí — Canje de Licencia de Conducir Extranjera (>5 años)
  if (
    q.includes('licencia') &&
    (q.includes('canje') || q.includes('canjeo') || q.includes('5 años') || q.includes('extranjera') || q.includes('conducir') || q.includes('manejar'))
  ) {
    return res.status(200).json({
      text: `🚗 **Canje de Licencia de Conducir Extranjera (>5 años de Antigüedad):**

Si tu licencia de conducir extranjera cuenta con más de 5 años de antigüedad comprobada y estás dentro de tus primeros años de Aliá:
- **Exención Total:** Puedes realizar la convalidación directa **sin rendir examen práctico de manejo (test) ni examen teórico**.

📋 **Pasos Obligatorios para Obtener la Licencia Israelí:**
1. **Tofes Yarok (Formulario Digital):**
   - Completa la solicitud en línea en el portal de **Misrad HaRishuí** [משרד הרישוי] (Ministerio de Transporte) seleccionando canje de licencia extranjera (**Hamarat Rishayón** [המרת רישיון]). Recibirás un código SMS de confirmación.

2. **Examen de Vista (Bedikat Einaim):**
   - Concurre a una óptica autorizada asociada al sistema de transporte para realizar el control oftalmológico (**Bedikat Einaim** [בדיקת עיניים], costo aproximado de 50 NIS). El resultado se carga directamente en el sistema digital.

3. **Reserva de Turno en MyVisit:**
   - Agenda tu cita presencial en la oficina de **Misrad HaRishuí** más cercana a través de la plataforma [myvisit.com](https://myvisit.com).

4. **Documentación a Presentar en Ventanilla:**
   - Pasaporte extranjero original.
   - **Teudat Zehut** (definitiva o provisoria).
   - Libreta de **Teudat Olé**.
   - Licencia de conducir física original y vigente de tu país de origen.

⚠️ *Plazo de Conducción:* Recuerda que solo está permitido manejar en Israel con tu registro extranjero durante los **primeros 12 meses** desde tu fecha de llegada (**Taarij Aliyá**).`
    });
  }

  // 11. Pikud HaOref y Emergencias — Derechos Laborales
  if (
    q.includes('pikud') ||
    q.includes('haoref') ||
    (q.includes('despedir') && q.includes('vacaciones')) ||
    (q.includes('guerra') && q.includes('trabajo'))
  ) {
    return res.status(200).json({
      text: `🛡️ **Directivas de Pikud HaOref y Protección de Derechos Laborales:**

En situaciones de emergencia y alertas de seguridad civil dictadas por el Comando del Frente Interno (**Pikud HaOref** [פיקוד העורף]), la legislación laboral israelí protege rigurosamente a los trabajadores:

1. **Prohibición Absoluta de Despido:**
   - La ley prohíbe taxativamente que un empleador despida a un trabajador que no concurra a sus tareas por cualquiera de las siguientes causas:
     * Instrucciones expresas de seguridad de **Pikud HaOref** que limiten la actividad laboral en la zona.
     * Falta de refugio reglamentario accesible (**Mamad** [ממ"ד] o **Miklat** [מקלט]) en el establecimiento de trabajo dentro del tiempo de alerta establecido para la localidad.
     * Obligación de permanecer al cuidado de hijos menores de 14 años ante la suspensión oficial de clases presenciales en escuelas y jardines.

2. **Días de Vacaciones y Saldo Negativo Prohibido:**
   - El empleador **NO puede descontar de manera unilateral o forzosa** estos días de tus vacaciones si no cuentas con días positivos acumulados en tu haber. Está prohibido por ley dejar el balance de vacaciones en saldo negativo sin el consentimiento previo expreso del empleado.

3. **Compensación Salarial:**
   - En estados de emergencia prolongados (**Matzav Meiyujad ba-Oref**), el Estado aprueba acuerdos marco e indemnizaciones salariales a través de **Bituaj Leumi** y el Ministerio de Trabajo para cubrir las jornadas laborales caídas.`
    });
  }

  // 12. Celular y Transporte (Rav-Kav)
  if (
    (q.includes('celular') || q.includes('telefono') || q.includes('sim')) &&
    (q.includes('rav-kav') || q.includes('rav kav') || q.includes('transporte') || q.includes('como consigo') || q.includes('cómo consigo'))
  ) {
    return res.status(200).json({
      text: `📱 **Cómo Obtener Número de Celular y Tarjeta Rav-Kav en tus Primeros Días:**

📲 **1. Línea Celular Israelí (Día 1):**
- **Prioridad absoluta:** Es indispensable para activar la cuenta de banco, recibir códigos SMS de autenticación de MyVisit y comunicarse con Misrad HaAliyah.
- **Dónde contratar:** En locales de telefonía o centros comerciales de empresas autorizadas (Partner, Cellcom, Pelephone, HOT Mobile, Golan Telecom o 019).
- **Requisitos:** Solo requieres presentarte con tu pasaporte extranjero vigente o Teudat Zehut provisoria y un medio de pago para contratar plan mensual o chip SIM prepago.

🚆 **2. Tarjeta de Transporte Rav-Kav (רב-קו):**
- En Israel **no se abona con efectivo** a bordo de colectivos urbanos ni trenes.
- **Tarjeta física personalizada:** Se emite de forma gratuita con tu perfil de Olé Jadash en los centros **Al HaKav** (en estaciones de tren centrales como Savidor Merkaz o HaShalom en Tel Aviv y en el aeropuerto Ben Gurión), presentando tu Teudat Olé y pasaporte.
- **Pago mediante el celular:** También puedes pagar directamente tus viajes descargando aplicaciones autorizadas como **Moovit**, **HopOn** o **Rav-Kav Online**, cargándoles saldo o asociando una tarjeta de crédito o débito.`
    });
  }

  // 13. Médico que Hable Español en la Kupá
  if (
    (q.includes('médico') || q.includes('medico') || q.includes('turno')) &&
    (q.includes('español') || q.includes('kupa') || q.includes('kupá'))
  ) {
    return res.status(200).json({
      text: `🩺 **Cómo Solicitar Turno con un Médico que Hable Español en tu Kupat Jolim:**

1. **Búsqueda por Idioma en Aplicación o Portal Web:**
   - En las apps y webs oficiales de tu obra médica (**Maccabi**, **Clalit**, **Meuhedet** o **Leumit**), al buscar especialistas por ciudad o especialidad, abre el menú de filtros avanzados y selecciona en **Idioma (Language / שפה)** la opción **Español (ספרדית)**.

2. **Central Telefónica con Traductor en Línea:**
   - Comunícate a la central de turnos de tu Kupá:
     * **Maccabi:** ***3555**
     * **Clalit:** ***2700**
     * **Meuhedet:** ***3833**
     * **Leumit:** ***507**
   - Solicita atención o traducción en español diciendo: *"Efshar meturgeman be-sfaradit?"* (*¿Es posible contar con un traductor al español?*).

3. **Derivación de Médico de Cabecera:**
   - Si no hay especialista hispanohablante en tu zona inmediata, tu médico general de familia (**Rofé Mishpajá**) puede derivarte a telemedicina o coordinar interconsulta con un profesional que atienda en tu lengua materna.
   - También puedes consultar el directorio nacional independiente en **doctors.org.il**.`
    });
  }

  // 13b. Consulta puntual sobre Calle Bialik (Ramat Gan)
  if (q.includes('bialik')) {
    return res.status(200).json({
      text: `🧉 **Yerba Mate y Productos en Calle Bialik (Ramat Gan):**

Sobre la avenida comercial **Bialik** en Ramat Gan, efectivamente hay tiendas de productos naturales (**Batei Teva**) y dietéticas que traen yerba mate y productos del Cono Sur de forma regular.

Sin embargo, para mantener absoluta rigurosidad y honestidad factual, **no dispongo en este momento de la numeración catastral o altura exacta** de esos comercios en mi base de datos confirmada. Al recorrer las cuadras comerciales de Bialik podrás identificar fácilmente los locales y dietéticas que exhiben marcas tradicionales de yerba y productos importados en sus vidrieras.`
    });
  }

  // 14. Yerba Mate y Productos Latinoamericanos
  if (
    q.includes('yerba') ||
    q.includes('mate') ||
    q.includes('productos importados') ||
    q.includes('dulce de leche') ||
    q.includes('alfajor') ||
    q.includes('harina pan') ||
    q.includes('arepa')
  ) {
    return res.status(200).json({
      text: `🧉 **Dónde Comprar Yerba Mate y Productos Latinoamericanos en Israel:**

📍 **Puntos Físicos Confirmados:**
1. **Tel Aviv — Allenby 37:**
   - Local referente especializado en productos argentinos y del Cono Sur (yerba mate de diversas marcas, dulce de leche, alfajores, golosinas y tapas para empanadas).
2. **Tel Aviv — Levanda 13 ("La Tienda - Comida Latina"):**
   - Punto de referencia panlatino con Harina P.A.N. para arepas, frijoles y caraotas, tortillas de maíz, salsas mexicanas, pulpas de frutas congeladas, panela/papelón y quesos típicos.
3. **Ramat Gan — Calle Bialik:**
   - Comercios y tiendas naturistas (**Batei Teva**) sobre la avenida comercial Bialik suelen contar con stock regular de yerba mate y productos de importación. *(Nota: no se dispone de la numeración exacta de altura catastral en la base de datos)*.
4. **Shuk HaCarmel (Tel Aviv):**
   - Exclusivamente para frutas tropicales (plátano macho), cilantro fresco y chiles frescos o secos. *(Aclaración: NO es punto de referencia para yerba mate ni alfajores empaquetados)*.

🛒 **Cadenas de Supermercados (Todo Israel):**
- Grandes cadenas como **Tiv Ta'am** y **Keshet Teamim** disponen en sus sucursales de góndolas fijas de importación internacional con marcas tradicionales de yerba mate y dulce de leche.

🚚 **Envíos a Domicilio y Redes Comunitarias:**
- Tiendas virtuales especializadas realizan despachos a todo el país (kibutzim, moshavim y ciudades del interior).
- Se recomienda consultar grupos de Facebook y WhatsApp de la comunidad ("Argentinos en Israel", "Latinos en Israel", "Colombianos en Israel") para información de ferias artesanales y compras conjuntas.`
    });
  }

  // Respuesta orientativa exhaustiva estructurada final
  return res.status(200).json({
    text: `Para orientarte con la máxima exactitud en tu proceso de Aliá, selecciona tu consulta entre los trámites y derechos oficiales:

1. **Misrad HaAliyah:**
   - Apertura de cuenta bancaria e **Ishur Nihul Jeshbón** para cobro de **Sal Klitá** (meses 1 a 6).
   - Subsidio de **Ulpán Privado** de hasta **5.200 NIS** con autorización previa del póked (**Schovar Klitá**).
   - Finalización reglamentaria de la ayuda de alquiler (**Siyua bi'Sjirot**) en el **mes 30**.
   - Asesoramiento gratuito para emprendedores y autónomos (**Osek Patur / Murshe**) llamando al ***2994** y centros **Maalot**.

2. **Bituaj Leumi y Salud:**
   - Cobertura total por accidentes o tendinitis laboral mediante formulario **BL 250** sellado por el empleador y subsidio **Dmei Pgi'á** con formulario **BL 211**.
   - Escala legal de cobro de días de reposo (**Jok Dmei Majalá**: día 1 al 0%, días 2-3 al 50%, día 4+ al 100%).
   - Alerta económica para evitar facturas en **Miún** (guardia hospitalaria) acudiendo con derivación (**hafniá**) o a centros intermedios (**Terem** /**Bikur Rofé**).

3. **Empleo, Impuestos y Transporte:**
   - Activación de puntos de crédito (**Nekudot Zijui**) en el **Tofes 101** durante 42 meses.
   - Coordinación fiscal obligatoria (**Teum Mas**) en **Rashut HaMisim** para dos empleos para evitar la retención del 47%.
   - Canje de licencia extranjera de más de 5 años sin exámenes con **Tofes Yarok** y cita en **MyVisit**.
   - Tarjeta **Rav-Kav** personalizada y contratación de línea celular israelí.

4. **Acompañamiento Comunitario:**
   - Asistencia voluntaria de la **OLEI** (ONG comunitaria con sedes en Tel Aviv, Jerusalén, Haifa, Netanya, Ashdod, Ra'anana, Beer Sheva, Karmiel, Modi'in y Rishon LeZion) para trámites de bancos y salud.

Escribe tu consulta puntual para brindarte el paso a paso oficial detallado.`
  });
}
