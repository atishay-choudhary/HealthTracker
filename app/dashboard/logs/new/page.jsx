"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Utensils, Droplet, Dumbbell, Moon } from "lucide-react"

export default function NewLogPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("food")

  const handleSubmit = (e) => {
    e.preventDefault()

    toast({
      title: "Log entry created",
      description: `Your ${activeTab} log has been saved successfully.`,
    })

    router.push("/dashboard")
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">New Health Log</h1>

      <Tabs defaultValue="food" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="food" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Food</span>
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center gap-2">
            <Droplet className="h-4 w-4" />
            <span className="hidden sm:inline">Water</span>
          </TabsTrigger>
          <TabsTrigger value="workout" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Workout</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Sleep</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="food">
          <Card>
            <CardHeader>
              <CardTitle>Food Log</CardTitle>
              <CardDescription>Record your meal or snack details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <Select defaultValue="breakfast">
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="food-name">Food Name</Label>
                  <Input id="food-name" placeholder="e.g., Oatmeal with berries" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input id="calories" type="number" placeholder="e.g., 350" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portion">Portion Size</Label>
                    <Input id="portion" placeholder="e.g., 1 bowl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="food-notes">Notes</Label>
                  <Textarea id="food-notes" placeholder="Add any additional details about this meal" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save Food Log</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="water">
          <Card>
            <CardHeader>
              <CardTitle>Water Log</CardTitle>
              <CardDescription>Track your water intake</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Amount (ml)</Label>
                  <div className="flex items-center gap-4">
                    <Slider defaultValue={[250]} max={1000} step={50} className="flex-1" />
                    <Input type="number" className="w-20" defaultValue={250} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-type">Type</Label>
                  <Select defaultValue="water">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="sparkling">Sparkling Water</SelectItem>
                      <SelectItem value="tea">Tea</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-notes">Notes</Label>
                  <Textarea id="water-notes" placeholder="Add any additional details" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save Water Log</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="workout">
          <Card>
            <CardHeader>
              <CardTitle>Workout Log</CardTitle>
              <CardDescription>Record your exercise activity</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workout-type">Workout Type</Label>
                  <Select defaultValue="cardio">
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-name">Activity Name</Label>
                  <Input id="workout-name" placeholder="e.g., Running, Yoga, Weight lifting" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="e.g., 45" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calories-burned">Calories Burned</Label>
                    <Input id="calories-burned" type="number" placeholder="e.g., 300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intensity">Intensity</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="intense">Intense</SelectItem>
                      <SelectItem value="very-intense">Very Intense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout-notes">Notes</Label>
                  <Textarea id="workout-notes" placeholder="Add any additional details about this workout" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save Workout Log</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Log</CardTitle>
              <CardDescription>Track your sleep duration and quality</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sleep-start">Bedtime</Label>
                    <Input id="sleep-start" type="time" defaultValue="22:30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleep-end">Wake Time</Label>
                    <Input id="sleep-end" type="time" defaultValue="06:30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sleep Quality</Label>
                  <Select defaultValue="good">
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mood Upon Waking</Label>
                  <Select defaultValue="refreshed">
                    <SelectTrigger>
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tired">Tired</SelectItem>
                      <SelectItem value="groggy">Groggy</SelectItem>
                      <SelectItem value="refreshed">Refreshed</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep-notes">Notes</Label>
                  <Textarea id="sleep-notes" placeholder="Add any additional details about your sleep" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save Sleep Log</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
