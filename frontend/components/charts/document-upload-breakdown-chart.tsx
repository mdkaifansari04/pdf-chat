'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data for document upload breakdown
const data = [
  { name: 'John Doe', value: 42, color: '#ff7c43' },
  { name: 'Jane Smith', value: 28, color: '#ffa600' },
  { name: 'Alex Johnson', value: 19, color: '#f95d6a' },
  { name: 'Sam Wilson', value: 14, color: '#d45087' },
  { name: 'Others', value: 23, color: '#a05195' },
];

export function DocumentUploadBreakdownChart() {
  return (
    <div className="flex h-[350px] w-full items-center justify-center">
      <div className="w-full max-w-md">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`} labelLine={true}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">User</span>
                          <span className="font-bold text-muted-foreground">{payload[0].name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Documents</span>
                          <span className="font-bold">{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
