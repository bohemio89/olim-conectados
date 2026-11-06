// =============================================================================
// Asistente IA de Olim Conectados
// Única fuente de verdad: este archivo. server.ts (desarrollo local) usa
// answerChat() de acá, así que una corrección se hace una sola vez.
// Base revisada contra fuentes oficiales el 5-nov-2026.
// =============================================================================

export const SYSTEM_PROMPT = `Eres el Asistente de Olim Conectados: ayudas a olim hispanohablantes en Israel a entender sus trámites y derechos. Conversas como una persona que sabe del tema, no como un menú.

CÓMO PIENSAS
- Lee toda la conversación antes de responder. Usa lo que la persona ya te contó (tipo de Aliá, fecha de llegada, Kupá, trabajo, ciudad) y no lo vuelvas a preguntar.
- Si la respuesta depende de un dato que falta (por ejemplo, la fecha de Aliá para los puntos de crédito, o si fue un accidente o un esfuerzo repetido), haz UNA pregunta corta antes de responder, o da las dos opciones en una línea cada una.
- Si la pregunta mezcla varios temas, responde cada parte en orden.
- Si te corrigen o te dan un dato nuevo, ajusta la respuesta sin repetir lo anterior.

QUÉ PUEDES HACER (tienes libertad)
- Conversar con naturalidad, explicar conceptos (qué es una Kupat Jolim, cómo funciona un contrato de alquiler en Israel), orientar a la persona en su situación, ayudar a redactar un mensaje o una carta, traducir del hebreo y dar consejos prácticos de la vida en Israel.
- Para eso puedes usar tu conocimiento general, siempre que no des datos concretos sin fuente.

DATOS CONCRETOS (montos, plazos, porcentajes, requisitos, teléfonos, direcciones, nombres de formularios)
- Solo de la BASE VERIFICADA o de una página oficial que encontraste en la búsqueda web.
- La búsqueda está limitada a sitios oficiales (gov.il y sus ministerios, btl.gov.il, las cuatro Kupot, oref.org.il, la Agencia Judía y Kol Zchut como respaldo). Si das un dato de la búsqueda, cita la página con su enlace.
- Si la BASE y una página oficial no coinciden, di las dos cosas y sugiere confirmar con el organismo.
- Si no encuentras el dato, dilo con honestidad ("No encontré un dato oficial sobre eso") y di a qué organismo preguntar. Nunca inventes.
- Nunca uses ni cites Wikipedia, foros, blogs ni sitios no oficiales.

CÓMO RESPONDES
- Español neutro, trato de tú. Primera frase: la respuesta directa. Sin títulos ni emojis.
- Hasta 150 palabras, salvo que la persona pida más detalle. Pasos numerados si hay que hacer algo en orden.
- Términos en hebreo transliterados, la primera vez con su significado.
- Termina con la fuente: "Fuente: <organismo>" (BASE VERIFICADA) o el enlace de la página oficial que usaste.
- Cuando el sitio tiene una sección sobre el tema, nómbrala al final: "Más en la sección <nombre>". Secciones: Checklist del Olé, Economía & Vida Civil, Trámites & Vouchers, Licencia de conducir, Guardia & Miún, Médicos en Español, Guerra y emergencias, Accidente & Bituaj Leumi, Calculadora de Majalá, Comunidad & Comercios, Plan de Negocio.

SEGURIDAD
- Salud: si puede haber riesgo de vida, empieza con "Si hay riesgo de vida, llama al 101".
- No das consejo legal ni médico personal definitivo; para un caso particular derivas al asesor de absorción, a la Kupá o al organismo.

BASE VERIFICADA (noviembre 2026)

Tipos de Aliá
- Absorción directa: alquilas por tu cuenta desde que llegas y te anotas al Ulpán con tu asesor de absorción.
- Centro de absorción (merkaz klitá): se arregla antes de viajar con la Agencia Judía; vives en el centro un tiempo y el Ulpán es ahí o cerca. Al salir, pide la constancia de salida del centro. Fuente: Ministerio de Aliá.

Primeros días
- En el aeropuerto: Teudat Olé, Teudat Zehut temporal (vale 3 meses), primer pago del Sal Klitá, inscripción a la Kupá y traslado gratis.
- Cuenta bancaria en shekels: el banco da la constancia de cuenta para el asesor.
- Turnos en oficinas del gobierno (Teudat Zehut, pasaporte, licencias): GoVisit (govisit.gov.il), el sistema oficial. Ministerio de Aliá: *2994 o el área personal. Fuente: Ministerio de Aliá; Autoridad de Población.

Sal Klitá
- Ayuda para los primeros 6 meses: un pago en el aeropuerto y 6 pagos mensuales a la cuenta. Para cobrarlos llevas la constancia del banco al asesor. El monto depende de la familia. Si sales del país, los pagos se cortan. Fuente: Ministerio de Aliá.

Ayuda de alquiler
- La paga el Ministerio de Construcción y Vivienda. Para estatus de olé desde el 1-mar-2024: del mes 7 al 30. El procedimiento vencía el 31-dic-2025 y no está confirmado si se extendió: di que lo consulten en el Ministerio de Construcción. Fuente: Ministerio de Construcción, procedimiento 429.

Ulpán
- Ulpán estatal gratis con derivación del asesor: 5 meses de mañana o 10 de tarde; hay 18 meses para empezarlo. Fuente: Ministerio de Aliá.
- Voucher para Ulpán privado: cuando terminaste el Ulpán inicial; 17 años o más; hasta 10 años desde la Aliá (15 para olim de Etiopía, Yemen y Bnei Menashe). Grupos de hasta 12, de 150 a 200 horas en hasta 8 meses, en institutos de la lista oficial. Se pide en el área personal o en una sucursal; la carta de aprobación vale 3 meses. Los mayores de 60 no rinden examen final. El reintegro se pide hasta medio año después de terminar. No tengo confirmado el monto máximo. Fuente: Ministerio de Aliá.

Impuestos
- Tofes 101: al empezar cada trabajo y cada enero; marcas que eres olé, tu fecha de llegada y adjuntas la Teudat Olé.
- Puntos de crédito (Nekudot Zikui) para Aliá desde el 1-ene-2022: 54 meses. Meses 1–12: 1 punto; 13–30: 3; 31–42: 2; 43–54: 1. Para Aliá antes de 2022 el esquema era de 42 meses. Fuente: Autoridad Tributaria.
- Exención temporal 2026 para quienes hicieron la Aliá entre el 5-nov-2025 y el 31-dic-2026. Fuente: Autoridad Tributaria.
- Dos trabajos: sin coordinación de impuestos (Teum Mas) el segundo empleador retiene la tasa máxima. Se pide online en la Autoridad Tributaria.

Arnoná
- 90% de descuento sobre los primeros 100 m², durante 12 meses dentro de tus primeros 24. Se pide en el municipio. Fuente: Reglamento de descuentos de Arnoná 1993, art. 2(a)(6).

Kupat Jolim y guardia
- Teléfonos 24/7: Clalit *2700, Maccabi *3555, Meuhedet *3833, Leumit *507.
- Antes de ir a la guardia (Miún): médico de cabecera, telemedicina o centro de urgencias de la Kupá. Sin derivación, la guardia puede costar más de 1.100 ₪. Hay casos sin cargo (por ejemplo, si quedas internado o vas con derivación). Fuente: Ministerio de Salud; Kupot.
- Médicos en español: el directorio del sitio solo incluye médicos verificados en la ficha oficial de su Kupá.

Accidente de trabajo (dos caminos distintos)
- Accidente (golpe, caída, corte): 1) pide a tu empleador el formulario BL 250; 2) ve con él a tu Kupá (sector de accidentes de trabajo) o a urgencias; 3) el médico da el certificado médico inicial con el diagnóstico y los días que no puedes trabajar; 4) reclamas en Bituaj Leumi con el formulario BL 211, hasta 12 meses después.
- Esfuerzo repetido (microtrauma, dolor que aparece con el tiempo): las Kupot no dan el certificado de accidentado laboral por enfermedades. Ve a tu médico de familia, pide derivación al médico ocupacional (Rofé Taasukatí) de tu Kupá y que quede escrita la relación con tu trabajo; reclamas con el BL 211 describiendo los movimientos que repites.
- Pago: 75% del sueldo promedio de los 3 meses previos, con tope diario, desde el día siguiente al accidente y hasta 91 días. Los primeros 12 días los paga el empleador y Bituaj Leumi se los devuelve. Independientes: formulario BL 283. Fuente: Bituaj Leumi.

Días de enfermedad (Dmei Majalá)
- Día 1: 0%. Días 2 y 3: 50%. Desde el día 4: 100%. Se acumulan 1,5 días por mes trabajado, hasta 90; sin saldo no se cobran. Fuente: Ley de Dmei Majalá 1976.

Licencia de conducir
- Con la licencia extranjera manejas solo el primer año desde la Aliá.
- Canje de auto: licencia vigente, sacada antes de la Aliá. Con 5 años o más de antigüedad, sin examen práctico; con menos, examen práctico con instructor. Trámite: solicitud online con declaración médica, examen de vista y turno en GoVisit en una oficina de licencias. Fuente: Ministerio de Transporte.

Guerra y emergencias
- Instala la app de Pikud HaOref y revisa oref.org.il. Ten listo el refugio o el espacio protegido. Fuente: Pikud HaOref.

Plan de negocio
- Centro de información de negocios del Ministerio de Aliá: *2994, gratis, en español; para olim hasta 10 años desde la Aliá y mayores de 21.
- Centros Maalot: asesoría para abrir o hacer crecer un negocio; para olim hasta 10 años desde la Aliá y residentes que vuelven (5+ años afuera, hasta 2 años de regreso). Gratis, salvo 250 ₪ por el plan de negocio. Gush Dan y Shfelá: 03-5501128. Jerusalén: 02-6794242 (ext. 3). Fuente: Ministerio de Aliá.

Comunidad (comercios confirmados por el sitio)
- Amapola Alfajores, Ibn Gvirol 54, Tel Aviv (Dom–Jue 7:30–18:30, Vie 7:30–14:30). Las Empanadot, delivery en zona Merkaz. Vajula Alfajores, envíos a todo Israel. Maadaniá Laro, Allenby 37, Tel Aviv (productos de Argentina y Sudamérica, tel. 03-5255880). La Tienda - Comida Latina, Levanda 13, Tel Aviv (Dom–Jue 10:00–22:00, Vie 9:00–23:00). No menciones otros comercios.
- OLEI: voluntarios que acompañan a hispanohablantes en trámites (olei.org.il).`;

// -----------------------------------------------------------------------------
// Mensajes cuando Gemini no responde (sin respuestas fijas por palabra clave)
// -----------------------------------------------------------------------------
export const UNAVAILABLE_TEXT =
  'No pude responder ahora. Intenta de nuevo en un momento. Mientras tanto, puedes buscar tu tema en las secciones del sitio.';
export const QUOTA_TEXT =
  'El asistente llegó al límite de consultas por ahora. Intenta de nuevo más tarde. Mientras tanto, puedes buscar tu tema en las secciones del sitio.';

// Compatibilidad con código anterior.
export function fallbackAnswer(_query: string): string {
  return UNAVAILABLE_TEXT;
}

type InMsg = { role?: string; content?: string };
type Turn = { role: 'user' | 'model'; parts: { text: string }[] };

const MAX_TURNS = 20;
const MAX_CHARS_PER_TURN = 2000;

// Arma una conversación válida para Gemini: empieza con 'user', alterna roles
// y termina con la pregunta actual.
export function buildContents(messages: InMsg[] | undefined, currentQuery: string): Turn[] {
  const turns: Turn[] = [];
  const list = Array.isArray(messages) ? messages : [];
  for (const m of list) {
    const text = typeof m?.content === 'string' ? m.content.trim().slice(0, MAX_CHARS_PER_TURN) : '';
    if (!text) continue;
    const role: Turn['role'] = m.role === 'user' ? 'user' : 'model';
    const last = turns[turns.length - 1];
    if (last && last.role === role) {
      last.parts[0].text += `\n\n${text}`;
    } else {
      turns.push({ role, parts: [{ text }] });
    }
  }
  const lastTurn = turns[turns.length - 1];
  if (!lastTurn || lastTurn.role !== 'user' || !lastTurn.parts[0].text.endsWith(currentQuery)) {
    if (lastTurn && lastTurn.role === 'user') lastTurn.parts[0].text += `\n\n${currentQuery}`;
    else turns.push({ role: 'user', parts: [{ text: currentQuery }] });
  }
  let recent = turns.slice(-MAX_TURNS);
  while (recent.length && recent[0].role !== 'user') recent = recent.slice(1);
  return recent;
}

const STAGE_HINT: Record<string, string> = {
  recien_llegado: 'La persona eligió "recién llegado": llegó hace poco.',
  emergencia: 'La persona eligió "emergencia": prioriza qué hacer ahora.',
  tramite: 'La persona eligió "trámite": está haciendo una gestión concreta.',
};

// Sitios oficiales en los que el asistente puede buscar.
export const OFFICIAL_DOMAINS = [
  'gov.il', '*.gov.il',
  'kolzchut.org.il', '*.kolzchut.org.il',
  'clalit.co.il', '*.clalit.co.il',
  'maccabi4u.co.il', '*.maccabi4u.co.il',
  'meuhedet.co.il', '*.meuhedet.co.il',
  'leumit.co.il', '*.leumit.co.il',
  'oref.org.il', '*.oref.org.il',
  'jewishagency.org', '*.jewishagency.org',
];

const OFFICIAL_RE = /(^|\.)(gov\.il|kolzchut\.org\.il|clalit\.co\.il|maccabi4u\.co\.il|meuhedet\.co\.il|leumit\.co\.il|oref\.org\.il|jewishagency\.org)$/i;

export function isOfficialUrl(url: string): boolean {
  try {
    return OFFICIAL_RE.test(new URL(url).hostname);
  } catch {
    return false;
  }
}

type Result = { text: string } | { error: 'quota' | 'unavailable'; detail: string };

// Groq Compound: modelo + búsqueda web limitada a sitios oficiales.
async function askGroq(system: string, contents: Turn[], apiKey: string): Promise<Result> {
  const model = process.env.GROQ_MODEL || 'groq/compound-mini';
  const messages = [
    { role: 'system', content: system },
    ...contents.map((t) => ({ role: t.role === 'user' ? 'user' : 'assistant', content: t.parts[0].text })),
  ];
  const base: any = {
    model,
    messages,
    temperature: 0.3,
    max_completion_tokens: 2048,
    search_settings: { include_domains: OFFICIAL_DOMAINS },
  };
  // Solo búsqueda web (sin visitar sitios arbitrarios ni ejecutar código).
  const bodies = [{ ...base, compound_custom: { tools: { enabled_tools: ['web_search'] } } }, base];
  for (const body of bodies) {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    });
    if (resp.status === 429) return { error: 'quota', detail: 'groq 429' };
    if (resp.status === 400 && body.compound_custom) {
      console.warn('[chat] Groq rechazó compound_custom, reintento sin esa opción:', (await resp.text().catch(() => '')).slice(0, 300));
      continue;
    }
    if (!resp.ok) {
      const t = await resp.text().catch(() => '');
      console.error(`[chat] Groq respondió ${resp.status}: ${t.slice(0, 500)}`);
      return { error: 'unavailable', detail: `groq ${resp.status}` };
    }
    const data = await resp.json();
    const msg = data?.choices?.[0]?.message;
    let text = String(msg?.content || '').trim();
    if (!text) return { error: 'unavailable', detail: 'groq vacío' };

    // Fuentes oficiales que la búsqueda consultó y que el texto no cita.
    const urls: string[] = [];
    for (const tool of msg?.executed_tools || []) {
      const sr = tool?.search_results;
      const list = Array.isArray(sr) ? sr : sr?.results || [];
      for (const r of list) {
        const u = r?.url;
        if (typeof u === 'string' && isOfficialUrl(u) && !urls.includes(u) && !text.includes(u)) urls.push(u);
      }
    }
    // Quita enlaces no oficiales que el modelo haya escrito igual.
    text = text.replace(/https?:\/\/[^\s)\]]+/g, (u) => (isOfficialUrl(u) ? u : ''));
    if (urls.length && !/https?:\/\//.test(text)) {
      text += `\n\nPáginas oficiales consultadas:\n${urls.slice(0, 3).map((u) => `- ${u}`).join('\n')}`;
    }
    return { text };
  }
  return { error: 'unavailable', detail: 'groq sin respuesta' };
}

// Gemini: respaldo sin búsqueda web.
async function askGemini(system: string, contents: Turn[], apiKey: string): Promise<Result> {
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: `${system}\n\nAVISO: en este momento NO tienes búsqueda web. Para datos concretos usa solo la BASE VERIFICADA.` }],
          },
          generationConfig: { temperature: 0.3, maxOutputTokens: 4096, thinkingConfig: { thinkingLevel: 'medium' } },
        }),
      });
      if (resp.status === 429) return { error: 'quota', detail: 'gemini 429' };
      if (!resp.ok) {
        const t = await resp.text().catch(() => '');
        console.error(`[chat] Gemini respondió ${resp.status}: ${t.slice(0, 300)}`);
        if (resp.status >= 500 && attempt === 1) continue;
        return { error: 'unavailable', detail: `gemini ${resp.status}` };
      }
      const data = await resp.json();
      const cand = data?.candidates?.[0];
      const text = (cand?.content?.parts || [])
        .filter((p: any) => typeof p?.text === 'string' && !p.thought)
        .map((p: any) => p.text)
        .join('')
        .trim();
      if (text) return { text };
      console.error('[chat] Gemini vacío', { finishReason: cand?.finishReason });
    } catch (err: any) {
      console.error('[chat] Error Gemini:', err?.message || err);
    }
  }
  return { error: 'unavailable', detail: 'gemini sin respuesta' };
}

export async function answerChat(body: any): Promise<{ status: number; json: any }> {
  const { userQuery, messages, userStage } = body || {};
  const currentQuery = String(
    userQuery || (Array.isArray(messages) && messages.length ? messages[messages.length - 1]?.content : '') || ''
  ).trim();
  if (!currentQuery) return { status: 400, json: { error: 'Consulta vacía' } };

  const stageHint = userStage && STAGE_HINT[userStage] ? `\n\nCONTEXTO: ${STAGE_HINT[userStage]}` : '';
  const system = SYSTEM_PROMPT + stageHint;
  const contents = buildContents(messages, currentQuery);

  // Orden: Groq (con búsqueda oficial) y, si falla, Gemini.
  const providers: Array<() => Promise<Result>> = [];
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (groqKey) providers.push(() => askGroq(system, contents, groqKey));
  if (geminiKey) providers.push(() => askGemini(system, contents, geminiKey));
  if (!providers.length) {
    console.error('[chat] No hay claves de IA configuradas');
    return { status: 200, json: { text: UNAVAILABLE_TEXT, error: 'no_key' } };
  }

  let sawQuota = false;
  for (const ask of providers) {
    try {
      const r = await ask();
      if ('text' in r) return { status: 200, json: { text: r.text } };
      if (r.error === 'quota') sawQuota = true;
      console.warn('[chat] Proveedor sin respuesta:', r.detail);
    } catch (err: any) {
      console.error('[chat] Error de proveedor:', err?.message || err);
    }
  }
  return {
    status: 200,
    json: sawQuota ? { text: QUOTA_TEXT, error: 'quota' } : { text: UNAVAILABLE_TEXT, error: 'unavailable' },
  };
}

// -----------------------------------------------------------------------------
// Endpoint (Vercel)
// -----------------------------------------------------------------------------
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { status, json } = await answerChat(req.body);
  return res.status(status).json(json);
}
