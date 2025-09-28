"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Cookie, Settings, X } from "lucide-react"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)

    // Initialize analytics and marketing scripts
    initializeScripts(allAccepted)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(necessaryOnly)
    localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
  }

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowSettings(false)

    // Initialize scripts based on preferences
    initializeScripts(preferences)
  }

  const initializeScripts = (prefs: CookiePreferences) => {
    if (prefs.analytics) {
      // Initialize Google Analytics
      console.log("Initializing Google Analytics")
    }
    if (prefs.marketing) {
      // Initialize Facebook Pixel, etc.
      console.log("Initializing Marketing pixels")
    }
    if (prefs.functional) {
      // Initialize functional cookies
      console.log("Initializing Functional cookies")
    }
  }

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl shadow-lg border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  เว็บไซต์นี้ใช้คุกกี้เพื่อให้บริการที่ดีที่สุดแก่คุณ คุกกี้บางประเภทจำเป็นสำหรับการทำงานของเว็บไซต์ ส่วนคุกกี้อื่นๆ
                  จะช่วยให้เราเข้าใจการใช้งานและปรับปรุงบริการ
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">คุกกี้จำเป็น</Badge>
                  <Badge variant="outline">คุกกี้วิเคราะห์</Badge>
                  <Badge variant="outline">คุกกี้การตลาด</Badge>
                  <Badge variant="outline">คุกกี้การทำงาน</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowBanner(false)} className="flex-shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button onClick={acceptAll} className="bg-green-600 hover:bg-green-700">
                ยอมรับทั้งหมด
              </Button>
              <Button variant="outline" onClick={acceptNecessary}>
                คุกกี้จำเป็นเท่านั้น
              </Button>
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    ตั้งค่าคุกกี้
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>ตั้งค่าคุกกี้</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">คุกกี้จำเป็น</h4>
                          <p className="text-sm text-muted-foreground">
                            คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์และไม่สามารถปิดได้
                          </p>
                        </div>
                        <Switch checked={preferences.necessary} disabled />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">คุกกี้วิเคราะห์</h4>
                          <p className="text-sm text-muted-foreground">
                            ช่วยให้เราเข้าใจการใช้งานเว็บไซต์และปรับปรุงประสบการณ์ผู้ใช้
                          </p>
                        </div>
                        <Switch
                          checked={preferences.analytics}
                          onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">คุกกี้การตลาด</h4>
                          <p className="text-sm text-muted-foreground">ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องและวัดประสิทธิภาพการตลาด</p>
                        </div>
                        <Switch
                          checked={preferences.marketing}
                          onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">คุกกี้การทำงาน</h4>
                          <p className="text-sm text-muted-foreground">ช่วยให้เว็บไซต์จดจำการตั้งค่าและความต้องการของคุณ</p>
                        </div>
                        <Switch
                          checked={preferences.functional}
                          onCheckedChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowSettings(false)}>
                        ยกเลิก
                      </Button>
                      <Button onClick={savePreferences}>บันทึกการตั้งค่า</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
