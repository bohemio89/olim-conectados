import React, { useState } from 'react';
import { 
  User, 
  CheckSquare, 
  HeartHandshake, 
  Stethoscope, 
  Siren, 
  Ticket, 
  Users, 
  ClipboardCheck, 
  Store, 
  Landmark, 
  HardHat, 
  Calculator, 
  Car, 
  Martini, 
  MessageCirclePlus,
  Check
} from 'lucide-react';
import { LogoSymbol } from './LogoSymbol';
import { CategoryGroupId } from '../data/navigation';

interface IndexViewProps {
  onNavigateToTab: (tabId: string) => void;
  onOpenAssistantWithQuery: (query: string) => void;
}

export const IndexView: React.FC<IndexViewProps> = ({
  onNavigateToTab,
  onOpenAssistantWithQuery,
}) => {
  // 1. Checklist State
  const [selectedStage, setSelectedStage] = useState<string>(() => {
    try {
      return localStorage.getItem('olim_index_stage') || 'Recién llegué';
    } catch {
      return 'Recién llegué';
    }
  });

  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('olim_index_checklist_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const checklistItems = [
    { id: 1, name: 'Teudat Olé' },
    { id: 2, name: 'Cuenta bancaria' },
    { id: 3, name: 'Kupat Jolim' },
    { id: 4, name: 'Ulpán' },
    { id: 5, name: 'Bituaj Leumi' },
    { id: 6, name: 'Tofes 101' },
  ];

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('olim_index_checklist_steps', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleStageSelect = (stage: string) => {
    setSelectedStage(stage);
    try {
      localStorage.setItem('olim_index_stage', stage);
    } catch {}
  };

  // 2. "Todo en un lugar" filter
  const [activeGroupFilter, setActiveGroupFilter] = useState<'all' | CategoryGroupId>('all');

  // 3. "Las preguntas de siempre" data
  const frequentQuestions = [
    {
      topic: 'SALUD',
      topicColor: 'bg-[#1F5F8B]',
      question: '¿Hay médicos que hablen español en mi Kupá?',
    },
    {
      topic: 'COMUNIDAD',
      topicColor: 'bg-[#2A7050]',
      question: '¿Dónde compro yerba en Tel Aviv?',
    },
    {
      topic: 'TRÁMITES',
      topicColor: 'bg-[#6B4FA0]',
      question: '¿Mi licencia argentina vencida se renueva o empiezo de cero?',
    },
    {
      topic: 'URGENTE',
      topicColor: 'bg-[#C0392B]',
      question: '¿Puedo ir al Miún sin derivación?',
    },
    {
      topic: 'SALUD',
      topicColor: 'bg-[#1F5F8B]',
      question: '¿Cómo activo mi cobertura en Maccabi o Clalit?',
    },
    {
      topic: 'TRÁMITES',
      topicColor: 'bg-[#6B4FA0]',
      question: 'Tengo dolor por mi trabajo: ¿qué hago con Bituaj Leumi?',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 font-sans">
      
      {/* ========================================================
          1. BANNER DE MARCA (Matching reference screenshot)
          ======================================================== */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#FFF5DF] border border-[#F2DEB0] shadow-xs p-6 sm:p-10 md:p-12">
        {/* Soft Sun Circle in the background */}
        <div 
          className="absolute top-6 right-16 sm:right-24 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#F5D59A]/80 pointer-events-none" 
          aria-hidden="true" 
        />
        
        {/* Flat City Skyline Silhouette Bars at bottom right */}
        <div 
          className="absolute bottom-0 right-4 sm:right-10 flex items-end gap-1.5 pointer-events-none opacity-40 z-0"
          aria-hidden="true"
        >
          <div className="w-5 h-20 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-6 h-32 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-4 h-18 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-7 h-40 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-5 h-26 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-6 h-44 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-5 h-22 bg-[#C8B89E] rounded-t-xs" />
          <div className="w-7 h-34 bg-[#C8B89E] rounded-t-xs" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Símbolo grande con nombre y bajada */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <LogoSymbol className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 drop-shadow-sm" />
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#0E2559] leading-none uppercase">
              OLIM CONECTADOS
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#0E2559]/75 leading-snug">
              Toda la información de tu Aliyah en español
            </p>
          </div>

          {/* Right Column: שלום 👋 + Tu vida en Israel + Botones de Acción */}
          <div className="lg:col-span-7 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-[#0E2559]">
              <span lang="he" dir="rtl">שלום</span>
              <span>👋</span>
            </div>

            <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2559] tracking-tight leading-tight">
              Tu vida en Israel,<br />más simple.
            </h1>

            <p className="mt-2 text-sm sm:text-base text-[#0E2559]/80 font-medium max-w-lg leading-relaxed">
              Médicos, trámites y comunidad, todo reunido en español.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              {/* Botón Naranja: Explorar secciones */}
              <button
                onClick={() => {
                  const el = document.getElementById('todo-en-un-lugar');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-full bg-[#E8A33D] hover:bg-[#df9932] text-[#0E2559] font-bold text-sm shadow-xs transition active:scale-95"
              >
                Explorar secciones
              </button>

              {/* Botón Marino: Empezar mi checklist */}
              <button
                onClick={() => onNavigateToTab('checklist')}
                className="px-6 py-2.5 rounded-full bg-[#0E2559] hover:bg-[#16336f] text-white font-bold text-sm shadow-xs transition active:scale-95"
              >
                Empezar mi checklist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRES SEÑALES DE CONFIANZA
          ======================================================== */}
      <section aria-label="Señales de confianza" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Todo en español */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#0E2559]/10 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#1F5F8B]/10 flex items-center justify-center text-[#1F5F8B] shrink-0">
            <User className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0E2559]">Todo en español</h3>
            <p className="text-xs text-[#0E2559]/70 mt-0.5">Explicado sin vueltas</p>
          </div>
        </div>

        {/* 2. Fuentes oficiales */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#0E2559]/10 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2A7050]/10 flex items-center justify-center text-[#2A7050] shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0E2559]">Fuentes oficiales</h3>
            <p className="text-xs text-[#0E2559]/70 mt-0.5">Información revisada periódicamente</p>
          </div>
        </div>

        {/* 3. Por y para olim */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#0E2559]/10 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#E8A33D]/15 flex items-center justify-center text-[#E8A33D] shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0E2559]">Por y para olim</h3>
            <p className="text-xs text-[#0E2559]/70 mt-0.5">Hecho desde la experiencia real</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. "¿QUÉ NECESITÁS HOY?" (4 Tarjetas Pastel + Alerta Amarilla)
          ======================================================== */}
      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[#0E2559] tracking-tight">
          ¿Qué necesitás hoy?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Necesito un médico */}
          <button
            onClick={() => onNavigateToTab('doctors')}
            className="text-left bg-[#E8F3FA] hover:bg-[#def0fa] rounded-2xl p-5 border border-sky-100 transition-all hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1F5F8B] text-white flex items-center justify-center shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2559] mt-3 leading-snug">
              Necesito un médico
            </h3>
            <p className="text-xs text-[#0E2559]/70 mt-1">
              Directorio en español por Kupá
            </p>
          </button>

          {/* Card 2: Es urgente */}
          <button
            onClick={() => onNavigateToTab('emergency')}
            className="text-left bg-[#FDEDE8] hover:bg-[#fae4dc] rounded-2xl p-5 border border-red-100 transition-all hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C0392B] text-white flex items-center justify-center shadow-xs">
              <Siren className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2559] mt-3 leading-snug">
              Es urgente
            </h3>
            <p className="text-xs text-[#0E2559]/70 mt-1">
              Guardia, Miún y MADA 101
            </p>
          </button>

          {/* Card 3: Tengo un trámite */}
          <button
            onClick={() => onNavigateToTab('bureaucracy')}
            className="text-left bg-[#F3EEFA] hover:bg-[#ede5fa] rounded-2xl p-5 border border-purple-100 transition-all hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6B4FA0] text-white flex items-center justify-center shadow-xs">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2559] mt-3 leading-snug">
              Tengo un trámite
            </h3>
            <p className="text-xs text-[#0E2559]/70 mt-1">
              Tofes 101, MyVisit, Bituaj Leumi
            </p>
          </button>

          {/* Card 4: Quiero conectar */}
          <button
            onClick={() => onNavigateToTab('community')}
            className="text-left bg-[#E7F6EE] hover:bg-[#dceede] rounded-2xl p-5 border border-emerald-100 transition-all hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2A7050] text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0E2559] mt-3 leading-snug">
              Quiero conectar
            </h3>
            <p className="text-xs text-[#0E2559]/70 mt-1">
              Comunidad, comercios y fiestas
            </p>
          </button>
        </div>

        {/* Tarjeta Amarilla "Antes de ir a la guardia" (abajo de las 4 tarjetas) */}
        <div className="bg-[#FFF9EA] border border-[#FBE3B5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Siren className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0E2559]">
                Antes de ir a la guardia
              </h4>
              <p className="text-xs text-[#0E2559]/80 mt-0.5">
                No vayas al Miún por fiebre sin derivación previa (hafniá): podés recibir una factura de cientos de shékels.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('emergency')}
            className="px-5 py-2 rounded-full bg-[#0E2559] hover:bg-[#16336f] text-white font-bold text-xs sm:text-sm whitespace-nowrap self-end sm:self-center transition shadow-xs"
          >
            Ver guía Miún
          </button>
        </div>
      </section>

      {/* ========================================================
          4. "TU CAMINO COMO OLEH" (Checklist Teaser Interactivo)
          ======================================================== */}
      <section className="space-y-3">
        <h2 className="text-2xl font-black text-[#0E2559] tracking-tight">
          Tu camino como Oleh
        </h2>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0E2559]/10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#0E2559]">
                Empezá tu checklist de Oleh
              </h3>
              <p className="text-xs text-[#0E2559]/70 mt-0.5">
                Contanos en qué momento estás y te mostramos lo que sigue. Tu avance se guarda en tu dispositivo.
              </p>
            </div>

            <button
              onClick={() => onNavigateToTab('checklist')}
              className="px-6 py-2 rounded-full bg-[#0E2559] hover:bg-[#16336f] text-white font-bold text-xs sm:text-sm whitespace-nowrap self-start sm:self-center shadow-xs transition"
            >
              Empezar
            </button>
          </div>

          {/* Chips de etapa */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {['Aún no llegué', 'Recién llegué', 'Hace unos meses', 'Más de un año'].map((stage) => {
              const isSelected = selectedStage === stage;
              return (
                <button
                  key={stage}
                  onClick={() => handleStageSelect(stage)}
                  className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-[#0E2559] text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {stage}
                </button>
              );
            })}
          </div>

          {/* 6 Pasos Numerados en una fila con línea conectora */}
          <div className="relative pt-2 pb-2">
            {/* Horizontal connecting line behind circles */}
            <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-slate-200 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
              {checklistItems.map((item) => {
                const isDone = !!completedSteps[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleStep(item.id)}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all shadow-2xs ${
                      isDone
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-[#0E2559] bg-white text-[#0E2559] group-hover:bg-[#0E2559] group-hover:text-white'
                    }`}>
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : item.id}
                    </div>
                    <span className={`text-xs font-bold mt-2 leading-tight ${isDone ? 'text-emerald-700' : 'text-[#0E2559]'}`}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. "TODO EN UN LUGAR" (12 Secciones con 4 Destacadas)
          ======================================================== */}
      <section id="todo-en-un-lugar" className="space-y-3 scroll-mt-20">
        <div>
          <h2 className="text-2xl font-black text-[#0E2559] tracking-tight">
            Todo en un lugar
          </h2>
          <p className="text-xs sm:text-sm text-[#0E2559]/70 mt-0.5">
            Las 12 secciones, con lo más usado destacado
          </p>
        </div>

        {/* Chips de filtro por grupo */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setActiveGroupFilter('all')}
            className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              activeGroupFilter === 'all'
                ? 'bg-[#0E2559] text-white'
                : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            Todas (12)
          </button>
          <button
            onClick={() => setActiveGroupFilter('salud')}
            className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              activeGroupFilter === 'salud'
                ? 'bg-[#0E2559] text-white'
                : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            Asistencia & Salud
          </button>
          <button
            onClick={() => setActiveGroupFilter('tramites')}
            className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              activeGroupFilter === 'tramites'
                ? 'bg-[#0E2559] text-white'
                : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            Derechos & Trámites
          </button>
          <button
            onClick={() => setActiveGroupFilter('comunidad')}
            className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
              activeGroupFilter === 'comunidad'
                ? 'bg-[#0E2559] text-white'
                : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            Comunidad & Emprendimientos
          </button>
        </div>

        {/* Grilla de 12 Tarjetas según imagen de referencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* ================= FILA 1 (2 destacadas 2 cols, Azul #1F5F8B) ================= */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'salud') && (
            <>
              {/* Card 1: Médicos en Español */}
              <button
                onClick={() => onNavigateToTab('doctors')}
                className={`text-left bg-[#1F5F8B] text-white rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                  activeGroupFilter === 'all' ? 'col-span-1 md:col-span-2 min-h-[160px]' : 'col-span-1 min-h-[160px]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-white text-[#0E2559] font-bold text-xs px-3 py-0.5 rounded-full shadow-2xs">
                      Top
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-white mt-4 leading-tight">
                    Médicos en Español
                  </h3>
                  <p className="text-xs text-white/90 mt-1">
                    Directorio por Kupá
                  </p>
                </div>
                <p className="text-xs text-white/70 mt-3 pt-2 border-t border-white/10">
                  Maccabi · Clalit · Meuhedet · Leumit
                </p>
              </button>

              {/* Card 2: Guardia & Miún SOS */}
              <button
                onClick={() => onNavigateToTab('emergency')}
                className={`text-left bg-[#1F5F8B] text-white rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                  activeGroupFilter === 'all' ? 'col-span-1 md:col-span-2 min-h-[160px]' : 'col-span-1 min-h-[160px]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Siren className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-white text-[#0E2559] font-bold text-xs px-3 py-0.5 rounded-full shadow-2xs">
                      SOS
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-white mt-4 leading-tight">
                    Guardia & Miún SOS
                  </h3>
                  <p className="text-xs text-white/90 mt-1">
                    Evitá facturas de guardia
                  </p>
                </div>
                <p className="text-xs text-white/70 mt-3 pt-2 border-t border-white/10">
                  Hafniá, copagos y teléfonos útiles
                </p>
              </button>
            </>
          )}

          {/* ================= FILA 2 (2 destacadas 2 cols, Violeta #6B4FA0) ================= */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'tramites') && (
            <>
              {/* Card 3: Mi Checklist de Oleh */}
              <button
                onClick={() => onNavigateToTab('checklist')}
                className={`text-left bg-[#6B4FA0] text-white rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                  activeGroupFilter === 'all' ? 'col-span-1 md:col-span-2 min-h-[160px]' : 'col-span-1 min-h-[160px]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-white text-[#0E2559] font-bold text-xs px-3 py-0.5 rounded-full shadow-2xs">
                      Nuevo
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-white mt-4 leading-tight">
                    Mi Checklist de Oleh
                  </h3>
                  <p className="text-xs text-white/90 mt-1">
                    Tu ruta paso a paso
                  </p>
                </div>
                <p className="text-xs text-white/70 mt-3 pt-2 border-t border-white/10">
                  Seis pasos para ordenar tu llegada
                </p>
              </button>

              {/* Card 4: Trámites & Vouchers */}
              <button
                onClick={() => onNavigateToTab('bureaucracy')}
                className={`text-left bg-[#6B4FA0] text-white rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                  activeGroupFilter === 'all' ? 'col-span-1 md:col-span-2 min-h-[160px]' : 'col-span-1 min-h-[160px]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-white mt-4 leading-tight">
                    Trámites & Vouchers
                  </h3>
                  <p className="text-xs text-white/90 mt-1">
                    Tofes 101, MyVisit, Ulpán
                  </p>
                </div>
                <p className="text-xs text-white/70 mt-3 pt-2 border-t border-white/10">
                  Descuento de Arnoná, licencias y más
                </p>
              </button>
            </>
          )}

          {/* ================= FILA 3 (4 tarjetas 1 col) ================= */}
          {/* Card 5: Asistente IA Olim (Azul) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'salud') && (
            <button
              onClick={() => onNavigateToTab('assistant')}
              className="text-left bg-[#1F5F8B] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <MessageCirclePlus className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-white text-[#0E2559] font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
                    Popular
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Asistente IA Olim
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Preguntá lo que quieras
                </p>
              </div>
            </button>
          )}

          {/* Card 6: Plan de Negocio (Violeta) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'tramites') && (
            <button
              onClick={() => onNavigateToTab('business-plan')}
              className="text-left bg-[#6B4FA0] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-white text-[#0E2559] font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
                    Oficial
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Plan de Negocio
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Asesoría gratuita para emprender
                </p>
              </div>
            </button>
          )}

          {/* Card 7: Crisis, Economía & Vida Civil (Violeta) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'tramites') && (
            <button
              onClick={() => onNavigateToTab('crisis-civil')}
              className="text-left bg-[#6B4FA0] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Crisis, Economía & Vida Civil
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Sal Klitá, alquiler, Teum Mas
                </p>
              </div>
            </button>
          )}

          {/* Card 8: Accidente & Bituaj Leumi (Violeta) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'tramites') && (
            <button
              onClick={() => onNavigateToTab('bituaj')}
              className="text-left bg-[#6B4FA0] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <HardHat className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Accidente & Bituaj Leumi
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Formulario BL 250
                </p>
              </div>
            </button>
          )}

          {/* ================= FILA 4 (4 tarjetas 1 col) ================= */}
          {/* Card 9: Calculadora Días Majalá (Violeta) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'tramites') && (
            <button
              onClick={() => onNavigateToTab('sick-leave')}
              className="text-left bg-[#6B4FA0] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Calculadora Días Majalá
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Simulador legal de días
                </p>
              </div>
            </button>
          )}

          {/* Card 10: Licencia de Conducir (Violeta) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'tramites') && (
            <button
              onClick={() => onNavigateToTab('license')}
              className="text-left bg-[#6B4FA0] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Licencia de Conducir
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Canje y reválida
                </p>
              </div>
            </button>
          )}

          {/* Card 11: Comunidad & Redes (Verde #2A7050) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'comunidad') && (
            <button
              onClick={() => onNavigateToTab('community')}
              className="text-left bg-[#2A7050] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Comunidad & Redes
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Grupos y comercios
                </p>
              </div>
            </button>
          )}

          {/* Card 12: Vida Nocturna (Verde #2A7050) */}
          {(activeGroupFilter === 'all' || activeGroupFilter === 'comunidad') && (
            <button
              onClick={() => onNavigateToTab('nightlife')}
              className="text-left bg-[#2A7050] text-white rounded-2xl p-5 transition-all hover:shadow-md flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Martini className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-base text-white mt-3 leading-snug">
                  Vida Nocturna
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  Fiestas para olim
                </p>
              </div>
            </button>
          )}

        </div>
      </section>

      {/* ========================================================
          6. "LAS PREGUNTAS DE SIEMPRE" (6 Tarjetas FAQ)
          ======================================================== */}
      <section className="space-y-3">
        <div>
          <h2 className="text-2xl font-black text-[#0E2559] tracking-tight">
            Las preguntas de siempre
          </h2>
          <p className="text-xs sm:text-sm text-[#0E2559]/70 mt-0.5">
            Las que se repiten en los grupos, respondidas en un solo lugar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {frequentQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onOpenAssistantWithQuery(item.question)}
              className="group text-left bg-white rounded-2xl p-5 border border-[#0E2559]/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded text-white ${item.topicColor}`}>
                  {item.topic}
                </span>
                <p className="text-sm font-bold text-[#0E2559] mt-2.5 leading-snug">
                  {item.question}
                </p>
              </div>

              <div className="mt-4 pt-2">
                <span className="text-xs font-bold text-[#6B4FA0] group-hover:underline">
                  Ver respuesta →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. PIE DE PÁGINA (Footer matching reference image)
          ======================================================== */}
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
              Información revisada periódicamente con fuentes oficiales. Última revisión: Octubre 2026
            </p>
          </div>
        </div>

        {/* Right: Quick Links */}
        <nav aria-label="Enlaces rápidos" className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-semibold text-white/90">
          <button 
            onClick={() => onNavigateToTab('doctors')}
            className="hover:text-[#E8A33D] transition focus:outline-none"
          >
            Salud
          </button>
          <button 
            onClick={() => onNavigateToTab('bureaucracy')}
            className="hover:text-[#E8A33D] transition focus:outline-none"
          >
            Trámites
          </button>
          <button 
            onClick={() => onNavigateToTab('community')}
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

    </div>
  );
};
