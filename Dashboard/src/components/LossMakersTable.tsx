import React from 'react';
import { ProductLoss } from '../types';
import { TOP_LOSS_PRODUCTS } from '../data/insightsData';
import {
  AlertOctagon,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  DollarSign,
  TrendingDown,
  Info,
  CheckCircle,
} from 'lucide-react';

interface LossMakersTableProps {
  mitigatedSkuIds: string[];
  toggleMitigateSku: (skuId: string) => void;
  mitigateAllSkus: () => void;
  resetMitigations: () => void;
}

export const LossMakersTable: React.FC<LossMakersTableProps> = ({
  mitigatedSkuIds,
  toggleMitigateSku,
  mitigateAllSkus,
  resetMitigations,
}) => {
  const totalBaseLoss = TOP_LOSS_PRODUCTS.reduce((acc, p) => acc + p.loss, 0); // -25809.70
  const totalMitigated = TOP_LOSS_PRODUCTS.filter((p) =>
    mitigatedSkuIds.includes(p.id)
  ).reduce((acc, p) => acc + Math.abs(p.loss), 0);

  const remainingLoss = Math.abs(totalBaseLoss) - totalMitigated;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Top Banner with Simulation Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
              Top Loss-Making Products & SKU Remediation
            </h2>
            <span className="text-xs bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full font-medium">
              -$25,809.70 Total Loss Exposure
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Top 7 severe loss-generating products dragging down company profit. Toggle remediation to simulate cutting loss.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {mitigatedSkuIds.length < TOP_LOSS_PRODUCTS.length ? (
            <button
              onClick={mitigateAllSkus}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Simulate Mitigate All (-$25.8k)
            </button>
          ) : (
            <button
              onClick={resetMitigations}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              Reset SKUs
            </button>
          )}
        </div>
      </div>

      {/* Real-time Remediation Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-800/40 p-3.5 rounded-lg border border-slate-800">
        <div className="flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 block">Identified SKU Loss</span>
          <div className="text-lg font-bold text-rose-400 mt-1">
            -${Math.abs(totalBaseLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">7 critical deficit SKUs</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 block">Simulated Profit Recovered</span>
          <div className="text-lg font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <Sparkles className="w-4 h-4 shrink-0" />
            +${totalMitigated.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-500/80 block mt-0.5">
            {mitigatedSkuIds.length} of 7 SKUs remediated
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 block">Remaining Exposure</span>
          <div className="text-lg font-bold text-slate-200 mt-1">
            -${remainingLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {remainingLoss === 0 ? '100% loss eliminated!' : 'Unmitigated product deficit'}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300 min-w-[840px]">
          <thead className="bg-slate-800/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-700">
            <tr>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-3">Sub-Category</th>
              <th className="py-3 px-3 text-right">Net Loss</th>
              <th className="py-3 px-3 text-right">Gross Sales</th>
              <th className="py-3 px-3 text-center">Avg Discount</th>
              <th className="py-3 px-4">Strategic Mitigation Action</th>
              <th className="py-3 px-4 text-center">Simulate Fix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {TOP_LOSS_PRODUCTS.map((prod) => {
              const isMitigated = mitigatedSkuIds.includes(prod.id);
              return (
                <tr
                  key={prod.id}
                  className={`transition-colors ${
                    isMitigated ? 'bg-emerald-950/20' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{prod.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {prod.category} • {prod.unitsSold} units sold
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700">
                      {prod.subCategory}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-rose-400">
                    <span className={isMitigated ? 'line-through opacity-40 text-slate-400' : ''}>
                      -${Math.abs(prod.loss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    {isMitigated && (
                      <div className="text-[10px] text-emerald-400 font-semibold">
                        +$0 (Saved!)
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 font-medium">
                    ${prod.sales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        prod.avgDiscount >= 0.5
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {(prod.avgDiscount * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-slate-400 max-w-xs">
                    {prod.mitigationStrategy}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleMitigateSku(prod.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        isMitigated
                          ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {isMitigated ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-300" /> Remediated
                        </span>
                      ) : (
                        <span>Simulate Fix</span>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-300">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-100">Root Cause Finding:</strong> The top 3 loss items (Cubify 3D Printers & Lexmark Laser) represent over <strong>$17,300 in combined losses</strong> due to extreme discounting (40%-50%) and high manufacturer return/support overheads. Repricing or discontinuing these 3 SKUs alone eliminates 67% of all critical product deficits.
        </div>
      </div>
    </div>
  );
};
