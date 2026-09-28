export default async function handler(req: any, res: any) {
  // Manejo de CORS y preflight
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

  // ==========================================
  // 1. BASE DE CONOCIMIENTO LOCAL (RESPUESTA INMEDIATA)
  // ==========================================

  // Asesoramiento de negocios (*2994 / Maalot / Emprender)
  if (q.includes('negocio') || q.includes('2994') || q.includes('maalot') || q.includes('emprender') || q.includes('autónomo') || q.includes('osek')) {
    return res.status(200).json({
      text: `💼 **Asesoramiento Oficial Gratuito para Emprendedores y Negocios (Misrad HaAliyah):**

1. **Línea directa de contacto:** Puedes comunicarte directamente al centro oficial llamando al ***2994** o a través de los centros de desarrollo empresarial **Maalot**.
2. **Consultoría personalizada sin costo:** Todo Olé Jadash tiene derecho a horas de consultoría subvencionadas con expertos en negocios, contadores y asesores de mercado que hablan español.
3. **Planes de negocio y financiamiento:** Te asisten en el armado de tu plan de viabilidad, trámites de apertura de expediente tributario (**Osek Patur / Murshe**) y acceso a préstamos con tasas preferenciales y fondos de garantía estatal para nuevos inmigrantes.`,
      source: null
    });
  }

  // Médicos en español / Turnos Kupat Jolim
  if ((q.includes('médico') || q.includes('medico') || q.includes('turno')) && (q.includes('español') || q.includes('kupa') || q.includes('kupá'))) {
    return res.status(200).json({
      text: `🩺 **Cómo solicitar turno con un médico que hable español en tu Kupat Jolim:**

1. **Filtro por idioma en app o web:**
   - En la aplicación oficial de tu obra médica (Maccabi, Clalit, Meuhedet o Leumit), al filtrar médicos especialistas, accede a las opciones avanzadas de **Idioma (Language / שפה)** y marca **Español (ספרדית)**.
2. **Central de turnos telefónica:**
   - Llama a la central de tu Kupá (*3555 Maccabi, *2700 Clalit, *3833 Meuhedet, *507 Leumit) y pide asistencia en español indicando: *"Efshar meturgeman be-sfaradit?"*.
3. **Médico de cabecera:** Tu médico general puede gestionar interconsultas directas o derivarte a telemedicina con profesionales hispanohablantes.`,
      source: null
    });
  }

  // Yerba mate y productos importados
  if (q.includes('yerba') || q.includes('mate') || q.includes('importad') || q.includes('dulce de leche') || q.includes('compras')) {
    return res.status(200).json({
      text: `🧉 **Dónde comprar yerba mate y productos latinoamericanos en Israel:**

1. **Supermercados de cadena:** Grandes superficies como **Tiv Taam** y **Keshet Teamim** cuentan de forma habitual con góndolas de importación donde consigues marcas tradicionales de yerba y dulce de leche.
2. **Tiendas comunitarias y online:** Plataformas como *El Gaucho Market*, *Mate Israel* y emprendimientos locales en grupos de Olim realizan envíos a todo el país.
3. **Mercados tradicionales:** En el **Shuk HaCarmel** / **Shuk Levinsky** (Tel Aviv) y **Mahane Yehuda** (Jerusalén) existen puestos de especias con productos regionales.`,
      source: null
    });
  }

  // Cuenta bancaria y Sal Klitá
  if (q.includes('sal klit') || (q.includes('cuenta') && (q.includes('banco') || q.includes('abrir') || q.includes('informo') || q.includes('teudat')))) {
    return res.status(200).json({
      text: `🏦 **Cómo Abrir tu Cuenta Bancaria e Informar al Misrad HaAliyah:**

1. **Abrir la cuenta en el banco:** Acude a una sucursal bancaria con tu libreta de Teudat Olé, Teudat Zehut provisoria de papel y pasaporte extranjero.
2. **Pedir el comprobante de cuenta:** Exige el certificado oficial llamado **Ishur Nihul Jeshbón** (אישור ניהול חשבון) o un cheque anulado donde conste tu titularidad y número de cuenta.
3. **Presentarlo ante Misrad HaAliyah:**
   - Entrégaselo a tu asesor personal (**póked**) en tu oficina local.
   - O envíalo escaneado/fotografiado por correo al asesor o mediante la zona personal en **gov.il**.
4. **Depósito del Sal Klitá:** Con los datos ingresados, las cuotas mensuales restantes se transferirán automáticamente a tu cuenta.`,
      source: null
    });
  }

  // Canje de licencia de conducir (>5 años)
  if (q.includes('licencia') && (q.includes('canje') || q.includes('canjeo') || q.includes('5 años') || q.includes('extranjera') || q.includes('conducir'))) {
    return res.status(200).json({
      text: `🚗 **Canje de Licencia de Conducir Extranjera (>5 años de antigüedad):**

Si tu licencia extranjera cuenta con más de 5 años de antigüedad demostrable:
- **Exención total:** Realizas la convalidación **sin rendir examen práctico ni teórico**.

📋 **Pasos Obligatorios:**
1. **Tofes Yarok:** Completa la solicitud en línea en la web de Misrad HaRishuí (Ministerio de Transporte).
2. **Examen visual:** Realiza el control oftalmológico en una óptica habilitada (Bedikat Einaim).
3. **Turno en Misrad HaRishuí:** Reserva tu cita presencial por la plataforma **MyVisit**.
4. **Documentación:** Presenta tu Teudat Zehut, Teudat Olé, pasaporte y la licencia física de conducir original de tu país de origen.`,
      source: null
    });
  }

  // Tofes 101 y retenciones de Mas Hajnasá
  if (q.includes('101') || (q.includes('mas hajnas') && (q.includes('reteng') || q.includes('impuesto')))) {
    return res.status(200).json({
      text: `📑 **Cómo completar el Tofes 101 y validar puntos de crédito (Mas Hajnasá):**

1. **Momento de presentación:** Al iniciar cualquier relación laboral o al inicio de cada año fiscal (enero).
2. **Puntos de Crédito (Nekudot Zijui):** En la sección de datos personales, tilda la casilla de **Olé Jadash** y adjunta copia de tu **Teudat Olé**.
3. **Beneficio fiscal:** Durante tus primeros 42 meses en Israel recibes deducciones fiscales adicionales que reducen significativamente el impuesto a las ganancias.
4. **Control en recibo de sueldo:** Revisa en tu primer **tlush sajar** que aparezcan computadas tus Nekudot Zijui correspondientes.`,
      source: null
    });
  }

  // Ayuda de alquiler mes 30
  if (q.includes('mes 30') || (q.includes('alquiler') && (q.includes('corta') || q.includes('termina') || q.includes('finaliza')))) {
    return res.status(200).json({
      text: `🏠 **Finalización de la ayuda de alquiler en el mes 30:**

- **Duración máxima de Misrad HaAliyah:** La asistencia de alquiler (**Siyua bi'Sjirot**) se abona por un plazo reglamentario improrrogable de **24 meses consecutivos** (del mes 7 al mes 30 de Aliá).
- **Mes 31 en adelante:** El subsidio concluye por ley para todos los inmigrantes.
- **Continuidad por bajos ingresos:** Si tu hogar cumple con los baremos de vulnerabilidad económica, puedes iniciar una nueva solicitud de asistencia habitacional ante el **Ministerio de Construcción y Vivienda (Misrad HaBinui VeHaShikún)**.`,
      source: null
    });
  }

  // Teum Mas / 2 trabajos / 47%
  if (q.includes('teum mas') || q.includes('47%') || q.includes('2 trabajos') || q.includes('dos trabajos')) {
    return res.status(200).json({
      text: `⚠️ **Dos trabajos simultáneos: Cómo hacer el Teum Mas y evitar la retención del 47%:**

Sin coordinación de impuestos, el segundo empleador tiene la obligación legal de retener la tasa máxima aplicable.

📋 **Pasos:**
1. **Solicitar el Tik Nikuyim:** Pide a cada empleador su número de registro patronal de 9 dígitos.
2. **Trámite digital:** Ingresa al portal de **Rashut HaMisim** (Autoridad Tributaria) en la sección **Teum Mas Online**.
3. **Declarar ingresos:** Asigna tu empleo principal (con puntos de crédito) y tu empleo secundario con el sueldo proyectado.
4. **Entrega de constancia:** Descarga el certificado oficial generado y entrégalo en el departamento de nóminas de tu segundo empleo.`,
      source: null
    });
  }

  // Pikud HaOref y derechos laborales
  if (q.includes('pikud') || q.includes('haoref') || (q.includes('despedir') && q.includes('vacaciones'))) {
    return res.status(200).json({
      text: `🛡️ **Directivas de Pikud HaOref y Protección Laboral:**

1. **Prohibición de despido:** La ley laboral prohíbe el despido de trabajadores impedidos de asistir a sus tareas por alertas de seguridad de **Pikud HaOref**, falta de refugio reglamentario (**Mamad/Miklat**) accesible o cuidado de hijos menores ante suspensión de clases.
2. **Días de vacaciones:** El empleador no puede forzar descuentos que dejen tu balance de vacaciones acumuladas en números negativos sin tu consentimiento.
3. **Regulaciones salariales:** En emergencias de seguridad nacional rigen acuerdos marco supervisados por el Ministerio de Trabajo y Bituaj Leumi para compensaciones extraordinarias.`,
      source: null
    });
  }

  // Celular y Rav-Kav
  if ((q.includes('celular') || q.includes('telefono')) && (q.includes('rav-kav') || q.includes('rav kav') || q.includes('transporte'))) {
    return res.status(200).json({
      text: `📱 **Número de celular y transporte público (Rav-Kav):**

1. **Línea celular israelí:** Es indispensable tramitarla de inmediato con tu pasaporte o Teudat Zehut en sucursales de empresas locales (Partner, Cellcom, Pelephone, HOT Mobile, Golan Telecom o 019).
2. **Tarjeta Rav-Kav:** 
   - La tarjeta física gratuita con perfil de Olé se tramita en las estaciones centrales **Al HaKav** (tren Savidor Merkaz, HaShalom o aeropuerto).
   - También puedes abonar viajes validando directamente con aplicaciones móviles como **Moovit**, **HopOn** o **Rav-Kav Online**.`,
      source: null
    });
  }

  // Urgencias y Miún
  if (q.includes('miun') || q.includes('miún') || q.includes('hospital') || q.includes('guardia')) {
    return res.status(200).json({
      text: `⚠️ **Pautas de atención en Guardia Médica (Miún):**

La atención hospitalaria espontánea sin derivación formal (**hafniá**) genera costos elevados.
1. Consulta primero con tu centro médico barrial o la línea médica 24/7 de tu Kupá.
2. Para urgencias vespertinas o de fin de semana, recurre a centros intermedios como **Terem** (*2884) o centros de urgencia de tu prestador.
3. Acude a la sala de emergencias de un hospital únicamente ante riesgo inminente de vida, derivación médica autorizada o internación directa.`,
      source: null
    });
  }

  // ==========================================
  // 2. LLAMADA DIRECTA A GEMINI REST (SIN LIBRERÍAS EXTERNAS)
  // ==========================================
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      for (const model of models) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: currentQuery }] }],
              systemInstruction: {
                parts: [{
                  text: 'Eres el Asistente Experto de Olim Conectados para nuevos inmigrantes en Israel. Responde con calidez, claridad y rigor práctico en español. Explica siempre paso a paso los trámites gubernamentales citando los organismos oficiales (Misrad HaAliyah, Bituaj Leumi, Misrad HaPnim, Kupot Jolim).'
                }]
              },
              generationConfig: {
                temperature: 0.25
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return res.status(200).json({ text: generatedText, source: null });
          }
        }
      }
    } catch (e) {
      console.warn('Fallback a respuesta asistida local:', e);
    }
  }

  // Respuesta orientativa final protegida si no hay conexión externa
  return res.status(200).json({
    text: `Para recibir asesoramiento específico sobre trámites de Aliyah en Israel, puedes consultar los temas clave en el menú superior o formular tu pregunta indicando el organismo correspondiente (Misrad HaAliyah, Bituaj Leumi, Misrad HaPnim o tu Kupat Jolim).`,
    source: null
  });
}
