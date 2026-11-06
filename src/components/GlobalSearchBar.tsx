import { ASSISTANT_ENABLED } from '../config';
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Bot, 
  FileText, 
  Stethoscope, 
  AlertTriangle, 
  ShoppingBag, 
  PartyPopper,
  CheckSquare,
  ShieldAlert,
  Car,
  Calculator,
  Briefcase
} from 'lucide-react';

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'question' | 'guide' | 'doctor' | 'service';
  tabId: string;
  description: string;
  queryToChat?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const STATIC_SEARCH_INDEX: SearchResultItem[] = [
  // Secciones del sitio (descripciones alineadas con el contenido verificado)
  {
    id: 's-emergencia',
    title: 'Guardia & Miún: a dónde ir y cuánto se paga',
    type: 'guide',
    tabId: 'emergency',
    description: 'Teléfonos 24/7 de las Kupot, cuándo ir al Miún y cuándo no se paga. Sin derivación puede costar más de 1.100 ₪.',
  },
  {
    id: 's-guerra',
    title: 'Guerra y emergencias: alarmas, trabajo y clases',
    type: 'guide',
    tabId: 'war',
    description: 'App de Pikud HaOref, qué hacer con la alarma, sueldo y vacaciones en emergencia, y clases.',
  },
  {
    id: 's-checklist',
    title: 'Checklist del Olé: tus pasos desde la llegada',
    type: 'guide',
    tabId: 'checklist',
    description: 'Teudat Olé, banco, Kupat Jolim, Teudat Zehut, Ulpán, Tofes 101 y Arnoná, con tu progreso guardado.',
  },
  {
    id: 's-crisis',
    title: 'Economía & Vida Civil: Sal Klitá, alquiler y Teum Mas',
    type: 'guide',
    tabId: 'crisis-civil',
    description: 'Pagos del Sal Klitá, ayuda de alquiler y cómo evitar que el segundo trabajo te descuente el 47%.',
  },
  {
    id: 's-bureaucracy',
    title: 'Trámites & Vouchers: Tofes 101, Ulpán, Arnoná y GoVisit',
    type: 'guide',
    tabId: 'bureaucracy',
    description: 'Puntos de crédito de olé, voucher para Ulpán privado, 90% de descuento de Arnoná y turnos en GoVisit.',
  },
  {
    id: 's-licencia',
    title: 'Licencia de conducir: canje o desde cero',
    type: 'guide',
    tabId: 'license',
    description: 'Si tu licencia extranjera se canjea, qué exámenes rindes y cómo sacarla desde cero.',
  },
  {
    id: 's-bituaj',
    title: 'Accidente de trabajo y Bituaj Leumi',
    type: 'guide',
    tabId: 'bituaj',
    description: 'Formularios BL 250 y BL 211, dos caminos (accidente o esfuerzo repetido) y cuánto paga Bituaj Leumi.',
  },
  {
    id: 's-sick-leave',
    title: 'Calculadora de días de enfermedad (Dmei Majalá)',
    type: 'guide',
    tabId: 'sick-leave',
    description: 'Día 1 sin pago, días 2 y 3 al 50% y desde el día 4 al 100%, según tus días acumulados.',
  },
  {
    id: 's-doctores',
    title: 'Médicos que hablan español',
    type: 'guide',
    tabId: 'doctors',
    description: 'Médicos verificados en la ficha oficial de su Kupá: Clalit, Maccabi, Meuhedet y Leumit.',
  },
  {
    id: 's-comunidad',
    title: 'Comunidad & Comercios latinos',
    type: 'guide',
    tabId: 'community',
    description: 'Alfajores, empanadas y almacenes con productos latinos y de Argentina, con sus datos de contacto.',
  },
  {
    id: 's-business-plan',
    title: 'Plan de Negocio: *2994 y centros Maalot',
    type: 'guide',
    tabId: 'business-plan',
    description: 'Asesoría del Ministerio de Aliá para abrir o hacer crecer tu negocio.',
  },
  {
    id: 's-nightlife',
    title: 'Vida Nocturna',
    type: 'guide',
    tabId: 'nightlife',
    description: 'Salidas y lugares de baile en Tel Aviv.',
  },
  // Preguntas frecuentes que llevan a su sección
  { id: 'q-banco', title: '¿Cómo abro mi cuenta bancaria?', type: 'guide', tabId: 'checklist', description: 'Paso del Checklist del Olé.' },
  { id: 'q-kupa', title: '¿Cómo elijo o cambio de Kupat Jolim?', type: 'guide', tabId: 'checklist', description: 'Paso del Checklist del Olé.' },
  { id: 'q-teudat-zehut', title: '¿Cómo saco turno para la Teudat Zehut?', type: 'guide', tabId: 'bureaucracy', description: 'Turnos en GoVisit, el sistema oficial.' },
  { id: 'q-miun', title: '¿Puedo ir al Miún sin derivación?', type: 'guide', tabId: 'emergency', description: 'Cuándo no se paga y a dónde ir primero.' },
  { id: 'q-alquiler', title: '¿Hasta qué mes cobro la ayuda de alquiler?', type: 'guide', tabId: 'crisis-civil', description: 'Ayuda de alquiler del Ministerio de Construcción.' },
  { id: 'q-teum-mas', title: 'Tengo dos trabajos: ¿cómo hago el Teum Mas?', type: 'guide', tabId: 'crisis-civil', description: 'Coordinación de impuestos en la Autoridad Tributaria.' },
  { id: 'q-tofes-101', title: '¿Cómo lleno el Tofes 101 como olé?', type: 'guide', tabId: 'bureaucracy', description: 'Puntos de crédito para olim.' },
];

interface GlobalSearchBarProps {
  onNavigateToTab: (tabId: string) => void;
  onSendToChat?: (query: string) => void;
  className?: string;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onNavigateToTab,
  onSendToChat,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const trimmed = searchTerm.trim().toLowerCase();
  const results = trimmed.length >= 2
    ? STATIC_SEARCH_INDEX.filter((item) => {
        return (
          item.title.toLowerCase().includes(trimmed) ||
          item.description.toLowerCase().includes(trimmed) ||
          (item.queryToChat && item.queryToChat.toLowerCase().includes(trimmed))
        );
      }).slice(0, 6)
    : [];

  const handleSelectResult = (item: SearchResultItem) => {
    setIsOpen(false);
    setSearchTerm('');
    if (item.type === 'question' && item.queryToChat && onSendToChat) {
      onNavigateToTab('assistant');
      onSendToChat(item.queryToChat);
    } else {
      onNavigateToTab(item.tabId);
    }
  };

  const handleAskNaturalLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsOpen(false);
    const query = searchTerm.trim();
    setSearchTerm('');
    if (ASSISTANT_ENABLED && onSendToChat) {
      onNavigateToTab('assistant');
      onSendToChat(query);
    } else if (results.length) {
      onNavigateToTab(results[0].tabId);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleAskNaturalLanguage} className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Busca un trámite o un tema: Kupá, Arnoná, Bituaj..."
          className="w-full min-h-[44px] pl-10 pr-8 py-2.5 bg-white hover:bg-slate-50 focus:bg-white border border-black/10 focus:border-[#0E2559]/30 rounded-full text-xs sm:text-sm text-[#0E2559] placeholder-[#0E2559]/50 focus:outline-none transition shadow-2xs"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Dropdown Results */}
      {isOpen && searchTerm.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-100 max-h-96 overflow-y-auto">
          {/* Ask AI direct natural language action */}
          {ASSISTANT_ENABLED && (<div
            onClick={handleAskNaturalLanguage}
            className="p-3 bg-blue-50/70 hover:bg-blue-100/80 cursor-pointer flex items-center justify-between transition text-xs group"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-blue-900 block">
                  Consultar al Asistente IA: "{searchTerm}"
                </span>
                <span className="text-[11px] text-blue-700">
                  Respuesta contextual con alertas de costos y pasos en hebreo
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition" />
          </div>)}

          {/* Matched static and query results */}
          {results.length > 0 ? (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Guías y Preguntas Coincidentes:
              </div>
              {results.map((item) => {
                const IconComponent = item.icon || (item.type === 'question' ? Bot : FileText);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    className="w-full p-3 text-left hover:bg-gray-50 flex items-start gap-2.5 transition text-xs"
                  >
                    <IconComponent className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 truncate">
                          {item.title}
                        </span>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 shrink-0">
                          {item.type === 'question' ? 'Pregunta' : item.type === 'doctor' ? 'Médico' : 'Guía'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-gray-500">
              {ASSISTANT_ENABLED
                ? `Presiona Enter para enviar tu consulta "${searchTerm}" al Asistente IA.`
                : `No encontramos "${searchTerm}". Prueba con otra palabra, por ejemplo: Kupá, Arnoná o Bituaj Leumi.`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
