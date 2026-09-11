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
} from 'recharts';
import { CATEGORIES_BREAKDOWN, SUB_CATEGORIES_DATA } from '../data/insightsData';
import { Layers, Printer, AlertTriangle, ArrowUpDown, Filter } from 'lucide-react';

export const CategoryPerformance: React.FC = () => {
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'profit' | 'sales' | 'margin'>('profit');

  const filteredSubCategories = SUB_CATEGORIES_DATA.filter((sub) => {
    if (selectedCatFilter === 'All') return true;
    return sub.category === selectedCatFilter;
  }).sort((a, b) => {
    if (sortBy === 'profit') return b.profit - a.profit;
    if (sortBy === 'sales') return b.sales - a.sales;
    return b.marginPct - a.marginPct;
  });

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-slate-100">
          <div className="font-bold text-white mb-1 flex items-center justify-between gap-4">
            <span>{data.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {data.category}
            </span>
          </div>
          <div className="space-y-1 text-slate-300">
            <div className="flex justify-between gap-4">
              <span>Sales:</span>
              <span className="font-semibold text-white">
                ${data.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Profit:</span>
              <span
                className={`font-semibold ${data.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                ${data.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Net Margin:</span>
              <span
                className={`font-semibold ${data.marginPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {data.marginPct.toFixed(2)}%
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
      {/* 3 Main Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES_BREAKDOWN.map((cat) => {
          const isTech = cat.category === 'Technology';
          const isFurniture = cat.category === 'Furniture';
          return (
            <div
              key={cat.category}
              className={`bg-slate-900 border rounded-xl p-5 shadow-sm transition-all flex flex-col justify-between h-full ${
                isTech
                  ? 'border-blue-500/60 bg-blue-950/10'
                  : isFurniture
                  ? 'border-amber-700/50 bg-amber-950/10'
                  : 'border-emerald-700/50 bg-emerald-950/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h3 className="font-bold text-white text-base">{cat.category}</h3>
                  </div>
                  {isTech && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900 text-blue-300 px-2 py-0.5 rounded shrink-0">
                      #1 in Sales & Profit
                    </span>
                  )}
                  {isFurniture && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-900 text-amber-300 px-2 py-0.5 rounded shrink-0">
                      Margin Drag (2.5%)
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2 min-h-[36px] leading-relaxed">{cat.description}</p>
              </div>

              <div>
                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Total Sales</span>
                    <span className="text-sm font-bold text-white">
                      ${cat.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {cat.shareSales}% of total
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Profit</span>
                    <span
                      className={`text-sm font-bold ${
                        cat.profit > 50000 ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      ${cat.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {cat.marginPct}% margin
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Profit Contribution</span>
                    <span className="font-semibold text-slate-300">{cat.shareProfit}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${cat.shareProfit}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Sub-Category Profitability Analysis */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Sub-Category Profitability Matrix (17 Sub-Categories)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Copiers generates highest profit (+$55.6K) while Tables (-$17.7K) & Bookcases (-$3.5K) create massive net losses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Filter */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
              {['All', 'Technology', 'Furniture', 'Office Supplies'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCatFilter(cat)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    selectedCatFilter === cat
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat === 'Office Supplies' ? 'Supplies' : cat}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <button
                onClick={() => setSortBy('profit')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  sortBy === 'profit'
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                By Profit
              </button>
              <button
                onClick={() => setSortBy('sales')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  sortBy === 'sales'
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                By Sales
              </button>
              <button
                onClick={() => setSortBy('margin')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  sortBy === 'margin'
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                By Margin %
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Category Chart */}
        <div className="h-[440px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredSubCategories}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 95, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} opacity={0.4} />
              <XAxis
                type="number"
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#cbd5e1"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip content={customTooltip} />
              <Bar dataKey="profit" radius={[0, 4, 4, 0]}>
                {filteredSubCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.profit >= 0 ? (entry.name === 'Copiers' ? '#10b981' : '#3b82f6') : '#f43f5e'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Highlight Summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-3 flex items-start gap-3">
            <div className="p-2 rounded bg-emerald-900/60 text-emerald-300">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                Star Performer: Copiers
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Generates <strong>$55,618.00 in profit</strong> on $149.5K sales with a stellar <strong>37.19% profit margin</strong>. Highly lucrative leasing and cartridge supply opportunities.
              </p>
            </div>
          </div>

          <div className="bg-rose-950/40 border border-rose-800/60 rounded-lg p-3 flex items-start gap-3">
            <div className="p-2 rounded bg-rose-900/60 text-rose-300">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                Critical Losses: Tables & Bookcases
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Tables loss is <strong>-$17,725.48</strong> and Bookcases is <strong>-$3,472.56</strong>. Driven by heavy freight shipping costs and steep promotional discounting (&gt;30%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
