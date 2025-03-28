import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string().max(255),
  email: z.string().email().max(255),
  phone: z.string().max(255),
  birthdate: z.coerce.date(),
  avatar: z.string().nullable().optional(),
  active: z.boolean().default(true),
  role: z.enum(["user", "admin"]).default("user"),
})

export type UserSchema = z.infer<typeof userSchema>
