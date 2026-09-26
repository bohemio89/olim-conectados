import React from 'react';
import { 
  Bot, 
  Menu, 
  Compass
} from 'lucide-react';
import { ALL_NAV_ITEMS } from './Sidebar';
import { GlobalSearchBar } from './GlobalSearchBar';
import { EmergencyButton } from './EmergencyButton';

interface TopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMobileSidebar: () => void;
  clickCounts: Record<string, number>;
  onItemClick: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSendQueryToChat?: (query: string) => void;
}

/**
 * Topbar rediseñado conforme a las pautas de UX:
 * 1. Menos carga visual: logo, nombre del sitio, buscador persistente en lenguaje natural, y botón hamburguesa en mobile.
 * 2. Unificación del botón de emergencia (EmergencyButton 101).
 * 3. Eliminación de redundancia de texto "Asistente IA" (solo ícono + label conciso).
 * 4. El banner fijo invasivo de alerta se trasladó al feed normal de contenido como Card destacada.
 */
export const Topbar: React.FC<TopbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileSidebar,
  clickCounts,
  onItemClick,
  isCollapsed,
  onToggleCollapse,
  onSendQueryToChat,
}) => {
  // Select top 3 relevant navigation items for desktop quick pills
  const topRelevant = [...ALL_NAV_ITEMS].sort((a, b) => {
    const countA = clickCounts[a.id] || 0;
    const countB = clickCounts[b.id] || 0;
    return countB - countA;
  }).slice(0, 3);

  const handleQuickClick = (id: string) => {
    setActiveTab(id);
    onItemClick(id);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile Burger + Logo Brand Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile Menu Trigger */}
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 -ml-1 text-gray-700 hover:bg-gray-100 rounded-xl transition"
            aria-label="Abrir menú de opciones"
          >
            <Menu className="w-5 h-5 text-gray-800" />
          </button>

          {/* Brand Logo & Name */}
          <button
            onClick={() => handleQuickClick('assistant')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base tracking-tight text-gray-900 group-hover:text-blue-600 transition">
                  Olim Conectados
                </span>
                <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 hidden xs:inline">
                  עולים
                </span>
              </div>
              <span className="text-[10px] text-gray-500 hidden sm:block">
                Guía Comunitaria y Derechos en Israel
              </span>
            </div>
          </button>
        </div>

        {/* Center: Persistent Natural Language Search Bar (Item B UX) */}
        <div className="flex-1 max-w-md mx-1 sm:mx-3">
          <GlobalSearchBar
            onNavigateToTab={(tabId) => {
              setActiveTab(tabId);
              onItemClick(tabId);
            }}
            onSendToChat={(query) => {
              if (onSendQueryToChat) {
                onSendQueryToChat(query);
              }
            }}
          />
        </div>

        {/* Right: Quick Pills (Desktop) + Unified Emergency Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop quick tabs */}
          <div className="hidden xl:flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200 text-xs">
            {topRelevant.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={`topbar-quick-${item.id}`}
                  onClick={() => handleQuickClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Unified Emergency Button across the site (Punto 3 UX) */}
          <EmergencyButton
            variant="compact"
            onClick={() => handleQuickClick('emergency')}
          />
        </div>
      </div>
    </header>
  );
};
