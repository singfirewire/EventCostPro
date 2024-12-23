// src/components/forms/BudgetForm.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BudgetFormProps {
  projectBudget: number;
  targetProfit: number;
  incomeTaxRate: number;
  onUpdate: (field: string, value: number) => void;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({
  projectBudget,
  targetProfit,
  incomeTaxRate,
  onUpdate
}) => (
  <Card>
    <CardHeader>
      <CardTitle>ข้อมูลงบประมาณ</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">งบประมาณโครงการ</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={projectBudget}
            onChange={(e) => onUpdate('projectBudget', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">เป้าหมายกำไร (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={targetProfit}
            min="0"
            max="100"
            onChange={(e) => onUpdate('targetProfit', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">อัตราภาษีเงินได้ (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={incomeTaxRate}
            min="0"
            max="30"
            onChange={(e) => onUpdate('incomeTaxRate', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

// src/components/forms/LaborForm.tsx
import React from 'react';
import type { Worker } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';

interface LaborFormProps {
  workers: Worker[];
  onAddWorker: () => void;
  onUpdateWorker: (index: number, field: keyof Worker, value: any) => void;
  onRemoveWorker: (index: number) => void;
}

export const LaborForm: React.FC<LaborFormProps> = ({
  workers,
  onAddWorker,
  onUpdateWorker,
  onRemoveWorker
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>ข้อมูลค่าแรง</CardTitle>
      <button
        onClick={onAddWorker}
        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
      >
        <PlusCircle className="h-5 w-5" />
        <span>เพิ่มพนักงาน</span>
      </button>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {workers.map((worker, index) => (
          <div key={worker.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">พนักงานคนที่ {index + 1}</h4>
              <button
                onClick={() => onRemoveWorker(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={worker.name}
                  onChange={(e) => onUpdateWorker(index, 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">ตำแหน่ง</label>
                <select
                  className="w-full p-2 border rounded"
                  value={worker.position}
                  onChange={(e) => onUpdateWorker(index, 'position', e.target.value)}
                >
                  <option value="supervisor">หัวหน้างาน</option>
                  <option value="technician">ช่างเทคนิค</option>
                  <option value="worker">คนงานทั่วไป</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">ค่าแรงต่อวัน</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={worker.dailyWage}
                  onChange={(e) => onUpdateWorker(index, 'dailyWage', parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">หักภาษี ณ ที่จ่าย</label>
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={worker.withholdingTax}
                  onChange={(e) => onUpdateWorker(index, 'withholdingTax', e.target.checked)}
                />
              </div>
              {/* เพิ่มฟิลด์อื่นๆ ตามต้องการ */}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
