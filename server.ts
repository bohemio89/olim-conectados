import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY is not defined. Server will provide smart rule-based guidance fallback.');
}

const SYSTEM_INSTRUCTION = `
================================================================================
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

   • OLEI (Organización de Latinoamericanos, Españoles y Portugueses en Israel):
     - Naturaleza: Es una ONG voluntaria y comunitaria sin fines de lucro, NO una entidad gubernamental ni médica.
     - Filiales y Presencia Geográfica (OBLIGATORIO MENCIONAR): Cuenta con sedes activas y voluntariado en ciudades clave: Tel Aviv, Jerusalén, Haifa, Netanya, Ashdod, Ra'anana, Beer Sheva, Karmiel, Modi'in y Rishon LeZion.
     - Servicios Reales: Red de voluntarios que realizan acompañamiento presencial y traducción en bancos, citas médicas de Kupat Jolim y oficinas de absorción; asesoramiento legal/social inicial; eventos comunitarios; biblioteca y trámites prácticos si la persona no domina el hebreo. Sitio web: olei.org.il.

   • Misrad HaAliyah VeHaKlita (Ministerio de Inmigración y Absorción):
     - Sal Klitá: Apertura obligatoria de cuenta bancaria en los primeros días hábiles con la libreta de Teudat Olé provisoria de papel y pasaporte; emisión del certificado bancario oficial **Ishur Nihul Jeshbón** (**אישור ניהול חשבון**) o cheque anulado; entrega presencial al asesor personal (**póked**) o subida digital en la zona personal de **gov.il**. Cobro en 6 cuotas (aeropuerto/banco + 5 cuotas mensuales).
     - Voucher de Ulpán Privado (5.200 NIS): Subsidio oficial de hasta 5.200 NIS para institutos privados autorizados (Citizen Café, Ulpan Bayit, etc.). Requisitos: haber concluido el Ulpán estatal inicial (Álef) o acreditar falta de cupo regional en el período de elegibilidad. PASO CRÍTICO OBLIGATORIO: la autorización del voucher (**Schovar Klitá**) debe tramitarse y aprobarse con el asesor (**póked**) ANTES de inscribirse o abonar el curso. Requiere 80% de asistencia y aprobar examen final para recibir el reintegro.
     - Ayuda de Alquiler (**Siyua bi'Sjirot**): Comienza automáticamente en el mes 7 de Aliá y concluye de forma estricta e improrrogable en el **mes 30** (cubre de forma continua exactamente 24 meses). A partir del mes 31, no depende de Aliá; la continuidad solo se tramita ante **Misrad HaBinui VeHaShikún** (Ministerio de Vivienda) por evaluación socioeconómica individual de vulnerabilidad.
     - Asesoramiento Empresarial (*2994 / Maalot): Línea gratuita ***2994** de la División de Emprendimiento (**Agaf Yazamut Iskit**); centros de negocios **Maalot** (**מרכזי מעלו״ת**) con consultores y contadores homologados en español para confección del plan de negocio, apertura de **Osek Patur / Murshe** y acceso a préstamos con tasas preferenciales y fondos de garantía estatal.

   • Bituaj Leumi (Seguridad Social) y Salud Laboral:
     - Lesiones, Dolores Laborales y Tendinitis: Si el dolor o tendinitis es producto de esfuerzo repetitivo o carga laboral, el empleador DEBE firmar y sellar el formulario **BL 250** (**Tofes le-matan tipul refu'í** / **טופס 250**). Con este formulario, la atención médica de urgencia, consultas y estudios diagnósticos en la Kupá o guardia quedan 100% cubiertos. En la primera consulta médica exigir que conste expresamente la causa laboral (**be-avodá**).
     - Días de Reposo y Subsidio: El médico expedirá la **Teudá Refu'it Rishoná le-Nifgá Avodá**. Para percibir el subsidio por días no trabajados (**Dmei Pgi'á**, cubierto hasta 91 días), se debe presentar el formulario **BL 211** ante Bituaj Leumi adjuntando el BL 250 y los comprobantes médicos. Dictamen de secuelas ante Médico Ocupacional (**Rofé Taasukatí**).
     - Alerta Miún (Guardia Hospitalaria): No concurrir a la guardia de un hospital sin derivación (**hafniá**) previa o internación directa; de lo contrario, se cobrarán facturas (**heshbonit**) de cientos a más de mil shékels. Recurrir primero al médico de cabecera (**Rofé Mishpajá**), telemedicina de la Kupá o centros de urgencia intermedia como **Terem** (*2884) o **Bikur Rofé**. Factura de MADA (101) solo exenta con internación hospitalaria efectiva.

   • Rashut HaMisim (Impuestos y Trabajo):
     - Tofes 101: Al ingresar a trabajar o en enero, tildar obligatoriamente la casilla de **Olé Jadash** y anexar copia legible de la **Teudat Olé** con la fecha exacta de llegada. Esto activa las **Nekudot Zijui** (puntos de crédito fiscal) durante los primeros 42 meses de Aliá, reduciendo sustancialmente o anulando el impuesto a las ganancias (**Mas Hajnasá**). Controlar su inclusión en el primer recibo (**tlush sajar**).
     - Dos Trabajos Simultáneos (**Teum Mas**): Si no se realiza la coordinación fiscal online en el portal de **Rashut HaMisim** ingresando el número de retención patronal de 9 dígitos (**Tik Nikuyim**) de cada empleador, el segundo trabajo retendrá automáticamente la tasa máxima legal (aproximadamente el 47%).

   • Misrad HaRishuí (Transporte y Licencias):
     - Canje de Licencia Extranjera (>5 años de antigüedad): Exención total de examen práctico de manejo y examen teórico. Pasos: Formulario digital **Tofes Yarok** en la web de transporte, examen de vista (**Bedikat Einaim**) en óptica autorizada, reserva de turno por **MyVisit** y presentación física original de la licencia extranjera vigente, Teudat Zehut y Teudat Olé. (Permitido manejar con registro extranjero durante los primeros 12 meses de Aliá).
     - Rav-Kav y Telefonía: Transporte público sin dinero en efectivo; emisión de tarjeta personalizada **Rav-Kav** en terminales **Al HaKav** (estaciones centrales de tren y aeropuerto) o pago vía aplicaciones móviles (**Moovit**, **HopOn**, **Rav-Kav Online**). Contratación prioritaria de línea móvil israelí en las primeras 24-48 horas.

   • Pikud HaOref (Comando del Frente Interno) y Emergencias:
     - Derechos laborales: Prohibición absoluta de despido por ausencia motivada en instrucciones oficiales de seguridad de **Pikud HaOref**, falta de refugio reglamentario (**Mamad/Miklat**) accesible en el lugar de trabajo o necesidad de cuidar a hijos menores por suspensión escolar. Prohibición patronal de descontar días dejando saldo negativo de vacaciones sin consentimiento previo expreso del trabajador.

   • Kupot Jolim / Médicos en español:
     - Filtro por idioma (**Español / ספרדית**) en portales y aplicaciones oficiales de **Maccabi** (*3555), **Clalit** (*2700), **Meuhedet** (*3833) o **Leumit** (*507); solicitud de traductor en central telefónica (*"Efshar meturgeman be-sfaradit?"*); derivación por médico de cabecera; directorio nacional **doctors.org.il**.

   • Vida Cotidiana y Productos Latinoamericanos (Todo Israel):
     - Tel Aviv: Local de productos argentinos/latinos en **Allenby 37** (yerba mate, dulce de leche, alfajores, tapas); referente panlatino **"La Tienda - Comida Latina"** en **Levanda 13** (Harina P.A.N., frijoles/caraotas, tortillas de maíz, pulpas de fruta, panela, quesos típicos). **Shuk HaCarmel** exclusivamente para frutas tropicales y especias (NO yerba ni alfajores). **Shuk Levinsky** para frutos secos y especias a granel.
     - Ramat Gan: Dietéticas y comercios sobre la calle comercial **Bialik** (yerba mate y productos de importación; admitir con total honestidad que no se cuenta con la numeración de altura exacta de la calle en la base de datos).
     - Todo Israel: Supermercados con góndola internacional fija (**Tiv Ta'am** y **Keshet Teamim**) y envíos a todo el país vía tiendas online especializadas y grupos comunitarios de Olim.

3. ENFOQUE CONVERSACIONAL Y RESPUESTA PUNTUAL:
   - Responde de manera conversacional, directa y enfocada ÚNICAMENTE a lo que se te pregunta.
   - Si el usuario pregunta por una dirección o altura puntual (ej. "¿En Bialik, tenés la dirección para comprar yerba?"), contesta específicamente sobre ese punto: confirma que sobre la calle Bialik (en Ramat Gan) hay comercios y dietéticas que traen yerba, pero admite con total honestidad que no cuentas con la numeración catastral exacta de la calle en tu base de datos confirmada. NO listes Tel Aviv, Shuk HaCarmel o envíos a menos que el usuario pida alternativas o la pregunta sea amplia.
   - PROHIBIDO volcar el contexto completo si no fue solicitado expresamente.

================================================================================
FORMATO DE SALIDA EXIGIDO
================================================================================
- Estructura limpia y ejecutiva con títulos temáticos claros y emoticonos sobrios.
- Pasos cronológicos ordenados en listas numeradas (1, 2, 3).
- Advertencias preventivas y términos en hebreo transliterado en negrita.
- Tono empático, asertivo, riguroso y libre de especulaciones.
`;

// Review moderation endpoint (Lashon Hará check)
app.post('/api/moderate-review', async (req: Request, res: Response) => {
  const { reviewText, doctorName, specialty } = req.body;

  if (!reviewText || typeof reviewText !== 'string') {
    res.status(400).json({ error: 'Texto de reseña requerido' });
    return;
  }

  // Common abusive words check (Spanish Hebrew context)
  const forbiddenPatterns = [
    /estafador/i,
    /inútil/i,
    /pelotudo/i,
    /boludo de mierda/i,
    /hijo de/i,
    /chanta/i,
    /delincuente/i,
    /asesino/i,
    /garca/i,
    /ladron/i,
    /ladrón/i,
    /hdp/i,
    /forro/i
  ];

  const hasDirectInsult = forbiddenPatterns.some((pattern) => pattern.test(reviewText));

  if (hasDirectInsult) {
    res.json({
      isAllowed: false,
      flagged: true,
      reason: 'El comentario contiene descalificaciones personales o insultos directos contrarios a la ley de difamación (Lashon Hará).',
      recommendation:
        'Transforma tu reseña en una crítica constructiva y factual: detalla si hubo retrasos en el turno, si el dominio de español fue real o básico, si te escuchó con tiempo suficiente o si te propuso estudios alternativos antes de indicar cirugías o medidas drásticas.',
      suggestedRewrite: `Durante la consulta médica con ${doctorName || 'el profesional'}, considero que el tiempo de atención fue apresurado y no se exploraron suficientes opciones de diagnóstico previo antes de indicar tratamientos avanzados. Sugiero mejorar la claridad y la escucha al paciente hispanohablante.`,
    });
    return;
  }

  // If Gemini is available, use it to review for constructive framing
  if (ai) {
    try {
      const prompt = `Analiza este borrador de reseña médica escrito por un paciente inmigrante en Israel:
"${reviewText}"
Médico: ${doctorName || 'Profesional de salud'} (${specialty || 'Especialista'})

Reglas de la plataforma "Olim Conectados":
- Proteger contra difamación (Lashon Hará): sin agresiones, humillaciones ni calumnias.
- Promover hechos comprobables: nivel de idioma español real, tiempo de escucha, alternativas diagnósticas ofrecidas antes de tratamientos drásticos.

Responde ÚNICAMENTE en JSON con esta estructura exacta:
{
  "isAllowed": boolean,
  "feedback": "string explicativo en español",
  "suggestedRewrite": "string con versión pulida y objetiva si amerita mejoras, o la misma reseña si está impecable"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text?.trim() || '{}';
      try {
        const parsed = JSON.parse(responseText);
        res.json({
          isAllowed: parsed.isAllowed ?? true,
          flagged: !parsed.isAllowed,
          reason: parsed.feedback || 'Reseña revisada conforme a las normas de moderación.',
          suggestedRewrite: parsed.suggestedRewrite || reviewText,
        });
        return;
      } catch (e) {
        // Fallback if JSON parse failed
      }
    } catch (err) {
      console.error('Gemini moderation error:', err);
    }
  }

  // Default allowed if no insults detected
  res.json({
    isAllowed: true,
    flagged: false,
    reason: 'Reseña constructiva y dentro de las pautas de respeto.',
    suggestedRewrite: reviewText,
  });
});

// Anonymous chat feedback endpoint (Punto F UX)
const chatFeedbackStore: Array<{ messageId: string; type: 'up' | 'down'; timestamp: string }> = [];

app.post('/api/chat-feedback', (req: Request, res: Response) => {
  const { messageId, type, timestamp } = req.body;
  if (messageId && (type === 'up' || type === 'down')) {
    chatFeedbackStore.push({ messageId, type, timestamp: timestamp || new Date().toISOString() });
    res.json({ success: true, count: chatFeedbackStore.length });
    return;
  }
  res.status(400).json({ error: 'Parámetros de feedback inválidos' });
});

// Chatbot endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages, userQuery, userStage } = req.body;

  const currentQuery = (userQuery || (messages && messages.length > 0 ? messages[messages.length - 1].content : '') || '').trim();

  if (!currentQuery) {
    res.status(400).json({ error: 'La consulta no puede estar vacía' });
    return;
  }

  if (ai) {
    try {
      // Build clean alternating conversation history starting strictly with 'user'
      const formattedContents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

      if (Array.isArray(messages)) {
        for (const m of messages) {
          if (!m || typeof m.content !== 'string') continue;
          const trimmed = m.content.trim();
          if (!trimmed) continue;
          
          // Filter out error messages or transient notices
          if (m.id && typeof m.id === 'string' && m.id.startsWith('err-')) continue;

          const role = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';

          // In Gemini API, the first turn in contents MUST be 'user'
          if (formattedContents.length === 0 && role === 'model') {
            continue;
          }

          // If the last added message has the same role, combine them to maintain strict alternation
          if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === role) {
            formattedContents[formattedContents.length - 1].parts[0].text += `\n${trimmed}`;
          } else {
            formattedContents.push({
              role,
              parts: [{ text: trimmed }],
            });
          }
        }
      }

      // Ensure the last message in history is the user's current query
      if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== 'user') {
        formattedContents.push({
          role: 'user',
          parts: [{ text: currentQuery }],
        });
      } else {
        formattedContents[formattedContents.length - 1].parts[0].text = currentQuery;
      }

      let replyText: string | null = null;
      // Stable production models from @google/genai specification
      const candidateModels = ['gemini-2.5-flash', 'gemini-2.5-pro'];

      for (const modelName of candidateModels) {
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const apiPromise = ai.models.generateContent({
              model: modelName,
              contents: formattedContents,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.25,
                safetySettings: [
                  {
                    category: 'HARM_CATEGORY_HARASSMENT' as any,
                    threshold: 'BLOCK_ONLY_HIGH' as any,
                  },
                  {
                    category: 'HARM_CATEGORY_HATE_SPEECH' as any,
                    threshold: 'BLOCK_ONLY_HIGH' as any,
                  },
                  {
                    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT' as any,
                    threshold: 'BLOCK_ONLY_HIGH' as any,
                  },
                  {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT' as any,
                    threshold: 'BLOCK_ONLY_HIGH' as any,
                  },
                  {
                    category: 'HARM_CATEGORY_CIVIC_INTEGRITY' as any,
                    threshold: 'BLOCK_ONLY_HIGH' as any,
                  },
                ],
              },
            });

            // 25 seconds timeout for resilience against latency spikes
            const timeoutPromise = new Promise<{ text?: string | null }>((_, reject) =>
              setTimeout(() => reject(new Error(`Timeout de consulta Gemini (${modelName}) después de 25s`)), 25000)
            );

            const response = await Promise.race([apiPromise, timeoutPromise]) as any;
            replyText = response?.text || null;
            if (replyText) {
              break;
            }
          } catch (apiErr: any) {
            console.error('Gemini API Error Diagnostics:', {
              model: modelName,
              attempt,
              statusCode: apiErr?.status || apiErr?.statusCode || 'N/A',
              code: apiErr?.code || 'N/A',
              message: apiErr?.message || String(apiErr),
              queryPreview: currentQuery.slice(0, 120),
              historyLength: formattedContents.length,
              timestamp: new Date().toISOString(),
            });

            if (attempt === 1) {
              // Exponential backoff before retry (1000ms)
              await new Promise((r) => setTimeout(r, 1000));
            }
          }
        }

        if (replyText) {
          break;
        }
      }

      if (replyText) {
        res.json({ text: replyText });
        return;
      }
    } catch (error: any) {
      console.error('General Error in Gemini chat processing:', {
        error: error?.message || error,
        stack: error?.stack,
        query: currentQuery,
      });
    }
  }

  // Knowledge-guided rule-based fallback if Gemini is offline or rate limited
  const fallbackAnswer = generateRuleBasedResponse(currentQuery, messages);
  res.json({ text: fallbackAnswer });
});

function generateRuleBasedResponse(query: string, history?: any[]): string {
  const q = query.toLowerCase();

  // Context detection from previous messages
  let previousContext = '';
  if (Array.isArray(history) && history.length > 1) {
    const prior = history.slice(-4, -1).map((m: any) => (m.content || '').toLowerCase()).join(' ');
    previousContext = prior;
  }

  // 1. OLEI (Organización de Latinoamericanos, Españoles y Portugueses en Israel)
  if (
    q.includes('olei') ||
    q.includes('organización de inmigrantes') ||
    q.includes('organizacion de inmigrantes') ||
    q.includes('asociacion de olim') ||
    q.includes('asociación de olim') ||
    (q.includes('acompaña') && (q.includes('banco') || q.includes('kupa') || q.includes('kupá') || q.includes('tramite') || q.includes('trámite') || q.includes('voluntari')))
  ) {
    return `🤝 **OLEI - Organización de Latinoamericanos, Españoles y Portugueses en Israel:**

1. **Naturaleza Institucional:**
   - La **OLEI** [עולי] es una **organización no gubernamental (ONG), voluntaria y comunitaria sin fines de lucro**, NO una entidad gubernamental ni médica. Su propósito es brindar orientación, contención afectiva y acompañamiento solidario a los inmigrantes hispanohablantes.

2. **Filiales y Presencia Geográfica (Sedes Activas Obligatorias):**
   - Cuenta con delegaciones activas y voluntariado en ciudades clave: **Tel Aviv, Jerusalén, Haifa, Netanya, Ashdod, Ra'anana, Beer Sheva, Karmiel, Modi'in y Rishon LeZion**.

3. **Servicios Reales y Acompañamiento Práctico:**
   - **Acompañamiento presencial y traducción:** Dispone de una red de voluntarios que te acompañan personalmente al banco, a consultas médicas en **Kupot Jolim** y a dependencias oficiales de absorción si aún no dominas el hebreo.
   - **Orientación inicial:** Asesoramiento legal y social primario, apoyo en la comprensión de contratos de alquiler y boletas municipales de **Arnoná**.
   - **Comunidad y cultura:** Encuentros comunitarios, grupos de integración social por edades y biblioteca en español.
   - **Contacto y sitio web:** Puedes comunicarte con la sede de tu ciudad o ingresar a su portal oficial [olei.org.il](https://olei.org.il).`;
  }

  // 2. Misrad HaAliyah — Apertura de Cuenta Bancaria e Información de Cuenta para Cobrar Sal Klitá
  if (
    q.includes('sal klit') ||
    (q.includes('cuenta') && (q.includes('banco') || q.includes('informo') || q.includes('informar') || q.includes('cobrar') || q.includes('abrir') || q.includes('nihul') || q.includes('jeshbon') || q.includes('kheshbon')))
  ) {
    return `🏦 **Cómo Abrir tu Cuenta Bancaria e Informar al Misrad HaAliyah para Cobrar el Sal Klitá:**

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
   - El **Sal Klitá** [סל קליטה] consta de 6 cuotas: un primer pago inicial en el aeropuerto/efectivo seguido de **5 cuotas mensuales consecutivas** que se depositarán automáticamente en tu cuenta una vez registrada en el sistema.`;
  }

  // 3. Misrad HaAliyah — Voucher de Ulpán Privado (5.200 NIS)
  if (
    q.includes('voucher') ||
    (q.includes('ulp') && (q.includes('privado') || q.includes('5.200') || q.includes('5200') || q.includes('citizen') || q.includes('bayit')))
  ) {
    return `🎓 **Voucher de Ulpán Privado de Misrad HaAliyah (Hasta 5.200 NIS):**

1. **Beneficio Oficial:**
   - Subsidio oficial de hasta **5.200 NIS** para cursar hebreo en institutos privados autorizados por el Estado (como *Citizen Café*, *Ulpan Bayit*, etc.).

2. **Requisitos de Elegibilidad:**
   - Haber finalizado el Ulpán estatal inicial (**Ulpán Álef** [אולפן א׳]) o demostrar que no existen cupos públicos disponibles en tu zona geográfica dentro de tu período de derechos de Aliá.

3. **Paso Crítico Obligatorio (Autorización Previa del Póked):**
   - **¡ADVERTENCIA FUNDAMENTAL!:** La solicitud del voucher (**Schovar Klitá** [שובר קליטה]) debe tramitarse y aprobarse formalmente con tu asesor (**póked**) en **Misrad HaAliyah** **ANTES de inscribirte o abonar el curso en la institución privada**. Si pagas la matrícula antes de contar con la autorización formal previa, el ministerio no otorgará el reintegro.

4. **Condiciones para el Reintegro Económico:**
   - Cumplir con una asistencia presencial o digital mínima del **80%** de las clases.
   - Rendir y aprobar el examen final del instituto privado autorizado.
   - Presentar la factura cancelada y el certificado de aprobación en el ministerio para que se efectúe la transferencia a tu cuenta bancaria.`;
  }

  // 4. Misrad HaAliyah — Corte de Ayuda de Alquiler en el Mes 30
  if (
    q.includes('mes 30') ||
    (q.includes('alquiler') && (q.includes('corta') || q.includes('termina') || q.includes('finaliza') || q.includes('siyua') || q.includes('sjirot') || q.includes('deje de cobrar') || q.includes('dejé de cobrar')))
  ) {
    return `🏠 **Subsidio de Alquiler de Misrad HaAliyah y Corte Reglamentario en el Mes 30:**

1. **Cronograma y Duración Legal:**
   - La ayuda automática de alquiler (**Siyua bi'Sjirot** [סיוע בשכר דירה]) otorgada por **Misrad HaAliyah** comienza de forma automática a partir del **mes 7** de tu llegada a Israel.
   - Tiene una duración reglamentaria máxima fijada por ley de **24 meses continuos** (cubre de forma ininterrumpida desde el **mes 7 hasta el mes 30** de tu Aliá).

2. **¿Por qué se corta en el mes 30?:**
   - Al finalizar el mes 30 de residencia, el derecho de absorción inicial **concluye por normativa general del Ministerio de Aliá**. No se trata de un error bancario ni de una suspensión individual.

3. **Mes 31 en adelante (Continuidad por Vulnerabilidad Socioeconómica):**
   - A partir del mes 31, la asistencia económica ya no depende del Ministerio de Aliá.
   - Si tu grupo familiar califica bajo condiciones socioeconómicas vulnerables o de bajos ingresos comprobados, la continuidad del subsidio habitacional pasa a tramitarse ante el **Ministerio de Construcción y Vivienda (Misrad HaBinui VeHaShikún)** a través de sus empresas gestoras (Amidar, Milgam o Matan) mediante evaluación social individual.`;
  }

  // 5. Misrad HaAliyah — Asesoramiento Empresarial (*2994 / Maalot)
  if (
    q.includes('2994') ||
    q.includes('maalot') ||
    q.includes('מעלות') ||
    q.includes('plan de negocio') ||
    (q.includes('negocio') && (q.includes('abrir') || q.includes('asesor') || q.includes('emprender') || q.includes('autónomo') || q.includes('osek') || q.includes('préstamo') || q.includes('prestamo')))
  ) {
    return `💼 **Asesoramiento Oficial Gratuito para Emprendedores y Negocios (*2994 / Maalot):**

Para abrir, trasladar o formalizar un negocio en Israel, el Ministerio de Aliyá y Absorción (**Misrad HaAliyah veHaKlitá**) ofrece asistencia oficial a través de la División de Emprendimiento Empresarial (**Agaf Yazamut Iskit**):

1. **Línea Telefónica Directa Gratuita:**
   - Comunícate al centro oficial llamando al ***2994** (atención multilingüe, incluyendo asesores en español).

2. **Centros de Negocios Maalot (מרכזי מעלו״ת):**
   - Red de más de 150 consultores y contadores públicos homologados.
   - Cada Olé Jadash tiene derecho a **horas de consultoría subvencionadas sin costo** con especialistas hispanohablantes para analizar la viabilidad comercial, diseñar el modelo de negocio y estructurar el plan financiero.

3. **Estructura Tributaria y Trámites:**
   - Asesoramiento paso a paso para la apertura de expediente fiscal como autónomo exento (**Osek Patur** [עוסק פטור]) o autónomo general (**Osek Murshe** [עוסק מורשה]), junto con las gestiones ante **Mas Hajnasá**, **Ma'am** (IVA) y **Bituaj Leumi**.

4. **Financiamiento Preferencial:**
   - Gestión y acceso a líneas de crédito preferenciales y fondos de garantía estatal específicos para nuevos inmigrantes.`;
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
    return `🏥 **Lesiones Laborales, Tendinitis y Formulario BL 250 (Bituaj Leumi):**

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
   - Si la dolencia persiste o genera limitación funcional prolongada, solicita evaluación ante el Médico Ocupacional (**Rofé Taasukatí** [רופא תעסוקתי]) y apertura de expediente de discapacidad laboral.`;
  }

  // 7. Salud y Urgencias — Alerta Miún (Guardia Hospitalaria) y MADA
  if (
    (q.includes('miun') || q.includes('miún') || q.includes('guardia') || q.includes('hospital') || q.includes('mada') || q.includes('ambulancia')) &&
    !q.includes('activar') &&
    !q.includes('credencial') &&
    !q.includes('turno')
  ) {
    return `⚠️ **Alerta Económica Importante: Guardia Hospitalaria (Miún) y Ambulancias (MADA):**

El hospital en Israel **NO es gratuito para consultas médicas espontáneas**. Acudir por cuenta propia sin seguir los pasos oficiales genera facturas elevadas (**heshbonit** [חשבונית]) de entre 500 y más de 1.000 NIS que tu obra médica no reembolsará:

1. **Paso 1 - Médico de Cabecera o Telemedicina:**
   - Consulta primero con tu médico de familia (**Rofé Mishpajá** [רופא משפחה]) o accede a la telemedicina y chat médico 24/7 disponible en la app oficial de tu Kupá.

2. **Paso 2 - Urgencias Intermedias (Fuera de horario y fines de semana):**
   - Si la clínica está cerrada, acude a centros de atención intermedia como **Terem** [טרם] (teléfono ***2884**) o **Bikur Rofé** [ביקור רופא]. El copago es sumamente bajo y sus médicos evaluarán si tu cuadro clínico requiere derivación formal.

3. **Paso 3 - Cuándo acudir al Hospital (Miún [מיון]):**
   - Concurre a la guardia hospitalaria **ÚNICAMENTE con orden de derivación formal (Hafniá [הפניה]) emitida por un médico**, si sufres un traumatismo severo con fractura evidente o si el cuadro reviste riesgo inminente de vida. Si el paciente queda efectivamente internado (**ishpuz** [אשפוז]), la factura queda 100% exenta.

4. **Ambulancias (MADA - 101):**
   - El despacho de una ambulancia de **Magen David Adom** emite factura de cobro automática. Solo queda exenta o cubierta al 100% si el traslado culmina en **internación hospitalaria efectiva** o responde a emergencias vitales tipificadas por la ley de salud.`;
  }

  // 8. Rashut HaMisim — Tofes 101 y Puntos de Crédito (Nekudot Zijui)
  if (
    q.includes('101') ||
    (q.includes('mas hajnas') && (q.includes('reteng') || q.includes('llenar') || q.includes('tofes') || q.includes('impuesto')))
  ) {
    return `📑 **Cómo Completar el Tofes 101 para Evitar Retenciones de Más (Mas Hajnasá):**

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
   - Al cobrar tu primer salario, controla en tu **tlush sajar** [תלוש שכר] en el casillero de *Nekudot Zijui* que figuren computados tus puntos de Olé para confirmar que no te aplicaron retenciones indebidas.`;
  }

  // 9. Rashut HaMisim — Dos Trabajos Simultáneos y Teum Mas (47%)
  if (
    q.includes('teum mas') ||
    q.includes('47%') ||
    (q.includes('2 trabajos') || q.includes('dos trabajos') || q.includes('segundo trabajo') || q.includes('pluriempleo'))
  ) {
    return `⚠️ **Dos Trabajos Simultáneos: Cómo Hacer el Teum Mas y Evitar la Retención del 47%:**

Por normativa fiscal en Israel, si una persona tiene más de un empleo y no presenta la coordinación impositiva oficial, el segundo empleador está legalmente obligado a retener la tasa máxima marginal (aproximadamente el **47%** de tu sueldo secundario).

📋 **Procedimiento Obligatorio Paso a Paso:**
1. **Paso 1 - Obtener el Tik Nikuyim de cada Empleador:**
   - Solicita en el departamento de RRHH o contabilidad de cada uno de tus empleadores su número de expediente de deducción patronal (**Tik Nikuyim** [תיק ניכויים], un código numérico de 9 dígitos).

2. **Paso 2 - Trámite Digital en Rashut HaMisim:**
   - Ingresa al portal oficial de **Rashut HaMisim** [רשות המסים] (Autoridad Tributaria) en el aplicativo **Teum Mas Online** (תיאום מס באינטרנט).

3. **Paso 3 - Declaración y Asignación de Beneficios:**
   - Declara cuál es tu empleo principal (donde aplicas tus puntos de crédito **Nekudot Zijui** de Olé Jadash) y declara el sueldo bruto proyectado para el segundo empleo.

4. **Paso 4 - Entrega de la Constancia Oficial:**
   - El sistema emite un certificado oficial con la tasa de retención exacta que le corresponde aplicar a tu segundo trabajo. **Descarga el documento y entrégalo en administración de tu segundo empleo** antes de la fecha de cierre de liquidación de sueldos.`;
  }

  // 10. Misrad HaRishuí — Canje de Licencia de Conducir Extranjera (>5 años)
  if (
    q.includes('licencia') &&
    (q.includes('canje') || q.includes('canjeo') || q.includes('5 años') || q.includes('extranjera') || q.includes('conducir') || q.includes('manejar'))
  ) {
    return `🚗 **Canje de Licencia de Conducir Extranjera (>5 años de Antigüedad):**

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

⚠️ *Plazo de Conducción:* Recuerda que solo está permitido manejar en Israel con tu registro extranjero durante los **primeros 12 meses** desde tu fecha de llegada (**Taarij Aliyá**).`;
  }

  // 11. Pikud HaOref y Emergencias — Derechos Laborales
  if (
    q.includes('pikud') ||
    q.includes('haoref') ||
    (q.includes('despedir') && q.includes('vacaciones')) ||
    (q.includes('guerra') && q.includes('trabajo'))
  ) {
    return `🛡️ **Directivas de Pikud HaOref y Protección de Derechos Laborales:**

En situaciones de emergencia y alertas de seguridad civil dictadas por el Comando del Frente Interno (**Pikud HaOref** [פיקוד העורף]), la legislación laboral israelí protege rigurosamente a los trabajadores:

1. **Prohibición Absoluta de Despido:**
   - La ley prohíbe taxativamente que un empleador despida a un trabajador que no concurra a sus tareas por cualquiera de las siguientes causas:
     * Instrucciones expresas de seguridad de **Pikud HaOref** que limiten la actividad laboral en la zona.
     * Falta de refugio reglamentario accesible (**Mamad** [ממ"ד] o **Miklat** [מקלט]) en el establecimiento de trabajo dentro del tiempo de alerta establecido para la localidad.
     * Obligación de permanecer al cuidado de hijos menores de 14 años ante la suspensión oficial de clases presenciales en escuelas y jardines.

2. **Días de Vacaciones y Saldo Negativo Prohibido:**
   - El empleador **NO puede descontar de manera unilateral o forzosa** estos días de tus vacaciones si no cuentas con días positivos acumulados en tu haber. Está prohibido por ley dejar el balance de vacaciones en saldo negativo sin el consentimiento previo expreso del empleado.

3. **Compensación Salarial:**
   - En estados de emergencia prolongados (**Matzav Meiyujad ba-Oref**), el Estado aprueba acuerdos marco e indemnizaciones salariales a través de **Bituaj Leumi** y el Ministerio de Trabajo para cubrir las jornadas laborales caídas.`;
  }

  // 12. Celular y Transporte (Rav-Kav)
  if (
    (q.includes('celular') || q.includes('telefono') || q.includes('sim')) &&
    (q.includes('rav-kav') || q.includes('rav kav') || q.includes('transporte') || q.includes('como consigo') || q.includes('cómo consigo'))
  ) {
    return `📱 **Cómo Obtener Número de Celular y Tarjeta Rav-Kav en tus Primeros Días:**

📲 **1. Línea Celular Israelí (Día 1):**
- **Prioridad absoluta:** Es indispensable para activar la cuenta de banco, recibir códigos SMS de autenticación de MyVisit y comunicarse con Misrad HaAliyah.
- **Dónde contratar:** En locales de telefonía o centros comerciales de empresas autorizadas (Partner, Cellcom, Pelephone, HOT Mobile, Golan Telecom o 019).
- **Requisitos:** Solo requieres presentarte con tu pasaporte extranjero vigente o Teudat Zehut provisoria y un medio de pago para contratar plan mensual o chip SIM prepago.

🚆 **2. Tarjeta de Transporte Rav-Kav (רב-קו):**
- En Israel **no se abona con efectivo** a bordo de colectivos urbanos ni trenes.
- **Tarjeta física personalizada:** Se emite de forma gratuita con tu perfil de Olé Jadash en los centros **Al HaKav** (en estaciones de tren centrales como Savidor Merkaz o HaShalom en Tel Aviv y en el aeropuerto Ben Gurión), presentando tu Teudat Olé y pasaporte.
- **Pago mediante el celular:** También puedes pagar directamente tus viajes descargando aplicaciones autorizadas como **Moovit**, **HopOn** o **Rav-Kav Online**, cargándoles saldo o asociando una tarjeta de crédito o débito.`;
  }

  // 13. Médico que Hable Español en la Kupá
  if (
    (q.includes('médico') || q.includes('medico') || q.includes('turno')) &&
    (q.includes('español') || q.includes('kupa') || q.includes('kupá'))
  ) {
    return `🩺 **Cómo Solicitar Turno con un Médico que Hable Español en tu Kupat Jolim:**

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
   - También puedes consultar el directorio nacional independiente en **doctors.org.il**.`;
  }

  // 14a. Consulta puntual sobre Calle Bialik (Ramat Gan)
  if (q.includes('bialik')) {
    return `🧉 **Yerba Mate y Productos en Calle Bialik (Ramat Gan):**

Sobre la avenida comercial **Bialik** en Ramat Gan, efectivamente hay tiendas de productos naturales (**Batei Teva**) y dietéticas que traen yerba mate y productos del Cono Sur de forma regular.

Sin embargo, para mantener absoluta rigurosidad y honestidad factual, **no dispongo en este momento de la numeración catastral o altura exacta** de esos comercios en mi base de datos confirmada. Al recorrer las cuadras comerciales de Bialik podrás identificar fácilmente los locales y dietéticas que exhiben marcas tradicionales de yerba y productos importados en sus vidrieras.`;
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
    return `🧉 **Dónde Comprar Yerba Mate y Productos Latinoamericanos en Israel:**

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
- Se recomienda consultar grupos de Facebook y WhatsApp de la comunidad ("Argentinos en Israel", "Latinos en Israel", "Colombianos en Israel") para información de ferias artesanales y compras conjuntas.`;
  }

  // 15. Días de Reposo por Enfermedad (Jok Dmei Majalá)
  if (
    q.includes('enfermedad') ||
    q.includes('reposo') ||
    q.includes('dias de enfermedad') ||
    q.includes('días de enfermedad') ||
    q.includes('dmei majala') ||
    q.includes('dmei majalá')
  ) {
    return `⚠️ **Cálculo y Pago de Días de Reposo por Enfermedad (Jok Dmei Majalá):**

En Israel, la ley de días de enfermedad (**Jok Dmei Majalá** [חוק דמי מחלה]) establece un esquema escalonado de compensación:

1. **Escala Legal de Remuneración:**
   - **Día 1 de ausencia médica:** **0%** (por ley no se remunera).
   - **Días 2 y 3 de ausencia médica:** Se abonan al **50%** del valor jornal diario regular.
   - **Día 4 en adelante:** Se abona al **100%** del valor jornal diario.

2. **Saldo Acumulado en el Recibo de Sueldo (Tlush Sajar):**
   - Cada trabajador acumula por ley **1.5 días de enfermedad por cada mes completo trabajado** (hasta un tope acumulable de 90 días).
   - **¡Atención!:** Para cobrar estos días debes contar con saldo positivo acumulado en tu recibo (**tlush sajar**). Si el saldo acumulado está en cero, los días no trabajados se descontarán como ausencia no remunerada (salvo que se trate de un accidente laboral cubierto con el formulario **BL 250** de Bituaj Leumi).

3. **Constancia Médica Oficial:**
   - Debes solicitar el certificado médico oficial (**Ishur Majalá** [אישור מחלה]) emitido por tu médico de Kupat Jolim y presentarlo inmediatamente a la administración de tu empleador.`;
  }

  // 16. MyVisit y Teudat Zehut Biométrica Permanente
  if (
    q.includes('teudat zeut') ||
    q.includes('teudat zehut') ||
    q.includes('myvisit') ||
    q.includes('biometric') ||
    q.includes('biométrica')
  ) {
    return `🪪 **Cómo Tramitar tu Teudat Zehut Biométrica Permanente en Misrad HaPnim (MyVisit):**

1. **Plazo de Validez del Documento de Papel:**
   - La Teudat Zehut provisoria de papel entregada en el aeropuerto Ben Gurión tiene una validez reglamentaria de **3 meses**. Antes de ese plazo debes tramitar la tarjeta plástica biométrica definitiva.

2. **Reserva de Turno por MyVisit:**
   - Accede a la plataforma [myvisit.com](https://myvisit.com) o su aplicación móvil.
   - Selecciona **Rashut HaOjlusin ve-haHagirá** (**Misrad HaPnim** [משרד הפנים]).
   - Elige el trámite: *"Emisión de Teudat Zehut Biométrica"* (**Hanafat Teudat Zehut Biometrit**).
   - El primer ejemplar de Teudat Zehut biométrica para Olé Jadash es **100% gratuito** (exento de arancel).

3. **Consejo Matutino para Conseguir Cita:**
   - Ingresa a MyVisit **entre las 7:00 AM y las 8:30 AM**. A esa hora el sistema libera cancelaciones de la jornada y turnos de urgencia en sucursales próximas.

4. **Documentos a Llevar a la Cita:**
   - Teudat Olé original.
   - Teudat Zehut provisoria de papel con foto.
   - Pasaporte extranjero con el que ingresaste al país.
   - Certificado original de nacimiento (y libreta de matrimonio si corresponde).`;
  }

  // 17. Activación de Cobertura en Kupat Jolim y Credencial Magnética
  if (
    q.includes('activar kupa') ||
    q.includes('activar kupá') ||
    q.includes('credencial') ||
    q.includes('tarjeta magnetica') ||
    q.includes('tarjeta magnética') ||
    (q.includes('kupa') && q.includes('maccabi')) ||
    (q.includes('kupa') && q.includes('clalit'))
  ) {
    return `🏥 **Activación de Cobertura y Credencial Magnética en Kupat Jolim:**

1. **Activación Presencial Obligatoria:**
   - Aunque te hayas registrado en el aeropuerto o antes de viajar, tu afiliación debe activarse formalmente de forma presencial en una sucursal (**Snif**) de la Kupá que hayas seleccionado (**Maccabi**, **Clalit**, **Meuhedet** o **Leumit**).

2. **Documentos a Presentar en Ventanilla (Mazkirut):**
   - Libreta de **Teudat Olé** original.
   - Constancia de inscripción de salud del aeropuerto o del Correo (**Doar Israel**).
   - Número de **Teudat Zehut**.
   - Datos de tu cuenta bancaria (certificado **Ishur Nihul Jeshbón**) para vincular el débito automático (**Horaat Keva**) del seguro complementario.

3. **Entrega de Credencial Magnética (Cartís Magentí):**
   - En ventanilla imprimirán tu tarjeta plástica magnética en el acto o te entregarán un número provisorio para comprar medicamentos subvencionados y consultar médicos inmediatamente.

4. **Período de Gracia para Cobertura Complementaria (90 Días):**
   - **¡Dato clave!:** Durante los **primeros 90 días desde tu fecha de Aliá**, puedes afiliarte a los planes complementarios más altos (Maccabi Sheli, Clalit Mushlam/Platinium) **sin períodos de carencia** (sin meses de espera para cirugías, tratamientos dentales o especialistas).`;
  }

  // 18. Vigencia y Plazos de los Beneficios de Teudat Olé
  if (
    q.includes('teudat ole') ||
    q.includes('teudat olé') ||
    q.includes('caduca') ||
    q.includes('vence') ||
    q.includes('vencimiento') ||
    q.includes('derechos primer año')
  ) {
    return `📄 **Vigencia y Cronograma de Derechos de tu Teudat Olé:**

1. **Condición Permanente vs. Derechos Temporales:**
   - Tu estatus de **Olé Jadash** es permanente ante la Ley del Retorno, pero los **beneficios económicos, impositivos y aduaneros tienen plazos de caducidad estrictos** contados desde tu fecha de llegada (**Taarij Aliyá**):

2. **Cronograma Oficial de Plazos:**
   - **Meses 1 a 6:** Sal Klitá (canasta básica en 6 cuotas) y cobertura médica básica estatal gratuita.
   - **Meses 7 a 30 (24 meses continuos):** Subsidio mensual de alquiler (**Siyua bi'Sjirot**). Caduca de forma definitiva al finalizar el mes 30.
   - **Primeros 12 meses (1 año):**
     * Conducir con licencia extranjera original (luego de 12 meses es ilegal conducir sin canje).
     * Descuento en la tasa municipal de **Arnoná** (del 70% al 90% según el municipio) durante 12 meses de contrato.
   - **Primeros 42 meses (3.5 años):** Puntos de crédito fiscal (**Nekudot Zijui** en el Tofes 101) para deducir el impuesto a las ganancias.
   - **Primeros 5 años:** Exención de examen práctico para canje de licencia extranjera de conducir (si acredita más de 5 años de antigüedad) y exención aduanera en compra de electrodomésticos o automóvil nuevo.`;
  }

  // 19. Pasaporte Israelí (Darkón) vs. Teudat Ma'avar
  if (
    q.includes('darkon') ||
    q.includes('darkón') ||
    q.includes('pasaporte') ||
    q.includes('teudat maavar') ||
    q.includes('teudat ma\'avar') ||
    q.includes('maavar') ||
    q.includes('viajar antes del año')
  ) {
    return `🛂 **Pasaporte Israelí (Darkón) vs. Teudat Ma'avar:**

1. **La Regla del Primer Año para el Darkón Regular (דרכון):**
   - Como norma legal general, el nuevo inmigrante debe residir de forma efectiva en Israel durante **un año completo (12 meses)** y demostrar su centro de vida en el país para tener derecho al pasaporte biométrico estándar (**Darkón**).

2. **Documento Provisorio de Viaje (Teudat Ma'avar [תעודת מעבר]):**
   - Si precisas salir al extranjero antes de cumplir el primer año de Aliá, **Misrad HaPnim** emitirá una **Teudat Ma'avar** (Documento de viaje en sustitución de pasaporte nacional).

3. **¡Alerta Crítica sobre Requisitos de Visado!:**
   - A diferencia del Darkón ordinario (que posee exención de visado en Europa y múltiples países), la **Teudat Ma'avar NO siempre goza de esos convenios bilaterales**.
   - **Acción Obligatoria:** Si viajas con Teudat Ma'avar, debes comunicarte con la embajada o consulado del país de destino para verificar si requieres gestionar una **visa consular previa**.`;
  }

  // 20. Transporte Público en Jagim y Shabat
  if (
    q.includes('transporte') ||
    q.includes('colectivo') ||
    q.includes('autobus') ||
    q.includes('autobús') ||
    q.includes('tren') ||
    (q.includes('shabat') && q.includes('viaje')) ||
    q.includes('jagim') ||
    q.includes('yom kipur') ||
    q.includes('iom kipur')
  ) {
    return `🚌 **Transporte Público en Shabat y Festividades (Jagim):**

1. **Corte de Servicios:**
   - En vísperas de Shabat y festividades solemnes judías (*Rosh Hashaná, Iom Kipur, Pésaj, Shavuot, Sucot*), tanto los trenes (**Rakevet Israel** [רכבת ישראל]) como las líneas de autobuses interurbanos y urbanos regulares suspenden sus servicios varias horas antes del anochecer (**Erev Jag / Erev Shabat**).
   - En **Iom Kipur**, la paralización del transporte público y aéreo es del 100% en todo el territorio nacional.

2. **Reanudación del Servicio:**
   - El transporte vuelve a operar únicamente tras la salida de las estrellas del día festivo o Shabat (**Motzaei Shabat / Jag**), normalmente a partir de las 20:00 o 21:00 hs según la estación.

3. **Días Intermedios (Jol HaMoed [חול המועד]):**
   - Durante los días intermedios de Pésaj y Sucot, el transporte público **SÍ funciona**, pero opera bajo cronogramas especiales de feriado o vacaciones escolares. Se recomienda consultar horarios actualizados en **Moovit** o **Rav-Kav Online**.`;
  }

  // 21. Sistema Político y Elecciones en Israel (Knéset)
  if (
    q.includes('elecciones') ||
    q.includes('votar') ||
    q.includes('voto') ||
    q.includes('kneset') ||
    q.includes('knéset') ||
    q.includes('primer ministro')
  ) {
    return `🗳️ **Sistema Político y Elecciones en Israel (Knéset):**

1. **¿El voto es obligatorio?:**
   - **No.** El sufragio en Israel es **optativo y secreto**. Tienen derecho a votar todos los ciudadanos israelíes mayores de 18 años inscriptos en el padrón electoral (**Pinkas Bojarim** [פנקס בוחרים]). La jornada electoral parlamentaria se declara feriado no laborable (**Iom Shabaton**).

2. **Sistema Parlamentario Unicameral:**
   - No se elige de forma directa a la persona del Primer Ministro. Se vota a una **lista cerrada de un partido político** que compite por los **120 escaños de la Knéset** [כנסת].

3. **Formación de Gobierno:**
   - Para gobernar, un líder debe construir una coalición mayoritaria que sume **al menos 61 de los 120 escaños**. El Presidente del Estado de Israel (**Nasí HaMediná**) encomienda formalmente la tarea al candidato con mayores apoyos parlamentarios.`;
  }

  // Respuesta orientativa exhaustiva y estructurada (sin mensajes cortos vacíos ni etiquetas artificiales)
  return `Para orientarte con la máxima exactitud en tu proceso de Aliá, selecciona tu consulta entre los trámites y derechos oficiales:

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

Escribe tu consulta puntual para brindarte el paso a paso oficial detallado.`;
}

// Development vite setup vs production static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite.ssrFixStacktrace) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
