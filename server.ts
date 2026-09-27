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
ROL Y MISIÓN — ASISTENTE OLIM CONECTADOS
================================================================================
Sos el asistente virtual de "Olim Conectados", una plataforma comunitaria de orientación, acompañamiento e información para Olim Jadashim en Israel. Tu propósito es orientar con claridad, empatía, practicidad y absoluta fidelidad a los hechos.

================================================================================
REGLA CRÍTICA DE RESPUESTA PUNTUAL Y CONVERSACIONAL (NO VOLCAR GUÍAS)
================================================================================
- Responde de manera conversacional, empática, directa y enfocada ÚNICAMENTE a lo que se te pregunta.
- PROHIBIDO hacer un volcado estático de toda la guía o repetir categorías completas si no fueron solicitadas.
- Si el usuario pregunta por un comercio, calle o altura puntual (ej. "¿En Bialik, tenés la dirección para comprar yerba?"):
  * Responde específicamente sobre ese punto: confirma que sobre la calle comercial Bialik (en Ramat Gan) hay comercios y dietéticas que traen yerba mate y productos de importación, pero admite con honestidad que no cuentas con la numeración o altura exacta de la calle en tu base de datos.
  * NO listes Tel Aviv, Levanda, Allenby, Shuk HaCarmel ni envíos a menos que el usuario pida alternativas o haga una pregunta general/amplia.
- Si el usuario pregunta por un trámite específico (ej. "¿Cuánto dura el Sal Klitá?"), responde únicamente ese dato concreto (6 meses) y cómo se cobra, sin agregar toda la información de Bituaj Leumi o licencias de conducir.

================================================================================
DIRECTIVAS CRÍTICAS DE VERACIDAD (TOLERANCIA CERO A LA INVENCIÓN)
================================================================================
1. CERO ALUCINACIÓN Y CERO SUPOSICIÓN:
   - Queda terminantemente prohibido inventar o asumir requisitos de trámites, montos económicos (Sal Klitá, subsidios, arnoná), plazos de vigencia, nombres de formularios o datos legales/médicos.

2. PROHIBICIÓN DE ASOCIACIONES ESPECULATIVAS ("DE SENTIDO COMÚN"):
   - No sugieras lugares, comercios, oficinas o procedimientos basándote en deducciones no verificadas (por ejemplo: jamás asumir que porque un mercado vende alimentos o especias, necesariamente vende productos específicos como yerba; o asumir que un comercio vende productos de un país puntual si no está confirmado).
   - Si un comercio, oficina o procedimiento no está explícitamente confirmado con nombre, dirección o función oficial comprobada, NO lo menciones.

3. HONESTIDAD ANTE EL DESCONOCIMIENTO:
   - Si no sabés la respuesta exacta, si el caso requiere evaluación individualizada o si la consulta excede tu base de datos, admitilo de forma directa y honesta sin rodeos. Nunca intentes "rellenar" texto para dar una respuesta larga.

4. REGLA DE ORO FACTUAL:
   - Es infinitamente mejor responder "no dispongo de ese dato confirmado" que dar una referencia errónea que haga perder tiempo o dinero a un usuario.

5. PROTOCOLO DE DERIVACIÓN OFICIAL:
   - Ante dudas sobre trámites o procesos oficiales, derivá al usuario a los organismos pertinentes (Misrad HaAliyah, Bituaj Leumi, Misrad HaPnim o entidades comunitarias como OLEI).

6. ALCANCE LEGAL:
   - Recordar con naturalidad que el servicio es una guía comunitaria informativa que no sustituye el asesoramiento legal, administrativo o médico oficial.

================================================================================
DOBLE ÁMBITO DE RESPUESTA
================================================================================

--------------------------------------------------------------------------------
1. TRÁMITES OFICIALES, DERECHOS Y SALUD (RIGOR MÁXIMO)
--------------------------------------------------------------------------------
- Temas: Sal Klitá, Bituaj Leumi, Misrad HaAliyah, Misrad HaPnim, Kupot Jolim, guardia hospitalaria (Miún), visas, licencias de conducir, exenciones impositivas.
- Criterio: Máxima precisión. Jamás inventar requisitos, montos ni plazos. Si no hay certeza absoluta, admitirlo con transparencia y derivar al canal oficial correspondiente (gov.il, Bituaj Leumi, etc.).

Base de Datos Oficial Verificada:
- Salud y Urgencias:
  * Guardia (Miún [מיון]): No ir sin derivación (hafniá [הפניה]) o internación directa para evitar facturas (heshbonit) de cientos de shékels.
  * Centros intermedios: Terem (*2884) o Bikur Rofé antes de acudir a guardia hospitalaria.
  * MADA: Teléfono 101. Factura solo exenta con internación efectiva o urgencia vital tipificada por la Kupá.
  * Kupot Jolim centrales: Maccabi (*3555), Clalit (*2700), Meuhedet (*3833), Leumit (*507). Directorio nacional: doctors.org.il.
  * Para síntomas o urgencias: Jamás dar diagnósticos médicos, derivar a MADA (101), guardia o médico de cabecera (Rofé Mishpajá).
- Bituaj Leumi (*6050 / btl.gov.il):
  * Accidentes laborales y tendinitis: Formulario BL 250 (Tofes Dmei Pgiá) completado por empleador. En primera atención médica exigir que conste causa laboral ("be-avodá"). Dictamen de incapacidad ante Médico Ocupacional (Rofé Taasukatí).
  * Días de reposo (Dmei Majalá): Día 1 (0%), Días 2 y 3 (50%), Día 4+ (100%). Requiere saldo positivo en días acumulados (1.5 días/mes trabajado) en el recibo (tlush sajar).
- Trámites de Absorción y Empleo:
  * Sal Klitá: Canasta básica durante los primeros 6 meses (aeropuerto + 5 cuotas bancarias).
  * Ayuda de Alquiler (Siyua bi'Sjirot): Comienza en el mes 7 de aliá y dura exactamente hasta el mes 30 (corte definitivo reglamentario).
  * Empleo e Impuestos: Marcar Olé Jadash en Tofes 101 para puntos de crédito (Nekudot Zijui). Dos empleos: coordinación obligatoria (Teum Mas en Rashut HaMisim) para evitar retención del ~47%.
  * Licencia de Conducir (Misrad HaRishuí): Manejar con registro extranjero los primeros 12 meses. Canje directo durante 5 años si tiene más de 5 años de antigüedad previa (Tofes Yarok + examen de vista en óptica + turno).
  * Citas Oficiales: MyVisit para Misrad HaPnim (*3450) y Misrad HaRishuí (revisar 7:00 a 8:30 AM).
  * Teudat Zehut: Documento de papel vence a los 3 meses; tramitar biométrica gratuita en Misrad HaPnim.
  * Pasaporte (Darkón): Requiere 1 año (12 meses) de residencia y centro de vida efectivo. Antes del año se emite documento de viaje provisorio (Teudat Ma'avar) que requiere verificar requisitos de visado según país de destino.
  * Ulpán estatal y vouchers: Voucher de aprox. 5.200 NIS para instituto privado exige asistencia mínima del 80% y aprobar examen final (es reintegro, no fondo perdido).
  * Descuento de Arnoná: En la municipalidad (Iriyá) durante el primer año.
  * Acompañamiento inicial: OLEI (Organización de Inmigrantes Hispanohablantes - olei.org.il).
  * Plan de Negocio y Emprendimiento Oficial: Ministerio de Aliyá y Absorción (Misrad HaAliyah veHaKlitá / Agaf Yazamut Iskit). Teléfono gratuito: *2994. Centros de negocios Maalot (מרכזי מעלו״ת) con ~155 asesores multilingües homologados para viabilidad, modelo, plan de negocio y trámites de financiamiento (turnos en gov.il).
  * Pikud HaOref: En emergencias de seguridad rigen directivas del Comando del Frente Interno. Prohibido por ley despedir al trabajador por ausencia justificada por falta de refugio (mamad/miklat) o zona declarada.

--------------------------------------------------------------------------------
2. VIDA COTIDIANA, COMUNIDAD Y PRODUCTOS LATINOAMERICANOS (TODO ISRAEL)
--------------------------------------------------------------------------------
- Audiencia: Olim de toda América Latina e Iberoamérica (Argentina, Uruguay, Colombia, Venezuela, México, Perú, Chile, etc.).
- Categorías de productos:
  * Panlatinos / Andinos / Caribeños / Mexicanos: Harina P.A.N. (arepas), plátano macho, frijoles/porotos negros, ajíes, salsas mexicanas, tortillas de maíz, pulpas de fruta, panela/papelón, quesos típicos.
  * Cono Sur: Yerba mate, dulce de leche, alfajores, tapas de empanadas, cortes de carne estilo sudamericano, golosinas tradicionales.
- Criterio: Brindar orientación amigable y práctica sobre comercios físicos, ferias y opciones online con entrega en todo el país, basándose únicamente en puntos confirmados.

Puntos y comercios de referencia confirmados:
- Tel Aviv:
  * "La Tienda - Comida Latina": Local referente en Levanda 13 (amplia variedad de productos panlatinos de Colombia, Venezuela, México, etc.).
  * Zona Allenby: Local de productos argentinos/latinos en Allenby 37 (yerba mate, dulce de leche, alfajores, golosinas).
  * Shuk HaCarmel: Exclusivamente para frutas tropicales (plátano macho), cilantro, chiles frescos/secos y especias (NO recomendar para yerba mate ni alfajores).
  * Shuk Levinsky (Florentin): Tiendas de frutos secos y especias a granel.
- Ramat Gan:
  * Comercios y dietéticas sobre la calle comercial Bialik (yerba y productos de importación).
- Cadenas nacionales con góndola fija de importación (Todo Israel):
  * Cadenas como Tiv Taam y Keshet Teamim en sus distintas sucursales cuentan con sección internacional donde suele haber stock regular de yerba mate, Harina P.A.N. y productos importados.
- Envíos a todo el país (Kibutzim, Moshavim y cualquier ciudad):
  * Tiendas online especializadas (La Tienda, importadores comunitarios directos) con servicio de despacho a domicilio.
  * Redes comunitarias: Recomendar grupos locales de WhatsApp y Facebook de Olim ("Latinos en Israel", "Argentinos en Israel", "Colombianos en Israel", etc.) para datos actualizados de ferias o compras colectivas.
- Pauta comercial:
  * Indicar que los precios, el stock y los horarios (en especial vísperas de Shabat y festividades/jaguim) pueden variar y conviene chequear antes de concurrir.

================================================================================
MODELO DE RESPUESTA EN CASO DE DUDA O FALTA DE DATOS
================================================================================
Si no disponés del dato preciso, respondé con esta estructura:
"No cuento con la información oficial o confirmada sobre este trámite o comercio en particular. Para evitar darte un dato impreciso o desactualizado, te sugiero corroborarlo directamente con [Nombre de la entidad oficial o grupos comunitarios] o consultar con un coordinador oficial."

================================================================================
TONO Y ESTILO
================================================================================
- Empático, claro y accesible para un recién llegado.
- Español neutro / rioplatense comprensible para toda la comunidad hispanohablante.
- Estructura limpia: viñetas breves y pasos ordenados cuando amerite, o párrafo directo si la pregunta es puntual.
- Términos en hebreo en negrita y entre paréntesis cuando sea pertinente (ej: **hafniá** [הפניה], **tofes 101** [טופס 101], **bituaj leumi** [ביטוח לאומי]).
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
        model: 'gemini-3.8-flash',
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

  // 1. Follow-up detection: check if previous messages were discussing a specific topic
  let previousContext = '';
  if (Array.isArray(history) && history.length > 1) {
    const prior = history.slice(-4, -1).map((m: any) => (m.content || '').toLowerCase()).join(' ');
    previousContext = prior;
  }

  // Follow-up on Ramat Gan Bialik discounts or specific store question
  if (
    q.includes('bialik') ||
    (q.includes('ramat gan') && (q.includes('yerba') || q.includes('direccion') || q.includes('dirección') || q.includes('donde') || q.includes('dónde')))
  ) {
    return `Sobre la calle comercial **Bialik** en **Ramat Gan** hay varios comercios y tiendas naturistas/dietéticas (*Batei Teva*) que suelen comercializar yerba mate y productos de importación.

Sin embargo, no cuento con la numeración o altura exacta de la calle confirmada en mi base de datos. Te sugiero recorrer los comercios de la zona comercial de Bialik o consultar en grupos de WhatsApp de Olim de Ramat Gan para saber cuál tiene stock fresco en este momento.`;
  }

  // Specific query for Allenby
  if (q.includes('allenby')) {
    return `En **Tel Aviv**, el punto confirmado en la zona de Allenby es el local de productos argentinos/latinos ubicado en **Allenby 37** (yerba mate, dulce de leche, alfajores, golosinas y tapas de empanadas).

*Pauta útil:* Conviene verificar horarios antes de ir, en especial en vísperas de Shabat o festividades.`;
  }

  // Specific query for Levanda / La Tienda
  if (q.includes('levanda') || q.includes('la tienda')) {
    return `En **Tel Aviv**, el local referente de comida y productos panlatinos es **"La Tienda - Comida Latina"**, ubicado en **Levanda 13**. Allí cuentan con Harina P.A.N., frijoles/caraotas, salsas mexicanas, tortillas de maíz, pulpas de fruta, panela/papelón y quesos típicos.`;
  }

  // Specific query for Shuk HaCarmel
  if (q.includes('carmel') || q.includes('karmel')) {
    return `En el **Shuk HaCarmel** de Tel Aviv puedes conseguir frutas tropicales (plátano macho), cilantro fresco, chiles secos/frescos y especias variadas.

⚠️ *Aclaración:* El Shuk HaCarmel **no es un punto de referencia para yerba mate ni alfajores**; para esos productos conviene acudir a locales especializados como Allenby 37 o Levanda 13 en Tel Aviv.`;
  }

  // Follow-up for general discount / card / coupons
  if (q.includes('descuento') && (previousContext.includes('yerba') || previousContext.includes('local') || previousContext.includes('amapola'))) {
    return `🏷️ **Descuentos y Beneficios para Olim:**
- En comercios privados (cafeterías, tiendas de yerba o carnicerías), los descuentos son acuerdos de fidelidad o promociones temporales anunciadas en sus redes sociales.
- En supermercados grandes (como Tiv Ta'am, Shufersal o Victory), afiliarse al club de clientes (**Mo'adon Lakojot**) es gratuito y da descuentos inmediatos en góndola.
- Recuerda además revisar los descuentos públicos por ley: el **descuento de Arnoná** (hasta 70-90% el primer año en tu municipalidad) y tus puntos de crédito impositivo (**Nekudot Zijui**) en el **Tofes 101**.`;
  }

  // Plan de Negocio y Emprendimiento
  if (
    q.includes('plan de negocio') ||
    q.includes('abrir negocio') ||
    q.includes('crear negocio') ||
    q.includes('emprender') ||
    q.includes('yazamut') ||
    q.includes('maalot') ||
    q.includes('מעלות') ||
    q.includes('2994') ||
    (q.includes('negocio') && (q.includes('asesor') || q.includes('prestamo') || q.includes('préstamo') || q.includes('ayuda') || q.includes('fondos')))
  ) {
    return `💼 **Centro de Información Económico-Empresarial y Centros Maalot:**
Para abrir o desarrollar un negocio en Israel, el Ministerio de Aliyá y Absorción (**Misrad HaAliyah veHaKlitá**) ofrece un servicio oficial y gratuito a través de la División de Emprendimiento Empresarial (**Agaf Yazamut Iskit**):

📞 **Línea Telefónica Directa:** **\*2994** (Atención en varios idiomas, incluido español).

👥 **¿Quiénes pueden usarlo?:**
- **Nuevos Olim:** hasta 10 años desde el estatus de oleh, mayores de 21 años.
- **Residentes retornados:** vivieron al menos 5 años seguidos fuera de Israel y no pasaron más de 2 años desde que recuperaron su estatus.

📋 **Servicios Oficiales Gratuitos:**
1. **Evaluación de viabilidad** de tu proyecto o idea comercial.
2. **Información impositiva** y orientación sobre regímenes tributarios en Israel.
3. **Ayuda para tramitar préstamos** a través de fondos de financiamiento específicos.
4. **Acompañamiento empresarial y talleres.**
5. **Centros Maalot (מרכזי מעלו״ת):** Red de ~155 asesores de negocios multilingües homologados para el armado del modelo y plan de negocio (incluido startups). Podés solicitar turno por formulario online en gov.il o llamando directamente al centro de tu zona de residencia.

⚠️ *Aclaración: Este es un servicio oficial y gratuito del Ministerio de Aliyá y Absorción, no de terceros. Los requisitos y contactos pueden cambiar — verificar vigencia en gov.il.*`;
  }

  // Productos Panlatinos, Colombianos, Venezolanos, Mexicanos, Andinos, Caribeños
  if (
    q.includes('harina pan') ||
    q.includes('harina p.a.n') ||
    q.includes('arepa') ||
    q.includes('platano') ||
    q.includes('plátano') ||
    q.includes('frijol') ||
    q.includes('poroto negro') ||
    q.includes('caraota') ||
    q.includes('aji') ||
    q.includes('ají') ||
    q.includes('chile') ||
    q.includes('salsa mexicana') ||
    q.includes('tortilla de maiz') ||
    q.includes('tortillas de maíz') ||
    q.includes('pulpa') ||
    q.includes('panela') ||
    q.includes('papelon') ||
    q.includes('papelón') ||
    q.includes('queso llanero') ||
    q.includes('queso blanco') ||
    q.includes('colombia') ||
    q.includes('venezuela') ||
    q.includes('mexico') ||
    q.includes('méxico') ||
    q.includes('peru') ||
    q.includes('perú')
  ) {
    return `🥑 **Productos Panlatinos, Andinos, Caribeños y Mexicanos en Israel:**

📍 **Puntos Físicos Confirmados:**
- **Tel Aviv — "La Tienda - Comida Latina":** Local referente ubicado en **Levanda 13** (amplia variedad de Harina P.A.N., frijoles/caraotas, salsas mexicanas, tortillas de maíz, pulpas de fruta, panela/papelón y quesos típicos).
- **Tel Aviv — Shuk HaCarmel:** Exclusivamente para frutas tropicales (plátano macho), cilantro, chiles frescos/secos y especias. *(Nota: no es punto de referencia para productos empaquetados como yerba o alfajores)*.
- **Tel Aviv — Shuk Levinsky (Florentin):** Tiendas de frutos secos y especias a granel.

🛒 **Cadenas Nacionales (Todo Israel):**
- **Tiv Ta'am** y **Keshet Teamim:** En sus distintas sucursales cuentan con sección internacional donde suele haber stock regular de Harina P.A.N. y productos importados.

🚚 **Envíos a todo el país (Kibutzim, Moshavim y cualquier ciudad):**
- Tiendas online especializadas (como La Tienda e importadores comunitarios directos) con servicio de despacho a domicilio.
- **Redes Comunitarias:** Grupos de WhatsApp y Facebook de Olim ("Latinos en Israel", "Colombianos en Israel", "Venezolanos en Israel", "Mexicanos en Israel") para compras colectivas y ferias.

⚠️ *Pauta comercial: Precios, stock y horarios (en especial vísperas de Shabat y festividades/jaguim) pueden variar; conviene consultar antes de concurrir.*`;
  }

  // Yerba mate, compras del Cono Sur y alimentos
  if (
    q.includes('yerba') ||
    q.includes('mate') ||
    q.includes('alfajor') ||
    q.includes('dulce de leche') ||
    q.includes('empanada') ||
    q.includes('carniceria') ||
    q.includes('carnicería') ||
    q.includes('asado') ||
    q.includes('vacio') ||
    q.includes('vacío') ||
    q.includes('medialuna') ||
    q.includes('golosina') ||
    q.includes('argentina') ||
    q.includes('uruguay') ||
    q.includes('chile')
  ) {
    return `🧉 **Productos del Cono Sur y Rioplatenses en Israel:**

📍 **Puntos Físicos Confirmados:**
- **Tel Aviv — Zona Allenby:** Local de productos argentinos/latinos en **Allenby 37** (yerba mate, dulce de leche, alfajores, golosinas y tapas).
- **Ramat Gan — Calle Bialik:** Comercios y dietéticas sobre la calle comercial **Bialik** (yerba mate y productos de importación).
- **Tel Aviv — "La Tienda - Comida Latina" (Levanda 13):** Variedad de productos latinoamericanos e importados.
- *(Aclaración importante: El Shuk HaCarmel es ideal para frutas tropicales, chiles y especias frescas, pero NO se recomienda para yerba mate ni alfajores).*

🛒 **Cadenas Nacionales (Todo Israel):**
- **Tiv Ta'am** y **Keshet Teamim:** En sus distintas sucursales cuentan con góndola internacional fija con stock regular de yerba mate y productos sudamericanos.

🚚 **Envíos a todo el país (Kibutzim, Moshavim y cualquier ciudad):**
- Tiendas online especializadas e importadores directos con despacho a domicilio.
- **Redes Comunitarias:** Grupos de WhatsApp y Facebook ("Argentinos en Israel", "Uruguayos en Israel", "Latinos en Israel") para compras colectivas y recomendaciones locales.

⚠️ *Pauta comercial: Precios, stock y horarios (en especial vísperas de Shabat y festividades/jaguim) pueden variar; conviene chequear antes de concurrir.*`;
  }

  // Rental prices inquiry (Example 4)
  if ((q.includes('alquilar') || q.includes('alquiler') || q.includes('cuanto sale') || q.includes('cuánto sale') || q.includes('precio departamento') || q.includes('precio depto')) && (q.includes('tel aviv') || q.includes('tlv') || q.includes('ramat gan') || q.includes('haifa') || q.includes('jerusalen'))) {
    return `No tengo datos de precios actualizados cargados, y los alquileres en las ciudades de Israel varían mucho según barrio y momento del mercado, así que cualquier cifra que te diera podría estar equivocada. Te recomiendo mirar Yad2 o Facebook Marketplace filtrando por tu zona para tener una idea real y actual de precios.`;
  }

  // Bituaj Leumi timeline / partial inquiry (Example 3)
  if ((q.includes('cuanto tarda') || q.includes('cuánto tarda') || q.includes('plazo') || q.includes('cuanto demora') || q.includes('cuánto demora')) && (q.includes('bituaj') || q.includes('reclamo') || q.includes('accidente'))) {
    return `No tengo un plazo exacto confirmado para tu caso, porque varía según el tipo de reclamo y la carga de trabajo de la oficina. Lo que sí puedo decirte es que para accidentes laborales debes haber presentado el formulario BL 250 completado por tu empleador y el dictamen médico inicial. Para un plazo real y actualizado, te recomiendo llamar directamente a Bituaj Leumi (*6050) o consultar en btl.gov.il.`;
  }

  // Dermatologist in Haifa or unlisted specialist (Example 2)
  if ((q.includes('dermatologo') || q.includes('dermatólogo') || q.includes('dermatologa') || q.includes('dermatóloga')) && (q.includes('haifa') || q.includes('norte'))) {
    return `No tengo ningún dermatólogo cargado en mi lista para Haifa por el momento, así que no te puedo dar un nombre confirmado. Te recomiendo buscarlo directamente en la app de tu kupat jolim (filtrando por idioma español) o en doctors.org.il, donde vas a poder ver médicos reales con reseñas verificadas de pacientes.`;
  }

  // Doctors and Medical Directory
  if (
    q.includes('medico') ||
    q.includes('médico') ||
    q.includes('doctor') ||
    q.includes('dra') ||
    q.includes('directorio') ||
    q.includes('especialista') ||
    q.includes('pediatra') ||
    q.includes('traumatologo') ||
    q.includes('traumatólogo') ||
    q.includes('psicologo') ||
    q.includes('psicólogo') ||
    q.includes('ginecologo') ||
    q.includes('ginecólogo')
  ) {
    return `🩺 **Médicos y Profesionales de Salud que Hablan Español:**
No tengo un médico particular precargado en mi lista para esa especialidad o zona geográfica.

Para encontrar un profesional verificado:
1. **App oficial de tu Kupat Jolim:** En las aplicaciones y portales de **Maccabi** (*3555), **Clalit** (*2700), **Meuhedet** (*3833) o **Leumit** (*507), podés filtrar la búsqueda de médicos por idioma ("Español / ספרדית") y ciudad.
2. **Directorio Nacional:** Podés consultar en **doctors.org.il**.
3. **Pestaña de Médicos en Olim Conectados:** Podés revisar la pestaña **"Médicos en Español"** en el menú de esta plataforma para ver recomendaciones cargadas directamente por otros miembros de la comunidad.

⚠️ *Ante síntomas agudos o emergencias, acudí a tu médico de cabecera (Rofé Mishpajá), a un centro de urgencias barrial (Terem *2884 / Bikur Rofé) o llamá a MADA (101).*`;
  }

  // Urgencias hospitalarias y guardia (Miún / MADA)
  if (
    (q.includes('hospital') || q.includes('miun') || q.includes('urgencia') || q.includes('guardia') || q.includes('mada') || q.includes('ambulancia')) &&
    !q.includes('activar') &&
    !q.includes('credencial') &&
    !q.includes('tarjeta magnetica') &&
    !q.includes('ya puedo usarla') &&
    !q.includes('turno')
  ) {
    return `⚠️ **Alerta Económica Importante de Guardia (Miún):**
El hospital en Israel **NO es gratuito** para consultas espontáneas. Si te presentas en la guardia (**Miún** [מיון]) sin derivación (**hafniá** [הפניה]), recibirás una factura elevada (**heshbonit** [חשבונית]) de entre 500 y más de 1.000 NIS que tu Kupat Jolim no cubrirá de forma automática.

📋 **Ruta Escalonada para No Pagar de Más:**
1. **Paso 1:** Consulta primero a tu médico de cabecera (**Rofé Mishpajá** [רופא משפחה]) o utiliza la telemedicina / chat médico de la app de tu Kupá.
2. **Paso 2:** Si la clínica está cerrada (noche o fin de semana), acude a un centro de urgencia intermedia como **Terem** [טרם] o **Bikur Rofé** [ביקור רופא]. El copago es mucho menor y allí evaluarán si requieres derivación (**hafniá**).
3. **Paso 3:** Ve al hospital (**Miún**) ÚNICAMENTE con **hafniá**, si quedas internado, por fractura traumática evidente o riesgo inminente de vida.

🚑 **Ambulancias (MADA):**
Llamar a MADA emite factura obligatoria. Solo se exime o reembolsa al 100% si el paciente queda efectivamente **internado** en el hospital o si cumple criterios estrictos de urgencia vital tipificados por la Kupá.

⚖️ *Descargo: Esta guía previene sobrecostos habituales pero ante un riesgo de vida inminente no demores la atención médica.*`;
  }

  if (
    q.includes('tendinitis') ||
    q.includes('bl 250') ||
    q.includes('quervain') ||
    q.includes('carpiano') ||
    q.includes('teunat avoda') ||
    q.includes('teunát avodá') ||
    (q.includes('accidente') && (q.includes('trabajo') || q.includes('laboral') || q.includes('trayecto'))) ||
    (q.includes('lesion') && q.includes('laboral')) ||
    (q.includes('bituaj leumi') && (q.includes('accidente') || q.includes('lesion') || q.includes('pgia') || q.includes('pgiá') || q.includes('muñeca')))
  ) {
    return `⚠️ **Alerta Crítica de Bituaj Leumi (Accidentes y Tendinitis):**
Las lesiones repetitivas (como tendinitis de De Quervain o túnel carpiano) o accidentes en el trabajo / trayecto deben documentarse de forma perfecta desde el minuto cero. Si el primer médico no escribe la causa laboral, **Bituaj Leumi** [ביטוח לאומי] suele rechazar el reclamo.

📋 **Protocolo Obligatorio Paso a Paso:**
1. **Paso 1 - Empleador:** Notifica de inmediato al empleador y exige el formulario **BL 250** (**Tofes Dmei Pgiá** [טופס דמי פגיעה]).
2. **Paso 2 - Primera Consulta Médica:** Al ser atendido por el médico de la guardia o Kupá, exige que escriba textualmente en el resumen clínico (**sijum majalí** [סיכום מחלה]) que el dolor comenzó realizando tareas laborales (**be-avodá** [בעבודה]).
3. **Paso 3 - Médico Ocupacional:** Solicita de forma prioritaria turno con el Médico Ocupacional (**Rofé Taasukatí** [רופא תעסוקתי]). Es el único cuyo dictamen oficial sobre capacidad laboral tiene validez plena para Bituaj Leumi.

📑 **Documentos y Términos Clave:**
- **BL 250** (Tofes 250) firmado por el empleador.
- **Sijum majalí** con mención expresa del trabajo.
- Turno con **Rofé Taasukatí** [רופא תעסוקתי].

⚖️ *Descargo: Información orientativa de derechos del olé. Consulta siempre con tu médico ocupacional y asesor legal en caso de litigio.*`;
  }

  if (q.includes('enfermedad') || q.includes('dias de enfermedad') || q.includes('reposo') || q.includes('dmei majala') || q.includes('sueldo') || q.includes('falta')) {
    return `⚠️ **Alerta sobre Cobro de Días de Enfermedad (Jok Dmei Majalá):**
Tener un certificado médico (**ishur majalá** [אישור מחלה]) justifica la ausencia laboral ante el empleador, pero **NO garantiza el cobro del 100% desde el primer día**, y SOLO se cobra si tienes días acumulados disponibles.

📋 **Escala Legal de Pago (Ley Israelí):**
- **Día 1 de ausencia:** **0%** (por ley no se paga).
- **Días 2 y 3:** Se pagan al **50%** del valor jornal diario.
- **Día 4 en adelante:** Se paga al **100%** del jornal diario.

📊 **Saldo Acumulado (Tsvirat Yeméi Majalá):**
- Se acumulan **1.5 días de enfermedad** por cada mes completo trabajado (tope 90 días).
- **¡Atención!** Si tu saldo acumulado en el recibo de sueldo (**tlush sajar** [תלוש שכר]) está en 0 o se agota por una enfermedad larga, los días se descontarán como ausencia no remunerada (salvo que sea accidente laboral cubierto por Bituaj Leumi).

📑 **Requisitos:**
- Solicitar y enviar inmediatamente el **Ishur Majalá** [אישור מחלה] oficial emitido por tu Kupá.`;
  }

  if (q.includes('licencia') || q.includes('conducir') || q.includes('registro') || q.includes('manejar') || q.includes('auto') || q.includes('rishayun')) {
    return `⚠️ **Plazos Fatales de Manejo para Olim:**
Solo puedes conducir con tu licencia extranjera durante los **primeros 12 meses** (1 año) desde tu fecha de llegada (aliá). El derecho preferencial de canje (**Hamarat Rishayón** [המרת רישיון]) dura hasta 5 años.

📋 **Cómo Canjear tu Licencia en Misrad HaRishuí:**
- **Caso 1: Licencia extranjera VIGENTE con más de 5 años de antigüedad:**
  * Tienes conversión directa **sin rendir examen teórico ni práctico**.
  * Pasos: Completar el formulario online **Tofes Yarok** [טופס ירוק] en el portal de transporte, realizar el examen de vista (**bedikat einaim** [בדיקת עיניים]) en una óptica autorizada (aprox. 50 NIS), y agendar turno en **Misrad HaRishuí** [משרד הרישוי] a través de **MyVisit**.
- **Caso 2: Licencia extranjera VENCIDA:**
  * No califica para canje automático con el plástico vencido.
  * Solución: Solicitar a la entidad de tránsito de tu país de origen el **Certificado de Legalidad / Antigüedad de Conductor** apostillado, o bien rendir un examen práctico de control (**Mivján Shlitá** [מבחן שליטה]).

📑 **Términos:** **Tofes Yarok**, **Bedikat Einaim**, **Hamarat Rishayón**, **Misrad HaRishuí**.`;
  }

  if (q.includes('101') || q.includes('tofes 101') || q.includes('impuesto') || q.includes('mas hajnas') || q.includes('nekudot')) {
    return `⚠️ **Alerta Fiscal de Tofes 101:**
Al empezar a trabajar o en cada mes de enero, debes completar el **Tofes 101** [טופס 101]. Si no marcas expresamente tu condición de **Olé Jadash**, el empleador te retendrá indebidamente impuesto a las ganancias (**Mas Hajnasá** [מס הכנסה]).

📋 **Puntos Clave:**
- Marca la casilla de nuevo inmigrante y adjunta copia de tu **Teudat Olé** [תעודת עולה] y fecha de llegada.
- Esto te otorga puntos de crédito fiscal adicionales (**Nekudot Zijui** [נקודות זיכוי]), que reducen significativamente o anulan el pago de Mas Hajnasá durante tus primeros años.
- Revisa siempre tu primer recibo de sueldo (**tlush sajar** [תלוש שכר]) para confirmar que las Nekudot Zijui estén acreditadas.`;
  }

  if (q.includes('myvisit') || q.includes('turno') || q.includes('cita') || q.includes('pnim')) {
    return `💡 **Consejo Práctico de Olim Conectados para MyVisit:**
Para trámites en **Misrad HaPnim** [משרד הפנים] (Teudat Zehut, pasaporte biométrico) o **Misrad HaRishuí** [משרד הרישוי] (licencias), los turnos en MyVisit suelen aparecer agotados a meses vista.

⏰ **El Truco Matutino:**
Conéctate a la web o app de **MyVisit** entre las **7:00 AM y 8:30 AM**. A esa hora el sistema libera automáticamente cancelaciones del día y cupos urgentes para esa misma semana.`;
  }

  if (q.includes('ulpan') || q.includes('ulpán') || q.includes('voucher') || q.includes('5200') || q.includes('5.200') || q.includes('hebreo')) {
    return `🎓 **Ulpán Estatal y Vouchers de Misrad HaAliyah (~5.200 NIS):**

⚠️ **Alerta Crítica:**
El voucher para Ulpán Privado **NO es a fondo perdido**. Tú debes adelantar el pago y el Ministerio de Aliá solo te reintegra el arancel si cumples estrictamente con los requisitos.

📋 **Requisitos Obligatorios para Reintegro:**
1. **Paso 1:** Haber aprobado el examen de Ulpán inicial estatal (Ulpán Álef).
2. **Paso 2:** Asistencia presencial mínima del **80%** (debes firmar planilla en cada clase). Si abandonas, el dinero adelantado se pierde.
3. **Paso 3:** Rendir y aprobar el examen final de la institución privada. Solo con dicho certificado se efectúa el depósito en tu cuenta bancaria.`;
  }

  // Trámites Críticos de Recién Llegados (Día 1 a Mes 1)

  // 1. Apertura de Cuenta Bancaria Israelí
  if (
    q.includes('cuenta bancaria') ||
    q.includes('abrir cuenta') ||
    q.includes('banco') ||
    q.includes('hapoalim') ||
    q.includes('leumi') ||
    q.includes('discount') ||
    q.includes('mizrahi') ||
    q.includes('nihul jeshbon') ||
    q.includes('nihul kheshbon')
  ) {
    return `🏦 **Cómo Abrir tu Cuenta Bancaria en Israel (Paso 1 Obligatorio):**

⚠️ **Alerta Crítica:**
No podrás recibir las cuotas restantes del **Sal Klitá** [סל קליטה] ni cobrar un sueldo legal sin una cuenta bancaria israelí activa a tu nombre. Debes hacer este trámite en tus primeros 3 a 5 días hábiles en el país.

🤝 **Apoyo Solidario Recomendado - OLEI (Organización de Inmigrantes Hispanohablantes):**
Si aún no dominas el hebreo o el inglés bancario, puedes contactar a la **OLEI** [עולי]. Sus voluntarios acompañan a los olim en persona al banco para evitar que te cobren comisiones abusivas o te exijan requisitos desmedidos, asegurando que te entreguen el paquete gratuito de nuevo inmigrante.

📋 **Documentos que Exige el Banco:**
1. **Teudat Olé** [תעודת עולה] original (la que te entregaron en el aeropuerto Ben Gurión).
2. **Teudat Zehut** [תעודat זהות] provisoria (papel doblado con tu foto o número de identidad).
3. **Pasaporte extranjero vigente**.
4. **Número de celular israelí** (indispensable para recibir SMS de verificación y activar la app móvil).
5. **Depósito inicial en efectivo:** Se recomienda llevar entre 50 y 100 NIS en efectivo (o el cheque entregado en el aeropuerto) para activar formalmente la cuenta en ventanilla.
*(Nota: Si eres ciudadano estadounidense, te pedirán tu número de Social Security y formulario W-9).*

📄 **El Documento de Oro: Ishur Nihul Jeshbón [אישור ניהול חשבון]:**
Al abrir la cuenta, **exige de inmediato este certificado oficial**. Es la constancia bancaria que debes presentar a tu asesor de **Misrad HaAliyah** para que depositen las siguientes 5 cuotas del Sal Klitá.

💡 **Consejos de Ahorro para Olim:**
- Pregunta por el paquete preferencial de Olé Jadash (**Ptor me-Amalot** - exención de comisiones de mantenimiento por el primer año).
- Solicita tarjeta de débito local (**Cartís Jimashon**) y claves de home banking en el momento.`;
  }

  // 2. Vigencia y Caducidad de Teudat Olé
  if (
    q.includes('teudat ole') ||
    q.includes('teudat olé') ||
    q.includes('caduca') ||
    q.includes('vence') ||
    q.includes('vencimiento') ||
    q.includes('derechos primer año')
  ) {
    return `📄 **Vigencia de tu Teudat Olé y Cronograma de Derechos:**

⚠️ **Diferencia Fundamental:**
- Tu condición de **Olé Jadash** es permanente ante la ley del retorno, pero los **beneficios económicos y fiscales tienen distintos plazos de caducidad**.
- La libreta física de **Teudat Olé** [תעודת עולה] que te dieron en el aeropuerto no "vence" como documento de identidad histórico, pero tus derechos tienen plazos estrictos contados desde tu fecha de llegada (**Taarij Aliyá**):

⏱️ **Cronograma de Vencimiento de Derechos Clave:**
1. **Primeros 6 meses:** Sal Klitá (canasta de absorción en 6 cuotas). Cobertura básica de Kupat Jolim sin costo de aporte mensual.
2. **Meses 7 a 30 (24 meses):** Subsidio de alquiler (**Siyua biSjirot**) depositado mes a mes. **Caduca de forma improrrogable en el mes 30.**
3. **Primeros 12 meses (1 año):**
   * **Conducir con licencia extranjera:** Plazo fatal de 12 meses. Después es ilegal manejar sin canjearla ante Misrad HaRishuí.
   * **Descuento de Arnoná (tasa municipal):** Descuento del 70% al 90% en la Iriyá aplicable durante 12 meses continuos de contrato de alquiler.
4. **Primeros 3 a 4.5 años:** Puntos de crédito impositivos (**Nekudot Zijui** en el Tofes 101) para no pagar impuesto a las ganancias.
5. **Primeros 5 años:** Exención o reducción arancelaria para canjear licencia de conducir (si tienes más de 5 años de antigüedad) y descuento en compra de electrodomésticos o auto nuevo.`;
  }

  // 3. Turno en MyVisit para Teudat Zehut Biométrica Permanente
  if (
    q.includes('teudat zeut') ||
    q.includes('teudat zehut') ||
    q.includes('biometric') ||
    q.includes('biométrica') ||
    (q.includes('pnim') && (q.includes('dni') || q.includes('documento') || q.includes('cedula')))
  ) {
    return `🪪 **Cómo tramitar tu Teudat Zehut Biométrica Permanente (Misrad HaPnim):**

⚠️ **Plazo Legal Importante:**
La Teudat Zehut de papel provisoria que te entregan en el aeropuerto Ben Gurión tiene una validez de **3 meses**. Dentro de ese período debes tramitar la tarjeta plástica biométrica definitiva.

📱 **Paso a Paso en MyVisit (Sitio / App):**
1. **Accede a MyVisit:** Ingresa a la app o al sitio web [myvisit.com](https://myvisit.com) o [govisit.co.il](https://govisit.co.il).
2. **Selecciona el organismo:** Elige **Rashut HaOjlusin ve-haHagirá** (Autoridad de Población e Inmigración - **Misrad HaPnim** [משרד הפנים]).
3. **Servicio:** Selecciona *"Emisión de Teudat Zehut Biométrica"* (**Hanafat Teudat Zehut Biometrit**).
4. **Identificación:** Coloca tu número de Zehut de 9 dígitos (el que figura en tu libreta provisoria o Teudat Olé) y tu número de celular israelí para el SMS.
5. **Costo:** El primer trámite de Teudat Zehut biométrica para Olé Jadash es **100% gratuito** (sin arancel estatal).

⏰ **Consejo de Oro para Conseguir Turno:**
Debido a la alta demanda, las citas suelen aparecer lejanas. Ingresa a la app de MyVisit **temprano entre las 7:00 AM y 8:30 AM**; a esa hora se liberan automáticamente cancelaciones del día y cupos de urgencia en sucursales cercanas.

📋 **Qué llevar a la cita:**
- Libreta de **Teudat Olé**.
- Teudat Zehut provisoria de papel.
- Pasaporte extranjero con el que ingresaste a Israel.
- Certificado de nacimiento original (y libreta de matrimonio si corresponde).`;
  }

  // 4. Activación de Cobertura en Kupat Jolim (Maccabi, Clalit, Meuhedet, Leumit)
  if (
    q.includes('maccabi') ||
    q.includes('clalit') ||
    q.includes('meuhedet') ||
    q.includes('leumit') ||
    q.includes('cobertura') ||
    q.includes('activar kupa') ||
    q.includes('activar kupá') ||
    q.includes('elegí maccabi') ||
    q.includes('elegi maccabi') ||
    q.includes('ya puedo usarla') ||
    q.includes('tarjeta magnetica') ||
    q.includes('credencial')
  ) {
    return `🏥 **Activación de Cobertura en Kupat Jolim (Maccabi / Clalit / Meuhedet / Leumit):**

⚠️ **¿Completaste el formulario antes de viajar o en el aeropuerto?:**
¡Sí! Tu afiliación básica está pre-registrada en el sistema de salud israelí, **PERO debes activarla formalmente en una sucursal física** para obtener tu credencial magnética (**Cartís Magentí**) y dar de alta el seguro complementario.

🤝 **Apoyo Solidario Recomendado - OLEI (Organización de Inmigrantes Hispanohablantes):**
Si el idioma o la burocracia inicial te abruman, **contacta a la OLEI**. Cuentan con voluntarios hispanohablantes experimentados que te acompañan a la sucursal de tu Kupá para gestionar la tarjeta magnética, entender los planes complementarios y vincular el débito automático (**Horaat Keva**) sin contratiempos.

📋 **Pasos Inmediatos para Usar tu Cobertura:**
1. **Paso 1 - Presentarse en una sucursal (Snif):** Acude a la sede de la Kupá que elegiste (Maccabi, Clalit, etc.) más cercana a tu domicilio. No necesitas turno previo para la ventanilla de afiliación (**Mazkirut**).
2. **Paso 2 - Documentación requerida:**
   - Libreta de **Teudat Olé** original.
   - Constancia de inscripción de salud del aeropuerto o del Correo (**Doar Israel**).
   - Número de Teudat Zehut.
   - Datos de tu cuenta bancaria (para vincular el débito directo o **Horaat Keva** del seguro complementario).
3. **Paso 3 - Credencial Magnética:** En ventanilla imprimirán tu tarjeta plástica con chip/banda en el acto o te darán un código provisorio con el que ya puedes ver médicos y comprar medicamentos subvencionados en la farmacia.
4. **Paso 4 - Seguro Complementario (Sheli / Gold / Zahav):**
   * **¡Dato clave!:** Durante los **primeros 90 días desde tu aliá**, puedes inscribirte a los niveles más altos de cobertura complementaria **sin período de carencia** (sin meses de espera para cirugías, tratamientos dentales o especialistas).

💡 **¿Y si tengo una urgencia médica hoy mismo antes de ir al Snif?:**
Con tu número de Teudat Zehut y el papel del aeropuerto ya estás empadronado en el seguro de salud estatal. Comunícate al call center de tu Kupá (*3555 para Maccabi, *2700 para Clalit) para que te asignen médico de guardia o te indiquen el centro de urgencias (**Terem**) con convenio.`;
  }

  // 4b. Consultas sobre OLEI y organizaciones de ayuda al Olé
  if (
    q.includes('olei') ||
    q.includes('organización de inmigrantes') ||
    q.includes('asociacion de olim') ||
    q.includes('asociación de olim') ||
    q.includes('voluntarios') ||
    q.includes('acompañamiento')
  ) {
    return `🤝 **OLEI - Organización de Inmigrantes Hispanohablantes en Israel:**

La **OLEI** [עולי] es la institución comunitaria central y solidaria que nuclea y asiste a todos los inmigrantes de habla hispana en Israel desde su llegada:

🌟 **¿En qué te ayuda la OLEI en tus primeros trámites?:**
1. **Apertura de Cuenta Bancaria:** Acompañamiento presencial de voluntarios a las sucursales para asegurar la apertura sin comisiones indebidas y la obtención del **Ishur Nihul Jeshbón**.
2. **Kupat Jolim:** Asistencia en la oficina de tu Kupá (Maccabi, Clalit, etc.) para tramitar la credencial magnética y elegir tu médico de familia.
3. **Traducción y Burocracia:** Lectura y comprensión de cartas oficiales, contratos de alquiler en hebreo y boletas municipales de **Arnoná**.
4. **Red Social y Emocional:** Encuentros comunitarios, grupos de pares por edades y actividades culturales para no sentirte solo en tus primeras semanas.

📍 **Sedes de OLEI en Israel:**
Tienen filiales activas en Tel Aviv, Jerusalén, Netanya, Haifa, Ra'anana, Rishon LeZion, Ashdod, Beer Sheva y Kfar Saba.
Puedes consultar con tu sede local o ingresar a su web oficial [olei.org.il](https://olei.org.il).`;
  }

  // 5. Celular y Transporte (Rav-Kav) para recién llegados
  if (
    q.includes('rav-kav') ||
    q.includes('rav kav') ||
    q.includes('sim') ||
    q.includes('celular') ||
    q.includes('telefono') ||
    q.includes('colectivo') ||
    q.includes('tren')
  ) {
    return `📱 **Celular y Transporte Público para Recién Llegados:**

1. **Número de Celular Israelí (Día 1):**
   - Es el requisito imprescindible para todo: abrir la cuenta del banco, recibir turnos de MyVisit y comunicarse con Misrad HaAliyah.
   - Puedes comprar una tarjeta SIM prepaga o con abono mensual (Partner, Cellcom, Pelephone, 012, Golan, Hot Mobile) en kioscos, centros comerciales o casas de telefonía presentando tu pasaporte extranjero.

2. **Tarjeta de Transporte Rav-Kav [רב-קו]:**
   - En Israel **no se paga con dinero en efectivo arriba de los colectivos ni trenes**.
   - **Cómo obtenerla:** Puedes emitir tu tarjeta Rav-Kav personalizada (con foto y perfil) en los centros de atención **Al HaKav** (en estaciones centrales de trenes y autobuses como Savidor Merkaz o HaShalom en Tel Aviv) de forma gratuita presentando tu Teudat Olé y pasaporte.
   - **Apps de pago en el celular:** También puedes pagar directamente descargando en tu celular las apps autorizadas como **Moovit**, **Pango** o **HopOn Rav-Kav**, vinculando una tarjeta de crédito o débito.`;
  }

  // 11. Sal Klitá y Subsidio de Alquiler (Plazos Exactos)
  if (
    q.includes('sal klita') ||
    q.includes('sal klitá') ||
    q.includes('canasta') ||
    q.includes('subsidio de alquiler') ||
    q.includes('ayuda de alquiler') ||
    q.includes('siyua') ||
    q.includes('sjirot') ||
    q.includes('mes 30') ||
    q.includes('mes 7') ||
    q.includes('deje de cobrar') ||
    q.includes('dejé de cobrar') ||
    q.includes('corte de pago')
  ) {
    return `💰 **Sal Klitá y Subsidio de Alquiler (Plazos Legales Exactos):**

⚠️ **Alerta de Plazos Fatales (Corte en el Mes 30):**
Muchos olim se alarman al ver que la ayuda económica se detiene. Este es el cronograma oficial reglamentario fijado por **Misrad HaAliyah**:

📋 **Cronograma Oficial de Cobro:**
1. **Meses 1 a 6 (Sal Klitá [סל קליטה]):**
   - La canasta básica de absorción se abona durante los primeros 6 meses: un primer pago inicial en el aeropuerto (o cuenta bancaria) seguido de **5 cuotas mensuales consecutivas**.
2. **Meses 7 a 30 (Ayuda de Alquiler - Siyua bi'Sjirot [סיוע בשכר דירה]):**
   - Comienza **automáticamente en el mes 7** de aliá.
   - Tiene una duración exacta de **24 meses consecutivos** (desde el mes 7 hasta el mes 30 de tu aliá).
3. **Mes 31 en adelante:**
   - **Corte definitivo por ley.** Al finalizar el mes 30 de permanencia, el subsidio de alquiler caduca de forma reglamentaria y no se renueva automáticamente.

📑 **Términos Clave:** **Sal Klitá** [סל קליטה], **Siyua bi'Sjirot** [סיוע בשכר דירה], **Misrad HaAliyah ve-haKlitá**.`;
  }

  // 12. Pluriempleo y Teum Mas
  if (
    q.includes('teum mas') ||
    q.includes('dos trabajos') ||
    q.includes('pluriempleo') ||
    q.includes('segundo trabajo') ||
    q.includes('retencion 47') ||
    q.includes('47%') ||
    q.includes('tik nikuyim') ||
    q.includes('coordinacion fiscal') ||
    q.includes('coordinación fiscal')
  ) {
    return `⚠️ **Alerta Fiscal Crítica: Pluriempleo y Retención del 47% (Teum Mas):**
Si trabajas en **dos o más empleos simultáneos** en Israel y no haces el trámite preventivo, el segundo empleador está legalmente obligado a retenerte la tasa máxima de impuesto a las ganancias (**Mas Hajnasá** [מס הכנסה]), que ronda el **47%** de tu sueldo secundario.

📋 **Procedimiento Obligatorio Paso a Paso:**
1. **Paso 1 - Datos Patronales:** Pide a cada uno de tus empleadores su número de expediente de deducción patronal (**Tik Nikuyim** [תיק ניכויים], un número de 9 dígitos).
2. **Paso 2 - Portal Digital:** Ingresa al portal oficial de **Rashut HaMisim** [רשות המסים] (Autoridad Tributaria) en la sección **Teum Mas Online** (תיאום מס באינטרנט).
3. **Paso 3 - Declaración:** Indica cuál es tu empleador principal (donde cobras el ingreso mayor y aprovechas tus **Nekudot Zijui** de olé jadash) y declara el estimado de ingresos del segundo trabajo.
4. **Paso 4 - Entrega de Certificados:** El sistema genera en el acto los certificados de porcentaje de retención para cada empresa. **Debes entregar una copia al departamento de RRHH/Contabilidad del segundo empleador** antes del cierre de liquidación del mes.

📑 **Documentos:** Número de **Tik Nikuyim** de cada empresa, estimación de ingresos mensuales y Teudat Zehut.`;
  }

  // 13. Protocolo Laboral en Estado de Guerra (Pikud HaOref)
  if (
    q.includes('guerra') ||
    q.includes('pikud haoref') ||
    q.includes('pikud') ||
    q.includes('alarma') ||
    q.includes('misil') ||
    q.includes('refugio') ||
    q.includes('mamad') ||
    q.includes('miklat') ||
    q.includes('despido') && q.includes('seguridad') ||
    q.includes('vacaciones') && (q.includes('guerra') || q.includes('alerta') || q.includes('forzada')) ||
    q.includes('matzav meiyujad')
  ) {
    return `🛡️ **Protocolo Laboral en Emergencia y Estado de Guerra (Pikud HaOref):**

⚠️ **Prohibición Legal de Despido:**
En Israel rigen con fuerza de ley las directivas del Comando del Frente Interno (**Pikud HaOref** [פיקוד העורף]):
- Si Pikud HaOref prohíbe la actividad presencial o si en tu lugar de trabajo **no hay refugio accesible** (**Mamad** [ממ"ד] o **Miklat** [מקלט]) dentro del tiempo reglamentario de alerta, **está estrictamente PROHIBIDO por ley que te despidan** por ausentarte para resguardar tu vida o la de tus hijos menores por cierre escolar.

📋 **Salarios, Vacaciones y Compensaciones:**
1. **Vacaciones Forzadas:** El empleador **NO puede descontar días de vacaciones de forma arbitraria** si no dispones de saldo positivo acumulado de días de vacaciones en tu recibo (**tlush sajar**). No se permite dejar tu balance de vacaciones en negativo sin tu consentimiento expreso.
2. **Sueldos en Áreas de Conflicto:** En situaciones de emergencia prolongada (**Matzav Meiyujad ba-Oref** [מצב מיוחד בעורף]), el Estado firma acuerdos marco con **Bituaj Leumi** y organizaciones gremiales para otorgar indemnizaciones salariales a los trabajadores de zonas paralizadas.

⚖️ *Descargo: Las directivas de Pikud HaOref prevalecen sobre cualquier exigencia patronal presencial.*`;
  }

  // 14. Pasaporte Israelí (Darkón) vs. Teudat Ma'avar
  if (
    q.includes('darkon') ||
    q.includes('darkón') ||
    q.includes('pasaporte') ||
    q.includes('teudat maavar') ||
    q.includes('teudat ma\'avar') ||
    q.includes('maavar') ||
    q.includes('viajar antes del año') ||
    q.includes('viaje exterior') ||
    q.includes('visa viaje')
  ) {
    return `🛂 **Pasaporte Israelí (Darkón) vs. Teudat Ma'avar:**

⚠️ **Alerta Crítica de Viaje para Olim:**
Como nuevo inmigrante, existe una diferencia legal sustancial entre ambos documentos de viaje:

1. **La Regla del Primer Año (Darkón Regular [דרכון]):**
   - Como norma general, el olé jadash debe completar **un año (12 meses)** de residencia y centro de vida efectivo en Israel para calificar para el pasaporte israelí biométrico ordinario (**Darkón**).

2. **Documento Provisorio de Viaje (Teudat Ma'avar [תעודת מעבר]):**
   - Si necesitas salir del país antes de cumplir el año de aliá, **Misrad HaPnim** te emitirá una **Teudat Ma'avar** (Documento de viaje en lugar de pasaporte nacional / Travel Document in Lieu of National Passport).

🚨 **¡ADVERTENCIA DE VISAS CON LA TEUDAT MA'AVAR!**
- El Darkón israelí regular tiene exención de visa en decenas de países (Unión Europea, Reino Unido, etc.).
- Sin embargo, **la Teudat Ma'avar NO siempre goza de estos convenios bilaterales**.
- **Acción Obligatoria:** Si viajas con Teudat Ma'avar, debes comunicarte con la embajada o consulado del país de destino para verificar si te exigen solicitar una **visa consular previa**. No asumas que ingresas libremente como con un Darkón regular.`;
  }

  // 15. Transporte Público en Jagim y Shabat
  if (
    q.includes('transporte') ||
    q.includes('colectivo') ||
    q.includes('autobus') ||
    q.includes('autobús') ||
    q.includes('tren') ||
    q.includes('ferrocarril') ||
    q.includes('shabat') && q.includes('viaje') ||
    q.includes('jagim') ||
    q.includes('fiestas') ||
    q.includes('pesaj') ||
    q.includes('yom kipur') ||
    q.includes('iom kipur') ||
    q.includes('jol hamoed')
  ) {
    return `🚌 **Transporte Público en Shabat y Festividades (Jagim):**

⚠️ **Regla General de Corte de Servicios:**
En las vísperas y días de festividades solemnes (*Rosh Hashaná, Iom Kipur, Pésaj, Shavuot, Sucot*):
1. **Cese de Actividades:** Tanto los trenes (**Rakevet Israel** [רכבת ישראל]) como las líneas de colectivos interurbanos y urbanos regulares (Egged, Dan, Metropoline, etc.) **dejan de funcionar varias horas antes del anochecer de la víspera (Erev Jag)**.
2. **Iom Kipur:** El cese es absoluto (100% de paralización de transporte terrestre y aéreo en todo el país).
3. **Reanudación:** El servicio se restablece únicamente **después de la salida de las estrellas del día festivo** (Motzaei Jag / Shabat), generalmente a partir de las 20:00 o 21:00 hs según la época del año.

🕒 **Días Intermedios (Jol HaMoed [חול המועד]):**
- Durante los días intermedios de Pésaj y Sucot, el transporte público **SÍ funciona**, pero suele operar con esquemas de horarios especiales o reducidos (frecuencia de día de vacaciones escolares). Planifica tus viajes con apps oficiales como Moovit o Rav-Kav Online.`;
  }

  // 16. Sistema Político y Elecciones (Knéset)
  if (
    q.includes('elecciones') ||
    q.includes('votar') ||
    q.includes('voto') ||
    q.includes('kneset') ||
    q.includes('knéset') ||
    q.includes('primer ministro') ||
    q.includes('coalicion') ||
    q.includes('coalición') ||
    q.includes('partido') ||
    q.includes('es obligatorio votar')
  ) {
    return `🗳️ **Sistema Político y Elecciones en Israel (Knéset):**

1. **¿El voto es obligatorio?:**
   - **No.** El sufragio en Israel es **optativo y secreto**. Tienen derecho a votar todos los ciudadanos israelíes mayores de 18 años inscriptos en el padrón electoral (**Pinkas Bojarim** [פנקס בוחרים]). Además, el día de las elecciones nacionales es considerado feriado no laborable (Iom Shabaton).

2. **Sistema Parlamentario Unicameral:**
   - No se vota de forma directa por una persona o candidato a Primer Ministro.
   - Se vota a una **lista cerrada de un partido político** que compite por los **120 escaños de la Knéset** [כנסת] (el parlamento unicameral de Israel).

3. **Formación de Gobierno (La Regla de los 61 Escaños):**
   - Para gobernar, un líder debe construir una coalición mayoritaria que sume **al menos 61 de los 120 escaños**. El Presidente del Estado de Israel (**Nasí HaMediná**) encomienda la tarea al parlamentario con mayores respaldos de recomendación.`;
  }

  return `No cuento con la información oficial o confirmada sobre este trámite o comercio en particular. Para evitar darte un dato impreciso o desactualizado, te sugiero corroborarlo directamente con la entidad oficial correspondiente (Misrad HaAliyah, Bituaj Leumi, Misrad HaPnim, Kupot Jolim) o consultar con un coordinador oficial o grupos comunitarios (como OLEI — olei.org.il).

Si buscas información sobre:
- 🩺 **Salud y Médicos:** Evitar sobrecostos en **Miún** y **MADA**, o consultar la cartilla oficial de tu Kupá.
- 💼 **Bituaj Leumi y Trabajo:** Formulario **BL 250**, accidentes laborales y días de reposo (**Jok Dmei Majalá**).
- 📋 **Trámites de Absorción:** Sal Klitá (meses 1-6), ayuda de alquiler (meses 7-30), licencia de conducir, **Tofes 101**, vouchers de **Ulpán** y plan de negocio (**\*2994**).
- 🛒 **Productos Latinos:** Local referente "La Tienda" (Levanda 13), local en Allenby 37, calle Bialik en Ramat Gan y cadenas como Tiv Ta'am o Keshet Teamim.

Escríbeme el tema específico y te brindo los pasos y datos confirmados.`;
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
