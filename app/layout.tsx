import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "OPEN SHEETS - หนังสือเตรียมสอบออนไลน์",
  description: "ร้านหนังสือเตรียมสอบออนไลน์ครบครัน GAT PAT TGAT TPAT พร้อมสินค้าดิจิทัลและบริการครบวงจร",
  keywords: "หนังสือเตรียมสอบ, GAT, PAT, TGAT, TPAT, ข้อสอบ, หนังสือดิจิทัล",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OPEN SHEETS" />
        <meta property="og:title" content="OPEN SHEETS - หนังสือเตรียมสอบออนไลน์" />
        <meta property="og:description" content="ร้านหนังสือเตรียมสอบออนไลน์ครบครัน GAT PAT TGAT TPAT" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://opensheets.com" />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
