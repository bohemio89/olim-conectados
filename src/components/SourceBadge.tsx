import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface SourceBadgeProps {
  organismo?: string;
  sitio?: string;
  fecha?: string;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  organismo = 'Ministerio de Salud',
  sitio = 'gov.il',
  fecha = 'revisado oct 2026',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 text-[13px] sm:text-sm text-slate-600 font-medium ${className}`}>
      <ShieldCheck className="w-4 h-4 text-[#2A7050] shrink-0" />
      <span>
        Fuente: {organismo}
        {sitio ? ` · ${sitio}` : ''}
        {fecha ? ` · ${fecha}` : ' · revisado oct 2026'}
      </span>
    </div>
  );
};

export default SourceBadge;
