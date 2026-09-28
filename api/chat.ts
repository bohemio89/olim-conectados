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

  const systemPrompt = `Eres el Asistente Experto y Oficial de "Olim Conectados", la plataforma integral de información y asistencia práctica para inmigrantes hispanohablantes (Olim Jadashim) en Israel.

DIRECTIVAS ESTRICTAS DE RESPUESTA:
1. RIGOR Y OFICIALIDAD:
   - Responde siempre en español claro, cálido, empático y estructurado en pasos prácticos y concretos.
   - Distingue con total exactitud las entidades oficiales de Israel:
     * Misrad HaAliyah VeHaKlita: Sal Klitá, voucher de Ulpán privado (hasta 5.200 NIS con autorización previa del póked), subsidio de alquiler (mes 7 al 30), exenciones aduaneras.
     * Bituaj Leumi: Seguro de salud, cobertura por lesiones/enfermedades laborales mediante formulario BL 250 (atención médica) y subsidio Dmei Pgi'á con BL 211, asignaciones familiares.
     * Misrad HaRishuí: Canje directo de licencia extranjera de conducir sin examen práctico ni teórico si se acreditan más de 5 años de antigüedad.
     * Rashut HaOjlusin VeHaHagira (Misrad HaPnim): Teudat Zehut biométrica, pasaportes.
     * Rashut HaMisim: Deducciones impositivas para Olim (Nekudot Zijui) en Tofes 101 durante los primeros 42 meses; Teum Mas para dos o más empleos.
     * OLEI: Aclara taxativamente que la OLEI es una organización civil y voluntaria de la comunidad hispanohablante, NO un organismo estatal ni médico. Su función primordial es el voluntariado, apoyo emocional, traducción y acompañamiento solidario y presencial a bancos, Kupot Jolim y trámites públicos.
2. FORMATO LIMPIO:
   - No añadas etiquetas residuales al final como "Fuente: ...". Cita las leyes, organismos y formularios de manera orgánica dentro del propio texto explicativo.
   - Estructura las explicaciones complejas con listas numeradas cortas y términos clave en hebreo transliterado.`;

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
              temperature: 0.3,
              maxOutputTokens: 1200
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

  // 2. BASE OFICIAL DE RESPALDO (Por si la API de Gemini tiene demoras en móvil)
  const q = currentQuery.toLowerCase();

  if (q.includes('olei') || (q.includes('acompaña') && (q.includes('banco') || q.includes('kupa')))) {
    return res.status(200).json({
      text: `🤝 **Cómo te ayuda la OLEI (Asociación de Inmigrantes Hispanohablantes):**

La **OLEI** es una organización no gubernamental y comunitaria que brinda apoyo solidario a los nuevos inmigrantes en Israel:

1. **Acompañamiento y Traducción:** Dispone de una red de voluntarios que pueden acompañarte personalmente al banco, a tu Kupat Jolim o a oficinas públicas para traducir y asistirte en tus primeros trámites si aún no manejas el hebreo.
2. **Orientación Práctica:** Asesoramiento comunitario sin costo sobre integración, vivienda y gestiones de la vida cotidiana.
3. **Contacto:** Puedes acudir a la sede de la OLEI en tu ciudad o solicitar asistencia voluntaria a través de su sitio oficial (**olei.org.il**).`
    });
  }

  if (q.includes('voucher') || (q.includes('ulp') && (q.includes('5.200') || q.includes('5200') || q.includes('privado')))) {
    return res.status(200).json({
      text: `🎓 **Cómo funciona el Voucher de Ulpán Privado (Misrad HaAliyah):**

1. **Beneficio:** Un subsidio oficial de hasta **5.200 NIS** para cursar en institutos privados autorizados (ej. Citizen Café, Ulpan Bayit).
2. **Condición previa:** Requiere haber finalizado el Ulpán estatal inicial (Alef) o que no existan plazas públicas disponibles en tu región dentro de tu período de elegibilidad.
3. **Paso a paso:**
   - Solicita la autorización del voucher (**Schovar Klitá**) con tu asesor personal (**póked**) en Misrad HaAliyah antes de abonar el curso.
   - Inscríbete en el instituto reconocido y presenta la constancia de pago.
   - El reintegro se transfiere directamente a tu cuenta bancaria registrada.`
    });
  }

  if (q.includes('tendinitis') || q.includes('bl 250') || q.includes('bl250') || (q.includes('dolor') && q.includes('trabajo'))) {
    return res.status(200).json({
      text: `🏥 **Enfermedad o Accidente Laboral: Procedimiento con Bituaj Leumi y Formulario BL 250:**

1. **Completar el BL 250:** Pide a tu empleador que rellene y selle el formulario **BL 250** (*Tofes le-matan tipul refu'í*), certificando que la molestia o lesión ocurrió en el marco laboral.
2. **Atención Médica:** Presenta el BL 250 en la guardia o centro médico de tu Kupá para recibir atención médica y estudios sin costo.
3. **Certificado de reposo:** El médico debe expedir la **Teudá Refu'it Rishoná** para accidentes de trabajo indicando los días de reposo.
4. **Cobro de subsidio (BL 211):** Para percibir la compensación por los días no trabajados (**Dmei Pgi'á**), presenta ante Bituaj Leumi el formulario **BL 211** adjuntando el BL 250 y los comprobantes médicos.`
    });
  }

  return res.status(200).json({
    text: `Para consultas sobre trámites de Aliá (Sal Klitá, licencias, Tofes 101, Bituaj Leumi o derechos laborales), formula tu consulta con los detalles del trámite para darte la guía oficial paso a paso.`
  });
}
