// src/components/dashboard/ExportButtons.tsx
import React from 'react';
import { FileDown } from 'lucide-react';
import type { ProjectData, ExportFormat } from '../../types';

interface ExportButtonsProps {
  projectData: ProjectData;
  onExport: (format: ExportFormat) => void;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ projectData, onExport }) => (
  <div className="flex space-x-4">
    <button
      onClick={() => onExport('csv')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      <FileDown className="h-5 w-5 mr-2" />
      Export CSV
    </button>
    <button
      onClick={() => onExport('txt')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
    >
      <FileDown className="h-5 w-5 mr-2" />
      Export TXT
    </button>
    <button
      onClick={() => onExport('pdf')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
    >
      <FileDown className="h-5 w-5 mr-2" />
      Export PDF
    </button>
  </div>
);
