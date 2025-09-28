"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Home,
  FolderTree,
  Warehouse,
  Ticket,
  Star,
  FileText,
  BookOpen,
  FileBarChart,
  TrendingUp,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Warehouse,
  },
  {
    title: "Coupons",
    href: "/admin/coupons",
    icon: Ticket,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Digital Files",
    href: "/admin/digital-files",
    icon: FileText,
  },
  {
    title: "Articles",
    href: "/admin/articles",
    icon: BookOpen,
  },
  {
    title: "Marketing",
    href: "/admin/marketing",
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileBarChart,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <span className="font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-green-600">SHEET88</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Store
          </Link>

          <div className="border-t pt-4 mt-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
