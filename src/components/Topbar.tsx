import React from 'react';
import { 
  Bot, 
  AlertTriangle, 
  Menu, 
  Search, 
  Compass,
  Sparkles,
  TrendingUp,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';
import { ALL_NAV_ITEMS } from './Sidebar';

interface TopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMobileSidebar: () => void;
  clickCounts: Record<string, number>;
  onItemClick: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileSidebar,
  clickCounts,
  onItemClick,
  isCollapsed,
  onToggleCollapse,
}) => {
  // Select the top 4 most used/relevant items based on user clicks
  const topRelevant = [...ALL_NAV_ITEMS].sort((a, b) => {
    const countA = clickCounts[a.id] || 0;
    const countB = clickCounts[b.id] || 0;
    return countB - countA;
  }).slice(0, 4);

  const currentItem = ALL_NAV_ITEMS.find((it) => it.id === activeTab) || ALL_NAV_ITEMS[0];

  const handleQuickClick = (id: string) => {
    setActiveTab(id);
    onItemClick(id);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top micro announcement */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600/30 text-blue-300 px-1.5 py-0.2 rounded font-semibold text-[10px]">
            🇮🇱 Olim Conectados
          </span>
          <span className="hidden sm:inline">
            Guía comunitaria de salud, trámites y vida en Israel
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-300 font-medium hidden md:inline">
            ⚠️ Alerta Miún: Exigí siempre Hafniá previa
          </span>
          <button
            onClick={() => handleQuickClick('emergency')}
            className="text-white hover:text-amber-200 font-semibold underline text-[11px]"
          >
            MADA 101
          </button>
        </div>
      </div>

      {/* Main Topbar Row */}
      <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: Desktop Collapse Button (=) + Mobile trigger + Current active section title */}
        <div className="flex items-center gap-3">
          {/* Desktop Toggle Menu Button (=) */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 transition shadow-2xs"
            title={isCollapsed ? 'Expandir menú (abrir)' : 'Contraer menú (cerrar)'}
            aria-label="Abrir y cerrar menú lateral"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                {currentItem.label}
              </h1>
              <span className="text-[10px] text-gray-400 hidden sm:inline">
                · {currentItem.category}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden md:block line-clamp-1">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Center / Right: Dynamic "Temas más usados / Relevantes" pills */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200 text-xs">
            <span className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              Destacados:
            </span>
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

          {/* Quick SOS button */}
          <button
            onClick={() => handleQuickClick('emergency')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition shrink-0"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Guardia SOS</span>
            <span className="sm:hidden">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
