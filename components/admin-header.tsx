"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
