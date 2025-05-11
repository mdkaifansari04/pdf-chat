'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  userId: string;
  count: number;
}

interface ResourceUsageChartProps {
  data: DataPoint[];
}

const COLORS = ['#3B82F6', '#10B981', '#EC4899', '#8B5CF6', '#F59E0B', '#EF4444'];

export default function ResourceUsageChart({ data }: ResourceUsageChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="count"
            nameKey="userId"
            label={({ userId, count }) => {
              const percentage = ((count / total) * 100).toFixed(0);
              return `${userId.substring(5, 10)}... (${percentage}%)`;
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.375rem',
              color: '#F9FAFB',
            }}
            formatter={(value, name) => {
              const percentage = ((Number(value) / total) * 100).toFixed(1);
              return [`${value} (${percentage}%)`, 'Resources'];
            }}
            labelFormatter={(value) => `User: ${value}`}
          />
          <Legend formatter={(value) => value.substring(5, 12) + '...'} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
