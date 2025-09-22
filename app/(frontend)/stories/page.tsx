"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Search, Heart, Users, Trophy, BookOpen, Clock, User } from "lucide-react"

interface Story {
  id: string
  title: string
  person: string
  condition: string
  summary: string
  fullStory: string
  category: "Celebrity" | "Community" | "Historical"
  readTime: string
  tags: string[]
  inspiration: string
}

const stories: Story[] = [
  {
    id: "1",
    title: "From Darkness to Light",
    person: "Dwayne 'The Rock' Johnson",
    condition: "Depression",
    summary: "How the world's highest-paid actor overcame depression and found his purpose.",
    fullStory:
      "Dwayne Johnson has been open about his struggles with depression, particularly during his teenage years and early twenties. After his football dreams were crushed by injuries, he found himself battling feelings of worthlessness and despair. Through therapy, support from loved ones, and finding new purpose in wrestling and later acting, he transformed his pain into strength. Today, he uses his platform to encourage others to seek help and break the stigma around mental health.",
    category: "Celebrity",
    readTime: "4 min",
    tags: ["depression", "purpose", "resilience"],
    inspiration: "Your struggles don't define you - how you overcome them does.",
  },
  {
    id: "2",
    title: "Breaking the Silence",
    person: "Simone Biles",
    condition: "Anxiety & Trauma",
    summary: "The gymnastics champion's journey through trauma and prioritizing mental health.",
    fullStory:
      "Simone Biles shocked the world when she withdrew from Olympic events to focus on her mental health. Having survived abuse and dealing with intense pressure, she made the brave decision to prioritize her well-being over competition. Her openness about therapy, medication, and the importance of mental health has inspired countless athletes and individuals to seek help. She returned stronger, winning more medals and becoming an advocate for mental health awareness.",
    category: "Celebrity",
    readTime: "5 min",
    tags: ["anxiety", "trauma", "courage", "therapy"],
    inspiration: "It's okay to not be okay, and it's brave to ask for help.",
  },
  {
    id: "3",
    title: "A Teacher's Transformation",
    person: "Sarah M.",
    condition: "Burnout & Anxiety",
    summary: "How a dedicated teacher learned to manage anxiety and prevent burnout.",
    fullStory:
      "Sarah was a passionate teacher who gave everything to her students, but gradually found herself overwhelmed by anxiety and heading toward burnout. She started experiencing panic attacks and couldn't sleep. Through counseling, mindfulness practices, and learning to set boundaries, she discovered how to maintain her passion for teaching while protecting her mental health. She now mentors other educators on sustainable teaching practices and self-care.",
    category: "Community",
    readTime: "3 min",
    tags: ["burnout", "anxiety", "boundaries", "mindfulness"],
    inspiration: "Taking care of yourself isn't selfish - it's necessary.",
  },
  {
    id: "4",
    title: "The Innovator's Mind",
    person: "Temple Grandin",
    condition: "Autism & Anxiety",
    summary: "How autism became a superpower in revolutionizing animal welfare.",
    fullStory:
      "Temple Grandin was diagnosed with autism at a time when little was understood about the condition. Despite facing social challenges and anxiety, she channeled her unique way of thinking into groundbreaking work in animal science. Her visual thinking abilities allowed her to design more humane livestock facilities. She became a professor, author, and advocate, showing the world that neurological differences can be strengths rather than limitations.",
    category: "Historical",
    readTime: "6 min",
    tags: ["autism", "innovation", "acceptance", "strengths"],
    inspiration: "Different doesn't mean less - it can mean extraordinary.",
  },
  {
    id: "5",
    title: "From Addiction to Advocacy",
    person: "Robert Downey Jr.",
    condition: "Addiction & Depression",
    summary: "The Iron Man star's journey from addiction to becoming a mental health advocate.",
    fullStory:
      "Robert Downey Jr.'s struggles with addiction and depression were highly publicized, leading to multiple arrests and career setbacks. His journey to recovery involved therapy, meditation, and a strong support system. He credits his wife, structured routine, and commitment to personal growth for his transformation. Now one of Hollywood's most successful actors, he openly discusses the importance of mental health and continues to support others in recovery.",
    category: "Celebrity",
    readTime: "5 min",
    tags: ["addiction", "recovery", "support", "transformation"],
    inspiration: "Recovery is possible, and every day is a new chance to grow.",
  },
  {
    id: "6",
    title: "A Student's Strength",
    person: "Marcus T.",
    condition: "Social Anxiety",
    summary: "How a college student overcame social anxiety to become a peer counselor.",
    fullStory:
      "Marcus struggled with severe social anxiety throughout high school, often skipping classes and avoiding social situations. In college, he decided to seek help through the campus counseling center. Through cognitive behavioral therapy and gradual exposure exercises, he learned to manage his anxiety. He joined support groups, made friends, and eventually became a peer counselor, helping other students navigate their mental health challenges.",
    category: "Community",
    readTime: "4 min",
    tags: ["social anxiety", "therapy", "peer support", "growth"],
    inspiration: "Small steps forward are still progress.",
  },
]

const categories = ["All", "Celebrity", "Community", "Historical"]

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [readStories, setReadStories] = useState<string[]>([])

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const markAsRead = (storyId: string) => {
    if (!readStories.includes(storyId)) {
      setReadStories([...readStories, storyId])
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Celebrity":
        return Star
      case "Community":
        return Users
      case "Historical":
        return BookOpen
      default:
        return Heart
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Success Stories</h1>
            <p className="text-muted-foreground">Inspiring journeys of mental health recovery and growth</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stories.length}</div>
            <p className="text-xs text-muted-foreground">Inspiring journeys</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Today</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{readStories.length}</div>
            <p className="text-xs text-muted-foreground">Stories explored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <p className="text-xs text-muted-foreground">Story types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspiration</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">∞</div>
            <p className="text-xs text-muted-foreground">Unlimited hope</p>
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
                placeholder="Search stories by person, condition, or theme..."
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

      {/* Stories Grid */}
      <div className="space-y-6">
        {filteredStories.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No stories found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStories.map((story) => {
              const CategoryIcon = getCategoryIcon(story.category)
              const isRead = readStories.includes(story.id)

              return (
                <Card key={story.id} className={`relative ${isRead ? "ring-2 ring-primary/20" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                          <Badge variant="outline">{story.category}</Badge>
                          <Badge variant="secondary">{story.condition}</Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">{story.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <User className="h-3 w-3" />
                          {story.person}
                        </CardDescription>
                      </div>
                      {isRead && <Heart className="h-5 w-5 text-primary flex-shrink-0" />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{story.summary}</p>

                    <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                      <p className="text-sm font-medium text-primary italic">"{story.inspiration}"</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{story.readTime} read</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          markAsRead(story.id)
                          // In a real app, this would open a detailed view
                        }}
                      >
                        Read Full Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Inspiration Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
            You Are Not Alone
          </CardTitle>
          <CardDescription className="text-center">
            Every story here represents hope, resilience, and the possibility of healing.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            These stories remind us that mental health challenges are part of the human experience, and recovery is
            possible. Whether you're just starting your journey or supporting someone else, remember that seeking help
            is a sign of strength, not weakness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Find Support Resources</Button>
            <Button variant="outline">Share Your Story</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
