"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Home,
  Menu,
  Plus,
  Settings,
  Target,
  Utensils,
  Dumbbell,
  Droplet,
  Moon,
  Brain,
} from "lucide-react"

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Goals",
    href: "/dashboard/goals",
    icon: <Target className="h-5 w-5" />,
  },
]

const healthLogNavItems = [
  {
    title: "Food Log",
    href: "/dashboard/logs/food",
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    title: "Water Log",
    href: "/dashboard/logs/water",
    icon: <Droplet className="h-5 w-5" />,
  },
  {
    title: "Workout Log",
    href: "/dashboard/logs/workout",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    title: "Sleep Log",
    href: "/dashboard/logs/sleep",
    icon: <Moon className="h-5 w-5" />,
  },
  {
    title: "Wellness Tips",
    href: "/dashboard/wellness-tips",
    icon: <Brain className="h-5 w-5" />,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <MobileSidebar pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <aside className="hidden w-[240px] flex-col border-r bg-background md:flex">
        <DesktopSidebar pathname={pathname} />
      </aside>
    </>
  )
}

function MobileSidebar({ pathname, setOpen }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="font-bold text-xs text-white">H</span>
          </div>
          <span className="font-semibold">HealthTrackr</span>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          <div className="mb-4 px-4">
            <Button asChild className="w-full justify-start gap-2" size="sm">
              <Link href="/dashboard/logs/new" onClick={() => setOpen(false)}>
                <Plus className="h-4 w-4" />
                <span>New Log Entry</span>
              </Link>
            </Button>
          </div>
          <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Main</div>
          <nav className="grid gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-muted-foreground">Health Logs</div>
          <nav className="grid gap-1">
            {healthLogNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Link
          href="/dashboard/settings"
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard/settings" && "bg-accent text-accent-foreground",
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )
}

function DesktopSidebar({ pathname }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="font-bold text-xs text-white">H</span>
          </div>
          <span className="font-semibold">HealthTrackr</span>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          <div className="mb-4 px-4">
            <Button asChild className="w-full justify-start gap-2" size="sm">
              <Link href="/dashboard/logs/new">
                <Plus className="h-4 w-4" />
                <span>New Log Entry</span>
              </Link>
            </Button>
          </div>
          <div className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Main</div>
          <nav className="grid gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-muted-foreground">Health Logs</div>
          <nav className="grid gap-1">
            {healthLogNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard/settings" && "bg-accent text-accent-foreground",
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )
}
