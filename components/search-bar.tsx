"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/lib/products"

interface SearchBarProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  searchQuery: string
  selectedCategory: string
}

export function SearchBar({ onSearch, onCategoryChange, searchQuery, selectedCategory }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localQuery)
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="ค้นหาหนังสือ แนวข้อสอบ หรือหมวดหมู่..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">ค้นหา</Button>
        </div>

        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="เลือกหมวดหมู่" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  )
}
