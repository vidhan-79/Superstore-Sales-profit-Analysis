import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { YEARLY_TRENDS, MONTHLY_TRENDS } from '../data/insightsData';
import { TrendingUp, Calendar, AlertCircle, Sparkles } from 'lucide-react';

export const TrendSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [activeMetric, setActiveMetric] = useState<'both' | 'sales' | 'profit'>('both');

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-slate-100">
          <div className="font-semibold text-white border-b border-slate-700 pb-1 mb-2">
            {label}
          </div>
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5" style={{ color: item.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}:
              </span>
              <span className="font-bold">
                ${Number(item.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header with Switchers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Sales & Profit Historical Trends (2015 – 2018)
            </h2>
            <span className="text-xs bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded-full font-medium">
              Consistent YoY Growth
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Consistent upward expansion across four years with pronounced Q4 seasonal holiday volume.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex items-center text-xs">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'monthly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Seasonality
            </button>
            <button
              onClick={() => setViewMode('yearly')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'yearly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual YoY (2015-18)
            </button>
          </div>

          {/* Metric Selector */}
          <div className="hidden md:flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setActiveMetric('both')}
              className={`px-2.5 py-1.5 rounded-md ${activeMetric === 'both' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'}`}
            >
              Both
            </button>
            <button
              onClick={() => setActiveMetric('sales')}
              className={`px-2.5 py-1.5 rounded-md ${activeMetric === 'sales' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'}`}
            >
              Sales
            </button>
            <button
              onClick={() => setActiveMetric('profit')}
              className={`px-2.5 py-1.5 rounded-md ${activeMetric === 'profit' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400'}`}
            >
              Profit
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'monthly' ? (
            <ComposedChart data={MONTHLY_TRENDS} margin={{ top: 10, right: 15, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis
                yAxisId="sales"
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[0, 420000]}
                width={55}
              />
              <YAxis
                yAxisId="profit"
                orientation="right"
                stroke="#34d399"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[0, 50000]}
                width={50}
              />
              <Tooltip content={customTooltip} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              {(activeMetric === 'both' || activeMetric === 'sales') && (
                <Bar
                  yAxisId="sales"
                  dataKey="sales"
                  name="Monthly Sales"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              )}
              {(activeMetric === 'both' || activeMetric === 'profit') && (
                <Line
                  yAxisId="profit"
                  type="monotone"
                  dataKey="profit"
                  name="Net Profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981' }}
                  activeDot={{ r: 6 }}
                />
              )}
            </ComposedChart>
          ) : (
            <ComposedChart data={YEARLY_TRENDS} margin={{ top: 10, right: 15, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis
                yAxisId="sales"
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[0, 800000]}
                width={55}
              />
              <YAxis
                yAxisId="profit"
                orientation="right"
                stroke="#34d399"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                domain={[0, 110000]}
                width={50}
              />
              <Tooltip content={customTooltip} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
              {(activeMetric === 'both' || activeMetric === 'sales') && (
                <Bar
                  yAxisId="sales"
                  dataKey="sales"
                  name="Annual Sales"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              )}
              {(activeMetric === 'both' || activeMetric === 'profit') && (
                <Line
                  yAxisId="profit"
                  type="monotone"
                  dataKey="profit"
                  name="Net Profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10b981' }}
                />
              )}
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Seasonality & YoY Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-lg p-3.5 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" /> Q4 Holiday Spike
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              November ($352k) and December ($380k) generate <strong>31.9%</strong> of all yearly volume. High inventory readiness is required.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/80 rounded-lg p-3.5 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" /> 4-Year Acceleration
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Sales climbed from <strong>$484k (2015)</strong> to <strong>$734k (2018)</strong>, an increase of <strong>+51.6%</strong> with profit doubling from $49.5k to $93.4k.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/80 rounded-lg p-3.5 flex flex-col justify-between h-full">
          <div>
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Q1 Trough
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              January ($94.9k) and February ($59.8k) represent the annual dip before an early corporate procurement surge in March ($170.1k).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
