"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, Calendar, Search } from "lucide-react"
import { getFromStorage, saveToStorage } from "@/lib/data-store"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  tags: string[]
  author: string
  status: "draft" | "published" | "scheduled"
  publishDate: string
  views: number
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  createdAt: string
  updatedAt: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    status: "draft" as const,
    publishDate: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [] as string[],
  })

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const storedArticles = getFromStorage<Article[]>("articles", [])
        if (storedArticles.length === 0) {
          // Initialize with default articles
          const defaultArticles: Article[] = [
            {
              id: "1",
              title: "เทคนิคการเตรียมตัวสอบ GAT ให้ได้คะแนนสูง",
              slug: "gat-exam-preparation-tips",
              excerpt: "เทคนิคและวิธีการเตรียมตัวสอบ GAT ที่จะช่วยให้คุณได้คะแนนสูงในการสอบ",
              content: "เนื้อหาบทความแบบเต็ม...",
              featuredImage: "/images/gat-tips.jpg",
              category: "เทคนิคการสอบ",
              tags: ["GAT", "เทคนิคการสอบ", "การเตรียมตัว"],
              author: "ทีมงาน SHEET88",
              status: "published",
              publishDate: "2024-01-15",
              views: 1250,
              seoTitle: "เทคนิคการเตรียมตัวสอบ GAT ให้ได้คะแนนสูง | SHEET88",
              seoDescription: "เรียนรู้เทคนิคการเตรียมตัวสอบ GAT ที่มีประสิทธิภาพ พร้อมคำแนะนำจากผู้เชี่ยวชาญ",
              seoKeywords: ["GAT", "เตรียมสอบ", "เทคนิคการสอบ", "คะแนนสูง"],
              createdAt: "2024-01-10",
              updatedAt: "2024-01-15",
            },
            {
              id: "2",
              title: "แนวข้อสอบ PAT คณิตศาสตร์ ปี 2024",
              slug: "pat-math-exam-2024",
              excerpt: "รวมแนวข้อสอบ PAT คณิตศาสตร์ล่าสุด พร้อมเฉลยและคำอธิบาย",
              content: "เนื้อหาบทความแบบเต็ม...",
              featuredImage: "/images/pat-math.jpg",
              category: "แนวข้อสอบ",
              tags: ["PAT", "คณิตศาสตร์", "แนวข้อสอบ"],
              author: "อาจารย์สมชาย",
              status: "draft",
              publishDate: "2024-02-01",
              views: 0,
              seoTitle: "แนวข้อสอบ PAT คณิตศาสตร์ ปี 2024 พร้อมเฉลย | SHEET88",
              seoDescription: "ดาวน์โหลดแนวข้อสอบ PAT คณิตศาสตร์ล่าสุด พร้อมเฉลยและคำอธิบายละเอียด",
              seoKeywords: ["PAT", "คณิตศาสตร์", "แนวข้อสอบ", "เฉลย"],
              createdAt: "2024-01-20",
              updatedAt: "2024-01-25",
            },
          ]
          saveToStorage("articles", defaultArticles)
          setArticles(defaultArticles)
        } else {
          setArticles(storedArticles)
        }
      } catch (error) {
        console.error("Error loading articles:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadArticles()
  }, [])

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="จัดการบทความ" description="สร้างและจัดการบทความเพื่อการตลาด" />
          <main className="p-6">
            <div className="text-center">กำลังโหลด...</div>
          </main>
        </div>
      </div>
    )
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingArticle) {
        const updatedArticles = articles.map((article) =>
          article.id === editingArticle.id
            ? {
                ...editingArticle,
                ...formData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : article,
        )
        setArticles(updatedArticles)
        saveToStorage("articles", updatedArticles)
      } else {
        const newArticle: Article = {
          id: Date.now().toString(),
          ...formData,
          featuredImage: "/images/default-article.jpg",
          author: "ทีมงาน SHEET88",
          views: 0,
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        }
        const updatedArticles = [...articles, newArticle]
        setArticles(updatedArticles)
        saveToStorage("articles", updatedArticles)
      }
    } catch (error) {
      console.error("Error saving article:", error)
    }
    setIsDialogOpen(false)
    setEditingArticle(null)
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      status: "draft",
      publishDate: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      seoTitle: title + " | SHEET88",
    })
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags,
      status: article.status,
      publishDate: article.publishDate,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      seoKeywords: article.seoKeywords,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedArticles = articles.filter((article) => article.id !== id)
    setArticles(updatedArticles)
    saveToStorage("articles", updatedArticles)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">เผยแพร่แล้ว</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">ร่าง</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">กำหนดเผยแพร่</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="จัดการบทความ" description="สร้างและจัดการบทความเพื่อการตลาด" />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">บทความและบล็อก</h2>
              <p className="text-muted-foreground">สร้างเนื้อหาเพื่อดึงดูดลูกค้าและปรับปรุง SEO</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  เขียนบทความใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingArticle ? "แก้ไขบทความ" : "เขียนบทความใหม่"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="title">หัวข้อบทความ</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="หัวข้อบทความที่น่าสนใจ"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="url-friendly-slug"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">หมวดหมู่</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหมวดหมู่" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="เทคนิคการสอบ">เทคนิคการสอบ</SelectItem>
                          <SelectItem value="แนวข้อสอบ">แนวข้อสอบ</SelectItem>
                          <SelectItem value="ข่าวสาร">ข่าวสาร</SelectItem>
                          <SelectItem value="คำแนะนำ">คำแนะนำ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="excerpt">สรุปบทความ</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="สรุปสั้นๆ ของบทความ"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">เนื้อหาบทความ</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="เขียนเนื้อหาบทความที่นี่..."
                      rows={10}
                      className="min-h-[200px]"
                    />
                  </div>

                  {/* SEO Section */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">การตั้งค่า SEO</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="seoTitle">SEO Title</Label>
                        <Input
                          id="seoTitle"
                          value={formData.seoTitle}
                          onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                          placeholder="หัวข้อสำหรับ Search Engine"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          ความยาวที่แนะนำ: 50-60 ตัวอักษร (ปัจจุบัน: {formData.seoTitle.length})
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="seoDescription">SEO Description</Label>
                        <Textarea
                          id="seoDescription"
                          value={formData.seoDescription}
                          onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                          placeholder="คำอธิบายสำหรับ Search Engine"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          ความยาวที่แนะนำ: 150-160 ตัวอักษร (ปัจจุบัน: {formData.seoDescription.length})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">สถานะ</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">ร่าง</SelectItem>
                          <SelectItem value="published">เผยแพร่ทันที</SelectItem>
                          <SelectItem value="scheduled">กำหนดเผยแพร่</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.status === "scheduled" && (
                      <div>
                        <Label htmlFor="publishDate">วันที่เผยแพร่</Label>
                        <Input
                          id="publishDate"
                          type="datetime-local"
                          value={formData.publishDate}
                          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">{editingArticle ? "บันทึกการแก้ไข" : "บันทึกบทความ"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ค้นหาบทความ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="กรองตามสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="published">เผยแพร่แล้ว</SelectItem>
                <SelectItem value="draft">ร่าง</SelectItem>
                <SelectItem value="scheduled">กำหนดเผยแพร่</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Articles List */}
          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        {getStatusBadge(article.status)}
                        {article.status === "published" && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views} views
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.publishDate).toLocaleDateString("th-TH")}
                        </span>
                        <span>โดย {article.author}</span>
                        <span>หมวดหมู่: {article.category}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
