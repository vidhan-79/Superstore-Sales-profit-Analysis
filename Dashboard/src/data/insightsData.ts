import {
  ProductLoss,
  SubCategoryStat,
  RegionStat,
  StateStat,
  DiscountImpactPoint,
  CustomerSegmentStat,
  ShippingModeStat,
  Recommendation
} from '../types';

export const EXECUTIVE_SUMMARY = {
  totalSales: 2297200.86,
  totalProfit: 286397.02,
  overallMarginPct: 12.47,
  totalOrders: 9994,
  topCategory: {
    name: 'Technology',
    sales: 836154.03,
    profit: 145454.95,
    marginPct: 17.39,
  },
  topSubCategory: {
    name: 'Copiers',
    profit: 55618.00,
    sales: 149528.00,
    marginPct: 37.19,
  },
  topRegion: {
    name: 'West',
    sales: 725457.82,
    profit: 108418.45,
    marginPct: 14.94,
  },
  topState: {
    name: 'California',
    sales: 457687.63,
    profit: 76381.39,
  },
  topSegment: {
    name: 'Consumer',
    profit: 134119.20,
    sales: 1161401.34,
  },
  topShippingMode: {
    name: 'Standard Class',
    orders: 5968,
    sharePct: 59.71,
  },
  totalLossIdentified: 25809.70, // Top 7 products
};

export const CATEGORIES_BREAKDOWN = [
  {
    category: 'Technology',
    sales: 836154.03,
    profit: 145454.95,
    marginPct: 17.39,
    shareSales: 36.4,
    shareProfit: 50.8,
    color: '#3b82f6',
    subCount: 4,
    description: 'Highest sales & profit driver across all product segments.'
  },
  {
    category: 'Office Supplies',
    sales: 719046.03,
    profit: 122490.80,
    marginPct: 17.04,
    shareSales: 31.3,
    shareProfit: 42.8,
    color: '#10b981',
    subCount: 9,
    description: 'High volume, stable operating margins with strong consumables demand.'
  },
  {
    category: 'Furniture',
    sales: 742000.80,
    profit: 18451.27,
    marginPct: 2.49,
    shareSales: 32.3,
    shareProfit: 6.4,
    color: '#f59e0b',
    subCount: 4,
    description: 'Significant sales volume heavily dragged down by negative margin Tables and Bookcases.'
  },
];

export const SUB_CATEGORIES_DATA: SubCategoryStat[] = [
  { name: 'Copiers', category: 'Technology', sales: 149528.03, profit: 55618.00, marginPct: 37.19, status: 'profitable' },
  { name: 'Phones', category: 'Technology', sales: 330007.05, profit: 44515.73, marginPct: 13.49, status: 'profitable' },
  { name: 'Accessories', category: 'Technology', sales: 167380.32, profit: 41936.64, marginPct: 25.05, status: 'profitable' },
  { name: 'Paper', category: 'Office Supplies', sales: 78479.21, profit: 34053.57, marginPct: 43.39, status: 'profitable' },
  { name: 'Binders', category: 'Office Supplies', sales: 203412.73, profit: 30221.76, marginPct: 14.86, status: 'profitable' },
  { name: 'Chairs', category: 'Furniture', sales: 328449.10, profit: 26590.17, marginPct: 8.10, status: 'profitable' },
  { name: 'Storage', category: 'Office Supplies', sales: 223843.61, profit: 21278.83, marginPct: 9.51, status: 'profitable' },
  { name: 'Appliances', category: 'Office Supplies', sales: 107532.16, profit: 18138.01, marginPct: 16.87, status: 'profitable' },
  { name: 'Furnishings', category: 'Furniture', sales: 91705.16, profit: 13059.14, marginPct: 14.24, status: 'profitable' },
  { name: 'Envelopes', category: 'Office Supplies', sales: 16476.40, profit: 6964.18, marginPct: 42.27, status: 'profitable' },
  { name: 'Art', category: 'Office Supplies', sales: 27118.79, profit: 6527.79, marginPct: 24.07, status: 'profitable' },
  { name: 'Labels', category: 'Office Supplies', sales: 12486.31, profit: 5546.25, marginPct: 44.42, status: 'profitable' },
  { name: 'Machines', category: 'Technology', sales: 189238.63, profit: 3384.76, marginPct: 1.79, status: 'low_margin' },
  { name: 'Fasteners', category: 'Office Supplies', sales: 3024.28, profit: 949.52, marginPct: 31.40, status: 'low_margin' },
  { name: 'Supplies', category: 'Office Supplies', sales: 46673.54, profit: -1189.10, marginPct: -2.55, status: 'loss' },
  { name: 'Bookcases', category: 'Furniture', sales: 114879.97, profit: -3472.56, marginPct: -3.02, status: 'loss' },
  { name: 'Tables', category: 'Furniture', sales: 206965.57, profit: -17725.48, marginPct: -8.56, status: 'loss' },
];

export const TOP_LOSS_PRODUCTS: ProductLoss[] = [
  {
    id: 'SKU-001',
    name: 'Cubify CubeX 3D Printer Double Head Print',
    category: 'Technology',
    subCategory: 'Machines',
    loss: -8879.97,
    sales: 11099.96,
    unitsSold: 4,
    avgDiscount: 0.50,
    mitigationStrategy: 'Discontinue SKU immediately or restrict discount threshold to maximum 10%.'
  },
  {
    id: 'SKU-002',
    name: 'Lexmark MX611dhe Monochrome Laser Printer',
    category: 'Technology',
    subCategory: 'Machines',
    loss: -4589.97,
    sales: 16829.90,
    unitsSold: 8,
    avgDiscount: 0.40,
    mitigationStrategy: 'Renegotiate wholesale vendor margin and eliminate aggressive corporate discounting.'
  },
  {
    id: 'SKU-003',
    name: 'Cubify CubeX 3D Printer Triple Head Print',
    category: 'Technology',
    subCategory: 'Machines',
    loss: -3839.99,
    sales: 7999.98,
    unitsSold: 3,
    avgDiscount: 0.50,
    mitigationStrategy: 'Phase out obsolete 3D printing equipment line to avoid further liquidation losses.'
  },
  {
    id: 'SKU-004',
    name: 'Chromcraft Bull-Nose Wood Oval Conference Tables & Bases',
    category: 'Furniture',
    subCategory: 'Tables',
    loss: -2876.12,
    sales: 9917.64,
    unitsSold: 9,
    avgDiscount: 0.35,
    mitigationStrategy: 'Surcharge for heavy freight delivery and bundle only with high-margin seating.'
  },
  {
    id: 'SKU-005',
    name: 'Bush Advantage Collection Racetrack Conference Table',
    category: 'Furniture',
    subCategory: 'Tables',
    loss: -1934.40,
    sales: 4099.88,
    unitsSold: 5,
    avgDiscount: 0.40,
    mitigationStrategy: 'Set mandatory retail floor price of $950 and cap promotional discounts at 15%.'
  },
  {
    id: 'SKU-006',
    name: 'GBC DocuBind P400 Electric Binding System',
    category: 'Office Supplies',
    subCategory: 'Binders',
    loss: -1878.17,
    sales: 2479.92,
    unitsSold: 6,
    avgDiscount: 0.55,
    mitigationStrategy: 'Replace with profitable alternative binding models; remove deep coupon combinations.'
  },
  {
    id: 'SKU-007',
    name: 'Cisco TelePresence System EX90 Videoconferencing Unit',
    category: 'Technology',
    subCategory: 'Machines',
    loss: -1811.08,
    sales: 22638.48,
    unitsSold: 4,
    avgDiscount: 0.45,
    mitigationStrategy: 'Shift from hardware discounting to recurring software and maintenance attach contracts.'
  },
];

export const REGIONS_DATA: RegionStat[] = [
  { region: 'West', sales: 725457.82, profit: 108418.45, marginPct: 14.94, topState: 'California' },
  { region: 'East', sales: 678781.24, profit: 91522.78, marginPct: 13.48, topState: 'New York' },
  { region: 'Central', sales: 501239.89, profit: 39706.36, marginPct: 7.92, topState: 'Texas' },
  { region: 'South', sales: 391721.91, profit: 46749.43, marginPct: 11.93, topState: 'Florida' },
];

export const STATES_DATA: StateStat[] = [
  { state: 'California', region: 'West', sales: 457687.63, status: 'top' },
  { state: 'New York', region: 'East', sales: 310876.27, status: 'top' },
  { state: 'Texas', region: 'Central', sales: 170188.05, status: 'top' },
  { state: 'Washington', region: 'West', sales: 138641.27, status: 'top' },
  { state: 'Pennsylvania', region: 'East', sales: 116511.48, status: 'strong' },
  { state: 'Florida', region: 'South', sales: 89473.71, status: 'strong' },
  { state: 'Illinois', region: 'Central', sales: 80166.10, status: 'strong' },
  { state: 'Ohio', region: 'East', sales: 78258.14, status: 'strong' },
  { state: 'Michigan', region: 'Central', sales: 76269.61, status: 'strong' },
  { state: 'Virginia', region: 'South', sales: 70636.72, status: 'strong' },
  { state: 'North Carolina', region: 'South', sales: 55603.16, status: 'strong' },
  { state: 'Indiana', region: 'Central', sales: 53555.36, status: 'strong' },
  { state: 'Georgia', region: 'South', sales: 49095.84, status: 'strong' },
  { state: 'Kentucky', region: 'South', sales: 36591.75, status: 'strong' },
  { state: 'Wyoming', region: 'West', sales: 1603.14, status: 'weak' },
  { state: 'South Dakota', region: 'Central', sales: 1315.56, status: 'weak' },
  { state: 'Maine', region: 'East', sales: 1270.53, status: 'weak' },
  { state: 'West Virginia', region: 'South', sales: 1209.82, status: 'weak' },
];

export const DISCOUNT_PROFIT_CURVE: DiscountImpactPoint[] = [
  { discountRange: '0%', discountPct: 0, avgProfit: 66.90, orderCount: 4798, profitabilityZone: 'High Profit' },
  { discountRange: '10%', discountPct: 10, avgProfit: 45.20, orderCount: 94, profitabilityZone: 'High Profit' },
  { discountRange: '20%', discountPct: 20, avgProfit: 24.80, orderCount: 3657, profitabilityZone: 'Moderate' },
  { discountRange: '30%', discountPct: 30, avgProfit: -12.40, orderCount: 365, profitabilityZone: 'Breakeven' },
  { discountRange: '40%', discountPct: 40, avgProfit: -48.70, orderCount: 206, profitabilityZone: 'Severe Loss' },
  { discountRange: '50%', discountPct: 50, avgProfit: -94.20, orderCount: 66, profitabilityZone: 'Severe Loss' },
  { discountRange: '60%', discountPct: 60, avgProfit: -142.10, orderCount: 138, profitabilityZone: 'Severe Loss' },
  { discountRange: '70%', discountPct: 70, avgProfit: -205.80, orderCount: 415, profitabilityZone: 'Severe Loss' },
  { discountRange: '80%', discountPct: 80, avgProfit: -310.50, orderCount: 255, profitabilityZone: 'Severe Loss' },
];

export const YEARLY_TRENDS = [
  { year: 2015, sales: 484247.50, profit: 49543.97, orders: 1993, marginPct: 10.23 },
  { year: 2016, sales: 470532.51, profit: 61618.60, orders: 2102, marginPct: 13.10 },
  { year: 2017, sales: 608473.87, profit: 81795.17, orders: 2587, marginPct: 13.44 },
  { year: 2018, sales: 733946.98, profit: 93439.28, orders: 3312, marginPct: 12.73 },
];

export const MONTHLY_TRENDS: { month: string; q: string; sales: number; profit: number; growthYoY: number }[] = [
  { month: 'Jan', q: 'Q1', sales: 94924.83, profit: 9134.40, growthYoY: 6.2 },
  { month: 'Feb', q: 'Q1', sales: 59751.25, profit: 10294.61, growthYoY: 8.4 },
  { month: 'Mar', q: 'Q1', sales: 170057.13, profit: 28594.09, growthYoY: 14.1 },
  { month: 'Apr', q: 'Q2', sales: 137762.12, profit: 11588.44, growthYoY: 9.8 },
  { month: 'May', q: 'Q2', sales: 155028.81, profit: 22411.31, growthYoY: 11.2 },
  { month: 'Jun', q: 'Q2', sales: 152718.67, profit: 21285.20, growthYoY: 12.5 },
  { month: 'Jul', q: 'Q3', sales: 147238.10, profit: 13832.61, growthYoY: 7.9 },
  { month: 'Aug', q: 'Q3', sales: 159044.06, profit: 21776.94, growthYoY: 13.6 },
  { month: 'Sep', q: 'Q3', sales: 287640.05, profit: 36857.47, growthYoY: 18.2 },
  { month: 'Oct', q: 'Q4', sales: 200324.99, profit: 31784.05, growthYoY: 15.4 },
  { month: 'Nov', q: 'Q4', sales: 352461.07, profit: 35468.42, growthYoY: 22.1 },
  { month: 'Dec', q: 'Q4', sales: 380249.78, profit: 43369.48, growthYoY: 24.3 },
];

export const CUSTOMER_SEGMENTS: CustomerSegmentStat[] = [
  { segment: 'Consumer', sales: 1161401.34, profit: 134119.20, marginPct: 11.55, orderSharePct: 50.6 },
  { segment: 'Corporate', sales: 706146.37, profit: 91979.11, marginPct: 13.03, orderSharePct: 30.7 },
  { segment: 'Home Office', sales: 429653.15, profit: 60298.71, marginPct: 14.03, orderSharePct: 18.7 },
];

export const SHIPPING_MODES: ShippingModeStat[] = [
  { mode: 'Standard Class', orders: 5968, percentage: 59.71, avgDeliveryDays: 4.8 },
  { mode: 'Second Class', orders: 1945, percentage: 19.46, avgDeliveryDays: 3.2 },
  { mode: 'First Class', orders: 1538, percentage: 15.39, avgDeliveryDays: 2.1 },
  { mode: 'Same Day', orders: 543, percentage: 5.43, avgDeliveryDays: 0.8 },
];

export const STRATEGIC_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'REC-01',
    title: 'Discontinue or Reprice Tables, Bookcases & Supplies',
    area: 'Loss Prevention',
    impactAmount: 22387.14,
    effort: 'Medium',
    summary: 'Tables (-$17,725.48), Bookcases (-$3,472.56), and Supplies (-$1,189.10) create severe margin drag despite generating over $360k in sales.',
    actionItems: [
      'Discontinue consistently unprofitable product variants (e.g. Chromcraft and Bush conference tables).',
      'Introduce mandatory freight shipping surcharges on oversized furniture units.',
      'Restructure wholesale supply agreements for Supplies subcategory.',
      'Re-engineer Bill of Materials (BOM) or supplier vendor agreements for flat-pack tables.'
    ]
  },
  {
    id: 'REC-02',
    title: 'Enforce 20% Hard Ceiling on Promotional Discounts',
    area: 'Discount Governance',
    impactAmount: 38400.00,
    effort: 'Low',
    summary: 'Discounts exceeding 20% reliably flip transactions into net losses, dropping average order profit from +$24.80 down to -$94 to -$310.',
    actionItems: [
      'Lock maximum sales rep discretionary discount in CRM/POS at 20%.',
      'Require VP approval workflows for any discount tier exceeding 25%.',
      'Eliminate automatic discount stackability during Q4 holiday promotions.',
      'Tie sales commissions to net profit margin rather than gross sales volume.'
    ]
  },
  {
    id: 'REC-03',
    title: 'Scale High-Margin Copiers & Technology Portfolio',
    area: 'Category Growth',
    impactAmount: 45000.00,
    effort: 'Medium',
    summary: 'Technology generates $145.5k in profit (17.39% margin) with Copiers boasting an industry-leading 37.19% margin ($55.6k profit).',
    actionItems: [
      'Double down on enterprise Copier leasing bundles with consumable paper attach-rates.',
      'Accelerate marketing spend in Technology accessories and high-turnover phone products.',
      'Replicate West Coast B2B sales playbook across lagging regions.',
      'Bundle high-margin copiers and printers with consumables contracts.'
    ]
  },
  {
    id: 'REC-04',
    title: 'Targeted Growth Campaign for South Region & Low-Volume States',
    area: 'Geographic Expansion',
    impactAmount: 28500.00,
    effort: 'High',
    summary: 'South region ($391.7k sales) trails West ($725.5k) by 46%, while West Virginia, Maine, South Dakota, and Wyoming each generate under $2,000.',
    actionItems: [
      'Deploy regional marketing blitz in high-growth southern metropolitan hubs (Atlanta, Charlotte, Miami).',
      'Establish regional fulfillment hubs in the South to reduce shipping transit times.',
      'Target SMB distributor networks in rural states (WV, ME, SD, WY) via digital self-service catalogs.',
      'Analyze state-specific tax and localized pricing barriers.'
    ]
  }
];
