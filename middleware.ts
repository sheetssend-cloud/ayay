import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUserFromRequest } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const user = await getCurrentUserFromRequest(request)

    // If no user or not admin, redirect to login
    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/login?redirect=" + request.nextUrl.pathname, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
