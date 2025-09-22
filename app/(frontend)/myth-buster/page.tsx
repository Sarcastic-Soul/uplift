"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Lightbulb, Search, Check, AlertTriangle, BookOpen, Users, Brain, Heart, Shield } from "lucide-react"

interface MythFact {
  id: string
  myth: string
  fact: string
  category: string
  sources: string[]
  readTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
}

const mythsData: MythFact[] = [
  {
    id: "1",
    myth: "Mental health problems are a sign of weakness",
    fact: "Mental health conditions are medical conditions, just like diabetes or heart disease. They are not a sign of weakness or a character flaw. They can affect anyone regardless of age, gender, race, or background.",
    category: "General",
    sources: ["National Institute of Mental Health", "World Health Organization"],
    readTime: "2 min",
    difficulty: "Beginner",
    tags: ["stigma", "strength", "medical"],
  },
  {
    id: "2",
    myth: "Therapy is only for people with serious mental illness",
    fact: "Therapy can benefit anyone who wants to improve their mental health, develop coping skills, or work through life challenges. You don't need to have a diagnosed mental illness to benefit from therapy.",
    category: "Treatment",
    sources: ["American Psychological Association", "Mental Health America"],
    readTime: "3 min",
    difficulty: "Beginner",
    tags: ["therapy", "treatment", "prevention"],
  },
  {
    id: "3",
    myth: "Antidepressants change your personality",
    fact: "When properly prescribed and monitored, antidepressants help restore normal brain chemistry and can help you feel more like yourself again. They don't change your core personality traits.",
    category: "Medication",
    sources: ["Mayo Clinic", "Harvard Medical School"],
    readTime: "4 min",
    difficulty: "Intermediate",
    tags: ["medication", "antidepressants", "personality"],
  },
  {
    id: "4",
    myth: "Children don't experience mental health problems",
    fact: "Mental health conditions can affect children and adolescents. In fact, 50% of all lifetime mental health disorders begin by age 14. Early intervention is crucial for better outcomes.",
    category: "Age Groups",
    sources: ["CDC", "National Alliance on Mental Illness"],
    readTime: "3 min",
    difficulty: "Beginner",
    tags: ["children", "adolescents", "early intervention"],
  },
  {
    id: "5",
    myth: "People with mental illness are violent and dangerous",
    fact: "The vast majority of people with mental health conditions are not violent. In fact, they are more likely to be victims of violence than perpetrators. Only 3-5% of violent acts are committed by people with serious mental illness.",
    category: "Stigma",
    sources: ["National Institute of Mental Health", "Treatment Advocacy Center"],
    readTime: "4 min",
    difficulty: "Intermediate",
    tags: ["violence", "stigma", "safety"],
  },
  {
    id: "6",
    myth: "Mental health problems are permanent",
    fact: "With proper treatment and support, people with mental health conditions can and do recover. Many people live full, productive lives while managing their mental health conditions.",
    category: "Recovery",
    sources: ["SAMHSA", "National Alliance on Mental Illness"],
    readTime: "3 min",
    difficulty: "Beginner",
    tags: ["recovery", "treatment", "hope"],
  },
]

const categories = ["All", "General", "Treatment", "Medication", "Age Groups", "Stigma", "Recovery"]

export default function MythBusterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [readMyths, setReadMyths] = useState<string[]>([])

  const filteredMyths = mythsData.filter((myth) => {
    const matchesSearch =
      myth.myth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      myth.fact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      myth.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || myth.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const markAsRead = (mythId: string) => {
    if (!readMyths.includes(mythId)) {
      setReadMyths([...readMyths, mythId])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "General":
        return Brain
      case "Treatment":
        return Heart
      case "Medication":
        return Shield
      case "Age Groups":
        return Users
      case "Stigma":
        return AlertTriangle
      case "Recovery":
        return Check
      default:
        return BookOpen
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Myth Buster</h1>
            <p className="text-muted-foreground">Separating mental health facts from fiction</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Myths</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mythsData.length}</div>
            <p className="text-xs text-muted-foreground">Debunked for you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{readMyths.length}</div>
            <p className="text-xs text-muted-foreground">Keep learning!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <p className="text-xs text-muted-foreground">Topics covered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round((readMyths.length / mythsData.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Myths explored</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search myths and facts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Myths Grid */}
      <div className="space-y-6">
        {filteredMyths.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No myths found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMyths.map((mythFact) => {
              const CategoryIcon = getCategoryIcon(mythFact.category)
              const isRead = readMyths.includes(mythFact.id)

              return (
                <Card key={mythFact.id} className={`relative ${isRead ? "ring-2 ring-primary/20" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                          <Badge variant="outline">{mythFact.category}</Badge>
                          <Badge className={getDifficultyColor(mythFact.difficulty)} variant="secondary">
                            {mythFact.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          <span className="text-destructive">Myth:</span> {mythFact.myth}
                        </CardTitle>
                      </div>
                      {isRead && <Check className="h-5 w-5 text-primary flex-shrink-0" />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-primary mb-2">The Truth:</p>
                      <p className="text-muted-foreground leading-relaxed">{mythFact.fact}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mythFact.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{mythFact.readTime} read</span>
                        <span>{mythFact.sources.length} sources</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => markAsRead(mythFact.id)}>
                            Learn More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-left leading-tight">
                              <span className="text-destructive">Myth:</span> {mythFact.myth}
                            </DialogTitle>
                            <DialogDescription className="text-left">
                              Category: {mythFact.category} • {mythFact.readTime} read
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                <Check className="h-4 w-4" />
                                The Truth
                              </h3>
                              <p className="text-foreground leading-relaxed">{mythFact.fact}</p>
                            </div>

                            <div>
                              <h3 className="font-semibold text-foreground mb-3">Why This Matters</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                Understanding the truth about mental health helps reduce stigma and encourages people to
                                seek help when needed. Misconceptions can prevent individuals from getting the support
                                they deserve and can perpetuate harmful stereotypes.
                              </p>
                            </div>

                            <div>
                              <h3 className="font-semibold text-foreground mb-3">Reliable Sources</h3>
                              <ul className="space-y-2">
                                {mythFact.sources.map((source, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Shield className="h-3 w-3 text-primary" />
                                    {source}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {mythFact.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Educational Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Additional Resources
          </CardTitle>
          <CardDescription>Learn more about mental health from trusted sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">National Institute of Mental Health</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive information about mental health conditions and treatments.
              </p>
              <Button variant="outline" size="sm">
                Visit NIMH
              </Button>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Mental Health America</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Resources for mental health advocacy and community support.
              </p>
              <Button variant="outline" size="sm">
                Visit MHA
              </Button>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">World Health Organization</h3>
              <p className="text-sm text-muted-foreground mb-3">Global perspective on mental health and well-being.</p>
              <Button variant="outline" size="sm">
                Visit WHO
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
