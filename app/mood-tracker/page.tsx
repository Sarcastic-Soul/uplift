"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, TrendingUp, Smile, Heart, Save, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data for the chart
const moodData = [
  { date: "Mon", mood: 6, day: "Monday" },
  { date: "Tue", mood: 7, day: "Tuesday" },
  { date: "Wed", mood: 5, day: "Wednesday" },
  { date: "Thu", mood: 8, day: "Thursday" },
  { date: "Fri", mood: 7, day: "Friday" },
  { date: "Sat", mood: 9, day: "Saturday" },
  { date: "Sun", mood: 8, day: "Sunday" },
]

const weeklyData = [
  { week: "Week 1", average: 6.5 },
  { week: "Week 2", average: 7.2 },
  { week: "Week 3", average: 6.8 },
  { week: "Week 4", average: 7.5 },
]

const moodEmojis = {
  1: "😢",
  2: "😟",
  3: "😕",
  4: "😐",
  5: "🙂",
  6: "😊",
  7: "😄",
  8: "😁",
  9: "🤩",
  10: "🥳",
}

const moodLabels = {
  1: "Terrible",
  2: "Very Bad",
  3: "Bad",
  4: "Poor",
  5: "Okay",
  6: "Good",
  7: "Great",
  8: "Excellent",
  9: "Amazing",
  10: "Perfect",
}

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodNote, setMoodNote] = useState("")
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])

  const moodFactors = [
    "Sleep",
    "Exercise",
    "Work",
    "Relationships",
    "Weather",
    "Health",
    "Social",
    "Stress",
    "Diet",
    "Meditation",
    "Family",
    "Hobbies",
  ]

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) => (prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]))
  }

  const handleSaveMood = () => {
    if (selectedMood) {
      // Here you would save to your database
      console.log("Saving mood:", { mood: selectedMood, note: moodNote, factors: selectedFactors })
      // Reset form
      setSelectedMood(null)
      setMoodNote("")
      setSelectedFactors([])
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Track your daily emotions and discover patterns in your mental health journey.
        </p>
      </div>

      {/* Today's Mood Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>
            Select your current mood and add any notes or factors that might be influencing it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Scale */}
          <div>
            <Label className="text-base font-medium mb-4 block">Mood Scale (1-10)</Label>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  className="h-16 flex flex-col gap-1 text-xs"
                  onClick={() => setSelectedMood(mood)}
                >
                  <span className="text-lg">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
                  <span>{mood}</span>
                </Button>
              ))}
            </div>
            {selectedMood && (
              <p className="text-center mt-2 text-sm text-muted-foreground">
                You're feeling{" "}
                <span className="font-medium text-foreground">
                  {moodLabels[selectedMood as keyof typeof moodLabels]}
                </span>
              </p>
            )}
          </div>

          {/* Mood Factors */}
          <div>
            <Label className="text-base font-medium mb-4 block">What's affecting your mood? (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {moodFactors.map((factor) => (
                <Badge
                  key={factor}
                  variant={selectedFactors.includes(factor) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => toggleFactor(factor)}
                >
                  {factor}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mood Note */}
          <div>
            <Label htmlFor="mood-note" className="text-base font-medium mb-2 block">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="mood-note"
              placeholder="What's on your mind? Any specific thoughts or events affecting your mood today?"
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleSaveMood} disabled={!selectedMood} className="w-full" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save Today's Mood
          </Button>
        </CardContent>
      </Card>

      {/* Mood Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              This Week's Trend
            </CardTitle>
            <CardDescription>Your daily mood patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-muted-foreground" />
                <YAxis domain={[1, 10]} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload
                    return data ? `${data.day}` : label
                  }}
                  formatter={(value: any) => [`${value}/10 - ${moodLabels[value as keyof typeof moodLabels]}`, "Mood"]}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Monthly Overview
            </CardTitle>
            <CardDescription>Weekly averages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-muted-foreground" />
                <YAxis domain={[1, 10]} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any) => [`${value}/10`, "Average Mood"]}
                />
                <Bar dataKey="average" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Mood Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average This Week</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7.2/10</div>
            <p className="text-xs text-muted-foreground">+0.5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Day</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Saturday</div>
            <p className="text-xs text-muted-foreground">9/10 mood score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7 days</div>
            <p className="text-xs text-muted-foreground">Keep logging daily!</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Entries</CardTitle>
          <CardDescription>Your last few mood logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodData
              .slice(-3)
              .reverse()
              .map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{moodEmojis[entry.mood as keyof typeof moodEmojis]}</span>
                    <div>
                      <p className="font-medium">{entry.day}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.mood}/10 - {moodLabels[entry.mood as keyof typeof moodLabels]}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{entry.mood}/10</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
