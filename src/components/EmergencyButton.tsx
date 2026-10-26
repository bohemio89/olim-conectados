import React from 'react';

export interface EmergencyButtonProps {
  onClick?: () => void;
  className?: string;
  variant?: string;
  showSubtext?: boolean;
}

/**
 * UN SOLO botón rojo "Emergencia MADA 101" para la barra superior
 * Fondo rojo #C0392B, forma de píldora redondeada completa (rounded-full).
 */
export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <a
      href="tel:101"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2 min-h-[44px] rounded-full bg-[#C0392B] hover:bg-[#a93224] text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#C0392B]/50 ${className}`}
      title="Llamada directa a Ambulancias MADA (101)"
      aria-label="Emergencia 101"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/>
      </svg>
      <span>Emergencia 101</span>
    </a>
  );
};
