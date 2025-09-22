"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Brain, BookOpen, Gamepad2, Lightbulb, Star, BarChart3, Menu, Home, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Mood Tracker", href: "/mood-tracker", icon: BarChart3 },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "AI Therapist", href: "/ai-therapist", icon: Brain },
  { name: "Wellness Games", href: "/games", icon: Gamepad2 },
  { name: "Myth Buster", href: "/myth-buster", icon: Lightbulb },
  { name: "Success Stories", href: "/stories", icon: Star },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-2xl font-bold text-foreground">Uplift</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="flex-shrink-0 px-2 space-y-1">
            <Link
              href="/profile"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <User className="mr-3 h-5 w-5 flex-shrink-0" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              Settings
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Uplift</h1>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center mb-8">
                <Heart className="h-8 w-8 text-primary" />
                <h1 className="ml-2 text-2xl font-bold text-foreground">Uplift</h1>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  )
                })}
                <div className="pt-4 mt-4 border-t border-border">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <User className="mr-3 h-5 w-5 flex-shrink-0" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
                    Settings
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}
