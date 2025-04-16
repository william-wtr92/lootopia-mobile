import { z } from "zod"

import { huntParticipationStatus } from "../hunts/participations"

export const defaultPage = 0
export const defaultLimit = 10

const paginationSchema = z.object({
  page: z.coerce.number().default(defaultPage),
  limit: z.coerce.number().default(defaultLimit).optional(),
  search: z.string().optional(),
})

export type PaginationSchema = z.infer<typeof paginationSchema>

export const huntParticipationSchema = paginationSchema.extend({
  status: z
    .enum([huntParticipationStatus.started, huntParticipationStatus.upcoming])
    .optional(),
})

export type HuntParticipationSchema = z.infer<typeof huntParticipationSchema>
