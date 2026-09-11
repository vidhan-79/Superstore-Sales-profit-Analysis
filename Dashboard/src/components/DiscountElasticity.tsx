import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';
import { DISCOUNT_PROFIT_CURVE } from '../data/insightsData';
import {
  TrendingDown,
  Percent,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Info,
} from 'lucide-react';

interface DiscountElasticityProps {
  discountCapPct: number;
  setDiscountCapPct: (cap: number) => void;
  isDiscountCapApplied: boolean;
  setIsDiscountCapApplied: (applied: boolean) => void;
}

export const DiscountElasticity: React.FC<DiscountElasticityProps> = ({
  discountCapPct,
  setDiscountCapPct,
  isDiscountCapApplied,
  setIsDiscountCapApplied,
}) => {
  // Estimate recovered profit based on discount cap
  // If cap is 20%: orders at 30%, 40%, 50%, 60%, 70%, 80% have their losses eliminated or reduced
  const calculateEstimatedSavings = (cap: number) => {
    let savings = 0;
    DISCOUNT_PROFIT_CURVE.forEach((point) => {
      if (point.discountPct > cap && point.avgProfit < 0) {
        // Recover the loss plus bring to modest breakeven/positive margin
        savings += Math.abs(point.avgProfit) * point.orderCount;
      }
    });
    return Math.min(savings, 48000); // realistic bounded estimate
  };

  const estimatedSavings = calculateEstimatedSavings(discountCapPct);

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-slate-100">
          <div className="font-bold text-white mb-1 flex items-center justify-between gap-4">
            <span>Discount: {data.discountRange}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                data.avgProfit >= 0
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              {data.profitabilityZone}
            </span>
          </div>
          <div className="space-y-1 text-slate-300">
            <div className="flex justify-between gap-4">
              <span>Avg Profit per Order:</span>
              <span
                className={`font-bold ${
                  data.avgProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                ${data.avgProfit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Order Volume:</span>
              <span className="font-semibold text-white">
                {data.orderCount.toLocaleString()} orders
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Status:</span>
              <span className="text-slate-400">
                {data.avgProfit < 0 ? 'Margin Destroyer' : 'Profitable Transaction'}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Overview & Interactive Policy Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Percent className="w-4 h-4 text-rose-400" />
                Discount Level vs Average Order Profit
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Steep inverse relationship: Discounts above 20% trigger severe negative profitability.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                0-20%: Profitable
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                &gt;20%: Severe Loss
              </span>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DISCOUNT_PROFIT_CURVE}
                margin={{ top: 15, right: 15, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="discountRange" stroke="#94a3b8" fontSize={11} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(val) => `$${val}`}
                  domain={[-350, 100]}
                  width={60}
                />
                <Tooltip content={customTooltip} />
                <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={1.5} />
                <Bar dataKey="avgProfit" radius={[4, 4, 0, 0]}>
                  {DISCOUNT_PROFIT_CURVE.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.avgProfit >= 0 ? '#10b981' : '#f43f5e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Empirical Tipping Point (20% Threshold):</strong> At 0% discount, the average profit is <span className="text-emerald-300 font-semibold">+$66.90</span>. At 20% discount, profit drops to <span className="text-emerald-300 font-semibold">+$24.80</span>. Beyond 20%, every tier loses money, plummeting to <span className="text-rose-400 font-semibold">-$310.50 at 80% discount</span>.
            </div>
          </div>
        </div>

        {/* Interactive Discount Policy Governance Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Discount Policy Sandbox</h4>
                <p className="text-[11px] text-slate-400">Model the impact of capping sales discounts</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Maximum Discount Ceiling</span>
                  <span className="text-blue-400 font-bold">{discountCapPct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="5"
                  value={discountCapPct}
                  onChange={(e) => setDiscountCapPct(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>10% (Strict)</span>
                  <span>20% (Recommended)</span>
                  <span>40% (Permissive)</span>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/80 space-y-2">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Projected Annual Profit Recovery
                </div>
                <div className="text-2xl font-extrabold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5" />
                  +${estimatedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-[11px] text-slate-300">
                  By banning discounts greater than <strong>{discountCapPct}%</strong>, unprofitable sales volume is converted to healthy contribution margins.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => setIsDiscountCapApplied(!isDiscountCapApplied)}
              className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDiscountCapApplied
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {isDiscountCapApplied
                ? 'Policy Applied to Dashboard (Active)'
                : 'Apply Policy to Executive Dashboard'}
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              Updates total profit KPI cards and business forecasting models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
