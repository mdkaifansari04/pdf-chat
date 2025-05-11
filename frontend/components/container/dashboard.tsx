import { BarChart3, Calendar, FileText, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangePicker } from '../action/date-range-picker';
import { SummaryCard } from '../data-display/summary-card';
import { UserSignupsChart } from '../charts/user-signup-chart';
import { TopUsersChart } from '../charts/top-users-chart';
import { DocumentUploadBreakdownChart } from '../charts/document-upload-breakdown-chart';
import { ResourcesUploadedChart } from '../charts/resource-uplaod-chart';
import { QueriesPerDayChart } from '../charts/queries-per-day-chart';

export default function DashboardPage() {
  // In a real application, this data would come from an API or database
  const dashboardData = {
    totalUsers: 125,
    totalResources: 348,
    totalQueries: 1256,
    avgQueriesPerUser: 10.05,
    avgResourcesPerUser: 2.78,
    userGrowth: 12.5, // percentage increase from last period
    resourceGrowth: 8.3,
    queryGrowth: 15.2,
    avgQueriesGrowth: 2.4,
    avgResourcesGrowth: -1.2,
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <DateRangePicker />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="Total Users" value={dashboardData.totalUsers} description="Active platform users" percentChange={dashboardData.userGrowth} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
          <SummaryCard title="Total Resources" value={dashboardData.totalResources} description="Uploaded documents" percentChange={dashboardData.resourceGrowth} icon={<FileText className="h-4 w-4 text-muted-foreground" />} />
          <SummaryCard title="Total Queries" value={dashboardData.totalQueries} description="User interactions" percentChange={dashboardData.queryGrowth} icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} />
          <SummaryCard title="Avg. Queries/User" value={dashboardData.avgQueriesPerUser} description="User engagement" percentChange={dashboardData.avgQueriesGrowth} precision={2} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>User Signups Over Time</CardTitle>
              <CardDescription>Daily new user registrations</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <UserSignupsChart />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Top Users by Query Volume</CardTitle>
              <CardDescription>Users with the most interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <TopUsersChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Document Upload Breakdown</CardTitle>
              <CardDescription>Resources uploaded per user</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUploadBreakdownChart />
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
              <CardDescription>Daily resources uploaded and queries</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Tabs defaultValue="resources" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="queries">Queries</TabsTrigger>
                </TabsList>
                <TabsContent value="resources">
                  <ResourcesUploadedChart />
                </TabsContent>
                <TabsContent value="queries">
                  <QueriesPerDayChart />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
