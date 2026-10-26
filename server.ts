import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { SYSTEM_PROMPT, fallbackAnswer } from './api/chat';

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

const SYSTEM_INSTRUCTION = SYSTEM_PROMPT;

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
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-pro-preview'];

      for (const modelName of candidateModels) {
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const apiPromise = ai.models.generateContent({
              model: modelName,
              contents: formattedContents,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.2,
                maxOutputTokens: 600,
                thinkingConfig: { thinkingBudget: 0 },
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
  const fallbackText = generateRuleBasedResponse(currentQuery, messages);
  res.json({ text: fallbackText });
});

function generateRuleBasedResponse(query: string, history?: any[]): string {
  return fallbackAnswer(query);
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
        res.status(200).set({
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        }).end(template);
      } catch (e: any) {
        if (vite.ssrFixStacktrace) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    // Serve static files with distinct caching rules
    app.use(express.static(path.resolve(__dirname, 'dist'), {
      etag: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        } else if (filePath.includes('/assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    }));

    app.get('*', (req: Request, res: Response) => {
      res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      });
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
