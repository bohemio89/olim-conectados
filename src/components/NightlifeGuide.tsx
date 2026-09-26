import React, { useState } from 'react';
import { 
  PartyPopper, 
  MapPin, 
  Clock, 
  Music, 
  Sparkles, 
  Ticket, 
  Search, 
  ExternalLink, 
  Instagram, 
  Phone,
  Flame,
  CheckCircle2,
  Filter,
  Wine,
  Radio,
  Users
} from 'lucide-react';
import { NightlifeVenue } from '../types';

interface NightlifeGuideProps {
  venues: NightlifeVenue[];
}

export const NightlifeGuide: React.FC<NightlifeGuideProps> = ({ venues }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedCity, setSelectedCity] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Todas',
    'Fiesta & Baile Latino',
    'Boliche & Club Latino',
    'Bar & After Office',
    'Salsa & Bachata Social',
  ];

  const cities = ['Todas', ...Array.from(new Set(venues.map((v) => v.city))).sort()];

  const filteredVenues = venues.filter((venue) => {
    const matchesCategory = selectedCategory === 'Todas' || venue.category === selectedCategory;
    const matchesCity = selectedCity === 'Todas' || venue.city === selectedCity;
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.musicStyles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      venue.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-fuchsia-700 via-purple-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs px-3 py-1 rounded-full font-bold mb-3 tracking-wide uppercase">
            <PartyPopper className="w-3.5 h-3.5 text-pink-300" />
            <span>Vida Nocturna y Fiestas para Olim en Israel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Vida Nocturna & Fiestas Latinas
          </h1>
          <p className="mt-2 text-sm sm:text-base text-purple-100 leading-relaxed">
            Centralizamos los mejores lugares y eventos para salir a divertirte con música en español, fernet, cumbia, cuarteto, reggaetón y salsa. Desde opciones de fiestas masivas como <strong>Cachengue Tel Aviv</strong> y <strong>La Fiesta Argentina</strong>, hasta boliches, bares con música urbana en Florentin y clubes de salsa en Tel Aviv y Haifa.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-purple-200">
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs">
              <Flame className="w-4 h-4 text-amber-400" />
              Cumbia, Cuarteto & Reggaetón
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs">
              <Wine className="w-4 h-4 text-pink-300" />
              Fernet en jarra & ambiente latino
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs">
              <Radio className="w-4 h-4 text-blue-300" />
              100% Música en Español
            </span>
          </div>
        </div>
      </div>

      {/* Guide Tips for Olim */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Consejos clave de salida nocturna para Olim Jadashim</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
            • <strong>Documento obligatorio:</strong> Llevá siempre tu Teudat Zehut física o pasaporte original (los boliches en Israel exigen 18+ o 21+ con DNI físico, no aceptan fotos en el celular).<br />
            • <strong>Entradas con descuento:</strong> La mayoría de fiestas como <em>Cachengue</em> y <em>La Fiesta Argentina</em> lanzan preventas más baratas en plataformas como <strong>Go-Out</strong>. Conviene comprar antes de que se agoten.<br />
            • <strong>Transporte:</strong> En fines de semana, verificá los buses nocturnos (Kavei Laila) o coordiná taxis / Gett para volver seguro.
          </p>
        </div>
        <div className="shrink-0 bg-white px-3 py-2 rounded-lg border border-amber-300 text-center shadow-2xs">
          <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Música en Español</span>
          <span className="text-sm font-extrabold text-amber-700">100% Ritmo Latino & Hits</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por fiesta, cumbia, cuarteto, salsa, boliche o barrio (ej. Cachengue, Florentin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-purple-700 text-white font-bold shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cities Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500 font-medium">Ciudad:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-gray-700"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-5 sm:p-6 space-y-4">
              {/* Header Badge & Name */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                    {venue.category}
                  </span>
                  {venue.isPopularWithOlim && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500" /> Favorito Olim
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition">
                  {venue.name}
                </h3>
                <p className="text-xs text-purple-950/70 font-medium mt-0.5">
                  {venue.atmosphere}
                </p>
              </div>

              {/* Music Styles Tags */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                  <Music className="w-3 h-3 text-purple-600" />
                  Géneros musicales:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {venue.musicStyles.map((style) => (
                    <span
                      key={style}
                      className="text-[11px] bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded-md border border-slate-200/70"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed">
                {venue.description}
              </p>

              {/* Highlights */}
              <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-3 space-y-1.5">
                <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wide block">
                  Puntos destacados:
                </span>
                <ul className="space-y-1">
                  {venue.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Info: Address, Hours, Price */}
              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dirección:</strong> {venue.address} ({venue.city})
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Horarios:</strong> {venue.schedule}
                  </span>
                </div>
                {venue.priceRange && (
                  <div className="flex items-start gap-2">
                    <Ticket className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Entrada / Consumo:</strong> {venue.priceRange}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {venue.instagramOrWeb && (
                  <a
                    href={`https://instagram.com/${venue.instagramOrWeb.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-pink-700 hover:text-pink-800 flex items-center gap-1.5 transition"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{venue.instagramOrWeb}</span>
                  </a>
                )}
                {venue.phoneOrTickets && (
                  <a
                    href={`tel:${venue.phoneOrTickets.replace(/[^0-9]/g, '')}`}
                    className="text-xs font-semibold text-gray-600 hover:text-purple-700 flex items-center gap-1 transition"
                  >
                    <Phone className="w-3 h-3" />
                    <span className="font-mono">{venue.phoneOrTickets}</span>
                  </a>
                )}
              </div>

              {venue.ticketLink ? (
                <a
                  href={venue.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Comprar Entradas</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              ) : (
                <span className="text-[11px] font-medium text-gray-500 italic">
                  Ingreso en puerta o lista
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVenues.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8 space-y-3">
          <PartyPopper className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-700">No encontramos salidas con esos filtros</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Intentá cambiar la categoría o limpiar el texto de búsqueda para ver todas las opciones disponibles.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todas');
              setSelectedCity('Todas');
              setSearchQuery('');
            }}
            className="text-xs font-bold bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );
};
