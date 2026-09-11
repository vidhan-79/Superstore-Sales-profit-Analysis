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
  PieChart,
  Pie,
} from 'recharts';
import { REGIONS_DATA, STATES_DATA } from '../data/insightsData';
import { MapPin, TrendingUp, AlertTriangle, Building2, Compass } from 'lucide-react';

export const GeoPerformance: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'top' | 'weak'>('all');

  const filteredStates = STATES_DATA.filter((s) => {
    if (filterType === 'all') return true;
    return s.status === filterType;
  });

  const regionPieColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-slate-100">
          <div className="font-bold text-white mb-1">
            {data.state || data.region}
          </div>
          <div className="space-y-1 text-slate-300">
            <div className="flex justify-between gap-4">
              <span>Sales:</span>
              <span className="font-semibold text-white">
                ${data.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            {data.profit && (
              <div className="flex justify-between gap-4">
                <span>Profit:</span>
                <span className="font-semibold text-emerald-400">
                  ${data.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
            {data.marginPct && (
              <div className="flex justify-between gap-4">
                <span>Margin:</span>
                <span className="font-semibold text-emerald-400">
                  {data.marginPct.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 4 Regional Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REGIONS_DATA.map((reg, idx) => {
          const isWest = reg.region === 'West';
          const isSouth = reg.region === 'South';
          return (
            <div
              key={reg.region}
              className={`bg-slate-900 border rounded-xl p-5 shadow-sm transition-all flex flex-col justify-between h-full ${
                isWest
                  ? 'border-blue-500/70 bg-blue-950/15'
                  : isSouth
                  ? 'border-rose-900/60 bg-rose-950/10'
                  : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: regionPieColors[idx] }}
                    />
                    <h3 className="font-bold text-white text-base">{reg.region} Region</h3>
                  </div>
                  {isWest && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-900 text-blue-300 px-2 py-0.5 rounded shrink-0">
                      #1 Top Region
                    </span>
                  )}
                  {isSouth && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded shrink-0">
                      Lowest Sales
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <div className="text-xl font-bold text-white tracking-tight">
                    ${reg.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                    <span>Profit: <strong className="text-emerald-400">${reg.profit.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></span>
                    <span>Margin: <strong className="text-slate-200">{reg.marginPct}%</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Top State:</span>
                <span className="font-semibold text-slate-200">{reg.topState}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Comparison Chart & State Drill-Down */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regions Comparison Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              Regional Sales Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              West ($725.5k) leads all regions, while South ($391.7k) exhibits a 46% lag.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REGIONS_DATA}
                margin={{ top: 10, right: 15, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  width={55}
                />
                <Tooltip content={customTooltip} />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                  {REGIONS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.region === 'West' ? '#3b82f6' : entry.region === 'South' ? '#f43f5e' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/60 text-xs text-slate-300">
            <strong>Expansion Opportunity:</strong> South region generates only 17.1% of company sales. Expanding localized B2B sales teams in Florida, Georgia, and North Carolina can unlock an estimated +$28,500/year.
          </div>
        </div>

        {/* State Performance Table & Analysis */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                State Level Sales Hierarchy
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                California tops with $457,687.63. Bottom 4 states each generate under $2,000.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2 py-1 rounded transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Sampled
              </button>
              <button
                onClick={() => setFilterType('top')}
                className={`px-2 py-1 rounded transition-colors ${
                  filterType === 'top'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Top States
              </button>
              <button
                onClick={() => setFilterType('weak')}
                className={`px-2 py-1 rounded transition-colors ${
                  filterType === 'weak'
                    ? 'bg-rose-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Weakest States
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {filteredStates.map((st) => {
              const isCalifornia = st.state === 'California';
              const isWeak = st.status === 'weak';
              return (
                <div
                  key={st.state}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                    isCalifornia
                      ? 'bg-blue-950/30 border-blue-600/60'
                      : isWeak
                      ? 'bg-rose-950/20 border-rose-900/50'
                      : 'bg-slate-800/40 border-slate-700/60'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-xs flex items-center gap-1.5 flex-wrap">
                      <span>{st.state}</span>
                      {isCalifornia && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900 text-blue-200 font-bold shrink-0">
                          #1 US State
                        </span>
                      )}
                      {isWeak && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-900 text-rose-200 font-bold shrink-0">
                          Underperforming
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Region: {st.region}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-bold ${
                        isCalifornia
                          ? 'text-blue-400'
                          : isWeak
                          ? 'text-rose-400'
                          : 'text-slate-200'
                      }`}
                    >
                      ${st.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
            <span>
              <strong>Weakest States in Dataset:</strong> West Virginia ($1,209.82), Maine ($1,270.53), South Dakota ($1,315.56), Wyoming ($1,603.14).
            </span>
            <span className="text-amber-400 text-[11px] font-semibold whitespace-nowrap ml-2">
              Combined: $5,399.05
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
