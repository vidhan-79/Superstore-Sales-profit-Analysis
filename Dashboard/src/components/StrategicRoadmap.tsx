import React from 'react';
import { STRATEGIC_RECOMMENDATIONS } from '../data/insightsData';
import {
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const StrategicRoadmap: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 4 Core Problem Diagnosis Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            Company Root-Cause Problem Areas Identified
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Data-backed synthesis of structural vulnerabilities currently suppressing overall EBITDA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1.5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>1. Severe SKU-Level Deficits (-$25,809.70)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                A handful of 3D printers and specialized furniture SKUs (Cubify 3D, Lexmark, Chromcraft) bleed up to -$8,879 per item due to uncontrolled discount margins and return costs.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-900/40 space-y-1.5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>2. Discounting Beyond the 20% Breakeven Cliff</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Transactions discounted past 20% plunge directly into red ink, hitting average losses of -$94 to -$310 per order at higher discount bands.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-900/40 space-y-1.5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>3. Furniture Sub-Category Drag (-$22,387 Deficit)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Tables (-$17.7k), Bookcases (-$3.5k), and Supplies (-$1.2k) generate high gross sales volume ($368k+) while returning devastating negative profit margins.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-950/20 border border-blue-900/40 space-y-1.5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>4. Geographic Disparity & Lagging Southern Region</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                South region ($391.7k) generates barely half the sales of the West ($725.5k), while 4 rural states (WV, ME, SD, WY) contribute under $1,600 each.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prioritized Actionable Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Prioritized Strategic Recommendations & Projected ROI
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Concrete operational playbook with estimated bottom-line profit recovery impact.
            </p>
          </div>
          <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-bold self-start sm:self-center shrink-0">
            +$134,287 Total Potential Profit Lift
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STRATEGIC_RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              className="bg-slate-800/40 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-600 transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {rec.area}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                    +${rec.impactAmount.toLocaleString(undefined, { minimumFractionDigits: 0 })} Lift
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm mt-2">{rec.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{rec.summary}</p>

                <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-700/60">
                  <div className="text-[11px] font-semibold text-slate-400">Tactical Action Items:</div>
                  {rec.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50">
                <span>Implementation Effort: <strong className="text-slate-200">{rec.effort}</strong></span>
                <span className="text-blue-400 font-semibold flex items-center gap-1">
                  High Priority &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
