import React, { useState, useEffect, useRef } from 'react';
import { MessageCirclePlus, X, Send, Sparkles, Bot, User, Check, Copy } from 'lucide-react';
import { SECTIONS, SECTION_MAP } from '../data/navigation';
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
  // Speech bubble greeting auto-dismiss
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingBubble(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  // Determine section context hint
  const currentSection = SECTION_MAP[activeTab];
  const contextHint = currentSection
    ? currentSection.contextPromptHint
    : 'Preguntame sobre salud, trámites, Bituaj Leumi o adaptación en Israel.';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-floating',
      role: 'assistant',
      content: `¡Hola! Soy el **Asistente IA de Olim Conectados** 🇮🇱.
Puedo responderte sobre médicos de habla hispana, cómo evitar cobros de guardia en el **Miún**, trámites de **Bituaj Leumi**, subsidio de alquiler o el **Sal Klitá**.

Escribí tu consulta abajo o tocá una de las preguntas sugeridas:`,
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
        content: data.text || 'Entendido. ¿Tenés alguna otra duda sobre tu Aliyah o trámites en Israel?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Ocurrió un error de conexión al consultar el asistente. Por favor verificá tu conexión o intentá nuevamente en unos instantes.',
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
      {/* 1. Floating Circular Trigger Bubble */}
      <div className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-40 flex items-center gap-3">
        {/* Ephemeral Greeting Balloon matching reference screenshot */}
        {!isOpen && (
          <div 
            onClick={onToggle}
            className="flex items-center gap-2 bg-white text-[#0E2559] px-4 py-2 rounded-full shadow-lg border border-[#0E2559]/10 text-xs font-bold cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <span>¿Buscás un médico en español?</span>
          </div>
        )}

        {/* Circular Action Button: 72px desktop / 60px mobile */}
        <button
          onClick={onToggle}
          type="button"
          aria-label={isOpen ? 'Cerrar asistente IA' : 'Abrir Asistente IA Olim'}
          title="Asistente IA Olim · En línea"
          className="relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-[#0E2559] via-[#123377] to-[#1F5F8B] text-white shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center border-2 border-white/80 group"
        >
          {/* Green Online Status Indicator */}
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />

          {isOpen ? (
            <X className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <MessageCirclePlus className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-200 group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* 2. Floating Chat Panel: 410px × 610px (Sheet on mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 md:right-8 z-50 w-full sm:w-[410px] h-full sm:h-[610px] max-h-full sm:max-h-[85vh] bg-white sm:rounded-3xl shadow-2xl border border-[#0E2559]/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-label="Panel Asistente IA Olim"
        >
          {/* Header */}
          <div className="bg-[#0E2559] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#E8A33D]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight">
                    Asistente IA Olim
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    En línea
                  </span>
                </div>
                <p className="text-[10px] text-white/70">Respuestas verificadas en español rioplatense</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Context Topic Strip (cambia según la sección activa) */}
          <div className="bg-[#FBF3E6] border-b border-[#0E2559]/10 px-4 py-2.5 text-[11.5px] text-[#0E2559] flex items-start gap-2 shrink-0">
            <Sparkles className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="text-[#0E2559] font-bold">Contexto actual: </strong>
              <span className="text-[#0E2559]/90">{contextHint}</span>
            </p>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF7F2]">
            {messages.map((m) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-[#0E2559] text-white flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-[#E8A33D]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isAssistant
                        ? 'bg-white text-[#0E2559] border border-[#0E2559]/10'
                        : 'bg-[#0E2559] text-white font-medium rounded-br-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">{m.content}</div>

                    <div className="mt-1.5 flex items-center justify-between gap-2 text-[10px] opacity-70">
                      <span>{m.timestamp}</span>
                      {isAssistant && m.id !== 'welcome-floating' && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="hover:opacity-100 flex items-center gap-1 p-0.5"
                          title="Copiar texto"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-[#E8A33D] text-[#0E2559] flex items-center justify-center shrink-0 mt-1 font-black text-xs">
                      <User className="w-4 h-4 text-[#0E2559]" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#0E2559]/70 italic py-1">
                <div className="w-7 h-7 rounded-lg bg-[#0E2559] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#E8A33D] animate-spin" />
                </div>
                <span>Pensando respuesta con fuentes oficiales...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Fast suggestions */}
          <div className="px-3 py-2 bg-white border-t border-[#0E2559]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
            <button
              onClick={() => handleSendMessage('¿Cómo pido turno con un médico en español?')}
              className="px-2.5 py-1 rounded-lg bg-[#FBF3E6] hover:bg-[#F2E7D5] text-[#0E2559] font-semibold whitespace-nowrap border border-[#0E2559]/10 shrink-0"
            >
              🩺 Médicos en español
            </button>
            <button
              onClick={() => handleSendMessage('¿Cuándo me cobran si voy al Miún sin derivación?')}
              className="px-2.5 py-1 rounded-lg bg-[#FBF3E6] hover:bg-[#F2E7D5] text-[#0E2559] font-semibold whitespace-nowrap border border-[#0E2559]/10 shrink-0"
            >
              🚨 Evitar cobro en Miún
            </button>
            <button
              onClick={() => handleSendMessage('¿Qué es el Sal Klitá y qué cuenta bancaria necesito?')}
              className="px-2.5 py-1 rounded-lg bg-[#FBF3E6] hover:bg-[#F2E7D5] text-[#0E2559] font-semibold whitespace-nowrap border border-[#0E2559]/10 shrink-0"
            >
              💰 Sal Klitá
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#0E2559]/10 shrink-0">
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
                placeholder="Escribí tu consulta en español..."
                className="flex-1 bg-[#FBF3E6] border border-[#0E2559]/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0E2559] placeholder-[#0E2559]/50 focus:outline-none focus:ring-2 focus:ring-[#0E2559]/40"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-[#E8A33D] hover:bg-[#d6922e] text-[#0E2559] font-black flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-xs"
                title="Enviar mensaje"
              >
                <Send className="w-4 h-4 text-[#0E2559]" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
