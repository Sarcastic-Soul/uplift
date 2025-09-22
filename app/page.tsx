import { Button } from "@/components/ui/button";
import {
  Card,
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
  ArrowRight,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Uplift</h1>
          </div>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Your Mental Health Journey Starts Here
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Uplift provides personalized tools and support to help you track
            your mood, reflect through journaling, and build lasting mental
            wellness habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignUpButton>
                <Button size="lg" className="text-lg px-8">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/dashboard">
                  Go to Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </SignedIn>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything You Need for Mental Wellness
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Daily Mood Tracker</CardTitle>
                <CardDescription>
                  Log your emotions and discover patterns in your mental health
                  journey
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Private Journaling</CardTitle>
                <CardDescription>
                  Reflect and process your thoughts in a safe, private space
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI Voice Therapist</CardTitle>
                <CardDescription>
                  Get personalized support through our AI-powered therapy
                  assistant
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Gamepad2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Wellness Games</CardTitle>
                <CardDescription>
                  Engage in fun activities designed to reduce stress and boost
                  mood
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Myth Buster</CardTitle>
                <CardDescription>
                  Learn the facts and dispel common mental health misconceptions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Inspiring Stories</CardTitle>
                <CardDescription>
                  Read recovery journeys and find hope in shared experiences
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Mental Health?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have found support, healing, and growth
            with Uplift.
          </p>
          <SignedOut>
            <SignUpButton>
              <Button size="lg" className="text-lg px-12">
                Get Started Today
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button size="lg" className="text-lg px-12" asChild>
              <Link href="/dashboard">Continue Your Journey</Link>
            </Button>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              Uplift
            </span>
          </div>
          <p className="text-muted-foreground">
            Supporting your mental health journey, one day at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
