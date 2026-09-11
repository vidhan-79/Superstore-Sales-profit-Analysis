import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Percent,
  Layers,
  Printer,
  AlertTriangle,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { EXECUTIVE_SUMMARY } from '../data/insightsData';

interface KPICardsProps {
  currentProfit: number;
  currentSales: number;
  simulatedProfitDelta: number;
  mitigatedLossAmount: number;
  onNavigateTab: (tab: string) => void;
}

export const KPICards: React.FC<KPICardsProps> = ({
  currentProfit,
  currentSales,
  simulatedProfitDelta,
  mitigatedLossAmount,
  onNavigateTab,
}) => {
  const currentMargin = ((currentProfit / currentSales) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Sales */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Sales
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center border border-blue-800/60 shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ${currentSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="inline-flex items-center text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +51.6% Growth
          </span>
          <span className="text-slate-500">2015 &rarr; 2018</span>
        </div>
      </div>

      {/* 2. Total Profit */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-all relative overflow-hidden flex flex-col justify-between h-full">
        {simulatedProfitDelta > 0 && (
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl shadow-xs">
            SIMULATED
          </div>
        )}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Profit
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center border border-emerald-800/60 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
              ${currentProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <Percent className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Net Margin: <strong className="text-slate-200">{currentMargin}%</strong></span>
          </div>
          {simulatedProfitDelta > 0 && (
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 shrink-0" /> +${simulatedProfitDelta.toFixed(0)}
            </span>
          )}
        </div>
      </div>

      {/* 3. Top Category (Technology) */}
      <div
        onClick={() => onNavigateTab('categories')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-blue-500/50 hover:bg-slate-800/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Top Category
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 text-indigo-400 flex items-center justify-center border border-indigo-800/60 group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Technology
            </span>
            <span className="text-xs font-semibold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/50 shrink-0">
              17.4% margin
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Sales: <strong className="text-slate-200">$836,154</strong></span>
          <span>Profit: <strong className="text-emerald-400">$145,455</strong></span>
        </div>
      </div>

      {/* 4. Top Sub-Category (Copiers) */}
      <div
        onClick={() => onNavigateTab('categories')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-emerald-500/50 hover:bg-slate-800/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Star Sub-Category
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center border border-emerald-800/60 group-hover:scale-105 transition-transform shrink-0">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">
              Copiers
            </span>
            <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50 shrink-0">
              37.2% margin
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Profit: <strong className="text-white">+$55,618</strong></span>
          <span className="text-slate-400">Sales: $149.5K</span>
        </div>
      </div>

      {/* 5. Top Region (West) */}
      <div
        onClick={() => onNavigateTab('geography')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-blue-500/50 hover:bg-slate-800/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Top Region
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 text-cyan-400 flex items-center justify-center border border-cyan-800/60 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              West Region
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Sales: <strong className="text-slate-200">$725,458</strong></span>
          <span className="text-cyan-400 font-medium">CA: $457.7K</span>
        </div>
      </div>

      {/* 6. Loss SKUs at Risk */}
      <div
        onClick={() => onNavigateTab('loss_makers')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-rose-500/50 hover:bg-slate-800/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Top 7 SKU Deficits
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-950/80 text-rose-400 flex items-center justify-center border border-rose-800/60 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-rose-400 tracking-tight">
              -${(25809.70 - mitigatedLossAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span className="truncate max-w-[130px] sm:max-w-[150px]">
            {mitigatedLossAmount > 0 ? `Saved $${mitigatedLossAmount.toFixed(0)}` : 'Cubify, Lexmark'}
          </span>
          <span className="text-rose-400 underline font-medium shrink-0 group-hover:text-rose-300">
            Fix SKUs &rarr;
          </span>
        </div>
      </div>

      {/* 7. Subcategory Drag (Tables) */}
      <div
        onClick={() => onNavigateTab('categories')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-amber-500/50 hover:bg-slate-800/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Worst Sub-Category
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-800/60 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-amber-400 tracking-tight">
              Tables
            </span>
            <span className="text-xs font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/50 shrink-0">
              -$17,725
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Bookcases: <strong className="text-rose-300">-$3.5k</strong></span>
          <span>Supplies: <strong className="text-rose-300">-$1.2k</strong></span>
        </div>
      </div>

      {/* 8. Top Segment (Consumer) */}
      <div
        onClick={() => onNavigateTab('segments')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-purple-500/50 hover:bg-slate-800/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Top Segment
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 text-purple-400 flex items-center justify-center border border-purple-800/60 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Consumer
            </span>
            <span className="text-xs font-semibold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/50 shrink-0">
              46.8% share
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Profit: <strong className="text-emerald-400">$134,119</strong></span>
          <span className="text-slate-400">Sales: $1.16M</span>
        </div>
      </div>
    </div>
  );
};
