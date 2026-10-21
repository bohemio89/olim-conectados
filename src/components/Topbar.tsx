import React from 'react';
import { Menu, Search, X } from 'lucide-react';
import { EmergencyButton } from './EmergencyButton';
import { GlobalSearchBar } from './GlobalSearchBar';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
  onNavigateHome: () => void;
  onNavigateToTab: (tabId: string) => void;
  onSendQueryToChat?: (query: string) => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileSidebar,
  onNavigateToTab,
  onSendQueryToChat,
  isLargeText,
  onToggleLargeText,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FBF3E6]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Mobile Hamburger */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#0E2559] hover:bg-black/5 rounded-xl transition shrink-0"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-5 h-5 text-[#0E2559]" />
        </button>

        {/* Search Bar matching the reference screenshot */}
        <div className="flex-1 max-w-xl min-w-0">
          <GlobalSearchBar
            onNavigateToTab={onNavigateToTab}
            onSendToChat={(query) => {
              if (onSendQueryToChat) {
                onSendQueryToChat(query);
              }
            }}
          />
        </div>

        {/* Right side: "A+ Texto" pill + "Emergencia MADA 101" solid red pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* A+ Texto Button */}
          <button
            type="button"
            onClick={onToggleLargeText}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition shadow-2xs ${
              isLargeText
                ? 'bg-[#0E2559] text-white border-[#0E2559]'
                : 'bg-white text-[#0E2559] border-slate-700/80 hover:bg-slate-50'
            }`}
            title={isLargeText ? 'Restablecer tamaño normal de texto' : 'Agrandar texto de la pantalla'}
            aria-label="Agrandar tamaño de fuente"
          >
            <span className="whitespace-nowrap">{isLargeText ? 'A- Normal' : 'A+ Texto'}</span>
          </button>

          {/* Emergencia MADA 101 */}
          <EmergencyButton />
        </div>

      </div>
    </header>
  );
};
