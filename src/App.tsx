import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { IndexView } from './components/IndexView';
import { SectionHeader } from './components/SectionHeader';
import { FloatingAssistant } from './components/FloatingAssistant';
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
import { INITIAL_DOCTORS, COMMUNITY_STORES, COMMUNITY_GROUPS, NIGHTLIFE_VENUES } from './data/mockData';
import { Doctor, DoctorReview } from './types';
import { SECTIONS, SECTION_MAP } from './data/navigation';
import { BottomNav } from './components/BottomNav';
import { LogoSymbol } from './components/LogoSymbol';
import { Plus, Phone } from 'lucide-react';

// Mapeo entre identificador interno de pestaña y ruta de la URL
const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  assistant: '/asistente',
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
  return PATH_TO_TAB[cleanPath] || 'home';
};

export default function App() {
  // Pestaña activa sincronizada con la URL
  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'home';
  });

  // Control del tamaño de texto ("A+ Texto")
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    try {
      return localStorage.getItem('olim_text_size') === 'large';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [isLargeText]);

  const handleToggleLargeText = () => {
    setIsLargeText((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('olim_text_size', next ? 'large' : 'normal');
      } catch {}
      return next;
    });
  };

  // Estado del menú lateral:
  // "En el Index, mostrarlo CONTRAÍDO por defecto; en las secciones internas, expandido. Recordar la preferencia del usuario."
  const [userCollapsePref, setUserCollapsePref] = useState<'collapsed' | 'expanded' | null>(() => {
    try {
      const saved = localStorage.getItem('olim_sidebar_user_preference');
      return saved === 'collapsed' || saved === 'expanded' ? saved : null;
    } catch {
      return null;
    }
  });

  const isSidebarCollapsed = userCollapsePref
    ? userCollapsePref === 'collapsed'
    : activeTab === 'home'; // default: colapsado en Index, expandido en secciones internas

  const handleToggleCollapse = () => {
    const nextState = isSidebarCollapsed ? 'expanded' : 'collapsed';
    setUserCollapsePref(nextState);
    try {
      localStorage.setItem('olim_sidebar_user_preference', nextState);
    } catch {}
  };

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Estado del Asistente Flotante
  const [isFloatingAssistantOpen, setIsFloatingAssistantOpen] = useState<boolean>(false);
  const [floatingAssistantQuery, setFloatingAssistantQuery] = useState<string>('');

  // Lista de médicos con reviews y persistencia
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('olim_community_doctors');
      return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });

  // Navegación con pushState
  const navigateToTab = (tabId: string) => {
    setActiveTabState(tabId);
    const targetPath = TAB_TO_PATH[tabId] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tabId }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejo de PopState (atrás / adelante)
  useEffect(() => {
    const handlePopState = () => {
      const matchedTab = getTabFromPath(window.location.pathname);
      setActiveTabState(matchedTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenAssistantWithQuery = (query: string) => {
    if (activeTab === 'assistant') {
      // Si ya está en la vista completa del asistente
      setFloatingAssistantQuery(query);
    } else {
      // Abre la burbuja flotante con esa pregunta
      setFloatingAssistantQuery(query);
      setIsFloatingAssistantOpen(true);
    }
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

  const currentSection = SECTION_MAP[activeTab];

  return (
    <div className="min-h-screen bg-[#FBF3E6] text-[#0E2559] flex font-sans selection:bg-[#E8A33D] selection:text-[#0E2559]">
      
      {/* 1. Menú lateral colapsable */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={navigateToTab}
        isOpenMobile={isMobileSidebarOpen}
        setIsOpenMobile={setIsMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isLargeText={isLargeText}
        onToggleLargeText={handleToggleLargeText}
      />

      {/* 2. Envoltorio de Contenido Principal */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[290px]'
        }`}
      >
        {/* Barra Superior */}
        <Topbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onNavigateHome={() => navigateToTab('home')}
          onNavigateToTab={navigateToTab}
          onSendQueryToChat={(q) => handleOpenAssistantWithQuery(q)}
          isLargeText={isLargeText}
          onToggleLargeText={handleToggleLargeText}
        />

        {/* Viewport de Contenido con espaciado inferior: 164 px en celular, 96 px en notebook */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-[164px] lg:pb-[96px] flex flex-col justify-between">
          
          <div>
            {/* Index (Portada) */}
            {activeTab === 'home' && (
              <IndexView
                onNavigateToTab={navigateToTab}
                onOpenAssistantWithQuery={handleOpenAssistantWithQuery}
              />
            )}

            {/* Secciones Internas: Encabezado Universal + Contenido Original */}
            {activeTab !== 'home' && currentSection && (
              <div>
                {/* Encabezado Universal con color del grupo, migas de pan y tabs */}
                <SectionHeader
                  currentSection={currentSection}
                  onNavigateToTab={navigateToTab}
                  action={
                    activeTab === 'doctors' ? (
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('open-recommend-doctor'));
                        }}
                        className="min-h-[44px] bg-[#1F5F8B] hover:bg-[#194c70] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-2xs flex items-center gap-2 transition"
                      >
                        <Plus className="w-4 h-4 text-white" />
                        <span>Recomendar un médico</span>
                      </button>
                    ) : activeTab === 'community' ? (
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('open-add-store'));
                        }}
                        className="min-h-[44px] bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-2xs flex items-center gap-2 transition"
                      >
                        <Plus className="w-4 h-4 text-white" />
                        <span>Sumar un comercio</span>
                      </button>
                    ) : activeTab === 'business-plan' ? (
                      <a
                        href="tel:*2994"
                        className="min-h-[44px] bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-2xs flex items-center gap-2 transition"
                      >
                        <Phone className="w-4 h-4 text-white" />
                        <span>Llamar *2994</span>
                      </a>
                    ) : undefined
                  }
                />

                {/* Contenido propio de cada sección (intacto) */}
                <div>
                  {activeTab === 'assistant' && (
                    <AssistantChat 
                      initialQuery={floatingAssistantQuery} 
                      onNavigateToTab={navigateToTab}
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
                  {activeTab === 'business-plan' && <BusinessPlanGuide />}
                  {activeTab === 'crisis-civil' && <CrisisCivilGuide />}
                  {activeTab === 'checklist' && (
                    <OlehChecklist
                      onNavigateToTab={navigateToTab}
                    />
                  )}
                  {activeTab === 'bituaj' && <BituajLeumiGuide />}
                  {activeTab === 'sick-leave' && (
                    <SickLeaveCalculator onNavigateToTab={navigateToTab} />
                  )}
                  {activeTab === 'license' && <DriverLicenseWizard />}
                  {activeTab === 'bureaucracy' && <BureaucracyGuide />}
                  {activeTab === 'community' && (
                    <CommunityHub 
                      stores={COMMUNITY_STORES} 
                      groups={COMMUNITY_GROUPS} 
                      onNavigateToNightlife={() => navigateToTab('nightlife')}
                    />
                  )}
                  {activeTab === 'nightlife' && (
                    <NightlifeGuide venues={NIGHTLIFE_VENUES} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 6. Pie de Página Universal (Visible en todas las páginas) */}
          <footer className="mt-14 rounded-2xl bg-[#0E2559] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Logo Badge + Title + Verification */}
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                <LogoSymbol className="w-8 h-8" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg tracking-tight text-[#E8A33D] block">
                  Olim Conectados
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Información con fuente oficial · Última revisión: octubre 2026
                </p>
              </div>
            </div>

            {/* Right: Quick Links */}
            <nav aria-label="Enlaces rápidos del pie" className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-semibold text-white/90">
              <button 
                onClick={() => navigateToTab('doctors')}
                className="hover:text-[#E8A33D] transition focus:outline-none"
              >
                Salud
              </button>
              <button 
                onClick={() => navigateToTab('bureaucracy')}
                className="hover:text-[#E8A33D] transition focus:outline-none"
              >
                Trámites
              </button>
              <button 
                onClick={() => navigateToTab('community')}
                className="hover:text-[#E8A33D] transition focus:outline-none"
              >
                Comunidad
              </button>
              <a 
                href="tel:101"
                className="hover:text-[#E8A33D] transition focus:outline-none text-[#E8A33D]"
              >
                Emergencia 101
              </a>
            </nav>
          </footer>

        </main>
      </div>

      {/* 4 & 5. Asistente IA Olim (Burbuja Flotante y Panel/Drawer) */}
      <FloatingAssistant
        activeTab={activeTab}
        isOpen={isFloatingAssistantOpen}
        onToggle={() => setIsFloatingAssistantOpen((prev) => !prev)}
        onClose={() => setIsFloatingAssistantOpen(false)}
        presetQuery={floatingAssistantQuery}
        onNavigateToTab={navigateToTab}
      />

      {/* 3. Barra de Navegación Inferior en Celular (lg:hidden) */}
      <BottomNav
        activeTab={activeTab}
        onNavigateToTab={navigateToTab}
      />

      <Analytics />
    </div>
  );
}
