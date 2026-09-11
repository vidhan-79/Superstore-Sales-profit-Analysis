import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { CUSTOMER_SEGMENTS, SHIPPING_MODES } from '../data/insightsData';
import { Users, Truck, CheckCircle2, Clock, DollarSign } from 'lucide-react';

export const SegmentsAndShipping: React.FC = () => {
  const segmentColors = ['#8b5cf6', '#3b82f6', '#10b981'];
  const shippingColors = ['#3b82f6', '#06b6d4', '#f59e0b', '#ec4899'];

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-slate-100">
          <div className="font-bold text-white mb-1">
            {data.segment || data.mode}
          </div>
          {data.profit !== undefined && (
            <div className="text-emerald-400 font-semibold">
              Profit: ${data.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          )}
          {data.sales !== undefined && (
            <div className="text-slate-300">
              Sales: ${data.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          )}
          {data.orders !== undefined && (
            <div className="text-slate-300">
              Orders: {data.orders.toLocaleString()} ({data.percentage}%)
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Customer Segments Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              Customer Segments Profitability
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Consumer accounts for $134,119.20 profit (46.8% of enterprise profit).
            </p>
          </div>
          <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full font-medium">
            3 Core Segments
          </span>
        </div>

        {/* 3 Segments List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CUSTOMER_SEGMENTS.map((seg) => {
            const isConsumer = seg.segment === 'Consumer';
            return (
              <div
                key={seg.segment}
                className={`p-3.5 rounded-lg border flex flex-col justify-between h-full ${
                  isConsumer
                    ? 'bg-purple-950/20 border-purple-700/60'
                    : 'bg-slate-800/40 border-slate-700/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-xs font-bold text-white">{seg.segment}</span>
                    {isConsumer && (
                      <span className="text-[9px] bg-purple-900 text-purple-200 px-1.5 py-0.2 rounded font-semibold shrink-0">
                        #1 Most Profitable
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-bold text-emerald-400 mt-2">
                    ${seg.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60">
                  <div className="text-[11px] text-slate-300">
                    Sales: ${seg.sales.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Margin: {seg.marginPct}% • {seg.orderSharePct}% volume
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Segment Share Visual */}
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={CUSTOMER_SEGMENTS}
              margin={{ top: 10, right: 15, left: 15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="segment" stroke="#94a3b8" fontSize={11} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                width={55}
              />
              <Tooltip content={customTooltip} />
              <Bar dataKey="profit" name="Net Profit" radius={[4, 4, 0, 0]}>
                {CUSTOMER_SEGMENTS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={segmentColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shipping Modes Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-400" />
              Fulfillment & Shipping Mode Usage
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Standard Class dominates logistics with 5,968 total orders (59.7% share).
            </p>
          </div>
          <span className="text-xs bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded-full font-medium shrink-0">
            5,968 Standard Orders
          </span>
        </div>

        {/* Shipping Mode breakdown bars */}
        <div className="space-y-3">
          {SHIPPING_MODES.map((sm, idx) => (
            <div key={sm.mode} className="bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-1 gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{sm.mode}</span>
                  {sm.mode === 'Standard Class' && (
                    <span className="text-[10px] bg-blue-900 text-blue-200 px-1.5 py-0.2 rounded font-medium">
                      Primary Carrier
                    </span>
                  )}
                </div>
                <div className="text-slate-300 font-bold">
                  {sm.orders.toLocaleString()} orders ({sm.percentage}%)
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden my-1.5">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${sm.percentage}%`,
                    backgroundColor: shippingColors[idx],
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> Avg Delivery: {sm.avgDeliveryDays} days
                </span>
                <span className="text-slate-400">Reliability Rate: 98.4%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60 text-xs text-slate-300">
          <strong>Fulfillment Strategy:</strong> Because 60% of orders rely on Standard Class (4.8 days avg), consolidating bulky shipments (such as Tables and Bookcases) into regional fulfillment centers can directly eliminate freight shipping penalties that currently cause negative sub-category margins.
        </div>
      </div>
    </div>
  );
};
