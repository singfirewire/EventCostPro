// src/components/dashboard/Charts.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartData } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ChartsProps {
  costData: ChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const Charts: React.FC<ChartsProps> = ({ costData }) => (
  <Card>
    <CardHeader>
      <CardTitle>สัดส่วนค่าใช้จ่าย</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={costData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {costData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value.toLocaleString()} บาท`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);
