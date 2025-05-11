"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Brain, Lightbulb, Zap, RefreshCw } from "lucide-react"

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
  {
    id: "4",
    title: "Protein Intake",
    description:
      "Your food logs show you're consistently below your protein target. Try adding a protein-rich snack like Greek yogurt or a protein shake between meals.",
    category: "nutrition",
  },
  {
    id: "5",
    title: "Recovery Focus",
    description:
      "You've logged intense workouts for 3 consecutive days. Consider taking a recovery day or doing light activity like walking or stretching tomorrow.",
    category: "fitness",
  },
  {
    id: "6",
    title: "Mindfulness Practice",
    description:
      "Regular short meditation sessions can help improve your reported stress levels. Try a 5-minute guided meditation before bedtime.",
    category: "mental",
  },
  {
    id: "7",
    title: "Meal Timing",
    description:
      "Your energy levels might improve by spacing your meals more evenly throughout the day. Try eating smaller meals every 3-4 hours.",
    category: "nutrition",
  },
  {
    id: "8",
    title: "Workout Variety",
    description:
      "Your exercise logs show mostly cardio workouts. Consider adding 2 strength training sessions per week for better overall fitness.",
    category: "fitness",
  },
  {
    id: "9",
    title: "Digital Detox",
    description:
      "Try implementing a 30-minute screen-free period before bedtime to improve your sleep quality and reduce mental fatigue.",
    category: "mental",
  },
]

export default function WellnessTipsPage() {
  const [tips, setTips] = useState(wellnessTips)
  const [savedTips, setSavedTips] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveTip = (tipId) => {
    const updatedTips = tips.map((tip) => (tip.id === tipId ? { ...tip, saved: true } : tip))

    const tipToSave = tips.find((tip) => tip.id === tipId)
    if (tipToSave) {
      setSavedTips([...savedTips, { ...tipToSave, saved: true }])
    }

    setTips(updatedTips)

    toast({
      title: "Tip saved",
      description: "The wellness tip has been saved to your collection.",
    })
  }

  const handleRemoveSavedTip = (tipId) => {
    const updatedSavedTips = savedTips.filter((tip) => tip.id !== tipId)
    setSavedTips(updatedSavedTips)

    const updatedTips = tips.map((tip) => (tip.id === tipId ? { ...tip, saved: false } : tip))
    setTips(updatedTips)

    toast({
      title: "Tip removed",
      description: "The wellness tip has been removed from your collection.",
    })
  }

  const handleGenerateNewTips = () => {
    setIsLoading(true)

    // Simulate API call to generate new tips
    setTimeout(() => {
      toast({
        title: "New tips generated",
        description: "Fresh wellness tips based on your latest health data.",
      })
      setIsLoading(false)
    }, 1500)
  }

  const filterTipsByCategory = (category) => {
    if (category === "all") return tips
    return tips.filter((tip) => tip.category === category)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Wellness Tips</h1>
          <p className="text-muted-foreground mt-1">Personalized recommendations based on your health data</p>
        </div>
        <Button onClick={handleGenerateNewTips} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Generating..." : "Generate New Tips"}
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tips</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="mental">Mental Wellness</TabsTrigger>
          <TabsTrigger value="saved">Saved Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} onSave={handleSaveTip} onRemove={handleRemoveSavedTip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterTipsByCategory("nutrition").map((tip) => (
              <TipCard key={tip.id} tip={tip} onSave={handleSaveTip} onRemove={handleRemoveSavedTip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fitness" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterTipsByCategory("fitness").map((tip) => (
              <TipCard key={tip.id} tip={tip} onSave={handleSaveTip} onRemove={handleRemoveSavedTip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mental" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filterTipsByCategory("mental").map((tip) => (
              <TipCard key={tip.id} tip={tip} onSave={handleSaveTip} onRemove={handleRemoveSavedTip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          {savedTips.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedTips.map((tip) => (
                <TipCard key={tip.id} tip={tip} onSave={handleSaveTip} onRemove={handleRemoveSavedTip} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Lightbulb className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No saved tips yet</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Save wellness tips that you find helpful to access them later.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TipCard({ tip, onSave, onRemove }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {tip.category === "nutrition" ? (
              <Lightbulb className="h-5 w-5 text-primary" />
            ) : tip.category === "fitness" ? (
              <Zap className="h-5 w-5 text-primary" />
            ) : (
              <Brain className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-muted">
            {tip.category === "nutrition" ? "Nutrition" : tip.category === "fitness" ? "Fitness" : "Mental Wellness"}
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{tip.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{tip.description}</p>
      </CardContent>
      <CardFooter>
        {tip.saved ? (
          <Button variant="outline" className="w-full" onClick={() => onRemove(tip.id)}>
            Remove from Saved
          </Button>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => onSave(tip.id)}>
            Save Tip
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
