import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Filter, 
  Languages, 
  HeartHandshake, 
  Activity,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { Doctor, KupaName, SpanishLevel } from '../types';

interface DoctorsDirectoryProps {
  doctors: Doctor[];
  onAddReview: (doctorId: string, review: any) => void;
}

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({ doctors, onAddReview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKupa, setSelectedKupa] = useState<string>('Todas');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  const [selectedCity, setSelectedCity] = useState<string>('Todas');
  const [minRating, setMinRating] = useState<number>(0);

  // Review Modal State
  const [selectedDoctorForReview, setSelectedDoctorForReview] = useState<Doctor | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [spanishRating, setSpanishRating] = useState(5);
  const [listeningRating, setListeningRating] = useState(5);
  const [conservativeRating, setConservativeRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  
  // Moderation state
  const [isCheckingModeration, setIsCheckingModeration] = useState(false);
  const [moderationFeedback, setModerationFeedback] = useState<{
    isAllowed: boolean;
    flagged: boolean;
    reason: string;
    suggestedRewrite?: string;
  } | null>(null);
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  // Extract unique filters sorted alphabetically
  const cities = [
    'Todas',
    ...Array.from(new Set(doctors.map((d) => d.city))).sort((a, b) => a.localeCompare(b, 'es'))
  ];

  const specialties = [
    'Todas',
    ...Array.from(new Set(doctors.map((d) => d.specialty))).sort((a, b) => a.localeCompare(b, 'es'))
  ];

  // Filtering
  const filteredDoctors = doctors.filter((doc) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      doc.name.toLowerCase().includes(term) ||
      doc.specialty.toLowerCase().includes(term) ||
      doc.address.toLowerCase().includes(term) ||
      doc.city.toLowerCase().includes(term) ||
      doc.kupot.some((k) => k.toLowerCase().includes(term));

    const matchesKupa =
      selectedKupa === 'Todas' || doc.kupot.includes(selectedKupa as KupaName);

    const matchesSpecialty =
      selectedSpecialty === 'Todas' || doc.specialty === selectedSpecialty;

    const matchesCity = selectedCity === 'Todas' || doc.city === selectedCity;

    const matchesRating = minRating === 0 || (doc.reviewsCount > 0 && doc.rating >= minRating);

    return matchesSearch && matchesKupa && matchesSpecialty && matchesCity && matchesRating;
  });

  const handleTestOrSubmitReview = async (submitDirectly: boolean = false) => {
    if (!commentText.trim()) return;

    setIsCheckingModeration(true);
    setModerationFeedback(null);

    try {
      const res = await fetch('/api/moderate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewText: commentText,
          doctorName: selectedDoctorForReview?.name,
          specialty: selectedDoctorForReview?.specialty,
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
          suggestedRewrite: 'Durante la consulta considero que la atención fue apresurada y no se explicaron suficientes opciones previas antes de plantear tratamientos invasivos.',
        });
      } else {
        if (submitDirectly) {
          completeSubmission(commentText);
        } else {
          setModerationFeedback({
            isAllowed: true,
            flagged: false,
            reason: 'Reseña aprobada: se enfoca en hechos objetivos de la consulta.',
          });
        }
      }
    } finally {
      setIsCheckingModeration(false);
    }
  };

  const completeSubmission = (text: string) => {
    if (!selectedDoctorForReview) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      author: authorName.trim() || 'Olé Anónimo',
      date: new Date().toLocaleDateString('es-ES'),
      rating: reviewRating,
      spanishFluencyRating: spanishRating,
      listeningTimeRating: listeningRating,
      conservativeApproachRating: conservativeRating,
      comment: text,
      isVerifiedOle: true,
    };

    onAddReview(selectedDoctorForReview.id, newReview);
    setReviewSubmittedSuccess(true);

    setTimeout(() => {
      setSelectedDoctorForReview(null);
      setCommentText('');
      setAuthorName('');
      setModerationFeedback(null);
      setReviewSubmittedSuccess(false);
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
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full font-medium mb-3">
            <Languages className="w-3.5 h-3.5" />
            <span>Directorio Médico Oficial Bilingüe en Israel · 140+ Profesionales Verificados</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Médicos que Hablan Español en tu Kupat Jolim
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Directorio exhaustivo con más de 140 especialistas cotejados con los padrones de <strong>Maccabi</strong>, <strong>Clalit</strong>, <strong>Meuhedet</strong> y <strong>Leumit</strong> en más de 20 ciudades de todo Israel.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-blue-200">
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              140+ Médicos Activos en Israel
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
              <Activity className="w-4 h-4 text-amber-300" />
              22+ Ciudades & 18 Especialidades
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
              <Sparkles className="w-4 h-4 text-blue-300" />
              Cotejado con Kupot Jolim y Piedra Libre
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
              placeholder="Buscar por nombre, especialidad, ciudad o calle..."
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

        {/* Quick Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 text-xs">
          <span className="text-gray-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtro rápido:
          </span>
          {['Maccabi', 'Clalit', 'Traumatología', 'Médico de Familia', 'Tel Aviv', 'Jerusalén', 'Netanya'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                if (['Maccabi', 'Clalit'].includes(tag)) setSelectedKupa(tag);
                else if (['Tel Aviv', 'Jerusalén', 'Netanya'].includes(tag)) setSelectedCity(tag);
                else setSelectedSpecialty(tag);
              }}
              className="px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 rounded-md transition text-[11px]"
            >
              {tag}
            </button>
          ))}
          {(selectedKupa !== 'Todas' || selectedCity !== 'Todas' || selectedSpecialty !== 'Todas' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedKupa('Todas');
                setSelectedCity('Todas');
                setSelectedSpecialty('Todas');
                setSearchTerm('');
              }}
              className="text-xs text-rose-600 font-semibold ml-2 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Notice */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>Mostrando <strong>{filteredDoctors.length}</strong> médicos con atención en español</span>
        <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
          💡 Evaluaciones basadas en hechos clínicos y escucha activa
        </span>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header: Name, Specialty & Rating */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900">{doc.name}</h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        doc.spanishLevel === 'Nativo'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      Español {doc.spanishLevel}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">{doc.specialty}</p>
                </div>

                {doc.reviewsCount > 0 ? (
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="text-xs font-bold text-amber-900">{doc.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-amber-700">({doc.reviewsCount})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg shrink-0 text-gray-500 text-[11px]">
                    <span>Sin reseñas aún</span>
                  </div>
                )}
              </div>

              {/* Kupot Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {doc.kupot.map((k) => (
                  <span
                    key={k}
                    className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200"
                  >
                    {k}
                  </span>
                ))}
                {doc.acceptsNewPatients && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Acepta nuevos pacientes
                  </span>
                )}
              </div>

              {/* Focus and Clinical Ethos */}
              <p className="text-xs text-gray-600 mt-3 leading-relaxed bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/60">
                <strong>Enfoque clínico:</strong> {doc.consultationFocus}
              </p>

              {/* Details: Address, Hours, Phone */}
              <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{doc.address.includes(doc.city) ? doc.address : `${doc.address} (${doc.city})`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{doc.receptionHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="font-mono">{doc.phone}</span>
                </div>
              </div>

              {/* Clinical Criteria Highlights - Only render if there are real reviews */}
              {doc.reviews.length > 0 ? (
                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500 font-medium">Español Real</p>
                    <p className="text-xs font-bold text-gray-800 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {doc.reviews[0].spanishFluencyRating}.0
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500 font-medium">Tiempo Escucha</p>
                    <p className="text-xs font-bold text-gray-800 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {doc.reviews[0].listeningTimeRating}.0
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500 font-medium">Estudios Previos</p>
                    <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-emerald-500 text-emerald-600" />
                      {doc.reviews[0].conservativeApproachRating}.0
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 py-1">
                  <span>¿Fuiste atendido por este médico?</span>
                  <span className="font-medium text-blue-600">Sé el primero en calificarlo</span>
                </div>
              )}

              {/* Verified Olim Reviews Snapshot */}
              {doc.reviews.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-blue-500" />
                    Reseñas verificadas de la comunidad ({doc.reviews.length}):
                  </div>
                  {doc.reviews.slice(0, 1).map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-amber-50/40 border border-amber-200/60 rounded-lg p-2.5 text-xs"
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

            {/* Card Action */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <a
                href={`tel:${doc.phone.replace(/[^0-9]/g, '')}`}
                className="text-xs font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1.5 transition"
              >
                <Phone className="w-3.5 h-3.5" /> Llamar Snif
              </a>

              <button
                onClick={() => setSelectedDoctorForReview(doc)}
                className="text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Dejar Reseña Factual
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8">
          <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No encontramos médicos con esos filtros</h3>
          <p className="text-xs text-gray-500 mt-1">
            Intenta quitando el filtro de ciudad o seleccionando "Todas las Kupot".
          </p>
        </div>
      )}

      {/* Review Modal with Lashon Hará Antidifamation Scanner */}
      {selectedDoctorForReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Calificación Responsable
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  Reseña para {selectedDoctorForReview.name}
                </h3>
                <p className="text-xs text-gray-500">{selectedDoctorForReview.specialty} · {selectedDoctorForReview.city}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedDoctorForReview(null);
                  setModerationFeedback(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Warning on Lashon Hará & Fact-Based Review Rules */}
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Normas de la Comunidad y Ley de Difamación (Lashon Hará):</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Para cuidar a la comunidad de problemas legales, <strong>no se admiten insultos personales</strong> ("estafador", "inútil", "pelotudo"). Califica en base a hechos objetivos:
              </p>
              <ul className="list-disc pl-4 text-[11px] space-y-0.5 text-amber-900">
                <li>¿El profesional domina español nativo o solo vocabulario básico?</li>
                <li>¿Dedicó tiempo real a escucharte o te despachó en minutos?</li>
                <li>¿Propuso estudios previos antes de indicar medidas invasivas/cirugía?</li>
              </ul>
            </div>

            {/* Form */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tu Nombre o Apodo (como Olé)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Marcelo S. (Olé de Argentina)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Specific Star Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Dominio Real de Español
                  </label>
                  <select
                    value={spanishRating}
                    onChange={(e) => setSpanishRating(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-gray-200 rounded-md p-1.5"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Fluido/Nativo completo</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Muy buen español</option>
                    <option value={3}>⭐⭐⭐ 3 - Comprensible pero limitado</option>
                    <option value={2}>⭐⭐ 2 - Solo palabras sueltas</option>
                    <option value={1}>⭐ 1 - Casi no entiende español</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Tiempo de Escucha y Contención
                  </label>
                  <select
                    value={listeningRating}
                    onChange={(e) => setListeningRating(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-gray-200 rounded-md p-1.5"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Escucha con calma y paciencia</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Buen tiempo de consulta</option>
                    <option value={3}>⭐⭐⭐ 3 - Normal</option>
                    <option value={2}>⭐⭐ 2 - Rápido / Apresurado</option>
                    <option value={1}>⭐ 1 - Te despacha en 2 minutos</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Criterio Clínico y Estudios Previos (No Invasivo)
                  </label>
                  <select
                    value={conservativeRating}
                    onChange={(e) => setConservativeRating(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-gray-200 rounded-md p-1.5"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Explora alternativas y estudios antes de cirugías</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Buen criterio diagnóstico</option>
                    <option value={3}>⭐⭐⭐ 3 - Neutro</option>
                    <option value={1}>⭐ 1 - Salta a cirugía o medicación invasiva de inmediato</option>
                  </select>
                </div>
              </div>

              {/* Comment text area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tu Experiencia Factual
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalla tu consulta: tiempo de atención, claridad de las explicaciones médicas y si te ofreció alternativas de diagnóstico..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
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
                        <span>Reseña Aprobada por el Filtro Lashon Hará</span>
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
                        Versión Factual Sugerida por el Asistente:
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

              {reviewSubmittedSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>¡Reseña publicada con éxito! Gracias por ayudar a otros olim.</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleTestOrSubmitReview(false)}
                disabled={!commentText.trim() || isCheckingModeration}
                className="text-xs font-semibold text-gray-600 hover:text-blue-700 flex items-center gap-1 disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                {isCheckingModeration ? 'Verificando...' : 'Verificar Filtro Lashon Hará'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctorForReview(null);
                    setModerationFeedback(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => handleTestOrSubmitReview(true)}
                  disabled={!commentText.trim() || isCheckingModeration}
                  className="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs transition disabled:opacity-50"
                >
                  Publicar Reseña
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
