// lib/schemas.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(12, 'Password must be less than 12 characters'),
})

export type LoginSchema = z.infer<typeof loginSchema>
