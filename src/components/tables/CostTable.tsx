// src/components/tables/CostTable.tsx
import React from 'react';
import type { Costs } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CostTableProps {
  costs: Costs;
  calculateTotal: (category: keyof Costs) => number;
}

export const CostTable: React.FC<CostTableProps> = ({ costs, calculateTotal }) => (
  <Card>
    <CardHeader>
      <CardTitle>สรุปค่าใช้จ่าย</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">หมวดค่าใช้จ่าย</th>
              <th className="text-right py-2">จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(costs).map(([category, items]) => (
              <tr key={category} className="border-b">
                <td className="py-2">{category}</td>
                <td className="text-right py-2">
                  {calculateTotal(category as keyof Costs).toLocaleString()} บาท
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="py-2">รวมทั้งหมด</td>
              <td className="text-right py-2">
                {Object.keys(costs)
                  .reduce((sum, category) => sum + calculateTotal(category as keyof Costs), 0)
                  .toLocaleString()} บาท
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </CardContent>
  </Card>
);

// src/components/tables/LaborTable.tsx
import React from 'react';
import type { Worker } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LaborTableProps {
  workers: Worker[];
  calculateWorkerTotal: (worker: Worker) => number;
  calculateWithholdingTax: (worker: Worker) => number;
}

export const LaborTable: React.FC<LaborTableProps> = ({
  workers,
  calculateWorkerTotal,
  calculateWithholdingTax
}) => (
  <Card>
    <CardHeader>
      <CardTitle>สรุปค่าแรง</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">ชื่อ-นามสกุล</th>
              <th className="text-left py-2">ตำแหน่ง</th>
              <th className="text-right py-2">จำนวนวัน</th>
              <th className="text-right py-2">ค่าแรงรวม</th>
              <th className="text-right py-2">ภาษี</th>
              <th className="text-right py-2">รวมสุทธิ</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => {
              const total = calculateWorkerTotal(worker);
              const tax = calculateWithholdingTax(worker);
              return (
                <tr key={worker.id} className="border-b">
                  <td className="py-2">{worker.name}</td>
                  <td className="py-2">{worker.position}</td>
                  <td className="text-right py-2">
                    {worker.workdays.preparation + worker.workdays.event + worker.workdays.teardown}
                  </td>
                  <td className="text-right py-2">{total.toLocaleString()}</td>
                  <td className="text-right py-2">{tax.toLocaleString()}</td>
                  <td className="text-right py-2">{(total - tax).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);
