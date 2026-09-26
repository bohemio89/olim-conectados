import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Users, 
  Search, 
  Star, 
  Sparkles, 
  MessageSquare,
  Beef,
  Coffee,
  CheckCircle2,
  PartyPopper
} from 'lucide-react';
import { CommunityStore, CommunityGroup } from '../types';

interface CommunityHubProps {
  stores: CommunityStore[];
  groups: CommunityGroup[];
  onNavigateToNightlife?: () => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ stores, groups, onNavigateToNightlife }) => {
  const [activeTab, setActiveTab] = useState<'stores' | 'groups'>('stores');
  const [storeFilter, setStoreFilter] = useState<string>('Todas');
  const [groupCategoryFilter, setGroupCategoryFilter] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStores = stores.filter((st) => {
    const matchesCategory = storeFilter === 'Todas' || st.category === storeFilter;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredGroups = groups.filter((grp) => {
    const matchesCat = groupCategoryFilter === 'Todas' || grp.category === groupCategoryFilter;
    const matchesSearch =
      grp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grp.cityOrScope.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-amber-600 via-orange-700 to-amber-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-amber-100 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
            <span>Red Comunitaria Rioplatense y Latina</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Comercios Latinos Emblemáticos y Grupos de la Comunidad
          </h1>
          <p className="mt-2 text-sm sm:text-base text-amber-100 leading-relaxed">
            Centralizamos los lugares indispensables que todo olé pregunta: desde el histórico almacén de <strong>calle Allenby en Tel Aviv</strong> (yerbas, alfajores, dulce de leche) y <strong>carnicerías con cortes criollos</strong> (vacío, asado de tira, matambre), hasta los mejores grupos de WhatsApp y Facebook.
          </p>
        </div>
      </div>

      {/* Switcher Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('stores')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'stores'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Locales, Yerbas y Carnicerías ({stores.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'groups'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Grupos de WhatsApp y Facebook ({groups.length})</span>
          </button>

          {onNavigateToNightlife && (
            <button
              onClick={onNavigateToNightlife}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition"
            >
              <PartyPopper className="w-4 h-4 text-purple-600" />
              <span>Vida Nocturna & Fiestas</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar yerba, vacío, grupo, ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* STORES TAB */}
      {activeTab === 'stores' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'Todas',
              'Emprendimiento de Olim (Sin Local / Por Encargo)',
              'Panadería, Café y Facturas',
              'Empanadas y Comida Casera',
              'Almacén Rioplatense / Latino',
              'Carnicería (Cortes Latinos)',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setStoreFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border font-semibold text-xs transition ${
                  storeFilter === cat
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat === 'Todas' ? 'Todos los rubros' : cat}
              </button>
            ))}
          </div>

          {/* Entrepreneurship Spotlight Banner if filtered or general */}
          {(storeFilter === 'Todas' || storeFilter === 'Emprendimiento de Olim (Sin Local / Por Encargo)') && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-amber-950 font-bold block">
                  ❤️ Apoyo Mutuo: Emprendimientos de Olim Jadashim
                </strong>
                <p className="text-amber-900/80 mt-0.5">
                  Muchos recién llegados comienzan cocinando desde sus casas sin local a la calle (empanadas caseras cortadas a cuchillo, facturas, tortas) o abren cafeterías temáticas como <strong>Amapola</strong>. Comprarles a ellos impulsa la economía directa de nuestra comunidad.
                </p>
              </div>
            </div>
          )}

          {/* Stores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredStores.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-amber-300 transition-all p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900">{st.name}</h3>
                        {st.isEntrepreneurship && (
                          <span className="text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            ✨ Emprendimiento Olé
                          </span>
                        )}
                        {st.isIconic && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-600" /> Emblemático
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-amber-700 mt-0.5">{st.category}</p>
                    </div>

                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md shrink-0">
                      {st.city}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                    {st.description}
                  </p>

                  {/* Order Method / Contact pill */}
                  {st.orderMethod && (
                    <div className="mt-2.5 flex items-center gap-2 text-xs">
                      <span className="text-[11px] font-bold text-gray-500">Modalidad:</span>
                      <span className="font-semibold text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {st.orderMethod === 'WhatsApp' ? '📱 Encargos directos por WhatsApp' : st.orderMethod}
                      </span>
                      {st.instagramOrWeb && (
                        <span className="text-[11px] text-gray-500 font-mono">
                          {st.instagramOrWeb}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Specialties tags */}
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-gray-700 block mb-1.5">
                      Qué encuentras aquí:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {st.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200/70 px-2 py-0.5 rounded-md font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location & Details */}
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{st.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{st.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="font-mono">{st.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={`https://wa.me/972${st.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                  >
                    <span>Contactar por WhatsApp</span>
                  </a>

                  {st.address.includes('Calle') || st.address.includes('Shuk') || st.address.includes('HaSatat') ? (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(st.name + ' ' + st.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>Ver Mapa</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-400 italic">Cocina sin local al público</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GROUPS TAB */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {['Todas', 'Búsqueda de Empleo', 'Alquileres y Vivienda', 'Trámites y Burocracia', 'Comunidades por Ciudad'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGroupCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border font-semibold text-xs transition ${
                  groupCategoryFilter === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat === 'Todas' ? 'Todas las Categorías' : cat}
              </button>
            ))}
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGroups.map((grp) => (
              <div
                key={grp.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        grp.platform === 'WhatsApp'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {grp.platform}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {grp.membersCount}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mt-2">{grp.title}</h3>
                  <span className="text-[11px] font-semibold text-blue-700 block mt-0.5">
                    {grp.category} · {grp.cityOrScope}
                  </span>

                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {grp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Moderado por la comunidad</span>
                  <a
                    href={grp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-xs transition ${
                      grp.platform === 'WhatsApp'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <span>Unirme al grupo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
