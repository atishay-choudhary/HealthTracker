"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Utensils, Droplet, Dumbbell, Moon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for calendar events
const events = [
  { date: new Date(2025, 4, 10), type: "food", title: "Breakfast", description: "Oatmeal - 320 calories" },
  { date: new Date(2025, 4, 10), type: "water", title: "Water", description: "500ml" },
  { date: new Date(2025, 4, 10), type: "workout", title: "Cardio", description: "30 min running" },
  { date: new Date(2025, 4, 11), type: "food", title: "Lunch", description: "Salad - 450 calories" },
  { date: new Date(2025, 4, 11), type: "sleep", title: "Sleep", description: "7h 20m" },
  { date: new Date(2025, 4, 12), type: "workout", title: "Strength", description: "45 min weight training" },
  { date: new Date(2025, 4, 12), type: "water", title: "Water", description: "2L total" },
  { date: new Date(2025, 4, 13), type: "food", title: "Dinner", description: "Salmon - 520 calories" },
  { date: new Date(2025, 4, 14), type: "sleep", title: "Sleep", description: "8h 10m" },
  { date: new Date(2025, 4, 14), type: "workout", title: "Yoga", description: "60 min session" },
]

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const router = useRouter()

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    (event) =>
      selectedDate &&
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear(),
  )

  // Function to render event dots on calendar
  const renderEventDots = (day) => {
    if (!day) return null

    const dayEvents = events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )

    if (dayEvents.length === 0) return null

    // Group events by type
    const eventTypes = [...new Set(dayEvents.map((event) => event.type))]

    return (
      <div className="flex justify-center mt-1 gap-0.5">
        {eventTypes.map((type, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              type === "food"
                ? "bg-emerald-500"
                : type === "water"
                  ? "bg-blue-500"
                  : type === "workout"
                    ? "bg-orange-500"
                    : "bg-purple-500"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <Button onClick={() => router.push("/dashboard/logs/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Log
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Health Log Calendar</CardTitle>
            <CardDescription>View and manage your health logs by date</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
                setSelectedDate(newDate)
              }}
              className="rounded-md border"
              components={{
                DayContent: (props) => {
                  // Check if props and props.date exist before accessing properties
                  if (!props || !props.date) {
                    return <div>{props?.children}</div>
                  }

                  return (
                    <div className="flex flex-col items-center">
                      <div>{props.children}</div>
                      {renderEventDots(props.date)}
                    </div>
                  )
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>
              {selectedDate?.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(newDate.getDate() - 1)
                  setSelectedDate(newDate)
                  setDate(newDate)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(newDate.getDate() + 1)
                  setSelectedDate(newDate)
                  setDate(newDate)
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 rounded-full p-1.5 ${
                        event.type === "food"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                          : event.type === "water"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : event.type === "workout"
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                              : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      }`}
                    >
                      {event.type === "food" ? (
                        <Utensils className="h-4 w-4" />
                      ) : event.type === "water" ? (
                        <Droplet className="h-4 w-4" />
                      ) : event.type === "workout" ? (
                        <Dumbbell className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/logs/new")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Log
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No logs for this day</h3>
                <p className="text-sm text-muted-foreground mb-4">Start tracking your health data for this date.</p>
                <Button onClick={() => router.push("/dashboard/logs/new")}>Add Health Log</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Legend</CardTitle>
          <CardDescription>Color indicators for different log types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm">Food Log</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm">Water Log</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-sm">Workout Log</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span className="text-sm">Sleep Log</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
