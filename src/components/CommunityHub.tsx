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
  Check
} from 'lucide-react';
import { CommunityStore, CommunityGroup } from '../types';

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

  const categories = [
    'Todos',
    'Panaderías',
    'Comida casera',
    'Productos latinos',
    'Por encargo',
    'Grupos de WhatsApp',
  ];

  const cities = [
    'Todo Israel',
    'Tel Aviv',
    'Merkaz',
    'Jerusalén',
    'Haifa',
  ];

  // Helper to determine store rubro / icon
  const getStoreMeta = (store: CommunityStore) => {
    if (store.id === 'store-1') {
      return {
        rubro: 'Panadería y café',
        icon: Croissant,
        categoryTag: 'Panaderías',
        cleanAddress: 'Tel Aviv · Ibn Gvirol 54',
        cleanHours: 'Dom–Jue 7:30–18:30',
        tags: ['Alfajores', 'Café', 'Kosher'],
        whatsappUrl: `https://wa.me/972526801162`,
        instagramUrl: 'https://instagram.com/amapolaalfajores',
      };
    }
    if (store.id === 'store-2') {
      return {
        rubro: 'Empanadas caseras',
        icon: Utensils,
        categoryTag: 'Comida casera',
        cleanAddress: "Merkaz · delivery desde Modi'in",
        cleanHours: 'Pedidos por WhatsApp',
        tags: ['Empanadas', 'Delivery'],
        whatsappUrl: `https://wa.me/972536095976`,
        instagramUrl: 'https://instagram.com/las.empanadot',
      };
    }
    if (store.id === 'store-3') {
      return {
        rubro: 'Emprendimiento de olim',
        icon: Gift,
        categoryTag: 'Por encargo',
        cleanAddress: 'Envíos a todo Israel',
        cleanHours: 'Por encargo',
        tags: ['Alfajores', 'Kosher Mehadrin'],
        whatsappUrl: 'https://wa.me/972500000000',
        instagramUrl: 'https://instagram.com/vajulaalfajores',
      };
    }
    if (store.id === 'store-4') {
      return {
        rubro: 'Productos argentinos',
        icon: ShoppingBag,
        categoryTag: 'Productos latinos',
        cleanAddress: 'Tel Aviv · Allenby 37',
        cleanHours: 'Dom–Jue 9:00–20:00',
        tags: ['Yerba mate', 'Dulce de leche', 'Tapas'],
        whatsappUrl: 'https://wa.me/97235102345',
        instagramUrl: 'https://instagram.com/mateando_israel',
      };
    }
    if (store.id === 'store-5') {
      return {
        rubro: 'Comida latina',
        icon: ShoppingBag,
        categoryTag: 'Productos latinos',
        cleanAddress: 'Tel Aviv · Levanda 13',
        cleanHours: 'Dom–Jue 10:00–19:00',
        tags: ['Harina P.A.N.', 'Tortillas', 'Quesos'],
        whatsappUrl: 'https://wa.me/972547931818',
        instagramUrl: 'https://instagram.com/latiendatlv',
      };
    }

    return {
      rubro: store.category,
      icon: ShoppingBag,
      categoryTag: 'Productos latinos',
      cleanAddress: store.address || store.city,
      cleanHours: store.hours || 'Consultar',
      tags: store.specialties.slice(0, 3),
      whatsappUrl: `https://wa.me/${store.phone.replace(/[^0-9]/g, '')}`,
      instagramUrl: store.instagramOrWeb || 'https://instagram.com',
    };
  };

  // Filter stores
  const filteredStores = stores.filter((store) => {
    const meta = getStoreMeta(store);

    // Filter by Category
    if (selectedCategory === 'Grupos de WhatsApp') {
      return false; // Groups shown separately
    }
    if (selectedCategory === 'Panaderías' && meta.categoryTag !== 'Panaderías') {
      return false;
    }
    if (selectedCategory === 'Comida casera' && meta.categoryTag !== 'Comida casera') {
      return false;
    }
    if (selectedCategory === 'Productos latinos' && meta.categoryTag !== 'Productos latinos') {
      return false;
    }
    if (selectedCategory === 'Por encargo' && meta.categoryTag !== 'Por encargo' && store.id !== 'store-2') {
      return false;
    }

    // Filter by City
    if (selectedCity === 'Tel Aviv' && !meta.cleanAddress.includes('Tel Aviv')) {
      return false;
    }
    if (selectedCity === 'Merkaz' && !meta.cleanAddress.includes('Merkaz') && !meta.cleanAddress.includes("Modi'in")) {
      return false;
    }
    if (selectedCity === 'Jerusalén' && !meta.cleanAddress.includes('Jerusalén')) {
      return false;
    }
    if (selectedCity === 'Haifa' && !meta.cleanAddress.includes('Haifa')) {
      return false;
    }

    return true;
  });

  const handleOpenAdd = (type: 'store' | 'group') => {
    setModalType(type);
    setSubmitted(false);
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition ${
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-sm">
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
      {selectedCategory !== 'Grupos de WhatsApp' && (
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

                {/* Botones WhatsApp e Instagram */}
                <div className="flex items-center gap-2 pt-3 border-t border-black/5">
                  <a
                    href={meta.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-sm py-2.5 px-3 rounded-full flex items-center justify-center gap-2 transition shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 text-white fill-current" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={meta.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-sm py-2.5 px-3 rounded-full flex items-center justify-center gap-2 transition"
                  >
                    <Instagram className="w-4 h-4 text-neutral-800" />
                    <span>Instagram</span>
                  </a>
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
              Muy pronto. ¿Administras un grupo de olim? Súmalo.
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
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
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
                  Revisaremos los datos y lo agregaremos al directorio oficial en la próxima actualización.
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
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
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
                    placeholder="Ej. Alfajores del Sur"
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
                    placeholder="https://..."
                    className="w-full min-h-[44px] px-3.5 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#2A7050] outline-none"
                  />
                </div>
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
                    className="flex-1 min-h-[44px] bg-[#2A7050] text-white rounded-xl font-bold hover:bg-[#235e43] shadow-2xs"
                  >
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
