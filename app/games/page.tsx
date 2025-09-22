"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Play, Pause, RotateCcw, Wind, Heart, Target, Zap, Clock, Trophy, Star, CheckCircle } from "lucide-react"

// Breathing Exercise Component
function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [timeLeft, setTimeLeft] = useState(4)
  const [cycle, setCycle] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const phases = {
    inhale: { duration: 4, next: "hold", instruction: "Breathe In" },
    hold: { duration: 4, next: "exhale", instruction: "Hold" },
    exhale: { duration: 6, next: "inhale", instruction: "Breathe Out" },
  }

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const currentPhase = phases[phase]
            const nextPhase = currentPhase.next as keyof typeof phases
            setPhase(nextPhase)
            if (nextPhase === "inhale") {
              setCycle((c) => c + 1)
            }
            return phases[nextPhase].duration
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, phase])

  const reset = () => {
    setIsActive(false)
    setPhase("inhale")
    setTimeLeft(4)
    setCycle(0)
  }

  const getCircleScale = () => {
    const progress = (phases[phase].duration - timeLeft) / phases[phase].duration
    if (phase === "inhale") return 0.5 + progress * 0.5
    if (phase === "exhale") return 1 - progress * 0.5
    return 1
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Wind className="h-5 w-5 text-primary" />
          Breathing Exercise
        </CardTitle>
        <CardDescription>4-4-6 breathing pattern for relaxation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-48 h-48 mx-auto">
          <div
            className="absolute inset-0 rounded-full bg-primary/20 transition-transform duration-1000 ease-in-out flex items-center justify-center"
            style={{ transform: `scale(${getCircleScale()})` }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{phases[phase].instruction}</p>
              <p className="text-lg text-muted-foreground">{timeLeft}s</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Cycle: {cycle}/5</p>
          <Progress value={(cycle / 5) * 100} className="w-full" />
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => setIsActive(!isActive)} variant={isActive ? "secondary" : "default"}>
            {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Gratitude Game Component
function GratitudeGame() {
  const [gratitudeItems, setGratitudeItems] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const gratitudePrompts = [
    "Something that made you smile today",
    "A person you're thankful for",
    "A small pleasure you enjoyed",
    "Something about your health",
    "A place that brings you peace",
  ]

  const addGratitudeItem = () => {
    if (currentInput.trim() && gratitudeItems.length < 5) {
      setGratitudeItems([...gratitudeItems, currentInput.trim()])
      setCurrentInput("")
      if (gratitudeItems.length === 4) {
        setIsComplete(true)
      }
    }
  }

  const reset = () => {
    setGratitudeItems([])
    setCurrentInput("")
    setIsComplete(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Gratitude Practice
        </CardTitle>
        <CardDescription>List 5 things you're grateful for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={(gratitudeItems.length / 5) * 100} className="w-full" />

        {isComplete ? (
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">Wonderful!</h3>
            <p className="text-muted-foreground">You've completed your gratitude practice for today.</p>
            <div className="space-y-2">
              {gratitudeItems.map((item, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg text-left">
                  <span className="font-medium text-primary">{index + 1}.</span> {item}
                </div>
              ))}
            </div>
            <Button onClick={reset} variant="outline">
              Start Over
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              {gratitudeItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {gratitudeItems.length < 5 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {gratitudePrompts[gratitudeItems.length] || "What else are you grateful for?"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="I'm grateful for..."
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addGratitudeItem()}
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
                  />
                  <Button onClick={addGratitudeItem} disabled={!currentInput.trim()}>
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Focus Game Component
function FocusGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false)
            setGameComplete(true)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const startGame = () => {
    setIsActive(true)
    setScore(0)
    setTimeLeft(30)
    setGameComplete(false)
    moveTarget()
  }

  const moveTarget = () => {
    setTargetPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    })
  }

  const hitTarget = () => {
    if (isActive) {
      setScore(score + 1)
      moveTarget()
    }
  }

  const reset = () => {
    setIsActive(false)
    setScore(0)
    setTimeLeft(30)
    setGameComplete(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Focus Challenge
        </CardTitle>
        <CardDescription>Click the targets to improve concentration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold text-primary">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-bold text-primary">{timeLeft}s</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isActive && !gameComplete && (
              <Button onClick={startGame}>
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            )}
            {(isActive || gameComplete) && (
              <Button onClick={reset} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="relative w-full h-64 bg-muted/30 rounded-lg overflow-hidden">
          {gameComplete ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-lg font-semibold">Game Complete!</h3>
                <p className="text-muted-foreground">Final Score: {score}</p>
                <Badge variant="secondary" className="mt-2">
                  {score >= 20 ? "Excellent!" : score >= 15 ? "Great!" : score >= 10 ? "Good!" : "Keep practicing!"}
                </Badge>
              </div>
            </div>
          ) : (
            isActive && (
              <button
                onClick={hitTarget}
                className="absolute w-8 h-8 bg-primary rounded-full hover:bg-primary/80 transition-colors"
                style={{
                  left: `${targetPosition.x}%`,
                  top: `${targetPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function GamesPage() {
  const [completedToday, setCompletedToday] = useState<string[]>([])

  const games = [
    {
      id: "breathing",
      name: "Breathing Exercise",
      description: "Calm your mind with guided breathing",
      icon: Wind,
      duration: "5 min",
      difficulty: "Easy",
      benefits: ["Reduces anxiety", "Improves focus", "Promotes relaxation"],
    },
    {
      id: "gratitude",
      name: "Gratitude Practice",
      description: "Focus on positive aspects of your life",
      icon: Heart,
      duration: "3 min",
      difficulty: "Easy",
      benefits: ["Boosts mood", "Increases positivity", "Reduces stress"],
    },
    {
      id: "focus",
      name: "Focus Challenge",
      description: "Improve concentration with target practice",
      icon: Target,
      duration: "2 min",
      difficulty: "Medium",
      benefits: ["Enhances focus", "Improves reaction time", "Builds concentration"],
    },
  ]

  const markCompleted = (gameId: string) => {
    if (!completedToday.includes(gameId)) {
      setCompletedToday([...completedToday, gameId])
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Wellness Games</h1>
        <p className="text-muted-foreground">
          Fun, stress-relieving activities designed to improve your mental well-being.
        </p>
      </div>

      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Today's Progress
          </CardTitle>
          <CardDescription>Complete activities to build your wellness streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completedToday.length}/3</div>
              <p className="text-sm text-muted-foreground">Activities Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">42</div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
          <Progress value={(completedToday.length / 3) * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const Icon = game.icon
          const isCompleted = completedToday.includes(game.id)
          return (
            <Card key={game.id} className={`relative ${isCompleted ? "ring-2 ring-primary" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </div>
                  </div>
                  {isCompleted && <CheckCircle className="h-5 w-5 text-primary" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    {game.duration}
                  </Badge>
                  <Badge variant="outline">{game.difficulty}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Benefits:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {game.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      {isCompleted ? "Play Again" : "Start Activity"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        {game.name}
                      </DialogTitle>
                      <DialogDescription>{game.description}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      {game.id === "breathing" && <BreathingExercise />}
                      {game.id === "gratitude" && <GratitudeGame />}
                      {game.id === "focus" && <FocusGame />}
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button onClick={() => markCompleted(game.id)} variant="outline">
                        Mark as Complete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your wellness milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">7-Day Streak</p>
                <p className="text-sm text-muted-foreground">Completed activities daily</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Gratitude Master</p>
                <p className="text-sm text-muted-foreground">50 gratitude entries</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Wind className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Breathing Expert</p>
                <p className="text-sm text-muted-foreground">100 breathing sessions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
