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
Eres el Asistente Inteligente de "Olim Conectados", una plataforma creada para la comunidad de nuevos inmigrantes (olim jadashim) hispanohablantes en Israel.
Tu propósito es guiar al usuario a través del sistema de salud, trámites burocráticos, leyes laborales, vida cotidiana y comunidad, previniendo errores costosos ("trampas del sistema") mediante explicaciones claras, empáticas, prácticas y legalmente prudentes.

TONO Y ESTILO:
- Empático, directo, pragmático y protector, como un olé experimentado aconsejando a un recién llegado.
- Utiliza siempre los términos en hebreo en negrita y/o entre paréntesis (ej: **hafniá** [הפניה], **tofes yarok** [טופס ירוק], **rofé taasukatí** [רופא תעסוקתי], **miún** [מיון], **arnoná** [ארנונה], **teunát avodá** [תאונת עבודה], **bituaj leumi** [ביטוח לאומי], **dmei majalá** [דמי מחלה], **ishur majalá** [אישור מחלה], **tofes 101** [טופס 101], **nekudot zijui** [נקודות זיכוי], **rofé mishpajá** [רופא משפחה]).
- ADAPTACIÓN GEOGRÁFICA Y SENSIBILIDAD POR CIUDAD (REGLA CRÍTICA):
  * Si el usuario consulta por una ciudad específica (ej: Ramat Gan, Jerusalén, Haifa, Netanya, Ashdod, Beer Sheva, Rishon LeZion, Petaj Tikva, Ra'anana, Holon, Bat Yam, etc.), NUNCA RESPONDAS ASUMIENDO TEL AVIV COMO ÚNICA OPCIÓN.
  * Si pregunta por Yerba, comida o compras en una ciudad (ej. Ramat Gan): responde con las opciones en esa ciudad (supermercados Tiv Taam en calle Jabotinsky y Kenion Ayalon, tiendas de productos naturales "Teva" o especias en calle Bialik, delivery en 30 minutos por Wolt a esa localidad). Si el comercio emblemático tradicional queda en otra ciudad vecina (ej. calle Allenby en Tel Aviv), indícale la distancia, medios de transporte público para llegar y aclara que tiene alternativas directas sin salir de su ciudad.
  * Aplica esta misma sensibilidad geográfica para médicos, clínicas, descuentos de Arnoná de la Iriyá local y trámites públicos.
- Estructura obligatoria de respuesta para consultas de trámites o salud:
  1. ⚠️ **Alerta o Advertencia Inicial**: Si hay riesgo de gasto económico (facturas de cientos de shékels en Miún/MADA), plazos fatales o rechazo de Bituaj Leumi.
  2. 📋 **Guía Paso a Paso**: Ordenada cronológicamente con instrucciones directas.
  3. 📑 **Términos en Hebreo y Documentos Requeridos**: Qué formulario o frase exacta pedir o revisar.
  4. ⚖️ **Descargo Legal Práctico**: Recordar brevemente que la orientación busca prevenir errores comunes y no sustituye el dictamen legal vinculante de las autoridades ni la consulta médica directa.

CONOCIMIENTO OBLIGATORIO Y REGLAS FUNDAMENTALES:
1. Directorio Médico y Reseñas:
   - Médicos que hablan español en Maccabi, Clalit, Meuhedet y Leumit.
   - Reseñas con estrellas (1 a 5) basadas en hechos comprobables: nivel real de español (nativo vs básico), tiempo real de escucha/contención vs consultas apresuradas, y criterio clínico (si busca alternativas y estudios previos o indica cirugías drásticas a la primera consulta por tendinitis).
   - Filtro Lashon Hará: No tolerar difamaciones ni insultos personales ("estafador", "inútil", "pelotudo"), sino transformarlos en descripciones objetivas sobre tiempos de espera, claridad y alternativas.

2. Urgencias, Hospitales (Miún) y Ambulancias (MADA):
   - ¡Alerta económica de Guardia (Miún)!: El hospital NO es gratis para consultas espontáneas. Ir sin derivación (**hafniá**) genera una factura elevada (**heshbonit** de cientos de shékels) que la Kupá no cubre automáticamente.
   - Ambulancias (MADA): MADA emite factura. Solo queda exenta o reembolsada al 100% si el paciente queda efectivamente internado o si cumple criterios estrictos de urgencia vital tipificados por la Kupá.
   - Ruta escalonada para no pagar de más:
     1) Médico de cabecera (**Rofé Mishpajá**) o telemedicina de la Kupá.
     2) Centro de urgencia nocturna / fin de semana (**Terem** o **Bikur Rofé**) para obtener **hafniá** si la Kupá está cerrada.
     3) **Miún** (Hospital) solo con **hafniá**, internación directa, fractura evidente o riesgo inminente de vida.

3. Accidentes Laborales, Tendinitis y Bituaj Leumi:
   - Lesiones por esfuerzo repetitivo (tendinitis de Quervain, túnel carpiano) o accidentes en el trabajo / trayecto:
     * Paso 1: Notificar de inmediato al empleador y pedir el formulario **BL 250** (**Dmei Pgiá**).
     * Paso 2 (Clave médica): En la primera consulta con el médico de la Kupá o guardia, exigir que escriba expresamente en el informe clínico (**sijum majalí**) que el dolor se produjo "trabajando" o por tareas laborales ("be-avodá"). Si no figura desde el inicio, Bituaj Leumi rechaza el reclamo.
     * Paso 3 (**Rofé Taasukatí**): Es indispensable turno con el Médico Ocupacional (**Rofé Taasukatí**) para el dictamen oficial de incapacidad laboral.

4. Días de Enfermedad (Jok Dmei Majalá):
   - Escala legal de pago:
     * Día 1 de ausencia: 0% (no se paga por ley).
     * Días 2 y 3: Se pagan al 50% del valor del día.
     * Día 4 en adelante: Se paga al 100% del valor del día.
   - Acumulación (**Tsvirat Yeméi Majalá**): 1.5 días por mes trabajado (tope 90 días).
   - ¡Alerta por falta de días acumulados!: La escala anterior SOLO aplica si hay saldo acumulado en el recibo de sueldo (**tlush sajar**). Si se agotan los días acumulados y no es accidente de trabajo por Bituaj Leumi, los días faltados NO se pagan (ausencia no remunerada).
   - El certificado médico (**Ishur Majalá**) es obligatorio para justificar legalmente la falta ante el empleador, pero no altera los porcentajes legales.

5. Empleo, Impuestos y Tofes 101:
   - Marcar explícitamente la casilla de **Olé Jadash** en el **Tofes 101** al ingresar al trabajo o en enero de cada año para obtener los puntos de crédito fiscal (**Nekudot Zijui**). Si no se marca, habrá retenciones indebidas de impuesto a las ganancias (**Mas Hajnasá**) en el **tlush sajar**.

6. Licencia de Conducir (Misrad HaRishuí):
   - Vigencia: Se puede manejar con licencia extranjera solo durante los primeros 12 meses (1 año) desde la aliá. El derecho de canje para olim dura 5 años.
   - Caso 1: Licencia extranjera VIGENTE + más de 5 años de antigüedad previa a la aliá: Conversión directa (**Hamarat Rishayón**) sin examen teórico ni práctico. Pasos: **Tofes Yarok** online + examen de vista (**bedikat einaim**) en óptica autorizada + turno en Misrad HaRishuí.
   - Caso 2: Licencia extranjera VENCIDA: No califica para conversión automática simple con el plástico vencido. Solución: Presentar Certificado de Legalidad / Historial de Conductor de su país de origen (que certifique años ininterrumpidos previos a la aliá) o rendir prueba práctica de control (**Mivján Shlitá**).

7. Citas Oficiales (MyVisit):
   - Turnos previos para Misrad HaPnim (Teudat Zehut/pasaportes) y Misrad HaRishuí.
   - Consejo práctico: Revisar temprano por la mañana (7:00 a 8:30 AM) para capturar turnos cancelados del mismo día.

8. Ulpán Estatal y Vouchers para Ulpán Privado:
   - Ulpán inicial subvencionado en Mercaz Klitá o municipal.
   - Voucher para Ulpán Privado (Misrad HaAliyah): Arancel aprox 5.200 NIS. El estudiante paga y luego pide reintegro.
   - ¡Condición estricta!: No es a fondo perdido. Requisito indispensable: tener 80%+ de asistencia y aprobar el examen final. Si abandona, pierde el dinero adelantado.

9. Descuento de Arnoná y Apoyo de OLEI / Misrad HaAliyah:
   - Descuento de **Arnoná** para Olim en la municipalidad local (**Iriyá**) en el primer año.
   - **OLEI**: Apoyo presencial voluntario para banco y carné de Kupat Jolim.
   - Proyectistas de Misrad HaAliyah: Asesoramiento personalizado (muchas sedes como Tel Aviv atienden en español).

10. Comunidad, Comercios Latinos y Emprendimientos de Olim Jadashim:
   - **Emprendimientos de Olim (Vitales para la integración y apoyo mutuo):**
     * Muchos olim inician cocinando desde sus hogares sin local a la calle (empanadas caseras de carne cortada a cuchillo, masa hojaldrada, tartas, alfajores marplatenses y medialunas por encargo de WhatsApp con 24-48 hs de anticipación) o abren cafeterías temáticas.
     * **Amapola Café & Pastelería:** En calle **Ibn Gvirol 54**, Tel Aviv. Punto de encuentro emblemático de olim para sentarse a tomar café con leche, comer medialunas de manteca calientes, facturas con crema pastelera o dulce de leche, vigilantes, alfajores de maicena caseros y tortas (chocotorta, rogel).
     * **Empanadas artesanales sin local (por encargo / WhatsApp):** Emprendimientos como *"Las Criollas de Sofi & Fede"* (Gush Dan / Ramat Gan / Tel Aviv - empanadas cortadas a cuchillo y selladas a mano), *"La Fábrica del Alfajor"* (Netanya y Sharon - cajas de medialunas y alfajores) y *"El Horno del Olé"* (Jerusalén - empanadas y sándwiches de miga kosher).
     * Locales emblemáticos con atención al público: calle Allenby 94 en Tel Aviv (yerbas, alfajores, tapas), carnicerías con cortes latinos ("La Pampa" en Holon, "El Gaucho del Sur" en Beer Sheva).
   - Canales y grupos de Facebook/WhatsApp clasificados (empleo, alquileres, ciudades).

11. Sal Klitá y Subsidio de Alquiler (Plazos Exactos):
   - Sal Klitá: La canasta básica de absorción de Misrad HaAliyah se abona durante los primeros 6 meses (un pago inicial en el aeropuerto o cuenta bancaria y 5 cuotas mensuales consecutivas).
   - Ayuda de Alquiler (**Siyua bi'Sjirot** [סיוע בשכר דירה]): Comienza automáticamente en el **mes 7 de aliá** y dura exactamente hasta el **mes 30** (24 meses de cobertura total). Se corta de forma definitiva al finalizar el mes 30. Si el usuario consulta por qué dejó de cobrar en ese plazo, recordarle que ese es el motivo de corte legal reglamentario.

12. Pluriempleo y Retención Impositiva (Teum Mas):
   - Si el usuario tiene dos o más empleos simultáneos:
     * Alerta fiscal: Si no realiza el trámite, el segundo empleador está obligado por ley a retener la alícuota máxima de impuesto a las ganancias (**Mas Hajnasá** [מס הכנסה], aproximadamente **47%**).
     * Trámite obligatorio: Realizar la coordinación fiscal (**Teum Mas** [תיאום מס]) de manera digital a través del portal de **Rashut HaMisim** [רשות המסים], ingresando los números de deducción patronal (**Tik Nikuyim** [תיק ניכויים]) de ambos empleadores para equilibrar las retenciones.

13. Protocolo Laboral en Estado de Guerra (Pikud HaOref):
   - Directivas de seguridad: Rigen las instrucciones del Comando del Frente Interno (**Pikud HaOref** [פיקוד העורף]). Si se prohíbe la actividad presencial por falta de refugio (**mamad** [ממ"ד] o **miklat** [מקלט]) o por estar en zona de combate declarada, **está terminantemente prohibido por ley despedir al empleado** por no concurrir a su puesto.
   - Salarios y vacaciones en conflicto prolongado:
     * El empleador **NO puede descontar días de vacaciones de forma arbitraria** si el empleado no tiene saldo positivo acumulado en su haber.
     * En emergencias prolongadas, el Estado activa esquemas de compensación económica mediante acuerdos colectivos con **Bituaj Leumi** para reembolsar salarios a empresas paralizadas y proteger los ingresos de los empleados en áreas declaradas de emergencia (**Matzav Meiyujad** [מצב מיוחד בעורף]).

14. Pasaporte Israelí (Darkón) vs. Teudat Ma'avar:
   - Regla del primer año: Como norma general, el olé jadash debe cumplir **un año (12 meses)** de residencia y centro de vida efectivo en el país para tramitar el pasaporte regular (**Darkón** [דרכון]).
   - Documento provisorio (**Teudat Ma'avar** [תעודת מעבר]): Es el documento de viaje oficial emitido antes del año si el olé necesita viajar al exterior.
   - **Advertencia crítica de visados:** La Teudat Ma'avar **NO cuenta con los mismos convenios bilaterales de exención de visado** que el Darkón regular; el usuario debe verificar siempre con la embajada o consulado del país de destino si le exigen visa para ingresar con este documento.

15. Transporte Público en Jagim (Fiestas) y Shabat:
   - Regla de servicio: En las vísperas y días de festividades solemnes (*Rosh Hashaná, Iom Kipur, Pésaj, Shavuot, Sucot*), el transporte público interurbano (trenes de Israel Railways y líneas de colectivos) **cesa sus actividades antes del anochecer y se reanuda tras la salida de las estrellas del día siguiente**, operando con el mismo esquema restrictivo de Shabat.
   - En días intermedios (**Jol HaMoed** [חול המועד]), los servicios operan con esquemas de horario reducido o especiales.

16. Sistema Electoral y Político (Knéset):
   - El sufragio en Israel es **optativo (no obligatorio)**.
   - Sistema de democracia parlamentaria: Se vota a listas partidarias para los 120 escaños de la **Knéset** [כנסת], no directamente a una persona como Primer Ministro. El gobierno se conforma mediante coaliciones que sumen al menos **61 bancas**.
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

// Chatbot endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages, userQuery } = req.body;

  const currentQuery = userQuery || (messages && messages.length > 0 ? messages[messages.length - 1].content : '');

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
          if (!m.content || typeof m.content !== 'string') continue;
          const role = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';

          // In Gemini API, the first turn in contents MUST be 'user'
          if (formattedContents.length === 0 && role === 'model') {
            continue;
          }

          // If the last added message has the same role, combine them to maintain strict alternation
          if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === role) {
            formattedContents[formattedContents.length - 1].parts[0].text += `\n${m.content}`;
          } else {
            formattedContents.push({
              role,
              parts: [{ text: m.content }],
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
      // List of valid models from gemini-api skill, prioritizing available quota
      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.3,
            },
          });
          replyText = response.text || null;
          if (replyText) {
            break;
          }
        } catch (apiErr: any) {
          console.warn(`Model ${modelName} error (${apiErr?.status || 'status'}):`, apiErr?.message?.slice(0, 100) || apiErr);
        }
      }

      if (replyText) {
        res.json({ text: replyText });
        return;
      }
    } catch (error) {
      console.error('Error in Gemini generateContent:', error);
      // Fallback to knowledge-guided answer
    }
  }

  // Rule-based fallback if Gemini API is temporarily offline or quota reached
  // Pass both the current query AND the conversation history so context is never lost
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
    (q.includes('bialik') || q.includes('descuento') || q.includes('argentino') || q.includes('es así') || q.includes('precio')) &&
    (q.includes('ramat gan') || previousContext.includes('ramat gan') || previousContext.includes('bialik'))
  ) {
    return `🧉 **Sobre compras y descuentos en Calle Bialik (Ramat Gan):**

1. **¿Existe un "descuento oficial para argentinos"?:**
   - **No existe un descuento formal por nacionalidad o pasaporte.** En Israel los comercios no aplican legalmente descuentos por origen nacional.
   - **Lo que sí ocurre:** Varias de las tiendas naturistas (**"Teva"**) y de especias de calle Bialik o cercanías son atendidas por personal que conoce a la comunidad latina y compra yerba en cantidad. Si compras por bulto o eres cliente regular, muchas veces redondean el precio o te avisan de ofertas de stock fresco.

2. **Consejo de ahorro real para Olim:**
   - Si compras paquete individual en tiendas físicas, el valor suele rondar los 35 - 45 NIS.
   - Para pagar el mejor precio por kilo (22 - 28 NIS por paquete), conviene comprar **packs de 5 o 10 paquetes** en sitios especializados como *Mate Israel* o en grupos comunitarios de WhatsApp de Olim donde se organizan pedidos conjuntos directo de importador.

3. **Alternativa inmediata en Ramat Gan:**
   - La sucursal de **Tiv Ta'am** en zona Jabotinsky / Kenion Ayalon suele tener promociones de 2x1 o descuentos con tarjeta del club (*Mo'adon*) en infusiones y tés internacionales.`;
  }

  // Follow-up for general discount / card / coupons
  if (q.includes('descuento') && (previousContext.includes('yerba') || previousContext.includes('local') || previousContext.includes('amapola'))) {
    return `🏷️ **Descuentos y Beneficios para Olim:**
- En comercios privados (cafeterías, tiendas de yerba o carnicerías), los descuentos son acuerdos de fidelidad o promociones temporales anunciadas en sus redes sociales.
- En supermercados grandes (como Tiv Ta'am, Shufersal o Victory), afiliarse al club de clientes (**Mo'adon Lakojot**) es gratuito y da descuentos inmediatos en góndola.
- Recuerda además revisar los descuentos públicos por ley: el **descuento de Arnoná** (hasta 70-90% el primer año en tu municipalidad) y tus puntos de crédito impositivo (**Nekudot Zijui**) en el **Tofes 101**.`;
  }

  // PETAJ TIKVA
  if (q.includes('petaj tikva') || q.includes('petaj tikvá') || q.includes('petah tikva')) {
    return `🧉 **Opciones para comprar Yerba Mate y productos latinos en Petaj Tikva:**

Si vives en **Petaj Tikva**, no necesitas viajar a Tel Aviv para conseguir yerba mate:

1. **Supermercados Tiv Ta'am en Petaj Tikva:**
   - 🛒 **Sucursal:** Gran sucursal en **Zona Industrial Segula** (calle HaYarkon / Ben Tzion Galis).
   - *Qué tienen:* Góndola de importación con yerbas (*Taragüí, Amanda, Cruz de Malta*), dulce de leche y galletitas. Abierto también en Shabat.
2. **Shuk Municipal de Petaj Tikva (Shuk HaIroní):**
   - En las tiendas tradicionales de especias y frutos secos del Shuk encuentras yerba mate por kilo o empaquetada. Pídela como **"Te Mate" (תה מאטה)** o **"Yerba Mate" (ירבה מאטה)**.
3. **Dietéticas "Teva" en el centro de Petaj Tikva:**
   - Tiendas en calle HaHaganá y alrededores de Kikar HaMeyasdim.
4. **Delivery a domicilio en Petaj Tikva:**
   - Mediante la app **Wolt**, puedes pedir yerba directa de tiendas gourmet y pitzutziot de la zona con entrega en 35 minutos.
5. **Cercanía con el Tren Ligero (Dankal Línea Roja):**
   - Desde las estaciones de Petaj Tikva (Beilinson, CBS Petaj Tikva) llegas directamente y sin trasbordos a Tel Aviv en 25 minutos.`;
  }

  // RISHON LEZION / HOLON / BAT YAM
  if (q.includes('rishon') || q.includes('holon') || q.includes('bat yam')) {
    return `🥩 **Opciones en Rishon LeZion, Holon y Bat Yam:**

1. **Carnicería "Cortes Criollos La Pampa" (Holon):**
   - 📍 **Dirección:** Calle **HaSatat 8**, Zona Industrial Holon.
   - 🥩 **Especialidad:** Desposte argentino auténtico de vacío entero, asado de tira cortado fino con sierra, entraña limpia y matambre para arrollar. Además tienen yerbas, alfajores y dulce de leche.
2. **Tiv Ta'am en Rishon LeZion:**
   - 🛒 Megatienda en **Rishon LeZion West** (zona del cine Cinema City) y en **Rishon Este**.
3. **Tiendas rusas y de especias en Bat Yam:**
   - En calle Balfour y Ben Gurion hay tiendas que venden yerbas importadas para la comunidad.`;
  }

  // Community, Latin stores, Yerba, Meat cuts & Olim Entrepreneurships
  if (
    q.includes('yerba') ||
    q.includes('allenby') ||
    q.includes('dulce de leche') ||
    q.includes('alfajor') ||
    q.includes('amapola') ||
    q.includes('cafe') ||
    q.includes('café') ||
    q.includes('factura') ||
    q.includes('medialuna') ||
    q.includes('carniceria') ||
    q.includes('carnicería') ||
    q.includes('vacio') ||
    q.includes('vacío') ||
    q.includes('asado') ||
    q.includes('entraña') ||
    q.includes('matambre') ||
    q.includes('comida') ||
    q.includes('comercio') ||
    q.includes('tienda') ||
    q.includes('local') ||
    q.includes('empanada') ||
    q.includes('emprendimiento') ||
    q.includes('emprendedor')
  ) {
    // Si pregunta puntualmente por café, medialunas, facturas o Amapola
    if (q.includes('amapola') || q.includes('cafe') || q.includes('café') || q.includes('factura') || q.includes('medialuna') || q.includes('merienda')) {
      return `☕ **Amapola Café & Emprendimientos para Merendar y Facturas:**

1. **Amapola Café & Pastelería (Tel Aviv):**
   - 📍 **Ubicación Exacta:** Calle **Ibn Gvirol 54**, Tel Aviv (frente a la zona de Rabin Square / Kikar Rabin).
   - 🥐 **La Experiencia:** Fundado por olim argentinos, es el punto de encuentro por excelencia de la comunidad para sentarse a tomar un buen café con leche en barra o mesa, comer **medialunas de manteca recién salidas del horno**, facturas con crema pastelera o dulce de leche, vigilantes, cañoncitos y alfajores de maicena caseros con coco.
   - 🍰 **Tortas:** Chocotorta, Rogel y Lemon Pie caseros.
   - 🕒 **Horarios:** Domingo a Jueves de 07:30 a 19:30 / Viernes hasta las 15:00.

2. **Emprendimientos de Facturas y Alfajores sin Local (Por Encargo):**
   - 📦 **"La Fábrica del Alfajor & Medialunas":** Olim en Netanya y Sharon que preparan cajas de 12 o 24 medialunas de manteca artesanales y alfajores estilo marplatense para el fin de semana. Pedidos por WhatsApp (058-7654321).

💡 *Consejo:* En la pestaña **"Comunidad & Locales"** puedes filtrar por *"Panadería, Café y Facturas"* o *"Emprendimientos de Olim"* para ver los enlaces directos a WhatsApp, Instagram y ubicación en mapa.`;
    }

    // Si pregunta por empanadas caseras o emprendimientos sin local
    if ((q.includes('empanada') || q.includes('emprendimiento')) && (q.includes('sin local') || q.includes('casera') || q.includes('encargo') || q.includes('whatsapp') || q.includes('sofi') || q.includes('domicilio'))) {
      return `🥟 **Emprendimientos de Olim Jadashim: Empanadas Caseras y Comida sin Local (Por Encargo):**

Apoyar a los nuevos inmigrantes que cocinan desde sus casas es una de las tradiciones más lindas y solidarias de nuestra comunidad:

1. **"Las Criollas de Sofi & Fede" (Gush Dan: Tel Aviv, Ramat Gan, Givatayim):**
   - 👩‍🍳 **Quiénes son:** Pareja de olim de Córdoba y Buenos Aires.
   - 🥟 **Especialidades:** Empanadas auténticas de carne cortada a cuchillo (suave y picante), vacío al malbec, pollo al verdeo y 4 quesos. Selladas a mano y con masa hojaldrada.
   - 📲 **Cómo pedir:** No tienen local a la calle. Se piden con 24 a 48 hs de antelación por WhatsApp (**054-9812450**) listas para hornear o congeladas para stock.
   - 🛵 **Entregas:** Puntos de encuentro en Tel Aviv/Ramat Gan o envíos a domicilio.

2. **"El Horno del Olé" (Jerusalén):**
   - 🥟 **Quiénes son:** Emprendimiento de olim recientes en Beit HaKerem con supervisión Kosher comunitaria.
   - 📦 **Qué hacen:** Empanadas clásicas, sándwiches de miga triples para cumpleaños o eventos y packs congelados para estudiantes. Pedidos por WhatsApp (**052-8877112**).

3. **"Buenos Aires Bakery" (Ra'anana / Sharon):**
   - 📍 Local físico en Klausner 2 (Ra'anana) con delivery de empanadas horneadas y milanesas preparadas.

💡 Consulta todos los contactos en la pestaña **"Comunidad & Locales"** filtrando por *"Emprendimientos de Olim"*.`;
    }
    // RAMAT GAN & GUSH DAN NORTE
    if (q.includes('ramat gan') || q.includes('ramat-gan') || q.includes('givatayim') || q.includes('bnei brak')) {
      return `🧉 **Opciones para comprar Yerba Mate y productos latinos en Ramat Gan y alrededores:**

Si vives en **Ramat Gan** o **Givatayim**, no necesitas viajar necesariamente al centro de Tel Aviv:

1. **Supermercados Tiv Ta'am (טיב טעם) en Ramat Gan:**
   - 🛒 **Sucursal céntrica:** Zona Jabotinsky / Bialik.
   - 🛒 **Sucursal Kenion Ayalon:** En el centro comercial Ayalon (en el límite Ramat Gan / Bnei Brak).
   - *Qué tienen:* Góndola de importados y sección de té con marcas comunes como *Taragüí, Cruz de Malta, Amanda* y a veces *Playadito*. Abren también en Shabat.

2. **Dietéticas y Tiendas Naturistas ("Teva" - טבע) en Calle Bialik:**
   - En la arteria comercial de **calle Bialik** (Ramat Gan) hay varias tiendas naturistas y de especias (*Tavlinim* / *Anise* / *Teva Castel*) que comercializan yerba mate como infusión digestiva natural. Pídela como **"Yerba Mate" (ירבה מאטה)** o **"Te Mate" (תה מאטה)**.

3. **Delivery Rápido en Ramat Gan con Wolt:**
   - Abre la app de **Wolt** y escribe *"Yerba Mate"* o *"Tiv Taam"*: varios kioscos 24hs (*Pitzutziot*) y tiendas de delicatessen de la zona te la llevan a tu puerta en Ramat Gan en menos de 30-40 minutos.

4. **Si buscas marcas específicas rioplatenses (Canarias, Sara, Rosamonte Especial) o cortes criollos (Vacío, Asado de Tira):**
   - 📍 **Almacén Rioplatense Histórico:** Calle **Allenby 94**, Tel Aviv. Desde Ramat Gan llegas en 15-20 minutos mediante el Tren Ligero (Dankal Línea Roja) o colectivos directos (Líneas 66, 161, 240).
   - 🥩 **Carnicería La Pampa:** Calle HaSatat 8, Holon (desposte argentino auténtico de vacío, asado y entraña).`;
    }

    // JERUSALÉN
    if (q.includes('jerusalen') || q.includes('jerusalén') || q.includes('jerusalem')) {
      return `🧉 **Opciones para comprar Yerba Mate y productos latinos en Jerusalén:**

1. **Shuk Majané Yehuda (שוק מחנה יהודה):**
   - En los puestos tradicionales de té, especias y frutos secos (calle Eitz Jaim y calle HaTapuaj) venden yerba mate empaquetada o a granel.
2. **Supermercados Tiv Ta'am en Jerusalén:**
   - Sucursal en la zona comercial de **Talpiot** (Derej Beit Lejem / HaUman). Sección internacional con yerbas y dulces importados.
3. **Dietéticas ("Batei Teva"):**
   - Tiendas naturistas en el centro de Jerusalén (calle Jaffa y King George).
4. **Grupos de la Comunidad:**
   - En Jerusalén hay un grupo muy activo de WhatsApp de Olim Latinos donde suelen organizar compras comunitarias directas de yerba y alfajores.`;
    }

    // HAIFA Y EL NORTE
    if (q.includes('haifa') || q.includes('krayot') || q.includes('akko') || q.includes('nahariya')) {
      return `🧉 **Opciones en Haifa y el Norte:**

1. **Tiv Ta'am en Haifa:**
   - Sucursales en **Hutzot HaMifratz** y en el centro comercial de **Grand Canyon Haifa**. Gran variedad de productos de importación abiertos los 7 días de la semana.
2. **Shuk Talpiot (Hadar, Haifa):**
   - Tiendas rusas y de especias en barrio Hadar suelen tener yerba mate argentina y uruguaya.
3. **Comunidad Latina de Haifa:**
   - Revisa la pestaña *"Comunidad"* en nuestra plataforma para unirte al grupo de Facebook de *Latinos en Haifa*, donde avisan de ferias gastronómicas y ventas de empanadas y yerba.`;
    }

    // NETANYA Y SHARON
    if (q.includes('netanya') || q.includes('netania') || q.includes('raanana') || q.includes('kfar saba') || q.includes('herzliya')) {
      return `🧉 **Opciones en Netanya y la zona del Sharon:**

1. **Buenos Aires Bakery (Ra'anana):**
   - Calle Klausner 2, Ra'anana. Tienen empanadas artesanales, yerba mate, alfajores y facturas con dulce de leche.
2. **Tiv Ta'am en Netanya:**
   - Sucursales en la Zona Industrial y Poleg.
3. **Puestos céntricos en Netanya:**
   - Alrededores de Kikar HaAtzmaut y calle Herzl cuentan con dietéticas que traen yerba mate para la gran colectividad sudamericana de la ciudad.`;
    }

    // BEER SHEVA Y EL SUR
    if (q.includes('beer sheva') || q.includes('beersheva') || q.includes('ashkelon') || q.includes('ashdod')) {
      return `🥩 **Opciones en Beer Sheva, Ashdod y el Sur:**

1. **Carnicería y Asador "El Gaucho del Sur" (Beer Sheva):**
   - Calle Derej HeJevron 48, Beer Sheva. Cortes criollos para asado (vacío, tira, matambre) y productos rioplatenses.
2. **Tiv Ta'am en Beer Sheva (One Plaza / Big) y Ashdod (Star Center):**
   - Cuentan con góndola de importación con yerbas y dulces.
3. **Shuk Municipal de Beer Sheva y Ashdod:**
   - Dietéticas y puestos de frutos secos con yerba mate en paquete.`;
    }

    // TEL AVIV GENERAL
    return `🏪 **Locales Latinos y Rioplatenses Emblemáticos en Israel:**

Si buscas yerba mate, dulce de leche, tapas de empanadas o carnes con cortes latinos en Tel Aviv y alrededores:

1. **Almacén Rioplatense Histórico de Calle Allenby (Tel Aviv):**
   - 📍 **Dirección:** Calle **Allenby 94**, Tel Aviv (frente al histórico Pasaje).
   - 🧉 **Qué venden:** Gran variedad de yerba mate (*Playadito, Taragüi, Canarias, Sara, Rosamonte, Mañanita*), dulce de leche colonial y repostero, alfajores (*Havanna, Guaymallén, Capitán del Espacio, Cachafaz*), tapas de empanadas criollas y hojaldradas, mates de calabaza y bombillas.
   - 🕒 **Horarios:** Domingo a Jueves de 09:30 a 19:30 / Viernes hasta las 14:30.

2. **Carnicerías con Cortes Latinos (Vacío, Asado de Tira, Entraña):**
   - 🥩 **"Cortes Criollos La Pampa" (Holon / Tel Aviv):** Calle HaSatat 8, Holon (a 10 minutos de Tel Aviv). Desposte y corte tradicional de vacío entero, asado de tira cortado fino con sierra, entraña limpia y matambre para arrollar.
   - 🥩 **Puestos en Shuk HaCarmel (Tel Aviv):** Entrada por Simtat HaCarmel. Encuentras productos de Colombia, Perú, México y Argentina (Harina P.A.N., frijoles, plátanos y yerbas).

💡 *Consejo:* En la pestaña **"Comunidad & Locales"** de esta plataforma tienes las direcciones exactas, teléfonos y enlaces a los grupos de WhatsApp y Facebook de Olim donde se avisan ofertas y stock semanal.`;
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
    if (q.includes('jerusalen') || q.includes('jerusalén') || q.includes('jerusalem')) {
      return `🩺 **Médicos que hablan español en Jerusalén:**
- **Dr. Daniel Zylbersztejn (Pediatría - Rofé Yeladim):**
  * Kupot: Clalit y Meuhedet.
  * Ubicación: Kanfei Nesharim 22, Givat Shaul, Jerusalén. Tel: 02-6598811.
  * Nivel de español: Fluido. Excelente contención a familias de nuevos inmigrantes.

💡 *Consejo:* Puedes consultar la pestaña **"Médicos en Español"** de esta plataforma y filtrar por la ciudad de **Jerusalén** para ver horarios, teléfono directo y reseñas factuales verificadas.`;
    }
    if (q.includes('netanya') || q.includes('netania')) {
      return `🩺 **Profesionales que hablan español en Netanya y Sharon:**
- **Lic. Claudia Finkelstein (Psicología Clínica y Adaptación de Olim):**
  * Kupot: Maccabi, Meuhedet y Privado.
  * Ubicación: Herzl 45, Piso 3, Netanya. Tel: 09-8621144.
  * Nivel de español: Nativo. Atención de duelo migratorio y adaptación cultural.
- **Dra. Verónica Goldman (Ginecología y Obstetricia en Ra'anana / Sharon):**
  * Kupot: Maccabi y Clalit.
  * Ubicación: Ahuza 120, Ra'anana. Tel: 09-7745500. Nivel Nativo.

💡 *Consejo:* En la pestaña **"Médicos en Español"** puedes filtrar por Netanya o Sharon y acceder a las reseñas verificadas.`;
    }
    if (q.includes('haifa') || q.includes('krayot')) {
      return `🩺 **Médicos que hablan español en Haifa y el Norte:**
- **Dr. Marcos Lifschitz (Medicina Ocupacional y Laboral - Rofé Taasukatí):**
  * Kupot: Clalit, Leumit, Maccabi.
  * Ubicación: HeJalutz 12, Hadar, Haifa. Tel: 04-8673322.
  * Nivel de español: Fluido. Clave para emitir dictámenes de capacidad laboral para Bituaj Leumi.

💡 Revisa la pestaña **"Médicos en Español"** para filtrar todos los profesionales del Norte.`;
    }
    if (q.includes('ramat gan') || q.includes('ramat-gan') || q.includes('tel aviv') || q.includes('tlv')) {
      return `🩺 **Médicos que hablan español en Ramat Gan y Tel Aviv:**
- **Dr. Alejandro Berman (Médico de Familia - Rofé Mishpajá):**
  * Kupot: Maccabi y Privado.
  * Ubicación: Dizengoff 101, Piso 2, Tel Aviv (Snif Maccabi). Tel: 03-5248900.
  * Nivel de español: Nativo. Destacado por su tiempo de escucha (20 min) y emisión de hafniot sin demoras.
- **Dra. Gabriela Schvartzman (Traumatología y Ortopedia):**
  * Kupot: Maccabi y Clalit.
  * Ubicación: Jabotinsky 33, Merkaz Refuati, Ramat Gan / Tel Aviv. Tel: 03-6112200.
  * Nivel de español: Nativo. Enfoque conservador antes de indicar cirugías por tendinitis.

💡 Revisa la pestaña **"Médicos en Español"** para ver todas las especialidades y filtrar por tu Kupá.`;
    }
    return `🩺 **Directorio de Médicos que Hablan Español:**
En nuestra plataforma contamos con un directorio calificado en base a hechos objetivos (nivel real de español, tiempo de escucha y si evalúan tratamientos conservadores antes de cirugías invasivas):
- **Médicos de Familia:** Tel Aviv (Dr. Berman), Ashdod (Dr. Wainstein).
- **Traumatología y Miembro Superior:** Ramat Gan (Dra. Schvartzman), Beer Sheva (Dr. Alaluf).
- **Pediatría:** Jerusalén (Dr. Zylbersztejn).
- **Medicina Ocupacional (Rofé Taasukatí):** Haifa (Dr. Lifschitz).
- **Ginecología:** Ra'anana / Sharon (Dra. Goldman).
- **Psicología Clínica:** Netanya (Lic. Finkelstein).

Ve a la pestaña **"Médicos en Español"** en el menú superior para filtrar por tu ciudad y tu Kupá (Maccabi, Clalit, Meuhedet, Leumit).`;
  }

  if (q.includes('hospital') || q.includes('miun') || q.includes('urgencia') || q.includes('guardia') || q.includes('maccabi') || q.includes('clalit') || q.includes('mada') || q.includes('ambulancia')) {
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

  if (q.includes('arnona') || q.includes('arnoná') || q.includes('olei') || q.includes('iriye') || q.includes('iriyá') || q.includes('municipalidad') || q.includes('alquiler') || q.includes('banco')) {
    return `🏠 **Descuento de Arnoná y Apoyo Comunitario:**

1. **Descuento de Arnoná (Impuesto a la Vivienda):**
   - Tienes derecho a un descuento de entre el 70% y 90% (según el municipio o **Iriyá** [עירייה]) durante 12 meses continuos en el primer período de Aliá.
   - **Requisitos:** Contrato de alquiler legal de al menos 1 año, Teudat Olé, Teudat Zehut con anexo de domicilio y la última boleta de Arnoná de la vivienda. Se tramita en la oficina de rentas municipal o en su web.

2. **Apoyo de OLEI y Asesores:**
   - **OLEI:** Voluntarios hispanohablantes te acompañan sin costo para abrir la cuenta bancaria sin comisiones abusivas y elegir tu **Kupat Jolim** (ej. Maccabi).
   - **Proyectistas de Misrad HaAliyah:** Puedes agendar consulta presencial en tu sede (en Tel Aviv atienden en español).`;
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

  return `¡Hola! Como asistente de **Olim Conectados**, estoy aquí para evitarte trámites costosos y guiarte en tu integración en Israel:

- 🩺 **Salud y Médicos en Español:** Directorio de profesionales en Maccabi, Clalit, Meuhedet y Leumit, y cómo evitar cobros de cientos de shékels en **Miún** o **MADA**.
- 💼 **Bituaj Leumi y Trabajo:** Lesiones laborales, tendinitis, formulario **BL 250** y turno con el **Rofé Taasukatí**.
- 🧮 **Días de Enfermedad:** Escala legal de cobro (**Jok Dmei Majalá**) y saldo acumulado.
- 🚗 **Licencia de Conducir:** Conversión con **Tofes Yarok** y qué hacer si tu carné está vencido.
- 📋 **Trámites:** **Tofes 101** y puntos de crédito (**Nekudot Zijui**), turnos en **MyVisit**, vouchers de **Ulpán** y descuento de **Arnoná**.
- 💰 **Crisis, Economía y Vida Civil:** Sal Klitá (meses 1-6) y subsidio de alquiler (meses 7-30), Pluriempleo y **Teum Mas** (retención del 47%), Protocolo laboral en guerra (**Pikud HaOref**), **Darkón vs Teudat Ma'avar**, transporte en **Jagim/Shabat** y sistema electoral (**Knéset**).
- 🏪 **Comunidad:** Locales emblemáticos con productos latinos (yerba, carnes con cortes latinos) y grupos útiles.

¿Sobre cuál de estos temas deseas una guía paso a paso?`;
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
