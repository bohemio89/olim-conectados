import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Stethoscope, 
  Sparkles, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Doctor, KupaName, DoctorReview } from '../types';

interface DoctorsDirectoryProps {
  doctors: Doctor[];
  onAddReview: (doctorId: string, review: DoctorReview) => void;
  onAddDoctor: (newDoctor: Doctor) => void;
}

const AVAILABLE_KUPOT = ['Clalit', 'Maccabi', 'Meuhedet', 'Leumit', 'Privado'];

// 3. Unifica las ciudades al filtrar: "Tel Aviv - Yafo" y "Tel Aviv-Yafo" son la misma (usa "Tel Aviv-Yafo")
export const normalizeCity = (city: string): string => {
  if (!city) return '';
  const trimmed = city.trim();
  if (
    trimmed === 'Tel Aviv - Yafo' || 
    trimmed === 'Tel Aviv' || 
    trimmed === 'Tel Aviv-Yafo' ||
    trimmed.startsWith('Tel Aviv-Yafo')
  ) {
    return 'Tel Aviv-Yafo';
  }
  return trimmed;
};

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({ 
  doctors: initialDoctors, 
  onAddReview,
  onAddDoctor 
}) => {
  const [cloudDoctors, setCloudDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKupa, setSelectedKupa] = useState<string>('Todas');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  // Por defecto en Tel Aviv-Yafo como en las imágenes de referencia
  const [selectedCity, setSelectedCity] = useState<string>('Tel Aviv-Yafo');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Sincronización inicial desde la base de datos en la nube (Supabase)
  useEffect(() => {
    const fetchCloudDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const formatted: Doctor[] = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              specialty: item.specialty,
              city: item.city,
              address: item.address || undefined,
              phone: item.phone || 'No especificado',
              kupot: item.kupa ? [item.kupa] : [],
              consultationFocus: item.verified ? 'VERIFICADO en la cartilla oficial' : item.consultationFocus,
              reviews: Array.isArray(item.comments)
                ? item.comments.map((c: any, idx: number) => ({
                    id: c.id || `rev-${idx}-${Date.now()}`,
                    author: c.author || 'Olé de la comunidad',
                    date: c.date || 'Reciente',
                    comment: c.comment || c.text || '',
                    isVerifiedOle: c.isVerifiedOle ?? true,
                  }))
                : [],
              reviewsCount: Array.isArray(item.comments) ? item.comments.length : 0,
              isCommunityAdded: true,
              uploadedAt: item.created_at ? new Date(item.created_at).toLocaleDateString('es-ES') : 'Reciente',
              officialLink: item.officialLink || item.official_link || undefined
            }));
            setCloudDoctors(formatted);
          }
        }
      } catch (err) {
        console.warn('Error cargando médicos desde la nube:', err);
      }
    };

    fetchCloudDoctors();
  }, []);

  // Fusión: Médicos iniciales + Médicos de la nube
  const allDoctors: Doctor[] = useMemo(() => [
    ...cloudDoctors,
    ...initialDoctors.filter((doc) => !cloudDoctors.some((cDoc) => cDoc.id === doc.id || cDoc.name.toLowerCase() === doc.name.toLowerCase()))
  ], [cloudDoctors, initialDoctors]);

  // 1. Muestra solo los médicos verificados: los que tienen "VERIFICADO" en consultationFocus
  const verifiedDoctors: Doctor[] = useMemo(() => {
    return allDoctors.filter((doc) => {
      const focus = doc.consultationFocus || '';
      return focus.includes('VERIFICADO');
    });
  }, [allDoctors]);

  // Cantidades calculadas por Kupá sobre los médicos verificados
  const kupaCounts = useMemo(() => {
    return {
      Todas: verifiedDoctors.length,
      Clalit: verifiedDoctors.filter((d) => d.kupot.includes('Clalit')).length,
      Maccabi: verifiedDoctors.filter((d) => d.kupot.includes('Maccabi')).length,
      Meuhedet: verifiedDoctors.filter((d) => d.kupot.includes('Meuhedet')).length,
      Leumit: verifiedDoctors.filter((d) => d.kupot.includes('Leumit')).length,
      Privado: verifiedDoctors.filter((d) => d.kupot.includes('Privado')).length,
    };
  }, [verifiedDoctors]);

  // Extraer lista única de ciudades normalizadas y especialidades
  const cities = useMemo(() => [
    'Todas',
    ...Array.from(new Set(verifiedDoctors.map((d) => normalizeCity(d.city)).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es'))
  ], [verifiedDoctors]);

  const specialties = useMemo(() => [
    'Todas',
    ...Array.from(new Set(verifiedDoctors.map((d) => d.specialty).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es'))
  ], [verifiedDoctors]);

  // 4. Al cambiar un filtro, vuelve a 12
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedKupa, selectedCity, selectedSpecialty, searchTerm]);

  // Filtrado de médicos
  const filteredDoctors = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return verifiedDoctors.filter((doc) => {
      const docCity = normalizeCity(doc.city);
      const matchesSearch =
        !term ||
        doc.name.toLowerCase().includes(term) ||
        doc.specialty.toLowerCase().includes(term) ||
        docCity.toLowerCase().includes(term) ||
        (doc.address && doc.address.toLowerCase().includes(term));

      const matchesKupa =
        selectedKupa === 'Todas' || doc.kupot.includes(selectedKupa as KupaName);

      const matchesSpecialty =
        selectedSpecialty === 'Todas' || doc.specialty === selectedSpecialty;

      const matchesCity = selectedCity === 'Todas' || docCity === selectedCity;

      return matchesSearch && matchesKupa && matchesSpecialty && matchesCity;
    });
  }, [verifiedDoctors, selectedKupa, selectedCity, selectedSpecialty, searchTerm]);

  // Modal State para recomendar / agregar
  const [modalMode, setModalMode] = useState<'addDoctor' | 'addReview' | null>(null);
  const [selectedDoctorForReview, setSelectedDoctorForReview] = useState<Doctor | null>(null);

  // Form Fields
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [doctorCity, setDoctorCity] = useState('');
  const [doctorAddress, setDoctorAddress] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [doctorOfficialLink, setDoctorOfficialLink] = useState('');
  const [selectedKupot, setSelectedKupot] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Moderation state
  const [isCheckingModeration, setIsCheckingModeration] = useState(false);
  const [moderationFeedback, setModerationFeedback] = useState<{
    isAllowed: boolean;
    flagged: boolean;
    reason: string;
    suggestedRewrite?: string;
  } | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const openAddDoctorModal = () => {
    setModalMode('addDoctor');
    setSelectedDoctorForReview(null);
    setDoctorName('');
    setDoctorSpecialty('');
    setDoctorCity('');
    setDoctorAddress('');
    setDoctorPhone('');
    setDoctorOfficialLink('');
    setSelectedKupot([]);
    setAuthorName('');
    setCommentText('');
    setModerationFeedback(null);
    setSubmissionSuccess(false);
  };

  // Escuchar evento del botón en el encabezado
  useEffect(() => {
    const handleOpenRecommend = () => openAddDoctorModal();
    window.addEventListener('open-recommend-doctor', handleOpenRecommend);
    return () => window.removeEventListener('open-recommend-doctor', handleOpenRecommend);
  }, []);

  const closeModal = () => {
    setModalMode(null);
    setSelectedDoctorForReview(null);
    setModerationFeedback(null);
    setSubmissionSuccess(false);
  };

  const handleKupaToggle = (kupa: string) => {
    if (selectedKupot.includes(kupa)) {
      setSelectedKupot(selectedKupot.filter((k) => k !== kupa));
    } else {
      setSelectedKupot([...selectedKupot, kupa]);
    }
  };

  const handleTestOrSubmit = async (submitDirectly: boolean = false) => {
    if (!commentText.trim()) return;
    if (
      modalMode === 'addDoctor' &&
      (!doctorName.trim() || !doctorSpecialty.trim() || !doctorCity.trim() || !doctorAddress.trim())
    ) {
      alert('Por favor completa todos los campos requeridos: Nombre, Especialidad, Ciudad y Dirección.');
      return;
    }

    setIsCheckingModeration(true);
    setModerationFeedback(null);

    try {
      const res = await fetch('/api/moderate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewText: commentText,
          doctorName: modalMode === 'addDoctor' ? doctorName : selectedDoctorForReview?.name,
          specialty: modalMode === 'addDoctor' ? doctorSpecialty : selectedDoctorForReview?.specialty,
        }),
      });

      const data = await res.json();
      setModerationFeedback(data);

      if (submitDirectly && data.isAllowed && !data.flagged) {
        completeSubmission(commentText);
      }
    } catch (err) {
      console.error('Error al moderar reseña:', err);
      const forbidden = /estafador|inútil|pelotudo|boludo|hijo de|chanta|garca/i.test(commentText);
      if (forbidden) {
        setModerationFeedback({
          isAllowed: false,
          flagged: true,
          reason: 'Detectamos descalificaciones personales o agravios contrarios a la ley de difamación (Lashon Hará).',
          suggestedRewrite: 'Durante la consulta considero que la atención fue apresurada y no se explicaron suficientes opciones previas antes de plantear tratamientos.',
        });
      } else {
        if (submitDirectly) {
          completeSubmission(commentText);
        } else {
          setModerationFeedback({
            isAllowed: true,
            flagged: false,
            reason: 'Comentario aprobado: se enfoca en hechos objetivos de la consulta.',
          });
        }
      }
    } finally {
      setIsCheckingModeration(false);
    }
  };

  const completeSubmission = async (text: string) => {
    const todayStr = new Date().toLocaleDateString('es-ES');

    if (modalMode === 'addDoctor') {
      const newReview: DoctorReview = {
        id: `rev-${Date.now()}`,
        author: authorName.trim() || 'Olé de la comunidad',
        date: todayStr,
        comment: text.trim(),
        isVerifiedOle: true,
      };

      const newDoctorEntry: Doctor = {
        id: `doc-${Date.now()}`,
        name: doctorName.trim(),
        specialty: doctorSpecialty.trim(),
        city: doctorCity.trim(),
        address: doctorAddress.trim(),
        phone: doctorPhone.trim() || 'No especificado',
        kupot: selectedKupot,
        consultationFocus: 'VERIFICADO en la cartilla oficial',
        reviews: [newReview],
        reviewsCount: 1,
        isCommunityAdded: true,
        uploadedAt: todayStr,
        officialLink: doctorOfficialLink.trim() || undefined,
      };

      try {
        await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: newDoctorEntry.id,
            name: newDoctorEntry.name,
            specialty: newDoctorEntry.specialty,
            kupa: selectedKupot.join(', '),
            city: newDoctorEntry.city,
            address: newDoctorEntry.address,
            phone: newDoctorEntry.phone,
            source: 'Comunidad',
            verified: true,
            officialLink: newDoctorEntry.officialLink,
            comments: [
              {
                author: newReview.author,
                date: newReview.date,
                comment: newReview.comment,
                text: newReview.comment
              }
            ]
          }),
        });
      } catch (err) {
        console.error('Error persistiendo en Supabase:', err);
      }

      setCloudDoctors((prev) => [newDoctorEntry, ...prev]);
      onAddDoctor(newDoctorEntry);
      setSubmissionSuccess(true);
    }

    setTimeout(() => {
      closeModal();
    }, 1800);
  };

  const applySuggestedRewrite = () => {
    if (moderationFeedback?.suggestedRewrite) {
      setCommentText(moderationFeedback.suggestedRewrite);
      setModerationFeedback({
        isAllowed: true,
        flagged: false,
        reason: 'Se ha adoptado la versión constructiva y factual adaptada a las normas.',
      });
    }
  };

  // Color del chip según Kupá
  const getKupaBadgeColor = (kupa: string) => {
    switch (kupa) {
      case 'Clalit':
        return 'bg-[#1F5F8B] text-white';
      case 'Maccabi':
        return 'bg-[#2A7050] text-white';
      case 'Meuhedet':
        return 'bg-[#B85D19] text-white';
      case 'Leumit':
        return 'bg-[#6B4FA0] text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  const getKupaDotColor = (kupa: string) => {
    switch (kupa) {
      case 'Clalit':
        return 'bg-[#1F5F8B]';
      case 'Maccabi':
        return 'bg-[#2A7050]';
      case 'Meuhedet':
        return 'bg-[#B85D19]';
      case 'Leumit':
        return 'bg-[#6B4FA0]';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 2. Tarjeta de Filtros Superior */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/10 shadow-2xs space-y-4">
        
        {/* Chips de Kupá */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
            TU KUPÁ
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-nowrap sm:flex-wrap">
            {/* Todas */}
            <button
              onClick={() => setSelectedKupa('Todas')}
              className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                selectedKupa === 'Todas'
                  ? 'bg-[#0E2559] text-white shadow-2xs'
                  : 'bg-white border border-black/10 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Todas</span>
              <span className={`text-[11px] sm:text-xs px-1.5 py-0.5 rounded-full ${selectedKupa === 'Todas' ? 'bg-white/20 text-white' : 'text-slate-500'}`}>
                {kupaCounts.Todas}
              </span>
            </button>

            {/* Kupot específicas */}
            {(['Clalit', 'Maccabi', 'Meuhedet', 'Leumit', 'Privado'] as const).map((kupa) => {
              const isSelected = selectedKupa === kupa;
              const count = kupaCounts[kupa];
              return (
                <button
                  key={kupa}
                  onClick={() => setSelectedKupa(kupa)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#0E2559] text-white shadow-2xs'
                      : 'bg-white border border-black/10 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : getKupaDotColor(kupa)}`} />
                  <span>{kupa}</span>
                  <span className={`text-[11px] sm:text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Campos: Ciudad, Especialidad y Buscar por nombre */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Campo Ciudad */}
          <div className="relative flex items-center bg-white border border-black/10 rounded-2xl px-3.5 py-2 min-h-[52px] hover:border-black/20 transition shadow-2xs">
            <MapPin className="w-4 h-4 text-slate-500 shrink-0 mr-2.5" />
            <div className="flex-1 min-w-0">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Ciudad</span>
              <span className="block text-sm font-bold text-slate-900 truncate leading-tight mt-0.5">
                {selectedCity === 'Todas' ? 'Todas' : selectedCity}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Filtrar por ciudad"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'Todas' ? 'Todas las Ciudades' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Especialidad */}
          <div className="relative flex items-center bg-white border border-black/10 rounded-2xl px-3.5 py-2 min-h-[52px] hover:border-black/20 transition shadow-2xs">
            <Stethoscope className="w-4 h-4 text-slate-500 shrink-0 mr-2.5" />
            <div className="flex-1 min-w-0">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">Especialidad</span>
              <span className="block text-sm font-bold text-slate-900 truncate leading-tight mt-0.5">
                {selectedSpecialty === 'Todas' ? 'Todas' : selectedSpecialty}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Filtrar por especialidad"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === 'Todas' ? 'Todas las Especialidades' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Buscar por nombre */}
          <div className="relative flex items-center bg-white border border-black/10 rounded-2xl px-3.5 py-2 min-h-[52px] hover:border-black/20 transition shadow-2xs">
            <Search className="w-4 h-4 text-slate-500 shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal bg-transparent focus:outline-none"
            />
          </div>
        </div>

      </div>

      {/* 4. Encabezado de Resultados: "Médicos en X" y "Mostrando X de Y" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2559]">
          {selectedCity === 'Todas' ? 'Médicos en Español' : `Médicos en ${selectedCity}`}
        </h2>
        <p className="text-sm font-medium text-slate-500">
          Mostrando {Math.min(visibleCount, filteredDoctors.length)} de {filteredDoctors.length}
        </p>
      </div>

      {/* 5. Grilla de Fichas Compactas (3 por fila en notebook, 1 en celular) */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredDoctors.slice(0, visibleCount).map((doc) => {
            const primaryKupa = doc.kupot[0] || 'Clalit';
            const cleanPhone = (doc.phone || '').replace(/[^0-9*]/g, '');

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-black/10 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:border-black/20 transition"
              >
                <div>
                  {/* Fila superior: Chip de la Kupá y "Verificado en [Kupá]" */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getKupaBadgeColor(primaryKupa)}`}>
                      {primaryKupa}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2A7050]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A7050]" />
                      <span>Verificado en {primaryKupa}</span>
                    </span>
                  </div>

                  {/* Nombre del profesional */}
                  <h3 className="text-lg font-extrabold text-[#0E2559] mt-3 leading-snug">
                    {doc.name}
                  </h3>

                  {/* Especialidad */}
                  <p className="text-sm font-medium text-slate-600 mt-1">
                    {doc.specialty}
                  </p>

                  {/* Ciudad */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-500 mt-2.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{normalizeCity(doc.city)}</span>
                  </div>
                </div>

                {/* Dos botones de 44 px: "Llamar" (tel:) y "Ficha oficial" (officialLink) */}
                <div className="grid grid-cols-2 gap-2.5 mt-5 pt-2">
                  <a
                    href={cleanPhone ? `tel:${cleanPhone}` : `tel:*3555`}
                    className="min-h-[44px] bg-[#0E2559] hover:bg-[#1a3875] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-2xs"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Llamar</span>
                  </a>

                  <a
                    href={doc.officialLink || `https://www.google.com/search?q=${encodeURIComponent(`${doc.name} ${primaryKupa} Israel`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] bg-white border border-black/10 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-2xs"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                    <span>Ficha oficial</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-black/10 p-8 max-w-xl mx-auto shadow-2xs">
          <Stethoscope className="w-12 h-12 text-[#1F5F8B] mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-[#0E2559]">
            No encontramos médicos con los filtros seleccionados
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Intenta cambiar de Kupá o seleccionar "Todas las Ciudades".
          </p>
          <button
            onClick={() => {
              setSelectedKupa('Todas');
              setSelectedCity('Todas');
              setSelectedSpecialty('Todas');
              setSearchTerm('');
            }}
            className="mt-5 min-h-[44px] px-5 bg-[#0E2559] hover:bg-[#1a3875] text-white font-bold text-sm rounded-xl transition"
          >
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Botón "Ver más médicos" que suma 12 más */}
      {visibleCount < filteredDoctors.length && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="min-h-[44px] px-6 py-2.5 bg-white border border-black/10 hover:bg-slate-50 text-[#0E2559] font-bold text-sm rounded-full flex items-center gap-2 shadow-2xs transition cursor-pointer"
          >
            <span>Ver más médicos</span>
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      )}

      {/* 7. Franja al pie de verificación y recomendación */}
      <div className="bg-[#1F5F8B]/10 border border-[#1F5F8B]/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3 text-slate-800 text-sm sm:text-base font-medium mt-6">
        <CheckCircle2 className="w-5 h-5 text-[#1F5F8B] shrink-0" />
        <p className="flex-1">
          Cada médico está verificado en la ficha oficial de su Kupá. ¿Te atendió otro que habla español?{' '}
          <button
            onClick={openAddDoctorModal}
            className="text-[#1F5F8B] font-bold underline hover:text-[#0E2559] cursor-pointer"
          >
            Recomiéndalo.
          </button>
        </p>
      </div>

      {/* Modal para Recomendar Médico */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-black/10 my-8">
            <div className="flex items-start justify-between border-b border-black/5 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#1F5F8B] bg-[#1F5F8B]/10 px-2.5 py-0.5 rounded-full">
                  Aporte Comunitario
                </span>
                <h3 className="text-xl font-extrabold text-[#0E2559] mt-1.5">
                  Recomendar un Médico que Habla Español
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Completá los datos reales del profesional para que otros Olim puedan encontrarlo.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Normas de Convivencia y Moderación (Lashon Hará):</span>
              </div>
              <p className="text-[11.5px] leading-relaxed">
                Para cuidar a la comunidad, <strong>no se admiten insultos personales ni descalificaciones</strong>. Describí hechos concretos de tu experiencia: claridad en español y predisposición.
              </p>
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre Completo del Médico <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Dra. Helena Honigman"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Especialidad <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Medicina Familiar, Pediatría..."
                    value={doctorSpecialty}
                    onChange={(e) => setDoctorSpecialty(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ciudad / Localidad <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Tel Aviv-Yafo, Netanya..."
                    value={doctorCity}
                    onChange={(e) => setDoctorCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dirección <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Snif Central, Dizengoff..."
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teléfono de Contacto (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: *3555 o 03-6170700"
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kupot que Acepta
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {AVAILABLE_KUPOT.map((k) => {
                    const isSelected = selectedKupot.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => handleKupaToggle(k)}
                        className={`min-h-[36px] px-3.5 py-1 text-xs rounded-xl border transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#1F5F8B] text-white border-[#1F5F8B] font-bold'
                            : 'bg-slate-50 text-slate-700 border-black/10 hover:bg-slate-100 font-semibold'
                        }`}
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ficha Oficial (Opcional - enlace a la cartilla)
                </label>
                <input
                  type="url"
                  placeholder="Ej: https://www.clalit.co.il/... o https://www.maccabi4u.co.il/..."
                  value={doctorOfficialLink}
                  onChange={(e) => setDoctorOfficialLink(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tu Nombre o Apodo (como Olé)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Joni"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Comentario Libre de tu Experiencia <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Contá cómo fue la atención, el nivel de español y si te resultó útil para tu consulta..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F5F8B] focus:bg-white"
                  required
                />
              </div>

              {moderationFeedback && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs ${
                    moderationFeedback.isAllowed && !moderationFeedback.flagged
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {moderationFeedback.isAllowed && !moderationFeedback.flagged ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Comentario Aprobado por el Filtro Lashon Hará</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Comentario Bloqueado por Ley de Difamación</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed">{moderationFeedback.reason}</p>

                  {moderationFeedback.suggestedRewrite && moderationFeedback.flagged && (
                    <div className="mt-2.5 pt-2 border-t border-rose-200/60 bg-white/70 p-2.5 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#1F5F8B]" />
                        Versión Factual Sugerida:
                      </p>
                      <p className="text-[11px] text-slate-800 italic mt-1">
                        "{moderationFeedback.suggestedRewrite}"
                      </p>
                      <button
                        onClick={applySuggestedRewrite}
                        className="mt-2 text-[11px] font-bold bg-[#1F5F8B] text-white px-3 py-1.5 rounded-lg hover:bg-[#194c70] transition"
                      >
                        Adoptar esta redacción factual
                      </button>
                    </div>
                  )}
                </div>
              )}

              {submissionSuccess && (
                <div className="p-3.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    ¡Médico recomendado con éxito! Ha sido enviado para su revisión oficial.
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleTestOrSubmit(false)}
                disabled={!commentText.trim() || isCheckingModeration}
                className="text-xs font-semibold text-slate-600 hover:text-[#1F5F8B] flex items-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#1F5F8B]" />
                {isCheckingModeration ? 'Verificando...' : 'Verificar Filtro'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="min-h-[44px] px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => handleTestOrSubmit(true)}
                  disabled={!commentText.trim() || isCheckingModeration}
                  className="min-h-[44px] px-5 text-xs font-bold bg-[#1F5F8B] text-white hover:bg-[#194c70] rounded-xl shadow-2xs transition disabled:opacity-50 cursor-pointer"
                >
                  Publicar Recomendación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsDirectory;
