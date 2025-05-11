import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HealthMetricsChart from "@/components/dashboard/health-metrics-chart"
import ActivityFeed from "@/components/dashboard/activity-feed"
import GoalProgress from "@/components/dashboard/goal-progress"
import WellnessTips from "@/components/dashboard/wellness-tips"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"
import { CalendarDays, Dumbbell, Droplet, Utensils, Moon } from "lucide-react"

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your health metrics and goals.</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Water Intake" value="1.8L" target="2.5L" icon={<Droplet className="h-4 w-4" />} />
          <MetricCard title="Calories" value="1,850" target="2,200" icon={<Utensils className="h-4 w-4" />} />
          <MetricCard title="Exercise" value="45 min" target="60 min" icon={<Dumbbell className="h-4 w-4" />} />
          <MetricCard title="Sleep" value="7h 20m" target="8h" icon={<Moon className="h-4 w-4" />} />
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-4">
            <HealthMetricsChart interval="daily" />
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <HealthMetricsChart interval="weekly" />
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <HealthMetricsChart interval="monthly" />
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                <span>Activity Feed</span>
              </CardTitle>
              <CardDescription>Your recent health activities and logs</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Goals Progress</CardTitle>
              <CardDescription>Track your progress towards your health goals</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalProgress />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Wellness Tips</CardTitle>
            <CardDescription>Personalized recommendations based on your health data</CardDescription>
          </CardHeader>
          <CardContent>
            <WellnessTips />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  )
}

function MetricCard({ title, value, target, icon }) {
  const percentage = Math.floor(Math.random() * 30) + 70 // Random percentage between 70-100%

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-muted p-1">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <span>Target: {target}</span>
          <div className="ml-auto flex items-center gap-1">
            <span className={percentage >= 85 ? "text-emerald-500" : "text-amber-500"}>{percentage}%</span>
          </div>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-muted">
          <div
            className={`h-2 rounded-full ${percentage >= 85 ? "bg-emerald-500" : "bg-amber-500"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
