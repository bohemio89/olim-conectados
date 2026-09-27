import React from 'react';
import { 
  Bot, 
  Stethoscope, 
  AlertTriangle, 
  Briefcase, 
  Calculator, 
  Car, 
  FileText, 
  ShoppingBag, 
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  Compass,
  PanelLeftClose,
  PanelLeftOpen,
  PartyPopper,
  CheckSquare
} from 'lucide-react';
import { EmergencyButton } from './EmergencyButton';

export interface NavItemConfig {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'Asistencia & Salud' | 'Derechos & Trámites' | 'Comunidad & Emprendimientos';
  badge?: string;
  alert?: boolean;
  description: string;
}

export const ALL_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'assistant',
    label: 'Asistente IA Olim',
    shortLabel: 'Asistente IA',
    icon: Bot,
    category: 'Asistencia & Salud',
    badge: 'Popular',
    description: 'Consultas sobre salud, trámites y vida en Israel con memoria contextual'
  },
  {
    id: 'doctors',
    label: 'Médicos en Español',
    shortLabel: 'Médicos',
    icon: Stethoscope,
    category: 'Asistencia & Salud',
    badge: 'Top',
    description: 'Directorio calificado en Maccabi, Clalit, Meuhedet y Leumit'
  },
  {
    id: 'emergency',
    label: 'Guardia & Miún SOS',
    shortLabel: 'Guardia / Miún',
    icon: AlertTriangle,
    category: 'Asistencia & Salud',
    alert: true,
    description: 'Cómo evitar facturas de cientos de shékels en Miún y ambulancias'
  },
  {
    id: 'community',
    label: 'Comunidad & Redes',
    shortLabel: 'Comunidad',
    icon: ShoppingBag,
    category: 'Comunidad & Emprendimientos',
    description: 'Puntos de encuentro y grupos colaborativos de Olim'
  },
  {
    id: 'nightlife',
    label: 'Vida Nocturna',
    shortLabel: 'Vida Nocturna',
    icon: PartyPopper,
    category: 'Comunidad & Emprendimientos',
    description: 'Encuentros, música en español y actividades sociales para Olim'
  },
  {
    id: 'business-plan',
    label: 'Plan de Negocio',
    shortLabel: 'Plan de Negocio',
    icon: Briefcase,
    category: 'Derechos & Trámites',
    badge: 'Oficial',
    description: 'Asesoramiento gratuito del Ministerio (*2994) y Centros Maalot para abrir un negocio'
  },
  {
    id: 'crisis-civil',
    label: 'Crisis, Economía & Vida Civil',
    shortLabel: 'Crisis & Economía',
    icon: ShieldAlert,
    category: 'Derechos & Trámites',
    description: 'Sal Klitá, subsidio de alquiler (meses 7-30), Teum Mas y Pikud HaOref'
  },
  {
    id: 'checklist',
    label: 'Mi Checklist de Oleh',
    shortLabel: 'Checklist Oleh',
    icon: CheckSquare,
    category: 'Derechos & Trámites',
    badge: 'Nuevo',
    description: 'Guía secuencial paso a paso con seguimiento de trámites y progreso guardado'
  },
  {
    id: 'bituaj',
    label: 'Accidente & Bituaj Leumi',
    shortLabel: 'Bituaj Leumi',
    icon: Briefcase,
    category: 'Derechos & Trámites',
    description: 'Lesiones laborales, tendinitis, formulario BL 250 y Rofé Taasukatí'
  },
  {
    id: 'sick-leave',
    label: 'Calculadora Días Majalá',
    shortLabel: 'Días Enfermedad',
    icon: Calculator,
    category: 'Derechos & Trámites',
    description: 'Cálculo legal según Jok Dmei Majalá y saldo acumulado'
  },
  {
    id: 'license',
    label: 'Licencia de Conducir',
    shortLabel: 'Licencia',
    icon: Car,
    category: 'Derechos & Trámites',
    description: 'Conversión con Tofes Yarok y reválida de carné'
  },
  {
    id: 'bureaucracy',
    label: 'Trámites & Vouchers',
    shortLabel: 'Trámites',
    icon: FileText,
    category: 'Derechos & Trámites',
    description: 'Tofes 101, MyVisit, descuento de Arnoná y voucher de Ulpán'
  },
];

interface SidebarLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  clickCounts: Record<string, number>;
  onItemClick: (tabId: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarLayoutProps> = ({
  activeTab,
  setActiveTab,
  clickCounts,
  onItemClick,
  isOpenMobile,
  setIsOpenMobile,
  isCollapsed,
  setIsCollapsed,
}) => {
  // Sort items by relevance/click count for the "Más Buscados" section
  const topItems = [...ALL_NAV_ITEMS].sort((a, b) => {
    const countA = clickCounts[a.id] || 0;
    const countB = clickCounts[b.id] || 0;
    return countB - countA;
  }).slice(0, 4);

  const categories = [
    'Asistencia & Salud',
    'Derechos & Trámites',
    'Comunidad & Emprendimientos'
  ] as const;

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onItemClick(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container: w-72 when expanded, w-20 when collapsed on desktop */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:w-20' : 'lg:w-72'
        } ${
          isOpenMobile 
            ? 'w-72 translate-x-0' 
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Branding & Toggle Button */}
        <div className="h-16 px-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div 
            onClick={() => handleSelect('assistant')}
            className={`flex items-center gap-2.5 cursor-pointer group overflow-hidden ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
            title="Olim Conectados - Inicio"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition shrink-0">
              <Compass className="w-5 h-5 text-white" />
            </div>
            
            {!isCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-gray-900 truncate">
                    Olim Conectados
                  </span>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 shrink-0">
                    עולים
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium truncate">Guía y Comunidad</p>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button: Icon of "=" / Menu / Collapse */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
            title={isCollapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
            aria-label="Alternar menú lateral"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          
          {/* Quick Trending / Más Relevantes Section (Only shown when expanded) */}
          {!isCollapsed && (
            <div>
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Más Utilizados
                </span>
                <span className="text-[10px] text-gray-400">Por clics</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {topItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={`top-${item.id}`}
                      onClick={() => handleSelect(item.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left border transition text-xs font-semibold ${
                        isActive 
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold shadow-2xs' 
                          : 'bg-gray-50/70 border-gray-100 text-gray-700 hover:bg-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="truncate">{item.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categorized Menu Sections */}
          {categories.map((category) => {
            const items = ALL_NAV_ITEMS.filter((item) => item.category === category);
            return (
              <div key={category} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {category}
                  </p>
                )}
                <div className="space-y-1 pt-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        title={isCollapsed ? `${item.label} (${item.category})` : undefined}
                        className={`w-full flex items-center rounded-xl text-left text-xs font-medium transition-all group ${
                          isCollapsed 
                            ? 'justify-center p-3' 
                            : 'justify-between px-3 py-2.5'
                        } ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs font-bold'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-5 h-5 shrink-0 ${
                            isActive 
                              ? 'text-white' 
                              : item.alert 
                              ? 'text-rose-500' 
                              : 'text-gray-400 group-hover:text-gray-700'
                          }`} />
                          
                          {!isCollapsed && (
                            <span className="leading-snug break-words hyphens-auto">{item.label}</span>
                          )}
                        </div>

                        {!isCollapsed && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.badge && !isActive && (
                              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-md">
                                {item.badge}
                              </span>
                            )}
                            {item.alert && !isActive && (
                              <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded-md">
                                SOS
                              </span>
                            )}
                            <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-blue-200' : 'text-gray-300 group-hover:text-gray-500'}`} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Emergency Box - Unified Component */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50 shrink-0">
          {!isCollapsed ? (
            <div className="space-y-1">
              <EmergencyButton
                variant="solid"
                onClick={() => handleSelect('emergency')}
                className="w-full"
                showSubtext={true}
              />
            </div>
          ) : (
            <EmergencyButton
              variant="compact"
              onClick={() => handleSelect('emergency')}
              className="w-full"
            />
          )}
        </div>
      </aside>
    </>
  );
};
