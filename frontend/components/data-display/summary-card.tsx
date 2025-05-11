import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number;
  description: string;
  percentChange?: number;
  precision?: number;
  icon?: React.ReactNode;
}

export function SummaryCard({ title, value, description, percentChange, precision = 0, icon }: SummaryCardProps) {
  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <CardDescription className="flex items-center text-xs">
          {description}
          {percentChange !== undefined && (
            <div className={cn('ml-2 flex items-center text-xs font-medium', percentChange > 0 ? 'text-emerald-500' : percentChange < 0 ? 'text-rose-500' : 'text-gray-500')}>
              {percentChange > 0 ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : percentChange < 0 ? <ArrowDownIcon className="mr-1 h-3 w-3" /> : null}
              {Math.abs(percentChange).toFixed(1)}%
            </div>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
