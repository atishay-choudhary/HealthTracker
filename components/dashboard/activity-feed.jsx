import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Utensils, Droplet, Dumbbell, Moon, Brain } from "lucide-react"

// Mock activity data
const activityItems = [
  {
    id: "1",
    type: "food",
    title: "Logged breakfast",
    description: "Oatmeal with berries and honey - 320 calories",
    time: "Today, 7:30 AM",
  },
  {
    id: "2",
    type: "water",
    title: "Drank water",
    description: "500ml of water",
    time: "Today, 9:15 AM",
  },
  {
    id: "3",
    type: "workout",
    title: "Completed workout",
    description: "30 min cardio session - 250 calories burned",
    time: "Today, 11:00 AM",
  },
  {
    id: "4",
    type: "water",
    title: "Drank water",
    description: "400ml of water",
    time: "Today, 1:30 PM",
  },
  {
    id: "5",
    type: "food",
    title: "Logged lunch",
    description: "Grilled chicken salad - 450 calories",
    time: "Today, 1:45 PM",
  },
  {
    id: "6",
    type: "tip",
    title: "Wellness tip",
    description: "Try to take a 5-minute break every hour to stretch and rest your eyes",
    time: "Today, 3:00 PM",
  },
  {
    id: "7",
    type: "water",
    title: "Drank water",
    description: "350ml of water",
    time: "Today, 4:20 PM",
  },
  {
    id: "8",
    type: "workout",
    title: "Completed workout",
    description: "15 min strength training - 120 calories burned",
    time: "Yesterday, 5:30 PM",
  },
  {
    id: "9",
    type: "food",
    title: "Logged dinner",
    description: "Salmon with vegetables - 520 calories",
    time: "Yesterday, 7:00 PM",
  },
  {
    id: "10",
    type: "sleep",
    title: "Sleep tracked",
    description: "7h 20m of sleep - 85% sleep quality",
    time: "Yesterday, 11:30 PM",
  },
]

export default function ActivityFeed() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {activityItems.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <Avatar className="mt-1 h-8 w-8 border">
              <AvatarFallback className="bg-muted">{getIconForActivityType(item.type)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
              <div className="text-xs text-muted-foreground">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

function getIconForActivityType(type) {
  switch (type) {
    case "food":
      return <Utensils className="h-4 w-4" />
    case "water":
      return <Droplet className="h-4 w-4" />
    case "workout":
      return <Dumbbell className="h-4 w-4" />
    case "sleep":
      return <Moon className="h-4 w-4" />
    case "tip":
      return <Brain className="h-4 w-4" />
    default:
      return null
  }
}
