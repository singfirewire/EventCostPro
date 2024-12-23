// src/utils/exporters.ts
import type { ProjectData, ExportFormat } from '../types';
import { jsPDF } from 'jspdf';
import { calculateTotalCosts } from './calculations';

export const exportData = (projectData: ProjectData, format: ExportFormat): void => {
  const results = calculateTotalCosts(projectData);

  switch (format) {
    case 'csv':
      exportCSV(projectData, results);
      break;
    case 'txt':
      exportTXT(projectData, results);
      break;
    case 'pdf':
      exportPDF(projectData, results);
      break;
  }
};

const exportCSV = (projectData: ProjectData, results: CalculationResult): void => {
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Add headers
  csvContent += "รายการ,จำนวนเงิน\n";
  
  // Add data rows
  csvContent += `งบประมาณโครงการ,${projectData.projectBudget}\n`;
  csvContent += `ต้นทุนรวม,${results.totalCosts}\n`;
  csvContent += `ภาษีหัก ณ ที่จ่าย,${results.withholdingTax}\n`;
  csvContent += `ภาษีเงินได้,${results.incomeTax}\n`;
  csvContent += `กำไรสุทธิ,${results.netProfit}\n`;
  csvContent += `ราคาที่ควรเสนอ,${results.suggestedPrice}\n`;

  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `event-cost-pro_${new Date().toISOString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportTXT = (projectData: ProjectData, results: CalculationResult): void => {
  let content = "สรุปต้นทุนโครงการ\n";
  content += "================\n\n";
  content += `วันที่: ${new Date().toLocaleDateString()}\n`;
  content += `โครงการ: ${projectData.projectName}\n\n`;
  content += `งบประมาณโครงการ: ${projectData.projectBudget.toLocaleString()} บาท\n`;
  content += `ต้นทุนรวม: ${results.totalCosts.toLocaleString()} บาท\n`;
  content += `ภาษีหัก ณ ที่จ่าย: ${results.withholdingTax.toLocaleString()} บาท\n`;
  content += `ภาษีเงินได้ (${projectData.incomeTaxRate}%): ${results.incomeTax.toLocaleString()} บาท\n`;
  content += `กำไรสุทธิ: ${results.netProfit.toLocaleString()} บาท\n`;
  content += `ราคาที่ควรเสนอ: ${results.suggestedPrice.toLocaleString()} บาท\n`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `event-cost-pro_${new Date().toISOString()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportPDF = (projectData: ProjectData, results: CalculationResult): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add title
  doc.setFontSize(20);
  doc.text('สรุปต้นทุนโครงการ', pageWidth/2, 20, { align: 'center' });
  
  // Add content
  doc.setFontSize(12);
  let y = 40;
  doc.text(`วันที่: ${new Date().toLocaleDateString()}`, 20, y);
  y += 10;
  doc.text(`โครงการ: ${projectData.projectName}`, 20, y);
  y += 20;
  
  // Add financial data
  const data = [
    ['งบประมาณโครงการ', `${projectData.projectBudget.toLocaleString()} บาท`],
    ['ต้นทุนรวม', `${results.totalCosts.toLocaleString()} บาท`],
    ['ภาษีหัก ณ ที่จ่าย', `${results.withholdingTax.toLocaleString()} บาท`],
    ['ภาษีเงินได้', `${results.incomeTax.toLocaleString()} บาท`],
    ['กำไรสุทธิ', `${results.netProfit.toLocaleString()} บาท`],
    ['ราคาที่ควรเสนอ', `${results.suggestedPrice.toLocaleString()} บาท`]
  ];
  
