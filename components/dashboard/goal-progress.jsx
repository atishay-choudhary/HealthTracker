import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock goals data
const goals = [
  {
    id: "1",
    name: "Drink 2.5L of water daily",
    target: "2.5L",
    current: "1.8L",
    progress: 72,
    status: "on-track",
    daysLeft: 0,
  },
  {
    id: "2",
    name: "Exercise 5 times per week",
    target: "5 sessions",
    current: "3 sessions",
    progress: 60,
    status: "at-risk",
    daysLeft: 2,
  },
  {
    id: "3",
    name: "Lose 5kg in 2 months",
    target: "5kg",
    current: "2.8kg",
    progress: 56,
    status: "on-track",
    daysLeft: 23,
  },
  {
    id: "4",
    name: "Sleep 8 hours every night",
    target: "8 hours",
    current: "7.2 hours",
    progress: 90,
    status: "on-track",
    daysLeft: 0,
  },
  {
    id: "5",
    name: "Meditate for 10 minutes daily",
    target: "10 minutes",
    current: "5 minutes",
    progress: 50,
    status: "behind",
    daysLeft: 0,
  },
]

export default function GoalProgress() {
  return (
    <div className="space-y-6">
      {goals.map((goal) => (
        <div key={goal.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{goal.name}</div>
            <Badge
              variant={goal.status === "on-track" ? "default" : goal.status === "at-risk" ? "outline" : "destructive"}
            >
              {goal.status === "on-track" ? "On Track" : goal.status === "at-risk" ? "At Risk" : "Behind"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {goal.current} of {goal.target}
            </div>
            <div>{goal.progress}%</div>
          </div>
          <Progress value={goal.progress} className="h-2" />
          {goal.daysLeft > 0 && <div className="text-xs text-muted-foreground">{goal.daysLeft} days remaining</div>}
        </div>
      ))}
    </div>
  )
}
