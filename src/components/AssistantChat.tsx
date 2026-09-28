import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  Copy, 
  Check, 
  RotateCcw, 
  User, 
  Info,
  ThumbsUp,
  ThumbsDown,
  X,
  Stethoscope,
  FileText,
  Coffee,
  Clock
} from 'lucide-react';
import { ChatMessage } from '../types';
import { EmergencyButton } from './EmergencyButton';

export type UserStage = 'general' | 'recien_llegado' | 'emergencia' | 'tramite';

interface CategorizedPrompt {
  id: string;
  category: 'salud' | 'tramites' | 'vida';
  stage: UserStage[];
  text: string;
  badge?: string;
}

const CATEGORIZED_PROMPTS: CategorizedPrompt[] = [
  // 🏥 Salud y Emergencias
  {
    id: 'p-kupa-activar',
    category: 'salud',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo activo mi cobertura y credencial magnética en Maccabi o Clalit?',
    badge: 'Kupat Jolim'
  },
  {
    id: 'p-1',
    category: 'salud',
    stage: ['general', 'emergencia', 'recien_llegado'],
    text: '¿Puedo ir directo al Miún de noche sin pagar factura de guardia?',
    badge: 'Urgente'
  },
  {
    id: 'p-4',
    category: 'salud',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo pido turno con un médico que hable español en mi Kupá?',
    badge: 'Médico'
  },
  {
    id: 'p-2',
    category: 'salud',
    stage: ['general', 'emergencia', 'tramite'],
    text: 'Tengo tendinitis o dolor por mi trabajo: ¿Qué hago con Bituaj Leumi y el BL 250?',
    badge: 'Accidente Laboral'
  },
  {
    id: 'p-3',
    category: 'salud',
    stage: ['general', 'tramite'],
    text: 'Me dieron días de reposo médico: ¿Cómo se calculan y cuánto descuentan?',
    badge: 'Días Majalá'
  },

  // 📋 Trámites y Derechos de Recién Llegados & Absorción
  {
    id: 'p-negocio',
    category: 'tramites',
    stage: ['general', 'recien_llegado', 'tramite'],
    text: '¿Cómo funciona el asesoramiento oficial gratuito para abrir un negocio (*2994 y Maalot)?',
    badge: 'Plan de Negocio'
  },
  {
    id: 'p-olei-ayuda',
    category: 'tramites',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo me ayuda la OLEI para acompañarme al banco y trámites de Kupat Jolim?',
    badge: 'Apoyo OLEI'
  },
  {
    id: 'p-banco-ole',
    category: 'tramites',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo abro mi cuenta bancaria con la Teudat Olé provisoria?',
    badge: 'Banco'
  },
  {
    id: 'p-teudat-ole-vence',
    category: 'tramites',
    stage: ['general', 'recien_llegado'],
    text: '¿Qué vigencia y plazos tienen los beneficios de la Teudat Olé?',
    badge: 'Teudat Olé'
  },
  {
    id: 'p-teudat-zehut-myvisit',
    category: 'tramites',
    stage: ['general', 'recien_llegado'],
    text: '¿Dónde y cómo saco turno en MyVisit para el Teudat Zehut biométrico?',
    badge: 'Teudat Zehut'
  },
  {
    id: 'p-sal-klita-banco',
    category: 'tramites',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo informo al Misrad HaAliyah mi cuenta para cobrar las cuotas del Sal Klitá?',
    badge: 'Sal Klitá'
  },
  {
    id: 'p-8',
    category: 'tramites',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo canjeo mi licencia de conducir extranjera de más de 5 años?',
    badge: 'Licencia'
  },
  {
    id: 'p-7',
    category: 'tramites',
    stage: ['general', 'tramite'],
    text: '¿Cómo lleno el Tofes 101 para que no me retengan Mas Hajnasá de más?',
    badge: 'Empleo'
  },
  {
    id: 'p-5',
    category: 'tramites',
    stage: ['general', 'tramite'],
    text: '¿Por qué se corta la ayuda de alquiler del Ministerio en el mes 30?',
    badge: 'Subsidio Alquiler'
  },
  {
    id: 'p-6',
    category: 'tramites',
    stage: ['general', 'tramite'],
    text: 'Tengo 2 trabajos simultáneos: ¿Cómo hago el Teum Mas para evitar el 47%?',
    badge: 'Impuestos'
  },
  {
    id: 'p-10',
    category: 'tramites',
    stage: ['general', 'tramite'],
    text: 'Terminé el Ulpán estatal: ¿Cómo funciona el voucher de 5.200 NIS para Ulpán privado?',
    badge: 'Ulpán Privado'
  },
  {
    id: 'p-11',
    category: 'tramites',
    stage: ['general', 'tramite'],
    text: '¿Me pueden despedir o descontar vacaciones por directivas de Pikud HaOref?',
    badge: 'Emergencia Civil'
  },

  // ☕ Vida Cotidiana & Social
  {
    id: 'p-sim-telefono',
    category: 'vida',
    stage: ['general', 'recien_llegado'],
    text: '¿Cómo consigo número de celular israelí y tarjeta Rav-Kav de transporte?',
    badge: 'Llegada'
  },
  {
    id: 'p-12',
    category: 'vida',
    stage: ['general', 'recien_llegado'],
    text: '¿Dónde se puede comprar yerba mate y productos importados en Israel?',
    badge: 'Compras'
  },
];

interface AssistantChatProps {
  onNavigateToTab?: (tabId: string) => void;
  initialQuery?: string;
}

export const AssistantChat: React.FC<AssistantChatProps> = ({ onNavigateToTab, initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `¡Hola! Soy el Asistente Inteligente de **Olim Conectados**. Mi objetivo es protegerte de errores costosos y trámites burocráticos ("trampas del sistema") en Israel:

⚠️ **Alerta Rápida:**
Si estás pensando en ir a la guardia de un hospital (**Miún** [מיון]) o llamaste a **MADA** (101), recuerda que **sin derivación (hafniá) o internación te cobrarán cientos de shékels**.

¿En qué puedo guiarte hoy? Puedes seleccionar tu momento arriba, tocar una de las consultas categorizadas abajo o escribirme tu caso con total libertad.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User Stage selector
  const [userStage, setUserStage] = useState<UserStage>('general');

  // Feedback store: messageId -> 'up' | 'down'
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>(() => {
    try {
      const saved = localStorage.getItem('olim_chat_feedback');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Onboarding modal dismiss state
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('olim_onboarding_dismissed');
    } catch {
      return true;
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Execute initial query if passed via search bar
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem('olim_onboarding_dismissed', 'true');
    } catch {}
  };

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    setFeedbackState((prev) => {
      const updated = { ...prev, [messageId]: type };
      try {
        localStorage.setItem('olim_chat_feedback', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    fetch('/api/chat-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, type, timestamp: new Date().toISOString() }),
    }).catch(() => {});
  };

  const lastUserQueryRef = useRef<string>('');

  const handleSendMessage = async (textToSend?: string) => {
    const rawQuery = textToSend !== undefined ? textToSend : inputQuery;
    const query = (typeof rawQuery === 'string' ? rawQuery : '').trim();
    if (!query || isLoading) return;

    lastUserQueryRef.current = query;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const sanitizedHistory = messages
      .filter((m) => m && typeof m.content === 'string' && m.content.trim() && !m.id?.startsWith('err-') && m.id !== 'welcome')
      .map((m) => ({
        id: m.id,
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content.trim(),
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    const payload = {
      userQuery: query,
      userStage,
      messages: [...sanitizedHistory, { role: 'user', content: query }],
    };

    let responseData: { text?: string } | null = null;
    let lastError: any = null;

    // Retry mechanism: 2 attempts with silent 1.5s backoff before displaying error
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000);

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errBody = await response.text().catch(() => '');
          throw new Error(`HTTP ${response.status} (${response.statusText}): ${errBody.slice(0, 150)}`);
        }

        const data = await response.json();
        responseData = data;
        break;
      } catch (err: any) {
        lastError = err;
        console.warn(`[AssistantChat] Intento ${attempt}/2 fallido:`, {
          error: err?.message || String(err),
          status: err?.status,
          queryPreview: query.slice(0, 100),
          attempt,
          timestamp: new Date().toISOString(),
        });

        if (attempt === 1) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }
    }

    if (responseData && responseData.text) {
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      return;
    }

    console.error('[AssistantChat] Error definitivo al consultar endpoint /api/chat:', {
      error: lastError?.message || String(lastError),
      name: lastError?.name,
      payloadSent: {
        queryLength: query.length,
        queryPreview: query.slice(0, 120),
        historyCount: sanitizedHistory.length,
        stage: userStage,
      },
      timestamp: new Date().toISOString(),
    });

    const cleanErrorMessage = `⚠️ Ocurrió una interrupción momentánea de conexión al consultar el asistente. Por favor, vuelve a enviar tu pregunta en unos segundos.`;

    const errorMessage: ChatMessage = {
      id: `err-${Date.now()}`,
      role: 'assistant',
      content: cleanErrorMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, errorMessage]);
    setIsLoading(false);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversación reiniciada. ¿Qué trámite, duda de salud o consulta laboral deseas resolver?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const availablePrompts = CATEGORIZED_PROMPTS.filter((p) => {
    if (userStage === 'general') return true;
    return p.stage.includes(userStage);
  });

  const saludPrompts = availablePrompts.filter((p) => p.category === 'salud');
  const tramitesPrompts = availablePrompts.filter((p) => p.category === 'tramites');
  const vidaPrompts = availablePrompts.filter((p) => p.category === 'vida');

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Alerta Miún */}
      <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs uppercase tracking-wider text-amber-900">
                Alerta Clave de Salud en Israel
              </span>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">
                Evitar Facturas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              No vayas a la guardia hospitalaria (<strong>Miún</strong>) por fiebre o malestar espontáneo sin derivación previa (<strong>Hafniá</strong>). Podrías recibir una factura de cientos de shékels.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('emergency')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 underline px-2 py-1"
            >
              Ver guía Miún
            </button>
          )}
          <EmergencyButton
            variant="solid"
            onClick={() => onNavigateToTab ? onNavigateToTab('emergency') : null}
            className="w-full sm:w-auto text-xs py-2 px-3"
          />
        </div>
      </div>

      {/* Onboarding Banner */}
      {showOnboarding && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 relative shadow-xs">
          <button
            onClick={handleDismissOnboarding}
            className="absolute top-3.5 right-3.5 p-1 text-gray-400 hover:text-gray-700 hover:bg-white/80 rounded-lg transition"
            aria-label="Cerrar guía de bienvenida"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-8">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-blue-950">
                ¡Bienvenido al Asistente Inteligente para Olim!
              </h2>
              <p className="text-xs sm:text-sm text-blue-900/90 leading-relaxed">
                Podés preguntarle sobre trámites (Teudat Olé, Tofes 101, Bituaj Leumi), cómo no pagar de más en guardias médicas o dónde encontrar vida nocturna y productos latinos. La información se revisa con fuentes oficiales de Israel periódicamente.
              </p>
              <div className="pt-1.5 flex items-center gap-3 text-[11px] font-semibold text-blue-700">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-blue-600" /> Respuestas en español claro
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-blue-600" /> Alertas económicas y pasos
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              Asistente Inteligente de Olim Conectados
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-full hidden xs:inline">
                Online 24/7
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Respuestas con alertas económicas, pasos cronológicos y vocabulario en hebreo
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition shrink-0"
          title="Reiniciar chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nueva Consulta</span>
        </button>
      </div>

      {/* Selector por Momento del Usuario */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600" />
            ¿En qué momento de tu vida en Israel estás?
          </span>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'general', label: 'Info General' },
              { id: 'recien_llegado', label: '👋 Recién llegué' },
              { id: 'emergencia', label: '🚨 Tengo una emergencia' },
              { id: 'tramite', label: '📑 Trámite en curso' },
            ].map((stg) => (
              <button
                key={stg.id}
                onClick={() => setUserStage(stg.id as UserStage)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                  userStage === stg.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stg.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chips de preguntas frecuentes */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-xs sm:text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Consultas críticas frecuentes (tocá una para enviar):
          </span>
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Filtro: {userStage === 'general' ? 'Todas' : userStage}
          </span>
        </div>

        {/* Grupo 1: Salud y Emergencias */}
        {saludPrompts.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
              🏥 Salud y Emergencias:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {saludPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendMessage(p.text)}
                  disabled={isLoading}
                  className="text-left text-xs bg-rose-50/50 hover:bg-rose-100/90 text-rose-950 border border-rose-200/80 p-2.5 rounded-xl transition shadow-2xs font-medium disabled:opacity-50 flex items-start justify-between gap-2"
                >
                  <span className="leading-snug">{p.text}</span>
                  {p.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-rose-200/80 text-rose-800 shrink-0">
                      {p.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grupo 2: Trámites y Derechos */}
        {tramitesPrompts.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              📋 Trámites y Derechos:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tramitesPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendMessage(p.text)}
                  disabled={isLoading}
                  className="text-left text-xs bg-blue-50/50 hover:bg-blue-100/90 text-blue-950 border border-blue-200/80 p-2.5 rounded-xl transition shadow-2xs font-medium disabled:opacity-50 flex items-start justify-between gap-2"
                >
                  <span className="leading-snug">{p.text}</span>
                  {p.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-blue-200/80 text-blue-800 shrink-0">
                      {p.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grupo 3: Vida Cotidiana & Social */}
        {vidaPrompts.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-amber-600" />
              ☕ Vida Cotidiana:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {vidaPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendMessage(p.text)}
                  disabled={isLoading}
                  className="text-left text-xs bg-amber-50/50 hover:bg-amber-100/90 text-amber-950 border border-amber-200/80 p-2.5 rounded-xl transition shadow-2xs font-medium disabled:opacity-50 flex items-start justify-between gap-2"
                >
                  <span className="leading-snug">{p.text}</span>
                  {p.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-800 shrink-0">
                      {p.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col h-[540px]">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const feedback = feedbackState[msg.id];
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-base leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-50 text-gray-900 border border-gray-200 rounded-tl-none space-y-3'
                  }`}
                >
                  {/* Assistant response rendering */}
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-base leading-relaxed">
                    {msg.content}
                  </div>

                  {/* Botón de reintento en caso de error */}
                  {msg.id?.startsWith('err-') && lastUserQueryRef.current && (
                    <div className="pt-1">
                      <button
                        onClick={() => handleSendMessage(lastUserQueryRef.current)}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100/90 hover:bg-blue-200 border border-blue-300 rounded-lg transition shadow-2xs disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reintentar consulta
                      </button>
                    </div>
                  )}

                  {/* Footer of message: Timestamp + Copy + Feedback */}
                  <div
                    className={`flex items-center justify-between text-[11px] pt-1 border-t ${
                      isUser ? 'border-blue-500/50 text-blue-200' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-gray-100/80 px-2 py-0.5 rounded-lg border border-gray-200">
                          <span className="text-[10px] text-gray-400 mr-1">¿Útil?</span>
                          <button
                            onClick={() => handleFeedback(msg.id, 'up')}
                            className={`p-1 rounded hover:bg-white transition ${
                              feedback === 'up' ? 'text-emerald-600 font-bold' : 'text-gray-400 hover:text-emerald-600'
                            }`}
                            title="Respuesta útil"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'down')}
                            className={`p-1 rounded hover:bg-white transition ${
                              feedback === 'down' ? 'text-rose-600 font-bold' : 'text-gray-400 hover:text-rose-600'
                            }`}
                            title="Respuesta incompleta o inexacta"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="hover:text-blue-600 flex items-center gap-1 font-semibold transition"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-gray-500 italic p-2.5 bg-gray-50 rounded-xl border border-gray-200 max-w-xs">
              <Bot className="w-4 h-4 text-blue-600 animate-spin" />
              <span>El Asistente está cotejando la normativa...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Disclaimer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50/50 rounded-b-2xl space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu consulta sobre salud, trámites, Bituaj Leumi o trabajo..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 text-xs sm:text-base px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs text-gray-900"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-xs disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center pt-0.5">
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>
              Esta información es orientativa y no reemplaza asesoramiento profesional, legal o médico. Verificá siempre con la fuente oficial correspondiente.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
