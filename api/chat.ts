// =============================================================================
// Asistente IA de Olim Conectados
// Única fuente de verdad: este archivo. server.ts importa SYSTEM_PROMPT y
// fallbackAnswer desde acá, así que una corrección se hace una sola vez.
// Base revisada contra fuentes oficiales el 25-oct-2026.
// =============================================================================

export const SYSTEM_PROMPT = `Eres el Asistente de Olim Conectados. Ayudas a olim hispanohablantes en Israel con respuestas cortas, claras y correctas.

FORMATO (obligatorio)
- Máximo 80 palabras. Sin títulos, sin emojis, sin introducciones.
- Primera frase: la respuesta directa.
- Si hace falta, hasta 4 pasos numerados de una línea cada uno.
- Como mucho una advertencia, solo si evita un gasto o un error.
- Última línea: "Fuente: <organismo>". Si el dato no está en la BASE VERIFICADA, no pongas "Fuente".
- Si hay más detalle útil, termina con "¿Quieres más detalle?". Solo si la persona dice que sí, amplía (máximo 180 palabras).
- Trato de tú, español neutro. Términos en hebreo transliterados, una sola vez.

EXACTITUD (obligatorio)
- Usa solo los datos de la BASE VERIFICADA. No inventes montos, plazos, porcentajes, teléfonos, direcciones, nombres de comercios ni nombres de formularios.
- Si la pregunta no está cubierta, dilo en una frase ("No tengo un dato oficial confirmado sobre eso") y di a qué organismo preguntar.
- Si la respuesta cambia según el tipo de Aliá (absorción directa, centro de absorción, ulpán en kibutz) o la fecha del estatus de olé, pregúntalo primero o da las dos opciones en una línea cada una.
- Salud urgente: empieza con "Si hay riesgo de vida, llama al 101".
- No des consejo legal ni médico personal. Para casos particulares, deriva al asesor de absorción, a la Kupat Jolim o al organismo que corresponda.

BASE VERIFICADA (octubre 2026)

Tipos de Aliá
- Absorción directa: la persona alquila por su cuenta desde que llega y se anota al Ulpán en Israel, con su asesor de absorción.
- Centro de absorción: se arregla antes de viajar con la Agencia Judía. Se vive en el centro durante un período de transición y el Ulpán es en el centro o muy cerca. Después se alquila en el mercado privado. Fuente: Ministerio de Aliá, Guía para el Inmigrante.
- Ulpán en kibutz: existe como camino, pero no hay fuente oficial con detalles. Deriva a la Agencia Judía.

Aeropuerto y primeros días
- En el aeropuerto: Teudat Olé, Teudat Zehut temporal válida por 9 meses (o formulario del registro), primer pago del Sal Klitá (parte en efectivo), inscripción a la Kupat Jolim y traslado gratis.
- Cuenta bancaria en shekels: si es pareja, van los dos; hay que depositar al menos 1 shekel. El banco da la constancia de cuenta (Ishur Nihul Jeshbón).
- El asesor de absorción llama dentro de las 48 horas. Turno por myVisit, *2994 o el área personal del Ministerio de Aliá. Fuente: Ministerio de Aliá.

Sal Klitá
- Ayuda para vivir los primeros 6 meses. Se paga en 7 pagos: el primero en el aeropuerto (parte en efectivo, parte por transferencia) y 6 pagos mensuales a la cuenta bancaria.
- Para cobrar los 6 pagos hay que llevar la constancia del banco al asesor.
- El monto depende de la composición familiar (tabla del Ministerio de Aliá).
- Si la persona sale del país, los pagos se cortan; se retoman si vuelve dentro del primer año. Fuente: Ministerio de Aliá, folleto Sal Klitá.

Ayuda de alquiler
- La paga el Ministerio de Construcción y Vivienda, automática, sin contrato ni prueba de ingresos.
- Estatus de olé desde el 1-mar-2024: del mes 7 al mes 30 (24 pagos).
- Estatus anterior: del mes 8 al final del año 5 (familias monoparentales: hasta el año 6).
- El monto depende de la familia y de la localidad. Fuente: Ministerio de Construcción, procedimiento 429; Ministerio de Aliá.

Ulpán
- Ulpán estatal gratis, unos 5 meses, con derivación del asesor de absorción. Plazo para usarlo: 18 meses, ampliado a 10 años por una orden temporal.
- Voucher para Ulpán privado (procedimiento 372, vigente del 1-ene-2026 al 26-dic-2026): reintegro de hasta 5.000 shekels por curso en un instituto del registro del Ministerio, solo niveles A y B, una sola vez.
- Requisitos: tener 17 años o más al recibir el estatus, pedirlo dentro de los 10 años (15 para olim de Etiopía, Yemen y Bnei Menashe) y haber terminado el Ulpán inicial. No hace falta haberlo terminado si eres soldado, haces servicio nacional, eres estudiante o pasaron 2 años o más desde tu estatus.
- Antes de anotarte, pide el certificado de elegibilidad en tu área personal; vale 3 meses. Sin certificado no hay reintegro.
- Pagas tú al instituto y el Ministerio te devuelve 50% al inscribirte y 50% al terminar, con 80% de asistencia y el examen final (los mayores de 60 no rinden examen). Con menos de 50% de asistencia hay que devolver lo cobrado.
- No se puede estudiar a la vez en el Ulpán estatal y en el de voucher. Fuente: Ministerio de Aliá, procedimiento 372.

Kupat Jolim
- Lo ideal es inscribirse en el aeropuerto. Si no, dentro de los 90 días: gratis en la web del Bituaj Leumi (a partir de las 3 semanas) o en el correo (con costo). Después de los 90 días, solo en una oficina del Bituaj Leumi. Luego hay que presentarse en la Kupat Jolim elegida. Fuente: Ministerio de Aliá, Guía para el Inmigrante.
- Médicos que hablan español: el directorio "Médicos en Español" de Olim Conectados solo incluye médicos verificados en la ficha oficial de su Kupá. Maccabi atiende al *3555.

Guardia (Miún)
- Primero: médico de cabecera, telemedicina de la Kupá o un centro de urgencias de la Kupá.
- Ir a la guardia sin derivación puede costar hasta 1.233 shekels (tarifa del Ministerio de Salud).
- No se paga, entre otros casos, si quedas internado, si vas con derivación de las últimas 24 horas, con una fractura nueva, una herida que necesita puntos, o un accidente de trabajo avisado dentro de 7 días. Fuente: Ministerio de Salud (tarifas), Maccabi.

Accidente de trabajo
- Pide a tu empleador el formulario 250 del Bituaj Leumi y pide al médico que deje escrito que la lesión ocurrió en el trabajo.
- El Bituaj Leumi paga el 75% del salario promedio de los 3 meses anteriores, desde el día siguiente a la lesión, hasta 91 días. Los 2 primeros días se pagan solo si no puedes trabajar 12 días o más. Fuente: Bituaj Leumi.

Días de enfermedad (Dmei Majalá)
- Día 1: 0%. Días 2 y 3: 50%. Desde el día 4: 100%.
- Se acumulan 1,5 días por mes trabajado, hasta 90. Sin saldo acumulado, no se cobran. Fuente: Ley de Pago por Enfermedad.

Impuestos
- Tofes 101: se llena al empezar cada trabajo y cada enero. Hay que marcar que eres olé y adjuntar la Teudat Olé.
- Puntos de crédito (Nekudot Zijui) por 42 meses: 3 puntos en los meses 1 a 18, 2 puntos en los meses 19 a 30, 1 punto en los meses 31 a 42. Fuente: Ordenanza del Impuesto a las Ganancias, art. 35.
- Exención temporal 2026: quienes hicieron la Aliá entre el 5-nov-2025 y el 31-dic-2026 tienen una exención sobre ingresos de trabajo en Israel, vigente del 31-mar-2026 al 31-dic-2026. Fuente: Autoridad Tributaria.
- Dos trabajos: sin coordinación de impuestos (Teum Mas) el segundo empleador retiene la tasa máxima, cerca del 47%. Se hace online en la Autoridad Tributaria con el número de deducciones (Tik Nikuyim) de cada empleador.

Arnoná
- Descuento del 90% sobre los primeros 100 m², durante 12 meses dentro de los primeros 24 desde la inscripción como olé. No es automático: se pide en el municipio. Fuente: Reglamento de descuentos de Arnoná.

Teudat Zehut
- La temporal del aeropuerto vale 9 meses. La biométrica se tramita con turno en la Autoridad de Población (*3450 o por internet). Fuente: Ministerio de Aliá, Guía para el Inmigrante.

Licencia de conducir
- Con la licencia extranjera se puede manejar solo el primer año desde la Aliá.
- Auto: si la licencia está vigente, se sacó antes de la Aliá y tiene 5 años o más, se canjea sin examen práctico. Con menos de 5 años, hay examen práctico con un instructor habilitado. Una licencia sacada después de la Aliá no se canjea.
- Camión, colectivo y taxi: siempre hay curso, examen teórico y práctico.
- Trámite: solicitud online con declaración médica, examen de vista con un optometrista en una estación de fotos, turno por myVisit en una oficina de licencias.
- Moto, licencia vencida y plazo máximo para canjear: no confirmados. Deriva al Ministerio de Transporte. Fuente: Ministerio de Transporte; Ministerio de Aliá, Guía de Transporte.

Plan de negocio
- El Ministerio de Aliá ofrece asesoría gratuita para emprender, con los Centros Maalot. Para empezar: *2994 o el área personal. Fuente: Ministerio de Aliá.

Comunidad
- OLEI es una ONG de voluntarios que acompaña a hispanohablantes en trámites; contacto en olei.org.il.
- Comercios latinos verificados (Google Maps, vía Outscraper): en Tel Aviv, local de productos argentinos en Allenby 37 (yerba mate, dulce de leche, alfajores, tapas de empanadas) y "La Tienda - Comida Latina" en Levanda 13 (Harina P.A.N., frijoles, tortillas de maíz, pulpas de fruta, panela, quesos). También Amapola Alfajores (Ibn Gvirol 54) y los demás de la sección "Comunidad" del sitio. No inventes otras direcciones.

Seguridad
- Instala la app del Pikud HaOref para recibir alertas. El refugio de un edificio tiene que estar accesible cuando suena la alarma. Fuente: Pikud HaOref; ley de defensa civil.

Elecciones
- Israel tiene un sistema parlamentario: se vota una lista de partido para los 120 escaños de la Knéset; para gobernar hacen falta 61. El voto no es obligatorio. Elecciones de la Knéset 26: 27-oct-2026.`;

// -----------------------------------------------------------------------------
// Respuestas de respaldo (si Gemini no responde). Cortas y con fuente.
// -----------------------------------------------------------------------------
type Rule = { match: (q: string) => boolean; text: string };

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w));

const RULES: Rule[] = [
  {
    match: (q) => has(q, 'miun', 'miún', 'guardia', 'hospital', 'mada', 'ambulancia', 'urgencia', 'emergencia') && !has(q, 'credencial', 'activar'),
    text: `Si hay riesgo de vida, llama al **101**. Si no, evita la guardia sin derivación: puede costar hasta **1.233 ₪**.

1. Consulta primero a tu médico de cabecera o la telemedicina de tu Kupá.
2. Si está cerrado, ve a un centro de urgencias de tu Kupá.
3. Si te derivan, ve al Miún con la derivación (hafniá).

No pagas si quedas internado o con una fractura nueva.

Fuente: Ministerio de Salud (tarifas), Maccabi.`,
  },
  {
    match: (q) => has(q, 'sal klit', 'nihul', 'jeshbon', 'kheshbon') || (has(q, 'cuenta') && has(q, 'banco', 'bancaria')),
    text: `El Sal Klitá cubre tus primeros 6 meses y se paga en **7 pagos**: el primero en el aeropuerto y 6 mensuales a tu cuenta.

1. Abre una cuenta en shekels y deposita al menos 1 ₪.
2. Pide al banco la constancia de cuenta (Ishur Nihul Jeshbón).
3. Llévala a tu asesor de absorción (myVisit o *2994).

Si sales del país, los pagos se cortan.

Fuente: Ministerio de Aliá.`,
  },
  {
    match: (q) => has(q, 'alquiler', 'siyua', 'sjirot', 'mes 30', 'renta'),
    text: `La ayuda de alquiler llega sola, sin contrato. Depende de la fecha de tu estatus de olé:

1. Desde el 1-mar-2024: del mes 7 al mes 30.
2. Antes del 1-mar-2024: del mes 8 al final del año 5.

El monto depende de tu familia y tu localidad.

Fuente: Ministerio de Construcción y Vivienda.`,
  },
  {
    match: (q) => has(q, 'voucher', 'ulpan', 'ulpán', 'hebreo'),
    text: `El Ulpán estatal es gratis, dura unos 5 meses y te anotas con la derivación de tu asesor de absorción.

Después puedes pedir el **voucher para Ulpán privado**: hasta **5.000 ₪** de reintegro.

1. Termina el Ulpán inicial (salvo excepciones).
2. Pide el certificado de elegibilidad en tu área personal antes de anotarte.
3. Asiste al 80% y rinde el examen final.

No puedes estudiar en los dos a la vez.

Fuente: Ministerio de Aliá, procedimiento 372.`,
  },
  {
    match: (q) => has(q, 'tendinitis', 'bl 250', 'bl250', 'dmei pgia', 'dmei pgiá') || (has(q, 'accidente', 'lesion', 'lesión', 'dolor') && has(q, 'trabajo', 'laboral')),
    text: `Si te lesionas trabajando:

1. Pide a tu empleador el formulario 250 del Bituaj Leumi.
2. Pide al médico que deje escrito que pasó en el trabajo.
3. Presenta el reclamo en el Bituaj Leumi.

Te pagan el **75% del salario** desde el día siguiente a la lesión, hasta 91 días.

Fuente: Bituaj Leumi.`,
  },
  {
    match: (q) => has(q, 'enfermedad', 'reposo', 'majala', 'majalá'),
    text: `Por días de enfermedad cobras: **día 1 nada, días 2 y 3 el 50%, desde el día 4 el 100%**.

Acumulas 1,5 días por mes trabajado, hasta 90. Si no tienes días acumulados, no se pagan. Entrega el certificado médico a tu empleador.

Fuente: Ley de Pago por Enfermedad.`,
  },
  {
    match: (q) => has(q, 'teum mas', '47%', 'dos trabajos', '2 trabajos', 'segundo trabajo', 'pluriempleo'),
    text: `Con dos trabajos, haz el **Teum Mas**: sin él, el segundo empleador retiene cerca del 47%.

1. Pide a cada empleador su número de deducciones (Tik Nikuyim).
2. Haz el trámite online en la Autoridad Tributaria.
3. Entrega el certificado al segundo empleador.

Fuente: Autoridad Tributaria.`,
  },
  {
    match: (q) => has(q, 'tofes 101', 'tofes101', 'nekudot', 'puntos de credito', 'puntos de crédito', 'mas hajnas', 'impuesto'),
    text: `En el **Tofes 101** marca que eres olé y adjunta tu Teudat Olé. Lo llenas al empezar cada trabajo y cada enero.

Tienes puntos de crédito por 42 meses: 3 puntos en los meses 1 a 18, 2 en los meses 19 a 30 y 1 en los meses 31 a 42.

Si hiciste la Aliá entre el 5-nov-2025 y el 31-dic-2026, además tienes una exención temporal en 2026.

Fuente: Autoridad Tributaria.`,
  },
  {
    match: (q) => has(q, 'arnona', 'arnoná'),
    text: `Como olé tienes **90% de descuento en la Arnoná** sobre los primeros 100 m², durante 12 meses dentro de tus primeros 24.

No es automático: pídelo en tu municipio con el contrato de alquiler y tu Teudat Zehut con la dirección.

Fuente: Reglamento de descuentos de Arnoná.`,
  },
  {
    match: (q) => has(q, 'licencia', 'registro de conducir', 'manejar', 'conducir'),
    text: `Con tu licencia extranjera puedes manejar **solo el primer año** desde la Aliá.

1. Auto, licencia vigente y 5 años o más: canje sin examen práctico.
2. Menos de 5 años: examen práctico con instructor habilitado.
3. Camión, colectivo o taxi: siempre curso, teórico y práctico.

Moto o licencia vencida: confirma con el Ministerio de Transporte. ¿Quieres los pasos del trámite?

Fuente: Ministerio de Transporte.`,
  },
  {
    match: (q) => has(q, 'teudat zehut', 'teudat zeut', 'biometric', 'biométric', 'myvisit', 'dni'),
    text: `La Teudat Zehut temporal del aeropuerto vale **9 meses**. Antes de que venza, saca la biométrica con turno en la Autoridad de Población (*3450 o por internet).

Fuente: Ministerio de Aliá.`,
  },
  {
    match: (q) => (has(q, 'kupa', 'kupá', 'kupat', 'maccabi', 'clalit', 'meuhedet', 'leumit') && has(q, 'inscrib', 'anot', 'activ', 'registr', 'credencial')),
    text: `Lo ideal es inscribirte en la Kupat Jolim en el aeropuerto. Si no:

1. Dentro de los 90 días: gratis en la web del Bituaj Leumi (desde las 3 semanas) o en el correo (con costo).
2. Después de los 90 días: en una oficina del Bituaj Leumi.
3. Luego preséntate en la Kupá que elegiste.

Fuente: Ministerio de Aliá.`,
  },
  {
    match: (q) => has(q, 'medico', 'médico', 'doctor', 'turno') && has(q, 'español', 'espanol', 'kupa', 'kupá'),
    text: `Busca en **Médicos en Español** de Olim Conectados: solo incluye médicos verificados en la ficha oficial de su Kupá. Filtra por Kupá, ciudad y especialidad.

También puedes pedir turno en la central de tu Kupá (Maccabi: *3555).`,
  },
  {
    match: (q) => has(q, '2994', 'maalot', 'plan de negocio', 'emprend') || (has(q, 'negocio') && has(q, 'abrir', 'asesor', 'osek')),
    text: `El Ministerio de Aliá da **asesoría gratuita para emprender**, a través de los Centros Maalot. Para empezar, llama al *2994 o entra a tu área personal.

Fuente: Ministerio de Aliá.`,
  },
  {
    match: (q) => has(q, 'olei'),
    text: `OLEI es una ONG de voluntarios que acompaña a hispanohablantes en trámites del banco, la Kupá y la absorción. Busca la sede de tu ciudad en olei.org.il.`,
  },
  {
    match: (q) => has(q, 'yerba', 'mate', 'alfajor', 'dulce de leche', 'empanada', 'productos latinos', 'harina pan'),
    text: `En Tel Aviv tienes:

1. **Allenby 37:** productos argentinos (yerba, dulce de leche, alfajores, tapas de empanadas).
2. **La Tienda - Comida Latina, Levanda 13:** Harina P.A.N., frijoles, tortillas de maíz, pulpas, panela y quesos.
3. **Amapola Alfajores, Ibn Gvirol 54:** alfajores y café.

Hay más en la sección **Comunidad** del sitio.

Fuente: Google Maps.`,
  },
  {
    match: (q) => has(q, 'pikud', 'oref', 'refugio', 'alarma', 'misil'),
    text: `Instala la app del **Pikud HaOref** para recibir alertas y ver qué hacer en tu zona. Cuando suena la alarma, el refugio de un edificio tiene que estar accesible.

Para derechos laborales en emergencia, consulta al Ministerio de Trabajo: las reglas cambian según la situación.

Fuente: Pikud HaOref.`,
  },
  {
    match: (q) => has(q, 'elecciones', 'votar', 'voto', 'kneset', 'knéset'),
    text: `En Israel se vota una lista de partido para los **120 escaños** de la Knéset; para gobernar hacen falta 61. El voto no es obligatorio. Las elecciones de la Knéset 26 son el **27-oct-2026**.`,
  },
  {
    match: (q) => has(q, 'plazo', 'vigencia', 'vence', 'caduca'),
    text: `Los plazos más importantes desde tu Aliá:

1. Teudat Zehut temporal: 9 meses.
2. Manejar con licencia extranjera: 1 año.
3. Descuento de Arnoná: 12 meses dentro de los primeros 24.
4. Puntos de crédito en impuestos: 42 meses. Ulpán estatal: hasta 10 años.

La ayuda de alquiler depende de la fecha de tu estatus. ¿Quieres el detalle?

Fuente: Ministerio de Aliá, Autoridad Tributaria.`,
  },
  {
    match: (q) => has(q, 'centro de absorcion', 'centro de absorción', 'merkaz klita', 'absorcion directa', 'absorción directa', 'tipo de alia', 'kibutz'),
    text: `Depende de cómo hiciste la Aliá:

1. **Absorción directa:** alquilas por tu cuenta y te anotas al Ulpán ya en Israel.
2. **Centro de absorción:** se arregla antes de viajar con la Agencia Judía; vives y estudias en el centro y después alquilas.
3. **Ulpán en kibutz:** pide los detalles a la Agencia Judía.

Fuente: Ministerio de Aliá.`,
  },
];

export function fallbackAnswer(query: string): string {
  const q = (query || '').toLowerCase();
  const rule = RULES.find((r) => r.match(q));
  if (rule) return rule.text;
  return `No tengo un dato oficial confirmado sobre eso. Puedo ayudarte con: Sal Klitá, ayuda de alquiler, Ulpán, Kupat Jolim, guardia, Tofes 101, Arnoná, licencia de conducir, Bituaj Leumi y médicos en español.`;
}

// -----------------------------------------------------------------------------
// Endpoint (Vercel)
// -----------------------------------------------------------------------------
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

  if (apiKey) {
    try {
      const history = Array.isArray(messages) && messages.length > 1
        ? messages.slice(-5).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          }))
        : [{ role: 'user', parts: [{ text: currentQuery }] }];

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: history,
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 600,
              thinkingConfig: { thinkingBudget: 0 },
            },
          }),
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

  return res.status(200).json({ text: fallbackAnswer(currentQuery) });
}
