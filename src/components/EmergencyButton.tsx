import React from 'react';
import { PhoneCall, AlertTriangle, ShieldAlert } from 'lucide-react';

interface EmergencyButtonProps {
  onClick: () => void;
  className?: string;
  variant?: 'solid' | 'badge' | 'compact';
  showSubtext?: boolean;
}

/**
 * Componente unificado de Botón de Emergencia (Punto 3 UX).
 * Mantiene consistencia total (icono, color rojo, texto e identidad) en cualquier sección.
 */
export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  onClick,
  className = '',
  variant = 'solid',
  showSubtext = false,
}) => {
  if (variant === 'badge') {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition active:scale-95 ${className}`}
        title="Acceso directo a Guardia SOS y MADA 101"
      >
        <PhoneCall className="w-3.5 h-3.5 text-white animate-pulse" />
        <span>Emergencia MADA 101</span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition active:scale-95 shrink-0 ${className}`}
        title="Emergencia MADA 101 / Guardia SOS"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-white" />
        <span className="hidden sm:inline">Emergencia 101</span>
        <span className="sm:hidden">101 SOS</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 ${className}`}
    >
      <PhoneCall className="w-4 h-4 text-white shrink-0 animate-pulse" />
      <div className="text-left">
        <span className="block leading-tight font-extrabold">Emergencia MADA 101</span>
        {showSubtext && (
          <span className="block text-[10px] text-red-100 font-normal leading-tight">
            Guardia hospitalaria & ambulancias
          </span>
        )}
      </div>
    </button>
  );
};
