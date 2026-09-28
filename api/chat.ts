import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

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
    return res.status(400).json({ error: 'La consulta no puede estar vacía' });
  }

  const q = currentQuery.toLowerCase();

  // --- REGLAS RÁPIDAS Y PREGUNTAS FRECUENTES FRECUENTES ---

  // 1. Asesoramiento para abrir un negocio (*2994 / Maalot)
  if (q.includes('negocio') || q.includes('2994') || q.includes('maalot') || q.includes('emprender') || q.includes('autónomo') || q.includes('osek')) {
    return res.status(200).json({
      text: `💼 **Asesoramiento Oficial Gratuito para Emprendedores y Negocios (Misrad HaAliyah):**

1. **Línea directa de contacto:** Puedes comunicarte directamente al centro oficial llamando al **\*2994** o a través de los centros de desarrollo empresarial **Maalot**.
2. **Consultoría personalizada sin costo:** Todo Olé Jadash tiene derecho a horas de consultoría subvencionadas con expertos en negocios, contadores y asesores de mercado que hablan español.
3. **Planes de negocio y financiamiento:** Te asisten en el armado de tu plan de viabilidad, trámites de apertura de expediente tributario (**Osek Patur / Murshe**) y acceso a préstamos con tasas preferenciales y fondos de garantía estatal para nuevos inmigrantes.`,
      source: null
    });
  }

  // 2. Médico en español en la Kupá
  if ((q.includes('médico') || q.includes('medico') || q.includes('turno')) && (q.includes('español') || q.includes('kupa') || q.includes('kupá'))) {
    return res.status(200).json({
      text: `🩺 **Cómo solicitar turno con un médico que hable español en tu Kupat Jolim:**

1. **Búsqueda por idioma en la app/web:**
   - En la aplicación oficial de tu obra médica (Maccabi, Clalit, Meuhedet o Leumit), al filtrar especialistas por zona, ingresa en el filtro avanzado de **Idioma (Language / שפה)** y selecciona **Español (ספרדית)**.
2. **Central telefónica con traductor:**
   - Llama al centro de atención de tu Kupá (*3555 para Maccabi, *2700 para Clalit, *3833 para Meuhedet, *507 para Leumit) y solicita atención o traducción en español (*"Efshar meturgeman be-sfaradit?"*).
3. **Médico de cabecera:** Si no hay especialista hispanohablante directo en tu barrio, tu médico general de cabecera puede coordinar una interconsulta o autorizar telemedicina con un profesional que hable tu idioma.`,
      source: null
    });
  }

  // 3. Yerba mate y productos importados
  if (q.includes('yerba') || q.includes('mate') || q.includes('productos importados') || q.includes('dulce de leche')) {
    return res.status(200).json({
      text: `🧉 **Dónde comprar yerba mate y productos latinoamericanos en Israel:**

1. **Supermercados y tiendas de especialidad:**
   - Cadenas grandes como **Tiv Taam** y **Keshet Teamim** suelen tener secciones fijas de productos importados con varias marcas de yerba mate y dulce de leche.
2. **Comercios y tiendas online de la comunidad:**
   - Tiendas latinas especializadas (como *El Gaucho Market*, *Mate Israel*, *Kankun* y grupos de emprendedores en redes sociales de la comunidad Olim) realizan envíos a todo el país.
3. **Mercados centrales:** En el **Shuk HaCarmel** y **Shuk Levinsky** (Tel Aviv) o **Mahane Yehuda** (Jerusalén) existen puestos de especias y productos importados con yerba y alfajores.`,
      source: null
    });
  }

  // 4. Cuenta bancaria para Sal Klitá
  if (q.includes('sal klit') || (q.includes('cuenta') && (q.includes('banco') || q.includes('abrir') || q.includes('informo') || q.includes('teudat ole')))) {
    return res.status(200).json({
      text: `🏦 **Cómo Abrir tu Cuenta Bancaria e Informar al Misrad HaAliyah:**

1. **Abrir la cuenta en el banco:** Acude con tu libreta de Teudat Olé, Teudat Zehut provisoria de papel y tu pasaporte extranjero.
2. **Pedir el comprobante de cuenta:** Exige en el banco el certificado oficial llamado **Ishur Nihul Jeshbón** (אישור ניהול חשבון) o un cheque anulado donde conste tu nombre y número de cuenta.
3. **Presentarlo ante Misrad HaAliyah:** 
   - Entrégaselo a tu asesor personal (**póked**) en la sucursal de tu ciudad.
   - O envíalo escaneado/fotografiado por correo electrónico al asesor asignado o mediante la zona personal en **gov.il**.
4. **Cobro del Sal Klitá:** Una vez cargada la cuenta en el sistema, las cuotas mensuales restantes se depositarán de forma automática.`,
      source: null
    });
  }

  // 5. Canje de licencia de conducir (>5 años)
  if (q.includes('licencia') && (q.includes('canje') || q.includes('canjeo') || q.includes('5 años') || q.includes('extranjera'))) {
    return res.status(200).json({
      text: `🚗 **Canje de Licencia de Conducir Extranjera (>5 años de antigüedad):**

Si tu licencia extranjera tiene más de 5 años de antigüedad comprobada y estás dentro de tus primeros años de Aliá:
- **Exención total:** Puedes realizar la conversión directa **sin rendir examen práctico ni teórico**.

📋 **Pasos Obligatorios:**
1. **Tofes Yarok:** Completa el formulario digital en la web de Misrad HaRishuí (Ministerio de Transporte).
2. **Control visual:** Realiza el examen de vista con un óptico autorizado (Bedikat Einaim).
3. **Turno en Misrad HaRishuí:** Reserva tu turno por **MyVisit** para acudir a la oficina de licencias.
4. **Documentos a presentar:** Pasaporte original, Teudat Zehut, Teudat Olé y tu licencia de conducir física vigente de tu país de origen.`,
      source: null
    });
  }

  // 6. Tofes 101 y Mas Hajnasá
  if (q.includes('101') || (q.includes('mas hajnas') && q.includes('reteng'))) {
    return res.status(200).json({
      text: `📑 **Cómo completar el Tofes 101 para evitar retenciones de más (Mas Hajnasá):**

1. **Cuándo se llena:** Al ingresar a cualquier trabajo en Israel o en el mes de enero de cada nuevo año fiscal.
2. **Puntos de Crédito (Nekudot Zijui):** 
   - En la sección correspondiente a tu estatus personal, debes tildar expresamente la casilla de **Olé Jadash** (Nuevo Inmigrante).
   - Adjunta siempre una copia legible de tu **Teudat Olé** con la fecha exacta de llegada al país.
3. **El beneficio:** Durante tus primeros 42 meses de Aliá recibes puntos adicionales de descuento fiscal que anulan o reducen notablemente el impuesto a las ganancias.
4. **Verificación:** Al recibir tu primer recibo de sueldo (**tlush sajar**), controla que figuren asignadas tus Nekudot Zijui de Olé.`,
      source: null
    });
  }

  // 7. Corte de ayuda de alquiler en mes 30
  if (q.includes('mes 30') || (q.includes('alquiler') && (q.includes('corta') || q.includes('termina') || q.includes('finaliza')))) {
    return res.status(200).json({
      text: `🏠 **¿Por qué se corta la ayuda de alquiler en el mes 30?:**

- **Límite legal del Ministerio de Aliá:** La ayuda automática de alquiler (**Siyua bi'Sjirot**) otorgada por **Misrad HaAliyah** tiene una duración reglamentaria máxima de **24 meses continuos** (comienza automáticamente en el mes 7 y finaliza de manera estricta en el mes 30).
- **Mes 31 en adelante:** El derecho inicial de absorción concluye por normativa general.
- **Continuidad por necesidad económica:** Si cumplido el mes 30 tu familia califica bajo condiciones socioeconómicas vulnerables o de bajos ingresos, la asistencia económica deja de depender de Aliá y pasa a tramitarse ante el **Ministerio de Construcción y Vivienda (Misrad HaBinui VeHaShikún)** mediante evaluación social individual.`,
      source: null
    });
  }

  // 8. Dos trabajos simultáneos y Teum Mas (47%)
  if (q.includes('teum mas') || q.includes('47%') || q.includes('2 trabajos') || q.includes('dos trabajos')) {
    return res.status(200).json({
      text: `⚠️ **Dos trabajos simultáneos: Cómo hacer el Teum Mas y evitar el 47%:**

Por normativa fiscal en Israel, si tienes más de un empleo y no presentas una coordinación impositiva, el empleador secundario está obligado a retener la tasa máxima legal (aproximadamente el 47%).

📋 **Solución Paso a Paso:**
1. **Número de Tik Nikuyim:** Pídele a cada uno de tus empleadores su número de deducción patronal de 9 dígitos (**Tik Nikuyim** - תיק ניכויים).
2. **Trámite por Internet:** Ingresa al portal de **Rashut HaMisim** (Autoridad Tributaria) en la sección **Teum Mas Online**.
3. **Declaración de Empleos:** Indica cuál es tu empleo principal (donde aplicas tus puntos de crédito de Olé Jadash) y cuál es el secundario con su sueldo estimado.
4. **Presentación:** Descarga la constancia oficial de retención que emite el sistema y preséntala en la oficina de contabilidad o RRHH de tu segundo trabajo.`,
      source: null
    });
  }

  // 9. Pikud HaOref y directivas laborales
  if (q.includes('pikud') || (q.includes('despedir') && q.includes('vacaciones')) || q.includes('haoref')) {
    return res.status(200).json({
      text: `🛡️ **Directivas de Pikud HaOref y Derechos Laborales:**

1. **Prohibición estricta de despido:**
   - La ley israelí protege al trabajador: **está terminantemente prohibido despedir** a un empleado que no pueda concurrir a su puesto debido a instrucciones oficiales de seguridad del Comando del Frente Interno (**Pikud HaOref**), falta de refugio reglamentario (**Mamad/Miklat**) accesible en la zona de trabajo, o por tener que cuidar a hijos menores tras el cierre oficial de colegios.
2. **Días de vacaciones:**
   - El empleador **no puede descontar de manera arbitraria** estos días de tus vacaciones si no cuentas con saldo positivo acumulado de descanso, ni puede dejar tu saldo de vacaciones en negativo sin tu consentimiento previo.
3. **Compensación salarial:**
   - En estados de emergencia civil o conflicto, el Ministerio de Trabajo y Bituaj Leumi implementan acuerdos marco para el pago de salarios de las jornadas no trabajadas por causas de fuerza mayor.`,
      source: null
    });
  }

  // 10. Celular y Rav-Kav
  if ((q.includes('celular') || q.includes('telefono')) && (q.includes('rav-kav') || q.includes('rav kav') || q.includes('transporte'))) {
    return res.status(200).json({
      text: `📱 **Cómo obtener número de celular y tarjeta Rav-Kav:**

📲 **1. Celular israelí:**
- Es prioritario obtenerlo en tus primeras 24-48 horas para trámites del banco, turnos y Misrad HaAliyah.
- Puedes contratar una línea en empresas como Partner, Cellcom, Pelephone, HOT Mobile, Golan Telecom o 019 con tu pasaporte o Teudat Zehut.

🚆 **2. Tarjeta de transporte Rav-Kav (רב-קו):**
- **Tarjeta física:** Se tramita gratis con tu Teudat Olé y pasaporte en las estaciones **Al HaKav** (trenes Savidor Merkaz, HaShalom o aeropuerto).
- **Desde el celular:** Puedes abonar descargando aplicaciones como **Moovit**, **HopOn** o **Rav-Kav Online** asociando tarjeta de crédito.`,
      source: null
    });
  }

  // --- CONSULTA DINÁMICA CON GEMINI ---
  try {
    const candidateModels = ['gemini-2.5-flash', 'gemini-2.5-pro'];[cite: 1]
    let replyText = null;

    for (const modelName of candidateModels) {[cite: 1]
      try {
        const response = await ai.models.generateContent({[cite: 1]
          model: modelName,[cite: 1]
          contents: currentQuery,
          config: {
            systemInstruction: `Eres el Asistente Experto de Olim Conectados, especializado en ayudar a nuevos inmigrantes (Olim Jadashim) en Israel. Responde de forma cálida, clara, precisa y en español. Si se trata de un trámite gubernamental, cita los organismos oficiales correspondientes (Misrad HaAliyah, Bituaj Leumi, Misrad HaPnim, Kupot Jolim). No inventes leyes ni procedimientos.`,
            temperature: 0.25[cite: 1]
          }
        });

        if (response && response.text) {
          replyText = response.text;
          break;
        }
      } catch (e) {
        console.warn(`Fallo con ${modelName}, reintentando...`);
      }
    }

    if (replyText) {
      return res.status(200).json({ text: replyText, source: null });
    }
  } catch (error) {
    console.error('Error invocando Gemini:', error);
  }

  // Fallback si la API no está disponible
  return res.status(200).json({
    text: `Para consultas puntuales sobre trámites oficiales de Aliyah (Sal Klitá, licencias, Tofes 101, Bituaj Leumi o Pikud HaOref), por favor especifica el trámite para brindarte el paso a paso detallado.`,
    source: null
  });
}
