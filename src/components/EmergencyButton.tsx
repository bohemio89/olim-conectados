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
      className={`inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#C0392B] hover:bg-[#a93224] text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#C0392B]/50 ${className}`}
      title="Llamada directa a Ambulancias MADA (101)"
      aria-label="Emergencia MADA 101"
    >
      Emergencia MADA 101
    </a>
  );
};
