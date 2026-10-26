import React from 'react';
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  X,
  BookOpen,
  Home,
  ChevronRight,
  MessageCirclePlus, 
  Stethoscope, 
  Siren, 
  Store, 
  Landmark, 
  ClipboardCheck, 
  HardHat, 
  Calculator, 
  Car, 
  Ticket, 
  Users, 
  Martini,
} from 'lucide-react';
import { LogoSymbol } from './LogoSymbol';
import { CATEGORY_GROUPS, SECTIONS, CategoryGroupId } from '../data/navigation';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isLargeText?: boolean;
  onToggleLargeText?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  setIsOpenMobile,
  isCollapsed,
  onToggleCollapse,
  isLargeText = false,
  onToggleLargeText,
}) => {
  const groupsOrder: CategoryGroupId[] = ['salud', 'tramites', 'comunidad'];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    setIsOpenMobile(false);
  };

  const groupCapsuleStyles: Record<CategoryGroupId, { bg: string; iconColor: string; activeBg: string }> = {
    salud: {
      bg: 'bg-[#E8F3FA]',
      iconColor: 'text-[#1F5F8B]',
      activeBg: 'bg-[#1F5F8B]',
    },
    tramites: {
      bg: 'bg-[#F3EEFA]',
      iconColor: 'text-[#6B4FA0]',
      activeBg: 'bg-[#6B4FA0]',
    },
    comunidad: {
      bg: 'bg-[#E7F6EE]',
      iconColor: 'text-[#2A7050]',
      activeBg: 'bg-[#2A7050]',
    },
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-[#0E2559]/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Aside */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-[#0E2559]/10 flex flex-col shadow-xs transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-[290px]'
        } ${
          isOpenMobile 
            ? 'w-[290px] translate-x-0' 
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header: Logo + Collapse Button */}
        <div className={`h-16 flex items-center border-b border-[#0E2559]/10 px-3 bg-white ${
          isCollapsed ? 'lg:justify-center justify-between' : 'justify-between'
        }`}>
          <button 
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2.5 text-left group overflow-hidden focus:outline-none"
            title="OLIM CONECTADOS - Inicio"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center p-1 bg-white hover:bg-slate-50 transition shrink-0">
              <LogoSymbol className="w-8 h-8 shrink-0 transition-transform group-hover:scale-105" />
            </div>
            
            {/* Show on mobile always, on desktop only when not collapsed */}
            <div className={`min-w-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
              <span className="font-extrabold text-sm tracking-tight text-[#0E2559] block truncate">
                OLIM CONECTADOS
              </span>
              <span className="text-[10px] text-[#0E2559]/70 font-semibold block truncate">
                Toda tu Aliyah en español
              </span>
            </div>
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-xl text-[#0E2559]/70 hover:text-[#0E2559] hover:bg-[#FBF3E6] transition ml-auto"
            title={isCollapsed ? 'Expandir menú (≈290px)' : 'Contraer menú (≈72px)'}
            aria-label="Alternar menú lateral"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[#0E2559]/60" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-[#0E2559]/60" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-2 rounded-lg text-[#0E2559]/70 hover:bg-black/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3.5 no-scrollbar">
          
          {/* Inicio (Home) */}
          <div className="relative group w-full flex justify-center">
            {/* Desktop Collapsed View */}
            {isCollapsed && (
              <button
                onClick={() => handleItemClick('home')}
                className={`hidden lg:flex p-2.5 justify-center items-center rounded-xl transition ${
                  activeTab === 'home' ? 'bg-[#0E2559] text-white shadow-sm' : 'text-[#0E2559]/80 hover:bg-slate-100/80'
                }`}
                title="Inicio"
              >
                <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-white' : 'text-[#0E2559]/80'}`} />
              </button>
            )}

            {/* Expanded View (Always on mobile, on desktop when not collapsed) */}
            <button
              onClick={() => handleItemClick('home')}
              className={`${isCollapsed ? 'lg:hidden' : ''} w-full flex items-center px-3.5 py-2.5 min-h-[44px] justify-between rounded-xl transition ${
                activeTab === 'home' ? 'bg-[#0E2559] text-white font-bold shadow-sm' : 'text-[#0E2559]/80 hover:bg-[#FBF3E6]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-white' : 'text-[#0E2559]/80'}`} />
                <span className="text-sm font-bold">Inicio</span>
              </div>
              {activeTab === 'home' && (
                <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
              )}
            </button>

            {isCollapsed && (
              <div className="hidden lg:block absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#0E2559] text-white text-xs font-bold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Inicio
              </div>
            )}
          </div>

          {/* 3 Categories */}
          {groupsOrder.map((groupId) => {
            const group = CATEGORY_GROUPS[groupId];
            const items = SECTIONS.filter((s) => s.groupId === groupId);
            const style = groupCapsuleStyles[groupId];

            return (
              <div key={groupId} className="space-y-1 pt-1">
                {/* Desktop Collapsed Mode (Only visible on lg when isCollapsed) */}
                {isCollapsed && (
                  <div className="hidden lg:flex flex-col items-center">
                    <div className={`${style.bg} rounded-2xl p-1.5 flex flex-col items-center gap-1.5 w-12 shadow-2xs`}>
                      {items.map((sec) => {
                        const Icon = sec.icon;
                        const isActive = activeTab === sec.id;
                        return (
                          <div key={sec.id} className="relative group">
                            <button
                              onClick={() => handleItemClick(sec.id)}
                              className={`p-2 rounded-xl transition flex items-center justify-center ${
                                isActive
                                  ? `${style.activeBg} text-white shadow-xs`
                                  : `${style.iconColor} hover:bg-white/80`
                              }`}
                              aria-label={sec.name}
                            >
                              <Icon className="w-5 h-5" />
                            </button>

                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#0E2559] text-white text-[11.5px] font-bold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-pre leading-tight">
                              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-[#0E2559]" />
                              <span>{sec.name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Expanded Mode (Always visible on mobile, and on desktop when NOT collapsed) */}
                <div className={`${isCollapsed ? 'lg:hidden' : ''} space-y-1`}>
                  <div className="px-3 pb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0E2559]/60">
                    <span>{group.name}</span>
                  </div>

                  <div className="space-y-1">
                    {items.map((sec) => {
                      const Icon = sec.icon;
                      const isActive = activeTab === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleItemClick(sec.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 min-h-[44px] rounded-xl text-left text-[13.5px] font-semibold transition ${
                            isActive
                              ? 'bg-[#0E2559] text-white font-bold shadow-xs'
                              : 'text-[#0E2559]/90 hover:bg-[#FBF3E6]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-[#E8A33D]' : style.iconColor
                            }`} />
                            <span className="truncate">{sec.name}</span>
                          </div>

                          {sec.badge && (
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                              isActive ? 'bg-white/20 text-white' : 'bg-white text-[#0E2559] border border-[#0E2559]/10'
                            }`}>
                              {sec.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom Section: "A+ Texto" button */}
        {onToggleLargeText && (
          <div className="p-3 border-t border-[#0E2559]/10 mt-auto bg-white">
            {/* Desktop Collapsed View */}
            {isCollapsed ? (
              <>
                <button
                  type="button"
                  onClick={onToggleLargeText}
                  className={`hidden lg:flex w-full min-h-[44px] items-center justify-center rounded-xl font-bold text-xs border transition ${
                    isLargeText
                      ? 'bg-[#0E2559] text-white border-[#0E2559]'
                      : 'bg-white text-[#0E2559] border-slate-300 hover:bg-slate-50'
                  }`}
                  title={isLargeText ? 'Restablecer tamaño normal de texto' : 'Agrandar texto de la pantalla'}
                  aria-label="Agrandar tamaño de fuente"
                >
                  <span>{isLargeText ? 'A-' : 'A+'}</span>
                </button>

                <button
                  type="button"
                  onClick={onToggleLargeText}
                  className={`lg:hidden w-full min-h-[44px] px-3.5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition shadow-2xs ${
                    isLargeText
                      ? 'bg-[#0E2559] text-white border-[#0E2559]'
                      : 'bg-[#FBF3E6] text-[#0E2559] border-[#0E2559]/20 hover:bg-[#F5E6CC]'
                  }`}
                  aria-label="Agrandar tamaño de fuente"
                >
                  <span>{isLargeText ? 'A- Texto Normal' : 'A+ Agrandar Texto'}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onToggleLargeText}
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm border transition shadow-2xs ${
                  isLargeText
                    ? 'bg-[#0E2559] text-white border-[#0E2559]'
                    : 'bg-[#FBF3E6] text-[#0E2559] border-[#0E2559]/20 hover:bg-[#F5E6CC]'
                }`}
                aria-label="Agrandar tamaño de fuente"
              >
                <span>{isLargeText ? 'A- Texto Normal' : 'A+ Agrandar Texto'}</span>
              </button>
            )}
          </div>
        )}

      </aside>
    </>
  );
};
