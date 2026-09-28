import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { AssistantChat } from './components/AssistantChat';
import { DoctorsDirectory } from './components/DoctorsDirectory';
import { EmergencyGuide } from './components/EmergencyGuide';
import { BituajLeumiGuide } from './components/BituajLeumiGuide';
import { SickLeaveCalculator } from './components/SickLeaveCalculator';
import { DriverLicenseWizard } from './components/DriverLicenseWizard';
import { BureaucracyGuide } from './components/BureaucracyGuide';
import { CrisisCivilGuide } from './components/CrisisCivilGuide';
import { CommunityHub } from './components/CommunityHub';
import { NightlifeGuide } from './components/NightlifeGuide';
import { OlehChecklist } from './components/OlehChecklist';
import { BusinessPlanGuide } from './components/BusinessPlanGuide';
import { EmergencyButton } from './components/EmergencyButton';
import { INITIAL_DOCTORS, COMMUNITY_STORES, COMMUNITY_GROUPS, NIGHTLIFE_VENUES } from './data/mockData';
import { Doctor, DoctorReview } from './types';
import { 
  HeartHandshake, 
  AlertTriangle, 
  Bot,
  Compass
} from 'lucide-react';

// Mapeo entre identificador interno de pestaña y ruta de la URL
const TAB_TO_PATH: Record<string, string> = {
  assistant: '/',
  doctors: '/medicos-en-espanol',
  community: '/comunidad',
  nightlife: '/vida-nocturna',
  'business-plan': '/plan-de-negocio',
  emergency: '/emergencias',
  'crisis-civil': '/crisis-civil',
  bituaj: '/bituaj-leumi',
  'sick-leave': '/calculadora-dias-enfermedad',
  license: '/licencia-de-conducir',
  bureaucracy: '/tramites-y-burocracia',
  checklist: '/checklist-aliyah',
};

const PATH_TO_TAB: Record<string, string> = Object.entries(TAB_TO_PATH).reduce(
  (acc, [tab, path]) => {
    acc[path] = tab;
    return acc;
  },
  {} as Record<string, string>
);

const getTabFromPath = (pathname: string): string => {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  return PATH_TO_TAB[cleanPath] || 'assistant';
};

const INITIAL_CLICK_COUNTS: Record<string, number> = {
  assistant: 0,
  doctors: 0,
  community: 0,
  nightlife: 0,
  'business-plan': 0,
  emergency: 0,
  'crisis-civil': 0,
  bituaj: 0,
  'sick-leave': 0,
  license: 0,
  bureaucracy: 0,
  checklist: 0,
};

export default function App() {
  // Inicializa la pestaña según la ruta actual en la barra de direcciones
  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'assistant';
  });

  const [pendingChatQuery, setPendingChatQuery] = useState<string>('');
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('olim_community_doctors');
      return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('olim_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Cambia la pestaña activa y sincroniza la URL con pushState
  const navigateToTab = (tabId: string) => {
    setActiveTabState(tabId);
    const targetPath = TAB_TO_PATH[tabId] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tabId }, '', targetPath);
    }
  };

  // Maneja la navegación con los botones Atrás / Adelante del navegador
  useEffect(() => {
    const handlePopState = () => {
      const matchedTab = getTabFromPath(window.location.pathname);
      setActiveTabState(matchedTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('olim_sidebar_collapsed', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const [clickCounts, setClickCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('olim_tab_clicks');
      return saved ? JSON.parse(saved) : INITIAL_CLICK_COUNTS;
    } catch {
      return INITIAL_CLICK_COUNTS;
    }
  });

  const handleTabClick = (tabId: string) => {
    navigateToTab(tabId);
    setClickCounts((prev) => {
      const updated = {
        ...prev,
        [tabId]: (prev[tabId] || 0) + 1,
      };
      try {
        localStorage.setItem('olim_tab_clicks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleAddDoctor = (newDoc: Doctor) => {
    setDoctorsList((prev) => {
      const updated = [newDoc, ...prev];
      try {
        localStorage.setItem('olim_community_doctors', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleAddReview = (doctorId: string, newReview: DoctorReview) => {
    setDoctorsList((prev) => {
      const updated = prev.map((doc) => {
        if (doc.id === doctorId) {
          const updatedReviews = [newReview, ...(doc.reviews || [])];
          return {
            ...doc,
            reviews: updatedReviews,
            reviewsCount: (doc.reviewsCount || 0) + 1,
          };
        }
        return doc;
      });
      try {
        localStorage.setItem('olim_community_doctors', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Permanent Left Sidebar on Desktop / Drawer on Mobile */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        clickCounts={clickCounts}
        onItemClick={handleTabClick}
        isOpenMobile={isMobileSidebarOpen}
        setIsOpenMobile={setIsMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Wrapper */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* Topbar Header */}
        <Topbar
          activeTab={activeTab}
          setActiveTab={navigateToTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          clickCounts={clickCounts}
          onItemClick={handleTabClick}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          onSendQueryToChat={(q) => {
            setPendingChatQuery(q);
            navigateToTab('assistant');
            handleTabClick('assistant');
          }}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'assistant' && (
            <AssistantChat 
              initialQuery={pendingChatQuery} 
              onNavigateToTab={(tabId) => {
                navigateToTab(tabId);
                handleTabClick(tabId);
              }}
            />
          )}
          {activeTab === 'crisis-civil' && <CrisisCivilGuide />}
          {activeTab === 'business-plan' && <BusinessPlanGuide />}
          {activeTab === 'checklist' && (
            <OlehChecklist
              onNavigateToTab={(tabId) => {
                navigateToTab(tabId);
                handleTabClick(tabId);
              }}
            />
          )}
          {activeTab === 'doctors' && (
            <DoctorsDirectory 
              doctors={doctorsList} 
              onAddReview={handleAddReview}
              onAddDoctor={handleAddDoctor}
            />
          )}
          {activeTab === 'emergency' && <EmergencyGuide />}
          {activeTab === 'bituaj' && <BituajLeumiGuide />}
          {activeTab === 'sick-leave' && <SickLeaveCalculator />}
          {activeTab === 'license' && <DriverLicenseWizard />}
          {activeTab === 'bureaucracy' && <BureaucracyGuide />}
          {activeTab === 'community' && (
            <CommunityHub 
              stores={COMMUNITY_STORES} 
              groups={COMMUNITY_GROUPS} 
              onNavigateToNightlife={() => {
                navigateToTab('nightlife');
                handleTabClick('nightlife');
              }}
            />
          )}
          {activeTab === 'nightlife' && (
            <NightlifeGuide venues={NIGHTLIFE_VENUES} />
          )}
        </main>

        {/* Floating Quick Action trigger bar on Mobile */}
        <div className="lg:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs shadow-md">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex items-center gap-1.5 font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Ver Menú</span>
          </button>

          <EmergencyButton
            variant="compact"
            onClick={() => {
              navigateToTab('emergency');
              handleTabClick('emergency');
            }}
          />

          <button
            onClick={() => {
              navigateToTab('assistant');
              handleTabClick('assistant');
            }}
            className="flex items-center gap-1.5 font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Asistente IA</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 text-xs border-t border-gray-800 mt-12 py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <span>Olim Conectados</span>
                  <span className="text-[10px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded border border-blue-700">
                    עולים מחוברים
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed max-w-md">
                  Plataforma integral creada por y para la comunidad hispanohablante en Israel. Diseñada para ordenar la información, facilitar la navegación y acompañarte en cada etapa de la aliá.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-white font-bold uppercase text-[11px] tracking-wider">
                  Teléfonos Críticos
                </p>
                <ul className="space-y-1 text-gray-400">
                  <li><strong className="text-gray-200">101:</strong> Ambulancias MADA</li>
                  <li><strong className="text-gray-200">100:</strong> Policía de Israel</li>
                  <li><strong className="text-gray-200">*3555:</strong> Maccabi Sherutí Briut</li>
                  <li><strong className="text-gray-200">*2700:</strong> Clalit Sherutí Briut</li>
                  <li><strong className="text-gray-200">*2884:</strong> Terem Urgencias</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-white font-bold uppercase text-[11px] tracking-wider">
                  Organizaciones Clave
                </p>
                <ul className="space-y-1 text-gray-400">
                  <li>OLEI (Latinoamericanos en Israel)</li>
                  <li>Misrad HaAliyah ve-haKlitá</li>
                  <li>Bituaj Leumi (Seguridad Social)</li>
                  <li>Misrad HaRishuí (Transporte)</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
              <p>
                © {new Date().getFullYear()} Olim Conectados. Hecho con empatía para los Olim Jadashim de habla hispana.
              </p>
              <p className="text-center sm:text-right text-[10px] text-gray-400 max-w-xl">
                Descargo de responsabilidad: Orientación práctica comunitaria. No reemplaza dictámenes médicos oficiales, decisiones de Bituaj Leumi ni asesoría jurídica.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}
