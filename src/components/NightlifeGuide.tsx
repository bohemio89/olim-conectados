import React, { useState } from 'react';
import { 
  Music, 
  Disc3, 
  PartyPopper, 
  MapPin, 
  Calendar, 
  Instagram, 
  Info,
  X,
  ExternalLink
} from 'lucide-react';
import { NightlifeVenue } from '../types';

interface NightlifeGuideProps {
  venues: NightlifeVenue[];
}

export const NightlifeGuide: React.FC<NightlifeGuideProps> = ({ venues }) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('Todas');
  const [activeDateModal, setActiveDateModal] = useState<NightlifeVenue | null>(null);

  const styleChips = [
    'Todas',
    'Reggaetón',
    'Salsa & Bachata',
    'Fiestas variadas',
  ];

  // Helper metadata per venue to exactly match design in screenshot
  const getVenueMeta = (venue: NightlifeVenue) => {
    if (venue.name.includes('Pasión Latina')) {
      return {
        coverBg: 'bg-[#39182E]',
        coverIcon: Music,
        displayType: 'Boliche latino',
        displayAddress: 'Ibn Gabirol 30, Tel Aviv',
        tags: ['Reggaetón', 'Old school'],
        styleCategory: 'Reggaetón',
        instagramUrl: 'https://instagram.com/pasionlatina_backup',
        nextDateInfo: 'Fiestas quincenales los fines de semana. Próxima edición: Jueves a medianoche. Entradas por lista o en puerta.',
      };
    }
    if (venue.name.includes('Havana')) {
      return {
        coverBg: 'bg-[#7A3F1F]',
        coverIcon: Disc3,
        displayType: 'Salsa & bachata',
        displayAddress: 'Tel Aviv-Yafo',
        tags: ['Salsa', 'Bachata'],
        styleCategory: 'Salsa & Bachata',
        instagramUrl: 'https://instagram.com/havanaclubtlv',
        nextDateInfo: 'Clases y social todos los martes, jueves y sábados desde las 21:00. Pista de salsa y pista de bachata en simultáneo.',
      };
    }
    // Cachengue TLV
    return {
      coverBg: 'bg-[#183A64]',
      coverIcon: PartyPopper,
      displayType: 'Fiestas y after beach',
      displayAddress: 'Tel Aviv-Yafo · sin lugar fijo',
      tags: ['Variado'],
      styleCategory: 'Fiestas variadas',
      instagramUrl: 'https://instagram.com/cachengue.tlv',
      nextDateInfo: 'Eventos temáticos periódicos (After Beach, fiestas patrias, cumbia y pop). Preventa oficial vía Go-Out.',
    };
  };

  const filteredVenues = venues.filter((venue) => {
    if (selectedStyle === 'Todas') return true;
    const meta = getVenueMeta(venue);
    return meta.styleCategory === selectedStyle;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Chips de estilo: Todas, Reggaetón, Salsa & Bachata, Fiestas variadas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-sm">
        {styleChips.map((style) => {
          const isActive = selectedStyle === style;
          return (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#0E2559] text-white shadow-2xs'
                  : 'bg-white text-neutral-800 border border-neutral-200/90 hover:bg-neutral-50 shadow-2xs'
              }`}
            >
              {style}
            </button>
          );
        })}
      </div>

      {/* 2. Fichas en 3 columnas (1 en celular) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVenues.map((venue) => {
          const meta = getVenueMeta(venue);
          const CoverIcon = meta.coverIcon;

          return (
            <div
              key={venue.id}
              className="bg-white rounded-3xl border border-black/10 overflow-hidden shadow-2xs flex flex-col justify-between hover:border-[#2A7050]/40 transition space-y-4 p-5"
            >
              <div className="space-y-4">
                {/* Portada de color e ícono */}
                <div className={`w-full h-36 rounded-2xl ${meta.coverBg} flex items-center justify-center text-white shadow-inner`}>
                  <CoverIcon className="w-9 h-9 text-white/90" />
                </div>

                {/* Nombre y Tipo */}
                <div>
                  <h3 className="font-extrabold text-[#0E2559] text-xl leading-tight">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium mt-0.5">
                    {meta.displayType}
                  </p>
                </div>

                {/* Dirección */}
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="truncate">{meta.displayAddress}</span>
                </div>

                {/* Etiquetas */}
                <div className="flex flex-wrap gap-1.5">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 text-neutral-700 font-bold text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones: Próxima fecha e Instagram */}
              <div className="flex items-center gap-2 pt-3 border-t border-black/5">
                <button
                  type="button"
                  onClick={() => setActiveDateModal(venue)}
                  className="flex-1 min-h-[44px] bg-[#2A7050] hover:bg-[#235e43] text-white font-bold text-sm py-2.5 px-3 rounded-full flex items-center justify-center gap-2 transition shadow-2xs"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Próxima fecha</span>
                </button>
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

      {/* 3. Franja al pie: Las fechas cambian seguido: confirma en Instagram antes de ir. */}
      <div className="bg-[#FFF6E5] border border-[#E8A33D]/30 rounded-2xl p-4 flex items-center gap-3 text-sm text-[#8A5612] font-semibold shadow-2xs">
        <Info className="w-5 h-5 text-[#E8A33D] shrink-0" />
        <p className="leading-snug">
          Las fechas cambian seguido: confirma en Instagram antes de ir.
        </p>
      </div>

      {/* Modal informativa de próxima fecha */}
      {activeDateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#2A7050]" />
                <h3 className="font-extrabold text-[#0E2559] text-xl">
                  {activeDateModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDateModal(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F8F9FB] rounded-2xl p-4 text-sm text-neutral-700 leading-relaxed">
              <p className="font-bold text-[#0E2559] mb-1">Cronograma de eventos:</p>
              <p>{getVenueMeta(activeDateModal).nextDateInfo}</p>
            </div>

            <p className="text-xs text-neutral-500">
              * Recuerda que los horarios y locaciones especiales se actualizan siempre en sus historias de Instagram.
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setActiveDateModal(null)}
                className="flex-1 min-h-[44px] border border-neutral-300 rounded-xl font-bold text-neutral-700 hover:bg-neutral-50 text-sm"
              >
                Cerrar
              </button>
              <a
                href={getVenueMeta(activeDateModal).instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] bg-[#2A7050] text-white rounded-xl font-bold hover:bg-[#235e43] text-sm flex items-center justify-center gap-2 shadow-2xs"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NightlifeGuide;
