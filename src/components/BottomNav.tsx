import React from 'react';
import { Home, Stethoscope, Ticket, ClipboardCheck, Siren } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigateToTab: (tabId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigateToTab,
}) => {
  const items = [
    {
      id: 'home',
      label: 'Inicio',
      icon: Home,
      isEmergency: false,
    },
    {
      id: 'doctors',
      label: 'Médicos',
      icon: Stethoscope,
      isEmergency: false,
    },
    {
      id: 'bureaucracy',
      label: 'Trámites',
      icon: Ticket,
      isEmergency: false,
    },
    {
      id: 'checklist',
      label: 'Checklist',
      icon: ClipboardCheck,
      isEmergency: false,
    },
    {
      id: 'emergency',
      label: 'SOS',
      icon: Siren,
      isEmergency: true,
    },
  ];

  return (
    <nav
      aria-label="Navegación inferior móvil"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#0E2559]/10 shadow-[0_-4px_16px_rgba(14,37,89,0.08)] flex items-center justify-around px-2 h-16 pb-[env(safe-area-inset-bottom,0px)]"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigateToTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 rounded-xl transition-all ${
              isActive
                ? 'bg-[#0E2559] text-white shadow-xs'
                : item.isEmergency
                ? 'text-[#C0392B] hover:bg-red-50'
                : 'text-[#0E2559]/70 hover:text-[#0E2559] hover:bg-slate-100/60'
            }`}
          >
            <Icon className={`w-6 h-6 shrink-0 ${
              isActive 
                ? (item.isEmergency ? 'text-[#E8A33D]' : 'text-white') 
                : item.isEmergency ? 'text-[#C0392B]' : 'currentColor'
            }`} />
            <span className={`text-[10px] font-bold mt-0.5 leading-none ${
              isActive
                ? 'text-white'
                : item.isEmergency
                ? 'text-[#C0392B]'
                : 'text-[#0E2559]'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
