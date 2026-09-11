import React from 'react';
import {
  TrendingUp,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  simulatedProfitDelta: number;
  resetSimulations: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedYear,
  setSelectedYear,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  simulatedProfitDelta,
  resetSimulations,
}) => {
  const tabs = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'categories', label: 'Categories & Copiers' },
    { id: 'loss_makers', label: 'Loss Prevention' },
    { id: 'discounts', label: 'Discount Elasticity' },
    { id: 'geography', label: 'Regional & States' },
    { id: 'segments', label: 'Segments & Shipping' },
    { id: 'roadmap', label: 'Actionable Roadmap' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-md">
      {/* Top Banner: Branding & Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Superstore Executive Insights
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> $2.30M Sales Analyzed
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Enterprise Sales Analytics • Profit Optimization • Margin Governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {simulatedProfitDelta > 0 && (
              <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-700/80 px-3 py-1.5 rounded-lg text-xs text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">+${simulatedProfitDelta.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                <span className="hidden md:inline text-emerald-300">Recovered!</span>
                <button
                  onClick={resetSimulations}
                  title="Reset simulations"
                  className="ml-1 text-emerald-400 hover:text-emerald-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={resetSimulations}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              title="Reset all filters and simulated changes"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Global Filters Bar */}
        <div className="py-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
            </span>

            {/* Year Selector */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700 shrink-0">
              {['All', '2015', '2016', '2017', '2018'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 shrink-0 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology ($836k)</option>
              <option value="Furniture">Furniture ($742k)</option>
              <option value="Office Supplies">Office Supplies ($719k)</option>
            </select>

            {/* Region Selector */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 shrink-0 cursor-pointer"
            >
              <option value="All">All Regions</option>
              <option value="West">West Region (Top: $725k)</option>
              <option value="East">East Region ($678k)</option>
              <option value="Central">Central Region ($501k)</option>
              <option value="South">South Region (Weakest: $391k)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <span className="hidden lg:inline text-slate-400">
              Interactive Mode Active:
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Insights Engine
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white border border-blue-500/50 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
