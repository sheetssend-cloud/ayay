"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, User, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  tags: string[]
  author: string
  publishDate: string
  views: number
  readTime: number
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "เทคนิคการเตรียมตัวสอบ GAT ให้ได้คะแนนสูง",
    slug: "gat-exam-preparation-tips",
    excerpt: "เทคนิคและวิธีการเตรียมตัวสอบ GAT ที่จะช่วยให้คุณได้คะแนนสูงในการสอบ รวมถึงการจัดการเวลาและการทบทวนที่มีประสิทธิภาพ",
    content: "เนื้อหาบทความแบบเต็ม...",
    featuredImage: "/gat-exam-preparation-books.jpg",
    category: "เทคนิคการสอบ",
    tags: ["GAT", "เทคนิคการสอบ", "การเตรียมตัว"],
    author: "ทีมงาน SHEET88",
    publishDate: "2024-01-15",
    views: 1250,
    readTime: 8,
  },
  {
    id: "2",
    title: "แนวข้อสอบ PAT คณิตศาสตร์ ปี 2024",
    slug: "pat-math-exam-2024",
    excerpt: "รวมแนวข้อสอบ PAT คณิตศาสตร์ล่าสุด พร้อมเฉลยและคำอธิบายละเอียด ช่วยให้นักเรียนเข้าใจรูปแบบข้อสอบมากขึ้น",
    content: "เนื้อหาบทความแบบเต็ม...",
    featuredImage: "/pat-mathematics-exam-questions.jpg",
    category: "แนวข้อสอบ",
    tags: ["PAT", "คณิตศาสตร์", "แนวข้อสอบ"],
    author: "อาจารย์สมชาย",
    publishDate: "2024-01-20",
    views: 890,
    readTime: 12,
  },
  {
    id: "3",
    title: "วิธีการจัดการเวลาในการสอบ TGAT อย่างมีประสิทธิภาพ",
    slug: "tgat-time-management-tips",
    excerpt: "เทคนิคการจัดการเวลาในการสอบ TGAT ที่จะช่วยให้คุณทำข้อสอบได้ครบทุกข้อและได้คะแนนสูงสุด",
    content: "เนื้อหาบทความแบบเต็ม...",
    featuredImage: "/tgat-exam-time-management.jpg",
    category: "เทคนิคการสอบ",
    tags: ["TGAT", "การจัดการเวลา", "เทคนิคการสอบ"],
    author: "อาจารย์สมหญิง",
    publishDate: "2024-01-25",
    views: 675,
    readTime: 6,
  },
  {
    id: "4",
    title: "รีวิวหนังสือเตรียมสอบ TPAT ฟิสิกส์ เล่มใหม่ล่าสุด",
    slug: "tpat-physics-book-review-2024",
    excerpt: "รีวิวหนังสือเตรียมสอบ TPAT ฟิสิกส์เล่มใหม่ล่าสุด วิเคราะห์จุดเด่น จุดด้อย และความเหมาะสมสำหรับนักเรียนแต่ละระดับ",
    content: "เนื้อหาบทความแบบเต็ม...",
    featuredImage: "/tpat-physics-textbook-review.jpg",
    category: "รีวิวหนังสือ",
    tags: ["TPAT", "ฟิสิกส์", "รีวิวหนังสือ"],
    author: "อาจารย์วิทยา",
    publishDate: "2024-01-30",
    views: 542,
    readTime: 10,
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const categories = Array.from(new Set(posts.map((post) => post.category)))

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">บล็อกและบทความ</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">เทคนิคการเตรียมสอบ แนวข้อสอบ และคำแนะนำจากผู้เชี่ยวชาญ</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="ค้นหาบทความ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="เลือกหมวดหมู่" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={filteredPosts[0].featuredImage || "/placeholder.svg"}
                  alt={filteredPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4">{filteredPosts[0].category}</Badge>
                <h2 className="text-3xl font-bold mb-4 text-balance">{filteredPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6 text-pretty">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {filteredPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(filteredPosts[0].publishDate).toLocaleDateString("th-TH")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {filteredPosts[0].views} views
                  </span>
                </div>
                <Link href={`/blog/${filteredPosts[0].slug}`}>
                  <Button className="group">
                    อ่านต่อ
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime} นาที</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-balance">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 text-pretty">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishDate).toLocaleDateString("th-TH")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="group">
                      อ่านต่อ
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">ไม่พบบทความที่ตรงกับการค้นหา</p>
          </div>
        )}
      </div>
    </div>
  )
}
