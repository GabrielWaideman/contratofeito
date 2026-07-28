import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'contrato-feito-secret-key-change-in-production'
const COOKIE_NAME = 'cf_admin_token'
const SALT_ROUNDS = 12
const TOKEN_EXPIRY = '8h'

// ─── Senha ────────────────────────────────────────────────────────────────────
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS)
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

// ─── JWT ──────────────────────────────────────────────────────────────────────
export interface JwtPayload {
  userId: number
  username: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

// ─── Cookie HTTP-Only ─────────────────────────────────────────────────────────
export function buildSessionCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production'
  const maxAge = 8 * 60 * 60 // 8 horas em segundos
  return [
    `${COOKIE_NAME}=${token}`,
    `HttpOnly`,
    `SameSite=Strict`,
    `Path=/`,
    `Max-Age=${maxAge}`,
    isProduction ? 'Secure' : '',
  ].filter(Boolean).join('; ')
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`
}

// ─── Session (Server Component) ───────────────────────────────────────────────
export function getSessionFromRequest(request: Request): JwtPayload | null {
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  if (!match) return null
  return verifyToken(match[1])
}

// ─── Rate Limiting simples (in-memory) ───────────────────────────────────────
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string): { blocked: boolean; remaining: number } {
  const now = Date.now()
  const MAX = 5
  const WINDOW = 15 * 60 * 1000 // 15 min

  const record = loginAttempts.get(ip)

  if (!record || record.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW })
    return { blocked: false, remaining: MAX - 1 }
  }

  record.count++

  if (record.count > MAX) {
    return { blocked: true, remaining: 0 }
  }

  return { blocked: false, remaining: MAX - record.count }
}

export function resetRateLimit(ip: string) {
  loginAttempts.delete(ip)
}
