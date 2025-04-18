import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginSchema = z.infer<typeof loginSchema>

export type LoginResponse = {
  mfaRequired?: boolean
  sessionId?: string
  key: string
  status: number
}
