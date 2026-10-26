import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCirclePlus, 
  X, 
  Send, 
  Bot, 
  User, 
  Check, 
  Copy,
  Stethoscope,
  Landmark,
  Home as HomeIcon,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck
} from 'lucide-react';
import { LogoSymbol } from './LogoSymbol';
import { ChatMessage } from '../types';

interface FloatingAssistantProps {
  activeTab: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  presetQuery?: string;
  onNavigateToTab?: (tabId: string) => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  activeTab,
  isOpen,
  onToggle,
  onClose,
  presetQuery,
  onNavigateToTab,
}) => {
  // Requirement 4: En la página /asistente la burbuja no se muestra
  if (activeTab === 'assistant') {
    return null;
  }

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-floating',
      role: 'assistant',
      content: `¡Hola! Soy el **Asistente de Olim Conectados**. Pregúntame en español sobre trámites, salud o la vida en Israel. Te respondo corto y con la fuente oficial.`,
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
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Handle preset query sent from Index FAQ cards or topbar search
  useEffect(() => {
    if (presetQuery && presetQuery.trim()) {
      handleSendMessage(presetQuery);
    }
  }, [presetQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (typeof textToSend === 'string' ? textToSend : inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    const historyForApi = messages
      .filter((m) => m.id !== 'welcome-floating' && !m.id.startsWith('err-'))
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    const payload = {
      userQuery: query,
      userStage: 'general',
      messages: [...historyForApi, { role: 'user', content: query }],
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Entendido. ¿Tienes alguna otra duda sobre tu Aliyah o trámites en Israel?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Ocurrió un error de conexión al consultar el asistente. Por favor verifica tu conexión o intenta nuevamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* ========================================================
          4. BURBUJA FLOTANTE (Trigger Button)
          - Celular: arriba de barra inferior (bottom: 88px), de 58 px.
          - Notebook: globo "hidden sm:flex" que dice "¿Tienes una duda? Pregúntame".
          ======================================================== */}
      {!isOpen && (
        <div className="fixed bottom-[88px] right-4 sm:bottom-8 sm:right-8 z-40 flex items-center gap-3">
          {/* Globo de texto al lado de la burbuja (solo en notebook: hidden sm:flex) */}
          <div 
            onClick={onToggle}
            className="hidden sm:flex items-center gap-2 bg-white text-[#0E2559] px-4 py-2.5 rounded-full shadow-lg border border-[#0E2559]/10 text-sm font-bold cursor-pointer transition-all duration-300 hover:scale-105 min-h-[44px]"
          >
            <span>¿Tienes una duda? Pregúntame</span>
          </div>

          {/* Botón Circular: 58px en celular, 68px en notebook */}
          <button
            onClick={onToggle}
            type="button"
            aria-label="Abrir Asistente de Olim Conectados"
            title="Asistente de Olim Conectados"
            className="relative w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#0E2559] hover:bg-[#16336f] text-white shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center border-2 border-white group"
          >
            <MessageCirclePlus className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-200 group-hover:scale-110" />
          </button>
        </div>
      )}

      {/* ========================================================
          5. PANEL DEL ASISTENTE AL ABRIR LA BURBUJA
          - Celular: se abre desde abajo y ocupa el 86% del alto (h-[86vh]),
                     con el fondo oscurecido (backdrop).
          - Notebook: 400 px de ancho y alto hasta el borde de la pantalla menos 40 px
                     (sm:w-[400px] sm:h-[calc(100vh-40px)]).
          - Encabezado azul marino con logo, "Asistente de Olim Conectados",
            "En línea · respuestas con fuente oficial" y botón cerrar.
          - Abajo, 3 sugerencias (Médicos en español, Sal Klitá, Alquiler)
            y el campo "Escribe tu pregunta…".
          ======================================================== */}
      {isOpen && (
        <>
          {/* Fondo oscurecido en celular */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-[#0E2559]/60 backdrop-blur-xs z-50 sm:hidden animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Contenedor del panel / drawer */}
          <div 
            className="fixed inset-x-0 bottom-0 z-50 h-[86vh] rounded-t-3xl bg-white shadow-2xl border-t border-[#0E2559]/15 flex flex-col overflow-hidden sm:inset-auto sm:bottom-5 sm:right-8 sm:w-[400px] sm:h-[calc(100vh-40px)] sm:rounded-3xl sm:border sm:border-[#0E2559]/15 sm:shadow-2xl animate-in slide-in-from-bottom duration-300"
            role="dialog"
            aria-label="Asistente de Olim Conectados"
          >
            {/* Encabezado Azul Marino #0E2559 */}
            <div className="bg-[#0E2559] text-white px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shrink-0">
                  <LogoSymbol className="w-8 h-8 shrink-0" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                    Asistente de Olim Conectados
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-[11.5px] text-white/80 font-medium">
                      En línea · respuestas con fuente oficial
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón Cerrar (X) */}
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition flex items-center justify-center shrink-0"
                aria-label="Cerrar asistente"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F9F7F2]">
              {messages.map((m) => {
                const isAssistant = m.role === 'assistant';
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-[#0E2559] text-white flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-[#E8A33D]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs ${
                        isAssistant
                          ? 'bg-white text-[#0E2559] border border-[#0E2559]/10'
                          : 'bg-[#0E2559] text-white font-medium rounded-br-xs'
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">{m.content}</div>

                      {isAssistant && m.id !== 'welcome-floating' && (
                        <div className="mt-2.5 pt-2 border-t border-[#0E2559]/10 flex items-center justify-between text-xs text-[#0E2559]/70">
                          <span className="flex items-center gap-1 font-semibold text-[11px] text-emerald-700">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Fuente oficial
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopy(m.id, m.content)}
                              className="p-1 hover:text-[#0E2559] transition"
                              title="Copiar texto"
                              aria-label="Copiar"
                            >
                              {copiedId === m.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              type="button"
                              className="p-1 hover:text-[#0E2559] transition"
                              title="Útil"
                              aria-label="Respuesta útil"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              className="p-1 hover:text-[#0E2559] transition"
                              title="No útil"
                              aria-label="Respuesta no útil"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-[#E8A33D] text-[#0E2559] flex items-center justify-center shrink-0 mt-1 font-black text-xs">
                        <User className="w-4 h-4 text-[#0E2559]" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-2.5 items-center text-xs text-[#0E2559]/70 italic py-1">
                  <div className="w-7 h-7 rounded-full bg-[#0E2559] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#E8A33D] animate-spin" />
                  </div>
                  <span>Consultando fuentes oficiales...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3 Sugerencias Rápidas: Médicos en español, Sal Klitá, Alquiler */}
            <div className="px-3 py-2 bg-white border-t border-[#0E2559]/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => handleSendMessage('¿Cómo encuentro médicos que hablen español en mi Kupá?')}
                className="px-3.5 py-2 min-h-[44px] rounded-2xl bg-[#FFF9EE] hover:bg-[#FCECC9] border border-[#F2DEB0] text-[#0E2559] text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0"
              >
                <Stethoscope className="w-4 h-4 text-[#1F5F8B] shrink-0" />
                <span>Médicos en español</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('¿Cuánto es el Sal Klitá y cuáles son las fechas de pago?')}
                className="px-3.5 py-2 min-h-[44px] rounded-2xl bg-[#FFF9EE] hover:bg-[#FCECC9] border border-[#F2DEB0] text-[#0E2559] text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0"
              >
                <Landmark className="w-4 h-4 text-[#6B4FA0] shrink-0" />
                <span>Sal Klitá</span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('¿Cómo tramito la ayuda de alquiler para nuevos olim?')}
                className="px-3.5 py-2 min-h-[44px] rounded-2xl bg-[#FFF9EE] hover:bg-[#FCECC9] border border-[#F2DEB0] text-[#0E2559] text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0"
              >
                <HomeIcon className="w-4 h-4 text-[#2A7050] shrink-0" />
                <span>Alquiler</span>
              </button>
            </div>

            {/* Campo "Escribe tu pregunta…" */}
            <div className="p-3 bg-white border-t border-[#0E2559]/10 shrink-0 pb-[calc(12px+env(safe-area-inset-bottom,0px))]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Escribe tu pregunta…"
                  className="flex-1 bg-[#FBF3E6] border border-[#0E2559]/20 rounded-2xl px-4 py-2.5 text-sm sm:text-base text-[#0E2559] placeholder-[#0E2559]/50 focus:outline-none focus:ring-2 focus:ring-[#0E2559]/30 min-h-[44px]"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isLoading}
                  className="w-11 h-11 rounded-xl bg-[#E8A33D] hover:bg-[#df9932] text-[#0E2559] font-black flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-xs min-h-[44px] min-w-[44px]"
                  title="Enviar pregunta"
                  aria-label="Enviar pregunta"
                >
                  <Send className="w-5 h-5 text-[#0E2559]" />
                </button>
              </form>
            </div>

          </div>
        </>
      )}
    </>
  );
};
