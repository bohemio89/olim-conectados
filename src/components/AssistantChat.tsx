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
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Clock
} from 'lucide-react';
import { ChatMessage } from '../types';

export const AssistantChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `¡Hola! Soy el Asistente Inteligente de **Olim Conectados**. Mi objetivo es protegerte de errores costosos y trámites burocráticos ("trampas del sistema") en Israel:

⚠️ **Alerta Rápida:**
Si estás pensando en ir a la guardia de un hospital (**Miún** [מיון]) o llamaste a **MADA** (101), recuerda que **sin derivación (hafniá) o internación te cobrarán cientos de shékels**.

¿En qué puedo guiarte hoy? Puedes seleccionar una de las consultas frecuentes abajo o escribirme tu caso con total libertad.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const samplePrompts = [
    '🚨 ¿Puedo ir directo al Miún si tengo fiebre de noche?',
    '💰 ¿Por qué dejé de cobrar la ayuda de alquiler en el mes 30?',
    '📑 Tengo 2 trabajos: ¿Cómo hago el Teum Mas para que no me retengan el 47%?',
    '🛡️ ¿Me pueden despedir o descontar vacaciones por alarma de Pikud HaOref?',
    '🛂 ¿Puedo viajar al exterior con Teudat Ma\'avar antes de cumplir 1 año?',
    '💼 Tengo tendinitis en la muñeca por mi trabajo: ¿Qué hago con Bituaj Leumi?',
    '🧮 Me dieron 5 días de reposo por enfermedad: ¿Cuánto me descuentan?',
    '🚗 ¿Cómo canjeo mi licencia de conducir si está vencida?',
    '📑 ¿Cómo lleno el Tofes 101 para que no me retengan Mas Hajnasá?',
    '⏰ ¿A qué hora abren turnos en MyVisit para no esperar meses?',
    '🎓 ¿Cómo funciona el voucher de 5.200 NIS para Ulpán privado?',
    '🥩 ¿Dónde compro yerba mate y cortes criollos como vacío o entraña?',
    '☕ ¿Dónde puedo tomar un café con medialunas o facturas (Amapola)?',
    '🥟 ¿Qué emprendimientos de Olim venden empanadas caseras por encargo?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: query,
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Disculpa, no pude procesar la consulta en este momento.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error al consultar chat:', error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Hubo un inconveniente al conectar con el servidor, pero aquí tienes la orientación básica:

Para trámites de salud, pide siempre tu derivación (**hafniá**) antes de ir a **Miún**. Para accidentes laborales, solicita de inmediato el **BL 250** a tu empleador y asienta la causa laboral ("be-avodá") ante el médico.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Top Helper Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 flex items-center gap-2">
              Asistente Inteligente de Olim Conectados
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-full">
                Online 24/7
              </span>
            </h1>
            <p className="text-xs text-gray-500">
              Respuestas con alertas económicas, pasos cronológicos y vocabulario en hebreo
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          title="Reiniciar chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nueva Consulta</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3.5">
        <span className="text-[11px] font-bold text-blue-900 block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Consultas críticas frecuentes (clic para enviar):
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="text-left text-xs bg-white hover:bg-blue-600 hover:text-white text-gray-700 border border-blue-200 px-3 py-1.5 rounded-xl transition shadow-2xs font-medium disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
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
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-50 text-gray-800 border border-gray-200 rounded-tl-none space-y-2'
                  }`}
                >
                  {/* Assistant response rendering */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  {/* Footer of message */}
                  <div
                    className={`flex items-center justify-between text-[10px] mt-2 pt-1 border-t ${
                      isUser ? 'border-blue-500/50 text-blue-200' : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="hover:text-blue-600 flex items-center gap-1 font-semibold transition"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
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
            <div className="flex gap-3 items-center text-xs text-gray-500 italic p-2 bg-gray-50 rounded-xl border border-gray-200 max-w-xs">
              <Bot className="w-4 h-4 text-blue-600 animate-spin" />
              <span>El Asistente está consultando la normativa...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50/50 rounded-b-2xl">
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
              className="flex-1 text-xs sm:text-sm px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
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

          <p className="text-[10px] text-gray-400 text-center mt-2">
            La información previene trampas comunes del sistema israelí pero no reemplaza el dictamen médico oficial ni asesoramiento legal vinculante.
          </p>
        </div>
      </div>
    </div>
  );
};
