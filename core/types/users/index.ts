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
  crowns: z.number().default(0),
  progression: z.object({
    level: z.number().default(1),
    experience: z.number().default(0),
  }),
})

export type UserSchema = z.infer<typeof userSchema>
