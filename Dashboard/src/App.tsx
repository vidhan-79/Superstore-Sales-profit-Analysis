import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { KPICards } from './components/KPICards';
import { TrendSection } from './components/TrendSection';
import { CategoryPerformance } from './components/CategoryPerformance';
import { LossMakersTable } from './components/LossMakersTable';
import { DiscountElasticity } from './components/DiscountElasticity';
import { GeoPerformance } from './components/GeoPerformance';
import { SegmentsAndShipping } from './components/SegmentsAndShipping';
import { StrategicRoadmap } from './components/StrategicRoadmap';
import {
  EXECUTIVE_SUMMARY,
  TOP_LOSS_PRODUCTS,
  DISCOUNT_PROFIT_CURVE,
  YEARLY_TRENDS,
  REGIONS_DATA,
  CATEGORIES_BREAKDOWN,
} from './data/insightsData';
import {
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Interactive Simulations
  const [mitigatedSkuIds, setMitigatedSkuIds] = useState<string[]>([]);
  const [discountCapPct, setDiscountCapPct] = useState<number>(20);
  const [isDiscountCapApplied, setIsDiscountCapApplied] = useState<boolean>(false);

  // Toggle SKU mitigation
  const toggleMitigateSku = (skuId: string) => {
    setMitigatedSkuIds((prev) =>
      prev.includes(skuId) ? prev.filter((id) => id !== skuId) : [...prev, skuId]
    );
  };

  const mitigateAllSkus = () => {
    setMitigatedSkuIds(TOP_LOSS_PRODUCTS.map((p) => p.id));
  };

  const resetMitigations = () => {
    setMitigatedSkuIds([]);
  };

  const resetSimulations = () => {
    setMitigatedSkuIds([]);
    setIsDiscountCapApplied(false);
    setDiscountCapPct(20);
    setSelectedYear('All');
    setSelectedRegion('All');
    setSelectedCategory('All');
  };

  // Calculate simulated additions to profit
  const skuMitigatedDelta = useMemo(() => {
    return TOP_LOSS_PRODUCTS.filter((p) => mitigatedSkuIds.includes(p.id)).reduce(
      (acc, p) => acc + Math.abs(p.loss),
      0
    );
  }, [mitigatedSkuIds]);

  const discountSavingsDelta = useMemo(() => {
    if (!isDiscountCapApplied) return 0;
    let savings = 0;
    DISCOUNT_PROFIT_CURVE.forEach((p) => {
      if (p.discountPct > discountCapPct && p.avgProfit < 0) {
        savings += Math.abs(p.avgProfit) * p.orderCount;
      }
    });
    return Math.min(savings, 48000);
  }, [isDiscountCapApplied, discountCapPct]);

  const totalSimulatedDelta = skuMitigatedDelta + discountSavingsDelta;

  // Base values adjusted by filters
  const { filteredSales, filteredProfit } = useMemo(() => {
    let sales = EXECUTIVE_SUMMARY.totalSales;
    let profit = EXECUTIVE_SUMMARY.totalProfit;

    if (selectedYear !== 'All') {
      const yrData = YEARLY_TRENDS.find((y) => y.year.toString() === selectedYear);
      if (yrData) {
        sales = yrData.sales;
        profit = yrData.profit;
      }
    } else if (selectedRegion !== 'All') {
      const regData = REGIONS_DATA.find((r) => r.region === selectedRegion);
      if (regData) {
        sales = regData.sales;
        profit = regData.profit;
      }
    } else if (selectedCategory !== 'All') {
      const catData = CATEGORIES_BREAKDOWN.find((c) => c.category === selectedCategory);
      if (catData) {
        sales = catData.sales;
        profit = catData.profit;
      }
    }

    return {
      filteredSales: sales,
      filteredProfit: profit + totalSimulatedDelta,
    };
  }, [selectedYear, selectedRegion, selectedCategory, totalSimulatedDelta]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        simulatedProfitDelta={totalSimulatedDelta}
        resetSimulations={resetSimulations}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Summary Cards Always Visible at Top for Instant Clarity */}
        <section aria-label="Executive Key Performance Indicators">
          <KPICards
            currentProfit={filteredProfit}
            currentSales={filteredSales}
            simulatedProfitDelta={totalSimulatedDelta}
            mitigatedLossAmount={skuMitigatedDelta}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        </section>

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <TrendSection />
            <CategoryPerformance />
            <LossMakersTable
              mitigatedSkuIds={mitigatedSkuIds}
              toggleMitigateSku={toggleMitigateSku}
              mitigateAllSkus={mitigateAllSkus}
              resetMitigations={resetMitigations}
            />
            <DiscountElasticity
              discountCapPct={discountCapPct}
              setDiscountCapPct={setDiscountCapPct}
              isDiscountCapApplied={isDiscountCapApplied}
              setIsDiscountCapApplied={setIsDiscountCapApplied}
            />
            <GeoPerformance />
            <SegmentsAndShipping />
            <StrategicRoadmap />
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6">
            <CategoryPerformance />
          </div>
        )}

        {activeTab === 'loss_makers' && (
          <div className="space-y-6">
            <LossMakersTable
              mitigatedSkuIds={mitigatedSkuIds}
              toggleMitigateSku={toggleMitigateSku}
              mitigateAllSkus={mitigateAllSkus}
              resetMitigations={resetMitigations}
            />
          </div>
        )}

        {activeTab === 'discounts' && (
          <div className="space-y-6">
            <DiscountElasticity
              discountCapPct={discountCapPct}
              setDiscountCapPct={setDiscountCapPct}
              isDiscountCapApplied={isDiscountCapApplied}
              setIsDiscountCapApplied={setIsDiscountCapApplied}
            />
          </div>
        )}

        {activeTab === 'geography' && (
          <div className="space-y-6">
            <GeoPerformance />
          </div>
        )}

        {activeTab === 'segments' && (
          <div className="space-y-6">
            <SegmentsAndShipping />
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <StrategicRoadmap />
          </div>
        )}
      </main>

      {/* Persistent Clean Bottom Bar */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>$2,297,201 Total Sales • $286,397 Net Profit • 9,994 Orders Analyzed</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">Superstore Enterprise BI • Live Decision Matrix</span>
            <span className="text-slate-700">|</span>
            <button
              onClick={resetSimulations}
              className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
