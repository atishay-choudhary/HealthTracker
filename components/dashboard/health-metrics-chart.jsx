"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Mock data for the charts
const generateDailyData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 6 + i)
    const day = date.toLocaleDateString("en-US", { weekday: "short" })

    return {
      name: day,
      calories: Math.floor(Math.random() * 800) + 1400,
      water: Math.floor(Math.random() * 1000) + 1000,
      sleep: Math.floor(Math.random() * 200) + 300,
      exercise: Math.floor(Math.random() * 60) + 20,
    }
  })
}

const generateWeeklyData = () => {
  return Array.from({ length: 4 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 21 + i * 7)
    const week = `Week ${i + 1}`

    return {
      name: week,
      calories: Math.floor(Math.random() * 1000) + 12000,
      water: Math.floor(Math.random() * 2000) + 10000,
      sleep: Math.floor(Math.random() * 300) + 2500,
      exercise: Math.floor(Math.random() * 100) + 200,
    }
  })
}

const generateMonthlyData = () => {
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - 5 + i)
    const month = date.toLocaleDateString("en-US", { month: "short" })

    return {
      name: month,
      calories: Math.floor(Math.random() * 5000) + 50000,
      water: Math.floor(Math.random() * 10000) + 40000,
      sleep: Math.floor(Math.random() * 1000) + 10000,
      exercise: Math.floor(Math.random() * 300) + 800,
    }
  })
}

const getDataByInterval = (interval) => {
  switch (interval) {
    case "daily":
      return generateDailyData()
    case "weekly":
      return generateWeeklyData()
    case "monthly":
      return generateMonthlyData()
    default:
      return generateDailyData()
  }
}

export default function HealthMetricsChart({ interval }) {
  const data = getDataByInterval(interval)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
        <CardDescription>Track your health metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
            </TabsList>
            <ChartLegend>
              <ChartLegendItem name="Calories" color="#10b981" />
              <ChartLegendItem name="Water (ml)" color="#3b82f6" />
              <ChartLegendItem name="Sleep (min)" color="#8b5cf6" />
              <ChartLegendItem name="Exercise (min)" color="#f97316" />
            </ChartLegend>
          </div>

          <TabsContent value="line" className="h-[300px] mt-4">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="water"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sleep"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="exercise"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="bar" className="h-[300px] mt-4">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="calories" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="water" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sleep" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="exercise" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="area" className="h-[300px] mt-4">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="water"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="sleep"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="exercise"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
