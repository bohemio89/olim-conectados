import React from 'react';

interface LogoSymbolProps {
  className?: string;
}

export const LogoSymbol: React.FC<LogoSymbolProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="symbol-left-half">
          <rect x="0" y="0" width="50" height="100" />
        </clipPath>
        <clipPath id="symbol-right-half">
          <rect x="50" y="0" width="50" height="100" />
        </clipPath>
      </defs>

      {/* Pin Body (Left Half: #1F7BC4 Blue) */}
      <path
        d="M 50 8 C 30.1 8 14 24.1 14 44 C 14 62.5 37 84 50 94 C 63 84 86 62.5 86 44 C 86 24.1 69.9 8 50 8 Z"
        fill="#1F7BC4"
        clipPath="url(#symbol-left-half)"
      />

      {/* Pin Body (Right Half: #E8A33D Orange) */}
      <path
        d="M 50 8 C 30.1 8 14 24.1 14 44 C 14 62.5 37 84 50 94 C 63 84 86 62.5 86 44 C 86 24.1 69.9 8 50 8 Z"
        fill="#E8A33D"
        clipPath="url(#symbol-right-half)"
      />

      {/* Pin Outline (#0E2559 Navy) */}
      <path
        d="M 50 8 C 30.1 8 14 24.1 14 44 C 14 62.5 37 84 50 94 C 63 84 86 62.5 86 44 C 86 24.1 69.9 8 50 8 Z"
        fill="none"
        stroke="#0E2559"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Center Dividing Hairline (#0E2559 Navy) */}
      <line x1="50" y1="8" x2="50" y2="94" stroke="#0E2559" strokeWidth="2.5" />

      {/* Center Circle Base for Star of David */}
      <circle cx="50" cy="42" r="21" fill="#FFFFFF" stroke="#0E2559" strokeWidth="3" />

      {/* Star of David (Magen David) */}
      <polygon
        points="50,27 63,49.5 37,49.5"
        fill="#1F7BC4"
        fillOpacity="0.18"
        stroke="#0E2559"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <polygon
        points="50,57 63,34.5 37,34.5"
        fill="#E8A33D"
        fillOpacity="0.18"
        stroke="#0E2559"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};
