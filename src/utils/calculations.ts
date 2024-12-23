// src/utils/calculations.ts
import type { Worker, ProjectData, CalculationResult } from '../types';

export const calculateWorkerTotal = (worker: Worker): number => {
  const totalDays = 
    worker.workdays.preparation +
    worker.workdays.event +
    worker.workdays.teardown;
  
  return worker.dailyWage * totalDays;
};

export const calculateWithholdingTax = (worker: Worker): number => {
  if (!worker.withholdingTax || worker.dailyWage <= 1000) {
    return 0;
  }

  const totalWage = calculateWorkerTotal(worker);
  const grossUpWage = totalWage / 0.97; // 3% withholding tax
  return grossUpWage * 0.03;
};

export const calculateTotalCosts = (projectData: ProjectData): CalculationResult => {
  // Calculate worker costs
  const workerCosts = projectData.workers.reduce((total, worker) => {
    return total + calculateWorkerTotal(worker) + calculateWithholdingTax(worker);
  }, 0);

  // Calculate other costs
  const otherCosts = Object.values(projectData.costs).reduce((total, category) => {
    return total + Object.values(category).reduce((sum, value) => sum + value, 0);
  }, 0);

  const totalCosts = workerCosts + otherCosts;
  
  // Calculate taxes
  const incomeTax = (totalCosts * projectData.incomeTaxRate) / 100;
  
  // Calculate required price for target profit
  const targetProfitRate = projectData.targetProfit / 100;
  const suggestedPrice = totalCosts / (1 - projectData.incomeTaxRate/100 - targetProfitRate);
  
  // Calculate net profit
  const netProfit = suggestedPrice * (1 - projectData.incomeTaxRate/100) - totalCosts;

  return {
    totalCosts,
    withholdingTax: projectData.workers.reduce((total, worker) => {
      return total + calculateWithholdingTax(worker);
    }, 0),
    incomeTax,
    netProfit,
    suggestedPrice
  };
};
