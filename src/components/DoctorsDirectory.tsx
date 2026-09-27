import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Filter, 
  Languages, 
  Users,
  Stethoscope,
  Sparkles,
  Info
} from 'lucide-react';
import { Doctor, KupaName, DoctorReview } from '../types';

interface DoctorsDirectoryProps {
  doctors: Doctor[];
  onAddReview: (doctorId: string, review: DoctorReview) => void;
  onAddDoctor: (newDoctor: Doctor) => void;
}

const AVAILABLE_KUPOT = ['Maccabi', 'Clalit', 'Meuhedet', 'Leumit', 'Privado', 'No estoy seguro'];

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({ 
  doctors, 
  onAddReview,
  onAddDoctor 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKupa, setSelectedKupa] = useState<string>('Todas');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  const [selectedCity, setSelectedCity] = useState<string>('Todas');

  // Modal State
  const [modalMode, setModalMode] = useState<'addDoctor' | 'addReview' | null>(null);
  const [selectedDoctorForReview, setSelectedDoctorForReview] = useState<Doctor | null>(null);

  // Form Fields for New Doctor
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [doctorCity, setDoctorCity] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
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

  const getDoctorBadge = (consultationFocus?: string) => {
    const focus = (consultationFocus || '').trim();
    if (focus.toUpperCase().startsWith('VERIFICADO')) {
      return {
        text: '✓ Verificado en cartilla oficial',
        className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: CheckCircle2,
        iconClass: 'text-emerald-600',
      };
    }
    if (focus.toLowerCase().includes('piedra libre')) {
      return {
        text: 'Fuente: directorio comunitario (Piedra Libre) — no verificado por el sitio',
        className: 'bg-blue-50 text-blue-800 border-blue-200',
        icon: Info,
        iconClass: 'text-blue-600',
      };
    }
    return {
      text: 'Cargado por la comunidad — no verificado por el sitio',
      className: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: Users,
      iconClass: 'text-amber-600',
    };
  };

  // Extract unique filters
  const cities = [
    'Todas',
    ...Array.from(new Set(doctors.map((d) => d.city).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es'))
  ];

  const specialties = [
    'Todas',
    ...Array.from(new Set(doctors.map((d) => d.specialty).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es'))
  ];

  // Filtering
  const filteredDoctors = doctors.filter((doc) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      doc.name.toLowerCase().includes(term) ||
      doc.specialty.toLowerCase().includes(term) ||
      (doc.address && doc.address.toLowerCase().includes(term)) ||
      doc.city.toLowerCase().includes(term) ||
      doc.kupot.some((k) => k.toLowerCase().includes(term));

    const matchesKupa =
      selectedKupa === 'Todas' || doc.kupot.includes(selectedKupa as KupaName);

    const matchesSpecialty =
      selectedSpecialty === 'Todas' || doc.specialty === selectedSpecialty;

    const matchesCity = selectedCity === 'Todas' || doc.city === selectedCity;

    return matchesSearch && matchesKupa && matchesSpecialty && matchesCity;
  });

  const handleKupaToggle = (kupa: string) => {
    if (kupa === 'No estoy seguro') {
      if (selectedKupot.includes('No estoy seguro')) {
        setSelectedKupot([]);
      } else {
        setSelectedKupot(['No estoy seguro']);
      }
      return;
    }

    const filteredWithoutUnsure = selectedKupot.filter((k) => k !== 'No estoy seguro');
    if (filteredWithoutUnsure.includes(kupa)) {
      setSelectedKupot(filteredWithoutUnsure.filter((k) => k !== kupa));
    } else {
      setSelectedKupot([...filteredWithoutUnsure, kupa]);
    }
  };

  const openAddDoctorModal = () => {
    setModalMode('addDoctor');
    setSelectedDoctorForReview(null);
    setDoctorName('');
    setDoctorSpecialty('');
    setDoctorCity('');
    setDoctorPhone('');
    setSelectedKupot([]);
    setAuthorName('');
    setCommentText('');
    setModerationFeedback(null);
    setSubmissionSuccess(false);
  };

  const openAddReviewModal = (doc: Doctor) => {
    setModalMode('addReview');
    setSelectedDoctorForReview(doc);
    setAuthorName('');
    setCommentText('');
    setModerationFeedback(null);
    setSubmissionSuccess(false);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedDoctorForReview(null);
    setModerationFeedback(null);
    setSubmissionSuccess(false);
  };

  const handleTestOrSubmit = async (submitDirectly: boolean = false) => {
    if (!commentText.trim()) return;
    if (modalMode === 'addDoctor' && (!doctorName.trim() || !doctorSpecialty.trim() || !doctorCity.trim())) {
      alert('Por favor completa al menos el nombre, especialidad y ciudad del médico.');
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
      // Client-side fallback check
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

  const completeSubmission = (text: string) => {
    const todayStr = new Date().toLocaleDateString('es-ES');

    if (modalMode === 'addDoctor') {
      const newDoctorEntry: Doctor = {
        id: `doc-${Date.now()}`,
        name: doctorName.trim(),
        specialty: doctorSpecialty.trim(),
        city: doctorCity.trim(),
        phone: doctorPhone.trim() || 'No especificado (consultar en la Kupá)',
        kupot: selectedKupot.length > 0 ? selectedKupot : ['No estoy seguro'],
        reviews: [
          {
            id: `rev-${Date.now()}`,
            author: authorName.trim() || 'Olé de la comunidad',
            date: todayStr,
            comment: text.trim(),
            isVerifiedOle: true,
          },
        ],
        reviewsCount: 1,
        isCommunityAdded: true,
        uploadedAt: todayStr,
      };

      onAddDoctor(newDoctorEntry);
      setSubmissionSuccess(true);
    } else if (modalMode === 'addReview' && selectedDoctorForReview) {
      const newReview: DoctorReview = {
        id: `rev-${Date.now()}`,
        author: authorName.trim() || 'Olé de la comunidad',
        date: todayStr,
        comment: text.trim(),
        isVerifiedOle: true,
      };

      onAddReview(selectedDoctorForReview.id, newReview);
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

  return (
    <div className="space-y-6">
      {/* Header Banner - Transparent and Honest */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full font-medium mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Directorio Colaborativo de la Comunidad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Médicos y Profesionales de Salud que Hablan Español
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Este directorio se construye exclusivamente con aportes y recomendaciones reales de la comunidad de Olim. Actualmente no hay médicos pre-cargados por el sitio. Si fuiste atendido por un profesional que hable español, podés sumarlo para ayudar a otros inmigrantes.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={openAddDoctorModal}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4 text-blue-700" />
              <span>Recomendar o Agregar un Médico</span>
            </button>
            <span className="text-xs text-blue-200 flex items-center gap-1.5 bg-blue-950/40 px-3 py-2 rounded-xl border border-blue-400/20">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Moderación ética sin difamaciones (Lashon Hará)
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            {/* Kupá Selector */}
            <select
              value={selectedKupa}
              onChange={(e) => setSelectedKupa(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todas">Todas las Kupot</option>
              <option value="Maccabi">Maccabi (מכבי)</option>
              <option value="Clalit">Clalit (כללית)</option>
              <option value="Meuhedet">Meuhedet (מאוחדת)</option>
              <option value="Leumit">Leumit (לאומית)</option>
              <option value="Privado">Privado</option>
              <option value="No estoy seguro">No estoy seguro</option>
            </select>

            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'Todas' ? 'Todas las Ciudades' : c}
                </option>
              ))}
            </select>

            {/* Specialty Selector */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === 'Todas' ? 'Todas las Especialidades' : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>Mostrando <strong>{filteredDoctors.length}</strong> {filteredDoctors.length === 1 ? 'médico cargado' : 'médicos cargados'}</span>
          </div>

          {(selectedKupa !== 'Todas' || selectedCity !== 'Todas' || selectedSpecialty !== 'Todas' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedKupa('Todas');
                setSelectedCity('Todas');
                setSelectedSpecialty('Todas');
                setSearchTerm('');
              }}
              className="text-xs text-rose-600 font-semibold hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDoctors.map((doc) => {
            const badge = getDoctorBadge(doc.consultationFocus);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Origin Badge & Upload Date */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${badge.className}`}>
                      <BadgeIcon className={`w-3.5 h-3.5 ${badge.iconClass}`} />
                      <span>{badge.text}</span>
                    </span>
                    {doc.uploadedAt && (
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {doc.uploadedAt}
                      </span>
                    )}
                  </div>

                {/* Doctor Name & Specialty */}
                <div className="mt-1">
                  <h2 className="text-lg font-bold text-gray-900">{doc.name}</h2>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">{doc.specialty}</p>
                </div>

                {/* Kupot Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {doc.kupot.map((k) => (
                    <span
                      key={k}
                      className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200"
                    >
                      {k === 'No estoy seguro' ? 'Kupá: No confirmada' : k}
                    </span>
                  ))}
                </div>

                {/* Location & Phone */}
                <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{doc.city}</span>
                  </div>
                  {doc.phone && doc.phone !== 'No especificado (consultar en la Kupá)' && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="font-mono">{doc.phone}</span>
                    </div>
                  )}
                </div>

                {/* Community Comments / Reviews */}
                {doc.reviews && doc.reviews.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-blue-500" />
                      Experiencia de la comunidad:
                    </div>
                    {doc.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-slate-50 border border-gray-200 rounded-lg p-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] font-medium text-gray-700 mb-1">
                          <span className="font-semibold">{rev.author}</span>
                          <span className="text-gray-400">{rev.date}</span>
                        </div>
                        <p className="text-gray-600 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Action & Disclaimer */}
              <div className="mt-5 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  {doc.phone && doc.phone !== 'No especificado (consultar en la Kupá)' ? (
                    <a
                      href={`tel:${doc.phone.replace(/[^0-9]/g, '')}`}
                      className="text-xs font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5" /> Llamar
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-400">Verificar en la app de la Kupá</span>
                  )}

                  <button
                    onClick={() => openAddReviewModal(doc)}
                    className="text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Sumar Comentario
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  ⚠️ Esta información proviene de aportes de la comunidad — confirmá los datos antes de sacar turno.
                </p>
              </div>
            </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto shadow-xs">
          <Stethoscope className="w-14 h-14 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900">
            {doctors.length === 0 
              ? 'Aún no hay médicos cargados en el directorio' 
              : 'No encontramos médicos con los filtros seleccionados'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-lg mx-auto leading-relaxed">
            Este directorio se construye de forma colaborativa exclusivamente con aportes de los propios Olim. Si te atendiste con un médico o profesional de la salud que habla español en Israel, podés ser el primero en agregarlo.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openAddDoctorModal}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar o Recomendar un Médico</span>
            </button>
            {doctors.length > 0 && (
              <button
                onClick={() => {
                  setSelectedKupa('Todas');
                  setSelectedCity('Todas');
                  setSelectedSpecialty('Todas');
                  setSearchTerm('');
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </div>
      )}

      {/* Unified Modal: Add Doctor / Add Review with Lashon Hará Antidifamation Scanner */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {modalMode === 'addDoctor' ? 'Aporte Comunitario' : 'Experiencia de la Comunidad'}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  {modalMode === 'addDoctor'
                    ? 'Recomendar un Médico que Habla Español'
                    : `Agregar comentario para ${selectedDoctorForReview?.name}`}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {modalMode === 'addDoctor'
                    ? 'Completá los datos reales del profesional para que otros Olim puedan encontrarlo.'
                    : `${selectedDoctorForReview?.specialty} · ${selectedDoctorForReview?.city}`}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Warning on Lashon Hará & Fact-Based Review Rules */}
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Normas de Convivencia y Moderación (Lashon Hará):</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Para cuidar a la comunidad, <strong>no se admiten insultos personales ni descalificaciones</strong>. Describí hechos concretos de tu experiencia: claridad en español, tiempo de escucha y predisposición.
              </p>
            </div>

            {/* Form Fields */}
            <div className="mt-4 space-y-3.5">
              {modalMode === 'addDoctor' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Nombre Completo del Médico <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Dr. Alejandro Cohen"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Especialidad <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Médico de Familia, Pediatría..."
                        value={doctorSpecialty}
                        onChange={(e) => setDoctorSpecialty(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Ciudad / Localidad <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Tel Aviv, Ramat Gan, Netanya..."
                        value={doctorCity}
                        onChange={(e) => setDoctorCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Teléfono de Contacto o Snif (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 03-1234567 o teléfono de la clínica"
                        value={doctorPhone}
                        onChange={(e) => setDoctorPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Kupot que Acepta (Marcá las que conozcas o seleccioná "No estoy seguro")
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {AVAILABLE_KUPOT.map((k) => {
                        const isSelected = selectedKupot.includes(k);
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => handleKupaToggle(k)}
                            className={`px-3 py-1 text-xs rounded-lg border transition ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 font-bold'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {k}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tu Nombre o Apodo (como Olé - Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Marcelo S. (Olé de Argentina)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Comment text area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Comentario Libre de tu Experiencia <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Contá cómo fue la atención, el nivel de español y si te resultó útil para tu consulta..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  required
                />
              </div>

              {/* Real-time Moderation Feedback Card */}
              {moderationFeedback && (
                <div
                  className={`p-3.5 rounded-xl border text-xs ${
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
                    <div className="mt-2.5 pt-2 border-t border-rose-200/60 bg-white/70 p-2 rounded-lg">
                      <p className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        Versión Factual Sugerida:
                      </p>
                      <p className="text-[11px] text-gray-800 italic mt-1">
                        "{moderationFeedback.suggestedRewrite}"
                      </p>
                      <button
                        onClick={applySuggestedRewrite}
                        className="mt-2 text-[10px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded hover:bg-blue-700 transition"
                      >
                        Adoptar esta redacción factual
                      </button>
                    </div>
                  )}
                </div>
              )}

              {submissionSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>
                    {modalMode === 'addDoctor' 
                      ? '¡Médico agregado al directorio con éxito! Gracias por sumar tu recomendación.' 
                      : '¡Comentario publicado con éxito!'}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleTestOrSubmit(false)}
                disabled={!commentText.trim() || isCheckingModeration}
                className="text-xs font-semibold text-gray-600 hover:text-blue-700 flex items-center gap-1 disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                {isCheckingModeration ? 'Verificando...' : 'Verificar Filtro'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => handleTestOrSubmit(true)}
                  disabled={!commentText.trim() || isCheckingModeration}
                  className="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs transition disabled:opacity-50"
                >
                  {modalMode === 'addDoctor' ? 'Publicar Médico' : 'Publicar Comentario'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
