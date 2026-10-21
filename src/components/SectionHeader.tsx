import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORY_GROUPS, SECTIONS, SectionConfig } from '../data/navigation';

interface SectionHeaderProps {
  currentSection: SectionConfig;
  onNavigateToTab: (tabId: string) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  currentSection,
  onNavigateToTab,
}) => {
  const group = CATEGORY_GROUPS[currentSection.groupId];
  const siblingSections = SECTIONS.filter((s) => s.groupId === currentSection.groupId);
  const CurrentIcon = currentSection.icon;

  return (
    <div className={`mb-8 rounded-3xl p-6 sm:p-8 text-white shadow-md bg-gradient-to-r ${group.gradientClass}`}>
      
      {/* 1. Breadcrumbs */}
      <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs sm:text-sm text-white/80 font-medium mb-5 flex-wrap">
        <button
          onClick={() => onNavigateToTab('home')}
          className="hover:text-white flex items-center gap-1 transition focus:outline-none"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Inicio</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
        <span className="text-white/90">{group.name}</span>
        <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
        <span className="text-white font-bold">{currentSection.name}</span>
      </nav>

      {/* 2. Main Title, Icon, Badge & Subtitle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center shrink-0 shadow-sm">
          <CurrentIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {currentSection.name}
            </h1>
            {currentSection.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white text-[#0E2559] shadow-xs">
                {currentSection.badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            {currentSection.description}
          </p>
        </div>
      </div>

      {/* 3. Fast tabs to switch between sibling sections in the same group */}
      <div className="pt-4 border-t border-white/20">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs sm:text-sm">
          <span className="text-white/70 text-xs font-bold uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Secciones de {group.name}:
          </span>
          {siblingSections.map((sec) => {
            const Icon = sec.icon;
            const isCurrent = sec.id === currentSection.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigateToTab(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-white text-[#0E2559] shadow-sm'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#0E2559]' : 'text-white'}`} />
                <span>{sec.name}</span>
                {sec.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isCurrent ? 'bg-[#0E2559]/10 text-[#0E2559]' : 'bg-white/20 text-white'
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
};
