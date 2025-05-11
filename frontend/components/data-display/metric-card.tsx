import type { ReactNode } from 'react';
import { Card } from '../ui/card';

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  description: string;
}

export default function MetricCard({ icon, title, value, description }: MetricCardProps) {
  return (
    <Card className="p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <div className="p-2 bg-primary/10 rounded-full mr-3 text-primary">{icon}</div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</span>
      </div>
    </Card>
  );
}
