import React, { useState } from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  TrendingDown, 
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const SickLeaveCalculator: React.FC = () => {
  const [calculationMode, setCalculationMode] = useState<'monthly' | 'daily'>('monthly');
  const [monthlySalary, setMonthlySalary] = useState<number>(8500);
  const [dailyRate, setDailyRate] = useState<number>(386);
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState<number>(22);
  
  const [absenceDays, setAbsenceDays] = useState<number>(5);
  const [monthsWorked, setMonthsWorked] = useState<number>(4);
  const [useExactAccumulatedBalance, setUseExactAccumulatedBalance] = useState<boolean>(false);
  const [exactAccumulatedDays, setExactAccumulatedDays] = useState<number>(6);

  // Derived effective daily wage
  const effectiveDailyWage = calculationMode === 'monthly'
    ? Math.round(monthlySalary / (workingDaysPerMonth || 22))
    : dailyRate;

  // Accumulated days available
  const availableSickDays = useExactAccumulatedBalance
    ? exactAccumulatedDays
    : Math.min(90, Math.round(monthsWorked * 1.5 * 10) / 10);

  // Calculation of payment by day according to Jok Dmei Majalá
  // Day 1: 0%
  // Days 2 and 3: 50%
  // Day 4+: 100%
  // But capped by available accumulated days!
  const dayBreakdown: { day: number; percentage: number; amount: number; isCoveredByBalance: boolean }[] = [];
  let totalPayable = 0;
  let paidDaysCount = 0;
  let unpaidAbsenceDaysCount = 0;

  for (let i = 1; i <= absenceDays; i++) {
    const isCovered = i <= availableSickDays;
    let pct = 0;
    if (i === 1) pct = 0;
    else if (i === 2 || i === 3) pct = 0.5;
    else pct = 1.0;

    let amount = 0;
    if (isCovered) {
      amount = Math.round(effectiveDailyWage * pct);
      totalPayable += amount;
      paidDaysCount++;
    } else {
      unpaidAbsenceDaysCount++;
    }

    dayBreakdown.push({
      day: i,
      percentage: isCovered ? pct * 100 : 0,
      amount,
      isCoveredByBalance: isCovered,
    });
  }

  // Full regular expected income for those absent days
  const potentialFullIncome = absenceDays * effectiveDailyWage;
  const lostIncome = potentialFullIncome - totalPayable;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-300" />
            <span>Simulador Legal de Sueldos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Calculadora de Días de Enfermedad (Jok Dmei Majalá)
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Muchos olim creen erróneamente que tener certificado médico (<strong>ishur majalá</strong>) garantiza el 100% de pago desde el primer día. La ley en Israel impone una escala porcentual obligatoria y <strong>solo paga si tienes saldo acumulado</strong> en tu recibo (<strong>tlush sajar</strong>).
          </p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            Datos Salariales y Reposo Médico
          </h2>

          {/* Salary mode */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Tipo de Remuneración
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCalculationMode('monthly')}
                className={`py-2 text-xs font-semibold rounded-lg border transition ${
                  calculationMode === 'monthly'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                Salario Mensual Global
              </button>
              <button
                type="button"
                onClick={() => setCalculationMode('daily')}
                className={`py-2 text-xs font-semibold rounded-lg border transition ${
                  calculationMode === 'daily'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                Jornal Diario Fijo
              </button>
            </div>
          </div>

          {calculationMode === 'monthly' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sueldo Bruto Mensual (NIS)
                </label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Días Laborales / Mes
                </label>
                <input
                  type="number"
                  value={workingDaysPerMonth}
                  onChange={(e) => setWorkingDaysPerMonth(Math.max(1, Number(e.target.value)))}
                  className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Valor del Día / Jornal Diario Bruto (NIS)
              </label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(Math.max(0, Number(e.target.value)))}
                className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs flex justify-between items-center">
            <span className="text-gray-600">Jornal Diario Calculado:</span>
            <span className="font-extrabold text-gray-900 font-mono text-sm">
              ≈ {effectiveDailyWage} NIS / día
            </span>
          </div>

          {/* Days of Absence */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">
                Días de Reposo Médico (Ishur Majalá)
              </label>
              <span className="text-xs font-bold text-emerald-700">{absenceDays} días</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={absenceDays}
              onChange={(e) => setAbsenceDays(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>1 día</span>
              <span>7 días</span>
              <span>15 días</span>
            </div>
          </div>

          {/* Accumulated Sick Days Balance */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Saldo Acumulado (Tsvirat Yeméi Majalá)
              </label>
              <button
                type="button"
                onClick={() => setUseExactAccumulatedBalance(!useExactAccumulatedBalance)}
                className="text-[11px] text-emerald-700 underline font-medium"
              >
                {useExactAccumulatedBalance ? 'Calcular por meses' : 'Ingresar saldo exacto'}
              </button>
            </div>

            {useExactAccumulatedBalance ? (
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  Días acumulados que figuran en tu Tlush Sajar:
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={exactAccumulatedDays}
                  onChange={(e) => setExactAccumulatedDays(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-[11px] text-gray-600 mb-1">
                  <span>Meses continuos trabajados en la empresa:</span>
                  <span className="font-bold text-gray-900">{monthsWorked} meses</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={24}
                  value={monthsWorked}
                  onChange={(e) => setMonthsWorked(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Ley: 1.5 días acumulados por mes completo (tope 90 días). Tu saldo estimado: <strong>{availableSickDays} días</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Results Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-gray-900">
                Resultado de Liquidación Legal
              </h2>
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                Jok Dmei Majalá
              </span>
            </div>

            {/* Big Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <span className="text-xs font-semibold text-emerald-800">
                  Total a Cobrar por Ley
                </span>
                <p className="text-2xl font-black text-emerald-950 font-mono mt-1">
                  {totalPayable.toLocaleString()} NIS
                </p>
                <p className="text-[10px] text-emerald-700 mt-1">
                  Liquidación bruta sujeta a descuentos ordinarios
                </p>
              </div>

              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
                <span className="text-xs font-semibold text-rose-800">
                  Pérdida Económica por Ausencia
                </span>
                <p className="text-2xl font-black text-rose-950 font-mono mt-1">
                  - {lostIncome.toLocaleString()} NIS
                </p>
                <p className="text-[10px] text-rose-700 mt-1">
                  (Día 1 al 0%, días 2-3 al 50%, o días sin saldo acumulado)
                </p>
              </div>
            </div>

            {/* Critical Deficit Alert: Not enough accumulated days */}
            {unpaidAbsenceDaysCount > 0 && (
              <div className="mt-4 p-3.5 bg-rose-100 border border-rose-300 rounded-xl text-xs text-rose-950 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-rose-900 block">
                    ¡ALERTA DE DESCUENTO EN TLUSH SAJAR!
                  </strong>
                  Tu saldo acumulado es de solo <strong>{availableSickDays} días</strong>, pero estuviste ausente <strong>{absenceDays} días</strong>.
                  Los <strong>{unpaidAbsenceDaysCount} días excedentes</strong> quedarán como <u>ausencia NO remunerada</u> y serán descontados íntegramente de tu sueldo a final de mes.
                </div>
              </div>
            )}

            {/* Daily Breakdown Table */}
            <div className="mt-5">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                Desglose Día por Día según la Ley:
              </h3>
              <div className="overflow-hidden border border-gray-200 rounded-xl text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="py-2 px-3">Día</th>
                      <th className="py-2 px-3">% de Pago Legal</th>
                      <th className="py-2 px-3">Saldo Acumulado</th>
                      <th className="py-2 px-3 text-right">Monto Bruto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dayBreakdown.map((row) => (
                      <tr
                        key={row.day}
                        className={!row.isCoveredByBalance ? 'bg-rose-50/50' : ''}
                      >
                        <td className="py-2 px-3 font-semibold text-gray-800">
                          Día {row.day}
                        </td>
                        <td className="py-2 px-3">
                          {row.isCoveredByBalance ? (
                            <span
                              className={`font-bold ${
                                row.percentage === 0
                                  ? 'text-gray-400'
                                  : row.percentage === 50
                                  ? 'text-amber-600'
                                  : 'text-emerald-600'
                              }`}
                            >
                              {row.percentage}%
                            </span>
                          ) : (
                            <span className="text-rose-600 font-bold">0% (Sin Saldo)</span>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {row.isCoveredByBalance ? (
                            <span className="text-emerald-700 font-medium">Cubierto</span>
                          ) : (
                            <span className="text-rose-700 font-semibold">Agotado</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-gray-900">
                          {row.amount} NIS
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Legal Footnote */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
            <p className="font-bold text-gray-800 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              ¿Por qué es obligatorio el Ishur Majalá aunque no se pague el 100%?
            </p>
            <p className="text-[11px] leading-relaxed">
              El certificado médico (<strong>ishur majalá</strong>) protege legalmente contra el despido disciplinario por ausencia injustificada. Sin embargo, no altera la escala legal (0% el día 1, 50% días 2-3, 100% desde el día 4). Si la lesión fue producida por tu trabajo, tramita el <strong>BL 250</strong> para cobrar el 75% directo desde el primer día vía Bituaj Leumi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
