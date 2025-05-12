import { BarChart3, Calendar, FileText, Users } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import React from 'react';

export default function ResourceLoadingView() {
  return (
    <div className="flex flex-col gap-2 px-2 pt-5">
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
    </div>
  );
}

export function SummaryCardLoadingView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCardSkeleton title="Total Users" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
      <SummaryCardSkeleton title="Total Resources" icon={<FileText className="h-4 w-4 text-muted-foreground" />} />
      <SummaryCardSkeleton title="Total Queries" icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} />
      <SummaryCardSkeleton title="Avg. Queries/User" icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
    </div>
  );
}

export function SummaryCardSkeleton(props: { icon: React.ReactNode; title: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        {props.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Skeleton className="h-6 w-6" />
        </div>
        <CardDescription className="flex items-center text-xs mt-3">
          <Skeleton className="h-3 w-44" />
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export const ResourceCardLoadingView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton className="h-52 rounded-xl w-full" />
      <Skeleton className="h-52 rounded-xl w-full" />
      <Skeleton className="h-52 rounded-xl w-full" />
      <Skeleton className="h-52 rounded-xl w-full" />
      <Skeleton className="h-52 rounded-xl w-full" />
    </div>
  );
};
