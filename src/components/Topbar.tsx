import React, { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { LogoSymbol } from './LogoSymbol';
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
  onNavigateHome,
  onNavigateToTab,
  onSendQueryToChat,
  isLargeText,
  onToggleLargeText,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FBF3E6]/95 backdrop-blur-md transition-colors border-b border-[#0E2559]/5 sm:border-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* ========================================================
              MOBILE VIEW (< 640px):
              Izquierda: Botón de menú y logo con "Olim Conectados"
              Derecha: Botón de lupa (44px) y círculo rojo #C0392B (44px) "101"
              ======================================================== */}
          <div className="flex sm:hidden items-center justify-between w-full">
            {/* Left: Hamburger + Logo Olim Conectados */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenMobileSidebar}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-[#0E2559]/10 text-[#0E2559] hover:bg-slate-50 transition shrink-0 shadow-2xs"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="w-5 h-5 text-[#0E2559]" />
              </button>

              <button
                type="button"
                onClick={onNavigateHome}
                className="flex items-center gap-2 text-left py-1 px-1.5 rounded-lg hover:bg-black/5 transition"
              >
                <LogoSymbol className="w-7 h-7 shrink-0" />
                <span className="font-extrabold text-sm tracking-tight text-[#0E2559] truncate">
                  Olim Conectados
                </span>
              </button>
            </div>

            {/* Right: Search button (44px) + Red circle 101 (44px) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* 44px Search Button */}
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(true)}
                className="w-11 h-11 rounded-xl bg-white border border-[#0E2559]/15 text-[#0E2559] flex items-center justify-center hover:bg-slate-50 transition shadow-2xs"
                aria-label="Buscar en el sitio"
                title="Buscar"
              >
                <Search className="w-5 h-5 text-[#0E2559]" />
              </button>

              {/* 44px Red Circle #C0392B with "101" */}
              <a
                href="tel:101"
                className="w-11 h-11 rounded-full bg-[#C0392B] hover:bg-[#a93224] text-white font-black text-sm flex items-center justify-center shadow-xs transition active:scale-95"
                title="Llamar a Emergencias MADA 101"
                aria-label="Llamar a ambulancia 101"
              >
                101
              </a>
            </div>
          </div>

          {/* ========================================================
              NOTEBOOK / DESKTOP VIEW (>= 640px):
              Queda igual que antes con Search Bar, A+ Texto y Emergencia 101
              ======================================================== */}
          {/* Tablet hamburger button (between 640px and 1024px) */}
          <button
            onClick={onOpenMobileSidebar}
            className="hidden sm:flex lg:hidden p-2 text-[#0E2559] hover:bg-black/5 rounded-xl transition shrink-0 min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5 text-[#0E2559]" />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-xl min-w-0">
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
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* A+ Texto Button */}
            <button
              type="button"
              onClick={onToggleLargeText}
              className={`px-4 py-2 min-h-[44px] inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-bold border transition shadow-2xs ${
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

      {/* ========================================================
          FULLSCREEN MOBILE SEARCH MODAL (< 640px)
          ======================================================== */}
      {isMobileSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#FBF3E6] flex flex-col sm:hidden overflow-y-auto p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-label="Buscador en pantalla completa"
        >
          {/* Top Header of Search Modal */}
          <div className="flex items-center justify-between gap-3 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <LogoSymbol className="w-7 h-7" />
              <span className="font-extrabold text-sm text-[#0E2559]">
                Buscar en Olim Conectados
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="w-11 h-11 rounded-xl bg-white border border-[#0E2559]/15 text-[#0E2559] flex items-center justify-center hover:bg-slate-50 transition"
              aria-label="Cerrar buscador"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar inside modal */}
          <div className="w-full">
            <GlobalSearchBar
              onNavigateToTab={(tabId) => {
                setIsMobileSearchOpen(false);
                onNavigateToTab(tabId);
              }}
              onSendToChat={(query) => {
                setIsMobileSearchOpen(false);
                if (onSendQueryToChat) {
                  onSendQueryToChat(query);
                }
              }}
              className="w-full"
            />
          </div>

          {/* Quick Search Suggestions */}
          <div className="mt-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0E2559]/60">
              Búsquedas frecuentes:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '🩺 Médicos en español', tab: 'doctors' },
                { label: '🚨 Guardia y Miún', tab: 'emergency' },
                { label: '📋 Checklist de Oleh', tab: 'checklist' },
                { label: '📄 Tofes 101', tab: 'bureaucracy' },
                { label: '💰 Sal Klitá', tab: 'crisis-civil' },
                { label: '🚗 Canje de Licencia', tab: 'license' },
                { label: '🏥 Bituaj Leumi', tab: 'bituaj' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsMobileSearchOpen(false);
                    onNavigateToTab(item.tab);
                  }}
                  className="px-3.5 py-2 min-h-[44px] rounded-xl bg-white border border-[#0E2559]/10 text-xs font-bold text-[#0E2559] hover:bg-amber-50/50 shadow-2xs flex items-center"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
