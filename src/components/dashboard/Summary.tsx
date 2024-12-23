// src/components/dashboard/Summary.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { CalculationResult } from '../../types';

interface SummaryProps {
  result: CalculationResult;
}

export const Summary: React.FC<SummaryProps> = ({ result }) => (
  <Card>
    <CardHeader>
      <CardTitle>สรุปผลการคำนวณ</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
