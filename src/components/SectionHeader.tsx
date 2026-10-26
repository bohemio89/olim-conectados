import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORY_GROUPS, SECTIONS, SectionConfig, CategoryGroupId } from '../data/navigation';

interface SectionHeaderProps {
  currentSection: SectionConfig;
  onNavigateToTab: (tabId: string) => void;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  currentSection,
  onNavigateToTab,
  action,
}) => {
  const group = CATEGORY_GROUPS[currentSection.groupId];
  const siblingSections = SECTIONS.filter((s) => s.groupId === currentSection.groupId);
  const CurrentIcon = currentSection.icon;

  // Background and accent styling per group
  const groupStyles: Record<CategoryGroupId, { headerBg: string; iconBg: string; activeBadgeBg: string; textAccent: string }> = {
    salud: {
      headerBg: 'bg-[#1F5F8B]/10',
      iconBg: 'bg-[#1F5F8B]',
      activeBadgeBg: 'bg-[#1F5F8B] text-white',
      textAccent: 'text-[#1F5F8B]'
    },
    tramites: {
      headerBg: 'bg-[#6B4FA0]/10',
      iconBg: 'bg-[#6B4FA0]',
      activeBadgeBg: 'bg-[#6B4FA0] text-white',
      textAccent: 'text-[#6B4FA0]'
    },
    comunidad: {
      headerBg: 'bg-[#2A7050]/10',
      iconBg: 'bg-[#2A7050]',
      activeBadgeBg: 'bg-[#2A7050] text-white',
      textAccent: 'text-[#2A7050]'
    }
  };

  const style = groupStyles[currentSection.groupId];

  return (
    <div className={`mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 ${style.headerBg} border border-black/5 shadow-2xs`}>
      
      {/* 1. Breadcrumbs (Migas de pan) */}
      <nav aria-label="Migas de pan" className="flex items-center gap-1.5 text-xs sm:text-[13.5px] text-slate-600 font-medium mb-4 flex-wrap">
        <button
          onClick={() => onNavigateToTab('home')}
          className="hover:text-[#0E2559] flex items-center gap-1 transition focus:outline-none min-h-[32px]"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Inicio</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="text-slate-600">{group.name}</span>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="text-[#0E2559] font-bold">{currentSection.name}</span>
      </nav>

      {/* 2. Main Title, Icon & Single-line Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {/* 52px Icon with group solid color */}
          <div className={`w-[52px] h-[52px] min-w-[52px] min-h-[52px] rounded-2xl ${style.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
            <CurrentIcon className="w-6 h-6 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2559] leading-tight">
                {currentSection.name}
              </h1>
              {currentSection.badge && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${style.activeBadgeBg} shadow-2xs`}>
                  {currentSection.badge}
                </span>
              )}
            </div>
            <p className="mt-1 text-[15px] sm:text-base text-slate-700 max-w-3xl leading-snug">
              {currentSection.description}
            </p>
          </div>
        </div>

        {action && (
          <div className="shrink-0 hidden sm:block">
            {action}
          </div>
        )}
      </div>

      {/* 3. Sibling sections row: Hidden on mobile as per requirement 2 */}
      {siblingSections.length > 1 && (
        <div className="hidden sm:block pt-4 mt-4 border-t border-black/5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs sm:text-sm">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider shrink-0 mr-1">
              Secciones de {group.name}:
            </span>
            {siblingSections.map((sec) => {
              const Icon = sec.icon;
              const isCurrent = sec.id === currentSection.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onNavigateToTab(sec.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-xl font-bold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-white text-[#0E2559] shadow-xs border border-black/10'
                      : 'bg-white/60 text-slate-700 hover:bg-white border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? style.textAccent : 'text-slate-600'}`} />
                  <span>{sec.name}</span>
                  {sec.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isCurrent ? 'bg-[#0E2559]/10 text-[#0E2559]' : 'bg-slate-200/70 text-slate-700'
                    }`}>
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
