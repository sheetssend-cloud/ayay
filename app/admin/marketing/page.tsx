"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Search, Facebook, MessageCircle, TrendingUp, Target, Users, BarChart3 } from "lucide-react"

export default function MarketingPage() {
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    fromName: "SHEET88",
    fromEmail: "",
    isEnabled: false,
  })

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "SHEET88 - หนังสือเตรียมสอบออนไลน์",
    siteDescription: "ร้านหนังสือเตรียมสอบออนไลน์ครบครัน GAT PAT TGAT TPAT",
    siteKeywords: "หนังสือเตรียมสอบ, GAT, PAT, TGAT, TPAT, ข้อสอบ",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    linePixelId: "",
    isRobotsEnabled: true,
    isSitemapEnabled: true,
  })

  const [socialMedia, setSocialMedia] = useState({
    facebookPageId: "",
    lineOfficialId: "",
    instagramUsername: "",
    tiktokUsername: "",
    youtubeChannelId: "",
  })

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="การตลาดดิจิทัล" description="จัดการเครื่องมือการตลาดและ SEO" />

        <main className="p-6 space-y-6">
          <Tabs defaultValue="seo" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Marketing
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Social Media
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    การตั้งค่า SEO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteTitle">หัวข้อเว็บไซต์</Label>
                      <Input
                        id="siteTitle"
                        value={seoSettings.siteTitle}
                        onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
                        placeholder="ชื่อเว็บไซต์"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteKeywords">คำสำคัญ (Keywords)</Label>
                      <Input
                        id="siteKeywords"
                        value={seoSettings.siteKeywords}
                        onChange={(e) => setSeoSettings({ ...seoSettings, siteKeywords: e.target.value })}
                        placeholder="คำสำคัญ, แยกด้วยจุลภาค"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">คำอธิบายเว็บไซต์</Label>
                    <Textarea
                      id="siteDescription"
                      value={seoSettings.siteDescription}
                      onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
                      placeholder="คำอธิบายเว็บไซต์สำหรับ Search Engine"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="robotsEnabled"
                        checked={seoSettings.isRobotsEnabled}
                        onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, isRobotsEnabled: checked })}
                      />
                      <Label htmlFor="robotsEnabled">เปิดใช้งาน robots.txt</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="sitemapEnabled"
                        checked={seoSettings.isSitemapEnabled}
                        onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, isSitemapEnabled: checked })}
                      />
                      <Label htmlFor="sitemapEnabled">สร้าง sitemap.xml อัตโนมัติ</Label>
                    </div>
                  </div>
                  <Button>บันทึกการตั้งค่า SEO</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google Search Console</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">1,245</div>
                        <p className="text-sm text-muted-foreground">Total Clicks</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">15,678</div>
                        <p className="text-sm text-muted-foreground">Total Impressions</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">7.9%</div>
                        <p className="text-sm text-muted-foreground">Average CTR</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Marketing Tab */}
            <TabsContent value="email" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    การตั้งค่า Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      id="emailEnabled"
                      checked={emailSettings.isEnabled}
                      onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, isEnabled: checked })}
                    />
                    <Label htmlFor="emailEnabled">เปิดใช้งาน Email Marketing</Label>
                  </div>

                  {emailSettings.isEnabled && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="smtpHost">SMTP Host</Label>
                          <Input
                            id="smtpHost"
                            value={emailSettings.smtpHost}
                            onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                            placeholder="smtp.gmail.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="smtpPort">SMTP Port</Label>
                          <Input
                            id="smtpPort"
                            value={emailSettings.smtpPort}
                            onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                            placeholder="587"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fromName">ชื่อผู้ส่ง</Label>
                          <Input
                            id="fromName"
                            value={emailSettings.fromName}
                            onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                            placeholder="SHEET88"
                          />
                        </div>
                        <div>
                          <Label htmlFor="fromEmail">อีเมลผู้ส่ง</Label>
                          <Input
                            id="fromEmail"
                            type="email"
                            value={emailSettings.fromEmail}
                            onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                            placeholder="noreply@sheet88.com"
                          />
                        </div>
                      </div>
                      <Button>บันทึกการตั้งค่า Email</Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Welcome Email Series</h3>
                        <p className="text-sm text-muted-foreground">อีเมลต้อนรับสำหรับสมาชิกใหม่</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <Button variant="outline" size="sm">
                          แก้ไข
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Abandoned Cart Recovery</h3>
                        <p className="text-sm text-muted-foreground">อีเมลเตือนสำหรับตะกร้าที่ถูกทิ้ง</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <Button variant="outline" size="sm">
                          แก้ไข
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Facebook className="h-5 w-5" />
                    Social Media Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebookPageId">Facebook Page ID</Label>
                      <Input
                        id="facebookPageId"
                        value={socialMedia.facebookPageId}
                        onChange={(e) => setSocialMedia({ ...socialMedia, facebookPageId: e.target.value })}
                        placeholder="123456789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lineOfficialId">LINE Official Account ID</Label>
                      <Input
                        id="lineOfficialId"
                        value={socialMedia.lineOfficialId}
                        onChange={(e) => setSocialMedia({ ...socialMedia, lineOfficialId: e.target.value })}
                        placeholder="@sheet88"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagramUsername">Instagram Username</Label>
                      <Input
                        id="instagramUsername"
                        value={socialMedia.instagramUsername}
                        onChange={(e) => setSocialMedia({ ...socialMedia, instagramUsername: e.target.value })}
                        placeholder="sheet88_official"
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtubeChannelId">YouTube Channel ID</Label>
                      <Input
                        id="youtubeChannelId"
                        value={socialMedia.youtubeChannelId}
                        onChange={(e) => setSocialMedia({ ...socialMedia, youtubeChannelId: e.target.value })}
                        placeholder="UCxxxxxxxxxxxxx"
                      />
                    </div>
                  </div>
                  <Button>บันทึกการตั้งค่า Social Media</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Facebook className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">2,456</div>
                        <p className="text-sm text-muted-foreground">Facebook Followers</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-sm text-muted-foreground">LINE Friends</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">892</div>
                        <p className="text-sm text-muted-foreground">Instagram Followers</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Tracking & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                      <Input
                        id="googleAnalyticsId"
                        value={seoSettings.googleAnalyticsId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                      <Input
                        id="googleTagManagerId"
                        value={seoSettings.googleTagManagerId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, googleTagManagerId: e.target.value })}
                        placeholder="GTM-XXXXXXX"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixelId"
                        value={seoSettings.facebookPixelId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, facebookPixelId: e.target.value })}
                        placeholder="123456789012345"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linePixelId">LINE Pixel ID</Label>
                      <Input
                        id="linePixelId"
                        value={seoSettings.linePixelId}
                        onChange={(e) => setSeoSettings({ ...seoSettings, linePixelId: e.target.value })}
                        placeholder="LINE_PIXEL_ID"
                      />
                    </div>
                  </div>
                  <Button>บันทึกการตั้งค่า Analytics</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Marketing Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">12.5%</div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">₿1,450</div>
                        <p className="text-sm text-muted-foreground">Cost Per Acquisition</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">3.2</div>
                        <p className="text-sm text-muted-foreground">Return on Ad Spend</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Mail className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold">24.8%</div>
                        <p className="text-sm text-muted-foreground">Email Open Rate</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
