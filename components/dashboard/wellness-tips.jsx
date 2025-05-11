import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Zap, Brain } from "lucide-react"

// Mock wellness tips
const wellnessTips = [
  {
    id: "1",
    title: "Hydration Reminder",
    description:
      "Based on your water intake logs, try to drink an additional 500ml of water in the morning to reach your daily hydration goals.",
    category: "nutrition",
  },
  {
    id: "2",
    title: "Workout Optimization",
    description:
      "Your workout data shows you're most consistent with evening workouts. Consider scheduling your most challenging exercises between 5-7 PM for optimal performance.",
    category: "fitness",
  },
  {
    id: "3",
    title: "Sleep Improvement",
    description:
      "Your sleep quality could improve by 15% if you maintain a consistent bedtime. Try going to bed at 10:30 PM for the next week.",
    category: "mental",
  },
]

export default function WellnessTips() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {wellnessTips.map((tip) => (
        <Card key={tip.id}>
          <CardContent className="pt-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {tip.category === "nutrition" ? (
                <Lightbulb className="h-5 w-5 text-primary" />
              ) : tip.category === "fitness" ? (
                <Zap className="h-5 w-5 text-primary" />
              ) : (
                <Brain className="h-5 w-5 text-primary" />
              )}
            </div>
            <h3 className="mb-2 font-medium">{tip.title}</h3>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
