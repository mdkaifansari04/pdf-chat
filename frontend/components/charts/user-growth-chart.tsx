'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    month: 'Jan',
    users: 15,
  },
  {
    month: 'Feb',
    users: 28,
  },
  {
    month: 'Mar',
    users: 42,
  },
  {
    month: 'Apr',
    users: 55,
  },
  {
    month: 'May',
    users: 68,
  },
  {
    month: 'Jun',
    users: 82,
  },
  {
    month: 'Jul',
    users: 95,
  },
  {
    month: 'Aug',
    users: 110,
  },
  {
    month: 'Sep',
    users: 125,
  },
  {
    month: 'Oct',
    users: 140,
  },
  {
    month: 'Nov',
    users: 155,
  },
  {
    month: 'Dec',
    users: 170,
  },
];

export function UserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
