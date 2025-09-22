"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, Plus, Search, Calendar, Heart, Lightbulb, Save, Edit } from "lucide-react"

// Mock journal entries
const mockEntries = [
  {
    id: 1,
    title: "A Great Day at Work",
    content:
      "Today was really productive. I finished the project I've been working on for weeks, and my team was really supportive. Feeling grateful for the positive work environment.",
    date: "2024-01-15",
    mood: 8,
    tags: ["work", "gratitude", "productivity"],
  },
  {
    id: 2,
    title: "Feeling Anxious",
    content:
      "Had some anxiety today about the upcoming presentation. Tried some breathing exercises which helped a bit. Need to remember that it's normal to feel nervous before big events.",
    date: "2024-01-14",
    mood: 5,
    tags: ["anxiety", "work", "coping"],
  },
  {
    id: 3,
    title: "Weekend Reflections",
    content:
      "Spent quality time with family this weekend. We went for a hike and had a picnic. These moments remind me what's truly important in life. Feeling recharged for the week ahead.",
    date: "2024-01-13",
    mood: 9,
    tags: ["family", "nature", "gratitude"],
  },
]

const journalPrompts = [
  "What am I grateful for today?",
  "What challenged me today and how did I handle it?",
  "What made me smile today?",
  "What would I like to improve about today?",
  "What am I looking forward to tomorrow?",
  "How did I take care of myself today?",
  "What emotions did I experience today?",
  "What did I learn about myself today?",
]

export default function JournalPage() {
  const [entries, setEntries] = useState(mockEntries)
  const [isWriting, setIsWriting] = useState(false)
  const [newEntry, setNewEntry] = useState({ title: "", content: "", tags: [] as string[] })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState("")

  const handleSaveEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: entries.length + 1,
        title: newEntry.title,
        content: newEntry.content,
        date: new Date().toISOString().split("T")[0],
        mood: 7, // Default mood, could be selected
        tags: newEntry.tags,
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: "", content: "", tags: [] })
      setIsWriting(false)
    }
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getMoodEmoji = (mood: number) => {
    const emojis = { 1: "😢", 2: "😟", 3: "😕", 4: "😐", 5: "🙂", 6: "😊", 7: "😄", 8: "😁", 9: "🤩", 10: "🥳" }
    return emojis[mood as keyof typeof emojis] || "😊"
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Journal</h1>
          <p className="text-muted-foreground">Your private space for reflection and self-discovery.</p>
        </div>
        <Button onClick={() => setIsWriting(true)} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>

      {/* Writing Interface */}
      {isWriting && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Write New Entry
            </CardTitle>
            <CardDescription>Express your thoughts and feelings in a safe, private space.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Journal Prompts */}
            <div>
              <Label className="text-base font-medium mb-3 block">Need inspiration? Try a prompt:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {journalPrompts.slice(0, 4).map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-3 text-wrap bg-transparent"
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    <Lightbulb className="mr-2 h-4 w-4 flex-shrink-0" />
                    {prompt}
                  </Button>
                ))}
              </div>
              {selectedPrompt && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Selected prompt:</p>
                  <p className="font-medium">{selectedPrompt}</p>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPrompt("")} className="mt-2">
                    Clear prompt
                  </Button>
                </div>
              )}
            </div>

            {/* Entry Title */}
            <div>
              <Label htmlFor="entry-title" className="text-base font-medium mb-2 block">
                Entry Title
              </Label>
              <Input
                id="entry-title"
                placeholder="Give your entry a title..."
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              />
            </div>

            {/* Entry Content */}
            <div>
              <Label htmlFor="entry-content" className="text-base font-medium mb-2 block">
                Your Thoughts
              </Label>
              <Textarea
                id="entry-content"
                placeholder={selectedPrompt || "What's on your mind today? Write freely..."}
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="min-h-[200px]"
              />
            </div>

            {/* Tags */}
            <div>
              <Label className="text-base font-medium mb-2 block">Tags (Optional)</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {["gratitude", "anxiety", "work", "family", "health", "goals", "reflection", "growth"].map((tag) => (
                  <Badge
                    key={tag}
                    variant={newEntry.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => {
                      const updatedTags = newEntry.tags.includes(tag)
                        ? newEntry.tags.filter((t) => t !== tag)
                        : [...newEntry.tags, tag]
                      setNewEntry({ ...newEntry, tags: updatedTags })
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSaveEntry} disabled={!newEntry.title || !newEntry.content}>
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
              <Button variant="outline" onClick={() => setIsWriting(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Filter by Date
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Journal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{entries.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Writing Streak</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">5 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7.3/10</div>
            <p className="text-xs text-muted-foreground">From entries</p>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Your Entries</h2>
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No entries found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms." : "Start your journaling journey today!"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsWriting(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Write Your First Entry
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{entry.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <span className="ml-2">{getMoodEmoji(entry.mood)}</span>
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{entry.title}</DialogTitle>
                          <DialogDescription>
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-foreground leading-relaxed">{entry.content}</p>
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{entry.content}</p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
