export interface ProductLoss {
  id: string;
  name: string;
  category: 'Technology' | 'Furniture' | 'Office Supplies';
  subCategory: string;
  loss: number;
  sales: number;
  unitsSold: number;
  avgDiscount: number;
  mitigationStrategy: string;
}

export interface SubCategoryStat {
  name: string;
  category: 'Technology' | 'Furniture' | 'Office Supplies';
  sales: number;
  profit: number;
  marginPct: number;
  status: 'profitable' | 'loss' | 'low_margin';
}

export interface RegionStat {
  region: 'West' | 'East' | 'Central' | 'South';
  sales: number;
  profit: number;
  marginPct: number;
  topState: string;
}

export interface StateStat {
  state: string;
  region: string;
  sales: number;
  status: 'top' | 'strong' | 'weak';
}

export interface DiscountImpactPoint {
  discountRange: string;
  discountPct: number;
  avgProfit: number;
  orderCount: number;
  profitabilityZone: 'High Profit' | 'Moderate' | 'Breakeven' | 'Severe Loss';
}

export interface MonthlyTrendPoint {
  month: string;
  year: number;
  sales: number;
  profit: number;
  marginPct: number;
}

export interface CustomerSegmentStat {
  segment: 'Consumer' | 'Corporate' | 'Home Office';
  sales: number;
  profit: number;
  marginPct: number;
  orderSharePct: number;
}

export interface ShippingModeStat {
  mode: 'Standard Class' | 'Second Class' | 'First Class' | 'Same Day';
  orders: number;
  percentage: number;
  avgDeliveryDays: number;
}

export interface Recommendation {
  id: string;
  title: string;
  area: 'Loss Prevention' | 'Discount Governance' | 'Geographic Expansion' | 'Category Growth';
  impactAmount: number;
  effort: 'Low' | 'Medium' | 'High';
  summary: string;
  actionItems: string[];
}
