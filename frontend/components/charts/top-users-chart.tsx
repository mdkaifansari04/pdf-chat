'use client';

import { TopInteractingUsers } from '@/hooks/data-access/responseType';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data for top users by query volume
const data = [
  { _id: 'John Doe', totalSessions: 120, color: '#8884d8' },
  { _id: 'Jane Smith', totalSessions: 95, color: '#83a6ed' },
  { _id: 'Alex Johnson', totalSessions: 86, color: '#8dd1e1' },
  { _id: 'Sam Wilson', totalSessions: 72, color: '#82ca9d' },
  { _id: 'Taylor Swift', totalSessions: 65, color: '#a4de6c' },
];

const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

export function TopUsersChart({ data }: { data: TopInteractingUsers[] }) {
  return (
    <div className="flex h-[350px] w-full items-center justify-center">
      <div className="w-full max-w-md">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="totalSessions" label={({ _id, percent }) => `${_id} (${(percent * 100).toFixed(0)}%)`} labelLine={false}>
              {data.map((entry, index) => (
                <Cell key={`cell-${entry._id}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">User</span>
                          <span className="font-normal text-xs text-muted-foreground">{payload[0].name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Queries</span>
                          <span className="font-normal text-xs">{payload[0].value}</span>
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
              <div className="mr-1 h-3 w-3 rounded-sm" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="text-xs">{item._id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
