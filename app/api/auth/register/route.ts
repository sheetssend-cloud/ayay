import { type NextRequest, NextResponse } from "next/server"
import { register, createToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    const user = await register(email, password, name)
    if (!user) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const token = await createToken(user)
    const cookieStore = cookies()

    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
