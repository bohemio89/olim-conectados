import React, { useState } from 'react';
import { 
  AlertTriangle,
  ArrowRight,
  BriefcaseMedical
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';

export interface SickLeaveCalculatorProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const SickLeaveCalculator: React.FC<SickLeaveCalculatorProps> = ({ onNavigateToTab }) => {
  const [calculationMode, setCalculationMode] = useState<'monthly' | 'daily'>('monthly');
  const [monthlySalary, setMonthlySalary] = useState<number>(8500);
  const [dailyRate, setDailyRate] = useState<number>(386);
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState<number>(22);
  const [absenceDays, setAbsenceDays] = useState<number>(5);
  const [monthsWorked, setMonthsWorked] = useState<number>(4);

  // Días acumulados: 1,5 días por mes trabajado (máximo 90 días por ley)
  const accumulatedDays = Math.min(90, Math.floor(monthsWorked * 1.5 * 10) / 10);

  // Base daily wage calculation
  const baseDaily = calculationMode === 'monthly'
    ? Math.floor(monthlySalary / (workingDaysPerMonth || 22))
    : dailyRate;

  const halfDaily = Math.floor(baseDaily * 0.5);

  // Calculation per day:
  // Day 1: 0%
  // Days 2 & 3: 50%
  // Days 4+: 100%
  // Any day beyond accumulated days: 0%
  const dayBreakdown: { day: number; percentage: number; amount: number; isCovered: boolean }[] = [];
  let totalPayable = 0;

  for (let i = 1; i <= absenceDays; i++) {
    const isCovered = i <= accumulatedDays;
    let pct = 0;
    let amount = 0;

    if (isCovered) {
      if (i === 1) {
        pct = 0;
        amount = 0;
      } else if (i === 2 || i === 3) {
        pct = 50;
        amount = halfDaily;
      } else {
        pct = 100;
        amount = baseDaily;
      }
      totalPayable += amount;
    } else {
      pct = 0;
      amount = 0;
    }

    dayBreakdown.push({
      day: i,
      percentage: pct,
      amount,
      isCovered,
    });
  }

  const coveredDays = dayBreakdown.filter((d) => d.isCovered);
  const sum = (arr: typeof dayBreakdown) => arr.reduce((t, d) => t + d.amount, 0);
  const groups = [
    { label: 'Día 1', pct: 0, color: '#C0392B', days: coveredDays.filter((d) => d.day === 1).length, amount: 0 },
    { label: 'Días 2 y 3', pct: 50, color: '#E8A33D', days: coveredDays.filter((d) => d.day === 2 || d.day === 3).length, amount: sum(coveredDays.filter((d) => d.day === 2 || d.day === 3)) },
    { label: 'Desde el día 4', pct: 100, color: '#2A7050', days: coveredDays.filter((d) => d.day >= 4).length, amount: sum(coveredDays.filter((d) => d.day >= 4)) },
    { label: 'Sin días acumulados', pct: 0, color: '#C0392B', days: dayBreakdown.length - coveredDays.length, amount: 0 },
  ];

  const potentialFullIncome = absenceDays * baseDaily;
  const lostIncome = potentialFullIncome - totalPayable;

  return (
    <div className="space-y-6">
      
      {/* 2 Column Layout (Notebook: side by side, Celular: stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Columna Izquierda: Tus datos */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-5">
          <h2 className="text-xl font-extrabold text-[#0E2559]">
            Tus datos
          </h2>

          {/* Selector de tipo de remuneración */}
          <div className="grid grid-cols-2 gap-2 bg-[#F8F9FB] p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setCalculationMode('monthly')}
              className={`min-h-[44px] py-2.5 px-3 text-sm font-bold rounded-xl transition ${
                calculationMode === 'monthly'
                  ? 'bg-white border-2 border-[#5B4594] text-[#0E2559] shadow-2xs'
                  : 'bg-transparent border border-transparent text-neutral-600 hover:text-[#0E2559]'
              }`}
            >
              Sueldo mensual
            </button>
            <button
              type="button"
              onClick={() => setCalculationMode('daily')}
              className={`min-h-[44px] py-2.5 px-3 text-sm font-bold rounded-xl transition ${
                calculationMode === 'daily'
                  ? 'bg-white border-2 border-[#5B4594] text-[#0E2559] shadow-2xs'
                  : 'bg-transparent border border-transparent text-neutral-600 hover:text-[#0E2559]'
              }`}
            >
              Jornal diario
            </button>
          </div>

          {/* Campos según modo */}
          {calculationMode === 'monthly' ? (
            <>
              <div>
                <label className="block text-sm font-bold text-[#0E2559] mb-1.5">
                  Sueldo bruto mensual
                </label>
                <div className="flex items-center bg-white border border-neutral-300 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#5B4594] focus-within:border-[#5B4594] transition">
                  <span className="text-xl font-black text-[#0E2559] mr-2 select-none">₪</span>
                  <input
                    type="number"
                    value={monthlySalary || ''}
                    onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
                    className="w-full font-black text-xl text-[#0E2559] outline-none bg-transparent"
                    placeholder="8500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0E2559] mb-1.5">
                  Días laborales por mes
                </label>
                <div className="flex items-center bg-white border border-neutral-300 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#5B4594] focus-within:border-[#5B4594] transition">
                  <input
                    type="number"
                    value={workingDaysPerMonth || ''}
                    onChange={(e) => setWorkingDaysPerMonth(Math.max(1, Number(e.target.value)))}
                    className="w-full font-black text-xl text-[#0E2559] outline-none bg-transparent"
                    placeholder="22"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-bold text-[#0E2559] mb-1.5">
                Jornal diario bruto
              </label>
              <div className="flex items-center bg-white border border-neutral-300 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#5B4594] focus-within:border-[#5B4594] transition">
                <span className="text-xl font-black text-[#0E2559] mr-2 select-none">₪</span>
                <input
                  type="number"
                  value={dailyRate || ''}
                  onChange={(e) => setDailyRate(Math.max(0, Number(e.target.value)))}
                  className="w-full font-black text-xl text-[#0E2559] outline-none bg-transparent"
                  placeholder="386"
                />
              </div>
            </div>
          )}

          {/* Días de reposo */}
          <div>
            <label className="block text-sm font-bold text-[#0E2559] mb-1.5">
              Días de reposo (ishur majalá)
            </label>
            <div className="flex items-center justify-between bg-white border border-neutral-300 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#5B4594] focus-within:border-[#5B4594] transition">
              <input
                type="number"
                min="1"
                max="30"
                value={absenceDays || ''}
                onChange={(e) => setAbsenceDays(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full font-black text-xl text-[#0E2559] outline-none bg-transparent"
                placeholder="5"
              />
              <span className="text-neutral-600 font-semibold text-sm ml-2 shrink-0 select-none">
                días
              </span>
            </div>
          </div>

          {/* Meses trabajando */}
          <div>
            <label className="block text-sm font-bold text-[#0E2559] mb-1.5">
              Meses trabajando en la empresa
            </label>
            <div className="flex items-center justify-between bg-white border border-neutral-300 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#5B4594] focus-within:border-[#5B4594] transition">
              <input
                type="number"
                min="0"
                max="60"
                value={monthsWorked || ''}
                onChange={(e) => setMonthsWorked(Math.max(0, Number(e.target.value)))}
                className="w-full font-black text-xl text-[#0E2559] outline-none bg-transparent"
                placeholder="4"
              />
              <span className="text-neutral-600 font-semibold text-sm ml-2 shrink-0 select-none">
                = {accumulatedDays} días acumulados
              </span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Resultados y Gráfico de Barras */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-black/10 p-6 sm:p-7 shadow-2xs space-y-6">
          
          {/* Header de Totales: Cobras por ley vs Pierdes */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs sm:text-sm font-medium text-neutral-500 block">
                Cobras por ley
              </span>
              <p className="text-2xl sm:text-4xl font-black text-[#2A7050] tracking-tight mt-0.5">
                ₪ {totalPayable.toLocaleString('es-AR')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs sm:text-sm font-medium text-neutral-500 block">
                Pierdes
              </span>
              <p className="text-2xl sm:text-4xl font-black text-[#C0392B] tracking-tight mt-0.5">
                ₪ {lostIncome.toLocaleString('es-AR')}
              </p>
            </div>
          </div>

          {/* Resumen por tramos */}
          <div className="space-y-2.5">
            {groups.filter((g) => g.days > 0).map((g) => (
              <div key={g.label} className="flex items-center gap-3">
                <div className="w-24 sm:w-28 shrink-0">
                  <p className="text-sm font-bold text-[#0E2559] leading-tight">{g.label}</p>
                  <p className="text-xs text-neutral-500">{g.days} {g.days === 1 ? 'día' : 'días'} · {g.pct}%</p>
                </div>
                <div className="flex-1 h-7 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(g.pct, 4)}%`, background: g.color }}
                  />
                </div>
                <p className={`w-20 text-right text-sm font-black shrink-0 ${g.pct === 0 ? 'text-[#C0392B]' : 'text-[#0E2559]'}`}>
                  ₪ {g.amount.toLocaleString('es-AR')}
                </p>
              </div>
            ))}
          </div>

          {/* Alerta de días acumulados */}
          <div className="bg-[#FEF6E9] border border-[#E8A33D]/30 rounded-2xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#E8A33D] shrink-0" />
            <p className="font-bold text-[#8A5612] text-xs sm:text-sm leading-snug">
              Solo cobras los días que tienes acumulados: 1,5 por mes, hasta 90.
            </p>
          </div>

          {/* Banner de Bituaj Leumi con enlace */}
          <button
            type="button"
            onClick={() => onNavigateToTab?.('bituaj')}
            className="w-full text-left bg-[#F3EFFC] border border-[#5B4594]/15 hover:bg-[#EAE4F8] transition rounded-2xl p-4 sm:p-4.5 flex items-center justify-between group min-h-[56px] cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#5B4594]/10 flex items-center justify-center shrink-0">
                <BriefcaseMedical className="w-5 h-5 text-[#5B4594]" />
              </div>
              <p className="font-bold text-xs sm:text-sm text-[#0E2559] leading-snug">
                ¿Te lesionaste trabajando? Bituaj Leumi paga el 75% desde el día siguiente.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#5B4594] shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </button>

          {/* Fuente oficial */}
          <div className="pt-2 border-t border-black/5">
            <SourceBadge
              organismo="Ley de Dmei Majalá 1976 · texto oficial"
              sitio="btl.gov.il"
              fecha="revisado nov 2026"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default SickLeaveCalculator;
