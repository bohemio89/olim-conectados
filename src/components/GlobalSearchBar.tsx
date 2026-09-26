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
  // Guías y Artículos del sitio
  {
    id: 's-emergencia',
    title: 'Guardia & Miún SOS: Evitar facturas de cientos de shékels',
    type: 'guide',
    tabId: 'emergency',
    description: 'Protocolo de ambulancias MADA 101, centros Terem y cómo obtener la Hafniá médica.',
    icon: AlertTriangle
  },
  {
    id: 's-checklist',
    title: 'Mi Checklist de Oleh Jadash: Pasos secuenciales de absorción',
    type: 'guide',
    tabId: 'checklist',
    description: 'Teudat Olé, banco, Kupat Jolim, MyVisit, Tofes 101 y ayuda de alquiler con progreso guardado.',
    icon: CheckSquare
  },
  {
    id: 's-doctores',
    title: 'Médicos que hablan español en Israel (Maccabi, Clalit, Meuhedet, Leumit)',
    type: 'guide',
    tabId: 'doctors',
    description: 'Directorio de más de 140 especialistas cotejados con filtros por ciudad y Kupá.',
    icon: Stethoscope
  },
  {
    id: 's-crisis',
    title: 'Crisis, Economía & Vida Civil (Sal Klitá, Alquiler meses 7-30, Pikud HaOref)',
    type: 'guide',
    tabId: 'crisis-civil',
    description: 'Guía legal sobre subsidios, despidos en guerra y plazos de ayuda del Ministerio de Aliá.',
    icon: ShieldAlert
  },
  {
    id: 's-bituaj',
    title: 'Accidente Laboral, Tendinitis y Formulario BL 250 ante Bituaj Leumi',
    type: 'guide',
    tabId: 'bituaj',
    description: 'Pasos urgentes para denunciar lesiones laborales y turno con Rofé Taasukatí.',
    icon: Briefcase
  },
  {
    id: 's-licencia',
    title: 'Canjear Licencia de Conducir con Tofes Yarok (Misrad HaRishuí)',
    type: 'guide',
    tabId: 'license',
    description: 'Conversión directa para licencias con +5 años y qué hacer si tu carné está vencido.',
    icon: Car
  },
  {
    id: 's-sick-leave',
    title: 'Calculadora de Días de Enfermedad (Jok Dmei Majalá)',
    type: 'guide',
    tabId: 'sick-leave',
    description: 'Cálculo de pago día 1 (0%), días 2-3 (50%) y día 4+ (100%) según saldo acumulado.',
    icon: Calculator
  },
  {
    id: 's-bureaucracy',
    title: 'Trámites Clave: Tofes 101, MyVisit, Descuento Arnoná y Ulpán',
    type: 'guide',
    tabId: 'bureaucracy',
    description: 'Voucher de 5.200 NIS para Ulpán privado y cómo no pagar de más en el sueldo.',
    icon: FileText
  },
  {
    id: 's-comunidad',
    title: 'Comercio Latino, Yerbas, Cortes Criollos y Amapola Café',
    type: 'guide',
    tabId: 'community',
    description: 'Calle Allenby 94, carnicerías con vacío/entraña, empanadas caseras y grupos de WhatsApp.',
    icon: ShoppingBag
  },
  {
    id: 's-nightlife',
    title: 'Vida Nocturna: Fiestas Latinas, La Fiesta Argentina, Cachengue y Salsa',
    type: 'guide',
    tabId: 'nightlife',
    description: 'Boliches, eventos con música en español, salsa en Havana Club y salidas para Olim.',
    icon: PartyPopper
  },

  // Preguntas para el Asistente IA (consultas en lenguaje natural)
  {
    id: 'q-miun-fiebre',
    title: '¿Puedo ir al Miún si tengo fiebre de noche sin pagar multa?',
    type: 'question',
    tabId: 'assistant',
    queryToChat: '¿Puedo ir directo al Miún si tengo fiebre de noche?',
    description: 'Consulta al Asistente IA sobre cómo evitar cobros de la guardia hospitalaria.'
  },
  {
    id: 'q-alquiler-30',
    title: '¿Por qué se corta la ayuda de alquiler en el mes 30 de Aliá?',
    type: 'question',
    tabId: 'assistant',
    queryToChat: '¿Por qué dejé de cobrar la ayuda de alquiler en el mes 30?',
    description: 'Consulta al Asistente IA sobre los plazos legales del subsidio Siyua biSjirot.'
  },
  {
    id: 'q-teum-mas',
    title: 'Tengo dos trabajos: ¿Cómo hago el Teum Mas para que no me retengan 47%?',
    type: 'question',
    tabId: 'assistant',
    queryToChat: 'Tengo 2 trabajos: ¿Cómo hago el Teum Mas para que no me retengan el 47%?',
    description: 'Consulta al Asistente IA sobre coordinación de impuestos en Rashut HaMisim.'
  },
  {
    id: 'q-tofes-101',
    title: '¿Cómo completar el Tofes 101 para que apliquen los puntos de Olé?',
    type: 'question',
    tabId: 'assistant',
    queryToChat: '¿Cómo lleno el Tofes 101 para que no me retengan Mas Hajnasá?',
    description: 'Consulta al Asistente IA sobre Nekudot Zijui en tu recibo de sueldo (tlush sajar).'
  },
  {
    id: 'q-armando-brandt',
    title: 'Dr. Armando Brandt (Shaul HaMelech 8, Tel Aviv - Maccabi / Meuhedet)',
    type: 'doctor',
    tabId: 'doctors',
    description: 'Ficha médica verificada de medicina familiar y geriatría en Tel Aviv.'
  }
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
    if (onSendToChat) {
      onNavigateToTab('assistant');
      onSendToChat(query);
    } else {
      onNavigateToTab('assistant');
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
          placeholder="Buscar trámites, salud, boliches o preguntar al asistente..."
          className="w-full pl-9 pr-8 py-2 bg-gray-100/90 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition shadow-2xs"
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
          <div
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
          </div>

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
              Presioná Enter para enviar tu consulta "{searchTerm}" al Asistente IA.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
