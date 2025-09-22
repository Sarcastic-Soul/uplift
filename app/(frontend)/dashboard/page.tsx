import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Brain,
  BookOpen,
  Gamepad2,
  Lightbulb,
  Star,
  Calendar,
  Smile,
  TrendingUp,
  Target,
} from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.firstName}!
        </h2>
        <p className="text-muted-foreground">
          How are you feeling today? Let's continue your wellness journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Streak
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Average</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7.2/10</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Journal Entries
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">85%</div>
            <p className="text-xs text-muted-foreground">5/7 days completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Mood */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Today's Mood Check
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Mood Scale</span>
                <span className="text-sm text-muted-foreground">1-10</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    variant={num === 7 ? "default" : "outline"}
                    size="sm"
                    className="w-10 h-10"
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <Button className="w-full" asChild>
                <Link href="/mood-tracker">Log Mood & View Trends</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Journal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Quick Journal
            </CardTitle>
            <CardDescription>What's on your mind today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                placeholder="Write your thoughts here..."
                className="w-full h-24 p-3 border border-border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="w-full" asChild>
                <Link href="/journal">Save Entry & View Journal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Navigation */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Explore Your Wellness Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            asChild
          >
            <Link href="/ai-therapist">
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">AI Therapist</CardTitle>
                <CardDescription>Talk to your AI companion</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            asChild
          >
            <Link href="/games">
              <CardHeader className="text-center">
                <Gamepad2 className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Wellness Games</CardTitle>
                <CardDescription>Play stress-relief games</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            asChild
          >
            <Link href="/myth-buster">
              <CardHeader className="text-center">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Myth Buster</CardTitle>
                <CardDescription>Learn mental health facts</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            asChild
          >
            <Link href="/stories">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Success Stories</CardTitle>
                <CardDescription>Find inspiration</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your wellness journey highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Mood logged: 8/10</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Journal entry completed</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  Completed breathing exercise
                </p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
