import React from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  Briefcase, 
  Calculator, 
  Car, 
  FileText, 
  ShoppingBag, 
  Bot,
  HeartHandshake,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'assistant', label: 'Asistente IA', icon: Bot, highlight: true },
    { id: 'crisis-civil', label: 'Crisis, Economía & Vida Civil', icon: ShieldAlert },
    { id: 'doctors', label: 'Médicos en Español', icon: Stethoscope },
    { id: 'emergency', label: 'Guardia & Miún', icon: AlertTriangle, alert: true },
    { id: 'bituaj', label: 'Accidente & Bituaj Leumi', icon: Briefcase },
    { id: 'sick-leave', label: 'Calculadora Días Majalá', icon: Calculator },
    { id: 'license', label: 'Licencia de Conducir', icon: Car },
    { id: 'bureaucracy', label: 'Trámites & Vouchers', icon: FileText },
    { id: 'community', label: 'Comunidad & Locales', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600/40 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
              🇮🇱 OLIM JADASHIM
            </span>
            <span className="hidden sm:inline text-blue-100">
              Guía oficial comunitaria para hispanohablantes en Israel · Previene cobros innecesarios
            </span>
            <span className="sm:hidden text-blue-100 text-[11px]">
              Guía comunitaria de salud y trámites en Israel
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Alerta Miún: Exigí siempre Hafniá
            </span>
            <span className="text-blue-300">|</span>
            <button
              onClick={() => setActiveTab('emergency')}
              className="text-white hover:text-amber-200 underline font-semibold transition"
            >
              Urgencias MADA 101
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('assistant')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 text-blue-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  Olim Conectados
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md border border-blue-200">
                  עולים
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                Salud, Derechos Laborales y Comunidad
              </p>
            </div>
          </div>

          {/* Quick Action SOS Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('emergency')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>SOS Guardia / Miún</span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Preguntale al Asistente IA</span>
              <span className="sm:hidden">Asistente</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-gray-100 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                } ${item.alert && !isActive ? 'text-rose-600 hover:bg-rose-50' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.alert ? 'text-rose-500' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                {item.alert && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
