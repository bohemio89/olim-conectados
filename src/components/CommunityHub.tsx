import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Users, 
  Croissant, 
  Utensils, 
  Gift, 
  ShoppingBag,
  Sparkles,
  X,
  Check,
  Globe,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';
import { CommunityStore, CommunityGroup, StoreContact } from '../types';
import { enviarPropuesta } from '../lib/propuestas';

interface CommunityHubProps {
  stores: CommunityStore[];
  groups: CommunityGroup[];
  onNavigateToNightlife?: () => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ stores }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedCity, setSelectedCity] = useState<string>('Todo Israel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'store' | 'group'>('store');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const categories = [
    'Todos',
    'Panaderías',
    'Comida casera',
    'Productos latinos',
    'Por encargo',
  ];

  const cities = [
    'Todo Israel',
    'Tel Aviv',
    'Merkaz',
    'Jerusalén',
    'Haifa',
  ];

  const CATEGORY_ICON = {
    'Panaderías': Croissant,
    'Comida casera': Utensils,
    'Por encargo': Gift,
    'Productos latinos': ShoppingBag,
  } as const;

  const CONTACT_ICON: Record<StoreContact['type'], React.ElementType> = {
    whatsapp: MessageCircle,
    instagram: Instagram,
    web: Globe,
    phone: Phone,
    email: Mail,
  };

  const getStoreMeta = (store: CommunityStore) => {
    const cat = store.filterCategory ?? 'Productos latinos';
    return {
      rubro: store.category,
      icon: CATEGORY_ICON[cat],
      categoryTag: cat,
      zone: store.zone ?? 'Todo Israel',
      cleanAddress: store.shortAddress ?? store.address ?? store.city,
      cleanHours: store.shortHours ?? store.hours ?? 'Consultar',
      tags: store.tags ?? store.specialties.slice(0, 3),
      contacts: store.contacts ?? [],
    };
  };

  const filteredStores = stores.filter((store) => {
    const meta = getStoreMeta(store);
    if (selectedCategory !== 'Todos' && meta.categoryTag !== selectedCategory) return false;
    if (selectedCity !== 'Todo Israel' && meta.zone !== selectedCity && meta.zone !== 'Todo Israel') return false;
    return true;
  });

  const handleOpenAdd = (type: 'store' | 'group') => {
    setModalType(type);
    setSubmitted(false);
    setSendError(false);
    setIsModalOpen(true);
  };

  // Listen to custom event from SectionHeader action button
  React.useEffect(() => {
    const onOpen = () => handleOpenAdd('store');
    window.addEventListener('open-add-store', onOpen);
    return () => window.removeEventListener('open-add-store', onOpen);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 1. Dos filas de chips: Categoría y Ciudad */}
      <div className="space-y-3">
        {/* Fila 1: Categoría */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#0E2559] text-white shadow-2xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/90 hover:bg-neutral-50 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Fila 2: Ciudad */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {cities.map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-[#0E2559] text-white shadow-2xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/90 hover:bg-neutral-50 shadow-2xs'
                }`}
              >
                {city !== 'Todo Israel' && (
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                )}
                <span>{city}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Fichas en 3 columnas (1 en celular) */}
      {filteredStores.length === 0 && (
        <p className="text-sm text-neutral-600 bg-white border border-black/10 rounded-2xl p-5">
          Todavía no hay comercios en esta zona. ¿Conoces uno? Súmalo con el botón de abajo.
        </p>
      )}

      {filteredStores.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStores.map((store) => {
            const meta = getStoreMeta(store);
            const IconComponent = meta.icon;

            return (
              <div
                key={store.id}
                className="bg-white rounded-3xl border border-black/10 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:border-[#2A7050]/40 transition space-y-4"
              >
                {/* Cabecera de la ficha */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0E2559] text-lg leading-tight">
                        {store.name}
                      </h3>
                      <p className="text-sm text-neutral-500 font-medium">
                        {meta.rubro}
                      </p>
                    </div>
                  </div>

                  {/* Datos de contacto y horario */}
                  <div className="space-y-1.5 text-sm text-neutral-600 pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="truncate">{meta.cleanAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="truncate">{meta.cleanHours}</span>
                    </div>
                  </div>

                  {/* Etiquetas / Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#2A7050]/10 text-[#2A7050] font-bold text-xs px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botones de contacto */}
                <div className="flex items-center gap-2 pt-3 border-t border-black/5">
                  {meta.contacts.slice(0, 2).map((c, i) => {
                    const Icon = CONTACT_ICON[c.type];
                    return (
                      <a
                        key={c.url}
                        href={c.url}
                        target={c.type === 'phone' || c.type === 'email' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className={i === 0
                          ? 'flex-1 min-h-[44px] bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-sm py-2.5 px-3 rounded-full flex items-center justify-center gap-2 transition shadow-2xs'
                          : 'flex-1 min-h-[44px] border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-sm py-2.5 px-3 rounded-full flex items-center justify-center gap-2 transition'}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{c.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Tarjeta con borde punteado: Grupos de WhatsApp por ciudad */}
      <div className="border-2 border-dashed border-[#E8A33D]/60 bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#2A7050]/10 text-[#2A7050] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#0E2559] text-base sm:text-lg">
              Grupos de WhatsApp por ciudad
            </h4>
            <p className="text-neutral-600 text-sm mt-0.5">
              ¿Administras un grupo de olim? Súmalo y lo publicamos.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleOpenAdd('group')}
          className="min-h-[44px] border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-[#0E2559] font-bold text-sm px-6 py-2.5 rounded-full transition shadow-2xs shrink-0 w-full sm:w-auto"
        >
          Sumar mi grupo
        </button>
      </div>

      {/* Modal para sumar comercio o grupo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#0E2559] text-xl">
                {modalType === 'store' ? 'Sumar un comercio' : 'Sumar un grupo de WhatsApp'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-[#2A7050] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-extrabold text-[#0E2559] text-lg">
                  ¡Gracias por sumar a la comunidad!
                </p>
                <p className="text-sm text-neutral-600">
                  Recibimos tu propuesta. La revisamos antes de publicarla.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="min-h-[44px] px-6 py-2 bg-[#2A7050] text-white font-bold rounded-xl text-sm"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  setSending(true);
                  setSendError(false);
                  try {
                    await enviarPropuesta({
                      tipo: modalType === 'store' ? 'comercio' : 'grupo',
                      nombre: String(f.get('nombre') || '').trim(),
                      zona: String(f.get('zona') || '').trim(),
                      contacto: String(f.get('contacto') || '').trim(),
                      comentario: String(f.get('comentario') || ''),
                    });
                    setSubmitted(true);
                  } catch {
                    setSendError(true);
                  } finally {
                    setSending(false);
                  }
                }}
                className="space-y-3 text-sm"
              >
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    {modalType === 'store' ? 'Nombre del comercio o emprendimiento' : 'Nombre del grupo'}
                  </label>
                  <input
                    required
                    type="text"
                    name="nombre"
                    minLength={2}
                    maxLength={120}
                    placeholder={modalType === 'store' ? 'Ej. Alfajores del Sur' : 'Ej. Olim de Haifa'}
                    className="w-full min-h-[44px] px-3.5 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#2A7050] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Ciudad o zona
                  </label>
                  <input
                    required
                    type="text"
                    name="zona"
                    minLength={2}
                    maxLength={120}
                    placeholder="Ej. Tel Aviv / Merkaz"
                    className="w-full min-h-[44px] px-3.5 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#2A7050] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Enlace de contacto (WhatsApp o Instagram)
                  </label>
                  <input
                    required
                    type="text"
                    name="contacto"
                    minLength={3}
                    maxLength={300}
                    placeholder="https://..."
                    className="w-full min-h-[44px] px-3.5 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#2A7050] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Comentario (opcional)
                  </label>
                  <textarea
                    name="comentario"
                    maxLength={500}
                    rows={2}
                    placeholder="Qué venden, horarios, para quién es el grupo..."
                    className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#2A7050] outline-none"
                  />
                </div>
                {sendError && (
                  <p className="text-[#C0392B] font-bold text-sm">No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.</p>
                )}
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 min-h-[44px] border border-neutral-300 rounded-xl font-bold text-neutral-700 hover:bg-neutral-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 min-h-[44px] bg-[#2A7050] text-white rounded-xl font-bold hover:bg-[#235e43] shadow-2xs disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                    Enviar propuesta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CommunityHub;
