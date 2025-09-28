"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Eye, Clock, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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
  likes: number
  comments: number
}

const mockPost: BlogPost = {
  id: "1",
  title: "เทคนิคการเตรียมตัวสอบ GAT ให้ได้คะแนนสูง",
  slug: "gat-exam-preparation-tips",
  excerpt: "เทคนิคและวิธีการเตรียมตัวสอบ GAT ที่จะช่วยให้คุณได้คะแนนสูงในการสอบ",
  content: `
    <h2>การเตรียมตัวสอบ GAT อย่างมีประสิทธิภาพ</h2>
    
    <p>การสอบ GAT (General Aptitude Test) เป็นการสอบที่สำคัญสำหรับนักเรียนที่ต้องการเข้าศึกษาต่อในระดับอุดมศึกษา การเตรียมตัวที่ดีจะช่วยให้คุณได้คะแนนที่สูงและเข้าศึกษาในสถาบันที่ต้องการ</p>

    <h3>1. ทำความเข้าใจโครงสร้างข้อสอบ</h3>
    <p>ข้อสอบ GAT แบ่งออกเป็น 4 ส่วนหลัก:</p>
    <ul>
      <li>ความสามารถด้านภาษาไทย</li>
      <li>ความสามารถด้านภาษาอังกฤษ</li>
      <li>ความสามารถด้านการคิดเหตุผล</li>
      <li>ความสามารถด้านการคิดวิเคราะห์</li>
    </ul>

    <h3>2. วางแผนการเรียนอย่างเป็นระบบ</h3>
    <p>การวางแผนการเรียนที่ดีควรมีองค์ประกอบดังนี้:</p>
    <ul>
      <li>กำหนดเป้าหมายคะแนนที่ต้องการ</li>
      <li>แบ่งเวลาเรียนแต่ละวิชาอย่างเหมาะสม</li>
      <li>ทำข้อสอบเก่าเป็นประจำ</li>
      <li>ทบทวนจุดอ่อนอย่างสม่ำเสมอ</li>
    </ul>

    <h3>3. เทคนิคการทำข้อสอบ</h3>
    <p>เทคนิคสำคัญในการทำข้อสอบ GAT:</p>
    <ul>
      <li>อ่านโจทย์ให้เข้าใจก่อนตอบ</li>
      <li>จัดการเวลาให้เหมาะสม</li>
      <li>ตอบข้อที่แน่ใจก่อน</li>
      <li>ใช้เทคนิคการตัดตัวเลือก</li>
    </ul>

    <h3>4. การใช้หนังสือเตรียมสอบ</h3>
    <p>การเลือกหนังสือเตรียมสอบที่ดีจะช่วยให้การเรียนมีประสิทธิภาพมากขึ้น ควรเลือกหนังสือที่:</p>
    <ul>
      <li>มีเนื้อหาครบถ้วนตามหลักสูตร</li>
      <li>มีข้อสอบจำลองและเฉลย</li>
      <li>อธิบายเทคนิคการทำข้อสอบ</li>
      <li>อัปเดตตามแนวข้อสอบล่าสุด</li>
    </ul>

    <h3>สรุป</h3>
    <p>การเตรียมตัวสอบ GAT ต้องใช้ความอดทนและการวางแผนที่ดี การฝึกฝนอย่างสม่ำเสมอและการใช้เทคนิคที่เหมาะสมจะช่วยให้คุณประสบความสำเร็จในการสอบ</p>
  `,
  featuredImage: "/gat-exam-preparation-study-materials.jpg",
  category: "เทคนิคการสอบ",
  tags: ["GAT", "เทคนิคการสอบ", "การเตรียมตัว"],
  author: "ทีมงาน SHEET88",
  publishDate: "2024-01-15",
  views: 1250,
  readTime: 8,
  likes: 45,
  comments: 12,
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // In a real app, fetch post by slug
    setPost(mockPost)
  }, [params.slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">กำลังโหลด...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/blog">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับไปบล็อก
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-6 text-balance">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishDate).toLocaleDateString("th-TH")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} นาที
              </span>
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views} views
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {post.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                แชร์
              </Button>
            </div>

            <div className="flex gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <Separator className="my-8" />

          {/* Author Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{post.author}</h3>
                  <p className="text-muted-foreground">
                    ทีมงานผู้เชี่ยวชาญด้านการศึกษาและการเตรียมสอบ มีประสบการณ์ในการสอนและการพัฒนาเนื้อหาการเรียนมากกว่า 10 ปี
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">บทความที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`/related-exam-preparation-article-.jpg?height=200&width=400&query=related exam preparation article ${i}`}
                      alt={`Related Article ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      เทคนิคการสอบ
                    </Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {i === 1 ? "วิธีการจัดการเวลาในการสอบให้มีประสิทธิภาพ" : "เทคนิคการจำและการทบทวนที่ได้ผล"}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {i === 1
                        ? "เรียนรู้เทคนิคการจัดการเวลาที่จะช่วยให้คุณทำข้อสอบได้อย่างมีประสิทธิภาพ"
                        : "วิธีการจำและทบทวนบทเรียนที่จะช่วยให้คุณจำได้นานและเข้าใจลึกซึ้ง"}
                    </p>
                    <Link href={`/blog/related-article-${i}`}>
                      <Button variant="ghost" size="sm" className="mt-2 p-0">
                        อ่านต่อ →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
