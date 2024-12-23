export interface Worker {
  id: string;
  name: string;
  position: 'supervisor' | 'technician' | 'worker';
  dailyWage: number;
  withholdingTax: boolean;
  accommodation: number;
  food: number;
  transportation: number;
  allowance: number;
  workdays: {
    preparation: number;
    event: number;
    teardown: number;
  };
}

export interface CostCategory {
  [key: string]: number;
}

export interface Costs {
  preQuotation: CostCategory;
  preEvent: CostCategory;
  eventDay: CostCategory;
  postEvent: CostCategory;
  general: CostCategory;
}

export interface ProjectData {
  version: string;
  projectName: string;
  projectBudget: number;
  targetProfit: number;
  incomeTaxRate: number;
  costs: Costs;
  workers: Worker[];
  lastUpdated: string;
}

export interface CalculationResult {
  totalCosts: number;
  withholdingTax: number;
  incomeTax: number;
  netProfit: number;
  suggestedPrice: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export type ExportFormat = 'csv' | 'txt' | 'pdf';
