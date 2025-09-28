import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { getUserByEmail, addUser, type User } from "./data-store"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production",
)

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin" | "customer"
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.user as AuthUser
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

export async function getCurrentUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  const token = request.cookies.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

export async function login(email: string, password: string): Promise<AuthUser | null> {
  const user = getUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

export async function register(email: string, password: string, name: string): Promise<AuthUser | null> {
  const existingUser = getUserByEmail(email)
  if (existingUser) return null

  const hashedPassword = await hashPassword(password)
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
    role: "customer",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  addUser(newUser)

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  }
}

export function requireAdmin(user: AuthUser | null): boolean {
  return user?.role === "admin"
}
